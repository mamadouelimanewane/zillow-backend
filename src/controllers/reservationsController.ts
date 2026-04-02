import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await prisma.plotReservation.findMany({
      include: {
        plot: true,
        agency: true,
        agent: true
      }
    });
    res.json(reservations);
  } catch (error) {
    console.error('Erreur getAllReservations:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des réservations' });
  }
};

export const getReservationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reservation = await prisma.plotReservation.findUnique({
      where: { id },
      include: {
        plot: true,
        agency: true,
        agent: true,
        payments: true
      }
    });

    if (!reservation) {
      return res.status(404).json({ error: 'Réservation introuvable' });
    }

    res.json(reservation);
  } catch (error) {
    console.error('Erreur getReservationById:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

export const createReservation = async (req: Request, res: Response) => {
  try {
    const reservationData = req.body;
    
    const newReservation = await prisma.plotReservation.create({
      data: reservationData
    });

    res.status(201).json({ success: true, reservation: newReservation });
  } catch (error) {
    console.error('Erreur createReservation:', error);
    res.status(500).json({ error: 'Erreur lors de la création de la réservation' });
  }
};

export const updateReservationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // PENDING, VALIDATED, COMPLETED, CANCELLED

    if (!status) {
       return res.status(400).json({ error: 'Le champ status est requis' });
    }

    const updatedReservation = await prisma.plotReservation.update({
      where: { id },
      data: { status }
    });

    res.json({ success: true, reservation: updatedReservation });
  } catch (error) {
    console.error('Erreur updateReservationStatus:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
};
