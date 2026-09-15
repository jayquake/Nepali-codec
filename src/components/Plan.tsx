import { useEffect, useState } from 'react';
import { useItinerary } from '../hooks/useItinerary';
import { useBudget, budgetTotalUsd } from '../hooks/useBudget';
import { useFxRate } from '../hooks/useFxRate';
import { budgetItems, GROUP_LABELS, type BudgetGroup } from '../data/budget';
import { itinerary } from '../data/itinerary';
import {
  afterTrek,
  afterTrekIntro,
  luxuryIntro,
  luxuryStays,
  placeMapsUrl,
} from '../data/afterTrek';
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

type Section = 'itinerary' | 'after' | 'ktm' | 'budget';

function fmtDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export function Plan() {
  const it = useItinerary();
  const budget = useBudget();
  const fx = useFxRate();
  const [section, setSection] = useState<Section>('itinerary');

  // Auto-apply the live USD→NPR rate unless the user has set one manually.
  useEffect(() => {
    if (fx.rate) budget.useLiveRate(Math.round(fx.rate * 100) / 100);
  }, [fx.rate, budget]);
  const doneCount = itinerary.filter((d) => it.done[d.id]).length;
  const totalUsd = budgetTotalUsd(budget.amount);
  const trailUsd = budgetItems
    .filter((i) => i.group === 'trail')
    .reduce((s, i) => s + budget.amount(i.id, i.usd), 0);

  return (
    <div className="view">
      <div className="seg-row">
        <button
          className={`seg${section === 'itinerary' ? ' seg--active' : ''}`}
          onClick={() => setSection('itinerary')}
        >
          📅 Days
        </button>
        <button
          className={`seg${section === 'after' ? ' seg--active' : ''}`}
          onClick={() => setSection('after')}
        >
          🌄 After
        </button>
        <button
          className={`seg${section === 'ktm' ? ' seg--active' : ''}`}
          onClick={() => setSection('ktm')}
        >
          🏙️ KTM
        </button>
        <button
          className={`seg${section === 'budget' ? ' seg--active' : ''}`}
          onClick={() => setSection('budget')}
        >
          💵 Cash
        </button>
      </div>

      {section === 'itinerary' && (
        <>
          <div className="spread" style={{ marginBottom: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Trip plan · 16 Sep – 3 Oct</div>
            <div className="small muted">
              {doneCount}/{itinerary.length} done
            </div>
          </div>
          <div className="banner banner--info">
            Day-by-day with real dates. Tap ✓ as each day passes and jot notes — saved on this
            device.
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
        </>
      )}

      {section === 'after' && (
        <>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>After the trek</div>
          <div className="banner banner--info">{afterTrekIntro}</div>
          {afterTrek.map((idea) => (
            <div key={idea.name} className="card" style={{ padding: '12px 14px' }}>
              <div className="spread">
                <div className="lodge__name">{idea.name}</div>
                <a className="badge" href={placeMapsUrl(idea.mapsQuery)} target="_blank" rel="noreferrer noopener">
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

          <div className="section-title">Treat yourself · pool &amp; spa</div>
          <div className="banner banner--info">{luxuryIntro}</div>
          {luxuryStays.map((h) => (
            <div key={h.name} className="card" style={{ padding: '12px 14px' }}>
              <div className="spread">
                <div className="lodge__name">{h.name}</div>
                <a className="badge" href={placeMapsUrl(h.mapsQuery)} target="_blank" rel="noreferrer noopener">
                  🗺️ Map
                </a>
              </div>
              <div className="small muted" style={{ margin: '2px 0 4px' }}>
                {h.location} · {h.tag}
              </div>
              <div className="stage__desc">{h.what}</div>
            </div>
          ))}
        </>
      )}

      {section === 'ktm' && (
        <>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Kathmandu</div>
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
                      {h.name}{' '}
                      {h.booked && (
                        <span className="badge" style={{ background: '#1e3a2c', color: 'var(--accent-strong)' }}>
                          ✓ Booked
                        </span>
                      )}
                      {h.best && <span className="badge">Top pick</span>}
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
                {(h.address || h.website || h.phone || h.email) && (
                  <div
                    className="small muted"
                    style={{ marginTop: 6, display: 'flex', gap: 12, flexWrap: 'wrap' }}
                  >
                    {h.address && <span>📍 {h.address}</span>}
                    {h.phone && <a href={`tel:${h.phone.replace(/\s/g, '')}`}>📞 Call</a>}
                    {h.email && <a href={`mailto:${h.email}`}>✉️ Email</a>}
                    {h.website && (
                      <a href={h.website} target="_blank" rel="noreferrer noopener">
                        🔗 Website
                      </a>
                    )}
                  </div>
                )}
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
        </>
      )}

      {section === 'budget' && (
        <>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Cash budget · per person</div>
          <div className="banner banner--warn">
            No ATMs on the Manaslu trail — draw &amp; exchange NPR in Kathmandu; teahouses are
            cash-only. Assumes an inclusive package (permits, guide, porter, lodging, meals,
            transport). Amounts are editable &amp; saved on this device.
          </div>

          <div className="card">
            <div className="row" style={{ gap: 12 }}>
              <label className="field" style={{ flex: 1, marginBottom: 0 }}>
                <span className="small muted">NPR per US$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={budget.rate}
                  onChange={(e) => budget.setRate(parseFloat(e.target.value))}
                />
              </label>
              <label className="field" style={{ flex: 1, marginBottom: 0 }}>
                <span className="small muted">People</span>
                <input
                  type="number"
                  inputMode="numeric"
                  value={budget.people}
                  onChange={(e) => budget.setPeople(parseInt(e.target.value, 10))}
                />
              </label>
            </div>
            <div className="small muted" style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {fx.rate ? (
                <>
                  <span>
                    📡 Live ₨{fx.rate.toFixed(2)}/US$
                    {fx.updatedAt ? ` · ${new Date(fx.updatedAt).toLocaleDateString()}` : ''}
                    {budget.rateManual ? ' · using your manual rate' : ' · applied'}
                  </span>
                  {budget.rateManual && (
                    <button className="btn btn--sm btn--ghost" onClick={budget.clearRateOverride}>
                      Use live
                    </button>
                  )}
                  <button className="btn btn--sm btn--ghost" onClick={fx.reload} disabled={fx.loading}>
                    {fx.loading ? '…' : '↻'}
                  </button>
                </>
              ) : fx.loading ? (
                <span>📡 Fetching live rate…</span>
              ) : (
                <span>Live rate unavailable — using your rate. Cached when online.</span>
              )}
            </div>
          </div>

          {(['trail', 'ktm', 'contingency'] as BudgetGroup[]).map((group) => {
            const items = budgetItems.filter((i) => i.group === group);
            const sub = items.reduce((s, i) => s + budget.amount(i.id, i.usd), 0);
            return (
              <div key={group}>
                <div className="section-title">
                  {GROUP_LABELS[group]} · ${Math.round(sub)}
                </div>
                <div className="card">
                  {items.map((i) => {
                    const val = budget.amount(i.id, i.usd);
                    return (
                      <div key={i.id} className="bud-row">
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="bud-row__label">{i.label}</div>
                          {i.note && <div className="small muted">{i.note}</div>}
                        </div>
                        <div className="bud-row__amt">
                          <span className="bud-row__usd">
                            $
                            <input
                              type="number"
                              inputMode="decimal"
                              value={val}
                              onChange={(e) => budget.setAmount(i.id, parseFloat(e.target.value))}
                            />
                          </span>
                          <div className="small muted">
                            ₨{Math.round(val * budget.rate).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="card" style={{ borderColor: '#2f6d4d' }}>
            <div className="spread">
              <b>Per person</b>
              <b style={{ color: 'var(--accent-strong)' }}>
                ${Math.round(totalUsd)} · ₨{Math.round(totalUsd * budget.rate).toLocaleString()}
              </b>
            </div>
            <div className="spread" style={{ marginTop: 6 }}>
              <span className="small muted">Carry as NPR for the trail</span>
              <span className="small">₨{Math.round(trailUsd * budget.rate).toLocaleString()}</span>
            </div>
            {budget.people > 1 && (
              <div className="spread" style={{ marginTop: 6 }}>
                <span className="small muted">Group total ({budget.people})</span>
                <b>
                  ${Math.round(totalUsd * budget.people)} · ₨
                  {Math.round(totalUsd * budget.people * budget.rate).toLocaleString()}
                </b>
              </div>
            )}
            <button className="btn btn--sm btn--ghost" style={{ marginTop: 10 }} onClick={budget.reset}>
              Reset to defaults
            </button>
          </div>
        </>
      )}
    </div>
  );
}
