/**
 * TilePool Component
 * Displays shuffled tiles that can be selected for sentence construction
 */

import { BuildTile as BuildTileType } from '../../types/models';
import Tile from './Tile';

interface TilePoolProps {
  tiles: BuildTileType[];
  selectedIndices: Set<number>;
  moduleColor: string;
  onTileClick: (index: number) => void;
}

export default function TilePool({
  tiles,
  selectedIndices,
  moduleColor,
  onTileClick,
}: TilePoolProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wide">
        Tap tiles to build
      </h3>
      <div className="flex flex-wrap gap-2">
        {tiles.map((tile, index) => (
          <Tile
            key={index}
            text={tile.text}
            isSelected={selectedIndices.has(index)}
            isInConstruction={selectedIndices.has(index)}
            moduleColor={moduleColor}
            onClick={() => onTileClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
