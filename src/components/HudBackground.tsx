import { useEffect, useRef } from 'react';
import type { HudParams } from './HudSettings';

interface HudBackgroundProps {
  isDarkMode: boolean;
  params: HudParams;
}

export default function HudBackground({ isDarkMode, params }: HudBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const paramsRef = useRef(params);
  paramsRef.current = params;

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

    // Scan lines
    let scanLines: Array<{ y: number; speed: number; opacity: number; lineWidth: number }> = [];
    const rebuildScanLines = (count: number) => {
      scanLines = [];
      for (let i = 0; i < count; i++) {
        scanLines.push({
          y: Math.random() * height,
          speed: 0.15 + Math.random() * 0.25,
          opacity: 0.02 + Math.random() * 0.03,
          lineWidth: 1 + Math.random() * 2,
        });
      }
    };
    rebuildScanLines(params.scanLineCount);

    // Particles
    let particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; baseOpacity: number }> = [];
    const rebuildParticles = (count: number) => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.2,
          size: 1 + Math.random() * 1.5,
          baseOpacity: 0.5 + Math.random() * 0.5,
        });
      }
    };
    rebuildParticles(params.particleCount);

    let time = 0;
    let prevScanCount = params.scanLineCount;
    let prevParticleCount = params.particleCount;

    const draw = () => {
      const p = paramsRef.current;
      ctx.clearRect(0, 0, width, height);
      time += 0.005;

      // Rebuild arrays if counts changed
      if (p.scanLineCount !== prevScanCount) {
        rebuildScanLines(p.scanLineCount);
        prevScanCount = p.scanLineCount;
      }
      if (p.particleCount !== prevParticleCount) {
        rebuildParticles(p.particleCount);
        prevParticleCount = p.particleCount;
      }

      // ── Grid ──
      if (p.gridOpacity > 0.001) {
        ctx.strokeStyle = `rgba(0, 240, 255, ${p.gridOpacity})`;
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
      }

      // ── Concentric circles ──
      const cx = width * 0.5;
      const cy = height * 0.4;
      const maxRadius = Math.min(width, height) * 0.35;

      if (p.circleOpacity > 0.001) {
        for (let i = 1; i <= 4; i++) {
          const radius = maxRadius * (i / 4);
          const alpha = p.circleOpacity + (i === 2 ? p.circleOpacity * 0.5 : 0);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // ── Radial lines ──
      if (p.radialLines && p.circleOpacity > 0.001) {
        const lineCount = 8;
        const rotation = time * p.circleSpeed;
        ctx.strokeStyle = `rgba(0, 240, 255, ${p.circleOpacity * 0.7})`;
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
      }

      // ── Tick marks ──
      if (p.tickMarks && p.circleOpacity > 0.001) {
        const tickRadius = maxRadius * 0.5;
        const tickCount = 36;
        const tickRotation = time * p.circleSpeed * 0.5;
        ctx.strokeStyle = `rgba(0, 240, 255, ${p.circleOpacity * 1.5})`;
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
      }

      // ── Scan lines ──
      for (const scan of scanLines) {
        scan.y += scan.speed * (p.scanLineSpeed / 0.2);
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
        ctx.lineWidth = scan.lineWidth;
        ctx.beginPath();
        ctx.moveTo(0, scan.y);
        ctx.lineTo(width, scan.y);
        ctx.stroke();
      }

      // ── Particles ──
      for (const pt of particles) {
        pt.x += pt.vx;
        pt.y += pt.vy;
        if (pt.x < 0) pt.x = width;
        if (pt.x > width) pt.x = 0;
        if (pt.y < 0) pt.y = height;
        if (pt.y > height) pt.y = 0;

        ctx.fillStyle = `rgba(0, 240, 255, ${p.particleOpacity * pt.baseOpacity})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Corner crosshairs ──
      if (p.crosshairs) {
        const cs = 20;
        const cg = 30;
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
        ctx.lineWidth = 0.5;

        const drawCorner = (x1: number, y1: number, dx: number, dy: number) => {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x1 + dx * cs, y1);
          ctx.moveTo(x1, y1);
          ctx.lineTo(x1, y1 + dy * cs);
          ctx.stroke();
        };
        drawCorner(cg, cg, 1, 1);
        drawCorner(width - cg, cg, -1, 1);
        drawCorner(cg, height - cg, 1, -1);
        drawCorner(width - cg, height - cg, -1, -1);
      }

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
