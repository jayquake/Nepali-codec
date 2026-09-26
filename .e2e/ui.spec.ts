import { test, expect, Page } from '@playwright/test';

/**
 * UI validation for the Manaslu trek companion, focused on the data most likely to
 * regress: OSM village coordinates, measured stage distances, and the dense
 * along-trail elevation profiles.
 *
 * Playwright is intentionally NOT a devDependency — adding it would make the
 * GitHub Pages deploy run a browser download on every `npm ci`. To run these:
 *
 *   PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install --no-save @playwright/test
 *   npm run build && npm run preview &
 *   npx playwright test --config=.e2e/playwright.config.ts
 */

const consoleErrors: string[] = [];

async function open(page: Page, tab?: string) {
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text());
  });
  page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`));
  await page.goto('./', { waitUntil: 'networkidle' });
  if (tab) await page.getByRole('button', { name: new RegExp(`^${tab}$`) }).click();
}

test('app shell + all nav tabs render', async ({ page }) => {
  await open(page);
  await expect(page.getByText('Manaslu Circuit Trek')).toBeVisible();
  for (const t of ['Map', 'Trails', 'Plan', 'Weather', 'Stay', 'Prep', 'News', 'Journal', 'Tracks']) {
    await expect(page.getByRole('button', { name: new RegExp(`^${t}$`) })).toBeVisible();
  }
});

test('Trails: 11 stages, real dates, measured distances', async ({ page }) => {
  await open(page, 'Trails');

  // One card per walking stage + the acclimatisation day.
  const stages = page.locator('.stage');
  await expect(stages).toHaveCount(11);

  // The on-trail itinerary change and its measured distance.
  const ghapLihi = page.locator('.stage', { hasText: 'Ghap → Lihi' });
  await expect(ghapLihi).toBeVisible();
  await expect(ghapLihi).toContainText('Tue, Sep 22');
  await expect(ghapLihi).toContainText('10.7 km'); // matches Organic Maps' 11 km
  await expect(ghapLihi).toContainText('start 2,160 m');
  await expect(ghapLihi).toContainText('end 2,920 m');

  // Flexible overnight stage.
  await expect(page.locator('.stage', { hasText: 'Lihi → Shyala' }).first()).toBeVisible();
  await expect(page.locator('.stage', { hasText: 'Shyala → Sama Gaun' })).toBeVisible();
  // Rest day has no distance chip but is present.
  await expect(page.locator('.stage', { hasText: 'Sama Gaun (acclimatisation)' })).toBeVisible();
  // Pass day.
  await expect(page.locator('.stage', { hasText: 'Larke' }).first()).toBeVisible();
});

test('Trails: elevation graphs are dense real profiles, not straight ramps', async ({ page }) => {
  await open(page, 'Trails');
  // Wait for the tab content to mount before counting.
  await expect(page.locator('.stage').first()).toBeVisible();
  await expect(page.locator('.stage svg.spark polyline').first()).toBeVisible();

  const sparks = page.locator('.stage svg.spark polyline');
  const count = await sparks.count();
  expect(count).toBeGreaterThanOrEqual(10); // one per walking stage

  // Every profile should have many points (real SRTM sampling), not 3-4 waypoints.
  const pointCounts: number[] = [];
  for (let i = 0; i < count; i++) {
    const pts = (await sparks.nth(i).getAttribute('points')) ?? '';
    pointCounts.push(pts.trim().split(/\s+/).length);
  }
  console.log('elevation profile point counts:', pointCounts.join(', '));
  for (const n of pointCounts) expect(n).toBeGreaterThanOrEqual(16);
});

test('Map: renders tiles, route polyline and village markers', async ({ page }) => {
  await open(page, 'Map');
  await expect(page.locator('.leaflet-container')).toBeVisible();
  await page.waitForSelector('.leaflet-overlay-pane path', { timeout: 15_000 });

  // Leaflet simplifies polylines for rendering at low zoom, so the whole-route view
  // legitimately draws far fewer vertices than the underlying geometry holds.
  const d = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.leaflet-overlay-pane path')).map(
      (p) => (p.getAttribute('d') || '').split(/[ML]/).length - 1,
    ),
  );
  console.log('map paths:', d.length, '| route vertices:', Math.max(...d));
  // Still well beyond a straight line through a handful of waypoints.
  expect(Math.max(...d)).toBeGreaterThan(30);

  // Leaflet draws CircleMarker as <path> (not <circle>): village pins are the
  // many 1-2 vertex paths alongside the single long route path.
  const villagePins = d.filter((n) => n <= 2).length;
  console.log('village marker paths:', villagePins);
  expect(villagePins).toBeGreaterThanOrEqual(5);

  // Lodge markers use divIcons in the marker pane.
  expect(await page.locator('.lodge-pin').count()).toBeGreaterThanOrEqual(5);
});

test('View route: stage highlight carries dense trail-snapped geometry', async ({ page }) => {
  await open(page, 'Trails');
  const ghapLihi = page.locator('.stage', { hasText: 'Ghap → Lihi' });
  await ghapLihi.getByRole('button', { name: /View route/ }).click();

  // Switches to the map and fits to that stage.
  await expect(page.locator('.leaflet-container')).toBeVisible();
  await page.waitForTimeout(1500); // fitBounds animation

  const d = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.leaflet-overlay-pane path')).map(
      (p) => (p.getAttribute('d') || '').split(/[ML]/).length - 1,
    ),
  );
  console.log('stage highlight vertex counts:', d.slice(0, 5).join(', '));
  // At stage zoom the snapped line should render many vertices (not ~3 waypoints).
  expect(Math.max(...d)).toBeGreaterThan(60);
});

test('Weather: all stops listed incl. new ones, detail sheet opens', async ({ page }) => {
  await open(page, 'Weather');
  for (const place of ['Kathmandu', 'Ghap', 'Lihi', 'Shyala', 'Sama Gaun', 'Larke La (pass)']) {
    await expect(page.getByText(place, { exact: false }).first()).toBeVisible();
  }
  // Tap a location -> 7-day detail sheet.
  await page.locator('button.wx', { hasText: 'Lihi' }).first().click();
  await expect(page.locator('.sheet')).toBeVisible();
});

test('Plan: segmented control switches sections incl. Cash tracker', async ({ page }) => {
  await open(page, 'Plan');
  for (const seg of ['Days', 'After', 'KTM', 'Cash']) {
    await expect(page.getByRole('button', { name: new RegExp(seg) }).first()).toBeVisible();
  }
  await page.getByRole('button', { name: /Cash/ }).first().click();
  // Defaults to the estimate view...
  await expect(page.getByRole('button', { name: 'Estimate' })).toBeVisible();
  await expect(page.getByText(/Cash budget · per person/)).toBeVisible();
  // ...with the live tracker behind the "Spending log" chip.
  await page.getByRole('button', { name: 'Spending log' }).click();
  await expect(page.getByText('Taken out')).toBeVisible();
  await expect(page.getByRole('button', { name: /Add expense/ })).toBeVisible();
});

test('mobile layout: no horizontal overflow on any tab', async ({ page }) => {
  await open(page);
  for (const tab of ['Map', 'Trails', 'Plan', 'Weather', 'Stay', 'Prep', 'News', 'Journal', 'Tracks']) {
    await page.getByRole('button', { name: new RegExp(`^${tab}$`) }).click();
    await page.waitForTimeout(350);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `${tab} tab overflows horizontally by ${overflow}px`).toBeLessThanOrEqual(1);
  }
});

test('no console errors during a full tab sweep', async ({ page }) => {
  await open(page);
  for (const tab of ['Map', 'Trails', 'Plan', 'Weather', 'Stay', 'Prep', 'News', 'Journal', 'Tracks']) {
    await page.getByRole('button', { name: new RegExp(`^${tab}$`) }).click();
    await page.waitForTimeout(300);
  }
  const ignorable = /favicon|manifest|sw\.js|tile\.openstreetmap|Failed to load resource/i;
  const real = consoleErrors.filter((e) => !ignorable.test(e));
  console.log('console errors (filtered):', real);
  expect(real).toEqual([]);
});

// The test browser has no proxy, so external hosts (OSM tiles, Open-Meteo) are
// unreachable — i.e. it behaves exactly like a phone with no signal.

test('offline: map tiles still render after zooming in', async ({ page }) => {
  await open(page, 'Map');
  await page.waitForSelector('.leaflet-tile', { timeout: 15_000 });
  for (let i = 0; i < 3; i++) {
    await page.mouse.dblclick(200, 400);
    await page.waitForTimeout(1000);
  }
  const t = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img.leaflet-tile'));
    return { total: imgs.length, loaded: imgs.filter((i) => (i as HTMLImageElement).naturalWidth > 0).length };
  });
  console.log('offline tiles after zoom:', JSON.stringify(t));
  expect(t.total).toBeGreaterThan(0);
  // Every tile must paint from the bundled pack — no blank map.
  expect(t.loaded).toBe(t.total);
});

test('offline: weather shows a real forecast with no live fetch', async ({ page }) => {
  await open(page, 'Weather');
  await expect(page.locator('.wx').first()).toBeVisible();
  // Falls back to the baked snapshot and says so.
  await expect(page.getByText(/Offline —/)).toBeVisible();
  // Real values, not empty placeholders.
  const body = await page.locator('.view').first().innerText();
  expect(body).toMatch(/\d+°/);
  await page.locator('button.wx', { hasText: 'Sama Gaun' }).first().click();
  await expect(page.locator('.sheet')).toBeVisible();
  const sheet = await page.locator('.sheet').innerText();
  expect(sheet).toMatch(/\d+°/);
});
