/**
 * Match Question Generator
 * Generates matching/recognition questions from vocabulary for the Match phase
 */

import { KlingonPiece, MatchQuestion, MatchRoundType } from '../types/models';

/**
 * Generate match questions from vocabulary
 * Creates three round types: pick-meaning, pick-klingon, pick-function
 */
export function generateMatchQuestions(
  vocabulary: KlingonPiece[],
  targetCount: number = 12
): MatchQuestion[] {
  const questions: MatchQuestion[] = [];

  // Calculate questions per round (aim for roughly equal distribution)
  const questionsPerRound = Math.ceil(targetCount / 3);

  // Shuffle vocabulary for randomization
  const shuffled = [...vocabulary].sort(() => Math.random() - 0.5);

  // Round 1: Pick the meaning (Klingon → English)
  for (let i = 0; i < Math.min(questionsPerRound, shuffled.length); i++) {
    const piece = shuffled[i];
    questions.push(createPickMeaningQuestion(piece, vocabulary));
  }

  // Round 2: Pick the Klingon (English → Klingon)
  for (let i = 0; i < Math.min(questionsPerRound, shuffled.length); i++) {
    const piece = shuffled[(i + questionsPerRound) % shuffled.length];
    questions.push(createPickKlingonQuestion(piece, vocabulary));
  }

  // Round 3: Pick the function (for prefixes/suffixes)
  const grammarPieces = vocabulary.filter(v =>
    v.type === 'prefix' || v.type === 'suffix'
  );

  if (grammarPieces.length > 0) {
    for (let i = 0; i < Math.min(questionsPerRound, grammarPieces.length); i++) {
      const piece = grammarPieces[i % grammarPieces.length];
      questions.push(createPickFunctionQuestion(piece, grammarPieces));
    }
  } else {
    // If no grammar pieces, add more pick-klingon questions
    for (let i = 0; i < questionsPerRound; i++) {
      const piece = shuffled[i % shuffled.length];
      questions.push(createPickKlingonQuestion(piece, vocabulary));
    }
  }

  // Shuffle all questions together
  return questions.sort(() => Math.random() - 0.5).slice(0, targetCount);
}

/**
 * Create a "pick the meaning" question (show Klingon, choose English)
 */
function createPickMeaningQuestion(
  correctPiece: KlingonPiece,
  allVocabulary: KlingonPiece[]
): MatchQuestion {
  const distractors = generateDistractionOptions(correctPiece, allVocabulary, 3);
  const options = shuffleOptions([correctPiece.en, ...distractors.map(d => d.en)]);
  const correctIndex = options.indexOf(correctPiece.en);

  return {
    id: `match-pm-${correctPiece.id}`,
    roundType: 'pick-meaning',
    prompt: correctPiece.tlh,
    options,
    correctIndex,
    klingonText: correctPiece.tlh,
    vocabularyId: correctPiece.id,
  };
}

/**
 * Create a "pick the Klingon" question (show English, choose Klingon)
 */
function createPickKlingonQuestion(
  correctPiece: KlingonPiece,
  allVocabulary: KlingonPiece[]
): MatchQuestion {
  const distractors = generateDistractionOptions(correctPiece, allVocabulary, 3);
  const options = shuffleOptions([correctPiece.tlh, ...distractors.map(d => d.tlh)]);
  const correctIndex = options.indexOf(correctPiece.tlh);

  return {
    id: `match-pk-${correctPiece.id}`,
    roundType: 'pick-klingon',
    prompt: correctPiece.en,
    options,
    correctIndex,
    vocabularyId: correctPiece.id,
  };
}

/**
 * Create a "pick the function" question (show usage description, choose Klingon)
 * For prefixes and suffixes
 */
function createPickFunctionQuestion(
  correctPiece: KlingonPiece,
  grammarPieces: KlingonPiece[]
): MatchQuestion {
  // Use usageHint or construct a description
  const description = correctPiece.usageHint ||
                     `${correctPiece.type}: ${correctPiece.en}`;

  const distractors = generateDistractionOptions(correctPiece, grammarPieces, 3);
  const options = shuffleOptions([correctPiece.tlh, ...distractors.map(d => d.tlh)]);
  const correctIndex = options.indexOf(correctPiece.tlh);

  return {
    id: `match-pf-${correctPiece.id}`,
    roundType: 'pick-function',
    prompt: description,
    options,
    correctIndex,
    vocabularyId: correctPiece.id,
  };
}

/**
 * Generate distraction options (wrong answers)
 * Prefer same type, then fallback to any
 */
function generateDistractionOptions(
  correctPiece: KlingonPiece,
  allVocabulary: KlingonPiece[],
  count: number
): KlingonPiece[] {
  // Filter out the correct answer
  const candidates = allVocabulary.filter(v => v.id !== correctPiece.id);

  // Try to get same-type distractors first
  const sameType = candidates.filter(v => v.type === correctPiece.type);

  if (sameType.length >= count) {
    return shuffleArray(sameType).slice(0, count);
  }

  // Not enough same-type, mix with others
  const shuffled = shuffleArray(candidates);
  return shuffled.slice(0, count);
}

/**
 * Shuffle an array of strings
 */
function shuffleOptions(options: string[]): string[] {
  return [...options].sort(() => Math.random() - 0.5);
}

/**
 * Shuffle an array
 */
function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}
