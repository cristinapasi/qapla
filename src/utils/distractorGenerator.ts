/**
 * Distractor Generator
 * Creates plausible wrong answers for multiple choice questions
 */

import { KlingonPiece } from '../types/models';

/**
 * Generate 3 plausible distractors for a given word
 * Returns the correct answer + 3 wrong answers, shuffled
 */
export function generateOptions(
  correctWord: KlingonPiece,
  allWords: KlingonPiece[]
): string[] {
  const correctAnswer = correctWord.en;

  // Filter to get potential distractors (same type or related)
  const potentialDistractors = allWords
    .filter((w) => w.id !== correctWord.id)
    .filter((w) => {
      // For verbs/nouns/adjectives, prefer same type
      if (correctWord.type === 'verb' || correctWord.type === 'noun' || correctWord.type === 'adj') {
        return w.type === correctWord.type;
      }
      // For prefixes/suffixes, allow any mortar
      if (correctWord.category === 'mortar') {
        return w.category === 'mortar';
      }
      return true;
    });

  // If not enough of same type, allow any word
  const distractorPool = potentialDistractors.length >= 3
    ? potentialDistractors
    : allWords.filter((w) => w.id !== correctWord.id);

  // Randomly select 3 distractors
  const distractors = shuffleArray(distractorPool)
    .slice(0, 3)
    .map((w) => w.en);

  // Combine and shuffle
  const options = [correctAnswer, ...distractors];
  return shuffleArray(options);
}

/**
 * Fisher-Yates shuffle
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get correct option index after shuffling
 */
export function getCorrectIndex(options: string[], correctAnswer: string): number {
  return options.indexOf(correctAnswer);
}
