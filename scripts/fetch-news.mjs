// Fetches current Manaslu / Nepal-trekking headlines from RSS and writes them to
// public/news.json. Run by .github/workflows/news.yml on a schedule — no backend,
// no secrets, no Supabase needed. Node 18+ (built-in fetch), zero dependencies.

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';

const FEEDS = [
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

const RELEVANT =
  /manaslu|larke|larkya|tsum|samagaon|samdo|dharapani|soti\s*khola|budhi\s*gandaki|gorkha|nepal trek|trekking permit|restricted area/i;

function stripHtml(s) {
  return s
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
    // Decode entities FIRST, then strip tags, so HTML-encoded markup
    // (e.g. &lt;a&gt;) doesn't survive as literal text.
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function pick(chunk, tag) {
  const m = chunk.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return m ? stripHtml(m[1]) : '';
}

function categorize(text, fallback) {
  if (/permit|visa|tims|restricted area/i.test(text)) return 'permits';
  if (/weather|snow|avalanche|storm|rain|flood|landslide|blizzard/i.test(text)) return 'weather';
  if (/rescue|death|accident|missing|injur|warning|closed|safety/i.test(text)) return 'safety';
  if (/manaslu|larke|trail|route|pass|circuit|trek/i.test(text)) return 'route';
  return fallback;
}

function hashId(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return `n${h.toString(36)}`;
}

function parseFeed(xml, fallbackCategory) {
  const out = [];
  const blocks = xml.split(/<item>/i).slice(1);
  for (const raw of blocks) {
    const chunk = raw.split(/<\/item>/i)[0];
    let title = pick(chunk, 'title');
    const link = pick(chunk, 'link');
    const pub = pick(chunk, 'pubDate');

    // Google News titles end with " - Publisher"; move that into `source` and
    // drop it from the title. Its <description> is just the linked headline, so
    // we don't use it as a summary.
    let source = pick(chunk, 'source');
    if (title.includes(' - ')) {
      const idx = title.lastIndexOf(' - ');
      const tail = title.slice(idx + 3).trim();
      if (tail) {
        if (!source) source = tail;
        title = title.slice(0, idx).trim();
      }
    }
    const summary = '';
    if (!title || !link) continue;
    if (!RELEVANT.test(title)) continue;

    let date = new Date().toISOString().slice(0, 10);
    const t = Date.parse(pub);
    if (!Number.isNaN(t)) date = new Date(t).toISOString().slice(0, 10);

    out.push({
      id: hashId(link),
      date,
      title,
      category: categorize(`${title} ${summary}`, fallbackCategory),
      summary,
      source: source || 'News',
      link,
    });
  }
  return out;
}

async function main() {
  const collected = [];
  for (const feed of FEEDS) {
    try {
      const res = await fetch(feed.url, {
        headers: { 'User-Agent': 'ManasluTrekCompanion/1.0 (+github pages)' },
      });
      if (!res.ok) {
        console.warn(`feed ${feed.url} -> ${res.status}`);
        continue;
      }
      const xml = await res.text();
      collected.push(...parseFeed(xml, feed.category));
    } catch (e) {
      console.warn(`feed failed: ${feed.url}`, e.message);
    }
  }

  const byLink = new Map();
  for (const it of collected) if (!byLink.has(it.link)) byLink.set(it.link, it);
  const items = Array.from(byLink.values())
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 40);

  mkdirSync('public', { recursive: true });
  const payload = { updated: new Date().toISOString(), items };
  const path = 'public/news.json';

  // Only rewrite if the item set actually changed (avoids empty churn commits).
  let prevItems = '';
  if (existsSync(path)) {
    try {
      prevItems = JSON.stringify(JSON.parse(readFileSync(path, 'utf8')).items ?? []);
    } catch {
      /* ignore */
    }
  }
  if (JSON.stringify(items) === prevItems) {
    console.log(`No change (${items.length} items). Skipping write.`);
    return;
  }
  writeFileSync(path, JSON.stringify(payload, null, 2));
  console.log(`Wrote ${items.length} items to ${path}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
