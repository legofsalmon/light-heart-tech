'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Leaf, Users, Clock, Monitor, Speaker, Eye, Cpu,
  ArrowRight, MapPin, Accessibility, Calendar,
  Layers, Sparkles, Shield, Globe, Heart,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { digitalNatureExhibition } from '@/data/exhibitionsData';

/* ── PULL DATA FROM STRUCTURED SOURCE ─────────────────── */

const data = digitalNatureExhibition;

/* ── JOURNEY STEPS ────────────────────────────────────── */

const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Arrival',
    desc: 'Enter the lobby, receive your Horizon Card, and prepare for a 50-minute immersive journey. Staff guide you through a transition corridor as your senses adjust.',
    color: '#c4a265',
  },
  {
    step: '02',
    title: 'Room 1 — The Collective Forest',
    desc: '25-30 minutes in a vast space where 24 projectors and 48 speakers create a generative forest that breathes at the pace of the room. Move, and the environment notices.',
    color: '#00d4ff',
  },
  {
    step: '03',
    title: 'Transition',
    desc: 'A choreographed corridor resets your psychology. Light changes. Soundscape shifts. Your body is prepared for a different mode of attention.',
    color: '#c4a265',
  },
  {
    step: '04',
    title: 'Room 2 — The Individual Gesture',
    desc: '15-20 minutes of intimacy after scale. 13 projectors and 39 speakers create a contained environment where your individual gesture ripples through liquid light.',
    color: '#00d4ff',
  },
];

/* ── CURATORIAL PRINCIPLES ────────────────────────────── */

const PRINCIPLES = [
  {
    title: 'Embodied Participation',
    desc: 'The work only functions when bodies are present. Sensors track collective movement and presence, feeding real-time systems that respond to the actual humans in the room.',
    icon: Heart,
    color: '#ff6b9d',
  },
  {
    title: 'Purpose-Built Specificity',
    desc: 'Vidal Saavedra\u2019s work engages every aspect of Lightheart\u2019s technical infrastructure\u201437 projectors, 87 speakers, and 44 sensors are not tools he uses but collaborators in the work.',
    icon: Shield,
    color: '#c4a265',
  },
  {
    title: 'Technogenetic Integration',
    desc: 'The real-time systems are co-authors. The Pixera servers, L-ISA processor, and Luxonis sensors make decisions in milliseconds, creating emergent behaviour.',
    icon: Sparkles,
    color: '#00d4ff',
  },
  {
    title: 'Negentropic Practice',
    desc: 'The 50-minute duration allows the work to develop slowly\u2014rewarding sustained attention with deepening complexity. The antithesis of scroll-and-swipe culture.',
    icon: Globe,
    color: '#27ae60',
  },
];

/* ── TECH STATS ───────────────────────────────────────── */

const TECH_STATS = [
  { label: 'Projectors', value: data.technical.projectors.total, icon: Monitor },
  { label: 'Speakers', value: data.technical.audio.totalSpeakers, icon: Speaker },
  { label: 'Sensors', value: data.technical.sensors.total, icon: Eye },
  { label: 'Media Servers', value: data.technical.servers.count, icon: Cpu },
  { label: 'Audio Objects', value: data.technical.audio.spatialObjects, icon: Layers },
];

/* ── QUOTES (filtered from data) ─────────────────────── */

const DISPLAY_QUOTES = data.quotes.filter(
  (q) => q.id === 'q1-nature' || q.id === 'q2-presence' || q.id === 'q4-lightheart' || q.id === 'q5-curatorial',
);

/* ── HELPERS ──────────────────────────────────────────── */

