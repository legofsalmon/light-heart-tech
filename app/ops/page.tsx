'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Activity, Calendar, CheckCircle, Clock, AlertTriangle,
  Users, FileText, Target, Layers, ChevronDown, ChevronRight,
  Shield, Zap, Wifi, Server, Speaker, Monitor, Eye,
  GitBranch, MessageSquare, ExternalLink,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { DataTable } from '@/components/DataTable';
import { Comments } from '@/components/Comments';
import dynamic from 'next/dynamic';
import { SPECS } from '@/data/constants';

const FlowDiagram = dynamic(
  () => import('@/components/FlowDiagram').then(m => ({ default: m.FlowDiagram })),
  { ssr: false, loading: () => <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '0.8rem' }}>Loading diagram…</div> }
);

/* ── DATA ─────────────────────────────────────────────── */

const PHASE_DATA = [
  { name: 'Foundations', status: 'active', weeks: '1–6', desc: 'Brand identity from RAD (Apr 4). Website MVP. Fire cert submission (Mar 24). 32 deliverables.' },
  { name: 'Controlled Visibility', status: 'upcoming', weeks: '5–8', desc: 'Website live. Pauric Freeman content. LinkedIn + IG active. Newsletter functional.' },
  { name: 'Pre-Launch Build', status: 'upcoming', weeks: '9–18', desc: 'AV installation. Exhibition 1 development. Press materials. Founding Circle launch.' },
  { name: 'Launch Campaign', status: 'upcoming', weeks: '19–22', desc: '10-day countdown. Press embargo. Personal invites to cultural figures.' },
  { name: 'Opening', status: 'upcoming', weeks: '23–25', desc: 'Soft opening. Operational readiness. Concrescence — all three stacks converge.' },
];

const CRITICAL_ITEMS = [
  { label: 'Fire Certification', status: 'critical', detail: 'Submission due Mar 24 — critical path for September opening' },
  { label: 'L-Acoustics Quote', status: 'warning', detail: 'EUR 401,586 — expires 27 Mar 2026' },
  { label: 'Goo Systems Quote', status: 'warning', detail: '~EUR 13,070 — expires 3 Apr 2026' },
  { label: 'RAD Brand Deliverables', status: 'active', detail: 'In progress — logo, palette, guidelines due Apr 4' },
];

const TSM_STACKS = [
  {
    name: 'Global Stack',
    subtitle: 'Infrastructure and systems — what must be true before anyone walks in',
    color: '#4a8abf',
    planes: [
      { name: 'Ground', detail: 'Electrical, HVAC, safety', status: 'wip' },
      { name: 'Runtime', detail: 'Media server, clock sync', status: 'pending' },
      { name: 'Circulation', detail: 'Visitor flow, entry sequence', status: 'pending' },
      { name: 'Channels', detail: 'GDPR, consent, recording', status: 'pending' },
      { name: 'Frames', detail: 'Sightlines, luminance', status: 'pending' },
      { name: 'Roles', detail: 'Staff positions, training', status: 'pending' },
      { name: 'Horizons', detail: 'Quarterly review cycle', status: 'pending' },
    ],
  },
  {
    name: 'Internal Stack',
    subtitle: 'Embodied perception — what visitors feel in their body',
    color: '#c4a265',
    planes: [
      { name: 'Root', detail: 'Floor surface, seating, temp', status: 'pending' },
      { name: 'Sacral', detail: 'Pacing, emotional arc', status: 'pending' },
      { name: 'Solar Plexus', detail: 'Choice architecture', status: 'pending' },
      { name: 'Heart', detail: 'Group pacing, co-regulation', status: 'pending' },
      { name: 'Throat', detail: 'Staff language, signage', status: 'pending' },
      { name: 'Third Eye', detail: 'Attention design, gaze', status: 'pending' },
      { name: 'Crown', detail: 'Exit, reflection, integration', status: 'pending' },
    ],
  },
  {
    name: 'External Stack',
    subtitle: 'Transition and relational space — how visitors move in and out',
    color: '#27ae60',
    planes: [
      { name: 'Space', detail: 'Sightline, route mapping', status: 'pending' },
      { name: 'Portal', detail: 'Entry count-in, consent', status: 'pending' },
      { name: 'Gesture', detail: 'Movement pacing, abort', status: 'pending' },
      { name: 'Mirror', detail: 'Feedback, echo design', status: 'pending' },
      { name: 'Narrative', detail: 'Journey arc, offboarding', status: 'pending' },
      { name: 'Atmosphere', detail: 'Luminance, SPL caps', status: 'pending' },
      { name: 'Feedback Loop', detail: 'Learning cycles, data', status: 'pending' },
    ],
  },
];

