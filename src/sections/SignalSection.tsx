import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Server, Cable, Wifi, Projector } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const signalNodes = [
  { id: 'content', label: 'CONTENT', icon: Monitor, status: 'cyan' },
  { id: 'pixera', label: 'PIXERA', icon: Server, status: 'cyan' },
  { id: 'encoder', label: 'SDVOE ENC', icon: Cable, status: 'cyan' },
  { id: 'fiber', label: 'FIBER', icon: Wifi, status: 'cyan' },
  { id: 'decoder', label: 'DECODER', icon: Cable, status: 'cyan' },
  { id: 'projector', label: 'PROJECTOR', icon: Projector, status: 'cyan' },
];

export default function SignalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const flow = flowRef.current;
    const path = pathRef.current;

    if (!section || !flow || !path) return;

    const ctx = gsap.context(() => {
      // Animate data packets along the path
      const pathLength = path.getTotalLength();
      
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
        },
      });

      // Node illumination on scroll
      const nodes = flow.querySelectorAll('.signal-node');
      nodes.forEach((node, index) => {
        gsap.from(node, {
          scale: 0.8,
          opacity: 0.3,
          duration: 0.5,
          scrollTrigger: {
            trigger: section,
            start: `${20 + index * 15}% 60%`,
            toggleActions: 'play none none reverse',
          },
        });
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="signal"
      className="relative py-24 md:py-32 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="status-led cyan" />
            <span className="text-xs mono text-soft-gray tracking-wider">
              SECTION 04 — SIGNAL TRANSPORT
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            SIGNAL FLOW
          </h2>
          <p className="text-soft-gray max-w-2xl">
            How video signals travel from servers to projectors. Uncompressed 4:4:4 @ 60Hz 
            16:10 signal transport over fiber optic infrastructure.
          </p>
        </div>

        {/* Signal Flow Diagram */}
        <div ref={flowRef} className="relative">
          {/* Desktop Flow - Horizontal */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between relative">
              {/* Connection Lines SVG */}
              <svg 
                className="absolute inset-0 w-full h-32 pointer-events-none"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00F0FF" />
                    <stop offset="50%" stopColor="#FF006E" />
                    <stop offset="100%" stopColor="#39FF14" />
                  </linearGradient>
                </defs>
                <path
                  ref={pathRef}
                  d="M 0 64 L 100% 64"
                  stroke="url(#signalGradient)"
                  strokeWidth="2"
                  fill="none"
                  className="opacity-50"
                />
                {/* Animated data packets */}
                <circle r="4" fill="#00F0FF" className="animate-pulse">
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    path="M 0 64 L 100% 64"
                  />
                </circle>
                <circle r="4" fill="#FF006E" className="animate-pulse">
                  <animateMotion
                    dur="3s"
                    begin="1s"
                    repeatCount="indefinite"
                    path="M 0 64 L 100% 64"
                  />
                </circle>
                <circle r="4" fill="#39FF14" className="animate-pulse">
                  <animateMotion
                    dur="3s"
                    begin="2s"
                    repeatCount="indefinite"
                    path="M 0 64 L 100% 64"
                  />
                </circle>
              </svg>

              {/* Nodes */}
              {signalNodes.map((node, index) => {
                const Icon = node.icon;
                return (
                  <div
                    key={node.id}
                    className="signal-node relative z-10 flex flex-col items-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-void-charcoal border-2 border-neon-cyan flex items-center justify-center shadow-neon-cyan hover:scale-110 transition-transform duration-300 cursor-pointer group">
                      <Icon className="w-8 h-8 text-neon-cyan group-hover:text-white transition-colors" />
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-xs mono text-neon-cyan tracking-wider">
                        {node.label}
                      </div>
                      <span className={`status-led ${node.status} mt-2 mx-auto block`} />
                    </div>
                    
                    {/* Connection arrows */}
                    {index < signalNodes.length - 1 && (
                      <div className="absolute top-10 left-full w-12 h-px bg-gradient-to-r from-neon-cyan to-transparent" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Flow - Vertical */}
          <div className="lg:hidden space-y-8">
            {signalNodes.map((node, index) => {
              const Icon = node.icon;
              return (
                <div key={node.id} className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-void-charcoal border-2 border-neon-cyan flex items-center justify-center shadow-neon-cyan flex-shrink-0">
                    <Icon className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <div>
                    <div className="text-sm mono text-neon-cyan tracking-wider">
                      {node.label}
                    </div>
                    <span className={`status-led ${node.status} mt-2`} />
                  </div>
                  {index < signalNodes.length - 1 && (
                    <div className="absolute left-8 ml-4 w-px h-8 bg-neon-cyan/30" 
                      style={{ transform: 'translateY(48px)' }} 
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Signal Specifications */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'SPECIFICATION',
              value: '4:4:4 @ 60Hz',
              detail: '16:10 aspect ratio',
              status: 'cyan',
            },
            {
              title: 'BANDWIDTH',
              value: '15.9 Gbps',
              detail: 'Per channel uncompressed',
              status: 'cyan',
            },
            {
              title: 'TRANSPORT',
              value: 'DisplayPort 1.4',
              detail: 'Over OS2 fiber',
              status: 'cyan',
            },
          ].map((spec, index) => (
            <div
              key={index}
              className="glass-panel p-6 hover:border-neon-cyan transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs mono text-soft-gray tracking-wider">
                  {spec.title}
                </span>
                <span className={`status-led ${spec.status}`} />
              </div>
              <div className="font-display text-3xl font-bold text-neon-cyan mb-2">
                {spec.value}
              </div>
              <div className="text-sm text-soft-gray">{spec.detail}</div>
            </div>
          ))}
        </div>

        {/* Solution Comparison */}
        <div className="mt-12 glass-panel p-6">
          <h4 className="font-display text-lg font-bold text-white mb-6">
            SELECTED SOLUTION — DVIGEAR DVI-7380
          </h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Native Protocol', value: 'DP 1.4a' },
              { label: 'Bandwidth', value: '32.4 Gbps' },
              { label: 'Points of Failure', value: '0 (end-to-end)' },
              { label: 'Immunity', value: 'Galvanic Isolation' },
            ].map((item, index) => (
              <div key={index}>
                <div className="text-xs mono text-soft-gray mb-1">{item.label}</div>
                <div className="text-white font-medium">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
