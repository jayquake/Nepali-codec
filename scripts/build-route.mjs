// One-time route/graph builder.
//
// Bakes two things into src/data/routeGeometry.generated.ts per stage, so the map
// route and the elevation graphs improve while the app stays fully offline (nothing
// is fetched at runtime):
//
//   1. line  — a trail-snapped polyline from the BRouter public server (OSM foot
//              paths). Horizontal geometry only; endpoints snap to the real trail.
//              Falls back to a densified straight waypoint line (e.g. over Larke La,
//              where the high pass has no routable OSM way).
//
//   2. elev  — a smooth elevation profile interpolated from the CURATED waypoint
//              elevations in trail.ts, weighted by inter-waypoint distance.
//              We deliberately DO NOT use DEM/SRTM elevation here: in the deep
//              Budhi Gandaki gorge, 90 m elevation grids read the canyon walls, not
//              the trail floor (e.g. Jagat, really ~1,340 m, reads ~2,800–3,200 m).
//              The curated village elevations are guidebook/GPS-accurate, so the
//              graph is built from those. (Your watch GPX remains the real profile.)
//
// Run:  node scripts/build-route.mjs
// Re-run whenever the waypoints in src/data/trail.ts change.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TRAIL = resolve(__dirname, '../src/data/trail.ts');
const OUT = resolve(__dirname, '../src/data/routeGeometry.generated.ts');

const BROUTER = 'https://brouter.de/brouter';
const PROFILE = 'trekking';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const toRad = (d) => (d * Math.PI) / 180;
function havKm(a, b) {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}
/** Straight-line distance through the ordered waypoints, km. */
function pathStraightKm(waypoints) {
  let d = 0;
  for (let i = 1; i < waypoints.length; i++) d += havKm(waypoints[i - 1], waypoints[i]);
  return d;
}

/** Extract stages (id + ordered waypoints) from the trail.ts source. */
async function parseStages() {
  const src = await readFile(TRAIL, 'utf8');
  const stages = [];
  // Split on each stage id marker.
  const parts = src.split(/id:\s*'(stage-\d+)'/g);
  // parts = [prefix, id1, body1, id2, body2, ...]
  for (let i = 1; i < parts.length; i += 2) {
    const id = parts[i];
    const body = parts[i + 1] || '';
    // Only the waypoints array of THIS stage (up to the next `],`).
    const wpBlock = body.slice(body.indexOf('waypoints:'));
    const wps = [];
    const re = /lat:\s*([\d.-]+),\s*lng:\s*([\d.-]+),\s*ele:\s*([\d.-]+)/g;
    let m;
    while ((m = re.exec(wpBlock))) {
      wps.push({ lat: parseFloat(m[1]), lng: parseFloat(m[2]), ele: parseFloat(m[3]) });
      // Stop if we run past this stage's waypoint list into the next stage.
      if (wpBlock.slice(0, m.index).split('],').length > 1) break;
    }
    stages.push({ id, waypoints: wps });
  }
  return stages;
}

/** Resample an array to k evenly-indexed samples (smooths SRTM noise). */
function resample(arr, k) {
  if (arr.length <= k) return arr.slice();
  const out = [];
  for (let i = 0; i < k; i++) {
    out.push(arr[Math.round((i * (arr.length - 1)) / (k - 1))]);
  }
  return out;
}

async function brouter(waypoints) {
  const lonlats = waypoints.map((w) => `${w.lng},${w.lat}`).join('|');
  const url = `${BROUTER}?lonlats=${lonlats}&profile=${PROFILE}&alternativeidx=0&format=geojson`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`BRouter HTTP ${res.status}`);
  const gj = await res.json();
  const feat = gj?.features?.[0];
  const coords = feat?.geometry?.coordinates;
  if (!Array.isArray(coords) || coords.length < 2) throw new Error('BRouter: empty geometry');
  const lengthM = parseFloat(feat.properties?.['track-length'] ?? '0');
  // Sanity check: reject a wildly long detour (e.g. no mapped footpath over a high
  // pass, so BRouter loops around the whole massif). Real hiking trail vs. straight
  // line is well under ~2.8x; anything past that is bogus.
  const straightKm = pathStraightKm(waypoints);
  if (straightKm > 0 && lengthM / 1000 > straightKm * 2.8) {
    throw new Error(
      `implausible length ${(lengthM / 1000).toFixed(1)} km vs ${straightKm.toFixed(1)} km straight`,
    );
  }
  // Horizontal geometry only (elevation from these coords is unreliable in the gorge).
  const line = coords.map((c) => [c[1], c[0]]); // [lon,lat,ele] -> [lat, lng]
  return { line, lengthM, source: 'brouter' };
}

