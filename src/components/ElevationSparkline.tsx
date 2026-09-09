export function ElevationSparkline({ elevations }: { elevations: number[] }) {
  if (elevations.length < 2) return null;
  const w = 100;
  const h = 40;
  const pad = 2;
  const min = Math.min(...elevations);
  const max = Math.max(...elevations);
  const range = max - min || 1;
  const step = (w - pad * 2) / (elevations.length - 1);

  const points = elevations.map((e, i) => {
    const x = pad + i * step;
    const y = pad + (h - pad * 2) * (1 - (e - min) / range);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const line = points.join(' ');
  const area = `${pad},${h} ${line} ${(w - pad).toFixed(1)},${h}`;

  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden>
      <polygon points={area} fill="#52b78833" />
      <polyline points={line} fill="none" stroke="#74c69d" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
