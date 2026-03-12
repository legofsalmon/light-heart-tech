'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  ChevronRight, ChevronDown, AlertTriangle, CheckCircle,
  Circle, Menu, X,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { Comments } from '@/components/Comments';
import TSMContextWidget from '@/components/TSM/TSMContextWidget';
import { PLAN_SECTIONS, PLAN_NAV_GROUPS, type SectionContent } from '@/data/planData';

export default function PlanPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ sec1: true, sec3: true });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (heroRef.current) {
      gsap.from(heroRef.current.children, {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.6, ease: 'expo.out',
      });
    }
  }, []);

  const accent = isDarkMode ? '#00F0FF' : '#004466';
  const gold = '#c4a265';
  const muted = isDarkMode ? '#aaa' : '#555';
  const text = isDarkMode ? '#e0e0e0' : '#1a1a1a';
  const border = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)';
  const cardBg = isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)';
  const surface = isDarkMode ? '#141414' : '#f5f5f0';
  const red = '#c0392b';
  const green = '#27ae60';

  const toggle = (id: string) => setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  const expandAll = () => {
    const all: Record<string, boolean> = {};
    PLAN_SECTIONS.forEach(s => { all[s.id] = true; });
    setOpenSections(all);
  };
  const collapseAll = () => setOpenSections({});

  const scrollTo = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: true }));
    setSidebarOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const renderContent = (item: SectionContent, i: number) => {
    switch (item.type) {
      case 'text':
        return <p key={i} style={{ fontSize: '0.875rem', color: muted, lineHeight: 1.7, marginBottom: '0.75rem' }}>{item.text}</p>;
      case 'quote':
        return (
          <blockquote key={i} style={{
            borderLeft: `3px solid ${gold}`, padding: '0.75rem 1.25rem', margin: '1rem 0',
            background: isDarkMode ? 'rgba(20,20,20,0.8)' : 'rgba(245,245,240,0.8)',
            borderRadius: '0 6px 6px 0', fontStyle: 'italic', color: isDarkMode ? '#ccc' : '#444',
            fontSize: '0.9rem', lineHeight: 1.6,
          }}>
            {item.text}
          </blockquote>
        );
      case 'heading':
        return item.level === 3
          ? <h3 key={i} style={{ fontSize: '1.1rem', fontWeight: 600, color: text, margin: '1.5rem 0 0.75rem' }}>{item.text}</h3>
          : <h4 key={i} style={{ fontSize: '0.95rem', fontWeight: 600, color: gold, margin: '1.25rem 0 0.5rem' }}>{item.text}</h4>;
      case 'table':
        return (
          <div key={i} style={{ overflowX: 'auto', margin: '1rem 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr>
                  {item.headers.map((h, j) => (
                    <th key={j} style={{
                      textAlign: 'left', padding: '0.6rem 0.75rem',
                      background: isDarkMode ? 'rgba(196,162,101,0.1)' : 'rgba(196,162,101,0.06)',
                      color: gold, fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase',
                      letterSpacing: '0.05em', borderBottom: `2px solid ${isDarkMode ? 'rgba(196,162,101,0.3)' : 'rgba(196,162,101,0.2)'}`,
                      border: `1px solid ${border}`,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {item.rows.map((row, j) => (
                  <tr key={j} style={{ background: j % 2 === 0 ? 'transparent' : (isDarkMode ? 'rgba(20,20,20,0.5)' : 'rgba(245,245,240,0.5)') }}>
                    {row.map((cell, k) => (
                      <td key={k} style={{
                        padding: '0.5rem 0.75rem', border: `1px solid ${border}`,
                        verticalAlign: 'top', color: text, fontSize: '0.85rem',
                      }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'list':
        const ListTag = item.ordered ? 'ol' : 'ul';
        return (
          <ListTag key={i} style={{ margin: '0.5rem 0 1rem 1.5rem', color: muted, fontSize: '0.875rem', lineHeight: 1.7 }}>
            {item.items.map((li, j) => <li key={j} style={{ marginBottom: '0.4rem' }}>{li}</li>)}
          </ListTag>
        );
      case 'pre':
        return (
          <pre key={i} style={{
            background: isDarkMode ? 'rgba(20,20,20,0.8)' : 'rgba(245,245,240,0.8)',
            padding: '1rem', borderRadius: '6px', fontSize: '0.8rem', color: gold,
            overflowX: 'auto', border: `1px solid ${border}`, margin: '1rem 0',
            fontFamily: 'var(--font-mono, monospace)', lineHeight: 1.5,
          }}>{item.text}</pre>
        );
      case 'cards':
        return (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', margin: '1rem 0' }}>
            {item.items.map((c, j) => (
              <div key={j} style={{
                padding: '1.25rem', background: cardBg, border: `1px solid ${border}`,
                borderRadius: '8px', borderTop: c.color ? `3px solid ${c.color}` : 'none',
              }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: text, marginBottom: '0.5rem' }}>{c.title}</div>
                <div style={{ fontSize: '0.8rem', color: muted, lineHeight: 1.6 }}>{c.text}</div>
              </div>
            ))}
          </div>
        );
      case 'status-list':
        return (
          <div key={i} style={{ margin: '0.5rem 0 1rem' }}>
            {item.items.map((si, j) => (
              <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.4rem 0' }}>
                {si.status === 'complete' ? (
                  <CheckCircle size={14} style={{ color: green, flexShrink: 0 }} />
                ) : si.status === 'critical' ? (
                  <AlertTriangle size={14} style={{ color: red, flexShrink: 0 }} />
                ) : (
                  <Circle size={14} style={{ color: '#555', flexShrink: 0 }} />
                )}
                <span style={{ fontSize: '0.875rem', color: text }}>{si.text}</span>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 4rem)' }}>
      {/* Sidebar */}
      <aside style={{
        position: 'fixed', top: '4rem', left: 0, width: '320px', height: 'calc(100vh - 4rem)',
        background: surface, borderRight: `1px solid ${border}`, overflowY: 'auto', zIndex: 50,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
      }}>
        {/* Sidebar header */}
        <div style={{ padding: '1.5rem', borderBottom: `1px solid ${border}` }}>
          <h2 style={{ fontSize: '1.1rem', color: gold, margin: 0, fontFamily: 'var(--font-display, Inter, system-ui)' }}>Lightheart</h2>
          <div style={{ fontSize: '0.65rem', color: red, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginTop: '0.5rem' }}>
            Internal / Confidential
          </div>
          <div style={{ fontSize: '0.75rem', color: muted, marginTop: '0.5rem' }}>
            PR & Marketing Master Plan<br />Week 2 of 12 | March 2026
          </div>
        </div>
        {/* Nav */}
        <nav style={{ padding: '0.5rem 0' }}>
          {PLAN_NAV_GROUPS.map((group, gi) => (
            <div key={gi} style={{ borderBottom: `1px solid ${border}` }}>
              <div style={{
                padding: '0.6rem 1rem', fontSize: '0.7rem', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.06em', color: gold,
              }}>{group.label}</div>
              <div>
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '0.35rem 1rem 0.35rem 1.5rem', fontSize: '0.8rem',
                      color: openSections[item.id] ? text : muted, background: 'none',
                      border: 'none', borderLeft: `2px solid ${openSections[item.id] ? gold : 'transparent'}`,
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, top: '4rem', background: 'rgba(0,0,0,0.5)', zIndex: 40 }}
        />
      )}

      {/* Main content */}
      <div style={{ flex: 1, minHeight: '100vh' }}>
        {/* Top bar */}
        <div style={{
          position: 'sticky', top: '4rem', zIndex: 30,
          background: isDarkMode ? 'rgba(10,10,10,0.95)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)', borderBottom: `1px solid ${border}`,
          padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem',
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: muted, padding: '0.25rem' }}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <strong style={{ fontSize: '0.875rem', color: text }}>PR & Marketing Master Plan</strong>
          <span style={{ color: muted, fontSize: '0.8rem' }}>| Week 2 of 12 | Target Opening: September 2026</span>
          <span style={{ flex: 1 }} />
          <button onClick={expandAll} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: '4px', padding: '0.25rem 0.5rem', fontSize: '0.7rem', color: accent, cursor: 'pointer' }}>
            Expand All
          </button>
          <button onClick={collapseAll} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: '4px', padding: '0.25rem 0.5rem', fontSize: '0.7rem', color: muted, cursor: 'pointer' }}>
            Collapse All
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '2rem', maxWidth: '1000px' }}>
          {/* Hero */}
          <div ref={heroRef} style={{ marginBottom: '2rem' }}>
            <h1 style={{
              fontFamily: 'var(--font-display, Inter, system-ui)', fontSize: '2rem',
              fontWeight: 700, color: isDarkMode ? '#fff' : '#111', margin: '0 0 0.75rem',
            }}>
              Lightheart — PR & Marketing Master Plan
            </h1>
            <div style={{
              borderLeft: `3px solid ${gold}`, padding: '0.75rem 1.25rem',
              background: isDarkMode ? 'rgba(20,20,20,0.8)' : 'rgba(245,245,240,0.8)',
              borderRadius: '0 6px 6px 0', fontSize: '0.85rem', color: muted,
            }}>
              <strong style={{ color: text }}>Working document</strong> | Created: 2026-03-10 | Owner: Kev Freeney<br />
              Status: <span style={{ color: '#f39c12' }}>ACTIVE</span> — Week 2 of 12-week pre-launch plan<br />
              Target Opening: <strong style={{ color: text }}>September 2026</strong>
            </div>
          </div>

          {/* TSM Context — plan touches many stacks */}
          <div style={{ marginBottom: '1.5rem' }}>
            <TSMContextWidget slugOverride="plan" />
          </div>

          {/* Confidential banner */}
          <div style={{
            background: isDarkMode ? 'rgba(192,57,43,0.15)' : 'rgba(192,57,43,0.08)',
            border: '1px solid rgba(192,57,43,0.3)', borderRadius: '8px',
            padding: '0.75rem 1rem', textAlign: 'center', fontSize: '0.8rem',
            fontWeight: 600, color: red, marginBottom: '2rem',
          }}>
            CONFIDENTIAL — Internal Use Only — Not for Public Distribution
          </div>

          {/* Sections */}
          {PLAN_SECTIONS.map((section) => (
            <div key={section.id} id={section.id} style={{ marginBottom: '1.5rem', scrollMarginTop: '8rem' }}>
              <button
                onClick={() => toggle(section.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%',
                  background: 'none', border: 'none', cursor: 'pointer', padding: '0.75rem 0',
                  borderBottom: `1px solid ${border}`,
                }}
              >
                {openSections[section.id]
                  ? <ChevronDown size={16} style={{ color: gold }} />
                  : <ChevronRight size={16} style={{ color: muted }} />
                }
                <h2 style={{
                  fontSize: '1.4rem', fontWeight: 600, margin: 0,
                  color: openSections[section.id] ? gold : text,
                  fontFamily: 'var(--font-display, Inter, system-ui)',
                  textAlign: 'left', flex: 1,
                }}>
                  {section.num}. {section.title}
                </h2>
              </button>
              {openSections[section.id] && (
                <div style={{ padding: '1rem 0 0.5rem' }}>
                  {section.content.map(renderContent)}
                </div>
              )}
            </div>
          ))}

          {/* Comments */}
          <Comments sectionId="plan-general" />

          {/* Footer */}
          <div style={{
            borderTop: `1px solid ${border}`, padding: '2rem 0', textAlign: 'center',
            fontSize: '0.75rem', color: isDarkMode ? '#888' : '#999', marginTop: '2rem',
          }}>
            <em>This is a living document. Update weekly during sprint reviews.</em><br />
            <strong>Last updated: 2026-03-10</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
