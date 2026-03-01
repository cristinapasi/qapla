import { useState, useEffect } from 'react';
import { KlingonPiece, MatchQuestion, MatchRoundType } from '../../types/models';
import { audioService } from '../../services/AudioService';
import { generateMatchQuestions } from '../../utils/matchQuestionGenerator';

interface MatchPhaseProps {
  vocabulary: KlingonPiece[];
  moduleColor: string;
  onComplete: () => void;
  chunkTitle?: string;
}

export default function MatchPhase({
  vocabulary,
  moduleColor,
  onComplete,
  chunkTitle,
}: MatchPhaseProps) {
  const [questions, setQuestions] = useState<MatchQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerState, setAnswerState] = useState<'pending' | 'correct' | 'wrong'>('pending');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [missedQuestions, setMissedQuestions] = useState<Set<number>>(new Set());

  // Generate questions on mount
  useEffect(() => {
    const generated = generateMatchQuestions(vocabulary, 12); // 12-16 questions
    setQuestions(generated);
  }, [vocabulary]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // Determine current round based on question type
  const getCurrentRound = (): number => {
    if (!currentQuestion) return 1;
    const roundType = currentQuestion.roundType;
    if (roundType === 'pick-meaning') return 1;
    if (roundType === 'pick-klingon') return 2;
    return 3; // pick-function
  };

  const getRoundTitle = (round: number): string => {
    if (round === 1) return 'Pick the Meaning';
    if (round === 2) return 'Pick the Klingon';
    return 'Pick the Grammar';
  };

  const handleOptionClick = (index: number) => {
    if (answerState !== 'pending') return;

    setSelectedOption(index);
    const isCorrect = index === currentQuestion.correctIndex;

    if (isCorrect) {
      setAnswerState('correct');
      setCorrectCount(correctCount + 1);
      audioService.playSFX('correct');
    } else {
      setAnswerState('wrong');
      audioService.playSFX('wrong');

      // Mark question for re-insertion later
      setMissedQuestions(prev => new Set([...prev, currentIndex]));
    }

    // Auto-advance after 1 second
    setTimeout(() => {
      handleNext();
    }, 1000);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnswerState('pending');
      setSelectedOption(null);
    } else {
      // Check if we have missed questions to review
      if (missedQuestions.size > 0) {
        // Re-insert missed questions into the queue (mixed throughout)
        const missed = Array.from(missedQuestions).map(i => questions[i]);
        const shuffled = missed.sort(() => Math.random() - 0.5);
        setQuestions([...questions, ...shuffled]);
        setMissedQuestions(new Set()); // Clear the set
        setCurrentIndex(currentIndex + 1);
        setAnswerState('pending');
        setSelectedOption(null);
      } else {
        // All done!
        onComplete();
      }
    }
  };

  if (!currentQuestion) {
    return <div className="text-text-primary">Loading...</div>;
  }

  const currentRound = getCurrentRound();
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        {chunkTitle && (
          <h2 className="text-lg text-text-secondary mb-2">{chunkTitle}</h2>
        )}
        <h3 className="text-2xl font-bold text-text-primary mb-2">
          {getRoundTitle(currentRound)}
        </h3>
        <div className="text-sm text-text-secondary">
          Question {currentIndex + 1} of {totalQuestions}
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

      {/* Question Prompt */}
      <div className="mb-8 p-6 rounded-xl bg-card-dark text-center">
        {currentQuestion.klingonText && (
          <button
            onClick={() => audioService.speakWord(currentQuestion.klingonText!)}
            className="text-3xl mb-4 hover:scale-110 transition-transform"
            aria-label="Play audio"
          >
            🔊
          </button>
        )}
        <div
          className={`text-3xl font-semibold ${
            currentQuestion.roundType === 'pick-meaning' || currentQuestion.roundType === 'pick-function'
              ? 'klingon-text'
              : 'text-text-primary'
          }`}
        >
          {currentQuestion.prompt}
        </div>
      </div>

      {/* Options Grid (2x2) */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = index === currentQuestion.correctIndex;
          const showFeedback = answerState !== 'pending';

          let bgColor = `${moduleColor}20`;
          let textColor = moduleColor;
          let borderColor = moduleColor;

          if (showFeedback) {
            if (isCorrect) {
              bgColor = '#22c55e40';
              textColor = '#22c55e';
              borderColor = '#22c55e';
            } else if (isSelected) {
              bgColor = '#ef444440';
              textColor = '#ef4444';
              borderColor = '#ef4444';
            }
          } else if (isSelected) {
            bgColor = moduleColor;
            textColor = '#ffffff';
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={answerState !== 'pending'}
              className={`px-6 py-8 rounded-xl font-semibold text-xl transition-all border-2 disabled:cursor-not-allowed hover:scale-105 active:scale-95 ${
                currentQuestion.roundType === 'pick-klingon' || currentQuestion.roundType === 'pick-function'
                  ? 'klingon-text text-2xl'
                  : ''
              }`}
              style={{
                backgroundColor: bgColor,
                color: textColor,
                borderColor: borderColor,
              }}
              onMouseEnter={() => {
                if (currentQuestion.roundType === 'pick-klingon' || currentQuestion.roundType === 'pick-function') {
                  audioService.speakWord(option);
                }
              }}
            >
              {option}
              {showFeedback && isCorrect && ' ✓'}
              {showFeedback && isSelected && !isCorrect && ' ✗'}
            </button>
          );
        })}
      </div>

      {/* Score Indicator */}
      <div className="text-center text-text-secondary">
        <span className="text-success font-bold text-xl">{correctCount}</span> correct
      </div>
    </div>
  );
}
