import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// TODO: Implement rfq routes
router.get('/', authenticate, asyncHandler(async (req, res) => {
  res.json({ message: 'rfq routes — coming soon', route: 'rfq' });
}));

export default router;
