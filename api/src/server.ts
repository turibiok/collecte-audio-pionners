import express from 'express';
import audioRoutes from './routes/audio.routes';
import cors from 'cors';

const app = express();

// Autorise la détection du proxy
app.set('trust proxy', true);

// Utilisation du port provenant de l'environnement sinon 3000 par défaut
const PORT = process.env.PORT || 5100;

// CORS avec toutes les origines autorisées (pour dev uniquement, à adapter en prod)
app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Routes
app.use('/api', audioRoutes);

// Démarre le serveur
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
