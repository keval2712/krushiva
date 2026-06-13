import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// TODO: Implement invoices routes
router.get('/', authenticate, asyncHandler(async (req, res) => {
  res.json({ message: 'invoices routes — coming soon', route: 'invoices' });
}));

export default router;
