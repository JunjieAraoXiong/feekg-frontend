"use client";

import { useState } from 'react';
import Link from 'next/link';

interface DocItem {
  title: string;
  path: string;
  description: string;
  category: string;
}

const DOCS: DocItem[] = [
  // Main Documentation
  { title: 'Project Status', path: '/docs/PROJECT_STATUS', description: 'Current project status and progress', category: 'Main' },
  { title: 'Architecture', path: '/docs/ARCHITECTURE', description: 'System architecture and design', category: 'Main' },
  { title: 'Frontend Architecture', path: '/docs/FRONTEND_ARCHITECTURE', description: 'Frontend technical architecture', category: 'Main' },

  // Guides
  { title: 'Graph Interaction Guide', path: '/docs/GRAPH_INTERACTION_GUIDE', description: 'How to interact with the knowledge graph', category: 'Guides' },
  { title: 'Visualization Guide', path: '/docs/VISUALIZATION_GUIDE', description: 'Using visualization features', category: 'Guides' },

  // Summaries
  { title: 'Stage 6 Summary', path: '/docs/STAGE6_SUMMARY', description: 'Visualization and API implementation summary', category: 'Summaries' },
  { title: 'Cleanup Summary', path: '/docs/CLEANUP_SUMMARY', description: 'Code cleanup and optimization summary', category: 'Summaries' },
  { title: 'Backend Improvements', path: '/docs/BACKEND_IMPROVEMENTS_SUMMARY', description: 'Backend enhancements and optimizations', category: 'Summaries' },
  { title: 'ABM Demo Results', path: '/docs/ABM_DEMO_RESULTS', description: 'Agent-Based Model demonstration results', category: 'Summaries' },
  { title: 'Real Data Results', path: '/docs/REAL_DATA_RESULTS', description: 'Results from real Capital IQ data', category: 'Summaries' },

  // Planning & Vision
  { title: 'Cleanup Plan', path: '/docs/CLEANUP_PLAN', description: 'Codebase cleanup and refactoring plan', category: 'Planning' },
  { title: 'Dynamic KG Vision', path: '/docs/DYNAMIC_KG_VISION', description: 'Future vision for dynamic knowledge graphs', category: 'Planning' },
  { title: 'SLM ABM Roadmap', path: '/docs/SLM_ABM_ROADMAP', description: 'Small Language Model and ABM roadmap', category: 'Planning' },
  { title: 'Future Roadmap', path: '/docs/FUTURE_ROADMAP', description: 'Long-term project roadmap', category: 'Planning' },

  // Technical Reports
  { title: 'Data Quality Report', path: '/docs/DATA_QUALITY_REPORT', description: 'Capital IQ data quality analysis', category: 'Reports' },
  { title: 'Graph Visualization Backend Optimization', path: '/docs/GRAPH_VISUALIZATION_BACKEND_OPT', description: 'Backend optimization for graph viz', category: 'Reports' },
  { title: 'View Documentation', path: '/docs/VIEW', description: 'View layer documentation', category: 'Reports' },

  // AllegroGraph
  { title: 'AllegroGraph Setup', path: '/docs/docs/ALLEGROGRAPH_SETUP', description: 'Setting up AllegroGraph database', category: 'Database' },
  { title: 'Visualizations (AllegroGraph)', path: '/docs/docs/VISUALIZATIONS', description: 'Visualization capabilities with AllegroGraph', category: 'Database' },

  // LLM Integration
  { title: 'LLM README', path: '/docs/llm/README', description: 'LLM integration documentation', category: 'LLM' },
];

