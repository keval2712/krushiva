import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// TODO: Implement disputes routes
router.get('/', authenticate, asyncHandler(async (req, res) => {
  res.json({ message: 'disputes routes — coming soon', route: 'disputes' });
}));

export default router;
