import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class AuthMiddleware {
  public static authenticateToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.header("Authorization")?.split(" ")[1]; // Bearer Token
    if (!token) {
      res.status(401).json({ message: "Accès refusé" });
      return;
    }

    try {
      const secret = process.env.JWT_SECRET as string;
      const decoded = jwt.verify(token, secret);
      (req as any).user = decoded;
      next(); // On passe au middleware suivant
    } catch (error) {
      res.status(403).json({ message: "Token invalide" });
      return;
    }
  }
}