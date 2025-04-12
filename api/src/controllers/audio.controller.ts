import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';


export const uploadAudio = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file || !req.body.corpus_id) {
      res.status(400).json({ success: false, error: 'Fichier ou corpus_id manquant.' });
      return;
    }

    const corpusId = req.body.corpus_id;
    const audioFile = req.file;

    const uploadPath = path.join(__dirname, '..', '..', 'all-audio', corpusId);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    const randomFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${audioFile.originalname.split('.').pop()}`;
    const filePath = path.join(uploadPath, randomFileName);
    // const filePath = path.join(uploadPath, audioFile.originalname);

    fs.renameSync(audioFile.path, filePath);

    res.status(200).json({ success: true, message: 'Audio bien reçu.', path: filePath });
  } catch (error) {
    console.error('Erreur lors du traitement de l\'audio :', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
};