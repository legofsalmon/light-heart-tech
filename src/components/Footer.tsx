interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  const borderColor = isDarkMode ? 'border-[#1F1F1F]' : 'border-gray-200';
  const textColor = isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500';
  const accentColor = isDarkMode ? 'text-[#00F0FF]' : 'text-[#0066CC]';

  return (
    <footer className={`border-t ${borderColor} ${isDarkMode ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className={`text-xs mono text-center sm:text-left ${textColor}`}>
            <span className={accentColor}>LIGHTHEART</span> — IMMERSIVE EXPERIENCE
          </div>
          <div className={`text-[10px] mono text-center sm:text-right ${textColor}`}>
            TECHNICAL SPECIFICATION BY <span className={accentColor}>IDIRNET</span> | 4 MARCH 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
