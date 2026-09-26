// One-time offline map tile pack for the Manaslu corridor.
//
// Downloads OSM raster tiles for the route bounding box at z9-z12 into
// public/tiles/{z}/{x}/{y}.png. These are precached by the service worker, so the
// map works with NO signal at any zoom (Leaflet upscales past z12).
//
// Deliberately small (~100 tiles) and rate-limited: this is a single trek
// corridor for personal offline use, not a bulk scrape. OSM tiles are
// © OpenStreetMap contributors (ODbL) and the map keeps its attribution.
//
// Run: node scripts/fetch-tiles.mjs

import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../public/tiles');
const [W, E, S, N] = [84.30, 84.98, 28.18, 28.72];
const ZMIN = 9, ZMAX = 12;
const UA = 'manaslu-trek-companion/1.0 (personal offline trek map; github.com/jayquake/Nepali-codec)';

const lon2x = (l, z) => Math.floor(((l + 180) / 360) * 2 ** z);
const lat2y = (l, z) =>
  Math.floor(((1 - Math.log(Math.tan((l * Math.PI) / 180) + 1 / Math.cos((l * Math.PI) / 180)) / Math.PI) / 2) * 2 ** z);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let got = 0, skipped = 0, failed = 0, bytes = 0;

for (let z = ZMIN; z <= ZMAX; z++) {
  const x0 = lon2x(W, z), x1 = lon2x(E, z);
  const y0 = lat2y(N, z), y1 = lat2y(S, z);
  for (let x = x0; x <= x1; x++) {
    for (let y = y0; y <= y1; y++) {
      const file = `${OUT}/${z}/${x}/${y}.png`;
      try { await access(file); skipped++; continue; } catch { /* not cached yet */ }
      const url = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
      try {
        const res = await fetch(url, { headers: { 'User-Agent': UA } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf = Buffer.from(await res.arrayBuffer());
        await mkdir(dirname(file), { recursive: true });
        await writeFile(file, buf);
        got++; bytes += buf.length;
      } catch (e) {
        failed++;
        console.warn(`✗ ${z}/${x}/${y}: ${e.message}`);
      }
      await sleep(120); // be polite
    }
  }
  console.log(`z${z} done`);
}
console.log(`\ndownloaded ${got}, skipped ${skipped}, failed ${failed}, ${(bytes / 1024 / 1024).toFixed(2)} MB`);
