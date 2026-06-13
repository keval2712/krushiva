import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AuthSocket extends Socket {
  userId?: string;
  userRole?: string;
}

export function setupSocketHandlers(io: Server) {
  // Auth middleware
  io.use(async (socket: AuthSocket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.slice(7);
      if (!token) return next(new Error('Authentication required'));

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };
      socket.userId = decoded.userId;
      socket.userRole = decoded.role;
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket: AuthSocket) => {
    const userId = socket.userId!;
    console.log(`[Socket] User ${userId} connected`);

    // Join user's personal room
    socket.join(`user:${userId}`);

    // ====================================================
    // CHAT HANDLERS
    // ====================================================

    socket.on('join:conversation', async (conversationId: string) => {
      const member = await prisma.conversationMember.findUnique({
        where: { conversationId_userId: { conversationId, userId } },
      });
      if (member) {
        socket.join(`conv:${conversationId}`);
        socket.emit('joined:conversation', { conversationId });
      }
    });

    socket.on('send:message', async (data: { conversationId: string; content: string; type: string; fileUrl?: string }) => {
      try {
        const member = await prisma.conversationMember.findUnique({
          where: { conversationId_userId: { conversationId: data.conversationId, userId } },
        });
        if (!member) return;

        const message = await prisma.message.create({
          data: {
            conversationId: data.conversationId,
            senderId: userId,
            content: data.content,
            type: (data.type || 'TEXT') as any,
            fileUrl: data.fileUrl,
          },
          include: {
            sender: { include: { profile: { select: { fullName: true, avatarUrl: true } } } },
          },
        });

        // Update conversation
        await prisma.conversation.update({
          where: { id: data.conversationId },
          data: { updatedAt: new Date() },
        });

        // Broadcast to all members in conversation
        io.to(`conv:${data.conversationId}`).emit('new:message', { message });

        // Notify offline members
        const members = await prisma.conversationMember.findMany({
          where: { conversationId: data.conversationId, userId: { not: userId } },
        });
        for (const m of members) {
          io.to(`user:${m.userId}`).emit('notification:message', {
            conversationId: data.conversationId,
            message: { id: message.id, content: message.content, type: message.type },
          });
        }
      } catch (err) {
        socket.emit('error:message', { error: 'Failed to send message' });
      }
    });

    socket.on('read:messages', async (conversationId: string) => {
      await prisma.conversationMember.update({
        where: { conversationId_userId: { conversationId, userId } },
        data: { lastReadAt: new Date() },
      });
      socket.to(`conv:${conversationId}`).emit('messages:read', { conversationId, userId });
    });

    // ====================================================
    // TRACKING HANDLERS
    // ====================================================

    socket.on('join:tracking', (trackingNumber: string) => {
      socket.join(`track:${trackingNumber}`);
    });

    socket.on('update:location', async (data: { shipmentId: string; latitude: number; longitude: number }) => {
      if (socket.userRole !== 'TRANSPORTER') return;

      const shipment = await prisma.shipment.findFirst({
        where: { id: data.shipmentId, transporterId: userId },
      });
      if (!shipment) return;

      io.to(`track:${shipment.trackingNumber}`).emit('location:updated', {
        shipmentId: data.shipmentId,
        trackingNumber: shipment.trackingNumber,
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: new Date().toISOString(),
      });
    });

    // ====================================================
    // NOTIFICATION HANDLERS
    // ====================================================

    socket.on('notifications:read', async (notificationIds: string[]) => {
      await prisma.notification.updateMany({
        where: { id: { in: notificationIds }, userId },
        data: { isRead: true, readAt: new Date() },
      });
    });

    // ====================================================
    // DISCONNECT
    // ====================================================

    socket.on('disconnect', () => {
      console.log(`[Socket] User ${userId} disconnected`);
    });
  });

  return io;
}

// Helper to send notification via socket
export async function sendSocketNotification(
  io: Server,
  userId: string,
  notification: { type: string; title: string; body: string; data?: any }
) {
  io.to(`user:${userId}`).emit('notification:new', notification);
}
