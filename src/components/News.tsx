import { useEffect, useState } from 'react';
import type { AuthState } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { NEWS_CATEGORIES, newsSeed, type NewsItem } from '../data/newsSeed';

export function News({ auth }: { auth: AuthState }) {
  const [items, setItems] = useState<NewsItem[]>(newsSeed);
  const [usingSeed, setUsingSeed] = useState(true);
  const [filter, setFilter] = useState('all');
  const [composing, setComposing] = useState(false);

  const load = async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('news')
      .select('id, date, title, category, summary, source')
      .order('date', { ascending: false })
      .limit(100);
    if (!error && data && data.length > 0) {
      setItems(data as NewsItem[]);
      setUsingSeed(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shown = filter === 'all' ? items : items.filter((i) => i.category === filter);

  return (
    <div className="view">
      <div className="spread" style={{ marginBottom: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>Trek news</div>
        {auth.user && (
          <button className="btn btn--sm btn--primary" onClick={() => setComposing((c) => !c)}>
            {composing ? 'Close' : '＋ Post'}
          </button>
        )}
      </div>

      {usingSeed && (
        <div className="banner banner--info">
          Showing starter notes.{' '}
          {auth.enabled
            ? 'Sign in and tap “Post” to publish live updates for your group.'
            : 'Connect the backend (see the README) to post and share live updates.'}
        </div>
      )}

      {composing && auth.user && (
        <ComposeNews
          onPosted={() => {
            setComposing(false);
            void load();
          }}
        />
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

      {shown.length === 0 && <div className="empty">No updates in this category yet.</div>}

      {shown.map((item) => (
        <div key={item.id} className="news">
          <div className="news__meta">
            <span className="badge">{item.category}</span>
            <span className="news__date">{item.date}</span>
          </div>
          <div className="news__title">{item.title}</div>
          <div className="news__summary">{item.summary}</div>
          {item.source && <div className="small muted" style={{ marginTop: 6 }}>— {item.source}</div>}
        </div>
      ))}
    </div>
  );
}

function ComposeNews({ onPosted }: { onPosted: () => void }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('general');
  const [summary, setSummary] = useState('');
  const [source, setSource] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!supabase || !title.trim() || !summary.trim()) return;
    setSaving(true);
    setError(null);
    const { error: insErr } = await supabase.from('news').insert({
      date: new Date().toISOString().slice(0, 10),
      title: title.trim(),
      category,
      summary: summary.trim(),
      source: source.trim() || null,
    });
    setSaving(false);
    if (insErr) {
      setError(insErr.message);
      return;
    }
    onPosted();
  };

  return (
    <div className="card">
      <div className="card__title">Post an update</div>
      <div className="field">
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Larke La is clear today" />
      </div>
      <div className="field">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {NEWS_CATEGORIES.filter((c) => c !== 'all').map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label>Details</label>
        <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="What’s happening on the trail…" />
      </div>
      <div className="field">
        <label>Source (optional)</label>
        <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="Guide, agency, personal…" />
      </div>
      {error && <div className="banner banner--warn">{error}</div>}
      <button className="btn btn--primary" onClick={submit} disabled={saving || !title.trim() || !summary.trim()}>
        {saving ? 'Posting…' : 'Publish'}
      </button>
    </div>
  );
}
