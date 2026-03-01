/**
 * SoundEffects - UI sound effects using Tone.js
 * Non-speech audio for user interactions
 */

import * as Tone from 'tone';
import { SoundEffectType } from '../types/models';

/**
 * Sound Effects Manager
 */
class SoundEffects {
  private synth: Tone.Synth | null = null;
  private polySynth: Tone.PolySynth | null = null;
  private initialized: boolean = false;

  constructor() {
    // Synths will be created after Tone.start() is called
  }

  /**
   * Create synthesizers (must be called after Tone.start())
   */
  private createSynths(): void {
    if (this.synth && this.polySynth) return;

    this.synth = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 0.1,
      },
    }).toDestination();

    this.polySynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: {
        attack: 0.005,
        decay: 0.2,
        sustain: 0.3,
        release: 0.3,
      },
    }).toDestination();

    console.log('Synthesizers created and connected to destination');
  }

  /**
   * Initialize audio context (must be called after user interaction)
   */
  private async ensureInitialized(): Promise<void> {
    if (this.initialized) {
      console.log('Tone.js already initialized');
      return;
    }

    try {
      console.log('Starting Tone.js...');
      await Tone.start();
      this.initialized = true;
      console.log('Tone.js started successfully, context state:', Tone.context.state);

      // Create synths after context is running
      this.createSynths();
    } catch (error) {
      console.error('Failed to initialize Tone.js:', error);
    }
  }

  /**
   * Play a sound effect
   */
  async play(type: SoundEffectType): Promise<void> {
    await this.ensureInitialized();

    if (!this.synth || !this.polySynth) {
      console.error('Synthesizers not initialized');
      return;
    }

    const now = Tone.now();

    switch (type) {
      case 'flip':
        // Card flip: Short sine blip (D5, 32nd note)
        this.synth.triggerAttackRelease('D5', '32n', now);
        console.log('Playing flip sound');
        break;

      case 'click':
        // Tile tap: Gentle click (A4, 32nd note)
        this.synth.triggerAttackRelease('A4', '32n', now);
        console.log('Playing click sound');
        break;

      case 'correct':
        // Correct answer: Rising triad (C5 → E5 → G5)
        this.synth.triggerAttackRelease('C5', '16n', now);
        this.synth.triggerAttackRelease('E5', '16n', now + 0.1);
        this.synth.triggerAttackRelease('G5', '16n', now + 0.2);
        console.log('Playing correct sound');
        break;

      case 'wrong':
        // Wrong answer: Descending minor (E3 → Eb3, sawtooth)
        const sawtoothSynth = new Tone.Synth({
          oscillator: { type: 'sawtooth' },
        }).toDestination();
        sawtoothSynth.triggerAttackRelease('E3', '8n', now);
        sawtoothSynth.triggerAttackRelease('Eb3', '8n', now + 0.15);
        console.log('Playing wrong sound');
        break;

      case 'complete':
        // Phase complete: Resolved chord (C4+E4+G4+C5, sustained)
        this.polySynth.triggerAttackRelease(['C4', 'E4', 'G4', 'C5'], '4n', now);
        console.log('Playing complete sound');
        break;

      case 'levelup':
        // Rank up: Ascending fanfare (C5 → E5 → G5 → C6, with delay)
        this.synth.triggerAttackRelease('C5', '8n', now);
        this.synth.triggerAttackRelease('E5', '8n', now + 0.15);
        this.synth.triggerAttackRelease('G5', '8n', now + 0.3);
        this.synth.triggerAttackRelease('C6', '4n', now + 0.45);
        console.log('Playing levelup sound');
        break;

      case 'sparkle':
        // XP gain: Quick sparkle (high sine, very short)
        const highSynth = new Tone.Synth({
          oscillator: { type: 'sine' },
          envelope: {
            attack: 0.001,
            decay: 0.05,
            sustain: 0,
            release: 0.05,
          },
        }).toDestination();
        highSynth.triggerAttackRelease('A6', '64n', now);
        console.log('Playing sparkle sound');
        break;

      default:
        console.warn(`Unknown sound effect: ${type}`);
    }
  }
}

// Export singleton instance
export const soundEffects = new SoundEffects();
