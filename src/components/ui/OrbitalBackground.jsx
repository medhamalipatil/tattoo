import React, { useEffect, useRef } from 'react';

/**
 * OrbitalBackground — animated concentric orbit rings with orbiting dots.
 * Inspired by orrery / planetary system aesthetics.
 * Renders on a <canvas> for smooth 60fps performance.
 */
export default function OrbitalBackground({ opacity = 0.55 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Resize handler
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    // Orbit config — multiple rings with dots
    const orbits = [
      { radius: 60,  speed: 0.012,  dotR: 2.5, phase: 0,    dotCount: 1 },
      { radius: 105, speed: 0.008,  dotR: 2.0, phase: 1.1,  dotCount: 2 },
      { radius: 155, speed: 0.006,  dotR: 3.0, phase: 2.4,  dotCount: 1 },
      { radius: 210, speed: 0.0045, dotR: 2.0, phase: 0.7,  dotCount: 3 },
      { radius: 275, speed: 0.003,  dotR: 2.5, phase: 3.8,  dotCount: 1 },
      { radius: 345, speed: 0.002,  dotR: 1.8, phase: 1.5,  dotCount: 2 },
      { radius: 420, speed: 0.0015, dotR: 3.2, phase: 5.0,  dotCount: 1 },
      { radius: 500, speed: 0.001,  dotR: 2.0, phase: 2.1,  dotCount: 2 },
    ];

    // Second orbital cluster — offset position
    const orbits2 = [
      { radius: 50,  speed: 0.009,  dotR: 2.0, phase: 1.2,  dotCount: 1 },
      { radius: 100, speed: 0.006,  dotR: 2.5, phase: 2.8,  dotCount: 2 },
      { radius: 160, speed: 0.004,  dotR: 2.0, phase: 0.4,  dotCount: 1 },
      { radius: 230, speed: 0.003,  dotR: 2.8, phase: 4.1,  dotCount: 2 },
    ];

    let t = 0;

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      // ── Cluster 1 — centred right-centre ──
      const cx1 = W * 0.62, cy1 = H * 0.45;
      drawCluster(ctx, orbits, cx1, cy1, t);

      // ── Cluster 2 — upper-left ghost ──
      const cx2 = W * 0.2, cy2 = H * 0.3;
      drawCluster(ctx, orbits2, cx2, cy2, t, 0.35);

      t += 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity,
      }}
    />
  );
}

// ── helper ─────────────────────────────────────────────────────────────────
function drawCluster(ctx, orbits, cx, cy, t, alphaScale = 1) {
  // Centre glow
  const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
  grd.addColorStop(0, `rgba(232, 235, 240, ${0.55 * alphaScale})`);
  grd.addColorStop(0.5, `rgba(192, 200, 216, ${0.2 * alphaScale})`);
  grd.addColorStop(1, 'transparent');
  ctx.beginPath();
  ctx.arc(cx, cy, 28, 0, Math.PI * 2);
  ctx.fillStyle = grd;
  ctx.fill();

  // Inner solid dot
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(232, 235, 240, ${0.9 * alphaScale})`;
  ctx.fill();

  orbits.forEach((o) => {
    const angle = t * o.speed + o.phase;

    // ── Ring ──
    ctx.beginPath();
    ctx.arc(cx, cy, o.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(192, 200, 216, ${0.18 * alphaScale})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // ── Orbiting dots ──
    for (let d = 0; d < o.dotCount; d++) {
      const dotAngle = angle + (Math.PI * 2 / o.dotCount) * d;
      const dx = cx + Math.cos(dotAngle) * o.radius;
      const dy = cy + Math.sin(dotAngle) * o.radius;

      // Dot glow
      const g = ctx.createRadialGradient(dx, dy, 0, dx, dy, o.dotR * 3);
      g.addColorStop(0, `rgba(232, 235, 240, ${0.9 * alphaScale})`);
      g.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(dx, dy, o.dotR * 3, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      // Dot core
      ctx.beginPath();
      ctx.arc(dx, dy, o.dotR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * alphaScale})`;
      ctx.fill();

      // Trailing arc
      ctx.beginPath();
      ctx.arc(cx, cy, o.radius, dotAngle - 0.35, dotAngle, false);
      ctx.strokeStyle = `rgba(232, 235, 240, ${0.3 * alphaScale})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  });
}
