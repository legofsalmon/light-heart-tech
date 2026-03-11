'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import {
  Eye, Users, Calendar, Building, Heart,
  ChevronDown, ChevronRight, Mail, ArrowRight,
  Sparkles, Shield, Globe, Layers,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { GpgpuCanvas } from '@/components/GpgpuCanvas';
import { SPECS, TEAM, CONTACTS, PARTNERS } from '@/data/constants';

/* ── DATA ─────────────────────────────────────────────── */

const PRINCIPLES = [
  {
    title: 'Independence',
    tagline: 'Full editorial freedom.',
    desc: 'Artists at Lightheart have complete creative control. No sponsor influence. No venue agenda. We provide the infrastructure; artists provide the vision.',
    icon: Shield,
    color: '#c4a265',
  },
  {
    title: 'Future Optimism',
    tagline: 'Technology as wonder.',
    desc: 'We believe technology can create awe, not just efficiency. Our exhibitions explore what digital tools make possible\u2014not dystopian warnings, but wonder-filled experiences.',
    icon: Sparkles,
    color: '#00d4ff',
  },
  {
    title: 'Awe',
    tagline: 'Design for collective wonder.',
    desc: 'The best immersive art creates shared moments\u2014strangers experiencing something extraordinary together. We select works designed for collective presence, not individual isolation.',
    icon: Heart,
    color: '#ff6b9d',
  },
  {
    title: 'Pluralism',
    tagline: 'Multiple voices, perspectives, forms.',
    desc: 'No single aesthetic dominates Lightheart. We program diverse artists, styles, and approaches. The only constant: ambition and artistic integrity.',
    icon: Globe,
    color: '#27ae60',
  },
];

const TIMELINE = [
  { year: '2023', title: 'Concept', items: ['Brendan Dillon conceives Lightheart', 'Initial feasibility studies'] },
  { year: '2024', title: 'Planning', items: ['Site selection (Dublin quays)', 'Fundraising and partnerships'] },
  { year: '2025', title: 'Design', items: ['Architectural design', 'Planning and approvals'] },
  { year: 'Feb 2026', title: 'Technical Design', items: ['IDIRNET engagement begins', 'IDIRNET completes 70-page tech spec', 'Vendor quotes and procurement'] },
  { year: 'Mar 2026', title: 'Pre-Construction', items: ['Final approvals', 'Contractor selection', 'Brand development with RAD'] },
  { year: 'Apr\u2013Aug 2026', title: 'Build', items: ['Construction and fit-out', 'AV installation', 'Testing and commissioning'] },
  { year: 'Sep 2026', title: 'OPENING', items: ['Grand opening', 'Agustin Vidal Saavedra / Glasseye XR: "Digital Nature"'] },
];

const VENUE_SPECS = [
  { label: 'Total Space', value: `~${SPECS.totalArea} sq. m.` },
  { label: 'Main Gallery (Room 1)', value: `~${SPECS.room1Area} sq. m., ${SPECS.room1WallProjectors} wall + ${SPECS.room1FloorProjectors} floor projectors, ${SPECS.room1Speakers} speakers` },
  { label: 'Intimate Gallery (Room 2)', value: `~${SPECS.room2Area} sq. m., ${SPECS.room2WallProjectors} wall + ${SPECS.room2FloorProjectors} floor projectors, ${SPECS.room2Speakers} speakers` },
  { label: 'Projection', value: `${SPECS.projectors} Barco projectors (4K + 2K)` },
  { label: 'Audio', value: `${SPECS.speakers} L-Acoustics speakers (L-ISA spatial audio)` },
  { label: 'Processing', value: `${SPECS.mediaServers} Pixera PX2 Octo media servers` },
  { label: 'Interactivity', value: `${SPECS.depthCameras} depth-sensing cameras` },
  { label: 'Investment', value: SPECS.investment },
];

const FAQ = [
  { q: 'What makes Lightheart different from other immersive experiences?', a: 'Three things: (1) We\u2019re purpose-built, not converted\u2014every element designed for immersion. (2) We commission artists, not license IP\u2014you\u2019ll see original works, not Van Gogh projections. (3) Our technology is integrated\u20144K projection + spatial audio + real-time interactivity working together.' },
  { q: 'Is this a museum?', a: 'No. Museums preserve and display existing works. Lightheart commissions new immersive art for our specific spaces. We change quarterly, like a gallery or theatre.' },
  { q: 'How long should I plan to visit?', a: 'Most visitors spend 60-90 minutes experiencing both galleries. Timed entry tickets ensure the space never feels crowded.' },
  { q: 'Is it accessible?', a: 'Yes. Step-free entry, lift access to all floors, wheelchair spaces, and accessible toilets. Contact accessibility@lightheart.ie for specific needs.' },
  { q: 'Can I take photos?', a: 'Photography policy varies by exhibition. Check the current exhibition page for details.' },
  { q: 'Who is this for?', a: 'Anyone curious about contemporary art and immersive experiences. Our target audience is culturally curious adults 25-45, but we welcome visitors of all ages and backgrounds.' },
];

