import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GraphStore {
  // Selection
  selectedNode: string | null;
  hoveredNode: string | null;

  // Viewport
  zoomLevel: number;
  panPosition: { x: number; y: number };

  // Expansion
  expandedNodes: Set<string>;

  // Actions
  setSelectedNode: (nodeId: string | null) => void;
  setHoveredNode: (nodeId: string | null) => void;
  setZoom: (level: number) => void;
  setPan: (position: { x: number; y: number }) => void;
  toggleNodeExpand: (nodeId: string) => void;
  reset: () => void;
}

export const useGraphStore = create<GraphStore>()(
  persist(
    (set) => ({
      // Initial state
      selectedNode: null,
      hoveredNode: null,
      zoomLevel: 1,
      panPosition: { x: 0, y: 0 },
      expandedNodes: new Set(),

      // Actions
      setSelectedNode: (nodeId) => set({ selectedNode: nodeId }),
      setHoveredNode: (nodeId) => set({ hoveredNode: nodeId }),
      setZoom: (level) => set({ zoomLevel: level }),
      setPan: (position) => set({ panPosition: position }),

      toggleNodeExpand: (nodeId) =>
        set((state) => {
          const newExpanded = new Set(state.expandedNodes);
          if (newExpanded.has(nodeId)) {
            newExpanded.delete(nodeId);
          } else {
            newExpanded.add(nodeId);
          }
          return { expandedNodes: newExpanded };
        }),

      reset: () =>
        set({
          selectedNode: null,
          hoveredNode: null,
          zoomLevel: 1,
          panPosition: { x: 0, y: 0 },
          expandedNodes: new Set(),
        }),
    }),
    {
      name: 'graph-store',
      partialize: (state) => ({
        // Only persist these fields
        zoomLevel: state.zoomLevel,
        expandedNodes: Array.from(state.expandedNodes),
      }),
    }
  )
);
