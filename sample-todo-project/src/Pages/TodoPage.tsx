import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Check, X, Calendar, Search, ChevronDown, Zap, Target, AlertCircle } from 'lucide-react';
import type { FilterType, SortType, Task } from '../types';
import { Header } from '../Components/Header';
import { TaskForm } from '../Components/TaskForm';
import { TaskList } from '../Components/TaskList';
import { Toolbar } from '../Components/Toolbar';

 export const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('date');
  const [searchTerm, setSearchTerm] = useState('');

 
  useEffect(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        const tasksWithDates = parsed.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        }));
        setTasks(tasksWithDates);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
    setShowForm(false);
  };

  const updateTask = (taskData: Omit<Task, 'id' | 'createdAt'> & { id: string }) => {
    setTasks(tasks.map(task => 
      task.id === taskData.id 
        ? { ...taskData, id: taskData.id, createdAt: task.createdAt }
        : task
    ));
    setEditingTask(undefined);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleSave = (taskData: Omit<Task, 'id' | 'createdAt'> & { id?: string }) => {
    if (taskData.id) {
      updateTask({ ...taskData, id: taskData.id });
    } else {
      addTask(taskData);
    }
  };

  const filteredTasks = tasks
    .filter(task => {
      const matchesFilter = 
        filter === 'all' ? true :
        filter === 'active' ? !task.completed :
        task.completed;
      
      const matchesSearch = 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch (sort) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'date':
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

  const taskCounts = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header taskCounts={taskCounts} />
        
        <Toolbar
          filter={filter}
          onFilterChange={setFilter}
          sort={sort}
          onSortChange={setSort}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddTask={() => setShowForm(true)}
        />

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onEdit={setEditingTask}
          onDelete={deleteTask}
          searchTerm={searchTerm}
          filter={filter}
        />

        
        {(showForm || editingTask) && (
          <TaskForm
            task={editingTask}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingTask(undefined);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TodoApp;