const TEAM_LIST = [
  { ...TEAM.brendan, role: 'Vision, funding, governance', bio: '' },
  { ...TEAM.kev, role: 'Creative direction, artist relationships, technical design', bio: '' },
  { ...TEAM.kris, role: 'AV specification, infrastructure design, systems integration', bio: '' },
];

/* ── HELPERS ──────────────────────────────────────────── */

function SectionHeader({ title, icon: Icon }: { title: string; icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }> }) {
  const { isDarkMode } = useTheme();
  const gold = '#c4a265';
  return (
    <h2 style={{
      fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 700,
      color: isDarkMode ? '#fff' : '#111', marginBottom: '1rem',
      display: 'flex', alignItems: 'center', gap: '0.75rem',
    }}>
      <Icon size={22} style={{ color: gold, flexShrink: 0 }} />
      {title}
    </h2>
  );
}

/* ── PAGE ─────────────────────────────────────────────── */

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      <div ref={heroRef} style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none', zIndex: 0 }}>
          <GpgpuCanvas particleCount={1000} color={[0.77, 0.63, 0.4]} speed={0.15} height="100%" />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
            color: gold, marginBottom: '0.75rem', fontWeight: 600,
          }}>
            About Lightheart
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800,
            color: gold, marginBottom: '0.75rem', lineHeight: 1.1,
          }}>
            ART THAT SURROUNDS YOU
          </h1>
          <p style={{ fontSize: '1.1rem', color: muted, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            Dublin&apos;s new home for immersive contemporary art
          </p>
          <p style={{ fontSize: '0.95rem', color: muted, maxWidth: 650, margin: '1rem auto 0', lineHeight: 1.7 }}>
            Lightheart is a purpose-built immersive gallery on Dublin&apos;s quays. We&apos;ve created a space where
            technology serves artistic vision&mdash;where {SPECS.projectors} projectors and {SPECS.speakers} speakers
            combine to create experiences you don&apos;t just view, but inhabit.
          </p>
        </div>
      </div>

      {/* ── OUR STORY ─────────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="Why We Built Lightheart" icon={Heart} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: cardBg, border: cardBorder, borderRadius: 8, padding: '1.25rem' }}>
            <h3 style={{ color: gold, fontSize: '0.85rem', letterSpacing: '0.08em', marginBottom: '0.5rem', fontWeight: 600 }}>
              THE GAP
            </h3>
            <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.7 }}>
              Traditional galleries keep art at a distance. You stand. You observe. You move on.
              Pop-up &ldquo;immersive experiences&rdquo; prioritize photography over artistry.
              Screen-based entertainment isolates you in virtual worlds. We saw a gap.
            </p>
          </div>
          <div style={{ background: cardBg, border: cardBorder, borderRadius: 8, padding: '1.25rem' }}>
            <h3 style={{ color: gold, fontSize: '0.85rem', letterSpacing: '0.08em', marginBottom: '0.5rem', fontWeight: 600 }}>
              THE VISION
            </h3>
            <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.7 }}>
              Lightheart is the result: a purpose-built immersive art center on Dublin&apos;s quays.
              Two galleries designed from the ground up for projection-based art. Spatial audio
              that moves around you. Real-time interactivity that responds to your presence.
              Every element&mdash;the architecture, the acoustics, the infrastructure&mdash;designed
              for one purpose: to surround you with art.
            </p>
          </div>
          <div style={{ background: cardBg, border: cardBorder, borderRadius: 8, padding: '1.25rem' }}>
            <h3 style={{ color: gold, fontSize: '0.85rem', letterSpacing: '0.08em', marginBottom: '0.5rem', fontWeight: 600 }}>
              THE OPENING
            </h3>
            <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.7 }}>
              After three years of planning and a {SPECS.investment} investment, Lightheart opens
              in {SPECS.opening}. Our inaugural exhibition, &ldquo;Digital Nature&rdquo; by Agustin Vidal Saavedra of Glasseye XR,
              launches a quarterly program of internationally recognized immersive works.
            </p>
          </div>
        </div>
      </section>

      {/* ── CURATORIAL PRINCIPLES ─────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="How We Choose Art" icon={Layers} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {PRINCIPLES.map((p) => (
            <div key={p.title} style={{
              background: cardBg, border: cardBorder, borderRadius: 8,
              padding: '1.25rem', borderTop: `2px solid ${p.color}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <p.icon size={18} style={{ color: p.color }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111' }}>
                  {p.title}
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: gold, fontWeight: 600, marginBottom: '0.5rem' }}>
                {p.tagline}
              </p>
              <p style={{ fontSize: '0.85rem', color: muted, lineHeight: 1.6 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE VENUE ─────────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="Purpose-Built for Immersion" icon={Building} />
        <p style={{ color: muted, fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.7 }}>
          Dublin Quays, Ireland &mdash; near the Guinness Storehouse, in a neighborhood
          transforming into Dublin&apos;s cultural district.
        </p>
        <div style={{
          background: cardBg, border: cardBorder, borderRadius: 8, padding: '1rem',
          display: 'grid', gap: '0.5rem',
        }}>
          {VENUE_SPECS.map((s) => (
            <div key={s.label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              padding: '0.4rem 0', borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
              gap: '1rem', flexWrap: 'wrap',
            }}>
              <span style={{ fontSize: '0.8rem', color: gold, fontWeight: 600, letterSpacing: '0.03em' }}>
                {s.label}
              </span>
              <span style={{ fontSize: '0.85rem', color: muted }}>
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE TEAM ──────────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="The People Behind Lightheart" icon={Users} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {TEAM_LIST.map((t) => (
            <div key={t.name} style={{
              background: cardBg, border: cardBorder, borderRadius: 8, padding: '1.25rem',
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111', marginBottom: '0.25rem' }}>
                {t.name}
              </h3>
              <p style={{ fontSize: '0.8rem', color: gold, fontWeight: 600, marginBottom: '0.5rem' }}>
                {t.title}{'org' in t && t.org ? ` (${t.org})` : ''}
              </p>
              <p style={{ fontSize: '0.8rem', color: muted, lineHeight: 1.5 }}>
                {t.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── IDIRNET PARTNERSHIP ────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="Technical Excellence" icon={Layers} />
        <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>
          Lightheart&apos;s technical infrastructure was designed by IDIRNET, a creative technology
          studio specializing in immersive systems. The 70-page technical specification&mdash;covering
          everything from projector placement to network architecture&mdash;was developed between
          11 February and 4 March 2026.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          {Object.values(PARTNERS).map((p) => (
            <div key={p.name} style={{
              background: cardBg, border: cardBorder, borderRadius: 8,
              padding: '0.75rem', textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111' }}>
                {p.brand}
              </div>
              <div style={{ fontSize: '0.75rem', color: muted }}>
                {p.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="From Idea to Opening" icon={Calendar} />
        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: 8, top: 0, bottom: 0, width: 2,
            background: `linear-gradient(to bottom, ${gold}40, ${gold}, ${gold}40)`,
          }} />
          {TIMELINE.map((t, i) => (
            <div key={t.year} style={{ marginBottom: i < TIMELINE.length - 1 ? '1.5rem' : 0, position: 'relative' }}>
              {/* Dot */}
              <div style={{
                position: 'absolute', left: '-1.65rem', top: 4, width: 10, height: 10,
                borderRadius: '50%', background: gold,
                boxShadow: i === TIMELINE.length - 1 ? `0 0 8px ${gold}80` : 'none',
              }} />
              <div style={{ fontSize: '0.75rem', color: gold, fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                {t.year} &mdash; {t.title}
              </div>
              {t.items.map((item) => (
                <div key={item} style={{ fontSize: '0.85rem', color: muted, lineHeight: 1.5, paddingLeft: '0.5rem' }}>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="Questions & Answers" icon={Eye} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {FAQ.map((f, i) => (
            <div key={i} style={{
              background: cardBg, border: cardBorder, borderRadius: 8,
              overflow: 'hidden',
            }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: '100%', textAlign: 'left', padding: '1rem 1.25rem',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  color: isDarkMode ? '#fff' : '#111', fontSize: '0.9rem', fontWeight: 600,
                }}
              >
                {openFaq === i ? <ChevronDown size={16} style={{ color: gold, flexShrink: 0 }} /> : <ChevronRight size={16} style={{ color: muted, flexShrink: 0 }} />}
                {f.q}
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 1.25rem 1rem 2.75rem', fontSize: '0.85rem', color: muted, lineHeight: 1.7 }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────── */}
      <section style={{ marginBottom: '2rem' }}>
        <SectionHeader title="Get in Touch" icon={Mail} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          {[
            { label: 'General', email: CONTACTS.general },
            { label: 'Press', email: CONTACTS.press },
            { label: 'Partnerships', email: CONTACTS.partnerships },
            { label: 'Membership', email: CONTACTS.membership },
          ].map((c) => (
            <div key={c.label} style={{
              background: cardBg, border: cardBorder, borderRadius: 8,
              padding: '0.75rem 1rem',
            }}>
              <div style={{ fontSize: '0.75rem', color: gold, fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                {c.label}
              </div>
              <div style={{ fontSize: '0.85rem', color: muted }}>{c.email}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NAV LINKS ─────────────────────────── */}
      <div style={{
        display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center',
        paddingTop: '1rem', borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      }}>
        {[
          { label: 'Plan Your Visit', href: '/visit' },
          { label: 'Technology', href: '/technology' },
          { label: 'For Artists', href: '/artists' },
          { label: 'Press', href: '/press' },
        ].map((link) => (
          <Link key={link.href} href={link.href} style={{
            fontSize: '0.8rem', color: gold, display: 'flex', alignItems: 'center', gap: '0.25rem',
            textDecoration: 'none',
          }}>
            {link.label} <ArrowRight size={12} />
          </Link>
        ))}
      </div>
    </div>
  );
}
