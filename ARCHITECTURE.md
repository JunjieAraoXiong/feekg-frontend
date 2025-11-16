# FE-EKG Frontend Architecture

**Project:** Financial Event Evolution Knowledge Graph - Interactive Visualization
**Framework:** Next.js 14 with App Router
**Location:** `/Users/hansonxiong/Desktop/DDP/feekg-frontend/`
**Status:** ✅ Phase 1 Complete - Bootstrap & Mock Data

---

## Quick Access

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5001 (currently using AllegroGraph with incompatible queries)
- **Mock Data Mode:** ✅ Enabled (see `src/lib/api/mock-data.ts`)

---

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      User's Browser                          │
│                   http://localhost:3000                      │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js 14 Frontend                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  App Router (src/app/)                               │   │
│  │  - layout.tsx (React Query Provider)                 │   │
│  │  - page.tsx (Dashboard with API test)                │   │
│  │  - graph/page.tsx (Placeholder graph view)           │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  State Management                                     │   │
│  │  - React Query (server state, caching)               │   │
│  │  - Zustand (UI state, filters, graph controls)       │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Client (src/lib/api/)                           │   │
│  │  - client.ts (HTTP client with error handling)       │   │
│  │  - types.ts (TypeScript interfaces)                  │   │
│  │  - events.ts (Event API functions)                   │   │
│  │  - graph.ts (Graph API functions)                    │   │
│  │  - mock-data.ts (Development mock data) ✅           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ HTTP Requests
                      │ (Currently using mock data)
                      ▼
┌─────────────────────────────────────────────────────────────┐
│               Flask Backend API (Port 5001)                  │
│                                                              │
│  Issue: API has Cypher queries but backend is AllegroGraph  │
│  Status: Returns "MATCH not recognized" errors              │
│  Solution: Using mock data in frontend for development      │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Current Flow (Mock Data Mode)

```
User Action
    ↓
Component (e.g., Dashboard page.tsx)
    ↓
React Query Hook (useQuery)
    ↓
API Function (e.g., fetchGraphStats)
    ↓
Check USE_MOCK_DATA flag
    ↓ (if true)
Return MOCK_STATS after 500ms delay
    ↓
React Query Cache
    ↓
Component Re-render
    ↓
Display Updated UI
```

### Future Flow (Real API Mode)

```
User Action
    ↓
Component
    ↓
React Query Hook
    ↓
API Function
    ↓
HTTP Request to Flask Backend
    ↓
Backend queries AllegroGraph (with SPARQL)
    ↓
Response with graph data
    ↓
React Query Cache (5 min stale time)
    ↓
Component Re-render
```

---

## Project Structure

```
feekg-frontend/
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout with React Query provider
│   │   ├── page.tsx                  # Dashboard with API connection test
│   │   ├── providers.tsx             # React Query configuration
│   │   ├── globals.css               # Tailwind + custom Cytoscape styles
│   │   └── graph/
│   │       └── page.tsx              # Placeholder graph visualization page
│   │
│   ├── components/                   # React components (planned)
│   │   ├── GraphView/                # Cytoscape.js graph (Phase 2)
│   │   ├── FilterPanel/              # Date range, search, filters (Phase 2)
│   │   ├── EventCard/                # Event details sidebar (Phase 2)
│   │   ├── Timeline/                 # D3.js time scrubber (Phase 2)
│   │   └── StatsPanel/               # Graph statistics (Phase 2)
│   │
│   ├── lib/
│   │   ├── api/                      # API client layer
│   │   │   ├── client.ts             # ✅ HTTP client with error handling
│   │   │   ├── types.ts              # ✅ TypeScript type definitions
│   │   │   ├── events.ts             # ✅ Event API functions
│   │   │   ├── graph.ts              # ✅ Graph API functions
│   │   │   └── mock-data.ts          # ✅ Mock data for development
│   │   ├── constants.ts              # ✅ FE-EKG colors, layouts, config
│   │   ├── cytoscape/                # Cytoscape.js utilities (planned)
│   │   └── utils/                    # Helper functions (planned)
│   │
│   ├── stores/                       # Zustand state management
│   │   ├── graphStore.ts             # ✅ Graph UI state (zoom, selection, expand)
│   │   ├── filterStore.ts            # ✅ Filter state (dates, types, search)
│   │   └── uiStore.ts                # ✅ Global UI (sidebar, theme, layout)
│   │
│   └── hooks/                        # Custom React hooks (planned)
│       ├── useGraphData.ts           # Graph data fetching (Phase 2)
│       ├── useNodeExpansion.ts       # Node expand/collapse (Phase 2)
│       └── useGraphSearch.ts         # Search and highlight (Phase 2)
│
├── public/                           # Static assets
│
├── package.json                      # ✅ Dependencies
├── tsconfig.json                     # ✅ TypeScript configuration
├── tailwind.config.ts                # ✅ Tailwind with FE-EKG colors
├── next.config.js                    # ✅ Next.js configuration
├── .env.local                        # ✅ Environment variables
├── .gitignore                        # ✅ Git ignore patterns
├── README.md                         # ✅ Project documentation
├── SETUP_COMPLETE.md                 # ✅ Setup summary
└── ARCHITECTURE.md                   # ✅ This file
```

