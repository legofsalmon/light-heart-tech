import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Thermometer, Wifi, AlertTriangle, Download, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SensorsPageProps {
  isDarkMode: boolean;
}

export default function SensorsPage({ isDarkMode }: SensorsPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [showSpecs, setShowSpecs] = useState(false);
  const [showNetwork, setShowNetwork] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.from('.sensor-info', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: page,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }, page);

    return () => ctx.revert();
  }, []);

  const handleDownload = () => {
    // EXACT DATA FROM PDF - COPIED WITHOUT MODIFICATION
    const csvContent = `Specification,Value
Model,Luxonis OAK 4 D Pro Wide (FF)
Optics,120° Horizontal FOV
Coverage Width,3.4m @ 1m standoff distance
Imaging,Onboard depth map generation and neural inference
Interface,PoE+ (IEEE 802.3at)
Network,2.5GbE Ethernet port
Physical,0.3 kg per unit
Room 1 Quantity,28 units
Room 1 Cost,€32.116 (€1.147/unit)
Architectural Maximum,44 units discussed
Rigging Weight (28×),8.4 kg total
Power Draw (28×),700W (3.1A @ 230V)
Thermal Output (28×),2.388 BTU/h
Network Bandwidth (28×),70 Gbps theoretical aggregate
Status,Procurement Phase - 28 units specified for Room 1`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lightheart-sensor-specs.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';
  const borderColor = isDarkMode ? '#1F1F1F' : '#E5E5E5';
  const bgClass = isDarkMode ? 'bg-[#0A0A0A]' : 'bg-gray-50';

  return (
    <div ref={pageRef} className="page-enter min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className={`text-xs mono tracking-wider ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
              SECTION 06
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                SENSORS
              </h1>
              <p 
                className="max-w-xl text-sm sm:text-base"
                style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}
              >
                Depth-sensing camera system for motion tracking and interactive experiences. 
                44 depth-sensing cameras that can track movement, detect presence, and trigger responsive content.
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

        {/* Hardware Specs */}
        <div 
          className={`sensor-info border p-5 sm:p-6 mb-6 ${bgClass}`}
          style={{ borderColor }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div 
              className="w-14 h-14 flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: isDarkMode ? '#1F1F1F' : '#F5F5F5' }}
            >
              <Camera className="w-7 h-7" style={{ color: accentColor }} />
            </div>
            <div>
              <div className="text-xs mono mb-1" style={{ color: accentColor }}>
                LUXONIS — OAK 4 D PRO
              </div>
              <h2 
                className="font-display text-xl sm:text-2xl font-bold"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                OAK 4 D Pro Wide (FF)
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'Field of View', value: '120° Horizontal' },
              { label: 'Coverage Width', value: '3.4m @ 1m standoff' },
              { label: 'Imaging', value: 'Onboard depth map generation' },
              { label: 'Interface', value: 'PoE+ (IEEE 802.3at)' },
              { label: 'Network', value: '2.5GbE Ethernet' },
              { label: 'Weight', value: '0.3 kg per unit' },
            ].map((spec, index) => (
              <div 
                key={index} 
                className="border-l-2 pl-3"
                style={{ borderColor }}
              >
                <div className={`text-xs mono mb-1 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                  {spec.label}
                </div>
                <div 
                  className="text-sm"
                  style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                >
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quantity & Configuration */}
        <div 
          className={`sensor-info border p-5 mb-6 ${bgClass}`}
          style={{ borderColor }}
        >
          <h3 
            className="font-display text-base font-bold mb-4"
            style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
          >
            QUANTITY & CONFIGURATION
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 border" style={{ borderColor }}>
              <div 
                className="font-display text-3xl font-bold mb-1"
                style={{ color: accentColor }}
              >
                28
              </div>
              <div className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                ROOM 1 (SPECIFIED)
              </div>
            </div>
            <div className="text-center p-4 border" style={{ borderColor }}>
              <div 
                className="font-display text-3xl font-bold mb-1"
                style={{ color: '#FF4D00' }}
              >
                TBC
              </div>
              <div className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                ROOM 2 (PENDING)
              </div>
            </div>
            <div className="text-center p-4 border" style={{ borderColor }}>
              <div 
                className="font-display text-3xl font-bold mb-1"
                style={{ color: accentColor }}
              >
                44
              </div>
              <div className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                MAX (DISCUSSED)
              </div>
            </div>
            <div className="text-center p-4 border" style={{ borderColor }}>
              <div 
                className="font-display text-3xl font-bold mb-1"
                style={{ color: accentColor }}
              >
                €32,116
              </div>
              <div className={`text-xs mono ${isDarkMode ? '#A0A0A0' : 'text-gray-500'}`}>
                ROOM 1 COST
              </div>
            </div>
          </div>
        </div>

        {/* Network & Thermal Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div 
            className={`sensor-info border p-5 ${bgClass}`}
            style={{ borderColor }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Wifi className="w-5 h-5" style={{ color: accentColor }} />
              <span className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                NETWORK REQUIREMENTS
              </span>
            </div>
            <div 
              className="font-display text-3xl font-bold mb-1"
              style={{ color: accentColor }}
            >
              70 Gbps
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
              Theoretical aggregate bandwidth (28× @ 2.5 Gbps)
            </div>
          </div>

          <div 
            className={`sensor-info border p-5 ${bgClass}`}
            style={{ borderColor: '#FF4D00' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Thermometer className="w-5 h-5" style={{ color: '#FF4D00' }} />
              <span className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                THERMAL OUTPUT
              </span>
            </div>
            <div 
              className="font-display text-3xl font-bold mb-1"
              style={{ color: '#FF4D00' }}
            >
              2,388 BTU/h
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
              Total heat output at gallery level (not server room)
            </div>
          </div>
        </div>

        {/* Expandable Detailed Specs */}
        <div className="mb-4">
          <button
            onClick={() => setShowSpecs(!showSpecs)}
            className="w-full flex items-center justify-between py-3 px-4 border transition-colors"
            style={{ borderColor }}
          >
            <span 
              className="font-display text-sm font-bold"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              DETAILED SPECIFICATIONS
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300`}
              style={{ 
                color: accentColor,
                transform: showSpecs ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 border-l border-r border-b ${bgClass}`}
            style={{ 
              borderColor,
              maxHeight: showSpecs ? '500px' : '0px'
            }}
          >
            <div className="p-4">
              <table className="w-full text-xs">
                <tbody style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Procurement Cost</td>
                    <td className="py-2 text-right">€1,147 per unit / €32,116 total (Room 1)</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Rigging Weight</td>
                    <td className="py-2 text-right">0.3 kg per unit / 8.4 kg total (28× Room 1)</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Power Draw</td>
                    <td className="py-2 text-right">25W (PoE+) per unit / 700W total (3.1A @ 230V)</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Thermal Output</td>
                    <td className="py-2 text-right">85.3 BTU/h per unit / 2,388 BTU/h total (gallery level)</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Network Bandwidth</td>
                    <td className="py-2 text-right">2.5 Gbps per unit / 70 Gbps theoretical aggregate</td>
                  </tr>
                  <tr>
                    <td className="py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Status</td>
                    <td className="py-2 text-right">28 units specified for Room 1 installation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Expandable Network Architecture */}
        <div className="mb-4">
          <button
            onClick={() => setShowNetwork(!showNetwork)}
            className="w-full flex items-center justify-between py-3 px-4 border transition-colors"
            style={{ borderColor }}
          >
            <span 
              className="font-display text-sm font-bold"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              NETWORK ARCHITECTURE INTEGRATION
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300`}
              style={{ 
                color: accentColor,
                transform: showNetwork ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 border-l border-r border-b ${bgClass}`}
            style={{ 
              borderColor,
              maxHeight: showNetwork ? '500px' : '0px'
            }}
          >
            <div className="p-4 space-y-3 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
              <div>
                <span style={{ color: accentColor }}>Aggregation: </span>
                2× Netgear XSM4344C provide 88× 10Gb PoE+ ports total (100G uplink capacity per switch)
              </div>
              <div>
                <span style={{ color: accentColor }}>Bandwidth Constraint: </span>
                28× cameras @ 2.5 Gbps = 70 Gbps theoretical maximum vs. 5× Pixera servers @ 10 Gbps = 50 Gbps aggregate ingress capacity
              </div>
              <div>
                <span style={{ color: accentColor }}>Mitigation Strategy: </span>
                Cameras utilize onboard video processing (depth maps/tracking metadata only) per Colly technical confirmation (04/03/26); raw 2.5 Gbps video streams not transmitted to servers continuously
              </div>
              <div>
                <span style={{ color: accentColor }}>Cabling: </span>
                Home-run Cat6a to server room PoE switches (part of 75× Cat6a infrastructure bundle); no local power supplies required
              </div>
            </div>
          </div>
        </div>

        {/* HVAC Note */}
        <div 
          className={`border p-4 ${bgClass}`}
          style={{ borderColor: '#FF4D00' }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#FF4D00' }} />
            <div>
              <h3 
                className="font-display text-sm font-bold mb-1"
                style={{ color: '#FF4D00' }}
              >
                HVAC IMPLICATIONS
              </h3>
              <p 
                className="text-xs"
                style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}
              >
                Heat dissipation (2,388 BTU/h) occurs at gallery level via camera enclosures, 
                not in server room. Contributes to general gallery thermal load but requires 
                no dedicated server room cooling capacity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
