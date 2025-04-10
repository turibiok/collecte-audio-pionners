import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";


export class AuthController {
  public static async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "Tous les champs sont requis" });
        return;
      }

      const result = await AuthService.register(email, password);
      res.status(201).json({ message: result });
      return

    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return
      }
       res.status(500).json({ message: "Erreur interne du serveur" });
       return
    }
  }

  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "Tous les champs sont requis" });
        return
      }

      const result = await AuthService.login(email, password);
      res.json(result);
      return

    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return
      }
      res.status(500).json({ message: "Erreur interne du serveur" });
      return
    }
  }

  public static async profile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        res.status(401).json({ message: "Utilisateur non authentifié" });
        return
      }

      const user = await AuthService.getUserProfile(userId);
      res.json(user);
      return

    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
        return
      }
      res.status(500).json({ message: "Erreur interne du serveur" });
      return
    }
  }
}
