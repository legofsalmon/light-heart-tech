'use client';

import { useState } from 'react';
import { Settings, X, RotateCcw, Mic, MicOff } from 'lucide-react';
import type { HudParams } from '@/components/HudBackground/types';
import { DEFAULT_PARAMS } from '@/components/HudBackground/types';

interface HudSettingsProps {
  params: HudParams;
  onChange: (params: HudParams) => void;
}

export default function HudSettings({ params, onChange }: HudSettingsProps) {
  const [open, setOpen] = useState(false);
  const accent = `hsl(${params.hue}, 100%, 50%)`;
  const update = (key: keyof HudParams, value: number | boolean) => onChange({ ...params, [key]: value });
  const reset = () => onChange({ ...DEFAULT_PARAMS });

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 50,
          padding: '0.75rem', borderRadius: '8px', transition: 'all 0.3s',
          backgroundColor: open ? accent : 'rgba(20, 20, 20, 0.9)',
          color: open ? '#0a0a0a' : '#666',
          border: open ? 'none' : '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        title="Background Settings"
      >
        {open ? <X size={16} /> : <Settings size={16} />}
      </button>

      {open && (
        <div style={{
          position: 'fixed', bottom: '5rem', right: '1.5rem', zIndex: 50,
          width: '18rem', borderRadius: '8px', overflow: 'hidden',
          backgroundColor: 'rgba(10, 10, 10, 0.96)',
          border: `1px solid hsla(${params.hue}, 100%, 50%, 0.12)`,
          backdropFilter: 'blur(20px)',
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 20px hsla(${params.hue}, 100%, 50%, 0.03)`,
        }}>
          {/* Header */}
          <div style={{ padding: '0.625rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#888' }}>Background Controls</span>
            <button onClick={reset} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666', background: 'none', border: 'none', cursor: 'pointer' }}>
              <RotateCcw size={10} /> Reset
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '0.5rem 1rem', maxHeight: '55vh', overflowY: 'auto' }}>
            <SL label="Grid" />
            <SR label="Opacity" value={params.gridOpacity} min={0} max={0.1} step={0.002} onChange={v => update('gridOpacity', v)} accent={accent} />
            <SR label="Size" value={params.gridSize} min={20} max={120} step={5} onChange={v => update('gridSize', v)} accent={accent} display={`${params.gridSize}px`} />

            <SL label="Circles" />
            <SR label="Opacity" value={params.circleOpacity} min={0} max={0.08} step={0.002} onChange={v => update('circleOpacity', v)} accent={accent} />
            <SR label="Speed" value={params.circleSpeed} min={0} max={1.5} step={0.05} onChange={v => update('circleSpeed', v)} accent={accent} />
            <SR label="Rings" value={params.circleCount} min={0} max={8} step={1} onChange={v => update('circleCount', v)} accent={accent} display={String(params.circleCount)} />

            <SL label="Scan Lines" />
            <SR label="Count" value={params.scanLineCount} min={0} max={10} step={1} onChange={v => update('scanLineCount', v)} accent={accent} display={String(params.scanLineCount)} />
            <SR label="Speed" value={params.scanLineSpeed} min={0.05} max={1} step={0.05} onChange={v => update('scanLineSpeed', v)} accent={accent} />

            <SL label="Particles" />
            <SR label="Count" value={params.particleCount} min={0} max={120} step={1} onChange={v => update('particleCount', v)} accent={accent} display={String(params.particleCount)} />
            <SR label="Glow" value={params.particleOpacity} min={0} max={0.5} step={0.01} onChange={v => update('particleOpacity', v)} accent={accent} />
            <SR label="Size" value={params.particleSize} min={0.5} max={4} step={0.25} onChange={v => update('particleSize', v)} accent={accent} display={`${params.particleSize}px`} />
            <SR label="Drift" value={params.particleSpeed} min={0} max={1} step={0.05} onChange={v => update('particleSpeed', v)} accent={accent} />

            <SL label="Global" />
            <SR label="Brightness" value={params.brightness} min={0.2} max={3} step={0.1} onChange={v => update('brightness', v)} accent={accent} display={`${Math.round(params.brightness * 100)}%`} />
            <SR label="Blur" value={params.blur} min={0} max={8} step={0.5} onChange={v => update('blur', v)} accent={accent} display={params.blur === 0 ? 'Off' : `${params.blur}px`} />
            <SR label="Hue" value={params.hue} min={0} max={360} step={1} onChange={v => update('hue', v)} accent={accent} display={`${params.hue}°`} />

            <SL label="Elements" />
            <TR label="Tick Marks" value={params.tickMarks} onChange={v => update('tickMarks', v)} accent={accent} />
            <TR label="Crosshairs" value={params.crosshairs} onChange={v => update('crosshairs', v)} accent={accent} />
            <TR label="Radial Lines" value={params.radialLines} onChange={v => update('radialLines', v)} accent={accent} />

            <SL label="Audio Reactive" />
            <TR label="Microphone" value={params.micReactive} onChange={v => update('micReactive', v)} accent={accent}
              icon={params.micReactive ? <Mic size={10} style={{ color: accent }} /> : <MicOff size={10} style={{ color: '#555' }} />} />
            {params.micReactive && (
              <SR label="Sensitivity" value={params.micSensitivity} min={0.5} max={5} step={0.1} onChange={v => update('micSensitivity', v)} accent={accent} display={`${params.micSensitivity.toFixed(1)}x`} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ── Slider Row ──
function SR({ label, value, min, max, step, onChange, accent, display }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; accent: string; display?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#888' }}>{label}</span>
        <span style={{ fontSize: '10px', fontFamily: 'monospace', color: accent }}>{display ?? value.toFixed(step < 0.01 ? 3 : step < 1 ? 2 : 0)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{
          width: '100%', height: '4px', borderRadius: '2px', appearance: 'none', cursor: 'pointer',
          background: `linear-gradient(to right, ${accent} 0%, ${accent} ${pct}%, rgba(255,255,255,0.08) ${pct}%, rgba(255,255,255,0.08) 100%)`,
        }}
      />
    </div>
  );
}

// ── Toggle Row ──
function TR({ label, value, onChange, accent, icon }: {
  label: string; value: boolean; onChange: (v: boolean) => void; accent: string; icon?: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        {icon}
        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#888' }}>{label}</span>
      </div>
      <button onClick={() => onChange(!value)} style={{
        width: '2rem', height: '1rem', borderRadius: '9999px', position: 'relative',
        backgroundColor: value ? accent : 'rgba(255,255,255,0.1)',
        border: 'none', cursor: 'pointer', transition: 'background-color 0.2s',
      }}>
        <span style={{
          position: 'absolute', top: '2px', width: '0.75rem', height: '0.75rem',
          borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
          left: value ? '18px' : '2px',
        }} />
      </button>
    </div>
  );
}

// ── Section Label ──
function SL({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', marginTop: '0.75rem' }}>
      <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#555' }}>{label}</span>
      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
    </div>
  );
}
