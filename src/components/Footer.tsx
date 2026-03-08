interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  const borderColor = isDarkMode ? 'border-[#1a1a22]' : 'border-gray-200';
  const textColor = isDarkMode ? 'text-[#444]' : 'text-gray-400';
  const accentColor = isDarkMode ? 'text-[#00F0FF]' : 'text-[#0066CC]';

  return (
    <footer
      className={`border-t ${borderColor}`}
      style={{
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className={`text-[10px] tracking-[0.15em] text-center sm:text-left ${textColor}`}>
            <span className={accentColor}>LIGHTHEART</span> — IMMERSIVE EXPERIENCE
          </div>
          <div className={`text-[10px] tracking-[0.1em] text-center sm:text-right ${textColor}`}>
            TECHNICAL SPECIFICATION BY <span className={accentColor}>IDIRNET</span> | 4 MARCH 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
