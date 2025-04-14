import { Router } from 'express';
import multer from '../utils/multer';
import { uploadAudio } from '../controllers/audio.controller';
import { wrapController } from '../middlewares/wrapController';

const router = Router();

router.post('/upload-audio', multer.single('file'), wrapController(uploadAudio));

router.get('/test', (req, res) => {
    res.send('API is alive!');
    }
);

export default router;