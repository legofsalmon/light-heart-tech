import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Video, 
  Volume2, 
  Network, 
  Server, 
  Thermometer, 
  Cable,
  Calendar,
  User,
  Building2,
  Briefcase
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const techCards = [
  { 
    icon: Video, 
    title: 'PROJECTION', 
    subtitle: '14K LUMENS',
    detail: '37 Projectors',
    status: 'cyan'
  },
  { 
    icon: Volume2, 
    title: 'AUDIO', 
    subtitle: 'L-ISA SPATIAL',
    detail: '71 Speakers',
    status: 'cyan'
  },
  { 
    icon: Network, 
    title: 'NETWORK', 
    subtitle: '100G SPINE',
    detail: 'Fiber Backbone',
    status: 'cyan'
  },
  { 
    icon: Server, 
    title: 'SERVERS', 
    subtitle: 'PIXERA PX2',
    detail: '5 Octo Units',
    status: 'cyan'
  },
  { 
    icon: Thermometer, 
    title: 'HVAC', 
    subtitle: '12.3kW LOAD',
    detail: 'Climate Control',
    status: 'orange'
  },
  { 
    icon: Cable, 
    title: 'SIGNAL', 
    subtitle: 'SDVOE FIBER',
    detail: '4:4:4 4K@60Hz',
    status: 'cyan'
  },
];

export default function OverviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sidebar = sidebarRef.current;
    const cards = cardsRef.current;

    if (!section || !sidebar || !cards) return;

    const ctx = gsap.context(() => {
      // Sidebar entrance
      gsap.from(sidebar, {
        x: -100,
        opacity: 0,
        rotateY: 15,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Cards entrance with 3D deal effect
      gsap.from(cards.children, {
        z: -500,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      // Parallax effect on cards
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          Array.from(cards.children).forEach((card, i) => {
            const offset = (i % 2 === 0 ? -1 : 1) * 30;
            gsap.to(card, {
              y: offset * (progress - 0.5),
              duration: 0.1,
            });
          });
        },
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="overview"
      className="relative py-24 md:py-32 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="status-led cyan" />
            <span className="text-xs mono text-soft-gray tracking-wider">
              SECTION 02 — TECHNICAL DIRECTION
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            SYSTEM OVERVIEW
          </h2>
          <p className="text-soft-gray max-w-2xl">
            The complete technical architecture at a glance: 37 projectors, 71 speakers, 
            5 media servers, and the network infrastructure that ties everything together.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-[350px_1fr] gap-8">
          {/* Sidebar - Project Metadata */}
          <div
            ref={sidebarRef}
            className="glass-panel p-6 h-fit lg:sticky lg:top-24"
          >
            <h3 className="font-display text-lg font-bold text-white mb-6 pb-4 border-b border-void-gray">
              PROJECT METADATA
            </h3>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-soft-gray text-xs mono mb-2">
                  <User className="w-4 h-4" />
                  LEAD
                </div>
                <div className="text-white font-medium">Krisjanis Berzins</div>
                <div className="text-neon-cyan text-sm mono">kris@idirnet.com</div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-soft-gray text-xs mono mb-2">
                  <Building2 className="w-4 h-4" />
                  CLIENT
                </div>
                <div className="text-white font-medium">Lightheart Ltd</div>
                <div className="text-soft-gray text-sm">CRM: Kev</div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-soft-gray text-xs mono mb-2">
                  <Briefcase className="w-4 h-4" />
                  ENGAGEMENT
                </div>
                <div className="text-white font-medium">Fixed-term Consultancy</div>
              </div>

              <div className="pt-4 border-t border-void-gray">
                <div className="flex items-center gap-2 text-soft-gray text-xs mono mb-3">
                  <Calendar className="w-4 h-4" />
                  TIMELINE
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-soft-gray mono">COMMENCEMENT</div>
                    <div className="text-white">11 February 2026</div>
                  </div>
                  <div>
                    <div className="text-xs text-soft-gray mono">COMPLETION</div>
                    <div className="text-white">4 March 2026</div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs mono mb-2">
                    <span className="text-soft-gray">PROGRESS</span>
                    <span className="text-neon-cyan">67%</span>
                  </div>
                  <div className="h-1 bg-void-gray overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-neon-cyan to-neon-lime transition-all duration-1000"
                      style={{ width: '67%' }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span className="status-led cyan" />
                  <span className="text-sm text-white">Phase 2/3 — System Design</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Cards Grid */}
          <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="group holographic-card p-6 cursor-pointer transition-all duration-300 hover:border-neon-cyan hover:shadow-neon-cyan"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 flex items-center justify-center border border-void-gray group-hover:border-neon-cyan transition-colors">
                      <Icon className="w-6 h-6 text-soft-gray group-hover:text-neon-cyan transition-colors" />
                    </div>
                    <span className={`status-led ${card.status}`} />
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display text-lg font-bold text-white group-hover:text-neon-cyan transition-colors">
                      {card.title}
                    </h4>
                    <div className="text-neon-cyan text-sm mono tracking-wider">
                      {card.subtitle}
                    </div>
                    <div className="text-soft-gray text-xs mono">
                      {card.detail}
                    </div>
                  </div>

                  {/* Holographic sheen on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '37', label: 'PROJECTORS' },
            { value: '71', label: 'SPEAKERS' },
            { value: '5', label: 'MEDIA SERVERS' },
            { value: '280', label: 'SQ. METERS' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-neon-cyan neon-text-cyan mb-2">
                {stat.value}
              </div>
              <div className="text-xs mono text-soft-gray tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
