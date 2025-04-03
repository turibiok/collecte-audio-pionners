import React, { useState } from 'react';
import { Headphones } from 'lucide-react';
import Select from 'react-select';
import AudioRecorder from './components/AudioRecorder';
import { Corpus } from './types';

const CORPUS_DATA: Corpus[] = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  text: `Corpus ${i + 1}`
}));

function App() {
  const [selectedCorpus, setSelectedCorpus] = useState<Corpus | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<string>('');
  const [memoryUsage, setMemoryUsage] = useState<string>('148 Mo');

  const handleRecordingComplete = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.wav');
      if (selectedCorpus) {
        formData.append('corpus_id', selectedCorpus.id.toString());
      }

      const response = await fetch('http://localhost:8000/upload-audio/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        setRecordingStatus('Audio envoyé avec succès');
      } else {
        throw new Error(data.error || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Error uploading audio:', error);
      setRecordingStatus('Erreur lors de l\'envoi de l\'audio');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-600">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Headphones className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">Collecte Audio</h1>
          </div>

          <div className="mb-4 text-sm text-gray-600">
            Utilisation de la mémoire : {memoryUsage}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Envoyez un enregistrement audio pour le modèle
            </h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Choisissez un corpus :</label>
              <Select
                options={CORPUS_DATA.map(corpus => ({
                  value: corpus.id,
                  label: corpus.text
                }))}
                onChange={(option) => {
                  if (option) {
                    setSelectedCorpus(CORPUS_DATA[option.value - 1]);
                  }
                }}
                className="w-full"
                placeholder="Sélectionnez un corpus..."
              />
            </div>

            {selectedCorpus && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Corpus sélectionné :</h3>
                <div className="p-4 bg-gray-50 rounded-md text-gray-700">
                  Pas de tassement vertébral ni d'érosion des plateaux vertébraux. 
                  Respect du mur vertébral postérieur Pincement inter-vertébral C6-C7. 
                  Ostéophytes corporéaux étagés de C4 à C7. Canal cervical de taille normale. 
                  Uncarthrose C6-C7 droite avec rétrécissement foraminal secondaire.
                </div>
              </div>
            )}

            <AudioRecorder onRecordingComplete={handleRecordingComplete} />
          </div>

          {recordingStatus && (
            <div className={`mt-4 p-3 rounded ${
              recordingStatus.includes('succès') 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {recordingStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;