import { create } from 'zustand';

interface FilterStore {
  // Time range
  startDate: string | null;
  endDate: string | null;

  // Event types
  eventTypes: string[];

  // Search
  searchQuery: string;

  // Pagination
  offset: number;
  limit: number;

  // Actions
  setDateRange: (start: string | null, end: string | null) => void;
  setEventTypes: (types: string[]) => void;
  setSearchQuery: (query: string) => void;
  setPage: (offset: number, limit: number) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  // Initial state
  startDate: null,
  endDate: null,
  eventTypes: [],
  searchQuery: '',
  offset: 0,
  limit: 100,

  // Actions
  setDateRange: (start, end) => set({ startDate: start, endDate: end, offset: 0 }),
  setEventTypes: (types) => set({ eventTypes: types, offset: 0 }),
  setSearchQuery: (query) => set({ searchQuery: query, offset: 0 }),
  setPage: (offset, limit) => set({ offset, limit }),

  reset: () =>
    set({
      startDate: null,
      endDate: null,
      eventTypes: [],
      searchQuery: '',
      offset: 0,
      limit: 100,
    }),
}));
