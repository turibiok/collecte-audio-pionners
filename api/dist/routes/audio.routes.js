"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../utils/multer"));
const audio_controller_1 = require("../controllers/audio.controller");
const router = (0, express_1.Router)();
router.post('/upload-audio', multer_1.default.single('file'), audio_controller_1.uploadAudio);
exports.default = router;
