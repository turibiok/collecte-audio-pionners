import express from 'express';
import audioRoutes from './routes/audio.routes';
import cors from 'cors';

const app = express();
const PORT = 3000;

// CORS avec toutes les origines autorisées (sécurisé uniquement en local ou dev)
app.use(cors({
  origin: ['https://collecte-audio-pionners.vercel.app/', 'http://localhost:5173/'], // Autorise toutes les origines
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Routes
app.use('/api', audioRoutes);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
