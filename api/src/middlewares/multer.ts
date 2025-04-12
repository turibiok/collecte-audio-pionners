import multer from 'multer';
import path from 'path';

const tempUploadDir = path.join(__dirname, '..', '..', 'temp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempUploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

export default upload;
