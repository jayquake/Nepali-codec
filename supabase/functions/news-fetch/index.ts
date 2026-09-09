// Supabase Edge Function: news-fetch
//
// Pulls current Manaslu / Nepal-trekking headlines from RSS (Google News search +
// Nepal outlets), filters to on-topic items, and upserts them into the public
// `news` table. Runs server-side, so there are no browser CORS limits.
//
// Deploy:   supabase functions deploy news-fetch
//   (or paste this file in Dashboard → Edge Functions → new function → Deploy)
// Schedule: see supabase/news-auto.sql (or Dashboard → Integrations → Cron).
//
// It authenticates writes with the service-role key that Supabase injects
// automatically — no secret is exposed to the browser.

import { createClient } from 'npm:@supabase/supabase-js@2.45.4';

interface Feed {
  url: string;
  category: string;
}

// Google News RSS search is the workhorse: it aggregates current coverage matching
// each query. Add or edit queries/outlets freely.
const FEEDS: Feed[] = [
  {
    url: 'https://news.google.com/rss/search?q=%22Manaslu%22%20(trek%20OR%20trekking%20OR%20circuit)&hl=en-US&gl=US&ceid=US:en',
    category: 'route',
  },
  {
    url: 'https://news.google.com/rss/search?q=Nepal%20(trekking%20OR%20trek)%20(permit%20OR%20TIMS%20OR%20%22restricted%20area%22)&hl=en-US&gl=US&ceid=US:en',
    category: 'permits',
  },
  {
    url: 'https://news.google.com/rss/search?q=Nepal%20(trek%20OR%20Himalaya)%20(weather%20OR%20snow%20OR%20avalanche%20OR%20landslide%20OR%20flood)&hl=en-US&gl=US&ceid=US:en',
    category: 'weather',
  },
];

// Only keep items that look relevant to this trek / region.
const RELEVANT =
  /manaslu|larke|larkya|tsum|samagaon|samdo|dharapani|soti\s*khola|budhi\s*gandaki|gorkha|nepal trek|trekking permit|restricted area/i;

function stripHtml(s: string): string {
  return s
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function pick(chunk: string, tag: string): string {
  const m = chunk.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return m ? stripHtml(m[1]) : '';
}

interface ParsedItem {
  title: string;
  link: string;
  date: string;
  summary: string;
  source: string;
}

function categorize(text: string, fallback: string): string {
  if (/permit|visa|tims|restricted area/i.test(text)) return 'permits';
  if (/weather|snow|avalanche|storm|rain|flood|landslide|blizzard/i.test(text)) return 'weather';
  if (/rescue|death|accident|missing|injur|warning|closed|safety/i.test(text)) return 'safety';
  if (/manaslu|larke|trail|route|pass|circuit|trek/i.test(text)) return 'route';
  return fallback;
}

function parseFeed(xml: string, fallbackCategory: string): ParsedItem[] {
  const out: ParsedItem[] = [];
  const blocks = xml.split(/<item>/i).slice(1);
  for (const raw of blocks) {
    const chunk = raw.split(/<\/item>/i)[0];
    let title = pick(chunk, 'title');
    const link = pick(chunk, 'link');
    const pub = pick(chunk, 'pubDate');
    const summary = pick(chunk, 'description').slice(0, 320);

    // Google News formats titles as "Headline - Publisher"; split the source out.
    let source = pick(chunk, 'source');
    if (!source && title.includes(' - ')) {
      const idx = title.lastIndexOf(' - ');
      source = title.slice(idx + 3).trim();
      title = title.slice(0, idx).trim();
    }

    if (!title || !link) continue;
    if (!RELEVANT.test(`${title} ${summary}`)) continue;

    let date = new Date().toISOString().slice(0, 10);
    const t = Date.parse(pub);
    if (!Number.isNaN(t)) date = new Date(t).toISOString().slice(0, 10);

    out.push({
      title,
      link,
      date,
      summary,
      source: source || 'News',
    });
  }
  return out;
}

Deno.serve(async (req) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, content-type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  };
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const collected: ParsedItem[] = [];
  for (const feed of FEEDS) {
    try {
      const res = await fetch(feed.url, {
        headers: { 'User-Agent': 'ManasluTrekCompanion/1.0 (+github pages)' },
      });
      if (!res.ok) continue;
      const xml = await res.text();
      collected.push(...parseFeed(xml, feed.category));
    } catch (_e) {
      // Skip a feed that fails; keep going.
    }
  }

  // De-dupe by link, keep newest ~50.
  const byLink = new Map<string, ParsedItem>();
  for (const it of collected) if (!byLink.has(it.link)) byLink.set(it.link, it);
  const items = Array.from(byLink.values())
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 50);

  const rows = items.map((it) => ({
    link: it.link,
    date: it.date,
    title: it.title,
    category: categorize(`${it.title} ${it.summary}`, 'route'),
    summary: it.summary,
    source: it.source,
  }));

  let upserted = 0;
  if (rows.length) {
    const { error, count } = await supabase
      .from('news')
      .upsert(rows, { onConflict: 'link', ignoreDuplicates: true, count: 'exact' });
    if (error) {
      return new Response(JSON.stringify({ ok: false, error: error.message }), {
        status: 500,
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }
    upserted = count ?? rows.length;
  }

  return new Response(JSON.stringify({ ok: true, fetched: items.length, upserted }), {
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
});
