// Distinct colours for imported GPX tracks, shared between the map overlay and the
// Tracks list so the swatches match.
export const TRACK_COLORS = [
  '#4ea8de',
  '#f28482',
  '#c77dff',
  '#f9c74f',
  '#43aa8b',
  '#ff9770',
];

export function trackColor(index: number): string {
  return TRACK_COLORS[index % TRACK_COLORS.length];
}
