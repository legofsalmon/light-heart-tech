import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Download, AlertTriangle, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SurfacePageProps {
  isDarkMode: boolean;
}

export default function SurfacePage({ isDarkMode }: SurfacePageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [showSmarter, setShowSmarter] = useState(false);
  const [showGoo, setShowGoo] = useState(false);
  const [showMethods, setShowMethods] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.from('.vendor-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
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
    const csvContent = `Vendor,Product,Quantity,Coverage,Cost,Status
Smarter Surfaces,Smart Ultra High Contrast,17× 25m² units,425m²,€16.473,Specified
Smarter Surfaces,Smart Floor Projector Screen,12× 25m² units,300m²,€10.668,Specified
Smarter Surfaces,Smart White Primer,28× 25m² units,700m²,€2.212,Specified
Smarter Surfaces,TOTAL,,,€29.353,Specified
Goo Systems,Goo V2 Max Contrast (Walls),19× 3.78Lt,424m²,£8.473.50 (~€10.170),Quoted
Goo Systems,Goo Acrylic Premier Primer (Walls),15× 3.78Lt,,Included,Quoted
Goo Systems,Goo V2 Max Contrast (Floor),12× 3.78Lt,279m²,Included,Quoted
Goo Systems,Goo Acrylic Premier Primer (Floor),10× 3.78Lt,,Included,Quoted
Goo Systems,Goo Rear Projection (Protection),23× 2Lt,279m²,Included,Quoted
Goo Systems,TOTAL,,,£19.365.50 (~€23.240),Quoted
Goo Systems,Savings vs Smarter,,,~€6.100,Quoted
Goo Systems,Quote Expiry,,,3 Apr 2026,Quoted`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lightheart-surface-specs.csv';
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
              SECTION 05
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                SURFACE TREATMENT
              </h1>
              <p 
                className="max-w-xl text-sm sm:text-base"
                style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}
              >
                Special paint systems for walls and floors. Low-gain grey formulations 
                optimized for multi-projector blending to prevent hot-spotting.
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

        {/* Comparison Slider */}
        <div className="mb-8 sm:mb-10">
          <h3 
            className="font-display text-base font-bold mb-4"
            style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
          >
            SURFACE TREATMENT COMPARISON
          </h3>
          <p className={`text-xs mb-4 ${isDarkMode ? 'text-[#888]' : 'text-gray-500'}`}>
            Drag the slider to compare untreated (left) vs treated (right) projection surfaces.
          </p>
          
          <div 
            className="relative h-48 sm:h-64 border overflow-hidden rounded-lg"
            style={{ borderColor, backgroundColor: isDarkMode ? '#0A0A0A' : '#F5F5F5' }}
          >
            {/* Before (Untreated) - shows hot spot gradient */}
            <div className="absolute inset-0">
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 40%, rgba(100,100,100,0.3) 100%)',
              }} />
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse at 70% 60%, rgba(255,255,255,0.25) 0%, transparent 35%)',
              }} />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF006E' }} />
                <span className="text-[10px] uppercase tracking-wider font-mono" style={{ color: '#FF006E' }}>
                  Untreated — uneven brightness
                </span>
              </div>
            </div>

            {/* After (Treated) - uniform grey */}
            <div 
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="absolute inset-0" style={{
                background: isDarkMode
                  ? 'linear-gradient(135deg, #4a4a4a 0%, #505050 50%, #4a4a4a 100%)'
                  : 'linear-gradient(135deg, #aaa 0%, #b0b0b0 50%, #aaa 100%)',
              }} />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#39FF14' }} />
                <span className="text-[10px] uppercase tracking-wider font-mono" style={{ color: '#39FF14' }}>
                  Gain 0.7 treated — uniform distribution
                </span>
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 cursor-ew-resize z-10"
              style={{ 
                left: `${sliderPosition}%`,
                transform: 'translateX(-50%)',
                backgroundColor: accentColor,
                boxShadow: `0 0 8px ${accentColor}60`,
              }}
            >
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: accentColor, boxShadow: `0 0 12px ${accentColor}40` }}
              >
                <ArrowRight className="w-4 h-4" style={{ color: isDarkMode ? '#000' : '#FFF' }} />
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            />
          </div>
        </div>

        {/* Vendor Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {/* Smarter Surfaces */}
          <div 
            className="vendor-card border p-5"
            style={{ borderColor }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 
                  className="font-display text-lg font-bold mb-1"
                  style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                >
                  SMARTER SURFACES
                </h3>
                <div className="flex items-center gap-2">
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: '#39FF14' }}
                  />
                  <span 
                    className="text-xs mono"
                    style={{ color: '#39FF14' }}
                  >
                    SPECIFIED
                  </span>
                </div>
              </div>
              <span 
                className="font-display text-xl font-bold"
                style={{ color: accentColor }}
              >
                €29,353
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div 
                className="flex items-center justify-between py-2 border-b text-sm"
                style={{ borderColor }}
              >
                <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>Smart Ultra High Contrast</span>
                <span style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>425m² / €16,473</span>
              </div>
              <div 
                className="flex items-center justify-between py-2 border-b text-sm"
                style={{ borderColor }}
              >
                <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>Smart Floor Projector Screen</span>
                <span style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>300m² / €10,668</span>
              </div>
              <div 
                className="flex items-center justify-between py-2 text-sm"
                style={{ borderColor }}
              >
                <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>Smart White Primer</span>
                <span style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>700m² / €2,212</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {['SKU-based procurement', 'EUR pricing', '2-coat system'].map((feature, fIndex) => (
                <span 
                  key={fIndex}
                  className={`px-2 py-1 text-[10px] mono ${isDarkMode ? 'bg-[#1F1F1F] text-[#A0A0A0]' : 'bg-gray-100 text-gray-600'}`}
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Goo Systems */}
          <div 
            className="vendor-card border p-5"
            style={{ borderColor }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 
                  className="font-display text-lg font-bold mb-1"
                  style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                >
                  GOO SYSTEMS
                </h3>
                <div className="flex items-center gap-2">
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span 
                    className="text-xs mono"
                    style={{ color: accentColor }}
                  >
                    QUOTED
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold" style={{ color: '#39FF14' }}>
                  ~€6,100
                </div>
                <div className={`text-[10px] ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                  SAVINGS
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div 
                className="flex items-center justify-between py-2 border-b text-sm"
                style={{ borderColor }}
              >
                <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>Goo V2 Max Contrast (Walls)</span>
                <span style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>424m²</span>
              </div>
              <div 
                className="flex items-center justify-between py-2 border-b text-sm"
                style={{ borderColor }}
              >
                <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>Goo Floor System + Protection</span>
                <span style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>279m²</span>
              </div>
              <div 
                className="flex items-center justify-between py-2 text-sm"
                style={{ borderColor }}
              >
                <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>Total (inc. primer)</span>
                <span style={{ color: accentColor }}>~€23,240</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {['Gain 0.7 optimized', 'PVA-free primer', 'Walkable topcoat'].map((feature, fIndex) => (
                <span 
                  key={fIndex}
                  className={`px-2 py-1 text-[10px] mono ${isDarkMode ? 'bg-[#1F1F1F] text-[#A0A0A0]' : 'bg-gray-100 text-gray-600'}`}
                >
                  {feature}
                </span>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs" style={{ color: '#FF4D00' }}>
              <AlertTriangle className="w-3 h-3" />
              Quote expires 3 Apr 2026
            </div>
          </div>
        </div>

        {/* Expandable Smarter Surfaces Details */}
        <div className="mb-4">
          <button
            onClick={() => setShowSmarter(!showSmarter)}
            className="w-full flex items-center justify-between py-3 px-4 border transition-colors"
            style={{ borderColor }}
          >
            <span 
              className="font-display text-sm font-bold"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              SMARTER SURFACES — DETAILED SPECIFICATION
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300`}
              style={{ 
                color: accentColor,
                transform: showSmarter ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 border-l border-r border-b ${bgClass}`}
            style={{ 
              borderColor,
              maxHeight: showSmarter ? '600px' : '0px'
            }}
          >
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-display text-sm font-bold mb-2" style={{ color: accentColor }}>WALL TREATMENT</h4>
                <ul className="space-y-1 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                  <li>• Product: Smart Ultra High Contrast Projector Screen Paint (SKU: SSK-PROGAMERULTRA25)</li>
                  <li>• Coverage: 17× 25m² units = 425m² total</li>
                  <li>• Finish Standard: US 5 / EU Q4 gypsum Surface Finish Quality (smooth, seamless)</li>
                  <li>• Application: 2-coat system (base + top) via mohair or lint-free short-pile roller</li>
                  <li>• Preparation: Smart White Primer (SSC-PRIMER24W) mandatory on bare surfaces</li>
                  <li>• Drying: 2–4 hours between coats (20°C); 24 hours to full usability</li>
                  <li>• Cost: €16,473</li>
                </ul>
              </div>
              <div>
                <h4 className="font-display text-sm font-bold mb-2" style={{ color: accentColor }}>FLOOR TREATMENT</h4>
                <ul className="space-y-1 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                  <li>• Product: Smart Floor Projector Screen Paint (SKU: SSK-PROFLOOR25)</li>
                  <li>• Coverage: 12× 25m² units = 300m² total</li>
                  <li>• Application: 2-coat system over acid-etched concrete or existing floor paint</li>
                  <li>• Drying: 10 hours between coats; 24 hours to usable state</li>
                  <li>• Limitations: Standard floor paint durability; no integrated wear-layer for heavy foot traffic</li>
                  <li>• Cost: €10,668</li>
                </ul>
              </div>
              <div>
                <h4 className="font-display text-sm font-bold mb-2" style={{ color: accentColor }}>PRIMING</h4>
                <ul className="space-y-1 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                  <li>• Product: Smart White Primer (SKU: SSC-PRIMER24W)</li>
                  <li>• Coverage: 28× 25m² units = 700m² (sufficient for walls + floor sealing)</li>
                  <li>• Cost: €2,212</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Goo Systems Details */}
        <div className="mb-4">
          <button
            onClick={() => setShowGoo(!showGoo)}
            className="w-full flex items-center justify-between py-3 px-4 border transition-colors"
            style={{ borderColor }}
          >
            <span 
              className="font-display text-sm font-bold"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              GOO SYSTEMS — DETAILED SPECIFICATION
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300`}
              style={{ 
                color: accentColor,
                transform: showGoo ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 border-l border-r border-b ${bgClass}`}
            style={{ 
              borderColor,
              maxHeight: showGoo ? '800px' : '0px'
            }}
          >
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-display text-sm font-bold mb-2" style={{ color: accentColor }}>WALL TREATMENT</h4>
                <ul className="space-y-1 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                  <li>• Product: Goo V2 Max Contrast (Gain 0.7, medium grey)</li>
                  <li>• Coverage: 424m² validated (19× 3.78Lt units @ 6m² per unit with 5% water)</li>
                  <li>• Primer: Goo Acrylic Premier Primer (15× 3.78Lt @ 7.5m² per unit)</li>
                  <li>• Technical Advantage: Gain 0.7 optimized for multi-projector blending (prevents hot-spotting)</li>
                  <li>• No PVA in primer (prevents yellowing/color shift over time)</li>
                  <li>• No ALR particles (eliminates sparkles critical for blending)</li>
                  <li>• Cost: £8,473.50 (Walls) / ~€10,170</li>
                </ul>
              </div>
              <div>
                <h4 className="font-display text-sm font-bold mb-2" style={{ color: accentColor }}>FLOOR TREATMENT</h4>
                <ul className="space-y-1 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                  <li>• System: Three-layer protection</li>
                  <li>• Primer: Goo Acrylic Premier Primer (10× 3.78Lt)</li>
                  <li>• Screen: Goo V2 Max Contrast 0.7 gain (12× 3.78Lt @ 6m² per unit)</li>
                  <li>• Protection: Goo Rear Projection (23× 2Lt @ 5m² per unit) – hard-cure protective shell</li>
                  <li>• Coverage: 279m² validated</li>
                  <li>• Technical Advantage: Rear Projection topcoat provides walkable resilience for immersive floor traffic</li>
                  <li>• Cost: £10,892.00 (Floor) / ~€13,070</li>
                </ul>
              </div>
              <div>
                <h4 className="font-display text-sm font-bold mb-2" style={{ color: accentColor }}>IMPORT & PROCUREMENT TERMS</h4>
                <ul className="space-y-1 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                  <li>• Quote Reference: QU-0932, NexNix Ltd, 4 Mar 2026</li>
                  <li>• HS Codes: 3213.10.00.00 (primer), 3209.10.00.20 (paints)</li>
                  <li>• EORI: GB587647968000</li>
                  <li>• Origin: Canada (non-hazardous water-based acrylic)</li>
                  <li>• VAT: Zero-rated on export to Ireland (reverse charge mechanism)</li>
                  <li>• Discount: 30% professional trade discount applied</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Application Methods */}
        <div>
          <button
            onClick={() => setShowMethods(!showMethods)}
            className="w-full flex items-center justify-between py-3 px-4 border transition-colors"
            style={{ borderColor }}
          >
            <span 
              className="font-display text-sm font-bold"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              APPLICATION METHODOLOGY
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300`}
              style={{ 
                color: accentColor,
                transform: showMethods ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 border-l border-r border-b ${bgClass}`}
            style={{ 
              borderColor,
              maxHeight: showMethods ? '400px' : '0px'
            }}
          >
            <div className="p-4">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <th className="text-left py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Method</th>
                    <th className="text-left py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Specification</th>
                    <th className="text-left py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Best For</th>
                  </tr>
                </thead>
                <tbody style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 font-medium">HVLP Spray</td>
                    <td className="py-2">Graco TurboForce 9.5 or equivalent (not airless); gravity-feed for floors</td>
                    <td className="py-2">Walls requiring seamless finish for close-projection pixel mapping</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 font-medium">Roller</td>
                    <td className="py-2">Mohair/short-pile lint-free roller</td>
                    <td className="py-2">Ceilings, secondary surfaces, or budget-driven installations</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Air-Assisted Airless</td>
                    <td className="py-2">Acceptable only with competent sprayer</td>
                    <td className="py-2">Large surface areas where HVLP coverage speed insufficient</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 pt-4 border-t text-xs" style={{ borderColor, color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                <div className="font-medium mb-1" style={{ color: accentColor }}>Coverage Validation:</div>
                <ul className="space-y-1">
                  <li>• Smarter Surfaces: 25m² per unit (2-coat system)</li>
                  <li>• Goo Primer: 7.5m² per 3.78Lt (2 coats)</li>
                  <li>• Goo Max Contrast: 6m² per 3.78Lt (2 coats with 5% water dilution)</li>
                  <li>• Goo Rear Projection: 5m² per 2Lt (2 thin sprayed coats)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
