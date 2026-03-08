import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const orbs = orbsRef.current;
    const grid = gridRef.current;

    if (!section || !title || !subtitle || !cta || !orbs || !grid) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([title, subtitle, cta], { opacity: 0, y: 30 });
      gsap.set(grid, { opacity: 0, scale: 0.9 });
      gsap.set(orbs.children, { opacity: 0, scale: 0 });

      // Entrance timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Grid floor animation
      tl.to(grid, {
        opacity: 0.15,
        scale: 1,
        duration: 1.2,
        ease: 'expo.out',
      });

      // Title character decode effect
      tl.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
      }, '-=0.8');

      // Subtitle typewriter effect
      tl.to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'expo.out',
      }, '-=0.4');

      // CTA button
      tl.to(cta, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }, '-=0.3');

      // Floating orbs
      tl.to(orbs.children, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'elastic.out(1, 0.5)',
      }, '-=0.5');

      // Scroll-triggered exit animation
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '50% top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(section, {
            filter: `blur(${progress * 10}px)`,
            opacity: 1 - progress * 0.5,
            duration: 0.1,
          });
        },
      });

      // Continuous orb animation
      gsap.to(orbs.children, {
        y: '+=10',
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.3,
          from: 'random',
        },
      });

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToOverview = () => {
    const element = document.querySelector('#overview');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const orbs = [
    { label: '21 DAY PROGRAMME', angle: 0 },
    { label: '3 PHASES', angle: 90 },
    { label: '2 ROOMS', angle: 180 },
    { label: 'BARCO — L-ACOUSTICS — PIXERA', angle: 270 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-immersive.jpg"
          alt="Immersive Experience"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
      </div>

      {/* Animated Grid Floor */}
      <div
        ref={gridRef}
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center bottom',
          height: '50%',
          bottom: 0,
        }}
      />

      {/* Floating Data Orbs */}
      <div ref={orbsRef} className="absolute inset-0 z-[2] pointer-events-none">
        {orbs.map((orb, index) => {
          const radius = 280;
          const angle = (orb.angle * Math.PI) / 180;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius * 0.3;

          return (
            <div
              key={index}
              className="absolute left-1/2 top-1/2 pointer-events-auto"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <div className="px-4 py-2 bg-void-charcoal/80 border border-neon-cyan/30 backdrop-blur-sm">
                <span className="text-xs mono text-neon-cyan tracking-wider">
                  {orb.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Logo/Title */}
        <h1
          ref={titleRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="block text-white">lIGHTHEART</span>
          <span className="block text-neon-cyan neon-text-cyan text-3xl md:text-4xl lg:text-5xl mt-2">
            IMMERSIVE EXPERIENCE
          </span>
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-neon-cyan" />
          <span className="text-soft-gray text-xs mono tracking-[0.3em]">TECHNICAL SPECIFICATION</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-neon-cyan" />
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-soft-gray max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Technical Design, Specification, and Budget Ring-Fencing for Permanent Two-Room Installation
        </p>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          onClick={scrollToOverview}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all duration-300"
        >
          <span className="font-display font-bold tracking-wider">ENTER THE SYSTEM</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-void-gray bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs mono text-soft-gray">
            <span>PROJECT LEAD: <span className="text-white">KRISJANIS BERZINS</span></span>
            <span className="hidden md:inline">|</span>
            <span>CLIENT: <span className="text-white">LIGHTHEART LTD</span></span>
            <span className="hidden md:inline">|</span>
            <span>LIVE: <span className="text-neon-cyan">4 MARCH 2026</span></span>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs mono text-soft-gray">67% COMPLETE</span>
            <div className="w-32 h-1 bg-void-gray overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-neon-cyan to-neon-lime"
                style={{ width: '67%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
