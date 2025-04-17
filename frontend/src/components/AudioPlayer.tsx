// import { useEffect, useMemo, useRef, useState } from 'react';
// import { Play, Pause } from 'lucide-react';

// interface AudioPlayerProps {
//   audioBlob: Blob;
// }

// export default function AudioPlayer({ audioBlob }: AudioPlayerProps) {
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const audioUrl = useMemo(() => URL.createObjectURL(audioBlob), [audioBlob]);

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.load(); // Recharge la source
//     }
//   }, [audioBlob]);


//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     let animationFrameId: number;

//     const updateProgress = () => {
//       if (audio && audio.duration) {
//         setProgress((audio.currentTime / audio.duration) * 100);
//       }
//       animationFrameId = requestAnimationFrame(updateProgress);
//     };

//     if (isPlaying) {
//       animationFrameId = requestAnimationFrame(updateProgress);
//     }

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, [isPlaying]);



//   const togglePlayPause = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (isPlaying) {
//       audio.pause();
//     } else {
//       audio.play();
//     }

//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <div className="w-full flex items-center gap-4 p-2">


//       <button
//         onClick={togglePlayPause}
//         aria-label={isPlaying ? "Pause" : "Play"}
//         className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white 
//     shadow-[inset_0_-2px_4px_rgba(0,0,0,0.4),_0_6px_10px_rgba(0,0,0,0.3)]
//     hover:shadow-[inset_0_2px_2px_rgba(255,255,255,0.2),_0_8px_14px_rgba(0,0,0,0.4)]
//     active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]
//     active:translate-y-1 transition-all duration-150 ease-in-out
//     flex items-center justify-center group relative"
//       >
//         <div className="absolute inset-0 rounded-full bg-white opacity-5 pointer-events-none" />
//         {isPlaying ? (
//           <Pause className="w-6 h-6 z-10 transition-transform group-hover:scale-110" strokeWidth={2.5} />
//         ) : (
//           <Play className="w-6 h-6 z-10 ml-0.5 transition-transform group-hover:scale-110" strokeWidth={2.5} />
//         )}
//       </button>

//       <div className="flex-1 h-3 bg-gray-100 rounded-full shadow-inner overflow-hidden">
//         <div
//           className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-in-out"
//           style={{ width: `${progress}%` }}
//         />
//       </div>

//       <audio
//         ref={audioRef}
//         src={audioUrl}
//         preload="metadata"
//         hidden
//         onError={() => console.error("Erreur lors du chargement de l'audio")}
//       />
//     </div>
//   );
// }


































import { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  audioBlob: Blob;
}

export default function AudioPlayer({ audioBlob }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioUrl = useMemo(() => URL.createObjectURL(audioBlob), [audioBlob]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [audioBlob]);

  // Mise à jour de la barre de progression via l'événement 'timeupdate'
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
    }
    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  // Gestion de la fin du son
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full flex items-center gap-4 p-2">
      <button
        onClick={togglePlayPause}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white 
        shadow-[inset_0_-2px_4px_rgba(0,0,0,0.4),_0_6px_10px_rgba(0,0,0,0.3)]
        hover:shadow-[inset_0_2px_2px_rgba(255,255,255,0.2),_0_8px_14px_rgba(0,0,0,0.4)]
        active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]
        active:translate-y-1 transition-all duration-150 ease-in-out
        flex items-center justify-center group relative"
      >
        <div className="absolute inset-0 rounded-full bg-white opacity-5 pointer-events-none" />
        {isPlaying ? (
          <Pause className="w-6 h-6 z-10 transition-transform group-hover:scale-110" strokeWidth={2.5} />
        ) : (
          <Play className="w-6 h-6 z-10 ml-0.5 transition-transform group-hover:scale-110" strokeWidth={2.5} />
        )}
      </button>

      <div className="flex-1 h-3 bg-gray-100 rounded-full shadow-inner overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        hidden
        onError={() => console.error("Erreur lors du chargement de l'audio")}
      />
    </div>
  );
}









































// useEffect(() => {
//   const audio = audioRef.current;
//   if (!audio) return;

//   const updateProgress = () => {
//     if (audio.duration) {
//       setProgress((audio.currentTime / audio.duration) * 100);
//     }
//   };

//   const handleEnded = () => {
//     setIsPlaying(false);
//     setProgress(0);
//   };

//   audio.addEventListener('timeupdate', updateProgress);
//   audio.addEventListener('ended', handleEnded);

//   return () => {
//     audio.removeEventListener('timeupdate', updateProgress);
//     audio.removeEventListener('ended', handleEnded);
//   };
// }, []);