
import Select from 'react-select';
import AudioRecorder from './AudioRecorder';
import { useAudioUpload } from './hooks/useAudioUpload';
import { Headphones } from 'lucide-react';
import AudioPlayer from './AudioPlayer';

const CORPUS_DATA = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  text: `Corpus ${i + 1}`,
}));


function RecordBox() {
  const {
    selectedCorpus,
    setSelectedCorpus,
    audioBlob,
    isLoading,
    uploadProgress,
    handleRecordingComplete,
    handleSendAudio,
  } = useAudioUpload();

  return (
    <div className="h-auto w-[80vw] md:h-1/2 md:w-1/2 bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Headphones className="w-8 h-8 text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800">Collecte Audio</h1>
      </div>

      <div className="mb-4 text-sm text-gray-600">Utilisation de la mémoire : 148 Mo</div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Envoyez un enregistrement audio pour le modèle</h2>

        <label className="block text-gray-700 mb-2">Choisissez un corpus :</label>
        <Select
          options={CORPUS_DATA.map(corpus => ({ value: corpus.id, label: corpus.text }))}
          onChange={(option) => option && setSelectedCorpus(CORPUS_DATA[option.value - 1])}
          className="mb-6 w-full"
          placeholder="Sélectionnez un corpus..."
        />

        {selectedCorpus && (
          <div className="mb-6">
            <h3 className="font-medium mb-2">Corpus sélectionné :</h3>
            <div className="p-4 bg-gray-50 rounded-md text-gray-700 shadow-sm">
              Pas de tassement vertébral ni d'érosion des plateaux vertébraux. Respect du mur
              vertébral postérieur Pincement inter-vertébral C6-C7. Ostéophytes corporéaux étagés
              de C4 à C7. Canal cervical de taille normale. Uncarthrose C6-C7 droite avec
              rétrécissement foraminal secondaire.
            </div>
          </div>
        )}

        <AudioRecorder onRecordingComplete={handleRecordingComplete} />

        {audioBlob && (
          <div className="py-2 border-[0.5px] border-slate-200 mt-4 space-x-4 w-full rounded-2xl flex flex-col items-center justify-center">
            <AudioPlayer audioBlob={audioBlob} />
            
            <button
              onClick={handleSendAudio}
              disabled={isLoading}
              className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md ${
                isLoading ? 'bg-green-400 cursor-wait' : ''
              }`}
            >
              {isLoading ? 'Envoi en cours...' : "Envoyer l'audio"}
            </button>

            {isLoading && (
              <div className="mt-2">
                <progress value={uploadProgress} max="100" className="w-full h-3 rounded"></progress>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

export default RecordBox;
