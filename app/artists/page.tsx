'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Palette, CheckCircle, XCircle, Layers, Users,
  Mail, ArrowRight, Shield, Sparkles, Heart, Globe,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { SPECS, TEAM, CONTACTS } from '@/data/constants';

/* ── DATA ─────────────────────────────────────────────── */

const PRINCIPLES = [
  { title: 'Embodied Participation', desc: 'Work that requires physical presence, resists easy documentation, deepens over time.', icon: Heart },
  { title: 'Purpose-Built Specificity', desc: 'Work that engages our specific technical canvas\u2014art that couldn\u2019t exist elsewhere.', icon: Shield },
  { title: 'Technogenetic Integration', desc: 'Artists comfortable with technical collaboration; work where technology enables something impossible without it.', icon: Sparkles },
  { title: 'Negentropic Practice', desc: 'Work that rewards sustained attention; concepts that develop over time.', icon: Globe },
];

const PROCESS = [
  { phase: '1', title: 'Conversation', desc: 'Initial concept and feasibility', time: 'Month -9' },
  { phase: '2', title: 'Proposal', desc: 'Detailed concept, technical spec, timeline', time: 'Month -6' },
  { phase: '3', title: 'Development', desc: 'Technical collaboration (3-4 months)', time: 'Months -6 to -2' },
  { phase: '4', title: 'Installation', desc: 'On-site work and calibration (2-4 weeks)', time: 'Months -2 to 0' },
  { phase: '5', title: 'Exhibition', desc: '12-week public run', time: 'Months 0-3' },
  { phase: '6', title: 'Documentation', desc: 'Archive and legacy', time: 'Month 3' },
];

const STRONG_FIT = [
  'Requires embodied presence (not screen-based)',
  'Uses real-time systems (not just video playback)',
  'Specific to spatial audio and projection',
  'Rewards sustained attention (50 minutes)',
  'Creates collective experience (not individual isolation)',
];

const POOR_FIT = [
  'Primarily screen-based or VR headset',
  'Pre-rendered video content',
  'Portable/adaptable to any space',
  'Immediate impact only (no depth)',
  'Individual experience (not collective)',
];

const SELECTION_CRITERIA = [
  { label: 'Alignment with our four principles', weight: '40%' },
  { label: 'Artistic merit', weight: '30%' },
  { label: 'Technical feasibility', weight: '20%' },
  { label: 'Diversity and pluralism', weight: '10%' },
];

const WHAT_YOU_GET = [
  'Artist fee + technical production budget',
  'Full technical collaboration with IDIRNET',
  '12-week exhibition',
  'Professional documentation',
  'Marketing and press support',
];

/* ── PAGE ─────────────────────────────────────────────── */

