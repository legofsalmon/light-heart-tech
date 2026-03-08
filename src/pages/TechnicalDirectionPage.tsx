import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Download } from 'lucide-react';
import CopyEmail from '../components/CopyEmail';

gsap.registerPlugin(ScrollTrigger);

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  isDarkMode: boolean;
}

function AccordionItem({ title, children, isOpen, onToggle, isDarkMode }: AccordionItemProps) {
  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';
  const borderColor = isDarkMode ? '#1F1F1F' : '#E5E5E5';
  
  return (
    <div 
      className="border-b"
      style={{ borderColor }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-2 text-left"
      >
        <span 
          className="font-display text-sm sm:text-base font-bold"
          style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
        >
          {title}
        </span>
        <ChevronDown 
          className={`w-5 h-5 transition-transform duration-300`}
          style={{ 
            color: accentColor,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[1000px] pb-4' : 'max-h-0'}`}
      >
        <div className={`px-2 text-sm ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

interface TechnicalDirectionPageProps {
  isDarkMode: boolean;
}

export default function TechnicalDirectionPage({ isDarkMode }: TechnicalDirectionPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [openSections, setOpenSections] = useState<string[]>(['project-at-glance']);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.from('.td-content', {
        y: 30,
        opacity: 0,
        duration: 0.5,
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

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';
  const borderColor = isDarkMode ? '#1F1F1F' : '#E5E5E5';
  const bgClass = isDarkMode ? 'bg-[#0A0A0A]' : 'bg-gray-50';

  const handleDownload = () => {
    const csvContent = `Section,Item,Value
Project,Project Lead,Krisjanis Berzins
Project,Email,kris@idirnet.com
Project,Client,Lightheart Ltd
Project,Location,Dublin Ireland
Project,Commencement,11 February 2026
Project,Completion,4 March 2026
Project,Target Opening,September 2026
Project,Duration,21 days
Projection,Total Units,37
Projection,Models,Barco I600-4K10 I600-4K8 G50-W8
Projection,Estimated Cost,€943100
Audio,Total Speakers,71
Audio,X8i Surround,48
Audio,X6i Height,37
Audio,SYVA SUB,16
Audio,Room 1 Cost,€226454
Audio,Room 2 Cost,€175132
Network,Fiber,50× OS2 4-core LC
Network,Copper,75× Cat6a S/FTP
Network,Switch Ports,88× 10Gb PoE+
Servers,Media Servers,5× Pixera PX2 Octo
Servers,Total Cost,€443103
Servers,Power Draw,6202W
HVAC,Total Heat Load,118491 BTU/h
HVAC,Minimum Required,148114 BTU/h
HVAC,Recommended,177737 BTU/h`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lightheart-technical-direction.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div ref={pageRef} className="page-enter min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="td-content mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className={`text-xs mono tracking-wider ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
              SECTION 02
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                TECHNICAL DIRECTION
              </h1>
              <p 
                className="max-w-xl text-sm sm:text-base"
                style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}
              >
                Overview of the technical architecture, key decisions, and project scope.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 text-sm border transition-colors w-full sm:w-auto justify-center"
              style={{ 
                borderColor: accentColor,
                color: accentColor 
              }}
            >
              <Download className="w-4 h-4" />
              DOWNLOAD CSV
            </button>
          </div>
        </div>

        {/* Accordion Content */}
        <div 
          className={`td-content border ${bgClass}`}
          style={{ borderColor }}
        >
          {/* Project at a Glance */}
          <AccordionItem 
            title="Project at a Glance" 
            isOpen={openSections.includes('project-at-glance')}
            onToggle={() => toggleSection('project-at-glance')}
            isDarkMode={isDarkMode}
          >
            <div className="grid grid-cols-2 gap-4 py-2">
              <div>
                <div className="text-[10px] mono mb-1">PROJECT LEAD</div>
                <div style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>Krisjanis Berzins</div>
                <CopyEmail email="kris@idirnet.com" isDarkMode={isDarkMode} />
              </div>
              <div>
                <div className="text-[10px] mono mb-1">CLIENT</div>
                <div style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>Lightheart Ltd</div>
              </div>
              <div>
                <div className="text-[10px] mono mb-1">LOCATION</div>
                <div style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>Dublin, Ireland</div>
                <div>~280 sq. m.</div>
              </div>
              <div>
                <div className="text-[10px] mono mb-1">DURATION</div>
                <div style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>21 Days</div>
                <div>11 Feb — 4 Mar 2026</div>
              </div>
            </div>
          </AccordionItem>

          {/* Technical Architecture */}
          <AccordionItem 
            title="Technical Architecture" 
            isOpen={openSections.includes('technical-architecture')}
            onToggle={() => toggleSection('technical-architecture')}
            isDarkMode={isDarkMode}
          >
            <div className="space-y-3 py-2">
              <div>
                <div className="text-[10px] mono mb-1" style={{ color: accentColor }}>PROJECTION SYSTEMS</div>
                <p>37 Barco laser projectors with ultra-short throw lenses. 4K resolution (WQUXGA) for wall arrays, WUXGA for floor projection. Edge-blending capability for seamless multi-projector arrays.</p>
              </div>
              <div>
                <div className="text-[10px] mono mb-1" style={{ color: accentColor }}>MEDIA SERVERS</div>
                <p>5× Pixera PX2 Octo units with 10GBase-T networking. Cluster synchronization for distributed rendering.</p>
              </div>
              <div>
                <div className="text-[10px] mono mb-1" style={{ color: accentColor }}>AUDIO SYSTEM</div>
                <p>L-Acoustics L-ISA spatial audio with 71 speakers total. Object-based audio processing with Milan-AVB protocol.</p>
              </div>
              <div>
                <div className="text-[10px] mono mb-1" style={{ color: accentColor }}>NETWORK INFRASTRUCTURE</div>
                <p>Five distinct physical/logical networks: Video Transport, Sensor Aggregation, Audio Control, Server Interconnect, and Management. 100G spine with fiber optic backbone.</p>
              </div>
            </div>
          </AccordionItem>

          {/* Key Technical Decisions */}
          <AccordionItem 
            title="Key Technical Decisions" 
            isOpen={openSections.includes('key-decisions')}
            onToggle={() => toggleSection('key-decisions')}
            isDarkMode={isDarkMode}
          >
            <div className="space-y-3 py-2">
              <div>
                <div className="text-[10px] mono mb-1" style={{ color: accentColor }}>SIGNAL TRANSPORT STRATEGY</div>
                <p>Selected DVIGear DVI-7380 for 4K wall projection. DisplayPort 1.4 over OS2 fiber provides 32.4 Gbps bandwidth with galvanic isolation. Floor projectors use HDBaseT for flexibility.</p>
              </div>
              <div>
                <div className="text-[10px] mono mb-1" style={{ color: accentColor }}>AUDIO-VISUAL INTEGRATION</div>
                <p>L-ISA Processor II provides spatial audio processing. Milan-AVB protocol ensures low-latency audio transport. Network segregation prevents interference between audio and video systems.</p>
              </div>
            </div>
          </AccordionItem>

          {/* Budget Summary */}
          <AccordionItem 
            title="Budget Summary" 
            isOpen={openSections.includes('budget-summary')}
            onToggle={() => toggleSection('budget-summary')}
            isDarkMode={isDarkMode}
          >
            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="p-3 border" style={{ borderColor }}>
                <div className="text-[10px] mono mb-1">MEDIA SERVERS</div>
                <div className="font-display text-xl font-bold" style={{ color: accentColor }}>€275,000</div>
                <div className="text-[10px]" style={{ color: isDarkMode ? '#39FF14' : '#228B22' }}>Confirmed</div>
              </div>
              <div className="p-3 border" style={{ borderColor }}>
                <div className="text-[10px] mono mb-1">AUDIO SYSTEM</div>
                <div className="font-display text-xl font-bold" style={{ color: accentColor }}>€401,586</div>
                <div className="text-[10px]" style={{ color: accentColor }}>Quoted</div>
              </div>
              <div className="p-3 border" style={{ borderColor }}>
                <div className="text-[10px] mono mb-1">SERVER ROOM</div>
                <div className="font-display text-xl font-bold" style={{ color: accentColor }}>€443,103</div>
                <div className="text-[10px]" style={{ color: isDarkMode ? '#39FF14' : '#228B22' }}>Confirmed</div>
              </div>
              <div className="p-3 border" style={{ borderColor }}>
                <div className="text-[10px] mono mb-1">NETWORK</div>
                <div className="font-display text-xl font-bold" style={{ color: accentColor }}>€93,080</div>
                <div className="text-[10px]" style={{ color: isDarkMode ? '#39FF14' : '#228B22' }}>Confirmed</div>
              </div>
            </div>
          </AccordionItem>

          {/* Vendor Engagement Status */}
          <AccordionItem 
            title="Vendor Engagement Status" 
            isOpen={openSections.includes('vendor-status')}
            onToggle={() => toggleSection('vendor-status')}
            isDarkMode={isDarkMode}
          >
            <div className="space-y-2 py-2">
              <div className="flex items-center justify-between py-2 border-b" style={{ borderColor }}>
                <span>Pixera (Media Servers)</span>
                <span style={{ color: isDarkMode ? '#39FF14' : '#228B22' }}>Confirmed</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b" style={{ borderColor }}>
                <span>Netgear (Network)</span>
                <span style={{ color: isDarkMode ? '#39FF14' : '#228B22' }}>Confirmed</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b" style={{ borderColor }}>
                <span>L-Acoustics (Audio)</span>
                <span style={{ color: accentColor }}>Quoted</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b" style={{ borderColor }}>
                <span>Barco (Projection)</span>
                <span style={{ color: '#FF4D00' }}>Quoting</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Luxonis (Sensors)</span>
                <span style={{ color: '#FF4D00' }}>Evaluating</span>
              </div>
            </div>
          </AccordionItem>

          {/* Next Phase Actions */}
          <AccordionItem 
            title="Next Phase Actions" 
            isOpen={openSections.includes('next-actions')}
            onToggle={() => toggleSection('next-actions')}
            isDarkMode={isDarkMode}
          >
            <ul className="space-y-2 py-2">
              <li className="flex items-start gap-2">
                <span style={{ color: accentColor }}>→</span>
                <span>Confirm formal quotes from Barco or alternative projection vendors</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: accentColor }}>→</span>
                <span>Confirm Meinberg sync generator pricing and availability</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: accentColor }}>→</span>
                <span>Obtain BTU/hr ratings from Audiotek for HVAC sizing</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: accentColor }}>→</span>
                <span>Finalize signal transport solution</span>
              </li>
            </ul>
          </AccordionItem>
        </div>
      </div>
    </div>
  );
}
