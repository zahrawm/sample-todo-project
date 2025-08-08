
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  dueDate?: Date;
}

export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'date' | 'priority' | 'alphabetical';