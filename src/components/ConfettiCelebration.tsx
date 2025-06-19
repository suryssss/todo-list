import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiCelebrationProps {
  trigger: boolean;
  onComplete?: () => void;
}

const ConfettiCelebration = ({ trigger, onComplete }: ConfettiCelebrationProps) => {
  useEffect(() => {
    if (trigger) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#a8e6cf', '#dcedc1']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#a8e6cf', '#dcedc1']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        } else {
          // Final burst
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#a8e6cf', '#dcedc1']
          });
          onComplete?.();
        }
      };

      frame();
    }
  }, [trigger, onComplete]);

  return null;
};

export default ConfettiCelebration; 