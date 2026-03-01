import { useState, useEffect } from 'react';
import { KlingonPiece } from '../../types/models';
import { audioService } from '../../services/AudioService';
import { generateOptions, getCorrectIndex } from '../../utils/distractorGenerator';

interface LearnPhaseProps {
  vocabulary: KlingonPiece[];
  moduleColor: string;
  onComplete: () => void;
  chunkTitle?: string;  // Optional: for chunked learning modules
}

type AnswerState = 'pending' | 'correct' | 'wrong';

export default function LearnPhase({ vocabulary, moduleColor, onComplete, chunkTitle }: LearnPhaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>('pending');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [missedWords, setMissedWords] = useState<Set<number>>(new Set());
  const [isReviewRound, setIsReviewRound] = useState(false);
  const [reviewQueue, setReviewQueue] = useState<number[]>([]);

  const currentWord = vocabulary[currentIndex];
  const totalWords = vocabulary.length;
  const wordsCompleted = currentIndex + (isReviewRound ? totalWords : 0);
  const totalToComplete = isReviewRound ? totalWords + reviewQueue.length : totalWords;
  const progressPercent = (wordsCompleted / totalToComplete) * 100;

  // Generate options for current word
  useEffect(() => {
    if (currentWord) {
      const newOptions = generateOptions(currentWord, vocabulary);
      setOptions(newOptions);
      setCorrectIndex(getCorrectIndex(newOptions, currentWord.en));
      setAnswerState('pending');
      setSelectedIndex(null);

      // Auto-play audio
      setTimeout(() => {
        audioService.speakWord(currentWord.tlh);
      }, 300);
    }
  }, [currentIndex, currentWord, vocabulary]);

  const handleOptionClick = (index: number) => {
    if (answerState !== 'pending') return;

    setSelectedIndex(index);

    if (index === correctIndex) {
      // Correct answer
      setAnswerState('correct');
      audioService.playSFX('correct');

      // Move to next word after delay
      setTimeout(() => {
        moveToNext();
      }, 800);
    } else {
      // Wrong answer
      setAnswerState('wrong');
      audioService.playSFX('wrong');

      // Mark for review
      if (!isReviewRound) {
        setMissedWords((prev) => new Set([...prev, currentIndex]));
      }

      // Replay audio and show correct answer
      audioService.speakWord(currentWord.tlh);

      // Move to next after longer delay
      setTimeout(() => {
        moveToNext();
      }, 1500);
    }
  };

  const moveToNext = () => {
    if (isReviewRound) {
      // In review round
      if (currentIndex < reviewQueue.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Review round complete
        onComplete();
      }
    } else {
      // First pass
      if (currentIndex < totalWords - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // First pass complete
        if (missedWords.size > 0) {
          // Start review round
          const queue = Array.from(missedWords);
          setReviewQueue(queue);
          setIsReviewRound(true);
          setCurrentIndex(0);
          setMissedWords(new Set());
        } else {
          // All correct, complete
          onComplete();
        }
      }
    }
  };

  const handleReplayAudio = () => {
    audioService.speakWord(currentWord.tlh);
    audioService.playSFX('click');
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          {isReviewRound ? 'Review Round' : chunkTitle ? `Learn: ${chunkTitle}` : 'Learn New Words'}
        </h2>
        <p className="text-text-secondary">
          Word {wordsCompleted + 1} of {totalToComplete}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-text-secondary bg-opacity-20 rounded-full h-3 mb-8 overflow-hidden">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: moduleColor,
          }}
        />
      </div>

      {/* Word Display */}
      <div className="bg-bg-end bg-opacity-60 rounded-2xl p-8 mb-6 text-center">
        <button
          onClick={handleReplayAudio}
          className="mx-auto mb-4 text-4xl hover:scale-110 transition-transform"
          aria-label="Play pronunciation"
        >
          🔊
        </button>

        <div className="klingon-text text-4xl font-bold text-text-primary mb-2">
          {currentWord.tlh}
        </div>

        <p className="text-text-secondary text-lg">
          What does this mean?
        </p>

        {/* Show correct answer if wrong was selected */}
        {answerState === 'wrong' && (
          <div
            className="mt-4 px-6 py-3 rounded-lg text-lg font-semibold"
            style={{ backgroundColor: `${moduleColor}40`, color: moduleColor }}
          >
            Correct: {currentWord.en}
          </div>
        )}
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrect = index === correctIndex;
          const showFeedback = answerState !== 'pending';

          let bgColor = '#64748b30';
          let textColor = '#e2e8f0';
          let borderColor = '#64748b40';

          if (showFeedback && isCorrect) {
            bgColor = '#22c55e40';
            textColor = '#22c55e';
            borderColor = '#22c55e';
          } else if (showFeedback && isSelected && !isCorrect) {
            bgColor = '#ef444440';
            textColor = '#ef4444';
            borderColor = '#ef4444';
          } else if (isSelected) {
            bgColor = `${moduleColor}40`;
            borderColor = moduleColor;
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={answerState !== 'pending'}
              className="px-8 py-6 rounded-xl font-semibold text-3xl transition-all border-2 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              style={{
                backgroundColor: bgColor,
                color: textColor,
                borderColor: borderColor,
              }}
            >
              {option}
              {showFeedback && isCorrect && ' ✓'}
              {showFeedback && isSelected && !isCorrect && ' ✗'}
            </button>
          );
        })}
      </div>

      {/* Word Type Hint */}
      <div className="mt-6 text-center text-text-secondary text-sm">
        ({currentWord.type})
        {currentWord.usageHint && (
          <div className="mt-1 text-xs">
            {currentWord.usageHint}
          </div>
        )}
      </div>
    </div>
  );
}
