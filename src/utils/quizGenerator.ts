/**
 * Quiz Generator
 * Creates quiz questions from vocabulary and exercises
 */

import { KlingonPiece, QuizQuestion } from '../types/models';

/**
 * Generate quiz questions for a module
 */
export function generateQuizQuestions(
  vocabulary: KlingonPiece[],
  moduleId: number
): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  // Filter vocabulary by type
  const verbs = vocabulary.filter((v) => v.type === 'verb');
  const nouns = vocabulary.filter((v) => v.type === 'noun');
  const prefixes = vocabulary.filter((v) => v.type === 'prefix');
  const suffixes = vocabulary.filter((v) => v.type === 'suffix');

  // Generate Klingon → English questions (verbs and nouns)
  const tlhToEnCandidates = [...verbs, ...nouns].slice(0, 3);
  tlhToEnCandidates.forEach((word, index) => {
    const distractors = vocabulary
      .filter((v) => v.id !== word.id && v.type === word.type)
      .slice(0, 3)
      .map((v) => v.en);

    const options = shuffleArray([word.en, ...distractors]);

    questions.push({
      id: `m${moduleId}_quiz_tlh_en_${index}`,
      moduleId,
      type: 'tlh-to-en',
      question: `What does "${word.tlh}" mean?`,
      options,
      correctIndex: options.indexOf(word.en),
      phonetic: word.phonetic,
      klingonText: word.tlh,
    });
  });

  // Generate English → Klingon questions
  const enToTlhCandidates = [...verbs, ...nouns].slice(3, 6);
  enToTlhCandidates.forEach((word, index) => {
    const distractors = vocabulary
      .filter((v) => v.id !== word.id && v.type === word.type)
      .slice(0, 3)
      .map((v) => v.tlh);

    const options = shuffleArray([word.tlh, ...distractors]);

    questions.push({
      id: `m${moduleId}_quiz_en_tlh_${index}`,
      moduleId,
      type: 'en-to-tlh',
      question: `How do you say "${word.en}" in Klingon?`,
      options,
      correctIndex: options.indexOf(word.tlh),
      klingonText: word.tlh,
    });
  });

  // Generate Audio Recognition questions
  const audioCandidates = [...verbs, ...nouns].slice(6, 8);
  audioCandidates.forEach((word, index) => {
    const distractors = vocabulary
      .filter((v) => v.id !== word.id && v.type === word.type)
      .slice(0, 3)
      .map((v) => v.en);

    const options = shuffleArray([word.en, ...distractors]);

    questions.push({
      id: `m${moduleId}_quiz_audio_${index}`,
      moduleId,
      type: 'audio-recognition',
      question: `Listen and select the correct meaning:`,
      options,
      correctIndex: options.indexOf(word.en),
      phonetic: word.phonetic,
      klingonText: word.tlh,
    });
  });

  // Generate Fill-the-Gap questions (using prefixes/suffixes)
  if (prefixes.length > 0) {
    const prefix = prefixes[0];
    const verb = verbs[0];

    questions.push({
      id: `m${moduleId}_quiz_fill_gap_1`,
      moduleId,
      type: 'fill-gap',
      question: `Complete: "I ${verb.en}" → ___ ${verb.tlh}`,
      options: shuffleArray([prefix.tlh, ...prefixes.slice(1, 4).map((p) => p.tlh)]),
      correctIndex: 0, // Will be recalculated after shuffle
      klingonText: `${prefix.tlh}${verb.tlh}`,
    });

    // Recalculate correct index after shuffle
    const lastQuestion = questions[questions.length - 1];
    lastQuestion.correctIndex = lastQuestion.options.indexOf(prefix.tlh);
  }

  return questions;
}

/**
 * Shuffle array helper
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