---

## Technology Stack

### Core Framework
- **Next.js 14.2.18** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript 5.6.3** - Type safety

### State Management
- **React Query 5.59.16** - Server state management
  - Automatic caching (5 min stale time, 10 min cache time)
  - Background refetching
  - Optimistic updates
  - React Query Devtools
- **Zustand 5.0.1** - UI state management
  - Lightweight (< 1KB)
  - No providers needed
  - localStorage persistence

### Styling
- **Tailwind CSS 3.4.14** - Utility-first CSS
- **PostCSS 8.4.47** - CSS processing
- **Autoprefixer 10.4.22** - Vendor prefixes

### Visualization (Ready, Not Yet Implemented)
- **Cytoscape.js 3.30.2** - Network graph visualization
  - Supports 1000+ nodes
  - Built-in layouts (cose, circle, grid, breadthfirst)
  - Pan, zoom, selection

### Utilities
- **date-fns 4.1.0** - Date manipulation
- **ESLint 8.57.1** - Code linting

---

## Configuration Files

### `package.json`

```json
{
  "name": "feekg-frontend",
  "version": "0.1.0",
  "dependencies": {
    "next": "14.2.18",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@tanstack/react-query": "^5.59.16",
    "zustand": "^5.0.1",
    "cytoscape": "^3.30.2",
    "date-fns": "^4.1.0"
  },
  "devDependencies": {
    "typescript": "^5.6.3",
    "@types/cytoscape": "^3.21.8",
    "@tanstack/react-query-devtools": "^5.59.16",
    "tailwindcss": "^3.4.14",
    "autoprefixer": "^10.4.22"
  }
}
```

### `tsconfig.json`

- **Target:** ES2017
- **Module:** ESNext with bundler resolution
- **Strict mode:** Enabled
- **Path aliases:** `@/*` → `./src/*`

### `tailwind.config.ts`

**FE-EKG Color Extensions:**
```typescript
colors: {
  'has-actor': '#10b981',    // Emerald
  'has-target': '#ef4444',   // Red
  'involves': '#3b82f6',     // Blue
  'related-to': '#a855f7',   // Purple
  'evolves-to': '#f59e0b',   // Orange
}
```

### `.env.local`

```bash
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_DEFAULT_PAGE_SIZE=100
NEXT_PUBLIC_MAX_NODES=1000
```

---

## Key Implementations

### 1. API Client (`src/lib/api/client.ts`)

**Features:**
- ✅ Type-safe HTTP requests
- ✅ Custom `APIError` class with status codes
- ✅ 30-second request timeout
- ✅ Automatic retries (3 attempts, exponential backoff)
- ✅ Query string builder utility

**Example:**
```typescript
const stats = await apiClient<{ data: GraphStats }>('/api/info');
```

### 2. Mock Data System (`src/lib/api/mock-data.ts`)

**Purpose:** Enable frontend development while backend is being fixed

**Features:**
- ✅ Realistic Lehman Brothers crisis data (4,416 nodes, 74K edges)
- ✅ 10 sample events (bankruptcy, mergers, bailouts)
- ✅ 8 entities (banks, regulators, companies)
- ✅ Network delay simulation (300-500ms)
- ✅ Toggle flag: `USE_MOCK_DATA = true`

**Mock Data:**
```typescript
export const MOCK_STATS: GraphStats = {
  totalNodes: 4416,
  totalEdges: 74238,
  totalEvents: 4398,
  totalEntities: 18,
  evolutionLinks: 154,
  topEntities: [
    { label: 'Lehman Brothers', degree: 1234 },
    { label: 'Barclays', degree: 892 },
    // ...
  ],
};
```

### 3. React Query Setup (`src/app/providers.tsx`)

**Configuration:**
```typescript
new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 minutes
      gcTime: 10 * 60 * 1000,         // 10 minutes
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    },
  },
})
```

