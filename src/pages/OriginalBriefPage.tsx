import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronDown, Briefcase, Calendar, Target, Users } from 'lucide-react';
import CopyEmail from '../components/CopyEmail';

interface OriginalBriefPageProps {
  isDarkMode: boolean;
}

function Accordion({ title, children, defaultOpen, isDarkMode }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean; isDarkMode: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';
  const borderColor = isDarkMode ? '#1F1F1F' : '#E5E5E5';
  return (
    <div className="border-b" style={{ borderColor }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 px-2 text-left"
      >
        <span className="font-display text-sm sm:text-base font-bold"
          style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>{title}</span>
        <ChevronDown className="w-5 h-5 transition-transform duration-300"
          style={{ color: accentColor, transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[3000px] pb-4' : 'max-h-0'}`}>
        <div className={`px-2 text-sm leading-relaxed ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function OriginalBriefPage({ isDarkMode }: OriginalBriefPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const ctx = gsap.context(() => {
      gsap.from('.brief-card', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'expo.out', delay: 0.3 });
    }, page);
    return () => ctx.revert();
  }, []);

  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';
  const borderColor = isDarkMode ? '#1F1F1F' : '#E5E5E5';
  const subTextColor = isDarkMode ? '#A0A0A0' : '#666666';
  const cardBg = isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';

  return (
    <div ref={pageRef} className="page-enter min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
            <span className={`text-xs mono tracking-wider ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>SECTION 01</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
            style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>ORIGINAL BRIEF</h1>
          <p className="max-w-xl text-sm sm:text-base" style={{ color: subTextColor }}>
            Idirnet Project Brief: Immersive Rooms AV Pre-Production and System Design Scope
          </p>
        </div>

        {/* Project info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="brief-card border p-5" style={{ borderColor, background: cardBg }}>
            <Briefcase className="w-5 h-5 mb-3" style={{ color: accentColor }} />
            <div className="text-xs tracking-wider mb-1" style={{ color: subTextColor }}>CLIENT</div>
            <div style={{ color: isDarkMode ? '#fff' : '#000' }}>Lightheart Ltd</div>
          </div>
          <div className="brief-card border p-5" style={{ borderColor, background: cardBg }}>
            <Users className="w-5 h-5 mb-3" style={{ color: accentColor }} />
            <div className="text-xs tracking-wider mb-1" style={{ color: subTextColor }}>PROJECT LEAD</div>
            <div style={{ color: isDarkMode ? '#fff' : '#000' }}>Krisjanis Berzins</div>
            <CopyEmail email="kris@idirnet.com" isDarkMode={isDarkMode} />
          </div>
          <div className="brief-card border p-5" style={{ borderColor, background: cardBg }}>
            <Calendar className="w-5 h-5 mb-3" style={{ color: accentColor }} />
            <div className="text-xs tracking-wider mb-1" style={{ color: subTextColor }}>ENGAGEMENT</div>
            <div style={{ color: isDarkMode ? '#fff' : '#000' }}>Short-term fixed-term consultancy</div>
            <div className="text-xs mt-1" style={{ color: subTextColor }}>11 Feb 2026 to 4 Mar 2026</div>
          </div>
          <div className="brief-card border p-5" style={{ borderColor, background: cardBg }}>
            <Target className="w-5 h-5 mb-3" style={{ color: accentColor }} />
            <div className="text-xs tracking-wider mb-1" style={{ color: subTextColor }}>SCOPE</div>
            <div style={{ color: isDarkMode ? '#fff' : '#000' }}>Technical Design, Specification, Costing Liaison, and Budget Ring-Fencing for a Permanent Two-Room Installation.</div>
          </div>
        </div>

        {/* Project Summary */}
        <div className="border p-6 mb-6" style={{ borderColor, background: cardBg }}>
          <h2 className="font-display text-lg font-bold mb-3" style={{ color: isDarkMode ? '#fff' : '#000' }}>Project Summary</h2>
          <p className="text-sm leading-relaxed" style={{ color: subTextColor }}>
            This project defines, designs, and costs a robust audiovisual and systems solution for two immersive rooms through a focused, high-impact pre-production package. The work includes an options-based projection and playback design, a power and electrical load review, an assessment of the weight load on the roof, and a clear systems architecture. The structure supports confident, short-timeline decision-making, vendor pricing, technical coordination, and the long-term operability of a permanent installation.
          </p>
        </div>

        {/* Accordion sections */}
        <Accordion title="CORE OBJECTIVES" defaultOpen={true} isDarkMode={isDarkMode}>
          <ul className="space-y-2">
            <li>• Deliver a complete AV and systems specification with clear performance tiers and trade-offs.</li>
            <li>• Confirm technical feasibility through coordinated design intent for mounts, rigging requirements, and building services inputs.</li>
            <li>• Produce a practical server, playback, and network architecture that is supportable and scalable.</li>
            <li>• Provide a power and electrical load review to support M&E planning and reduce late-stage rework.</li>
            <li>• Support vendor engagement and comparable pricing to ring-fence a realistic budget envelope.</li>
          </ul>
        </Accordion>

        <Accordion title="PHASE 1: DEFINITION AND TECHNICAL DISCOVERY" isDarkMode={isDarkMode}>
          <p className="mb-3 font-medium" style={{ color: isDarkMode ? '#ccc' : '#333' }}>
            Translate the current scope into a clearly defined technical challenge with quantifiable requirements and aligned constraints.
          </p>
          <div className="text-xs tracking-wider mb-2" style={{ color: accentColor }}>KEY DELIVERABLES</div>
          <ul className="space-y-1">
            <li>• Scope confirmation pack (room details, audience movement, maintenance needs, etc.)</li>
            <li>• Projection strategy options (Wall-only/Wall plus floor, redundancy, lensing)</li>
            <li>• Assumptions and risk register</li>
          </ul>
        </Accordion>

        <Accordion title="PHASE 2: SYSTEM DESIGN AND ENGINEERING COORDINATION" isDarkMode={isDarkMode}>
          <p className="mb-3 font-medium" style={{ color: isDarkMode ? '#ccc' : '#333' }}>
            Create a detailed technical design that can be accurately priced by vendors and efficiently supported by Lightheart and building services teams.
          </p>
          <div className="text-xs tracking-wider mb-2" style={{ color: accentColor }}>KEY DELIVERABLES</div>
          <ul className="space-y-1">
            <li>• Projection system study and specification by room (tiers, brightness, resolution, mounting, mapping workflow)</li>
            <li>• Basic previz output</li>
            <li>• Mounting and rigging design intent package with Motion detection and sensing options (if required)</li>
            <li>• Server and playback architecture (synchronisation, redundancy, GPU/CPU, networking)</li>
            <li>• Systems architecture overview (Network, control layers, audio integration, IT requirements)</li>
            <li>• Power and electrical load review (Energy use, heat/ventilation inputs, circuiting approach)</li>
          </ul>
        </Accordion>

        <Accordion title="PHASE 3: VENDOR COORDINATION, COSTING, AND BUDGET ALLOCATION" isDarkMode={isDarkMode}>
          <p className="mb-3 font-medium" style={{ color: isDarkMode ? '#ccc' : '#333' }}>
            Convert the design into costed and comparable solutions, supported by a clear budget structure for decision-making and procurement planning.
          </p>
          <div className="text-xs tracking-wider mb-2" style={{ color: accentColor }}>KEY DELIVERABLES</div>
          <ul className="space-y-1">
            <li>• Vendor engagement pack (Scope, drawings, pricing template)</li>
            <li>• Vendor communication and technical Q&A</li>
            <li>• Costed options comparison (Room-by-room across performance tiers)</li>
            <li>• Budget allocation summary (Recommended envelope, contingency, long-lead items)</li>
            <li>• Handover package for the next stage (Consolidated drawings, specs, vendor feedback)</li>
          </ul>
        </Accordion>
      </div>
    </div>
  );
}
