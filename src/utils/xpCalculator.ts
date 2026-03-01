/**
 * XP Calculator
 * Handles XP awards, rank progression, and streak bonuses
 */

import { RANKS } from '../types/models';

/**
 * Calculate current rank based on XP
 */
export function getCurrentRank(xp: number): number {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].xp) {
      return i;
    }
  }
  return 0;
}

/**
 * Check if user should rank up
 */
export function shouldRankUp(oldXp: number, newXp: number): boolean {
  const oldRank = getCurrentRank(oldXp);
  const newRank = getCurrentRank(newXp);
  return newRank > oldRank;
}

/**
 * Calculate XP for an action with streak bonus
 */
export function calculateXP(
  baseXP: number,
  streak: number = 0,
  maxStreakBonus: number = 0
): number {
  if (maxStreakBonus === 0) {
    return baseXP;
  }

  const streakBonus = Math.min(streak * 2, maxStreakBonus);
  return baseXP + streakBonus;
}

/**
 * XP awards by action type
 */
export const XP_REWARDS = {
  learnComplete: 15,
  buildCorrect: 10,
  buildCorrectMaxStreak: 10,
  quizCorrect: 15,
  quizCorrectMaxStreak: 15,
  sandboxSentence: 2,
  sandboxMaxPerSession: 20,
  moduleComplete: 25,
  masterReview: 100,
};
