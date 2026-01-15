'use client';

import { create } from 'zustand';

// Store for managing narration state
interface NarrationStore {
  isPlaying: boolean;
  currentText: string;
  audioEnabled: boolean;
  setPlaying: (playing: boolean) => void;
  setText: (text: string) => void;
  toggleAudio: () => void;
}

export const useNarrationStore = create<NarrationStore>((set) => ({
  isPlaying: false,
  currentText: '',
  audioEnabled: false, // Default to off for better UX
  setPlaying: (playing) => set({ isPlaying: playing }),
  setText: (text) => set({ currentText: text }),
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
}));

// Audio context singleton
let audioContext: AudioContext | null = null;
let currentSource: AudioBufferSourceNode | null = null;
let speechSynthesisUtterance: SpeechSynthesisUtterance | null = null;

// Initialize audio context
const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;

  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      console.warn('Web Audio API not supported');
      return null;
    }
  }

  // Resume if suspended (required by browsers)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  return audioContext;
};

// Stop any current narration
export const stopNarration = () => {
  const store = useNarrationStore.getState();
  store.setPlaying(false);

  // Stop Web Audio
  if (currentSource) {
    try {
      currentSource.stop();
    } catch {
      // Ignore already stopped error
    }
    currentSource = null;
  }

  // Stop Speech Synthesis
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  speechSynthesisUtterance = null;
};

// Play narration using browser Speech Synthesis (fallback, always available)
const playBrowserTTS = async (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      reject(new Error('Speech synthesis not available'));
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;

    // Try to find a good voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        v.name.includes('Daniel') ||
        v.name.includes('Alex') ||
        v.name.includes('Google') ||
        v.lang.startsWith('en')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      useNarrationStore.getState().setPlaying(false);
      resolve();
    };

    utterance.onerror = (e) => {
      useNarrationStore.getState().setPlaying(false);
      reject(e);
    };

    speechSynthesisUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  });
};

// Main narration function
export const playNarration = async (text: string): Promise<void> => {
  const store = useNarrationStore.getState();

  // Always update text for subtitle display
  store.setText(text);

  // Only play audio if enabled
  if (!store.audioEnabled) {
    return;
  }

  // Stop any existing narration
  stopNarration();

  store.setPlaying(true);

  // For now, use browser TTS (can be enhanced with Google AI later)
  try {
    await playBrowserTTS(text);
  } catch (error) {
    console.warn('TTS playback failed:', error);
    store.setPlaying(false);
  }
};

// Component for narration controls and subtitle display
export const NarrationControls: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isPlaying, currentText, audioEnabled, toggleAudio } = useNarrationStore();

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 ${className}`}>
      {/* Subtitle display */}
      {currentText && (
        <div className="mb-4 max-w-2xl mx-auto px-6 py-3 bg-surface/90 backdrop-blur-lg rounded-2xl border border-white/10">
          <p className="text-white/80 text-center text-sm md:text-base leading-relaxed">
            {currentText}
          </p>
        </div>
      )}

      {/* Audio toggle button */}
      <button
        onClick={toggleAudio}
        className={`mx-auto flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
          audioEnabled
            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
            : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10'
        }`}
      >
        {audioEnabled ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        )}
        <span className="text-xs font-medium">
          {audioEnabled ? 'Audio On' : 'Audio Off'}
        </span>
        {isPlaying && (
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        )}
      </button>
    </div>
  );
};

// Import React for the component
import React from 'react';
