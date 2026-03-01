import { PhaseType } from '../../types/models';

interface ModuleCardProps {
  moduleId: number;
  titleEn: string;
  titleTlh: string;
  theme: string;
  color: string;
  unlocked: boolean;
  learnComplete: boolean;
  buildComplete: boolean;
  quizComplete: boolean;
  sandboxUnlocked: boolean;
  quizScore?: number;
  onStartPhase: (phase: PhaseType) => void;
}

export default function ModuleCard({
  moduleId,
  titleEn,
  titleTlh,
  theme,
  color,
  unlocked,
  learnComplete,
  buildComplete,
  quizComplete,
  sandboxUnlocked,
  quizScore,
  onStartPhase,
}: ModuleCardProps) {
  if (!unlocked) {
    return (
      <div
        className="rounded-lg p-6 bg-text-secondary bg-opacity-10 border-2 border-text-secondary border-opacity-30"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-2xl font-bold text-text-secondary opacity-50">
              Module {moduleId}: {titleEn}
            </h3>
            <p className="text-base text-text-secondary klingon-text opacity-50">
              {titleTlh}
            </p>
          </div>
          <span className="text-3xl opacity-30">🔒</span>
        </div>
        <p className="text-text-secondary opacity-50 text-sm">
          Complete previous module to unlock
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg p-6 border-2 transition-all duration-200 hover:scale-[1.02]"
      style={{
        borderColor: color,
        backgroundColor: `${color}15`,
      }}
    >
      {/* Header */}
      <div className="mb-4">
        <h3
          className="text-xl sm:text-2xl font-bold mb-1"
          style={{ color }}
        >
          Module {moduleId}: {titleEn}
        </h3>
        <p className="text-text-secondary klingon-text text-sm sm:text-base">
          {titleTlh}
        </p>
        <p className="text-text-primary text-sm sm:text-base mt-1">
          {theme}
        </p>
      </div>

      {/* Phase Buttons */}
      <div className="grid grid-cols-2 gap-2">
        {/* Learn */}
        <button
          onClick={() => onStartPhase('learn')}
          className="px-4 py-3 rounded-lg font-semibold transition-all"
          style={{
            backgroundColor: learnComplete ? `${color}40` : color,
            color: learnComplete ? color : '#ffffff',
          }}
        >
          {learnComplete ? '✓ ' : ''}Learn
        </button>

        {/* Build */}
        <button
          onClick={() => onStartPhase('build')}
          className="px-4 py-3 rounded-lg font-semibold transition-all"
          style={{
            backgroundColor: buildComplete ? `${color}40` : color,
            color: buildComplete ? color : '#ffffff',
          }}
        >
          {buildComplete ? '✓ ' : ''}Build
        </button>

        {/* Quiz */}
        <button
          onClick={() => onStartPhase('quiz')}
          className="px-4 py-3 rounded-lg font-semibold transition-all"
          style={{
            backgroundColor: quizComplete ? `${color}40` : color,
            color: quizComplete ? color : '#ffffff',
          }}
        >
          {quizComplete ? '✓ ' : ''}Quiz
          {quizScore !== undefined && (
            <span className="ml-1 text-xs">
              ({quizScore}%)
            </span>
          )}
        </button>

        {/* Sandbox */}
        <button
          onClick={() => onStartPhase('sandbox')}
          disabled={!sandboxUnlocked}
          className="px-4 py-3 rounded-lg font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            backgroundColor: sandboxUnlocked ? color : `${color}20`,
            color: '#ffffff',
          }}
        >
          {sandboxUnlocked ? '' : '🔒 '}Sandbox
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="mt-4 flex gap-2">
        <div
          className="flex-1 h-2 rounded-full"
          style={{
            backgroundColor: learnComplete ? color : `${color}30`,
          }}
        />
        <div
          className="flex-1 h-2 rounded-full"
          style={{
            backgroundColor: buildComplete ? color : `${color}30`,
          }}
        />
        <div
          className="flex-1 h-2 rounded-full"
          style={{
            backgroundColor: quizComplete ? color : `${color}30`,
          }}
        />
      </div>
    </div>
  );
}
