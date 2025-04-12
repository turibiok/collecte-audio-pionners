"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAudio = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadAudio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file || !req.body.corpus_id) {
            res.status(400).json({ success: false, error: 'Fichier ou corpus_id manquant.' });
            return;
        }
        const corpusId = req.body.corpus_id;
        const audioFile = req.file;
        const uploadPath = path_1.default.join(__dirname, '..', '..', 'all-audio', corpusId);
        if (!fs_1.default.existsSync(uploadPath)) {
            fs_1.default.mkdirSync(uploadPath, { recursive: true });
        }
        const randomFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${audioFile.originalname.split('.').pop()}`;
        const filePath = path_1.default.join(uploadPath, randomFileName);
        // const filePath = path.join(uploadPath, audioFile.originalname);
        fs_1.default.renameSync(audioFile.path, filePath);
        res.status(200).json({ success: true, message: 'Audio bien reçu.', path: filePath });
    }
    catch (error) {
        console.error('Erreur lors du traitement de l\'audio :', error);
        res.status(500).json({ success: false, error: 'Erreur serveur' });
    }
});
exports.uploadAudio = uploadAudio;
