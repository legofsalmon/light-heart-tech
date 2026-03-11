'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  AlertTriangle, TrendingUp, Calendar, Shield,
  CheckCircle, Clock, ChevronRight, Users, Palette,
  Target, Zap, Eye, Heart,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { DataTable } from '@/components/DataTable';
import { Comments } from '@/components/Comments';
import dynamic from 'next/dynamic';

const FlowDiagram = dynamic(
  () => import('@/components/FlowDiagram').then(m => ({ default: m.FlowDiagram })),
  { ssr: false, loading: () => <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '0.8rem' }}>Loading diagram…</div> }
);

/* ────────── Data ────────── */

const DECISIONS = [
  {
    title: '1. L-Acoustics Audio Commitment',
    urgency: 'critical',
    detail: 'The audio system quote (EUR 401,586 for both rooms — 87 L-Acoustics speakers, L-ISA spatial processing) expires March 27. Decision needed by March 25 to allow processing time.',
    subtext: 'This is the single largest confirmed cost item. The L-ISA system is what gives Lightheart its spatial audio capability — 360-degree sound with 96 individually controlled audio objects.',
    action: 'Approve audio commitment by March 25',
  },
  {
    title: '2. Projector Procurement Model',
    urgency: 'moderate',
    detail: 'Rental vs. purchase for 37 Barco projectors. This is the largest outstanding cost item in the entire tech spec. Purchase gives long-term savings; rental reduces upfront commitment.',
    subtext: 'Timeline: Decision by April 15 to allow lead times for September installation.',
    action: 'Review options document and select preference',
  },
  {
    title: '3. Surface Treatment Vendor',
    urgency: 'moderate',
    detail: 'Choice between Smarter Surfaces and Goo Systems for projection surface coating (~EUR 13,000). Goo Systems quote expires April 3.',
    subtext: 'Kris is evaluating both options based on luminance performance and application requirements.',
    action: 'Await evaluation and approve vendor selection',
  },
];

const PHASES = [
  { num: 1, name: 'Foundations', weeks: 'Wk 1-6', current: true },
  { num: 2, name: 'Visibility', weeks: 'Wk 5-8', current: false },
  { num: 3, name: 'Pre-Launch', weeks: 'Wk 9-18', current: false },
  { num: 4, name: 'Launch', weeks: 'Wk 19-22', current: false },
  { num: 5, name: 'Opening', weeks: 'Wk 23-25', current: false },
];

const MARKETING_COMPLETED = [
  '21-section master marketing strategy (61KB document)',
  'Website copy v1 (7 pages — homepage, about, exhibitions, visit, membership, press, newsletter)',
  'Editorial calendar (90-day content production schedule)',
  'Founding Circle membership design (3 tiers, 200-member cap)',
  'Press kit draft (embargo protocol, press angles)',
  '150-item deliverables timeline mapped to September',
  'Internal strategy dashboard built (live web page)',
  'Marketing website built (7 public pages, deployed to staging)',
  'RAD briefing sent (brand agency context package)',
];

const MARKETING_ACTIVE = [
  'Brand identity v1 from RAD (due April 4)',
  'Website MVP build (target: April 21)',
  'Analytics setup (tracking, KPIs)',
  'Brand deliverables package for RAD (strategy docs, design specs)',
];

const MARKETING_UPCOMING = [
  { phase: 'Phase 2', item: 'Pauric Freeman anchor content production (Apr 28)' },
  { phase: 'Phase 2', item: 'Channel launch — LinkedIn, Instagram, TikTok (late Apr)' },
  { phase: 'Phase 2', item: 'Newsletter platform launch' },
  { phase: 'Phase 3', item: 'Founding Circle applications open (Jun 20)' },
  { phase: 'Phase 3', item: 'Press kit distribution (Jul 1)' },
  { phase: 'Phase 4', item: '10-day countdown campaign (Aug 4-14)' },
];

