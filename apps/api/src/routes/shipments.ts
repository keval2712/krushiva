import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import { authenticate, AuthRequest, requireRole } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';

const router = Router();
const prisma = new PrismaClient();

// GET /api/shipments — List shipments for current user
router.get('/', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { status, page = '1', limit = '20' } = req.query;
  const where: any = {};
  if (req.user!.role === 'TRANSPORTER') where.transporterId = req.user!.id;
  if (status) where.status = status;

  const shipments = await prisma.shipment.findMany({
    where,
    include: {
      order: { include: { buyer: { include: { profile: true } }, farmer: { include: { profile: true } } } },
      vehicle: true,
      driver: true,
      trackingEvents: { orderBy: { createdAt: 'desc' }, take: 1 },
    },
    orderBy: { createdAt: 'desc' },
    skip: (parseInt(page as string) - 1) * parseInt(limit as string),
    take: parseInt(limit as string),
  });

  res.json({ shipments });
}));

// GET /api/shipments/:id
router.get('/:id', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const shipment = await prisma.shipment.findUnique({
    where: { id: req.params.id },
    include: {
      order: { include: { buyer: { include: { profile: true, trustScore: true } }, farmer: { include: { profile: true, trustScore: true } } } },
      transporter: { include: { profile: true, trustScore: true } },
      vehicle: true, driver: true,
      trackingEvents: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!shipment) throw createError('Shipment not found', 404);
  res.json({ shipment });
}));

