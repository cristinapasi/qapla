import { useState, useEffect } from 'react';
import { UserProgress, PhaseType, KlingonPiece, BuildExercise } from '../../types/models';
import { module1 } from '../../data/modules/module1';
import module2 from '../../data/modules/module2';
import LearnPhase from '../Learn/LearnPhase';
import MatchPhase from '../Match/MatchPhase';
import GuidedBuildPhase from '../GuidedBuild/GuidedBuildPhase';
import BuildPhase from '../Build/BuildPhase';
import QuizContainer from '../Quiz/QuizContainer';
import SandboxPhase from '../Sandbox/SandboxPhase';
import PhaseComplete from '../common/PhaseComplete';
import { audioService } from '../../services/AudioService';
import { generateGuidedBuildExercises } from '../../utils/guidedBuildGenerator';
import { XP_REWARDS } from '../../utils/xpCalculator';

interface LessonViewProps {
  moduleId: number;
  initialPhase: PhaseType;
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onBack: () => void;
}

const MODULE_DATA = {
  1: module1,
  2: module2,
  // Add more modules as they're created
};

const MODULE_COLORS = {
  1: '#f97316',
  2: '#a855f7',
  3: '#06b6d4',
  4: '#eab308',
  5: '#ec4899',
};

type SubPhaseType = 'learn' | 'learn-complete' | 'match' | 'match-complete' | 'guided-build' | 'guided-build-complete' | 'build' | 'build-complete' | 'mixed-build' | 'quiz' | 'sandbox';

