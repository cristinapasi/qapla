/**
 * Module 4: Time & Questions — "When, Where & How"
 * Theme: Ask and answer questions about time, place, and manner
 */

import { Module, KlingonPiece, BuildExercise, QuizQuestion, LearningChunk } from '../../types/models';

// ============================================================================
// BRICKS (Content Words)
// ============================================================================

const bricks: KlingonPiece[] = [
  {
    id: 'm4_q_nuqDaq',
    tlh: 'nuqDaq',
    en: 'where?',
    type: 'question',
    phonetic: 'NOOKH-DAKH',
    moduleIntroduced: 4,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Asks about location',
    showExample: true,
    exampleSentence: 'nuqDaq Dab',
    exampleTranslation: 'where do you live?',
  },
  {
    id: 'm4_q_ghorgh',
    tlh: 'ghorgh',
    en: 'when?',
    type: 'question',
    phonetic: 'GHORRG',
    moduleIntroduced: 4,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Asks about time',
  },
  {
    id: 'm4_q_nuq',
    tlh: 'nuq',
    en: 'what?',
    type: 'question',
    phonetic: 'NOOKH',
    moduleIntroduced: 4,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Asks what something is',
  },
  {
    id: 'm4_q_chay',
    tlh: "chay'",
    en: 'how?',
    type: 'question',
    phonetic: 'CHAY',
    moduleIntroduced: 4,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Asks about manner or method',
  },
  {
    id: 'm4_t_DaHjaj',
    tlh: 'DaHjaj',
    en: 'today',
    type: 'time',
    phonetic: 'DAH-JHAJ',
    moduleIntroduced: 4,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Refers to the current day',
  },
  {
    id: 'm4_t_wa_Hu',
    tlh: "wa'Hu'",
    en: 'yesterday',
    type: 'time',
    phonetic: 'WAH-HOO',
    moduleIntroduced: 4,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Refers to the previous day',
  },
  {
    id: 'm4_t_wa_leS',
    tlh: "wa'leS",
    en: 'tomorrow',
    type: 'time',
    phonetic: 'WAH-LES',
    moduleIntroduced: 4,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Refers to the next day',
  },
  {
    id: 'm4_v_Dab',
    tlh: 'Dab',
    en: 'live in, inhabit',
    type: 'verb',
    phonetic: 'DAB',
    moduleIntroduced: 4,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'To live in or inhabit a place',
  },
  {
    id: 'm4_v_ghoS2',
    tlh: 'ghoS',
    en: 'go, proceed',
    type: 'verb',
    phonetic: 'GHOSH',
    moduleIntroduced: 4,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'To go to or proceed',
  },
  {
    id: 'm4_n_pIq',
    tlh: 'pIq',
    en: 'future, later',
    type: 'noun',
    phonetic: 'PEEK',
    moduleIntroduced: 4,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Refers to the future or a later time',
  },
];

// ============================================================================
// MORTAR (Structural Pieces)
// ============================================================================

const mortar: KlingonPiece[] = [
  {
    id: 'm4_sfx_taH',
    tlh: 'taH',
    en: 'continuing (ongoing action)',
    type: 'suffix',
    phonetic: 'TAKH',
    moduleIntroduced: 4,
    category: 'mortar',
    attachBehavior: 'attach-after',
    usageHint: 'Shows the action is ongoing or continuous',
    showExample: true,
    exampleSentence: 'jIjatlhtaH',
    exampleTranslation: 'I am speaking (continuously)',
  },
  {
    id: 'm4_sfx_pu',
    tlh: "pu'",
    en: 'completed action (perfective)',
    type: 'suffix',
    phonetic: 'POO',
    moduleIntroduced: 4,
    category: 'mortar',
    attachBehavior: 'attach-after',
    usageHint: 'Shows the action has been completed',
  },
  {
    id: 'm4_pfx_lI',
    tlh: 'lI',
    en: 'he/she → them',
    type: 'prefix',
    phonetic: 'LEE',
    moduleIntroduced: 4,
    category: 'mortar',
    attachBehavior: 'attach-before',
    usageHint: 'Third person singular acting on them (plural)',
  },
];

// ============================================================================
// LEARNING CHUNKS
// ============================================================================