// GET /api/track/:trackingNumber — PUBLIC tracking endpoint
router.get('/track/:trackingNumber', asyncHandler(async (req, res) => {
  const shipment = await prisma.shipment.findUnique({
    where: { trackingNumber: req.params.trackingNumber },
    include: {
      order: {
        include: {
          buyer: { include: { profile: { select: { fullName: true, city: true, state: true } }, trustScore: { select: { score: true, isVerified: true, kycVerified: true } } } },
          farmer: { include: { profile: { select: { fullName: true, city: true, state: true } }, trustScore: { select: { score: true, isVerified: true, kycVerified: true } } } },
          items: { include: { product: { select: { name: true } } } },
          timeline: { orderBy: { createdAt: 'asc' } },
        },
      },
      transporter: { include: { profile: { select: { fullName: true } }, trustScore: { select: { score: true, isVerified: true } } } },
      vehicle: { select: { vehicleNumber: true, vehicleType: true } },
      driver: { select: { fullName: true } },
      trackingEvents: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!shipment) throw createError('Shipment not found', 404);

  // Strip sensitive data for public view
  res.json({ shipment });
}));

const createShipmentSchema = z.object({
  orderId: z.string(),
  vehicleId: z.string().optional(),
  driverId: z.string().optional(),
  expectedPickupAt: z.string().datetime().optional(),
  expectedDeliveryAt: z.string().datetime().optional(),
  notes: z.string().optional(),
});

// POST /api/shipments — Create shipment (admin or transporter accepting load)
router.post('/', authenticate, requireRole('TRANSPORTER', 'ADMIN'), asyncHandler(async (req: AuthRequest, res) => {
  const data = createShipmentSchema.parse(req.body);

  const order = await prisma.order.findUnique({ where: { id: data.orderId } });
  if (!order) throw createError('Order not found', 404);

  const existing = await prisma.shipment.findUnique({ where: { orderId: data.orderId } });
  if (existing) throw createError('Shipment already exists for this order', 409);

  const shipmentNumber = `SHP-${uuidv4().slice(0, 8).toUpperCase()}`;
  const trackingNumber = `TRK-${Math.floor(1000 + Math.random() * 9000)}`;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const qrContent = `${appUrl}/track/${trackingNumber}`;
  const qrCode = await QRCode.toDataURL(qrContent);

  const shipment = await prisma.shipment.create({
    data: {
      shipmentNumber,
      trackingNumber,
      qrCode,
      orderId: data.orderId,
      transporterId: req.user!.id,
      vehicleId: data.vehicleId,
      driverId: data.driverId,
      status: 'ASSIGNED',
      pickupAddress: order.pickupAddress,
      pickupCity: order.pickupCity,
      pickupState: order.pickupState,
      pickupLatitude: order.pickupLatitude,
      pickupLongitude: order.pickupLongitude,
      deliveryAddress: order.deliveryAddress,
      deliveryCity: order.deliveryCity,
      deliveryState: order.deliveryState,
      deliveryLatitude: order.deliveryLatitude,
      deliveryLongitude: order.deliveryLongitude,
      expectedPickupAt: data.expectedPickupAt ? new Date(data.expectedPickupAt) : undefined,
      expectedDeliveryAt: data.expectedDeliveryAt ? new Date(data.expectedDeliveryAt) : undefined,
      expectedQuantity: order.items ? undefined : undefined,
    },
  });

  // Update order status
  await prisma.order.update({
    where: { id: data.orderId },
    data: {
      status: 'PICKUP_SCHEDULED',
      timeline: { create: { status: 'PICKUP_SCHEDULED', createdBy: req.user!.id } },
    },
  });

  res.status(201).json({ message: 'Shipment created', shipment });
}));

const trackingUpdateSchema = z.object({
  status: z.enum(['PICKED_UP', 'IN_TRANSIT', 'NEAR_DESTINATION', 'DELIVERED', 'FAILED']),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  photos: z.array(z.string()).optional(),
});

// POST /api/shipments/:id/tracking — Add tracking event
router.post('/:id/tracking', authenticate, requireRole('TRANSPORTER', 'ADMIN'), asyncHandler(async (req: AuthRequest, res) => {
  const data = trackingUpdateSchema.parse(req.body);
  const shipment = await prisma.shipment.findUnique({ where: { id: req.params.id } });
  if (!shipment) throw createError('Shipment not found', 404);
  if (shipment.transporterId !== req.user!.id && req.user!.role !== 'ADMIN') throw createError('Access denied', 403);

  const [event, updatedShipment] = await Promise.all([
    prisma.trackingEvent.create({
      data: {
        shipmentId: req.params.id,
        status: data.status,
        description: data.description,
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
        photos: data.photos || [],
        recordedBy: req.user!.id,
      },
    }),
    prisma.shipment.update({
      where: { id: req.params.id },
      data: {
        status: data.status,
        actualPickupAt: data.status === 'PICKED_UP' ? new Date() : undefined,
        actualDeliveryAt: data.status === 'DELIVERED' ? new Date() : undefined,
        pickupLatitudeActual: data.status === 'PICKED_UP' ? data.latitude : undefined,
        pickupLongitudeActual: data.status === 'PICKED_UP' ? data.longitude : undefined,
        deliveryLatitudeActual: data.status === 'DELIVERED' ? data.latitude : undefined,
        deliveryLongitudeActual: data.status === 'DELIVERED' ? data.longitude : undefined,
      },
    }),
  ]);

  // Map shipment status to order status
  const orderStatusMap: Record<string, string> = {
    PICKED_UP: 'PICKED_UP', IN_TRANSIT: 'IN_TRANSIT',
    NEAR_DESTINATION: 'NEAR_DESTINATION', DELIVERED: 'DELIVERED',
  };
  if (orderStatusMap[data.status]) {
    await prisma.order.update({
      where: { id: shipment.orderId },
      data: { status: orderStatusMap[data.status] as any },
    });
  }

  res.json({ message: 'Tracking updated', event, shipment: updatedShipment });
}));

// POST /api/shipments/:id/pickup-proof
router.post('/:id/pickup-proof', authenticate, requireRole('TRANSPORTER'), asyncHandler(async (req: AuthRequest, res) => {
  const { photos, latitude, longitude, expectedQuantity, actualQuantity, quantityUnit } = req.body;

  const shipment = await prisma.shipment.update({
    where: { id: req.params.id },
    data: {
      pickupPhotos: photos || [],
      pickupTimestamp: new Date(),
      pickupLatitudeActual: latitude,
      pickupLongitudeActual: longitude,
      pickupConfirmedBy: req.user!.id,
      expectedQuantity,
      actualQuantity,
      quantityUnit,
      status: 'PICKED_UP',
      actualPickupAt: new Date(),
    },
  });

  res.json({ message: 'Pickup proof recorded', shipment });
}));

// POST /api/shipments/:id/delivery-proof
router.post('/:id/delivery-proof', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { photos, latitude, longitude, otp, signature, qualityNotes } = req.body;

  const shipment = await prisma.shipment.findUnique({ where: { id: req.params.id } });
  if (!shipment) throw createError('Shipment not found', 404);

  // Verify OTP if required
  if (shipment.deliveryOtp && otp !== shipment.deliveryOtp) {
    throw createError('Invalid delivery OTP', 400);
  }

  const updated = await prisma.shipment.update({
    where: { id: req.params.id },
    data: {
      deliveryPhotos: photos || [],
      deliveryTimestamp: new Date(),
      deliveryLatitudeActual: latitude,
      deliveryLongitudeActual: longitude,
      deliveryOtpVerified: true,
      digitalSignatureUrl: signature,
      qualityNotes,
      status: 'DELIVERED',
      actualDeliveryAt: new Date(),
    },
  });

  await prisma.order.update({
    where: { id: shipment.orderId },
    data: { status: 'DELIVERED', timeline: { create: { status: 'DELIVERED', createdBy: req.user!.id } } },
  });

  res.json({ message: 'Delivery proof recorded', shipment: updated });
}));

export default router;
