import { Router } from 'express';
import multer from 'multer';
import { uploadDocument } from '../controllers/vaultController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post('/upload', authenticateJWT, upload.single('file'), uploadDocument);

export default router;
