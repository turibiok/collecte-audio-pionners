
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CorpusMatchingData from '../../constants/CorpusData';

export interface AudioUploadPayload {
  corpus_id: number;
  file: Blob;
}

export const useAudioUpload = () => {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [hasSentAudio, setHasSentAudio] = useState(false); // 👈 Nouveau state
  const [resetTrigger, setResetTrigger] = useState(0);
  
  const getInitialIndex = () => {
    const stored = localStorage.getItem('currentIndex');
    return stored ? parseInt(stored) : 0;
  };

  const [currentIndexState, setCurrentIndexState] = useState(getInitialIndex());

  useEffect(() => {
    localStorage.setItem('currentIndex', currentIndexState.toString());
  }, [currentIndexState]);

  const currentIndex = currentIndexState;

  const setCurrentIndex = (index: number) => {
    setCurrentIndexState(index);
  };

  const handleNext = () => {
    if (!hasSentAudio) {
      toast.error('❗️Veuillez enregistrer puis envoyer l’audio avant de continuer.');
      return;
    }
  };

  const handleRecordingComplete = (blob: Blob) => {
    setAudioBlob(blob);
    toast.success('🎤 Enregistrement terminé. Cliquez sur "Écouter" ou "Envoyer".');
  };

  const createFormData = <T extends Record<string, string | Blob>>(data: T): FormData => {
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

  useEffect(() => {
    setAudioBlob(null);
    setHasSentAudio(false);
  }, [currentIndex]);
  

  const handleSendAudio = async () => {
    if (!audioBlob) {
      toast.error('Veuillez enregistrer un audio.');
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      const formData = createFormData({
        corpus_id:(currentIndex + 1).toString(),
        file: audioBlob
      });

      const response = await fetch('https://collectpionner.ddns.net/api/upload-audio/', {
        method: 'POST',
        body: formData,
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
        setHasSentAudio(true);     // 👈 Marque l’audio comme envoyé



        // Mise à jour de l'index
        if (currentIndex < CorpusMatchingData.length - 1) {
          // Si l'index est 149, réinitialiser à 0
          const nextIndex = currentIndex + 1 === 149 ? 0 : currentIndex + 1;
          setCurrentIndex(nextIndex);

          setResetTrigger(prev => prev + 1);
          setAudioBlob(null);
          console.log(`Corpus ${nextIndex + 1} sur ${CorpusMatchingData.length}`);

          setHasSentAudio(false); // Réinitialise pour le suivant
        }




        if (currentIndex + 1 < CorpusMatchingData.length) {
          toast.success(`Vous êtes actuellement sur le corpus ${currentIndex + 2} sur ${CorpusMatchingData.length}`);
        } else {
          toast.success("✅ Tous les corpus ont été complétés !");
        }
        
        

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
    currentIndex,
    setCurrentIndex,
    handleNext,
    audioBlob,
    isLoading,
    uploadProgress,
    handleRecordingComplete,
    handleSendAudio,
    resetTrigger, //  Ajout du trigger pour le reset
  };
};
