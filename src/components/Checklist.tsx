import { useState } from 'react';
import { useChecklist } from '../hooks/useChecklist';
import { CHECKLIST_CATEGORIES, quickAddItems } from '../data/checklist';

export function Checklist() {
  const list = useChecklist();
  const [newLabel, setNewLabel] = useState('');
  const [newCat, setNewCat] = useState(CHECKLIST_CATEGORIES[0]);

  const pct = list.total ? Math.round((list.checkedCount / list.total) * 100) : 0;

  // Which quick-add extras aren't already in the list (by label).
  const existingLabels = new Set(list.items.map((i) => i.label.toLowerCase()));
  const quickAvailable = quickAddItems.filter((q) => !existingLabels.has(q.label.toLowerCase()));

  return (
    <div className="view">
      <div className="spread" style={{ marginBottom: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>Trek prep checklist</div>
        <button className="btn btn--sm btn--ghost" onClick={list.reset}>
          Uncheck all
        </button>
      </div>

      <div className="card" style={{ padding: '12px 14px' }}>
        <div className="spread" style={{ marginBottom: 8 }}>
          <div className="small muted">
            Packed <b style={{ color: 'var(--accent-strong)' }}>{list.checkedCount}</b> of{' '}
            {list.total}
          </div>
          <div className="small muted">{pct}%</div>
        </div>
        <div className="progress">
          <div className="progress__bar" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="banner banner--info">
        Saved on this device — works fully offline. Tap an item to pack it, add your own, or
        quick-add common extras below.
      </div>

      {quickAvailable.length > 0 && (
        <>
          <div className="section-title">Quick add</div>
          <div className="chips">
            {quickAvailable.map((q) => (
              <button
                key={q.label}
                className="chip"
                onClick={() => list.addItem(q.label, q.category)}
              >
                ＋ {q.label}
              </button>
            ))}
          </div>
        </>
      )}

      {CHECKLIST_CATEGORIES.map((cat) => {
        const catItems = list.items.filter((i) => i.category === cat);
        if (catItems.length === 0) return null;
        const done = catItems.filter((i) => list.checked[i.id]).length;
        return (
          <div key={cat}>
            <div className="section-title">
              {cat} · {done}/{catItems.length}
            </div>
            <div className="card" style={{ padding: '4px 14px' }}>
              {catItems.map((item) => {
                const isChecked = Boolean(list.checked[item.id]);
                return (
                  <div key={item.id} className="clitem">
                    <label className="clitem__main">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => list.toggle(item.id)}
                      />
                      <span className={isChecked ? 'clitem__label clitem__label--done' : 'clitem__label'}>
                        {item.label}
                      </span>
                    </label>
                    {list.isCustom(item.id) && (
                      <button
                        className="clitem__del"
                        onClick={() => list.removeItem(item.id)}
                        aria-label={`Remove ${item.label}`}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="section-title">Add your own</div>
      <div className="card">
        <div className="field">
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="e.g. Kindle, spare laces…"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newLabel.trim()) {
                list.addItem(newLabel, newCat);
                setNewLabel('');
              }
            }}
          />
        </div>
        <div className="field">
          <select value={newCat} onChange={(e) => setNewCat(e.target.value)}>
            {CHECKLIST_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <button
          className="btn btn--primary"
          disabled={!newLabel.trim()}
          onClick={() => {
            list.addItem(newLabel, newCat);
            setNewLabel('');
          }}
        >
          ＋ Add item
        </button>
      </div>
    </div>
  );
}
