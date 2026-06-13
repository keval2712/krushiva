import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// TODO: Implement users routes
router.get('/', authenticate, asyncHandler(async (req, res) => {
  res.json({ message: 'users routes — coming soon', route: 'users' });
}));

export default router;
