'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, X, FileText, Loader2, AlertCircle } from 'lucide-react';
import { useLiveDoc } from '@/data/LiveDocProvider';
import { useTheme } from '@/components/ThemeProvider';
import styles from './SyncBanner.module.scss';

const DOC_URL =
  'https://docs.google.com/document/d/e/2PACX-1vSJ8rnmkn1zCp507nFc3UPsdmSSrHNW4vzEv1AQnuyF73XIIx9vU3vRShav2kqxNhbdsMky_7s035VO/pub';

export default function SyncBanner() {
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);
  const { isLive, loading, error, sectionCount, lastFetched } = useLiveDoc();
  const { isDarkMode } = useTheme();

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
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  let statusIcon;
  let statusText;

  if (loading) {
    statusIcon = <Loader2 size={16} style={{ color: accent }} className={styles.spin} />;
    statusText = <span style={{ color: text }}>Scanning source document...</span>;
  } else if (isLive) {
    statusIcon = <CheckCircle2 size={16} style={{ color: '#39FF14' }} />;
    statusText = (
      <span style={{ color: text }}>
        <span style={{ color: accent }}>{sectionCount} sections</span> synced live from source
        document
        {lastFetched && (
          <span className={styles.hideMobile} style={{ color: muted }}>
            {' '}· {formatDate(lastFetched)}
          </span>
        )}
      </span>
    );
  } else {
    statusIcon = <AlertCircle size={16} style={{ color: '#FFA500' }} />;
    statusText = (
      <span style={{ color: text }}>
        Using cached data
        {error && (
          <span className={styles.hideMobile} style={{ color: muted }}>
            {' '}· {error}
          </span>
        )}
      </span>
    );
  }

  return (
    <div
      className={`${styles.banner} ${hiding ? 'sync-banner-hide' : 'sync-banner'}`}
      style={{
        backgroundColor: isDarkMode
          ? 'rgba(0, 240, 255, 0.04)'
          : 'rgba(0, 102, 204, 0.04)',
        borderBottom: `1px solid ${
          isDarkMode ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0, 102, 204, 0.1)'
        }`,
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className={styles.inner}>
        <div className={styles.left}>
          {statusIcon}
          <div className={styles.statusText}>{statusText}</div>
        </div>
        <div className={styles.right}>
          <a
            href={DOC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.docLink}
            style={{
              color: accent,
              borderColor: isDarkMode
                ? 'rgba(0,240,255,0.15)'
                : 'rgba(0,102,204,0.15)',
            }}
          >
            <FileText size={12} />
            <span className={styles.hideMobile}>View Doc</span>
          </a>
          <button onClick={dismiss} className={styles.closeBtn} style={{ color: muted }}>
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
