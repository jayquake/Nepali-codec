import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Project GitHub Pages are served from https://<user>.github.io/<repo>/,
// so the app must be built with the repo name as the base path.
const BASE = '/Nepali-codec/';

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon.svg', 'icons/maskable.svg'],
      manifest: {
        name: 'Manaslu Circuit Trek Companion',
        short_name: 'Manaslu Trek',
        description:
          'Offline-first travel companion for the Manaslu Circuit Trek: trails, live map, weather, lodges, news, photo journal and GPX tracks.',
        theme_color: '#1b4332',
        background_color: '#0b1f17',
        display: 'standalone',
        orientation: 'portrait',
        start_url: BASE,
        scope: BASE,
        icons: [
          { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml' },
          {
            src: 'icons/maskable.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,woff2}'],
        navigateFallbackDenylist: [/^\/track\//],
        runtimeCaching: [
          {
            // OpenStreetMap raster tiles — cache so the map works offline on the trail.
            urlPattern: ({ url }) => url.host.endsWith('tile.openstreetmap.org'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'osm-tiles',
              expiration: { maxEntries: 2000, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Open-Meteo forecasts — fresh when online, last-known when offline.
            urlPattern: ({ url }) => url.host.endsWith('api.open-meteo.com'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'open-meteo',
              networkTimeoutSeconds: 6,
              expiration: { maxEntries: 64, maxAgeSeconds: 60 * 60 * 6 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
});
