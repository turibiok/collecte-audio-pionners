import { useState } from 'react';
import toast from 'react-hot-toast';
import { Corpus } from '../../types';

export interface AudioUploadPayload {
  corpus_id: number;
  audio_base64: string;
  file: string;
}

export const useAudioUpload = () => {
  const [selectedCorpus, setSelectedCorpus] = useState<Corpus | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleRecordingComplete = (blob: Blob) => {
    setAudioBlob(blob);
    toast.success('🎤 Enregistrement terminé. Cliquez sur "Écouter" ou "Envoyer".');
  };

  const handleSendAudio = async () => {
    if (!audioBlob || !selectedCorpus) {
      toast.error('Veuillez sélectionner un corpus et enregistrer un audio.');
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      const base64Audio = await blobToBase64(audioBlob);

      const payload: AudioUploadPayload = {
        corpus_id: selectedCorpus.id,
        audio_base64: base64Audio,
        file: 'recording.wav',
      };

      const response = await fetch('http://localhost:3000/api/upload-audio/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      for (let i = 1; i <= 100; i += 10) {
        await new Promise((res) => setTimeout(res, 50));
        setUploadProgress(i);
      }

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      if (data.success) {
        toast.success('✅ Audio envoyé avec succès.');
        setAudioBlob(null);
      } else {
        throw new Error(data.error || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('❌ Erreur lors de l\'envoi de l\'audio');
    } finally {
      setIsLoading(false);
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          resolve(result.split(',')[1]);
        } else {
          reject(new Error('Impossible de convertir le blob'));
        }
      };
      reader.readAsDataURL(blob);
    });
  };

  return {
    selectedCorpus,
    setSelectedCorpus,
    audioBlob,
    isLoading,
    uploadProgress,
    handleRecordingComplete,
    handleSendAudio,
  };
};
