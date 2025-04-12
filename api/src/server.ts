import express from 'express';
import audioRoutes from './routes/audio.routes';
import cors from 'cors';

const app = express();
const PORT = 3000;


// Autorise toutes les origines (à sécuriser plus tard)
app.use(cors({
  origin: '*', // ou précise ['http://localhost:5173', 'https://collectpionner.sublimworld.com']
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));


app.use(cors());
app.use(express.json());

// Routes
app.use('/api', audioRoutes);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

