'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import {
  Megaphone, Users, Palette, Globe, Building,
  Eye, Ticket, Star,
  Newspaper, ArrowRight, Layers, Volume2,
  Fingerprint, Sparkles, Target, BookOpen,
  MessageSquare, Lightbulb, Zap, TrendingUp,
  UserCheck, Plane, Monitor, Heart,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { SPECS, TEAM, CONTACTS } from '@/data/constants';

/* ── DATA ─────────────────────────────────────────────── */

const NAV_CARDS = [
  { href: '/about', title: 'About Lightheart', desc: 'Our story, mission, and the team building Dublin\'s immersive gallery.', icon: Building },
  { href: '/visit', title: 'Plan Your Visit', desc: 'Location, accessibility, and everything you need before you arrive.', icon: Ticket },
  { href: '/artists', title: 'Artist Briefs', desc: 'Commission guidelines, technical specs, and creative parameters.', icon: Palette },
  { href: '/exhibitions', title: 'Exhibitions', desc: 'Current and upcoming immersive exhibitions at Lightheart.', icon: Eye },
  { href: '/membership', title: 'Founding Circle', desc: 'Exclusive founding membership programme with lifetime benefits.', icon: Star },
  { href: '/press', title: 'Press Room', desc: 'Media resources, press releases, and journalist contacts.', icon: Newspaper },
];

const BRAND_PILLARS = [
  { name: 'Immersion', desc: 'Floor-to-ceiling projection across two galleries. You don\'t observe the art.', icon: Layers, accent: '#00d4ff' },
  { name: 'Commission', desc: 'Every exhibition is purpose-made for the space. No touring packages.', icon: Sparkles, accent: '#c4a265' },
  { name: 'Sound', desc: `${SPECS.speakers} speakers, spatial audio by L-Acoustics. Sound you feel in your chest.`, icon: Volume2, accent: '#00d4ff' },
  { name: 'Presence', desc: '44 depth cameras track movement. The art responds to you.', icon: Fingerprint, accent: '#c4a265' },
];

const WHAT_WE_ARE = [
  'A purpose-built immersive gallery',
  'An art venue with nightlife energy',
  'A commissioning house for digital artists',
  'Dublin\'s newest cultural destination',
];

const WHAT_WE_ARE_NOT = [
  'A projection-mapping tourist attraction',
  'A museum with screens',
  'A tech demo or showroom',
  'A generic \'experience\' brand',
];

const CONTENT_PILLARS = [
  { title: 'The Technology Story', desc: `Spatial audio, ${SPECS.projectors} projectors, real-time responsive environments\u2014the engineering that makes it feel like magic.`, icon: Monitor },
  { title: 'The Cultural Layer', desc: 'Art, music, performance in a space that dissolves the boundary between audience and experience.', icon: Palette },
  { title: 'The Dublin Context', desc: 'A new kind of venue for a city already known for creativity, nightlife, and cultural innovation.', icon: Globe },
  { title: 'The Invitation', desc: 'Join the Founding Circle. Be part of something from the very beginning.', icon: Heart },
];

const CURATORIAL_PRINCIPLES = [
  { name: 'Pharmakon', desc: 'Every experience contains its remedy and its risk\u2014tension is the goal' },
  { name: 'Embodied Knowledge', desc: 'Understanding through sensation, not explanation' },
  { name: 'Relational Space', desc: 'The audience completes the work\u2014no two nights identical' },
  { name: 'Living Systems', desc: 'Technology that breathes, responds, and evolves in real-time' },
];

