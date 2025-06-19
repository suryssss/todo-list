import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { THEME_CONFIGS, THEMES, saveTheme } from '../utils/gamification';

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeSelector = ({ currentTheme, onThemeChange }: ThemeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeSelect = (theme: string) => {
    onThemeChange(theme);
    saveTheme(theme);
    setIsOpen(false);
  };

  const currentThemeConfig = THEME_CONFIGS[currentTheme as keyof typeof THEME_CONFIGS] || THEME_CONFIGS[THEMES.LIGHT];

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="h-10 px-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
          title="Change theme"
        >
          <span className="text-lg mr-2">{currentThemeConfig.icon}</span>
          <span className="text-sm font-medium">{currentThemeConfig.name}</span>
          <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
          >
            <div className="p-2">
              {Object.entries(THEME_CONFIGS).map(([themeKey, config]) => (
                <motion.button
                  key={themeKey}
                  onClick={() => handleThemeSelect(themeKey)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    currentTheme === themeKey ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' : ''
                  }`}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl">{config.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{config.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{config.description}</div>
                  </div>
                  {currentTheme === themeKey && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-purple-500 rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector; 