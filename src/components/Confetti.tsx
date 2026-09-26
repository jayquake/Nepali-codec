import { useEffect, useRef } from 'react';

/**
 * Lightweight canvas confetti — no dependency, no network, works offline.
 * Fires once per `trigger` change (skips 0 so it never fires on mount).
 */
export function Confetti({ trigger }: { trigger: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = (canvas.width = window.innerWidth * dpr);
    const h = (canvas.height = window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const colors = ['#74c69d', '#f4c95d', '#e5654b', '#4ea8de', '#b5e48c', '#ffffff'];
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const count = reduce ? 40 : 130;

    const parts = Array.from({ length: count }, () => ({
      x: w / 2 + (Math.random() - 0.5) * w * 0.5,
      y: h * 0.32 + (Math.random() - 0.5) * 60 * dpr,
      vx: (Math.random() - 0.5) * 11 * dpr,
      vy: (Math.random() * -13 - 4) * dpr,
      size: (Math.random() * 6 + 4) * dpr,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[(Math.random() * colors.length) | 0],
      life: 0,
    }));

    const gravity = 0.36 * dpr;
    const maxLife = reduce ? 60 : 130;
    let frame = 0;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      frame++;
      let alive = false;
      for (const p of parts) {
        p.life++;
        if (p.life > maxLife) continue;
        alive = true;
        p.vy += gravity;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - p.life / maxLife);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
      if (alive && frame < maxLife + 10) {
        raf.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      ctx.clearRect(0, 0, w, h);
    };
  }, [trigger]);

  return <canvas ref={ref} className="confetti" aria-hidden />;
}
