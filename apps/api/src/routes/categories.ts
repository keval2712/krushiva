import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// TODO: Implement categories routes
router.get('/', authenticate, asyncHandler(async (req, res) => {
  res.json({ message: 'categories routes — coming soon', route: 'categories' });
}));

export default router;
