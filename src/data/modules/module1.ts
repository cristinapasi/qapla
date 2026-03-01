/**
 * Module 1: Survival Basics — "Eat, Drink & Get Around"
 * Theme: Immediate physical needs and navigation
 */

import { Module, KlingonPiece, BuildExercise, QuizQuestion, LearningChunk } from '../../types/models';

// ============================================================================
// BRICKS (Content Words)
// ============================================================================

const bricks: KlingonPiece[] = [
  {
    id: 'v_sop',
    tlh: 'Sop',
    en: 'eat',
    type: 'verb',
    phonetic: 'SHOP',
    moduleIntroduced: 1,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Used for eating food',
    showExample: true,
    exampleSentence: 'jISop',
    exampleTranslation: 'I eat',
  },
  {
    id: 'v_tlhutlh',
    tlh: 'tlhutlh',
    en: 'drink',
    type: 'verb',
    phonetic: 'TLOOTL',
    moduleIntroduced: 1,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Used for drinking liquids',
  },
  {
    id: 'v_jah',
    tlh: 'jaH',
    en: 'go',
    type: 'verb',
    phonetic: 'JAH',
    moduleIntroduced: 1,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Motion away from speaker',
    showExample: true,
    exampleSentence: 'juHDaq jIjaH',
    exampleTranslation: 'I go home',
  },
  {
    id: 'v_ghos',
    tlh: 'ghoS',
    en: 'come, approach',
    type: 'verb',
    phonetic: 'GHOSH',
    moduleIntroduced: 1,
    category: 'brick',
    attachBehavior: 'standalone',
    usageHint: 'Motion toward speaker',
    showExample: true,
    exampleSentence: 'juHDaq maghoS',
    exampleTranslation: 'we come home',
  },
  {
    id: 'v_ba',
    tlh: "ba'",
    en: 'sit',
    type: 'verb',
    phonetic: 'BAH',
    moduleIntroduced: 1,
    category: 'brick',
    attachBehavior: 'standalone',
  },
  {
    id: 'v_qong',
    tlh: 'Qong',
    en: 'sleep',
    type: 'verb',
    phonetic: 'KHONG',
    moduleIntroduced: 1,
    category: 'brick',
    attachBehavior: 'standalone',
  },
  {
    id: 'v_ghop',
    tlh: 'ghop',
    en: 'grab, take',
    type: 'verb',
    phonetic: 'GHOP',
    moduleIntroduced: 1,
    category: 'brick',
    attachBehavior: 'standalone',
  },
  {
    id: 'n_soj',
    tlh: 'Soj',
    en: 'food',
    type: 'noun',
    phonetic: 'SHOJ',
    moduleIntroduced: 1,
    category: 'brick',
    attachBehavior: 'standalone',
  },
  {
    id: 'n_biq',
    tlh: 'bIQ',
    en: 'water',
    type: 'noun',
    phonetic: 'BIKH',
    moduleIntroduced: 1,
    category: 'brick',
    attachBehavior: 'standalone',
  },
  {
    id: 'n_hiq',
    tlh: 'HIq',
    en: 'ale, alcohol',
    type: 'noun',
    phonetic: 'HEEKH',
    moduleIntroduced: 1,
    category: 'brick',
    attachBehavior: 'standalone',
  },
  {
    id: 'n_qe',
    tlh: "Qe'",
    en: 'restaurant',
    type: 'noun',
    phonetic: 'KHEH',
    moduleIntroduced: 1,
    category: 'brick',
    attachBehavior: 'standalone',
  },
  {
    id: 'n_juh',
    tlh: 'juH',
    en: 'home',
    type: 'noun',
    phonetic: 'JOOH',
    moduleIntroduced: 1,
    category: 'brick',
    attachBehavior: 'standalone',
  },
  {
    id: 'n_pa',
    tlh: "pa'",
    en: 'room',
    type: 'noun',
    phonetic: 'PAH',
    moduleIntroduced: 1,
    category: 'brick',
    attachBehavior: 'standalone',
  },
];

// ============================================================================
// MORTAR (Structural Pieces)
// ============================================================================

