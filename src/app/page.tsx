"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchGraphStats } from "@/lib/api/graph";
import { fetchPaginatedEvents } from "@/lib/api/events";
import Link from "next/link";

export default function Home() {
  // Fetch graph stats
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchGraphStats,
  });

  // Fetch sample events
  const { data: eventsData, isLoading: eventsLoading, error: eventsError } = useQuery({
    queryKey: ["events", 0, 10],
    queryFn: () => fetchPaginatedEvents(0, 10),
  });

  const isLoading = statsLoading || eventsLoading;
  const hasError = statsError || eventsError;

  return (
    <main className="terminal-home">
      {/* Hero Section */}
      <div className="terminal-hero">
        <div className="terminal-hero-content">
          {/* Terminal Prompt */}
          <div className="terminal-prompt-line">
            <span className="prompt-user">user@feekg</span>
            <span className="prompt-separator">:</span>
            <span className="prompt-path">~/financial-event-knowledge-graph</span>
            <span className="prompt-symbol">$</span>
            <span className="prompt-command terminal-blink">_</span>
          </div>

          {/* Title */}
          <h1 className="terminal-hero-title terminal-glow-green">
            FE-EKG
          </h1>
          <p className="terminal-hero-subtitle">
            {'>'} Financial Event Evolution Knowledge Graph
          </p>
          <p className="terminal-hero-description">
            Analyze complex financial events, evolution patterns, and entity relationships
            <br />using advanced graph technology and AllegroGraph RDF database.
          </p>

          {/* Quick Stats */}
          {stats && !isLoading && (
            <div className="terminal-stats-grid">
              <div className="terminal-stat">
                <div className="terminal-stat-value">{stats.totalEvents?.toLocaleString() || 0}</div>
                <div className="terminal-stat-label">Events</div>
              </div>
              <div className="terminal-stat">
                <div className="terminal-stat-value">{stats.totalEntities?.toLocaleString() || 0}</div>
                <div className="terminal-stat-label">Entities</div>
              </div>
              <div className="terminal-stat">
                <div className="terminal-stat-value">{stats.evolutionLinks?.toLocaleString() || 0}</div>
                <div className="terminal-stat-label">Ev Links</div>
              </div>
              <div className="terminal-stat">
                <div className="terminal-stat-value">{stats.totalRelationships?.toLocaleString() || 0}</div>
                <div className="terminal-stat-label">Relations</div>
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="terminal-cta-buttons">
            <Link href="/graph" className="terminal-button">
              <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Explore Graph →
            </Link>
            <Link href="/timeline" className="terminal-button-secondary">
              <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              View Timeline
            </Link>
            <Link href="/docs" className="terminal-button-secondary">
              <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Documentation
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="terminal-main-content">
        {/* System Status */}
        <div className="terminal-container">
          <div className="terminal-section-header">
            <span className="terminal-prompt-symbol">$</span>
            <span>systemctl status feekg-api</span>
          </div>

          {isLoading && (
            <div className="terminal-status-line">
              <div className="terminal-spinner"></div>
              <span className="terminal-text-muted">Connecting to AllegroGraph backend...</span>
            </div>
          )}

          {hasError && (
            <div className="terminal-status-line">
              <span className="terminal-badge-error">●</span>
              <div>
                <p className="terminal-status-error">Failed to connect to API</p>
                <p className="terminal-text-dim terminal-small">
                  Endpoint: {process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"}
                </p>
                <p className="terminal-text-dim terminal-small">
                  Error: {statsError?.message || eventsError?.message || "Unknown error"}
                </p>
              </div>
            </div>
          )}

          {!isLoading && !hasError && (
            <div className="terminal-status-line">
              <span className="terminal-badge-success terminal-pulse">●</span>
              <span className="terminal-status-ok">active (running) • AllegroGraph connected</span>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="terminal-features-grid">
          <div className="terminal-card">
            <div className="feature-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="feature-title">Interactive Visualization</h3>
            <p className="feature-description">
              Force-directed graph layouts, multiple view modes, and interactive filtering for exploring financial events and entities.
            </p>
          </div>

          <div className="terminal-card">
            <div className="feature-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="feature-title">Evolution Analysis</h3>
            <p className="feature-description">
              Track event evolution over time using temporal, semantic, and causal relationship scoring algorithms.
            </p>
          </div>

          <div className="terminal-card">
            <div className="feature-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <h3 className="feature-title">AllegroGraph RDF</h3>
            <p className="feature-description">
              Powered by AllegroGraph triple store with SPARQL queries for semantic web compatibility and advanced reasoning.
            </p>
          </div>
        </div>

        {/* Top Entities */}
        {stats?.topEntities && stats.topEntities.length > 0 && (
          <div className="terminal-container">
            <div className="terminal-section-header">
              <span className="terminal-prompt-symbol">$</span>
              <span>top-entities --sort-by=connections --limit=6</span>
            </div>
            <div className="terminal-entities-grid">
              {stats.topEntities.slice(0, 6).map((entity, idx) => (
                <div key={idx} className="terminal-entity-item">
                  <span className="entity-rank terminal-badge-success">#{idx + 1}</span>
                  <span className="entity-label">{entity.label}</span>
                  <span className="entity-degree terminal-code">{entity.degree}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Events */}
        {eventsData && eventsData.data.length > 0 && (
          <div className="terminal-container">
            <div className="terminal-section-header">
              <span className="terminal-prompt-symbol">$</span>
              <span>recent-events --limit=5</span>
            </div>

            <div className="terminal-events-list">
              {eventsData.data.slice(0, 5).map((event) => (
                <div key={event.eventId} className="terminal-event-item">
                  <div className="event-header">
                    <span className="event-label">{event.label}</span>
                    <span className="event-date terminal-badge">{event.date}</span>
                  </div>
                  <div className="event-type terminal-text-dim">{event.type}</div>
                </div>
              ))}
            </div>

            <div className="terminal-footer-info">
              <span className="terminal-text-dim">
                Showing {eventsData.data.length} of {eventsData.total.toLocaleString()} total events
              </span>
              <Link href="/graph" className="terminal-link">
                View all →
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .terminal-home {
          min-height: 100vh;
          position: relative;
          z-index: 2;
        }

        .terminal-hero {
          padding: 4rem 2rem;
          position: relative;
        }

        .terminal-hero-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .terminal-prompt-line {
          font-family: var(--terminal-font);
          font-size: 14px;
          margin-bottom: 2rem;
        }

        .prompt-user {
          color: var(--terminal-green);
        }

        .prompt-separator {
          color: var(--terminal-text-dim);
          margin: 0 0.25rem;
        }

        .prompt-path {
          color: var(--terminal-cyan);
        }

        .prompt-symbol {
          color: var(--terminal-text-muted);
          margin-left: 0.5rem;
          margin-right: 0.25rem;
        }

        .prompt-command {
          color: var(--terminal-text-primary);
        }

        .terminal-hero-title {
          font-family: var(--terminal-font);
          font-size: 56px;
          font-weight: 700;
          color: var(--terminal-green);
          margin: 0 0 1rem 0;
          letter-spacing: 2px;
        }

        .terminal-hero-subtitle {
          font-family: var(--terminal-font);
          font-size: 20px;
          color: var(--terminal-cyan);
          margin: 0 0 1rem 0;
        }

        .terminal-hero-description {
          font-family: var(--terminal-font);
          font-size: 14px;
          color: var(--terminal-text-secondary);
          max-width: 700px;
          margin: 0 0 2.5rem 0;
          line-height: 1.6;
        }

        .terminal-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
          max-width: 800px;
        }

        .terminal-cta-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .button-icon {
          width: 18px;
          height: 18px;
        }

        .terminal-main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem 4rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .terminal-section-header {
          font-family: var(--terminal-font);
          font-size: 13px;
          color: var(--terminal-text-muted);
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--terminal-border);
        }

        .terminal-status-line {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
        }

        .terminal-status-ok {
          font-family: var(--terminal-font);
          font-size: 13px;
          color: var(--terminal-green);
        }

        .terminal-status-error {
          font-family: var(--terminal-font);
          font-size: 13px;
          color: var(--terminal-red);
          margin: 0;
        }

        .terminal-small {
          font-size: 11px;
          margin: 0.25rem 0 0 0;
        }

        .terminal-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          color: var(--terminal-green);
          margin-bottom: 1rem;
        }

        .feature-icon svg {
          width: 100%;
          height: 100%;
        }

        .feature-title {
          font-family: var(--terminal-font);
          font-size: 16px;
          font-weight: 600;
          color: var(--terminal-text-primary);
          margin: 0 0 0.75rem 0;
        }

        .feature-description {
          font-family: var(--terminal-font);
          font-size: 12px;
          color: var(--terminal-text-muted);
          line-height: 1.6;
          margin: 0;
        }

        .terminal-entities-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          padding: 1rem;
        }

        .terminal-entity-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: var(--terminal-bg-secondary);
          border: 1px solid var(--terminal-border);
          border-radius: 6px;
          transition: border-color 0.2s;
        }

        .terminal-entity-item:hover {
          border-color: var(--terminal-green);
        }

        .entity-rank {
          font-size: 11px;
          flex-shrink: 0;
        }

        .entity-label {
          font-family: var(--terminal-font);
          font-size: 13px;
          font-weight: 600;
          color: var(--terminal-text-primary);
          flex: 1;
        }

        .entity-degree {
          font-size: 11px;
        }

        .terminal-events-list {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .terminal-event-item {
          padding: 1rem;
          background: var(--terminal-bg-secondary);
          border: 1px solid var(--terminal-border);
          border-radius: 6px;
          transition: border-color 0.2s;
        }

        .terminal-event-item:hover {
          border-color: var(--terminal-green);
        }

        .event-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .event-label {
          font-family: var(--terminal-font);
          font-size: 13px;
          font-weight: 600;
          color: var(--terminal-text-primary);
          flex: 1;
        }

        .event-date {
          font-size: 10px;
          flex-shrink: 0;
        }

        .event-type {
          font-size: 11px;
        }

        .terminal-footer-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-top: 1px solid var(--terminal-border);
        }

        @media (max-width: 768px) {
          .terminal-hero {
            padding: 2rem 1rem;
          }

          .terminal-hero-title {
            font-size: 36px;
          }

          .terminal-hero-subtitle {
            font-size: 16px;
          }

          .terminal-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .terminal-features-grid {
            grid-template-columns: 1fr;
          }

          .terminal-entities-grid {
            grid-template-columns: 1fr;
          }

          .terminal-main-content {
            padding: 0 1rem 2rem;
          }
        }
      `}</style>
    </main>
  );
}
