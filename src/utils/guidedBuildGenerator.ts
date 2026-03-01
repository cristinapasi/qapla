/**
 * Guided Build Exercise Generator
 * Converts regular BuildExercises into GuidedBuildExercises with pre-filled tiles
 */

import { BuildExercise, GuidedBuildExercise, BuildTile } from '../types/models';

/**
 * Generate guided build exercises from regular build exercises
 * Creates 8-10 exercises with mixed difficulty (1-4 blanks)
 */
export function generateGuidedBuildExercises(
  buildExercises: BuildExercise[],
  targetCount: number = 8
): GuidedBuildExercise[] {
  const guided: GuidedBuildExercise[] = [];

  // Difficulty distribution: mix of 1, 2, 3, and 4-blank exercises
  const difficultyPattern = [1, 2, 1, 3, 2, 1, 4, 2, 3, 1];

  for (let i = 0; i < Math.min(targetCount, buildExercises.length); i++) {
    const exercise = buildExercises[i];
    const blanksCount = difficultyPattern[i % difficultyPattern.length];

    // Don't remove more blanks than tiles available
    const actualBlanks = Math.min(blanksCount, Math.max(1, exercise.tiles.length - 1));

    guided.push(createGuidedExercise(exercise, actualBlanks));
  }

  return guided;
}

/**
 * Create a guided build exercise from a regular build exercise
 */
function createGuidedExercise(
  original: BuildExercise,
  blanksCount: number
): GuidedBuildExercise {
  const totalTiles = original.tiles.length;

  // Randomly select which tiles to remove (make blank)
  const blankIndices = selectRandomIndices(totalTiles, blanksCount);

  // Create sentence structure with nulls for blanks, tiles for prefilled
  const sentenceStructure: (BuildTile | null)[] = original.tiles.map((tile, index) => {
    return blankIndices.includes(index) ? null : tile;
  });

  // Collect missing tiles for available pool
  const missingTiles: BuildTile[] = [];
  original.tiles.forEach((tile, index) => {
    if (blankIndices.includes(index)) {
      missingTiles.push(tile);
    }
  });

  // Generate 2-3 distractor tiles
  const distractors = generateDistractorTiles(original.tiles, missingTiles, 2);

  // Combine missing + distractors and shuffle
  const availableTiles = shuffleArray([...missingTiles, ...distractors]);

  return {
    id: `guided-${original.id}`,
    moduleId: original.moduleId,
    englishPrompt: original.englishPrompt,
    sentenceStructure,
    availableTiles,
    correctAnswer: original.correctAnswer,
    phonetic: original.phonetic,
    literalTranslation: original.literalTranslation,
    explanation: original.explanation,
    blanksCount,
  };
}

/**
 * Select random indices for blanks
 */
function selectRandomIndices(total: number, count: number): number[] {
  const indices: number[] = [];
  const available = Array.from({ length: total }, (_, i) => i);

  while (indices.length < count && available.length > 0) {
    const randomIndex = Math.floor(Math.random() * available.length);
    indices.push(available[randomIndex]);
    available.splice(randomIndex, 1);
  }

  return indices.sort((a, b) => a - b);
}

/**
 * Generate distractor tiles (wrong answer tiles)
 */
function generateDistractorTiles(
  allTiles: BuildTile[],
  correctTiles: BuildTile[],
  count: number
): BuildTile[] {
  // Create a pool of tiles that aren't in the correct answer
  const correctTexts = new Set(correctTiles.map(t => t.text));
  const candidates = allTiles.filter(t => !correctTexts.has(t.text));

  // If not enough candidates from the exercise, create generic distractors
  if (candidates.length < count) {
    const genericDistractors: BuildTile[] = [
      { text: 'nuq', attachRight: false, attachLeft: false },
      { text: 'ghaH', attachRight: false, attachLeft: false },
      { text: 'net', attachRight: false, attachLeft: false },
      { text: "'e'", attachRight: false, attachLeft: false },
    ];

    return [...candidates, ...genericDistractors].slice(0, count);
  }

  // Shuffle and return
  return shuffleArray(candidates).slice(0, count);
}

/**
 * Shuffle an array
 */
function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}