const MILESTONES = [
  { date: 'Mar 24', item: 'Fire certification submission', status: 'critical', dep: 'Architect' },
  { date: 'Mar 27', item: 'L-Acoustics quote deadline', status: 'critical', dep: 'Budget approval' },
  { date: 'Apr 4', item: 'Brand identity v1 from RAD', status: 'pending', dep: 'RAD (Dave + Brian)' },
  { date: 'Apr 7', item: 'Level-setting works commence', status: 'blocked', dep: 'Finalized levels' },
  { date: 'Apr 17', item: 'Phase 1 Gate Review', status: 'upcoming', dep: 'All Phase 1 items' },
  { date: 'Apr 21', item: 'Website MVP live', status: 'active', dep: 'RAD brand' },
  { date: 'Apr 28', item: 'Pauric Freeman content branded', status: 'upcoming', dep: 'Brand identity' },
  { date: 'Apr 30', item: 'Fire certification approval (est.)', status: 'pending', dep: 'Authority' },
  { date: 'May 1', item: 'Website fully live', status: 'upcoming', dep: 'MVP + content' },
  { date: 'Jun 6', item: 'Membership page live', status: 'upcoming', dep: 'Brand + payments' },
  { date: 'Jun 13', item: 'Projector installation begins', status: 'upcoming', dep: 'Procurement decision' },
  { date: 'Jun 20', item: 'Founding Circle applications open', status: 'upcoming', dep: 'Membership page' },
  { date: 'Jul 1', item: 'Press kit distribution', status: 'upcoming', dep: 'Brand + assets' },
  { date: 'Jul 11', item: 'Full AV system integration test', status: 'upcoming', dep: 'All hardware' },
  { date: 'Jul 18', item: 'Exhibition 1 installation complete', status: 'upcoming', dep: 'Artist + AV' },
  { date: 'Aug 1', item: 'Launch campaign begins', status: 'upcoming', dep: 'All assets ready' },
  { date: 'Sep 1', item: 'Doors Open', status: 'target', dep: 'Everything' },
];

const TECH_CARDS = [
  { title: '37 Projectors', desc: 'Barco I600 (4K+) on walls, G50 on floors. Ultra-short-throw lenses. Both rooms fully mapped. Room 1: 14 wall + 10 floor. Room 2: 8 wall + 5 floor.' },
  { title: '87 Speakers (L-ISA)', desc: 'L-Acoustics spatial audio across both rooms. 96 individually controlled sound objects in 3D space. 360-degree immersive sound. EUR 401,586.' },
  { title: '5 Media Servers', desc: 'Pixera PX2 Octo — professional immersive playback. Synchronized via precision clock (Meinberg). EUR 275,000.' },
  { title: '44 Sensors', desc: 'Luxonis depth cameras with onboard AI processing. Real-time visitor tracking enables interactive experiences. EUR 32,116 (Room 1).' },
];

const FOUNDING_CIRCLE = [
  { tier: 'Circle', price: '€199', available: '120 (60%)', revenue: '€23,880' },
  { tier: 'Inner Circle', price: '€499', available: '60 (30%)', revenue: '€29,940' },
  { tier: 'Cornerstone', price: '€999', available: '20 (10%)', revenue: '€19,980' },
];

const RAD_SCHEDULE = [
  { date: 'Apr 4', item: 'Brand identity v1 (logo, type, colour)', status: 'pending' },
  { date: 'Apr 11', item: 'Template kit v1 (watermark, end-cards, lower-thirds)', status: 'upcoming' },
  { date: 'Apr 17', item: 'Brand stack document (onboarding)', status: 'upcoming' },
  { date: 'Jun 20', item: 'Welcome pack + membership card design', status: 'upcoming' },
  { date: 'Jun 27', item: 'Press kit visual design', status: 'upcoming' },
];

