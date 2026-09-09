# Manaslu Circuit Trek — Travel Companion

A mobile-first, installable **PWA** that acts as a travel companion for the
**Manaslu Circuit Trek** in Nepal. It works **offline on the trail** and, when connected
to a free Supabase backend, adds cross-device sync, live location sharing, an editable
news feed and a photo journal.

**Live site (after setup):** `https://jayquake.github.io/Nepali-codec/`

## Features

- 🗺️ **Map** — the full circuit route, village and lodge markers, and your live GPS
  position (`watchPosition`). Imported GPX tracks overlay the actual route walked.
- 🥾 **Trails** — day-by-day stages with distance, ascent/descent, elevation sparklines
  and a **done** checkbox. Progress is saved on-device and syncs when signed in.
- ⛅ **Weather** — live conditions + a 5-day forecast for key points (Samagaon, Larke La,
  Bimthang…) from **Open-Meteo** (no API key). Cached for offline viewing.
- 🛏️ **Stay** — teahouses/lodges along the route, in walking order, tappable to the map.
- 📰 **News** — a trail news feed; signed-in users post live updates from their phone.
- 📷 **Journal** — capture geotagged photos tied to your location along the trek.
- 📈 **Tracks** — import a **.gpx** file from your **Pixel Watch** (or any watch/phone)
  to see your real route, distance, elevation and pace.
- 📡 **Live sharing** — share a public link so friends and family can follow your position
  in real time.
- 📶 **Offline-first** — installable to your home screen; the app shell, trail data, lodges
  and cached map tiles keep working with no signal.

The app runs **without any backend** (offline / on-device only). Adding Supabase unlocks
the sync, sharing, news and journal features.

## Quick start (local development)

```bash
npm install
cp .env.example .env.local   # optional: fill in Supabase values to enable the backend
npm run dev
```

Open the printed URL. Without `.env.local`, the app runs in offline/on-device mode.

Build a production bundle:

```bash
npm run build
npm run preview
```

## Backend setup (Supabase) — optional but recommended

1. Create a free project at [supabase.com](https://supabase.com).
2. **SQL Editor → New query**, paste the contents of [`supabase/schema.sql`](supabase/schema.sql)
   and **Run**. This creates the tables, Row Level Security policies, the `photos`
   storage bucket and the live-tracking function.
3. **Project Settings → API**: copy the **Project URL** and the **anon public** key into
   `.env.local`:
   ```
   VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR-ANON-KEY
   ```
4. **Authentication → URL Configuration**: add your site URL
   (`https://jayquake.github.io/Nepali-codec/`) and `http://localhost:5173/` to the
   **Redirect URLs** so the magic-link sign-in returns to the app.

> The anon key is **public by design** — Row Level Security in `schema.sql` is what
> protects the data — so it is safe to ship in this static site.

## Deploying to GitHub Pages

Deployment is automated by [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

1. **Settings → Secrets and variables → Actions → Variables** — add two repository
   **variables** (not secrets), so the build can talk to Supabase:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

   (Skip this to deploy the offline-only version.)
2. **Settings → Pages** — set **Source = GitHub Actions**.
3. Push to the default branch. The workflow builds and publishes to
   `https://jayquake.github.io/Nepali-codec/`.

## Editing the trek content

All content lives in plain, well-commented files:

- `src/data/trail.ts` — route waypoints, stages, distances, elevations, permits.
- `src/data/lodges.ts` — teahouses / places to stay.
- `src/data/weatherPoints.ts` — points shown on the Weather tab.
- `src/data/newsSeed.ts` — starter news shown before/without the backend.

## Tech

Vite · React · TypeScript · Leaflet (OpenStreetMap) · Open-Meteo · Supabase ·
vite-plugin-pwa (Workbox). No paid API keys.

## ⚠️ Safety

Coordinates and elevations are **approximate**, for planning and mapping only — **not**
turn-by-turn navigation. The Manaslu Circuit is a restricted area: a licensed guide and
the RAP + MCAP + ACAP permits are mandatory. Acclimatise properly, carry an offline topo
map and a GPS device, and get insurance that covers high-altitude helicopter evacuation.