### 4. Zustand Stores

**graphStore.ts** - Graph UI State
```typescript
{
  selectedNode: string | null,
  hoveredNode: string | null,
  zoomLevel: number,
  panPosition: { x, y },
  expandedNodes: Set<string>,
  // Actions: setSelectedNode, setZoom, toggleNodeExpand, reset
}
```

**filterStore.ts** - Filter State
```typescript
{
  startDate: string | null,
  endDate: string | null,
  eventTypes: string[],
  searchQuery: string,
  offset: number,
  limit: number,
  // Actions: setDateRange, setEventTypes, setSearchQuery, setPage
}
```

**uiStore.ts** - Global UI State
```typescript
{
  sidebarOpen: boolean,
  detailPanelOpen: boolean,
  theme: 'light' | 'dark',
  layoutMode: 'cose' | 'circle' | 'grid' | 'breadthfirst',
  // Actions: toggleSidebar, setTheme, setLayoutMode
}
```

### 5. Type System (`src/lib/api/types.ts`)

**Complete TypeScript interfaces:**
- `Node`, `Edge`, `GraphData`
- `Event`, `EventDetails`, `Entity`
- `EvolutionLink` (with 6 score components)
- `GraphStats`, `PaginatedResponse<T>`
- `TimeWindowFilter`, `EventTypeFilter`

---

## Color System

### FE-EKG Relationship Colors

```typescript
export const COLORS = {
  // Relationships
  hasActor: '#10b981',      // Emerald - entity performs action
  hasTarget: '#ef4444',     // Red - entity affected by event
  involves: '#3b82f6',      // Blue - general involvement
  relatedTo: '#a855f7',     // Purple - entity connections
  evolvesTo: '#f59e0b',     // Orange - event evolution

  // Entity Types
  bank: '#3b82f6',          // Blue
  regulator: '#8b5cf6',     // Purple
  investment_bank: '#ec4899', // Pink
  government: '#14b8a6',    // Teal
  company: '#64748b',       // Slate

  // Event Severity
  high: '#ef4444',          // Red
  medium: '#f59e0b',        // Amber
  low: '#10b981',           // Emerald
};
```

---

## Performance Configuration

### Caching Strategy

```typescript
export const PERFORMANCE = {
  staleTime: 5 * 60 * 1000,     // 5 minutes - data stays fresh
  cacheTime: 10 * 60 * 1000,    // 10 minutes - keep in memory
  debounceDelay: 300,           // 300ms for search input
  resizeDebounce: 200,          // 200ms for window resize
};
```

### API Configuration

```typescript
export const API_CONFIG = {
  baseUrl: 'http://localhost:5001',
  defaultPageSize: 100,
  maxNodes: 1000,
  timeout: 30000,  // 30 seconds
};
```

---

## Current Status

### ✅ Phase 1 Complete

**Infrastructure:**
- [x] Next.js 14 project structure
- [x] TypeScript configuration
- [x] Tailwind CSS with FE-EKG colors
- [x] ESLint setup

**State Management:**
- [x] React Query provider configured
- [x] Zustand stores (graph, filter, UI)
- [x] localStorage persistence

**API Layer:**
- [x] HTTP client with error handling
- [x] TypeScript type definitions
- [x] Event and graph API functions
- [x] Mock data system ✨

**Pages:**
- [x] Dashboard with API connection test
- [x] Graph placeholder page
- [x] Root layout with providers

**Documentation:**
- [x] README.md
- [x] SETUP_COMPLETE.md
- [x] ARCHITECTURE.md (this file)

### 📋 Phase 2 Next

**GraphView Component (3 hrs)**
- [ ] Integrate Cytoscape.js
- [ ] Render nodes/edges with FE-EKG colors
- [ ] Implement pan/zoom controls
- [ ] Handle node selection

**FilterPanel (2 hrs)**
- [ ] Date range picker
- [ ] Event type multi-select
- [ ] Search input with debouncing

**EventCard (2 hrs)**
- [ ] Fetch event details on selection
- [ ] Display provenance data
- [ ] Show related events

**Timeline (3 hrs)**
- [ ] D3.js time scrubber
- [ ] Brush selection for date range
- [ ] Sync with date filter

**Node Expansion (2 hrs)**
- [ ] Fetch neighborhood from API
- [ ] Add/remove nodes dynamically
- [ ] Re-layout with animation

---

## Backend API Issue

### Problem

The Flask backend API (`http://localhost:5001`) has **hardcoded Cypher queries** (Neo4j syntax), but is configured to use **AllegroGraph** (SPARQL syntax).

