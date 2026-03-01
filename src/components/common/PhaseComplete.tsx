/**
 * PhaseComplete - Celebration screen shown after completing a Learn or Build phase
 */

import { useEffect } from 'react';
import { audioService } from '../../services/AudioService';

interface PhaseCompleteProps {
  title: string;
  xpEarned?: number;
  moduleColor: string;
  onContinue: () => void;
}

export default function PhaseComplete({ title, xpEarned, moduleColor, onContinue }: PhaseCompleteProps) {
  // Speak "Qapla'!" when component mounts
  useEffect(() => {
    // Split into syllables manually: Qap la'
    audioService.speakSentence("Qap la'");
  }, []);

  return (
    <div className="max-w-md mx-auto text-center">
      {/* Celebration */}
      <div className="mb-8">
        <img
          src="/img/happy-kling.png"
          alt="Qapla'!"
          className="w-40 h-40 mx-auto mb-4 animate-bounce object-contain"
        />
        <h2 className="text-5xl font-bold text-text-primary mb-4 klingon-text">
          Qapla'!
        </h2>
        <p className="text-2xl text-text-secondary mb-2">
          {title} Complete
        </p>
        {xpEarned !== undefined && (
          <div className="text-xp-gold text-xl font-bold">
            +{xpEarned} XP
          </div>
        )}
      </div>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        className="px-12 py-4 rounded-xl font-bold text-xl transition-all hover:scale-105 active:scale-95"
        style={{
          backgroundColor: moduleColor,
          color: '#ffffff',
        }}
      >
        Continue
      </button>
    </div>
  );
}
