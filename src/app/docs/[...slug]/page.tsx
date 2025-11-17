"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import Link from 'next/link';

export default function MarkdownViewerPage() {
  const params = useParams();
  const slug = params.slug as string[];
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filename, setFilename] = useState<string>('');

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build the file path from slug
        const filePath = slug.join('/');
        const mdPath = filePath.endsWith('.md') ? filePath : `${filePath}.md`;
        const fileName = mdPath.split('/').pop() || 'Document';
        setFilename(fileName);

        // Fetch from public folder
        const response = await fetch(`/${mdPath}`);

        if (!response.ok) {
          throw new Error(`Failed to load ${mdPath}`);
        }

        const text = await response.text();

        // Configure marked
        marked.setOptions({
          gfm: true,
          breaks: true,
        });

        // Convert markdown to HTML
        const html = await marked(text);
        setContent(html);

        // Apply syntax highlighting after content is set
        setTimeout(() => {
          document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block as HTMLElement);
          });
        }, 100);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load markdown');
      } finally {
        setLoading(false);
      }
    };

    if (slug && slug.length > 0) {
      fetchMarkdown();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="terminal-bg">
        <div className="terminal-container">
          <div className="terminal-header">
            <div className="terminal-title">loading...</div>
            <Link href="/docs" className="terminal-close">×</Link>
          </div>
          <div className="terminal-content">
            <div className="terminal-loading">
              <div className="loading-spinner"></div>
              <p>Loading markdown content...</p>
            </div>
          </div>
        </div>
        <style jsx>{terminalStyles}</style>
      </main>
    );
  }

  if (error) {
    return (
      <main className="terminal-bg">
        <div className="terminal-container">
          <div className="terminal-header">
            <div className="terminal-title">error</div>
            <Link href="/docs" className="terminal-close">×</Link>
          </div>
          <div className="terminal-content">
            <div className="terminal-error">
              <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{error}</p>
              <Link href="/docs" className="terminal-link">← Back to Documentation</Link>
            </div>
          </div>
        </div>
        <style jsx>{terminalStyles}</style>
      </main>
    );
  }

  return (
    <main className="terminal-bg">
      <div className="terminal-container">
        <div className="terminal-header">
          <div className="terminal-title">{filename}</div>
          <Link href="/docs" className="terminal-close">×</Link>
        </div>
        <div className="terminal-content">
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
      <style jsx>{terminalStyles}</style>
    </main>
  );
}

const terminalStyles = `
  .terminal-bg {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  .terminal-bg::before {
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

  .terminal-container {
    max-width: 1200px;
    margin: 0 auto;
    background: #0a0a0a;
    border: 1px solid #333;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
    position: relative;
    z-index: 2;
  }

  .terminal-header {
    background: #1a1a1a;
    border-bottom: 1px solid #333;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .terminal-title {
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 14px;
    color: #a3be8c;
    font-weight: 600;
  }

  .terminal-close {
    color: #666;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
    transition: color 0.2s;
    text-decoration: none;
  }

  .terminal-close:hover {
    color: #ef5350;
  }

  .terminal-content {
    padding: 2rem;
    color: #e0e0e0;
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.6;
    overflow-x: auto;
  }

  .terminal-loading,
  .terminal-error {
    text-align: center;
    padding: 3rem;
    color: #999;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #333;
    border-top-color: #a3be8c;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .error-icon {
    width: 48px;
    height: 48px;
    color: #ef5350;
    margin: 0 auto 1rem;
  }

  .terminal-link {
    display: inline-block;
    margin-top: 1rem;
    color: #a3be8c;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }

  .terminal-link:hover {
    border-bottom-color: #a3be8c;
  }

  /* Markdown Styling */
  .markdown-body {
    color: #e0e0e0;
  }

  .markdown-body h1 {
    color: #fff;
    font-size: 32px;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #555;
  }

  .markdown-body h2 {
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    margin-top: 2rem;
    margin-bottom: 1rem;
    padding-bottom: 0.3rem;
    border-bottom: 1px solid #444;
  }

  .markdown-body h3 {
    color: #a3be8c;
    font-size: 20px;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .markdown-body h4 {
    color: #ebcb8b;
    font-size: 16px;
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  .markdown-body p {
    margin-bottom: 1rem;
    color: #d8dee9;
  }

  .markdown-body a {
    color: #88c0d0;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all 0.2s;
  }

  .markdown-body a:hover {
    color: #8fbcbb;
    border-bottom-color: #8fbcbb;
  }

  .markdown-body code {
    background: #0a0a0a;
    color: #a3be8c;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 13px;
  }

  .markdown-body pre {
    background: #0a0a0a;
    border: 1px solid #333;
    border-radius: 6px;
    padding: 1rem;
    overflow-x: auto;
    margin-bottom: 1rem;
  }

  .markdown-body pre code {
    background: none;
    padding: 0;
    color: inherit;
    font-size: 13px;
  }

  .markdown-body ul,
  .markdown-body ol {
    margin-bottom: 1rem;
    padding-left: 2rem;
  }

  .markdown-body li {
    margin-bottom: 0.5rem;
    color: #d8dee9;
  }

  .markdown-body blockquote {
    border-left: 3px solid #a3be8c;
    padding-left: 1rem;
    margin-left: 0;
    margin-bottom: 1rem;
    color: #999;
    font-style: italic;
  }

  .markdown-body table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
  }

  .markdown-body th,
  .markdown-body td {
    border: 1px solid #333;
    padding: 8px 12px;
    text-align: left;
  }

  .markdown-body th {
    background: #1a1a1a;
    color: #a3be8c;
    font-weight: 600;
  }

  .markdown-body td {
    color: #d8dee9;
  }

  .markdown-body img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin: 1rem 0;
  }

  .markdown-body hr {
    border: none;
    border-top: 1px solid #444;
    margin: 2rem 0;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .terminal-bg {
      padding: 1rem;
    }

    .terminal-content {
      padding: 1rem;
      font-size: 13px;
    }

    .markdown-body h1 {
      font-size: 24px;
    }

    .markdown-body h2 {
      font-size: 20px;
    }

    .markdown-body h3 {
      font-size: 18px;
    }
  }
`;
