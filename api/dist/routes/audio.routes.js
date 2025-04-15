"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../utils/multer"));
const audio_controller_1 = require("../controllers/audio.controller");
const wrapController_1 = require("../middlewares/wrapController");
const router = (0, express_1.Router)();
router.post('/upload-audio', multer_1.default.single('file'), (0, wrapController_1.wrapController)(audio_controller_1.uploadAudio));
router.get('/test', (req, res) => {
    res.send('API is alive!');
});
exports.default = router;
