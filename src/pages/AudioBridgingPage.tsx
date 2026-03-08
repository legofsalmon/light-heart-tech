import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronDown, Download, AlertTriangle, Cable, Network, Clock } from 'lucide-react';

interface AudioBridgingPageProps {
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
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 px-2 text-left">
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

export default function AudioBridgingPage({ isDarkMode }: AudioBridgingPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const ctx = gsap.context(() => {
      gsap.from('.bridge-card', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'expo.out', delay: 0.3 });
    }, page);
    return () => ctx.revert();
  }, []);

  const handleDownload = () => {
    const csv = `Feature,AVB/Milan,Dante
Standard,IEEE 802.1 (open),Audinate proprietary
Latency,Guaranteed <2ms,Typically 1-4ms
Redundancy,Seamless failover,Seamless failover
L-ISA Support,Native,Not supported
Device Discovery,Automatic,Automatic
Network QoS,Built-in,Requires configuration`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'lightheart-audio-bridging.csv';
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';
  const borderColor = isDarkMode ? '#1F1F1F' : '#E5E5E5';
  const subTextColor = isDarkMode ? '#A0A0A0' : '#666666';
  const cardBg = isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
  const warnBg = isDarkMode ? 'rgba(255, 0, 80, 0.08)' : 'rgba(255, 0, 80, 0.05)';

  return (
    <div ref={pageRef} className="page-enter min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
            <span className={`text-xs mono tracking-wider ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>SECTION 09</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>AUDIO BRIDGING</h1>
              <p className="max-w-xl text-sm sm:text-base" style={{ color: subTextColor }}>
                Bridging architectures for Milan-AVB to Dante/MADI integration. Protocol compatibility and integration points.
              </p>
            </div>
            <button onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 text-sm border transition-colors w-full sm:w-auto justify-center"
              style={{ borderColor: accentColor, color: accentColor }}>
              <Download className="w-4 h-4" /> DOWNLOAD CSV
            </button>
          </div>
        </div>

        {/* Critical warning */}
        <div className="border p-5 mb-6" style={{ borderColor: 'rgba(255, 0, 80, 0.3)', background: warnBg }}>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#FF006E' }} />
            <div>
              <div className="font-display font-bold text-sm mb-1" style={{ color: '#FF006E' }}>
                CRITICAL NOTE
              </div>
              <p className="text-sm" style={{ color: isDarkMode ? '#ccc' : '#444' }}>
                L-ISA Processor II does NOT support Dante natively. The system is AVB/Milan only. This creates a protocol boundary that requires careful consideration when integrating with building systems or media servers.
              </p>
            </div>
          </div>
        </div>

        {/* Protocol comparison */}
        <div className="bridge-card border p-5 mb-6" style={{ borderColor, background: cardBg }}>
          <h2 className="font-display text-base font-bold mb-4" style={{ color: isDarkMode ? '#fff' : '#000' }}>
            PROTOCOL COMPARISON
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                  <th className="text-left py-2 pr-4 text-xs tracking-wider" style={{ color: subTextColor }}>Feature</th>
                  <th className="text-left py-2 pr-4 text-xs tracking-wider" style={{ color: accentColor }}>AVB/Milan</th>
                  <th className="text-left py-2 text-xs tracking-wider" style={{ color: subTextColor }}>Dante</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Standard', 'IEEE 802.1 (open)', 'Audinate proprietary'],
                  ['Latency', 'Guaranteed <2ms', 'Typically 1-4ms'],
                  ['Redundancy', 'Seamless failover', 'Seamless failover'],
                  ['L-ISA Support', 'Native', 'Not supported'],
                  ['Device Discovery', 'Automatic', 'Automatic'],
                  ['Network QoS', 'Built-in', 'Requires configuration'],
                ].map(([feature, avb, dante], i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td className="py-2 pr-4" style={{ color: isDarkMode ? '#ccc' : '#333' }}>{feature}</td>
                    <td className="py-2 pr-4" style={{ color: accentColor }}>{avb}</td>
                    <td className="py-2" style={{ color: subTextColor }}>{dante}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Milan-AVB specs */}
        <div className="bridge-card border p-5 mb-6" style={{ borderColor, background: cardBg }}>
          <div className="flex items-center gap-2 mb-4">
            <Network className="w-5 h-5" style={{ color: accentColor }} />
            <h2 className="font-display text-base font-bold" style={{ color: isDarkMode ? '#fff' : '#000' }}>MILAN-AVB SPECIFICATION</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            {[
              ['Standard', 'IEEE 802.1BA-2011 + Avnu ProAV 1.1'],
              ['Bandwidth', '1 Gbit/s per link'],
              ['Latency', '2 ms maximum (guaranteed)'],
              ['Redundancy', 'Seamless failover (primary/secondary)'],
              ['Channels/Stream', 'Up to 8 channels'],
              ['Max Streams (LS10)', '150 streams'],
              ['Clocking', 'gPTP (IEEE 802.1AS)'],
            ].map(([label, value], i) => (
              <div key={i}>
                <div className="text-[10px] tracking-wider mb-1" style={{ color: subTextColor }}>{label}</div>
                <div style={{ color: isDarkMode ? '#fff' : '#000' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Options */}
        <Accordion title="OPTION 1: AVB-TO-DANTE BRIDGE/CONVERTER" defaultOpen={true} isDarkMode={isDarkMode}>
          <p className="mb-3">A hardware converter device can bridge between AVB and Dante networks. This is the recommended approach if Dante integration is required.</p>
          <div className="mb-2" style={{ color: '#39FF14' }}>Pros: Maintains audio quality, supports full channel count</div>
          <div style={{ color: '#FF006E' }}>Cons: Additional cost, potential latency increase, single point of failure</div>
        </Accordion>

        <Accordion title="OPTION 2: MADI INTERFACE" isDarkMode={isDarkMode}>
          <p className="mb-3">L-ISA Processor II supports MADI (Multichannel Audio Digital Interface) via BNC connectors. MADI can be used to connect to non-AVB equipment.</p>
          <div className="mb-2" style={{ color: '#39FF14' }}>Pros: Low latency, high channel count (64 channels @ 48kHz)</div>
          <div style={{ color: '#FF006E' }}>Cons: Requires MADI-equipped devices, point-to-point only</div>
        </Accordion>

        <Accordion title="OPTION 3: AES/EBU DIGITAL AUDIO" isDarkMode={isDarkMode}>
          <p className="mb-3">L-ISA Processor II and LA7.16i amplifiers support AES/EBU (AES3) digital audio via XLR connectors for limited channel counts.</p>
          <div className="mb-2" style={{ color: '#39FF14' }}>Pros: Universal compatibility, simple wiring</div>
          <div style={{ color: '#FF006E' }}>Cons: Limited to 2 channels per connection, requires multiple cables</div>
        </Accordion>

        {/* Pixera integration warning */}
        <div className="border p-5 my-6" style={{ borderColor: 'rgba(255, 165, 0, 0.3)', background: isDarkMode ? 'rgba(255, 165, 0, 0.05)' : 'rgba(255, 165, 0, 0.03)' }}>
          <div className="font-display font-bold text-sm mb-2" style={{ color: '#FFA500' }}>PIXERA MEDIA SERVER INTEGRATION</div>
          <p className="text-sm" style={{ color: isDarkMode ? '#ccc' : '#444' }}>
            Pixera does NOT support AVB natively. Potential integration paths have been identified but require evaluation during the next phase.
          </p>
        </div>

        {/* Network topology */}
        <Accordion title="PHYSICAL NETWORK TOPOLOGY" isDarkMode={isDarkMode}>
          <div className="space-y-2">
            {[
              ['LS10 Switches', '2 per room (primary + secondary redundancy)'],
              ['L-ISA Processor II', 'Dual EtherCon ports for redundant connection'],
              ['LA7.16i Amplifiers', 'Dual RJ45/EtherCon for redundant AVB input'],
              ['Cabling', 'Cat6A or better, shielded recommended'],
            ].map(([label, value], i) => (
              <div key={i} className="flex gap-4 py-1" style={{ borderBottom: `1px solid ${borderColor}` }}>
                <span className="text-xs tracking-wider shrink-0 w-32" style={{ color: accentColor }}>{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </Accordion>

        <Accordion title="SYNCHRONIZATION ARCHITECTURE" isDarkMode={isDarkMode}>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4" style={{ color: accentColor }} />
            <span className="font-bold" style={{ color: isDarkMode ? '#fff' : '#000' }}>Clock Distribution</span>
          </div>
          <div className="space-y-2 mb-4">
            {[
              ['Internal Clock', 'L-ISA Processor II as Grandmaster'],
              ['External Clock', 'Meinberg sync generator (TBC)'],
              ['Word Clock', 'BNC I/O on L-ISA Processor II'],
              ['MADI Clock', 'Embedded in MADI stream'],
            ].map(([label, value], i) => (
              <div key={i} className="flex gap-4 py-1" style={{ borderBottom: `1px solid ${borderColor}` }}>
                <span className="text-xs tracking-wider shrink-0 w-32" style={{ color: accentColor }}>{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
          <p className="text-sm">For lip-sync accuracy with video playback, timecode alignment is required. Target: &lt;1 frame audio-video offset.</p>
          <p className="text-sm mt-2 font-bold" style={{ color: '#FFA500' }}>NOTE: Sync generator quote is TBC. This is required for proper A/V synchronization.</p>
        </Accordion>

        <Accordion title="CABLING REQUIREMENTS" isDarkMode={isDarkMode}>
          <div className="flex items-center gap-2 mb-3">
            <Cable className="w-4 h-4" style={{ color: accentColor }} />
            <span className="font-bold" style={{ color: isDarkMode ? '#fff' : '#000' }}>Network Cabling</span>
          </div>
          <div className="space-y-2 mb-4">
            {[
              ['AVB Primary', 'Cat6A STP (shielded twisted pair), black jacket'],
              ['AVB Secondary', 'Cat6A STP, red jacket (for redundancy identification)'],
              ['Maximum Length', '100m per segment (Cat6A)'],
              ['Connectors', 'Neutrik EtherCON (ruggedized RJ45)'],
              ['L-Acoustics Cable', 'DOE2/DOE45/DOE100 (dual AVB cable with color coding)'],
            ].map(([label, value], i) => (
              <div key={i} className="flex gap-4 py-1" style={{ borderBottom: `1px solid ${borderColor}` }}>
                <span className="text-xs tracking-wider shrink-0 w-32" style={{ color: accentColor }}>{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
          <div className="font-bold mt-4 mb-2" style={{ color: isDarkMode ? '#fff' : '#000' }}>Speaker Cabling</div>
          <div className="space-y-2">
            {[
              ['X8i/X6i', '2.5mm² recommended, terminal block connection'],
              ['SYVA SUB', '2.5mm² minimum, speakON NL4 or terminal block'],
              ['Maximum Length', '30m @ 8Ω with 2.5mm²'],
              ['L-Acoustics Cable', 'SC32-BE (32-conductor for LA7.16i installations)'],
            ].map(([label, value], i) => (
              <div key={i} className="flex gap-4 py-1" style={{ borderBottom: `1px solid ${borderColor}` }}>
                <span className="text-xs tracking-wider shrink-0 w-32" style={{ color: accentColor }}>{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </Accordion>

        <Accordion title="RECOMMENDATIONS" isDarkMode={isDarkMode}>
          <ol className="space-y-3">
            <li><span className="font-bold" style={{ color: isDarkMode ? '#fff' : '#000' }}>1. Confirm Pixera AVB Support</span><br />Prioritize confirming whether Pixera supports AVB natively. This is the single most important factor in determining the bridging architecture.</li>
            <li><span className="font-bold" style={{ color: isDarkMode ? '#fff' : '#000' }}>2. Define Network Handover Point</span><br />Work with the building IT contractor to define the physical and logical handover point between AVB and building networks.</li>
            <li><span className="font-bold" style={{ color: isDarkMode ? '#fff' : '#000' }}>3. Budget for Converter (if needed)</span><br />If Pixera does not support AVB, budget €2,000-6,000 for an AVB-to-Dante/MADI converter.</li>
            <li><span className="font-bold" style={{ color: isDarkMode ? '#fff' : '#000' }}>4. Include Sync Generator</span><br />Ensure the sync generator is quoted and included for proper A/V synchronization.</li>
          </ol>
        </Accordion>
      </div>
    </div>
  );
}
