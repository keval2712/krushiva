import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// TODO: Implement ratings routes
router.get('/', authenticate, asyncHandler(async (req, res) => {
  res.json({ message: 'ratings routes — coming soon', route: 'ratings' });
}));

export default router;
