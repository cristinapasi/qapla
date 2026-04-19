import { UserProgress, PhaseType } from '../../types/models';
import ModuleCard from './ModuleCard';

interface DashboardProps {
  progress: UserProgress;
  username: string;
  onStartLesson: (moduleId: number, phase: PhaseType) => void;
}

const MODULE_INFO = [
  {
    id: 1,
    titleEn: 'Survival Basics',
    titleTlh: 'yIn motlh',
    theme: 'Eat, Drink & Get Around',
    color: '#f97316',
  },
  {
    id: 2,
    titleEn: 'Opinions & Feelings',
    titleTlh: 'yab & tIv',
    theme: 'Like, Want & Think',
    color: '#a855f7',
  },
  {
    id: 3,
    titleEn: 'Social Life',
    titleTlh: 'nugh yIn',
    theme: 'Talk, Meet & Connect',
    color: '#06b6d4',
  },
  {
    id: 4,
    titleEn: 'Time & Questions',
    titleTlh: 'poH & ghel',
    theme: 'When, Where & How',
    color: '#eab308',
  },
  {
    id: 5,
    titleEn: 'Personality & Flow',
    titleTlh: 'SaH & Qatlh',
    theme: 'Express Yourself',
    color: '#ec4899',
  },
];

export default function Dashboard({ progress, username, onStartLesson }: DashboardProps) {
  const isModuleUnlocked = (moduleId: number): boolean => {
    if (moduleId === 1) return true;
    const prevQuizScore = progress.quizScores[moduleId - 1];
    return prevQuizScore !== undefined && prevQuizScore >= 70;
  };

  const getPhaseStatus = (moduleId: number, phase: PhaseType): boolean =>
    progress.modulesCompleted[`${moduleId}-${phase}`] || false;

  // Resume: find the last place the user was
  const resumeModule = progress.lastModule;
  const resumePhase = progress.lastPhase;
  const resumeInfo = resumeModule
    ? MODULE_INFO.find(m => m.id === resumeModule)
    : null;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <img
          src="/img/kling.png"
          alt="Klingon warrior"
          className="w-48 h-48 mx-auto mb-4 object-contain"
        />
        <h2 className="text-5xl font-bold text-text-primary mb-2 klingon-text">
          nuqneH!
        </h2>
        <p className="text-text-secondary text-lg">
          Welcome back, <span className="text-text-primary font-semibold">{username}</span>
        </p>
        <p className="text-text-secondary mt-2">
          Build <span className="text-xp-gold font-bold">1,000+ sentences</span> with{' '}
          <span className="text-success font-bold">80 pieces</span>
        </p>
      </div>

      {/* Continue Card */}
      {resumeInfo && resumePhase && (
        <div
          className="rounded-lg p-5 border-2 flex items-center justify-between gap-4"
          style={{ borderColor: resumeInfo.color, backgroundColor: `${resumeInfo.color}15` }}
        >
          <div>
            <p className="text-text-secondary text-sm mb-1">Continue where you left off</p>
            <p className="text-text-primary font-bold text-lg">
              Module {resumeInfo.id}: {resumeInfo.titleEn}
            </p>
            <p className="text-text-secondary text-sm capitalize">{resumePhase} phase</p>
          </div>
          <button
            onClick={() => onStartLesson(resumeInfo.id, resumePhase)}
            className="flex-shrink-0 px-5 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: resumeInfo.color }}
          >
            Continue →
          </button>
        </div>
      )}

      {/* Modules Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-text-primary">
          Your Learning Path
        </h3>

        <div className="grid gap-4">
          {MODULE_INFO.map((moduleInfo) => {
            const unlocked = isModuleUnlocked(moduleInfo.id);
            const learnComplete = getPhaseStatus(moduleInfo.id, 'learn');
            const buildComplete = getPhaseStatus(moduleInfo.id, 'build');
            const quizComplete = getPhaseStatus(moduleInfo.id, 'quiz');

            return (
              <ModuleCard
                key={moduleInfo.id}
                moduleId={moduleInfo.id}
                titleEn={moduleInfo.titleEn}
                titleTlh={moduleInfo.titleTlh}
                theme={moduleInfo.theme}
                color={moduleInfo.color}
                unlocked={unlocked}
                learnComplete={learnComplete}
                buildComplete={buildComplete}
                quizComplete={quizComplete}
                sandboxUnlocked={quizComplete}
                quizScore={progress.quizScores[moduleInfo.id]}
                onStartPhase={(phase) => onStartLesson(moduleInfo.id, phase)}
              />
            );
          })}
        </div>
      </div>

      {/* Pronunciation Guide Link */}
      <div className="text-center mt-8">
        <button className="text-text-secondary hover:text-text-primary underline text-sm">
          📖 Pronunciation Guide
        </button>
      </div>
    </div>
  );
}
