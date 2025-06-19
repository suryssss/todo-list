'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import ThemeSelector from './ThemeSelector';
import { CheckCircle2 } from 'lucide-react';

const Header = () => {
  const { theme, setTheme } = useTheme();

  const getGradientClass = () => {
    switch (theme) {
      case 'candy-mode':
        return 'candy-gradient-text';
      case 'retro-mode':
        return 'retro-gradient-text';
      case 'fun-mode':
        return 'fun-gradient-text';
      default:
        return 'gradient-text';
    }
  };

  const getGlowClass = () => {
    switch (theme) {
      case 'candy-mode':
        return 'candy-glow';
      case 'retro-mode':
        return 'retro-glow';
      default:
        return 'animate-soft-glow';
    }
  };

  const getLineClass = () => {
    switch (theme) {
      case 'fun-mode':
        return 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-shift';
      case 'candy-mode':
        return 'bg-gradient-to-r from-pink-400 to-blue-400 animate-gradient-shift';
      case 'retro-mode':
        return 'bg-green-400 animate-pulse';
      default:
        return 'bg-gradient-to-r from-purple-500 to-blue-500';
    }
  };

  return (
    <header className="relative py-16 px-6 md:px-10 text-center">

      <div className="absolute top-4 right-4 z-10">
        <ThemeSelector currentTheme={theme || 'light'} onThemeChange={setTheme} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >

        <div className={`mb-4 ${getGlowClass()}`}>
          <CheckCircle2 className="h-12 w-12 text-indigo-500" />
        </div>


        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-4xl md:text-6xl font-bold tracking-tight ${getGradientClass()}`}
        >
          TodoFlow
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-3 text-lg md:text-xl text-muted-foreground font-medium"
        >
          Your minimalist task manager for focused productivity.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`origin-left mt-5 h-1 w-24 rounded-full ${getLineClass()}`}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-4 text-sm text-muted-foreground font-mono"
        >
          ✨ Clean, powerful, and theme-aware
        </motion.p>


        {theme && theme !== 'light' && theme !== 'dark' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-6"
          >
            <span
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${
                theme === 'fun-mode'
                  ? 'bg-pink-200 text-purple-800'
                  : theme === 'candy-mode'
                  ? 'bg-blue-100 text-pink-700'
                  : theme === 'retro-mode'
                  ? 'bg-black border border-green-400 text-green-300'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {theme === 'fun-mode' && '🌈 Fun Mode Activated'}
              {theme === 'candy-mode' && '🍭 Candy Mode Activated'}
              {theme === 'retro-mode' && '🎮 Retro Mode Activated'}
            </span>
          </motion.div>
        )}
      </motion.div>
    </header>
  );
};

export default Header;
