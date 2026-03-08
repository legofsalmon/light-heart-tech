import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Server, Cable, Projector, Download, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SignalPageProps {
  isDarkMode: boolean;
}

export default function SignalPage({ isDarkMode }: SignalPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [showInfrastructure, setShowInfrastructure] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.from('.signal-node', {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out',
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
    const csvContent = `Specification,Option 1 HDMI Fiber,Option 2 DP Fiber,Option 3 HDBaseT 3.0
nTechnology,HDMI 2.0 → SM Fiber,DisplayPort 1.4 → SM Fiber,DP→HDMI→HDBaseT 3.0
Hardware,Kramer 675R/T + DP→HDMI,DVIGear DVI-7380 (OS2 LC),Barco R9803120 cards + transmitters
4K Channels,22,22,22
Cost per 4K Ch.,€1.423,€1.048,€3.364
4K Transport Subtotal,€31.306,€23.056,€74.008
Import/Duty/VAT (~27%),~€8.000,~€6.458,~€20.000
Delivered 4K Cost,~€39.306,€29.514,~€94.000
2K Transport (Floor),€15.000,€15.000,€15.000
TOTAL,~€54.300,€44.514,~€109.000
Bandwidth,18 Gbps (at ceiling),32.4 Gbps (headroom),18 Gbps
Points of Failure,22 active adapters,0 (native end-to-end),22 proprietary cards
Status,Rejected,Specified,Rejected for 4K Walls`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lightheart-signal-specs.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';
  const borderColor = isDarkMode ? '#1F1F1F' : '#E5E5E5';
  const bgClass = isDarkMode ? 'bg-[#0A0A0A]' : 'bg-gray-50';

  const signalPath = [
    { id: 'content', label: 'CONTENT', icon: Monitor, desc: 'Pixera Media Server' },
    { id: 'encoder', label: 'SDVOE ENC', icon: Server, desc: 'DVIGear DVI-7380' },
    { id: 'fiber', label: 'FIBER', icon: Cable, desc: 'OS2 Single Mode' },
    { id: 'decoder', label: 'DECODER', icon: Server, desc: 'DVIGear DVI-7380' },
    { id: 'projector', label: 'PROJECTOR', icon: Projector, desc: 'Barco I600-4K10' },
  ];

  return (
    <div ref={pageRef} className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className={`text-xs mono tracking-wider ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
              SECTION 04
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                SIGNAL TRANSPORT
              </h1>
              <p 
                className="max-w-xl text-sm sm:text-base"
                style={{ color: isDarkMode ? '#A0A0A0]' : '#666666' }}
              >
                How video signals travel from servers to projectors. The 4:4:4 chroma specification 
                for generative digital art requires 15.9 Gbps per channel uncompressed bandwidth.
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

        {/* Signal Flow Diagram */}
        <div 
          className={`border p-6 sm:p-8 mb-8 ${bgClass}`}
          style={{ borderColor }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            {signalPath.map((node) => {
              const Icon = node.icon;
              return (
                <div key={node.id} className="signal-node flex flex-col items-center w-full md:w-auto">
                  <div 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 flex items-center justify-center mb-3"
                    style={{ 
                      borderColor: accentColor,
                      backgroundColor: isDarkMode ? '#0A0A0A' : '#FFFFFF'
                    }}
                  >
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: accentColor }} />
                  </div>
                  <div className="text-center">
                    <div 
                      className="text-xs mono tracking-wider mb-1"
                      style={{ color: accentColor }}
                    >
                      {node.label}
                    </div>
                    <div className={`text-[10px] ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                      {node.desc}
                    </div>
                  </div>
                  <span 
                    className="w-2 h-2 rounded-full mt-2"
                    style={{ backgroundColor: accentColor }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div 
            className={`border p-4 ${bgClass}`}
            style={{ borderColor }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                SPECIFICATION
              </span>
              <span 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            </div>
            <div 
              className="font-display text-2xl font-bold mb-1"
              style={{ color: accentColor }}
            >
              4:4:4 @ 60Hz
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
              16:10 aspect ratio
            </div>
          </div>

          <div 
            className={`border p-4 ${bgClass}`}
            style={{ borderColor }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                BANDWIDTH
              </span>
              <span 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            </div>
            <div 
              className="font-display text-2xl font-bold mb-1"
              style={{ color: accentColor }}
            >
              15.9 Gbps
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
              Per channel uncompressed
            </div>
          </div>

          <div 
            className={`border p-4 ${bgClass}`}
            style={{ borderColor }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                TRANSPORT
              </span>
              <span 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            </div>
            <div 
              className="font-display text-2xl font-bold mb-1"
              style={{ color: accentColor }}
            >
              DP 1.4
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
              Over OS2 fiber
            </div>
          </div>
        </div>

        {/* Selected Solution */}
        <div 
          className={`border p-5 sm:p-6 mb-6 ${bgClass}`}
          style={{ borderColor }}
        >
          <h3 
            className="font-display text-base font-bold mb-4"
            style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
          >
            SELECTED SOLUTION — DVIGEAR DVI-7380
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Native Protocol', value: 'DP 1.4a' },
              { label: 'Bandwidth', value: '32.4 Gbps' },
              { label: 'Points of Failure', value: '0 (end-to-end)' },
              { label: 'Immunity', value: 'Galvanic Isolation' },
            ].map((item, index) => (
              <div 
                key={index} 
                className="text-center p-3 border"
                style={{ borderColor }}
              >
                <div className={`text-xs mono mb-1 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                  {item.label}
                </div>
                <div 
                  className="font-medium text-sm"
                  style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable Signal Transport Comparison */}
        <div className="mb-4">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="w-full flex items-center justify-between py-3 px-4 border transition-colors"
            style={{ borderColor }}
          >
            <span 
              className="font-display text-sm font-bold"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              SIGNAL TRANSPORT COMPARISON
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300`}
              style={{ 
                color: accentColor,
                transform: showComparison ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 border-l border-r border-b ${bgClass}`}
            style={{ 
              borderColor,
              maxHeight: showComparison ? '800px' : '0px'
            }}
          >
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <th className="text-left py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Specification</th>
                    <th className="text-center py-2 px-2" style={{ color: '#FF4D00' }}>Option 1: HDMI Fiber</th>
                    <th className="text-center py-2 px-2" style={{ color: '#39FF14' }}>Option 2: DP Fiber</th>
                    <th className="text-center py-2 px-2" style={{ color: '#FF4D00' }}>Option 3: HDBaseT 3.0</th>
                  </tr>
                </thead>
                <tbody style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Technology</td>
                    <td className="text-center py-2 px-2">HDMI 2.0 → SM Fiber</td>
                    <td className="text-center py-2 px-2">DisplayPort 1.4 → SM Fiber</td>
                    <td className="text-center py-2 px-2">DP→HDMI→HDBaseT 3.0</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Hardware</td>
                    <td className="text-center py-2 px-2">Kramer 675R/T + DP→HDMI</td>
                    <td className="text-center py-2 px-2">DVIGear DVI-7380 (OS2 LC)</td>
                    <td className="text-center py-2 px-2">Barco R9803120 cards</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>4K Channels</td>
                    <td className="text-center py-2 px-2">22</td>
                    <td className="text-center py-2 px-2">22</td>
                    <td className="text-center py-2 px-2">22</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Cost per 4K Ch.</td>
                    <td className="text-center py-2 px-2">€1,423</td>
                    <td className="text-center py-2 px-2" style={{ color: '#39FF14' }}>€1,048</td>
                    <td className="text-center py-2 px-2">€3,364</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>4K Transport Subtotal</td>
                    <td className="text-center py-2 px-2">€31,306</td>
                    <td className="text-center py-2 px-2" style={{ color: '#39FF14' }}>€23,056</td>
                    <td className="text-center py-2 px-2">€74,008</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Import/Duty/VAT (~27%)</td>
                    <td className="text-center py-2 px-2">~€8,000</td>
                    <td className="text-center py-2 px-2" style={{ color: '#39FF14' }}>~€6,458</td>
                    <td className="text-center py-2 px-2">~€20,000</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Delivered 4K Cost</td>
                    <td className="text-center py-2 px-2">~€39,306</td>
                    <td className="text-center py-2 px-2" style={{ color: '#39FF14' }}>€29,514</td>
                    <td className="text-center py-2 px-2">~€94,000</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>2K Transport (Floor)</td>
                    <td className="text-center py-2 px-2">€15,000</td>
                    <td className="text-center py-2 px-2">€15,000</td>
                    <td className="text-center py-2 px-2">€15,000</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>TOTAL</td>
                    <td className="text-center py-2 px-2">~€54,300</td>
                    <td className="text-center py-2 px-2" style={{ color: '#39FF14' }}>€44,514</td>
                    <td className="text-center py-2 px-2">~€109,000</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Bandwidth</td>
                    <td className="text-center py-2 px-2">18 Gbps (at ceiling)</td>
                    <td className="text-center py-2 px-2" style={{ color: '#39FF14' }}>32.4 Gbps (headroom)</td>
                    <td className="text-center py-2 px-2">18 Gbps</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Points of Failure</td>
                    <td className="text-center py-2 px-2">22 active adapters</td>
                    <td className="text-center py-2 px-2" style={{ color: '#39FF14' }}>0 (native end-to-end)</td>
                    <td className="text-center py-2 px-2">22 proprietary cards</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Status</td>
                    <td className="text-center py-2 px-2" style={{ color: '#FF4D00' }}>Rejected</td>
                    <td className="text-center py-2 px-2" style={{ color: '#39FF14' }}>Specified</td>
                    <td className="text-center py-2 px-2" style={{ color: '#FF4D00' }}>Rejected for 4K Walls</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Expandable Infrastructure Specification */}
        <div>
          <button
            onClick={() => setShowInfrastructure(!showInfrastructure)}
            className="w-full flex items-center justify-between py-3 px-4 border transition-colors"
            style={{ borderColor }}
          >
            <span 
              className="font-display text-sm font-bold"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              INFRASTRUCTURE SPECIFICATION
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300`}
              style={{ 
                color: accentColor,
                transform: showInfrastructure ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 border-l border-r border-b ${bgClass}`}
            style={{ 
              borderColor,
              maxHeight: showInfrastructure ? '500px' : '0px'
            }}
          >
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border p-3" style={{ borderColor }}>
                  <div className="text-xs mono mb-2" style={{ color: accentColor }}>FIBER BACKBONE</div>
                  <div className="text-sm mb-1" style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>50× OS2 Single-Mode 4-core LC</div>
                  <div className="text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Redundant pairs, 50m runs to all projection locations</div>
                </div>
                <div className="border p-3" style={{ borderColor }}>
                  <div className="text-xs mono mb-2" style={{ color: accentColor }}>COPPER DISTRIBUTION</div>
                  <div className="text-sm mb-1" style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>75× Cat6a S/FTP LSZH</div>
                  <div className="text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>50m runs for control and management networks</div>
                </div>
              </div>
              <div className="text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                <span style={{ color: accentColor }}>Rationale: </span>
                "Install both fiber/copper to each location, then price up and offer 2 solutions... 
                at least the hard labour is done in 1 go with future proofed options" (Krisjanis, 25/02/26)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
