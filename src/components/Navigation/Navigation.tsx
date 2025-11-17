"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Graph', path: '/graph', icon: GraphIcon },
    { name: 'Timeline', path: '/timeline', icon: TimelineIcon },
    { name: 'Docs', path: '/docs', icon: DocsIcon },
  ];

  return (
    <nav className="terminal-nav">
      <div className="terminal-nav-container">
        <div className="terminal-nav-content">
          {/* Logo/Brand */}
          <Link href="/" className="terminal-brand">
            <div className="terminal-brand-icon">
              <svg className="terminal-brand-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="terminal-brand-text">
              <h1 className="terminal-brand-title">FE-EKG</h1>
              <p className="terminal-brand-subtitle">Financial Event Knowledge Graph</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="terminal-nav-links">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`terminal-nav-link ${isActive ? 'terminal-nav-link-active' : ''}`}
                >
                  <Icon className="terminal-nav-icon" />
                  <span className="terminal-nav-label">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side - API Status */}
          <div className="terminal-nav-status">
            <div className="terminal-status-indicator">
              <div className="terminal-status-dot terminal-pulse"></div>
              <span className="terminal-status-text">SYSTEM OK</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .terminal-nav {
          background: var(--terminal-bg-secondary);
          border-bottom: 1px solid var(--terminal-border);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .terminal-nav-container {
          max-width: 100%;
          padding: 0 2rem;
        }

        .terminal-nav-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
        }

        .terminal-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .terminal-brand:hover {
          opacity: 0.8;
        }

        .terminal-brand-icon {
          width: 36px;
          height: 36px;
          background: var(--terminal-green);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-center;
          transition: transform 0.2s;
        }

        .terminal-brand:hover .terminal-brand-icon {
          transform: scale(1.05);
        }

        .terminal-brand-svg {
          width: 22px;
          height: 22px;
          color: var(--terminal-bg-primary);
        }

        .terminal-brand-title {
          font-family: var(--terminal-font);
          font-size: 16px;
          font-weight: 700;
          color: var(--terminal-green);
          margin: 0;
          letter-spacing: 0.5px;
        }

        .terminal-brand-subtitle {
          font-family: var(--terminal-font);
          font-size: 10px;
          color: var(--terminal-text-dim);
          margin: 0;
          letter-spacing: 0.3px;
        }

        .terminal-nav-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .terminal-nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 8px 16px;
          border-radius: 6px;
          text-decoration: none;
          font-family: var(--terminal-font);
          font-size: 13px;
          font-weight: 500;
          color: var(--terminal-text-muted);
          transition: all 0.2s;
          border: 1px solid transparent;
        }

        .terminal-nav-link:hover {
          color: var(--terminal-green);
          background: var(--terminal-bg-primary);
          border-color: var(--terminal-border);
        }

        .terminal-nav-link-active {
          color: var(--terminal-bg-primary);
          background: var(--terminal-green);
          border-color: var(--terminal-green);
        }

        .terminal-nav-link-active:hover {
          background: var(--terminal-green-bright);
          border-color: var(--terminal-green-bright);
        }

        .terminal-nav-icon {
          width: 16px;
          height: 16px;
        }

        .terminal-nav-label {
          font-weight: 600;
        }

        .terminal-nav-status {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .terminal-status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 6px 12px;
          background: var(--terminal-bg-primary);
          border: 1px solid var(--terminal-border);
          border-radius: 6px;
        }

        .terminal-status-dot {
          width: 8px;
          height: 8px;
          background: var(--terminal-green);
          border-radius: 50%;
        }

        .terminal-status-text {
          font-family: var(--terminal-font);
          font-size: 11px;
          color: var(--terminal-green);
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .terminal-nav-container {
            padding: 0 1rem;
          }

          .terminal-nav-content {
            height: 56px;
          }

          .terminal-brand-subtitle {
            display: none;
          }

          .terminal-nav-label {
            display: none;
          }

          .terminal-nav-link {
            padding: 8px 12px;
          }

          .terminal-status-text {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}

// Icon Components
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function GraphIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function TimelineIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function DocsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
