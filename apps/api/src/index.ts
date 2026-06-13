import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import productRoutes from './routes/products';
import categoryRoutes from './routes/categories';
import rfqRoutes from './routes/rfq';
import orderRoutes from './routes/orders';
import shipmentRoutes from './routes/shipments';
import trackingRoutes from './routes/tracking';
import invoiceRoutes from './routes/invoices';
import chatRoutes from './routes/chat';
import notificationRoutes from './routes/notifications';
import adminRoutes from './routes/admin';
import founderRoutes from './routes/founder';
import disputeRoutes from './routes/disputes';
import ratingRoutes from './routes/ratings';
import kycRoutes from './routes/kyc';

import { errorHandler } from './middleware/errorHandler';
import { setupSocketHandlers } from './socket/handlers';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
  },
});

// ============================================================
// SECURITY MIDDLEWARE
// ============================================================

app.use(helmet({
  contentSecurityPolicy: false, // Handled by Next.js
}));

app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Global rate limiting
const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

// Auth rate limiting (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many auth attempts. Please try again in 15 minutes.' },
});

app.use(globalLimiter);

// ============================================================
// PARSING MIDDLEWARE
// ============================================================

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ============================================================
// HEALTH CHECK
// ============================================================

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV,
  });
});

// ============================================================
// API ROUTES
// ============================================================

const api = express.Router();

// Auth (rate limited)
api.use('/auth', authLimiter, authRoutes);

// Protected routes
api.use('/users', userRoutes);
api.use('/kyc', kycRoutes);
api.use('/products', productRoutes);
api.use('/categories', categoryRoutes);
api.use('/rfq', rfqRoutes);
api.use('/orders', orderRoutes);
api.use('/shipments', shipmentRoutes);
api.use('/track', trackingRoutes);
api.use('/invoices', invoiceRoutes);
api.use('/chat', chatRoutes);
api.use('/notifications', notificationRoutes);
api.use('/disputes', disputeRoutes);
api.use('/ratings', ratingRoutes);

// Admin & Founder (role-restricted)
api.use('/admin', adminRoutes);
api.use('/founder', founderRoutes);

app.use('/api', api);

// ============================================================
// WEBSOCKET (SOCKET.IO)
// ============================================================

setupSocketHandlers(io);

// ============================================================
// ERROR HANDLING
// ============================================================

app.use(errorHandler);

// 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found', path: req.originalUrl });
});

// ============================================================
// START SERVER
// ============================================================

const PORT = parseInt(process.env.API_PORT || '3001');

httpServer.listen(PORT, () => {
  console.log(`\n🚀 KRUSHIVA API Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health\n`);
});

export { io };
export default app;
