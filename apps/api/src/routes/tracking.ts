import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// TODO: Implement tracking routes
router.get('/', authenticate, asyncHandler(async (req, res) => {
  res.json({ message: 'tracking routes — coming soon', route: 'tracking' });
}));

export default router;
