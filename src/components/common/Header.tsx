import { RANKS } from '../../types/models';

interface HeaderProps {
  xp: number;
  currentRank: number;
  soundMuted: boolean;
  onMuteToggle: () => void;
}

export default function Header({ xp, currentRank, soundMuted, onMuteToggle }: HeaderProps) {
  const rank = RANKS[currentRank];
  const nextRank = RANKS[currentRank + 1];

  // Calculate progress to next rank
  const progressPercent = nextRank
    ? Math.min(100, ((xp - rank.xp) / (nextRank.xp - rank.xp)) * 100)
    : 100;

  return (
    <header className="w-full bg-bg-end bg-opacity-80 backdrop-blur-sm border-b border-text-secondary border-opacity-20">
      <div className="w-full max-w-app mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Title */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <img
            src="/img/kling.png"
            alt="Qapla'"
            className="w-16 h-16 object-contain"
          />
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              Qapla'
            </h1>
            <p className="text-[10px] text-text-secondary" style={{ fontFamily: 'Klingonese', fontSize: '10px' }}>
              tlhIngan Hol yIghoj!
            </p>
          </div>
        </div>

        {/* Center: Rank & XP */}
        <div className="flex-1 mx-6 max-w-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-3xl">{rank.icon}</span>
            <div className="flex-1">
              <div className="text-lg font-semibold text-text-primary">
                {rank.en}
              </div>
              <div className="text-[10px] text-text-secondary" style={{ fontFamily: 'Klingonese', fontSize: '10px' }}>
                {rank.tlh}
              </div>
            </div>
            <div className="text-xp-gold font-bold text-lg">
              {xp} XP
            </div>
          </div>

          {/* XP Progress Bar */}
          {nextRank && (
            <div className="w-full bg-text-secondary bg-opacity-20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-xp-gold h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}
        </div>

        {/* Right: Sound Toggle */}
        <button
          onClick={onMuteToggle}
          className="flex-shrink-0 p-2 rounded-lg hover:bg-text-secondary hover:bg-opacity-20 transition-colors"
          aria-label={soundMuted ? 'Unmute sounds' : 'Mute sounds'}
        >
          <span className="text-2xl">
            {soundMuted ? '🔇' : '🔊'}
          </span>
        </button>
      </div>
    </header>
  );
}
