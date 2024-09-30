import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export function verificarAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]; // Ex: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'defaultSecret';
    const payload = jwt.verify(token, secret) as any;

    // Verifica se o usuário é administrador
    if (!payload.is_adm) {
      return res.status(403).json({ mensagem: 'Acesso negado: você não é um administrador' });
    }

    // Usuário é administrador, permite acesso
    next();
  } catch (error) {
    return res.status(403).json({ mensagem: 'Token inválido ou expirado' });
  }
}