const SIX_TOOLS = [
  { tool: 'TSM', idea: '3-layer experience audit', apply: 'Exhibition design, visitor journey, event checklists', owner: 'Kev' },
  { tool: 'Alchemy (Sutherland)', idea: 'Psycho-logic beats logic. Reframe value.', apply: 'Pricing, naming, counter-intuitive positioning', owner: 'TBD' },
  { tool: 'Purple Cow (Godin)', idea: 'Be remarkable. Activate sneezers.', apply: 'Launch mechanics, referral loops, content', owner: 'TBD' },
  { tool: 'Persuasion (Cialdini)', idea: '6 principles of influence', apply: 'CTA design, offers, partnership leverage', owner: 'TBD' },
  { tool: 'Story-Driven (Jiwa)', idea: 'Lead with feeling, not features', apply: 'Brand narrative, tone of voice, copy', owner: 'Kev' },
  { tool: 'RACE (McNulty)', idea: 'Reach \u2192 Act \u2192 Convert \u2192 Engage', apply: 'Channel planning, KPIs, campaign structure', owner: 'TBD' },
];

const PROJECTION_SPECS = [
  { location: 'Room 1 Walls', model: 'I600-4K10', qty: 14, resolution: 'WQUXGA (4K+)', brightness: '10,000 lm', power: '860W ea' },
  { location: 'Room 1 Floor', model: 'G50-W8', qty: 10, resolution: 'WUXGA (2K)', brightness: '8,900 lm', power: '500W ea' },
  { location: 'Room 2 Walls', model: 'I600-4K8', qty: 8, resolution: 'WQUXGA (4K+)', brightness: '8,000 lm', power: '640W ea' },
  { location: 'Room 2 Floor', model: 'G50-W8', qty: 5, resolution: 'WUXGA (2K)', brightness: '8,000 lm', power: '490W ea' },
];

const AUDIO_SPECS = [
  { room: 'Room 1', speaker: 'X8i', qty: 20, role: 'Surround', spl: '129 dB' },
  { room: 'Room 1', speaker: 'X6i', qty: 20, role: 'Height', spl: '123 dB' },
  { room: 'Room 1', speaker: 'SYVA SUB', qty: 8, role: 'Subwoofers', spl: '128 dB' },
  { room: 'Room 2', speaker: 'X8i', qty: 14, role: 'Surround', spl: '129 dB' },
  { room: 'Room 2', speaker: 'X6i', qty: 17, role: 'Height', spl: '123 dB' },
  { room: 'Room 2', speaker: 'SYVA SUB', qty: 8, role: 'Subwoofers', spl: '128 dB' },
];

const VENDORS = [
  { system: 'Audio (both rooms)', vendor: 'Audiotek / L-Acoustics', cost: '401,586', expires: 'Mar 27', status: 'critical' },
  { system: 'Surface Treatment', vendor: 'Goo Systems', cost: '~13,070', expires: 'Apr 3', status: 'warning' },
  { system: 'Media Servers', vendor: 'Pixera / AV Stumpfl', cost: '275,000', expires: '\u2014', status: 'complete' },
  { system: 'Network', vendor: 'Netgear', cost: '79,000', expires: '\u2014', status: 'complete' },
  { system: 'Signal Transport', vendor: 'DVIGear', cost: '44,514', expires: '\u2014', status: 'active' },
  { system: 'Sensors (Room 1)', vendor: 'Luxonis', cost: '32,116', expires: '\u2014', status: 'active' },
  { system: 'Sync Generator', vendor: 'Meinberg', cost: '25,000', expires: '\u2014', status: 'warning' },
  { system: 'Projectors', vendor: 'Barco', cost: 'TBC', expires: '\u2014', status: 'blocked' },
];

