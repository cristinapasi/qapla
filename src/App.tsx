import { useState, useEffect } from 'react';
import { UserProgress, ViewType, PhaseType } from './types/models';
import { storageService } from './services/StorageService';
import { audioService } from './services/AudioService';
import { getCurrentRank, shouldRankUp } from './utils/xpCalculator';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/common/Header';
import LessonView from './components/Lesson/LessonView';

function App() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [currentModule, setCurrentModule] = useState<number | null>(null);
  const [currentPhase, setCurrentPhase] = useState<PhaseType | null>(null);
  const [soundMuted, setSoundMuted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load progress on mount
  useEffect(() => {
    const loadProgress = async () => {
      const loaded = await storageService.loadProgress();

      if (loaded) {
        setProgress(loaded);
      } else {
        // Create initial progress for new user
        const initial = storageService.createInitialProgress();
        setProgress(initial);
        await storageService.saveProgress(initial);
      }

      setLoading(false);
    };

    loadProgress();
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    if (progress) {
      storageService.saveProgress(progress);
    }
  }, [progress]);

  // Handle rank progression when XP changes
  useEffect(() => {
    if (progress) {
      const newRank = getCurrentRank(progress.xp);
      if (newRank !== progress.currentRank) {
        // Rank up!
        audioService.playSFX('levelup');
        setProgress((prev) => prev ? { ...prev, currentRank: newRank } : null);
      }
    }
  }, [progress?.xp]);

  // Handle sound mute toggle
  const handleMuteToggle = () => {
    const newMuted = !soundMuted;
    setSoundMuted(newMuted);
    audioService.setMuted(newMuted);
  };

  // Navigate to lesson
  const handleStartLesson = (moduleId: number, phase: PhaseType) => {
    setCurrentModule(moduleId);
    setCurrentPhase(phase);
    setCurrentView('lesson');
  };

  // Navigate back to dashboard
  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentModule(null);
    setCurrentPhase(null);
  };

  if (loading || !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header
        xp={progress.xp}
        currentRank={progress.currentRank}
        soundMuted={soundMuted}
        onMuteToggle={handleMuteToggle}
      />

      <main className="w-full max-w-app mx-auto px-4 py-6">
        {currentView === 'dashboard' && (
          <Dashboard
            progress={progress}
            onStartLesson={handleStartLesson}
          />
        )}

        {currentView === 'lesson' && currentModule && currentPhase && (
          <LessonView
            moduleId={currentModule}
            initialPhase={currentPhase}
            progress={progress}
            onUpdateProgress={setProgress}
            onBack={handleBackToDashboard}
          />
        )}
      </main>
    </div>
  );
}

export default App;
