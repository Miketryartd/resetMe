import jwt from  'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const jwt_secret_key = process.env.JWT_SUPER_SUPER_SECRET_SECRET_KEY_KIY as string;

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, jwt_secret_key);

        (req as any).user = decoded;

        next();

    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired, please login again' });
        }
        return res.status(401).json({ error: 'Invalid token' });
    }
};