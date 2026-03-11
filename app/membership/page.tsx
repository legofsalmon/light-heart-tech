'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Zap, Eye, Users, Gift, Award, CreditCard, Package, Mail,
  ChevronDown, ChevronRight, ArrowRight, HelpCircle, Star,
  Clock, Shield, Check, Minus, Crown,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import {
  membershipTiers,
  membershipBenefits,
  membershipFAQ,
  membershipPageMeta,
  membershipHero,
  membershipScarcity,
  membershipCTA,
  comparisonTableConfig,
  formatPrice,
} from '@/data/membershipData';

/* ── ICON MAP ────────────────────────────────────────── */

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Zap, Eye, Users, Gift, Award, CreditCard, Package, Mail,
};

/* ── COMPARISON TABLE VALUES ─────────────────────────── */

const comparisonValues: Record<string, Record<string, string | boolean>> = {
  price: { circle: '€199/yr', 'inner-circle': '€499/yr', cornerstone: '€999/yr' },
  priorityBooking: { circle: '48 hours', 'inner-circle': '1 week', cornerstone: 'Guaranteed' },
  unlimitedVisits: { circle: 'Self only', 'inner-circle': 'Self + 1 guest', cornerstone: 'Self + 1 guest' },
  previewEvenings: { circle: true, 'inner-circle': true, cornerstone: true },
  curatorWalkthroughs: { circle: false, 'inner-circle': true, cornerstone: true },
  artistDinners: { circle: false, 'inner-circle': false, cornerstone: true },
  behindScenes: { circle: false, 'inner-circle': true, cornerstone: true },
  guestPasses: { circle: '2/year', 'inner-circle': '6/year', cornerstone: '12/year' },
  giftMembership: { circle: false, 'inner-circle': false, cornerstone: '1 included' },
  directorLine: { circle: false, 'inner-circle': false, cornerstone: true },
  membershipCard: { circle: 'Embossed', 'inner-circle': 'Metal', cornerstone: 'Hand-finished metal' },
  welcomePack: { circle: 'Standard', 'inner-circle': 'Enhanced', cornerstone: 'Full + artist print' },
  foundingWall: { circle: true, 'inner-circle': true, cornerstone: 'Prominent' },
  websiteListing: { circle: false, 'inner-circle': 'Opt-in', cornerstone: 'Opt-in' },
};

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

