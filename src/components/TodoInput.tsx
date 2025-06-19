import React, { useState } from 'react';
import { Plus, Sparkles, Smile } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from 'next-themes';
import { suggestEmojiForTask } from '../utils/gamification';

interface TodoInputProps {
  onAdd: (title: string, emoji?: string) => void;
  onUnicornTrigger?: () => void;
}

const TodoInput = ({ onAdd, onUnicornTrigger }: TodoInputProps) => {
  const [title, setTitle] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestedEmoji, setSuggestedEmoji] = useState('');
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      if (title.toLowerCase().includes('unicorn')) {
        onUnicornTrigger?.();
      }
      
      onAdd(title, suggestedEmoji);
      setTitle('');
      setSuggestedEmoji('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);

    if (value.toLowerCase().includes('unicorn')) {
      onUnicornTrigger?.();
    }

    if (value.trim()) {
      const emoji = suggestEmojiForTask(value);
      setSuggestedEmoji(emoji);
    } else {
      setSuggestedEmoji('');
    }
  };

  const getInputClass = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-700 text-black border-gray-600 focus:border-gray-500 focus:ring-gray-500';
      case 'candy-mode':
        return 'candy-input';
      case 'retro-mode':
        return 'retro-input';
      default:
        return 'input-professional';
    }
  };

  const getButtonClass = () => {
    switch (theme) {
      case 'dark':
        return 'bg-white text-black hover:bg-gray-100 border border-gray-300';
      case 'candy-mode':
        return 'candy-btn-primary';
      case 'retro-mode':
        return 'retro-btn-primary';
      default:
        return 'btn-primary';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="animate-slide-in" 
      style={{ animationDelay: '0.1s' }}
    >
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative">
          <Input
            type="text"
            placeholder="What needs to be done? ✨"
            value={title}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`${getInputClass()} h-14 text-lg pr-12 transition-all duration-300 hover:shadow-md focus:shadow-lg`}
          />

          <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
            isFocused 
              ? theme === 'candy-mode'
                ? 'bg-gradient-to-r from-pink-400 to-blue-400 p-[2px] rounded-2xl'
                : theme === 'retro-mode'
                ? 'bg-green-400 p-[2px]'
                : theme === 'dark'
                ? 'bg-gray-500 p-[2px]'
                : 'bg-gradient-to-r from-purple-500 to-blue-500 p-[2px]'
              : 'bg-transparent'
          }`}>
            <div className={`rounded-lg h-full w-full ${
              theme === 'candy-mode' ? 'bg-pink-50' : 
              theme === 'retro-mode' ? 'bg-black' : 
              theme === 'dark' ? 'bg-gray-700' :
              'bg-white'
            }`}></div>
          </div>

          <div className="relative z-10 flex items-center">
            <input
              type="text"
              placeholder="What needs to be done? ✨"
              value={title}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`flex-1 h-14 px-4 text-lg bg-transparent border-none outline-none placeholder:text-gray-400 ${
                theme === 'retro-mode' ? 'text-green-400' : 
                theme === 'dark' ? 'text-black placeholder:text-gray-500' : ''
              }`}
            />

            {suggestedEmoji && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mr-2 text-xl cursor-pointer hover:scale-110 transition-transform"
                title="Suggested emoji"
              >
                {suggestedEmoji}
              </motion.div>
            )}
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="submit"
                size="lg"
                disabled={!title.trim()}
                className={`${getButtonClass()} h-12 px-6 mr-1 relative overflow-hidden group/btn`}
              >
                <Plus className="h-5 w-5 mr-2 transition-transform group-hover/btn:rotate-90" />
                Add

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
              </Button>
            </motion.div>
          </div>
        </div>

        {isFocused && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="h-4 w-4 text-purple-500 animate-bounce" />
          </motion.div>
        )}

        {title.toLowerCase().includes('unicorn') && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-8 left-0 text-xs text-purple-600 font-medium"
          >
            🦄 You found the unicorn! ✨
          </motion.div>
        )}

        {suggestedEmoji && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-8 right-0 text-xs text-gray-500 font-medium flex items-center gap-1"
          >
            <Smile className="h-3 w-3" />
            Auto-suggested: {suggestedEmoji}
          </motion.div>
        )}
      </form>

      <p className="text-xs text-muted-foreground mt-2 ml-1 font-medium">
        Press Enter to add a task • Try typing "unicorn" for a surprise! 🦄
      </p>
    </motion.div>
  );
};

export default TodoInput;
