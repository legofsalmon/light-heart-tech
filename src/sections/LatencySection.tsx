import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Clock, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const latencyComponents = [
  { name: 'Media Server Output', latency: 2.0, max: 10, color: 'cyan' },
  { name: 'AVB Network Transport', latency: 2.0, max: 10, color: 'cyan' },
  { name: 'L-ISA Processor II', latency: 3.2, max: 10, color: 'cyan' },
  { name: 'AVB to Amplifier', latency: 2.0, max: 10, color: 'cyan' },
  { name: 'LA7.16i Amplifier', latency: 1.8, max: 10, color: 'cyan' },
  { name: 'Speaker Output', latency: 0.1, max: 10, color: 'cyan' },
];

export default function LatencySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bars = barsRef.current;

    if (!section || !bars) return;

    const ctx = gsap.context(() => {
      // Animate bars filling up
      const barElements = bars.querySelectorAll('.latency-bar-fill');
      
      barElements.forEach((bar, index) => {
        gsap.from(bar, {
          width: '0%',
          duration: 1,
          delay: index * 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Total bar flash
      const totalBar = bars.querySelector('.total-bar');
      if (totalBar) {
        gsap.from(totalBar, {
          opacity: 0,
          scale: 0.95,
          duration: 0.5,
          delay: 0.8,
          ease: 'back.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        });
      }

    }, section);

    return () => ctx.revert();
  }, []);

  const totalLatency = latencyComponents.reduce((sum, comp) => sum + comp.latency, 0);
  const targetLatency = 40; // ms
  const headroom = targetLatency - totalLatency;

  return (
    <section
      ref={sectionRef}
      id="latency"
      className="relative py-24 md:py-32 px-4 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="status-led cyan" />
            <span className="text-xs mono text-soft-gray tracking-wider">
              SECTION 10 — LATENCY BUDGET
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            LATENCY BUDGET
          </h2>
          <p className="text-soft-gray max-w-2xl mx-auto">
            End-to-end latency calculation ensuring sound and video stay perfectly 
            synchronized. Target: &lt;40ms for imperceptible delay.
          </p>
        </div>

        {/* Latency Bars */}
        <div ref={barsRef} className="space-y-4 mb-8">
          {latencyComponents.map((component, index) => {
            const percentage = (component.latency / component.max) * 100;
            
            return (
              <div key={index} className="glass-panel p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-neon-cyan" />
                    <span className="text-white text-sm">{component.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-neon-cyan font-display font-bold">
                      {component.latency.toFixed(1)}ms
                    </span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="h-2 bg-void-gray overflow-hidden">
                  <div
                    className={`latency-bar-fill h-full bg-neon-${component.color} relative`}
                    data-width={`${percentage}%`}
                    style={{ width: `${percentage}%` }}
                  >
                    {/* Liquid wave effect at leading edge */}
                    <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-r from-transparent to-white/30" />
                  </div>
                </div>
                
                {/* Bar segments visualization */}
                <div className="flex gap-1 mt-1">
                  {Array.from({ length: Math.ceil(component.max) }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 ${
                        i < component.latency ? 'bg-neon-cyan/50' : 'bg-void-gray'
                      }`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div className="total-bar glass-panel p-6 border-2 border-neon-lime">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-neon-lime" />
              <span className="font-display text-xl font-bold text-white">
                TOTAL END-TO-END LATENCY
              </span>
            </div>
            <div className="text-right">
              <div className="font-display text-4xl font-bold text-neon-lime">
                {totalLatency.toFixed(1)}ms
              </div>
              <div className="text-xs mono text-soft-gray">
                ±0.2ms network variation
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-void-gray">
            <div className="text-center">
              <div className="text-xs mono text-soft-gray mb-1">TARGET</div>
              <div className="font-display text-2xl font-bold text-white">
                &lt;{targetLatency}ms
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs mono text-soft-gray mb-1">HEADROOM</div>
              <div className="font-display text-2xl font-bold text-neon-lime">
                {headroom.toFixed(1)}ms
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs mono text-soft-gray mb-1">STATUS</div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-neon-lime" />
                <span className="font-display text-xl font-bold text-neon-lime">
                  COMPATIBLE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Perceptual Thresholds */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-2">
          {[
            { threshold: '< 10ms', label: 'Imperceptible', color: 'lime' },
            { threshold: '10-20ms', label: 'Barely perceptible', color: 'cyan' },
            { threshold: '20-40ms', label: 'Slightly perceptible', color: 'cyan' },
            { threshold: '> 40ms', label: 'Noticeable delay', color: 'orange' },
            { threshold: '> 100ms', label: 'Unacceptable', color: 'magenta' },
          ].map((item, index) => (
            <div 
              key={index} 
              className={`text-center p-3 border border-void-gray ${
                item.color === 'lime' ? 'bg-neon-lime/10 border-neon-lime/50' : ''
              }`}
            >
              <div className={`text-sm font-display font-bold text-neon-${item.color} mb-1`}>
                {item.threshold}
              </div>
              <div className="text-[10px] text-soft-gray">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