export default function ArtistsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  const gold = '#c4a265';
  const muted = isDarkMode ? '#aaa' : '#555';
  const cardBg = isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
  const cardBorder = isDarkMode ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(0,0,0,0.08)';

  useEffect(() => {
    if (heroRef.current) {
      gsap.from(heroRef.current.children, {
        opacity: 0, y: 30, stagger: 0.12, duration: 0.8, ease: 'expo.out',
      });
    }
  }, []);

  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
      {/* ── HERO ──────────────────────────────── */}
      <div ref={heroRef} style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem' }}>
        <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: gold, marginBottom: '0.75rem', fontWeight: 600 }}>
          For Artists
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: gold, marginBottom: '0.75rem', lineHeight: 1.1 }}>
          ARTIST BRIEF
        </h1>
        <p style={{ fontSize: '1.1rem', color: muted, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
          Ireland&apos;s first purpose-built immersive gallery. Not adapted&mdash;a space conceived,
          funded, and constructed specifically for immersive art.
        </p>
      </div>

      {/* ── INFRASTRUCTURE ────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={20} style={{ color: gold }} /> The Infrastructure
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Projection', value: `${SPECS.projectors} Barco projectors (4K + 2K)` },
            { label: 'Audio', value: `${SPECS.speakers} L-Acoustics speakers (L-ISA spatial)` },
            { label: 'Sensors', value: `${SPECS.depthCameras} depth-sensing cameras` },
            { label: 'Processing', value: `${SPECS.mediaServers} Pixera media servers` },
            { label: 'Space', value: `${SPECS.totalArea} sq. m. across ${SPECS.galleries} galleries` },
          ].map((s) => (
            <div key={s.label} style={{ background: cardBg, border: cardBorder, borderRadius: 8, padding: '0.75rem 1rem' }}>
              <div style={{ fontSize: '0.75rem', color: gold, fontWeight: 600, letterSpacing: '0.05em' }}>{s.label}</div>
              <div style={{ fontSize: '0.85rem', color: muted }}>{s.value}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.7, fontStyle: 'italic' }}>
          50-minute sessions where visitors stand inside the work, not in front of it.
        </p>
      </section>

      {/* ── FOUR PRINCIPLES ───────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Palette size={20} style={{ color: gold }} /> Our Four Principles
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {PRINCIPLES.map((p, i) => (
            <div key={p.title} style={{ background: cardBg, border: cardBorder, borderRadius: 8, padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: gold }}>{i + 1}.</span>
                <p.icon size={16} style={{ color: gold }} />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111' }}>{p.title}</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: muted, lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW WE WORK ──────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={20} style={{ color: gold }} /> How We Work
        </h2>
        <p style={{ fontSize: '0.9rem', color: gold, fontWeight: 600, marginBottom: '1rem' }}>
          Partnership, not rental. We collaborate technically and artistically.
        </p>

        {/* Commissioning Timeline */}
        <div style={{ position: 'relative', paddingLeft: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 2, background: `${gold}40` }} />
          {PROCESS.map((p, i) => (
            <div key={p.phase} style={{ marginBottom: i < PROCESS.length - 1 ? '1rem' : 0, position: 'relative' }}>
              <div style={{
                position: 'absolute', left: '-1.65rem', top: 4, width: 10, height: 10,
                borderRadius: '50%', background: gold,
              }} />
              <div style={{ fontSize: '0.75rem', color: gold, fontWeight: 700, letterSpacing: '0.05em' }}>
                Phase {p.phase}: {p.title} <span style={{ color: muted, fontWeight: 400 }}>({p.time})</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: muted }}>{p.desc}</div>
            </div>
          ))}
        </div>

        {/* What you get */}
        <div style={{ background: cardBg, border: cardBorder, borderRadius: 8, padding: '1rem 1.25rem' }}>
          <h3 style={{ fontSize: '0.85rem', color: gold, fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.5rem' }}>WHAT YOU GET</h3>
          {WHAT_YOU_GET.map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: muted, lineHeight: 1.8 }}>
              <CheckCircle size={14} style={{ color: '#27ae60', flexShrink: 0 }} /> {item}
            </div>
          ))}
        </div>
      </section>

      {/* ── FIT ASSESSMENT ────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111', marginBottom: '1rem' }}>
          Is Your Work Right for Lightheart?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{ background: cardBg, border: cardBorder, borderRadius: 8, padding: '1.25rem', borderTop: '2px solid #27ae60' }}>
            <h3 style={{ fontSize: '0.85rem', color: '#27ae60', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.75rem' }}>STRONG FIT</h3>
            {STRONG_FIT.map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: muted, lineHeight: 1.8 }}>
                <CheckCircle size={14} style={{ color: '#27ae60', flexShrink: 0, marginTop: 3 }} /> {item}
              </div>
            ))}
          </div>
          <div style={{ background: cardBg, border: cardBorder, borderRadius: 8, padding: '1.25rem', borderTop: '2px solid #ff4444' }}>
            <h3 style={{ fontSize: '0.85rem', color: '#ff4444', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.75rem' }}>POOR FIT</h3>
            {POOR_FIT.map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: muted, lineHeight: 1.8 }}>
                <XCircle size={14} style={{ color: '#ff4444', flexShrink: 0, marginTop: 3 }} /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SELECTION CRITERIA ────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111', marginBottom: '1rem' }}>
          Selection Criteria
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {SELECTION_CRITERIA.map((c) => (
            <div key={c.label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: cardBg, border: cardBorder, borderRadius: 8, padding: '0.75rem 1.25rem',
            }}>
              <span style={{ fontSize: '0.9rem', color: muted }}>{c.label}</span>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: gold }}>{c.weight}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────── */}
      <section style={{
        textAlign: 'center', padding: '2rem',
        background: cardBg, border: cardBorder, borderRadius: 8,
        marginBottom: '1.5rem',
      }}>
        <Mail size={24} style={{ color: gold, marginBottom: '0.75rem' }} />
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111', marginBottom: '0.5rem' }}>
          Propose a Project
        </h3>
        <p style={{ fontSize: '0.9rem', color: muted, marginBottom: '0.75rem', lineHeight: 1.6 }}>
          Send a one-page concept + CV/portfolio. We&apos;ll respond within two weeks to schedule a conversation.
        </p>
        <p style={{ fontSize: '1rem', color: gold, fontWeight: 600 }}>
          {TEAM.kev.name}, Creative Director
        </p>
        <p style={{ fontSize: '0.9rem', color: gold }}>
          {CONTACTS.creative}
        </p>
      </section>

      {/* ── QUOTE ─────────────────────────────── */}
      <div style={{ textAlign: 'center', padding: '1.5rem 0', color: muted, fontSize: '0.85rem', fontStyle: 'italic' }}>
        &ldquo;Negentropy is the condition of all life, all knowledge, all care, and all technics.&rdquo;
        <br />
        <span style={{ color: gold, fontStyle: 'normal', fontSize: '0.75rem' }}>&mdash; Bernard Stiegler</span>
      </div>
    </div>
  );
}