const chunk1Exercises: BuildExercise[] = [
  {
    id: 'm4_ex_c1_1',
    moduleId: 4,
    englishPrompt: 'Where is it?',
    tiles: [
      { text: 'nuqDaq', attachRight: false, attachLeft: false },
      { text: 'ghaH', attachRight: false, attachLeft: false },
    ],
    correctAnswer: 'nuqDaq ghaH',
    phonetic: 'NOOKH-DAKH, GHAKH',
    literalTranslation: 'where it-is',
    explanation: 'nuqDaq asks about location',
  },
  {
    id: 'm4_ex_c1_2',
    moduleId: 4,
    englishPrompt: 'What is it?',
    tiles: [
      { text: 'nuq', attachRight: false, attachLeft: false },
      { text: 'ghaH', attachRight: false, attachLeft: false },
    ],
    correctAnswer: 'nuq ghaH',
    phonetic: 'NOOKH, GHAKH',
    literalTranslation: 'what it-is',
    explanation: 'nuq asks "what?" — answer is a noun',
  },
  {
    id: 'm4_ex_c1_3',
    moduleId: 4,
    englishPrompt: 'When do you go?',
    tiles: [
      { text: 'ghorgh', attachRight: false, attachLeft: false },
      { text: 'bI', attachRight: true, attachLeft: false },
      { text: 'jaH', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'ghorgh bIjaH',
    phonetic: 'GHORRG, BEE-JAH',
    literalTranslation: 'when you-go',
    explanation: 'Question words come before the verb phrase',
  },
  {
    id: 'm4_ex_c1_4',
    moduleId: 4,
    englishPrompt: 'Today I eat.',
    tiles: [
      { text: 'DaHjaj', attachRight: false, attachLeft: false },
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'Sop', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'DaHjaj jISop',
    phonetic: 'DAH-JHAJ, JEE-SHOP',
    literalTranslation: 'today I-eat',
    explanation: 'Time expressions come at the front of the sentence',
  },
  {
    id: 'm4_ex_c1_5',
    moduleId: 4,
    englishPrompt: 'Yesterday I ate.',
    tiles: [
      { text: "wa'Hu'", attachRight: false, attachLeft: false },
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'Sop', attachRight: true, attachLeft: true },
      { text: "pu'", attachRight: false, attachLeft: true },
    ],
    correctAnswer: "wa'Hu' jISoppu'",
    phonetic: 'WAH-HOO, JEE-SHOP-POO',
    literalTranslation: "yesterday I-eat-[completed]",
    explanation: "-pu' marks completed past actions",
  },
  {
    id: 'm4_ex_c1_6',
    moduleId: 4,
    englishPrompt: 'Tomorrow I will go.',
    tiles: [
      { text: "wa'leS", attachRight: false, attachLeft: false },
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'jaH', attachRight: false, attachLeft: true },
    ],
    correctAnswer: "wa'leS jIjaH",
    phonetic: 'WAH-LES, JEE-JAH',
    literalTranslation: 'tomorrow I-go',
    explanation: 'Klingon has no future tense marker — context + time word does it',
  },
  {
    id: 'm4_ex_c1_7',
    moduleId: 4,
    englishPrompt: 'How do you speak?',
    tiles: [
      { text: "chay'", attachRight: false, attachLeft: false },
      { text: 'bI', attachRight: true, attachLeft: false },
      { text: 'jatlh', attachRight: false, attachLeft: true },
    ],
    correctAnswer: "chay' bIjatlh",
    phonetic: 'CHAY, BEE-JATL',
    literalTranslation: 'how you-speak',
  },
  {
    id: 'm4_ex_c1_8',
    moduleId: 4,
    englishPrompt: 'I am eating (continuously).',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'Sop', attachRight: true, attachLeft: true },
      { text: 'taH', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jISoptaH',
    phonetic: 'JEE-SHOP-TAKH',
    literalTranslation: 'I-eat-continuing',
    explanation: '-taH shows the action is ongoing',
  },
];

const chunk2Exercises: BuildExercise[] = [
  {
    id: 'm4_ex_c2_1',
    moduleId: 4,
    englishPrompt: 'Where do you live?',
    tiles: [
      { text: 'nuqDaq', attachRight: false, attachLeft: false },
      { text: 'Da', attachRight: true, attachLeft: false },
      { text: 'Dab', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'nuqDaq DaDab',
    phonetic: 'NOOKH-DAKH, DAH-DAB',
    literalTranslation: 'where you-inhabit',
  },
  {
    id: 'm4_ex_c2_2',
    moduleId: 4,
    englishPrompt: 'I live here.',
    tiles: [
      { text: 'naDev', attachRight: false, attachLeft: false },
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'Dab', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'naDev jIDab',
    phonetic: 'NAH-DEV, JEE-DAB',
    literalTranslation: 'here I-inhabit',
    explanation: 'naDev means "here/this area"',
  },
  {
    id: 'm4_ex_c2_3',
    moduleId: 4,
    englishPrompt: 'I have completed it.',
    tiles: [
      { text: 'vI', attachRight: true, attachLeft: false },
      { text: 'legh', attachRight: true, attachLeft: true },
      { text: "pu'", attachRight: false, attachLeft: true },
    ],
    correctAnswer: "vIleghpu'",
    phonetic: 'VEE-LEGH-POO',
    literalTranslation: "I-it see-[completed]",
    explanation: "-pu' indicates a completed action",
  },
  {
    id: 'm4_ex_c2_4',
    moduleId: 4,
    englishPrompt: 'I am speaking continuously.',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'jatlh', attachRight: true, attachLeft: true },
      { text: 'taH', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jIjatlhtaH',
    phonetic: 'JEE-JATL-TAKH',
    literalTranslation: 'I-speak-continuing',
  },
  {
    id: 'm4_ex_c2_5',
    moduleId: 4,
    englishPrompt: 'In the future.',
    tiles: [
      { text: 'pIq', attachRight: true, attachLeft: false },
      { text: 'Daq', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'pIqDaq',
    phonetic: 'PEEK-DAKH',
    literalTranslation: 'future-in',
    explanation: '-Daq attaches to pIq to mean "in the future"',
  },
  {
    id: 'm4_ex_c2_6',
    moduleId: 4,
    englishPrompt: 'Today I speak Klingon.',
    tiles: [
      { text: 'DaHjaj', attachRight: false, attachLeft: false },
      { text: 'tlhIngan', attachRight: false, attachLeft: false },
      { text: 'Hol', attachRight: false, attachLeft: false },
      { text: 'vI', attachRight: true, attachLeft: false },
      { text: 'jatlh', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'DaHjaj tlhIngan Hol vIjatlh',
    phonetic: 'DAH-JHAJ, TLEE-NGAN, HOL, VEE-JATL',
    literalTranslation: 'today Klingon language I-speak',
  },
  {
    id: 'm4_ex_c2_7',
    moduleId: 4,
    englishPrompt: 'When do you eat?',
    tiles: [
      { text: 'ghorgh', attachRight: false, attachLeft: false },
      { text: 'bI', attachRight: true, attachLeft: false },
      { text: 'Sop', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'ghorgh bISop',
    phonetic: 'GHORRG, BEE-SHOP',
    literalTranslation: 'when you-eat',
  },
  {
    id: 'm4_ex_c2_8',
    moduleId: 4,
    englishPrompt: 'How did you understand it?',
    tiles: [
      { text: "chay'", attachRight: false, attachLeft: false },
      { text: 'Da', attachRight: true, attachLeft: false },
      { text: 'yaj', attachRight: true, attachLeft: true },
      { text: "pu'", attachRight: false, attachLeft: true },
    ],
    correctAnswer: "chay' Dayajpu'",
    phonetic: "CHAY, DAH-YAZH-POO",
    literalTranslation: 'how you-it-understand-[completed]',
  },
];

const chunks: LearningChunk[] = [
  {
    id: 'chunk-1',
    title: 'Questions & Time',
    vocabularyIds: ['m4_q_nuqDaq', 'm4_q_ghorgh', 'm4_q_nuq', 'm4_q_chay', 'm4_t_DaHjaj', 'm4_t_wa_Hu', 'm4_t_wa_leS', 'm4_sfx_taH', 'm4_sfx_pu'],
    buildExerciseIds: ['m4_ex_c1_1', 'm4_ex_c1_2', 'm4_ex_c1_3', 'm4_ex_c1_4', 'm4_ex_c1_5', 'm4_ex_c1_6', 'm4_ex_c1_7', 'm4_ex_c1_8'],
  },
  {
    id: 'chunk-2',
    title: 'Place & Aspect',
    vocabularyIds: ['m4_v_Dab', 'm4_n_pIq', 'm4_pfx_lI'],
    buildExerciseIds: ['m4_ex_c2_1', 'm4_ex_c2_2', 'm4_ex_c2_3', 'm4_ex_c2_4', 'm4_ex_c2_5', 'm4_ex_c2_6', 'm4_ex_c2_7', 'm4_ex_c2_8'],
  },
];

const buildExercises: BuildExercise[] = [...chunk1Exercises, ...chunk2Exercises];

// ============================================================================
// QUIZ QUESTIONS
// ============================================================================

const quizQuestions: QuizQuestion[] = [
  {
    id: 'm4_quiz_1',
    moduleId: 4,
    type: 'tlh-to-en',
    question: 'What does this mean?',
    klingonText: 'nuqDaq',
    options: ['where?', 'when?', 'what?', 'how?'],
    correctIndex: 0,
  },
  {
    id: 'm4_quiz_2',
    moduleId: 4,
    type: 'tlh-to-en',
    question: 'What does this mean?',
    klingonText: 'DaHjaj',
    options: ['yesterday', 'tomorrow', 'today', 'future'],
    correctIndex: 2,
  },
  {
    id: 'm4_quiz_3',
    moduleId: 4,
    type: 'tlh-to-en',
    question: 'What does this mean?',
    klingonText: 'jISoptaH',
    options: ['I ate', 'I am eating (ongoing)', 'I will eat', 'you eat'],
    correctIndex: 1,
  },
  {
    id: 'm4_quiz_4',
    moduleId: 4,
    type: 'en-to-tlh',
    question: 'when?',
    options: ['nuq', 'ghorgh', 'nuqDaq', "chay'"],
    correctIndex: 1,
  },
  {
    id: 'm4_quiz_5',
    moduleId: 4,
    type: 'en-to-tlh',
    question: 'yesterday',
    options: ['DaHjaj', "wa'leS", "wa'Hu'", 'pIq'],
    correctIndex: 2,
  },
  {
    id: 'm4_quiz_6',
    moduleId: 4,
    type: 'en-to-tlh',
    question: 'I have seen it (completed)',
    options: ["vIleghpu'", 'vIlegh', 'vIleghtaH', 'DaleghPu'],
    correctIndex: 0,
  },
  {
    id: 'm4_quiz_7',
    moduleId: 4,
    type: 'audio-recognition',
    question: 'What does this word mean?',
    klingonText: 'ghorgh',
    options: ['how?', 'where?', 'when?', 'what?'],
    correctIndex: 2,
  },
  {
    id: 'm4_quiz_8',
    moduleId: 4,
    type: 'audio-recognition',
    question: 'What does this suffix mean?',
    klingonText: 'taH',
    options: ['completed', 'continuing', 'negative', 'emphatic'],
    correctIndex: 1,
  },
  {
    id: 'm4_quiz_9',
    moduleId: 4,
    type: 'en-to-tlh',
    question: 'Tomorrow I will go',
    options: ["wa'Hu' jIjaH", "wa'leS jIjaH", 'DaHjaj jIjaH', "wa'leS bIjaH"],
    correctIndex: 1,
  },
  {
    id: 'm4_quiz_10',
    moduleId: 4,
    type: 'en-to-tlh',
    question: 'how?',
    options: ['ghorgh', 'nuqDaq', "chay'", 'nuq'],
    correctIndex: 2,
  },
];

// ============================================================================
// MODULE EXPORT
// ============================================================================

const module4: Module = {
  id: 4,
  titleEn: 'Time & Questions',
  titleTlh: 'poH & ghel',
  theme: 'When, Where & How',
  color: '#eab308',
  chunks,
  bricks,
  mortar,
  buildExercises,
  quizQuestions,
};

export default module4;
