'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Newspaper, Quote, Users, History, ArrowRight,
  Mail, BookOpen,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { SPECS, TEAM, CONTACTS } from '@/data/constants';

/* ── DATA ─────────────────────────────────────────────── */

const FOUR_PRINCIPLES = [
  {
    name: 'Embodied Participation',
    theorist: 'Claire Bishop',
    work: 'Artificial Hells (2012)',
    desc: 'We reject the \u201Cselfie museum\u201D model. Visitors aren\u2019t performers for cameras\u2014they\u2019re present bodies in collective space. Our 50-minute sessions reward absorption, not documentation.',
  },
  {
    name: 'Purpose-Built Specificity',
    theorist: 'Miwon Kwon',
    work: 'One Place After Another (2004)',
    desc: `Lightheart wasn\u2019t adapted\u2014it was built for this. ${SPECS.projectors} projectors, ${SPECS.speakers} speakers, and sensor arrays are permanent infrastructure. Artists create work for this specific canvas.`,
  },
  {
    name: 'Technogenetic Integration',
    theorist: 'Bernard Stiegler',
    work: 'The Neganthropocene (2018)',
    desc: 'Technology isn\u2019t a tool artists use\u2014it\u2019s a co-author. Our real-time systems process visitor presence, creating experiences that couldn\u2019t exist without the technology.',
  },
  {
    name: 'Negentropic Practice',
    theorist: 'Bernard Stiegler',
    work: '',
    desc: `We resist the entropy of the attention economy through duration (50-minute sessions), slowness (quarterly exhibitions), and care (${SPECS.investment} permanent infrastructure).`,
  },
];

const COMPARISON = [
  { typical: 'Rented venue, temporary installation', lightheart: 'Purpose-built, permanent infrastructure' },
  { typical: 'Pre-rendered video content', lightheart: 'Real-time responsive systems' },
  { typical: 'Instagram-optimized moments', lightheart: 'Experiences that resist documentation' },
  { typical: 'Individual experience', lightheart: 'Collective presence' },
  { typical: 'Commercial entertainment', lightheart: 'Curated gallery with artist commissions' },
];

const HISTORY = [
  { period: '1960s\u201370s', desc: 'Art inseparable from location' },
  { period: '1980s\u201390s', desc: 'Art as institutional critique' },
  { period: '2000s+', desc: '\u201CPost-site\u201D art (mobile, discursive)' },
  { period: 'Lightheart', desc: 'Reclaims physical specificity through permanent infrastructure' },
];

const INTERVIEWS = [
  { ...TEAM.kev, topics: 'Curatorial philosophy and theory, technical design and artist collaboration, digital scenography' },
  { ...TEAM.brendan, topics: 'Vision and investment, Dublin\u2019s cultural infrastructure' },
  { ...TEAM.kris, topics: `AV specification and integration, ${SPECS.projectors} projectors, ${SPECS.speakers} speakers, real-time systems` },
];

/* ── PAGE ─────────────────────────────────────────────── */

