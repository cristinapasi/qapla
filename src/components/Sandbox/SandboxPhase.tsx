/**
 * SandboxPhase Component
 * Free sentence building with all learned vocabulary
 */

import { useState } from 'react';
import { KlingonPiece } from '../../types/models';
import { audioService } from '../../services/AudioService';
import { renderTiles } from '../../utils/tileRenderer';
import { BuildTile } from '../../types/models';

interface SandboxPhaseProps {
  vocabulary: KlingonPiece[];
  moduleColor: string;
  onUpdateProgress: (uniqueSentence: string) => void;
}

type FeedbackState = 'none' | 'valid' | 'invalid' | 'translation';

export default function SandboxPhase({
  vocabulary,
  moduleColor,
  onUpdateProgress,
}: SandboxPhaseProps) {
  const [selectedPieces, setSelectedPieces] = useState<KlingonPiece[]>([]);
  const [feedback, setFeedback] = useState<FeedbackState>('none');
  const [translation, setTranslation] = useState('');
  const [sentenceHistory, setSentenceHistory] = useState<string[]>([]);

  // Convert selected pieces to BuildTile format for rendering
  const buildTiles: BuildTile[] = selectedPieces.map((piece) => ({
    text: piece.tlh,
    attachRight: piece.attachBehavior === 'attach-before' || piece.attachBehavior === 'standalone',
    attachLeft: piece.attachBehavior === 'attach-after' || piece.attachBehavior === 'standalone',
  }));

  const constructedText = renderTiles(buildTiles);

  // Handle piece selection (allow reuse)
  const handlePieceClick = (piece: KlingonPiece) => {
    audioService.playSFX('click');
    setSelectedPieces([...selectedPieces, piece]);
    setFeedback('none');
    setTranslation('');
  };

  // Remove piece from construction
  const handleRemovePiece = (index: number) => {
    audioService.playSFX('click');
    setSelectedPieces(selectedPieces.filter((_, i) => i !== index));
    setFeedback('none');
    setTranslation('');
  };

  // Clear all selected pieces
  const handleClear = () => {
    setSelectedPieces([]);
    setFeedback('none');
    setTranslation('');
    audioService.playSFX('click');
  };

  // Basic grammar validation
  const handleCheck = () => {
    if (selectedPieces.length === 0) {
      setFeedback('invalid');
      audioService.playSFX('wrong');
      return;
    }

    // Basic validation rules:
    // 1. Should have at least one verb
    // 2. If transitive, should have a prefix
    const hasVerb = selectedPieces.some((p) => p.type === 'verb');
    const hasPrefix = selectedPieces.some((p) => p.type === 'prefix');

    if (!hasVerb) {
      setFeedback('invalid');
      audioService.playSFX('wrong');
      return;
    }

    // Valid sentence
    setFeedback('valid');
    audioService.playSFX('correct');

    // Add to history if unique
    if (!sentenceHistory.includes(constructedText)) {
      setSentenceHistory([constructedText, ...sentenceHistory].slice(0, 10));
      onUpdateProgress(constructedText);
    }
  };

  // Play audio of constructed sentence
  const handleHear = () => {
    if (constructedText) {
      audioService.speakSentence(constructedText);
      audioService.playSFX('click');
    }
  };

  // Show English translation
  const handleTranslate = () => {
    if (selectedPieces.length === 0) {
      return;
    }

    // Build translation from selected pieces
    const englishWords = selectedPieces.map((piece) => {
      // For prefixes/suffixes, show in parentheses
      if (piece.type === 'prefix' || piece.type === 'suffix') {
        return `(${piece.en})`;
      }
      return piece.en;
    });

    const translationText = englishWords.join(' ');
    setTranslation(translationText);
    setFeedback('translation');
    audioService.playSFX('sparkle');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Sandbox Mode</h2>
        <p className="text-text-secondary">
          Build any sentence you want using the vocabulary you've learned. Experiment freely!
        </p>
      </div>

      {/* Construction Zone */}
      <div
        className="mb-6 p-6 rounded-xl border-2 min-h-[120px] transition-all"
        style={{
          backgroundColor: '#1a1a2e',
          borderColor:
            feedback === 'valid'
              ? '#22c55e'
              : feedback === 'invalid'
              ? '#ef4444'
              : selectedPieces.length > 0
              ? moduleColor
              : '#64748b40',
        }}
      >
        {/* Selected Tiles */}
        {selectedPieces.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedPieces.map((piece, index) => (
              <button
                key={`${piece.id}-${index}`}
                onClick={() => handleRemovePiece(index)}
                className="px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: `${moduleColor}40`,
                  color: '#e2e8f0',
                  borderLeft: `3px solid ${moduleColor}`,
                }}
              >
                <span className="klingon-text">{piece.tlh}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center text-text-secondary mb-4 py-6">
            Tap words below to start building...
          </div>
        )}

        {/* Preview */}
        {constructedText && (
          <div className="text-center">
            <div
              className="text-2xl font-bold klingon-text mb-2"
              style={{ color: moduleColor }}
            >
              {constructedText}
            </div>

            {/* Translation */}
            {feedback === 'translation' && translation && (
              <div className="text-text-secondary text-sm italic">
                {translation}
              </div>
            )}

            {/* Validation Feedback */}
            {feedback === 'valid' && (
              <div className="text-success text-sm font-semibold">
                ✓ Qapla'! Valid sentence structure!
              </div>
            )}
            {feedback === 'invalid' && (
              <div className="text-error text-sm font-semibold">
                ✗ This doesn't look right. Try adding a verb!
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6 justify-center">
        <button
          onClick={handleCheck}
          disabled={selectedPieces.length === 0}
          className="px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            backgroundColor: `${moduleColor}`,
            color: '#ffffff',
          }}
        >
          ✓ Check
        </button>

        <button
          onClick={handleHear}
          disabled={selectedPieces.length === 0}
          className="px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            backgroundColor: '#64748b',
            color: '#ffffff',
          }}
        >
          🔊 Hear
        </button>

        <button
          onClick={handleTranslate}
          disabled={selectedPieces.length === 0}
          className="px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            backgroundColor: '#64748b',
            color: '#ffffff',
          }}
        >
          🌐 Translate
        </button>

        <button
          onClick={handleClear}
          disabled={selectedPieces.length === 0}
          className="px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            backgroundColor: '#475569',
            color: '#ffffff',
          }}
        >
          ✕ Clear
        </button>
      </div>

      {/* Vocabulary Pool */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-text-primary mb-3">Vocabulary</h3>

        {/* Bricks */}
        <div className="mb-4">
          <div className="text-xs text-text-secondary mb-2 uppercase tracking-wide">
            Bricks (Content Words)
          </div>
          <div className="flex flex-wrap gap-2">
            {vocabulary
              .filter((v) => v.category === 'brick')
              .map((piece) => (
                <button
                  key={piece.id}
                  onClick={() => handlePieceClick(piece)}
                  className="px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: '#64748b30',
                    color: '#e2e8f0',
                    border: '2px solid #64748b40',
                  }}
                >
                  <span className="klingon-text">{piece.tlh}</span>
                  <span className="text-xs text-text-secondary ml-2">
                    {piece.en}
                  </span>
                </button>
              ))}
          </div>
        </div>

        {/* Mortar */}
        <div>
          <div className="text-xs text-text-secondary mb-2 uppercase tracking-wide">
            Mortar (Grammar Pieces)
          </div>
          <div className="flex flex-wrap gap-2">
            {vocabulary
              .filter((v) => v.category === 'mortar')
              .map((piece) => (
                <button
                  key={piece.id}
                  onClick={() => handlePieceClick(piece)}
                  className="px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: `${moduleColor}20`,
                    color: moduleColor,
                    border: `2px solid ${moduleColor}40`,
                  }}
                >
                  <span className="klingon-text">{piece.tlh}</span>
                  <span className="text-xs text-text-secondary ml-2">
                    {piece.en}
                  </span>
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Sentence History */}
      {sentenceHistory.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-text-primary mb-3">
            Recent Sentences ({sentenceHistory.length} unique)
          </h3>
          <div className="space-y-2">
            {sentenceHistory.map((sentence, index) => (
              <div
                key={index}
                className="px-4 py-3 rounded-lg"
                style={{
                  backgroundColor: '#1a1a2e',
                  borderLeft: `3px solid ${moduleColor}`,
                }}
              >
                <div className="klingon-text text-text-primary font-semibold">
                  {sentence}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
