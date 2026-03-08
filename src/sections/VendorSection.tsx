import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Video, 
  Volume2, 
  Server, 
  Network, 
  Camera, 
  Cable,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const vendors = [
  {
    name: 'BARCO',
    category: 'Projection Systems',
    status: 'quoting',
    products: ['I600-4K10', 'I600-4K8', 'G50-W8', 'ILD 0.37 UST Lens'],
    contact: 'WIP',
    icon: Video,
    color: 'cyan',
  },
  {
    name: 'L-ACOUSTICS',
    category: 'Spatial Audio',
    status: 'quoted',
    products: ['X8i', 'X6i', 'SYVA SUB', 'LA7.16i', 'L-ISA Processor II'],
    contact: 'Audiotek Ltd — Tom Macklin',
    quoteRef: 'QU-20070/1',
    quoteExpiry: '27 Mar 2026',
    cost: '€401,586',
    icon: Volume2,
    color: 'cyan',
  },
  {
    name: 'PIXERA',
    category: 'Media Servers',
    status: 'confirmed',
    products: ['PX2 Octo', 'GUI Card'],
    contact: 'AV Stumpfl',
    cost: '€275,000',
    icon: Server,
    color: 'lime',
  },
  {
    name: 'NETGEAR',
    category: 'Network Infrastructure',
    status: 'confirmed',
    products: ['M4500-32C', 'XSM4344C', 'QSFP Transceivers'],
    cost: '€93,080',
    icon: Network,
    color: 'lime',
  },
  {
    name: 'LUXONIS',
    category: 'Sensors & Tracking',
    status: 'evaluating',
    products: ['OAK-D Pro Wide'],
    contact: 'Under evaluation',
    icon: Camera,
    color: 'orange',
  },
  {
    name: 'DVIGEAR',
    category: 'Signal Transport',
    status: 'evaluating',
    products: ['DVI-7380 DP Fiber Extenders'],
    contact: 'Under evaluation',
    icon: Cable,
    color: 'orange',
  },
];

const statusConfig = {
  confirmed: { label: 'CONFIRMED', color: 'lime', icon: CheckCircle2 },
  quoted: { label: 'QUOTED', color: 'cyan', icon: Clock },
  quoting: { label: 'QUOTING', color: 'cyan', icon: Clock },
  evaluating: { label: 'EVALUATING', color: 'orange', icon: Clock },
};

export default function VendorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      // Cards entrance with lift effect
      gsap.from(cards.children, {
        y: 80,
        opacity: 0,
        rotateX: 15,
        duration: 0.8,
        stagger: 0.1,
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

  return (
    <section
      ref={sectionRef}
      id="vendors"
      className="relative py-24 md:py-32 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="status-led cyan" />
            <span className="text-xs mono text-soft-gray tracking-wider">
              SECTION 13 — CONTRACTORS / VENDORS
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            VENDOR DIRECTORY
          </h2>
          <p className="text-soft-gray max-w-2xl">
            Complete supplier directory — who supplies what, current pricing status, 
            contact information, and what remains to be confirmed.
          </p>
        </div>

        {/* Vendor Cards Grid */}
        <div 
          ref={cardsRef} 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000"
        >
          {vendors.map((vendor, index) => {
            const Icon = vendor.icon;
            const status = statusConfig[vendor.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            
            return (
              <div
                key={index}
                className="group relative glass-panel p-6 hover:border-neon-cyan transition-all duration-500 preserve-3d"
                style={{
                  transform: 'translateZ(0)',
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-void-gray flex items-center justify-center group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan transition-all duration-300 border border-transparent">
                    <Icon className={`w-7 h-7 text-neon-${vendor.color}`} />
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 bg-neon-${status.color}/10 border border-neon-${status.color}/30`}>
                    <StatusIcon className={`w-3 h-3 text-neon-${status.color}`} />
                    <span className={`text-xs mono text-neon-${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h4 className="font-display text-2xl font-bold text-white group-hover:text-neon-cyan transition-colors mb-1">
                    {vendor.name}
                  </h4>
                  <div className="text-sm text-soft-gray mb-4">
                    {vendor.category}
                  </div>

                  {/* Products */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {vendor.products.map((product, pIndex) => (
                      <span 
                        key={pIndex}
                        className="px-2 py-1 bg-void-gray text-soft-gray text-xs mono"
                      >
                        {product}
                      </span>
                    ))}
                  </div>

                  {/* Contact / Cost Info */}
                  {vendor.contact && (
                    <div className="text-xs text-soft-gray mb-2">
                      {vendor.contact}
                    </div>
                  )}
                  
                  {vendor.quoteRef && (
                    <div className="text-xs mono text-neon-orange mb-1">
                      {vendor.quoteRef}
                    </div>
                  )}
                  
                  {vendor.quoteExpiry && (
                    <div className="text-xs text-soft-gray mb-2">
                      Expires: {vendor.quoteExpiry}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-void-gray">
                  {vendor.cost ? (
                    <div>
                      <span className="text-xs mono text-soft-gray">TOTAL</span>
                      <div className={`font-display text-xl font-bold text-neon-${vendor.color}`}>
                        {vendor.cost}
                      </div>
                    </div>
                  ) : (
                    <div />
                  )}
                  
                  <button className="flex items-center gap-2 text-xs mono text-soft-gray hover:text-neon-cyan transition-colors group/btn">
                    VIEW DETAILS
                    <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* Hover lift effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-neon-cyan" />
              </div>
            );
          })}
        </div>

        {/* Procurement Status Summary */}
        <div className="mt-12 glass-panel p-6">
          <h4 className="font-display text-lg font-bold text-white mb-6">
            PROCUREMENT STATUS OVERVIEW
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Confirmed', count: 2, color: 'lime' },
              { label: 'Quoted', count: 1, color: 'cyan' },
              { label: 'Quoting', count: 1, color: 'cyan' },
              { label: 'Evaluating', count: 2, color: 'orange' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`font-display text-4xl font-bold text-neon-${item.color} mb-1`}>
                  {item.count}
                </div>
                <div className="text-xs mono text-soft-gray">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Actions */}
        <div className="mt-8 border border-neon-cyan/30 bg-neon-cyan/5 p-6">
          <h4 className="font-display text-lg font-bold text-neon-cyan mb-4">
            NEXT ACTIONS
          </h4>
          <ul className="space-y-2 text-sm text-soft-gray">
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full" />
              Confirm formal quotes from Barco or alternative projection vendors
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full" />
              Confirm Meinberg sync generator pricing and availability
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full" />
              Obtain BTU/hr ratings from Audiotek for HVAC sizing
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full" />
              Finalize signal transport solution (fiber vs. HDBaseT vs. ST2110)
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
