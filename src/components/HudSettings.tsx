import { useState } from 'react';
import { Settings, X, RotateCcw, Mic, MicOff } from 'lucide-react';

export interface HudParams {
  gridOpacity: number;
  gridSize: number;
  circleOpacity: number;
  circleSpeed: number;
  circleCount: number;
  scanLineCount: number;
  scanLineSpeed: number;
  scanLineWidth: number;
  particleCount: number;
  particleOpacity: number;
  particleSize: number;
  particleSpeed: number;
  brightness: number;
  blur: number;
  hue: number;
  tickMarks: boolean;
  crosshairs: boolean;
  radialLines: boolean;
  micReactive: boolean;
  micSensitivity: number;
}

export const DEFAULT_PARAMS: HudParams = {
  gridOpacity: 0.025,
  gridSize: 50,
  circleOpacity: 0.02,
  circleSpeed: 0.3,
  circleCount: 4,
  scanLineCount: 3,
  scanLineSpeed: 0.2,
  scanLineWidth: 1.5,
  particleCount: 30,
  particleOpacity: 0.15,
  particleSize: 1.5,
  particleSpeed: 0.3,
  brightness: 1.0,
  blur: 0,
  hue: 186,
  tickMarks: true,
  crosshairs: true,
  radialLines: true,
  micReactive: false,
  micSensitivity: 1.5,
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
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] uppercase tracking-[0.12em] text-[#888]">{label}</span>
        <span className="text-[10px] font-mono" style={{ color: accent }}>
          {display ?? value.toFixed(step < 0.01 ? 3 : step < 1 ? 2 : 0)}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${accent} 0%, ${accent} ${pct}%, rgba(255,255,255,0.08) ${pct}%, rgba(255,255,255,0.08) 100%)`,
        }}
      />
    </div>
  );
}

function ToggleRow({ label, value, onChange, accent, icon }: {
  label: string; value: boolean; onChange: (v: boolean) => void; accent: string; icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-2.5">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-[10px] uppercase tracking-[0.12em] text-[#888]">{label}</span>
      </div>
      <button
        onClick={() => onChange(!value)}
        className="w-8 h-4 rounded-full transition-colors relative"
        style={{ backgroundColor: value ? accent : 'rgba(255,255,255,0.1)' }}
      >
        <span className="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform"
          style={{ left: value ? '18px' : '2px' }}
        />
      </button>
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-2 mt-3">
      <span className="text-[9px] uppercase tracking-[0.2em] text-[#555]">{label}</span>
      <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
    </div>
  );
}

export default function HudSettings({ params, onChange, isDarkMode }: HudSettingsProps) {
  const [open, setOpen] = useState(false);

  if (!isDarkMode) return null;

  const accent = `hsl(${params.hue}, 100%, 50%)`;

  const update = (key: keyof HudParams, value: number | boolean) => {
    onChange({ ...params, [key]: value });
  };

  const reset = () => onChange({ ...DEFAULT_PARAMS });

  return (
    <>
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

      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-72 rounded-lg overflow-hidden"
          style={{
            backgroundColor: 'rgba(10, 10, 10, 0.96)',
            border: `1px solid hsla(${params.hue}, 100%, 50%, 0.12)`,
            backdropFilter: 'blur(20px)',
            boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 20px hsla(${params.hue}, 100%, 50%, 0.03)`,
          }}
        >
          {/* Header */}
          <div className="px-4 py-2.5 flex items-center justify-between"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#888]">Background Controls</span>
            <button onClick={reset}
              className="flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 rounded transition-colors text-[#666] hover:text-[#ccc]"
            >
              <RotateCcw size={10} /> Reset
            </button>
          </div>

          {/* Scrollable body */}
          <div className="px-4 py-2 max-h-[55vh] overflow-y-auto">

            <SectionLabel label="Grid" />
            <SliderRow label="Opacity" value={params.gridOpacity} min={0} max={0.1} step={0.002}
              onChange={(v) => update('gridOpacity', v)} accent={accent} />
            <SliderRow label="Size" value={params.gridSize} min={20} max={120} step={5}
              onChange={(v) => update('gridSize', v)} accent={accent} display={`${params.gridSize}px`} />

            <SectionLabel label="Circles" />
            <SliderRow label="Opacity" value={params.circleOpacity} min={0} max={0.08} step={0.002}
              onChange={(v) => update('circleOpacity', v)} accent={accent} />
            <SliderRow label="Speed" value={params.circleSpeed} min={0} max={1.5} step={0.05}
              onChange={(v) => update('circleSpeed', v)} accent={accent} />
            <SliderRow label="Rings" value={params.circleCount} min={0} max={8} step={1}
              onChange={(v) => update('circleCount', v)} accent={accent} display={params.circleCount.toString()} />

            <SectionLabel label="Scan Lines" />
            <SliderRow label="Count" value={params.scanLineCount} min={0} max={10} step={1}
              onChange={(v) => update('scanLineCount', v)} accent={accent} display={params.scanLineCount.toString()} />
            <SliderRow label="Speed" value={params.scanLineSpeed} min={0.05} max={1} step={0.05}
              onChange={(v) => update('scanLineSpeed', v)} accent={accent} />
            <SliderRow label="Width" value={params.scanLineWidth} min={0.5} max={4} step={0.5}
              onChange={(v) => update('scanLineWidth', v)} accent={accent} display={`${params.scanLineWidth}px`} />

            <SectionLabel label="Particles" />
            <SliderRow label="Count" value={params.particleCount} min={0} max={120} step={1}
              onChange={(v) => update('particleCount', v)} accent={accent} display={params.particleCount.toString()} />
            <SliderRow label="Glow" value={params.particleOpacity} min={0} max={0.5} step={0.01}
              onChange={(v) => update('particleOpacity', v)} accent={accent} />
            <SliderRow label="Size" value={params.particleSize} min={0.5} max={4} step={0.25}
              onChange={(v) => update('particleSize', v)} accent={accent} display={`${params.particleSize}px`} />
            <SliderRow label="Drift" value={params.particleSpeed} min={0} max={1} step={0.05}
              onChange={(v) => update('particleSpeed', v)} accent={accent} />

            <SectionLabel label="Global" />
            <SliderRow label="Brightness" value={params.brightness} min={0.2} max={3} step={0.1}
              onChange={(v) => update('brightness', v)} accent={accent} display={`${Math.round(params.brightness * 100)}%`} />
            <SliderRow label="Blur" value={params.blur} min={0} max={8} step={0.5}
              onChange={(v) => update('blur', v)} accent={accent} display={params.blur === 0 ? 'Off' : `${params.blur}px`} />
            <SliderRow label="Hue" value={params.hue} min={0} max={360} step={1}
              onChange={(v) => update('hue', v)} accent={accent} display={`${params.hue}°`} />

            <SectionLabel label="Elements" />
            <ToggleRow label="Tick Marks" value={params.tickMarks} onChange={(v) => update('tickMarks', v)} accent={accent} />
            <ToggleRow label="Crosshairs" value={params.crosshairs} onChange={(v) => update('crosshairs', v)} accent={accent} />
            <ToggleRow label="Radial Lines" value={params.radialLines} onChange={(v) => update('radialLines', v)} accent={accent} />

            <SectionLabel label="Audio Reactive" />
            <ToggleRow label="Microphone Input" value={params.micReactive}
              onChange={(v) => update('micReactive', v)} accent={accent}
              icon={params.micReactive ? <Mic size={10} style={{ color: accent }} /> : <MicOff size={10} style={{ color: '#555' }} />}
            />
            {params.micReactive && (
              <SliderRow label="Sensitivity" value={params.micSensitivity} min={0.5} max={5} step={0.1}
                onChange={(v) => update('micSensitivity', v)} accent={accent} display={`${params.micSensitivity.toFixed(1)}x`} />
            )}
            {params.micReactive && (
              <div className="text-[9px] text-[#555] leading-relaxed mb-2">
                Particles react to microphone audio levels. Your browser will request mic permission.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
