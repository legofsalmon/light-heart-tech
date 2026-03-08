import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projectors = [
  {
    id: 'P-01',
    name: 'Barco I600-4K10',
    location: 'Room 1 — North Wall',
    specs: '10,000 lm | WQUXGA | 4K',
    lens: 'ILD 0.37 UST',
    status: 'configured',
    image: '/images/projector-barco.jpg',
  },
  {
    id: 'P-02',
    name: 'Barco I600-4K10',
    location: 'Room 1 — East Wall',
    specs: '10,000 lm | WQUXGA | 4K',
    lens: 'ILD 0.37 UST',
    status: 'configured',
    image: '/images/projector-barco.jpg',
  },
  {
    id: 'P-03',
    name: 'Barco I600-4K10',
    location: 'Room 1 — South Wall',
    specs: '10,000 lm | WQUXGA | 4K',
    lens: 'ILD 0.37 UST',
    status: 'configured',
    image: '/images/projector-barco.jpg',
  },
  {
    id: 'P-04',
    name: 'Barco I600-4K10',
    location: 'Room 1 — West Wall',
    specs: '10,000 lm | WQUXGA | 4K',
    lens: 'ILD 0.37 UST',
    status: 'configured',
    image: '/images/projector-barco.jpg',
  },
  {
    id: 'P-05',
    name: 'Barco G50-W8',
    location: 'Room 1 — Floor Array',
    specs: '8,000 lm | WUXGA | 2K',
    lens: 'G-Lens 0.65-0.75:1',
    status: 'attention',
    image: '/images/projector-barco.jpg',
  },
  {
    id: 'P-06',
    name: 'Barco I600-4K8',
    location: 'Room 2 — Wall Array',
    specs: '8,000 lm | WQUXGA | 4K',
    lens: 'ILD 0.37 UST',
    status: 'pending',
    image: '/images/projector-barco.jpg',
  },
];

const statusConfig = {
  configured: { color: 'cyan', icon: CheckCircle2, label: 'CONFIGURED' },
  attention: { color: 'magenta', icon: AlertTriangle, label: 'LENS REQUIRED' },
  pending: { color: 'orange', icon: Info, label: 'PENDING SPEC' },
};

export default function ProjectionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const ctx = gsap.context(() => {
      // Header glitch reveal
      gsap.from(header, {
        clipPath: 'inset(50% 0)',
        opacity: 0,
        duration: 0.6,
        ease: 'steps(5)',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Cards slide in
      gsap.from(cards.children, {
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

    }, section);

    return () => ctx.revert();
  }, []);

  const filteredProjectors = activeTab === 'all' 
    ? projectors 
    : projectors.filter(p => p.location.toLowerCase().includes(activeTab.toLowerCase()));

  const configuredCount = projectors.filter(p => p.status === 'configured').length;

  return (
    <section
      ref={sectionRef}
      id="projection"
      className="relative py-24 md:py-32 px-4 md:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url('/images/projector-barco.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="status-led cyan" />
            <span className="text-xs mono text-soft-gray tracking-wider">
              SECTION 03 — PROJECTION SYSTEMS
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-2">
                <span className="text-neon-cyan">無我</span> / PROJECTION
              </h2>
              <p className="text-soft-gray max-w-xl">
                Barco G62-W14 Laser Projection — Professional-grade equipment capable of 
                edge-blending seamlessly across multiple surfaces.
              </p>
            </div>

            {/* Status Bar */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-display font-bold text-white">
                  {configuredCount}<span className="text-soft-gray">/{projectors.length}</span>
                </div>
                <div className="text-xs mono text-soft-gray">CONFIGURED</div>
              </div>
              <div className="w-32 h-2 bg-void-gray overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-neon-cyan to-neon-lime"
                  style={{ width: `${(configuredCount / projectors.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['ALL', 'ROOM 1 WALLS', 'ROOM 1 FLOOR', 'ROOM 2 WALLS', 'ALTERNATIVES'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
              className={`px-4 py-2 text-xs mono tracking-wider border transition-all duration-300 ${
                activeTab === tab.toLowerCase().replace(' ', '-')
                  ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/10'
                  : 'border-void-gray text-soft-gray hover:border-neon-cyan/50 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projector Cards Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjectors.map((projector) => {
            const status = statusConfig[projector.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            
            return (
              <div
                key={projector.id}
                className="group relative bg-void-charcoal border border-void-gray hover:border-neon-cyan transition-all duration-500 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={projector.image}
                    alt={projector.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void-charcoal via-transparent to-transparent" />
                  
                  {/* X-Ray overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto border border-neon-cyan/30 rounded-full flex items-center justify-center">
                        <div className="w-24 h-24 border border-neon-cyan/50 rounded-full flex items-center justify-center">
                          <div className="w-16 h-16 border border-neon-cyan rounded-full flex items-center justify-center">
                            <span className="text-neon-cyan text-xs mono">X-RAY</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-xs mono text-neon-cyan mb-1">
                        {projector.id} — {projector.location.split(' — ')[1]?.toUpperCase() || 'WALL'}
                      </div>
                      <h4 className="font-display text-lg font-bold text-white group-hover:text-neon-cyan transition-colors">
                        {projector.name}
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-soft-gray">{projector.location}</div>
                    <div className="text-xs mono text-white">{projector.specs}</div>
                    <div className="text-xs mono text-soft-gray">Lens: {projector.lens}</div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between pt-4 border-t border-void-gray">
                    <div className={`flex items-center gap-2 text-xs mono`}>
                      <StatusIcon className={`w-4 h-4 text-neon-${status.color}`} />
                      <span className={`text-neon-${status.color}`}>{status.label}</span>
                    </div>
                    <span className={`status-led ${status.color}`} />
                  </div>
                </div>

                {/* Hover border glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-neon-cyan" />
              </div>
            );
          })}
        </div>

        {/* Technical Specs Summary */}
        <div className="mt-12 glass-panel p-6">
          <h4 className="font-display text-lg font-bold text-white mb-4">
            PROJECTION TOTALS
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Cost', value: '€943,100' },
              { label: 'Rigging Weight', value: '1,009.1 kg' },
              { label: 'Power Draw', value: '24,510W' },
              { label: 'Heat Load', value: '82,880 BTU/h' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-xs mono text-soft-gray mb-1">{stat.label}</div>
                <div className="font-display text-xl font-bold text-neon-cyan">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
