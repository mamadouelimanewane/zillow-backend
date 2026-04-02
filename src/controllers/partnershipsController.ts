import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllPartnerships = async (req: Request, res: Response) => {
  try {
    const partnerships = await prisma.partnership.findMany({
      include: {
        developer: true,
        agency: true,
        clauses: true,
      }
    });
    res.json(partnerships);
  } catch (error) {
    console.error('Erreur getAllPartnerships:', error);
    res.status(500).json({ error: 'Erreur Serveur' });
  }
};

export const createPartnership = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    
    // In a real application, you handle clauses and relations appropriately.
    const newPartnership = await prisma.partnership.create({
      data: data
    });

    res.status(201).json({ success: true, partnership: newPartnership });
  } catch (error) {
    console.error('Erreur createPartnership:', error);
    res.status(500).json({ error: 'Erreur lors de la création du partenariat' });
  }
};
