import { useEffect, useRef } from 'react';

interface HudBackgroundProps {
  isDarkMode: boolean;
}

export default function HudBackground({ isDarkMode }: HudBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!isDarkMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    // Scan lines state
    const scanLines: Array<{ y: number; speed: number; opacity: number; width: number }> = [];
    for (let i = 0; i < 3; i++) {
      scanLines.push({
        y: Math.random() * height,
        speed: 0.15 + Math.random() * 0.25,
        opacity: 0.02 + Math.random() * 0.03,
        width: 1 + Math.random() * 2,
      });
    }

    // Floating particles
    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number }> = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2,
        size: 1 + Math.random() * 1.5,
        opacity: 0.1 + Math.random() * 0.2,
      });
    }

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.005;

      // ── Grid (flush with top, covers full page) ──
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.025)';
      ctx.lineWidth = 0.5;
      const gridSize = 50;
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // ── Concentric circles (center of viewport, slow rotation) ──
      const cx = width * 0.5;
      const cy = height * 0.4;
      const maxRadius = Math.min(width, height) * 0.35;

      for (let i = 1; i <= 4; i++) {
        const radius = maxRadius * (i / 4);
        const alpha = 0.015 + (i === 2 ? 0.01 : 0);
        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ── Rotating radial lines (like targeting reticule) ──
      const lineCount = 8;
      const rotation = time * 0.3;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.015)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < lineCount; i++) {
        const angle = (i / lineCount) * Math.PI * 2 + rotation;
        const innerR = maxRadius * 0.15;
        const outerR = maxRadius * 0.95;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
        ctx.lineTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR);
        ctx.stroke();
      }

      // ── Small rotating tick marks on second circle ──
      const tickRadius = maxRadius * 0.5;
      const tickCount = 36;
      const tickRotation = time * 0.15;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < tickCount; i++) {
        const angle = (i / tickCount) * Math.PI * 2 + tickRotation;
        const inner = tickRadius - 4;
        const outer = tickRadius + 4;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
        ctx.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
        ctx.stroke();
      }

      // ── Horizontal scan lines (drifting down) ──
      for (const scan of scanLines) {
        scan.y += scan.speed;
        if (scan.y > height + 10) {
          scan.y = -10;
          scan.opacity = 0.02 + Math.random() * 0.03;
        }
        const gradient = ctx.createLinearGradient(0, scan.y, width, scan.y);
        gradient.addColorStop(0, 'rgba(0, 240, 255, 0)');
        gradient.addColorStop(0.3, `rgba(0, 240, 255, ${scan.opacity})`);
        gradient.addColorStop(0.7, `rgba(0, 240, 255, ${scan.opacity})`);
        gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = scan.width;
        ctx.beginPath();
        ctx.moveTo(0, scan.y);
        ctx.lineTo(width, scan.y);
        ctx.stroke();
      }

      // ── Floating particles ──
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(0, 240, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Corner crosshairs ──
      const crossSize = 20;
      const crossGap = 30;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
      ctx.lineWidth = 0.5;

      // Top-left
      ctx.beginPath();
      ctx.moveTo(crossGap, crossGap);
      ctx.lineTo(crossGap + crossSize, crossGap);
      ctx.moveTo(crossGap, crossGap);
      ctx.lineTo(crossGap, crossGap + crossSize);
      ctx.stroke();

      // Top-right
      ctx.beginPath();
      ctx.moveTo(width - crossGap, crossGap);
      ctx.lineTo(width - crossGap - crossSize, crossGap);
      ctx.moveTo(width - crossGap, crossGap);
      ctx.lineTo(width - crossGap, crossGap + crossSize);
      ctx.stroke();

      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(crossGap, height - crossGap);
      ctx.lineTo(crossGap + crossSize, height - crossGap);
      ctx.moveTo(crossGap, height - crossGap);
      ctx.lineTo(crossGap, height - crossGap - crossSize);
      ctx.stroke();

      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(width - crossGap, height - crossGap);
      ctx.lineTo(width - crossGap - crossSize, height - crossGap);
      ctx.moveTo(width - crossGap, height - crossGap);
      ctx.lineTo(width - crossGap, height - crossGap - crossSize);
      ctx.stroke();

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isDarkMode]);

  if (!isDarkMode) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
