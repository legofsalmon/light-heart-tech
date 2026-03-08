import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, CheckCircle2, Info, Download, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// EXACT DATA FROM PDF DOCUMENT - COPIED WITHOUT MODIFICATION
// Room 1 Walls: 14× Barco I600‑4K10 (10,000 ISO lm, WQUXGA) with ILD 0.37 UST lenses
// Room 1 Floor: 10× Barco G50-W8 (7,500 ANSI / 8,900 ISO lm, WUXGA) with G-Lens 0.65–0.75:1 zoom
// Room 2 Walls: 8× Barco I600‑4K8 (8,000 ISO lm, WQUXGA) with ILD 0.37 UST lenses
// Room 2 Floor: 5× Barco G50-W8 (8,000lm, WUXGA) with G-Lens

const room1Walls = Array.from({ length: 14 }, (_, i) => ({
  id: `R1W-${String(i + 1).padStart(2, '0')}`,
  model: 'Barco I600‑4K10',
  location: `Room 1 Walls`,
  lumens: '10,000 ISO lm',
  resolution: 'WQUXGA',
  lens: 'ILD 0.37 UST',
  status: 'confirmed',
  unitCost: '€35,000',
}));

const room1Floor = Array.from({ length: 10 }, (_, i) => ({
  id: `R1F-${String(i + 1).padStart(2, '0')}`,
  model: 'Barco G50-W8',
  location: `Room 1 Floor`,
  lumens: '7,500 ANSI / 8,900 ISO lm',
  resolution: 'WUXGA',
  lens: 'G-Lens 0.65–0.75:1 zoom',
  status: 'confirmed',
  unitCost: '€9,000',
}));

const room2Walls = Array.from({ length: 8 }, (_, i) => ({
  id: `R2W-${String(i + 1).padStart(2, '0')}`,
  model: 'Barco I600‑4K8',
  location: `Room 2 Walls`,
  lumens: '8,000 ISO lm',
  resolution: 'WQUXGA',
  lens: 'ILD 0.37 UST',
  status: 'confirmed',
  unitCost: '€35,000',
}));

const room2Floor = Array.from({ length: 5 }, (_, i) => ({
  id: `R2F-${String(i + 1).padStart(2, '0')}`,
  model: 'Barco G50-W8',
  location: `Room 2 Floor`,
  lumens: '8,000lm',
  resolution: 'WUXGA',
  lens: 'G-Lens',
  status: 'confirmed',
  unitCost: '€9,000',
}));

const projectors = [...room1Walls, ...room1Floor, ...room2Walls, ...room2Floor];

const statusConfig = {
  confirmed: { color: '#39FF14', icon: CheckCircle2, label: 'CONFIRMED' },
  quoting: { color: '#FF4D00', icon: Info, label: 'QUOTING' },
  pending: { color: '#FF006E', icon: AlertTriangle, label: 'PENDING' },
};

interface ProjectionPageProps {
  isDarkMode: boolean;
}

