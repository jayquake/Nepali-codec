import { useItinerary } from '../hooks/useItinerary';
import { itinerary } from '../data/itinerary';
import { afterTrek, afterTrekIntro, placeMapsUrl } from '../data/afterTrek';
import {
  agencyAreas,
  agencyIntro,
  arrival,
  bookingTips,
  ktmHotels,
  mapsUrl,
  permitRules2026,
  sleepIntro,
  transport,
  transportNote,
} from '../data/kathmandu';

function fmtDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export function Plan() {
  const it = useItinerary();
  const doneCount = itinerary.filter((d) => it.done[d.id]).length;

  return (
    <div className="view">
      <div className="spread" style={{ marginBottom: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>Trip plan</div>
        <div className="small muted">
          {doneCount}/{itinerary.length} days done
        </div>
      </div>

      <div className="banner banner--info">
        Day-by-day plan with real dates. Tap ✓ as each day passes and jot notes — saved on this
        device. Trek days stay in sync with the Trails stages.
      </div>

      {itinerary.map((day) => {
        const done = Boolean(it.done[day.id]);
        return (
          <div key={day.id} className={`itin itin--${day.kind}${done ? ' itin--done' : ''}`}>
            <div className="itin__date">{fmtDate(day.date)}</div>
            <div className="itin__body">
              <div className="itin__head">
                <span className="itin__title">
                  <span aria-hidden>{day.icon}</span> {day.title}
                </span>
                <label className="check" aria-label={`Mark ${day.title} done`}>
                  <input type="checkbox" checked={done} onChange={() => it.toggleDone(day.id)} />
                </label>
              </div>
              <div className="itin__detail">{day.detail}</div>
              <input
                className="itin__note"
                placeholder="Add a note…"
                value={it.notes[day.id] ?? ''}
                onChange={(e) => it.setNote(day.id, e.target.value)}
              />
            </div>
          </div>
        );
      })}

      {/* ---------- After the trek ---------- */}
      <div className="section-title">After the trek · wind-down ideas</div>
      <div className="banner banner--info">{afterTrekIntro}</div>
      {afterTrek.map((idea) => (
        <div key={idea.name} className="card" style={{ padding: '12px 14px' }}>
          <div className="spread">
            <div className="lodge__name">{idea.name}</div>
            <a
              className="badge"
              href={placeMapsUrl(idea.mapsQuery)}
              target="_blank"
              rel="noreferrer noopener"
            >
              🗺️ Map
            </a>
          </div>
          <div className="small muted" style={{ margin: '2px 0 6px' }}>
            {idea.tag}
          </div>
          <div className="stage__desc">{idea.what}</div>
          {idea.stay && (
            <div className="small muted" style={{ marginTop: 6 }}>
              🛏️ {idea.stay}
            </div>
          )}
        </div>
      ))}

      {/* ---------- Kathmandu briefing ---------- */}
      <div className="section-title">Kathmandu · arrival &amp; base</div>
      <div className="banner banner--warn">
        🛬 {arrival.flight} · {arrival.date}. {arrival.landing} {arrival.outBy}{' '}
        <b>{arrival.action}</b>
      </div>
      <div className="small muted" style={{ margin: '0 2px 10px' }}>
        {arrival.timeDiff}
      </div>

      <div className="section-title">Airport → Thamel</div>
      <div className="card">
        {transport.map((t) => (
          <div key={t.name} className="lodge">
            <div className="spread">
              <div className="lodge__name">{t.name}</div>
              {t.tag === 'best' && <span className="badge">Best</span>}
              {t.tag === 'avoid' && (
                <span className="badge" style={{ color: 'var(--danger)', borderColor: '#5a2a22' }}>
                  Avoid
                </span>
              )}
            </div>
            <div className="lodge__notes">{t.detail}</div>
          </div>
        ))}
        <div className="small muted" style={{ marginTop: 8 }}>
          {transportNote}
        </div>
      </div>

      <div className="section-title">Where to sleep · Kathmandu</div>
      <div className="banner banner--info">{sleepIntro}</div>
      <div className="card">
        {ktmHotels.map((h) => (
          <div key={h.name} className="lodge">
            <div className="spread">
              <div style={{ minWidth: 0 }}>
                <div className="lodge__name">
                  {h.name} {h.best && <span className="badge">Top pick</span>}
                </div>
                <div className="small muted">
                  {h.area}
                  {h.rating ? ` · ★ ${h.rating}${h.reviews ? ` (${h.reviews})` : ''}` : ''}
                </div>
              </div>
              <a className="badge" href={mapsUrl(h.name)} target="_blank" rel="noreferrer noopener">
                🗺️ Map
              </a>
            </div>
            <div className="lodge__notes">{h.notes}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card__title">Booking tips</div>
        <ul className="small" style={{ margin: 0, paddingLeft: 18 }}>
          {bookingTips.map((t) => (
            <li key={t} style={{ marginBottom: 4 }}>
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="section-title">Trekking agencies</div>
      <div className="banner banner--info">{agencyIntro}</div>
      <div className="card">
        {agencyAreas.map((a) => (
          <div key={a.area} className="lodge">
            <div className="lodge__name">{a.area}</div>
            <div className="lodge__notes">{a.note}</div>
          </div>
        ))}
      </div>

      <div className="section-title">Manaslu permit rules · 2026</div>
      <div className="card">
        <ul className="small" style={{ margin: 0, paddingLeft: 18 }}>
          {permitRules2026.map((r) => (
            <li key={r} style={{ marginBottom: 5 }}>
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
