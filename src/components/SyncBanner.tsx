import { useState, useEffect } from 'react';
import { CheckCircle2, X, FileText } from 'lucide-react';

interface SyncBannerProps {
  isDarkMode: boolean;
}

const DOC_URL = 'https://docs.google.com/document/d/e/2PACX-1vSJ8rnmkn1zCp507nFc3UPsdmSSrHNW4vzEv1AQnuyF73XIIx9vU3vRShav2kqxNhbdsMky_7s035VO/pub';

export default function SyncBanner({ isDarkMode }: SyncBannerProps) {
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => dismiss(), 30000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setHiding(true);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  const bg = isDarkMode ? 'rgba(0, 240, 255, 0.06)' : 'rgba(0, 102, 204, 0.06)';
  const border = isDarkMode ? 'rgba(0, 240, 255, 0.15)' : 'rgba(0, 102, 204, 0.15)';
  const accent = isDarkMode ? '#00F0FF' : '#0066CC';
  const text = isDarkMode ? '#ccc' : '#444';
  const muted = isDarkMode ? '#888' : '#777';

  return (
    <div
      className={`fixed top-16 left-0 right-0 z-40 ${hiding ? 'sync-banner-hide' : 'sync-banner'}`}
      style={{ backgroundColor: bg, borderBottom: `1px solid ${border}`, backdropFilter: 'blur(12px)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <CheckCircle2 size={16} style={{ color: accent, flexShrink: 0 }} />
          <div className="text-xs truncate" style={{ color: text }}>
            <span style={{ color: accent }}>15 sections</span> synced from source document
            <span className="hidden sm:inline" style={{ color: muted }}> · Last updated 4 March 2026</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={DOC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 rounded transition-colors"
            style={{ color: accent, border: `1px solid ${border}` }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(0,240,255,0.08)' : 'rgba(0,102,204,0.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <FileText size={12} />
            <span className="hidden sm:inline">View Doc</span>
          </a>
          <button
            onClick={dismiss}
            className="p-1 rounded transition-colors"
            style={{ color: muted }}
            onMouseEnter={(e) => { e.currentTarget.style.color = accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = muted; }}
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
