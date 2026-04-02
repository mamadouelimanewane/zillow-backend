import { Router } from 'express';
import {
  getAllAgencies,
  getAgencyById
} from '../controllers/agenciesController.js';

const router = Router();

router.get('/', getAllAgencies);
router.get('/:id', getAgencyById);

export default router;
