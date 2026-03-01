import { KlingonPiece } from '../../types/models';

interface PeekPanelProps {
  vocabulary: KlingonPiece[];
  moduleColor: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PeekPanel({
  vocabulary,
  moduleColor,
  isOpen,
  onClose,
}: PeekPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-fadeIn"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed right-0 top-0 bottom-0 w-80 max-w-full bg-card-dark shadow-2xl z-50 overflow-y-auto animate-slideInRight"
      >
        {/* Header */}
        <div
          className="p-4 flex items-center justify-between sticky top-0 bg-card-dark border-b-2"
          style={{ borderColor: `${moduleColor}60` }}
        >
          <h3 className="text-xl font-bold text-text-primary">
            📖 Vocabulary Reference
          </h3>
          <button
            onClick={onClose}
            className="text-2xl hover:scale-110 transition-transform"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Penalty Warning */}
        <div className="p-3 bg-xp-gold bg-opacity-10 border-l-4 border-xp-gold m-4">
          <div className="text-sm text-text-secondary">
            Using peek: <span className="font-bold text-xp-gold">-2 XP</span> this exercise
          </div>
        </div>

        {/* Vocabulary List */}
        <div className="p-4 space-y-3">
          {vocabulary.map((piece) => (
            <div
              key={piece.id}
              className="p-3 rounded-lg bg-bg-end bg-opacity-40 hover:bg-opacity-60 transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="klingon-text text-xl text-text-primary font-bold">
                  {piece.tlh}
                </div>
                <div className="text-xs text-text-secondary uppercase">
                  {piece.type}
                </div>
              </div>
              <div className="text-base text-text-secondary">
                {piece.en}
              </div>
              {piece.usageHint && (
                <div className="text-xs text-text-secondary italic mt-1">
                  {piece.usageHint}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