const CURATORIAL = [
  { title: 'Independence', color: '#c4a265', desc: 'Self-funded, self-directed, beholden to no agenda. External funding is welcome but never at the cost of editorial freedom.' },
  { title: 'Future Optimism', color: '#27ae60', desc: 'Technology as wonder, not dystopia. We show what\'s possible. We counter the prevailing doom narrative in contemporary art.' },
  { title: 'Awe', color: '#5a9acf', desc: 'Design for collective wonder. Communal experiences where audiences feel profound awe together. Push technical boundaries constantly.' },
  { title: 'Pluralism', color: '#f39c12', desc: 'Everyone\'s story can be told. Ideas challenged through art, not censored. Focus on shared humanity and breadth of perspective.' },
];

const IDIRNET_ROLES = [
  { title: 'Creative Direction', desc: 'Exhibition curation support, artistic vision, curatorial principles, marketing strategy' },
  { title: 'Technical Design', desc: 'AV system specification, network architecture, sensor systems, integration' },
  { title: 'Digital Platform', desc: 'Website development, deployment, analytics, digital infrastructure' },
];

const MILESTONE_NODES = MILESTONES.map((m, i) => ({
  id: `m-${i}`,
  type: 'status' as const,
  position: { x: (i % 4) * 240, y: Math.floor(i / 4) * 100 },
  data: {
    label: m.item,
    detail: m.date,
    status: m.status as 'active' | 'pending' | 'critical' | 'blocked' | 'upcoming' | 'target' | 'completed',
  },
}));

const MILESTONE_EDGES = MILESTONES.slice(0, -1).map((_, i) => ({
  id: `me-${i}`,
  source: `m-${i}`,
  target: `m-${i + 1}`,
  type: 'animated' as const,
  data: { edgeType: MILESTONES[i].status === 'critical' ? 'critical' : 'data' },
}));

/* ────────── Component ────────── */

