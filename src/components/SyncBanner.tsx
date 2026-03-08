import { useState, useEffect } from 'react';
import { CheckCircle2, X, FileText, Loader2, AlertCircle } from 'lucide-react';
import { useLiveDoc } from '../data/LiveDocProvider';

interface SyncBannerProps {
  isDarkMode: boolean;
}

const DOC_URL = 'https://docs.google.com/document/d/e/2PACX-1vSJ8rnmkn1zCp507nFc3UPsdmSSrHNW4vzEv1AQnuyF73XIIx9vU3vRShav2kqxNhbdsMky_7s035VO/pub';

export default function SyncBanner({ isDarkMode }: SyncBannerProps) {
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);
  const { isLive, loading, error, sectionCount, lastFetched } = useLiveDoc();

  useEffect(() => {
    const timer = setTimeout(() => dismiss(), 30000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setHiding(true);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  const accent = isDarkMode ? '#00F0FF' : '#0066CC';
  const text = isDarkMode ? '#ccc' : '#444';
  const muted = isDarkMode ? '#888' : '#777';

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('en-IE', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
      });
    } catch (_e) { return iso; }
  };

  let statusIcon;
  let statusText;

  if (loading) {
    statusIcon = <Loader2 size={16} style={{ color: accent }} className="animate-spin" />;
    statusText = <span style={{ color: text }}>Scanning source document...</span>;
  } else if (isLive) {
    statusIcon = <CheckCircle2 size={16} style={{ color: '#39FF14' }} />;
    statusText = (
      <span style={{ color: text }}>
        <span style={{ color: accent }}>{sectionCount} sections</span> synced live from source document
        {lastFetched && (
          <span className="hidden sm:inline" style={{ color: muted }}> · {formatDate(lastFetched)}</span>
        )}
      </span>
    );
  } else {
    statusIcon = <AlertCircle size={16} style={{ color: '#FFA500' }} />;
    statusText = (
      <span style={{ color: text }}>
        Using cached data
        {error && <span className="hidden sm:inline" style={{ color: muted }}> · {error}</span>}
      </span>
    );
  }

  return (
    <div
      className={`fixed top-16 left-0 right-0 z-40 ${hiding ? 'sync-banner-hide' : 'sync-banner'}`}
      style={{
        backgroundColor: isDarkMode ? 'rgba(0, 240, 255, 0.04)' : 'rgba(0, 102, 204, 0.04)',
        borderBottom: `1px solid ${isDarkMode ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0, 102, 204, 0.1)'}`,
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {statusIcon}
          <div className="text-xs truncate">{statusText}</div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a href={DOC_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 rounded transition-colors"
            style={{ color: accent, border: `1px solid ${isDarkMode ? 'rgba(0,240,255,0.15)' : 'rgba(0,102,204,0.15)'}` }}
          >
            <FileText size={12} />
            <span className="hidden sm:inline">View Doc</span>
          </a>
          <button onClick={dismiss} className="p-1 rounded transition-colors" style={{ color: muted }}>
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
