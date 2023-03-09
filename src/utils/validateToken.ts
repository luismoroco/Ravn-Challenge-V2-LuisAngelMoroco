import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './tokens';
import { IPayload } from './interfaces';

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).json(`Access Denied! GET a Token`);
    return;
  }

  const { role, id } = verifyToken(token || '0x7') as IPayload;
  req.userIdentify = id;
  req.role = role;

  next();
};