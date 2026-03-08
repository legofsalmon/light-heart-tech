interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode: _isDarkMode }: FooterProps) {
  return (
    <footer
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-[10px] tracking-[0.15em] text-center sm:text-left text-[#444] font-mono">
            <span className="text-[#00F0FF]">LIGHTHEART</span> — IMMERSIVE EXPERIENCE
          </div>
          <div className="text-[10px] tracking-[0.1em] text-center sm:text-right text-[#444] font-mono">
            TECHNICAL SPECIFICATION BY <span className="text-[#00F0FF]">IDIRNET</span> | 4 MARCH 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
