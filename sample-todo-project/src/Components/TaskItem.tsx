


import { AlertCircle, Calendar, Check, Edit, Trash2 } from "lucide-react";
import type { Task } from "../types";

 
 export const TaskItem: React.FC<{
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}> = ({ task, onToggle, onEdit, onDelete }) => {
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-red-400 bg-red-900/10';
      case 'medium': return 'border-l-4 border-yellow-400 bg-yellow-900/10';
      case 'low': return 'border-l-4 border-green-400 bg-green-900/10';
      default: return 'border-l-4 border-gray-400 bg-gray-900/10';
    }
  };

  const isOverdue = task.dueDate && new Date() > task.dueDate && !task.completed;

  return (
    <div className={`bg-gray-800 rounded-lg p-4 ${getPriorityStyle(task.priority)} hover:bg-gray-750 transition-colors group`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            task.completed 
              ? 'bg-emerald-500 border-emerald-500 text-white' 
              : 'border-gray-600 hover:border-emerald-400 hover:bg-emerald-400/10'
          }`}
        >
          {task.completed && <Check size={12} strokeWidth={3} />}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`font-medium text-white mb-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`text-sm mb-2 leading-relaxed ${task.completed ? 'text-gray-600' : 'text-gray-300'}`}>
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center gap-4 text-xs">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  task.priority === 'high' ? 'bg-red-900/30 text-red-400' :
                  task.priority === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                  'bg-green-900/30 text-green-400'
                }`}>
                  {task.priority.toUpperCase()}
                </span>
                
                {task.dueDate && (
                  <div className={`flex items-center gap-1 ${
                    isOverdue ? 'text-red-400' : 'text-gray-500'
                  }`}>
                    <Calendar size={12} />
                    <span>{task.dueDate.toLocaleDateString()}</span>
                    {isOverdue && <AlertCircle size={12} />}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
              >
                <Edit size={14} />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