export default function LessonView({
  moduleId,
  initialPhase,
  progress,
  onUpdateProgress,
  onBack,
}: LessonViewProps) {
  const moduleData = MODULE_DATA[moduleId as keyof typeof MODULE_DATA];
  const moduleColor = MODULE_COLORS[moduleId as keyof typeof MODULE_COLORS];
  const hasChunks = moduleData?.chunks && moduleData.chunks.length > 0;

  // Chunked learning state
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [currentSubPhase, setCurrentSubPhase] = useState<SubPhaseType>('learn');

  // Legacy state for non-chunked modules
  const [currentPhase, setCurrentPhase] = useState<PhaseType>(initialPhase);

  if (!moduleData) {
    return (
      <div className="text-center text-text-primary">
        <p className="mb-4">Module {moduleId} content not yet available</p>
        <button
          onClick={onBack}
          className="bg-text-secondary px-6 py-3 rounded-lg font-semibold"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Get current chunk data (if applicable)
  const currentChunk = hasChunks && currentChunkIndex >= 0 && currentChunkIndex < moduleData.chunks!.length
    ? moduleData.chunks![currentChunkIndex]
    : null;

  // Filter vocabulary by chunk
  const getChunkVocabulary = (): KlingonPiece[] => {
    if (!hasChunks || !currentChunk) {
      return [...moduleData.bricks, ...moduleData.mortar];
    }

    const allVocabulary = [...moduleData.bricks, ...moduleData.mortar];
    return allVocabulary.filter(piece => currentChunk.vocabularyIds.includes(piece.id));
  };

  // Filter exercises by chunk
  const getChunkExercises = (): BuildExercise[] => {
    if (!hasChunks || !currentChunk) {
      return moduleData.buildExercises;
    }

    return moduleData.buildExercises.filter(ex => currentChunk.buildExerciseIds.includes(ex.id));
  };

  // Get all exercises for mixed build (exercise 8 from module1)
  const getMixedBuildExercises = (): BuildExercise[] => {
    // For Module 1, use exercise 8 (bIQ wItlhutlh) which uses vocabulary from multiple chunks
    return moduleData.buildExercises.filter(ex => ex.id === 'm1_ex_008');
  };

  // ============================================================================
  // CHUNKED LEARNING HANDLERS
  // ============================================================================

  const handleChunkLearnComplete = () => {
    if (!hasChunks || !currentChunk) return;

    audioService.playSFX('complete');

    // Award 15 XP and mark chunk learn as complete
    onUpdateProgress((prev) => ({
      ...prev,
      xp: prev.xp + 15,
      chunkProgress: {
        ...prev.chunkProgress,
        [`${moduleId}-${currentChunk.id}`]: {
          moduleId,
          chunkId: currentChunk.id,
          learnCompleted: true,
          matchCompleted: prev.chunkProgress[`${moduleId}-${currentChunk.id}`]?.matchCompleted || false,
          guidedBuildCompleted: prev.chunkProgress[`${moduleId}-${currentChunk.id}`]?.guidedBuildCompleted || false,
          buildCompleted: prev.chunkProgress[`${moduleId}-${currentChunk.id}`]?.buildCompleted || false,
          lastAccessed: Date.now(),
        },
      },
    }));

    // Show completion celebration
    setCurrentSubPhase('learn-complete');
  };

  const handleMatchComplete = () => {
    if (!hasChunks || !currentChunk) return;

    audioService.playSFX('complete');

    // Award 10 XP and mark chunk match as complete
    onUpdateProgress((prev) => ({
      ...prev,
      xp: prev.xp + XP_REWARDS.matchComplete,
      chunkProgress: {
        ...prev.chunkProgress,
        [`${moduleId}-${currentChunk.id}`]: {
          moduleId,
          chunkId: currentChunk.id,
          learnCompleted: prev.chunkProgress[`${moduleId}-${currentChunk.id}`]?.learnCompleted || true,
          matchCompleted: true,
          guidedBuildCompleted: prev.chunkProgress[`${moduleId}-${currentChunk.id}`]?.guidedBuildCompleted || false,
          buildCompleted: prev.chunkProgress[`${moduleId}-${currentChunk.id}`]?.buildCompleted || false,
          lastAccessed: Date.now(),
        },
      },
    }));

    // Show completion celebration
    setCurrentSubPhase('match-complete');
  };

  const handleGuidedBuildComplete = (xpEarned: number) => {
    if (!hasChunks || !currentChunk) return;

    audioService.playSFX('complete');

    // Award XP and mark chunk guided build as complete
    onUpdateProgress((prev) => ({
      ...prev,
      xp: prev.xp + xpEarned,
      chunkProgress: {
        ...prev.chunkProgress,
        [`${moduleId}-${currentChunk.id}`]: {
          moduleId,
          chunkId: currentChunk.id,
          learnCompleted: prev.chunkProgress[`${moduleId}-${currentChunk.id}`]?.learnCompleted || true,
          matchCompleted: prev.chunkProgress[`${moduleId}-${currentChunk.id}`]?.matchCompleted || true,
          guidedBuildCompleted: true,
          buildCompleted: prev.chunkProgress[`${moduleId}-${currentChunk.id}`]?.buildCompleted || false,
          lastAccessed: Date.now(),
        },
      },
    }));

    // Show completion celebration
    setCurrentSubPhase('guided-build-complete');
  };

  const handleChunkBuildComplete = (xpEarned: number) => {
    if (!hasChunks || !currentChunk) return;

    audioService.playSFX('complete');

    // Award XP and mark chunk build as complete
    onUpdateProgress((prev) => ({
      ...prev,
      xp: prev.xp + xpEarned,
      chunkProgress: {
        ...prev.chunkProgress,
        [`${moduleId}-${currentChunk.id}`]: {
          moduleId,
          chunkId: currentChunk.id,
          learnCompleted: prev.chunkProgress[`${moduleId}-${currentChunk.id}`]?.learnCompleted || true,
          matchCompleted: prev.chunkProgress[`${moduleId}-${currentChunk.id}`]?.matchCompleted || true,
          guidedBuildCompleted: prev.chunkProgress[`${moduleId}-${currentChunk.id}`]?.guidedBuildCompleted || true,
          buildCompleted: true,
          lastAccessed: Date.now(),
        },
      },
    }));

    // Show completion celebration
    setCurrentSubPhase('build-complete');
  };

  const handleMixedBuildComplete = (xpEarned: number) => {
    audioService.playSFX('complete');

    // Award XP and mark overall build as complete
    onUpdateProgress((prev) => ({
      ...prev,
      xp: prev.xp + xpEarned,
      modulesCompleted: {
        ...prev.modulesCompleted,
        [`${moduleId}-build`]: true,
      },
    }));

    // Transition to quiz
    setCurrentSubPhase('quiz');
  };

  // Handle continuing from celebration screens
  const handleLearnCelebrateComplete = () => {
    setCurrentSubPhase('match');
  };

  const handleMatchCelebrateComplete = () => {
    setCurrentSubPhase('guided-build');
  };

  const handleGuidedBuildCelebrateComplete = () => {
    setCurrentSubPhase('build');
  };

  const handleBuildCelebrateComplete = () => {
    if (!hasChunks || !currentChunk) return;

    // Check if there are more chunks
    const nextChunkIndex = currentChunkIndex + 1;
    if (nextChunkIndex < moduleData.chunks!.length) {
      // Move to next chunk's learn phase
      setCurrentChunkIndex(nextChunkIndex);
      setCurrentSubPhase('learn');
    } else {
      // All chunks complete, move to mixed build
      setCurrentChunkIndex(-1);
      setCurrentSubPhase('mixed-build');
    }
  };

  // ============================================================================
  // LEGACY (NON-CHUNKED) HANDLERS
  // ============================================================================

  const handleLearnComplete = () => {
    audioService.playSFX('complete');

    onUpdateProgress((prev) => ({
      ...prev,
      xp: prev.xp + 15,
      modulesCompleted: {
        ...prev.modulesCompleted,
        [`${moduleId}-learn`]: true,
      },
    }));

    setCurrentPhase('build');
  };

  const handleBuildComplete = (xpEarned: number) => {
    audioService.playSFX('complete');

    onUpdateProgress((prev) => ({
      ...prev,
      xp: prev.xp + xpEarned,
      modulesCompleted: {
        ...prev.modulesCompleted,
        [`${moduleId}-build`]: true,
      },
    }));

    setCurrentPhase('quiz');
  };

  // ============================================================================
  // SHARED HANDLERS (QUIZ & SANDBOX)
  // ============================================================================

  const handleQuizComplete = (score: number, xpEarned: number) => {
    audioService.playSFX(score >= 70 ? 'complete' : 'wrong');

    onUpdateProgress((prev) => ({
      ...prev,
      xp: prev.xp + xpEarned,
      quizScores: {
        ...prev.quizScores,
        [moduleId]: score,
      },
      modulesCompleted: {
        ...prev.modulesCompleted,
        [`${moduleId}-quiz`]: score >= 70,
      },
    }));

    if (score >= 70) {
      if (hasChunks) {
        setCurrentSubPhase('sandbox');
      } else {
        setCurrentPhase('sandbox');
      }
    }
  };

  const handleQuizRetry = () => {
    if (hasChunks) {
      setCurrentSubPhase('quiz');
    } else {
      setCurrentPhase('quiz');
    }
  };

  const handleSandboxSentence = (uniqueSentence: string) => {
    onUpdateProgress((prev) => {
      const currentSentences = prev.uniqueSentencesBuilt || new Set<string>();
      const newSentences = new Set(currentSentences);
      newSentences.add(uniqueSentence);

      return {
        ...prev,
        uniqueSentencesBuilt: newSentences,
        xp: prev.xp + 5,
      };
    });
  };

  // ============================================================================
  // PHASE NAVIGATION
  // ============================================================================

  const handlePhaseNavigation = (phase: PhaseType) => {
    if (hasChunks) {
      // For chunked modules, interpret navigation differently
      if (phase === 'learn') {
        setCurrentChunkIndex(0);
        setCurrentSubPhase('learn');
      } else if (phase === 'build') {
        // Navigate to first incomplete chunk or mixed build
        setCurrentChunkIndex(0);
        setCurrentSubPhase('build');
      } else if (phase === 'quiz') {
        setCurrentSubPhase('quiz');
      } else if (phase === 'sandbox') {
        setCurrentSubPhase('sandbox');
      }
    } else {
      setCurrentPhase(phase);
    }
  };

  // ============================================================================
  // RENDER LOGIC
  // ============================================================================

  const vocabulary = getChunkVocabulary();
  const allVocabulary = [...moduleData.bricks, ...moduleData.mortar];

  // Determine what to render
  let phaseContent: JSX.Element;

  if (hasChunks) {
    // Chunked learning flow
    if (currentSubPhase === 'learn' && currentChunk) {
      phaseContent = (
        <LearnPhase
          vocabulary={vocabulary}
          moduleColor={moduleColor}
          onComplete={handleChunkLearnComplete}
          chunkTitle={currentChunk.title}
        />
      );
    } else if (currentSubPhase === 'learn-complete') {
      phaseContent = (
        <PhaseComplete
          title="Learn Phase"
          xpEarned={15}
          moduleColor={moduleColor}
          onContinue={handleLearnCelebrateComplete}
        />
      );
    } else if (currentSubPhase === 'match' && currentChunk) {
      phaseContent = (
        <MatchPhase
          vocabulary={vocabulary}
          moduleColor={moduleColor}
          onComplete={handleMatchComplete}
          chunkTitle={currentChunk.title}
        />
      );
    } else if (currentSubPhase === 'match-complete') {
      phaseContent = (
        <PhaseComplete
          title="Match Phase"
          xpEarned={XP_REWARDS.matchComplete}
          moduleColor={moduleColor}
          onContinue={handleMatchCelebrateComplete}
        />
      );
    } else if (currentSubPhase === 'guided-build' && currentChunk) {
      const guidedExercises = generateGuidedBuildExercises(getChunkExercises(), 8);
      phaseContent = (
        <GuidedBuildPhase
          exercises={guidedExercises}
          moduleColor={moduleColor}
          onComplete={handleGuidedBuildComplete}
          vocabulary={vocabulary}
          chunkTitle={currentChunk.title}
        />
      );
    } else if (currentSubPhase === 'guided-build-complete') {
      phaseContent = (
        <PhaseComplete
          title="Guided Build"
          moduleColor={moduleColor}
          onContinue={handleGuidedBuildCelebrateComplete}
        />
      );
    } else if (currentSubPhase === 'build' && currentChunk) {
      phaseContent = (
        <BuildPhase
          exercises={getChunkExercises()}
          moduleColor={moduleColor}
          onComplete={handleChunkBuildComplete}
          vocabulary={vocabulary}
          chunkTitle={currentChunk.title}
        />
      );
    } else if (currentSubPhase === 'build-complete') {
      phaseContent = (
        <PhaseComplete
          title="Build Phase"
          moduleColor={moduleColor}
          onContinue={handleBuildCelebrateComplete}
        />
      );
    } else if (currentSubPhase === 'mixed-build') {
      phaseContent = (
        <BuildPhase
          exercises={getMixedBuildExercises()}
          moduleColor={moduleColor}
          onComplete={handleMixedBuildComplete}
          vocabulary={allVocabulary}
          isMixedReview={true}
        />
      );
    } else if (currentSubPhase === 'quiz') {
      phaseContent = (
        <QuizContainer
          questions={moduleData.quizQuestions}
          moduleColor={moduleColor}
          onComplete={handleQuizComplete}
          onRetry={handleQuizRetry}
        />
      );
    } else if (currentSubPhase === 'sandbox') {
      phaseContent = (
        <SandboxPhase
          vocabulary={allVocabulary}
          moduleColor={moduleColor}
          onUpdateProgress={handleSandboxSentence}
        />
      );
    } else {
      phaseContent = <div className="text-text-primary">Loading...</div>;
    }
  } else {
    // Legacy non-chunked flow
    if (currentPhase === 'learn') {
      phaseContent = (
        <LearnPhase
          vocabulary={vocabulary}
          moduleColor={moduleColor}
          onComplete={handleLearnComplete}
        />
      );
    } else if (currentPhase === 'build') {
      phaseContent = (
        <BuildPhase
          exercises={moduleData.buildExercises}
          moduleColor={moduleColor}
          onComplete={handleBuildComplete}
          vocabulary={allVocabulary}
        />
      );
    } else if (currentPhase === 'quiz') {
      phaseContent = (
        <QuizContainer
          questions={moduleData.quizQuestions}
          moduleColor={moduleColor}
          onComplete={handleQuizComplete}
          onRetry={handleQuizRetry}
        />
      );
    } else if (currentPhase === 'sandbox') {
      phaseContent = (
        <SandboxPhase
          vocabulary={vocabulary}
          moduleColor={moduleColor}
          onUpdateProgress={handleSandboxSentence}
        />
      );
    } else {
      phaseContent = <div className="text-text-primary">Loading...</div>;
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="text-text-secondary hover:text-text-primary mb-4 flex items-center gap-2 text-sm sm:text-base"
        >
          <span>←</span> Back to Dashboard
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-text-primary">
              Module {moduleId}: {moduleData.titleEn}
            </h1>
            <p className="text-base sm:text-xl text-text-secondary klingon-text">
              {moduleData.titleTlh}
            </p>
            {hasChunks && currentChunk && currentSubPhase !== 'quiz' && currentSubPhase !== 'sandbox' && currentSubPhase !== 'mixed-build' && (
              <p className="text-sm sm:text-lg text-text-secondary mt-1">
                {currentChunk.title} ({currentChunkIndex + 1} of {moduleData.chunks!.length})
              </p>
            )}
          </div>

          {/* Phase Navigation Tabs */}
          <div className="flex gap-1 sm:gap-2 flex-wrap">
            {(['learn', 'build', 'quiz', 'sandbox'] as PhaseType[]).map((phase) => {
              const isActive = hasChunks
                ? (phase === 'learn' && currentSubPhase === 'learn') ||
                  (phase === 'build' && (currentSubPhase === 'build' || currentSubPhase === 'mixed-build')) ||
                  (phase === 'quiz' && currentSubPhase === 'quiz') ||
                  (phase === 'sandbox' && currentSubPhase === 'sandbox')
                : currentPhase === phase;

              const isCompleted = progress.modulesCompleted[`${moduleId}-${phase}`];

              // Determine if phase should be disabled
              let isDisabled = false;
              if (phase === 'sandbox') {
                isDisabled = !progress.modulesCompleted[`${moduleId}-quiz`];
              } else if (phase === 'quiz' && hasChunks) {
                // Quiz requires all chunks to be complete
                isDisabled = !progress.modulesCompleted[`${moduleId}-build`];
              } else if (phase === 'build' || phase === 'quiz') {
                isDisabled = !progress.modulesCompleted[`${moduleId}-learn`];
              }

              return (
                <button
                  key={phase}
                  onClick={() => handlePhaseNavigation(phase)}
                  disabled={isDisabled}
                  className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm capitalize transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: isActive ? moduleColor : `${moduleColor}20`,
                    color: isActive ? '#ffffff' : moduleColor,
                  }}
                >
                  {isCompleted && '✓ '}
                  {phase}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Phase Content */}
      <div className="py-6">{phaseContent}</div>
    </div>
  );
}
