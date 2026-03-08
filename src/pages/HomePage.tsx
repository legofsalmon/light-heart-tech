import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomePageProps {
  isDarkMode: boolean;
}

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

export default function HomePage({ isDarkMode }: HomePageProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    if (badgeRef.current) tl.from(badgeRef.current, { opacity: 0, y: -15, duration: 0.5 }, 0.2);
    if (titleRef.current) tl.from(titleRef.current, { opacity: 0, y: 30, duration: 0.8 }, 0.3);
    if (introRef.current) tl.from(introRef.current, { opacity: 0, y: 20, duration: 0.6 }, 0.6);
    if (ctaRef.current) tl.from(ctaRef.current, { opacity: 0, y: 15, duration: 0.5 }, 0.8);
  }, []);

  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';
  const subTextColor = isDarkMode ? '#A0A0A0' : '#666666';
  const borderColor = isDarkMode ? '#1F1F1F' : '#E5E5E5';
  const cardBorder = isDarkMode ? '1px solid rgba(255,255,255,0.08)' : `1px solid ${borderColor}`;

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col page-enter">
      {/* Hero */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="max-w-4xl mx-auto relative z-10 w-full">
          {/* Status badge - always present to prevent layout shift */}
          <div ref={badgeRef} className="flex justify-center mb-6" style={{ minHeight: '36px' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: isDarkMode ? 'rgba(0, 240, 255, 0.08)' : 'rgba(0, 102, 204, 0.06)',
                border: isDarkMode ? '1px solid rgba(0, 240, 255, 0.25)' : '1px solid rgba(0, 102, 204, 0.2)',
              }}
            >
              <span className="status-dot" style={{
                background: isDarkMode ? '#00f0ff' : '#0066cc',
                boxShadow: isDarkMode ? '0 0 8px rgba(0, 240, 255, 0.6)' : '0 0 8px rgba(0, 102, 204, 0.4)',
              }} />
              <span className="text-xs font-mono tracking-[0.15em] uppercase"
                style={{ color: isDarkMode ? '#00F0FF' : '#0066CC' }}
              >
                System Online
              </span>
            </div>
          </div>

          {/* Title */}
          <div ref={titleRef} className="text-center mb-6">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-3">
              <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>LIGHTHEART</span>
            </h1>
            <div className="text-xl sm:text-2xl md:text-3xl tracking-[0.2em] mb-2" style={{ color: accentColor }}>
              IMMERSIVE EXPERIENCE
            </div>
            <div className={`text-xs sm:text-sm tracking-wider ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
              TECHNICAL SPECIFICATION BY IDIRNET
            </div>
          </div>

          {/* Gradient divider - always present, styled per theme */}
          <div className="w-48 mx-auto mb-6" style={{
            height: '1px',
            background: isDarkMode
              ? 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.5), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(0, 102, 204, 0.3), transparent)',
          }} />

          {/* Introduction */}
          <div
            ref={introRef}
            className="p-6 sm:p-8 mb-8 relative rounded-lg"
            style={{
              border: cardBorder,
              background: isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)',
              backdropFilter: isDarkMode ? 'blur(20px)' : 'none',
            }}
          >
            {isDarkMode && <div className="hud-corners-extra absolute inset-0 rounded-lg pointer-events-none" />}
            <h2 className="font-display text-lg sm:text-xl font-bold mb-3"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              Welcome to This Technical Specification
            </h2>
            <p className="text-sm sm:text-base leading-relaxed mb-3" style={{ color: subTextColor }}>
              This document contains the complete technical design, specification, and budget
              ring-fencing for a permanent two-room immersive installation. The system comprises
              37 projectors, 71 speakers, 5 media servers, and comprehensive network infrastructure.
            </p>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: subTextColor }}>
              Target opening: September 2026. Location: Dublin, Ireland.
              Total project duration: 21 days from commencement to completion.
            </p>
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/technical-direction"
              className={`group inline-flex items-center gap-2 px-6 py-3 font-display font-bold tracking-wider text-sm transition-all w-full sm:w-auto justify-center rounded ${isDarkMode ? 'btn-cyan' : 'hover:opacity-90'}`}
              style={{ backgroundColor: accentColor, color: isDarkMode ? '#000000' : '#FFFFFF' }}
            >
              ENTER SPECIFICATION
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/visualization"
              className={`group inline-flex items-center gap-2 px-6 py-3 font-display font-bold tracking-wider text-sm border-2 transition-all w-full sm:w-auto justify-center rounded ${isDarkMode ? 'btn-outline-cyan' : 'hover:bg-[#0066cc]/10'}`}
              style={{ borderColor: accentColor, color: accentColor }}
            >
              3D VISUALIZATION
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats - pinned to bottom */}
      <div style={{ borderTop: `1px solid ${borderColor}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: 37, label: 'PROJECTORS' },
              { value: 71, label: 'SPEAKERS' },
              { value: 5, label: 'MEDIA SERVERS' },
              { value: 280, label: 'SQ. METERS' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="font-display text-2xl sm:text-3xl font-bold" style={{ color: accentColor }}>
                  <AnimatedCounter target={stat.value} duration={1.5 + index * 0.2} />
                </div>
                <div className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div style={{ borderTop: `1px solid ${borderColor}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-2 text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
            <span>KRISJANIS BERZINS — IDIRNET</span>
            <span>LIGHTHEART LTD</span>
            <span style={{ color: accentColor }}>4 MARCH 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
