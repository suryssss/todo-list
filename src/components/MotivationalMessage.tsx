import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomMotivationalMessage } from '../utils/gamification';

interface MotivationalMessageProps {
  show: boolean;
  onHide: () => void;
  type?: 'success' | 'add' | 'complete';
}

const MotivationalMessage = ({ show, onHide, type = 'success' }: MotivationalMessageProps) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (show) {
      setMessage(getRandomMotivationalMessage());
      const timer = setTimeout(() => {
        onHide();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  const getEmoji = () => {
    switch (type) {
      case 'add':
        return '✨';
      case 'complete':
        return '🎉';
      default:
        return '🌟';
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            duration: 0.5 
          }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full shadow-lg border border-white/20 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl animate-bounce">{getEmoji()}</span>
              <span className="font-bold text-lg">{message}</span>
              <span className="text-xl animate-bounce">{getEmoji()}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MotivationalMessage; 