const RISKS = [
  { risk: 'Fire certification delayed', likelihood: 'Medium', impact: 'Critical', mitigation: 'Submit by Mar 24. Follow up weekly.' },
  { risk: 'L-Acoustics quote expires (Mar 27)', likelihood: 'Medium', impact: 'High', mitigation: 'Decision needed this week on audio commitment.' },
  { risk: 'Brand identity not ready for Pauric video', likelihood: 'Medium', impact: 'High', mitigation: 'RAD brand v1 deadline: Apr 4. Pauric video: Apr 28.' },
  { risk: 'Level-setting construction delays', likelihood: 'Medium', impact: 'High', mitigation: 'Contractor paused. Needs finalized levels to resume.' },
  { risk: 'Website not ready for Phase 2', likelihood: 'Medium', impact: 'High', mitigation: 'MVP build in progress. Target: Apr 21.' },
  { risk: 'Trademark conflict ("Lightheart")', likelihood: 'Low-Med', impact: 'Medium', mitigation: 'Ireland-only jurisdiction reduces risk. Fallback: "Lightheart Immersive".' },
];

const DECISIONS_PENDING = [
  { decision: 'L-Acoustics audio commitment (quote expires Mar 27)', owner: 'Brendan + Kev', deadline: 'Mar 25', status: 'critical' },
  { decision: 'Surface treatment vendor (Smarter Surfaces vs Goo)', owner: 'Kris', deadline: 'Apr 1', status: 'pending' },
  { decision: 'Projector procurement model (rental vs purchase)', owner: 'Brendan + Kev', deadline: 'Apr 15', status: 'pending' },
  { decision: 'Sensor architecture (edge vs aggregator)', owner: 'Kris + Colly', deadline: 'May 1', status: 'pending' },
  { decision: 'UPS sizing (10kVA vs 15-20kVA)', owner: 'Kris', deadline: 'Apr 15', status: 'pending' },
  { decision: 'CMS choice for public website', owner: 'Kev + RAD', deadline: 'Apr 21', status: 'pending' },
];

const DELIVERABLES = {
  strategy: [
    { name: 'Positioning one-pager', owner: 'Kev / Kimi', status: 'active' },
    { name: 'Category language guide', owner: 'Kev', status: 'pending' },
    { name: 'Audience personas (3)', owner: 'Kev', status: 'complete' },
    { name: 'Tone of voice guide', owner: 'Kev', status: 'complete' },
    { name: 'Programming model definition', owner: 'Kev', status: 'complete' },
    { name: 'TSM integration brief', owner: 'Kev', status: 'complete' },
  ],
  construction: [
    { name: 'Fire cert submission', owner: 'Architect', due: 'Mar 24', status: 'critical' },
    { name: 'Fire cert approval', owner: 'Authority', due: 'Apr 30 (est)', status: 'pending' },
    { name: 'Level-setting works', owner: 'Contractor', due: 'Apr 7', status: 'blocked' },
    { name: 'Electrical spec', owner: 'Kris', due: 'Mar 31', status: 'active' },
    { name: 'HVAC spec', owner: 'Kris', due: 'Apr 7', status: 'pending' },
    { name: 'Acoustic treatment', owner: 'Kris', due: 'Apr 14', status: 'pending' },
  ],
  brand: [
    { name: 'Logo system', owner: 'RAD', due: 'Apr 4', status: 'pending' },
    { name: 'Typography system', owner: 'RAD', due: 'Apr 4', status: 'pending' },
    { name: 'Colour system', owner: 'RAD', due: 'Apr 4', status: 'pending' },
    { name: 'Template kit v1', owner: 'RAD', due: 'Apr 11', status: 'pending' },
    { name: 'Brand stack document', owner: 'RAD', due: 'Apr 17', status: 'pending' },
  ],
  digital: [
    { name: 'Sitemap', owner: 'Claude Code', status: 'complete' },
    { name: 'Website copy v1', owner: 'Kev', status: 'complete' },
    { name: 'SEO research', owner: 'Claude Code / Kimi', status: 'pending' },
    { name: 'Analytics setup', owner: 'Claude Code', status: 'active' },
    { name: 'Newsletter platform', owner: 'Claude Code', status: 'pending' },
    { name: 'Website MVP build', owner: 'Claude Code', status: 'active' },
  ],
};

