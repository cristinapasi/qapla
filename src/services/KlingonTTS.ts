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
      case 'I':  // Uppercase I in Klingon — always gets glottal stop (it's always syllable-final)
        result += 'i0';
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
    console.log('KlingonTTS AudioContext state:', ctx.state);
    if (ctx.state === 'suspended') {
      console.log('Resuming suspended AudioContext...');
      await ctx.resume();
      console.log('AudioContext resumed, new state:', ctx.state);
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
   * Try to load a token, falling back to splitting it at every possible
   * boundary if the whole token has no audio file.
   * Always tries longest match first to avoid false splits (e.g. q+oy0 instead of qoyz).
   */
  private async resolveTokenToBuffers(token: string): Promise<AudioBuffer[]> {
    // Always try the full token first (loadAudioFile handles 0→z glottal fallback)
    const full = await this.loadAudioFile(token);
    if (full) return [full];

    // Try splitting at each position, longest left part first
    for (let split = token.length - 1; split >= 1; split--) {
      const left = token.slice(0, split);
      const right = token.slice(split);
      const leftBuf = await this.loadAudioFile(left);
      if (!leftBuf) continue;
      const rightBuf = await this.loadAudioFile(right);
      if (rightBuf) return [leftBuf, rightBuf];
    }

    // Try three-way splits as last resort
    for (let a = token.length - 2; a >= 1; a--) {
      for (let b = token.length - 1; b > a; b--) {
        const p1 = token.slice(0, a);
        const p2 = token.slice(a, b);
        const p3 = token.slice(b);
        const [b1, b2, b3] = await Promise.all([
          this.loadAudioFile(p1),
          this.loadAudioFile(p2),
          this.loadAudioFile(p3),
        ]);
        if (b1 && b2 && b3) return [b1, b2, b3];
      }
    }

    console.warn(`No audio found for token: ${token}`);
    return [];
  }

  /**
   * Speak a Klingon word or phrase
   */
  async speak(klingonText: string): Promise<void> {
    try {
      const xifanText = klingonToXIFAN(klingonText);
      const tokens = parseIntoSyllables(xifanText);

      const audioBuffers: AudioBuffer[] = [];
      for (const token of tokens) {
        const buffers = await this.resolveTokenToBuffers(token);
        audioBuffers.push(...buffers);
      }

      if (audioBuffers.length === 0) {
        console.error(`No audio available for: ${klingonText}`);
        return;
      }

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
