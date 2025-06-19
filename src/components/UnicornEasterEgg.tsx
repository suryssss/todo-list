import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UnicornEasterEggProps {
  trigger: boolean;
  onComplete?: () => void;
}

const UnicornEasterEgg = ({ trigger, onComplete }: UnicornEasterEggProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: '-100vw', y: '50vh', rotate: 0, opacity: 0 }}
          animate={{ x: '100vw', y: '-50vh', rotate: 360, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="fixed inset-0 pointer-events-none z-50"
        >
          <div className="relative">

            <div className="absolute text-6xl animate-bounce">
              🦄
            </div>

            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>
                🌈
              </div>
              <div className="absolute text-xl animate-pulse" style={{ animationDelay: '1s' }}>
                ✨
              </div>
              <div className="absolute text-lg animate-pulse" style={{ animationDelay: '1.5s' }}>
                💫
              </div>
            </div>

            <div className="absolute top-4 left-4 text-xl animate-spin">
              ⭐
            </div>
            <div className="absolute top-8 right-8 text-lg animate-ping">
              ✨
            </div>
            <div className="absolute bottom-4 left-8 text-xl animate-bounce">
              🌟
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UnicornEasterEgg; 