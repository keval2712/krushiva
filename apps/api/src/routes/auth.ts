import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// ============================================================
// VALIDATION SCHEMAS
// ============================================================

const registerSchema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number').optional(),
  email: z.string().email('Invalid email').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['FARMER', 'BUYER', 'TRANSPORTER']),
}).refine(data => data.phone || data.email, {
  message: 'Either phone or email is required',
});

const loginSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string(),
});

const otpRequestSchema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/),
});

const otpVerifySchema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/),
  otp: z.string().length(6),
  purpose: z.enum(['LOGIN', 'REGISTER', 'VERIFY']).default('LOGIN'),
});

// ============================================================
// HELPERS
// ============================================================

function generateTokens(userId: string, role: string) {
  const accessToken = jwt.sign(
    { userId, role },
    process.env.JWT_SECRET!,
    { expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as any }
  );
  const refreshToken = jwt.sign(
    { userId, role },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any }
  );
  return { accessToken, refreshToken };
}

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTP(phone: string, otp: string): Promise<void> {
  // In production: call MSG91 or Twilio API
  console.log(`[OTP] Sending ${otp} to +91${phone}`);
  // TODO: Implement SMS provider integration
}

// ============================================================
// POST /api/auth/register
// ============================================================

router.post('/register', asyncHandler(async (req, res) => {
  const data = registerSchema.parse(req.body);

  // Check existing user
  if (data.phone) {
    const existing = await prisma.user.findUnique({ where: { phone: data.phone } });
    if (existing) throw createError('Phone number already registered', 409);
  }
  if (data.email) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw createError('Email already registered', 409);
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      phone: data.phone,
      email: data.email,
      passwordHash,
      role: data.role,
      status: 'PENDING',
      profile: {
        create: { fullName: data.fullName },
      },
    },
    include: { profile: true },
  });

  // Send verification OTP if phone provided
  if (data.phone) {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min
    await prisma.user.update({
      where: { id: user.id },
      data: { otpCode: await bcrypt.hash(otp, 8), otpExpiresAt: expiresAt },
    });
    await sendOTP(data.phone, otp);
  }

  const tokens = generateTokens(user.id, user.role);

  // Store refresh token
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: tokens.refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  res.status(201).json({
    message: 'Registration successful',
    user: {
      id: user.id,
      phone: user.phone,
      email: user.email,
      role: user.role,
      status: user.status,
      profile: { fullName: user.profile?.fullName },
    },
    tokens,
    requiresOTP: !!data.phone,
  });
}));

// ============================================================
// POST /api/auth/login
// ============================================================

router.post('/login', asyncHandler(async (req, res) => {
  const data = loginSchema.parse(req.body);

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        data.email ? { email: data.email } : {},
        data.phone ? { phone: data.phone } : {},
      ].filter(w => Object.keys(w).length > 0),
    },
    include: { profile: true, trustScore: true },
  });

  if (!user?.passwordHash) throw createError('Invalid credentials', 401);

  const valid = await bcrypt.compare(data.password, user.passwordHash);
  if (!valid) throw createError('Invalid credentials', 401);

  if (user.status === 'BANNED') throw createError('Account banned', 403);
  if (user.status === 'SUSPENDED') throw createError('Account suspended. Contact support.', 403);

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  const tokens = generateTokens(user.id, user.role);

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: tokens.refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  res.json({
    user: {
      id: user.id,
      phone: user.phone,
      email: user.email,
      role: user.role,
      status: user.status,
      profile: { fullName: user.profile?.fullName, avatarUrl: user.profile?.avatarUrl },
      trustScore: user.trustScore?.score,
    },
    tokens,
  });
}));

// ============================================================
// POST /api/auth/otp/request
// ============================================================

router.post('/otp/request', asyncHandler(async (req, res) => {
  const { phone } = otpRequestSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) throw createError('No account found with this phone number', 404);
  if (user.status === 'BANNED') throw createError('Account banned', 403);

  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await prisma.user.update({
    where: { id: user.id },
    data: { otpCode: await bcrypt.hash(otp, 8), otpExpiresAt: expiresAt },
  });

  await sendOTP(phone, otp);

  res.json({ message: 'OTP sent successfully', expiresIn: 300 });
}));

// ============================================================
// POST /api/auth/otp/verify
// ============================================================

router.post('/otp/verify', asyncHandler(async (req, res) => {
  const { phone, otp } = otpVerifySchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) throw createError('No account found', 404);
  if (!user.otpCode || !user.otpExpiresAt) throw createError('No OTP requested', 400);
  if (new Date() > user.otpExpiresAt) throw createError('OTP expired', 400);

  const valid = await bcrypt.compare(otp, user.otpCode);
  if (!valid) throw createError('Invalid OTP', 400);

  // Clear OTP, mark phone verified, activate account
  await prisma.user.update({
    where: { id: user.id },
    data: {
      otpCode: null,
      otpExpiresAt: null,
      phoneVerified: true,
      status: user.status === 'PENDING' ? 'ACTIVE' : user.status,
      lastLoginAt: new Date(),
    },
  });

  const tokens = generateTokens(user.id, user.role);
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: tokens.refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  res.json({
    message: 'OTP verified successfully',
    user: { id: user.id, phone: user.phone, role: user.role, status: 'ACTIVE' },
    tokens,
  });
}));

// ============================================================
// POST /api/auth/refresh
// ============================================================

router.post('/refresh', asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw createError('Refresh token required', 400);

  const stored = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
  if (!stored || stored.expiresAt < new Date()) {
    throw createError('Invalid or expired refresh token', 401);
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { userId: string; role: string };
  const tokens = generateTokens(decoded.userId, decoded.role);

  // Rotate refresh token
  await prisma.refreshToken.delete({ where: { token: refreshToken } });
  await prisma.refreshToken.create({
    data: {
      userId: decoded.userId,
      token: tokens.refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  res.json({ tokens });
}));

// ============================================================
// DELETE /api/auth/logout
// ============================================================

router.delete('/logout', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
  }
  res.json({ message: 'Logged out successfully' });
}));

// ============================================================
// POST /api/auth/forgot-password
// ============================================================

router.post('/forgot-password', asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw createError('Email required', 400);

  const user = await prisma.user.findUnique({ where: { email } });
  // Don't reveal if user exists
  if (!user) {
    res.json({ message: 'If an account exists, you will receive a reset email' });
    return;
  }

  const resetToken = uuidv4();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.user.update({
    where: { id: user.id },
    data: { otpCode: await bcrypt.hash(resetToken, 8), otpExpiresAt: expiresAt },
  });

  // TODO: Send reset email via Nodemailer
  console.log(`[RESET] Token for ${email}: ${resetToken}`);

  res.json({ message: 'If an account exists, you will receive a reset email' });
}));

export default router;
