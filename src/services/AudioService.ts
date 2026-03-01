/**
 * AudioService - Handles all audio playback
 * Uses boQwI' Klingon TTS for authentic pronunciation
 */

import { SoundEffectType } from '../types/models';
import { soundEffects } from './SoundEffects';
import { klingonTTS } from './KlingonTTS';

/**
 * Audio Service Interface
 * Abstracts audio playback to allow future implementation swapping
 */
export interface IAudioService {
  speakWord(klingonText: string): Promise<void>;
  speakSentence(klingonText: string): Promise<void>;
  playSFX(type: SoundEffectType): void;
  setMuted(muted: boolean): void;
  isMuted(): boolean;
  initialize(): Promise<void>;
}

/**
 * Klingon TTS Implementation using boQwI' audio files
 */
class AudioService implements IAudioService {
  private muted: boolean = false;

  /**
   * Speak a single Klingon word using authentic boQwI' TTS
   */
  async speakWord(klingonText: string): Promise<void> {
    if (this.muted) {
      return;
    }

    try {
      await klingonTTS.speak(klingonText);
    } catch (error) {
      console.error('Failed to speak word:', klingonText, error);
    }
  }

  /**
   * Speak a full Klingon sentence
   */
  async speakSentence(klingonText: string): Promise<void> {
    if (this.muted) {
      return;
    }

    try {
      await klingonTTS.speak(klingonText);
    } catch (error) {
      console.error('Failed to speak sentence:', klingonText, error);
    }
  }

  /**
   * Play UI sound effect using Tone.js
   */
  playSFX(type: SoundEffectType): void {
    if (this.muted) {
      return;
    }

    soundEffects.play(type);
  }

  /**
   * Mute/unmute all sounds
   */
  setMuted(muted: boolean): void {
    this.muted = muted;
  }

  /**
   * Check if audio is muted
   */
  isMuted(): boolean {
    return this.muted;
  }

  /**
   * Initialize audio contexts (must be called after user interaction on mobile)
   */
  async initialize(): Promise<void> {
    try {
      await klingonTTS.initialize();
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  /**
   * Preload audio for better performance
   */
  async preloadVocabulary(klingonWords: string[]): Promise<void> {
    try {
      await klingonTTS.preload(klingonWords);
    } catch (error) {
      console.error('Failed to preload vocabulary:', error);
    }
  }
}

// Export singleton instance
export const audioService = new AudioService();