const mortar: KlingonPiece[] = [
  {
    id: 'pfx_ji',
    tlh: 'jI',
    en: 'I (do, no object)',
    type: 'prefix',
    phonetic: 'JEE',
    moduleIntroduced: 1,
    category: 'mortar',
    attachBehavior: 'attach-before',
    usageHint: 'Subject prefix for first person singular intransitive',
    showExample: true,
    exampleSentence: 'jISop',
    exampleTranslation: 'I eat',
  },
  {
    id: 'pfx_bi',
    tlh: 'bI',
    en: 'you (do, no object)',
    type: 'prefix',
    phonetic: 'BEE',
    moduleIntroduced: 1,
    category: 'mortar',
    attachBehavior: 'attach-before',
    usageHint: 'Subject prefix for second person singular intransitive',
    showExample: true,
    exampleSentence: 'bISop',
    exampleTranslation: 'you eat',
  },
  {
    id: 'pfx_ma',
    tlh: 'ma',
    en: 'we (do, no object)',
    type: 'prefix',
    phonetic: 'MAH',
    moduleIntroduced: 1,
    category: 'mortar',
    attachBehavior: 'attach-before',
    usageHint: 'Subject prefix for first person plural intransitive',
    showExample: true,
    exampleSentence: 'majaH',
    exampleTranslation: 'we go',
  },
  {
    id: 'pfx_vi',
    tlh: 'vI',
    en: 'I → it/him/her',
    type: 'prefix',
    phonetic: 'VEE',
    moduleIntroduced: 1,
    category: 'mortar',
    attachBehavior: 'attach-before',
    usageHint: 'I do something to it/him/her',
    showExample: true,
    exampleSentence: 'bIQ vItlhutlh',
    exampleTranslation: 'I drink water',
  },
  {
    id: 'sfx_daq',
    tlh: 'Daq',
    en: 'at, to, in (location)',
    type: 'suffix',
    phonetic: 'DAKH',
    moduleIntroduced: 1,
    category: 'mortar',
    attachBehavior: 'attach-after',
    usageHint: 'Attaches to nouns to show location',
    showExample: true,
    exampleSentence: 'juHDaq majaH',
    exampleTranslation: 'we go home (to home)',
  },
  {
    id: 'sfx_a',
    tlh: "'a'",
    en: 'yes/no question marker',
    type: 'suffix',
    phonetic: 'AH',
    moduleIntroduced: 1,
    category: 'mortar',
    attachBehavior: 'attach-after',
    usageHint: 'Attaches to verbs to form questions',
    showExample: true,
    exampleSentence: "bISop'a'",
    exampleTranslation: 'do you eat?',
  },
];

// ============================================================================
// BUILD EXERCISES
// ============================================================================

