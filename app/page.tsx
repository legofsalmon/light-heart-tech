'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useAuth } from '@/components/AuthProvider';
import SystemDiagram from '@/components/SystemDiagram/SystemDiagram';
import { SPECS, TEAM } from '@/data/constants';
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
  const { role } = useAuth();
  const isInternal = role === 'admin' || role === 'techspec' || role === 'coreteam';

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
              {isInternal ? 'LIGHTHEART' : 'YOU STAND INSIDE IT'}
            </h1>
            <div className={styles.subtitle} style={{ color: isInternal ? accent : '#c4a265' }}>
              {isInternal ? 'IMMERSIVE EXPERIENCE' : 'LIGHTHEART'}
            </div>
            <div className={styles.byline} style={{ color: muted }}>
              {isInternal
                ? 'TECHNICAL SPECIFICATION BY IDIRNET'
                : "Dublin's immersive gallery where contemporary art surrounds you"}
            </div>
            <div className={styles.byline} style={{ color: muted, marginTop: '0.35rem' }}>
              {isInternal
                ? "Dublin's purpose-built immersive gallery where contemporary art surrounds you"
                : ''}
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
              {isInternal ? 'Welcome to Lightheart' : 'Purpose-Built for Immersion'}
            </h2>
            <p className={styles.introText} style={{ color: muted }}>
              {isInternal
                ? `Lightheart is Dublin${'\u2019'}s purpose-built immersive gallery where contemporary art surrounds you. This specification covers the complete technical design for a permanent two-room installation: ${SPECS.projectors} projectors, ${SPECS.speakers} speakers, ${SPECS.mediaServers} media servers, and comprehensive network infrastructure across ${SPECS.totalArea} square metres.`
                : `Lightheart is a purpose-built immersive art space on Dublin\u2019s quays. ${SPECS.projectors} Barco projectors fill the walls. ${SPECS.speakers} L-Acoustics speakers create three-dimensional sound. ${SPECS.depthCameras} depth cameras respond to your presence. You don\u2019t view the art${'\u2014'}you\u2019re inside it.`}
            </p>
            <p className={styles.introText} style={{ color: muted }}>
              {isInternal
                ? `Two galleries. ${SPECS.audioObjects} individually controlled audio objects in 3D space. ${SPECS.depthCameras} depth sensors tracking visitor movement. Target opening: ${SPECS.opening}. Location: Dublin, Ireland.`
                : `Two galleries. ${SPECS.totalArea} square metres. ${SPECS.audioObjects} individually controlled audio objects in 3D space. Opening ${SPECS.opening}.`}
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
            { value: SPECS.projectors, label: 'PROJECTORS' },
            { value: SPECS.speakers, label: 'SPEAKERS' },
            { value: SPECS.mediaServers, label: 'MEDIA SERVERS' },
            { value: SPECS.totalArea, label: 'SQ. METERS' },
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

      {/* Secondary stats bar */}
      <div className={styles.statsBar} style={{ borderTopColor: border }}>
        <div className={styles.statsInner}>
          {[
            { value: SPECS.galleries, label: 'GALLERIES' },
            { value: SPECS.audioObjects, label: 'AUDIO OBJECTS' },
            { value: SPECS.depthCameras, label: 'DEPTH SENSORS' },
          ].map((stat, i) => (
            <div key={i} className={styles.statItem}>
              <div className={styles.statValue} style={{ color: accent }}>
                <AnimatedCounter target={stat.value} duration={1.5 + i * 0.2} />
              </div>
              <div className={styles.statLabel} style={{ color: muted }}>{stat.label}</div>
            </div>
          ))}
          <div className={styles.statItem}>
            <div className={styles.statValue} style={{ color: accent, fontSize: '1.125rem' }}>
              {SPECS.opening}
            </div>
            <div className={styles.statLabel} style={{ color: muted }}>OPENING</div>
          </div>
        </div>
      </div>

      {/* System Architecture Diagram */}
      <div className={styles.diagramSection}>
        <div className={styles.diagramInner}>
          <SystemDiagram />
        </div>
      </div>

      {/* Experience — Room cards */}
      <div className={styles.experienceSection}>
        <div className={styles.experienceInner}>
          <h2 className={styles.sectionHeading} style={{ color: isDarkMode ? '#FFF' : '#111' }}>
            The Experience
          </h2>
          <p className={styles.sectionSubtext} style={{ color: muted }}>
            Two purpose-built galleries designed from the ground up for immersive art.
          </p>
          <div className={styles.roomGrid}>
            {/* Room 1 */}
            <div className={styles.roomCard} style={{
              border: cardBorder,
              background: isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)',
              backdropFilter: isDarkMode ? 'blur(20px)' : 'none',
            }}>
              {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
              <h3 className={styles.roomTitle} style={{ color: isDarkMode ? '#FFF' : '#111' }}>
                Room 1: The Main Gallery
              </h3>
              <div className={styles.roomStats}>
                <span style={{ color: accent }}>{SPECS.room1Area} sq.m</span>
                <span style={{ color: muted }}>{'\u2022'}</span>
                <span style={{ color: muted }}>{SPECS.room1WallProjectors + SPECS.room1FloorProjectors} projectors</span>
                <span style={{ color: muted }}>{'\u2022'}</span>
                <span style={{ color: muted }}>{SPECS.room1Speakers} speakers</span>
              </div>
              <p className={styles.roomDesc} style={{ color: muted }}>
                The primary immersive space{'\u2014'}floor-to-ceiling projection across every surface with spatial audio that envelops the audience.
              </p>
            </div>
            {/* Room 2 */}
            <div className={styles.roomCard} style={{
              border: cardBorder,
              background: isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)',
              backdropFilter: isDarkMode ? 'blur(20px)' : 'none',
            }}>
              {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
              <h3 className={styles.roomTitle} style={{ color: isDarkMode ? '#FFF' : '#111' }}>
                Room 2: The Intimate Space
              </h3>
              <div className={styles.roomStats}>
                <span style={{ color: accent }}>{SPECS.room2Area} sq.m</span>
                <span style={{ color: muted }}>{'\u2022'}</span>
                <span style={{ color: muted }}>{SPECS.room2WallProjectors + SPECS.room2FloorProjectors} projectors</span>
                <span style={{ color: muted }}>{'\u2022'}</span>
                <span style={{ color: muted }}>{SPECS.room2Speakers} speakers</span>
              </div>
              <p className={styles.roomDesc} style={{ color: muted }}>
                A more focused, intimate environment for contemplative works and deeper audience interaction with the art.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon — Exhibition teaser */}
      <div className={styles.teaserSection}>
        <div className={styles.teaserInner}>
          <Link href="/exhibitions" className={styles.teaserCard} style={{
            border: cardBorder,
            background: isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)',
            backdropFilter: isDarkMode ? 'blur(20px)' : 'none',
            textDecoration: 'none',
          }}>
            {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
            <div className={styles.teaserBadge} style={{
              background: isDarkMode ? 'rgba(0, 240, 255, 0.08)' : 'rgba(0, 102, 204, 0.06)',
              border: isDarkMode ? '1px solid rgba(0, 240, 255, 0.25)' : '1px solid rgba(0, 102, 204, 0.2)',
              color: accent,
            }}>
              COMING SOON
            </div>
            <h3 className={styles.teaserTitle} style={{ color: isDarkMode ? '#FFF' : '#111' }}>
              Digital Nature {'\u2014'} Agustin Vidal Saavedra / Glasseye XR
            </h3>
            <p className={styles.teaserDate} style={{ color: muted }}>
              Opening {SPECS.opening}
            </p>
            <span className={styles.teaserLink} style={{ color: accent }}>
              View Exhibition <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>

      {/* Navigation CTAs */}
      <div className={styles.navCtaSection}>
        <div className={styles.navCtaInner}>
          {[
            { label: 'Become a Founding Member', href: '/membership' },
            { label: 'View Exhibition', href: '/exhibitions' },
            { label: 'Plan Your Visit', href: '/visit' },
            { label: 'Our Story', href: '/about' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className={styles.navCtaCard} style={{
              border: cardBorder,
              background: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
            }}>
              <span className={styles.navCtaLabel} style={{ color: isDarkMode ? '#FFF' : '#111' }}>
                {item.label}
              </span>
              <ArrowRight size={18} style={{ color: accent }} />
            </Link>
          ))}
        </div>
      </div>

      {/* Info bar */}
      <div className={styles.infoBar} style={{ borderTopColor: border }}>
        <div className={styles.infoInner} style={{ color: muted }}>
          <span>{TEAM.brendan.name} — {TEAM.brendan.title}</span>
          <span>{TEAM.kev.name} &amp; {TEAM.kris.name} — {TEAM.kris.org}</span>
          <span style={{ color: accent }}>{SPECS.opening}</span>
        </div>
      </div>
    </div>
  );
}
