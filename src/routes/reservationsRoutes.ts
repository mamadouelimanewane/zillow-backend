import { Router } from 'express';
import {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservationStatus
} from '../controllers/reservationsController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = Router();

// Require auth for all reservation actions
router.use(authenticateJWT);

router.get('/', getAllReservations);
router.get('/:id', getReservationById);
router.post('/', createReservation);
router.patch('/:id/status', updateReservationStatus);

export default router;