export default function MembershipPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedBenefits, setExpandedBenefits] = useState<Record<string, boolean>>({});

  const gold = '#c4a265';
  const cyan = '#00d4ff';
  const muted = isDarkMode ? '#999' : '#555';
  const cardBg = isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
  const cardBorder = isDarkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)';
  const rowBorder = isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';

  useEffect(() => {
    if (heroRef.current) {
      gsap.from(heroRef.current.children, {
        opacity: 0, y: 30, stagger: 0.12, duration: 0.8, ease: 'expo.out',
      });
    }
  }, []);

  const toggleBenefit = (id: string) => {
    setExpandedBenefits(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>

      {/* ── 1. HERO ─────────────────────────────── */}
      <div ref={heroRef} style={{ textAlign: 'center', marginBottom: '3.5rem', paddingTop: '2rem' }}>
        <div style={{
          fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          color: gold, marginBottom: '0.75rem', fontWeight: 600,
        }}>
          Founding Circle
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800,
          color: gold, marginBottom: '0.75rem', lineHeight: 1.1,
        }}>
          JOIN THE FOUNDING CIRCLE
        </h1>
        <p style={{ fontSize: '1.1rem', color: muted, maxWidth: 650, margin: '0 auto', lineHeight: 1.6 }}>
          {membershipHero.subheadline}
        </p>
        <p style={{
          fontSize: '0.9rem', color: muted, maxWidth: 500, margin: '1rem auto 0',
          letterSpacing: '0.02em',
        }}>
          {membershipHero.supporting}
        </p>
        <div style={{ marginTop: '1.5rem' }}>
          <a
            href="#tiers"
            style={{
              display: 'inline-block', padding: '0.75rem 2rem',
              background: gold, color: '#0a0a0a', borderRadius: 6,
              fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
              letterSpacing: '0.03em',
            }}
          >
            {membershipCTA.hero.primary}
          </a>
        </div>
      </div>

      {/* ── 2. WHAT IS IT ──────────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="What Is the Founding Circle?" icon={Crown} />
        <div style={{ background: cardBg, border: cardBorder, borderRadius: 8, padding: '1.5rem' }}>
          <p style={{
            fontSize: '1.05rem', color: gold, fontWeight: 600,
            fontStyle: 'italic', marginBottom: '1rem', lineHeight: 1.6,
          }}>
            More than membership. A founding commitment.
          </p>
          <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.7, marginBottom: '1rem' }}>
            The Founding Circle is limited to {membershipPageMeta.totalCapacity} people. Not a waitlist feature,
            not a marketing tactic&mdash;a real, permanent cap. When 200 members join, the Founding Circle closes
            forever. Your name goes on the founding wall inside the gallery, permanently. It stays there whether
            you renew or not. You are part of the building&apos;s story.
          </p>
          <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.7 }}>
            This is for people who want to be part of something from the very beginning. Who understand that
            supporting a cultural space before it opens is a different kind of commitment&mdash;and one that
            deserves a different kind of recognition.
          </p>
        </div>
      </section>

      {/* ── 3. KEY STATS ──────────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem',
          textAlign: 'center',
        }}>
          {[
            { value: '200', label: 'Founding Members', sub: 'Maximum. Ever.' },
            { value: '3', label: 'Tiers', sub: 'Circle / Inner Circle / Cornerstone' },
            { value: 'Forever', label: 'On the Wall', sub: 'Your name. Permanent.' },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: cardBg, border: cardBorder, borderRadius: 8,
              padding: '1.25rem 0.75rem',
            }}>
              <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: gold, lineHeight: 1.1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: isDarkMode ? '#fff' : '#111', marginTop: '0.25rem' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '0.75rem', color: muted, marginTop: '0.15rem' }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. BENEFITS ──────────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="Member Benefits" icon={Star} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {membershipBenefits.map((benefit) => {
            const IconComp = benefit.icon ? ICON_MAP[benefit.icon] : Star;
            const isExpanded = expandedBenefits[benefit.id] ?? false;
            return (
              <div key={benefit.id} style={{
                background: cardBg, border: cardBorder, borderRadius: 8,
                padding: '1.25rem', borderTop: `2px solid ${cyan}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  {IconComp && <IconComp size={18} style={{ color: cyan }} />}
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#111' }}>
                    {benefit.title}
                  </h3>
                </div>
                <p style={{
                  fontSize: '0.85rem', color: gold, fontStyle: 'italic',
                  lineHeight: 1.6, marginBottom: '0.75rem',
                }}>
                  {benefit.fortune}
                </p>
                <button
                  onClick={() => toggleBenefit(benefit.id)}
                  style={{
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    color: cyan, fontSize: '0.8rem', fontWeight: 600,
                    padding: 0, marginBottom: isExpanded ? '0.5rem' : 0,
                  }}
                >
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  {isExpanded ? 'Hide details' : 'View details'}
                </button>
                {isExpanded && (
                  <ul style={{ margin: 0, paddingLeft: '1rem', listStyle: 'none' }}>
                    {benefit.cookie.map((point, j) => (
                      <li key={j} style={{
                        fontSize: '0.8rem', color: muted, lineHeight: 1.6,
                        paddingLeft: '0.5rem', position: 'relative',
                      }}>
                        <span style={{ position: 'absolute', left: '-0.5rem', color: cyan }}>&#8226;</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 5. TIER CARDS ────────────────────────── */}
      <section id="tiers" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
        <SectionHeader title="Choose Your Tier" icon={CreditCard} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {membershipTiers.map((tier) => {
            const isCornerstone = tier.id === 'cornerstone';
            return (
              <div key={tier.id} style={{
                background: cardBg,
                border: isCornerstone ? `2px solid ${gold}` : cardBorder,
                borderRadius: 8, padding: '1.5rem',
                position: 'relative', overflow: 'hidden',
                boxShadow: isCornerstone ? `0 0 20px ${gold}15` : 'none',
              }}>
                {isCornerstone && (
                  <div style={{
                    position: 'absolute', top: 12, right: -30,
                    background: gold, color: '#0a0a0a',
                    fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.1em',
                    padding: '0.2rem 2rem', transform: 'rotate(45deg)',
                    textTransform: 'uppercase',
                  }}>
                    Patron
                  </div>
                )}
                <div style={{
                  fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: isCornerstone ? gold : cyan, fontWeight: 600, marginBottom: '0.25rem',
                }}>
                  {tier.name}
                </div>
                <div style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800,
                  color: isDarkMode ? '#fff' : '#111', lineHeight: 1.1,
                }}>
                  {formatPrice(tier.price)}
                  <span style={{ fontSize: '0.85rem', fontWeight: 400, color: muted }}>/year</span>
                </div>
                <p style={{
                  fontSize: '0.8rem', color: muted, margin: '0.75rem 0',
                  lineHeight: 1.5, fontStyle: 'italic',
                }}>
                  {tier.profile}
                </p>

                {/* Best For tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                  {tier.bestFor.map((tag) => (
                    <span key={tag} style={{
                      fontSize: '0.7rem', padding: '0.2rem 0.5rem',
                      borderRadius: 4, fontWeight: 600,
                      background: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                      color: isDarkMode ? '#ccc' : '#555',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Includes list */}
                <ul style={{ margin: '0 0 1rem 0', paddingLeft: '0', listStyle: 'none' }}>
                  {tier.includes.map((item, j) => {
                    const isHeader = item.includes('Everything in');
                    return (
                      <li key={j} style={{
                        fontSize: '0.8rem', color: isHeader ? cyan : muted,
                        lineHeight: 1.6, display: 'flex', alignItems: 'baseline', gap: '0.4rem',
                        fontWeight: isHeader ? 600 : 400,
                      }}>
                        {!isHeader && <Check size={12} style={{ color: cyan, flexShrink: 0, marginTop: 2 }} />}
                        {item}
                      </li>
                    );
                  })}
                </ul>

                {/* Fortune quote */}
                <p style={{
                  fontSize: '0.78rem', color: gold, fontStyle: 'italic',
                  lineHeight: 1.5, marginBottom: '1rem',
                  borderLeft: `2px solid ${gold}40`, paddingLeft: '0.75rem',
                }}>
                  {tier.benefits.fortune}
                </p>

                {/* CTA button */}
                <a
                  href={`mailto:membership@lightheart.ie?subject=${encodeURIComponent(`Founding Circle — ${tier.name} Application`)}`}
                  style={{
                    display: 'block', textAlign: 'center',
                    padding: '0.65rem 1rem', borderRadius: 6,
                    fontWeight: 700, fontSize: '0.85rem',
                    textDecoration: 'none', letterSpacing: '0.03em',
                    background: isCornerstone ? gold : 'transparent',
                    color: isCornerstone ? '#0a0a0a' : (isDarkMode ? '#fff' : '#111'),
                    border: isCornerstone ? 'none' : `1px solid ${isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                  }}
                >
                  {tier.cta}
                </a>

                {/* Availability */}
                <div style={{
                  fontSize: '0.7rem', color: muted, textAlign: 'center',
                  marginTop: '0.5rem',
                }}>
                  {tier.availability.total} places &middot; {tier.availability.percentage}% of total
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 6. COMPARISON TABLE ──────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="Full Comparison" icon={Shield} />
        <div style={{
          overflowX: 'auto', borderRadius: 8,
          border: cardBorder, background: cardBg,
        }}>
          <table style={{
            width: '100%', borderCollapse: 'collapse',
            fontSize: '0.8rem', minWidth: 500,
          }}>
            <thead>
              <tr>
                <th style={{
                  textAlign: 'left', padding: '0.75rem 1rem',
                  color: muted, fontWeight: 600, fontSize: '0.75rem',
                  letterSpacing: '0.05em', borderBottom: `1px solid ${rowBorder}`,
                }}>
                  Benefit
                </th>
                {membershipTiers.map((tier) => (
                  <th key={tier.id} style={{
                    textAlign: 'center', padding: '0.75rem 0.75rem',
                    color: tier.id === 'cornerstone' ? gold : (isDarkMode ? '#fff' : '#111'),
                    fontWeight: 700, fontSize: '0.8rem',
                    borderBottom: `1px solid ${rowBorder}`,
                  }}>
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonTableConfig.rows.map((row, i) => (
                <tr key={row.key} style={{
                  borderBottom: i < comparisonTableConfig.rows.length - 1
                    ? `1px solid ${rowBorder}` : 'none',
                }}>
                  <td style={{
                    padding: '0.6rem 1rem', color: isDarkMode ? '#ccc' : '#333',
                    fontWeight: 500,
                  }}>
                    {row.label}
                  </td>
                  {comparisonTableConfig.tiers.map((tierId) => {
                    const val = comparisonValues[row.key]?.[tierId];
                    let content: React.ReactNode;
                    if (val === true) {
                      content = <Check size={16} style={{ color: '#27ae60' }} />;
                    } else if (val === false) {
                      content = <Minus size={16} style={{ color: isDarkMode ? '#555' : '#bbb' }} />;
                    } else {
                      content = <span style={{ color: muted }}>{val}</span>;
                    }
                    return (
                      <td key={tierId} style={{
                        textAlign: 'center', padding: '0.6rem 0.75rem',
                      }}>
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 7. WHY JOIN NOW / SCARCITY ────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="Why Join Now" icon={Clock} />
        <div style={{ background: cardBg, border: cardBorder, borderRadius: 8, padding: '1.5rem' }}>
          <p style={{
            fontSize: '1.05rem', color: gold, fontWeight: 600,
            marginBottom: '1rem', lineHeight: 1.5,
          }}>
            When {membershipScarcity.totalCapacity} join, it closes forever.
          </p>
          <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.7, marginBottom: '1.5rem' }}>
            The Founding Circle is not a recurring campaign. There is no second round, no expansion, no
            &ldquo;we decided to add more.&rdquo; {membershipScarcity.totalCapacity} members. Then the
            programme closes permanently. Your founding status and wall placement are locked in from the
            moment you join.
          </p>

          {/* Phases */}
          <div style={{ position: 'relative', paddingLeft: '2rem' }}>
            <div style={{
              position: 'absolute', left: 8, top: 0, bottom: 0, width: 2,
              background: `linear-gradient(to bottom, ${cyan}40, ${cyan}, ${cyan}40)`,
            }} />
            {membershipScarcity.phases.map((phase, i) => (
              <div key={phase.name} style={{
                marginBottom: i < membershipScarcity.phases.length - 1 ? '1.25rem' : 0,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', left: '-1.65rem', top: 4, width: 10, height: 10,
                  borderRadius: '50%', background: cyan,
                  boxShadow: i === 0 ? `0 0 8px ${cyan}80` : 'none',
                }} />
                <div style={{
                  fontSize: '0.75rem', color: cyan, fontWeight: 700,
                  letterSpacing: '0.1em', marginBottom: '0.15rem', textTransform: 'uppercase',
                }}>
                  Phase {i + 1} &mdash; {phase.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: muted, lineHeight: 1.5, paddingLeft: '0.5rem' }}>
                  Target: {phase.target} members &middot; {phase.period}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ───────────────────────────────── */}
      <section style={{ marginBottom: '3rem' }}>
        <SectionHeader title="Questions & Answers" icon={HelpCircle} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {membershipFAQ.map((faq, i) => (
            <div key={faq.id} style={{
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
                {openFaq === i
                  ? <ChevronDown size={16} style={{ color: gold, flexShrink: 0 }} />
                  : <ChevronRight size={16} style={{ color: muted, flexShrink: 0 }} />}
                {faq.question}
              </button>
              {openFaq === i && (
                <div style={{
                  padding: '0 1.25rem 1rem 2.75rem',
                  fontSize: '0.85rem', color: muted, lineHeight: 1.7,
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. FINAL CTA ─────────────────────────── */}
      <section style={{
        textAlign: 'center', padding: '2rem 1.5rem',
        background: cardBg, border: cardBorder, borderRadius: 8,
      }}>
        <div style={{
          fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          color: gold, marginBottom: '0.5rem', fontWeight: 600,
        }}>
          Founding Circle
        </div>
        <h3 style={{
          fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 800,
          color: isDarkMode ? '#fff' : '#111', marginBottom: '0.5rem',
        }}>
          Applications open June 20, 2026
        </h3>
        <p style={{ fontSize: '0.9rem', color: muted, marginBottom: '1.25rem' }}>
          {membershipScarcity.totalCapacity} places. Three tiers. Then it closes.
        </p>

        <a
          href="mailto:membership@lightheart.ie?subject=Founding%20Circle%20%E2%80%94%20Expression%20of%20Interest"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.75rem 2rem', background: gold, color: '#0a0a0a',
            borderRadius: 6, fontWeight: 700, fontSize: '0.9rem',
            textDecoration: 'none', letterSpacing: '0.03em',
          }}
        >
          {membershipCTA.final.primary} <ArrowRight size={16} />
        </a>

        <div style={{ marginTop: '1rem' }}>
          <a
            href="mailto:membership@lightheart.ie"
            style={{ fontSize: '0.85rem', color: gold, textDecoration: 'none' }}
          >
            membership@lightheart.ie
          </a>
        </div>

        {/* Trust signals */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '0.35rem',
          marginTop: '1.25rem', alignItems: 'center',
        }}>
          {membershipCTA.final.trust.map((signal) => (
            <div key={signal} style={{
              fontSize: '0.75rem', color: muted, display: 'flex',
              alignItems: 'center', gap: '0.4rem',
            }}>
              <Shield size={12} style={{ color: isDarkMode ? '#555' : '#bbb' }} />
              {signal}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
