/**
 * QuizContainer Component
 * Manages quiz flow: questions → results
 */

import { useState } from 'react';
import { QuizQuestion } from '../../types/models';
import QuizPhase from './QuizPhase';
import QuizResults from './QuizResults';

interface QuizContainerProps {
  questions: QuizQuestion[];
  moduleColor: string;
  onComplete: (score: number, xpEarned: number) => void;
  onRetry: () => void;
}

export default function QuizContainer({
  questions,
  moduleColor,
  onComplete,
  onRetry,
}: QuizContainerProps) {
  const [quizComplete, setQuizComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const handleQuizComplete = (score: number, xp: number) => {
    setFinalScore(score);
    setXpEarned(xp);
    setCorrectCount(Math.round((score / 100) * questions.length));
    setQuizComplete(true);
  };

  const handleContinue = () => {
    onComplete(finalScore, xpEarned);
  };

  const handleRetry = () => {
    setQuizComplete(false);
    setFinalScore(0);
    setXpEarned(0);
    setCorrectCount(0);
    onRetry();
  };

  if (quizComplete) {
    return (
      <QuizResults
        score={finalScore}
        totalQuestions={questions.length}
        correctCount={correctCount}
        xpEarned={xpEarned}
        moduleColor={moduleColor}
        onRetry={handleRetry}
        onContinue={handleContinue}
      />
    );
  }

  return (
    <QuizPhase
      questions={questions}
      moduleColor={moduleColor}
      onComplete={handleQuizComplete}
    />
  );
}
