import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// TODO: Implement founder routes
router.get('/', authenticate, asyncHandler(async (req, res) => {
  res.json({ message: 'founder routes — coming soon', route: 'founder' });
}));

export default router;
