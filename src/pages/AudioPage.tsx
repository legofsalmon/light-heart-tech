import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Speaker, Radio, Download, ChevronDown, AlertTriangle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AudioPageProps {
  isDarkMode: boolean;
}

export default function AudioPage({ isDarkMode }: AudioPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [showRoom1, setShowRoom1] = useState(false);
  const [showRoom2, setShowRoom2] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.from('.audio-card', {
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

  const handleDownload = () => {
    // EXACT DATA FROM PDF - COPIED WITHOUT MODIFICATION
    const csvContent = `Room,Component,Quantity,Role,Coverage,Max SPL,Cost
Room 1,X8i,20,Surround speakers,90° axisymmetric,129 dB,
Room 1,X6i,20,Height/overhead speakers,90° axisymmetric,123 dB,
Room 1,SYVA SUB,8,Subwoofers,Omni (stacked),128 dB,
Room 1,LA7.16i CE,3,16-channel amplified controller (16 x 1300W @ 8Ω),,,
Room 1,L-ISA Processor II,1,Spatial audio processor (upgraded to 64 outputs),,,
Room 1,LS10,2,AVB/Milan network switch (10-port),,,
Room 1,RME MADIface USB,1,USB audio interface,,,
Room 1,Equipment (discounted),,,,€178.417,75
Room 1,VAT (23%),,,,€41.036,08
Room 1,Fire Safe Cable,,,,€7.000,00
Room 1,Installation Materials,,,,Included,
Room 1,TOTAL,,,,€226.453,83
Room 2,X8i,14,Surround speakers,90° axisymmetric,129 dB,
Room 2,X6i,17,Height/overhead speakers,90° axisymmetric,123 dB,
Room 2,SYVA SUB,8,Subwoofers,Omni (stacked),128 dB,
Room 2,LA7.16i CE,3,16-channel amplified controller (16 x 1300W @ 8Ω),,,
Room 2,L-ISA Processor II,1,Spatial audio processor (shared license),,,
Room 2,LS10,2,AVB/Milan network switch (10-port),,,
Room 2,Q-Sys Core 8 Flex,1,System processing (shared with Room 1),,,
Room 2,Q-Sys 5" Touchscreen,1,Control interface (shared with Room 1),,,
Room 2,RME MADIface USB,1,USB audio interface,,,
Room 2,Equipment (discounted),,,,€137.604,00
Room 2,VAT (23%),,,,€31.027,93
Room 2,Fire Safe Cable,,,,€6.500,00
Room 2,Installation Materials,,,,Included,
Room 2,TOTAL,,,,€175.131,93
TOTAL BOTH ROOMS,,,,,€401.585,76`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lightheart-audio-specs.csv';
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
              SECTION 08
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                AUDIO SYSTEM / L-ISA
              </h1>
              <p 
                className="max-w-xl text-sm sm:text-base"
                style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}
              >
                L-Acoustics L-ISA immersive audio system. Object-based spatial audio 
                with 71 speakers positioned around and above visitors.
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

        {/* Stats */}
        <div 
          className={`p-4 mb-6 sm:mb-8 border ${bgClass}`}
          style={{ borderColor }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div 
                className="font-display text-2xl font-bold"
                style={{ color: accentColor }}
              >
                71
              </div>
              <div className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                TOTAL SPEAKERS
              </div>
            </div>
            <div>
              <div 
                className="font-display text-2xl font-bold"
                style={{ color: accentColor }}
              >
                34
              </div>
              <div className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                X8i SURROUND
              </div>
            </div>
            <div>
              <div 
                className="font-display text-2xl font-bold"
                style={{ color: accentColor }}
              >
                37
              </div>
              <div className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                X6i HEIGHT
              </div>
            </div>
            <div>
              <div 
                className="font-display text-2xl font-bold"
                style={{ color: accentColor }}
              >
                16
              </div>
              <div className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                SYVA SUB
              </div>
            </div>
          </div>
        </div>

        {/* Room Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Room 1 */}
          <div 
            className="audio-card border p-5"
            style={{ borderColor }}
          >
            <div 
              className="flex items-center justify-between mb-4 pb-3 border-b"
              style={{ borderColor }}
            >
              <h3 
                className="font-display text-lg font-bold"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                ROOM 1 — MAIN GALLERY
              </h3>
              <span 
                className="font-display text-xl font-bold"
                style={{ color: accentColor }}
              >
                €226,454
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className={`text-xs mono mb-2 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                  SPEAKER CONFIGURATION
                </h4>
                <div className="space-y-1">
                  {[
                    { type: 'X8i Surround', qty: 20, spl: '129 dB' },
                    { type: 'X6i Height', qty: 20, spl: '123 dB' },
                    { type: 'SYVA SUB', qty: 8, spl: '128 dB' },
                  ].map((speaker, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between py-1.5 border-b text-sm"
                      style={{ borderColor }}
                    >
                      <div className="flex items-center gap-2">
                        <Speaker className="w-3 h-3" style={{ color: accentColor }} />
                        <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>{speaker.type}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span 
                          className="font-display font-bold"
                          style={{ color: accentColor }}
                        >
                          {speaker.qty}
                        </span>
                        <span className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                          {speaker.spl}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className={`text-xs mono mb-2 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                  ELECTRONICS
                </h4>
                <div className="space-y-1">
                  {[
                    { name: 'LA7.16i CE', qty: 3, desc: '16-channel amplified controller' },
                    { name: 'L-ISA Processor II', qty: 1, desc: 'Spatial audio processor' },
                    { name: 'LS10 AVB Switch', qty: 2, desc: 'Milan-certified network' },
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between py-1.5 border-b text-sm"
                      style={{ borderColor }}
                    >
                      <div className="flex items-center gap-2">
                        <Radio className="w-3 h-3" style={{ color: accentColor }} />
                        <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>{item.name}</span>
                      </div>
                      <span 
                        className="font-display font-bold"
                        style={{ color: accentColor }}
                      >
                        {item.qty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Room 2 */}
          <div 
            className="audio-card border p-5"
            style={{ borderColor }}
          >
            <div 
              className="flex items-center justify-between mb-4 pb-3 border-b"
              style={{ borderColor }}
            >
              <h3 
                className="font-display text-lg font-bold"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                ROOM 2 — SECONDARY GALLERY
              </h3>
              <span 
                className="font-display text-xl font-bold"
                style={{ color: accentColor }}
              >
                €175,132
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className={`text-xs mono mb-2 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                  SPEAKER CONFIGURATION
                </h4>
                <div className="space-y-1">
                  {[
                    { type: 'X8i Surround', qty: 14, spl: '129 dB' },
                    { type: 'X6i Height', qty: 17, spl: '123 dB' },
                    { type: 'SYVA SUB', qty: 8, spl: '128 dB' },
                  ].map((speaker, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between py-1.5 border-b text-sm"
                      style={{ borderColor }}
                    >
                      <div className="flex items-center gap-2">
                        <Speaker className="w-3 h-3" style={{ color: accentColor }} />
                        <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>{speaker.type}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span 
                          className="font-display font-bold"
                          style={{ color: accentColor }}
                        >
                          {speaker.qty}
                        </span>
                        <span className={`text-xs mono ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                          {speaker.spl}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className={`text-xs mono mb-2 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                  ELECTRONICS
                </h4>
                <div className="space-y-1">
                  {[
                    { name: 'LA7.16i CE', qty: 3, desc: '16-channel amplified controller' },
                    { name: 'L-ISA Processor II', qty: 1, desc: 'Shared license' },
                    { name: 'LS10 AVB Switch', qty: 2, desc: 'Milan-certified network' },
                    { name: 'Q-Sys Core 8 Flex', qty: 1, desc: 'Shared with Room 1' },
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between py-1.5 border-b text-sm"
                      style={{ borderColor }}
                    >
                      <div className="flex items-center gap-2">
                        <Radio className="w-3 h-3" style={{ color: accentColor }} />
                        <span style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>{item.name}</span>
                      </div>
                      <span 
                        className="font-display font-bold"
                        style={{ color: accentColor }}
                      >
                        {item.qty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Room 1 Details */}
        <div className="mb-4">
          <button
            onClick={() => setShowRoom1(!showRoom1)}
            className="w-full flex items-center justify-between py-3 px-4 border transition-colors"
            style={{ borderColor }}
          >
            <span 
              className="font-display text-sm font-bold"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              ROOM 1 — COST BREAKDOWN
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300`}
              style={{ 
                color: accentColor,
                transform: showRoom1 ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 border-l border-r border-b ${bgClass}`}
            style={{ 
              borderColor,
              maxHeight: showRoom1 ? '400px' : '0px'
            }}
          >
            <div className="p-4">
              <table className="w-full text-xs">
                <tbody style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Equipment (discounted)</td>
                    <td className="py-2 text-right">€178,417.75</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>VAT (23%)</td>
                    <td className="py-2 text-right">€41,036.08</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Fire Safe Cable</td>
                    <td className="py-2 text-right">€7,000.00</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold" style={{ color: accentColor }}>TOTAL</td>
                    <td className="py-2 text-right font-bold" style={{ color: accentColor }}>€226,453.83</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-3 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                Quote Reference: QU-20070 dated 25 Feb 2026 (expires 27 Mar 2026)
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Room 2 Details */}
        <div className="mb-4">
          <button
            onClick={() => setShowRoom2(!showRoom2)}
            className="w-full flex items-center justify-between py-3 px-4 border transition-colors"
            style={{ borderColor }}
          >
            <span 
              className="font-display text-sm font-bold"
              style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
            >
              ROOM 2 — COST BREAKDOWN
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300`}
              style={{ 
                color: accentColor,
                transform: showRoom2 ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 border-l border-r border-b ${bgClass}`}
            style={{ 
              borderColor,
              maxHeight: showRoom2 ? '400px' : '0px'
            }}
          >
            <div className="p-4">
              <table className="w-full text-xs">
                <tbody style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Equipment (discounted)</td>
                    <td className="py-2 text-right">€137,604.00</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>VAT (23%)</td>
                    <td className="py-2 text-right">€31,027.93</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>Fire Safe Cable</td>
                    <td className="py-2 text-right">€6,500.00</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold" style={{ color: accentColor }}>TOTAL</td>
                    <td className="py-2 text-right font-bold" style={{ color: accentColor }}>€175,131.93</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-3 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                Quote Reference: QU-20071 dated 25 Feb 2026 (expires 27 Mar 2026)
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Technical Specifications */}
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
              TECHNICAL SPECIFICATIONS
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
              maxHeight: showSpecs ? '800px' : '0px'
            }}
          >
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-display text-sm font-bold mb-2" style={{ color: accentColor }}>X8i SPEAKER</h4>
                <ul className="space-y-1 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                  <li>• Type: 2-way passive coaxial enclosure</li>
                  <li>• LF Transducer: 8" cone driver</li>
                  <li>• HF Transducer: 1.5" neodymium compression driver</li>
                  <li>• Nominal Directivity: 90° axisymmetric</li>
                  <li>• Usable Bandwidth: 67 Hz - 20 kHz (-10 dB)</li>
                  <li>• Maximum SPL: 129 dB (Preset 1) / 123 dB (Preset 2)</li>
                  <li>• Nominal Impedance: 8 Ω</li>
                  <li>• RMS Power Handling: 197 W</li>
                  <li>• Dimensions: 240 × 490 × 217 mm</li>
                  <li>• Weight: 11 kg / 24 lb</li>
                  <li>• IP Rating: IP55</li>
                </ul>
              </div>
              <div>
                <h4 className="font-display text-sm font-bold mb-2" style={{ color: accentColor }}>LA7.16i AMPLIFIED CONTROLLER</h4>
                <ul className="space-y-1 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                  <li>• Output Power: 16 × 1300 W @ 8Ω / 16 × 1100 W @ 4Ω</li>
                  <li>• Amplification Class: High-efficiency Class D</li>
                  <li>• DSP: Gen. 5 Dual SHARC 32-bit floating-point, 96 kHz</li>
                  <li>• AVB Input: 128 channels (48/96 kHz), Milan-certified, AES67 compatible</li>
                  <li>• Latency: 3.84 ms (standard) / 1.18 ms (low latency mode)</li>
                  <li>• Dimensions: 483 × 88 × 434 mm (19" × 2U × 17.1")</li>
                  <li>• Weight: 14.5 kg / 32 lb</li>
                </ul>
              </div>
              <div>
                <h4 className="font-display text-sm font-bold mb-2" style={{ color: accentColor }}>L-ISA PROCESSOR II</h4>
                <ul className="space-y-1 text-xs" style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}>
                  <li>• Processing: Real-time spatial audio at 96 kHz</li>
                  <li>• Objects: Up to 96 objects with spatial processing</li>
                  <li>• Inputs: 128 hardware inputs (AVB/MADI/AES)</li>
                  <li>• Outputs: Up to 128 outputs (license-dependent)</li>
                  <li>• AVB Channels: 64 input / 128 output channels</li>
                  <li>• Latency: 3.2 ms (input to outputs)</li>
                  <li>• Boot Time: 31 seconds to AVB pass-through</li>
                  <li>• Dimensions: 483 × 133 × 458 mm (19" × 3U × 18")</li>
                  <li>• Weight: 11 kg / 24.3 lb</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Protocol Warning */}
        <div 
          className={`border p-4 ${bgClass}`}
          style={{ borderColor: '#FF006E' }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#FF006E' }} />
            <div>
              <h3 
                className="font-display text-sm font-bold mb-1"
                style={{ color: '#FF006E' }}
              >
                PROTOCOL NOTE — MILAN-AVB ONLY
              </h3>
              <p 
                className="text-xs"
                style={{ color: isDarkMode ? '#A0A0A0' : '#666666' }}
              >
                L-ISA Processor II does NOT support Dante natively. System is AVB/Milan only. 
                Integration with Pixera requires hardware converter or sync-based separation 
                with Meinberg sync generator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
