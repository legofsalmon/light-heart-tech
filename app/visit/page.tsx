'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import {
  Ticket, Clock, MapPin, Accessibility, Sparkles,
  ShoppingBag, Users, HelpCircle, ChevronDown, ChevronRight,
  ArrowRight, Mail, Baby, GraduationCap,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { SPECS, CONTACTS } from '@/data/constants';

/* ── DATA ─────────────────────────────────────────────── */

const TICKET_TYPES = [
  { type: 'Adult', price: 'TBD', notes: 'Standard admission' },
  { type: 'Concession', price: 'TBD', notes: 'Students, seniors, disabled visitors' },
  { type: 'Child', price: 'TBD', notes: 'Ages TBD' },
  { type: 'Family', price: 'TBD', notes: '2 adults + 2 children' },
  { type: 'Members', price: 'Free', notes: 'Unlimited visits + guest tickets' },
];

const HOURS = [
  { day: 'Monday', hours: 'Closed' },
  { day: 'Tuesday', hours: 'TBD' },
  { day: 'Wednesday', hours: 'TBD' },
  { day: 'Thursday', hours: 'TBD' },
  { day: 'Friday', hours: 'TBD' },
  { day: 'Saturday', hours: 'TBD' },
  { day: 'Sunday', hours: 'TBD' },
];

const ACCESSIBILITY_ITEMS = [
  { label: 'Step-free entry', available: true },
  { label: 'Lift access to all floors', available: true },
  { label: 'Wheelchair spaces', available: true },
  { label: 'Accessible toilet', available: true },
  { label: 'Large print guides', available: true },
  { label: 'Hearing loops', available: null, note: 'TBD' },
  { label: 'BSL interpretation', available: null, note: 'Specific events' },
  { label: 'Assistance animals welcome', available: true },
];

const FACILITIES = [
  { name: 'Shop', desc: 'Exhibition merchandise, prints, books, gifts', icon: ShoppingBag },
  { name: 'Toilets', desc: 'Accessible toilet and baby changing available', icon: Users },
  { name: 'Cloakroom', desc: 'Free. Large bags must be checked.', icon: ShoppingBag },
  { name: 'WiFi', desc: 'Free WiFi \u2014 Network: Lightheart_Guest', icon: Sparkles },
];

const VISIT_STEPS = [
  { step: '1', title: 'Book Online', desc: 'Timed entry required. Book in advance.' },
  { step: '2', title: 'Arrive Early', desc: 'Check in at reception before your time slot.' },
  { step: '3', title: 'Experience', desc: 'Two galleries. Plan 60-90 minutes total.' },
  { step: '4', title: 'Explore', desc: 'Visit the shop, relax, take it all in.' },
];

const FAQ = [
  { q: 'Do I need to book in advance?', a: 'Yes. Timed entry tickets must be booked online in advance.' },
  { q: 'How long does a visit take?', a: 'Most visitors spend 60-90 minutes experiencing both galleries.' },
  { q: 'Can I take photos?', a: 'Photography policy varies by exhibition. Check the current exhibition page for details.' },
  { q: 'What if I\u2019m late for my time slot?', a: 'Entry at next available slot, subject to availability.' },
  { q: 'Is it suitable for people with photosensitivity?', a: 'Some exhibitions include flashing lights. Check content warnings and contact us with specific concerns.' },
  { q: 'Can I leave and come back?', a: 'Re-entry policy TBD. Check at reception.' },
];

/* ── HELPERS ──────────────────────────────────────────── */

function SectionHeader({ title, icon: Icon }: { title: string; icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }> }) {
  const { isDarkMode } = useTheme();
  return (
    <h2 style={{
      fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 700,
      color: isDarkMode ? '#fff' : '#111', marginBottom: '1rem',
      display: 'flex', alignItems: 'center', gap: '0.75rem',
    }}>
      <Icon size={22} style={{ color: '#c4a265', flexShrink: 0 }} />
      {title}
    </h2>
  );
}

/* ── PAGE ─────────────────────────────────────────────── */

