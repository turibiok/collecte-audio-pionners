import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/AuthRoutes";
import chatRoutes from "./routes/chatRoutes";
import { EmailService } from "./services/EmailService";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  
// const to = "totonlionel@gmail.com";
// const firstName = "Lionel";
// const lastName = "TOTON";

// (async () => {
//     try {
//         const sent = await EmailService.sendWelcomeEmail(to, firstName, lastName);
//         sent ? console.log("Email sent") : console.log("Failed to send email");
//     } catch (error) {
//         console.log("Failed to send email:", error);
//     }
// })();

  console.log(`Serveur démarré sur le port ${PORT}`);
});
