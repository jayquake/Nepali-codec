export type ViewName =
  | 'map'
  | 'trails'
  | 'conditions'
  | 'stay'
  | 'news'
  | 'journal'
  | 'tracks';

const ITEMS: { name: ViewName; icon: string; label: string }[] = [
  { name: 'map', icon: '🗺️', label: 'Map' },
  { name: 'trails', icon: '🥾', label: 'Trails' },
  { name: 'conditions', icon: '⛅', label: 'Weather' },
  { name: 'stay', icon: '🛏️', label: 'Stay' },
  { name: 'news', icon: '📰', label: 'News' },
  { name: 'journal', icon: '📷', label: 'Journal' },
  { name: 'tracks', icon: '📈', label: 'Tracks' },
];

export function Nav({
  active,
  onNavigate,
}: {
  active: ViewName;
  onNavigate: (name: ViewName) => void;
}) {
  return (
    <nav className="nav">
      {ITEMS.map((item) => (
        <button
          key={item.name}
          className={`nav__item${active === item.name ? ' nav__item--active' : ''}`}
          onClick={() => onNavigate(item.name)}
          aria-current={active === item.name ? 'page' : undefined}
        >
          <span className="nav__icon" aria-hidden>
            {item.icon}
          </span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
