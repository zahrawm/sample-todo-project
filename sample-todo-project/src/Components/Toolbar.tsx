
import { Search, ChevronDown, Plus } from "lucide-react";
import type { FilterType, SortType } from "../types";
 export const Toolbar: React.FC<{
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  sort: SortType;
  onSortChange: (sort: SortType) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onAddTask: () => void;
}> = ({ filter, onFilterChange, sort, onSortChange, searchTerm, onSearchChange, onAddTask }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
        </div>
        
        <div className="flex gap-2">
          <div className="flex bg-gray-700 rounded-lg p-1">
            {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => onFilterChange(f)}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortType)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm appearance-none pr-8"
            >
              <option value="date">Date</option>
              <option value="priority">Priority</option>
              <option value="alphabetical">A-Z</option>
            </select>
            <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          
          <button
            onClick={onAddTask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
