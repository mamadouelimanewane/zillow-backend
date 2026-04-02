import { Router } from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject
} from '../controllers/projectsController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', authenticateJWT, createProject);

export default router;
