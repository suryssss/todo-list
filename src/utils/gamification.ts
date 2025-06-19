export interface UserProgress {
  xp: number;
  streak: number;
  lastCompletionDate: string | null;
  badges: string[];
  totalTasksCompleted: number;
  totalTasksAdded: number;
  longestStreak: number;
  weeklyXP: number;
  lastWeekReset: string;
}

export const XP_REWARDS = {
  TASK_ADDED: 10,
  TASK_COMPLETED: 20,
} as const;

export const BADGE_THRESHOLDS = {
  BRONZE: 100,
  SILVER: 250,
  GOLD: 500,
  PLATINUM: 1000,
  DIAMOND: 2000,
} as const;

export const BADGE_NAMES = {
  BRONZE: '🥉 Bronze',
  SILVER: '🥈 Silver',
  GOLD: '🥇 Gold',
  PLATINUM: '💎 Platinum',
  DIAMOND: '💠 Diamond',
} as const;

// Level Titles
export const LEVEL_TITLES = {
  NEWBIE: '🌱 Newbie',
  RISING_STAR: '⭐ Rising Star',
  TASK_NINJA: '🥷 Task Ninja',
  PRODUCTIVITY_MASTER: '👑 Productivity Master',
  LEGEND: '🏆 Legend',
  MYTHIC: '🌟 Mythic Hero',
} as const;

export const LEVEL_THRESHOLDS = {
  NEWBIE: 0,
  RISING_STAR: 100,
  TASK_NINJA: 300,
  PRODUCTIVITY_MASTER: 600,
  LEGEND: 1000,
  MYTHIC: 2000,
} as const;

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  FUN_MODE: 'fun-mode',
  CANDY_MODE: 'candy-mode',
  RETRO_MODE: 'retro-mode',
} as const;

export const THEME_CONFIGS = {
  [THEMES.LIGHT]: {
    name: '☀️ Light',
    icon: '☀️',
    description: 'Clean and professional',
  },
  [THEMES.DARK]: {
    name: '🌙 Dark',
    icon: '🌙',
    description: 'Elegant dark theme',
  },
  [THEMES.FUN_MODE]: {
    name: '🌈 Fun Mode',
    icon: '🌈',
    description: 'Rainbow gradients and emojis',
  },
  [THEMES.CANDY_MODE]: {
    name: '🧁 Candy Mode',
    icon: '🧁',
    description: 'Pink and blue frosting theme',
  },
  [THEMES.RETRO_MODE]: {
    name: '🕶️ Retro Mode',
    icon: '🕶️',
    description: 'Pixel font and neon buttons',
  },
} as const;

export const EMOJI_SUGGESTIONS: Record<string, string> = {
  // Shopping
  'buy': '🛒', 'milk': '🥛', 'bread': '🍞', 'food': '🍕', 'grocery': '🛍️',
  // Work
  'work': '💼', 'meeting': '📅', 'email': '📧', 'call': '📞', 'project': '📋', 'report': '📊',
  // Study
  'study': '📚', 'read': '📖', 'learn': '🎓', 'react': '⚛️', 'code': '💻', 'practice': '✏️',
  // Health
  'workout': '💪', 'exercise': '🏃', 'gym': '🏋️', 'run': '🏃‍♂️', 'yoga': '🧘', 'meditation': '🧘‍♀️',
  // Home
  'clean': '🧹', 'laundry': '👕', 'cook': '👨‍🍳', 'wash': '🧼', 'organize': '🗂️', 'repair': '🔧',
  // Personal
  'visit': '🏠', 'birthday': '🎂', 'party': '🎉', 'date': '💕', 'travel': '✈️',
  // Default categories
  'task': '📝', 'todo': '✅', 'important': '⚠️', 'urgent': '🚨', 'idea': '💡', 'note': '📝',
};

export const MOTIVATIONAL_MESSAGES = [
  "Great job! 🎉",
  "You're on fire! 🔥",
  "Another one down! 💪",
  "Amazing progress! ⭐",
  "Keep it up! 🚀",
  "You're crushing it! 💯",
  "Fantastic work! 🌟",
  "Incredible! 🎯",
  "You're unstoppable! ⚡",
  "Brilliant! ✨",
  "Outstanding! 🏆",
  "You're a star! ⭐",
  "Excellent! 🎊",
  "Superb! 🌈",
  "Magnificent! 🎨",
  "Spectacular! 🎭",
  "Wonderful! 🌸",
  "Terrific! 🎪",
  "Fabulous! 🦄",
  "Phenomenal! 🌟",
];

