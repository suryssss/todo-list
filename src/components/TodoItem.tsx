import React, { useState } from 'react';
import { Trash2, Edit, CheckCircle2, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Card } from '@/components/ui/card';
import { Todo } from '../types/todo';
import { useTheme } from 'next-themes';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const { theme } = useTheme();

  const handleEdit = () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      onEdit(todo.id, editTitle);
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

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

  const getInputClass = () => {
    switch (theme) {
      case 'candy-mode':
        return 'candy-input';
      case 'retro-mode':
        return 'retro-input';
      default:
        return 'input-professional';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.3 
      }}
      whileHover={{ scale: 1.02 }}
      className="mb-3"
    >
      <Card className={`${getCardClass()} p-4 group hover-lift border-l-4 border-l-purple-500/20 hover:border-l-purple-500 transition-all duration-300`}>
        <div className="flex items-center gap-4">
          {/* Custom checkbox with animation */}
          <motion.button
            onClick={handleToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative flex-shrink-0 transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              {todo.completed ? (
                <motion.div
                  key="completed"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="incomplete"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Circle className="h-6 w-6 text-gray-400 hover:text-purple-500 transition-colors duration-200" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          
          {/* Emoji display */}
          {todo.emoji && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="text-2xl flex-shrink-0"
            >
              {todo.emoji}
            </motion.div>
          )}
          
          {/* Todo content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="editing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={handleEdit}
                    onKeyDown={handleKeyPress}
                    className={`${getInputClass()} h-10 text-base`}
                    autoFocus
                  />
                </motion.div>
              ) : (
                <motion.span
                  key="display"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`block text-base font-medium transition-all duration-300 ${
                    todo.completed
                      ? 'line-through text-muted-foreground opacity-60'
                      : 'text-foreground'
                  }`}
                >
                  {todo.title}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          
          {/* Action buttons */}
          <motion.div 
            className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0, x: 20 }}
            whileHover={{ opacity: 1, x: 0 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-9 w-9 p-0 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
                disabled={todo.completed}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="h-9 w-9 p-0 hover:bg-red-100 hover:text-red-700 transition-all duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Completion indicator */}
        <AnimatePresence>
          {todo.completed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 flex items-center gap-2 overflow-hidden"
            >
              <motion.div 
                className="w-2 h-2 bg-green-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              />
              <motion.span 
                className="text-xs text-green-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Completed
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default TodoItem;
