import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Thermometer, AlertTriangle, Wind, Droplets } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const heatSources = [
  { name: 'Visual Equipment', load: 21200, percentage: 18, color: 'cyan', status: 'confirmed' },
  { name: 'Projection (Gallery)', load: 82880, percentage: 70, color: 'orange', status: 'confirmed' },
  { name: 'Audio Equipment', load: 14450, percentage: 12, color: 'magenta', status: 'estimated' },
];

const environmentalSpecs = {
  targetTemp: '18-24°C',
  maxTemp: '27°C (80°F)',
  humidity: '40-60%',
  airChanges: '15-20 ACH',
  acoustic: 'NC-35 or better',
};

export default function HVACTSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bars = barsRef.current;

    if (!section || !bars) return;

    const ctx = gsap.context(() => {
      // Heat load bars animation
      const barElements = bars.querySelectorAll('.heat-bar-fill');
      
      barElements.forEach((bar, index) => {
        gsap.from(bar, {
          width: '0%',
          duration: 1,
          delay: index * 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        });
      });

    }, section);

    return () => ctx.revert();
  }, []);

  const totalLoad = heatSources.reduce((sum, source) => sum + source.load, 0);
  const requiredBTU = Math.round(totalLoad * 1.25); // 25% margin
  const recommendedBTU = Math.round(totalLoad * 1.5); // 50% margin

  return (
    <section
      ref={sectionRef}
      id="hvac"
      className="relative py-24 md:py-32 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="status-led orange" />
            <span className="text-xs mono text-soft-gray tracking-wider">
              SECTION 12 — HVAC
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            HEAT LOAD ANALYSIS
          </h2>
          <p className="text-soft-gray max-w-2xl">
            Thermal load and cooling requirements. Equipment generates significant heat 
            that must be managed for optimal performance and longevity.
          </p>
        </div>

        {/* Heat Load Bars */}
        <div ref={barsRef} className="mb-12">
          <h3 className="font-display text-lg font-bold text-white mb-6">
            HEAT LOAD BY SYSTEM
          </h3>

          <div className="space-y-6">
            {heatSources.map((source, index) => {
              const maxLoad = Math.max(...heatSources.map(s => s.load));
              const percentage = (source.load / maxLoad) * 100;
              
              return (
                <div key={index} className="glass-panel p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Thermometer className={`w-5 h-5 text-neon-${source.color}`} />
                      <span className="text-white">{source.name}</span>
                      {source.status === 'estimated' && (
                        <span className="text-xs mono text-neon-orange">(ESTIMATED)</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`status-led ${source.color}`} />
                      <span className={`font-display text-xl font-bold text-neon-${source.color}`}>
                        {source.load.toLocaleString()} BTU/h
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress Bar with gradient */}
                  <div className="h-4 bg-void-gray overflow-hidden">
                    <div
                      className={`heat-bar-fill h-full relative`}
                      data-width={`${percentage}%`}
                      style={{ 
                        width: `${percentage}%`,
                        background: `linear-gradient(90deg, var(--neon-${source.color}) 0%, var(--neon-${source.color})dd 100%)`,
                      }}
                    >
                      {/* Heat shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="mt-2 text-right text-xs mono text-soft-gray">
                    {source.percentage}% of total load
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total */}
          <div className="mt-6 glass-panel p-6 border-2 border-neon-orange">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Thermometer className="w-8 h-8 text-neon-orange" />
                <div>
                  <div className="font-display text-xl font-bold text-white">
                    TOTAL HEAT LOAD
                  </div>
                  <div className="text-xs mono text-soft-gray">
                    ~{Math.round(totalLoad / 1000)}kW estimated
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-4xl font-bold text-neon-orange">
                  {totalLoad.toLocaleString()}
                </div>
                <div className="text-xs mono text-soft-gray">BTU/hour</div>
              </div>
            </div>
          </div>
        </div>

        {/* HVAC Sizing */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="glass-panel p-6">
            <h4 className="font-display text-lg font-bold text-white mb-4">
              HVAC SIZING RECOMMENDATIONS
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-void-gray">
                <span className="text-soft-gray">Minimum Required</span>
                <div className="text-right">
                  <span className="font-display text-xl font-bold text-neon-cyan">
                    {requiredBTU.toLocaleString()}
                  </span>
                  <span className="text-xs text-soft-gray ml-2">BTU/h (25% margin)</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-void-gray">
                <span className="text-soft-gray">Recommended</span>
                <div className="text-right">
                  <span className="font-display text-xl font-bold text-neon-lime">
                    {recommendedBTU.toLocaleString()}
                  </span>
                  <span className="text-xs text-soft-gray ml-2">BTU/h (50% margin)</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <span className="text-soft-gray">Server Room Target</span>
                <div className="text-right">
                  <span className="font-display text-xl font-bold text-white">
                    45,000 — 50,000
                  </span>
                  <span className="text-xs text-soft-gray ml-2">BTU/h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Requirements */}
          <div className="glass-panel p-6">
            <h4 className="font-display text-lg font-bold text-white mb-4">
              ENVIRONMENTAL SPECIFICATIONS
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Target Temperature', value: environmentalSpecs.targetTemp, icon: Thermometer },
                { label: 'Maximum Allowable', value: environmentalSpecs.maxTemp, icon: Thermometer },
                { label: 'Humidity Range', value: environmentalSpecs.humidity, icon: Droplets },
                { label: 'Air Changes', value: environmentalSpecs.airChanges, icon: Wind },
              ].map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <div key={index} className="flex items-center gap-3 p-3 border border-void-gray">
                    <Icon className="w-5 h-5 text-neon-cyan" />
                    <div>
                      <div className="text-[10px] mono text-soft-gray">{spec.label}</div>
                      <div className="text-white font-medium">{spec.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 p-3 border border-void-gray">
              <div className="text-[10px] mono text-soft-gray mb-1">ACOUSTIC REQUIREMENT</div>
              <div className="text-white">{environmentalSpecs.acoustic}</div>
            </div>
          </div>
        </div>

        {/* Action Required */}
        <div className="border-2 border-neon-orange bg-neon-orange/10 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-neon-orange/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-neon-orange" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-neon-orange mb-2">
                ACTION REQUIRED
              </h4>
              <p className="text-soft-gray text-sm mb-4">
                Contractor to confirm HVAC specification. Audio equipment heat output data 
                is currently unavailable and required for final sizing.
              </p>
              <ul className="space-y-2 text-sm text-soft-gray">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-neon-orange rounded-full" />
                  Contact Audiotek/L-Acoustics for exact BTU/h outputs
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-neon-orange rounded-full" />
                  Verify minimum CFM airflow per LA7.16i amplifier
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-neon-orange rounded-full" />
                  Finalize HVAC capacity with 20-30% expansion buffer
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
