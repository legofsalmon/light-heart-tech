import { useState } from 'react';
import { FileText, ExternalLink, X, Download } from 'lucide-react';

interface FloatingActionButtonProps {
  isDarkMode: boolean;
}

// Helper to convert object to CSV
function objectToCSV(obj: Record<string, unknown>): string {
  const lines: string[] = [];
  
  function processObject(obj: Record<string, unknown>, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (value === null || value === undefined) {
        lines.push(`"${fullKey}",""`);
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        processObject(value as Record<string, unknown>, fullKey);
      } else if (Array.isArray(value)) {
        lines.push(`"${fullKey}","${value.join('; ')}"`);
      } else {
        lines.push(`"${fullKey}","${value}"`);
      }
    }
  }
  
  processObject(obj);
  return 'Key,Value\n' + lines.join('\n');
}

export default function FloatingActionButton({ isDarkMode }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';
  const bgClass = isDarkMode ? 'bg-[#0A0A0A]' : 'bg-white';
  const borderClass = isDarkMode ? 'border-[#1F1F1F]' : 'border-gray-200';
  const textClass = isDarkMode ? 'text-white' : 'text-black';
  const subTextClass = isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500';

  const handleDownloadFullSpecs = () => {
    const fullSpecs = {
      project: {
        name: 'Lightheart Immersive Experience',
        lead: 'Krisjanis Berzins',
        email: 'kris@idirnet.com',
        client: 'Lightheart Ltd',
        location: 'Dublin, Ireland',
        commencement: '11 February 2026',
        completion: '4 March 2026',
        targetOpening: 'September 2026',
      },
      systems: {
        projection: {
          totalUnits: 37,
          models: 'Barco I600-4K10, I600-4K8, G50-W8',
          estimatedCost: '€943,100',
          riggingWeight: '1,009.1 kg',
          powerDraw: '24,510W',
          heatLoad: '82,880 BTU/h',
        },
        audio: {
          totalSpeakers: 71,
          configuration: '48 X8i Surround, 37 X6i Height, 16 SYVA SUB',
          room1Cost: '€226,454',
          room2Cost: '€175,132',
          protocol: 'Milan-AVB (IEEE 802.1)',
        },
        network: {
          fiber: '50× OS2 4-core LC (200 fiber strands)',
          copper: '75× Cat6a S/FTP',
          switchPorts: '88× 10Gb PoE+, 64× 100G QSFP28',
          avbSwitches: '4× L-Acoustics LS10',
        },
        servers: {
          mediaServers: '5× Pixera PX2 Octo',
          totalCost: '€443,103',
          powerDraw: '6,202W (~27A @ 230V)',
          heatLoad: '21,161 BTU/h',
          ups: '2× 10kVA APC SRT (N+1 Redundancy)',
        },
        sensors: {
          model: 'Luxonis OAK-D Pro Wide (FF)',
          quantity: '28 units (Room 1)',
          bandwidth: '70 Gbps aggregate',
          heatOutput: '2,388 BTU/h',
        },
        hvac: {
          totalHeatLoad: '118,491 BTU/h',
          minimumRequired: '148,114 BTU/h (25% margin)',
          recommended: '177,737 BTU/h (50% margin)',
        },
      },
      vendors: {
        confirmed: 'Pixera (€275,000), Netgear (€93,080)',
        quoted: 'L-Acoustics (€401,586)',
        quoting: 'Barco',
        evaluating: 'Luxonis, DVIGear',
      },
    };
    
    const csv = objectToCSV(fullSpecs);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lightheart-full-specs.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
      {/* Menu */}
      <div 
        className={`absolute bottom-14 right-0 flex flex-col gap-2 transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <button
          onClick={handleDownloadFullSpecs}
          className={`flex items-center gap-2 px-3 py-2.5 ${bgClass} border ${borderClass} hover:border-[${accentColor}] transition-colors whitespace-nowrap`}
        >
          <Download className="w-4 h-4" style={{ color: accentColor }} />
          <div className="text-left">
            <div className={`text-xs ${textClass}`}>DOWNLOAD FULL SPECS</div>
            <div className={`text-[10px] mono ${subTextClass}`}>CSV Format</div>
          </div>
        </button>
        
        <a
          href="https://docs.google.com/document/d/1juq42IZ399FMBVwlw0rQkTeflEOXZSHoXTgtaoGd7BY/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-3 py-2.5 ${bgClass} border ${borderClass} hover:border-[${accentColor}] transition-colors whitespace-nowrap`}
        >
          <FileText className="w-4 h-4" style={{ color: accentColor }} />
          <div className="text-left">
            <div className={`text-xs ${textClass}`}>SOURCE DOCUMENT</div>
            <div className={`text-[10px] mono ${subTextClass}`}>Google Doc</div>
          </div>
          <ExternalLink className={`w-3 h-3 ${subTextClass}`} />
        </a>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 flex items-center justify-center transition-all duration-300"
        style={{ 
          backgroundColor: isOpen ? '#FF006E' : accentColor,
          color: isDarkMode ? (isOpen ? 'white' : 'black') : 'white'
        }}
      >
        {isOpen ? <X className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
      </button>
    </div>
  );
}
