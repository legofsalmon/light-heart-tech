import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Server, Battery, Cable, Download, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServerPageProps {
  isDarkMode: boolean;
}

export default function ServerPage({ isDarkMode }: ServerPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [showPixera, setShowPixera] = useState(false);
  const [showNetwork, setShowNetwork] = useState(false);
  const [showCabling, setShowCabling] = useState(false);
  
  const bgClass = isDarkMode ? 'bg-[#0A0A0A]' : 'bg-gray-50';

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.from('.rack-unit', {
        x: -20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.03,
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
    const csvContent = `ID,Product,Type,Quantity,Rack,Price
SRV1001,APC NetShelter SX 48U,Server Rack,2,48U,€3.900
SRV1002,Pixera PX2 Octo + GUI Card,Media Server,5,2U each,€55.000
SRV1004,Netgear M4500-32C (CSM4532),100G Core Switch,2,1U each,€24.500
SRV1005,Netgear XSM4344C,PoE+ Edge Switch,2,1U each,€15.000
SRV1006,APC Smart-UPS SRT 10000VA RM,UPS,2,6U each,€10.000
SRV1007,OS2 4-core LC (50m),Single-mode Fiber,50,N/A,€150
SRV1008,Cat6a S/FTP LSZH (50m),Shielded Ethernet,75,N/A,€75
SRV1009,Cisco QSFP-100G-CWDM4-S Compatible,100G Transceiver,64,N/A,€220
SRV1010,ASUS ROG Swift OLED PG27UCDM,27" OLED Monitor,2,N/A,€949
SRV1013,Meinberg Microsync Broadcast,Sync Generator,1,1U,€25.000
TOTALS,,,,
Total Equipment Cost,,,,€443.103
Rack Capacity,53U allocated / 96U total (55% fill)
Power Draw,6.202W (~27A @ 230V) visual & networking only
Heat Load,21.161 BTU/h (visual equipment only)
UPS Protection,2× 10kVA APC Smart-UPS SRT (currently priced)
UPS Runtime,~15 minutes @ full load`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lightheart-server-specs.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';
  const borderColor = isDarkMode ? '#1F1F1F' : '#E5E5E5';
  const subTextColor = isDarkMode ? '#A0A0A0' : '#666666';

  const rackUnits = [
    { u: '42-40', label: 'FUTURE EXPANSION', type: 'empty' },
    { u: '39-37', label: 'NETGEAR M4500-32C', type: 'network', status: 'cyan' },
    { u: '36-34', label: 'NETGEAR M4500-32C', type: 'network', status: 'cyan' },
    { u: '33-30', label: 'PIXERA PX2 OCTO', type: 'server', status: 'cyan' },
    { u: '29-26', label: 'PIXERA PX2 OCTO', type: 'server', status: 'cyan' },
    { u: '25-22', label: 'MEINBERG MICROSYNC', type: 'sync', status: 'cyan' },
    { u: '21-18', label: 'APC SRT 10KVA UPS', type: 'power', status: 'lime' },
    { u: '17-14', label: 'PATCH PANELS', type: 'patch', status: 'cyan' },
    { u: '13-01', label: 'CABLE MANAGEMENT', type: 'mgmt', status: 'gray' },
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
            <span 
              className="text-xs mono tracking-wider"
              style={{ color: subTextColor }}
            >
              SECTION 10
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                SERVER ROOM
              </h1>
              <p 
                className="max-w-xl text-sm sm:text-base"
                style={{ color: subTextColor }}
              >
                The brain of the operation — media servers, network switches, power protection, 
                and physical infrastructure. Enterprise-grade equipment with redundancy.
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

        {/* Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Total Equipment Cost', value: '€443,103', icon: Server },
            { label: 'Rack Capacity Used', value: '53U / 96U', icon: Server },
            { label: 'Power Draw', value: '6,202W', icon: Cable },
            { label: 'Heat Load', value: '21,161 BTU/h', icon: Cable },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="p-3 border"
                style={{ borderColor }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-3 h-3" style={{ color: accentColor }} />
                  <span className="text-[10px] mono" style={{ color: subTextColor }}>{stat.label}</span>
                </div>
                <div 
                  className="font-display text-lg font-bold"
                  style={{ color: accentColor }}
                >
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Rack Elevation */}
          <div>
            <h3 
              className="font-display text-base font-bold mb-4"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              RACK ELEVATION — RACK 1
            </h3>
            
            <div 
              className="p-3 sm:p-4 border"
              style={{ 
                borderColor,
                backgroundColor: isDarkMode ? '#0A0A0A' : '#F5F5F5'
              }}
            >
              {/* Rack header */}
              <div 
                className="flex items-center justify-between mb-2 pb-2 text-xs mono"
                style={{ borderBottom: `1px solid ${borderColor}` }}
              >
                <span style={{ color: subTextColor }}>U-HEIGHT</span>
                <span style={{ color: subTextColor }}>EQUIPMENT</span>
                <span style={{ color: subTextColor }}>STATUS</span>
              </div>

              {/* Rack units */}
              <div className="space-y-1">
                {rackUnits.map((unit, index) => (
                  <div
                    key={index}
                    className="rack-unit flex items-center gap-2 sm:gap-3 p-2 border"
                    style={{ 
                      borderColor,
                      opacity: unit.type === 'empty' ? 0.5 : 1
                    }}
                  >
                    <div 
                      className="w-12 sm:w-16 text-xs mono"
                      style={{ color: subTextColor }}
                    >
                      U{unit.u}
                    </div>
                    <div 
                      className="flex-1 text-xs sm:text-sm truncate"
                      style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                    >
                      {unit.label}
                    </div>
                    <div className="w-6 flex justify-center">
                      {unit.status && (
                        <span 
                          className="w-2 h-2 rounded-full"
                          style={{ 
                            backgroundColor: unit.status === 'lime' ? '#39FF14' : 
                                            unit.status === 'cyan' ? '#00F0FF' : '#666666'
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div 
              className="mt-3 flex items-center justify-between text-xs mono"
              style={{ color: subTextColor }}
            >
              <span>2× APC NetShelter SX 48U</span>
              <span>600mm × 1070mm footprint</span>
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            {/* UPS Configuration */}
            <div 
              className="p-4 border"
              style={{ borderColor }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Battery className="w-5 h-5" style={{ color: '#39FF14' }} />
                <h4 
                  className="font-display text-base font-bold"
                  style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                >
                  UPS PROTECTION
                </h4>
              </div>
              
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Capacity', value: '2× 10,000 VA' },
                  { label: 'Runtime @ Full Load', value: '~15 minutes' },
                  { label: 'Configuration', value: 'N+1 Redundancy', accent: true },
                  { label: 'UPS Headroom', value: '~69%', accent: true },
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex justify-between py-1.5"
                    style={{ 
                      borderBottom: idx < 3 ? `1px solid ${borderColor}` : 'none'
                    }}
                  >
                    <span style={{ color: subTextColor }}>{item.label}</span>
                    <span style={{ color: item.accent ? '#39FF14' : (isDarkMode ? '#FFFFFF' : '#000000') }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Servers */}
            <div 
              className="p-4 border"
              style={{ borderColor }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Server className="w-5 h-5" style={{ color: accentColor }} />
                <h4 
                  className="font-display text-base font-bold"
                  style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                >
                  MEDIA SERVERS
                </h4>
              </div>
              
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Platform', value: 'Pixera PX2 Octo' },
                  { label: 'Quantity', value: '5 units (2U each)' },
                  { label: 'Network', value: '10GBase-T ports' },
                  { label: 'Total Power', value: '4,000W (5 units)', accent: true },
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex justify-between py-1.5"
                    style={{ 
                      borderBottom: idx < 3 ? `1px solid ${borderColor}` : 'none'
                    }}
                  >
                    <span style={{ color: subTextColor }}>{item.label}</span>
                    <span style={{ color: item.accent ? accentColor : (isDarkMode ? '#FFFFFF' : '#000000') }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Pixera Specs */}
        <div className="mt-8 mb-4">
          <button
            onClick={() => setShowPixera(!showPixera)}
            className="w-full flex items-center justify-between py-3 px-4 border transition-colors"
            style={{ borderColor }}
          >
            <span 
              className="font-display text-sm font-bold"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              PIXERA PX2 OCTO SPECIFICATIONS
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300`}
              style={{ 
                color: accentColor,
                transform: showPixera ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 border-l border-r border-b ${bgClass}`}
            style={{ 
              borderColor,
              maxHeight: showPixera ? '400px' : '0px'
            }}
          >
            <div className="p-4">
              <table className="w-full text-xs">
                <tbody style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Form Factor</td>
                    <td className="py-2 text-right">2U rack-mount</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Processing</td>
                    <td className="py-2 text-right">High-performance media processing engine</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Network</td>
                    <td className="py-2 text-right">10GBase-T ports</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Power Draw</td>
                    <td className="py-2 text-right">800W per unit</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Total Power</td>
                    <td className="py-2 text-right">4,000W (5 units)</td>
                  </tr>
                  <tr>
                    <td className="py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Heat Output</td>
                    <td className="py-2 text-right">13,648 BTU/h total</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Expandable Network Hardware */}
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
              NETWORK HARDWARE SPECIFICATIONS
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
              maxHeight: showNetwork ? '600px' : '0px'
            }}
          >
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-display text-sm font-bold mb-2" style={{ color: accentColor }}>CORE SWITCHES (100G SPINE)</h4>
                <ul className="space-y-1 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                  <li>• Product: Netgear M4500-32C (CSM4532)</li>
                  <li>• Quantity: 2× units</li>
                  <li>• Ports: 32 × 100G QSFP28</li>
                  <li>• Chipset: CSM4532</li>
                  <li>• Function: ST2110/IPMX backbone; server interconnect</li>
                  <li>• Power Draw: 426W per unit / 852W total</li>
                  <li>• Heat Output: 2,907 BTU/h</li>
                  <li>• Cost: €24,500</li>
                </ul>
              </div>
              <div>
                <h4 className="font-display text-sm font-bold mb-2" style={{ color: accentColor }}>EDGE/POE SWITCHES</h4>
                <ul className="space-y-1 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                  <li>• Product: Netgear XSM4344C</li>
                  <li>• Quantity: 2× units</li>
                  <li>• Ports: 44 × 10Gb PoE+ with 100G uplink</li>
                  <li>• Function: Sensor aggregation (Luxonis camera array)</li>
                  <li>• Power Draw: 413W per unit / 826W total</li>
                  <li>• Heat Output: 2,818 BTU/h</li>
                  <li>• Cost: €15,000</li>
                </ul>
              </div>
              <div>
                <h4 className="font-display text-sm font-bold mb-2" style={{ color: accentColor }}>OPTICAL TRANSCEIVERS</h4>
                <ul className="space-y-1 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                  <li>• Product: Cisco QSFP-100G-CWDM4-S Compatible</li>
                  <li>• Quantity: 64× units</li>
                  <li>• Type: 100GBASE-CWDM4 QSFP28</li>
                  <li>• Wavelength: 1310nm</li>
                  <li>• Range: 2km</li>
                  <li>• Connector: Duplex LC/UPC SMF</li>
                  <li>• Power Draw: 3.5W per unit / 224W total</li>
                  <li>• Heat Output: 764 BTU/h</li>
                  <li>• Cost: €220 per unit / €14,080 total</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Cabling */}
        <div>
          <button
            onClick={() => setShowCabling(!showCabling)}
            className="w-full flex items-center justify-between py-3 px-4 border transition-colors"
            style={{ borderColor }}
          >
            <span 
              className="font-display text-sm font-bold"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              CABLING INFRASTRUCTURE
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300`}
              style={{ 
                color: accentColor,
                transform: showCabling ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 border-l border-r border-b ${bgClass}`}
            style={{ 
              borderColor,
              maxHeight: showCabling ? '500px' : '0px'
            }}
          >
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-display text-sm font-bold mb-2" style={{ color: accentColor }}>FIBER OPTIC CABLING</h4>
                <ul className="space-y-1 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                  <li>• Product: OS2 4-core LC (50m)</li>
                  <li>• Quantity: 50× runs</li>
                  <li>• Type: OS2 single-mode</li>
                  <li>• Core Count: 4-core</li>
                  <li>• Connector: LC duplex</li>
                  <li>• Purpose: High-speed backbone with redundant cores</li>
                  <li>• Future Capacity: Supports 100G sensor aggregation</li>
                  <li>• Cost: €150 per run</li>
                </ul>
              </div>
              <div>
                <h4 className="font-display text-sm font-bold mb-2" style={{ color: accentColor }}>COPPER CABLING</h4>
                <ul className="space-y-1 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                  <li>• Product: Cat6a S/FTP LSZH (50m)</li>
                  <li>• Quantity: 75× runs</li>
                  <li>• Category: Cat6a</li>
                  <li>• Shielding: S/FTP (screened foiled twisted pair)</li>
                  <li>• Jacket: LSZH (low smoke zero halogen)</li>
                  <li>• Purpose: Management network and control signals</li>
                  <li>• Cost: €75 per run</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
