"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const audio_routes_1 = __importDefault(require("./routes/audio.routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
// CORS avec toutes les origines autorisées (sécurisé uniquement en local ou dev)
app.use((0, cors_1.default)({
    origin: ['https://collecte-audio-pionners.vercel.app/', 'http://localhost:5173/'], // Autorise toutes les origines
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express_1.default.json());
// Routes
app.use('/api', audio_routes_1.default);
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
