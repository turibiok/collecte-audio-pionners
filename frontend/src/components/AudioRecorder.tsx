// import React, { useState, useRef, useEffect } from 'react';
// import { Mic, Square } from 'lucide-react';
// import { AudioRecorderProps, AudioRecorderState } from '../types';

// const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecordingComplete, resetTrigger }) => {

//   useEffect(() => {
//     // Quand resetTrigger change, on reset le timer
//     setState(prev => ({ ...prev, timer: 0 }));
//   }, [resetTrigger]);

//   const [state, setState] = useState<AudioRecorderState>({
//     isRecording: false,
//     mediaRecorder: null,
//     audioChunks: [],
//     timer: 0,
//   });

//   const timerRef = useRef<ReturnType<typeof setInterval>>();

//   useEffect(() => {
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, []);

//   const handleStartClick = () => {
//     navigator.mediaDevices.getUserMedia({ audio: true })
//       .then((stream) => {
//         const mediaRecorder = new MediaRecorder(stream);
//         const audioChunks: Blob[] = [];

//         mediaRecorder.ondataavailable = (event) => {
//           audioChunks.push(event.data);
//         };

//         mediaRecorder.onstop = () => {
//           const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
//           onRecordingComplete(audioBlob);
//         };

//         mediaRecorder.start();

//         timerRef.current = setInterval(() => {
//           setState((prev) => ({ ...prev, timer: prev.timer + 1 }));
//         }, 1000);

//         setState({ isRecording: true, mediaRecorder, audioChunks, timer: 0 });
//       })
//       .catch((error) => {
//         console.error('Erreur d’accès au micro', error);
//       });
//   };


//   const stopRecording = () => {
//     if (state.mediaRecorder && state.isRecording) {
//       state.mediaRecorder.stop();
//       state.mediaRecorder.stream.getTracks().forEach(track => track.stop());
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//       setState(prev => ({ ...prev, isRecording: false }));
//     }
//   };

//   const formatTime = (seconds: number): string => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="flex flex-col items-center gap-4">
//       <div className="flex gap-4">

//         {!state.isRecording ? (
//           <button
//             onClick={handleStartClick}
//             className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white font-medium
//       bg-gradient-to-br from-green-500 to-green-700
//       shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3),_0_6px_10px_rgba(0,0,0,0.25)]
//       hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),_0_8px_14px_rgba(0,0,0,0.35)]
//       active:translate-y-1 active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]
//       transition-all duration-150 ease-in-out relative"
//           >
//             <div className="absolute inset-0 rounded-full bg-white opacity-5 pointer-events-none" />
//             <Mic size={20} className="z-10" />
//             <span className="z-10">Démarrer</span>
//           </button>
//         ) : (
//           <button
//             onClick={stopRecording}
//             className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white font-medium
//       bg-gradient-to-br from-red-500 to-red-700
//       shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3),_0_6px_10px_rgba(0,0,0,0.25)]
//       hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),_0_8px_14px_rgba(0,0,0,0.35)]
//       active:translate-y-1 active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]
//       transition-all duration-150 ease-in-out relative"
//           >
//             <div className="absolute inset-0 rounded-full bg-white opacity-5 pointer-events-none" />
//             <Square size={20} className="z-10" />
//             <span className="z-10">Stop</span>
//           </button>
//         )}


//       </div>
//       <div className="text-xl font-mono">{formatTime(state.timer)}</div>
//     </div>
//   );
// };

// export default AudioRecorder;



















































import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square } from 'lucide-react';
import { AudioRecorderProps, AudioRecorderState } from '../types';

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecordingComplete, resetTrigger }) => {
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    mediaRecorder: null,
    audioChunks: [],
    timer: 0,
  });

  const timerRef = useRef<NodeJS.Timeout>();

  // Reset timer when resetTrigger changes
  useEffect(() => {
    setState((prev) => ({ ...prev, timer: 0 }));
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [resetTrigger]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleStartClick = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks: Blob[] = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          onRecordingComplete(audioBlob);
        };

        mediaRecorder.start();

        timerRef.current = setInterval(() => {
          setState((prev) => ({ ...prev, timer: prev.timer + 1 }));
        }, 1000);

        setState({
          isRecording: true,
          mediaRecorder,
          audioChunks,
          timer: 0,
        });
      })
      .catch((error) => {
        console.error('Erreur d’accès au micro', error);
      });
  };

  const stopRecording = () => {
    if (state.mediaRecorder && state.isRecording) {
      state.mediaRecorder.stop();
      state.mediaRecorder.stream.getTracks().forEach((track) => track.stop());

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      setState((prev) => ({ ...prev, isRecording: false }));
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        {!state.isRecording ? (
          <button
            onClick={handleStartClick}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white font-medium
              bg-gradient-to-br from-green-500 to-green-700
              shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3),_0_6px_10px_rgba(0,0,0,0.25)]
              hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),_0_8px_14px_rgba(0,0,0,0.35)]
              active:translate-y-1 active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]
              transition-all duration-150 ease-in-out relative"
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-5 pointer-events-none" />
            <Mic size={20} className="z-10" />
            <span className="z-10">Démarrer</span>
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white font-medium
              bg-gradient-to-br from-red-500 to-red-700
              shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3),_0_6px_10px_rgba(0,0,0,0.25)]
              hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),_0_8px_14px_rgba(0,0,0,0.35)]
              active:translate-y-1 active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]
              transition-all duration-150 ease-in-out relative"
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-5 pointer-events-none" />
            <Square size={20} className="z-10" />
            <span className="z-10">Stop</span>
          </button>
        )}
      </div>
      <div className="text-xl font-mono">{formatTime(state.timer)}</div>
    </div>
  );
};

export default AudioRecorder;
