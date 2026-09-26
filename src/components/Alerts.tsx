import { useState } from 'react';
import { alerts, type AlertLevel, type SavedArticle } from '../data/alerts';
import { EXIT_AS_OF, exitRoutes, roadStatus, stuckChecklist } from '../data/exitRoutes';
import { FLIGHTS_FETCHED, flightRoutes, rebookingNotes } from '../data/flights';
import {
  EMERGENCY_AS_OF,
  emergencyContacts,
  evacuationSteps,
  insuranceNotes,
  yourLocation,
} from '../data/emergency';
import { emailTemplates, type EmailTemplate } from '../data/emailTemplates';

type Section = 'alerts' | 'exit' | 'sos' | 'flights';

/** Copy button that degrades gracefully when the clipboard API is unavailable. */
function CopyBtn({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      className="btn btn--sm btn--primary"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); } catch { /* nothing else to try */ }
          document.body.removeChild(ta);
        }
        setDone(true);
        setTimeout(() => setDone(false), 1800);
      }}
    >
      {done ? '✓ Copied' : `📋 ${label}`}
    </button>
  );
}

function TemplateCard({ t }: { t: EmailTemplate }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card">
      <div className="card__title">{t.title}</div>
      <p className="small" style={{ marginTop: 0 }}>{t.blurb}</p>
      <div className="small muted" style={{ marginBottom: 2 }}>To: <b>{t.to}</b></div>
      <div className="small muted" style={{ marginBottom: 8 }}>Subject: {t.subject}</div>
      <div className="row" style={{ flexWrap: 'wrap' }}>
        <CopyBtn text={t.body} label="Copy email" />
        <a
          className="btn btn--sm"
          href={`mailto:${t.to}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(t.body)}`}
        >
          ✉️ Open in mail
        </a>
        <button className="btn btn--sm btn--ghost" onClick={() => setOpen((o) => !o)}>
          {open ? 'Hide text' : 'Show text'}
        </button>
      </div>
      {open && <pre className="tmpl">{t.body}</pre>}
      <div className="section-title" style={{ marginTop: 10 }}>Before you send</div>
      <ul className="small" style={{ paddingLeft: 18, margin: 0 }}>
        {t.tips.map((x, i) => <li key={i} style={{ marginBottom: 5 }}>{x}</li>)}
      </ul>
    </div>
  );
}

const levelClass: Record<AlertLevel, string> = {
  critical: 'lvl lvl--critical',
  warning: 'lvl lvl--warning',
  info: 'lvl lvl--info',
};
const levelLabel: Record<AlertLevel, string> = {
  critical: '🚨 Critical',
  warning: '⚠️ Warning',
  info: 'ℹ️ Info',
};
const statusClass: Record<string, string> = {
  blocked: 'lvl lvl--critical',
  restricted: 'lvl lvl--warning',
  caution: 'lvl lvl--warning',
  open: 'lvl lvl--ok',
  unknown: 'lvl lvl--info',
};

