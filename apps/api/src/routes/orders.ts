import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authenticate, AuthRequest, requireRole } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';

const router = Router();
const prisma = new PrismaClient();

// GET /api/orders — Get orders for current user
router.get('/', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { status, page = '1', limit = '20' } = req.query;
  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

  const where: any = {};
  if (req.user!.role === 'FARMER') where.farmerId = req.user!.id;
  if (req.user!.role === 'BUYER') where.buyerId = req.user!.id;
  if (status) where.status = status;

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        buyer: { include: { profile: { select: { fullName: true, avatarUrl: true } } } },
        farmer: { include: { profile: { select: { fullName: true, avatarUrl: true } } } },
        items: true,
        shipment: { select: { id: true, trackingNumber: true, status: true, etaMinutes: true } },
        invoice: { select: { id: true, invoiceNumber: true, pdfUrl: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: parseInt(limit as string),
    }),
    prisma.order.count({ where }),
  ]);

  res.json({
    orders,
    pagination: { page: parseInt(page as string), limit: parseInt(limit as string), total, pages: Math.ceil(total / parseInt(limit as string)) },
  });
}));

// GET /api/orders/:id
router.get('/:id', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const order = await prisma.order.findUnique({
    where: { id: req.params.id },
    include: {
      buyer: { include: { profile: true, trustScore: true, buyerProfile: true } },
      farmer: { include: { profile: true, trustScore: true, farmerProfile: true } },
      items: { include: { product: { include: { images: { where: { isPrimary: true } } } } } },
      shipment: {
        include: {
          vehicle: true, driver: true,
          trackingEvents: { orderBy: { createdAt: 'desc' }, take: 10 },
          transporter: { include: { profile: true, trustScore: true } },
        },
      },
      invoice: true,
      timeline: { orderBy: { createdAt: 'asc' } },
      dispute: true,
    },
  });

  if (!order) throw createError('Order not found', 404);

  // Access control
  const userId = req.user!.id;
  const role = req.user!.role;
  const canAccess = role === 'ADMIN' || role === 'FOUNDER' ||
    order.buyerId === userId || order.farmerId === userId ||
    order.shipment?.transporterId === userId;

  if (!canAccess) throw createError('Access denied', 403);

  res.json({ order });
}));

const createOrderSchema = z.object({
  farmerId: z.string(),
  rfqResponseId: z.string().optional(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().positive(),
    unit: z.enum(['KG', 'QUINTAL', 'TON', 'PIECE', 'DOZEN', 'LITER', 'BAG', 'BUNDLE']),
    pricePerUnit: z.number().positive(),
  })).min(1),
  pickupAddress: z.string(),
  pickupCity: z.string(),
  pickupState: z.string(),
  pickupLatitude: z.number().optional(),
  pickupLongitude: z.number().optional(),
  deliveryAddress: z.string(),
  deliveryCity: z.string(),
  deliveryState: z.string(),
  deliveryLatitude: z.number().optional(),
  deliveryLongitude: z.number().optional(),
  expectedDelivery: z.string().datetime().optional(),
  notes: z.string().optional(),
});

// POST /api/orders
router.post('/', authenticate, requireRole('BUYER'), asyncHandler(async (req: AuthRequest, res) => {
  const data = createOrderSchema.parse(req.body);

  const totalAmount = data.items.reduce((sum, item) => sum + (item.quantity * item.pricePerUnit), 0);
  const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;

  const order = await prisma.order.create({
    data: {
      orderNumber,
      buyerId: req.user!.id,
      farmerId: data.farmerId,
      rfqResponseId: data.rfqResponseId,
      totalAmount,
      status: 'CREATED',
      pickupAddress: data.pickupAddress,
      pickupCity: data.pickupCity,
      pickupState: data.pickupState,
      pickupLatitude: data.pickupLatitude,
      pickupLongitude: data.pickupLongitude,
      deliveryAddress: data.deliveryAddress,
      deliveryCity: data.deliveryCity,
      deliveryState: data.deliveryState,
      deliveryLatitude: data.deliveryLatitude,
      deliveryLongitude: data.deliveryLongitude,
      expectedDelivery: data.expectedDelivery ? new Date(data.expectedDelivery) : undefined,
      notes: data.notes,
      items: {
        create: data.items.map(item => ({
          productId: item.productId,
          productName: '', // Will be filled from product lookup
          quantity: item.quantity,
          unit: item.unit,
          pricePerUnit: item.pricePerUnit,
          totalPrice: item.quantity * item.pricePerUnit,
        })),
      },
      timeline: {
        create: { status: 'CREATED', createdBy: req.user!.id },
      },
    },
    include: { items: true, timeline: true },
  });

  // TODO: Send notification to farmer
  // TODO: Generate proforma invoice

  res.status(201).json({ message: 'Order created', order });
}));

// PUT /api/orders/:id/status
const updateStatusSchema = z.object({
  status: z.enum(['ACCEPTED', 'CANCELLED', 'COMPLETED']),
  notes: z.string().optional(),
  cancelReason: z.string().optional(),
});

router.put('/:id/status', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const data = updateStatusSchema.parse(req.body);
  const { id } = req.params;
  const userId = req.user!.id;
  const role = req.user!.role;

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) throw createError('Order not found', 404);

  // Role-based status transitions
  const allowedTransitions: Record<string, string[]> = {
    FARMER: ['ACCEPTED', 'CANCELLED'],
    BUYER: ['CANCELLED', 'COMPLETED'],
    ADMIN: ['ACCEPTED', 'CANCELLED', 'COMPLETED'],
  };

  if (!allowedTransitions[role]?.includes(data.status)) {
    throw createError(`Role ${role} cannot set status to ${data.status}`, 403);
  }

  const updated = await prisma.order.update({
    where: { id },
    data: {
      status: data.status as any,
      cancelReason: data.cancelReason,
      cancelledAt: data.status === 'CANCELLED' ? new Date() : undefined,
      completedAt: data.status === 'COMPLETED' ? new Date() : undefined,
      timeline: {
        create: { status: data.status as any, notes: data.notes, createdBy: userId },
      },
    },
  });

  // TODO: Update trust scores on completion/cancellation
  // TODO: Send notification

  res.json({ message: 'Order status updated', order: updated });
}));

export default router;
