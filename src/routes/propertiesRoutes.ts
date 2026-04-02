import { Router } from 'express';
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} from '../controllers/propertiesController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getAllProperties);
router.get('/:id', getPropertyById);

// Protected routes
router.post('/', authenticateJWT, createProperty);
router.put('/:id', authenticateJWT, updateProperty);
router.delete('/:id', authenticateJWT, deleteProperty);

export default router;
