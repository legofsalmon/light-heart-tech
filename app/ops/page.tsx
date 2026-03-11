'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Activity, Calendar, CheckCircle, Clock, AlertTriangle,
  Users, FileText, Target, Layers,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const PHASE_DATA = [
  { name: 'Planning', status: 'active', weeks: '1–5' },
  { name: 'Pre-Production', status: 'upcoming', weeks: '6–12' },
  { name: 'Installation', status: 'upcoming', weeks: '13–20' },
  { name: 'Commissioning', status: 'upcoming', weeks: '21–23' },
  { name: 'Opening', status: 'upcoming', weeks: '24–25' },
];

const CRITICAL_ITEMS = [
  { label: 'Fire Certification', status: 'critical', detail: 'Application pending — critical path' },
  { label: 'L-Acoustics Quote', status: 'warning', detail: 'Expires 27 Mar 2026' },
  { label: 'Goo Systems Quote', status: 'warning', detail: 'Expires 3 Apr 2026' },
  { label: 'RAD Brand Deliverables', status: 'active', detail: 'In progress — logo, palette, guidelines' },
];

const TSM_STACKS = [
  {
    name: 'Global Stack',
    color: '#2a4a6b',
    planes: ['Venue Infrastructure', 'AV Hardware', 'Network Architecture', 'Power & HVAC', 'Safety & Compliance', 'Budget & Procurement', 'Timeline & Milestones'],
  },
  {
    name: 'Internal Stack',
    color: '#c4a265',
    planes: ['Content Pipeline', 'Sensor Integration', 'Media Server Config', 'Audio Spatial Design', 'Projection Mapping', 'Lighting Design', 'UX Flow'],
  },
  {
    name: 'External Stack',
    color: '#27ae60',
    planes: ['Brand Identity', 'Marketing Strategy', 'Founding Circle', 'PR & Press', 'Community Building', 'Partnerships', 'Launch Comms'],
  },
];

export default function OpsHubPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (heroRef.current) {
      gsap.from(heroRef.current.children, {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.6, ease: 'expo.out',
      });
    }
  }, []);

  const accent = isDarkMode ? '#00F0FF' : '#004466';
  const gold = '#c4a265';
  const muted = isDarkMode ? '#888' : '#666';
  const text = isDarkMode ? '#e0e0e0' : '#1a1a1a';
  const border = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)';
  const cardBg = isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)';

  const statusColor = (s: string) => {
    if (s === 'critical') return '#c0392b';
    if (s === 'warning') return '#f39c12';
    if (s === 'active') return '#27ae60';
    return muted;
  };

  return (
    <div className="page-enter" style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
      {/* Hero */}
      <div ref={heroRef} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="status-dot" style={{ background: accent, boxShadow: `0 0 8px ${accent}99` }} />
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: accent, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Operations Hub
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display, Inter, system-ui)', fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: isDarkMode ? '#fff' : '#111', margin: 0 }}>
          CORE TEAM
        </h1>
        <p style={{ color: muted, fontSize: '0.875rem', marginTop: '0.5rem' }}>
          174 days to opening · Phase 1 of 5 · ~€921K confirmed budget
        </p>
      </div>

      {/* Status cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {CRITICAL_ITEMS.map((item, i) => (
          <div
            key={i}
            style={{
              padding: '1rem',
              background: cardBg,
              border: `1px solid ${border}`,
              borderRadius: '8px',
              borderLeft: `3px solid ${statusColor(item.status)}`,
              position: 'relative',
            }}
          >
            {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: text, marginBottom: '0.25rem' }}>{item.label}</div>
                <div style={{ fontSize: '0.75rem', color: muted }}>{item.detail}</div>
              </div>
              <AlertTriangle size={16} style={{ color: statusColor(item.status), flexShrink: 0 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Phase timeline */}
      <div style={{
        padding: '1.5rem',
        background: cardBg,
        border: `1px solid ${border}`,
        borderRadius: '8px',
        marginBottom: '2rem',
        position: 'relative',
      }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Calendar size={16} style={{ color: accent }} />
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            25-Week Timeline
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', overflow: 'auto' }}>
          {PHASE_DATA.map((phase, i) => (
            <div key={i} style={{
              flex: 1,
              minWidth: '120px',
              padding: '0.75rem',
              borderRadius: '6px',
              background: phase.status === 'active'
                ? `${accent}15`
                : isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
              border: phase.status === 'active'
                ? `1px solid ${accent}40`
                : `1px solid ${border}`,
            }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: phase.status === 'active' ? accent : text, marginBottom: '0.25rem' }}>
                {phase.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: muted }}>Weeks {phase.weeks}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TSM Grid */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Layers size={16} style={{ color: gold }} />
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: gold, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Triple Stack Model
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {TSM_STACKS.map((stack) => (
            <div
              key={stack.name}
              style={{
                padding: '1rem',
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: '8px',
                borderTop: `3px solid ${stack.color}`,
                position: 'relative',
              }}
            >
              {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
              <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: stack.color, marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                {stack.name.toUpperCase()}
              </h3>
              {stack.planes.map((plane, j) => (
                <div key={j} style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.4rem 0',
                  borderBottom: j < stack.planes.length - 1 ? `1px solid ${border}` : 'none',
                }}>
                  <CheckCircle size={12} style={{ color: muted, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.8rem', color: text }}>{plane}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div style={{
        padding: '1rem 1.5rem',
        background: cardBg,
        border: `1px solid ${border}`,
        borderRadius: '8px',
        marginBottom: '3rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'center',
      }}>
        {[
          { icon: FileText, label: 'Tech Spec', href: '/brief' },
          { icon: Users, label: 'Vendors', href: '/vendors' },
          { icon: Target, label: '3D Viz', href: '/visualization' },
          { icon: Activity, label: 'Network', href: '/network' },
          { icon: Clock, label: 'Latency', href: '/latency' },
        ].map(({ icon: Icon, label, href }) => (
          <a key={href} href={href} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 1rem', borderRadius: '6px',
            fontSize: '0.8rem', color: accent,
            textDecoration: 'none',
            border: `1px solid ${accent}30`,
            transition: 'background 0.2s',
          }}>
            <Icon size={14} />
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
