/**
 * BuildPhase Component
 * Core mechanic: Tap tiles to construct Klingon sentences
 */

import { useState, useEffect } from 'react';
import { BuildExercise, BuildTile } from '../../types/models';
import { validateAnswer, shuffleTiles, renderTiles } from '../../utils/tileRenderer';
import { calculateXP, XP_REWARDS } from '../../utils/xpCalculator';
import { audioService } from '../../services/AudioService';
import TilePool from './TilePool';
import ConstructionZone from './ConstructionZone';

interface BuildPhaseProps {
  exercises: BuildExercise[];
  moduleColor: string;
  onComplete: (totalXP: number) => void;
  chunkTitle?: string;       // Optional: for chunked learning modules
  isMixedReview?: boolean;   // Optional: for mixed review phase
}

type AnswerState = 'pending' | 'correct' | 'wrong';

export default function BuildPhase({ exercises, moduleColor, onComplete, chunkTitle, isMixedReview }: BuildPhaseProps) {
  // Exercise queue management
  const [exerciseQueue, setExerciseQueue] = useState<BuildExercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  // Tile state
  const [shuffledTiles, setShuffledTiles] = useState<BuildTile[]>([]);
  const [selectedTileIndices, setSelectedTileIndices] = useState<number[]>([]);
  const [constructedTiles, setConstructedTiles] = useState<BuildTile[]>([]);

  // Answer state
  const [answerState, setAnswerState] = useState<AnswerState>('pending');
  const [showFeedback, setShowFeedback] = useState(false);

  // Scoring
  const [streak, setStreak] = useState(0);
  const [totalXP, setTotalXP] = useState(0);

  // Audio timeout tracking
  const [audioTimeout, setAudioTimeout] = useState<NodeJS.Timeout | null>(null);

  const currentExercise = exerciseQueue[currentExerciseIndex];
  const totalExercises = exercises.length;

  // Initialize exercise queue
  useEffect(() => {
    setExerciseQueue([...exercises]);
  }, [exercises]);

  // Shuffle tiles when exercise changes
  useEffect(() => {
    if (currentExercise) {
      const shuffled = shuffleTiles(currentExercise.tiles);
      setShuffledTiles(shuffled);
      setSelectedTileIndices([]);
      setConstructedTiles([]);
      setAnswerState('pending');
      setShowFeedback(false);
    }

    // Cleanup: cancel any pending audio when exercise changes
    return () => {
      if (audioTimeout) {
        clearTimeout(audioTimeout);
        setAudioTimeout(null);
      }
    };
  }, [currentExerciseIndex, currentExercise, audioTimeout]);

  // Handle tile selection from pool
  const handleTileSelect = (index: number) => {
    if (answerState !== 'pending') return;

    const selectedTile = shuffledTiles[index];

    // Add to construction
    setSelectedTileIndices([...selectedTileIndices, index]);
    setConstructedTiles([...constructedTiles, selectedTile]);

    // Play audio for the selected word
    audioService.speakWord(selectedTile.text);
  };

  // Handle tile removal from construction zone
  const handleTileRemove = (constructionIndex: number) => {
    if (answerState !== 'pending') return;

    // Remove from construction
    const newConstructed = constructedTiles.filter((_, i) => i !== constructionIndex);
    const newSelected = [...selectedTileIndices];
    newSelected.splice(constructionIndex, 1);

    setConstructedTiles(newConstructed);
    setSelectedTileIndices(newSelected);
  };

  // Check answer
  const handleCheckAnswer = () => {
    const isCorrect = validateAnswer(constructedTiles, currentExercise.correctAnswer);

    if (isCorrect) {
      // Correct answer!
      setAnswerState('correct');
      setShowFeedback(true);
      audioService.playSFX('correct');

      // Play the sentence audio
      const timeout = setTimeout(() => {
        audioService.speakSentence(currentExercise.correctAnswer);
      }, 300);
      setAudioTimeout(timeout);

      // Calculate XP with streak bonus
      const xp = calculateXP(
        XP_REWARDS.buildCorrect,
        streak,
        XP_REWARDS.buildCorrectMaxStreak
      );
      setTotalXP(totalXP + xp);
      setStreak(streak + 1);
      setCompletedCount(completedCount + 1);

      // Move to next after delay
      setTimeout(() => {
        moveToNext();
      }, 2500);
    } else {
      // Wrong answer
      setAnswerState('wrong');
      setShowFeedback(true);
      audioService.playSFX('wrong');

      // Reset streak
      setStreak(0);

      // Show correct answer
      const timeout = setTimeout(() => {
        audioService.speakSentence(currentExercise.correctAnswer);
      }, 500);
      setAudioTimeout(timeout);
    }
  };

  // Re-queue incorrect exercise immediately next
  const reQueueExercise = () => {
    // Insert the failed exercise right after the current one
    const newQueue = [...exerciseQueue];
    newQueue.splice(currentExerciseIndex + 1, 0, currentExercise);
    setExerciseQueue(newQueue);
    setShowFeedback(false);
    moveToNext();
  };

  // Move to next exercise
  const moveToNext = () => {
    if (currentExerciseIndex < exerciseQueue.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      // All exercises complete!
      audioService.playSFX('complete');
      onComplete(totalXP);
    }
  };

  // Replay audio for current sentence
  const handleReplayAudio = () => {
    if (answerState === 'correct' || answerState === 'wrong') {
      audioService.speakSentence(currentExercise.correctAnswer);
    }
  };

  // Clear construction zone
  const handleClear = () => {
    setConstructedTiles([]);
    setSelectedTileIndices([]);
    audioService.playSFX('click');
  };

  if (!currentExercise) {
    return (
      <div className="text-center text-text-primary">
        <p>Loading exercises...</p>
      </div>
    );
  }

  const canCheck = constructedTiles.length === shuffledTiles.length && answerState === 'pending';
  const progressPercent = (completedCount / totalExercises) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              {isMixedReview ? 'Mixed Practice' : chunkTitle ? `Build: ${chunkTitle}` : 'Build Sentences'}
            </h2>
            <p className="text-text-secondary text-sm">
              {isMixedReview ? 'Using all vocabulary' : `Sentence {completedCount + 1} of {totalExercises}`}
            </p>
          </div>

          {/* Streak indicator */}
          {streak > 0 && (
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-lg streak-indicator"
              style={{ backgroundColor: `${moduleColor}40` }}
            >
              <span className="text-2xl">🔥</span>
              <div>
                <div className="text-xs text-text-secondary">Streak</div>
                <div className="text-lg font-bold" style={{ color: moduleColor }}>
                  {streak}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-text-secondary bg-opacity-20 rounded-full h-2 overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: moduleColor,
            }}
          />
        </div>
      </div>

      {/* English Prompt */}
      <div className="bg-bg-end bg-opacity-60 rounded-xl p-6 mb-6 text-center">
        <div className="text-sm text-text-secondary mb-2 uppercase tracking-wide">
          Translate to Klingon
        </div>
        <div className="text-2xl font-semibold text-text-primary">
          {currentExercise.englishPrompt}
        </div>
      </div>

      {/* Construction Zone */}
      <div className="mb-6">
        <ConstructionZone
          constructedTiles={constructedTiles}
          moduleColor={moduleColor}
          onTileRemove={handleTileRemove}
        />
      </div>

      {/* Tile Pool */}
      <div className="mb-6">
        <TilePool
          tiles={shuffledTiles}
          selectedIndices={new Set(selectedTileIndices)}
          moduleColor={moduleColor}
          onTileClick={handleTileSelect}
        />
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className="rounded-xl p-6 mb-6 text-center"
          style={{
            backgroundColor: answerState === 'correct' ? '#22c55e40' : '#ef444440',
            borderLeft: `4px solid ${answerState === 'correct' ? '#22c55e' : '#ef4444'}`,
          }}
        >
          {answerState === 'correct' ? (
            <div>
              <div className="text-4xl mb-2">✓</div>
              <div className="text-xl font-bold text-success mb-2">
                Qapla'!
              </div>
              <div className="klingon-text text-2xl text-text-primary mb-2">
                {currentExercise.correctAnswer}
              </div>
              {currentExercise.literalTranslation && (
                <div className="text-sm text-text-secondary italic mb-2">
                  "{currentExercise.literalTranslation}"
                </div>
              )}
              <button
                onClick={handleReplayAudio}
                className="text-3xl hover:scale-110 transition-transform"
                aria-label="Replay audio"
              >
                🔊
              </button>
              {currentExercise.explanation && (
                <div
                  className="mt-4 p-3 rounded-lg"
                  style={{ backgroundColor: '#22c55e20' }}
                >
                  <p className="text-base text-text-primary font-semibold">
                    {currentExercise.explanation}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="text-4xl mb-2">✗</div>
              <div className="text-xl font-bold text-error mb-2">
                Not quite...
              </div>
              <div className="text-sm text-text-secondary mb-2">
                Correct answer:
              </div>
              <div className="klingon-text text-2xl text-text-primary mb-2">
                {currentExercise.correctAnswer}
              </div>
              {currentExercise.literalTranslation && (
                <div className="text-sm text-text-secondary italic mb-2">
                  "{currentExercise.literalTranslation}"
                </div>
              )}
              <button
                onClick={handleReplayAudio}
                className="text-3xl hover:scale-110 transition-transform"
                aria-label="Replay audio"
              >
                🔊
              </button>
              {currentExercise.explanation && (
                <div
                  className="mt-4 p-3 rounded-lg"
                  style={{ backgroundColor: '#ef444420' }}
                >
                  <p className="text-base text-text-primary font-semibold">
                    {currentExercise.explanation}
                  </p>
                </div>
              )}
              <p className="text-xs text-text-secondary mt-3">
                This exercise will appear again
              </p>
              <button
                onClick={reQueueExercise}
                className="mt-4 px-8 py-3 rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: moduleColor,
                  color: '#ffffff',
                }}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      {!showFeedback && (
        <div className="flex gap-3">
          <button
            onClick={handleClear}
            disabled={constructedTiles.length === 0}
            className="px-6 py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            style={{
              backgroundColor: '#475569',
              color: '#ffffff',
            }}
          >
            Clear
          </button>
          <button
            onClick={handleCheckAnswer}
            disabled={!canCheck}
            className="flex-1 py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            style={{
              backgroundColor: canCheck ? moduleColor : `${moduleColor}40`,
              color: '#ffffff',
            }}
          >
            {canCheck ? 'Check Answer' : 'Select all tiles to check'}
          </button>
        </div>
      )}
    </div>
  );
}
