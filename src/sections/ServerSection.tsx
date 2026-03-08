import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Server, Battery, Clock, Network, Cable } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const rackUnits = [
  { u: '42-40', label: 'FUTURE EXPANSION', type: 'empty', icon: null },
  { u: '39-37', label: 'NETGEAR M4500-32C', type: 'network', icon: Network, status: 'cyan' },
  { u: '36-34', label: 'NETGEAR M4500-32C', type: 'network', icon: Network, status: 'cyan' },
  { u: '33-30', label: 'PIXERA PX2 OCTO', type: 'server', icon: Server, status: 'cyan' },
  { u: '29-26', label: 'PIXERA PX2 OCTO', type: 'server', icon: Server, status: 'cyan' },
  { u: '25-22', label: 'MEINBERG MICROSYNC', type: 'sync', icon: Clock, status: 'cyan' },
  { u: '21-18', label: 'APC SRT 10KVA UPS', type: 'power', icon: Battery, status: 'lime' },
  { u: '17-14', label: 'PATCH PANELS', type: 'patch', icon: Cable, status: 'cyan' },
  { u: '13-01', label: 'CABLE MANAGEMENT', type: 'mgmt', icon: null, status: 'gray' },
];

const serverSpecs = {
  totalCost: '€443,103',
  rackCapacity: '53U / 96U (55%)',
  powerDraw: '6,202W (~27A @ 230V)',
  heatLoad: '21,161 BTU/h',
  upsCapacity: '2× 10kVA APC SRT',
};

export default function ServerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rackRef = useRef<HTMLDivElement>(null);
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const rack = rackRef.current;

    if (!section || !rack) return;

    const ctx = gsap.context(() => {
      // Rack units slide in
      const units = rack.querySelectorAll('.rack-unit');
      gsap.from(units, {
        x: -30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
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
      id="server"
      className="relative py-24 md:py-32 px-4 md:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('/images/server-room.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="status-led cyan" />
            <span className="text-xs mono text-soft-gray tracking-wider">
              SECTION 11 — SERVER ROOM
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            SERVER INFRASTRUCTURE
          </h2>
          <p className="text-soft-gray max-w-2xl">
            The brain of the operation — media servers, network switches, power protection, 
            and physical infrastructure. Enterprise-grade equipment with redundancy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Rack Elevation */}
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-4">
              RACK ELEVATION — RACK 1
            </h3>
            
            <div 
              ref={rackRef}
              className="bg-void-charcoal border-2 border-void-gray p-4"
            >
              {/* Rack header */}
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-void-gray">
                <span className="text-xs mono text-soft-gray">U-HEIGHT</span>
                <span className="text-xs mono text-soft-gray">EQUIPMENT</span>
                <span className="text-xs mono text-soft-gray">STATUS</span>
              </div>

              {/* Rack units */}
              <div className="space-y-1">
                {rackUnits.map((unit, index) => {
                  const Icon = unit.icon;
                  const isHovered = hoveredUnit === unit.u;
                  
                  return (
                    <div
                      key={index}
                      className={`rack-unit flex items-center gap-3 p-2 border border-void-gray transition-all duration-300 cursor-pointer ${
                        isHovered ? 'border-neon-cyan bg-neon-cyan/10' : ''
                      }`}
                      onMouseEnter={() => setHoveredUnit(unit.u)}
                      onMouseLeave={() => setHoveredUnit(null)}
                    >
                      <div className="w-16 text-xs mono text-soft-gray">
                        U{unit.u}
                      </div>
                      
                      <div className="flex-1 flex items-center gap-3">
                        {Icon && (
                          <div className={`w-8 h-8 flex items-center justify-center bg-void-gray ${
                            isHovered ? 'text-neon-cyan' : 'text-soft-gray'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                        )}
                        <span className={`text-sm ${
                          unit.type === 'empty' ? 'text-soft-gray' : 'text-white'
                        }`}>
                          {unit.label}
                        </span>
                      </div>
                      
                      <div className="w-8 flex justify-center">
                        {unit.status && <span className={`status-led ${unit.status}`} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rack info */}
            <div className="mt-4 flex items-center justify-between text-xs mono text-soft-gray">
              <span>2× APC NetShelter SX 48U</span>
              <span>600mm × 1070mm footprint</span>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-4">
              INFRASTRUCTURE SUMMARY
            </h3>

            <div className="space-y-4">
              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Total Equipment Cost', value: serverSpecs.totalCost, icon: Server },
                  { label: 'Rack Capacity Used', value: serverSpecs.rackCapacity, icon: Server },
                  { label: 'Power Draw', value: serverSpecs.powerDraw, icon: Cable },
                  { label: 'Heat Load (Visual)', value: serverSpecs.heatLoad, icon: Cable },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="glass-panel p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 text-neon-cyan" />
                        <span className="text-xs mono text-soft-gray">{stat.label}</span>
                      </div>
                      <div className="font-display text-xl font-bold text-neon-cyan">
                        {stat.value}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* UPS Configuration */}
              <div className="glass-panel p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Battery className="w-6 h-6 text-neon-lime" />
                  <h4 className="font-display text-lg font-bold text-white">
                    UPS PROTECTION
                  </h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-void-gray">
                    <span className="text-soft-gray text-sm">Capacity</span>
                    <span className="text-white font-medium">2× 10,000 VA</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-void-gray">
                    <span className="text-soft-gray text-sm">Runtime @ Full Load</span>
                    <span className="text-white font-medium">~15 minutes</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-void-gray">
                    <span className="text-soft-gray text-sm">Configuration</span>
                    <span className="text-neon-lime font-medium">N+1 Redundancy</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-soft-gray text-sm">UPS Headroom</span>
                    <span className="text-neon-lime font-medium">~69%</span>
                  </div>
                </div>
              </div>

              {/* Media Servers */}
              <div className="glass-panel p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Server className="w-6 h-6 text-neon-cyan" />
                  <h4 className="font-display text-lg font-bold text-white">
                    MEDIA SERVERS
                  </h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-void-gray">
                    <span className="text-soft-gray text-sm">Platform</span>
                    <span className="text-white font-medium">Pixera PX2 Octo</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-void-gray">
                    <span className="text-soft-gray text-sm">Quantity</span>
                    <span className="text-white font-medium">5 units (2U each)</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-void-gray">
                    <span className="text-soft-gray text-sm">Network</span>
                    <span className="text-white font-medium">10GBase-T ports</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-soft-gray text-sm">Total Power</span>
                    <span className="text-neon-cyan font-medium">4,000W (5 units)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
