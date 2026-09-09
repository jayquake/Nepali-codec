import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { NEWS_CATEGORIES, newsSeed, type NewsItem } from '../data/newsSeed';
import { InstagramStrip } from './InstagramStrip';

export function News() {
  const [items, setItems] = useState<NewsItem[]>(newsSeed);
  const [usingSeed, setUsingSeed] = useState(true);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    setLoading(true);
    supabase
      .from('news')
      .select('id, date, title, category, summary, source, link')
      .order('date', { ascending: false })
      .limit(100)
      .then(({ data, error }) => {
        if (!active) return;
        if (!error && data && data.length > 0) {
          setItems(data as NewsItem[]);
          setUsingSeed(false);
        }
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const shown = filter === 'all' ? items : items.filter((i) => i.category === filter);

  return (
    <div className="view">
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Trek news</div>

      <InstagramStrip />

      {usingSeed && (
        <div className="banner banner--info">
          {supabase
            ? 'Live Manaslu & Nepal-trekking headlines appear here once the news fetcher runs (see supabase/ setup). Showing starter notes until then.'
            : 'Connect the backend to see live, auto-updated headlines.'}
        </div>
      )}

      <div className="chips">
        {NEWS_CATEGORIES.map((c) => (
          <button
            key={c}
            className={`chip${filter === c ? ' chip--active' : ''}`}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {loading && <div className="spinner">Loading headlines…</div>}
      {!loading && shown.length === 0 && (
        <div className="empty">No updates in this category yet.</div>
      )}

      {shown.map((item) => (
        <div key={item.id} className="news">
          <div className="news__meta">
            <span className="badge">{item.category}</span>
            <span className="news__date">{item.date}</span>
          </div>
          <div className="news__title">{item.title}</div>
          {item.summary && <div className="news__summary">{item.summary}</div>}
          <div className="small muted" style={{ marginTop: 6, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {item.source && <span>— {item.source}</span>}
            {item.link && (
              <a href={item.link} target="_blank" rel="noreferrer noopener">
                Read more →
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
