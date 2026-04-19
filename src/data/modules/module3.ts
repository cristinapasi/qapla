/**
 * Module 3: Social Life — "Talk, Meet & Connect"
 * Theme: Communication, greetings, and social interactions
 */

import { Module, KlingonPiece, BuildExercise, QuizQuestion, LearningChunk } from '../../types/models';

// ============================================================================
// BRICKS (Content Words)
// ============================================================================

const bricks: KlingonPiece[] = [
  {
    id: 'm3_v_jatlh',
    tlh: 'jatlh',
    en: 'speak, say',
    type: 'verb',
    phonetic: 'JATL',
    moduleIntroduced: 3,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'To speak or say something',
    showExample: true,
    exampleSentence: 'jIjatlh',
    exampleTranslation: 'I speak',
  },
  {
    id: 'm3_v_ghel',
    tlh: 'ghel',
    en: 'ask',
    type: 'verb',
    phonetic: 'GHEL',
    moduleIntroduced: 3,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'To ask a question',
  },
  {
    id: 'm3_v_ja',
    tlh: "ja'",
    en: 'tell',
    type: 'verb',
    phonetic: 'JAH',
    moduleIntroduced: 3,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'To tell or report to someone',
  },
  {
    id: 'm3_v_tlhij',
    tlh: 'tlhIj',
    en: 'apologize',
    type: 'verb',
    phonetic: 'TLEE-IJ',
    moduleIntroduced: 3,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Express regret or sorry',
  },
  {
    id: 'm3_v_qoy',
    tlh: "qoy'",
    en: 'hear',
    type: 'verb',
    phonetic: 'KHOY',
    moduleIntroduced: 3,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'To hear or listen to',
  },
  {
    id: 'm3_v_legh',
    tlh: 'legh',
    en: 'see',
    type: 'verb',
    phonetic: 'LEGH',
    moduleIntroduced: 3,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'To see or observe',
    showExample: true,
    exampleSentence: 'vIlegh',
    exampleTranslation: 'I see it',
  },
  {
    id: 'm3_v_Sov',
    tlh: 'Sov',
    en: 'know',
    type: 'verb',
    phonetic: 'SHOV',
    moduleIntroduced: 3,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'To know a fact or person',
  },
  {
    id: 'm3_v_qeq',
    tlh: 'qeq',
    en: 'practice, train',
    type: 'verb',
    phonetic: 'KHEKH',
    moduleIntroduced: 3,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'To practice or drill a skill',
  },
  {
    id: 'm3_n_tlhIngan',
    tlh: 'tlhIngan',
    en: 'Klingon (person)',
    type: 'noun',
    phonetic: 'TLEE-NGAN',
    moduleIntroduced: 3,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'A Klingon individual',
  },
  {
    id: 'm3_n_hol',
    tlh: 'Hol',
    en: 'language',
    type: 'noun',
    phonetic: 'HOL',
    moduleIntroduced: 3,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'A language or tongue',
  },
];

// ============================================================================
// MORTAR (Structural Pieces)
// ============================================================================

const mortar: KlingonPiece[] = [
  {
    id: 'm3_pfx_mu',
    tlh: 'mu',
    en: 'he/she/they → me',
    type: 'prefix',
    phonetic: 'MOO',
    moduleIntroduced: 3,
    category: 'mortar',
    attachBehavior: 'attach-before',
    usageHint: 'Third person acts on me',
  },
  {
    id: 'm3_pfx_nu',
    tlh: 'nu',
    en: 'he/she/they → us',
    type: 'prefix',
    phonetic: 'NOO',
    moduleIntroduced: 3,
    category: 'mortar',
    attachBehavior: 'attach-before',
    usageHint: 'Third person acts on us',
  },
  {
    id: 'm3_sfx_wij',
    tlh: 'wIj',
    en: 'my (possession)',
    type: 'suffix',
    phonetic: 'WEEJ',
    moduleIntroduced: 3,
    category: 'mortar',
    attachBehavior: 'attach-after',
    usageHint: 'Attaches to nouns to show ownership (my)',
    showExample: true,
    exampleSentence: 'HolwIj',
    exampleTranslation: 'my language',
  },
  {
    id: 'm3_sfx_lIj',
    tlh: 'lIj',
    en: 'your (possession)',
    type: 'suffix',
    phonetic: 'LEEJ',
    moduleIntroduced: 3,
    category: 'mortar',
    attachBehavior: 'attach-after',
    usageHint: 'Attaches to nouns to show ownership (your)',
  },
];

// ============================================================================
// LEARNING CHUNKS
// ============================================================================

