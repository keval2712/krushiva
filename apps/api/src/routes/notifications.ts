import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// TODO: Implement notifications routes
router.get('/', authenticate, asyncHandler(async (req, res) => {
  res.json({ message: 'notifications routes — coming soon', route: 'notifications' });
}));

export default router;
