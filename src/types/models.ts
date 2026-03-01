/**
 * Qapla' - Type Definitions
 * Core data models for the application
 */

// ============================================================================
// CORE VOCABULARY PIECES
// ============================================================================

export type PieceType =
  | "verb"
  | "noun"
  | "adj"
  | "prefix"
  | "suffix"
  | "time"
  | "question"
  | "phrase";

export type AttachBehavior =
  | "standalone"      // This is a separate word (e.g., nouns, verbs)
  | "attach-before"   // Attaches to following piece (e.g., prefixes)
  | "attach-after";   // Attaches to preceding piece (e.g., suffixes)

export interface KlingonPiece {
  id: string;                    // unique ID, e.g. "v_sop", "pfx_ji", "sfx_daq"
  tlh: string;                   // Klingon text as displayed
  en: string;                    // English meaning
  type: PieceType;
  phonetic: string;              // phonetic pronunciation string
  audioFile?: string;            // path to audio file (future use)
  moduleIntroduced: number;      // which module introduces this piece
  category: "brick" | "mortar";  // content vs. structural
  attachBehavior: AttachBehavior;
  usageHint?: string;            // optional hint for flashcard back
}

// ============================================================================
// BUILD EXERCISE (SENTENCE CONSTRUCTOR)
// ============================================================================

export interface BuildTile {
  text: string;              // display text of the tile, e.g. "jI", "Sop", "Daq"
  attachRight: boolean;      // does this tile attach to the next tile (no space)?
  attachLeft: boolean;       // does this tile attach to the previous tile (no space)?
}

export interface BuildExercise {
  id: string;
  moduleId: number;
  englishPrompt: string;            // "I eat at the restaurant."
  tiles: BuildTile[];               // the pieces the user must arrange
  correctAnswer: string;            // "Qe'Daq jISop" — the expected output string
  phonetic: string;                 // "KHEH-DAKH, JEE-SHOP"
  audioFile?: string;
  literalTranslation?: string;      // literal word-by-word translation
  explanation?: string;             // optional grammar note shown after correct answer
}

// ============================================================================
// QUIZ QUESTIONS
// ============================================================================

export type QuizQuestionType =
  | "tlh-to-en"           // Klingon → English
  | "en-to-tlh"           // English → Klingon
  | "audio-recognition"   // Play audio, pick English meaning
  | "fill-gap";           // Complete sentence with correct word

export interface QuizQuestion {
  id: string;
  moduleId: number;
  type: QuizQuestionType;
  question: string;             // the question text or audio reference
  options: string[];            // 4 options
  correctIndex: number;         // index of correct option (0-3)
  phonetic?: string;            // phonetic for any Klingon in the question
  klingonText?: string;         // for audio questions, store the Klingon text
}

// ============================================================================
// CHUNKED LEARNING
// ============================================================================

export interface LearningChunk {
  id: string;                      // "chunk-1", "chunk-2", "chunk-3"
  title: string;                   // "Basic Actions", "Movement & Places", etc.
  vocabularyIds: string[];         // IDs of KlingonPieces in this chunk, e.g. ["v_sop", "v_tlhutlh", ...]
  buildExerciseIds: string[];      // IDs of BuildExercises for this chunk, e.g. ["m1_ex_001", "m1_ex_002"]
}

export interface ChunkProgress {
  moduleId: number;
  chunkId: string;
  learnCompleted: boolean;
  buildCompleted: boolean;
  lastAccessed: number;            // timestamp
}

// ============================================================================
// USER PROGRESS
// ============================================================================

export interface UserProgress {
  xp: number;
  currentRank: number;
  modulesCompleted: Record<string, boolean>;        // "1-learn", "1-build", "1-quiz", "1-sandbox", etc.
  chunkProgress: Record<string, ChunkProgress>;     // "1-chunk-1" → ChunkProgress
  streak: number;                                   // current streak within a phase
  sentencesBuilt: number;                           // lifetime count for sandbox
  uniqueSentencesBuilt: Set<string>;                // unique combinations in sandbox
  wordConfidence: Record<string, number>;           // word ID → confidence 0-5 for spaced repetition
  quizScores: Record<number, number>;               // moduleId → best percentage
  lastUpdated: number;                              // timestamp
}

// ============================================================================
// RANK SYSTEM
// ============================================================================

export interface Rank {
  xp: number;
  tlh: string;
  en: string;
  icon: string;
}

export const RANKS: Rank[] = [
  { xp: 0, tlh: "tlhIngan Hol chu'wI'", en: "Klingon Newcomer", icon: "🌑" },
  { xp: 50, tlh: "ghojwI'", en: "Student", icon: "🌒" },
  { xp: 150, tlh: "paQDI'norgh ghajwI'", en: "Knowledge Holder", icon: "🌓" },
  { xp: 300, tlh: "Hol pIn", en: "Language Expert", icon: "🌔" },
  { xp: 500, tlh: "Hol po'wI'", en: "Language Master", icon: "🌕" },
  { xp: 750, tlh: "Hol qoq", en: "Language Legend", icon: "⭐" },
];

// ============================================================================
// MODULE STRUCTURE
// ============================================================================

export interface Module {
  id: number;
  titleEn: string;
  titleTlh: string;
  theme: string;
  color: string;
  chunks?: LearningChunk[];          // Optional: for chunked learning modules
  bricks: KlingonPiece[];            // Full vocabulary for reference/lookup
  mortar: KlingonPiece[];            // Full grammar pieces for reference/lookup
  buildExercises: BuildExercise[];   // Full exercise list for reference/lookup
  quizQuestions: QuizQuestion[];     // Quiz questions (always comprehensive)
}

// ============================================================================
// PHASE TYPES
// ============================================================================

export type PhaseType = "learn" | "build" | "quiz" | "sandbox";

export interface PhaseCompletion {
  moduleId: number;
  phase: PhaseType;
  completed: boolean;
  score?: number;  // for quiz
}

// ============================================================================
// SOUND EFFECT TYPES
// ============================================================================

export type SoundEffectType =
  | "flip"      // Card flip
  | "click"     // Tile tap
  | "correct"   // Correct answer
  | "wrong"     // Wrong answer
  | "complete"  // Phase complete
  | "levelup"   // Rank up
  | "sparkle";  // XP gain

// ============================================================================
// VIEW TYPES (for routing/navigation)
// ============================================================================

export type ViewType =
  | "dashboard"
  | "lesson"
  | "master-review";

export interface AppState {
  currentView: ViewType;
  currentModule: number | null;
  currentPhase: PhaseType | null;
  progress: UserProgress;
  soundMuted: boolean;
}
