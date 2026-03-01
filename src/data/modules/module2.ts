/**
 * Module 2: Opinions & Feelings — "Like, Want & Think"
 * Theme: Express preferences, desires, and thoughts
 */

import { Module, KlingonPiece, BuildExercise, QuizQuestion, LearningChunk } from '../../types/models';

// ============================================================================
// BRICKS (Content Words)
// ============================================================================

const bricks: KlingonPiece[] = [
  {
    id: 'v_parhha',
    tlh: 'parHa',
    en: 'dislike',
    type: 'verb',
    phonetic: 'PAR-hah',
    moduleIntroduced: 2,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Expresses negative preference',
  },
  {
    id: 'v_par',
    tlh: 'par',
    en: 'like',
    type: 'verb',
    phonetic: 'PAR',
    moduleIntroduced: 2,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Expresses positive preference',
  },
  {
    id: 'v_neh',
    tlh: 'neH',
    en: 'want',
    type: 'verb',
    phonetic: 'NEKH',
    moduleIntroduced: 2,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Expresses desire or wish',
  },
  {
    id: 'v_qub',
    tlh: 'Qub',
    en: 'think',
    type: 'verb',
    phonetic: 'KHOOB',
    moduleIntroduced: 2,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Mental activity, pondering',
  },
  {
    id: 'v_yaj',
    tlh: 'yaj',
    en: 'understand',
    type: 'verb',
    phonetic: 'YAZH',
    moduleIntroduced: 2,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Comprehend or grasp meaning',
  },
  {
    id: 'v_ghoj',
    tlh: 'ghoj',
    en: 'learn',
    type: 'verb',
    phonetic: 'GHOZH',
    moduleIntroduced: 2,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Acquire knowledge or skill',
  },
  {
    id: 'v_sah',
    tlh: 'SaH',
    en: 'care, be concerned',
    type: 'verb',
    phonetic: 'SHAKH',
    moduleIntroduced: 2,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Show concern or interest',
  },
  {
    id: 'adj_qaq',
    tlh: 'QaQ',
    en: 'be good',
    type: 'verb',
    phonetic: 'KHAKH',
    moduleIntroduced: 2,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Quality verb meaning good/well',
  },
  {
    id: 'adj_qab',
    tlh: 'qab',
    en: 'be bad',
    type: 'verb',
    phonetic: 'KHAB',
    moduleIntroduced: 2,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Quality verb meaning bad/poorly',
  },
  {
    id: 'adj_chu',
    tlh: "chu'",
    en: 'be new',
    type: 'verb',
    phonetic: 'CHOO',
    moduleIntroduced: 2,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Quality verb meaning new/fresh',
  },
];

// ============================================================================
// MORTAR (Structural Pieces)
// ============================================================================

const mortar: KlingonPiece[] = [
  // New verb prefixes for Module 2
  {
    id: 'pfx_da',
    tlh: 'Da',
    en: 'you (singular) → him/her/it',
    type: 'prefix',
    phonetic: 'DAH',
    moduleIntroduced: 2,
    category: 'mortar',
    attachBehavior: 'attach-before',
    usageHint: 'Subject prefix: you (singular) acting on third person object',
  },
  {
    id: 'pfx_qa',
    tlh: 'qa',
    en: 'I → you',
    type: 'prefix',
    phonetic: 'KHAH',
    moduleIntroduced: 2,
    category: 'mortar',
    attachBehavior: 'attach-before',
    usageHint: 'Subject prefix: I acting on you',
  },
  {
    id: 'pfx_cho',
    tlh: 'cho',
    en: 'you → me',
    type: 'prefix',
    phonetic: 'CHO',
    moduleIntroduced: 2,
    category: 'mortar',
    attachBehavior: 'attach-before',
    usageHint: 'Subject prefix: you acting on me',
  },
  // New verb suffixes
  {
    id: 'sfx_qu',
    tlh: 'qu',
    en: 'very, emphatic',
    type: 'suffix',
    phonetic: 'KHOO',
    moduleIntroduced: 2,
    category: 'mortar',
    attachBehavior: 'attach-after',
    usageHint: 'Intensifies the verb meaning',
  },
  {
    id: 'sfx_be',
    tlh: 'be',
    en: 'not, negative',
    type: 'suffix',
    phonetic: 'BEH',
    moduleIntroduced: 2,
    category: 'mortar',
    attachBehavior: 'attach-after',
    usageHint: 'Negates the verb',
  },
];

// Combine all vocabulary
const vocabulary: KlingonPiece[] = [...bricks, ...mortar];

// ============================================================================
// LEARNING CHUNKS
// ============================================================================

