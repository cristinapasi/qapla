/**
 * Tile Component
 * Represents a single word/morpheme piece that can be tapped to select
 */

import { audioService } from '../../services/AudioService';

interface TileProps {
  text: string;
  isSelected: boolean;
  isInConstruction: boolean;
  moduleColor: string;
  onClick: () => void;
}

export default function Tile({
  text,
  isSelected,
  isInConstruction,
  moduleColor,
  onClick,
}: TileProps) {
  const handleClick = () => {
    audioService.playSFX('click');
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={isInConstruction}
      className={`
        tile
        px-6 py-4 rounded-lg font-semibold text-xl
        transition-all duration-200
        border-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isSelected ? 'selected' : ''}
        ${!isInConstruction && 'hover:scale-105 active:scale-95'}
      `}
      style={{
        backgroundColor: isSelected ? `${moduleColor}60` : `${moduleColor}20`,
        borderColor: isSelected ? moduleColor : `${moduleColor}40`,
        color: isSelected ? moduleColor : '#e2e8f0',
      }}
    >
      <span className="klingon-text">{text}</span>
    </button>
  );
}
