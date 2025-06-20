import { useCallback, useState } from 'react';

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const playAudio = useCallback((url: string) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const audio = new Audio(url);
    setCurrentAudio(audio);
    setIsPlaying(true);

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentAudio(null);
    });

    audio.addEventListener('error', () => {
      setIsPlaying(false);
      setCurrentAudio(null);
      console.error('Audio playback failed');
    });

    audio.play().catch(() => {
      setIsPlaying(false);
      setCurrentAudio(null);
    });
  }, [currentAudio]);

  const stopAudio = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlaying(false);
      setCurrentAudio(null);
    }
  }, [currentAudio]);

  // Text-to-speech function for English pronunciation
  const speakText = useCallback((text: string, lang: string = 'en-US') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    }
  }, []);

  return {
    isPlaying,
    playAudio,
    stopAudio,
    speakText
  };
}
