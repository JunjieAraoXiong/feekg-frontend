import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LayoutMode = 'cose' | 'circle' | 'grid' | 'breadthfirst';

interface UIStore {
  // Sidebar
  sidebarOpen: boolean;
  detailPanelOpen: boolean;

  // Theme
  theme: 'light' | 'dark';

  // Layout
  layoutMode: LayoutMode;

  // Actions
  toggleSidebar: () => void;
  toggleDetailPanel: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLayoutMode: (mode: LayoutMode) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      // Initial state
      sidebarOpen: true,
      detailPanelOpen: false,
      theme: 'light',
      layoutMode: 'cose',

      // Actions
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      toggleDetailPanel: () => set((state) => ({ detailPanelOpen: !state.detailPanelOpen })),
      setTheme: (theme) => set({ theme }),
      setLayoutMode: (mode) => set({ layoutMode: mode }),
    }),
    { name: 'ui-store' }
  )
);
