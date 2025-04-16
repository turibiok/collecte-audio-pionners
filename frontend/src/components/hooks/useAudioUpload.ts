import { useState } from 'react';
import toast from 'react-hot-toast';
import { Corpus } from '../../types';

export interface AudioUploadPayload {
  corpus_id: number;
  file: Blob; // ou File si tu veux plus de précision
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

  const createFormData = <T extends Record<string, string | Blob>>(
    data: T
  ): FormData => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Blob) {
        formData.append(key, value, 'file.wav');
      } else {
        formData.append(key, value);
      }
    });
    return formData;
  };
  
  

  const handleSendAudio = async () => {
    if (!audioBlob || !selectedCorpus) {
      toast.error('Veuillez sélectionner un corpus et enregistrer un audio.');
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      const formData = createFormData({
        corpus_id: selectedCorpus.id.toString(),
        file: audioBlob
      });

      // const response = await fetch('http://localhost:5100/api/upload-audio/', {
      const response = await fetch('https://collectpionner.ddns.net/api/upload-audio/', {

        method: 'POST',
        body: formData, // PAS de Content-Type ici, le navigateur le gère
      });

      // Simulation de la progression
      for (let i = 1; i <= 100; i += 10) {
        await new Promise((res) => setTimeout(res, 50));
        setUploadProgress(i);
      }

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      if (!data) throw new Error('Aucune réponse du serveur');
      if (data.error) throw new Error(data.error);

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
