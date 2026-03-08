'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import SystemDiagram from '@/components/SystemDiagram/SystemDiagram';
import styles from './page.module.scss';

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const startCounting = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) startCounting(); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startCounting]);

  return <div ref={ref} className="stat-number">{count}</div>;
}

export default function HomePage() {
  const titleRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    if (badgeRef.current) tl.from(badgeRef.current, { opacity: 0, y: -15, duration: 0.5 }, 0.2);
    if (titleRef.current) tl.from(titleRef.current, { opacity: 0, y: 30, duration: 0.8 }, 0.3);
    if (introRef.current) tl.from(introRef.current, { opacity: 0, y: 20, duration: 0.6 }, 0.6);
    if (ctaRef.current) tl.from(ctaRef.current, { opacity: 0, y: 15, duration: 0.5 }, 0.8);
  }, []);

  const accent = isDarkMode ? '#00F0FF' : '#004466';
  const muted = isDarkMode ? '#B0B0B0' : '#333333';
  const border = isDarkMode ? '#1F1F1F' : '#D5D5D0';
  const cardBorder = isDarkMode ? '1px solid rgba(255,255,255,0.08)' : `1px solid ${border}`;

  return (
    <div className={`page-enter ${styles.page}`}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          {/* Status badge */}
          <div ref={badgeRef} className={styles.badgeWrap}>
            <div className={styles.badge} style={{
              background: isDarkMode ? 'rgba(0, 240, 255, 0.08)' : 'rgba(0, 102, 204, 0.06)',
              border: isDarkMode ? '1px solid rgba(0, 240, 255, 0.25)' : '1px solid rgba(0, 102, 204, 0.2)',
            }}>
              <span className="status-dot" style={{
                background: accent,
                boxShadow: `0 0 8px ${accent}99`,
              }} />
              <span className={styles.badgeText} style={{ color: accent }}>System Online</span>
            </div>
          </div>

          {/* Title */}
          <div ref={titleRef} className={styles.titleBlock}>
            <h1 className={styles.title} style={{ color: isDarkMode ? '#FFF' : '#111' }}>
              LIGHTHEART
            </h1>
            <div className={styles.subtitle} style={{ color: accent }}>
              IMMERSIVE EXPERIENCE
            </div>
            <div className={styles.byline} style={{ color: muted }}>
              TECHNICAL SPECIFICATION BY IDIRNET
            </div>
          </div>

          {/* Gradient divider */}
          <div className={styles.divider} style={{
            background: isDarkMode
              ? 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.5), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(0, 102, 204, 0.3), transparent)',
          }} />

          {/* Welcome card */}
          <div ref={introRef} className={styles.introCard} style={{
            border: cardBorder,
            background: isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)',
            backdropFilter: isDarkMode ? 'blur(20px)' : 'none',
          }}>
            {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
            <h2 className={styles.introTitle} style={{ color: isDarkMode ? '#FFF' : '#000' }}>
              Welcome to This Technical Specification
            </h2>
            <p className={styles.introText} style={{ color: muted }}>
              This document contains the complete technical design, specification, and budget ring-fencing for a permanent two-room immersive installation. The system comprises 37 projectors, 71 speakers, 5 media servers, and comprehensive network infrastructure.
            </p>
            <p className={styles.introText} style={{ color: muted }}>
              Target opening: September 2026. Location: Dublin, Ireland. Total project duration: 21 days from commencement to completion.
            </p>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className={styles.ctaRow}>
            <Link href="/technical-direction" className={`${styles.ctaPrimary} ${isDarkMode ? 'btn-cyan' : ''}`}
              style={{ backgroundColor: accent, color: isDarkMode ? '#000' : '#FFF' }}>
              ENTER SPECIFICATION
              <ChevronRight size={20} />
            </Link>
            <Link href="/visualization" className={`${styles.ctaSecondary} ${isDarkMode ? 'btn-outline-cyan' : ''}`}
              style={{ borderColor: accent, color: accent }}>
              3D VISUALIZATION
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className={styles.statsBar} style={{ borderTopColor: border }}>
        <div className={styles.statsInner}>
          {[
            { value: 37, label: 'PROJECTORS' },
            { value: 71, label: 'SPEAKERS' },
            { value: 5, label: 'MEDIA SERVERS' },
            { value: 280, label: 'SQ. METERS' },
          ].map((stat, i) => (
            <div key={i} className={styles.statItem}>
              <div className={styles.statValue} style={{ color: accent }}>
                <AnimatedCounter target={stat.value} duration={1.5 + i * 0.2} />
              </div>
              <div className={styles.statLabel} style={{ color: muted }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* System Architecture Diagram */}
      <div className={styles.diagramSection}>
        <div className={styles.diagramInner}>
          <SystemDiagram />
        </div>
      </div>

      {/* Info bar */}
      <div className={styles.infoBar} style={{ borderTopColor: border }}>
        <div className={styles.infoInner} style={{ color: muted }}>
          <span>KRISJANIS BERZINS — IDIRNET</span>
          <span>LIGHTHEART LTD</span>
          <span style={{ color: accent }}>4 MARCH 2026</span>
        </div>
      </div>
    </div>
  );
}
