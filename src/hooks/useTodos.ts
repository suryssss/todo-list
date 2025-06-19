import { useState, useEffect } from 'react';
import { Todo, FilterType } from '../types/todo';
import { loadTasks, saveTasks } from '../utils/gamification';

const STORAGE_KEY = 'todoflow-tasks';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    const savedTodos = loadTasks();
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    saveTasks(todos);
  }, [todos]);

  const addTodo = (title: string, emoji?: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      emoji,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newTitle: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, title: newTitle, updatedAt: new Date() }
          : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const stats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
  };

  return {
    todos: filteredTodos,
    filter,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    setFilter,
  };
};
