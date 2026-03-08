import { useState } from 'react';
import { Settings, X, RotateCcw } from 'lucide-react';

export interface HudParams {
  gridOpacity: number;
  circleOpacity: number;
  circleSpeed: number;
  scanLineCount: number;
  scanLineSpeed: number;
  particleCount: number;
  particleOpacity: number;
  tickMarks: boolean;
  crosshairs: boolean;
  radialLines: boolean;
}

export const DEFAULT_PARAMS: HudParams = {
  gridOpacity: 0.025,
  circleOpacity: 0.02,
  circleSpeed: 0.3,
  scanLineCount: 3,
  scanLineSpeed: 0.2,
  particleCount: 30,
  particleOpacity: 0.15,
  tickMarks: true,
  crosshairs: true,
  radialLines: true,
};

interface HudSettingsProps {
  params: HudParams;
  onChange: (params: HudParams) => void;
  isDarkMode: boolean;
}

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  accent: string;
  display?: string;
}

function SliderRow({ label, value, min, max, step, onChange, accent, display }: SliderRowProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] uppercase tracking-[0.15em] text-[#888]">{label}</span>
        <span className="text-[10px] font-mono" style={{ color: accent }}>
          {display ?? value.toFixed(step < 0.01 ? 3 : step < 1 ? 2 : 0)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${accent} 0%, ${accent} ${pct}%, rgba(255,255,255,0.08) ${pct}%, rgba(255,255,255,0.08) 100%)`,
        }}
      />
    </div>
  );
}

interface ToggleRowProps {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  accent: string;
}

function ToggleRow({ label, value, onChange, accent }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <span className="text-[10px] uppercase tracking-[0.15em] text-[#888]">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className="w-8 h-4 rounded-full transition-colors relative"
        style={{
          backgroundColor: value ? accent : 'rgba(255,255,255,0.1)',
        }}
      >
        <span
          className="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform"
          style={{ left: value ? '18px' : '2px' }}
        />
      </button>
    </div>
  );
}

export default function HudSettings({ params, onChange, isDarkMode }: HudSettingsProps) {
  const [open, setOpen] = useState(false);

  if (!isDarkMode) return null;

  const accent = '#00F0FF';

  const update = (key: keyof HudParams, value: number | boolean) => {
    onChange({ ...params, [key]: value });
  };

  const reset = () => onChange({ ...DEFAULT_PARAMS });

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-lg transition-all duration-300"
        style={{
          backgroundColor: open ? accent : 'rgba(20, 20, 20, 0.9)',
          color: open ? '#0a0a0a' : '#666',
          border: open ? 'none' : '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
        }}
        title="Background Settings"
      >
        {open ? <X size={16} /> : <Settings size={16} />}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-20 right-6 z-50 w-72 rounded-lg overflow-hidden"
          style={{
            backgroundColor: 'rgba(10, 10, 10, 0.95)',
            border: '1px solid rgba(0, 240, 255, 0.12)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 240, 255, 0.03)',
          }}
        >
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#888]">
              Background Controls
            </span>
            <button
              onClick={reset}
              className="flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 rounded transition-colors"
              style={{ color: '#666' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#666'; }}
              title="Reset to defaults"
            >
              <RotateCcw size={10} />
              Reset
            </button>
          </div>

          {/* Sliders */}
          <div className="px-4 py-3 max-h-[50vh] overflow-y-auto">
            <SliderRow label="Grid" value={params.gridOpacity} min={0} max={0.08} step={0.002}
              onChange={(v) => update('gridOpacity', v)} accent={accent} />

            <SliderRow label="Circles" value={params.circleOpacity} min={0} max={0.06} step={0.002}
              onChange={(v) => update('circleOpacity', v)} accent={accent} />

            <SliderRow label="Rotation Speed" value={params.circleSpeed} min={0} max={1} step={0.05}
              onChange={(v) => update('circleSpeed', v)} accent={accent} />

            <SliderRow label="Scan Lines" value={params.scanLineCount} min={0} max={8} step={1}
              onChange={(v) => update('scanLineCount', v)} accent={accent}
              display={params.scanLineCount.toString()} />

            <SliderRow label="Scan Speed" value={params.scanLineSpeed} min={0.05} max={0.8} step={0.05}
              onChange={(v) => update('scanLineSpeed', v)} accent={accent} />

            <SliderRow label="Particles" value={params.particleCount} min={0} max={80} step={1}
              onChange={(v) => update('particleCount', v)} accent={accent}
              display={params.particleCount.toString()} />

            <SliderRow label="Particle Glow" value={params.particleOpacity} min={0} max={0.4} step={0.01}
              onChange={(v) => update('particleOpacity', v)} accent={accent} />

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', marginTop: '4px' }}>
              <ToggleRow label="Tick Marks" value={params.tickMarks}
                onChange={(v) => update('tickMarks', v)} accent={accent} />
              <ToggleRow label="Crosshairs" value={params.crosshairs}
                onChange={(v) => update('crosshairs', v)} accent={accent} />
              <ToggleRow label="Radial Lines" value={params.radialLines}
                onChange={(v) => update('radialLines', v)} accent={accent} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