const STORAGE_KEYS = {
  USER_PROGRESS: 'todoflow_user_progress',
  THEME: 'todoflow_theme',
  TASKS: 'todoflow_tasks',
} as const;

export const initializeUserProgress = (): UserProgress => ({
  xp: 0,
  streak: 0,
  lastCompletionDate: null,
  badges: [],
  totalTasksCompleted: 0,
  totalTasksAdded: 0,
  longestStreak: 0,
  weeklyXP: 0,
  lastWeekReset: new Date().toDateString(),
});

export const loadUserProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    const progress = stored ? JSON.parse(stored) : initializeUserProgress();
    
    // Reset weekly XP if it's a new week
    const today = new Date().toDateString();
    const lastReset = new Date(progress.lastWeekReset || today);
    const daysSinceReset = Math.floor((new Date(today).getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceReset >= 7) {
      progress.weeklyXP = 0;
      progress.lastWeekReset = today;
    }
    
    return progress;
  } catch {
    return initializeUserProgress();
  }
};

export const saveUserProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save user progress:', error);
  }
};

// Add XP and check for new badges
export const addXP = (amount: number, currentProgress: UserProgress): UserProgress => {
  const newXP = currentProgress.xp + amount;
  const newWeeklyXP = currentProgress.weeklyXP + amount;
  const newBadges = [...currentProgress.badges];
  

  if (newXP >= BADGE_THRESHOLDS.DIAMOND && !newBadges.includes(BADGE_NAMES.DIAMOND)) {
    newBadges.push(BADGE_NAMES.DIAMOND);
  } else if (newXP >= BADGE_THRESHOLDS.PLATINUM && !newBadges.includes(BADGE_NAMES.PLATINUM)) {
    newBadges.push(BADGE_NAMES.PLATINUM);
  } else if (newXP >= BADGE_THRESHOLDS.GOLD && !newBadges.includes(BADGE_NAMES.GOLD)) {
    newBadges.push(BADGE_NAMES.GOLD);
  } else if (newXP >= BADGE_THRESHOLDS.SILVER && !newBadges.includes(BADGE_NAMES.SILVER)) {
    newBadges.push(BADGE_NAMES.SILVER);
  } else if (newXP >= BADGE_THRESHOLDS.BRONZE && !newBadges.includes(BADGE_NAMES.BRONZE)) {
    newBadges.push(BADGE_NAMES.BRONZE);
  }

  return {
    ...currentProgress,
    xp: newXP,
    weeklyXP: newWeeklyXP,
    badges: newBadges,
  };
};

export const updateStreak = (currentProgress: UserProgress): UserProgress => {
  const today = new Date().toDateString();
  const lastDate = currentProgress.lastCompletionDate;
  
  if (!lastDate) {
  
    return {
      ...currentProgress,
      streak: 1,
      longestStreak: Math.max(currentProgress.longestStreak, 1),
      lastCompletionDate: today,
    };
  }

  const lastCompletionDate = new Date(lastDate);
  const todayDate = new Date(today);
  const daysDifference = Math.floor((todayDate.getTime() - lastCompletionDate.getTime()) / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
  
    return currentProgress;
  } else if (daysDifference === 1) {

    const newStreak = currentProgress.streak + 1;
    return {
      ...currentProgress,
      streak: newStreak,
      longestStreak: Math.max(currentProgress.longestStreak, newStreak),
      lastCompletionDate: today,
    };
  } else {

    return {
      ...currentProgress,
      streak: 1,
      lastCompletionDate: today,
    };
  }
};


export const getRandomMotivationalMessage = (): string => {
  const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
  return MOTIVATIONAL_MESSAGES[randomIndex];
};


export const getCurrentBadge = (xp: number): string => {
  if (xp >= BADGE_THRESHOLDS.DIAMOND) return BADGE_NAMES.DIAMOND;
  if (xp >= BADGE_THRESHOLDS.PLATINUM) return BADGE_NAMES.PLATINUM;
  if (xp >= BADGE_THRESHOLDS.GOLD) return BADGE_NAMES.GOLD;
  if (xp >= BADGE_THRESHOLDS.SILVER) return BADGE_NAMES.SILVER;
  if (xp >= BADGE_THRESHOLDS.BRONZE) return BADGE_NAMES.BRONZE;
  return '🌱 Beginner';
};


