/**
 * ConstructionZone Component
 * Shows selected tiles in order and displays real-time sentence preview
 */

import { BuildTile as BuildTileType } from '../../types/models';
import { renderTiles } from '../../utils/tileRenderer';
import Tile from './Tile';

interface ConstructionZoneProps {
  constructedTiles: BuildTileType[];
  moduleColor: string;
  onTileRemove: (index: number) => void;
}

export default function ConstructionZone({
  constructedTiles,
  moduleColor,
  onTileRemove,
}: ConstructionZoneProps) {
  const preview = renderTiles(constructedTiles);

  return (
    <div>
      <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wide">
        Your sentence
      </h3>

      {/* Construction Area - Selected tiles */}
      <div
        className="min-h-[120px] rounded-xl p-4 mb-4 border-2 border-dashed transition-all"
        style={{
          borderColor: constructedTiles.length > 0 ? moduleColor : '#64748b40',
          backgroundColor: constructedTiles.length > 0 ? `${moduleColor}10` : 'transparent',
        }}
      >
        {constructedTiles.length === 0 ? (
          <div className="text-text-secondary text-center py-8 text-sm">
            Select tiles to build your sentence...
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {constructedTiles.map((tile, index) => (
              <Tile
                key={index}
                text={tile.text}
                isSelected={false}
                isInConstruction={true}
                moduleColor={moduleColor}
                onClick={() => onTileRemove(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Real-time Preview */}
      {preview && (
        <div
          className="rounded-lg p-4 text-center"
          style={{
            backgroundColor: `${moduleColor}20`,
            borderLeft: `4px solid ${moduleColor}`,
          }}
        >
          <div className="text-xs text-text-secondary mb-1 uppercase tracking-wide">
            Preview
          </div>
          <div className="klingon-text text-2xl font-bold text-text-primary">
            {preview}
          </div>
        </div>
      )}
    </div>
  );
}
