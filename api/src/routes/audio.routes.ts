import { Router } from 'express';
import multer from '../utils/multer';
import { uploadAudio, uploadMiddleware } from '../controllers/audio.controller';
import { wrapController } from '../middlewares/wrapController';

const router = Router();

// router.post('/upload-audio', multer.single('file'), wrapController(uploadAudio));

router.post('/upload-audio', uploadMiddleware, wrapController(uploadAudio));


router.get('/test', (req, res) => {
    res.send('API is alive!');
    }
);

export default router;