const AUDIENCE_SEGMENTS = [
  { label: 'Art World', subtitle: 'Critics, Curators, Collectors', message: 'A serious commissioning venue with curatorial rigour and technical ambition that rivals any international institution.', icon: Eye, color: '#c4a265' },
  { label: 'Cultural Consumers', subtitle: 'Ages 25\u201445, Experience-Seekers', message: 'The most extraordinary night out in Dublin. Not a gallery visit\u2014an experience you feel.', icon: Users, color: '#00d4ff' },
  { label: 'Tech-Curious', subtitle: 'Designers, Developers, Creatives', message: `${SPECS.projectors} projectors. ${SPECS.speakers} speakers. 44 depth cameras. Purpose-built from the ground up.`, icon: Monitor, color: '#c4a265' },
  { label: 'Tourists', subtitle: 'International Visitors', message: 'Ireland\'s only purpose-built immersive gallery. A cultural destination unlike anything else in Europe.', icon: Plane, color: '#00d4ff' },
];

const MARKETING_PROGRESS = [
  { item: 'PR & Marketing Master Strategy', status: 'complete' },
  { item: 'Founding Member Programme Design', status: 'complete' },
  { item: 'Content Pillars & Voice Guide', status: 'complete' },
  { item: 'Brand Positioning Strategy', status: 'complete' },
  { item: 'Exhibition Page (Digital Nature)', status: 'complete' },
  { item: 'Membership Page (Founding Circle)', status: 'complete' },
  { item: 'RAD Brand Agency Brief', status: 'active' },
  { item: 'Logo & Visual Identity', status: 'active' },
  { item: 'Website Design & Development', status: 'active' },
  { item: 'Instagram Launch Pack', status: 'complete', ref: 'C-008' },
  { item: 'LinkedIn Launch Pack', status: 'complete', ref: 'C-009' },
  { item: 'Newsletter Welcome Sequence', status: 'complete', ref: 'C-010' },
  { item: 'Press Release', status: 'complete', ref: 'C-011' },
  { item: 'Countdown Campaign', status: 'complete', ref: 'C-012' },
  { item: 'Investor Pitch Deck', status: 'pending' },
  { item: 'Press Kit', status: 'pending' },
  { item: 'Social Media Strategy', status: 'pending' },
];

const BRAND_VOICE_TRAITS = [
  { trait: 'Confident', boundary: 'not arrogant' },
  { trait: 'Warm', boundary: 'not casual' },
  { trait: 'Specific', boundary: 'not technical' },
  { trait: 'European', boundary: 'Swiss design sensibility' },
];

const SIX_TOOLS = [
  { name: 'Triple Stack Model', desc: 'Infrastructure / Embodied Perception / Relational Space', icon: Layers, color: '#00d4ff' },
  { name: 'Alchemy (Sutherland)', desc: 'Technology disappears, only art remains', icon: Sparkles, color: '#c4a265' },
  { name: 'Purple Cow (Godin)', desc: 'First purpose-built immersive gallery in Ireland', icon: Zap, color: '#00d4ff' },
  { name: 'Persuasion (Cialdini)', desc: 'Authority + Scarcity + Social Proof', icon: UserCheck, color: '#c4a265' },
  { name: 'Story-Driven (Jiwa)', desc: 'Feeling first, features second', icon: BookOpen, color: '#00d4ff' },
  { name: 'RACE (McNulty)', desc: 'Reach \u2192 Act \u2192 Convert \u2192 Engage', icon: TrendingUp, color: '#c4a265' },
];

/* ── COMPONENT ────────────────────────────────────────── */

