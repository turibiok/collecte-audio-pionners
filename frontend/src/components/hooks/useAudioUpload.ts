// import { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import CorpusMatchingData from '../../constants/CorpusData';

// export interface AudioUploadPayload {
//   corpus_id: number;
//   file: Blob; // ou File si tu veux plus de précision
// }

// export const useAudioUpload = () => {
//   const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const getInitialIndex = () => {
//     const stored = localStorage.getItem('currentIndex');
//     return stored ? parseInt(stored) : 0;
//   };

//   const [currentIndexState, setCurrentIndexState] = useState(getInitialIndex());

//   useEffect(() => {
//     localStorage.setItem('currentIndex', currentIndexState.toString());
//   }, [currentIndexState]);
  
//   const currentIndex = currentIndexState;
  
//   const setCurrentIndex = (index: number) => {
//     setCurrentIndexState(index);
//   };
  
//   // const handleNext = () => {
//   //   if (currentIndex < CorpusMatchingData.length - 1) {
//   //     setCurrentIndex(currentIndex + 1);
//   //   }
//   // };

//   const handleNext = () => {
//     if (audioBlob == null) {
//       toast.error("❌ Vous devez envoyer l'audio avant de continuer.");
//       return;
//     }
  
//     if (currentIndex < CorpusMatchingData.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };
  

//   const handleRecordingComplete = (blob: Blob) => {
//     setAudioBlob(blob);
//     toast.success('🎤 Enregistrement terminé. Cliquez sur "Écouter" ou "Envoyer".');
//   };

//   const createFormData = <T extends Record<string, string | Blob>>(
//     data: T
//   ): FormData => {
//     const formData = new FormData();
//     Object.entries(data).forEach(([key, value]) => {
//       if (value instanceof Blob) {
//         formData.append(key, value, 'file.wav');
//       } else {
//         formData.append(key, value);
//       }
//     });
//     return formData;
//   };
  
//   const handleSendAudio = async () => {
//     if (!audioBlob ) {
//       toast.error('Veuillez enregistrer un audio.');
//       return;
//     }

//     setIsLoading(true);

//     setUploadProgress(0);

//     try {
//       const formData = createFormData({
//         corpus_id: currentIndex.toString(),
//         file: audioBlob
//       });

//       // const response = await fetch('http://localhost:5100/api/upload-audio/', {
//       const response = await fetch('https://collectpionner.ddns.net/api/upload-audio/', {

//         method: 'POST',
//         body: formData, // PAS de Content-Type ici, le navigateur le gère
//       });

//       // Simulation de la progression
//       for (let i = 1; i <= 100; i += 10) {
//         await new Promise((res) => setTimeout(res, 50));
//         setUploadProgress(i);
//       }

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();

//       if (!data) throw new Error('Aucune réponse du serveur');

//       if (data.error) throw new Error(data.error);

            

//       if (data.success) {
//         toast.success('✅ Audio envoyé avec succès.');
//         setAudioBlob(null); // <-- important pour valider l'envoi
//       } else {
//         throw new Error(data.error || 'Erreur lors de l\'envoi');
//       }
//     } catch (error) {
//       console.error('Erreur:', error);
//       toast.error('❌ Erreur lors de l\'envoi de l\'audio');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {

//     currentIndex,
//     setCurrentIndex,
//     handleNext,
//     audioBlob,
//     isLoading,
//     uploadProgress,
//     handleRecordingComplete,
//     handleSendAudio,
//   };
// };



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

    if (currentIndex < CorpusMatchingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAudioBlob(null);           // Réinitialise l'audio pour le suivant
      setHasSentAudio(false);       // 👈 Réinitialise pour le suivant
    }
  };

  const handleRecordingComplete = (blob: Blob) => {
    setAudioBlob(blob);
    handleNext(); // Appelle handleNext ici pour avancer après l'enregistrement
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

  const handleSendAudio = async () => {
    if (!audioBlob) {
      toast.error('Veuillez enregistrer un audio.');
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      const formData = createFormData({
        corpus_id: currentIndex.toString(),
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
  };
};
