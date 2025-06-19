import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import TodoFooter from '../components/TodoFooter';
import Footer from '../components/Footer';
import MotivationalMessage from '../components/MotivationalMessage';
import ConfettiCelebration from '../components/ConfettiCelebration';
import UnicornEasterEgg from '../components/UnicornEasterEgg';
import { useTodos } from '../hooks/useTodos';
import { 
  UserProgress, 
  loadUserProgress, 
  saveUserProgress, 
  addXP, 
  updateStreak, 
  XP_REWARDS 
} from '../utils/gamification';
import { useTheme } from 'next-themes';

const Index = () => {
  const {
    todos,
    filter,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    setFilter,
  } = useTodos();

  // Gamification state
  const [userProgress, setUserProgress] = useState<UserProgress>(loadUserProgress());
  const [showMotivationalMessage, setShowMotivationalMessage] = useState(false);
  const [motivationalType, setMotivationalType] = useState<'success' | 'add' | 'complete'>('success');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showUnicorn, setShowUnicorn] = useState(false);
  const [hasShownConfetti, setHasShownConfetti] = useState(false);
  const { theme } = useTheme();

  // Load user progress on mount
  useEffect(() => {
    const savedProgress = loadUserProgress();
    setUserProgress(savedProgress);
  }, []);

  // Save user progress whenever it changes
  useEffect(() => {
    saveUserProgress(userProgress);
  }, [userProgress]);

  // Check for confetti celebration
  useEffect(() => {
    if (todos.length > 0 && todos.every(todo => todo.completed) && !hasShownConfetti) {
      setShowConfetti(true);
      setHasShownConfetti(true);
    } else if (todos.some(todo => !todo.completed)) {
      setHasShownConfetti(false);
    }
  }, [todos, hasShownConfetti]);

  const handleAddTodo = (title: string, emoji?: string) => {
    addTodo(title, emoji);
    
    // Add XP for adding a task
    setUserProgress(prev => ({
      ...prev,
      totalTasksAdded: prev.totalTasksAdded + 1,
      ...addXP(XP_REWARDS.TASK_ADDED, prev)
    }));

    // Show motivational message
    setMotivationalType('add');
    setShowMotivationalMessage(true);
  };

  const handleToggleTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    const wasCompleted = todo?.completed;
    
    toggleTodo(id);
    
    if (!wasCompleted) {
      // Task was completed
      setUserProgress(prev => ({
        ...prev,
        totalTasksCompleted: prev.totalTasksCompleted + 1,
        ...addXP(XP_REWARDS.TASK_COMPLETED, prev),
        ...updateStreak(prev)
      }));

      // Show motivational message
      setMotivationalType('complete');
      setShowMotivationalMessage(true);
    }
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  const handleEditTodo = (id: string, newTitle: string) => {
    editTodo(id, newTitle);
  };

  const handleUnicornTrigger = () => {
    setShowUnicorn(true);
  };

  const handleMotivationalHide = () => {
    setShowMotivationalMessage(false);
  };

  const handleConfettiComplete = () => {
    setShowConfetti(false);
  };

  const handleUnicornComplete = () => {
    setShowUnicorn(false);
  };

  const getBackgroundClass = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900';
      case 'candy-mode':
        return 'bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50';
      case 'retro-mode':
        return 'bg-black';
      case 'fun-mode':
        return 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100';
      default:
        return 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100';
    }
  };

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

  return (
    <div className={`min-h-screen ${getBackgroundClass()} relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {theme === 'fun-mode' && (
          <>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
          </>
        )}
        {theme === 'candy-mode' && (
          <>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-blue-400/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
          </>
        )}
        {theme === 'retro-mode' && (
          <>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
          </>
        )}
        {theme === 'dark' && (
          <>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
          </>
        )}
      </div>

      <div className="relative z-10 container max-w-4xl mx-auto px-4 py-8">
        <Header />
        
        <motion.div 
          className={`${getCardClass()} p-8 md:p-10`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-6">
            <TodoInput onAdd={handleAddTodo} onUnicornTrigger={handleUnicornTrigger} />
            <TodoList
              todos={todos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
            <TodoFooter
              stats={stats}
              filter={filter}
              onFilterChange={setFilter}
              onClearCompleted={clearCompleted}
            />
          </div>
        </motion.div>
        
        {/* Gamification Footer */}
        <Footer userProgress={userProgress} />
      </div>

      {/* Motivational Message */}
      <MotivationalMessage
        show={showMotivationalMessage}
        onHide={handleMotivationalHide}
        type={motivationalType}
      />

      {/* Confetti Celebration */}
      <ConfettiCelebration
        trigger={showConfetti}
        onComplete={handleConfettiComplete}
      />

      {/* Unicorn Easter Egg */}
      <UnicornEasterEgg
        trigger={showUnicorn}
        onComplete={handleUnicornComplete}
      />
    </div>
  );
};

export default Index;