export const getCurrentLevel = (xp: number): string => {
  if (xp >= LEVEL_THRESHOLDS.MYTHIC) return LEVEL_TITLES.MYTHIC;
  if (xp >= LEVEL_THRESHOLDS.LEGEND) return LEVEL_TITLES.LEGEND;
  if (xp >= LEVEL_THRESHOLDS.PRODUCTIVITY_MASTER) return LEVEL_TITLES.PRODUCTIVITY_MASTER;
  if (xp >= LEVEL_THRESHOLDS.TASK_NINJA) return LEVEL_TITLES.TASK_NINJA;
  if (xp >= LEVEL_THRESHOLDS.RISING_STAR) return LEVEL_TITLES.RISING_STAR;
  return LEVEL_TITLES.NEWBIE;
};


export const getProgressToNextBadge = (xp: number): { current: number; target: number; percentage: number } => {
  if (xp >= BADGE_THRESHOLDS.DIAMOND) {
    return { current: xp, target: BADGE_THRESHOLDS.DIAMOND, percentage: 100 };
  }
  
  const thresholds = Object.values(BADGE_THRESHOLDS).sort((a, b) => a - b);
  const nextThreshold = thresholds.find(threshold => xp < threshold) || BADGE_THRESHOLDS.DIAMOND;
  const currentThreshold = thresholds.find(threshold => xp >= threshold) || 0;
  
  const progress = xp - currentThreshold;
  const target = nextThreshold - currentThreshold;
  const percentage = Math.min((progress / target) * 100, 100);
  
  return { current: progress, target, percentage };
};

// Get progress to next level
export const getProgressToNextLevel = (xp: number): { current: number; target: number; percentage: number; nextLevel: string } => {
  const thresholds = Object.values(LEVEL_THRESHOLDS).sort((a, b) => a - b);
  const nextThreshold = thresholds.find(threshold => xp < threshold) || LEVEL_THRESHOLDS.MYTHIC;
  const currentThreshold = thresholds.find(threshold => xp >= threshold) || 0;
  
  const progress = xp - currentThreshold;
  const target = nextThreshold - currentThreshold;
  const percentage = Math.min((progress / target) * 100, 100);
  
  let nextLevel: string = LEVEL_TITLES.NEWBIE;
  if (nextThreshold === LEVEL_THRESHOLDS.RISING_STAR) nextLevel = LEVEL_TITLES.RISING_STAR;
  else if (nextThreshold === LEVEL_THRESHOLDS.TASK_NINJA) nextLevel = LEVEL_TITLES.TASK_NINJA;
  else if (nextThreshold === LEVEL_THRESHOLDS.PRODUCTIVITY_MASTER) nextLevel = LEVEL_TITLES.PRODUCTIVITY_MASTER;
  else if (nextThreshold === LEVEL_THRESHOLDS.LEGEND) nextLevel = LEVEL_TITLES.LEGEND;
  else if (nextThreshold === LEVEL_THRESHOLDS.MYTHIC) nextLevel = LEVEL_TITLES.MYTHIC;
  
  return { current: progress, target, percentage, nextLevel };
};


export const suggestEmojiForTask = (taskText: string): string => {
  const words = taskText.toLowerCase().split(' ');
  
  for (const word of words) {
    if (EMOJI_SUGGESTIONS[word]) {
      return EMOJI_SUGGESTIONS[word];
    }
  }

  if (taskText.length < 10) return '📝';
  if (taskText.includes('buy') || taskText.includes('shop')) return '🛒';
  if (taskText.includes('work') || taskText.includes('meeting')) return '💼';
  if (taskText.includes('study') || taskText.includes('learn')) return '📚';
  if (taskText.includes('workout') || taskText.includes('exercise')) return '💪';
  if (taskText.includes('clean') || taskText.includes('wash')) return '🧹';
  
  return '📝';
};

export const getStoredTheme = (): string => {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || THEMES.LIGHT;
  } catch {
    return THEMES.LIGHT;
  }
};

export const saveTheme = (theme: string): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error('Failed to save theme:', error);
  }
};

export const saveTasks = (tasks: any[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
};

export const loadTasks = (): any[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}; 