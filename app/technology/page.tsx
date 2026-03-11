'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Monitor, Speaker, Server, Wifi, Eye, Shield,
  Cpu, Zap, ChevronDown, ChevronRight, Users,
  Globe, Activity, Lock, ArrowRight,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

/* ── DATA ─────────────────────────────────────────────── */

const HERO_STATS = [
  { value: 37, label: 'Projectors', sub: '4K + 2K across two galleries' },
  { value: 87, label: 'Speakers', sub: 'L-ISA spatial audio' },
  { value: 5, label: 'Media Servers', sub: 'Pixera PX2 Octo' },
  { value: 96, label: 'Audio Objects', sub: 'In 3D space' },
];

const PROJECTION_ROOMS = [
  { location: 'Room 1 — Main Gallery Walls', model: 'Barco I600-4K10', resolution: 'WQUXGA 3840\u00D72400', brightness: '10,000 ISO lumens', qty: 14, lens: 'ILD 0.37 UST' },
  { location: 'Room 1 — Floor Projection', model: 'Barco G50-W8', resolution: 'WUXGA (2K)', brightness: '8,900 ISO lumens', qty: 10, lens: 'G-Lens 0.65\u20130.75:1' },
  { location: 'Room 2 — Walls', model: 'Barco I600-4K8', resolution: 'WQUXGA 3840\u00D72400', brightness: '8,000 ISO lumens', qty: 8, lens: '\u2014' },
  { location: 'Room 2 — Floor', model: 'Barco G50-W8', resolution: 'WUXGA (2K)', brightness: '8,900 ISO lumens', qty: 5, lens: '\u2014' },
];

const PULSE_FEATURES = [
  { name: 'Zero-latency geometry', desc: 'Complex warping and edge-blending with no input lag' },
  { name: 'DynaBlack', desc: 'Frame-by-frame contrast enhancement without artifacts' },
  { name: 'P7 RealColor', desc: 'Factory-calibrated colour matching across all projectors' },
];

const AUDIO_ROOMS = [
  { room: 'Room 1 — Main Gallery', speakers: [
    { type: 'Surround', model: 'L-Acoustics X8i', qty: 20 },
    { type: 'Height / Overhead', model: 'L-Acoustics X6i', qty: 20 },
    { type: 'Subwoofers', model: 'L-Acoustics SYVA SUB', qty: 8 },
  ], total: 48 },
  { room: 'Room 2', speakers: [
    { type: 'Surround', model: 'L-Acoustics X8i', qty: 14 },
    { type: 'Height / Overhead', model: 'L-Acoustics X6i', qty: 17 },
    { type: 'Subwoofers', model: 'L-Acoustics SYVA SUB', qty: 8 },
  ], total: 39 },
];

const AUDIO_PROCESSING = [
  { label: 'Processor', value: 'L-ISA Processor II — 128 in, 128 out, 96 spatial objects' },
  { label: 'Amplifiers', value: '6\u00D7 LA7.16i CE (16-channel, 1300W @ 8\u03A9)' },
  { label: 'Switches', value: '4\u00D7 L-Acoustics LS10 (Milan-AVB certified)' },
  { label: 'Sample Rate', value: '96kHz' },
  { label: 'Latency', value: '3.2ms (processor)' },
  { label: 'Protocol', value: 'Milan-AVB (not Dante)' },
];

const NETWORK_TABLE = [
  { network: 'Video Transport', hardware: 'DVIGear DVI-7380 over OS2 fiber', protocol: 'DisplayPort 1.4', purpose: '22\u00D7 4K uncompressed streams' },
  { network: 'Audio Control', hardware: '4\u00D7 L-Acoustics LS10', protocol: 'Milan-AVB', purpose: 'L-ISA spatial audio' },
  { network: 'Sensor Aggregation', hardware: '2\u00D7 Netgear XSM4344C', protocol: 'TCP/IP', purpose: 'Luxonis camera array' },
  { network: 'Server Interconnect', hardware: '2\u00D7 Netgear M4500-32C', protocol: 'IGMP Multicast', purpose: 'Pixera cluster sync' },
  { network: 'Management', hardware: 'Isolated VLAN', protocol: 'OSC, PTP, TCP/IP', purpose: 'Control and monitoring' },
];

const BACKBONE_STATS = [
  { label: 'Core switches', value: '2\u00D7 Netgear M4500-32C (32\u00D7 100G QSFP28)' },
  { label: 'Edge switches', value: '2\u00D7 Netgear XSM4344C (44\u00D7 10Gb PoE+)' },
  { label: 'Fiber', value: '50\u00D7 OS2 single-mode 4-core LC runs' },
  { label: 'Copper', value: '75\u00D7 Cat6a S/FTP shielded cables' },
];

