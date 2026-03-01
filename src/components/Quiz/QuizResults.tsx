/**
 * QuizResults Component
 * Shows quiz score and pass/fail status
 */

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  correctCount: number;
  xpEarned: number;
  moduleColor: string;
  onRetry: () => void;
  onContinue: () => void;
}

const PASSING_SCORE = 70;

export default function QuizResults({
  score,
  totalQuestions,
  correctCount,
  xpEarned,
  moduleColor,
  onRetry,
  onContinue,
}: QuizResultsProps) {
  const passed = score >= PASSING_SCORE;

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Result Icon */}
      <div className="mb-6">
        {passed ? (
          <img
            src="/img/very-happy-kling.png"
            alt="Success!"
            className="w-48 h-48 mx-auto animate-bounce object-contain"
          />
        ) : (
          <div className="text-8xl">📚</div>
        )}
      </div>

      {/* Title */}
      <h2 className="text-4xl font-bold text-text-primary mb-4">
        {passed ? 'Quiz Passed!' : 'Keep Practicing'}
      </h2>

      {/* Score */}
      <div
        className="inline-block px-12 py-8 rounded-2xl mb-6"
        style={{
          backgroundColor: passed ? '#22c55e40' : '#eab30840',
          borderLeft: `4px solid ${passed ? '#22c55e' : '#eab308'}`,
        }}
      >
        <div className="text-6xl font-bold" style={{ color: passed ? '#22c55e' : '#eab308' }}>
          {score}%
        </div>
        <div className="text-text-secondary mt-2">
          {correctCount} of {totalQuestions} correct
        </div>
      </div>

      {/* XP Earned */}
      {passed && (
        <div className="mb-6">
          <div className="text-xp-gold text-3xl font-bold">
            +{xpEarned} XP
          </div>
          <div className="text-text-secondary text-sm">
            Experience earned
          </div>
        </div>
      )}

      {/* Message */}
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        {passed ? (
          <>
            Excellent work! You've mastered this module and unlocked the next level.
            The Sandbox is now available for free practice.
          </>
        ) : (
          <>
            You need {PASSING_SCORE}% to pass. Review the material and try again.
            Focus on the words and patterns you missed.
          </>
        )}
      </p>

      {/* Actions */}
      <div className="flex gap-4 justify-center">
        {!passed && (
          <button
            onClick={onRetry}
            className="px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95"
            style={{
              backgroundColor: moduleColor,
              color: '#ffffff',
            }}
          >
            Retry Quiz
          </button>
        )}

        <button
          onClick={onContinue}
          className="px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95"
          style={{
            backgroundColor: passed ? moduleColor : `${moduleColor}60`,
            color: '#ffffff',
          }}
        >
          {passed ? 'Continue to Sandbox' : 'Back to Dashboard'}
        </button>
      </div>
    </div>
  );
}
