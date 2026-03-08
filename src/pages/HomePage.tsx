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

    if (badgeRef.current) {
      tl.from(badgeRef.current, { opacity: 0, y: -15, duration: 0.5 }, 0.2);
    }
    if (titleRef.current) {
      tl.from(titleRef.current, { opacity: 0, y: 30, duration: 0.8 }, 0.3);
    }
    if (introRef.current) {
      tl.from(introRef.current, { opacity: 0, y: 20, duration: 0.6 }, 0.6);
    }
    if (ctaRef.current) {
      tl.from(ctaRef.current, { opacity: 0, y: 15, duration: 0.5 }, 0.8);
    }
  }, []);

  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';

  return (
    <div className="min-h-screen flex flex-col page-enter bg-[#050505]">
      {/* Hero */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative hero-glow grid-bg">
        {/* Side gradient glows */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(0, 240, 255, 0.03), transparent, rgba(0, 240, 255, 0.03))' }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(transparent, #050505)' }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* System online badge */}
          <div ref={badgeRef} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(0, 240, 255, 0.08)',
                border: '1px solid rgba(0, 240, 255, 0.25)',
              }}
            >
              <span className="status-dot" />
              <span className="text-[#00F0FF] text-xs font-mono tracking-[0.15em] uppercase">
                System Online
              </span>
            </div>
          </div>

          {/* Title */}
          <div ref={titleRef} className="text-center mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 text-white">
              LIGHTHEART
            </h1>
            <div className="text-xl sm:text-2xl md:text-3xl tracking-[0.25em] mb-4 italic font-light" style={{ color: accentColor }}>
              IMMERSIVE EXPERIENCE
            </div>
            <div className="text-[10px] tracking-[0.25em] text-[#444] font-mono">
              TECHNICAL SPECIFICATION BY IDIRNET
            </div>
          </div>

          {/* Gradient divider */}
          <div className="gradient-line w-48 mx-auto mb-8" />

          {/* Introduction card */}
          <div ref={introRef} className="hud-card hud-corners p-6 sm:p-8 mb-10 relative">
            <div className="hud-corners-extra absolute inset-0 rounded-lg pointer-events-none" />
            <h2 className="text-base sm:text-lg font-bold mb-4 text-white tracking-wide">
              Technical Documentation Package
            </h2>
            <p className="text-sm leading-relaxed mb-3 text-[#888]">
              Complete technical design, specification, and budget ring-fencing for a permanent
              two-room immersive installation. 37 projectors, 71 speakers, 5 media servers,
              and comprehensive network infrastructure.
            </p>
            <p className="text-sm leading-relaxed text-[#888]">
              Target opening: September 2026. Location: Dublin, Ireland.
              21 days from commencement to completion.
            </p>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/technical-direction"
              className="btn-cyan group inline-flex items-center gap-2 px-8 py-4 font-mono font-semibold tracking-[0.15em] text-sm rounded-lg w-full sm:w-auto justify-center"
              style={{ backgroundColor: accentColor, color: '#050505' }}
            >
              ENTER THE SYSTEM
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/visualization"
              className="btn-outline-cyan group inline-flex items-center gap-2 px-8 py-4 font-mono font-semibold tracking-[0.15em] text-sm rounded-lg w-full sm:w-auto justify-center"
              style={{
                border: `1px solid rgba(0, 240, 255, 0.4)`,
                color: accentColor,
              }}
            >
              3D VISUALIZATION
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: 37, label: 'PROJECTORS' },
              { value: 71, label: 'SPEAKERS' },
              { value: 5, label: 'MEDIA SERVERS' },
              { value: 280, label: 'SQ. METERS' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl sm:text-4xl font-bold" style={{ color: accentColor }}>
                  <AnimatedCounter target={stat.value} duration={1.5 + index * 0.2} />
                </div>
                <div className="text-[10px] tracking-[0.2em] mt-1 text-[#555] font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Info Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] tracking-[0.15em] text-[#444] font-mono">
            <span>CLIENT: <span className="text-white/60">LIGHTHEART LTD</span></span>
            <span>ENGAGEMENT: <span className="text-white/60">FIXED-TERM CONSULTANCY</span></span>
            <span>COMPLETION: <span style={{ color: accentColor }}>4 MARCH 2026</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
