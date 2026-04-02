import { Router } from 'express';
import {
  getAllPartnerships,
  createPartnership
} from '../controllers/partnershipsController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticateJWT, getAllPartnerships);
router.post('/', authenticateJWT, createPartnership);

export default router;
