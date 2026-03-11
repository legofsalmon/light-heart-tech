'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  AlertTriangle, TrendingUp, Calendar, Shield,
  CheckCircle, Clock, ChevronRight,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const DECISIONS = [
  {
    title: 'Fire Certification Application',
    urgency: 'critical',
    detail: 'Building must submit fire cert application to proceed with venue fit-out. This is on the critical path — delays here cascade to all other timelines.',
    action: 'Approve submission via appointed fire consultant',
  },
  {
    title: 'CMS Platform Selection',
    urgency: 'moderate',
    detail: 'Website content management system choice affects development timeline and ongoing costs. Options: headless CMS (Sanity/Contentful) vs. integrated (WordPress).',
    action: 'Review options document and select preference',
  },
  {
    title: 'Founding Circle Pricing Tiers',
    urgency: 'moderate',
    detail: 'Final pricing for the Founding Circle membership programme needs sign-off before marketing materials go to print.',
    action: 'Approve or amend proposed tier structure',
  },
];

const MILESTONES = [
  { date: 'Mar 2026', item: 'Brand guidelines from RAD', status: 'active' },
  { date: 'Mar 2026', item: 'Fire certification submitted', status: 'critical' },
  { date: 'Apr 2026', item: 'Founding Circle pre-launch', status: 'upcoming' },
  { date: 'Apr 2026', item: 'AV vendor contracts signed', status: 'upcoming' },
  { date: 'May 2026', item: 'Website soft launch', status: 'upcoming' },
  { date: 'Jun 2026', item: 'Venue fit-out begins', status: 'upcoming' },
  { date: 'Aug 2026', item: 'AV installation complete', status: 'upcoming' },
  { date: 'Sep 2026', item: 'Opening night', status: 'upcoming' },
];

export default function ExecutivePage() {
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

  const urgencyColor = (u: string) => {
    if (u === 'critical') return '#c0392b';
    if (u === 'moderate') return '#f39c12';
    return accent;
  };

  const statusColor = (s: string) => {
    if (s === 'critical') return '#c0392b';
    if (s === 'active') return '#27ae60';
    return muted;
  };

  return (
    <div className="page-enter" style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 1rem' }}>
      {/* Hero */}
      <div ref={heroRef} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="status-dot" style={{ background: gold, boxShadow: `0 0 8px ${gold}99` }} />
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: gold, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Managing Director Overview
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display, Inter, system-ui)', fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: isDarkMode ? '#fff' : '#111', margin: 0 }}>
          EXECUTIVE DASHBOARD
        </h1>
        <p style={{ color: muted, fontSize: '0.875rem', marginTop: '0.5rem' }}>
          Lightheart — Immersive Experience · Dublin, Ireland · Target Opening September 2026
        </p>
      </div>

      {/* Status stripe */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        {[
          { value: '174', label: 'Days to Opening', color: accent },
          { value: '1/5', label: 'Current Phase', color: accent },
          { value: '3', label: 'Decisions Pending', color: '#f39c12' },
          { value: '1', label: 'Critical Item', color: '#c0392b' },
        ].map((stat, i) => (
          <div key={i} style={{
            padding: '1rem',
            textAlign: 'center',
            background: cardBg,
            border: `1px solid ${border}`,
            borderRadius: '8px',
            position: 'relative',
          }}>
            {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: stat.color, fontFamily: 'var(--font-display, Inter, system-ui)' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.7rem', color: muted, fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Critical alert */}
      <div style={{
        padding: '1rem 1.25rem',
        background: isDarkMode ? 'rgba(192, 57, 43, 0.1)' : 'rgba(192, 57, 43, 0.06)',
        border: '1px solid rgba(192, 57, 43, 0.3)',
        borderRadius: '8px',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}>
        <AlertTriangle size={20} style={{ color: '#c0392b', flexShrink: 0 }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#c0392b' }}>Critical Path: Fire Certification</div>
          <div style={{ fontSize: '0.8rem', color: muted }}>
            This is the single item that can delay the entire project. All other timelines depend on this approval.
          </div>
        </div>
      </div>

      {/* Decisions needed */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Shield size={16} style={{ color: accent }} />
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Decisions Requiring Your Input
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {DECISIONS.map((d, i) => (
            <div key={i} style={{
              padding: '1.25rem',
              background: cardBg,
              border: `1px solid ${border}`,
              borderRadius: '8px',
              borderLeft: `3px solid ${urgencyColor(d.urgency)}`,
              position: 'relative',
            }}>
              {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: text, margin: 0 }}>{d.title}</h3>
                <span style={{
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  background: `${urgencyColor(d.urgency)}20`,
                  color: urgencyColor(d.urgency),
                  fontWeight: 600,
                }}>
                  {d.urgency}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: muted, marginBottom: '0.75rem', lineHeight: 1.6 }}>{d.detail}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: accent }}>
                <ChevronRight size={14} />
                <span style={{ fontWeight: 500 }}>{d.action}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key milestones */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Calendar size={16} style={{ color: gold }} />
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: gold, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Key Milestones
          </span>
        </div>
        <div style={{
          background: cardBg,
          border: `1px solid ${border}`,
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
          {MILESTONES.map((m, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem 1.25rem',
              borderBottom: i < MILESTONES.length - 1 ? `1px solid ${border}` : 'none',
            }}>
              {m.status === 'active' ? (
                <TrendingUp size={14} style={{ color: statusColor(m.status), flexShrink: 0 }} />
              ) : m.status === 'critical' ? (
                <AlertTriangle size={14} style={{ color: statusColor(m.status), flexShrink: 0 }} />
              ) : (
                <Clock size={14} style={{ color: statusColor(m.status), flexShrink: 0 }} />
              )}
              <span style={{ fontSize: '0.75rem', color: muted, fontFamily: 'var(--font-mono, monospace)', minWidth: '70px' }}>{m.date}</span>
              <span style={{ fontSize: '0.85rem', color: text, flex: 1 }}>{m.item}</span>
              <span style={{
                fontSize: '0.6rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: statusColor(m.status),
                fontWeight: 500,
              }}>
                {m.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Budget summary */}
      <div style={{
        padding: '1.5rem',
        background: cardBg,
        border: `1px solid ${border}`,
        borderRadius: '8px',
        marginBottom: '3rem',
        position: 'relative',
      }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <TrendingUp size={16} style={{ color: accent }} />
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Budget Overview
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { label: 'AV Systems', amount: '€401,586', pct: '44%' },
            { label: 'Server Room', amount: '€443,103', pct: '48%' },
            { label: 'Signal & Sensors', amount: '€76,630', pct: '8%' },
          ].map((b, i) => (
            <div key={i} style={{
              padding: '0.75rem',
              borderRadius: '6px',
              background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
              border: `1px solid ${border}`,
            }}>
              <div style={{ fontSize: '0.7rem', color: muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{b.label}</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: text }}>{b.amount}</div>
              <div style={{ fontSize: '0.7rem', color: accent }}>{b.pct} of total</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '1rem', textAlign: 'right', fontSize: '0.875rem', color: muted }}>
          Confirmed total: <span style={{ color: accent, fontWeight: 700 }}>~€921,319</span>
        </div>
      </div>
    </div>
  );
}
