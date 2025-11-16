"use client";

import Link from "next/link";

export default function DocsPage() {
  return (
    <main className="min-h-screen pt-16" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-apple-lg p-8 mb-8 border border-gray-100/50">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">FE-EKG Documentation</h1>
          <p className="text-lg text-gray-600">
            Financial Event Evolution Knowledge Graph - A comprehensive system for analyzing and visualizing financial events, their evolution patterns, and entity relationships.
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-apple-lg p-8 mb-8 border border-gray-100/50">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Explore the Graph</h3>
                <p className="text-sm text-gray-600 mb-2">Navigate to the <Link href="/graph" className="text-blue-600 hover:underline">Graph Visualization</Link> page to interactively explore financial events and their relationships.</p>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li><strong>Click nodes</strong> to view event details in the sidebar</li>
                  <li><strong>Selected nodes</strong> highlight with a gold border</li>
                  <li>Use <strong>filters</strong> to narrow down by date, event type, or search query</li>
                  <li>Try different <strong>layouts</strong>: Force-Directed, Circle, Grid, or Hierarchical</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">View Event Connections</h3>
                <p className="text-sm text-gray-600 mb-2">Click "View Connections" in the event details to see how events evolve over time.</p>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li><strong>Outgoing links</strong>: Events that evolved FROM this event</li>
                  <li><strong>Incoming links</strong>: Events that LED TO this event</li>
                  <li><strong>Evolution scores</strong>: Based on temporal, semantic, and causality analysis</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Explore the Timeline</h3>
                <p className="text-sm text-gray-600 mb-2">Visit the <Link href="/timeline" className="text-blue-600 hover:underline">Timeline</Link> to see events in chronological order.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-apple-lg p-8 mb-8 border border-gray-100/50">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Interactive Graph Visualization
              </h3>
              <p className="text-sm text-gray-700">Cytoscape.js-powered graph with multiple layout algorithms and smooth interactions</p>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Evolution Analysis
              </h3>
              <p className="text-sm text-gray-700">Track event evolution using temporal, semantic, and causal scoring algorithms</p>
            </div>

            <div className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
                AllegroGraph Backend
              </h3>
              <p className="text-sm text-gray-700">Powered by AllegroGraph RDF triple store with SPARQL query support</p>
            </div>

            <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Advanced Filtering
              </h3>
              <p className="text-sm text-gray-700">Filter by date range, event types, severity levels, and full-text search</p>
            </div>
          </div>
        </div>

        {/* Graph Controls */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-apple-lg p-8 mb-8 border border-gray-100/50">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Graph Controls</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="font-mono text-sm bg-white px-2 py-1 rounded border border-gray-300">Nodes</div>
              <p className="text-sm text-gray-700">Adjust the number of nodes displayed (10-500). Higher values may impact performance.</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="font-mono text-sm bg-white px-2 py-1 rounded border border-gray-300">Min Score</div>
              <p className="text-sm text-gray-700">Set minimum evolution score threshold (0.1-1.0) to filter weak connections.</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="font-mono text-sm bg-white px-2 py-1 rounded border border-gray-300">Layout</div>
              <p className="text-sm text-gray-700">Choose visualization layout: Force-Directed (default), Circle, Grid, or Hierarchical.</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="font-mono text-sm bg-white px-2 py-1 rounded border border-gray-300">Group by Type</div>
              <p className="text-sm text-gray-700">Organize nodes by event type for easier pattern recognition.</p>
            </div>
          </div>
        </div>

        {/* Color Legend */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-apple-lg p-8 mb-8 border border-gray-100/50">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Color Legend</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#ef4444' }}></div>
              <span className="text-sm font-medium text-gray-900">High Severity Events</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#f59e0b' }}></div>
              <span className="text-sm font-medium text-gray-900">Medium Severity Events</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#22c55e' }}></div>
              <span className="text-sm font-medium text-gray-900">Low Severity Events</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
              <span className="text-sm font-medium text-gray-900">Entities (Banks, Companies, etc.)</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 rounded-full border-4" style={{ borderColor: '#fbbf24' }}></div>
              <span className="text-sm font-medium text-gray-900">Selected Node (Gold Border)</span>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-apple-lg p-8 mb-8 border border-gray-100/50">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Next.js 15.5 with App Router</li>
                <li>• TypeScript for type safety</li>
                <li>• Cytoscape.js for graph visualization</li>
                <li>• TanStack Query for data fetching</li>
                <li>• Tailwind CSS for styling</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Backend</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Python Flask REST API</li>
                <li>• AllegroGraph RDF triple store</li>
                <li>• SPARQL query language</li>
                <li>• Evolution scoring algorithms</li>
                <li>• Deployed on Railway</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
