export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  emoji?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type FilterType = 'all' | 'active' | 'completed';
