import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// TODO: Implement chat routes
router.get('/', authenticate, asyncHandler(async (req, res) => {
  res.json({ message: 'chat routes — coming soon', route: 'chat' });
}));

export default router;
