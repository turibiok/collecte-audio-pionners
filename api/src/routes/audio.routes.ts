import { Router } from 'express';
import multer from '../utils/multer';
import { uploadAudio } from '../controllers/audio.controller';

const router = Router();

router.post('/upload-audio', multer.single('file'), uploadAudio);

export default router;
