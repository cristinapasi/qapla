/**
 * Module 5: Personality & Flow — "Express Yourself"
 * Theme: Emotions, character traits, and expressive Klingon phrases
 */

import { Module, KlingonPiece, BuildExercise, QuizQuestion, LearningChunk } from '../../types/models';

// ============================================================================
// BRICKS (Content Words)
// ============================================================================

const bricks: KlingonPiece[] = [
  {
    id: 'm5_v_Doch',
    tlh: 'Doch',
    en: 'be rude, be dishonourable',
    type: 'verb',
    phonetic: 'DOKH',
    moduleIntroduced: 5,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Quality verb — rudeness or dishonour',
  },
  {
    id: 'm5_v_quv',
    tlh: 'quv',
    en: 'be honoured, have honour',
    type: 'verb',
    phonetic: 'KHOOV',
    moduleIntroduced: 5,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Quality verb — honour and dignity',
    showExample: true,
    exampleSentence: 'jIquv',
    exampleTranslation: 'I am honoured',
  },
  {
    id: 'm5_v_Hov',
    tlh: 'Hov',
    en: 'be skilled, be capable',
    type: 'verb',
    phonetic: 'HOV',
    moduleIntroduced: 5,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Quality verb — skill or capability',
  },
  {
    id: 'm5_v_qoH',
    tlh: 'qoH',
    en: 'be a fool, be foolish',
    type: 'verb',
    phonetic: 'KHOH',
    moduleIntroduced: 5,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Quality verb — foolishness',
  },
  {
    id: 'm5_v_belHa',
    tlh: "belHa'",
    en: 'be displeased, be unhappy',
    type: 'verb',
    phonetic: 'BEL-HAH',
    moduleIntroduced: 5,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Expresses displeasure or unhappiness',
  },
  {
    id: 'm5_v_bel',
    tlh: 'bel',
    en: 'be pleased, be happy',
    type: 'verb',
    phonetic: 'BEL',
    moduleIntroduced: 5,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Expresses pleasure or happiness',
  },
  {
    id: 'm5_v_jaq',
    tlh: 'jaq',
    en: 'be bold, be brave',
    type: 'verb',
    phonetic: 'JHAKH',
    moduleIntroduced: 5,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Quality verb — boldness or bravery',
  },
  {
    id: 'm5_v_tuj',
    tlh: 'tuj',
    en: 'be hot',
    type: 'verb',
    phonetic: 'TOOJ',
    moduleIntroduced: 5,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Temperature — hot',
  },
  {
    id: 'm5_v_bIr',
    tlh: 'bIr',
    en: 'be cold',
    type: 'verb',
    phonetic: 'BEER',
    moduleIntroduced: 5,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Temperature — cold',
  },
  {
    id: 'm5_n_Hoch',
    tlh: 'Hoch',
    en: 'all, every, everyone',
    type: 'noun',
    phonetic: 'HOKH',
    moduleIntroduced: 5,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Refers to all people or things',
  },
];

// ============================================================================
// MORTAR (Structural Pieces)
// ============================================================================

const mortar: KlingonPiece[] = [
  {
    id: 'm5_sfx_choH',
    tlh: 'choH',
    en: 'change of state',
    type: 'suffix',
    phonetic: 'CHOH',
    moduleIntroduced: 5,
    category: 'mortar',
    attachBehavior: 'attach-after',
    usageHint: 'Shows a transition — becoming something',
    showExample: true,
    exampleSentence: 'jIbelchoH',
    exampleTranslation: 'I am becoming happy',
  },
  {
    id: 'm5_sfx_moH',
    tlh: 'moH',
    en: 'cause (causative)',
    type: 'suffix',
    phonetic: 'MOH',
    moduleIntroduced: 5,
    category: 'mortar',
    attachBehavior: 'attach-after',
    usageHint: 'Makes someone/something do or become',
  },
  {
    id: 'm5_sfx_laH',
    tlh: "laH",
    en: 'can, be able to',
    type: 'suffix',
    phonetic: 'LAKH',
    moduleIntroduced: 5,
    category: 'mortar',
    attachBehavior: 'attach-after',
    usageHint: 'Expresses ability or capability',
  },
  {
    id: 'm5_sfx_nIS',
    tlh: 'nIS',
    en: 'need to, must',
    type: 'suffix',
    phonetic: 'NISS',
    moduleIntroduced: 5,
    category: 'mortar',
    attachBehavior: 'attach-after',
    usageHint: 'Expresses necessity or obligation',
  },
];

// ============================================================================
// LEARNING CHUNKS
// ============================================================================

