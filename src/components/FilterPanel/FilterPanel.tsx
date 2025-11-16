"use client";

import { useState } from 'react';

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  eventTypes: string[];
  className?: string;
}

export interface FilterState {
  startDate: string;
  endDate: string;
  selectedTypes: string[];
  searchQuery: string;
}

export function FilterPanel({
  onFilterChange,
  eventTypes,
  className = '',
}: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    startDate: '',
    endDate: '',
    selectedTypes: [],
    searchQuery: '',
  });

  const updateFilters = (updates: Partial<FilterState>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleEventType = (type: string) => {
    const newTypes = filters.selectedTypes.includes(type)
      ? filters.selectedTypes.filter(t => t !== type)
      : [...filters.selectedTypes, type];
    updateFilters({ selectedTypes: newTypes });
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      startDate: '',
      endDate: '',
      selectedTypes: [],
      searchQuery: '',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters =
    filters.startDate ||
    filters.endDate ||
    filters.selectedTypes.length > 0 ||
    filters.searchQuery;

  return (
    <div className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-apple-lg p-4 border border-gray-100/50 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium active:scale-95 transition-all duration-200"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Search Events
        </label>
        <input
          type="text"
          placeholder="Search by label or description..."
          value={filters.searchQuery}
          onChange={(e) => updateFilters({ searchQuery: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300/50 rounded-xl bg-gray-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-sm shadow-apple"
        />
      </div>

      {/* Date Range */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Date Range
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-600 mb-2">From</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => updateFilters({ startDate: e.target.value })}
              className="w-full px-3 py-2.5 text-sm border border-gray-300/50 rounded-xl bg-gray-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-apple"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-2">To</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => updateFilters({ endDate: e.target.value })}
              className="w-full px-3 py-2.5 text-sm border border-gray-300/50 rounded-xl bg-gray-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-apple"
            />
          </div>
        </div>
      </div>

      {/* Event Types */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Event Types
        </label>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {eventTypes.map((type) => (
            <label
              key={type}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50/80 active:bg-gray-100/80 cursor-pointer transition-all duration-150 group"
            >
              <input
                type="checkbox"
                checked={filters.selectedTypes.includes(type)}
                onChange={() => toggleEventType(type)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded-md focus:ring-blue-500 focus:ring-offset-0"
              />
              <span className="text-sm text-gray-700 capitalize group-hover:text-gray-900 transition-colors">
                {type.replace(/_/g, ' ')}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200/50">
          <p className="text-xs font-medium text-gray-600 mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {filters.searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 text-xs rounded-full shadow-sm hover:shadow-md transition-shadow">
                Search: "{filters.searchQuery}"
              </span>
            )}
            {filters.startDate && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 text-xs rounded-full shadow-sm hover:shadow-md transition-shadow">
                From: {filters.startDate}
              </span>
            )}
            {filters.endDate && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 text-xs rounded-full shadow-sm hover:shadow-md transition-shadow">
                To: {filters.endDate}
              </span>
            )}
            {filters.selectedTypes.length > 0 && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 text-xs rounded-full shadow-sm hover:shadow-md transition-shadow">
                {filters.selectedTypes.length} type{filters.selectedTypes.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
