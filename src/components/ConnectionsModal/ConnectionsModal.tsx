"use client";

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Event, EvolutionLink } from '@/lib/api/types';
import { fetchEvolutionLinks, fetchPaginatedEvents } from '@/lib/api/events';

interface ConnectionsModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectionsModal({ event, isOpen, onClose }: ConnectionsModalProps) {
  if (!isOpen) return null;

  // Fetch evolution links for this event
  const { data: evolutionLinks, isLoading, error, isError } = useQuery({
    queryKey: ['evolution-links', event.eventId],
    queryFn: async () => {
      console.log('[ConnectionsModal] Fetching evolution links for event:', event.eventId);
      const links = await fetchEvolutionLinks(event.eventId, 0.3);
      console.log('[ConnectionsModal] Received links:', links);
      return links;
    },
    enabled: isOpen,
  });

  // Get links FROM and TO this event
  const linksFrom = evolutionLinks?.filter(link => link.from === event.eventId) || [];
  const linksTo = evolutionLinks?.filter(link => link.to === event.eventId) || [];

  console.log('[ConnectionsModal] Filtered links:', { linksFrom, linksTo, total: evolutionLinks?.length });

  // Get unique entities involved
  const entities = new Set([
    ...(event.actors || []),
    ...(event.targets || []),
  ]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white/95 backdrop-blur-xl rounded-3xl shadow-apple-xl border border-gray-100/50 m-6">
        {/* Header */}
        <div className="flex items-start justify-between p-8 pb-6 border-b border-gray-200/50">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Connections</h2>
            <p className="text-sm text-gray-600">{event.label}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 active:scale-90 transition-all duration-200 p-2 rounded-lg hover:bg-gray-100/50"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="relative h-12 w-12">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
              </div>
            </div>
          ) : isError ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-red-800 font-semibold mb-1">Failed to Load Evolution Links</h4>
                  <p className="text-red-600 text-sm mb-2">The backend API endpoint may not be available.</p>
                  <p className="text-red-600 text-xs font-mono">{error?.toString()}</p>
                  <p className="text-red-600 text-xs mt-2">Check browser console for details.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Evolution Links FROM this event */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Events Evolving From This ({linksFrom.length})
                </h3>
                {linksFrom.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No outgoing evolution links found</p>
                ) : (
                  <div className="space-y-3">
                    {linksFrom.map((link, idx) => (
                      <EvolutionLinkCard key={idx} link={link} direction="to" />
                    ))}
                  </div>
                )}
              </div>

              {/* Evolution Links TO this event */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                  </svg>
                  Events Leading To This ({linksTo.length})
                </h3>
                {linksTo.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No incoming evolution links found</p>
                ) : (
                  <div className="space-y-3">
                    {linksTo.map((link, idx) => (
                      <EvolutionLinkCard key={idx} link={link} direction="from" />
                    ))}
                  </div>
                )}
              </div>

              {/* Related Entities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Related Entities ({entities.size})
                </h3>
                {entities.size === 0 ? (
                  <p className="text-sm text-gray-500 italic">No entities associated with this event</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {Array.from(entities).map((entity, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1.5 bg-amber-50 text-amber-700 text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        {entity}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Event Details Summary */}
              <div className="pt-6 border-t border-gray-200/50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Event Type</label>
                    <p className="text-gray-900 capitalize">{event.type.replace(/_/g, ' ')}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                    <p className="text-gray-900">{event.date}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Severity</label>
                    <p className="text-gray-900 capitalize">{event.severity || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Event ID</label>
                    <p className="text-gray-900 font-mono text-xs">{event.eventId}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50/30 border-t border-gray-200/50 rounded-b-3xl flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 active:scale-95 transition-all duration-200 shadow-apple border border-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Evolution Link Card Component
function EvolutionLinkCard({ link, direction }: { link: EvolutionLink; direction: 'from' | 'to' }) {
  const eventId = direction === 'from' ? link.from : link.to;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-apple hover:shadow-apple-lg transition-all duration-200 border border-gray-100/50">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 mb-1">Event {eventId}</p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
              Score: {(link.score * 100).toFixed(1)}%
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded capitalize">
              {link.type}
            </span>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        {link.temporal !== undefined && (
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Temporal:</span>
            <span className="font-medium text-gray-900">{(link.temporal * 100).toFixed(0)}%</span>
          </div>
        )}
        {link.entity_overlap !== undefined && (
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Entity:</span>
            <span className="font-medium text-gray-900">{(link.entity_overlap * 100).toFixed(0)}%</span>
          </div>
        )}
        {link.semantic !== undefined && (
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Semantic:</span>
            <span className="font-medium text-gray-900">{(link.semantic * 100).toFixed(0)}%</span>
          </div>
        )}
        {link.causality !== undefined && (
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Causality:</span>
            <span className="font-medium text-gray-900">{(link.causality * 100).toFixed(0)}%</span>
          </div>
        )}
        {link.topic !== undefined && (
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Topic:</span>
            <span className="font-medium text-gray-900">{(link.topic * 100).toFixed(0)}%</span>
          </div>
        )}
        {link.emotional !== undefined && (
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Emotional:</span>
            <span className="font-medium text-gray-900">{(link.emotional * 100).toFixed(0)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
