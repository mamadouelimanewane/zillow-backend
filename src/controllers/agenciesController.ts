import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllAgencies = async (req: Request, res: Response) => {
  try {
    const agencies = await prisma.realEstateAgency.findMany({
      include: {
        agents: true,
        plots: true,
      }
    });
    res.json(agencies);
  } catch (error) {
    console.error('Erreur getAllAgencies:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des agences' });
  }
};

export const getAgencyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const agency = await prisma.realEstateAgency.findUnique({
      where: { id },
      include: {
        agents: true,
        plots: true,
      }
    });

    if (!agency) {
      return res.status(404).json({ error: 'Agence introuvable' });
    }

    res.json(agency);
  } catch (error) {
    console.error('Erreur getAgencyById:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
