import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Thermometer, AlertTriangle, Wind, Droplets, Download, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HVACPageProps {
  isDarkMode: boolean;
}

export default function HVACPage({ isDarkMode }: HVACPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [showHeatSources, setShowHeatSources] = useState(false);
  const [showAction, setShowAction] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.from('.heat-bar', {
        scaleX: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: page,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }, page);

    return () => ctx.revert();
  }, []);

  const handleDownload = () => {
    // EXACT DATA FROM PDF - COPIED WITHOUT MODIFICATION
    const csvContent = `Source,Heat Load (BTU/h),Percentage
Heat Load Server Room (Visual),21.161,~18%
Heat Load Server Room (Audio Est.),14.450,~12%
Heat Load Projectors in Galleries 1+2,82.880,~70%
TOTAL HEAT LOAD,118.491,100%
HVAC SIZING,,,
Minimum Required (25% margin),~148.000 BTU/h,,
Recommended (50% margin),~177.000 BTU/h,,
Server Room Target,45.000 — 50.000 BTU/h,,
ENVIRONMENTAL SPECS,,,
Target Temperature,18-24°C,,
Maximum Allowable,27°C (80°F),,
Humidity Range,40-60%,,
Air Changes,15-20 ACH,,
Acoustic Target,NC-35 or better,,
ACTION REQUIRED,,,
Contact Audiotek/L-Acoustics for exact BTU/h outputs,,,
Verify minimum CFM airflow per LA7.16i amplifier,,,
Finalize HVAC capacity with 20-30% expansion buffer,,,`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lightheart-hvac-specs.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';
  const borderColor = isDarkMode ? '#1F1F1F' : '#E5E5E5';
  const subTextColor = isDarkMode ? '#A0A0A0' : '#666666';

  const heatSources = [
    { name: 'Server Room (Visual)', load: 21161, percentage: 18, color: 'cyan' },
    { name: 'Server Room (Audio Est.)', load: 14450, percentage: 12, color: 'magenta' },
    { name: 'Projectors (Galleries 1+2)', load: 82880, percentage: 70, color: 'orange' },
  ];

  const totalLoad = heatSources.reduce((sum, source) => sum + source.load, 0);
  const requiredBTU = Math.round(totalLoad * 1.25);
  const recommendedBTU = Math.round(totalLoad * 1.5);

  return (
    <div ref={pageRef} className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#FF4D00' }}
            />
            <span 
              className="text-xs mono tracking-wider"
              style={{ color: subTextColor }}
            >
              SECTION 11
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                HVAC
              </h1>
              <p 
                className="max-w-xl text-sm sm:text-base"
                style={{ color: subTextColor }}
              >
                Thermal load and cooling requirements. Equipment generates significant heat 
                that must be managed for optimal performance and longevity.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 text-sm border transition-colors w-full sm:w-auto justify-center"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              <Download className="w-4 h-4" />
              DOWNLOAD CSV
            </button>
          </div>
        </div>

        {/* Heat Load Bars */}
        <div className="space-y-4 mb-8">
          {heatSources.map((source, index) => {
            const maxLoad = Math.max(...heatSources.map(s => s.load));
            const percentage = (source.load / maxLoad) * 100;
            const sourceColor = source.color === 'cyan' ? '#00F0FF' : 
                               source.color === 'orange' ? '#FF4D00' : '#FF006E';
            
            return (
              <div 
                key={index} 
                className="heat-bar p-4 border"
                style={{ borderColor }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4" style={{ color: sourceColor }} />
                    <span 
                      className="text-sm"
                      style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                    >
                      {source.name}
                    </span>
                  </div>
                  <span 
                    className="font-display text-lg font-bold"
                    style={{ color: sourceColor }}
                  >
                    {source.load.toLocaleString()} BTU/h
                  </span>
                </div>
                
                <div 
                  className="h-3 overflow-hidden"
                  style={{ backgroundColor: isDarkMode ? '#1F1F1F' : '#E5E5E5' }}
                >
                  <div
                    className="h-full"
                    style={{ width: `${percentage}%`, backgroundColor: sourceColor }}
                  />
                </div>
                
                <div 
                  className="mt-1 text-right text-xs mono"
                  style={{ color: subTextColor }}
                >
                  {source.percentage}% of total load
                </div>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div 
          className="p-5 sm:p-6 mb-8 border-2"
          style={{ borderColor: '#FF4D00' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Thermometer className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: '#FF4D00' }} />
              <div>
                <div 
                  className="font-display text-lg sm:text-xl font-bold"
                  style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                >
                  TOTAL HEAT LOAD
                </div>
                <div 
                  className="text-xs mono"
                  style={{ color: subTextColor }}
                >
                  ~{Math.round(totalLoad / 1000)}kW estimated
                </div>
              </div>
            </div>
            <div className="text-right">
              <div 
                className="font-display text-3xl sm:text-4xl font-bold"
                style={{ color: '#FF4D00' }}
              >
                {totalLoad.toLocaleString()}
              </div>
              <div 
                className="text-xs mono"
                style={{ color: subTextColor }}
              >
                BTU/hour
              </div>
            </div>
          </div>
        </div>

        {/* HVAC Sizing & Environmental */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <div 
            className="p-5 border"
            style={{ borderColor }}
          >
            <h3 
              className="font-display text-base font-bold mb-4"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              HVAC SIZING
            </h3>
            
            <div className="space-y-3 text-sm">
              <div 
                className="flex justify-between py-2"
                style={{ borderBottom: `1px solid ${borderColor}` }}
              >
                <span style={{ color: subTextColor }}>Minimum Required</span>
                <div className="text-right">
                  <span className="font-display font-bold" style={{ color: accentColor }}>{requiredBTU.toLocaleString()}</span>
                  <span className="text-xs ml-1" style={{ color: subTextColor }}>BTU/h (25% margin)</span>
                </div>
              </div>
              <div 
                className="flex justify-between py-2"
                style={{ borderBottom: `1px solid ${borderColor}` }}
              >
                <span style={{ color: subTextColor }}>Recommended</span>
                <div className="text-right">
                  <span className="font-display font-bold" style={{ color: '#39FF14' }}>{recommendedBTU.toLocaleString()}</span>
                  <span className="text-xs ml-1" style={{ color: subTextColor }}>BTU/h (50% margin)</span>
                </div>
              </div>
              <div 
                className="flex justify-between py-2"
              >
                <span style={{ color: subTextColor }}>Server Room Target</span>
                <div className="text-right">
                  <span 
                    className="font-display font-bold"
                    style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                  >
                    45k-50k
                  </span>
                  <span className="text-xs ml-1" style={{ color: subTextColor }}>BTU/h</span>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="p-5 border"
            style={{ borderColor }}
          >
            <h3 
              className="font-display text-base font-bold mb-4"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              ENVIRONMENTAL SPECS
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Target Temperature', value: '18-24°C', icon: Thermometer },
                { label: 'Maximum Allowable', value: '27°C (80°F)', icon: Thermometer },
                { label: 'Humidity Range', value: '40-60%', icon: Droplets },
                { label: 'Air Changes', value: '15-20 ACH', icon: Wind },
              ].map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 p-2 border"
                    style={{ borderColor }}
                  >
                    <Icon className="w-4 h-4" style={{ color: accentColor }} />
                    <div>
                      <div className="text-[10px] mono" style={{ color: subTextColor }}>{spec.label}</div>
                      <div 
                        className="text-sm"
                        style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                      >
                        {spec.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div 
              className="mt-3 p-2 border"
              style={{ borderColor }}
            >
              <div className="text-[10px] mono mb-1" style={{ color: subTextColor }}>ACOUSTIC REQUIREMENT</div>
              <div 
                className="text-sm"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                NC-35 or better
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Heat Sources Detail */}
        <div className="mb-4">
          <button
            onClick={() => setShowHeatSources(!showHeatSources)}
            className="w-full flex items-center justify-between py-3 px-4 border transition-colors"
            style={{ borderColor }}
          >
            <span 
              className="font-display text-sm font-bold"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              HEAT LOAD BREAKDOWN
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300`}
              style={{ 
                color: accentColor,
                transform: showHeatSources ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 border-l border-r border-b`}
            style={{ 
              borderColor,
              maxHeight: showHeatSources ? '400px' : '0px',
              backgroundColor: isDarkMode ? '#0A0A0A' : '#F9F9F9'
            }}
          >
            <div className="p-4">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <th className="text-left py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Source</th>
                    <th className="text-right py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>BTU/h</th>
                    <th className="text-right py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>%</th>
                  </tr>
                </thead>
                <tbody style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2">Heat Load Server Room (Visual)</td>
                    <td className="py-2 text-right">21,161</td>
                    <td className="py-2 text-right">~18%</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2">Heat Load Server Room (Audio Est.)</td>
                    <td className="py-2 text-right">14,450</td>
                    <td className="py-2 text-right">~12%</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2">Heat Load Projectors (Galleries 1+2)</td>
                    <td className="py-2 text-right">82,880</td>
                    <td className="py-2 text-right">~70%</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold" style={{ color: '#FF4D00' }}>TOTAL</td>
                    <td className="py-2 text-right font-bold" style={{ color: '#FF4D00' }}>118,491</td>
                    <td className="py-2 text-right font-bold" style={{ color: '#FF4D00' }}>100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Expandable Action Required */}
        <div>
          <button
            onClick={() => setShowAction(!showAction)}
            className="w-full flex items-center justify-between py-3 px-4 border transition-colors"
            style={{ borderColor: '#FF4D00' }}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" style={{ color: '#FF4D00' }} />
              <span 
                className="font-display text-sm font-bold"
                style={{ color: '#FF4D00' }}
              >
                ACTION REQUIRED
              </span>
            </div>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300`}
              style={{ 
                color: '#FF4D00',
                transform: showAction ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 border-l border-r border-b`}
            style={{ 
              borderColor: '#FF4D00',
              maxHeight: showAction ? '400px' : '0px',
              backgroundColor: isDarkMode ? 'rgba(255, 77, 0, 0.05)' : 'rgba(255, 77, 0, 0.02)'
            }}
          >
            <div className="p-4 space-y-2 text-sm" style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
              <p className="mb-3" style={{ color: subTextColor }}>
                Contractor to confirm HVAC specification. Audio equipment heat output data 
                is currently unavailable and required for final sizing.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FF4D00' }} />
                  Contact Audiotek/L-Acoustics for exact BTU/h outputs
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FF4D00' }} />
                  Verify minimum CFM airflow per LA7.16i amplifier
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FF4D00' }} />
                  Finalize HVAC capacity with 20-30% expansion buffer
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
