/**
 * TileRenderer - Core utility for handling Klingon agglutination
 * Combines tiles into proper Klingon sentences with correct spacing
 */

import { BuildTile } from '../types/models';

/**
 * Render an array of tiles into a Klingon sentence string
 * Handles agglutination based on attachLeft/attachRight properties
 *
 * Examples:
 * - [jI(attachRight), Sop(attachLeft)] → "jISop" (attached)
 * - [bIQ, vI(attachRight), tlhutlh(attachLeft)] → "bIQ vItlhutlh" (mixed)
 */
export function renderTiles(tiles: BuildTile[]): string {
  if (tiles.length === 0) return '';

  let result = '';

  for (let i = 0; i < tiles.length; i++) {
    const currentTile = tiles[i];
    const nextTile = tiles[i + 1];

    // Add current tile text
    result += currentTile.text;

    // Determine if we need a space after this tile
    if (nextTile) {
      const shouldAttach = currentTile.attachRight || nextTile.attachLeft;

      if (!shouldAttach) {
        result += ' ';
      }
    }
  }

  return result;
}

/**
 * Validate if the user's tile arrangement matches the correct answer
 * Returns true if the rendered sentence matches the expected answer
 */
export function validateAnswer(
  userTiles: BuildTile[],
  correctAnswer: string
): boolean {
  const userAnswer = renderTiles(userTiles);
  return userAnswer === correctAnswer;
}

/**
 * Check if all required tiles are used
 */
export function areAllTilesUsed(
  selectedTiles: BuildTile[],
  availableTiles: BuildTile[]
): boolean {
  return selectedTiles.length === availableTiles.length;
}

/**
 * Shuffle tiles array for random presentation
 */
export function shuffleTiles(tiles: BuildTile[]): BuildTile[] {
  const shuffled = [...tiles];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