const buildExercises: BuildExercise[] = [
  {
    id: 'm1_ex_001',
    moduleId: 1,
    englishPrompt: 'I eat.',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'Sop', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jISop',
    phonetic: 'JEE-SHOP',
    literalTranslation: 'I-eat',
    explanation: 'jI- (I) + Sop (eat) combine into jISop',
  },
  {
    id: 'm1_ex_002',
    moduleId: 1,
    englishPrompt: 'I drink water.',
    tiles: [
      { text: 'bIQ', attachRight: false, attachLeft: false },
      { text: 'vI', attachRight: true, attachLeft: false },
      { text: 'tlhutlh', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'bIQ vItlhutlh',
    phonetic: 'BIKH, VEE-TLOOTL',
    literalTranslation: 'water I-drink',
    explanation: 'Object-Verb-Subject order in Klingon',
  },
  {
    id: 'm1_ex_003',
    moduleId: 1,
    englishPrompt: 'We go home.',
    tiles: [
      { text: 'juH', attachRight: false, attachLeft: false },
      { text: 'Daq', attachRight: false, attachLeft: true },
      { text: 'ma', attachRight: true, attachLeft: false },
      { text: 'jaH', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'juHDaq majaH',
    phonetic: 'JOOH-DAKH, MAH-JAH',
    literalTranslation: 'home-to we-go',
    explanation: '-Daq attaches to juH (home) to mean "to home"',
  },
  {
    id: 'm1_ex_004',
    moduleId: 1,
    englishPrompt: 'I eat at the restaurant.',
    tiles: [
      { text: "Qe'", attachRight: false, attachLeft: false },
      { text: 'Daq', attachRight: false, attachLeft: true },
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'Sop', attachRight: false, attachLeft: true },
    ],
    correctAnswer: "Qe'Daq jISop",
    phonetic: 'KHEH-DAKH, JEE-SHOP',
    literalTranslation: 'restaurant-at I-eat',
    explanation: 'Location comes first with -Daq suffix',
  },
  {
    id: 'm1_ex_005',
    moduleId: 1,
    englishPrompt: 'Do you sleep?',
    tiles: [
      { text: 'bI', attachRight: true, attachLeft: false },
      { text: 'Qong', attachRight: true, attachLeft: true },
      { text: "'a'", attachRight: false, attachLeft: true },
    ],
    correctAnswer: "bIQong'a'",
    phonetic: 'BEE-KHONG-AH',
    literalTranslation: 'you-sleep-[question]',
    explanation: "-'a' makes it a yes/no question",
  },
  {
    id: 'm1_ex_006',
    moduleId: 1,
    englishPrompt: 'Do you drink ale?',
    tiles: [
      { text: 'HIq', attachRight: false, attachLeft: false },
      { text: 'Da', attachRight: true, attachLeft: false },
      { text: 'tlhutlh', attachRight: true, attachLeft: true },
      { text: "'a'", attachRight: false, attachLeft: true },
    ],
    correctAnswer: "HIq Datlhutlh'a'",
    phonetic: 'HEEKH, DAH-TLOOTL-AH',
    literalTranslation: 'ale you-drink-[question]',
    explanation: 'Da- means "you do something to it"',
  },
  {
    id: 'm1_ex_007',
    moduleId: 1,
    englishPrompt: 'I sit in the room.',
    tiles: [
      { text: "pa'", attachRight: false, attachLeft: false },
      { text: 'Daq', attachRight: false, attachLeft: true },
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: "ba'", attachRight: false, attachLeft: true },
    ],
    correctAnswer: "pa'Daq jIba'",
    phonetic: 'PAH-DAKH, JEE-BAH',
    literalTranslation: 'room-in I-sit',
    explanation: 'Location with -Daq comes before the verb',
  },
  {
    id: 'm1_ex_008',
    moduleId: 1,
    englishPrompt: 'We drink water.',
    tiles: [
      { text: 'bIQ', attachRight: false, attachLeft: false },
      { text: 'wI', attachRight: true, attachLeft: false },
      { text: 'tlhutlh', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'bIQ wItlhutlh',
    phonetic: 'BIKH, WEE-TLOOTL',
    literalTranslation: 'water we-drink',
    explanation: 'wI- means "we do something to it"',
  },
  // Additional Chunk 1 exercises (need 4 more for 6 words)
  {
    id: 'm1_ex_009',
    moduleId: 1,
    englishPrompt: 'You eat.',
    tiles: [
      { text: 'bI', attachRight: true, attachLeft: false },
      { text: 'Sop', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'bISop',
    phonetic: 'BEE-SHOP',
    literalTranslation: 'you-eat',
    explanation: 'bI- is the prefix for "you" with intransitive verbs',
  },
  {
    id: 'm1_ex_010',
    moduleId: 1,
    englishPrompt: 'You drink.',
    tiles: [
      { text: 'bI', attachRight: true, attachLeft: false },
      { text: 'tlhutlh', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'bItlhutlh',
    phonetic: 'BEE-TLOOTL',
    literalTranslation: 'you-drink',
    explanation: 'Without an object, we use the intransitive prefix',
  },
  {
    id: 'm1_ex_011',
    moduleId: 1,
    englishPrompt: 'I drink.',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'tlhutlh', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jItlhutlh',
    phonetic: 'JEE-TLOOTL',
    literalTranslation: 'I-drink',
    explanation: 'jI- for "I" when there is no object',
  },
  {
    id: 'm1_ex_012',
    moduleId: 1,
    englishPrompt: 'I eat food.',
    tiles: [
      { text: 'soj', attachRight: false, attachLeft: false },
      { text: 'vI', attachRight: true, attachLeft: false },
      { text: 'Sop', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'soj vISop',
    phonetic: 'SODGE, VEE-SHOP',
    literalTranslation: 'food I-eat',
    explanation: 'With an object, we use vI- (I do it)',
  },
  // Additional Chunk 2 exercises (need 4 more for 6 words)
  {
    id: 'm1_ex_013',
    moduleId: 1,
    englishPrompt: 'You go.',
    tiles: [
      { text: 'bI', attachRight: true, attachLeft: false },
      { text: 'jaH', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'bIjaH',
    phonetic: 'BEE-JAH',
    literalTranslation: 'you-go',
    explanation: 'Motion away from speaker',
  },
  {
    id: 'm1_ex_014',
    moduleId: 1,
    englishPrompt: 'We come.',
    tiles: [
      { text: 'ma', attachRight: true, attachLeft: false },
      { text: 'ghoS', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'maghoS',
    phonetic: 'MAH-GHOSH',
    literalTranslation: 'we-come',
    explanation: 'Motion toward speaker',
  },
  {
    id: 'm1_ex_015',
    moduleId: 1,
    englishPrompt: 'I go to the restaurant.',
    tiles: [
      { text: "Qe'", attachRight: false, attachLeft: false },
      { text: 'Daq', attachRight: false, attachLeft: true },
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'jaH', attachRight: false, attachLeft: true },
    ],
    correctAnswer: "Qe'Daq jIjaH",
    phonetic: 'KHEH-DAKH, JEE-JAH',
    literalTranslation: 'restaurant-to I-go',
    explanation: 'Location with -Daq comes first',
  },
  {
    id: 'm1_ex_016',
    moduleId: 1,
    englishPrompt: 'We come home.',
    tiles: [
      { text: 'juH', attachRight: false, attachLeft: false },
      { text: 'Daq', attachRight: false, attachLeft: true },
      { text: 'ma', attachRight: true, attachLeft: false },
      { text: 'ghoS', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'juHDaq maghoS',
    phonetic: 'JOOH-DAKH, MAH-GHOSH',
    literalTranslation: 'home-to we-come',
    explanation: 'Coming toward home as a destination',
  },
  // Additional Chunk 3 exercises (need 4 more for 7 words)
  {
    id: 'm1_ex_017',
    moduleId: 1,
    englishPrompt: 'I sleep.',
    tiles: [
      { text: 'jI', attachRight: true, attachLeft: false },
      { text: 'Qong', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'jIQong',
    phonetic: 'JEE-KHONG',
    literalTranslation: 'I-sleep',
    explanation: 'Simple intransitive verb with jI-',
  },
  {
    id: 'm1_ex_018',
    moduleId: 1,
    englishPrompt: 'You sit.',
    tiles: [
      { text: 'bI', attachRight: true, attachLeft: false },
      { text: "ba'", attachRight: false, attachLeft: true },
    ],
    correctAnswer: "bIba'",
    phonetic: 'BEE-BAH',
    literalTranslation: 'you-sit',
    explanation: 'Another intransitive verb',
  },
  {
    id: 'm1_ex_019',
    moduleId: 1,
    englishPrompt: 'I grab the ale.',
    tiles: [
      { text: 'HIq', attachRight: false, attachLeft: false },
      { text: 'vI', attachRight: true, attachLeft: false },
      { text: 'ghop', attachRight: false, attachLeft: true },
    ],
    correctAnswer: 'HIq vIghop',
    phonetic: 'HEEKH, VEE-GHOP',
    literalTranslation: 'ale I-grab',
    explanation: 'ghop means to grab or take',
  },
  {
    id: 'm1_ex_020',
    moduleId: 1,
    englishPrompt: 'Do you sit?',
    tiles: [
      { text: 'bI', attachRight: true, attachLeft: false },
      { text: "ba'", attachRight: true, attachLeft: true },
      { text: "'a'", attachRight: false, attachLeft: true },
    ],
    correctAnswer: "bIba''a'",
    phonetic: 'BEE-BAH-AH',
    literalTranslation: 'you-sit-[question]',
    explanation: "Adding -'a' to make a yes/no question",
  },
];

// ============================================================================
// QUIZ QUESTIONS
// ============================================================================

const quizQuestions: QuizQuestion[] = [
  // Klingon → English questions
  {
    id: 'm1_quiz_001',
    moduleId: 1,
    type: 'tlh-to-en',
    question: 'What does "Sop" mean?',
    options: ['eat', 'drink', 'sleep', 'go'],
    correctIndex: 0,
    phonetic: 'SHOP',
    klingonText: 'Sop',
  },
  {
    id: 'm1_quiz_002',
    moduleId: 1,
    type: 'tlh-to-en',
    question: 'What does "bIQ" mean?',
    options: ['water', 'food', 'ale', 'home'],
    correctIndex: 0,
    phonetic: 'BIKH',
    klingonText: 'bIQ',
  },
  {
    id: 'm1_quiz_003',
    moduleId: 1,
    type: 'tlh-to-en',
    question: 'What does "juH" mean?',
    options: ['home', 'restaurant', 'room', 'table'],
    correctIndex: 0,
    phonetic: 'JOOH',
    klingonText: 'juH',
  },

  // English → Klingon questions
  {
    id: 'm1_quiz_004',
    moduleId: 1,
    type: 'en-to-tlh',
    question: 'How do you say "drink" in Klingon?',
    options: ['tlhutlh', 'Sop', 'jaH', 'Qong'],
    correctIndex: 0,
    klingonText: 'tlhutlh',
  },
  {
    id: 'm1_quiz_005',
    moduleId: 1,
    type: 'en-to-tlh',
    question: 'How do you say "food" in Klingon?',
    options: ['Soj', 'bIQ', 'HIq', 'Sop'],
    correctIndex: 0,
    klingonText: 'Soj',
  },

  // Audio recognition questions
  {
    id: 'm1_quiz_006',
    moduleId: 1,
    type: 'audio-recognition',
    question: 'Listen and select the correct meaning:',
    options: ['sleep', 'sit', 'go', 'eat'],
    correctIndex: 0,
    phonetic: 'KHONG',
    klingonText: 'Qong',
  },
  {
    id: 'm1_quiz_007',
    moduleId: 1,
    type: 'audio-recognition',
    question: 'Listen and select the correct meaning:',
    options: ['restaurant', 'home', 'room', 'table'],
    correctIndex: 0,
    phonetic: 'KHEH',
    klingonText: "Qe'",
  },

  // Fill-the-gap questions
  {
    id: 'm1_quiz_008',
    moduleId: 1,
    type: 'fill-gap',
    question: 'Complete: "I eat" → ___ Sop',
    options: ['jI', 'bI', 'ma', 'vI'],
    correctIndex: 0,
    klingonText: 'jISop',
  },
  {
    id: 'm1_quiz_009',
    moduleId: 1,
    type: 'fill-gap',
    question: 'Complete: "at home" → juH___',
    options: ['Daq', "'a'", 'wIj', 'vI'],
    correctIndex: 0,
    klingonText: 'juHDaq',
  },

  // Sentence recognition
  {
    id: 'm1_quiz_010',
    moduleId: 1,
    type: 'tlh-to-en',
    question: 'What does "jIQong" mean?',
    options: ['I sleep', 'you sleep', 'I eat', 'you eat'],
    correctIndex: 0,
    phonetic: 'JEE-KHONG',
    klingonText: 'jIQong',
  },
];

// ============================================================================
// LEARNING CHUNKS (Thematic Vocabulary Groupings)
// ============================================================================

const chunks: LearningChunk[] = [
  {
    id: 'chunk-1',
    title: 'Basic Actions',
    vocabularyIds: [
      'v_sop',      // eat
      'v_tlhutlh',  // drink
      'pfx_ji',     // I (intransitive)
      'pfx_bi',     // you (intransitive)
      'n_soj',      // food
      'n_biq',      // water
    ],
    buildExerciseIds: ['m1_ex_001', 'm1_ex_002', 'm1_ex_009', 'm1_ex_010', 'm1_ex_011', 'm1_ex_012'],
  },
  {
    id: 'chunk-2',
    title: 'Movement & Places',
    vocabularyIds: [
      'v_jah',      // go
      'v_ghos',     // come, approach
      'n_juh',      // home
      'n_qe',       // restaurant
      'sfx_daq',    // location suffix (at, to, in)
      'pfx_ma',     // we (intransitive)
    ],
    buildExerciseIds: ['m1_ex_003', 'm1_ex_004', 'm1_ex_013', 'm1_ex_014', 'm1_ex_015', 'm1_ex_016'],
  },
  {
    id: 'chunk-3',
    title: 'Posture & More',
    vocabularyIds: [
      'v_ba',       // sit
      'v_qong',     // sleep
      'v_ghop',     // grab, take
      'n_pa',       // room
      'n_hiq',      // ale, alcohol
      'pfx_vi',     // I → it/him/her (transitive)
      'sfx_a',      // question marker
    ],
    buildExerciseIds: ['m1_ex_005', 'm1_ex_006', 'm1_ex_007', 'm1_ex_017', 'm1_ex_018', 'm1_ex_019', 'm1_ex_020'],
  },
];

// ============================================================================
// EXPORT MODULE
// ============================================================================

export const module1: Module = {
  id: 1,
  titleEn: 'Survival Basics',
  titleTlh: 'yIn motlh',
  theme: 'Eat, Drink & Get Around',
  color: '#f97316', // orange
  chunks,
  bricks,
  mortar,
  buildExercises,
  quizQuestions,
};
