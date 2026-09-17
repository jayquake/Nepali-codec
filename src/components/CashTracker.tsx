import { useState } from 'react';
import { useCashLog, type Currency, type EntryType } from '../hooks/useCashLog';

const CATEGORIES = [
  'Food',
  'Lodging',
  'Tips',
  'Transport / jeep',
  'Wifi / shower / charge',
  'Drinks',
  'Gear',
  'Permits',
  'Souvenirs',
  'Other',
];

const npr = (n: number) => `₨${Math.round(n).toLocaleString()}`;

export function CashTracker({ rate }: { rate: number }) {
  const log = useCashLog();
  const [mode, setMode] = useState<EntryType | null>(null);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<Currency>('NPR');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [note, setNote] = useState('');

  const toNPR = (a: number, c: Currency) => (c === 'NPR' ? a : a * rate);

  const takenNPR = log.entries
    .filter((e) => e.type === 'in')
    .reduce((s, e) => s + toNPR(e.amount, e.currency), 0);
  const spentNPR = log.entries
    .filter((e) => e.type === 'out')
    .reduce((s, e) => s + toNPR(e.amount, e.currency), 0);
  const remainNPR = takenNPR - spentNPR;

  const byCat = new Map<string, number>();
  for (const e of log.entries) {
    if (e.type !== 'out') continue;
    const key = e.category || 'Other';
    byCat.set(key, (byCat.get(key) ?? 0) + toNPR(e.amount, e.currency));
  }
  const cats = Array.from(byCat.entries()).sort((a, b) => b[1] - a[1]);

  const openForm = (t: EntryType) => {
    setMode(t);
    setAmount('');
    setNote('');
    setCurrency('NPR');
  };

  const submit = () => {
    const a = parseFloat(amount);
    if (!mode || !Number.isFinite(a) || a <= 0) return;
    log.add({
      type: mode,
      amount: a,
      currency,
      category: mode === 'out' ? category : undefined,
      note: note.trim() || undefined,
    });
    setMode(null);
    setAmount('');
    setNote('');
  };

  return (
    <div>
      <div className="stats-row">
        <div className="stat">
          <div className="stat__num" style={{ color: 'var(--accent-strong)' }}>{npr(takenNPR)}</div>
          <div className="stat__label">Taken out</div>
        </div>
        <div className="stat">
          <div className="stat__num" style={{ color: 'var(--gold)' }}>{npr(spentNPR)}</div>
          <div className="stat__label">Spent</div>
        </div>
        <div className="stat">
          <div className="stat__num" style={{ color: remainNPR < 0 ? 'var(--danger)' : 'var(--text)' }}>
            {npr(remainNPR)}
          </div>
          <div className="stat__label">Remaining</div>
        </div>
      </div>
      <div className="small muted" style={{ margin: '6px 2px 12px' }}>
        Remaining ≈ ${Math.round(remainNPR / rate).toLocaleString()} at ₨{rate}/US$. Amounts in USD
        are converted at that rate. Saved on this device.
      </div>

      {mode === null ? (
        <div className="row" style={{ marginBottom: 12 }}>
          <button className="btn btn--primary" onClick={() => openForm('out')}>
            − Add expense
          </button>
          <button className="btn" onClick={() => openForm('in')}>
            ＋ Add cash
          </button>
        </div>
      ) : (
        <div className="card">
          <div className="card__title">{mode === 'out' ? 'Log an expense' : 'Cash taken out / exchanged'}</div>
          <div className="row" style={{ gap: 8 }}>
            <label className="field" style={{ flex: 1, marginBottom: 8 }}>
              <span className="small muted">Amount</span>
              <input
                type="text"
                inputMode="decimal"
                value={amount}
                autoFocus
                placeholder="0"
                onChange={(e) => setAmount(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
              />
            </label>
            <label className="field" style={{ flex: '0 0 96px', marginBottom: 8 }}>
              <span className="small muted">Currency</span>
              <select value={currency} onChange={(e) => setCurrency(e.target.value as Currency)}>
                <option value="NPR">NPR ₨</option>
                <option value="USD">USD $</option>
              </select>
            </label>
          </div>
          {mode === 'out' && (
            <label className="field">
              <span className="small muted">Category</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label className="field">
            <span className="small muted">Note (optional)</span>
            <input
              type="text"
              value={note}
              placeholder={mode === 'out' ? 'e.g. dal bhat at Namrung' : 'e.g. ATM withdrawal, KTM'}
              onChange={(e) => setNote(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
            />
          </label>
          <div className="row">
            <button className="btn btn--primary" onClick={submit} disabled={!(parseFloat(amount) > 0)}>
              Save
            </button>
            <button className="btn btn--ghost" onClick={() => setMode(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {cats.length > 0 && (
        <>
          <div className="section-title">Spent by category</div>
          <div className="card">
            {cats.map(([c, v]) => (
              <div key={c} className="spread" style={{ padding: '5px 0' }}>
                <span className="small">{c}</span>
                <span className="small">
                  <b>{npr(v)}</b>
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="section-title">
        History {log.entries.length > 0 && `· ${log.entries.length}`}
      </div>
      {log.entries.length === 0 ? (
        <div className="empty">No entries yet. Add the cash you took out, then log expenses as you go.</div>
      ) : (
        <div className="card">
          {log.entries.map((e) => (
            <div key={e.id} className="cash-row">
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="cash-row__title">
                  {e.type === 'out' ? e.category || 'Expense' : 'Cash in'}
                  {e.note ? <span className="muted"> · {e.note}</span> : ''}
                </div>
                <div className="small muted">
                  {new Date(e.at).toLocaleDateString(undefined, {
                    day: 'numeric',
                    month: 'short',
                  })}{' '}
                  {new Date(e.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div
                className="cash-row__amt"
                style={{ color: e.type === 'out' ? 'var(--danger)' : 'var(--accent-strong)' }}
              >
                {e.type === 'out' ? '−' : '+'}
                {e.currency === 'NPR' ? '₨' : '$'}
                {e.amount.toLocaleString()}
              </div>
              <button
                className="cash-row__del"
                onClick={() => log.remove(e.id)}
                aria-label="Delete entry"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
