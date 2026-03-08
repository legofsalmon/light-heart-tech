import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Video, 
  Volume2, 
  Server, 
  Network, 
  Camera, 
  Cable,
  CheckCircle2,
  Clock,
  Download,
  ChevronDown
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface VendorPageProps {
  isDarkMode: boolean;
}

export default function VendorPage({ isDarkMode }: VendorPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [showNextActions, setShowNextActions] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.from('.vendor-card', {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
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
    const csvContent = `Vendor,Category,Status,Products,Contact,Quote Ref,Quote Expiry,Cost
Barco,Projection Systems,Quoting,I600-4K10; I600-4K8; G50-W8; ILD 0.37 UST Lens,WIP,,,TBC
L-Acoustics,Spatial Audio,Quoted,X8i; X6i; SYVA SUB; LA7.16i; L-ISA Processor II,Audiotek Ltd - Tom Macklin,QU-20070/1,27 Mar 2026,€401.586
Pixera,Media Servers,Confirmed,PX2 Octo; GUI Card,AV Stumpfl,,,€275.000
Netgear,Network Infrastructure,Confirmed,M4500-32C; XSM4344C; QSFP Transceivers,Direct,,,€93.080
Luxonis,Sensors & Tracking,Evaluating,OAK 4 D Pro Wide,Direct,,,TBC
DVIGear,Signal Transport,Evaluating,DVI-7380 DP Fiber Extenders,Direct,,,TBC
Meinberg,Sync Generator,TBC,Microsync Broadcast,Direct,,,€25.000 (est.)
Smarter Surfaces,Surface Treatment,Specified,Smart Ultra High Contrast; Smart Floor; Primer,Direct,,,€29.353
Goo Systems,Surface Treatment,Quoted,Goo V2 Max Contrast; Acrylic Premier; Rear Projection,NexNix Ltd,QU-0932,3 Apr 2026,~€23.240
TOTAL CONFIRMED,,,,,,,€368.080
TOTAL QUOTED,,,,,,,€424.826
TOTAL TBC/EVALUATING,,,,,,,TBC`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lightheart-vendor-specs.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';
  const borderColor = isDarkMode ? '#1F1F1F' : '#E5E5E5';
  const subTextColor = isDarkMode ? '#A0A0A0' : '#666666';

  const vendors = [
    {
      name: 'BARCO',
      category: 'Projection Systems',
      status: 'quoting',
      products: ['I600-4K10', 'I600-4K8', 'G50-W8', 'ILD 0.37 UST Lens'],
      contact: 'WIP',
      icon: Video,
      color: 'cyan',
    },
    {
      name: 'L-ACOUSTICS',
      category: 'Spatial Audio',
      status: 'quoted',
      products: ['X8i', 'X6i', 'SYVA SUB', 'LA7.16i', 'L-ISA Processor II'],
      contact: 'Audiotek Ltd — Tom Macklin',
      quoteRef: 'QU-20070/1',
      quoteExpiry: '27 Mar 2026',
      cost: '€401,586',
      icon: Volume2,
      color: 'cyan',
    },
    {
      name: 'PIXERA',
      category: 'Media Servers',
      status: 'confirmed',
      products: ['PX2 Octo', 'GUI Card'],
      contact: 'AV Stumpfl',
      cost: '€275,000',
      icon: Server,
      color: 'lime',
    },
    {
      name: 'NETGEAR',
      category: 'Network Infrastructure',
      status: 'confirmed',
      products: ['M4500-32C', 'XSM4344C', 'QSFP Transceivers'],
      cost: '€93,080',
      icon: Network,
      color: 'lime',
    },
    {
      name: 'LUXONIS',
      category: 'Sensors & Tracking',
      status: 'evaluating',
      products: ['OAK 4 D Pro Wide'],
      contact: 'Under evaluation',
      icon: Camera,
      color: 'orange',
    },
    {
      name: 'DVIGEAR',
      category: 'Signal Transport',
      status: 'evaluating',
      products: ['DVI-7380 DP Fiber Extenders'],
      contact: 'Under evaluation',
      icon: Cable,
      color: 'orange',
    },
  ];

  const statusConfig = {
    confirmed: { label: 'CONFIRMED', color: 'lime', icon: CheckCircle2 },
    quoted: { label: 'QUOTED', color: 'cyan', icon: Clock },
    quoting: { label: 'QUOTING', color: 'cyan', icon: Clock },
    evaluating: { label: 'EVALUATING', color: 'orange', icon: Clock },
  };

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
              SECTION 12
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                CONTRACTORS / VENDORS
              </h1>
              <p 
                className="max-w-xl text-sm sm:text-base"
                style={{ color: subTextColor }}
              >
                Complete supplier directory — who supplies what, current pricing status, 
                contact information, and what remains to be confirmed.
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

        {/* Status Summary */}
        <div 
          className="p-4 mb-6 sm:mb-8 border"
          style={{ borderColor }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { label: 'Confirmed', count: 2, color: '#39FF14' },
              { label: 'Quoted', count: 1, color: '#00F0FF' },
              { label: 'Quoting', count: 1, color: '#00F0FF' },
              { label: 'Evaluating', count: 2, color: '#FF4D00' },
            ].map((item, index) => (
              <div 
                key={index} 
                className="p-3 border"
                style={{ borderColor }}
              >
                <div 
                  className="font-display text-2xl font-bold mb-1"
                  style={{ color: item.color }}
                >
                  {item.count}
                </div>
                <div className="text-xs mono" style={{ color: subTextColor }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vendor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {vendors.map((vendor, index) => {
            const Icon = vendor.icon;
            const status = statusConfig[vendor.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            const vendorColor = vendor.color === 'cyan' ? '#00F0FF' : '#39FF14';
            const statusColor = status.color === 'lime' ? '#39FF14' : status.color === 'cyan' ? '#00F0FF' : '#FF4D00';
            
            return (
              <div 
                key={index} 
                className="vendor-card p-5 border"
                style={{ borderColor }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-12 h-12 flex items-center justify-center"
                    style={{ backgroundColor: isDarkMode ? '#1F1F1F' : '#F5F5F5' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: vendorColor }} />
                  </div>
                  <div 
                    className="flex items-center gap-1.5 px-2 py-1 border"
                    style={{ 
                      borderColor: `${statusColor}40`,
                      backgroundColor: `${statusColor}10`
                    }}
                  >
                    <StatusIcon className="w-3 h-3" style={{ color: statusColor }} />
                    <span 
                      className="text-[10px] mono"
                      style={{ color: statusColor }}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 
                    className="font-display text-lg font-bold mb-1"
                    style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                  >
                    {vendor.name}
                  </h3>
                  <div 
                    className="text-sm mb-3"
                    style={{ color: subTextColor }}
                  >
                    {vendor.category}
                  </div>

                  {/* Products */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {vendor.products.map((product, pIndex) => (
                      <span 
                        key={pIndex}
                        className="px-2 py-0.5 text-[10px] mono"
                        style={{ 
                          backgroundColor: isDarkMode ? '#1F1F1F' : '#F5F5F5',
                          color: subTextColor
                        }}
                      >
                        {product}
                      </span>
                    ))}
                  </div>

                  {/* Contact */}
                  {vendor.contact && (
                    <div 
                      className="text-xs mb-1"
                      style={{ color: subTextColor }}
                    >
                      {vendor.contact}
                    </div>
                  )}
                  
                  {vendor.quoteRef && (
                    <div 
                      className="text-xs mono mb-1"
                      style={{ color: '#FF4D00' }}
                    >
                      {vendor.quoteRef}
                    </div>
                  )}
                  
                  {vendor.quoteExpiry && (
                    <div 
                      className="text-xs"
                      style={{ color: subTextColor }}
                    >
                      Expires: {vendor.quoteExpiry}
                    </div>
                  )}
                </div>

                {/* Cost */}
                {vendor.cost && (
                  <div 
                    className="flex items-center justify-between pt-3"
                    style={{ borderTop: `1px solid ${borderColor}` }}
                  >
                    <span className="text-xs" style={{ color: subTextColor }}>TOTAL</span>
                    <span 
                      className="font-display text-xl font-bold"
                      style={{ color: accentColor }}
                    >
                      {vendor.cost}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Budget Summary */}
        <div 
          className="p-4 mb-6 border"
          style={{ borderColor }}
        >
          <h3 
            className="font-display text-base font-bold mb-4"
            style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
          >
            BUDGET SUMMARY
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 border" style={{ borderColor }}>
              <div className="text-xs mono mb-1" style={{ color: '#39FF14' }}>CONFIRMED</div>
              <div className="font-display text-2xl font-bold" style={{ color: '#39FF14' }}>€368,080</div>
              <div className="text-xs" style={{ color: subTextColor }}>Pixera + Netgear</div>
            </div>
            <div className="p-3 border" style={{ borderColor }}>
              <div className="text-xs mono mb-1" style={{ color: accentColor }}>QUOTED</div>
              <div className="font-display text-2xl font-bold" style={{ color: accentColor }}>€424,826</div>
              <div className="text-xs" style={{ color: subTextColor }}>L-Acoustics + Goo Systems</div>
            </div>
            <div className="p-3 border" style={{ borderColor }}>
              <div className="text-xs mono mb-1" style={{ color: '#FF4D00' }}>TBC / EVALUATING</div>
              <div className="font-display text-2xl font-bold" style={{ color: '#FF4D00' }}>TBC</div>
              <div className="text-xs" style={{ color: subTextColor }}>Barco + Luxonis + DVIGear + Meinberg</div>
            </div>
          </div>
        </div>

        {/* Expandable Next Actions */}
        <div>
          <button
            onClick={() => setShowNextActions(!showNextActions)}
            className="w-full flex items-center justify-between py-3 px-4 border transition-colors"
            style={{ borderColor: accentColor }}
          >
            <span 
              className="font-display text-sm font-bold"
              style={{ color: accentColor }}
            >
              NEXT PHASE ACTIONS
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300`}
              style={{ 
                color: accentColor,
                transform: showNextActions ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 border-l border-r border-b`}
            style={{ 
              borderColor: accentColor,
              maxHeight: showNextActions ? '400px' : '0px',
              backgroundColor: isDarkMode ? 'rgba(0, 240, 255, 0.03)' : 'rgba(0, 102, 204, 0.03)'
            }}
          >
            <ul className="space-y-2 text-sm p-4" style={{ color: subTextColor }}>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: accentColor }} />
                Get costings for projectors (rental vs purchase)
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: accentColor }} />
                Confirm audio equipment BTU ratings with Audiotek for HVAC sizing
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: accentColor }} />
                Obtain Meinberg sync generator quote
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: accentColor }} />
                Resolve sensor bandwidth architecture (edge processing vs. aggregator nodes)
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: accentColor }} />
                Finalize signal transport solution (fiber vs. HDBaseT vs. ST2110)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