export default function VisitPage() {
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
      <div ref={heroRef} style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem' }}>
        <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: gold, marginBottom: '0.75rem', fontWeight: 600 }}>
          Plan Your Visit
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: gold, marginBottom: '0.75rem', lineHeight: 1.1 }}>
          PLAN YOUR VISIT
        </h1>
        <p style={{ fontSize: '1.1rem', color: muted, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
          Everything you need to know before you arrive
        </p>
        <p style={{ fontSize: '0.9rem', color: muted, maxWidth: 500, margin: '0.75rem auto 0' }}>
          Lightheart opens {SPECS.opening}. Book tickets in advance for timed entry. Most visits last 60-90 minutes.
        </p>
      </div>

      {/* ── WHAT TO EXPECT ────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="What to Expect" icon={Sparkles} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {VISIT_STEPS.map((s) => (
            <div key={s.step} style={{
              background: cardBg, border: cardBorder, borderRadius: 8, padding: '1.25rem', textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: gold, marginBottom: '0.5rem' }}>{s.step}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111', marginBottom: '0.25rem' }}>{s.title}</div>
              <div style={{ fontSize: '0.8rem', color: muted, lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TICKETS ───────────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="Pricing & Admission" icon={Ticket} />
        <div style={{ background: cardBg, border: cardBorder, borderRadius: 8, overflow: 'hidden' }}>
          {TICKET_TYPES.map((t, i) => (
            <div key={t.type} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.75rem 1.25rem', gap: '1rem',
              borderBottom: i < TICKET_TYPES.length - 1 ? `1px solid ${isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}` : 'none',
            }}>
              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: isDarkMode ? '#fff' : '#111' }}>{t.type}</span>
                <span style={{ fontSize: '0.8rem', color: muted, marginLeft: '0.75rem' }}>{t.notes}</span>
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: t.price === 'Free' ? '#27ae60' : gold }}>
                {t.price === 'TBD' ? '\u20AC TBD' : t.price}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── OPENING HOURS ─────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="Opening Hours" icon={Clock} />
        <p style={{ fontSize: '0.85rem', color: muted, marginBottom: '1rem' }}>From {SPECS.opening}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
          {HOURS.map((h) => (
            <div key={h.day} style={{
              background: h.hours === 'Closed' ? `${isDarkMode ? 'rgba(255,0,0,0.05)' : 'rgba(255,0,0,0.03)'}` : cardBg,
              border: cardBorder, borderRadius: 8, padding: '0.75rem', textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.75rem', color: gold, fontWeight: 600, letterSpacing: '0.05em' }}>{h.day}</div>
              <div style={{ fontSize: '0.85rem', color: h.hours === 'Closed' ? '#ff4444' : muted, fontWeight: h.hours === 'Closed' ? 600 : 400 }}>{h.hours}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GETTING HERE ──────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="Getting Here" icon={MapPin} />
        <div style={{ background: cardBg, border: cardBorder, borderRadius: 8, padding: '1.25rem' }}>
          <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            On Dublin&apos;s quays, near the Guinness Storehouse. Full address details coming soon.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
            {[
              { label: 'Luas', value: 'Red Line (stop TBD)' },
              { label: 'Bus', value: 'Routes TBD' },
              { label: 'Parking', value: 'Nearby car park TBD' },
              { label: 'Bike', value: 'Dublin Bikes nearby' },
            ].map((t) => (
              <div key={t.label} style={{ fontSize: '0.8rem' }}>
                <span style={{ color: gold, fontWeight: 600 }}>{t.label}: </span>
                <span style={{ color: muted }}>{t.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACCESSIBILITY ─────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="Access for Everyone" icon={Accessibility} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
          {ACCESSIBILITY_ITEMS.map((a) => (
            <div key={a.label} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 0.75rem', background: cardBg, border: cardBorder, borderRadius: 6,
              fontSize: '0.85rem',
            }}>
              <span style={{ color: a.available === true ? '#27ae60' : a.available === false ? '#ff4444' : gold, fontWeight: 700 }}>
                {a.available === true ? '\u2713' : a.available === false ? '\u2717' : '\u2022'}
              </span>
              <span style={{ color: muted }}>
                {a.label}{a.note ? ` (${a.note})` : ''}
              </span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.8rem', color: muted, marginTop: '0.75rem' }}>
          Questions? Email <span style={{ color: gold }}>{CONTACTS.accessibility}</span>
        </p>
      </section>

      {/* ── FACILITIES ────────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="On Site" icon={ShoppingBag} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {FACILITIES.map((f) => (
            <div key={f.name} style={{ background: cardBg, border: cardBorder, borderRadius: 8, padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <f.icon size={16} style={{ color: gold }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111' }}>{f.name}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: muted, lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAMILIES & SCHOOLS ────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{ background: cardBg, border: cardBorder, borderRadius: 8, padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Baby size={18} style={{ color: gold }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111' }}>Families Welcome</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: muted, lineHeight: 1.6 }}>
              Baby changing and buggy parking available. Family tickets offered.
              Recommended age guidance varies by exhibition.
            </p>
          </div>
          <div style={{ background: cardBg, border: cardBorder, borderRadius: 8, padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <GraduationCap size={18} style={{ color: gold }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111' }}>Schools & Groups</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: muted, lineHeight: 1.6 }}>
              Advance booking required. Contact <span style={{ color: gold }}>{CONTACTS.education}</span> for
              workshops, curriculum links, and group discounts.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="Quick Answers" icon={HelpCircle} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {FAQ.map((f, i) => (
            <div key={i} style={{ background: cardBg, border: cardBorder, borderRadius: 8, overflow: 'hidden' }}>
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
      <section style={{
        textAlign: 'center', padding: '1.5rem',
        background: cardBg, border: cardBorder, borderRadius: 8,
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111', marginBottom: '0.5rem' }}>
          Questions?
        </h3>
        <p style={{ fontSize: '0.85rem', color: muted }}>
          General: <span style={{ color: gold }}>{CONTACTS.general}</span>
          {' '}&middot;{' '}
          Accessibility: <span style={{ color: gold }}>{CONTACTS.accessibility}</span>
        </p>
      </section>
    </div>
  );
}
