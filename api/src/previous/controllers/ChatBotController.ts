import { Request, Response } from "express";
import ChatBotService from "../services/ChatBotService";
class ChatBotController {
    static async ask(req: Request, res: Response): Promise<void> {
        try {
            const { prompt } = req.body;
            if (!prompt) {
                res.status(400).json({ message: "Le prompt est requis." });
                return;
            }
            
            const response = await ChatBotService.getResponse(prompt);
            res.status(200).json({ response });
        } catch (error) {
            console.error("Erreur dans ChatBotController.ask", error);
            res.status(500).json({ message: "Erreur interne du serveur." });
        }
    }
}

export default ChatBotController;