export default function PressPage() {
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
          Press
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: gold, marginBottom: '0.75rem', lineHeight: 1.1 }}>
          CURATORIAL PHILOSOPHY
        </h1>
        <p style={{ fontSize: '1.1rem', color: muted, maxWidth: 650, margin: '0 auto', lineHeight: 1.6 }}>
          Ireland&apos;s first purpose-built immersive gallery. Art you stand inside, not in front of.
          Experiences that resist easy description. A space where technology serves artistic vision.
        </p>
      </div>

      {/* ── SHORT VERSION ─────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={20} style={{ color: gold }} /> The Short Version
        </h2>
        <div style={{ background: cardBg, border: cardBorder, borderRadius: 8, padding: '1.25rem', borderLeft: `3px solid ${gold}` }}>
          <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.8 }}>
            Lightheart is Ireland&apos;s first purpose-built immersive gallery. Unlike pop-up
            &ldquo;immersive experiences&rdquo; or converted warehouses, every element&mdash;from projector
            placement to acoustic treatment&mdash;was designed for immersive art. Our curatorial
            approach draws on contemporary critical theory: Claire Bishop (participatory art),
            Miwon Kwon (site-specificity), and Bernard Stiegler (negentropy).
          </p>
        </div>
      </section>

      {/* ── FOUR PRINCIPLES ───────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Quote size={20} style={{ color: gold }} /> Four Principles
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {FOUR_PRINCIPLES.map((p, i) => (
            <div key={p.name} style={{ background: cardBg, border: cardBorder, borderRadius: 8, padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: gold }}>{i + 1}.</span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111' }}>{p.name}</h3>
              </div>
              {p.theorist && (
                <p style={{ fontSize: '0.8rem', color: gold, marginBottom: '0.5rem' }}>
                  {p.theorist}{p.work ? `, ${p.work}` : ''}
                </p>
              )}
              <p style={{ fontSize: '0.85rem', color: muted, lineHeight: 1.7 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT MAKES LIGHTHEART DIFFERENT ───── */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111', marginBottom: '1rem' }}>
          What Makes Lightheart Different
        </h2>
        <div style={{ background: cardBg, border: cardBorder, borderRadius: 8, overflow: 'hidden' }}>
          {/* Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            padding: '0.75rem 1.25rem', borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          }}>
            <span style={{ fontSize: '0.75rem', color: '#ff6b6b', fontWeight: 600, letterSpacing: '0.05em' }}>TYPICAL &ldquo;IMMERSIVE&rdquo;</span>
            <span style={{ fontSize: '0.75rem', color: gold, fontWeight: 600, letterSpacing: '0.05em' }}>LIGHTHEART</span>
          </div>
          {COMPARISON.map((c, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              padding: '0.6rem 1.25rem',
              borderBottom: i < COMPARISON.length - 1 ? `1px solid ${isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'}` : 'none',
            }}>
              <span style={{ fontSize: '0.85rem', color: isDarkMode ? '#666' : '#999', textDecoration: 'line-through', textDecorationColor: `${isDarkMode ? '#444' : '#ccc'}` }}>{c.typical}</span>
              <span style={{ fontSize: '0.85rem', color: muted }}>{c.lightheart}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── HISTORICAL CONTEXT ────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <History size={20} style={{ color: gold }} /> Historical Context
        </h2>
        <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.7, marginBottom: '1rem' }}>
          Adolphe Appia (1862-1928), the Swiss scenographer who revolutionized theatrical
          lighting, calling it &ldquo;living, sculptural force.&rdquo; Lightheart extends Appia&apos;s vision
          into digital scenography.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {HISTORY.map((h) => (
            <div key={h.period} style={{
              display: 'flex', alignItems: 'baseline', gap: '1rem',
              background: h.period === 'Lightheart' ? `${gold}10` : cardBg,
              border: h.period === 'Lightheart' ? `1px solid ${gold}30` : cardBorder,
              borderRadius: 8, padding: '0.6rem 1rem',
            }}>
              <span style={{
                fontSize: '0.8rem', fontWeight: 700, minWidth: 90,
                color: h.period === 'Lightheart' ? gold : muted,
              }}>
                {h.period}
              </span>
              <span style={{ fontSize: '0.85rem', color: muted }}>{h.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTERVIEWS ────────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={20} style={{ color: gold }} /> Interview Opportunities
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {INTERVIEWS.map((p) => (
            <div key={p.name} style={{ background: cardBg, border: cardBorder, borderRadius: 8, padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111', marginBottom: '0.25rem' }}>
                {p.name}
              </h3>
              <p style={{ fontSize: '0.8rem', color: gold, fontWeight: 600, marginBottom: '0.5rem' }}>
                {p.title}{'org' in p && p.org ? ` (${p.org})` : ''}
              </p>
              <p style={{ fontSize: '0.8rem', color: muted, lineHeight: 1.5 }}>{p.topics}</p>
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
        <Newspaper size={24} style={{ color: gold, marginBottom: '0.75rem' }} />
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111', marginBottom: '0.5rem' }}>
          For More Information
        </h3>
        <p style={{ fontSize: '0.9rem', color: muted, marginBottom: '0.25rem' }}>
          Full curatorial philosophy available on request
        </p>
        <p style={{ fontSize: '0.9rem', color: muted, marginBottom: '0.75rem' }}>
          Press kit coming June 2026
        </p>
        <p style={{ fontSize: '1rem', color: gold, fontWeight: 600 }}>
          Media contact: {CONTACTS.press}
        </p>
      </section>

      {/* ── CLOSING QUOTE ─────────────────────── */}
      <div style={{ textAlign: 'center', padding: '1.5rem 0', color: muted, fontSize: '0.85rem', fontStyle: 'italic', maxWidth: 600, margin: '0 auto' }}>
        &ldquo;Lightheart stands for presence over performance, specificity over portability,
        co-authorship over tool use, care over consumption. This is our philosophy. This is Lightheart.&rdquo;
      </div>
    </div>
  );
}