export default function ExecutivePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    decisions: true, phases: true, marketing: false, milestones: false,
    tech: false, founding: false, brand: false, curatorial: false, idirnet: false, budget: false,
  });

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
  const red = '#c0392b';
  const green = '#27ae60';
  const orange = '#f39c12';

  const urgencyColor = (u: string) => u === 'critical' ? red : u === 'moderate' ? orange : accent;

  const statusColor = (s: string) => {
    if (s === 'critical') return red;
    if (s === 'active' || s === 'done') return green;
    if (s === 'pending' || s === 'blocked') return orange;
    if (s === 'target') return gold;
    return muted;
  };

  const toggle = (key: string) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  const SectionHeader = ({ id, icon: Icon, color, label }: { id: string; icon: React.ElementType; color: string; label: string }) => (
    <button
      onClick={() => toggle(id)}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: openSections[id] ? '1rem' : 0,
        background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: '100%',
      }}
    >
      <Icon size={16} style={{ color }} />
      <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color, letterSpacing: '0.1em', textTransform: 'uppercase', flex: 1, textAlign: 'left' }}>
        {label}
      </span>
      <ChevronRight size={14} style={{ color: muted, transform: openSections[id] ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
    </button>
  );

  const Tag = ({ status }: { status: string }) => (
    <span style={{
      fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em',
      padding: '0.15rem 0.5rem', borderRadius: '3px', fontWeight: 600,
      background: `${statusColor(status)}20`, color: statusColor(status),
    }}>
      {status}
    </span>
  );

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
          PROJECT OVERVIEW FOR BRENDAN
        </h1>
        <p style={{ color: muted, fontSize: '0.875rem', marginTop: '0.5rem' }}>
          Marketing progress, key milestones, decisions needed, and timeline to opening
        </p>
        <p style={{ color: isDarkMode ? '#555' : '#aaa', fontSize: '0.75rem', marginTop: '0.25rem' }}>
          Last updated: March 11, 2026 | Week 2 of 25
        </p>
      </div>

      {/* Status stripe */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { value: '174', label: 'Days to Opening', color: gold },
          { value: '1/5', label: 'Current Phase', color: green },
          { value: '3', label: 'Decisions Needed', color: orange },
          { value: '1', label: 'Critical Path Item', color: red },
        ].map((stat, i) => (
          <div key={i} style={{
            padding: '1rem', textAlign: 'center', background: cardBg,
            border: `1px solid ${border}`, borderRadius: '8px', position: 'relative',
          }}>
            {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: stat.color, fontFamily: 'var(--font-display, Inter, system-ui)' }}>{stat.value}</div>
            <div style={{ fontSize: '0.7rem', color: muted, fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Critical alert */}
      <div style={{
        padding: '1rem 1.25rem', background: isDarkMode ? 'rgba(192, 57, 43, 0.1)' : 'rgba(192, 57, 43, 0.06)',
        border: '1px solid rgba(192, 57, 43, 0.3)', borderRadius: '8px', marginBottom: '2rem',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
      }}>
        <AlertTriangle size={20} style={{ color: red, flexShrink: 0 }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.875rem', color: red }}>Critical Path: Fire Certification</div>
          <div style={{ fontSize: '0.8rem', color: muted }}>
            Submission targeted for March 24. Approval needed by April 30 for September opening to hold. Level-setting contractor is paused pending finalized levels.
          </div>
        </div>
      </div>

      {/* ── DECISIONS ── */}
      <div style={{ marginBottom: '2rem' }}>
        <SectionHeader id="decisions" icon={Shield} color={accent} label="Decisions Needed from You" />
        {openSections.decisions && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {DECISIONS.map((d, i) => (
              <div key={i} style={{
                padding: '1.25rem', background: isDarkMode ? 'rgba(196,162,101,0.06)' : 'rgba(196,162,101,0.04)',
                border: `1px solid ${isDarkMode ? 'rgba(196,162,101,0.2)' : 'rgba(196,162,101,0.15)'}`,
                borderRadius: '8px', position: 'relative',
              }}>
                {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: gold, margin: '0 0 0.5rem 0' }}>{d.title}</h3>
                <p style={{ fontSize: '0.85rem', color: text, marginBottom: '0.5rem', lineHeight: 1.6 }}>{d.detail}</p>
                <p style={{ fontSize: '0.8rem', color: muted, marginBottom: '0.75rem', lineHeight: 1.6 }}>{d.subtext}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: urgencyColor(d.urgency) }}>
                  <ChevronRight size={14} />
                  <span style={{ fontWeight: 500 }}>{d.action}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── PHASES ── */}
      <div style={{ marginBottom: '2rem' }}>
        <SectionHeader id="phases" icon={Calendar} color={accent} label="Project Phases" />
        {openSections.phases && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem' }}>
              {PHASES.map((p) => (
                <div key={p.num} style={{
                  padding: '0.75rem 0.5rem', textAlign: 'center', fontSize: '0.75rem',
                  border: `1px solid ${border}`,
                  background: p.current ? (isDarkMode ? 'rgba(196,162,101,0.12)' : 'rgba(196,162,101,0.08)') : cardBg,
                }}>
                  <div style={{ fontFamily: 'var(--font-display, Inter, system-ui)', fontSize: '1.2rem', fontWeight: 600, color: p.current ? gold : muted, marginBottom: '0.15rem' }}>{p.num}</div>
                  <div style={{ fontSize: '0.65rem', color: p.current ? gold : muted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.name}</div>
                  <div style={{ fontSize: '0.65rem', color: p.current ? gold : isDarkMode ? '#555' : '#aaa' }}>{p.weeks}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '0.9rem', color: muted, marginBottom: '0.5rem' }}>
              <strong style={{ color: gold }}>Phase 1: Foundations (Current)</strong> — Establishing brand identity, website architecture, positioning, and construction readiness. 32 deliverables across strategy, construction, brand, digital, and production.
            </div>
            <div style={{
              background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              borderRadius: '4px', height: '8px', marginBottom: '0.5rem', overflow: 'hidden',
            }}>
              <div style={{ height: '100%', width: '15%', background: gold, borderRadius: '4px' }} />
            </div>
            <div style={{ fontSize: '0.75rem', color: isDarkMode ? '#555' : '#aaa' }}>~15% complete | Gate Review: April 17</div>
          </>
        )}
      </div>

      {/* ── MARKETING PROGRESS ── */}
      <div style={{ marginBottom: '2rem' }}>
        <SectionHeader id="marketing" icon={TrendingUp} color={green} label="Marketing Progress" />
        {openSections.marketing && (
          <>
            <p style={{ fontSize: '0.85rem', color: muted, marginBottom: '1rem' }}>
              Five-phase marketing plan running March 10 to September 1. Core mantra: <em>Build credibility first. Build clarity second. Build noise last.</em>
            </p>

            <h4 style={{ fontSize: '0.8rem', color: green, margin: '1rem 0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Completed</h4>
            <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', overflow: 'hidden', position: 'relative', marginBottom: '1rem' }}>
              {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
              {MARKETING_COMPLETED.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem',
                  borderBottom: i < MARKETING_COMPLETED.length - 1 ? `1px solid ${border}` : 'none',
                }}>
                  <CheckCircle size={14} style={{ color: green, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', color: text }}>{item}</span>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: '0.8rem', color: green, margin: '1rem 0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>In Progress</h4>
            <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', overflow: 'hidden', position: 'relative', marginBottom: '1rem' }}>
              {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
              {MARKETING_ACTIVE.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem',
                  borderBottom: i < MARKETING_ACTIVE.length - 1 ? `1px solid ${border}` : 'none',
                }}>
                  <Clock size={14} style={{ color: green, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', color: text }}>{item}</span>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: '0.8rem', color: '#5a9acf', margin: '1rem 0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Upcoming</h4>
            <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
              {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
              {MARKETING_UPCOMING.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem',
                  borderBottom: i < MARKETING_UPCOMING.length - 1 ? `1px solid ${border}` : 'none',
                }}>
                  <Tag status={item.phase === 'Phase 2' ? 'upcoming' : item.phase === 'Phase 3' ? 'pending' : 'upcoming'} />
                  <span style={{ fontSize: '0.85rem', color: text }}>{item.item}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── MILESTONES ── */}
      <div style={{ marginBottom: '2rem' }}>
        <SectionHeader id="milestones" icon={Calendar} color={gold} label="Key Milestones" />
        {openSections.milestones && (
          <>
          <div style={{ marginBottom: '1rem', borderRadius: 8, overflow: 'hidden', border: `1px solid ${border}` }}>
            <FlowDiagram
              initialNodes={MILESTONE_NODES}
              initialEdges={MILESTONE_EDGES}
              height={350}
            />
          </div>
          <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
            {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
            {/* Header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '70px 1fr 80px 120px',
              padding: '0.6rem 1rem', background: isDarkMode ? 'rgba(196,162,101,0.1)' : 'rgba(196,162,101,0.06)',
              borderBottom: `2px solid ${isDarkMode ? 'rgba(196,162,101,0.3)' : 'rgba(196,162,101,0.2)'}`,
              fontSize: '0.7rem', fontWeight: 600, color: gold, textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              <span>Date</span><span>Milestone</span><span>Status</span><span>Dependencies</span>
            </div>
            {MILESTONES.map((m, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '70px 1fr 80px 120px', alignItems: 'center',
                padding: '0.6rem 1rem', borderBottom: i < MILESTONES.length - 1 ? `1px solid ${border}` : 'none',
                fontWeight: m.status === 'target' ? 700 : 400,
              }}>
                <span style={{ fontSize: '0.8rem', color: muted, fontFamily: 'var(--font-mono, monospace)' }}>{m.date}</span>
                <span style={{ fontSize: '0.85rem', color: m.status === 'target' ? gold : text }}>{m.item}</span>
                <Tag status={m.status} />
                <span style={{ fontSize: '0.75rem', color: muted }}>{m.dep}</span>
              </div>
            ))}
          </div>
          </>
        )}
      </div>

      {/* ── TECHNICAL SYSTEM ── */}
      <div style={{ marginBottom: '2rem' }}>
        <SectionHeader id="tech" icon={Zap} color={accent} label="Technical System at a Glance" />
        {openSections.tech && (
          <>
            <p style={{ fontSize: '0.85rem', color: muted, marginBottom: '1rem' }}>
              Two immersive rooms, ~280 sq. m. total exhibition space. Full specification: 70-page tech document by IDIRNET (Feb-Mar 2026).
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              {TECH_CARDS.map((c, i) => (
                <div key={i} style={{
                  padding: '1.25rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', position: 'relative',
                }}>
                  {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: text, marginBottom: '0.5rem' }}>{c.title}</div>
                  <div style={{ fontSize: '0.8rem', color: muted, lineHeight: 1.6 }}>{c.desc}</div>
                </div>
              ))}
            </div>
            {/* Budget info */}
            <div style={{
              padding: '1rem 1.25rem', background: isDarkMode ? 'rgba(42,74,107,0.1)' : 'rgba(42,74,107,0.06)',
              border: `1px solid ${isDarkMode ? 'rgba(42,74,107,0.3)' : 'rgba(42,74,107,0.15)'}`, borderRadius: '8px',
            }}>
              <strong style={{ fontSize: '0.85rem', color: text }}>Budget Status (Confirmed Systems)</strong>
              <div style={{ fontSize: '0.85rem', color: muted, marginTop: '0.25rem' }}>
                Audio: €401,586 | Servers + Network: €443,103 | Signal: €44,514 | Sensors: €32,116
              </div>
              <div style={{ fontSize: '0.9rem', color: accent, fontWeight: 700, marginTop: '0.25rem' }}>
                Total confirmed: ~€921,319 <span style={{ fontWeight: 400, color: muted, fontSize: '0.8rem' }}>(excludes projectors — largest outstanding item, and surface treatment ~€13,000)</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── FOUNDING CIRCLE ── */}
      <div style={{ marginBottom: '2rem' }}>
        <SectionHeader id="founding" icon={Users} color={gold} label="Founding Circle (Revenue Projection)" />
        {openSections.founding && (
          <>
            <p style={{ fontSize: '0.85rem', color: muted, marginBottom: '1rem' }}>
              200 founding members (hard cap). Applications open June 20. Projected Year 1 revenue: ~€75,000.
            </p>
            <DataTable
              columns={[
                { key: 'tier', label: 'Tier' },
                { key: 'price', label: 'Price/year' },
                { key: 'available', label: 'Available' },
                { key: 'revenue', label: 'Target Revenue' },
              ]}
              data={FOUNDING_CIRCLE}
              searchable={false}
              compact
            />
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#c4a265', textAlign: 'right', marginTop: '0.25rem' }}>
              Total (at full take-up): €73,800
            </div>
            <p style={{ fontSize: '0.8rem', color: isDarkMode ? '#555' : '#aaa' }}>
              Corporate memberships are a separate programme (€2,500 / €5,000 / €10,000 tiers — to be developed after founding programme launches).
            </p>
          </>
        )}
      </div>

      {/* ── BRAND DEVELOPMENT ── */}
      <div style={{ marginBottom: '2rem' }}>
        <SectionHeader id="brand" icon={Palette} color={green} label="Brand Development" />
        {openSections.brand && (
          <>
            <div style={{
              padding: '1rem 1.25rem', background: isDarkMode ? 'rgba(39,174,96,0.08)' : 'rgba(39,174,96,0.04)',
              border: `1px solid ${isDarkMode ? 'rgba(39,174,96,0.25)' : 'rgba(39,174,96,0.15)'}`, borderRadius: '8px', marginBottom: '1rem',
            }}>
              <strong style={{ fontSize: '0.85rem', color: green }}>Brand Agency: RAD (Research And Destroy)</strong>
              <div style={{ fontSize: '0.85rem', color: muted, marginTop: '0.25rem' }}>
                David Lawler + Brian. Confirmed March 9. 50% deposit sent. Rolling Tuesday meetings. European/Swiss design direction: timeless, bold, simple.
              </div>
            </div>

            <h4 style={{ fontSize: '0.8rem', color: gold, margin: '0 0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>RAD Delivery Schedule</h4>
            <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
              {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
              <div style={{
                display: 'grid', gridTemplateColumns: '70px 1fr 80px', padding: '0.6rem 1rem',
                background: isDarkMode ? 'rgba(196,162,101,0.1)' : 'rgba(196,162,101,0.06)',
                borderBottom: `2px solid ${isDarkMode ? 'rgba(196,162,101,0.3)' : 'rgba(196,162,101,0.2)'}`,
                fontSize: '0.7rem', fontWeight: 600, color: gold, textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                <span>Date</span><span>Deliverable</span><span>Status</span>
              </div>
              {RAD_SCHEDULE.map((r, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '70px 1fr 80px', alignItems: 'center', padding: '0.6rem 1rem',
                  borderBottom: i < RAD_SCHEDULE.length - 1 ? `1px solid ${border}` : 'none',
                }}>
                  <span style={{ fontSize: '0.8rem', color: muted, fontFamily: 'var(--font-mono, monospace)' }}>{r.date}</span>
                  <span style={{ fontSize: '0.85rem', color: text }}>{r.item}</span>
                  <Tag status={r.status} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── CURATORIAL PRINCIPLES ── */}
      <div style={{ marginBottom: '2rem' }}>
        <SectionHeader id="curatorial" icon={Heart} color={gold} label="The Four Curatorial Principles" />
        {openSections.curatorial && (
          <>
            <p style={{ fontSize: '0.85rem', color: muted, marginBottom: '1rem' }}>
              Non-negotiable foundations that govern all programming, communications, and design decisions.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {CURATORIAL.map((c, i) => (
                <div key={i} style={{
                  padding: '1.25rem', background: cardBg, border: `1px solid ${border}`,
                  borderRadius: '8px', borderTop: `3px solid ${c.color}`, position: 'relative',
                }}>
                  {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: text, marginBottom: '0.5rem' }}>{c.title}</div>
                  <div style={{ fontSize: '0.8rem', color: muted, lineHeight: 1.6 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── IDIRNET ── */}
      <div style={{ marginBottom: '3rem' }}>
        <SectionHeader id="idirnet" icon={Target} color={accent} label="What IDIRNET Handles" />
        {openSections.idirnet && (
          <>
            <p style={{ fontSize: '0.85rem', color: muted, marginBottom: '1rem' }}>
              IDIRNET is Lightheart&apos;s technical and creative partner, handling:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              {IDIRNET_ROLES.map((r, i) => (
                <div key={i} style={{
                  padding: '1.25rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', position: 'relative',
                }}>
                  {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: text, marginBottom: '0.5rem' }}>{r.title}</div>
                  <div style={{ fontSize: '0.8rem', color: muted, lineHeight: 1.6 }}>{r.desc}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.8rem', color: isDarkMode ? '#555' : '#aaa' }}>
              Core team: Kev Freeney (Creative Director), Kris Berzins (Technical Lead), Colly (Infrastructure), plus contractors as needed.
            </p>
          </>
        )}
      </div>

      {/* Comments */}
      <Comments sectionId="executive-general" />

      {/* Footer */}
      <div style={{
        borderTop: `1px solid ${border}`, padding: '1.5rem 0', textAlign: 'center',
        fontSize: '0.75rem', color: isDarkMode ? '#555' : '#aaa', marginBottom: '2rem',
      }}>
        <p>Lightheart — Managing Director Overview</p>
        <p>Prepared by IDIRNET | Updated March 11, 2026</p>
      </div>
    </div>
  );
}
