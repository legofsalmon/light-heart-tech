'use client';

import { useState, useCallback } from 'react';
import {
  Settings, X, RotateCcw,
  Volume2, VolumeX,
  Sun, Moon,
  Eye, EyeOff,
  Mic, MicOff,
} from 'lucide-react';
import { useSounds } from '@/components/SoundEngine/SoundEngine';
import { useTheme } from '@/components/ThemeProvider';
import { useHighlights } from './HighlightContext';
import type { HudParams } from '@/components/HudBackground/types';
import { DEFAULT_PARAMS } from '@/components/HudBackground/types';
import styles from './ControlPanel.module.scss';

/* ════════════════════════════════════════
   Color Theory Constants
   ────────────────────────────────────────
   Analogous primary:   Cyan   186°
   Analogous secondary: Teal   170°
   Analogous tertiary:  Blue   210°
   Complementary:       Amber   38°
   Accent:              Orange  30°
   ════════════════════════════════════════ */

interface ControlPanelProps {
  hudParams: HudParams;
  onHudChange: (p: HudParams) => void;
}

export default function ControlPanel({ hudParams, onHudChange }: ControlPanelProps) {
  const [open, setOpen] = useState(false);
  const { muted, toggleMute } = useSounds();
  const { isDarkMode, toggleTheme } = useTheme();
  const { showResearchFlags, toggleResearchFlags } = useHighlights();

  const accent = isDarkMode ? `hsl(${hudParams.hue}, 100%, 50%)` : '#005580';
  const update = useCallback(
    (key: keyof HudParams, value: number | boolean) =>
      onHudChange({ ...hudParams, [key]: value }),
    [hudParams, onHudChange],
  );
  const reset = useCallback(() => onHudChange({ ...DEFAULT_PARAMS }), [onHudChange]);

  const fabClass = `${styles.fab} ${open ? styles.fabOpen : ''}`;

  return (
    <>
      {/* ── FAB ── */}
      <button
        onClick={() => setOpen(o => !o)}
        className={fabClass}
        style={open && isDarkMode ? { background: accent } : undefined}
        title="Settings"
      >
        {open ? <X size={16} /> : <Settings size={16} />}
      </button>

      {/* ── Panel ── */}
      {open && (
        <div
          className={styles.panel}
          style={isDarkMode ? { borderColor: `hsla(${hudParams.hue}, 100%, 50%, 0.1)` } : undefined}
        >
          {/* Header */}
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Controls</span>
            {isDarkMode && (
              <button onClick={reset} className={styles.resetBtn}>
                <RotateCcw size={10} /> Reset
              </button>
            )}
          </div>

          {/* Quick toggles */}
          <div className={styles.quickToggles}>
            {/* Sound — cyan 186° */}
            <button
              onClick={toggleMute}
              className={`${styles.togglePill} ${!muted ? styles.toggleSound : ''}`}
              title={muted ? 'Enable sound' : 'Mute sound'}
            >
              {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
              <span>{muted ? 'Off' : 'On'}</span>
            </button>

            {/* Theme — amber 38° */}
            <button
              onClick={toggleTheme}
              className={`${styles.togglePill} ${styles.toggleTheme}`}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Moon size={12} /> : <Sun size={12} />}
              <span>{isDarkMode ? 'Dark' : 'Light'}</span>
            </button>

            {/* Flags — orange 30° */}
            <button
              onClick={toggleResearchFlags}
              className={`${styles.togglePill} ${showResearchFlags ? styles.toggleFlags : ''}`}
              title={showResearchFlags ? 'Hide research flags' : 'Show research flags'}
            >
              {showResearchFlags ? <Eye size={12} /> : <EyeOff size={12} />}
              <span>Flags</span>
            </button>
          </div>

          {/* Background settings — dark mode only */}
          {isDarkMode && (
            <>
              <div className={styles.divider} />

              <div className={styles.body}>
                <SL label="Grid" />
                <SR label="Opacity" value={hudParams.gridOpacity} min={0} max={0.1} step={0.002}
                  onChange={v => update('gridOpacity', v)} accent={accent} />
                <SR label="Size" value={hudParams.gridSize} min={20} max={120} step={5}
                  onChange={v => update('gridSize', v)} accent={accent} display={`${hudParams.gridSize}px`} />

                <SL label="Circles" />
                <SR label="Opacity" value={hudParams.circleOpacity} min={0} max={0.08} step={0.002}
                  onChange={v => update('circleOpacity', v)} accent={accent} />
                <SR label="Speed" value={hudParams.circleSpeed} min={0} max={1.5} step={0.05}
                  onChange={v => update('circleSpeed', v)} accent={accent} />
                <SR label="Rings" value={hudParams.circleCount} min={0} max={8} step={1}
                  onChange={v => update('circleCount', v)} accent={accent} display={String(hudParams.circleCount)} />

                <SL label="Scan Lines" />
                <SR label="Count" value={hudParams.scanLineCount} min={0} max={10} step={1}
                  onChange={v => update('scanLineCount', v)} accent={accent} display={String(hudParams.scanLineCount)} />
                <SR label="Speed" value={hudParams.scanLineSpeed} min={0.05} max={1} step={0.05}
                  onChange={v => update('scanLineSpeed', v)} accent={accent} />

                <SL label="Particles" />
                <SR label="Count" value={hudParams.particleCount} min={0} max={120} step={1}
                  onChange={v => update('particleCount', v)} accent={accent} display={String(hudParams.particleCount)} />
                <SR label="Glow" value={hudParams.particleOpacity} min={0} max={0.5} step={0.01}
                  onChange={v => update('particleOpacity', v)} accent={accent} />
                <SR label="Size" value={hudParams.particleSize} min={0.5} max={4} step={0.25}
                  onChange={v => update('particleSize', v)} accent={accent} display={`${hudParams.particleSize}px`} />
                <SR label="Drift" value={hudParams.particleSpeed} min={0} max={1} step={0.05}
                  onChange={v => update('particleSpeed', v)} accent={accent} />

                <SL label="Global" />
                <SR label="Brightness" value={hudParams.brightness} min={0.2} max={3} step={0.1}
                  onChange={v => update('brightness', v)} accent={accent}
                  display={`${Math.round(hudParams.brightness * 100)}%`} />
                <SR label="Blur" value={hudParams.blur} min={0} max={8} step={0.5}
                  onChange={v => update('blur', v)} accent={accent}
                  display={hudParams.blur === 0 ? 'Off' : `${hudParams.blur}px`} />
                <SR label="Hue" value={hudParams.hue} min={0} max={360} step={1}
                  onChange={v => update('hue', v)} accent={accent} display={`${hudParams.hue}\u00B0`} />

                <SL label="Elements" />
                <TR label="Tick Marks" value={hudParams.tickMarks}
                  onChange={v => update('tickMarks', v)} accent={accent} />
                <TR label="Crosshairs" value={hudParams.crosshairs}
                  onChange={v => update('crosshairs', v)} accent={accent} />
                <TR label="Radial Lines" value={hudParams.radialLines}
                  onChange={v => update('radialLines', v)} accent={accent} />

                <SL label="Audio Reactive" />
                <TR label="Microphone" value={hudParams.micReactive}
                  onChange={v => update('micReactive', v)} accent={accent}
                  icon={hudParams.micReactive
                    ? <Mic size={10} style={{ color: accent }} />
                    : <MicOff size={10} style={{ color: '#555' }} />}
                />
                {hudParams.micReactive && (
                  <SR label="Sensitivity" value={hudParams.micSensitivity}
                    min={0.5} max={5} step={0.1}
                    onChange={v => update('micSensitivity', v)} accent={accent}
                    display={`${hudParams.micSensitivity.toFixed(1)}x`} />
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════
   Sub-components (migrated from HudSettings)
   Using CSS Modules for styling
   ═══════════════════════════════════════ */

/** Slider Row */
function SR({ label, value, min, max, step, onChange, accent, display }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; accent: string; display?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={styles.sliderRow}>
      <div className={styles.sliderHeader}>
        <span className={styles.sliderLabel}>{label}</span>
        <span className={styles.sliderValue} style={{ color: accent }}>
          {display ?? value.toFixed(step < 0.01 ? 3 : step < 1 ? 2 : 0)}
        </span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className={styles.sliderInput}
        style={{
          background: `linear-gradient(to right, ${accent} 0%, ${accent} ${pct}%, rgba(255,255,255,0.08) ${pct}%, rgba(255,255,255,0.08) 100%)`,
        }}
      />
    </div>
  );
}

/** Toggle Row */
function TR({ label, value, onChange, accent, icon }: {
  label: string; value: boolean; onChange: (v: boolean) => void;
  accent: string; icon?: React.ReactNode;
}) {
  return (
    <div className={styles.toggleRow}>
      <div className={styles.toggleRowLabel}>
        {icon}
        <span className={styles.toggleRowText}>{label}</span>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={styles.toggleSwitch}
        style={{ backgroundColor: value ? accent : 'rgba(255,255,255,0.1)' }}
      >
        <span
          className={styles.toggleKnob}
          style={{ left: value ? '18px' : '2px' }}
        />
      </button>
    </div>
  );
}

/** Section Label */
function SL({ label }: { label: string }) {
  return (
    <div className={styles.sectionLabel}>
      <span className={styles.sectionLabelText}>{label}</span>
      <div className={styles.sectionLabelLine} />
    </div>
  );
}
