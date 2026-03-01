/**
 * StorageService - Wrapper for localStorage API
 * Handles persistence of user progress across sessions
 */

import { UserProgress } from '../types/models';

const STORAGE_KEY = 'qapla-progress';

/**
 * Storage Service for persisting user progress
 */
class StorageService {
  /**
   * Save user progress to storage
   */
  async saveProgress(progress: UserProgress): Promise<void> {
    try {
      // Convert Set to Array for JSON serialization
      const serializable = {
        ...progress,
        uniqueSentencesBuilt: Array.from(progress.uniqueSentencesBuilt),
      };

      const value = JSON.stringify(serializable);
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {
      console.error('Failed to save progress:', error);
      // Fail silently - app should continue working even if persistence fails
      // This might fail due to quota exceeded or private browsing mode
    }
  }

  /**
   * Load user progress from storage
   */
  async loadProgress(): Promise<UserProgress | null> {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (!stored) {
        return null;
      }

      const parsed = JSON.parse(stored);

      // Convert Array back to Set
      return {
        ...parsed,
        uniqueSentencesBuilt: new Set(parsed.uniqueSentencesBuilt || []),
      };
    } catch (error) {
      console.error('Failed to load progress:', error);
      return null;
    }
  }

  /**
   * Create initial progress state for new users
   */
  createInitialProgress(): UserProgress {
    return {
      xp: 0,
      currentRank: 0,
      modulesCompleted: {},
      chunkProgress: {},     // Initialize chunk progress tracking
      streak: 0,
      sentencesBuilt: 0,
      uniqueSentencesBuilt: new Set(),
      wordConfidence: {},
      quizScores: {},
      lastUpdated: Date.now(),
    };
  }

  /**
   * Clear all progress (for testing/reset)
   */
  async clearProgress(): Promise<void> {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear progress:', error);
    }
  }
}

// Export singleton instance
export const storageService = new StorageService();
