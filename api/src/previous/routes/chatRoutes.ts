import { Router } from "express";
import ChatBotController from "../controllers/ChatBotController";
import { Request, Response } from "express";

const router = Router();

router.post("/chat", ChatBotController.ask);

export default router;
