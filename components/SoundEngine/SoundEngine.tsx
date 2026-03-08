'use client';

import { createContext, useContext, useCallback, useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// ── Audio context singleton ──────────────────
let audioCtx: AudioContext | null = null;
function getAudioCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function playTone(
  frequency: number, duration: number, volume: number,
  type: OscillatorType = 'sine', detune: number = 0,
) {
  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  osc.detune.value = detune;
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

function playNoise(duration: number, volume: number) {
  const ctx = getAudioCtx();
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.01;
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 8000;
  source.buffer = buffer;
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(ctx.currentTime);
}

const sounds = {
  hover: (vol: number) => { playTone(2400, 0.06, vol * 0.08, 'sine'); },
  click: (vol: number) => { playTone(1800, 0.08, vol * 0.12, 'sine'); playTone(2200, 0.05, vol * 0.06, 'sine', 5); },
  navigate: (vol: number) => {
    playTone(800, 0.15, vol * 0.08, 'sine');
    setTimeout(() => playTone(1200, 0.12, vol * 0.06, 'sine'), 60);
    setTimeout(() => playTone(1600, 0.1, vol * 0.04, 'sine'), 120);
  },
  expand: (vol: number) => { playTone(600, 0.12, vol * 0.07, 'triangle'); setTimeout(() => playTone(900, 0.1, vol * 0.05, 'triangle'), 50); },
  collapse: (vol: number) => { playTone(900, 0.1, vol * 0.05, 'triangle'); setTimeout(() => playTone(600, 0.12, vol * 0.07, 'triangle'), 50); },
  copy: (vol: number) => { playTone(1400, 0.06, vol * 0.1, 'sine'); setTimeout(() => playTone(1800, 0.08, vol * 0.08, 'sine'), 40); },
  scan: (vol: number) => { playNoise(0.3, vol * 0.03); playTone(4000, 0.2, vol * 0.02, 'sine'); },
  ambient: (vol: number) => { playTone(80, 2, vol * 0.015, 'sine'); playTone(120, 2, vol * 0.01, 'sine', 3); },
};

export type SoundName = keyof typeof sounds;

interface SoundContextValue {
  play: (name: SoundName) => void;
  muted: boolean;
  volume: number;
}

const SoundContext = createContext<SoundContextValue>({
  play: () => {},
  muted: true,
  volume: 0.5,
});

export function useSounds() {
  return useContext(SoundContext);
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(true);
  const [volume] = useState(0.5);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  useEffect(() => {
    const saved = sessionStorage.getItem('lightheart_muted');
    if (saved !== null) setMuted(saved === 'true');
  }, []);

  const play = useCallback((name: SoundName) => {
    if (mutedRef.current) return;
    const fn = sounds[name];
    if (fn) { try { fn(volume); } catch { /* ignore */ } }
  }, [volume]);

  useEffect(() => {
    sessionStorage.setItem('lightheart_muted', String(muted));
  }, [muted]);

  return (
    <SoundContext.Provider value={{ play, muted, volume }}>
      {children}
      <button
        onClick={() => {
          if (muted) { try { getAudioCtx(); sounds.click(0.5); } catch { /* */ } }
          setMuted(prev => !prev);
        }}
        style={{
          position: 'fixed', bottom: '1.5rem', left: '1.5rem', zIndex: 50,
          padding: '0.625rem', borderRadius: '8px', transition: 'all 0.3s',
          backgroundColor: 'rgba(20, 20, 20, 0.9)',
          border: `1px solid ${muted ? 'rgba(255,255,255,0.08)' : 'rgba(0, 240, 255, 0.2)'}`,
          backdropFilter: 'blur(12px)',
          color: muted ? '#555' : '#00F0FF',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        title={muted ? 'Enable sounds' : 'Mute sounds'}
      >
        {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>
    </SoundContext.Provider>
  );
}