const SERVER_ROOM = {
  physical: [
    { label: 'Racks', value: '2\u00D7 APC NetShelter SX 48U' },
    { label: 'UPS', value: '2\u00D7 APC Smart-UPS SRT 10kVA (redundant)' },
    { label: 'Power Draw', value: '~10,400W total' },
    { label: 'Cooling', value: 'HVAC designed for ~45,000 BTU/h' },
  ],
  equipment: [
    '5\u00D7 Pixera PX2 Octo media servers',
    '2\u00D7 Netgear M4500-32C core switches',
    '2\u00D7 Netgear XSM4344C edge switches',
    '1\u00D7 Meinberg Microsync Broadcast sync generator',
    '6\u00D7 LA7.16i audio amplifiers',
    '1\u00D7 L-ISA Processor II',
  ],
};

const BY_THE_NUMBERS = [
  { metric: 'Total Investment', value: '\u20AC4\u20134.5 million' },
  { metric: 'Exhibition Space', value: '~280 sq. m.' },
  { metric: 'Projector Power', value: '24,510W' },
  { metric: 'Heat Generated', value: '82,880 BTU/h' },
  { metric: 'Network Speed', value: '100G backbone' },
  { metric: 'Audio Latency', value: '3.2ms' },
  { metric: 'Sync Accuracy', value: 'Sample-accurate' },
  { metric: 'Development Period', value: 'Feb 11 \u2013 Mar 4, 2026' },
];

const PARTNERS = [
  { role: 'Audio', partner: 'Audiotek (L-Acoustics)' },
  { role: 'Projection', partner: 'Barco' },
  { role: 'Media Servers', partner: 'Pixera (AV Stumpfl)' },
  { role: 'Network', partner: 'Netgear' },
  { role: 'Signal Transport', partner: 'DVIGear' },
];

/* ── COMPONENT ────────────────────────────────────────── */