function fmt(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export function Alerts() {
  const [section, setSection] = useState<Section>('alerts');
  const [open, setOpen] = useState<SavedArticle | null>(null);

  return (
    <div className="view">
      <div className="seg-row">
        <button className={`seg${section === 'alerts' ? ' seg--active' : ''}`} onClick={() => setSection('alerts')}>
          🚨 Alerts
        </button>
        <button className={`seg${section === 'exit' ? ' seg--active' : ''}`} onClick={() => setSection('exit')}>
          🛣️ Get out
        </button>
        <button className={`seg${section === 'sos' ? ' seg--active' : ''}`} onClick={() => setSection('sos')}>
          🆘 SOS
        </button>
        <button className={`seg${section === 'flights' ? ' seg--active' : ''}`} onClick={() => setSection('flights')}>
          ✈️ Flights
        </button>
      </div>

      <div className="banner banner--info" style={{ marginBottom: 12 }}>
        📴 Everything on this tab is saved on your phone and works with no signal.
      </div>

      {section === 'alerts' && (
        <>
          {alerts.map((a) => (
            <div key={a.id} className="card">
              <div className="spread" style={{ marginBottom: 6 }}>
                <span className={levelClass[a.level]}>{levelLabel[a.level]}</span>
                <span className="small muted">{fmt(a.published)}</span>
              </div>
              <div className="card__title">{a.headline}</div>
              <p className="small" style={{ marginTop: 0 }}>{a.summary}</p>
              <ul className="small" style={{ paddingLeft: 18, margin: '0 0 10px' }}>
                {a.keyPoints.slice(0, 3).map((k, i) => (
                  <li key={i} style={{ marginBottom: 4 }}>{k}</li>
                ))}
              </ul>
              <div className="row">
                <button className="btn btn--sm btn--primary" onClick={() => setOpen(a)}>
                  📖 Read saved article
                </button>
              </div>
              <div className="small muted" style={{ marginTop: 6 }}>{a.source}</div>
            </div>
          ))}
        </>
      )}

      {section === 'exit' && (
        <>
          <div className="small muted" style={{ margin: '0 2px 10px' }}>
            Status as of {fmt(EXIT_AS_OF)}. Conditions change daily — confirm with your guide and the
            checkpost before committing.
          </div>
          {exitRoutes.map((r) => (
            <div key={r.id} className="card">
              <div className="spread" style={{ marginBottom: 6 }}>
                <span className={statusClass[r.status]}>{r.status.toUpperCase()}</span>
                <span className="small muted">{r.timing}</span>
              </div>
              <div className="card__title">{r.name}</div>
              <p className="small" style={{ marginTop: 0 }}>{r.statusNote}</p>
              <div className="section-title" style={{ marginTop: 8 }}>Steps</div>
              <ol className="small" style={{ paddingLeft: 18, margin: 0 }}>
                {r.steps.map((s, i) => <li key={i} style={{ marginBottom: 3 }}>{s}</li>)}
              </ol>
              <div className="section-title" style={{ marginTop: 8 }}>For</div>
              <ul className="small" style={{ paddingLeft: 18, margin: 0 }}>
                {r.pros.map((s, i) => <li key={i} style={{ marginBottom: 3 }}>{s}</li>)}
              </ul>
              <div className="section-title" style={{ marginTop: 8 }}>Against</div>
              <ul className="small" style={{ paddingLeft: 18, margin: 0 }}>
                {r.cons.map((s, i) => <li key={i} style={{ marginBottom: 3 }}>{s}</li>)}
              </ul>
            </div>
          ))}

          <div className="section-title">Road status</div>
          <div className="card">
            {roadStatus.map((r) => (
              <div key={r.road} style={{ padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                <div className="spread">
                  <b className="small">{r.road}</b>
                  <span className={statusClass[r.status]}>{r.status}</span>
                </div>
                <div className="small muted">{r.note}</div>
              </div>
            ))}
          </div>

          <div className="section-title">While you are waiting it out</div>
          <div className="card">
            <ul className="small" style={{ paddingLeft: 18, margin: 0 }}>
              {stuckChecklist.map((s, i) => <li key={i} style={{ marginBottom: 6 }}>{s}</li>)}
            </ul>
          </div>
        </>
      )}

      {section === 'sos' && (
        <>
          <div className="banner banner--warn">
            🚁 Medical emergency: start descending, then call PassportCard and open a case
            BEFORE a helicopter is arranged — that is what gets it paid for.
          </div>

          <div className="section-title">Your location (they will ask)</div>
          <div className="card">
            <div className="spread" style={{ padding: '4px 0' }}>
              <span className="small muted">Place</span><b className="small">{yourLocation.place}</b>
            </div>
            <div className="spread" style={{ padding: '4px 0' }}>
              <span className="small muted">Coordinates</span><b className="small">{yourLocation.coords}</b>
            </div>
            <div className="spread" style={{ padding: '4px 0' }}>
              <span className="small muted">Elevation</span><b className="small">{yourLocation.elevation}</b>
            </div>
            <div className="row" style={{ marginTop: 8 }}>
              <CopyBtn
                text={`${yourLocation.place} — ${yourLocation.coords}, ${yourLocation.elevation}`}
                label="Copy location"
              />
            </div>
          </div>

          <div className="section-title">Contacts · verified {fmt(EMERGENCY_AS_OF)}</div>
          {emergencyContacts.map((c) => (
            <div key={c.id} className={`card${c.priority ? ' card--hot' : ''}`}>
              <div className="card__title">{c.name}</div>
              <p className="small" style={{ marginTop: 0 }}>{c.detail}</p>
              {c.numbers.map((n) => (
                <a key={n.value} className="tel-row" href={`tel:${n.value.replace(/[^+\d*]/g, '')}`}>
                  <span className="small muted">{n.label}</span>
                  <b>{n.value}</b>
                </a>
              ))}
              {c.email && (
                <a className="tel-row" href={`mailto:${c.email}`}>
                  <span className="small muted">Email</span>
                  <b>{c.email}</b>
                </a>
              )}
              {c.note && <div className="small muted" style={{ marginTop: 6 }}>{c.note}</div>}
            </div>
          ))}

          <div className="section-title">Getting a helicopter — in order</div>
          <div className="card">
            <ul className="small" style={{ paddingLeft: 18, margin: 0, listStyle: 'none' }}>
              {evacuationSteps.map((s2, i) => <li key={i} style={{ marginBottom: 7 }}>{s2}</li>)}
            </ul>
          </div>

          <div className="section-title">PassportCard — how it actually works</div>
          <div className="card">
            <ul className="small" style={{ paddingLeft: 18, margin: 0 }}>
              {insuranceNotes.map((n, i) => <li key={i} style={{ marginBottom: 6 }}>{n}</li>)}
            </ul>
          </div>

          <div className="section-title">Ready-to-send email</div>
          {emailTemplates.filter((t) => t.id === 'passportcard-claim').map((t) => (
            <TemplateCard key={t.id} t={t} />
          ))}
        </>
      )}

      {section === 'flights' && (
        <>
          <div className="banner banner--warn">
            Prices captured {fmt(FLIGHTS_FETCHED)} for 4 Oct, 1 adult. Fares and seats move fast —
            re-check when you have signal.
          </div>
          <div className="section-title">Before you buy anything</div>
          <div className="card">
            <ul className="small" style={{ paddingLeft: 18, margin: 0 }}>
              {rebookingNotes.map((n, i) => <li key={i} style={{ marginBottom: 6 }}>{n}</li>)}
            </ul>
          </div>

          <div className="section-title">Ready-to-send email</div>
          {emailTemplates.filter((t) => t.id === 'flydubai-rebook').map((t) => (
            <TemplateCard key={t.id} t={t} />
          ))}

          {flightRoutes.map((route) => (
            <div key={route.id}>
              <div className="section-title">
                {route.label} · {fmt(route.date)}
              </div>
              <div className="small muted" style={{ margin: '0 2px 8px' }}>{route.note}</div>
              <div className="card">
                {route.options.map((o) => (
                  <div key={o.id} className="flight-row">
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="flight-row__air">{o.airline}</div>
                      <div className="small muted">
                        {o.depart} → {o.arrive} · {o.duration} · {o.stops}
                      </div>
                    </div>
                    <div className="flight-row__price">€{o.priceEur.toLocaleString()}</div>
                  </div>
                ))}
                <a
                  className="btn btn--sm btn--primary"
                  style={{ marginTop: 10, display: 'inline-block' }}
                  href={route.options[0].bookUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  🔎 Search live ({route.from}→{route.to})
                </a>
              </div>
            </div>
          ))}
        </>
      )}

      {open && (
        <div className="sheet-wrap" onClick={() => setOpen(null)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="spread" style={{ marginBottom: 8 }}>
              <span className={levelClass[open.level]}>{levelLabel[open.level]}</span>
              <button className="btn btn--sm btn--ghost" onClick={() => setOpen(null)}>✕</button>
            </div>
            <div className="card__title">{open.headline}</div>
            <div className="small muted" style={{ marginBottom: 10 }}>
              {open.source} · {fmt(open.published)}
            </div>
            <div className="section-title">Key points</div>
            <ul className="small" style={{ paddingLeft: 18 }}>
              {open.keyPoints.map((k, i) => <li key={i} style={{ marginBottom: 5 }}>{k}</li>)}
            </ul>
            <div className="section-title">Full article (saved)</div>
            {open.body.map((p, i) => (
              <p key={i} className="small" style={{ marginTop: 0 }}>{p}</p>
            ))}
            <div className="small muted">Saved offline from {open.url}</div>
          </div>
        </div>
      )}
    </div>
  );
}
