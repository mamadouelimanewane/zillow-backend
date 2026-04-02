import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import authRoutes from './routes/authRoutes.js';
import propertiesRoutes from './routes/propertiesRoutes.js';
import projectsRoutes from './routes/projectsRoutes.js';
import agenciesRoutes from './routes/agenciesRoutes.js';
import reservationsRoutes from './routes/reservationsRoutes.js';
import partnershipsRoutes from './routes/partnershipsRoutes.js';
import vaultRoutes from './routes/vaultRoutes.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main Root Endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Zillow Backend API' });
});

// Load Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/agencies', agenciesRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/partnerships', partnershipsRoutes);
app.use('/api/vault', vaultRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Zillow Backend API is running' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
