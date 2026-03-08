'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import type { HudParams } from './types';
export { DEFAULT_PARAMS } from './types';
export type { HudParams } from './types';

interface HudBackgroundProps {
  params: HudParams;
}

export default function HudBackground({ params }: HudBackgroundProps) {
  const { isDarkMode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const paramsRef = useRef(params);
  paramsRef.current = params;

  const micStreamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioLevelRef = useRef(0);

  // Mic start/stop
  useEffect(() => {
    if (!params.micReactive) {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((t) => t.stop());
        micStreamRef.current = null;
        analyserRef.current = null;
        audioLevelRef.current = 0;
      }
      return;
    }
    let cancelled = false;
    async function startMic() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return; }
        const ctx = new AudioContext();
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;
        source.connect(analyser);
        micStreamRef.current = stream;
        analyserRef.current = analyser;
      } catch { audioLevelRef.current = 0; }
    }
    startMic();
    return () => {
      cancelled = true;
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((t) => t.stop());
        micStreamRef.current = null;
        analyserRef.current = null;
        audioLevelRef.current = 0;
      }
    };
  }, [params.micReactive]);

  // Canvas draw loop
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

    interface ScanLine { y: number; speed: number; opacity: number; lineWidth: number; }
    interface Particle { x: number; y: number; vx: number; vy: number; baseSize: number; baseOpacity: number; }

    let scanLines: ScanLine[] = [];
    const rebuildScanLines = (count: number) => {
      scanLines = [];
      for (let i = 0; i < count; i++) {
        scanLines.push({ y: Math.random() * height, speed: 0.15 + Math.random() * 0.25, opacity: 0.02 + Math.random() * 0.03, lineWidth: 1 + Math.random() * 2 });
      }
    };
    rebuildScanLines(params.scanLineCount);

    let particles: Particle[] = [];
    const rebuildParticles = (count: number) => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.2, baseSize: 0.5 + Math.random(), baseOpacity: 0.5 + Math.random() * 0.5 });
      }
    };
    rebuildParticles(params.particleCount);

    let time = 0;
    let prevScanCount = params.scanLineCount;
    let prevParticleCount = params.particleCount;
    const freqData = new Uint8Array(128);

    const draw = () => {
      const p = paramsRef.current;
      ctx.clearRect(0, 0, width, height);
      time += 0.005;

      let audioLevel = 0;
      if (analyserRef.current && p.micReactive) {
        analyserRef.current.getByteFrequencyData(freqData);
        let sum = 0;
        for (let i = 0; i < freqData.length; i++) sum += freqData[i];
        audioLevel = (sum / freqData.length / 255) * p.micSensitivity;
        audioLevelRef.current = audioLevel;
      } else { audioLevelRef.current = 0; }

      if (p.scanLineCount !== prevScanCount) { rebuildScanLines(p.scanLineCount); prevScanCount = p.scanLineCount; }
      if (p.particleCount !== prevParticleCount) { rebuildParticles(p.particleCount); prevParticleCount = p.particleCount; }

      const b = p.brightness;
      const hue = p.hue;
      const col = (alpha: number) => `hsla(${hue}, 100%, 50%, ${alpha * b})`;

      // Grid
      if (p.gridOpacity > 0.001) {
        ctx.strokeStyle = col(p.gridOpacity);
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let x = 0; x <= width; x += p.gridSize) { ctx.moveTo(x, 0); ctx.lineTo(x, height); }
        for (let y = 0; y <= height; y += p.gridSize) { ctx.moveTo(0, y); ctx.lineTo(width, y); }
        ctx.stroke();
      }

      // Circles
      const cx = width * 0.5;
      const cy = height * 0.4;
      const maxRadius = Math.min(width, height) * 0.35;
      const micPulse = 1 + audioLevel * 0.3;

      if (p.circleOpacity > 0.001) {
        for (let i = 1; i <= p.circleCount; i++) {
          const radius = maxRadius * (i / p.circleCount) * micPulse;
          const alpha = p.circleOpacity + (i === 2 ? p.circleOpacity * 0.5 : 0);
          ctx.strokeStyle = col(alpha);
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Radial lines
      if (p.radialLines && p.circleOpacity > 0.001) {
        const rotation = time * p.circleSpeed;
        ctx.strokeStyle = col(p.circleOpacity * 0.7);
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + rotation;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(angle) * maxRadius * 0.15, cy + Math.sin(angle) * maxRadius * 0.15);
          ctx.lineTo(cx + Math.cos(angle) * maxRadius * 0.95 * micPulse, cy + Math.sin(angle) * maxRadius * 0.95 * micPulse);
          ctx.stroke();
        }
      }

      // Tick marks
      if (p.tickMarks && p.circleOpacity > 0.001 && p.circleCount >= 2) {
        const tickRadius = maxRadius * (2 / p.circleCount) * micPulse;
        const tickRotation = time * p.circleSpeed * 0.5;
        ctx.strokeStyle = col(p.circleOpacity * 1.5);
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 36; i++) {
          const angle = (i / 36) * Math.PI * 2 + tickRotation;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(angle) * (tickRadius - 4), cy + Math.sin(angle) * (tickRadius - 4));
          ctx.lineTo(cx + Math.cos(angle) * (tickRadius + 4), cy + Math.sin(angle) * (tickRadius + 4));
          ctx.stroke();
        }
      }

      // Scan lines
      for (const scan of scanLines) {
        scan.y += scan.speed * (p.scanLineSpeed / 0.2);
        if (scan.y > height + 10) { scan.y = -10; scan.opacity = 0.02 + Math.random() * 0.03; }
        const w = p.scanLineWidth + audioLevel * 3;
        const gradient = ctx.createLinearGradient(0, scan.y, width, scan.y);
        gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 0)`);
        gradient.addColorStop(0.3, col(scan.opacity));
        gradient.addColorStop(0.7, col(scan.opacity));
        gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = w;
        ctx.beginPath();
        ctx.moveTo(0, scan.y);
        ctx.lineTo(width, scan.y);
        ctx.stroke();
      }

      // Particles
      for (const pt of particles) {
        const speedMult = p.particleSpeed / 0.3;
        const micBoost = 1 + audioLevel * 2;
        pt.x += pt.vx * speedMult * micBoost;
        pt.y += pt.vy * speedMult * micBoost;
        if (pt.x < 0) pt.x = width;
        if (pt.x > width) pt.x = 0;
        if (pt.y < 0) pt.y = height;
        if (pt.y > height) pt.y = 0;
        const size = p.particleSize * pt.baseSize * (1 + audioLevel * 1.5);
        const opacity = p.particleOpacity * pt.baseOpacity * (1 + audioLevel * 2);
        ctx.fillStyle = col(opacity);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
        ctx.fill();
        if (audioLevel > 0.15) {
          ctx.strokeStyle = col(opacity * 0.3);
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, size * 2.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Crosshairs
      if (p.crosshairs) {
        const cs = 20;
        const cg = 30;
        ctx.strokeStyle = col(0.06);
        ctx.lineWidth = 0.5;
        const corner = (x: number, y: number, dx: number, dy: number) => {
          ctx.beginPath();
          ctx.moveTo(x, y); ctx.lineTo(x + dx * cs, y);
          ctx.moveTo(x, y); ctx.lineTo(x, y + dy * cs);
          ctx.stroke();
        };
        corner(cg, cg, 1, 1);
        corner(width - cg, cg, -1, 1);
        corner(cg, height - cg, 1, -1);
        corner(width - cg, height - cg, -1, -1);
      }

      // Audio level bar
      if (p.micReactive && audioLevel > 0) {
        const barW = 60; const barH = 3;
        const bx = width - 30 - barW; const by = 30;
        ctx.fillStyle = col(0.05);
        ctx.fillRect(bx, by, barW, barH);
        ctx.fillStyle = col(0.3 + audioLevel * 0.5);
        ctx.fillRect(bx, by, barW * Math.min(audioLevel, 1), barH);
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
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        filter: params.blur > 0 ? `blur(${params.blur}px)` : 'none',
      }}
    />
  );
}
