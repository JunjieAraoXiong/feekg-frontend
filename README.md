# FE-EKG Frontend

Interactive visualization frontend for the Financial Event Evolution Knowledge Graph system.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Query v5** - Server state management
- **Zustand** - UI state management
- **Cytoscape.js** - Graph visualization (coming soon)

## Prerequisites

- Node.js 18+
- npm or yarn
- FE-EKG backend running on http://localhost:5000

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Backend API

Make sure the Flask backend is running:

```bash
cd ../feekg
./venv/bin/python api/app.py
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page (API test)
│   ├── graph/              # Graph visualization page
│   └── providers.tsx       # React Query provider
│
├── components/             # React components
│   ├── GraphView/          # Cytoscape.js graph
│   ├── FilterPanel/        # Filters sidebar
│   ├── EventCard/          # Event details
│   ├── Timeline/           # Time scrubber
│   └── StatsPanel/         # Statistics
│
├── lib/                    # Utilities and configuration
│   ├── api/                # API client and endpoints
│   │   ├── client.ts       # HTTP client with error handling
│   │   ├── events.ts       # Event API functions
│   │   ├── graph.ts        # Graph API functions
│   │   └── types.ts        # TypeScript types
│   ├── constants.ts        # Colors, layouts, config
│   └── utils/              # Helper functions
│
├── stores/                 # Zustand state management
│   ├── graphStore.ts       # Graph UI state
│   ├── filterStore.ts      # Filter state
│   └── uiStore.ts          # Global UI state
│
└── hooks/                  # Custom React hooks
    └── useGraphData.ts     # Graph data fetching
```

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_DEFAULT_PAGE_SIZE=100
NEXT_PUBLIC_MAX_NODES=1000
```

## Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Integration

The frontend connects to the Flask backend via the API client:

```typescript
import { fetchGraphStats } from '@/lib/api/graph';

const stats = await fetchGraphStats();
```

All API requests include:
- ✅ Type safety with TypeScript
- ✅ Error handling with custom APIError class
- ✅ Request timeout (30 seconds)
- ✅ Automatic retries (3 attempts)

## State Management

### Server State (React Query)

```typescript
const { data, isLoading } = useQuery({
  queryKey: ['events'],
  queryFn: fetchPaginatedEvents,
});
```

### UI State (Zustand)

```typescript
const { selectedNode, setSelectedNode } = useGraphStore();
const { startDate, setDateRange } = useFilterStore();
```

## Current Status

### ✅ Phase 1: Bootstrap Complete

- [x] Next.js 14 project structure
- [x] TypeScript and Tailwind CSS configured
- [x] API client with error handling
- [x] React Query provider setup
- [x] Zustand stores (graph, filter, UI)
- [x] Test page with API connection verification
- [x] All documentation files created

### 📋 Phase 2: Graph Visualization (Next)

- [ ] GraphView component with Cytoscape.js
- [ ] FilterPanel (date range, search, event types)
- [ ] EventCard detail view
- [ ] Timeline scrubber component
- [ ] Node expand/collapse
- [ ] High-impact hub highlighting

## Documentation

See the following guides in the root directory:

1. `FRONTEND_ARCHITECTURE.md` - Complete system architecture
2. `FRONTEND_SETUP_GUIDE.md` - Step-by-step setup instructions
3. `COMPONENT_LIBRARY.md` - Component specifications
4. `UI_UX_DESIGN_SYSTEM.md` - Design tokens and styling
5. `GRAPH_INTERACTION_GUIDE.md` - User interaction patterns
6. `PERFORMANCE_OPTIMIZATION.md` - Optimization strategies
7. `STATE_MANAGEMENT_GUIDE.md` - React Query + Zustand patterns

## Troubleshooting

### Backend Not Connected

**Error:** "Failed to connect to API"

**Solution:**
1. Ensure Flask backend is running: `./venv/bin/python api/app.py`
2. Check backend is on port 5000: `curl http://localhost:5000/health`
3. Verify `.env.local` has correct `NEXT_PUBLIC_API_URL`

### Module Import Errors

**Error:** "Cannot find module '@/lib/...'"

**Solution:**
- Check `tsconfig.json` has correct path aliases
- Restart development server: `npm run dev`

### Build Errors

**Error:** Build fails with type errors

**Solution:**
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript version: `npx tsc --version` (should be 5.x)
- Clear Next.js cache: `rm -rf .next`

## Next Steps

1. **Implement GraphView Component**
   - Integrate Cytoscape.js
   - Add node/edge styling from constants
   - Implement pan/zoom controls

2. **Build FilterPanel**
   - Date range picker
   - Event type checkboxes
   - Search input with debouncing

3. **Create EventCard**
   - Fetch event details on selection
   - Display provenance data
   - Show related events

4. **Add Timeline Component**
   - D3.js time scrubber
   - Brush selection
   - Date range synchronization

## License

Internal research project - not for public distribution.

---

**Last Updated:** 2025-11-15
**Status:** Phase 1 Complete ✅
