
import { Zap } from "lucide-react";
import type { Task, FilterType } from "../types";
import { TaskItem } from "./TaskItem";

 export const TaskList: React.FC<{
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  searchTerm: string;
  filter: FilterType;
}> = ({ tasks, onToggle, onEdit, onDelete, searchTerm, filter }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
          <Zap size={24} className="text-gray-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-300 mb-2">
          {searchTerm ? 'No matching tasks' : 
           filter === 'all' ? 'No tasks yet' : 
           filter === 'active' ? 'No active tasks' : 'No completed tasks'}
        </h3>
        <p className="text-gray-500 text-sm">
          {searchTerm ? 'Try different search terms' :
           filter === 'all' ? 'Click "Add" to create your first task' : 
           'Switch filters to see other tasks'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
