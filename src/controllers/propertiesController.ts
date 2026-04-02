import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProperties = async (req: Request, res: Response) => {
  try {
    const properties = await prisma.property.findMany();
    res.json(properties);
  } catch (error) {
    console.error('Erreur getAllProperties:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des propriétés' });
  }
};

export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const property = await prisma.property.findUnique({
      where: { id }
    });

    if (!property) {
      return res.status(404).json({ error: 'Propriété introuvable' });
    }

    res.json(property);
  } catch (error) {
    console.error('Erreur getPropertyById:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

export const createProperty = async (req: any, res: Response) => {
  try {
    const propertyData = req.body;
    // Assuming req.user is set by auth middleware
    const agentId = req.user?.id;

    if (!agentId) {
       return res.status(401).json({ error: 'Non autorisé' });
    }

    const newProperty = await prisma.property.create({
      data: {
        ...propertyData,
        // Optional logic to link to agent/agency ...
      }
    });

    res.status(201).json({ success: true, property: newProperty });
  } catch (error) {
    console.error('Erreur createProperty:', error);
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
};

export const updateProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const propertyData = req.body;

    const updatedProperty = await prisma.property.update({
      where: { id },
      data: propertyData
    });

    res.json({ success: true, property: updatedProperty });
  } catch (error) {
    console.error('Erreur updateProperty:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
};

export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.property.delete({ where: { id } });
    res.json({ success: true, message: 'Propriété supprimée avec succès' });
  } catch (error) {
    console.error('Erreur deleteProperty:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
};
