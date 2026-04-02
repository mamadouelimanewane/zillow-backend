import { Router } from 'express';
import {
  getAllAgencies,
  getAgencyById
} from '../controllers/agenciesController';

const router = Router();

router.get('/', getAllAgencies);
router.get('/:id', getAgencyById);

export default router;
