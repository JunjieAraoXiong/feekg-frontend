import { apiClient, buildQueryString } from './client';
import {
  PaginatedResponse,
  Event,
  EventDetails,
  GraphData,
  TimeWindowFilter,
  EvolutionLink,
  Entity,
} from './types';
import { USE_MOCK_DATA, MOCK_EVENTS } from './mock-data';

/**
 * Fetch paginated events (using /api/events endpoint)
 * Note: Backend doesn't have a paginated endpoint, so we fetch all and slice client-side
 */
export async function fetchPaginatedEvents(
  offset: number = 0,
  limit: number = 100
): Promise<PaginatedResponse<Event>> {
  // Use mock data if enabled
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const paginatedEvents = MOCK_EVENTS.slice(offset, offset + limit);
        resolve({
          data: paginatedEvents,
          total: MOCK_EVENTS.length,
          offset,
          limit,
          status: 'success',
        });
      }, 300); // Simulate network delay
    });
  }

  // Pass pagination parameters to backend
  const query = buildQueryString({ offset, limit });
  const response = await apiClient<PaginatedResponse<Event>>(`/api/events${query}`);

  return response;
}

/**
 * Fetch events within a time window
 */
export async function fetchTimeWindow(
  startDate: string,
  endDate: string
): Promise<GraphData> {
  const query = buildQueryString({ start_date: startDate, end_date: endDate });
  const response = await apiClient<{ data: GraphData }>(`/api/events/time_window${query}`);
  return response.data;
}

/**
 * Fetch event details by ID
 */
export async function fetchEventDetails(eventId: string): Promise<EventDetails> {
  const response = await apiClient<{ data: EventDetails }>(`/api/events/${eventId}`);
  return response.data;
}

/**
 * Fetch all events (for dropdown filters)
 * Requests up to 10000 events to get all data
 */
export async function fetchAllEvents(): Promise<Event[]> {
  const query = buildQueryString({ limit: 10000 });
  const response = await apiClient<{ data: Event[] }>(`/api/events${query}`);
  return response.data;
}

/**
 * Search events by query string
 */
export async function searchEvents(query: string): Promise<Event[]> {
  const queryString = buildQueryString({ q: query });
  const response = await apiClient<{ data: Event[] }>(`/api/events/search${queryString}`);
  return response.data;
}

/**
 * Fetch evolution links for a specific event (or all if no eventId)
 */
export async function fetchEvolutionLinks(eventId?: string, minScore: number = 0.3): Promise<EvolutionLink[]> {
  const params: Record<string, any> = { min_score: minScore };
  if (eventId) {
    params.event_id = eventId;
  }
  const query = buildQueryString(params);
  const response = await apiClient<{ data: EvolutionLink[] }>(`/api/evolution/links${query}`);
  return response.data;
}

/**
 * Fetch all entities
 */
export async function fetchEntities(): Promise<Entity[]> {
  const response = await apiClient<{ data: Entity[] }>('/api/entities');
  return response.data;
}

/**
 * Fetch entity details by ID
 */
export async function fetchEntity(entityId: string): Promise<Entity> {
  const response = await apiClient<{ data: Entity }>(`/api/entities/${entityId}`);
  return response.data;
}

/**
 * Fetch full graph data (entities + events + edges)
 */
export async function fetchGraphData(limit: number = 500, minScore: number = 0.3): Promise<GraphData> {
  const query = buildQueryString({ limit, min_score: minScore });
  const response = await apiClient<GraphData>(`/api/graph/data${query}`);
  return response;
}
