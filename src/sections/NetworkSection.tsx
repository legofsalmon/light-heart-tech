import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Server, Wifi, Volume2, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const networkLayers = [
  {
    name: 'Video Transport',
    layer: 'Physical (Point-to-Point)',
    hardware: 'DVIGear DVI-7380 over OS2 fiber',
    protocol: 'DisplayPort 1.4 baseband',
    function: '22× 4K uncompressed streams (15.9 Gbps each)',
    icon: Server,
    status: 'cyan',
  },
  {
    name: 'Sensor Aggregation',
    layer: 'Layer 3 (IP)',
    hardware: '2× Netgear XSM4344C (44× 10Gb PoE+)',
    protocol: 'TCP/IP',
    function: 'Luxonis camera array (2.5Gbps per unit)',
    icon: Eye,
    status: 'cyan',
  },
  {
    name: 'Audio Control',
    layer: 'Layer 2 (AVB)',
    hardware: '4× L-Acoustics LS10 UK (10-port AVB)',
    protocol: 'Milan-AVB (IEEE 802.1)',
    function: 'L-ISA object-based audio (96kHz/64ch)',
    icon: Volume2,
    status: 'cyan',
  },
  {
    name: 'Server Interconnect',
    layer: 'Layer 3 (Multicast)',
    hardware: '2× Netgear M4500-32C (100G spine)',
    protocol: 'IGMP Snooping',
    function: 'Pixera cluster sync, file distribution',
    icon: Server,
    status: 'cyan',
  },
  {
    name: 'Management',
    layer: 'Layer 3 (IP)',
    hardware: 'Isolated VLAN',
    protocol: 'OSC, PTP, TCP/IP',
    function: 'QLab, control systems, monitoring',
    icon: Wifi,
    status: 'cyan',
  },
];

export default function NetworkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const topologyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const topology = topologyRef.current;

    if (!section || !topology) return;

    const ctx = gsap.context(() => {
      // Core pulse animation
      const core = topology.querySelector('.network-core');
      if (core) {
        gsap.to(core, {
          boxShadow: '0 0 40px rgba(0, 240, 255, 0.6)',
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Node connections animation
      const connections = topology.querySelectorAll('.connection-line');
      connections.forEach((line, index) => {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.8,
          delay: index * 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Layer cards entrance
      gsap.from('.network-layer-card', {
        x: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="network"
      className="relative py-24 md:py-32 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="status-led cyan" />
            <span className="text-xs mono text-soft-gray tracking-wider">
              SECTION 07 — NETWORK ARCHITECTURE
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            NETWORK TOPOLOGY
          </h2>
          <p className="text-soft-gray max-w-2xl">
            Five distinct physical/logical networks to prevent clock jitter, packet collision, 
            and protocol interference. Segregated traffic for maximum reliability.
          </p>
        </div>

        {/* Network Topology Visualization */}
        <div ref={topologyRef} className="mb-12">
          <div className="relative flex flex-col items-center">
            {/* Core Switch */}
            <div className="network-core relative z-10 w-32 h-32 rounded-full bg-void-charcoal border-4 border-neon-cyan flex items-center justify-center shadow-neon-cyan mb-8">
              <div className="text-center">
                <Server className="w-10 h-10 text-neon-cyan mx-auto mb-1" />
                <div className="text-xs mono text-neon-cyan">CORE</div>
                <div className="text-[10px] text-soft-gray">M4500-32C</div>
              </div>
            </div>

            {/* Connection Lines */}
            <div className="absolute top-16 left-1/2 w-px h-8 bg-gradient-to-b from-neon-cyan to-transparent" />

            {/* Network Layers */}
            <div className="grid md:grid-cols-5 gap-4 w-full">
              {networkLayers.map((layer, index) => {
                const Icon = layer.icon;
                return (
                  <div key={index} className="relative">
                    {/* Connection to core */}
                    <div 
                      className="connection-line hidden md:block absolute -top-8 left-1/2 w-px h-8 bg-neon-cyan/30"
                      style={{ transform: `translateX(${(index - 2) * 20}px)` }}
                    />
                    
                    <div className="network-layer-card glass-panel p-4 hover:border-neon-cyan transition-colors h-full">
                      <div className="flex items-center justify-between mb-3">
                        <Icon className={`w-6 h-6 text-neon-${layer.status}`} />
                        <span className={`status-led ${layer.status}`} />
                      </div>
                      
                      <h4 className="font-display text-sm font-bold text-white mb-1">
                        {layer.name}
                      </h4>
                      <div className="text-xs mono text-neon-cyan mb-3">
                        {layer.layer}
                      </div>
                      
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="text-soft-gray">Hardware: </span>
                          <span className="text-white">{layer.hardware}</span>
                        </div>
                        <div>
                          <span className="text-soft-gray">Protocol: </span>
                          <span className="text-white">{layer.protocol}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Critical Warning Banner */}
        <div className="mb-12 border-2 border-neon-magenta bg-neon-magenta/10 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-neon-magenta/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-neon-magenta" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-neon-magenta mb-2">
                CRITICAL — NETWORK ISOLATION
              </h4>
              <p className="text-soft-gray text-sm mb-4">
                Video transport SHALL NOT share broadcast domain with AVB audio. 
                Sensor network must be physically separated at Layer 2.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-neon-magenta/20 border border-neon-magenta text-neon-magenta text-xs mono hover:bg-neon-magenta hover:text-white transition-colors">
                  VIEW NETWORK DIAGRAM
                </button>
                <button className="px-4 py-2 bg-void-gray border border-void-gray text-white text-xs mono hover:border-neon-cyan hover:text-neon-cyan transition-colors">
                  DOWNLOAD CONFIG
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Infrastructure Summary */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: 'Fiber Infrastructure', value: '50× OS2 4-core LC', detail: '200 fiber strands total' },
            { label: 'Copper Infrastructure', value: '75× Cat6a S/FTP', detail: 'Shielded twisted pair' },
            { label: 'Switch Ports', value: '88× 10Gb PoE+', detail: '64× 100G QSFP28' },
            { label: 'AVB Switches', value: '4× L-Acoustics LS10', detail: 'Primary/Secondary pairs' },
          ].map((item, index) => (
            <div key={index} className="text-center p-4 border border-void-gray">
              <div className="text-xs mono text-soft-gray mb-2">{item.label}</div>
              <div className="font-display text-xl font-bold text-neon-cyan mb-1">
                {item.value}
              </div>
              <div className="text-xs text-soft-gray">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
