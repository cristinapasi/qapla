/**
 * QuizPhase Component
 * Assessment with multiple question types and scoring
 */

import { useState, useEffect } from 'react';
import { QuizQuestion } from '../../types/models';
import { audioService } from '../../services/AudioService';
import { XP_REWARDS, calculateXP } from '../../utils/xpCalculator';

interface QuizPhaseProps {
  questions: QuizQuestion[];
  moduleColor: string;
  onComplete: (score: number, xpEarned: number) => void;
}

type AnswerState = 'pending' | 'correct' | 'wrong';

export default function QuizPhase({ questions, moduleColor, onComplete }: QuizPhaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('pending');
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [audioPlayed, setAudioPlayed] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = (currentIndex / totalQuestions) * 100;

  // Auto-play audio for audio-recognition questions
  useEffect(() => {
    if (currentQuestion && currentQuestion.type === 'audio-recognition' && !audioPlayed) {
      setTimeout(() => {
        if (currentQuestion.klingonText) {
          audioService.speakWord(currentQuestion.klingonText);
          setAudioPlayed(true);
        }
      }, 500);
    } else {
      setAudioPlayed(false);
    }
  }, [currentIndex, currentQuestion, audioPlayed]);

  // Handle option selection
  const handleOptionSelect = (index: number) => {
    if (answerState !== 'pending') return;

    setSelectedOption(index);

    const isCorrect = index === currentQuestion.correctIndex;

    if (isCorrect) {
      setAnswerState('correct');
      audioService.playSFX('correct');
      setCorrectCount(correctCount + 1);

      // Calculate XP with streak bonus
      const xp = calculateXP(
        XP_REWARDS.quizCorrect,
        streak,
        XP_REWARDS.quizCorrectMaxStreak
      );
      setTotalXP(totalXP + xp);
      setStreak(streak + 1);

      // Play Klingon audio if available (but not for audio-recognition - already played)
      if (currentQuestion.klingonText && currentQuestion.type !== 'audio-recognition') {
        setTimeout(() => {
          audioService.speakWord(currentQuestion.klingonText!);
        }, 300);
      }
    } else {
      setAnswerState('wrong');
      audioService.playSFX('wrong');
      setStreak(0);
    }

    // Move to next question after delay
    setTimeout(() => {
      moveToNext();
    }, 1500);
  };

  // Move to next question
  const moveToNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setAnswerState('pending');
    } else {
      // Quiz complete
      const score = Math.round((correctCount / totalQuestions) * 100);
      onComplete(score, totalXP);
    }
  };

  // Replay audio (for audio-recognition questions)
  const handleReplayAudio = () => {
    if (currentQuestion.klingonText) {
      audioService.speakWord(currentQuestion.klingonText);
      audioService.playSFX('click');
    }
  };

  // Play audio for any Klingon option (on hover/click)
  const handleOptionAudio = (option: string, isKlingon: boolean) => {
    if (isKlingon && answerState === 'pending') {
      audioService.speakWord(option);
    }
  };

  const isKlingonQuestion =
    currentQuestion.type === 'en-to-tlh' || currentQuestion.type === 'fill-gap';

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Quiz</h2>
            <p className="text-text-secondary text-sm">
              Question {currentIndex + 1} of {totalQuestions}
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

      {/* Question */}
      <div className="bg-bg-end bg-opacity-60 rounded-xl p-8 mb-6">
        {/* Question Type Indicator */}
        <div className="text-xs text-text-secondary mb-3 uppercase tracking-wide">
          {currentQuestion.type === 'tlh-to-en' && 'Klingon → English'}
          {currentQuestion.type === 'en-to-tlh' && 'English → Klingon'}
          {currentQuestion.type === 'audio-recognition' && 'Audio Recognition'}
          {currentQuestion.type === 'fill-gap' && 'Fill the Gap'}
        </div>

        {/* Question Text/Audio */}
        {currentQuestion.type === 'audio-recognition' ? (
          <div className="text-center">
            <button
              onClick={handleReplayAudio}
              className="mx-auto mb-4 text-5xl hover:scale-110 transition-transform"
              aria-label="Play audio"
            >
              🔊
            </button>
            <div className="text-2xl font-semibold text-text-primary">
              {currentQuestion.question}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-3xl font-semibold text-text-primary">
              {currentQuestion.question}
            </div>

            {/* Show Klingon text for certain question types */}
            {currentQuestion.klingonText &&
              (currentQuestion.type === 'tlh-to-en' || currentQuestion.type === 'fill-gap') && (
                <div className="mt-4">
                  <button
                    onClick={handleReplayAudio}
                    onMouseEnter={() => {
                      if (currentQuestion.klingonText && answerState === 'pending') {
                        audioService.speakWord(currentQuestion.klingonText);
                      }
                    }}
                    className="inline-block hover:opacity-80 transition-opacity"
                  >
                    <span className="klingon-text text-4xl text-text-primary mr-2">
                      {currentQuestion.klingonText}
                    </span>
                    <span className="text-2xl hover:scale-110 transition-transform inline-block">
                      🔊
                    </span>
                  </button>
                </div>
              )}
          </div>
        )}
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-3">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = index === currentQuestion.correctIndex;
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
              onClick={() => handleOptionSelect(index)}
              onMouseEnter={() => handleOptionAudio(option, isKlingonQuestion)}
              disabled={answerState !== 'pending'}
              className="px-8 py-6 rounded-xl font-semibold text-xl transition-all border-2 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              style={{
                backgroundColor: bgColor,
                color: textColor,
                borderColor: borderColor,
              }}
            >
              <span className={isKlingonQuestion ? 'klingon-text' : ''}>
                {option}
              </span>
              {showFeedback && isCorrect && ' ✓'}
              {showFeedback && isSelected && !isCorrect && ' ✗'}
            </button>
          );
        })}
      </div>

      {/* Score Display */}
      <div className="mt-6 text-center text-text-secondary text-sm">
        Correct: {correctCount} / {currentIndex + (answerState !== 'pending' ? 1 : 0)}
      </div>
    </div>
  );
}