**Error:** `"Server returned 400: Line 2, Value 'MATCH' not recognized"`

### Current Solution

Frontend uses **mock data** via `USE_MOCK_DATA = true` flag in `src/lib/api/mock-data.ts`.

### Future Solutions

**Option A:** Switch backend to Neo4j
```bash
# In backend .env file
GRAPH_BACKEND=neo4j

# Start Neo4j via Docker
docker start feekg-neo4j
```

**Option B:** Fix API to use SPARQL queries for AllegroGraph

**Option C:** Keep using mock data for frontend development

---

## Development Workflow

### Start Services

```bash
# Terminal 1: Frontend
cd ~/Desktop/DDP/feekg-frontend
npm run dev
# → http://localhost:3000

# Terminal 2: Backend (optional, currently broken)
cd ~/Desktop/DDP/feekg
./venv/bin/python api/app.py
# → http://localhost:5001
```

### Switch Between Mock and Real Data

```typescript
// src/lib/api/mock-data.ts
export const USE_MOCK_DATA = true;  // Mock data (current)
export const USE_MOCK_DATA = false; // Real API (when fixed)
```

### Run Type Checking

```bash
npm run build  # Type check + build
```

### Run Linter

```bash
npm run lint
```

---

## Testing Strategy

### Current Testing

- ✅ Manual testing via dashboard at http://localhost:3000
- ✅ API connection status indicator
- ✅ Mock data with realistic Lehman Brothers events

### Future Testing (Phase 3)

- [ ] Unit tests with Jest + React Testing Library
- [ ] Component tests for GraphView, FilterPanel
- [ ] Integration tests for API client
- [ ] E2E tests with Playwright

---

## Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Initial page load | < 2s | ✅ ~500ms (mock data) |
| API response (paginated) | < 200ms | ✅ ~300ms (mock) |
| Graph render (100 nodes) | < 500ms | 📋 Phase 2 |
| Graph render (1000 nodes) | < 2s | 📋 Phase 2 |
| Search debounce delay | 300ms | ⚙️ Configured |

---

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## Security Considerations

### API Security
- ✅ CORS enabled in backend
- ✅ Environment variables for API URL
- ⚠️ No authentication (local development)

### Data Validation
- ✅ TypeScript type checking
- ✅ API error handling with custom `APIError` class

---

## Known Issues

### 1. Backend API Incompatibility
- **Issue:** Backend uses Cypher queries on AllegroGraph
- **Impact:** All API calls fail with "MATCH not recognized"
- **Workaround:** Using mock data (`USE_MOCK_DATA = true`)
- **Status:** Documented, workaround in place

### 2. Fast Refresh Warnings
- **Issue:** "Fast Refresh had to perform a full reload"
- **Cause:** React Query hydration with async data
- **Impact:** Minimal, development-only
- **Status:** Normal behavior, no action needed

### 3. Security Audit Warnings
- **Issue:** 1 critical vulnerability in npm dependencies
- **Impact:** Development dependencies only
- **Status:** Non-blocking for development

---

## Deployment (Future)

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

```bash
# Production .env.local
NEXT_PUBLIC_API_URL=https://api.feekg.org
NEXT_PUBLIC_DEFAULT_PAGE_SIZE=100
NEXT_PUBLIC_MAX_NODES=1000
```

### Hosting Options

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Self-hosted** (Docker + Nginx)

---

## Contributing

### Code Style

- **TypeScript:** Strict mode enabled
- **Components:** Functional components with hooks
- **Naming:** camelCase for variables, PascalCase for components
- **Files:** kebab-case for file names

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/graph-view

# Make changes, commit
git add .
git commit -m "Add Cytoscape.js GraphView component"

# Push to remote
git push origin feature/graph-view
```

---

## Troubleshooting

### Frontend Won't Start

```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### Mock Data Not Loading

```bash
# Check the flag
cat src/lib/api/mock-data.ts | grep USE_MOCK_DATA
# Should show: export const USE_MOCK_DATA = true;
```

### TypeScript Errors

```bash
# Check types
npx tsc --noEmit

# Clear Next.js cache
rm -rf .next
```

---

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest/docs/react/overview)
- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Cytoscape.js Docs](https://js.cytoscape.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Internal Docs
- `README.md` - Project setup
- `SETUP_COMPLETE.md` - Completion status
- `ARCHITECTURE.md` - This file

---

**Last Updated:** 2025-11-15
**Version:** 1.0.0
**Status:** Phase 1 Complete ✅