/**
 * Smooth elevation profile from the CURATED waypoint elevations, sampled ~k points,
 * spaced by the straight-line distance between consecutive waypoints (so climbs sit
 * at the right place along the stage). Endpoints and each named village hit their
 * true, guidebook-accurate elevation — no DEM involved.
 */
function interpProfile(waypoints, k) {
  const segKm = [];
  let total = 0;
  for (let i = 1; i < waypoints.length; i++) {
    const d = havKm(waypoints[i - 1], waypoints[i]) || 0.001;
    segKm.push(d);
    total += d;
  }
  const out = [];
  for (let s = 0; s < k; s++) {
    const target = (s / (k - 1)) * total; // km along the stage
    let acc = 0;
    let e = waypoints[waypoints.length - 1].ele;
    for (let i = 0; i < segKm.length; i++) {
      if (target <= acc + segKm[i] || i === segKm.length - 1) {
        const t = Math.min(1, Math.max(0, (target - acc) / segKm[i]));
        e = waypoints[i].ele + (waypoints[i + 1].ele - waypoints[i].ele) * t;
        break;
      }
      acc += segKm[i];
    }
    out.push(Math.round(e));
  }
  return out;
}

/** Densify a waypoint polyline so the fallback elevation query has enough points. */
function densify(waypoints, stepKm = 0.5) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const hav = (a, b) => {
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const s =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(s));
  };
  const out = [];
  for (let i = 0; i < waypoints.length - 1; i++) {
    const a = waypoints[i];
    const b = waypoints[i + 1];
    const dist = hav(a, b);
    const n = Math.max(1, Math.round(dist / stepKm));
    for (let j = 0; j < n; j++) {
      const t = j / n;
      out.push({ lat: a.lat + (b.lat - a.lat) * t, lng: a.lng + (b.lng - a.lng) * t });
    }
  }
  out.push({ lat: waypoints.at(-1).lat, lng: waypoints.at(-1).lng });
  return out;
}

async function main() {
  const stages = await parseStages();
  const result = {};

  for (const stage of stages) {
    if (stage.waypoints.length < 2) {
      // Rest / acclimatisation day — no route.
      continue;
    }
    let data;
    try {
      data = await brouter(stage.waypoints);
      console.log(`✓ ${stage.id}  BRouter  ${data.line.length} pts  ${(data.lengthM / 1000).toFixed(1)} km`);
    } catch (e) {
      console.warn(`… ${stage.id}  BRouter unusable (${e.message}) — straight waypoint line`);
      data = { line: densify(stage.waypoints).map((p) => [p.lat, p.lng]), lengthM: 0, source: 'waypoints' };
    }

    // Map line: keep it detailed but capped for bundle size.
    const line = resample(data.line, Math.min(data.line.length, 120));
    const lengthKm = data.lengthM ? data.lengthM / 1000 : null;
    // Elevation graph from curated village elevations — ~1 sample per 500 m of trail.
    const k = Math.min(48, Math.max(12, Math.round((lengthKm || pathStraightKm(stage.waypoints)) * 2)));
    const elev = interpProfile(stage.waypoints, k);

    result[stage.id] = {
      line: line.map(([a, b]) => [Number(a.toFixed(5)), Number(b.toFixed(5))]),
      elev,
      distanceKm: lengthKm ? Number(lengthKm.toFixed(1)) : null,
      lineSource: data.source,
    };

    if (data.source === 'brouter') await sleep(1500); // be polite to the public server
  }

  const header = `// AUTO-GENERATED by scripts/build-route.mjs — do not edit by hand.
// Per-stage trail-snapped map line + smooth elevation graph. Regenerate:
//   node scripts/build-route.mjs

export interface StageGeom {
  /** Trail-snapped route polyline (OSM foot paths), [lat, lng] pairs. */
  line: [number, number][];
  /** Elevation profile (metres) for the stage graph, from curated village elevations. */
  elev: number[];
  /** Real trail distance in km from routing (null when the straight fallback was used). */
  distanceKm: number | null;
  /** 'brouter' = OSM trail-snapped line, 'waypoints' = straight fallback (e.g. Larke La). */
  lineSource: 'brouter' | 'waypoints';
}

export const routeGeometry: Record<string, StageGeom> = ${JSON.stringify(result, null, 2)};
`;

  await writeFile(OUT, header, 'utf8');
  console.log(`\nWrote ${OUT} (${Object.keys(result).length} stages).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
