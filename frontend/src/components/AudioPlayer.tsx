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
      audioRef.current.load(); // Recharge la source
    }
  }, [audioBlob]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full flex items-center gap-4 p-2">
      <button
        onClick={togglePlayPause}
        className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow"
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>

      <div className="flex-1 h-2 bg-gray-200 rounded">
        <div
          className="h-full bg-blue-500 rounded"
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
