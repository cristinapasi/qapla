import { useState, useEffect } from 'react';
import { UserProgress, ViewType, PhaseType } from './types/models';
import { storageService } from './services/StorageService';
import { audioService } from './services/AudioService';
import { getCurrentRank } from './utils/xpCalculator';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/common/Header';
import LessonView from './components/Lesson/LessonView';
import UserSelect from './components/UserSelect/UserSelect';

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [currentModule, setCurrentModule] = useState<number | null>(null);
  const [currentPhase, setCurrentPhase] = useState<PhaseType | null>(null);
  const [soundMuted, setSoundMuted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load progress when username is set
  useEffect(() => {
    if (!username) return;

    const load = async () => {
      setLoading(true);
      try {
        const loaded = await storageService.loadProgress(username);
        if (loaded) {
          setProgress(loaded);
        } else {
          const initial = storageService.createInitialProgress();
          setProgress(initial);
          await storageService.saveProgress(initial, username);
        }
      } catch (error) {
        console.error('Failed to load progress:', error);
        setProgress(storageService.createInitialProgress());
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [username]);

  // Save progress whenever it changes
  useEffect(() => {
    if (progress && username) {
      storageService.saveProgress(progress, username);
    }
  }, [progress, username]);

  // Handle rank progression when XP changes
  useEffect(() => {
    if (progress) {
      const newRank = getCurrentRank(progress.xp);
      if (newRank !== progress.currentRank) {
        audioService.playSFX('levelup');
        setProgress((prev) => prev ? { ...prev, currentRank: newRank } : null);
      }
    }
  }, [progress?.xp]);

  // Initialize audio on first user interaction
  useEffect(() => {
    const handleFirstInteraction = async () => {
      try {
        await audioService.initialize();
        await audioService.playSFX('click');
      } catch (error) {
        console.error('Audio initialization failed:', error);
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const handleMuteToggle = () => {
    const newMuted = !soundMuted;
    setSoundMuted(newMuted);
    audioService.setMuted(newMuted);
  };

  const handleSelectUser = (name: string) => {
    setUsername(name);
    setCurrentView('dashboard');
    setCurrentModule(null);
    setCurrentPhase(null);
  };

  const handleSwitchUser = () => {
    setUsername(null);
    setProgress(null);
    setCurrentView('dashboard');
    setCurrentModule(null);
    setCurrentPhase(null);
  };

  const handleStartLesson = (moduleId: number, phase: PhaseType) => {
    setCurrentModule(moduleId);
    setCurrentPhase(phase);
    setCurrentView('lesson');
    // Save resume position
    setProgress((prev) => prev ? { ...prev, lastModule: moduleId, lastPhase: phase } : null);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentModule(null);
    setCurrentPhase(null);
  };

  const handleUpdateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      if (!prev) return null;
      return updater(prev);
    });
  };

  // No user selected — show user picker
  if (!username) {
    return <UserSelect onSelectUser={handleSelectUser} />;
  }

  // Loading user progress
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
        username={username}
        onSwitchUser={handleSwitchUser}
      />

      <main className="w-full max-w-app mx-auto px-4 py-6">
        {currentView === 'dashboard' && (
          <Dashboard
            progress={progress}
            username={username}
            onStartLesson={handleStartLesson}
          />
        )}

        {currentView === 'lesson' && currentModule && currentPhase && (
          <LessonView
            moduleId={currentModule}
            initialPhase={currentPhase}
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            onBack={handleBackToDashboard}
          />
        )}
      </main>
    </div>
  );
}

export default App;