const chunk1Exercises: BuildExercise[] = [
  {
    id: 'm5_ex_c1_1',
    moduleId: 5,
    englishPrompt: 'I am honoured.',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'quv', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jIquv',
    phonetic: 'JEE-KHOOV',
    literalTranslation: 'I-be honoured',
    explanation: 'quv is a quality verb — no object needed',
  },
  {
    id: 'm5_ex_c1_2',
    moduleId: 5,
    englishPrompt: 'You are bold.',
    tiles: [
      { text: 'bI', attachRight: true, attachLeft: false },
      { text: 'jaq', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'bIjaq',
    phonetic: 'BEE-JHAKH',
    literalTranslation: 'you-be bold',
  },
  {
    id: 'm5_ex_c1_3',
    moduleId: 5,
    englishPrompt: 'I am pleased.',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'bel', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jIbel',
    phonetic: 'JEE-BEL',
    literalTranslation: 'I-be pleased',
  },
  {
    id: 'm5_ex_c1_4',
    moduleId: 5,
    englishPrompt: 'I am displeased.',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: "belHa'", attachRight: false, attachLeft: true },
    ],
    correctAnswer: "jIbelHa'",
    phonetic: 'JEE-BEL-HAH',
    literalTranslation: 'I-be displeased',
  },
  {
    id: 'm5_ex_c1_5',
    moduleId: 5,
    englishPrompt: 'It is hot.',
    tiles: [
      { text: 'tuj', attachRight: false, attachLeft: false },
    ],
    correctAnswer: 'tuj',
    phonetic: 'TOOJ',
    literalTranslation: 'hot (it is)',
    explanation: 'Quality verbs stand alone as predicates',
  },
  {
    id: 'm5_ex_c1_6',
    moduleId: 5,
    englishPrompt: 'It is very cold.',
    tiles: [
      { text: 'bIr', attachRight: true, attachLeft: false },
      { text: 'qu', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'bIrqu',
    phonetic: 'BEER-KHOO',
    literalTranslation: 'cold-very',
    explanation: '-qu intensifies the quality verb',
  },
  {
    id: 'm5_ex_c1_7',
    moduleId: 5,
    englishPrompt: 'I am dishonoured.',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'Doch', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jIDoch',
    phonetic: 'JEE-DOKH',
    literalTranslation: 'I-be rude/dishonoured',
  },
  {
    id: 'm5_ex_c1_8',
    moduleId: 5,
    englishPrompt: 'Everyone is a fool.',
    tiles: [
      { text: 'Hoch', attachRight: false, attachLeft: false },
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'qoH', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'Hoch jIqoH',
    phonetic: 'HOKH, JEE-KHOH',
    literalTranslation: 'everyone I-be-fool',
    explanation: 'Hoch (everyone/all) precedes the verb',
  },
];

const chunk2Exercises: BuildExercise[] = [
  {
    id: 'm5_ex_c2_1',
    moduleId: 5,
    englishPrompt: 'I am becoming happy.',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'bel', attachRight: true, attachLeft: true },
      { text: 'choH', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jIbelchoH',
    phonetic: 'JEE-BEL-CHOH',
    literalTranslation: 'I-be-pleased-change-of-state',
    explanation: '-choH shows a transition — I am becoming pleased',
  },
  {
    id: 'm5_ex_c2_2',
    moduleId: 5,
    englishPrompt: 'I can speak.',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'jatlh', attachRight: true, attachLeft: true },
      { text: 'laH', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jIjatlhlaH',
    phonetic: 'JEE-JATL-LAKH',
    literalTranslation: 'I-speak-can',
    explanation: '-laH expresses ability: I am able to speak',
  },
  {
    id: 'm5_ex_c2_3',
    moduleId: 5,
    englishPrompt: 'I need to eat.',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'Sop', attachRight: true, attachLeft: true },
      { text: 'nIS', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jISopnIS',
    phonetic: 'JEE-SHOP-NISS',
    literalTranslation: 'I-eat-need-to',
    explanation: '-nIS expresses necessity: I must eat',
  },
  {
    id: 'm5_ex_c2_4',
    moduleId: 5,
    englishPrompt: 'You need to learn.',
    tiles: [
      { text: 'bI', attachRight: true, attachLeft: false },
      { text: 'ghoj', attachRight: true, attachLeft: true },
      { text: 'nIS', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'bIghojnIS',
    phonetic: 'BEE-GHOZH-NISS',
    literalTranslation: 'you-learn-need-to',
  },
  {
    id: 'm5_ex_c2_5',
    moduleId: 5,
    englishPrompt: 'I can understand it.',
    tiles: [
      { text: 'vI', attachRight: true, attachLeft: false },
      { text: 'yaj', attachRight: true, attachLeft: true },
      { text: 'laH', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'vIyajlaH',
    phonetic: 'VEE-YAZH-LAKH',
    literalTranslation: 'I-it-understand-can',
  },
  {
    id: 'm5_ex_c2_6',
    moduleId: 5,
    englishPrompt: 'It is making me pleased.',
    tiles: [
      { text: 'mu', attachRight: true, attachLeft: false },
      { text: 'bel', attachRight: true, attachLeft: true },
      { text: 'moH', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'mubelmoH',
    phonetic: 'MOO-BEL-MOH',
    literalTranslation: 'it-me-please-causes',
    explanation: '-moH makes something cause a state: it causes me to be pleased',
  },
  {
    id: 'm5_ex_c2_7',
    moduleId: 5,
    englishPrompt: 'I am becoming honoured.',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'quv', attachRight: true, attachLeft: true },
      { text: 'choH', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jIquvchoH',
    phonetic: 'JEE-KHOOV-CHOH',
    literalTranslation: 'I-be-honoured-change-of-state',
  },
  {
    id: 'm5_ex_c2_8',
    moduleId: 5,
    englishPrompt: 'I can be bold.',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'jaq', attachRight: true, attachLeft: true },
      { text: 'laH', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jIjaqlaH',
    phonetic: 'JEE-JHAKH-LAKH',
    literalTranslation: 'I-be-bold-can',
  },
];

const chunks: LearningChunk[] = [
  {
    id: 'chunk-1',
    title: 'Traits & Feelings',
    vocabularyIds: ['m5_v_Doch', 'm5_v_quv', 'm5_v_Hov', 'm5_v_qoH', 'm5_v_belHa', 'm5_v_bel', 'm5_v_jaq', 'm5_v_tuj', 'm5_v_bIr', 'm5_n_Hoch'],
    buildExerciseIds: ['m5_ex_c1_1', 'm5_ex_c1_2', 'm5_ex_c1_3', 'm5_ex_c1_4', 'm5_ex_c1_5', 'm5_ex_c1_6', 'm5_ex_c1_7', 'm5_ex_c1_8'],
  },
  {
    id: 'chunk-2',
    title: 'Ability & Change',
    vocabularyIds: ['m5_sfx_choH', 'm5_sfx_moH', 'm5_sfx_laH', 'm5_sfx_nIS'],
    buildExerciseIds: ['m5_ex_c2_1', 'm5_ex_c2_2', 'm5_ex_c2_3', 'm5_ex_c2_4', 'm5_ex_c2_5', 'm5_ex_c2_6', 'm5_ex_c2_7', 'm5_ex_c2_8'],
  },
];

const buildExercises: BuildExercise[] = [...chunk1Exercises, ...chunk2Exercises];

// ============================================================================
// QUIZ QUESTIONS
// ============================================================================

const quizQuestions: QuizQuestion[] = [
  {
    id: 'm5_quiz_1',
    moduleId: 5,
    type: 'tlh-to-en',
    question: 'What does this mean?',
    klingonText: 'jIquv',
    options: ['I am bold', 'I am honoured', 'I am pleased', 'I am skilled'],
    correctIndex: 1,
  },
  {
    id: 'm5_quiz_2',
    moduleId: 5,
    type: 'tlh-to-en',
    question: 'What does this mean?',
    klingonText: 'jIjatlhlaH',
    options: ['I must speak', 'I am speaking', 'I can speak', 'I spoke'],
    correctIndex: 2,
  },
  {
    id: 'm5_quiz_3',
    moduleId: 5,
    type: 'tlh-to-en',
    question: 'What does this mean?',
    klingonText: 'jIbelchoH',
    options: ['I am pleased', 'I am becoming pleased', 'I am displeased', 'I cause happiness'],
    correctIndex: 1,
  },
  {
    id: 'm5_quiz_4',
    moduleId: 5,
    type: 'en-to-tlh',
    question: 'I need to eat',
    options: ['jISopnIS', 'jISopLaH', 'jISoptaH', 'bISopnIS'],
    correctIndex: 0,
  },
  {
    id: 'm5_quiz_5',
    moduleId: 5,
    type: 'en-to-tlh',
    question: 'It is very cold',
    options: ['tujqu', 'bIr', 'bIrqu', 'tuj'],
    correctIndex: 2,
  },
  {
    id: 'm5_quiz_6',
    moduleId: 5,
    type: 'en-to-tlh',
    question: 'I am displeased',
    options: ["jIbelHa'", 'jIbel', "bIbelHa'", 'jIDoch'],
    correctIndex: 0,
  },
  {
    id: 'm5_quiz_7',
    moduleId: 5,
    type: 'audio-recognition',
    question: 'What does this suffix mean?',
    klingonText: 'laH',
    options: ['need to', 'change state', 'can/able to', 'cause'],
    correctIndex: 2,
  },
  {
    id: 'm5_quiz_8',
    moduleId: 5,
    type: 'audio-recognition',
    question: 'What does this word mean?',
    klingonText: 'quv',
    options: ['be foolish', 'be rude', 'be honoured', 'be bold'],
    correctIndex: 2,
  },
  {
    id: 'm5_quiz_9',
    moduleId: 5,
    type: 'en-to-tlh',
    question: 'I can understand it',
    options: ['vIyajnIS', 'vIyajlaH', 'vIyajtaH', "vIyajpu'"],
    correctIndex: 1,
  },
  {
    id: 'm5_quiz_10',
    moduleId: 5,
    type: 'tlh-to-en',
    question: 'What does this mean?',
    klingonText: 'mubelmoH',
    options: ['I please it', 'it is making me pleased', 'I am becoming pleased', 'you please me'],
    correctIndex: 1,
  },
];

// ============================================================================
// MODULE EXPORT
// ============================================================================

const module5: Module = {
  id: 5,
  titleEn: 'Personality & Flow',
  titleTlh: 'SaH & Qatlh',
  theme: 'Express Yourself',
  color: '#ec4899',
  chunks,
  bricks,
  mortar,
  buildExercises,
  quizQuestions,
};

export default module5;
