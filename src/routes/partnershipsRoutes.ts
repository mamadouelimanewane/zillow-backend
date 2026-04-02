import { Router } from 'express';
import {
  getAllPartnerships,
  createPartnership
} from '../controllers/partnershipsController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authenticateJWT, getAllPartnerships);
router.post('/', authenticateJWT, createPartnership);

export default router;
