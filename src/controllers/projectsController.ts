import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.developerProject.findMany({
      include: {
        developer: true,
        plots: true,
      }
    });
    res.json(projects);
  } catch (error) {
    console.error('Erreur getAllProjects:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des projets' });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await prisma.developerProject.findUnique({
      where: { id },
      include: {
        developer: true,
        plots: true,
      }
    });

    if (!project) {
      return res.status(404).json({ error: 'Projet introuvable' });
    }

    res.json(project);
  } catch (error) {
    console.error('Erreur getProjectById:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const projectData = req.body;
    
    // In a real application, you'd extract developerId from req.user or request body
    const newProject = await prisma.developerProject.create({
      data: projectData
    });

    res.status(201).json({ success: true, project: newProject });
  } catch (error) {
    console.error('Erreur createProject:', error);
    res.status(500).json({ error: 'Erreur lors de la création du projet' });
  }
};
