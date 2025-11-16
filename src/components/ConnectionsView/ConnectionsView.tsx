"use client";

import { Event } from '@/lib/api/types';

interface EdgeData {
  id: string;
  source: string;
  target: string;
  type: string;
  weight?: number;
  data?: {
    score: number;
    temporal?: number;
    entity_overlap?: number;
    semantic?: number;
    topic?: number;
    causality?: number;
    emotional?: number;
    type?: string;
  };
}

interface ConnectionsViewProps {
  event: Event;
  edges: EdgeData[];
  allEvents: Event[];
  onBack: () => void;
  onEventClick?: (eventId: string) => void;
}

export function ConnectionsView({ event, edges, allEvents, onBack, onEventClick }: ConnectionsViewProps) {
  // Filter evolution edges for this event
  const evolutionEdges = edges.filter(
    edge => edge.type === 'evolves_to' && (edge.source === event.eventId || edge.target === event.eventId)
  );

  const outgoingLinks = evolutionEdges.filter(edge => edge.source === event.eventId);
  const incomingLinks = evolutionEdges.filter(edge => edge.target === event.eventId);

  // Helper to get event info
  const getEventInfo = (eventId: string) => {
    return allEvents.find(e => e.eventId === eventId) || { eventId, label: eventId, type: 'unknown', date: '' };
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-apple-lg h-full overflow-hidden border border-gray-100/50 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between p-6 pb-4 border-b border-gray-200/50">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={onBack}
              className="text-blue-600 hover:text-blue-700 active:scale-95 transition-all duration-200 p-1.5 rounded-lg hover:bg-blue-50"
              aria-label="Back to event details"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold text-gray-900">Event Connections</h3>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{event.label}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-4 border border-blue-100/50">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{outgoingLinks.length}</div>
              <div className="text-xs text-gray-600 mt-1">Outgoing</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">{incomingLinks.length}</div>
              <div className="text-xs text-gray-600 mt-1">Incoming</div>
            </div>
          </div>
        </div>

        {/* Outgoing Links */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            Events Evolving From This
          </h4>
          {outgoingLinks.length === 0 ? (
            <p className="text-sm text-gray-500 italic bg-gray-50 rounded-lg p-3">No outgoing evolution links</p>
          ) : (
            <div className="space-y-2">
              {outgoingLinks.map((edge) => {
                const targetEvent = getEventInfo(edge.target);
                const score = edge.data?.score || edge.weight || 0;

                return (
                  <div
                    key={edge.id}
                    onClick={() => onEventClick?.(edge.target)}
                    className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 cursor-pointer hover:border-blue-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{targetEvent.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{targetEvent.date}</p>
                      </div>
                      <span className="ml-2 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded flex-shrink-0">
                        {(score * 100).toFixed(0)}%
                      </span>
                    </div>

                    {/* Score Breakdown */}
                    {edge.data && (
                      <div className="grid grid-cols-3 gap-1.5 text-xs mt-2">
                        {edge.data.temporal !== undefined && (
                          <div className="bg-gray-50 rounded px-2 py-1">
                            <span className="text-gray-500">T: </span>
                            <span className="font-medium text-gray-900">{(edge.data.temporal * 100).toFixed(0)}%</span>
                          </div>
                        )}
                        {edge.data.semantic !== undefined && (
                          <div className="bg-gray-50 rounded px-2 py-1">
                            <span className="text-gray-500">S: </span>
                            <span className="font-medium text-gray-900">{(edge.data.semantic * 100).toFixed(0)}%</span>
                          </div>
                        )}
                        {edge.data.causality !== undefined && (
                          <div className="bg-gray-50 rounded px-2 py-1">
                            <span className="text-gray-500">C: </span>
                            <span className="font-medium text-gray-900">{(edge.data.causality * 100).toFixed(0)}%</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Incoming Links */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Events Leading To This
          </h4>
          {incomingLinks.length === 0 ? (
            <p className="text-sm text-gray-500 italic bg-gray-50 rounded-lg p-3">No incoming evolution links</p>
          ) : (
            <div className="space-y-2">
              {incomingLinks.map((edge) => {
                const sourceEvent = getEventInfo(edge.source);
                const score = edge.data?.score || edge.weight || 0;

                return (
                  <div
                    key={edge.id}
                    onClick={() => onEventClick?.(edge.source)}
                    className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 cursor-pointer hover:border-emerald-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{sourceEvent.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{sourceEvent.date}</p>
                      </div>
                      <span className="ml-2 px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded flex-shrink-0">
                        {(score * 100).toFixed(0)}%
                      </span>
                    </div>

                    {/* Score Breakdown */}
                    {edge.data && (
                      <div className="grid grid-cols-3 gap-1.5 text-xs mt-2">
                        {edge.data.temporal !== undefined && (
                          <div className="bg-gray-50 rounded px-2 py-1">
                            <span className="text-gray-500">T: </span>
                            <span className="font-medium text-gray-900">{(edge.data.temporal * 100).toFixed(0)}%</span>
                          </div>
                        )}
                        {edge.data.semantic !== undefined && (
                          <div className="bg-gray-50 rounded px-2 py-1">
                            <span className="text-gray-500">S: </span>
                            <span className="font-medium text-gray-900">{(edge.data.semantic * 100).toFixed(0)}%</span>
                          </div>
                        )}
                        {edge.data.causality !== undefined && (
                          <div className="bg-gray-50 rounded px-2 py-1">
                            <span className="text-gray-500">C: </span>
                            <span className="font-medium text-gray-900">{(edge.data.causality * 100).toFixed(0)}%</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Related Entities */}
        {(event.actors || event.targets) && (
          <div className="pt-4 border-t border-gray-200/50">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Related Entities</h4>
            <div className="space-y-2">
              {event.actors && event.actors.length > 0 && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Actors</label>
                  <div className="flex flex-wrap gap-1.5">
                    {event.actors.map((actor, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded shadow-sm"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {event.targets && event.targets.length > 0 && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Targets</label>
                  <div className="flex flex-wrap gap-1.5">
                    {event.targets.map((target, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-1 bg-red-50 text-red-700 text-xs font-medium rounded shadow-sm"
                      >
                        {target}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="pt-4 border-t border-gray-200/50">
          <h4 className="text-xs font-semibold text-gray-500 mb-2">Score Components</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <div><span className="font-medium">T:</span> Temporal correlation</div>
            <div><span className="font-medium">S:</span> Semantic similarity</div>
            <div><span className="font-medium">C:</span> Causality strength</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectionsView;
