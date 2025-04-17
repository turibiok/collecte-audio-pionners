
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
    resetTrigger,
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

        


<div className="flex flex-col items-center justify-end mb-6 p-5 bg-white/70 backdrop-blur-md rounded-2xl shadow-[0_2px_6px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all">
  <div className="flex flex-col items-center space-y-2">
    <div className="h-9 w-9 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
      <span className="text-green-600 font-semibold text-sm">{currentIndex + 1}</span>
    </div>

    <div className="text-center">
      <span className="text-gray-600 font-semibold">Corpus actuel</span>
      <div className="text-xs text-blue-500 mt-1 tracking-wide">
        {CorpusMatchingData.length - currentIndex - 1} restants
      </div>
    </div>
  </div>

  <div className="flex flex-wrap items-center gap-2 max-w-[200px] mt-4">
    {Array.from({ length: CorpusMatchingData.length }).map((_, index) => (
      <div
        key={index}
        className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-all duration-200 ease-in-out
          ${index === currentIndex
            ? 'bg-green-500 scale-110'
            : index < currentIndex
            ? 'bg-green-300 hover:scale-105'
            : 'bg-gray-200'
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

        <AudioRecorder onRecordingComplete={handleRecordingComplete} resetTrigger={resetTrigger} />

        {audioBlob && (
          <div className="py-2 border-[0.5px] border-slate-200 mt-4 space-x-4 w-full rounded-2xl flex flex-col items-center justify-center">
            <AudioPlayer audioBlob={audioBlob} />

         

<button
  onClick={handleSendAudio}
  disabled={isLoading}
  className={`relative flex items-center justify-center px-6 py-3 rounded-full font-medium text-white
    transition-all duration-150 ease-in-out
    ${
      isLoading
        ? 'bg-green-400 cursor-wait shadow-inner'
        : 'bg-gradient-to-br from-green-500 to-green-700 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3),_0_6px_10px_rgba(0,0,0,0.25)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),_0_8px_14px_rgba(0,0,0,0.35)] hover:translate-y-[-1px] active:translate-y-[1px] active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]'
    }`}
>
  {isLoading ? (
    <>
      <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Envoi en cours...
    </>
  ) : (
    'Envoyer l’audio'
  )}
</button>


            {isLoading && (
              <div className="mt-2">
                <progress value={uploadProgress} max="100" className="w-full h-3 rounded"></progress>
              </div>
            )}
          </div>
        )}

        {/* <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            disabled={currentIndex >= CorpusMatchingData.length - 1}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed transform active:scale-95 transition-transform"
          >
            Suivant
          </button>
        </div> */}

        <div className="mt-6 flex justify-end">
  <button
    onClick={handleNext}
    disabled={currentIndex >= CorpusMatchingData.length - 1}
    className={`relative flex items-center justify-center px-6 py-3 rounded-full font-medium text-white transition-all duration-150 ease-in-out
      ${
        currentIndex >= CorpusMatchingData.length - 1
          ? 'bg-gray-400 cursor-not-allowed shadow-inner'
          : 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3),_0_6px_10px_rgba(0,0,0,0.25)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),_0_8px_14px_rgba(0,0,0,0.35)] hover:translate-y-[-1px] active:translate-y-[1px] active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]'
      }`}
  >
    Suivant
  </button>
</div>


      </div>
    </div>
  );
}

export default RecordBox;
