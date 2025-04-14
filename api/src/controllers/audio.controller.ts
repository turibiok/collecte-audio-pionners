import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { error } from 'console';

interface AudioUploadBase64Body {
  audio_base64: string;
  corpus_id: string | number;
  file: string;
}

// Typage personnalisé de la requête
type AudioBase64Request = Request<{}, {}, AudioUploadBase64Body>;


export const uploadAudio = async (req: AudioBase64Request, res: Response ) => {
  
  try {
    const {corpus_id, file, audio_base64} = req.body;

    if (!corpus_id || !file || !audio_base64) {
      return res.status(400).json({
        success: false, 
        error: 'Champs manquants.'
      })
    }

    const buffer = Buffer.from(audio_base64, 'base64')

    const uploadDir = path.join(__dirname, '..', '..', 'all-audio', String(corpus_id));

    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, {recursive: true});

    const extension = path.extname(file);
    const safeFileName = `${Date.now()}-${Math.random().toString(36).substring(2,10)}${extension}`;

    const filePath = path.join(uploadDir, safeFileName);

    fs.writeFileSync(filePath, buffer);

    return res.status(200).json({
      success: true,
      message:"Audio encoded received and saved",
      path: filePath,
    })

  } catch (error) {
    console.error("Erreur upload base64 :", error)
    return res.status(500).json({
      success: false,
      error: "Internal Server Error"
    })
  }
}