export interface Corpus {
  id: number;
  text: string;
}

export interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
}

export interface AudioRecorderState {
  isRecording: boolean;
  mediaRecorder: MediaRecorder | null;
  audioChunks: Blob[];
  timer: number;
}