const chunk1Exercises: BuildExercise[] = [
  {
    id: 'm3_ex_c1_1',
    moduleId: 3,
    englishPrompt: 'I speak.',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'jatlh', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jIjatlh',
    phonetic: 'JEE-JATL',
    literalTranslation: 'I speak',
    explanation: 'jI- for intransitive "I" + jatlh (speak)',
  },
  {
    id: 'm3_ex_c1_2',
    moduleId: 3,
    englishPrompt: 'You speak.',
    tiles: [
      { text: 'bI', attachRight: true, attachLeft: false },
      { text: 'jatlh', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'bIjatlh',
    phonetic: 'BEE-JATL',
    literalTranslation: 'you speak',
  },
  {
    id: 'm3_ex_c1_3',
    moduleId: 3,
    englishPrompt: 'I see it.',
    tiles: [
      { text: 'vI', attachRight: true, attachLeft: false },
      { text: 'legh', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'vIlegh',
    phonetic: 'VEE-LEGH',
    literalTranslation: 'I-it see',
  },
  {
    id: 'm3_ex_c1_4',
    moduleId: 3,
    englishPrompt: 'You see it.',
    tiles: [
      { text: 'Da', attachRight: true, attachLeft: false },
      { text: 'legh', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'Dalegh',
    phonetic: 'DAH-LEGH',
    literalTranslation: 'you-it see',
  },
  {
    id: 'm3_ex_c1_5',
    moduleId: 3,
    englishPrompt: 'I hear it.',
    tiles: [
      { text: 'vI', attachRight: true, attachLeft: false },
      { text: "qoy'", attachRight: false, attachLeft: true },
    ],
    correctAnswer: "vIqoy'",
    phonetic: 'VEE-KHOY',
    literalTranslation: 'I-it hear',
  },
  {
    id: 'm3_ex_c1_6',
    moduleId: 3,
    englishPrompt: 'He tells me.',
    tiles: [
      { text: 'mu', attachRight: true, attachLeft: false },
      { text: "ja'", attachRight: false, attachLeft: true },
    ],
    correctAnswer: "muja'",
    phonetic: 'MOO-JAH',
    literalTranslation: 'he-me tell',
    explanation: 'mu- is the prefix when someone else acts on me',
  },
  {
    id: 'm3_ex_c1_7',
    moduleId: 3,
    englishPrompt: 'I ask.',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'ghel', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jIghel',
    phonetic: 'JEE-GHEL',
    literalTranslation: 'I ask',
  },
  {
    id: 'm3_ex_c1_8',
    moduleId: 3,
    englishPrompt: 'I apologize.',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'tlhIj', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jItlhIj',
    phonetic: 'JEE-TLEE-IJ',
    literalTranslation: 'I apologize',
  },
];

const chunk2Exercises: BuildExercise[] = [
  {
    id: 'm3_ex_c2_1',
    moduleId: 3,
    englishPrompt: 'I know it.',
    tiles: [
      { text: 'vI', attachRight: true, attachLeft: false },
      { text: 'Sov', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'vISov',
    phonetic: 'VEE-SHOV',
    literalTranslation: 'I-it know',
  },
  {
    id: 'm3_ex_c2_2',
    moduleId: 3,
    englishPrompt: 'You know it.',
    tiles: [
      { text: 'Da', attachRight: true, attachLeft: false },
      { text: 'Sov', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'DaSov',
    phonetic: 'DAH-SHOV',
    literalTranslation: 'you-it know',
  },
  {
    id: 'm3_ex_c2_3',
    moduleId: 3,
    englishPrompt: 'My language.',
    tiles: [
      { text: 'Hol', attachRight: true, attachLeft: false },
      { text: 'wIj', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'HolwIj',
    phonetic: 'HOL-WEEJ',
    literalTranslation: 'language-my',
    explanation: '-wIj attaches to nouns to mean "my"',
  },
  {
    id: 'm3_ex_c2_4',
    moduleId: 3,
    englishPrompt: 'Your language.',
    tiles: [
      { text: 'Hol', attachRight: true, attachLeft: false },
      { text: 'lIj', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'HollIj',
    phonetic: 'HOL-LEEJ',
    literalTranslation: 'language-your',
  },
  {
    id: 'm3_ex_c2_5',
    moduleId: 3,
    englishPrompt: 'I practice.',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'qeq', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jIqeq',
    phonetic: 'JEE-KHEKH',
    literalTranslation: 'I practice',
  },
  {
    id: 'm3_ex_c2_6',
    moduleId: 3,
    englishPrompt: 'I know the Klingon.',
    tiles: [
      { text: 'tlhIngan', attachRight: false, attachLeft: false },
      { text: 'vI', attachRight: true, attachLeft: false },
      { text: 'Sov', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'tlhIngan vISov',
    phonetic: 'TLEE-NGAN, VEE-SHOV',
    literalTranslation: 'Klingon I-know',
    explanation: 'Object comes before the verb in Klingon',
  },
  {
    id: 'm3_ex_c2_7',
    moduleId: 3,
    englishPrompt: 'They tell us.',
    tiles: [
      { text: 'nu', attachRight: true, attachLeft: false },
      { text: "ja'", attachRight: false, attachLeft: true },
    ],
    correctAnswer: "nuja'",
    phonetic: 'NOO-JAH',
    literalTranslation: 'they-us tell',
    explanation: 'nu- is the prefix when they act on us',
  },
  {
    id: 'm3_ex_c2_8',
    moduleId: 3,
    englishPrompt: 'I speak Klingon.',
    tiles: [
      { text: 'tlhIngan', attachRight: false, attachLeft: false },
      { text: 'Hol', attachRight: false, attachLeft: false },
      { text: 'vI', attachRight: true, attachLeft: false },
      { text: 'jatlh', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'tlhIngan Hol vIjatlh',
    phonetic: 'TLEE-NGAN, HOL, VEE-JATL',
    literalTranslation: 'Klingon language I-speak',
    explanation: 'tlhIngan Hol means "the Klingon language"',
  },
];

const chunks: LearningChunk[] = [
  {
    id: 'chunk-1',
    title: 'Speaking & Sensing',
    vocabularyIds: ['m3_v_jatlh', 'm3_v_ghel', 'm3_v_ja', 'm3_v_tlhij', 'm3_v_qoy', 'm3_v_legh', 'm3_pfx_mu'],
    buildExerciseIds: ['m3_ex_c1_1', 'm3_ex_c1_2', 'm3_ex_c1_3', 'm3_ex_c1_4', 'm3_ex_c1_5', 'm3_ex_c1_6', 'm3_ex_c1_7', 'm3_ex_c1_8'],
  },
  {
    id: 'chunk-2',
    title: 'Knowledge & Language',
    vocabularyIds: ['m3_v_Sov', 'm3_v_qeq', 'm3_n_tlhIngan', 'm3_n_hol', 'm3_sfx_wij', 'm3_sfx_lIj', 'm3_pfx_nu'],
    buildExerciseIds: ['m3_ex_c2_1', 'm3_ex_c2_2', 'm3_ex_c2_3', 'm3_ex_c2_4', 'm3_ex_c2_5', 'm3_ex_c2_6', 'm3_ex_c2_7', 'm3_ex_c2_8'],
  },
];

const buildExercises: BuildExercise[] = [...chunk1Exercises, ...chunk2Exercises];

// ============================================================================
// QUIZ QUESTIONS
// ============================================================================

const quizQuestions: QuizQuestion[] = [
  {
    id: 'm3_quiz_1',
    moduleId: 3,
    type: 'tlh-to-en',
    question: 'What does this mean?',
    klingonText: 'jIjatlh',
    options: ['I speak', 'I hear', 'I see', 'I ask'],
    correctIndex: 0,
  },
  {
    id: 'm3_quiz_2',
    moduleId: 3,
    type: 'tlh-to-en',
    question: 'What does this mean?',
    klingonText: 'vIlegh',
    options: ['I hear it', 'I see it', 'I know it', 'I tell it'],
    correctIndex: 1,
  },
  {
    id: 'm3_quiz_3',
    moduleId: 3,
    type: 'tlh-to-en',
    question: 'What does this mean?',
    klingonText: 'HolwIj',
    options: ['my language', 'your language', 'the Klingon', 'I speak'],
    correctIndex: 0,
  },
  {
    id: 'm3_quiz_4',
    moduleId: 3,
    type: 'en-to-tlh',
    question: 'I apologize',
    options: ['jIjatlh', 'jItlhIj', 'jIghel', 'jIqeq'],
    correctIndex: 1,
  },
  {
    id: 'm3_quiz_5',
    moduleId: 3,
    type: 'en-to-tlh',
    question: 'I know it',
    options: ['vIlegh', "vIqoy'", 'vISov', 'vIjatlh'],
    correctIndex: 2,
  },
  {
    id: 'm3_quiz_6',
    moduleId: 3,
    type: 'en-to-tlh',
    question: 'He tells me',
    options: ["muja'", "nuja'", "vIja'", "Daja'"],
    correctIndex: 0,
  },
  {
    id: 'm3_quiz_7',
    moduleId: 3,
    type: 'audio-recognition',
    question: 'What does this word mean?',
    klingonText: 'jatlh',
    options: ['speak', 'ask', 'hear', 'know'],
    correctIndex: 0,
  },
  {
    id: 'm3_quiz_8',
    moduleId: 3,
    type: 'audio-recognition',
    question: 'What does this word mean?',
    klingonText: 'tlhIngan',
    options: ['language', 'Klingon (person)', 'practice', 'see'],
    correctIndex: 1,
  },
  {
    id: 'm3_quiz_9',
    moduleId: 3,
    type: 'en-to-tlh',
    question: 'Your language',
    options: ['HolwIj', 'HollIj', 'tlhIngan Hol', 'jIjatlh'],
    correctIndex: 1,
  },
  {
    id: 'm3_quiz_10',
    moduleId: 3,
    type: 'tlh-to-en',
    question: 'What does this mean?',
    klingonText: 'tlhIngan Hol vIjatlh',
    options: ['I hear Klingon', 'I speak Klingon', 'I know Klingon', 'You speak Klingon'],
    correctIndex: 1,
  },
];

// ============================================================================
// MODULE EXPORT
// ============================================================================

const module3: Module = {
  id: 3,
  titleEn: 'Social Life',
  titleTlh: 'nugh yIn',
  theme: 'Talk, Meet & Connect',
  color: '#06b6d4',
  chunks,
  bricks,
  mortar,
  buildExercises,
  quizQuestions,
};

export default module3;
