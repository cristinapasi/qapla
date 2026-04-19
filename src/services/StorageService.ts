/**
 * StorageService - Multi-user localStorage persistence
 * Progress is namespaced per username: "qapla-progress-<username>"
 * User profiles are stored in: "qapla-users"
 */

import { UserProgress, UserProfile } from '../types/models';

const USERS_KEY = 'qapla-users';
const progressKey = (username: string) => `qapla-progress-${username.toLowerCase()}`;

class StorageService {
  // ============================================================================
  // USER PROFILES
  // ============================================================================

  getUsers(): UserProfile[] {
    try {
      const raw = window.localStorage.getItem(USERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  saveUsers(users: UserProfile[]): void {
    try {
      window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Failed to save users:', error);
    }
  }

  createUser(username: string): UserProfile {
    const profile: UserProfile = {
      username,
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
    };
    const users = this.getUsers().filter(u => u.username !== username);
    this.saveUsers([...users, profile]);
    return profile;
  }

  touchUser(username: string): void {
    const users = this.getUsers().map(u =>
      u.username === username ? { ...u, lastActiveAt: Date.now() } : u
    );
    this.saveUsers(users);
  }

  deleteUser(username: string): void {
    const users = this.getUsers().filter(u => u.username !== username);
    this.saveUsers(users);
    try {
      window.localStorage.removeItem(progressKey(username));
    } catch {}
  }

  // ============================================================================
  // PROGRESS (per user)
  // ============================================================================

  async saveProgress(progress: UserProgress, username: string): Promise<void> {
    try {
      const serializable = {
        ...progress,
        uniqueSentencesBuilt: Array.from(progress.uniqueSentencesBuilt),
      };
      window.localStorage.setItem(progressKey(username), JSON.stringify(serializable));
      this.touchUser(username);
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }

  async loadProgress(username: string): Promise<UserProgress | null> {
    try {
      const stored = window.localStorage.getItem(progressKey(username));
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        uniqueSentencesBuilt: new Set(parsed.uniqueSentencesBuilt || []),
      };
    } catch (error) {
      console.error('Failed to load progress:', error);
      return null;
    }
  }

  createInitialProgress(): UserProgress {
    return {
      xp: 0,
      currentRank: 0,
      modulesCompleted: {},
      chunkProgress: {},
      streak: 0,
      sentencesBuilt: 0,
      uniqueSentencesBuilt: new Set(),
      wordConfidence: {},
      quizScores: {},
      lastUpdated: Date.now(),
    };
  }

  async clearProgress(username: string): Promise<void> {
    try {
      window.localStorage.removeItem(progressKey(username));
    } catch (error) {
      console.error('Failed to clear progress:', error);
    }
  }
}

export const storageService = new StorageService();