// Chunk 1: Basic Preferences (like/dislike)
const chunk1Exercises: BuildExercise[] = [
  {
    moduleId: 2,
    id: 'build_m2_c1_1',
    englishPrompt: 'I like it',
    tiles: [
      { text: 'vI', attachRight: true, attachLeft: false },
      { text: 'par', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'vIpar',
    phonetic: 'VEE-PAR',
    literalTranslation: 'I-it like',
    explanation: 'vI- is the prefix for "I do something to it"',
  },
  {
    moduleId: 2,
    id: 'build_m2_c1_2',
    englishPrompt: 'You like it',
    tiles: [
      { text: 'Da', attachRight: true, attachLeft: false },
      { text: 'par', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'Dapar',
    phonetic: 'DAH-PAR',
    literalTranslation: 'you-it like',
    explanation: 'Da- is the new prefix for "you do something to it"',
  },
  {
    moduleId: 2,
    id: 'build_m2_c1_3',
    englishPrompt: 'I dislike it',
    tiles: [
      { text: 'vI', attachRight: true, attachLeft: false },
      { text: 'parHa', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'vIparHa',
    phonetic: 'VEE-PAR-hah',
    literalTranslation: 'I-it dislike',
    explanation: 'parHa means to dislike - the opposite of par',
  },
  {
    moduleId: 2,
    id: 'build_m2_c1_4',
    englishPrompt: 'You dislike it',
    tiles: [
      { text: 'Da', attachRight: true, attachLeft: false },
      { text: 'parHa', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'DaparHa',
    phonetic: 'DAH-PAR-hah',
    literalTranslation: 'you-it dislike',
  },
  {
    moduleId: 2,
    id: 'build_m2_c1_5',
    englishPrompt: 'I like it very much',
    tiles: [
      { text: 'vI', attachRight: true, attachLeft: false },
      { text: 'par', attachRight: true, attachLeft: true },
      { text: 'qu', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'vIparqu',
    phonetic: 'VEE-PAR-khoo',
    literalTranslation: 'I-it like-very',
    explanation: '-qu intensifies the meaning (like it a lot)',
  },
  {
    moduleId: 2,
    id: 'build_m2_c1_6',
    englishPrompt: 'I do not like it',
    tiles: [
      { text: 'vI', attachRight: true, attachLeft: false },
      { text: 'par', attachRight: true, attachLeft: true },
      { text: 'be', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'vIparbe',
    phonetic: 'VEE-PAR-beh',
    literalTranslation: 'I-it like-not',
    explanation: '-be negates the verb (I do not like it)',
  },
  {
    moduleId: 2,
    id: 'build_m2_c1_7',
    englishPrompt: 'It is good',
    tiles: [
      { text: 'QaQ', attachRight: false, attachLeft: false },
    ],
    correctAnswer: 'QaQ',
    phonetic: 'KHAKH',
    literalTranslation: 'good (it is)',
    explanation: 'Quality verbs like QaQ can stand alone',
  },
  {
    moduleId: 2,
    id: 'build_m2_c1_8',
    englishPrompt: 'It is very good',
    tiles: [
      { text: 'QaQ', attachRight: true, attachLeft: false },
      { text: 'qu', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'QaQqu',
    phonetic: 'KHAKH-khoo',
    literalTranslation: 'good-very',
    explanation: '-qu makes it "very good" or "excellent"',
  },
];

// Chunk 2: Wants and Desires
const chunk2Exercises: BuildExercise[] = [
  {
    moduleId: 2,
    id: 'build_m2_c2_1',
    englishPrompt: 'I want it',
    tiles: [
      { text: 'vI', attachRight: true, attachLeft: false },
      { text: 'neH', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'vIneH',
    phonetic: 'VEE-NEKH',
    literalTranslation: 'I-it want',
  },
  {
    moduleId: 2,
    id: 'build_m2_c2_2',
    englishPrompt: 'You want it',
    tiles: [
      { text: 'Da', attachRight: true, attachLeft: false },
      { text: 'neH', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'DaneH',
    phonetic: 'DAH-NEKH',
    literalTranslation: 'you-it want',
  },
  {
    moduleId: 2,
    id: 'build_m2_c2_3',
    englishPrompt: 'I want you',
    tiles: [
      { text: 'qa', attachRight: true, attachLeft: false },
      { text: 'neH', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'qaneH',
    phonetic: 'KHAH-NEKH',
    literalTranslation: 'I-you want',
    explanation: 'qa- is the prefix for "I do something to you"',
  },
  {
    moduleId: 2,
    id: 'build_m2_c2_4',
    englishPrompt: 'You want me',
    tiles: [
      { text: 'cho', attachRight: true, attachLeft: false },
      { text: 'neH', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'choneH',
    phonetic: 'CHO-NEKH',
    literalTranslation: 'you-me want',
    explanation: 'cho- is the prefix for "you do something to me"',
  },
  {
    moduleId: 2,
    id: 'build_m2_c2_5',
    englishPrompt: 'I do not want it',
    tiles: [
      { text: 'vI', attachRight: true, attachLeft: false },
      { text: 'neH', attachRight: true, attachLeft: true },
      { text: 'be', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'vIneHbe',
    phonetic: 'VEE-NEKH-beh',
    literalTranslation: 'I-it want-not',
  },
  {
    moduleId: 2,
    id: 'build_m2_c2_6',
    englishPrompt: 'It is bad',
    tiles: [
      { text: 'qab', attachRight: false, attachLeft: false },
    ],
    correctAnswer: 'qab',
    phonetic: 'KHAB',
    literalTranslation: 'bad (it is)',
  },
  {
    moduleId: 2,
    id: 'build_m2_c2_7',
    englishPrompt: 'It is new',
    tiles: [
      { text: "chu'", attachRight: false, attachLeft: false },
    ],
    correctAnswer: "chu'",
    phonetic: 'CHOO',
    literalTranslation: 'new (it is)',
  },
  {
    moduleId: 2,
    id: 'build_m2_c2_8',
    englishPrompt: 'It is very new',
    tiles: [
      { text: "chu'", attachRight: true, attachLeft: false },
      { text: 'qu', attachRight: false, attachLeft: true },
    ],
    correctAnswer: "chu'qu",
    phonetic: 'CHOO-khoo',
    literalTranslation: 'new-very',
  },
];

// Chunk 3: Thoughts and Understanding
const chunk3Exercises: BuildExercise[] = [
  {
    moduleId: 2,
    id: 'build_m2_c3_1',
    englishPrompt: 'I think',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'Qub', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jIQub',
    phonetic: 'JEEKHUB',
    literalTranslation: 'I think',
    explanation: 'Qub is intransitive, so we use jI- (I)',
  },
  {
    moduleId: 2,
    id: 'build_m2_c3_2',
    englishPrompt: 'You think',
    tiles: [
      { text: 'bI', attachRight: true, attachLeft: false },
      { text: 'Qub', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'bIQub',
    phonetic: 'BEE-KHOOB',
    literalTranslation: 'you think',
  },
  {
    moduleId: 2,
    id: 'build_m2_c3_3',
    englishPrompt: 'I understand it',
    tiles: [
      { text: 'vI', attachRight: true, attachLeft: false },
      { text: 'yaj', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'vIyaj',
    phonetic: 'VEE-yazh',
    literalTranslation: 'I-it understand',
  },
  {
    moduleId: 2,
    id: 'build_m2_c3_4',
    englishPrompt: 'You understand it',
    tiles: [
      { text: 'Da', attachRight: true, attachLeft: false },
      { text: 'yaj', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'Dayaj',
    phonetic: 'DAH-yazh',
    literalTranslation: 'you-it understand',
  },
  {
    moduleId: 2,
    id: 'build_m2_c3_5',
    englishPrompt: 'I do not understand it',
    tiles: [
      { text: 'vI', attachRight: true, attachLeft: false },
      { text: 'yaj', attachRight: true, attachLeft: true },
      { text: 'be', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'vIyajbe',
    phonetic: 'VEE-yazh-beh',
    literalTranslation: 'I-it understand-not',
  },
  {
    moduleId: 2,
    id: 'build_m2_c3_6',
    englishPrompt: 'I learn',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'ghoj', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jIghoj',
    phonetic: 'JEE-ghozh',
    literalTranslation: 'I learn',
  },
  {
    moduleId: 2,
    id: 'build_m2_c3_7',
    englishPrompt: 'I care',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'SaH', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jISaH',
    phonetic: 'JEE-shakh',
    literalTranslation: 'I care',
  },
  {
    moduleId: 2,
    id: 'build_m2_c3_8',
    englishPrompt: 'I do not care',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'SaH', attachRight: true, attachLeft: true },
      { text: 'be', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jISaHbe',
    phonetic: 'JEE-shakh-beh',
    literalTranslation: 'I care-not',
  },
];

// Learning chunks
const chunks: LearningChunk[] = [
  {
    id: 'chunk-1',
    title: 'Basic Preferences',
    vocabularyIds: ['v_par', 'v_parhha', 'adj_qaq', 'adj_qab', 'pfx_da', 'sfx_qu', 'sfx_be'],
    buildExerciseIds: ['build_m2_c1_1', 'build_m2_c1_2', 'build_m2_c1_3', 'build_m2_c1_4', 'build_m2_c1_5', 'build_m2_c1_6', 'build_m2_c1_7', 'build_m2_c1_8'],
  },
  {
    id: 'chunk-2',
    title: 'Wants & Desires',
    vocabularyIds: ['v_neh', 'adj_chu', 'pfx_qa', 'pfx_cho'],
    buildExerciseIds: ['build_m2_c2_1', 'build_m2_c2_2', 'build_m2_c2_3', 'build_m2_c2_4', 'build_m2_c2_5', 'build_m2_c2_6', 'build_m2_c2_7', 'build_m2_c2_8'],
  },
  {
    id: 'chunk-3',
    title: 'Thoughts & Understanding',
    vocabularyIds: ['v_qub', 'v_yaj', 'v_ghoj', 'v_sah'],
    buildExerciseIds: ['build_m2_c3_1', 'build_m2_c3_2', 'build_m2_c3_3', 'build_m2_c3_4', 'build_m2_c3_5', 'build_m2_c3_6', 'build_m2_c3_7', 'build_m2_c3_8'],
  },
];

// All build exercises combined
const buildExercises: BuildExercise[] = [
  ...chunk1Exercises,
  ...chunk2Exercises,
  ...chunk3Exercises,
];

// ============================================================================
// QUIZ QUESTIONS
// ============================================================================

const quizQuestions: QuizQuestion[] = [
  // Klingon → English questions
  {
    moduleId: 2,
    id: 'quiz_m2_1',
    type: 'tlh-to-en',
    question: 'What does this mean?',
    klingonText: 'vIpar',
    options: ['I like it', 'You like it', 'I want it', 'I understand it'],
    correctIndex: 0,
  },
  {
    moduleId: 2,
    id: 'quiz_m2_2',
    type: 'tlh-to-en',
    question: 'What does this mean?',
    klingonText: 'DaneH',
    options: ['I want it', 'You want it', 'I like you', 'You like it'],
    correctIndex: 1,
  },
  {
    moduleId: 2,
    id: 'quiz_m2_3',
    type: 'tlh-to-en',
    question: 'What does this mean?',
    klingonText: 'vIyajbe',
    options: ['I understand it', 'I do not understand it', 'You understand it', 'I think'],
    correctIndex: 1,
  },
  // English → Klingon questions
  {
    moduleId: 2,
    id: 'quiz_m2_4',
    type: 'en-to-tlh',
    question: 'I dislike it',
    options: ['vIpar', 'vIparHa', 'DaparHa', 'vIneH'],
    correctIndex: 1,
  },
  {
    moduleId: 2,
    id: 'quiz_m2_5',
    type: 'en-to-tlh',
    question: 'It is very good',
    options: ['QaQ', 'QaQqu', 'qab', 'qabqu'],
    correctIndex: 1,
  },
  {
    moduleId: 2,
    id: 'quiz_m2_6',
    type: 'en-to-tlh',
    question: 'I care',
    options: ['jIQub', 'jISaH', 'jIghoj', 'bISaH'],
    correctIndex: 1,
  },
  // Audio recognition questions
  {
    moduleId: 2,
    id: 'quiz_m2_7',
    type: 'audio-recognition',
    question: 'What does this word mean?',
    klingonText: 'Qub',
    options: ['think', 'want', 'like', 'understand'],
    correctIndex: 0,
  },
  {
    moduleId: 2,
    id: 'quiz_m2_8',
    type: 'audio-recognition',
    question: 'What does this word mean?',
    klingonText: 'parHa',
    options: ['like', 'dislike', 'want', 'care'],
    correctIndex: 1,
  },
  // Fill-the-gap style questions
  {
    moduleId: 2,
    id: 'quiz_m2_9',
    type: 'en-to-tlh',
    question: 'You understand it',
    options: ['vIyaj', 'Dayaj', 'bIyaj', 'mayaj'],
    correctIndex: 1,
  },
  {
    moduleId: 2,
    id: 'quiz_m2_10',
    type: 'en-to-tlh',
    question: 'I want you',
    options: ['vIneH', 'DaneH', 'qaneH', 'choneH'],
    correctIndex: 2,
  },
];

// ============================================================================
// MODULE EXPORT
// ============================================================================

const module2: Module = {
  id: 2,
  titleEn: 'Opinions & Feelings',
  titleTlh: 'yab & tIv',
  theme: 'Like, Want & Think',
  color: '#a855f7',
  chunks,
  bricks,
  mortar,
  buildExercises,
  quizQuestions,
};

export default module2;
