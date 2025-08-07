

import { Target } from "lucide-react";

 export const Header: React.FC<{
  taskCounts: { total: number; active: number; completed: number };
}> = ({ taskCounts }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Target size={20} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white">Tasks</h1>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-white">{taskCounts.total}</div>
          <div className="text-sm text-gray-400">Total</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-blue-400">{taskCounts.active}</div>
          <div className="text-sm text-gray-400">Active</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-emerald-400">{taskCounts.completed}</div>
          <div className="text-sm text-gray-400">Done</div>
        </div>
      </div>
    </div>
  );
};
