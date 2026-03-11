'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Megaphone, Users, Palette, Globe,
  Mail, FileText, ExternalLink,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const CONTENT_PILLARS = [
  { title: 'The Technology Story', desc: 'Spatial audio, 37 projectors, real-time responsive environments — the engineering that makes it feel like magic.' },
  { title: 'The Cultural Layer', desc: 'Art, music, performance in a space that dissolves the boundary between audience and experience.' },
  { title: 'The Dublin Context', desc: 'A new kind of venue for a city already known for creativity, nightlife, and cultural innovation.' },
  { title: 'The Invitation', desc: 'Join the Founding Circle. Be part of something from the very beginning.' },
];

const CURATORIAL_PRINCIPLES = [
  { name: 'Pharmakon', desc: 'Every experience contains its remedy and its risk — tension is the goal' },
  { name: 'Embodied Knowledge', desc: 'Understanding through sensation, not explanation' },
  { name: 'Relational Space', desc: 'The audience completes the work — no two nights identical' },
  { name: 'Living Systems', desc: 'Technology that breathes, responds, and evolves in real-time' },
];

const MARKETING_PROGRESS = [
  { item: 'PR & Marketing Master Strategy', status: 'complete' },
  { item: 'Founding Member Programme Design', status: 'complete' },
  { item: 'Content Pillars & Voice Guide', status: 'complete' },
  { item: 'RAD Brand Agency Brief', status: 'active' },
  { item: 'Logo & Visual Identity', status: 'active' },
  { item: 'Website Design & Development', status: 'active' },
  { item: 'Investor Pitch Deck', status: 'pending' },
  { item: 'Press Kit', status: 'pending' },
  { item: 'Social Media Strategy', status: 'pending' },
  { item: 'Founding Circle Launch Campaign', status: 'pending' },
];

export default function MarketingPage() {
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
    if (s === 'complete') return '#27ae60';
    if (s === 'active') return accent;
    return muted;
  };

  const statusIcon = (s: string) => {
    if (s === 'complete') return '✓';
    if (s === 'active') return '●';
    return '○';
  };

  return (
    <div className="page-enter" style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 1rem' }}>
      {/* Hero */}
      <div ref={heroRef} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="status-dot" style={{ background: gold, boxShadow: `0 0 8px ${gold}99` }} />
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: gold, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Marketing & Brand
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display, Inter, system-ui)', fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: isDarkMode ? '#fff' : '#111', margin: 0 }}>
          MARKETING HUB
        </h1>
        <p style={{ color: muted, fontSize: '0.875rem', marginTop: '0.5rem' }}>
          Brand strategy, content, and campaign management for Lightheart
        </p>
      </div>

      {/* Progress tracker */}
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
          <Megaphone size={16} style={{ color: accent }} />
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Deliverables Progress
          </span>
        </div>
        {MARKETING_PROGRESS.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.5rem 0',
            borderBottom: i < MARKETING_PROGRESS.length - 1 ? `1px solid ${border}` : 'none',
          }}>
            <span style={{ color: statusColor(item.status), fontSize: '0.8rem', width: '1rem', textAlign: 'center' }}>
              {statusIcon(item.status)}
            </span>
            <span style={{ fontSize: '0.85rem', color: text, flex: 1 }}>{item.item}</span>
            <span style={{
              fontSize: '0.6rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: statusColor(item.status),
              fontWeight: 500,
            }}>
              {item.status}
            </span>
          </div>
        ))}
      </div>

      {/* Content pillars */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Globe size={16} style={{ color: gold }} />
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: gold, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Content Pillars
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {CONTENT_PILLARS.map((pillar, i) => (
            <div key={i} style={{
              padding: '1.25rem',
              background: cardBg,
              border: `1px solid ${border}`,
              borderRadius: '8px',
              position: 'relative',
            }}>
              {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
              <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: text, marginBottom: '0.5rem' }}>{pillar.title}</h3>
              <p style={{ fontSize: '0.8rem', color: muted, lineHeight: 1.6, margin: 0 }}>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Curatorial principles */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Palette size={16} style={{ color: accent }} />
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Curatorial Principles
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {CURATORIAL_PRINCIPLES.map((p, i) => (
            <div key={i} style={{
              padding: '1rem 1.25rem',
              background: cardBg,
              border: `1px solid ${border}`,
              borderRadius: '8px',
              borderTop: `2px solid ${gold}`,
              position: 'relative',
            }}>
              {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: gold, marginBottom: '0.25rem' }}>{p.name}</h4>
              <p style={{ fontSize: '0.75rem', color: muted, lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