export default function TechnologyPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    projection: true, audio: true, servers: false, sensors: false,
    network: false, serverroom: false, numbers: false, team: false,
  });
  const [animatedStats, setAnimatedStats] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    if (heroRef.current) {
      gsap.from(heroRef.current.children, {
        opacity: 0, y: 30, stagger: 0.12, duration: 0.8, ease: 'expo.out',
      });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          HERO_STATS.forEach((stat, i) => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stat.value,
              duration: 1.5,
              delay: i * 0.15,
              ease: 'power2.out',
              onUpdate: () => {
                setAnimatedStats(prev => {
                  const next = [...prev];
                  next[i] = Math.round(obj.val);
                  return next;
                });
              },
            });
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const toggle = (key: string) => setOpenSections(p => ({ ...p, [key]: !p[key] }));

  const gold = '#c4a265';
  const goldDim = '#c4a26540';
  const accent = isDarkMode ? '#00F0FF' : '#004466';
  const muted = isDarkMode ? '#888' : '#666';
  const text = isDarkMode ? '#e0e0e0' : '#1a1a1a';
  const border = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)';
  const cardBg = isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)';
  const tableBg = isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)';

  const SectionHeader = ({ id, title, icon: Icon, iconColor }: { id: string; title: string; icon: typeof Monitor; iconColor?: string }) => (
    <button
      onClick={() => toggle(id)}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: openSections[id] ? '1rem' : '0',
        background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: '100%',
      }}
    >
      <Icon size={16} style={{ color: iconColor || gold, flexShrink: 0 }} />
      <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: iconColor || gold, letterSpacing: '0.1em', textTransform: 'uppercase', flex: 1, textAlign: 'left' }}>
        {title}
      </span>
      {openSections[id] ? <ChevronDown size={14} style={{ color: muted }} /> : <ChevronRight size={14} style={{ color: muted }} />}
    </button>
  );

  const thStyle: React.CSSProperties = { textAlign: 'left', padding: '0.5rem 0.75rem', background: tableBg, color: gold, fontWeight: 600, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `2px solid ${goldDim}` };
  const tdStyle: React.CSSProperties = { padding: '0.5rem 0.75rem', borderBottom: `1px solid ${border}`, color: text, fontSize: '0.8rem' };

  return (
    <div className="page-enter" style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>

      {/* ── HERO ───────────────────────────────── */}
      <div ref={heroRef} style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span className="status-dot" style={{ background: gold, boxShadow: `0 0 8px ${gold}99` }} />
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.7rem', color: gold, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Technology
          </span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display, Inter, system-ui)', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700, letterSpacing: '-0.03em', color: gold, margin: '0 0 0.75rem',
          lineHeight: 1.1,
        }}>
          THE TECHNOLOGY<br />BEHIND THE ART
        </h1>
        <p style={{ color: isDarkMode ? '#ccc' : '#444', fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', maxWidth: '40rem', margin: '0 auto 0.5rem', lineHeight: 1.6 }}>
          Thirty-seven projectors. Eighty-seven speakers. Five media servers. One extraordinary space.
        </p>
        <p style={{ color: muted, fontSize: '0.875rem', maxWidth: '38rem', margin: '0 auto', lineHeight: 1.6 }}>
          The first purpose-built immersive gallery in Ireland. Every technical decision was made to serve one goal: creating art that surrounds you completely.
        </p>
      </div>

      {/* ── STATS GRID ─────────────────────────── */}
      <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        {HERO_STATS.map((stat, i) => (
          <div key={i} style={{
            padding: '1.25rem 1rem', background: cardBg, border: `1px solid ${border}`,
            borderRadius: '8px', textAlign: 'center', position: 'relative',
            borderTop: `3px solid ${gold}`,
          }}>
            {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
            <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '2.5rem', fontWeight: 700, color: gold, lineHeight: 1 }}>
              {animatedStats[i]}
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: text, marginTop: '0.35rem' }}>{stat.label}</div>
            <div style={{ fontSize: '0.7rem', color: muted, marginTop: '0.15rem' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* ── PROJECTION ─────────────────────────── */}
      <div style={{ padding: '1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '2rem', position: 'relative' }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <SectionHeader id="projection" title="Barco Projection: Every Pixel Matters" icon={Monitor} />
        {openSections.projection && (
          <>
            <p style={{ color: muted, fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.7 }}>
              Thirty-seven Barco projectors across two galleries. Fourteen 4K projectors on the main gallery walls. Eight more in the second room. Plus fifteen floor projectors that transform the ground beneath your feet into part of the canvas.
            </p>
            <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead><tr>
                  <th style={thStyle}>Location</th><th style={thStyle}>Model</th><th style={thStyle}>Resolution</th><th style={thStyle}>Brightness</th><th style={thStyle}>Qty</th><th style={thStyle}>Lens</th>
                </tr></thead>
                <tbody>
                  {PROJECTION_ROOMS.map((p, i) => (
                    <tr key={i}>
                      <td style={tdStyle}>{p.location}</td>
                      <td style={{ ...tdStyle, fontFamily: 'monospace', color: gold }}>{p.model}</td>
                      <td style={tdStyle}>{p.resolution}</td>
                      <td style={tdStyle}>{p.brightness}</td>
                      <td style={{ ...tdStyle, fontWeight: 700 }}>{p.qty}</td>
                      <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '0.75rem' }}>{p.lens}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 style={{ color: gold, fontSize: '0.85rem', marginBottom: '0.75rem' }}>Barco Pulse Ecosystem</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
              {PULSE_FEATURES.map((f) => (
                <div key={f.name} style={{ padding: '0.75rem', background: `${gold}10`, border: `1px solid ${goldDim}`, borderRadius: '6px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: gold, marginBottom: '0.25rem' }}>{f.name}</div>
                  <div style={{ fontSize: '0.8rem', color: muted, lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.8rem', color: muted, fontStyle: 'italic' }}>
              Barco&apos;s 4-way pixel-shifting creates 9.2 million discrete pixels — double the 2-way systems. Sharper text, finer details, smoother gradients.
            </p>
          </>
        )}
      </div>

      {/* ── SPATIAL AUDIO ──────────────────────── */}
      <div style={{ padding: '1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '2rem', position: 'relative' }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <SectionHeader id="audio" title="L-ISA: Sound in Three Dimensions" icon={Speaker} />
        {openSections.audio && (
          <>
            <p style={{ color: muted, fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.7 }}>
              Eighty-seven speakers arranged around and above you. Sounds exist as points in three-dimensional space — moving freely, breathing, responding to the art.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              {AUDIO_ROOMS.map((room) => (
                <div key={room.room} style={{ padding: '1rem', background: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)', border: `1px solid ${border}`, borderRadius: '8px', borderTop: `3px solid ${gold}` }}>
                  <h4 style={{ fontSize: '0.85rem', color: gold, marginBottom: '0.75rem', fontWeight: 700 }}>
                    {room.room} ({room.total} speakers)
                  </h4>
                  {room.speakers.map((s) => (
                    <div key={s.type} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: `1px solid ${border}`, fontSize: '0.8rem' }}>
                      <span style={{ color: text }}>{s.type}</span>
                      <span style={{ color: muted, fontFamily: 'monospace', fontSize: '0.75rem' }}>{s.qty}\u00D7 {s.model}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <h4 style={{ color: gold, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Object-Based Audio</h4>
            <div style={{ padding: '1rem', background: `${gold}08`, border: `1px solid ${goldDim}`, borderRadius: '6px', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.85rem', color: text, marginBottom: '0.5rem', lineHeight: 1.6 }}>
                <strong style={{ color: gold }}>Traditional surround sound:</strong> Sound comes from the left speaker.
              </p>
              <p style={{ fontSize: '0.85rem', color: text, marginBottom: '0.5rem', lineHeight: 1.6 }}>
                <strong style={{ color: gold }}>L-ISA:</strong> Sound exists at coordinates X, Y, Z.
              </p>
              <p style={{ fontSize: '0.8rem', color: muted, lineHeight: 1.6 }}>
                Each audio source is an independent object. It can move through space, hover above you, circle the room. You&apos;re not listening to speakers. You&apos;re inside a three-dimensional sound field.
              </p>
            </div>

            <h4 style={{ color: gold, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Processing &amp; Specs</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.5rem' }}>
              {AUDIO_PROCESSING.map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: '0.75rem', padding: '0.4rem 0', borderBottom: `1px solid ${border}`, fontSize: '0.8rem' }}>
                  <span style={{ color: gold, fontWeight: 600, minWidth: '80px' }}>{item.label}</span>
                  <span style={{ color: muted, fontFamily: 'monospace', fontSize: '0.75rem' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── MEDIA SERVERS ──────────────────────── */}
      <div style={{ padding: '1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '2rem', position: 'relative' }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <SectionHeader id="servers" title="Pixera: The Brain of the Operation" icon={Cpu} />
        {openSections.servers && (
          <>
            <p style={{ color: muted, fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.7 }}>
              Five Pixera PX2 Octo media servers power the visual experiences. Purpose-built for real-time media playback, edge-blending across multiple projectors, and synchronising video across the entire venue.
            </p>
            <div style={{ padding: '1rem', background: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)', border: `1px solid ${border}`, borderRadius: '8px', borderLeft: `3px solid ${gold}`, marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.85rem', color: gold, marginBottom: '0.5rem' }}>Pixera PX2 Octo (\u00D75)</h4>
              {[
                { label: 'Form Factor', value: '2U rack-mount' },
                { label: 'Network', value: '10GBase-T ports' },
                { label: 'Outputs', value: '~14\u00D7 4K + 12\u00D7 2K configurable' },
                { label: 'Sync', value: 'Meinberg Microsync (PTP + Tri-level genlock)' },
                { label: 'Power', value: '800W per unit' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: '0.75rem', padding: '0.35rem 0', borderBottom: `1px solid ${border}`, fontSize: '0.8rem' }}>
                  <span style={{ color: gold, fontWeight: 600, minWidth: '100px' }}>{item.label}</span>
                  <span style={{ color: muted, fontFamily: 'monospace', fontSize: '0.75rem' }}>{item.value}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
              {[
                { title: 'Playback', desc: 'Real-time 4K video across all projectors' },
                { title: 'Blending', desc: 'Seamless edge-blending between overlaps' },
                { title: 'Mapping', desc: 'Geometry correction for curved surfaces' },
                { title: 'Sync', desc: 'Frame-accurate across both galleries' },
              ].map(({ title, desc }) => (
                <div key={title} style={{ padding: '0.75rem', background: `${gold}08`, border: `1px solid ${goldDim}`, borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: gold }}>{title}</div>
                  <div style={{ fontSize: '0.75rem', color: muted, marginTop: '0.25rem' }}>{desc}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── SENSORS ─────────────────────────────── */}
      <div style={{ padding: '1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '2rem', position: 'relative' }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <SectionHeader id="sensors" title="Seeing Without Watching" icon={Eye} />
        {openSections.sensors && (
          <>
            <p style={{ color: muted, fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.7 }}>
              An array of depth-sensing cameras enables artworks to respond to visitors. The cameras detect presence and movement — not identity. The art knows you&apos;re there. The art responds to you.
            </p>
            <div style={{ padding: '1rem', background: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)', border: `1px solid ${border}`, borderRadius: '8px', borderLeft: `3px solid ${gold}`, marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.85rem', color: gold, marginBottom: '0.5rem' }}>Luxonis OAK 4 D Pro Wide</h4>
              {[
                { label: 'Room 1', value: '28 units (specified)' },
                { label: 'Room 2', value: 'Additional units TBC' },
                { label: 'Field of View', value: '120\u00B0 horizontal' },
                { label: 'Depth Range', value: '3.4m coverage at 1m standoff' },
                { label: 'Processing', value: 'Onboard depth maps + neural inference' },
                { label: 'Interface', value: 'PoE+ 2.5GbE Ethernet' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: '0.75rem', padding: '0.35rem 0', borderBottom: `1px solid ${border}`, fontSize: '0.8rem' }}>
                  <span style={{ color: gold, fontWeight: 600, minWidth: '100px' }}>{item.label}</span>
                  <span style={{ color: muted, fontFamily: 'monospace', fontSize: '0.75rem' }}>{item.value}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '1rem', background: `${gold}08`, border: `1px solid ${goldDim}`, borderRadius: '6px', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <Lock size={18} style={{ color: gold, flexShrink: 0, marginTop: '0.1rem' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: gold, marginBottom: '0.25rem' }}>Privacy First</div>
                <p style={{ fontSize: '0.8rem', color: muted, lineHeight: 1.6, margin: 0 }}>
                  The sensor system tracks movement and presence — not identity. No facial recognition. No personal data storage. Just enough awareness for art to respond to the room.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── NETWORK ─────────────────────────────── */}
      <div style={{ padding: '1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '2rem', position: 'relative' }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <SectionHeader id="network" title="Five Networks. Zero Interference." icon={Wifi} />
        {openSections.network && (
          <>
            <p style={{ color: muted, fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.7 }}>
              Five separate networks, each isolated to prevent interference. Video signals don&apos;t compete with audio. Sensor data doesn&apos;t slow down control commands. Everything has dedicated bandwidth.
            </p>
            <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead><tr>
                  <th style={thStyle}>Network</th><th style={thStyle}>Hardware</th><th style={thStyle}>Protocol</th><th style={thStyle}>Purpose</th>
                </tr></thead>
                <tbody>
                  {NETWORK_TABLE.map((n, i) => (
                    <tr key={i}>
                      <td style={{ ...tdStyle, fontWeight: 600, color: gold }}>{n.network}</td>
                      <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '0.75rem' }}>{n.hardware}</td>
                      <td style={tdStyle}>{n.protocol}</td>
                      <td style={tdStyle}>{n.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h4 style={{ color: gold, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Backbone</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.5rem' }}>
              {BACKBONE_STATS.map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: '0.75rem', padding: '0.4rem 0', borderBottom: `1px solid ${border}`, fontSize: '0.8rem' }}>
                  <span style={{ color: gold, fontWeight: 600, minWidth: '100px' }}>{item.label}</span>
                  <span style={{ color: muted, fontFamily: 'monospace', fontSize: '0.75rem' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── SERVER ROOM ─────────────────────────── */}
      <div style={{ padding: '1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '2rem', position: 'relative' }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <SectionHeader id="serverroom" title="The Brain Behind the Experience" icon={Server} />
        {openSections.serverroom && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ padding: '1rem', background: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)', border: `1px solid ${border}`, borderRadius: '8px', borderTop: `3px solid ${gold}` }}>
                <h4 style={{ fontSize: '0.85rem', color: gold, marginBottom: '0.5rem' }}>Physical Infrastructure</h4>
                {SERVER_ROOM.physical.map((item) => (
                  <div key={item.label} style={{ display: 'flex', gap: '0.75rem', padding: '0.35rem 0', borderBottom: `1px solid ${border}`, fontSize: '0.8rem' }}>
                    <span style={{ color: gold, fontWeight: 600, minWidth: '90px' }}>{item.label}</span>
                    <span style={{ color: muted, fontFamily: 'monospace', fontSize: '0.75rem' }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: '1rem', background: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)', border: `1px solid ${border}`, borderRadius: '8px', borderTop: `3px solid ${accent}` }}>
                <h4 style={{ fontSize: '0.85rem', color: accent, marginBottom: '0.5rem' }}>Equipment List</h4>
                {SERVER_ROOM.equipment.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0', borderBottom: `1px solid ${border}`, fontSize: '0.8rem', color: muted }}>
                    <Zap size={10} style={{ color: gold, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '0.75rem 1rem', background: `${gold}08`, border: `1px solid ${goldDim}`, borderRadius: '6px' }}>
              <p style={{ fontSize: '0.8rem', color: muted, margin: 0, lineHeight: 1.6 }}>
                <strong style={{ color: gold }}>Synchronisation:</strong> The Meinberg Microsync Broadcast keeps everything in perfect time. PTP for audio. Tri-level genlock for video. Sample-accurate synchronisation across all systems.
              </p>
            </div>
          </>
        )}
      </div>

      {/* ── WHY THIS MATTERS ───────────────────── */}
      <div style={{
        padding: '2rem 1.5rem', marginBottom: '2rem', textAlign: 'center',
        background: `linear-gradient(135deg, ${isDarkMode ? 'rgba(196,162,101,0.08)' : 'rgba(196,162,101,0.05)'}, ${cardBg})`,
        border: `1px solid ${goldDim}`, borderRadius: '12px',
      }}>
        <h2 style={{ fontFamily: 'var(--font-display, Inter, system-ui)', fontSize: '1.5rem', fontWeight: 700, color: gold, marginBottom: '1.25rem' }}>
          Technology in Service of Art
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', maxWidth: '50rem', margin: '0 auto', textAlign: 'left' }}>
          {[
            { icon: Monitor, text: 'The projectors are the tools that let artists fill your vision with light.' },
            { icon: Speaker, text: 'The speakers are the means by which sound moves around you like a physical presence.' },
            { icon: Eye, text: 'The sensors are how the art knows you\u2019re there and responds to your presence.' },
            { icon: Wifi, text: 'The networks are the nervous system that keeps everything synchronised seamlessly.' },
          ].map(({ icon: Icon, text: t }) => (
            <div key={t} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <Icon size={18} style={{ color: gold, flexShrink: 0, marginTop: '0.15rem' }} />
              <p style={{ fontSize: '0.85rem', color: isDarkMode ? '#ccc' : '#444', lineHeight: 1.6, margin: 0 }}>{t}</p>
            </div>
          ))}
        </div>
        <p style={{ color: gold, fontSize: '0.95rem', fontWeight: 600, marginTop: '1.5rem', fontStyle: 'italic' }}>
          This isn&apos;t technology for technology&apos;s sake. It&apos;s technology in service of wonder.
        </p>
      </div>

      {/* ── BY THE NUMBERS ─────────────────────── */}
      <div style={{ padding: '1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '2rem', position: 'relative' }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <SectionHeader id="numbers" title="By the Numbers" icon={Activity} />
        {openSections.numbers && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {BY_THE_NUMBERS.map((item) => (
              <div key={item.metric} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)', border: `1px solid ${border}`, borderRadius: '6px' }}>
                <span style={{ fontSize: '0.8rem', color: muted }}>{item.metric}</span>
                <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.9rem', fontWeight: 700, color: gold }}>{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── TEAM ────────────────────────────────── */}
      <div style={{ padding: '1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '3rem', position: 'relative' }}>
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        <SectionHeader id="team" title="Built by Experts" icon={Users} />
        {openSections.team && (
          <>
            <p style={{ color: muted, fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.7 }}>
              The technical specification was developed by IDIRNET (Krisjanis Berzins, Kev Freeney, Colly) between 11 February and 4 March 2026.
            </p>
            <h4 style={{ color: gold, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Technical Partners</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
              {PARTNERS.map((p) => (
                <div key={p.role} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.6rem 0.75rem', background: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)',
                  border: `1px solid ${border}`, borderRadius: '6px', fontSize: '0.8rem',
                }}>
                  <span style={{ color: gold, fontWeight: 600 }}>{p.role}</span>
                  <span style={{ color: muted }}>{p.partner}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── BREADCRUMBS / NAV ──────────────────── */}
      <div style={{ padding: '1rem 1.5rem', background: cardBg, border: `1px solid ${border}`, borderRadius: '8px', marginBottom: '3rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        {[
          { label: 'Operations Hub', href: '/ops' },
          { label: 'Executive', href: '/executive' },
          { label: 'Master Plan', href: '/plan' },
          { label: 'Tech Spec', href: '/brief' },
        ].map(({ label, href }) => (
          <a key={href} href={href} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.8rem', color: gold,
            textDecoration: 'none', border: `1px solid ${goldDim}`, transition: 'background 0.2s',
          }}>
            <ArrowRight size={12} />
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
