import CopyEmail from './CopyEmail';

interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  const borderColor = isDarkMode ? 'border-[#1F1F1F]' : 'border-gray-200';
  const textColor = isDarkMode ? 'text-[#666]' : 'text-gray-400';
  const accentColor = isDarkMode ? 'text-[#00F0FF]' : 'text-[#0066CC]';
  const bgStyle = isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f0f0ec]';

  return (
    <footer className={`border-t ${borderColor} ${bgStyle}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <div className={`text-xs tracking-wider mb-1 ${textColor}`}>
              <span className={accentColor}>LIGHTHEART</span> — IMMERSIVE EXPERIENCE
            </div>
            <div className={`text-[10px] tracking-wider ${textColor}`}>
              Dublin, Ireland · Target Opening September 2026
            </div>
          </div>
          <div className="text-right">
            <div className={`text-[10px] tracking-wider mb-1 ${textColor}`}>
              TECHNICAL SPECIFICATION BY <span className={accentColor}>IDIRNET</span>
            </div>
            <div className={`text-[10px] tracking-wider ${textColor}`}>
              Document Date: 4 March 2026
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t ${borderColor} mb-4`} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className={`text-[10px] tracking-wider ${textColor}`}>
            Project Lead: Krisjanis Berzins · <CopyEmail email="kris@idirnet.com" isDarkMode={isDarkMode} />
          </div>
          <div className={`flex items-center gap-4 text-[10px] tracking-wider ${textColor}`}>
            <a
              href="https://docs.google.com/document/d/e/2PACX-1vSJ8rnmkn1zCp507nFc3UPsdmSSrHNW4vzEv1AQnuyF73XIIx9vU3vRShav2kqxNhbdsMky_7s035VO/pub"
              target="_blank"
              rel="noopener noreferrer"
              className={`${accentColor} hover:underline transition-colors`}
            >
              Source Document
            </a>
            <span>v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
