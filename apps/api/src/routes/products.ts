import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authenticate, AuthRequest, requireRole } from '../middleware/auth';
import { asyncHandler, createError } from '../middleware/errorHandler';

const router = Router();
const prisma = new PrismaClient();

// GET /api/products
router.get('/', asyncHandler(async (req, res) => {
  const { category, q, location, minPrice, maxPrice, unit, organic, page = '1', limit = '24', sort = 'latest' } = req.query;

  const where: any = { status: 'ACTIVE' };
  if (q) where.name = { contains: q as string, mode: 'insensitive' };
  if (category) where.category = { slug: category };
  if (location) where.OR = [{ city: { contains: location as string, mode: 'insensitive' } }, { state: { contains: location as string, mode: 'insensitive' } }];
  if (organic === 'true') where.isOrganic = true;
  if (minPrice || maxPrice) where.pricePerUnit = { gte: minPrice ? parseFloat(minPrice as string) : undefined, lte: maxPrice ? parseFloat(maxPrice as string) : undefined };

  const orderBy: any = sort === 'price_asc' ? { pricePerUnit: 'asc' } : sort === 'price_desc' ? { pricePerUnit: 'desc' } : { createdAt: 'desc' };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        farmer: { include: { profile: { select: { fullName: true, avatarUrl: true } }, trustScore: { select: { score: true, isVerified: true, kycVerified: true } } } },
        category: { select: { name: true, slug: true } },
        images: { where: { isPrimary: true }, take: 1 },
      },
      orderBy,
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
    }),
    prisma.product.count({ where }),
  ]);

  res.json({ products, pagination: { page: parseInt(page as string), limit: parseInt(limit as string), total, pages: Math.ceil(total / parseInt(limit as string)) } });
}));

// GET /api/products/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: req.params.id },
    include: {
      farmer: { include: { profile: true, trustScore: true, farmerProfile: true } },
      category: true,
      images: { orderBy: { sortOrder: 'asc' } },
    },
  });
  if (!product) throw createError('Product not found', 404);
  await prisma.product.update({ where: { id: req.params.id }, data: { viewCount: { increment: 1 } } });
  res.json({ product });
}));

const createProductSchema = z.object({
  categoryId: z.string(),
  name: z.string().min(2),
  description: z.string().optional(),
  quantity: z.number().positive(),
  unit: z.enum(['KG', 'QUINTAL', 'TON', 'PIECE', 'DOZEN', 'LITER', 'BAG', 'BUNDLE']),
  pricePerUnit: z.number().positive(),
  harvestDate: z.string().datetime().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  isOrganic: z.boolean().default(false),
  certifications: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
});

// POST /api/products
router.post('/', authenticate, requireRole('FARMER'), asyncHandler(async (req: AuthRequest, res) => {
  const data = createProductSchema.parse(req.body);
  const product = await prisma.product.create({
    data: { ...data, farmerId: req.user!.id, availableQty: data.quantity, harvestDate: data.harvestDate ? new Date(data.harvestDate) : undefined },
  });
  res.status(201).json({ message: 'Product created', product });
}));

// PUT /api/products/:id
router.put('/:id', authenticate, requireRole('FARMER', 'ADMIN'), asyncHandler(async (req: AuthRequest, res) => {
  const product = await prisma.product.findUnique({ where: { id: req.params.id } });
  if (!product) throw createError('Product not found', 404);
  if (product.farmerId !== req.user!.id && req.user!.role !== 'ADMIN') throw createError('Access denied', 403);
  const updated = await prisma.product.update({ where: { id: req.params.id }, data: req.body });
  res.json({ product: updated });
}));

// DELETE /api/products/:id
router.delete('/:id', authenticate, requireRole('FARMER', 'ADMIN'), asyncHandler(async (req: AuthRequest, res) => {
  const product = await prisma.product.findUnique({ where: { id: req.params.id } });
  if (!product) throw createError('Product not found', 404);
  if (product.farmerId !== req.user!.id && req.user!.role !== 'ADMIN') throw createError('Access denied', 403);
  await prisma.product.update({ where: { id: req.params.id }, data: { status: 'REMOVED' } });
  res.json({ message: 'Product removed' });
}));

export default router;
