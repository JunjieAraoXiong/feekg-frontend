"use client";

import { useRouter } from 'next/navigation';
import { Event } from '@/lib/api/types';
import { COLORS } from '@/lib/constants';

interface EventCardProps {
  event: Event | null;
  onClose?: () => void;
  onViewConnections?: () => void;
  className?: string;
}

export function EventCard({ event, onClose, onViewConnections, className = '' }: EventCardProps) {
  const router = useRouter();
  if (!event) {
    return (
      <div className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-apple-lg p-8 border border-gray-100/50 ${className}`}>
        <div className="text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium">No event selected</p>
          <p className="text-xs mt-2 text-gray-400">Click a node in the graph to view details</p>
        </div>
      </div>
    );
  }

  const severityColor = event.severity
    ? COLORS[event.severity as keyof typeof COLORS]
    : COLORS.low;

  const severityBgClass = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-emerald-100 text-emerald-700',
  }[event.severity || 'low'];

  return (
    <div className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-apple-lg hover:shadow-apple-xl transition-all duration-300 border border-gray-100/50 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between p-8 pb-6 border-b border-gray-200/50">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full shadow-sm ${severityBgClass}`}>
              {event.severity?.toUpperCase() || 'LOW'}
            </span>
            <span className="text-xs text-gray-500 font-medium">{event.date}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 leading-snug">{event.label}</h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 active:scale-90 transition-all duration-200 p-1 rounded-lg hover:bg-gray-100/50"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-8 space-y-5 overflow-y-auto max-h-[calc(100vh-400px)]">
        {/* Event Type */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Event Type</label>
          <p className="text-sm text-gray-900 capitalize">{event.type.replace(/_/g, ' ')}</p>
        </div>

        {/* Description */}
        {event.description && (
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
            <p className="text-sm text-gray-700 leading-relaxed">{event.description}</p>
          </div>
        )}

        {/* Actors */}
        {event.actors && event.actors.length > 0 && (
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-3">Actors</label>
            <div className="flex flex-wrap gap-2">
              {event.actors.map((actor, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  {actor}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Targets */}
        {event.targets && event.targets.length > 0 && (
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-3">Targets</label>
            <div className="flex flex-wrap gap-2">
              {event.targets.map((target, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 text-xs font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  {target}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Source/Provenance */}
        {event.source && (
          <div className="pt-5 border-t border-gray-200/50">
            <label className="block text-xs font-medium text-gray-500 mb-2">Data Source</label>
            <p className="text-xs text-gray-600 font-mono bg-gray-50/50 px-3 py-2 rounded-lg">{event.source}</p>
          </div>
        )}

        {/* Event ID */}
        <div className="pt-3">
          <label className="block text-xs font-medium text-gray-500 mb-2">Event ID</label>
          <p className="text-xs text-gray-600 font-mono bg-gray-50/50 px-3 py-2 rounded-lg">{event.eventId}</p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-8 py-6 bg-gray-50/30 border-t border-gray-200/50 rounded-b-2xl">
        <div className="flex gap-3">
          <button
            onClick={onViewConnections}
            className="flex-1 px-4 py-3 bg-blue-500 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 active:scale-95 hover:shadow-md transition-all duration-200 shadow-apple"
          >
            View Connections
          </button>
          <button
            onClick={() => router.push(`/timeline?event=${event.eventId}&date=${event.date}`)}
            className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-300 active:scale-95 transition-all duration-200"
          >
            View Timeline
          </button>
        </div>
      </div>
    </div>
  );
}