function SectionHeader({
  title,
  icon: Icon,
}: {
  title: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}) {
  const { isDarkMode } = useTheme();
  const gold = '#c4a265';
  return (
    <h2
      style={{
        fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
        fontWeight: 700,
        color: isDarkMode ? '#fff' : '#111',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      <Icon size={22} style={{ color: gold, flexShrink: 0 }} />
      {title}
    </h2>
  );
}

/* ── PAGE ─────────────────────────────────────────────── */

export default function ExhibitionsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  const cyan = '#00d4ff';
  const gold = '#c4a265';
  const muted = isDarkMode ? '#aaa' : '#555';
  const cardBg = isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
  const cardBorder = isDarkMode
    ? '1px solid rgba(255,255,255,0.10)'
    : '1px solid rgba(0,0,0,0.08)';

  useEffect(() => {
    if (heroRef.current) {
      gsap.from(heroRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.8,
        ease: 'expo.out',
      });
    }
  }, []);

  return (
    <div
      className="page-enter"
      style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}
    >
      {/* ── 1. HERO ─────────────────────────────── */}
      <div
        ref={heroRef}
        style={{
          textAlign: 'center',
          marginBottom: '3.5rem',
          paddingTop: '2rem',
        }}
      >
        <div
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: cyan,
            marginBottom: '0.75rem',
            fontWeight: 600,
          }}
        >
          Inaugural Exhibition
        </div>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 900,
            color: cyan,
            marginBottom: '0.5rem',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          DIGITAL NATURE
        </h1>
        <p
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: gold,
            fontWeight: 600,
            marginBottom: '0.75rem',
          }}
        >
          Agustin Vidal Saavedra <span style={{ fontSize: '0.7em', opacity: 0.7 }}> / Glasseye XR</span>
        </p>
        <p
          style={{
            fontSize: '0.9rem',
            color: muted,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}
        >
          12 September &mdash; 6 December 2026
        </p>
        <p
          style={{
            fontSize: '1rem',
            color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)',
            fontStyle: 'italic',
            maxWidth: 500,
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Where the forest learns to breathe with the room.
        </p>
      </div>

      {/* ── 2. OVERVIEW ─────────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="Overview" icon={Leaf} />
        <p
          style={{
            fontSize: '0.95rem',
            color: muted,
            lineHeight: 1.8,
            maxWidth: 780,
          }}
        >
          {data.concept.summary}
        </p>
      </section>

      {/* ── 3. WHAT TO EXPECT ───────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="What to Expect" icon={ArrowRight} />
        <p
          style={{
            fontSize: '0.85rem',
            color: muted,
            marginBottom: '1.25rem',
            lineHeight: 1.6,
          }}
        >
          A 50-minute journey through two connected galleries. No intermission.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {JOURNEY_STEPS.map((s) => (
            <div
              key={s.step}
              style={{
                background: cardBg,
                border: cardBorder,
                borderRadius: 8,
                padding: '1.25rem',
                borderTop: `2px solid ${s.color}`,
              }}
            >
              <div
                style={{
                  fontSize: '0.7rem',
                  color: s.color,
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  marginBottom: '0.35rem',
                }}
              >
                STEP {s.step}
              </div>
              <h3
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: isDarkMode ? '#fff' : '#111',
                  marginBottom: '0.5rem',
                }}
              >
                {s.title}
              </h3>
              <p style={{ fontSize: '0.82rem', color: muted, lineHeight: 1.6 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. THE ROOMS ────────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="The Rooms" icon={Layers} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {/* Room 1 */}
          <div
            style={{
              background: cardBg,
              border: cardBorder,
              borderRadius: 8,
              padding: '1.5rem',
              borderLeft: `3px solid ${cyan}`,
            }}
          >
            <div
              style={{
                fontSize: '0.7rem',
                color: cyan,
                fontWeight: 700,
                letterSpacing: '0.12em',
                marginBottom: '0.25rem',
              }}
            >
              ROOM 1
            </div>
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: isDarkMode ? '#fff' : '#111',
                marginBottom: '0.5rem',
              }}
            >
              {data.experience.room1.title}
            </h3>
            <p
              style={{
                fontSize: '0.85rem',
                color: gold,
                fontWeight: 600,
                marginBottom: '0.75rem',
              }}
            >
              {data.experience.room1.duration}
            </p>
            <p
              style={{ fontSize: '0.85rem', color: muted, lineHeight: 1.7, marginBottom: '1rem' }}
            >
              Visitors enter a vast space where towering projections engulf peripheral vision
              while spatial audio places sounds in three-dimensional space around and above.
              The forest responds. As the group moves, the environment notices. As visitors
              settle, the system settles with them.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
              }}
            >
              {[
                { label: 'Projectors', val: `${data.technical.projectors.room1}` },
                { label: 'Speakers', val: '48' },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: isDarkMode ? 'rgba(0,212,255,0.05)' : 'rgba(0,212,255,0.06)',
                    borderRadius: 6,
                    padding: '0.5rem 0.75rem',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: cyan }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: muted, letterSpacing: '0.05em' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Room 2 */}
          <div
            style={{
              background: cardBg,
              border: cardBorder,
              borderRadius: 8,
              padding: '1.5rem',
              borderLeft: `3px solid ${gold}`,
            }}
          >
            <div
              style={{
                fontSize: '0.7rem',
                color: gold,
                fontWeight: 700,
                letterSpacing: '0.12em',
                marginBottom: '0.25rem',
              }}
            >
              ROOM 2
            </div>
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: isDarkMode ? '#fff' : '#111',
                marginBottom: '0.5rem',
              }}
            >
              {data.experience.room2.title}
            </h3>
            <p
              style={{
                fontSize: '0.85rem',
                color: gold,
                fontWeight: 600,
                marginBottom: '0.75rem',
              }}
            >
              {data.experience.room2.duration}
            </p>
            <p
              style={{ fontSize: '0.85rem', color: muted, lineHeight: 1.7, marginBottom: '1rem' }}
            >
              After Room 1&apos;s collective intensity, Room 2 offers intimacy. A more contained
              environment where individual gesture takes precedence. Your movement ripples
              through liquid light, creating a personal dialogue with the system.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
              }}
            >
              {[
                { label: 'Projectors', val: `${data.technical.projectors.room2}` },
                { label: 'Speakers', val: '39' },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: isDarkMode ? 'rgba(196,162,101,0.06)' : 'rgba(196,162,101,0.08)',
                    borderRadius: 6,
                    padding: '0.5rem 0.75rem',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: gold }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: muted, letterSpacing: '0.05em' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. TECHNICAL INFRASTRUCTURE ──────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="Technical Infrastructure" icon={Cpu} />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
          }}
        >
          {TECH_STATS.map((s) => (
            <div
              key={s.label}
              style={{
                background: cardBg,
                border: cardBorder,
                borderRadius: 8,
                padding: '1rem 1.5rem',
                textAlign: 'center',
                flex: '1 1 140px',
                maxWidth: 180,
              }}
            >
              <s.icon
                size={18}
                style={{ color: cyan, marginBottom: '0.35rem' }}
              />
              <div
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 900,
                  color: cyan,
                  lineHeight: 1.1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: '0.7rem',
                  color: muted,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginTop: '0.2rem',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <p
          style={{
            fontSize: '0.8rem',
            color: muted,
            textAlign: 'center',
            marginTop: '0.75rem',
            fontStyle: 'italic',
          }}
        >
          {data.technical.projectors.notes}
        </p>
      </section>

      {/* ── 6. ARTIST BIO ───────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="The Artist" icon={Users} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            alignItems: 'start',
          }}
        >
          {/* Portrait placeholder */}
          <div
            style={{
              background: isDarkMode
                ? 'rgba(0,212,255,0.04)'
                : 'rgba(0,212,255,0.06)',
              border: `1px dashed ${isDarkMode ? 'rgba(0,212,255,0.2)' : 'rgba(0,212,255,0.3)'}`,
              borderRadius: 8,
              aspectRatio: '3/4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '0.5rem',
              maxHeight: 320,
            }}
          >
            <Users size={32} style={{ color: cyan, opacity: 0.4 }} />
            <span
              style={{
                fontSize: '0.7rem',
                color: muted,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Portrait Forthcoming
            </span>
          </div>

          {/* Bio text */}
          <div>
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: isDarkMode ? '#fff' : '#111',
                marginBottom: '0.25rem',
              }}
            >
              {data.artist.name}
            </h3>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
              }}
            >
              <MapPin size={14} style={{ color: gold }} />
              <span style={{ fontSize: '0.85rem', color: gold, fontWeight: 600 }}>
                {data.artist.location}
              </span>
            </div>
            <p
              style={{
                fontSize: '0.88rem',
                color: muted,
                lineHeight: 1.75,
                marginBottom: '1rem',
              }}
            >
              {data.artist.bio.short}
            </p>
            <p style={{ fontSize: '0.85rem', color: muted, lineHeight: 1.7 }}>
              {data.artist.bio.extended}
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. CURATORIAL RATIONALE ─────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="Curatorial Rationale" icon={Sparkles} />
        <p
          style={{
            fontSize: '0.85rem',
            color: muted,
            marginBottom: '1.25rem',
            lineHeight: 1.6,
          }}
        >
          Four principles guided the selection of Digital Nature as Lightheart&apos;s
          inaugural exhibition.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {PRINCIPLES.map((p, i) => (
            <div
              key={p.title}
              style={{
                background: cardBg,
                border: cardBorder,
                borderRadius: 8,
                padding: '1.25rem',
                borderTop: `2px solid ${p.color}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    color: p.color,
                  }}
                >
                  {i + 1}.
                </span>
                <p.icon size={16} style={{ color: p.color }} />
                <h3
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: isDarkMode ? '#fff' : '#111',
                  }}
                >
                  {p.title}
                </h3>
              </div>
              <p style={{ fontSize: '0.82rem', color: muted, lineHeight: 1.6 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. QUOTES ───────────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="In Their Words" icon={Heart} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {DISPLAY_QUOTES.map((q) => {
            const isArtist = q.context === 'artist';
            const accentColor = isArtist ? cyan : gold;
            // Strip the "[DRAFT - PENDING ARTIST INPUT] " prefix for display
            const displayText = q.text.replace(/^\[DRAFT - PENDING ARTIST INPUT\]\s*/, '');
            return (
              <div
                key={q.id}
                style={{
                  background: cardBg,
                  border: cardBorder,
                  borderRadius: 8,
                  padding: '1.5rem',
                  borderLeft: `3px solid ${accentColor}`,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontSize: '2rem',
                    color: accentColor,
                    opacity: 0.3,
                    position: 'absolute',
                    top: '0.5rem',
                    left: '1rem',
                    lineHeight: 1,
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  &ldquo;
                </div>
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: isDarkMode ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.7)',
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                    paddingLeft: '0.5rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  {displayText}
                </p>
                <div style={{ paddingLeft: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: accentColor,
                      fontWeight: 600,
                    }}
                  >
                    &mdash; {q.attribution}
                  </span>
                  {q.role && (
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: muted,
                        marginLeft: '0.5rem',
                      }}
                    >
                      {q.role}
                    </span>
                  )}
                </div>
                {q.status === 'draft' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.5rem',
                      right: '0.75rem',
                      fontSize: '0.6rem',
                      color: muted,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      opacity: 0.5,
                    }}
                  >
                    Draft
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 9. VISITOR INFO ─────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="Visitor Information" icon={Calendar} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          {/* Duration & Capacity */}
          <div
            style={{
              background: cardBg,
              border: cardBorder,
              borderRadius: 8,
              padding: '1.25rem',
            }}
          >
            <h3
              style={{
                fontSize: '0.8rem',
                color: cyan,
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginBottom: '0.75rem',
              }}
            >
              DURATION &amp; CAPACITY
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: 'Duration', value: `${data.visitorInfo.duration} minutes, no intermission` },
                { label: 'Capacity', value: `~${data.visitorInfo.capacity.total} visitors per session` },
                { label: 'Room 1', value: `Up to ${data.visitorInfo.capacity.room1} visitors` },
                { label: 'Room 2', value: `Up to ${data.visitorInfo.capacity.room2} visitors` },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                    paddingBottom: '0.35rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: gold,
                      fontWeight: 600,
                    }}
                  >
                    {item.label}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: muted }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sessions & Age */}
          <div
            style={{
              background: cardBg,
              border: cardBorder,
              borderRadius: 8,
              padding: '1.25rem',
            }}
          >
            <h3
              style={{
                fontSize: '0.8rem',
                color: cyan,
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginBottom: '0.75rem',
              }}
            >
              SESSIONS &amp; AGE
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                  paddingBottom: '0.35rem',
                }}
              >
                <span style={{ fontSize: '0.8rem', color: gold, fontWeight: 600 }}>
                  Sessions
                </span>
                <span style={{ fontSize: '0.82rem', color: muted }}>
                  Timed entry, schedule TBC
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                  paddingBottom: '0.35rem',
                }}
              >
                <span style={{ fontSize: '0.8rem', color: gold, fontWeight: 600 }}>
                  Ages
                </span>
                <span style={{ fontSize: '0.82rem', color: muted }}>
                  {data.visitorInfo.ageRecommendation.minAge}+ recommended
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.78rem',
                  color: muted,
                  lineHeight: 1.5,
                  marginTop: '0.25rem',
                }}
              >
                {data.visitorInfo.ageRecommendation.notes}
              </p>
            </div>
          </div>

          {/* Accessibility */}
          <div
            style={{
              background: cardBg,
              border: cardBorder,
              borderRadius: 8,
              padding: '1.25rem',
            }}
          >
            <h3
              style={{
                fontSize: '0.8rem',
                color: cyan,
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Accessibility size={14} />
              ACCESSIBILITY
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                {
                  label: 'Wheelchair Access',
                  value: data.visitorInfo.accessibility.wheelchairAccessible
                    ? 'Yes'
                    : 'No',
                },
                {
                  label: 'Exit During Show',
                  value: data.visitorInfo.accessibility.exitPossible
                    ? 'Available at any time'
                    : 'Limited',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                    paddingBottom: '0.35rem',
                  }}
                >
                  <span style={{ fontSize: '0.8rem', color: gold, fontWeight: 600 }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: muted }}>
                    {item.value}
                  </span>
                </div>
              ))}
              <p
                style={{
                  fontSize: '0.78rem',
                  color: muted,
                  lineHeight: 1.5,
                  marginTop: '0.25rem',
                }}
              >
                Staff trained to assist visitors with accessibility needs.
                Full accessibility audit pending.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. CTA ─────────────────────────────── */}
      <section
        style={{
          textAlign: 'center',
          padding: '2.5rem 2rem',
          background: isDarkMode
            ? 'linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(196,162,101,0.04) 100%)'
            : 'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(196,162,101,0.06) 100%)',
          border: cardBorder,
          borderRadius: 12,
          marginBottom: '2rem',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 800,
            color: cyan,
            marginBottom: '0.75rem',
          }}
        >
          Book Your Session
        </h2>
        <p
          style={{
            fontSize: '0.95rem',
            color: isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)',
            maxWidth: 500,
            margin: '0 auto 1.5rem',
            lineHeight: 1.6,
          }}
        >
          Digital Nature opens 12 September 2026. Tickets and session times will be
          announced closer to the opening date.
        </p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 2rem',
            background: isDarkMode
              ? 'rgba(0,212,255,0.12)'
              : 'rgba(0,212,255,0.1)',
            border: `1px solid ${cyan}40`,
            borderRadius: 6,
            color: cyan,
            fontWeight: 700,
            fontSize: '0.9rem',
            letterSpacing: '0.05em',
            cursor: 'default',
          }}
        >
          <Clock size={16} />
          Tickets Opening Soon
        </div>
        <p
          style={{
            fontSize: '0.78rem',
            color: muted,
            marginTop: '1rem',
            fontStyle: 'italic',
          }}
        >
          You simply have to be there.
        </p>
      </section>

      {/* ── NAV LINKS ───────────────────────────── */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          paddingTop: '1rem',
          borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        }}
      >
        {[
          { label: 'About Lightheart', href: '/about' },
          { label: 'Plan Your Visit', href: '/visit' },
          { label: 'For Artists', href: '/artists' },
          { label: 'Press', href: '/press' },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              fontSize: '0.8rem',
              color: gold,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              textDecoration: 'none',
            }}
          >
            {link.label} <ArrowRight size={12} />
          </a>
        ))}
      </div>
    </div>
  );
}
