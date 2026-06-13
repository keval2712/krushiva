import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// TODO: Implement admin routes
router.get('/', authenticate, asyncHandler(async (req, res) => {
  res.json({ message: 'admin routes — coming soon', route: 'admin' });
}));

export default router;