export default function DocsHubPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(DOCS.map(doc => doc.category)))];

  // Filter docs based on search and category
  const filteredDocs = DOCS.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group by category
  const groupedDocs = filteredDocs.reduce((acc, doc) => {
    const cat = doc.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(doc);
    return acc;
  }, {} as Record<string, DocItem[]>);

  return (
    <main className="terminal-page">
      <div className="terminal-wrapper">
        {/* Header */}
        <div className="terminal-header-section">
          <div className="terminal-prompt">
            <span className="prompt-symbol">$</span>
            <span className="prompt-text">cd /feekg/docs</span>
          </div>
          <h1 className="terminal-title">FE-EKG Documentation Terminal</h1>
          <p className="terminal-subtitle">
            Financial Event Evolution Knowledge Graph - Technical Documentation
          </p>
        </div>

        {/* Research Paper */}
        <div className="research-paper-section">
          <div className="research-paper-card">
            <div className="research-paper-header">
              <svg className="research-paper-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <div>
                <h2 className="research-paper-title">Research Paper</h2>
                <p className="research-paper-subtitle">Liu et al. (2024) - April 2024</p>
              </div>
            </div>
            <p className="research-paper-description">
              "Risk identification and management through knowledge Association: A financial event evolution knowledge graph approach"
            </p>
            <a
              href="/financial_event_evolution_knowledge_graph_approach_-_Apr_2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="research-paper-button"
            >
              <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </a>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="terminal-controls">
          <div className="search-box">
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search documentation... (Ctrl+K)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="search-clear">×</button>
            )}
          </div>

          <div className="category-filter">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="terminal-stats">
          <div className="stat-item">
            <span className="stat-label">Total Docs:</span>
            <span className="stat-value">{DOCS.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Categories:</span>
            <span className="stat-value">{categories.length - 1}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Filtered:</span>
            <span className="stat-value">{filteredDocs.length}</span>
          </div>
        </div>

        {/* Documentation Grid */}
        <div className="docs-grid">
          {Object.entries(groupedDocs).map(([category, docs]) => (
            <div key={category} className="category-section">
              <h2 className="category-title">
                <span className="category-icon">▶</span>
                {category}
              </h2>
              <div className="docs-list">
                {docs.map(doc => (
                  <Link key={doc.path} href={doc.path} className="doc-card">
                    <div className="doc-header">
                      <svg className="doc-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="doc-title">{doc.title}</h3>
                    </div>
                    <p className="doc-description">{doc.description}</p>
                    <div className="doc-footer">
                      <span className="doc-path">{doc.path}.md</span>
                      <span className="doc-arrow">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDocs.length === 0 && (
          <div className="no-results">
            <svg className="no-results-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>No documentation found matching your search</p>
            <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="reset-btn">
              Reset Filters
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="terminal-footer">
          <Link href="/" className="footer-link">
            ← Back to Home
          </Link>
          <div className="footer-info">
            <span>Press <kbd>Ctrl+K</kbd> to search</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .terminal-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .research-paper-section {
          margin-bottom: 2rem;
        }

        .research-paper-card {
          background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
          border: 2px solid #a3be8c;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 0 30px rgba(163, 190, 140, 0.2);
        }

        .research-paper-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .research-paper-icon {
          width: 48px;
          height: 48px;
          color: #a3be8c;
          flex-shrink: 0;
        }

        .research-paper-title {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 20px;
          font-weight: bold;
          color: #a3be8c;
          margin: 0;
        }

        .research-paper-subtitle {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 12px;
          color: #666;
          margin: 0;
        }

        .research-paper-description {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 14px;
          color: #d8dee9;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .research-paper-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #a3be8c;
          color: #0a0a0a;
          padding: 12px 20px;
          border-radius: 8px;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        }

        .research-paper-button:hover {
          background: #b4d09c;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(163, 190, 140, 0.3);
        }

        .button-icon {
          width: 20px;
          height: 20px;
        }

        .terminal-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          pointer-events: none;
          z-index: 1;
        }

        .terminal-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .terminal-header-section {
          margin-bottom: 2rem;
        }

        .terminal-prompt {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 14px;
          color: #666;
          margin-bottom: 1rem;
        }

        .prompt-symbol {
          color: #a3be8c;
          margin-right: 0.5rem;
        }

        .prompt-text {
          color: #88c0d0;
        }

        .terminal-title {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 36px;
          font-weight: bold;
          color: #fff;
          margin: 0 0 0.5rem 0;
          text-shadow: 0 0 20px rgba(163, 190, 140, 0.3);
        }

        .terminal-subtitle {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 14px;
          color: #999;
          margin: 0;
        }

        .terminal-controls {
          background: #0a0a0a;
          border: 1px solid #333;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .search-box {
          position: relative;
          margin-bottom: 1rem;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          color: #666;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 6px;
          padding: 10px 40px 10px 40px;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 14px;
          color: #e0e0e0;
          outline: none;
          transition: all 0.2s;
        }

        .search-input:focus {
          border-color: #a3be8c;
          box-shadow: 0 0 0 2px rgba(163, 190, 140, 0.1);
        }

        .search-input::placeholder {
          color: #666;
        }

        .search-clear {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #666;
          font-size: 24px;
          cursor: pointer;
          transition: color 0.2s;
        }

        .search-clear:hover {
          color: #ef5350;
        }

        .category-filter {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .category-btn {
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 6px;
          padding: 6px 12px;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 12px;
          color: #999;
          cursor: pointer;
          transition: all 0.2s;
        }

        .category-btn:hover {
          border-color: #555;
          color: #e0e0e0;
        }

        .category-btn.active {
          background: #a3be8c;
          border-color: #a3be8c;
          color: #0a0a0a;
        }

        .terminal-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 14px;
        }

        .stat-item {
          color: #999;
        }

        .stat-label {
          margin-right: 0.5rem;
        }

        .stat-value {
          color: #a3be8c;
          font-weight: 600;
        }

        .docs-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .category-section {
          background: #0a0a0a;
          border: 1px solid #333;
          border-radius: 8px;
          padding: 1.5rem;
        }

        .category-title {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 18px;
          font-weight: 600;
          color: #a3be8c;
          margin: 0 0 1rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .category-icon {
          font-size: 12px;
        }

        .docs-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1rem;
        }

        .doc-card {
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 6px;
          padding: 1rem;
          text-decoration: none;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .doc-card:hover {
          border-color: #a3be8c;
          background: #1f1f1f;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(163, 190, 140, 0.1);
        }

        .doc-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .doc-icon {
          width: 20px;
          height: 20px;
          color: #88c0d0;
          flex-shrink: 0;
        }

        .doc-title {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          margin: 0;
        }

        .doc-description {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 12px;
          color: #999;
          margin: 0;
          line-height: 1.5;
        }

        .doc-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 0.5rem;
          border-top: 1px solid #2a2a2a;
        }

        .doc-path {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 11px;
          color: #666;
        }

        .doc-arrow {
          color: #a3be8c;
        }

        .no-results {
          text-align: center;
          padding: 3rem;
          color: #999;
        }

        .no-results-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1rem;
          color: #666;
        }

        .reset-btn {
          margin-top: 1rem;
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 6px;
          padding: 8px 16px;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 12px;
          color: #a3be8c;
          cursor: pointer;
          transition: all 0.2s;
        }

        .reset-btn:hover {
          border-color: #a3be8c;
          background: #1f1f1f;
        }

        .terminal-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid #333;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
        }

        .footer-link {
          color: #88c0d0;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }

        .footer-link:hover {
          color: #8fbcbb;
        }

        .footer-info {
          font-size: 12px;
          color: #666;
        }

        .footer-info kbd {
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 3px;
          padding: 2px 6px;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 11px;
        }

        @media (max-width: 768px) {
          .terminal-page {
            padding: 1rem;
          }

          .terminal-title {
            font-size: 24px;
          }

          .docs-list {
            grid-template-columns: 1fr;
          }

          .terminal-stats {
            flex-direction: column;
            gap: 0.5rem;
          }

          .category-filter {
            gap: 0.25rem;
          }

          .terminal-footer {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </main>
  );
}
