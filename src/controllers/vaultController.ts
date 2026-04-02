import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { analyzeLegalDocument } from '../utils/ai-document-parser.js';

const prisma = new PrismaClient();

export const uploadDocument = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, error: "Aucun fichier détecté" });
    }

    const { category, projectId, uploadedBy = 'system' } = req.body;

    const fileUrl = `https://res.cloudinary.com/diwaan/image/upload/v_simulated/${file.originalname.replace(/\\s+/g, '_')}`;

    // Analyse IA
    const aiAudit = await analyzeLegalDocument(file);

    const vaultDocument = await prisma.projectComplianceDocument.create({
      data: {
        title: file.originalname,
        category: category as any,
        fileUrl: fileUrl,
        fileSize: file.size / (1024 * 1024), // MB
        status: aiAudit.isValid ? 'VALIDATED' : 'REJECTED',
        rejectionReason: aiAudit.isValid ? null : aiAudit.rejectionReason,
        authority: aiAudit.extractedAuthority,
        expirationDate: aiAudit.expirationDate ? new Date(aiAudit.expirationDate) : null,
        aiVerificationLog: aiAudit.rawLog,
        projectId: projectId,
        uploadedBy: uploadedBy,
      }
    });

    res.json({ success: true, document: vaultDocument, audit: aiAudit });
  } catch (error) {
    console.error('Vault Upload Error:', error);
    res.status(500).json({ success: false, error: 'Erreur Serveur Interne' });
  }
};
