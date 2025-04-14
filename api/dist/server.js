"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const audio_routes_1 = __importDefault(require("./routes/audio.routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Autorise la détection du proxy
app.set('trust proxy', true);
// Utilisation du port provenant de l'environnement sinon 3000 par défaut
const PORT = process.env.PORT || 3000;
// CORS avec toutes les origines autorisées (pour dev uniquement, à adapter en prod)
app.use((0, cors_1.default)({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express_1.default.json());
// Routes
app.use('/api', audio_routes_1.default);
// Démarre le serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
