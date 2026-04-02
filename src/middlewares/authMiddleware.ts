import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET as string;
        
        if (!token) {
            return res.status(401).json({ error: 'Token malformé' });
        }

        if (!secret && process.env.NODE_ENV === 'production') {
            return res.status(500).json({ error: 'Configuration serveur incomplète' });
        }

        jwt.verify(token, secret || 'fallback_secret', (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Token invalide' });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: 'Autorisation refusée, token manquant' });
  }
};
