export interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  resetTrigger : number; // Trigger to reset the recorder
}

export interface AudioRecorderState {
  isRecording: boolean;
  mediaRecorder: MediaRecorder | null;
  audioChunks: Blob[];
  timer: number;
}