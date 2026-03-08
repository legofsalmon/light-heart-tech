import { FileText } from 'lucide-react';

interface FloatingDocLinkProps {
  isDarkMode: boolean;
}

const DOC_URL = 'https://docs.google.com/document/d/e/2PACX-1vSJ8rnmkn1zCp507nFc3UPsdmSSrHNW4vzEv1AQnuyF73XIIx9vU3vRShav2kqxNhbdsMky_7s035VO/pub';

export default function FloatingDocLink({ isDarkMode }: FloatingDocLinkProps) {
  const bg = isDarkMode ? 'bg-[#141414]' : 'bg-white';
  const border = isDarkMode ? 'border-[#333]' : 'border-[#ddd]';
  const accent = isDarkMode ? '#00d4ff' : '#0066cc';
  const textColor = isDarkMode ? 'text-[#aaa]' : 'text-[#666]';

  return (
    <a
      href={DOC_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 ${bg} border ${border} shadow-lg transition-all duration-300 group`}
      style={{
        borderRadius: '8px',
        boxShadow: isDarkMode
          ? '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 212, 255, 0.05)'
          : '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={(e) => {
        if (isDarkMode) {
          e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 212, 255, 0.1)';
        } else {
          e.currentTarget.style.borderColor = '#0066cc';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '';
        e.currentTarget.style.boxShadow = isDarkMode
          ? '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 212, 255, 0.05)'
          : '0 4px 20px rgba(0, 0, 0, 0.1)';
      }}
      title="View Source Document"
    >
      <FileText size={18} style={{ color: accent }} />
      <span className={`text-[10px] uppercase tracking-[0.15em] font-mono ${textColor} hidden sm:inline`}>
        Source Doc
      </span>
    </a>
  );
}
