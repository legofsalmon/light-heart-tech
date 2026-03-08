import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Server, Wifi, Volume2, Eye, Download, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface NetworkPageProps {
  isDarkMode: boolean;
}

export default function NetworkPage({ isDarkMode }: NetworkPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showAudioBridge, setShowAudioBridge] = useState(false);
  const [showSegregation, setShowSegregation] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.from('.network-card', {
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
    const csvContent = `Network,Layer,Hardware,Protocol,Function
Video Transport,Physical (Point-to-Point),DVIGear DVI-7380 over OS2 fiber,DisplayPort 1.4 baseband,22× 4K uncompressed streams (15.9 Gbps each)
Sensor Aggregation,Layer 3 (IP),2× Netgear XSM4344C (44× 10Gb PoE+ with 100G uplinks),TCP/IP,Luxonis camera array (2.5Gbps per unit)
Audio Control,Layer 2 (AVB),4× L-Acoustics LS10 UK (10-port AVB switches),Milan-AVB (IEEE 802.1),L-ISA object-based audio (96kHz/64ch)
Server Interconnect,Layer 3 (Multicast),2× Netgear M4500-32C (100G spine),IGMP Snooping,Pixera cluster sync file distribution
Management,Layer 3 (IP),Isolated VLAN,OSC PTP TCP/IP,QLab control systems monitoring
TOTALS,,,,
Fiber Infrastructure,50× OS2 4-core LC runs (200 fiber strands total),,,
Copper Infrastructure,75× Cat6a S/FTP runs,,,
Switch Ports,88× 10Gb PoE+ 64× 100G QSFP28,,,
AVB Switches,4× L-Acoustics LS10 (Primary/Secondary pairs),,,
Protocols,DP 1.4 (video) Milan-AVB (audio) TCP/IP (sensors/control),,,
Optical Transceivers,64× QSFP-100G-CWDM4-S modules (€14.080 total),,,
Audio Bridging Architecture B (Preferred),RME HDSPe AoX-M PCIe (in Pixera),<0.15ms,96kHz/64ch,Eliminates Dante layer entirely`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lightheart-network-specs.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';
  const borderColor = isDarkMode ? '#1F1F1F' : '#E5E5E5';
  const bgClass = isDarkMode ? 'bg-[#0A0A0A]' : 'bg-gray-50';

  const networkLayers = [
    {
      name: 'Video Transport',
      layer: 'Physical (Point-to-Point)',
      hardware: 'DVIGear DVI-7380 over OS2 fiber',
      protocol: 'DisplayPort 1.4 baseband',
      function: '22× 4K uncompressed streams (15.9 Gbps each)',
      icon: Server,
    },
    {
      name: 'Sensor Aggregation',
      layer: 'Layer 3 (IP)',
      hardware: '2× Netgear XSM4344C (44× 10Gb PoE+)',
      protocol: 'TCP/IP',
      function: 'Luxonis camera array (2.5Gbps per unit)',
      icon: Eye,
    },
    {
      name: 'Audio Control',
      layer: 'Layer 2 (AVB)',
      hardware: '4× L-Acoustics LS10 UK (10-port AVB)',
      protocol: 'Milan-AVB (IEEE 802.1)',
      function: 'L-ISA object-based audio (96kHz/64ch)',
      icon: Volume2,
    },
    {
      name: 'Server Interconnect',
      layer: 'Layer 3 (Multicast)',
      hardware: '2× Netgear M4500-32C (100G spine)',
      protocol: 'IGMP Snooping',
      function: 'Pixera cluster sync, file distribution',
      icon: Server,
    },
    {
      name: 'Management',
      layer: 'Layer 3 (IP)',
      hardware: 'Isolated VLAN',
      protocol: 'OSC, PTP, TCP/IP',
      function: 'QLab, control systems, monitoring',
      icon: Wifi,
    },
  ];

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
              SECTION 07
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                NETWORK
              </h1>
              <p 
                className="max-w-xl text-sm sm:text-base"
                style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}
              >
                Five distinct physical/logical networks to prevent clock jitter, packet collision, 
                and protocol interference. Segregated traffic for maximum reliability.
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

        {/* Network Layers */}
        <div className="space-y-3 mb-6">
          {networkLayers.map((layer, index) => {
            const Icon = layer.icon;
            return (
              <div 
                key={index} 
                className="network-card border p-4"
                style={{ borderColor }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div 
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: isDarkMode ? '#0A0A0A' : '#F5F5F5' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: accentColor }} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                      <h3 
                        className="font-display text-sm font-bold"
                        style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                      >
                        {layer.name}
                      </h3>
                      <span 
                        className="text-xs mono"
                        style={{ color: accentColor }}
                      >
                        {layer.layer}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                      <div>
                        <span className={isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}>Hardware: </span>
                        <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>{layer.hardware}</span>
                      </div>
                      <div>
                        <span className={isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}>Protocol: </span>
                        <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>{layer.protocol}</span>
                      </div>
                    </div>
                    
                    <div className="mt-1 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                      {layer.function}
                    </div>
                  </div>
                  
                  <span 
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: accentColor }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Network Isolation Note */}
        <div 
          className={`border p-4 mb-6 ${bgClass}`}
          style={{ borderColor: '#FF006E' }}
        >
          <div className="flex items-start gap-3">
            <div 
              className="w-10 h-10 flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(255, 0, 110, 0.1)' }}
            >
              <Shield className="w-5 h-5" style={{ color: '#FF006E' }} />
            </div>
            <div>
              <h3 
                className="font-display text-sm font-bold mb-1"
                style={{ color: '#FF006E' }}
              >
                CRITICAL: Network Isolation Required
              </h3>
              <p 
                className="text-sm"
                style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}
              >
                Video transport and AVB audio operate on separate broadcast domains. 
                Sensor network is physically separated at Layer 2 to prevent interference.
              </p>
            </div>
          </div>
        </div>

        {/* Expandable Infrastructure Summary */}
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
              INFRASTRUCTURE SUMMARY
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
              {[
                { label: 'Fiber Infrastructure', value: '50× OS2 4-core LC', detail: '200 fiber strands total' },
                { label: 'Copper Infrastructure', value: '75× Cat6a S/FTP', detail: 'Shielded twisted pair' },
                { label: 'Switch Ports', value: '88× 10Gb PoE+', detail: '64× 100G QSFP28' },
                { label: 'AVB Switches', value: '4× LS10', detail: 'Primary/Secondary pairs' },
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
                    className="font-display text-lg font-bold mb-1"
                    style={{ color: accentColor }}
                  >
                    {item.value}
                  </div>
                  <div className={`text-[10px] ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expandable Audio Bridging */}
        <div className="mb-4">
          <button
            onClick={() => setShowAudioBridge(!showAudioBridge)}
            className="w-full flex items-center justify-between py-3 px-4 border transition-colors"
            style={{ borderColor }}
          >
            <span 
              className="font-display text-sm font-bold"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              AUDIO-VISUAL BRIDGING ARCHITECTURES
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300`}
              style={{ 
                color: accentColor,
                transform: showAudioBridge ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 border-l border-r border-b ${bgClass}`}
            style={{ 
              borderColor,
              maxHeight: showAudioBridge ? '600px' : '0px'
            }}
          >
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <th className="text-left py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Architecture</th>
                    <th className="text-left py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Hardware</th>
                    <th className="text-left py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Latency</th>
                    <th className="text-left py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Sample Rate</th>
                    <th className="text-left py-2 px-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Status</th>
                  </tr>
                </thead>
                <tbody style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 px-2 font-medium">A: Hardware Bridge</td>
                    <td className="py-2 px-2">DirectOut PRODIGY.MP + DANTE.MILAN.SRC.IO</td>
                    <td className="py-2 px-2">~1ms (HD SRC)</td>
                    <td className="py-2 px-2">96kHz/32ch per module</td>
                    <td className="py-2 px-2" style={{ color: '#FF4D00' }}>High redundancy, high cost</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 px-2 font-medium" style={{ color: '#39FF14' }}>B: Native AVB (Preferred)</td>
                    <td className="py-2 px-2" style={{ color: '#39FF14' }}>RME HDSPe AoX-M PCIe (in Pixera)</td>
                    <td className="py-2 px-2" style={{ color: '#39FF14' }}>&lt;0.15ms</td>
                    <td className="py-2 px-2" style={{ color: '#39FF14' }}>96kHz/64ch</td>
                    <td className="py-2 px-2" style={{ color: '#39FF14' }}>Preferred - eliminates Dante layer</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 font-medium">C: MADI Bridge</td>
                    <td className="py-2 px-2">RME HDSPe MADI → L-Acoustics LC16D</td>
                    <td className="py-2 px-2">Low</td>
                    <td className="py-2 px-2">96kHz/32ch</td>
                    <td className="py-2 px-2">Legacy compatibility, no SRC</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                <span style={{ color: accentColor }}>Recommendation: </span>
                Architecture B (RME HDSPe AoX-M) – installs directly in Pixera server, outputs native Milan-AVB 
                via certified LS10 switches, bypasses Dante protocol translation, lowest latency, unified gPTP clock domain.
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Segregation Rules */}
        <div>
          <button
            onClick={() => setShowSegregation(!showSegregation)}
            className="w-full flex items-center justify-between py-3 px-4 border transition-colors"
            style={{ borderColor: '#FF006E' }}
          >
            <span 
              className="font-display text-sm font-bold"
              style={{ color: '#FF006E' }}
            >
              CRITICAL SEGREGATION RULES
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300`}
              style={{ 
                color: '#FF006E',
                transform: showSegregation ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 border-l border-r border-b ${bgClass}`}
            style={{ 
              borderColor: '#FF006E',
              maxHeight: showSegregation ? '400px' : '0px'
            }}
          >
            <div className="p-4 space-y-2 text-xs" style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
              <div className="flex items-start gap-2">
                <span style={{ color: '#FF006E' }}>1.</span>
                <span><strong>AVB Isolation:</strong> Milan traffic (Layer 2 MAC-based) must not traverse standard IP routers; requires certified AVB switches (LS10) with Stream Reservation Protocol (SRP)</span>
              </div>
              <div className="flex items-start gap-2">
                <span style={{ color: '#FF006E' }}>2.</span>
                <span><strong>Dante/AVB Separation:</strong> If Dante bridging implemented (Architecture A only), physically separate switch fabrics or strictly isolated VLANs required</span>
              </div>
              <div className="flex items-start gap-2">
                <span style={{ color: '#FF006E' }}>3.</span>
                <span><strong>Pixera Internal:</strong> Server cluster multicast traffic (5GB/s+ internal file distribution) isolated on dedicated unmanaged switches with IGMP Snooping</span>
              </div>
              <div className="flex items-start gap-2">
                <span style={{ color: '#FF006E' }}>4.</span>
                <span><strong>Sensor/Video Isolation:</strong> Bursty TCP/IP camera traffic physically separated from deterministic AVB streams to prevent queue congestion and clock jitter</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