const MEETINGS = [
  { meeting: 'Morning Standup', when: 'Daily', duration: '5 min', who: 'Core team', purpose: 'Three-question filter on today\'s work' },
  { meeting: 'Weekly Pulse Check', when: 'Weekly', duration: '30 min', who: 'Core team', purpose: 'Framework review, blockers, commitments' },
  { meeting: 'Brendan Priorities', when: 'Weekly', duration: '60 min', who: 'Kev + Brendan', purpose: 'High-level priorities, decisions, budget' },
  { meeting: 'RAD Sync', when: 'Tuesdays', duration: 'Varies', who: 'Kev + RAD', purpose: 'Brand progress, deliverable handoffs' },
];

const TSM_NODES = [
  // Global Stack (blue) - column 1
  ...TSM_STACKS[0].planes.map((p, i) => ({
    id: `g-${i}`, type: 'stack' as const,
    position: { x: 0, y: i * 70 },
    data: { label: p.name, detail: p.detail, stack: 'Global', status: p.status, color: '#4a8abf' },
  })),
  // Internal Stack (gold) - column 2
  ...TSM_STACKS[1].planes.map((p, i) => ({
    id: `i-${i}`, type: 'stack' as const,
    position: { x: 220, y: i * 70 },
    data: { label: p.name, detail: p.detail, stack: 'Internal', status: p.status, color: '#c4a265' },
  })),
  // External Stack (green) - column 3
  ...TSM_STACKS[2].planes.map((p, i) => ({
    id: `e-${i}`, type: 'stack' as const,
    position: { x: 440, y: i * 70 },
    data: { label: p.name, detail: p.detail, stack: 'External', status: p.status, color: '#27ae60' },
  })),
];

const TSM_EDGES = [
  // Vertical connections within each stack
  ...Array.from({ length: 6 }, (_, i) => ({ id: `g-v-${i}`, source: `g-${i}`, target: `g-${i+1}`, type: 'animated' as const, data: { edgeType: 'data' } })),
  ...Array.from({ length: 6 }, (_, i) => ({ id: `i-v-${i}`, source: `i-${i}`, target: `i-${i+1}`, type: 'animated' as const, data: { edgeType: 'signal' } })),
  ...Array.from({ length: 6 }, (_, i) => ({ id: `e-v-${i}`, source: `e-${i}`, target: `e-${i+1}`, type: 'animated' as const, data: { edgeType: 'network' } })),
  // Cross-stack connections at key planes
  { id: 'gi-0', source: 'g-0', target: 'i-0', type: 'animated' as const, data: { edgeType: 'data' } },
  { id: 'ie-0', source: 'i-0', target: 'e-0', type: 'animated' as const, data: { edgeType: 'data' } },
  { id: 'gi-3', source: 'g-3', target: 'i-3', type: 'animated' as const, data: { edgeType: 'signal' } },
  { id: 'ie-3', source: 'i-3', target: 'e-3', type: 'animated' as const, data: { edgeType: 'signal' } },
  { id: 'gi-6', source: 'g-6', target: 'i-6', type: 'animated' as const, data: { edgeType: 'critical' } },
  { id: 'ie-6', source: 'i-6', target: 'e-6', type: 'animated' as const, data: { edgeType: 'critical' } },
];

/* ── HELPERS ──────────────────────────────────────────── */

const statusColor = (s: string) => {
  if (s === 'critical' || s === 'blocked') return '#c0392b';
  if (s === 'warning' || s === 'pending') return '#f39c12';
  if (s === 'active' || s === 'wip') return '#27ae60';
  if (s === 'complete') return '#27ae60';
  return '#888';
};

const statusIcon = (s: string) => {
  if (s === 'wip') return '\u25D0';
  if (s === 'done' || s === 'complete') return '\u25CF';
  return '\u25CB';
};

