import { gpx } from '@tmcw/togeojson';
import type { Feature, FeatureCollection, LineString, MultiLineString, Position } from 'geojson';

export interface TrackStats {
  distanceKm: number;
  ascentM: number;
  descentM: number;
  maxEleM: number | null;
  minEleM: number | null;
  durationSec: number | null;
  avgPaceMinPerKm: number | null;
  points: number;
}

export interface ParsedTrack {
  name: string;
  /** Raw GeoJSON, stored in Supabase so tracks sync across devices. */
  geojson: FeatureCollection;
  /** Leaflet-friendly [lat, lng] pairs for drawing on the map. */
  latlngs: [number, number][];
  stats: TrackStats;
}

const EARTH_RADIUS_M = 6_371_000;

function haversineMetres(a: Position, b: Position): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const [lng1, lat1] = a;
  const [lng2, lat2] = b;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.min(1, Math.sqrt(s)));
}

function collectLineCoords(fc: FeatureCollection): { coords: Position[]; times: string[] } {
  const coords: Position[] = [];
  const times: string[] = [];
  for (const feature of fc.features as Feature[]) {
    const geom = feature.geometry;
    if (!geom) continue;
    const props = (feature.properties ?? {}) as {
      coordinateProperties?: { times?: string[] | string[][] };
    };
    const timeProp = props.coordinateProperties?.times;

    if (geom.type === 'LineString') {
      const line = geom as LineString;
      line.coordinates.forEach((c, i) => {
        coords.push(c);
        const t = Array.isArray(timeProp) ? (timeProp as string[])[i] : undefined;
        if (typeof t === 'string') times.push(t);
      });
    } else if (geom.type === 'MultiLineString') {
      const multi = geom as MultiLineString;
      multi.coordinates.forEach((seg, segIdx) => {
        seg.forEach((c, i) => {
          coords.push(c);
          const segTimes = Array.isArray(timeProp) ? (timeProp as unknown[])[segIdx] : undefined;
          const t = Array.isArray(segTimes) ? (segTimes as string[])[i] : undefined;
          if (typeof t === 'string') times.push(t);
        });
      });
    }
  }
  return { coords, times };
}

function computeStats(coords: Position[], times: string[]): TrackStats {
  let distanceM = 0;
  let ascentM = 0;
  let descentM = 0;
  let maxEle: number | null = null;
  let minEle: number | null = null;

  for (let i = 0; i < coords.length; i++) {
    const ele = coords[i][2];
    if (typeof ele === 'number' && Number.isFinite(ele)) {
      maxEle = maxEle == null ? ele : Math.max(maxEle, ele);
      minEle = minEle == null ? ele : Math.min(minEle, ele);
    }
    if (i > 0) {
      distanceM += haversineMetres(coords[i - 1], coords[i]);
      const prevEle = coords[i - 1][2];
      if (
        typeof ele === 'number' &&
        typeof prevEle === 'number' &&
        Number.isFinite(ele) &&
        Number.isFinite(prevEle)
      ) {
        const delta = ele - prevEle;
        // Ignore tiny GPS elevation jitter.
        if (delta > 1) ascentM += delta;
        else if (delta < -1) descentM += -delta;
      }
    }
  }

  let durationSec: number | null = null;
  if (times.length >= 2) {
    const start = Date.parse(times[0]);
    const end = Date.parse(times[times.length - 1]);
    if (Number.isFinite(start) && Number.isFinite(end) && end > start) {
      durationSec = (end - start) / 1000;
    }
  }

  const distanceKm = distanceM / 1000;
  const avgPaceMinPerKm =
    durationSec != null && distanceKm > 0.05 ? durationSec / 60 / distanceKm : null;

  return {
    distanceKm,
    ascentM: Math.round(ascentM),
    descentM: Math.round(descentM),
    maxEleM: maxEle != null ? Math.round(maxEle) : null,
    minEleM: minEle != null ? Math.round(minEle) : null,
    durationSec,
    avgPaceMinPerKm,
    points: coords.length,
  };
}

/**
 * Parse a GPX file exported from a watch (Pixel Watch / Fitbit / Strava / Garmin, etc.)
 * into GeoJSON, Leaflet coordinates and summary stats.
 * @throws if the file is not valid GPX or contains no track points.
 */
export function parseGpx(text: string, fallbackName: string): ParsedTrack {
  const doc = new DOMParser().parseFromString(text, 'application/xml');
  if (doc.querySelector('parsererror')) {
    throw new Error('That file could not be read as GPX (XML parse error).');
  }
  const geojson = gpx(doc) as FeatureCollection;
  const { coords, times } = collectLineCoords(geojson);
  if (coords.length < 2) {
    throw new Error('No track points found in this GPX file.');
  }

  const named = geojson.features.find(
    (f) => typeof (f.properties as { name?: unknown } | null)?.name === 'string',
  );
  const name =
    ((named?.properties as { name?: string } | null)?.name || fallbackName).trim() || fallbackName;

  const latlngs: [number, number][] = coords.map((c) => [c[1], c[0]]);
  return { name, geojson, latlngs, stats: computeStats(coords, times) };
}

/** Re-derive Leaflet [lat, lng] pairs from a stored GeoJSON FeatureCollection. */
export function latlngsFromGeojson(fc: FeatureCollection): [number, number][] {
  const { coords } = collectLineCoords(fc);
  return coords.map((c) => [c[1], c[0]]);
}

export function formatDuration(sec: number | null): string {
  if (sec == null) return '—';
  const h = Math.floor(sec / 3600);
  const m = Math.round((sec % 3600) / 60);
  return h > 0 ? `${h} h ${m} min` : `${m} min`;
}

export function formatPace(minPerKm: number | null): string {
  if (minPerKm == null) return '—';
  const m = Math.floor(minPerKm);
  const s = Math.round((minPerKm - m) * 60);
  return `${m}:${String(s).padStart(2, '0')} /km`;
}
