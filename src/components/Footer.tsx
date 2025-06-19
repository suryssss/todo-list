import React, { useState, useEffect } from 'react';
import { Trophy, Flame, Star, Zap, TrendingUp, Target, CheckCircle2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProgress, getCurrentBadge, getProgressToNextBadge, getCurrentLevel, getProgressToNextLevel } from '../utils/gamification';
import { useTheme } from 'next-themes';

interface FooterProps {
  userProgress: UserProgress;
}

const Footer = ({ userProgress }: FooterProps) => {
  const [displayXP, setDisplayXP] = useState(0);
  const [displayWeeklyXP, setDisplayWeeklyXP] = useState(0);
  const [displayStreak, setDisplayStreak] = useState(0);
  const [displayLongestStreak, setDisplayLongestStreak] = useState(0);
  const { theme } = useTheme();

  const currentBadge = getCurrentBadge(userProgress.xp);
  const currentLevel = getCurrentLevel(userProgress.xp);
  const progressToNext = getProgressToNextBadge(userProgress.xp);
  const progressToNextLevel = getProgressToNextLevel(userProgress.xp);

  // Animate counters
  useEffect(() => {
    const animateCounter = (target: number, setter: (value: number) => void) => {
      const start = 0;
      const duration = 1000;
      const startTime = Date.now();

      const updateCounter = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (target - start) * progress);
        setter(current);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      updateCounter();
    };

    animateCounter(userProgress.xp, setDisplayXP);
    animateCounter(userProgress.weeklyXP, setDisplayWeeklyXP);
    animateCounter(userProgress.streak, setDisplayStreak);
    animateCounter(userProgress.longestStreak, setDisplayLongestStreak);
  }, [userProgress.xp, userProgress.weeklyXP, userProgress.streak, userProgress.longestStreak]);

  const getCardClass = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-800/90 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300';
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

  return (
    <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className={`${getCardClass()} p-6`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* XP and Level Section */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 animate-pulse" />
              <h3 className={`text-lg font-bold ${getGradientClass()}`}>Experience Points</h3>
            </div>
            <motion.div 
              className="text-3xl font-bold text-purple-600 xp-counter"
              key={displayXP}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {displayXP} XP
            </motion.div>
            <div className="text-sm text-muted-foreground">
              Level: <span className="font-semibold">{currentLevel}</span>
            </div>
            
            {/* Progress to next level */}
            {progressToNextLevel.percentage < 100 && (
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  {progressToNextLevel.current} / {progressToNextLevel.target} XP to {progressToNextLevel.nextLevel}
                </div>
                <div className={`w-full rounded-full h-2 overflow-hidden progress-sparkle ${
                  theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                }`}>
                  <motion.div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressToNextLevel.percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Weekly XP Section */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500 animate-pulse" />
              <h3 className={`text-lg font-bold ${getGradientClass()}`}>This Week</h3>
            </div>
            <motion.div 
              className="text-3xl font-bold text-blue-600 xp-counter"
              key={displayWeeklyXP}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {displayWeeklyXP} XP
            </motion.div>
            <div className="text-sm text-muted-foreground">
              Weekly progress
            </div>
          </div>

          {/* Current Streak Section */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Flame className="h-5 w-5 text-orange-500 animate-streak-fire" />
              <h3 className={`text-lg font-bold ${getGradientClass()}`}>Current Streak</h3>
            </div>
            <motion.div 
              className="text-3xl font-bold text-orange-600 xp-counter"
              key={displayStreak}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {displayStreak}
            </motion.div>
            <div className="text-sm text-muted-foreground">
              {userProgress.streak === 0 ? 'Start your streak!' : 
               userProgress.streak === 1 ? 'First day!' :
               `${userProgress.streak} days strong! 🔥`}
            </div>
          </div>

          {/* Longest Streak Section */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Target className="h-5 w-5 text-green-500 animate-pulse" />
              <h3 className={`text-lg font-bold ${getGradientClass()}`}>Best Streak</h3>
            </div>
            <motion.div 
              className="text-3xl font-bold text-green-600 xp-counter"
              key={displayLongestStreak}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {displayLongestStreak}
            </motion.div>
            <div className="text-sm text-muted-foreground">
              {userProgress.longestStreak === 0 ? 'No streak yet' : 
               userProgress.longestStreak === 1 ? '1 day best' :
               `${userProgress.longestStreak} days best! 🏆`}
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className={`mt-6 pt-6 border-t ${
          theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-semibold text-muted-foreground">Achievements</span>
              </div>
              <div className="text-lg font-bold text-yellow-600">{userProgress.badges.length} badges</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm font-semibold text-muted-foreground">Completed</span>
              </div>
              <div className="text-lg font-bold text-green-600">{userProgress.totalTasksCompleted} tasks</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Plus className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-semibold text-muted-foreground">Added</span>
              </div>
              <div className="text-lg font-bold text-blue-600">{userProgress.totalTasksAdded} tasks</div>
            </div>
          </div>
        </div>

        {/* Badges Display */}
        {userProgress.badges.length > 0 && (
          <div className={`mt-6 pt-6 border-t ${
            theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
          }`}>
            <h4 className="text-center text-sm font-semibold text-muted-foreground mb-3">
              🏆 Earned Badges
            </h4>
            <div className="flex flex-wrap justify-center gap-2">
              {userProgress.badges.map((badge, index) => (
                <motion.div
                  key={badge}
                  className="xp-badge animate-bounce-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {badge}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Motivational Quote */}
        <div className="mt-6 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
            theme === 'candy-mode'
              ? 'bg-gradient-to-r from-pink-100 to-blue-100 text-pink-700'
              : theme === 'retro-mode'
              ? 'bg-black border border-green-400 text-green-400'
              : theme === 'dark'
              ? 'bg-gray-700 text-gray-200 border border-gray-600'
              : 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700'
          }`}>
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">
              {userProgress.xp > 500 ? "You're a productivity master! 🌟" :
               userProgress.xp > 200 ? "You're building amazing habits! 💪" :
               userProgress.xp > 50 ? "Great start! Keep going! 🚀" :
               "Every task completed is progress! ✨"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer; 