import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// TODO: Implement kyc routes
router.get('/', authenticate, asyncHandler(async (req, res) => {
  res.json({ message: 'kyc routes — coming soon', route: 'kyc' });
}));

export default router;