const Tag = ({ status, children }: { status: string; children: React.ReactNode }) => (
  <span style={{
    display: 'inline-block', padding: '0.15rem 0.5rem', borderRadius: '3px',
    fontSize: '0.65rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em',
    background: `${statusColor(status)}20`, color: statusColor(status),
  }}>
    {children}
  </span>
);

/* ── COMPONENT ────────────────────────────────────────── */

export default function OpsHubPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    timeline: true, tsm: true, tools: false, decisions_framework: false,
    techspec: false, vendors: false, risks: false, decisions: false,
    deliverables: false, meetings: false,
  });

  useEffect(() => {
    if (heroRef.current) {
      gsap.from(heroRef.current.children, {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.6, ease: 'expo.out',
      });
    }
  }, []);

  const toggle = (key: string) => setOpenSections(p => ({ ...p, [key]: !p[key] }));

  const accent = isDarkMode ? '#00F0FF' : '#004466';
  const gold = '#c4a265';
  const muted = isDarkMode ? '#888' : '#666';
  const text = isDarkMode ? '#e0e0e0' : '#1a1a1a';
  const border = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)';
  const cardBg = isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)';
  const tableBg = isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)';

  const SectionHeader = ({ id, title, icon: Icon, iconColor }: { id: string; title: string; icon: typeof Layers; iconColor?: string }) => (
    <button
      onClick={() => toggle(id)}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: openSections[id] ? '1rem' : '0',
        background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: '100%',
      }}
    >
      <Icon size={16} style={{ color: iconColor || accent, flexShrink: 0 }} />
      <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: iconColor || accent, letterSpacing: '0.1em', textTransform: 'uppercase', flex: 1, textAlign: 'left' }}>
        {title}
      </span>
      {openSections[id] ? <ChevronDown size={14} style={{ color: muted }} /> : <ChevronRight size={14} style={{ color: muted }} />}
    </button>
  );

  const thStyle: React.CSSProperties = { textAlign: 'left', padding: '0.5rem 0.75rem', background: tableBg, color: gold, fontWeight: 600, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `2px solid ${gold}40` };
  const tdStyle: React.CSSProperties = { padding: '0.5rem 0.75rem', borderBottom: `1px solid ${border}`, color: text, fontSize: '0.8rem' };

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
          174 days to opening · Phase 1 of 5 · Week 2 of 25 · ~EUR 921K confirmed budget
        </p>
      </div>

      {/* Status cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {CRITICAL_ITEMS.map((item, i) => (
          <div key={i} style={{ padding: '1rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', borderLeft: `3px solid ${statusColor(item.status)}`, position: 'relative' }}>
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

      {/* TIMELINE */}
      <div style={{ padding: '1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '2rem', position: 'relative' }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <SectionHeader id="timeline" title="25-Week Timeline" icon={Calendar} />
        {openSections.timeline && (
          <div style={{ display: 'flex', gap: '0.5rem', overflow: 'auto', flexWrap: 'wrap' }}>
            {PHASE_DATA.map((phase, i) => (
              <div key={i} style={{
                flex: '1 1 180px', minWidth: '160px', padding: '0.75rem', borderRadius: '6px',
                background: phase.status === 'active' ? `${accent}15` : isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                border: phase.status === 'active' ? `1px solid ${accent}40` : `1px solid ${border}`,
              }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: phase.status === 'active' ? accent : text, marginBottom: '0.25rem' }}>
                  Phase {i + 1}: {phase.name}
                </div>
                <div style={{ fontSize: '0.7rem', color: muted, marginBottom: '0.35rem' }}>Weeks {phase.weeks}</div>
                <div style={{ fontSize: '0.7rem', color: muted, lineHeight: 1.5 }}>{phase.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TSM */}
      <div style={{ padding: '1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '2rem', position: 'relative' }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <SectionHeader id="tsm" title={`Triple Stack Model \u2014 Operational Checklists`} icon={Layers} iconColor={gold} />
        {openSections.tsm && (
          <>
            <p style={{ color: muted, fontSize: '0.8rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              The TSM audits readiness across three layers. Every exhibition, every event, every visitor experience is checked against these stacks. Phase 1 focuses on the Global Stack (infrastructure).
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {TSM_STACKS.map((stack) => (
                <div key={stack.name} style={{ padding: '1rem', background: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)', border: `1px solid ${border}`, borderRadius: '8px', borderTop: `3px solid ${stack.color}` }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: stack.color, marginBottom: '0.25rem', letterSpacing: '0.05em' }}>
                    {stack.name.toUpperCase()}
                  </h3>
                  <p style={{ fontSize: '0.7rem', color: muted, marginBottom: '0.75rem', fontStyle: 'italic' }}>{stack.subtitle}</p>
                  {stack.planes.map((plane, j) => (
                    <div key={j} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem',
                      padding: '0.35rem 0', borderBottom: j < stack.planes.length - 1 ? `1px solid ${border}` : 'none',
                    }}>
                      <span style={{ fontSize: '0.8rem', color: text }}>{plane.name}</span>
                      <span style={{ fontSize: '0.7rem', color: statusColor(plane.status), whiteSpace: 'nowrap' }}>
                        {statusIcon(plane.status)} {plane.detail}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem', borderRadius: 8, overflow: 'hidden', border: `1px solid ${border}` }}>
              <FlowDiagram
                initialNodes={TSM_NODES}
                initialEdges={TSM_EDGES}
                height={550}
              />
            </div>
            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: muted }}>
              <strong style={{ color: gold }}>Concrescence</strong> &mdash; The moment all three stacks align. Opening night is the first.
            </div>
          </>
        )}
      </div>

      {/* SIX TOOLS */}
      <div style={{ padding: '1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '2rem', position: 'relative' }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <SectionHeader id="tools" title="Six Unified Tools" icon={Target} iconColor={gold} />
        {openSections.tools && (
          <DataTable
            columns={[
              { key: 'tool', label: 'Tool', width: '15%' },
              { key: 'idea', label: 'Core Idea', width: '30%' },
              { key: 'apply', label: 'Apply When', width: '35%' },
              { key: 'owner', label: 'Owner', width: '20%' },
            ]}
            data={SIX_TOOLS}
            searchable={false}
            compact
          />
        )}
      </div>

      {/* DECISION FRAMEWORK */}
      <div style={{ padding: '1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '2rem', position: 'relative' }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <SectionHeader id="decisions_framework" title="Three-Question Decision Rule" icon={GitBranch} iconColor={gold} />
        {openSections.decisions_framework && (
          <>
            <p style={{ color: muted, fontSize: '0.8rem', marginBottom: '1rem' }}>Every major decision passes through these three filters:</p>
            <div style={{ background: `${gold}15`, border: `1px solid ${gold}30`, borderRadius: '8px', padding: '1.25rem', marginBottom: '1rem' }}>
              <h4 style={{ color: gold, marginBottom: '0.5rem', fontSize: '0.9rem' }}>Before any significant decision, ask:</h4>
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: text, lineHeight: 1.8 }}>
                <li><strong>What would Jiwa do?</strong> {'\u2014'} Does this align with our story? Does it lead with how the visitor feels?</li>
                <li><strong>What would Sutherland test?</strong> {'\u2014'} Is there a counter-intuitive option we&apos;re ignoring?</li>
                <li><strong>What would Godin make remarkable?</strong> {'\u2014'} Would a sneezer share this? Does it avoid invisibility?</li>
              </ol>
            </div>
            <h4 style={{ color: gold, fontSize: '0.85rem', marginBottom: '0.25rem' }}>Morning Standup (5 min, daily)</h4>
            <p style={{ fontSize: '0.8rem', color: muted, marginBottom: '0.75rem' }}>Each team member answers the three questions for their current work.</p>
            <h4 style={{ color: gold, fontSize: '0.85rem', marginBottom: '0.25rem' }}>Weekly Pulse Check (30 min)</h4>
            <p style={{ fontSize: '0.8rem', color: muted }}>Full three-question framework review across all active workstreams.</p>
          </>
        )}
      </div>

      {/* AV SYSTEM OVERVIEW */}
      <div style={{ padding: '1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '2rem', position: 'relative' }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <SectionHeader id="techspec" title="AV System Overview" icon={Monitor} />
        {openSections.techspec && (
          <>
            <p style={{ color: muted, fontSize: '0.8rem', marginBottom: '1rem' }}>From the 70-page tech spec. Two immersive rooms, ~280 sq. m. total exhibition space.</p>

            <h4 style={{ color: accent, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Projection (37 Barco projectors)</h4>
            <DataTable
              columns={[
                { key: 'location', label: 'Location' },
                { key: 'model', label: 'Model' },
                { key: 'qty', label: 'Qty' },
                { key: 'resolution', label: 'Resolution' },
                { key: 'brightness', label: 'Brightness' },
                { key: 'power', label: 'Power' },
              ]}
              data={PROJECTION_SPECS}
              searchable={false}
              compact
            />
            <p style={{ fontSize: '0.75rem', color: muted, marginBottom: '1.5rem' }}>Total: 24,610W / ~121A. Projector heat: ~82,880 BTU/h. Signal: DisplayPort 1.4 over OS2 fiber (DVIGear DVI-7380).</p>

            <h4 style={{ color: accent, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Audio {'\u2014'} L-ISA Spatial (87 speakers)</h4>
            <DataTable
              columns={[
                { key: 'room', label: 'Room' },
                { key: 'speaker', label: 'Speaker' },
                { key: 'qty', label: 'Qty' },
                { key: 'role', label: 'Role' },
                { key: 'spl', label: 'SPL' },
              ]}
              data={AUDIO_SPECS}
              searchable={false}
              compact
            />
            <p style={{ fontSize: '0.75rem', color: muted, marginBottom: '1.5rem' }}>L-ISA Processor II: 96 spatial objects, 96kHz, Milan-AVB protocol. 6x LA7.16i amplified controllers. Cost: EUR 401,586.</p>

            <h4 style={{ color: accent, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Infrastructure</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {[
                { title: 'Media Servers', icon: Server, cardText: '5x Pixera PX2 Octo (2U). EUR 275,000 total. 800W/unit. Meinberg Microsync for PTP + genlock sync.' },
                { title: 'Network', icon: Wifi, cardText: '5 segregated networks: Video (fiber), Audio (Milan-AVB), Sensor (IP), Server Sync (multicast), Management (OSC/PTP). Core: 2x Netgear M4500-32C (100G).' },
                { title: 'Sensors', icon: Eye, cardText: '44 Luxonis OAK 4 D Pro Wide depth cameras. Onboard depth + neural inference. 120\u00B0 FOV. PoE+ 2.5GbE. EUR 32,116.' },
                { title: 'Server Room', icon: Shield, cardText: '2x 48U racks. 2x APC 10kVA UPS. Total heat: ~118,500 BTU/h. HVAC target: NC-35 acoustic rating in galleries.' },
              ].map(({ title, icon: Icon, cardText }) => (
                <div key={title} style={{ padding: '1rem', background: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)', border: `1px solid ${border}`, borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Icon size={14} style={{ color: accent }} />
                    <span style={{ fontWeight: 600, fontSize: '0.85rem', color: text }}>{title}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: muted, lineHeight: 1.6 }}>{cardText}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* VENDORS */}
      <div style={{ padding: '1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '2rem', position: 'relative' }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <SectionHeader id="vendors" title="Vendors & Quote Deadlines" icon={FileText} />
        {openSections.vendors && (
          <DataTable
            columns={[
              { key: 'system', label: 'System' },
              { key: 'vendor', label: 'Vendor' },
              { key: 'cost', label: 'Cost (EUR)' },
              { key: 'expires', label: 'Expires' },
              { key: 'status', label: 'Status', render: (v: unknown) => <Tag status={String(v)}>{String(v)}</Tag> },
            ]}
            data={VENDORS}
            statusKey="status"
            statusColors={{ critical: '#c0392b', warning: '#f39c12', active: '#27ae60', complete: '#27ae60', blocked: '#c0392b' }}
            compact
          />
        )}
      </div>

      {/* RISKS */}
      <div style={{ padding: '1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '2rem', position: 'relative' }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <SectionHeader id="risks" title="Risk Register" icon={AlertTriangle} iconColor="#c0392b" />
        {openSections.risks && (
          <DataTable
            columns={[
              { key: 'risk', label: 'Risk' },
              { key: 'likelihood', label: 'Likelihood', render: (v: unknown) => <Tag status="warning">{String(v)}</Tag> },
              { key: 'impact', label: 'Impact', render: (v: unknown) => <Tag status="critical">{String(v)}</Tag> },
              { key: 'mitigation', label: 'Mitigation' },
            ]}
            data={RISKS}
            compact
          />
        )}
      </div>

      {/* DECISIONS PENDING */}
      <div style={{ padding: '1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '2rem', position: 'relative' }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <SectionHeader id="decisions" title="Decisions Pending" icon={MessageSquare} />
        {openSections.decisions && (
          <DataTable
            columns={[
              { key: 'decision', label: 'Decision' },
              { key: 'owner', label: 'Owner' },
              { key: 'deadline', label: 'Deadline' },
              { key: 'status', label: 'Status', render: (v: unknown) => <Tag status={String(v)}>{String(v)}</Tag> },
            ]}
            data={DECISIONS_PENDING}
            statusKey="status"
            statusColors={{ critical: '#c0392b', pending: '#f39c12' }}
            compact
          />
        )}
      </div>

      {/* DELIVERABLES */}
      <div style={{ padding: '1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '2rem', position: 'relative' }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <SectionHeader id="deliverables" title="Phase 1 Deliverables (32 items)" icon={CheckCircle} iconColor="#27ae60" />
        {openSections.deliverables && (
          <>
            {([
              { title: '1A: Strategy & Positioning', items: DELIVERABLES.strategy, hasDue: false },
              { title: '1B: Construction & Technical \u2014 CRITICAL PATH', items: DELIVERABLES.construction, hasDue: true },
              { title: '1D: Brand Identity (RAD)', items: DELIVERABLES.brand, hasDue: true },
              { title: '1E: Digital Presence', items: DELIVERABLES.digital, hasDue: false },
            ] as const).map(({ title, items, hasDue }) => (
              <div key={title} style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: gold, fontSize: '0.85rem', marginBottom: '0.5rem' }}>{title}</h4>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead><tr>
                      <th style={thStyle}>Deliverable</th><th style={thStyle}>Owner</th>
                      {hasDue && <th style={thStyle}>Due</th>}
                      <th style={thStyle}>Status</th>
                    </tr></thead>
                    <tbody>
                      {items.map((item: any, i: number) => (
                        <tr key={i}>
                          <td style={tdStyle}>{item.name}</td><td style={tdStyle}>{item.owner}</td>
                          {hasDue && <td style={{ ...tdStyle, fontWeight: 600 }}>{item.due || '\u2014'}</td>}
                          <td style={tdStyle}><Tag status={item.status}>{item.status}</Tag></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* MEETING CADENCE */}
      <div style={{ padding: '1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '2rem', position: 'relative' }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <SectionHeader id="meetings" title="Meeting Cadence" icon={Clock} />
        {openSections.meetings && (
          <DataTable
            columns={[
              { key: 'meeting', label: 'Meeting' },
              { key: 'when', label: 'When' },
              { key: 'duration', label: 'Duration' },
              { key: 'who', label: 'Who' },
              { key: 'purpose', label: 'Purpose' },
            ]}
            data={MEETINGS}
            searchable={false}
            compact
          />
        )}
      </div>

      {/* Comments */}
      <Comments sectionId="ops-general" />

      {/* Quick links */}
      <div style={{ padding: '1rem 1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '3rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        {[
          { icon: FileText, label: 'Tech Spec', href: '/brief' },
          { icon: Target, label: 'Master Plan', href: '/plan' },
          { icon: Users, label: 'Executive', href: '/executive' },
          { icon: Activity, label: 'Network', href: '/network' },
          { icon: Clock, label: 'Latency', href: '/latency' },
          { icon: ExternalLink, label: 'GitHub', href: 'https://github.com/screeney/light-heart-tech' },
        ].map(({ icon: Icon, label, href }) => (
          <a key={href} href={href} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.8rem', color: accent,
            textDecoration: 'none', border: `1px solid ${accent}30`, transition: 'background 0.2s',
          }}>
            <Icon size={14} />
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
