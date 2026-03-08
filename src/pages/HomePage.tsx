import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomePageProps {
  isDarkMode: boolean;
}

function AnimatedCounter({ target, duration = 1.8, suffix = '' }: { target: number; duration?: number; suffix?: string }) {
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

  return (
    <div ref={ref} className="stat-number">
      {count}{suffix}
    </div>
  );
}

export default function HomePage({ isDarkMode }: HomePageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const intro = introRef.current;
    const cta = ctaRef.current;

    if (!title || !intro || !cta) return;

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    tl.from(title, { opacity: 0, y: 30, duration: 0.8 }, 0.2)
      .from(intro, { opacity: 0, y: 20, duration: 0.6 }, 0.5)
      .from(cta, { opacity: 0, y: 15, duration: 0.5 }, 0.7);
  }, []);

  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';
  const subTextColor = isDarkMode ? '#777' : '#666666';
  const borderColor = isDarkMode ? '#1a1a22' : '#E5E5E5';

  return (
    <div ref={heroRef} className="min-h-screen flex flex-col page-enter">
      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative hero-mesh noise-overlay">
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Title */}
          <div ref={titleRef} className="text-center mb-10">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
              <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>LIGHTHEART</span>
            </h1>
            <div
              className="text-lg sm:text-xl md:text-2xl tracking-[0.25em] mb-3 font-light"
              style={{ color: accentColor }}
            >
              IMMERSIVE EXPERIENCE
            </div>
            <div
              className="text-[10px] sm:text-xs tracking-[0.2em]"
              style={{ color: isDarkMode ? '#444' : '#999' }}
            >
              TECHNICAL SPECIFICATION BY IDIRNET
            </div>
          </div>

          {/* Introduction */}
          <div
            ref={introRef}
            className="p-6 sm:p-8 border mb-10 relative"
            style={{
              borderColor,
              background: isDarkMode
                ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.02), transparent)'
                : 'linear-gradient(135deg, rgba(0, 102, 204, 0.02), transparent)',
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)`,
              }}
            />
            <h2
              className="font-display text-base sm:text-lg font-bold mb-4 tracking-wide"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              Welcome to This Technical Specification
            </h2>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: subTextColor }}
            >
              This document contains the complete technical design, specification, and budget
              ring-fencing for a permanent two-room immersive installation. The system comprises
              37 projectors, 71 speakers, 5 media servers, and comprehensive network infrastructure.
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: subTextColor }}
            >
              Target opening: September 2026. Location: Dublin, Ireland.
              Total project duration: 21 days from commencement to completion.
            </p>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/technical-direction"
              className="group inline-flex items-center gap-2 px-7 py-3.5 font-display font-bold tracking-[0.1em] text-sm transition-all duration-300 w-full sm:w-auto justify-center btn-press"
              style={{
                backgroundColor: accentColor,
                color: isDarkMode ? '#000000' : '#FFFFFF',
              }}
            >
              ENTER SPECIFICATION
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/visualization"
              className="group inline-flex items-center gap-2 px-7 py-3.5 font-display font-bold tracking-[0.1em] text-sm border transition-all duration-300 w-full sm:w-auto justify-center btn-press"
              style={{
                borderColor: isDarkMode ? '#333' : accentColor,
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
      <div className="border-t" style={{ borderColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: 37, label: 'PROJECTORS' },
              { value: 71, label: 'SPEAKERS' },
              { value: 5, label: 'MEDIA SERVERS' },
              { value: 280, label: 'SQ. METERS' },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div
                  className="font-display text-3xl sm:text-4xl font-bold"
                  style={{ color: accentColor }}
                >
                  <AnimatedCounter target={stat.value} duration={1.5 + index * 0.2} />
                </div>
                <div className={`text-[10px] tracking-[0.15em] mt-1 ${isDarkMode ? 'text-[#555]' : 'text-gray-400'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Info Bar */}
      <div className="border-t" style={{ borderColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] tracking-wider ${isDarkMode ? 'text-[#444]' : 'text-gray-400'}`}>
            <span>KRISJANIS BERZINS — IDIRNET</span>
            <span>LIGHTHEART LTD</span>
            <span style={{ color: accentColor }}>4 MARCH 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