export default function MarketingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (heroRef.current) {
      gsap.from(heroRef.current.children, {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.6, ease: 'expo.out',
      });
    }
    if (navRef.current) {
      gsap.from(navRef.current.children, {
        opacity: 0, y: 30, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.3,
      });
    }
    if (brandRef.current) {
      gsap.from(brandRef.current.children, {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: 'power3.out', delay: 0.5,
      });
    }
  }, []);

  const accent = isDarkMode ? '#00d4ff' : '#004466';
  const gold = '#c4a265';
  const muted = isDarkMode ? '#888' : '#666';
  const text = isDarkMode ? '#e0e0e0' : '#1a1a1a';
  const border = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)';
  const cardBg = isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)';
  const headingColor = isDarkMode ? '#fff' : '#111';

  const statusColor = (s: string) => {
    if (s === 'complete') return '#27ae60';
    if (s === 'active') return accent;
    return muted;
  };

  const statusIcon = (s: string) => {
    if (s === 'complete') return '\u2713';
    if (s === 'active') return '\u25CF';
    return '\u25CB';
  };

  /* ── Shared styles ─── */
  const sectionHeading = (icon: React.ReactNode, label: string, color: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
      {icon}
      <span style={{
        fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem',
        color, letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>
        {label}
      </span>
    </div>
  );

  const card = (extra?: React.CSSProperties): React.CSSProperties => ({
    padding: '1.25rem',
    background: cardBg,
    border: `1px solid ${border}`,
    borderRadius: '8px',
    position: 'relative' as const,
    ...extra,
  });

  const hudCorners = isDarkMode ? (
    <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />
  ) : null;

  return (
    <div className="page-enter" style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 1rem' }}>

      {/* ═══════════════════════════════════════════════════
          1. HERO
         ═══════════════════════════════════════════════════ */}
      <div ref={heroRef} style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="status-dot" style={{ background: gold, boxShadow: `0 0 8px ${gold}99` }} />
          <span style={{
            fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem',
            color: gold, letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            Marketing & Brand Strategy
          </span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display, Inter, system-ui)', fontSize: '2.5rem',
          fontWeight: 700, letterSpacing: '-0.02em', color: headingColor, margin: 0,
        }}>
          MARKETING HUB
        </h1>
        <p style={{ color: muted, fontSize: '0.95rem', marginTop: '0.5rem', lineHeight: 1.6, maxWidth: '42rem' }}>
          Building Dublin{'\u2019'}s immersive gallery brand{'\u2014'}strategy, content, campaigns, and the
          navigation gateway to every public-facing page.
        </p>
        <p style={{
          color: gold, fontSize: '0.8rem', marginTop: '0.75rem',
          fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.05em',
        }}>
          Opening {SPECS.opening} &middot; {SPECS.projectors} Projectors &middot; {SPECS.speakers} Speakers &middot; {SPECS.galleries} Galleries
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════
          2. QUICK NAV GRID
         ═══════════════════════════════════════════════════ */}
      {sectionHeading(<ArrowRight size={16} style={{ color: accent }} />, 'Quick Navigation', accent)}
      <div
        ref={navRef}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '3rem' }}
      >
        {NAV_CARDS.map((c, i) => {
          const Icon = c.icon;
          return (
            <Link key={i} href={c.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                ...card({ transition: 'border-color 0.2s, transform 0.2s', cursor: 'pointer' }),
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = gold;
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = border;
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                {hudCorners}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div style={{
                    width: '2rem', height: '2rem', borderRadius: '6px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isDarkMode ? 'rgba(196,162,101,0.12)' : 'rgba(196,162,101,0.1)',
                  }}>
                    <Icon size={16} style={{ color: gold }} />
                  </div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: headingColor, margin: 0 }}>
                    {c.title}
                  </h3>
                  <ArrowRight size={14} style={{ color: muted, marginLeft: 'auto' }} />
                </div>
                <p style={{ fontSize: '0.8rem', color: muted, lineHeight: 1.5, margin: 0 }}>
                  {c.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════
          3. BRAND POSITIONING
         ═══════════════════════════════════════════════════ */}
      <div ref={brandRef} style={{ marginBottom: '3rem' }}>
        {sectionHeading(<Target size={16} style={{ color: gold }} />, 'Brand Positioning', gold)}

        {/* Core statement + promise */}
        <div style={{
          ...card({ marginBottom: '1.5rem', borderLeft: `3px solid ${gold}` }),
        }}>
          {hudCorners}
          <p style={{
            fontSize: '1.05rem', color: headingColor, lineHeight: 1.7,
            fontWeight: 500, margin: 0, marginBottom: '0.75rem',
          }}>
            Dublin{'\u2019'}s purpose-built immersive gallery where contemporary digital art surrounds you.
          </p>
          <div style={{
            display: 'inline-block', padding: '0.35rem 0.75rem',
            background: isDarkMode ? 'rgba(196,162,101,0.1)' : 'rgba(196,162,101,0.08)',
            border: `1px solid ${gold}44`,
            borderRadius: '4px',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem',
              color: gold, letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              Brand Promise: &ldquo;You stand inside it&rdquo;
            </span>
          </div>
        </div>

        {/* Brand pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {BRAND_PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} style={{ ...card({ borderTop: `2px solid ${p.accent}` }) }}>
                {hudCorners}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <Icon size={15} style={{ color: p.accent }} />
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: p.accent, margin: 0 }}>{p.name}</h4>
                </div>
                <p style={{ fontSize: '0.78rem', color: muted, lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* What we are / are not */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={card()}>
            {hudCorners}
            <h4 style={{ fontSize: '0.8rem', fontWeight: 600, color: '#27ae60', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              What We Are
            </h4>
            {WHAT_WE_ARE.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ color: '#27ae60', fontSize: '0.75rem', marginTop: '0.1rem' }}>{'\u2713'}</span>
                <span style={{ fontSize: '0.8rem', color: text, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={card()}>
            {hudCorners}
            <h4 style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e74c3c', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              What We Are Not
            </h4>
            {WHAT_WE_ARE_NOT.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ color: '#e74c3c', fontSize: '0.75rem', marginTop: '0.1rem' }}>{'\u2717'}</span>
                <span style={{ fontSize: '0.8rem', color: text, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          4. CONTENT PILLARS
         ═══════════════════════════════════════════════════ */}
      <div style={{ marginBottom: '3rem' }}>
        {sectionHeading(<Globe size={16} style={{ color: gold }} />, 'Content Pillars', gold)}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {CONTENT_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div key={i} style={card()}>
                {hudCorners}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Icon size={15} style={{ color: gold }} />
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: text, margin: 0 }}>{pillar.title}</h3>
                </div>
                <p style={{ fontSize: '0.8rem', color: muted, lineHeight: 1.6, margin: 0 }}>{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          5. CURATORIAL PRINCIPLES
         ═══════════════════════════════════════════════════ */}
      <div style={{ marginBottom: '3rem' }}>
        {sectionHeading(<Palette size={16} style={{ color: accent }} />, 'Curatorial Principles', accent)}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {CURATORIAL_PRINCIPLES.map((p, i) => (
            <div key={i} style={{ ...card({ borderTop: `2px solid ${gold}` }) }}>
              {hudCorners}
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: gold, marginBottom: '0.25rem' }}>{p.name}</h4>
              <p style={{ fontSize: '0.75rem', color: muted, lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          6. AUDIENCE SEGMENTS
         ═══════════════════════════════════════════════════ */}
      <div style={{ marginBottom: '3rem' }}>
        {sectionHeading(<Users size={16} style={{ color: accent }} />, 'Audience Segments', accent)}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1rem' }}>
          {AUDIENCE_SEGMENTS.map((seg, i) => {
            const Icon = seg.icon;
            return (
              <div key={i} style={{ ...card({ borderTop: `2px solid ${seg.color}` }) }}>
                {hudCorners}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <Icon size={15} style={{ color: seg.color }} />
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: seg.color, margin: 0 }}>{seg.label}</h4>
                </div>
                <p style={{
                  fontSize: '0.7rem', color: muted, textTransform: 'uppercase', letterSpacing: '0.06em',
                  marginBottom: '0.5rem',
                }}>
                  {seg.subtitle}
                </p>
                <p style={{ fontSize: '0.78rem', color: text, lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
                  {'\u201C'}{seg.message}{'\u201D'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          7. DELIVERABLES PROGRESS
         ═══════════════════════════════════════════════════ */}
      <div style={{
        ...card({ padding: '1.5rem', marginBottom: '3rem' }),
      }}>
        {hudCorners}
        {sectionHeading(<Megaphone size={16} style={{ color: accent }} />, 'Deliverables Progress', accent)}

        {/* Progress bar summary */}
        {(() => {
          const total = MARKETING_PROGRESS.length;
          const complete = MARKETING_PROGRESS.filter(p => p.status === 'complete').length;
          const active = MARKETING_PROGRESS.filter(p => p.status === 'active').length;
          const pct = Math.round((complete / total) * 100);
          return (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: muted }}>
                  {complete} complete &middot; {active} active &middot; {total - complete - active} pending
                </span>
                <span style={{ fontSize: '0.75rem', color: accent, fontWeight: 600 }}>{pct}%</span>
              </div>
              <div style={{
                height: '4px', borderRadius: '2px', width: '100%',
                background: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
              }}>
                <div style={{
                  height: '100%', borderRadius: '2px', width: `${pct}%`,
                  background: `linear-gradient(90deg, ${accent}, ${gold})`,
                  transition: 'width 0.6s ease',
                }} />
              </div>
            </div>
          );
        })()}

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
            {item.ref && (
              <span style={{
                fontSize: '0.6rem', color: muted,
                fontFamily: 'var(--font-mono, monospace)',
                padding: '0.15rem 0.4rem',
                background: isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                borderRadius: '3px',
              }}>
                {item.ref}
              </span>
            )}
            <span style={{
              fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em',
              color: statusColor(item.status), fontWeight: 500,
            }}>
              {item.status}
            </span>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════
          8. BRAND VOICE
         ═══════════════════════════════════════════════════ */}
      <div style={{ marginBottom: '3rem' }}>
        {sectionHeading(<MessageSquare size={16} style={{ color: gold }} />, 'Brand Voice', gold)}
        <div style={card()}>
          {hudCorners}
          <p style={{ fontSize: '0.8rem', color: muted, marginBottom: '1rem', lineHeight: 1.5 }}>
            Quick reference for all Lightheart communications{'\u2014'}every touchpoint should feel:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {BRAND_VOICE_TRAITS.map((t, i) => (
              <div key={i} style={{
                padding: '0.75rem 1rem',
                background: isDarkMode ? 'rgba(196,162,101,0.06)' : 'rgba(196,162,101,0.04)',
                border: `1px solid ${gold}22`,
                borderRadius: '6px',
                display: 'flex', alignItems: 'baseline', gap: '0.5rem',
              }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: gold }}>{t.trait}</span>
                <span style={{ fontSize: '0.75rem', color: muted }}>but {t.boundary}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          9. SIX TOOLS FRAMEWORK
         ═══════════════════════════════════════════════════ */}
      <div style={{ marginBottom: '3rem' }}>
        {sectionHeading(<Lightbulb size={16} style={{ color: accent }} />, 'Six Tools Framework', accent)}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {SIX_TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <div key={i} style={{ ...card({ borderLeft: `3px solid ${tool.color}` }) }}>
                {hudCorners}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <Icon size={15} style={{ color: tool.color }} />
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: headingColor, margin: 0 }}>{tool.name}</h4>
                </div>
                <p style={{ fontSize: '0.78rem', color: muted, lineHeight: 1.5, margin: 0 }}>{tool.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          FOOTER CONTACT
         ═══════════════════════════════════════════════════ */}
      <div style={{
        padding: '1.25rem', marginBottom: '3rem',
        background: isDarkMode ? 'rgba(196,162,101,0.05)' : 'rgba(196,162,101,0.03)',
        border: `1px solid ${gold}33`,
        borderRadius: '8px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '0.8rem', color: muted, margin: 0 }}>
          Marketing lead: {TEAM.kev.name}, {TEAM.kev.title} &middot;{' '}
          <span style={{ color: gold }}>{CONTACTS.creative}</span>
        </p>
      </div>
    </div>
  );
}
