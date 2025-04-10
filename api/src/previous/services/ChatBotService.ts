import OpenAI from "openai";

import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class ChatBotService {
  static async getResponse(prompt: string): Promise<string> {
    try {
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct", 
        prompt,
        max_tokens: 150,
        temperature: 0.7,
      });
      return response.choices[0].text?.trim() || "";
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API OpenAI", error);
      throw error;
    }
  }
}

export default ChatBotService;
