/**
 * Helpora Navigation & Routing Service
 * Computes distances, scans nearby environments, and queries OSRM for live driving/walking routes.
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface RouteStep {
  instruction: string;
  distanceMeters: number;
  durationSeconds: number;
  name: string;
  type: string;
  modifier?: string;
}

export interface RouteResult {
  coordinates: [number, number][]; // [lat, lng]
  distanceMeters: number;
  distanceKm: number;
  durationMinutes: number;
  walkingMinutes: number;
  steps: RouteStep[];
  isDirectFallback?: boolean;
}

/**
 * Calculates geodesic distance between two points in Kilometers using Haversine formula
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Formats distance into clean localized string
 */
export function formatDistanceKm(km: number | undefined): string {
  if (km === undefined || isNaN(km)) return '';
  if (km < 1) {
    return `${Math.round(km * 1000)} m away`;
  }
  return `${km.toFixed(1)} km away`;
}

/**
 * Formats duration in minutes into clean readable string
 */
export function formatDuration(minutes: number): string {
  if (minutes < 1) return '< 1 min';
  if (minutes < 60) return `${Math.round(minutes)} mins`;
  const hours = Math.floor(minutes / 60);
  const rem = Math.round(minutes % 60);
  return `${hours}h ${rem}m`;
}

/**
 * Finds the closest item to user coordinates from an array of items with { lat, lng }
 */
export function findClosestEntity<T extends { lat: number; lng: number }>(
  userCoords: Coordinates,
  items: T[]
): { item: T; distanceKm: number } | null {
  if (!items || items.length === 0) return null;

  let closest: T | null = null;
  let minDistance = Infinity;

  for (const item of items) {
    if (typeof item.lat === 'number' && typeof item.lng === 'number') {
      const dist = calculateDistanceKm(userCoords.lat, userCoords.lng, item.lat, item.lng);
      if (dist < minDistance) {
        minDistance = dist;
        closest = item;
      }
    }
  }

  if (!closest) return null;
  return { item: closest, distanceKm: minDistance };
}

/**
 * Generates human-friendly maneuver instructions from OSRM step
 */
function formatManeuverInstruction(step: any, index: number, total: number): string {
  const type = step?.maneuver?.type || '';
  const modifier = step?.maneuver?.modifier || '';
  const street = step?.name ? `onto ${step.name}` : '';

  if (index === 0) {
    return `Head ${modifier || 'forward'} ${street || 'on your route'}`;
  }
  if (index === total - 1 || type === 'arrive') {
    return `Arrive at destination on ${modifier ? 'the ' + modifier : 'your location'}`;
  }

  switch (type) {
    case 'turn':
      return `Turn ${modifier} ${street}`;
    case 'new name':
      return `Continue ${street}`;
    case 'roundabout':
      return `Take the roundabout exit ${street}`;
    case 'merge':
      return `Merge ${modifier} ${street}`;
    case 'fork':
      return `Keep ${modifier} at the fork ${street}`;
    default:
      return `Continue ${modifier} ${street}`;
  }
}

/**
 * Fetches real turn-by-turn road route from OSRM (Open Source Routing Machine)
 * Falls back gracefully to straight-line navigation if offline or error.
 */
export async function fetchLiveRoute(
  origin: Coordinates,
  destination: Coordinates
): Promise<RouteResult> {
  const straightDistanceKm = calculateDistanceKm(
    origin.lat,
    origin.lng,
    destination.lat,
    destination.lng
  );
  const straightMeters = straightDistanceKm * 1000;
  // Estimated urban driving speed ~30 km/h; walking speed ~4.5 km/h
  const fallbackDriveMinutes = Math.max(1, Math.round((straightDistanceKm / 30) * 60));
  const fallbackWalkMinutes = Math.max(2, Math.round((straightDistanceKm / 4.5) * 60));

  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson&steps=true`;
    
    // 5-second timeout for snappy user experience
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        
        // GeoJSON coordinates are [lng, lat], convert to Leaflet [lat, lng]
        const rawCoords: [number, number][] = route.geometry.coordinates;
        const leafletCoords: [number, number][] = rawCoords.map(([lng, lat]) => [lat, lng]);

        const distanceMeters = route.distance;
        const distanceKm = Math.round((distanceMeters / 1000) * 10) / 10;
        const durationMinutes = Math.max(1, Math.round(route.duration / 60));
        const walkingMinutes = Math.max(2, Math.round((distanceKm / 4.5) * 60));

        // Format navigation steps
        const rawSteps = route.legs?.[0]?.steps || [];
        const steps: RouteStep[] = rawSteps.map((s: any, idx: number) => ({
          instruction: formatManeuverInstruction(s, idx, rawSteps.length),
          distanceMeters: Math.round(s.distance || 0),
          durationSeconds: Math.round(s.duration || 0),
          name: s.name || '',
          type: s.maneuver?.type || '',
          modifier: s.maneuver?.modifier || ''
        }));

        return {
          coordinates: leafletCoords,
          distanceMeters,
          distanceKm,
          durationMinutes,
          walkingMinutes,
          steps,
          isDirectFallback: false
        };
      }
    }
  } catch (err) {
    console.warn('[Navigator] OSRM live route fetch failed or timed out. Falling back to direct routing.');
  }

  // Fallback direct line
  return {
    coordinates: [
      [origin.lat, origin.lng],
      [destination.lat, destination.lng]
    ],
    distanceMeters: straightMeters,
    distanceKm: straightDistanceKm,
    durationMinutes: fallbackDriveMinutes,
    walkingMinutes: fallbackWalkMinutes,
    steps: [
      {
        instruction: `Head directly toward destination (${straightDistanceKm} km)`,
        distanceMeters: straightMeters,
        durationSeconds: fallbackDriveMinutes * 60,
        name: 'Direct Route',
        type: 'depart'
      },
      {
        instruction: 'Arrive at destination',
        distanceMeters: 0,
        durationSeconds: 0,
        name: 'Destination',
        type: 'arrive'
      }
    ],
    isDirectFallback: true
  };
}
