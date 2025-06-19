import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FilterType } from '../types/todo';
import { BarChart3, Trash2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

interface TodoFooterProps {
  stats: {
    total: number;
    active: number;
    completed: number;
  };
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

const TodoFooter = ({ stats, filter, onFilterChange, onClearCompleted }: TodoFooterProps) => {
  if (stats.total === 0) return null;

  const { theme } = useTheme();
  const filterButtons: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const getCardClass = () => {
    switch (theme) {
      case 'candy-mode':
        return 'candy-card candy-sprinkles';
      case 'retro-mode':
        return 'retro-card retro-scanlines';
      case 'fun-mode':
        return 'card-professional';
      default:
        return 'card-professional';
    }
  };

  const getButtonClass = (isActive: boolean) => {
    switch (theme) {
      case 'candy-mode':
        return isActive
          ? 'bg-gradient-to-r from-pink-400 to-blue-400 text-white shadow-sm hover:from-pink-500 hover:to-blue-500'
          : 'hover:bg-gradient-to-r hover:from-pink-100 hover:to-blue-100 hover:text-pink-700';
      case 'retro-mode':
        return isActive
          ? 'bg-green-400 text-black shadow-sm hover:bg-green-500'
          : 'hover:bg-green-400/20 hover:text-green-400';
      default:
        return isActive
          ? 'bg-white text-purple-600 shadow-sm hover:bg-white hover:text-purple-700'
          : 'hover:bg-white/50 hover:text-purple-600';
    }
  };

  const getProgressBarClass = () => {
    switch (theme) {
      case 'candy-mode':
        return 'bg-gradient-to-r from-pink-400 to-blue-400';
      case 'retro-mode':
        return 'bg-green-400';
      default:
        return 'bg-gradient-to-r from-purple-500 to-blue-500';
    }
  };

  return (
    <motion.div 
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className={`${getCardClass()} p-6`}>
        {/* Progress bar */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Progress</span>
            <span className="text-sm font-semibold text-purple-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden progress-sparkle">
            <motion.div 
              className={`${getProgressBarClass()} h-2 rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Stats */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <BarChart3 className="h-4 w-4 text-purple-500" />
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-purple-600">{stats.active}</span> item{stats.active !== 1 ? 's' : ''} left
              {stats.completed > 0 && (
                <span className="ml-2">
                  • <span className="font-semibold text-green-600">{stats.completed}</span> completed
                </span>
              )}
            </div>
          </motion.div>
          
          {/* Filter buttons */}
          <motion.div 
            className={`flex gap-1 p-1 rounded-lg ${
              theme === 'candy-mode' 
                ? 'bg-gradient-to-r from-pink-100 to-blue-100' 
                : theme === 'retro-mode'
                ? 'bg-green-400/20 border border-green-400'
                : 'bg-gray-100'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {filterButtons.map(({ key, label }, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={filter === key ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onFilterChange(key)}
                  className={`transition-all duration-200 ${getButtonClass(filter === key)}`}
                >
                  {label}
                </Button>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Clear completed button */}
          <AnimatePresence>
            {stats.completed > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearCompleted}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear completed
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default TodoFooter;
