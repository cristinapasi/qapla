/**
 * Klingon TTS Service
 * Uses boQwI' syllable audio files for authentic Klingon pronunciation
 */

/**
 * Convert Klingon standard orthography to XIFAN/boQwI' file naming convention
 *
 * Klingon → boQwI' encoding:
 * - a, e, I, o, u → a, e, i, o, u (I becomes lowercase i, with glottal stop at word boundaries)
 * - b → b
 * - ch → c
 * - D → d
 * - gh → g
 * - H → h
 * - j → j
 * - l → l
 * - m → m
 * - n, ng → n
 * - p → p
 * - Q → q (initial/medial) or x (final) - position-dependent
 * - r → r
 * - S → s
 * - tlh → t
 * - v → v
 * - w → w
 * - y → y
 * - ' → 0 (glottal stop, with fallback to z)
 */
export function klingonToXIFAN(klingonText: string): string {
  // Special case: standalone "'a'" (question suffix) should just be "a"
  klingonText = klingonText.replace(/\s+'a'\s+/g, ' a ');
  klingonText = klingonText.replace(/\s+'a'$/g, ' a');
  klingonText = klingonText.replace(/^'a'\s+/g, 'a ');
  klingonText = klingonText.replace(/^'a'$/g, 'a');

  // Process the string character by character, handling multi-character consonants
  let result = '';
  let i = 0;

  while (i < klingonText.length) {
    // Check for three-character sequence "tlh"
    if (i + 2 < klingonText.length && klingonText.substr(i, 3).toLowerCase() === 'tlh') {
      result += 't';
      i += 3;
      continue;
    }

    // Check for two-character sequences: "ch", "gh", "ng"
    if (i + 1 < klingonText.length) {
      const twoChar = klingonText.substr(i, 2).toLowerCase();
      if (twoChar === 'ch') {
        result += 'c';
        i += 2;
        continue;
      }
      if (twoChar === 'gh') {
        result += 'g';
        i += 2;
        continue;
      }
      if (twoChar === 'ng') {
        result += 'n';
        i += 2;
        continue;
      }
    }

    // Single character mappings
    const char = klingonText[i];
    switch (char) {
      case 'a':
      case 'e':
      case 'o':
      case 'u':
        result += char;
        break;
      case 'I':  // Uppercase I in Klingon
        // Check if this I is at word boundary (prefixes jI, bI, vI need glottal stop)
        const nextCharAfterI = i + 1 < klingonText.length ? klingonText[i + 1] : '';
        const isWordBoundary = nextCharAfterI === '' || nextCharAfterI === ' ' || /[^a-zA-Z']/.test(nextCharAfterI);
        result += isWordBoundary ? 'i0' : 'i';
        break;
      case 'b':
      case 'j':
      case 'l':
      case 'm':
      case 'n':
      case 'p':
      case 'r':
      case 'v':
      case 'w':
      case 'y':
        result += char;
        break;
      case 'D':  // Uppercase D in Klingon
        result += 'd';
        break;
      case 'H':  // Uppercase H in Klingon
        result += 'h';
        break;
      case 'Q':  // Uppercase Q in Klingon (position-dependent)
        // Initial/medial Q (Qong, Qe') → q
        // Final Q (bIQ, HIq) → x
        const nextChar = i + 1 < klingonText.length ? klingonText[i + 1] : '';
        const isWordFinal = nextChar === '' || nextChar === ' ' || /[^a-zA-Z']/.test(nextChar);
        result += isWordFinal ? 'x' : 'q';
        break;
      case 'S':  // Uppercase S in Klingon
        result += 's';
        break;
      case 't':  // Regular t (rare in Klingon, usually part of tlh)
        result += 't';
        break;
      case "'":  // Glottal stop
        result += '0';
        break;
      case ' ':  // Preserve spaces between words
        result += ' ';
        break;
      default:
        // Unknown character, keep as-is
        console.warn(`Unknown Klingon character: ${char}`);
        result += char;
    }
    i++;
  }

  return result;
}

/**
 * Parse Klingon text into syllables for audio file lookup
 * Since boQwI' has complete syllable files, we can split by spaces
 */
export function parseIntoSyllables(xifonText: string): string[] {
  // Split by spaces (each word is typically one syllable or can be looked up as a whole)
  return xifonText.trim().split(/\s+/).filter(s => s.length > 0);
}

/**
 * Klingon TTS Service
 * Plays audio using pre-recorded syllable files from boQwI'
 */
class KlingonTTSService {
  private audioContext: AudioContext | null = null;
  private audioBufferCache: Map<string, AudioBuffer> = new Map();
  private baseUrl = '/audio/klingon_normalized/';

  /**
   * Initialize the AudioContext (lazy initialization)
   */
  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  /**
   * Initialize audio context (must be called after user interaction on mobile)
   */
  async initialize(): Promise<void> {
    const ctx = this.getAudioContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
  }

  /**
   * Load an audio file and return its AudioBuffer
   * Handles glottal stop variants: tries '0' first, then 'z' as fallback
   */
  private async loadAudioFile(syllable: string): Promise<AudioBuffer | null> {
    // Check cache first
    if (this.audioBufferCache.has(syllable)) {
      return this.audioBufferCache.get(syllable)!;
    }

    try {
      const fileName = `audio_${syllable}.mp3`;
      const url = this.baseUrl + fileName;

      let response = await fetch(url);

      // If not found and syllable ends with '0' (glottal stop), try 'z' variant
      if (!response.ok && syllable.endsWith('0')) {
        const altSyllable = syllable.slice(0, -1) + 'z';
        const altFileName = `audio_${altSyllable}.mp3`;
        const altUrl = this.baseUrl + altFileName;

        response = await fetch(altUrl);

        if (response.ok) {
          console.log(`Using glottal stop variant: ${altFileName} for ${syllable}`);
          syllable = altSyllable; // Use the variant for caching
        }
      }

      if (!response.ok) {
        console.warn(`Audio file not found: audio_${syllable}.mp3`);
        return null;
      }

      const arrayBuffer = await response.arrayBuffer();
      const audioContext = this.getAudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // Cache the buffer
      this.audioBufferCache.set(syllable, audioBuffer);

      return audioBuffer;
    } catch (error) {
      console.error(`Failed to load audio for syllable: ${syllable}`, error);
      return null;
    }
  }

  /**
   * Play a sequence of audio buffers with slight overlap for natural sound
   */
  private async playAudioSequence(audioBuffers: AudioBuffer[]): Promise<void> {
    const audioContext = this.getAudioContext();
    const now = audioContext.currentTime;
    const gapBetweenSyllables = 0.05; // 50ms gap for natural concatenation

    let currentTime = now;

    for (const buffer of audioBuffers) {
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start(currentTime);

      // Schedule next syllable to start slightly before this one ends
      currentTime += buffer.duration - gapBetweenSyllables;
    }

    // Return a promise that resolves when all audio is complete
    const totalDuration = audioBuffers.reduce((sum, buf) => sum + buf.duration, 0);
    return new Promise(resolve => {
      setTimeout(resolve, totalDuration * 1000);
    });
  }

  /**
   * Speak a Klingon word or phrase
   */
  async speak(klingonText: string): Promise<void> {
    try {
      // Convert Klingon to XIFAN encoding
      const xifanText = klingonToXIFAN(klingonText);

      // Parse into syllables (words)
      const syllables = parseIntoSyllables(xifanText);

      // Load audio for each syllable
      const audioBuffers: AudioBuffer[] = [];
      for (const syllable of syllables) {
        const buffer = await this.loadAudioFile(syllable);
        if (buffer) {
          audioBuffers.push(buffer);
        } else {
          console.warn(`Missing audio for syllable: ${syllable} (from Klingon: ${klingonText})`);
        }
      }

      if (audioBuffers.length === 0) {
        console.error(`No audio available for: ${klingonText}`);
        return;
      }

      // Play the audio sequence
      await this.playAudioSequence(audioBuffers);

    } catch (error) {
      console.error('TTS playback error:', error);
    }
  }

  /**
   * Preload audio files for better performance
   */
  async preload(klingonWords: string[]): Promise<void> {
    for (const word of klingonWords) {
      const xifan = klingonToXIFAN(word);
      const syllables = parseIntoSyllables(xifan);
      for (const syllable of syllables) {
        await this.loadAudioFile(syllable);
      }
    }
  }

  /**
   * Clear the audio buffer cache
   */
  clearCache(): void {
    this.audioBufferCache.clear();
  }
}

// Export singleton instance
export const klingonTTS = new KlingonTTSService();
