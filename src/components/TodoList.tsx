import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';
import { ClipboardList, Sparkles } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

const TodoList = ({ todos, onToggle, onDelete, onEdit }: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <motion.div 
        className="text-center py-16"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="relative mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ClipboardList className="h-16 w-16 text-gray-300 mx-auto animate-float" />
          <Sparkles className="h-6 w-6 text-purple-400 absolute -top-2 -right-2 animate-bounce" />
        </motion.div>
        <motion.h3 
          className="text-xl font-semibold text-muted-foreground mb-3 gradient-text"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          No tasks yet
        </motion.h3>
        <motion.p 
          className="text-muted-foreground mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Add a task above to get started!
        </motion.p>
        <motion.div 
          className="flex justify-center items-center gap-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div 
            className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.div 
            className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div 
            className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-3 max-h-96 overflow-y-auto pr-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="popLayout">
        {todos.map((todo, index) => (
          <motion.div
            key={todo.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              delay: index * 0.1 
            }}
          >
            <TodoItem
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TodoList;
