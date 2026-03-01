import { useState, useEffect } from 'react';
import { GuidedBuildExercise, BuildTile, KlingonPiece } from '../../types/models';
import { audioService } from '../../services/AudioService';
import { renderTiles } from '../../utils/tileRenderer';
import { XP_REWARDS } from '../../utils/xpCalculator';
import Tile from '../Build/Tile';
import PeekPanel from '../Build/PeekPanel';

interface GuidedBuildPhaseProps {
  exercises: GuidedBuildExercise[];
  moduleColor: string;
  onComplete: (totalXP: number) => void;
  vocabulary?: KlingonPiece[];
  chunkTitle?: string;
}

export default function GuidedBuildPhase({
  exercises,
  moduleColor,
  onComplete,
  vocabulary,
  chunkTitle,
}: GuidedBuildPhaseProps) {
  // Exercise queue management
  const [exerciseQueue, setExerciseQueue] = useState<GuidedBuildExercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  // Construction state
  const [sentenceStructure, setSentenceStructure] = useState<(BuildTile | null)[]>([]);
  const [availableTiles, setAvailableTiles] = useState<BuildTile[]>([]);
  const [usedAvailableIndices, setUsedAvailableIndices] = useState<Set<number>>(new Set());

  // Feedback state
  const [answerState, setAnswerState] = useState<'pending' | 'correct' | 'wrong'>('pending');
  const [showFeedback, setShowFeedback] = useState(false);

  // Scoring
  const [streak, setStreak] = useState(0);
  const [totalXP, setTotalXP] = useState(0);

  // Peek panel state
  const [isPeekOpen, setIsPeekOpen] = useState(false);
  const [hasPeekedThisExercise, setHasPeekedThisExercise] = useState(false);

  const currentExercise = exerciseQueue[currentExerciseIndex];
  const totalExercises = exercises.length;

  // Initialize exercise queue
  useEffect(() => {
    setExerciseQueue([...exercises]);
  }, [exercises]);

  // Reset state when exercise changes
  useEffect(() => {
    if (currentExercise) {
      setSentenceStructure([...currentExercise.sentenceStructure]);
      setAvailableTiles(shuffleArray(currentExercise.availableTiles));
      setUsedAvailableIndices(new Set());
      setAnswerState('pending');
      setShowFeedback(false);
      setHasPeekedThisExercise(false);  // Reset peek state for new exercise
    }
  }, [currentExerciseIndex, currentExercise]);

  // Click on available tile - store it temporarily for placement
  const [selectedAvailableTile, setSelectedAvailableTile] = useState<{index: number, tile: BuildTile} | null>(null);

  const handleAvailableTileClick = (index: number) => {
    if (answerState !== 'pending') return;
    if (usedAvailableIndices.has(index)) return; // Already used

    const tile = availableTiles[index];
    setSelectedAvailableTile({ index, tile });
    audioService.speakWord(tile.text);
  };

  // Click on blank position in sentence - fill it with selected tile
  const handleBlankClick = (blankIndex: number) => {
    if (answerState !== 'pending') return;
    if (!selectedAvailableTile) return; // Need to select a tile first
    if (sentenceStructure[blankIndex] !== null) return; // Position already filled

    // Fill the blank
    const newStructure = [...sentenceStructure];
    newStructure[blankIndex] = selectedAvailableTile.tile;
    setSentenceStructure(newStructure);

    // Mark available tile as used
    setUsedAvailableIndices(new Set([...usedAvailableIndices, selectedAvailableTile.index]));

    // Clear selection
    setSelectedAvailableTile(null);
  };

  // Click on filled position - remove tile and return to available pool
  const handleFilledTileClick = (structureIndex: number) => {
    if (answerState !== 'pending') return;

    const tile = sentenceStructure[structureIndex];
    if (!tile) return; // Can't remove a blank

    // Check if this was a prefilled tile (from original exercise)
    const wasOriginallyPrefilled = currentExercise.sentenceStructure[structureIndex] !== null;
    if (wasOriginallyPrefilled) return; // Can't remove prefilled tiles

    // Find which available tile index this was
    const availableIndex = availableTiles.findIndex((t, i) =>
      usedAvailableIndices.has(i) && t.text === tile.text
    );

    // Remove from structure
    const newStructure = [...sentenceStructure];
    newStructure[structureIndex] = null;
    setSentenceStructure(newStructure);

    // Mark as no longer used
    if (availableIndex !== -1) {
      const newUsed = new Set(usedAvailableIndices);
      newUsed.delete(availableIndex);
      setUsedAvailableIndices(newUsed);
    }
  };

  const handlePeekToggle = () => {
    if (!isPeekOpen && !hasPeekedThisExercise) {
      setHasPeekedThisExercise(true);
    }
    setIsPeekOpen(!isPeekOpen);
  };

  const handleCheckAnswer = () => {
    // Check if all blanks are filled
    const allFilled = sentenceStructure.every(tile => tile !== null);
    if (!allFilled) return;

    const userAnswer = renderTiles(sentenceStructure.filter((t): t is BuildTile => t !== null));
    const isCorrect = userAnswer.trim() === currentExercise.correctAnswer.trim();

    if (isCorrect) {
      setAnswerState('correct');
      audioService.playSFX('correct');

      // Delay sentence audio to avoid interference with SFX
      setTimeout(() => {
        audioService.speakSentence(currentExercise.correctAnswer);
      }, 300);

      // Award XP with streak bonus
      const baseXP = XP_REWARDS.guidedBuildCorrect;
      const streakBonus = Math.min(streak * 2, XP_REWARDS.guidedBuildStreak);
      let earnedXP = baseXP + streakBonus;

      // Apply peek penalty if used
      if (hasPeekedThisExercise) {
        earnedXP += XP_REWARDS.peekPenalty;  // peekPenalty is -2
      }

      setTotalXP(totalXP + earnedXP);
      setStreak(streak + 1);

      setShowFeedback(true);
    } else {
      setAnswerState('wrong');
      audioService.playSFX('wrong');
      setStreak(0);
      setShowFeedback(true);

      // Re-queue this exercise
      const updatedQueue = [...exerciseQueue];
      updatedQueue.splice(currentExerciseIndex + 1, 0, currentExercise);
      setExerciseQueue(updatedQueue);
    }
  };

  const handleContinue = () => {
    if (currentExerciseIndex < exerciseQueue.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      onComplete(totalXP);
    }
  };

  const handleClear = () => {
    // Reset to original structure (keep prefilled, clear filled blanks)
    setSentenceStructure([...currentExercise.sentenceStructure]);
    setUsedAvailableIndices(new Set());
    setSelectedAvailableTile(null);
  };

  const handleReplayAudio = () => {
    audioService.speakSentence(currentExercise.correctAnswer);
  };

  if (!currentExercise) {
    return <div className="text-text-primary">Loading...</div>;
  }

  const progressPercent = ((currentExerciseIndex + 1) / totalExercises) * 100;
  const filledTiles = sentenceStructure.filter((t): t is BuildTile => t !== null);
  const constructedText = renderTiles(filledTiles);
  const allBlanksCount = sentenceStructure.filter(t => t === null).length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          {chunkTitle && (
            <div className="text-sm text-text-secondary">{chunkTitle}</div>
          )}
          <h2 className="text-2xl font-bold text-text-primary">
            Guided Build
          </h2>
          <div className="text-sm text-text-secondary mt-1">
            Exercise {currentExerciseIndex + 1} of {totalExercises}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Peek button */}
          {vocabulary && vocabulary.length > 0 && (
            <button
              onClick={handlePeekToggle}
              className="px-4 py-2 rounded-lg bg-text-secondary bg-opacity-20 hover:bg-opacity-30 transition-all flex items-center gap-2"
              aria-label="Peek at vocabulary"
            >
              <span className="text-xl">👁️</span>
              <span className="text-sm font-semibold text-text-primary">Peek</span>
            </button>
          )}
          {/* Streak indicator */}
          {streak > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-xp-gold bg-opacity-20">
              <span className="text-2xl">🔥</span>
              <span className="font-bold text-xp-gold">{streak} streak</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-3 bg-card-dark rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: moduleColor,
            }}
          />
        </div>
      </div>

      {/* English Prompt */}
      <div className="bg-card-dark rounded-xl p-6 mb-6 text-center">
        <div className="text-sm text-text-secondary mb-2 uppercase tracking-wide">
          Complete the sentence
        </div>
        <div className="text-2xl font-semibold text-text-primary">
          {currentExercise.englishPrompt}
        </div>
        <div className="text-sm text-text-secondary mt-2">
          ({currentExercise.blanksCount} {currentExercise.blanksCount === 1 ? 'word' : 'words'} missing)
        </div>
      </div>

      {/* Construction Zone - Sentence with blanks */}
      <div className="mb-6 p-6 rounded-xl border-2 border-dashed min-h-[120px] flex items-center justify-center"
        style={{ borderColor: `${moduleColor}60`, backgroundColor: `${moduleColor}10` }}
      >
        <div className="flex flex-wrap gap-2 justify-center items-center">
          {sentenceStructure.map((tile, index) => {
            const isOriginallyPrefilled = currentExercise.sentenceStructure[index] !== null;
            const isBlank = tile === null;

            if (isBlank) {
              // Render a blank slot to click
              return (
                <button
                  key={index}
                  onClick={() => handleBlankClick(index)}
                  className="px-6 py-3 rounded-lg border-2 border-dashed border-text-secondary bg-bg-start hover:bg-bg-end transition-all min-w-[80px]"
                  disabled={!selectedAvailableTile}
                  style={{
                    borderColor: selectedAvailableTile ? moduleColor : '#64748b',
                    opacity: selectedAvailableTile ? 1 : 0.5
                  }}
                >
                  <span className="text-text-secondary text-sm">___</span>
                </button>
              );
            } else {
              // Render filled tile
              return (
                <div key={index} className="relative">
                  <Tile
                    text={tile.text}
                    moduleColor={isOriginallyPrefilled ? '#64748b' : moduleColor}
                    onClick={() => handleFilledTileClick(index)}
                    isSelected={false}
                    isInConstruction={true}
                  />
                  {isOriginallyPrefilled && (
                    <div className="absolute top-0 right-0 -mt-1 -mr-1 w-4 h-4 bg-text-secondary rounded-full flex items-center justify-center text-xs">
                      🔒
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
      </div>

      {/* Preview Panel */}
      {filledTiles.length > 0 && (
        <div className="mb-6 p-4 rounded-lg bg-card-dark text-center">
          <div className="text-sm text-text-secondary mb-1">Preview:</div>
          <div className="klingon-text text-2xl text-text-primary">
            {constructedText}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mb-4 p-3 rounded-lg bg-card-dark text-center">
        <div className="text-sm text-text-secondary">
          {selectedAvailableTile ? (
            <>Click a blank (___) to place <span className="klingon-text text-text-primary font-bold">{selectedAvailableTile.tile.text}</span></>
          ) : (
            <>Click a tile below to select it, then click a blank (___) to place it</>
          )}
        </div>
      </div>

      {/* Available Tiles */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-3 justify-center">
          {availableTiles.map((tile, index) => {
            const isUsed = usedAvailableIndices.has(index);
            const isCurrentlySelected = selectedAvailableTile?.index === index;
            return (
              <Tile
                key={index}
                text={tile.text}
                moduleColor={isUsed ? '#475569' : (isCurrentlySelected ? '#22c55e' : moduleColor)}
                onClick={() => handleAvailableTileClick(index)}
                isSelected={isCurrentlySelected}
                isInConstruction={false}
              />
            );
          })}
        </div>
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
              <div className="text-xl font-bold text-success mb-2">Qapla'!</div>
              <div className="klingon-text text-2xl text-text-primary mb-2">
                {currentExercise.correctAnswer}
              </div>
              {currentExercise.literalTranslation && (
                <div className="text-2xl text-text-primary italic mb-2 font-semibold">
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
                  className="mt-4 p-4 rounded-lg"
                  style={{ backgroundColor: '#22c55e20' }}
                >
                  <p className="text-lg text-text-primary font-semibold">
                    {currentExercise.explanation}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="text-4xl mb-2">✗</div>
              <div className="text-xl font-bold text-error mb-2">Not quite...</div>
              <div className="text-sm text-text-secondary mb-2">Correct answer:</div>
              <div className="klingon-text text-2xl text-text-primary mb-2">
                {currentExercise.correctAnswer}
              </div>
              {currentExercise.literalTranslation && (
                <div className="text-2xl text-text-primary italic mb-2 font-semibold">
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
                  className="mt-4 p-4 rounded-lg"
                  style={{ backgroundColor: '#ef444420' }}
                >
                  <p className="text-lg text-text-primary font-semibold">
                    {currentExercise.explanation}
                  </p>
                </div>
              )}
              <div className="mt-4 text-sm text-text-secondary">
                This exercise will appear again
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        {answerState === 'pending' ? (
          <>
            <button
              onClick={handleClear}
              className="px-6 py-3 rounded-lg font-semibold bg-text-secondary bg-opacity-20 text-text-secondary hover:bg-opacity-30 transition-all disabled:opacity-50"
              disabled={usedAvailableIndices.size === 0}
            >
              Clear
            </button>
            <button
              onClick={handleCheckAnswer}
              className="px-8 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: moduleColor }}
              disabled={allBlanksCount > 0}
            >
              {allBlanksCount > 0 ? `Fill ${allBlanksCount} more blank${allBlanksCount === 1 ? '' : 's'}` : 'Check Answer'}
            </button>
          </>
        ) : (
          <button
            onClick={handleContinue}
            className="px-8 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: moduleColor }}
          >
            {currentExerciseIndex < exerciseQueue.length - 1 ? 'Continue' : 'Complete'}
          </button>
        )}
      </div>

      {/* Peek Panel */}
      {vocabulary && vocabulary.length > 0 && (
        <PeekPanel
          vocabulary={vocabulary}
          moduleColor={moduleColor}
          isOpen={isPeekOpen}
          onClose={() => setIsPeekOpen(false)}
        />
      )}
    </div>
  );
}

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}
