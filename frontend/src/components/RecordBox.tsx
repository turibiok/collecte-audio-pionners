
import AudioRecorder from './AudioRecorder';
import { useAudioUpload } from './hooks/useAudioUpload';
import { Headphones } from 'lucide-react';
import AudioPlayer from './AudioPlayer';
import CorpusMatchingData from '../constants/CorpusData';


function RecordBox() {
  const {
    currentIndex,
    handleNext,
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

        <label className="block text-gray-700 mb-2">Lisez le corpus :</label>

        
        <div className="flex flex-col items-center justify-end mb-6 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all">
          <div className="flex flex-col items-center space-x-3">
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-semibold">{currentIndex + 1}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-700 font-bold">Corpus actuel</span>
              <span className="text-sm text-blue-500">
                {CorpusMatchingData.length - currentIndex - 1} corpus restants
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 max-w-[200px]">
            {Array.from({ length: CorpusMatchingData.length }).map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full cursor-pointer transition-all ${index <= currentIndex ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                onClick={() => index < currentIndex && handleNext()}
                title={`Corpus ${index + 1}`}
              />
            ))}
          </div>
        </div>


        <div className="mb-6">
          <h3 className="font-medium mb-2">Corpus actuel :</h3>
          <div className="p-4 bg-gray-50 rounded-md text-gray-700 shadow-sm">
            {CorpusMatchingData[currentIndex]}
          </div>
        </div>

        <AudioRecorder onRecordingComplete={handleRecordingComplete} />

        {audioBlob && (
          <div className="py-2 border-[0.5px] border-slate-200 mt-4 space-x-4 w-full rounded-2xl flex flex-col items-center justify-center">
            <AudioPlayer audioBlob={audioBlob} />

            <button
              onClick={handleSendAudio}
              disabled={isLoading}
              className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md ${isLoading ? 'bg-green-400 cursor-wait' : ''
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

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            disabled={currentIndex >= CorpusMatchingData.length - 1}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed transform active:scale-95 transition-transform"
          >
            Suivant
          </button>
        </div>

      </div>
    </div>
  );
}

export default RecordBox;
