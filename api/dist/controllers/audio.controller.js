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
        const { corpus_id, file, audio_base64 } = req.body;
        if (!corpus_id || !file || !audio_base64) {
            return res.status(400).json({
                success: false,
                error: 'Champs manquants.'
            });
        }
        const buffer = Buffer.from(audio_base64, 'base64');
        const uploadDir = path_1.default.join(__dirname, '..', '..', 'all-audio', String(corpus_id));
        if (!fs_1.default.existsSync(uploadDir))
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        const extension = path_1.default.extname(file);
        const safeFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}${extension}`;
        const filePath = path_1.default.join(uploadDir, safeFileName);
        fs_1.default.writeFileSync(filePath, buffer);
        return res.status(200).json({
            success: true,
            message: "Audio encoded received and saved",
            path: filePath,
        });
    }
    catch (error) {
        console.error("Erreur upload base64 :", error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
});
exports.uploadAudio = uploadAudio;