export default function ProjectionPage({ isDarkMode }: ProjectionPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('all');
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.from('.projector-card', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.02,
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

  const filteredProjectors = filter === 'all' 
    ? projectors 
    : projectors.filter(p => p.location.toLowerCase().includes(filter.toLowerCase()));

  const handleDownload = () => {
    // EXACT DATA FROM PDF - COPIED WITHOUT MODIFICATION
    const csvContent = `ID,Model,Location,Lumens,Resolution,Lens,Status,Unit Cost
R1W-01,Barco I600‑4K10,Room 1 Walls,10,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R1W-02,Barco I600‑4K10,Room 1 Walls,10,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R1W-03,Barco I600‑4K10,Room 1 Walls,10,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R1W-04,Barco I600‑4K10,Room 1 Walls,10,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R1W-05,Barco I600‑4K10,Room 1 Walls,10,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R1W-06,Barco I600‑4K10,Room 1 Walls,10,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R1W-07,Barco I600‑4K10,Room 1 Walls,10,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R1W-08,Barco I600‑4K10,Room 1 Walls,10,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R1W-09,Barco I600‑4K10,Room 1 Walls,10,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R1W-10,Barco I600‑4K10,Room 1 Walls,10,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R1W-11,Barco I600‑4K10,Room 1 Walls,10,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R1W-12,Barco I600‑4K10,Room 1 Walls,10,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R1W-13,Barco I600‑4K10,Room 1 Walls,10,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R1W-14,Barco I600‑4K10,Room 1 Walls,10,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R1F-01,Barco G50-W8,Room 1 Floor,7,500 ANSI / 8,900 ISO lm,WUXGA,G-Lens 0.65–0.75:1 zoom,Confirmed,€9000
R1F-02,Barco G50-W8,Room 1 Floor,7,500 ANSI / 8,900 ISO lm,WUXGA,G-Lens 0.65–0.75:1 zoom,Confirmed,€9000
R1F-03,Barco G50-W8,Room 1 Floor,7,500 ANSI / 8,900 ISO lm,WUXGA,G-Lens 0.65–0.75:1 zoom,Confirmed,€9000
R1F-04,Barco G50-W8,Room 1 Floor,7,500 ANSI / 8,900 ISO lm,WUXGA,G-Lens 0.65–0.75:1 zoom,Confirmed,€9000
R1F-05,Barco G50-W8,Room 1 Floor,7,500 ANSI / 8,900 ISO lm,WUXGA,G-Lens 0.65–0.75:1 zoom,Confirmed,€9000
R1F-06,Barco G50-W8,Room 1 Floor,7,500 ANSI / 8,900 ISO lm,WUXGA,G-Lens 0.65–0.75:1 zoom,Confirmed,€9000
R1F-07,Barco G50-W8,Room 1 Floor,7,500 ANSI / 8,900 ISO lm,WUXGA,G-Lens 0.65–0.75:1 zoom,Confirmed,€9000
R1F-08,Barco G50-W8,Room 1 Floor,7,500 ANSI / 8,900 ISO lm,WUXGA,G-Lens 0.65–0.75:1 zoom,Confirmed,€9000
R1F-09,Barco G50-W8,Room 1 Floor,7,500 ANSI / 8,900 ISO lm,WUXGA,G-Lens 0.65–0.75:1 zoom,Confirmed,€9000
R1F-10,Barco G50-W8,Room 1 Floor,7,500 ANSI / 8,900 ISO lm,WUXGA,G-Lens 0.65–0.75:1 zoom,Confirmed,€9000
R2W-01,Barco I600‑4K8,Room 2 Walls,8,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R2W-02,Barco I600‑4K8,Room 2 Walls,8,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R2W-03,Barco I600‑4K8,Room 2 Walls,8,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R2W-04,Barco I600‑4K8,Room 2 Walls,8,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R2W-05,Barco I600‑4K8,Room 2 Walls,8,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R2W-06,Barco I600‑4K8,Room 2 Walls,8,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R2W-07,Barco I600‑4K8,Room 2 Walls,8,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R2W-08,Barco I600‑4K8,Room 2 Walls,8,000 ISO lm,WQUXGA,ILD 0.37 UST,Confirmed,€35000
R2F-01,Barco G50-W8,Room 2 Floor,8,000lm,WUXGA,G-Lens,Confirmed,€9000
R2F-02,Barco G50-W8,Room 2 Floor,8,000lm,WUXGA,G-Lens,Confirmed,€9000
R2F-03,Barco G50-W8,Room 2 Floor,8,000lm,WUXGA,G-Lens,Confirmed,€9000
R2F-04,Barco G50-W8,Room 2 Floor,8,000lm,WUXGA,G-Lens,Confirmed,€9000
R2F-05,Barco G50-W8,Room 2 Floor,8,000lm,WUXGA,G-Lens,Confirmed,€9000
TOTALS,,,,,,,€943100`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lightheart-projection-specs.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';
  const borderColor = isDarkMode ? '#1F1F1F' : '#E5E5E5';
  const bgClass = isDarkMode ? 'bg-[#0A0A0A]' : 'bg-gray-50';

  return (
    <div ref={pageRef} className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className={`text-xs mono tracking-wider ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
              SECTION 03
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                PROJECTION SYSTEMS
              </h1>
              <p 
                className="max-w-xl text-sm sm:text-base"
                style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}
              >
                37 projectors. Barco laser projection systems capable of edge-blending 
                seamlessly across multiple surfaces.
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

        {/* Stats Bar - EXACT VALUES FROM PDF */}
        <div 
          className={`p-4 mb-6 sm:mb-8 border ${bgClass}`}
          style={{ borderColor }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
            <div>
              <div 
                className="font-display text-2xl font-bold"
                style={{ color: accentColor }}
              >
                37
              </div>
              <div className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                TOTAL UNITS
              </div>
            </div>
            <div>
              <div 
                className="font-display text-2xl font-bold"
                style={{ color: accentColor }}
              >
                €943,100
              </div>
              <div className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                TOTAL COST
              </div>
            </div>
            <div>
              <div 
                className="font-display text-2xl font-bold"
                style={{ color: '#FF4D00' }}
              >
                851.80 kg
              </div>
              <div className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                RIGGING WEIGHT
              </div>
            </div>
            <div>
              <div 
                className="font-display text-2xl font-bold"
                style={{ color: '#FF006E' }}
              >
                24,510W
              </div>
              <div className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                POWER DRAW
              </div>
            </div>
            <div>
              <div 
                className="font-display text-2xl font-bold"
                style={{ color: '#FF006E' }}
              >
                82,880
              </div>
              <div className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                BTU/h HEAT
              </div>
            </div>
          </div>
        </div>

        {/* Room Summary Cards - EXACT DATA FROM PDF */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div 
            className="border p-4"
            style={{ borderColor }}
          >
            <div className="text-xs mono mb-2" style={{ color: accentColor }}>ROOM 1 WALLS</div>
            <div className="font-display text-2xl font-bold mb-1" style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
              14×
            </div>
            <div className="text-sm mb-2" style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
              Barco I600‑4K10
            </div>
            <div className="text-xs space-y-1" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
              <div>10,000 ISO lm</div>
              <div>WQUXGA</div>
              <div>ILD 0.37 UST lens</div>
              <div>€490,000 + €14,700 transport</div>
            </div>
          </div>

          <div 
            className="border p-4"
            style={{ borderColor }}
          >
            <div className="text-xs mono mb-2" style={{ color: accentColor }}>ROOM 1 FLOOR</div>
            <div className="font-display text-2xl font-bold mb-1" style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
              10×
            </div>
            <div className="text-sm mb-2" style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
              Barco G50-W8
            </div>
            <div className="text-xs space-y-1" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
              <div>7,500 ANSI / 8,900 ISO lm</div>
              <div>WUXGA</div>
              <div>G-Lens 0.65–0.75:1 zoom</div>
              <div>€90,000 + €10,000 transport</div>
            </div>
          </div>

          <div 
            className="border p-4"
            style={{ borderColor }}
          >
            <div className="text-xs mono mb-2" style={{ color: accentColor }}>ROOM 2 WALLS</div>
            <div className="font-display text-2xl font-bold mb-1" style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
              8×
            </div>
            <div className="text-sm mb-2" style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
              Barco I600‑4K8
            </div>
            <div className="text-xs space-y-1" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
              <div>8,000 ISO lm</div>
              <div>WQUXGA</div>
              <div>ILD 0.37 UST lens</div>
              <div>€280,000 + €8,400 transport</div>
            </div>
          </div>

          <div 
            className="border p-4"
            style={{ borderColor }}
          >
            <div className="text-xs mono mb-2" style={{ color: accentColor }}>ROOM 2 FLOOR</div>
            <div className="font-display text-2xl font-bold mb-1" style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
              5×
            </div>
            <div className="text-sm mb-2" style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
              Barco G50-W8
            </div>
            <div className="text-xs space-y-1" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
              <div>8,000lm</div>
              <div>WUXGA</div>
              <div>G-Lens</div>
              <div>€45,000 + €5,000 transport</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['ALL', 'ROOM 1', 'ROOM 2'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab.toLowerCase())}
              className={`px-3 py-1.5 text-xs mono tracking-wider border transition-all duration-300 ${
                filter === tab.toLowerCase()
                  ? '' 
                  : isDarkMode 
                    ? 'border-[#1F1F1F] text-[#A0A0A0] hover:border-[#00F0FF]/50 hover:text-white'
                    : 'border-gray-200 text-gray-500 hover:border-[#0066CC]/50 hover:text-black'
              }`}
              style={{
                borderColor: filter === tab.toLowerCase() ? accentColor : undefined,
                color: filter === tab.toLowerCase() ? accentColor : undefined,
                backgroundColor: filter === tab.toLowerCase() ? (isDarkMode ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0, 102, 204, 0.1)') : undefined,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filteredProjectors.map((projector) => {
            const status = statusConfig[projector.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            
            return (
              <div
                key={projector.id}
                className="projector-card border p-3 transition-colors hover:border-[#00F0FF]"
                style={{ borderColor }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div 
                      className="text-xs mono mb-1"
                      style={{ color: accentColor }}
                    >
                      {projector.id}
                    </div>
                    <h3 
                      className="font-display text-xs font-bold"
                      style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                    >
                      {projector.model}
                    </h3>
                  </div>
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: status.color }}
                  />
                </div>

                <div className="space-y-1 text-xs mb-2">
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}>Location:</span>
                    <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>{projector.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}>Lumens:</span>
                    <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>{projector.lumens}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}>Resolution:</span>
                    <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>{projector.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}>Lens:</span>
                    <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>{projector.lens}</span>
                  </div>
                </div>

                <div 
                  className="flex items-center justify-between pt-2 border-t"
                  style={{ borderColor }}
                >
                  <div className="flex items-center gap-1.5 text-xs">
                    <StatusIcon className="w-3 h-3" style={{ color: status.color }} />
                    <span style={{ color: status.color }}>{status.label}</span>
                  </div>
                  <span 
                    className="font-display font-bold text-xs"
                    style={{ color: accentColor }}
                  >
                    {projector.unitCost}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expandable Technical Notes - EXACT FROM PDF */}
        <div className="mt-8">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between py-3 px-4 border transition-colors"
            style={{ borderColor }}
          >
            <span 
              className="font-display text-sm font-bold"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              TECHNICAL NOTES
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
              maxHeight: showDetails ? '800px' : '0px'
            }}
          >
            <div className="p-4 space-y-4" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
              
              <div>
                <h4 className="font-display text-sm font-bold mb-2" style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
                  Room 1 Walls — 14× Barco I600‑4K10
                </h4>
                <ul className="space-y-1 text-xs">
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Optical System: Fixed 0.37:1 ultra-short-throw periscope lens (6.2kg optical assembly)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Rigging Weight: 29.8 kg per unit (23.6 kg body + 6.2 kg lens assembly) (14× = 417.2 kg)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Power: 860W per unit (14× = 12,040W / 55A total)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Thermal: 2,900 BTU/h per unit (14× = 40,600 BTU/h)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Acoustic: 40 dB (normal operation)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Cost: €490,000 (equipment) + €14,700 (signal transport) = €504,700</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-display text-sm font-bold mb-2" style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
                  Room 1 Floor — 10× Barco G50-W8
                </h4>
                <ul className="space-y-1 text-xs">
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Rigging Weight: 14.2 kg per unit (10× = 142 kg)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Power: 500W per unit (10× = 5,000W / ~23A)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Thermal: 1,672 BTU/h per unit (10× = 16,720 BTU/h)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Acoustic: 38 dB (normal) / 34 dB (eco)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Cost: €90,000 + €10,000 (2K signal transport) = €100,000</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-display text-sm font-bold mb-2" style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
                  Room 2 Walls — 8× Barco I600‑4K8
                </h4>
                <ul className="space-y-1 text-xs">
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Rigging Weight: 27.7 kg per unit (8× = 221.6 kg)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Power: 640W per unit (8× = 5120W / 32A)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Thermal: 2,150 BTU/h per unit (8× = 17,200 BTU/h)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Acoustic: 40 dB</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Cost: €280,000 + €8,400 (signal transport) = €288,400</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-display text-sm font-bold mb-2" style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
                  Room 2 Floor — 5× Barco G50-W8
                </h4>
                <ul className="space-y-1 text-xs">
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Rigging Weight: 14.2 kg per unit (5× = 71 kg)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Power: 490W per unit (5× = 2,450W / 12A)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Thermal: 1,672 BTU/h per unit (5× = 8,360 BTU/h)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span>Cost: €45,000 + €5,000 (transport) = €50,000</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t" style={{ borderColor }}>
                <h4 className="font-display text-sm font-bold mb-2" style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
                  Projector Totals
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs">
                  <div>
                    <div className="font-bold" style={{ color: accentColor }}>€943,100</div>
                    <div>Total Cost</div>
                  </div>
                  <div>
                    <div className="font-bold" style={{ color: accentColor }}>851.80 kg</div>
                    <div>Total Rigging Weight</div>
                  </div>
                  <div>
                    <div className="font-bold" style={{ color: accentColor }}>24,510W</div>
                    <div>Total Power Draw</div>
                  </div>
                  <div>
                    <div className="font-bold" style={{ color: accentColor }}>82,880 BTU/h</div>
                    <div>Total Heat Load</div>
                  </div>
                  <div>
                    <div className="font-bold" style={{ color: accentColor }}>40 dB</div>
                    <div>Acoustic Impact</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
