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

  return (
    <div className={`min-h-screen flex flex-col page-enter ${isDarkMode ? 'grid-bg' : ''}`}>
      {/* Hero */}
      <div className={`flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative ${isDarkMode ? 'hero-glow' : ''}`}>
        {isDarkMode && (
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to right, rgba(0, 240, 255, 0.03), transparent, rgba(0, 240, 255, 0.03))' }}
          />
        )}

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Status badge - dark mode only */}
          {isDarkMode && (
            <div ref={badgeRef} className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.25)' }}
              >
                <span className="status-dot" />
                <span className="text-[#00F0FF] text-xs font-mono tracking-[0.15em] uppercase">System Online</span>
              </div>
            </div>
          )}

          {/* Title */}
          <div ref={titleRef} className="text-center mb-8">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
              <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>LIGHTHEART</span>
            </h1>
            <div className="text-xl sm:text-2xl md:text-3xl tracking-[0.2em] mb-2" style={{ color: accentColor }}>
              IMMERSIVE EXPERIENCE
            </div>
            <div className={`text-xs sm:text-sm tracking-wider ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
              TECHNICAL SPECIFICATION BY IDIRNET
            </div>
          </div>

          {isDarkMode && <div className="gradient-line w-48 mx-auto mb-8" />}

          {/* Introduction */}
          <div
            ref={introRef}
            className={`p-6 sm:p-8 border mb-8 relative ${isDarkMode ? 'hud-card hud-corners' : ''}`}
            style={isDarkMode ? {} : { borderColor }}
          >
            {isDarkMode && <div className="hud-corners-extra absolute inset-0 rounded-lg pointer-events-none" />}
            <h2 className="font-display text-lg sm:text-xl font-bold mb-4"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              Welcome to This Technical Specification
            </h2>
            <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: subTextColor }}>
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
              className={`group inline-flex items-center gap-2 px-6 py-3 font-display font-bold tracking-wider text-sm transition-colors w-full sm:w-auto justify-center ${isDarkMode ? 'btn-cyan' : ''}`}
              style={{ backgroundColor: accentColor, color: isDarkMode ? '#000000' : '#FFFFFF' }}
            >
              ENTER SPECIFICATION
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/visualization"
              className={`group inline-flex items-center gap-2 px-6 py-3 font-display font-bold tracking-wider text-sm border-2 transition-colors w-full sm:w-auto justify-center ${isDarkMode ? 'btn-outline-cyan' : ''}`}
              style={{ borderColor: accentColor, color: accentColor }}
            >
              3D VISUALIZATION
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-t" style={{ borderColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
      <div className="border-t" style={{ borderColor }}>
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
