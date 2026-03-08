import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Clock, Zap, Download, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface LatencyPageProps {
  isDarkMode: boolean;
}

export default function LatencyPage({ isDarkMode }: LatencyPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showSync, setShowSync] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.from('.latency-bar', {
        scaleX: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
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
    const csvContent = `Stage,Component,Latency,Running Total,Notes
1,Media Server Output,~2 ms,2 ms,Pixera (estimated)
2,AVB Network,2 ms,4 ms,Maximum guaranteed
3,L-ISA Processor,3.2 ms,7.2 ms,Spatial processing
4,AVB to Amplifier,2 ms,9.2 ms,Network transport
5,LA7.16i Amplifier,3.84 ms,~13 ms,Standard mode
6,Speaker Output,<0.1 ms,~13 ms,Negligible
TOTAL,,~13 ms,,Typical end-to-end
Maximum Expected,,~15 ms,,Worst case
Video Sync Threshold,,40 ms,,Target limit
Headroom,,25-29 ms,,62-72% margin
STATUS,,PASS,,Meets all requirements`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lightheart-latency-specs.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';
  const borderColor = isDarkMode ? '#1F1F1F' : '#E5E5E5';
  const bgClass = isDarkMode ? 'bg-[#0A0A0A]' : 'bg-gray-50';

  const latencyComponents = [
    { name: 'Media Server Output', latency: 2.0, max: 10 },
    { name: 'AVB Network Transport', latency: 2.0, max: 10 },
    { name: 'L-ISA Processor II', latency: 3.2, max: 10 },
    { name: 'AVB to Amplifier', latency: 2.0, max: 10 },
    { name: 'LA7.16i Amplifier', latency: 3.84, max: 10 },
    { name: 'Speaker Output', latency: 0.1, max: 10 },
  ];

  const targetLatency = 40;

  return (
    <div ref={pageRef} className="page-enter min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className={`text-xs mono tracking-wider ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
              SECTION 09
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                LATENCY BUDGETING
              </h1>
              <p 
                className="max-w-xl text-sm sm:text-base"
                style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}
              >
                End-to-end latency calculation ensuring sound and video stay perfectly 
                synchronized. Target: &lt;40ms for imperceptible delay.
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

        {/* Latency Bars */}
        <div className="space-y-3 mb-8">
          {latencyComponents.map((component, index) => {
            const percentage = (component.latency / component.max) * 100;
            
            return (
              <div 
                key={index} 
                className={`latency-bar border p-4 ${bgClass}`}
                style={{ borderColor }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color: accentColor }} />
                    <span 
                      className="text-sm"
                      style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                    >
                      {component.name}
                    </span>
                  </div>
                  <span 
                    className="font-display font-bold"
                    style={{ color: accentColor }}
                  >
                    {component.latency.toFixed(2)}ms
                  </span>
                </div>
                
                <div 
                  className="h-2 overflow-hidden"
                  style={{ backgroundColor: isDarkMode ? '#1F1F1F' : '#E5E5E5' }}
                >
                  <div
                    className="h-full"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: accentColor
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div 
          className={`border-2 p-5 sm:p-6 mb-6 ${bgClass}`}
          style={{ borderColor: '#39FF14' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6" style={{ color: '#39FF14' }} />
              <span 
                className="font-display text-lg font-bold"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                TOTAL END-TO-END LATENCY
              </span>
            </div>
            <div className="text-right">
              <div 
                className="font-display text-3xl sm:text-4xl font-bold"
                style={{ color: '#39FF14' }}
              >
                ~13ms
              </div>
              <div className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                ±0.2ms network variation
              </div>
            </div>
          </div>

          <div 
            className="grid grid-cols-3 gap-4 pt-4 border-t"
            style={{ borderColor }}
          >
            <div className="text-center">
              <div className={`text-xs mono mb-1 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                TARGET
              </div>
              <div 
                className="font-display text-xl font-bold"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                &lt;{targetLatency}ms
              </div>
            </div>
            <div className="text-center">
              <div className={`text-xs mono mb-1 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                HEADROOM
              </div>
              <div 
                className="font-display text-xl font-bold"
                style={{ color: '#39FF14' }}
              >
                ~27ms
              </div>
            </div>
            <div className="text-center">
              <div className={`text-xs mono mb-1 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                STATUS
              </div>
              <div className="flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" style={{ color: '#39FF14' }} />
                <span 
                  className="font-display text-lg font-bold"
                  style={{ color: '#39FF14' }}
                >
                  PASS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Signal Path Details */}
        <div className="mb-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between py-3 px-4 border transition-colors"
            style={{ borderColor }}
          >
            <span 
              className="font-display text-sm font-bold"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              TYPICAL SIGNAL PATH (ROOM 1)
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300`}
              style={{ 
                color: accentColor,
                transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 border-l border-r border-b ${bgClass}`}
            style={{ 
              borderColor,
              maxHeight: showDetails ? '500px' : '0px'
            }}
          >
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <th className="text-left py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Stage</th>
                    <th className="text-left py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Component</th>
                    <th className="text-right py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Latency</th>
                    <th className="text-right py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Running Total</th>
                    <th className="text-left py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Notes</th>
                  </tr>
                </thead>
                <tbody style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 px-2">1</td>
                    <td className="py-2 px-2">Media Server Output</td>
                    <td className="py-2 px-2 text-right">~2 ms</td>
                    <td className="py-2 px-2 text-right">2 ms</td>
                    <td className="py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Pixera (estimated)</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 px-2">2</td>
                    <td className="py-2 px-2">AVB Network</td>
                    <td className="py-2 px-2 text-right">2 ms</td>
                    <td className="py-2 px-2 text-right">4 ms</td>
                    <td className="py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Maximum guaranteed</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 px-2">3</td>
                    <td className="py-2 px-2">L-ISA Processor</td>
                    <td className="py-2 px-2 text-right">3.2 ms</td>
                    <td className="py-2 px-2 text-right">7.2 ms</td>
                    <td className="py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Spatial processing</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 px-2">4</td>
                    <td className="py-2 px-2">AVB to Amplifier</td>
                    <td className="py-2 px-2 text-right">2 ms</td>
                    <td className="py-2 px-2 text-right">9.2 ms</td>
                    <td className="py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Network transport</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 px-2">5</td>
                    <td className="py-2 px-2">LA7.16i Amplifier</td>
                    <td className="py-2 px-2 text-right">3.84 ms</td>
                    <td className="py-2 px-2 text-right">~13 ms</td>
                    <td className="py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Standard mode</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2">6</td>
                    <td className="py-2 px-2">Speaker Output</td>
                    <td className="py-2 px-2 text-right">&lt;0.1 ms</td>
                    <td className="py-2 px-2 text-right">~13 ms</td>
                    <td className="py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Negligible</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Expandable Synchronization */}
        <div className="mb-4">
          <button
            onClick={() => setShowSync(!showSync)}
            className="w-full flex items-center justify-between py-3 px-4 border transition-colors"
            style={{ borderColor }}
          >
            <span 
              className="font-display text-sm font-bold"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              AUDIO-VIDEO SYNCHRONIZATION
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300`}
              style={{ 
                color: accentColor,
                transform: showSync ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 border-l border-r border-b ${bgClass}`}
            style={{ 
              borderColor,
              maxHeight: showSync ? '500px' : '0px'
            }}
          >
            <div className="p-4 space-y-3 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
              <div>
                <span style={{ color: accentColor }}>Synchronization Chain: </span>
                For sample-accurate A/V sync, all systems must share a common clock reference:
              </div>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Sync Generator:</strong> Meinberg (TBC) provides house sync/TC</li>
                <li>• <strong>L-ISA Processor:</strong> Receives word clock or timecode</li>
                <li>• <strong>Media Server:</strong> Pixera receives same sync reference</li>
                <li>• <strong>Video Displays:</strong> Locked to house sync</li>
              </ul>
              <div>
                <span style={{ color: accentColor }}>Latency Compensation: </span>
                If video processing introduces latency, audio can be delayed to match:
              </div>
              <ul className="space-y-1 ml-4">
                <li>• LA7.16i output delay: 0-1000 ms configurable</li>
                <li>• L-ISA Processor delay: Available per output</li>
                <li>• Typical video latency: 1-3 frames (16-50ms @ 60Hz)</li>
              </ul>
              <div style={{ color: '#FF4D00' }}>
                <strong>ACTION REQUIRED:</strong> Measure actual video latency from media server to display to determine if audio delay compensation is needed.
              </div>
            </div>
          </div>
        </div>

        {/* Perceptual Thresholds */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { threshold: '< 10ms', label: 'Imperceptible', color: '#39FF14' },
            { threshold: '10-20ms', label: 'Barely perceptible', color: accentColor },
            { threshold: '20-40ms', label: 'Slightly perceptible', color: accentColor },
            { threshold: '> 40ms', label: 'Noticeable delay', color: '#FF4D00' },
            { threshold: '> 100ms', label: 'Unacceptable', color: '#FF006E' },
          ].map((item, index) => (
            <div 
              key={index} 
              className="text-center p-3 border"
              style={{ borderColor }}
            >
              <div 
                className="text-sm font-display font-bold mb-1"
                style={{ color: item.color }}
              >
                {item.threshold}
              </div>
              <div className={`text-[10px] ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
