'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useLiveDoc } from '@/data/LiveDocProvider';
import CopyEmail from '@/components/CopyEmail/CopyEmail';
import { TEAM, SPECS } from '@/data/constants';
import styles from './Footer.module.scss';

const DOC_URL =
  'https://docs.google.com/document/d/e/2PACX-1vSJ8rnmkn1zCp507nFc3UPsdmSSrHNW4vzEv1AQnuyF73XIIx9vU3vRShav2kqxNhbdsMky_7s035VO/pub';

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 10) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export default function Footer() {
  const { isDarkMode } = useTheme();
  const { isLive, loading, error, fetchedAt, sectionCount, refetch } = useLiveDoc();
  const accent = isDarkMode ? '#00F0FF' : '#004d80';
  const muted = isDarkMode ? '#666' : '#999';
  const border = isDarkMode ? '#1F1F1F' : '#ddd';

  // Tick every 30s to update "X ago" text
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  const syncColor = loading
    ? accent
    : isLive
      ? (isDarkMode ? '#39FF14' : '#1a8a1a')
      : '#FFA500';

  return (
    <footer
      className={styles.footer}
      style={{
        borderTopColor: border,
        backgroundColor: isDarkMode ? '#0a0a0a' : '#f0f0ec',
      }}
    >
      <div className={styles.inner}>
        {/* Sync status bar */}
        <div className={styles.syncBar} style={{ borderBottomColor: border }}>
          <div className={styles.syncLeft}>
            {loading ? (
              <Loader2 size={12} style={{ color: syncColor }} className={styles.spin} />
            ) : isLive ? (
              <CheckCircle2 size={12} style={{ color: syncColor }} />
            ) : (
              <AlertCircle size={12} style={{ color: syncColor }} />
            )}
            <span className={styles.syncText} style={{ color: muted }}>
              {loading ? (
                'Syncing from source document...'
              ) : isLive ? (
                <>
                  <span style={{ color: syncColor }}>{sectionCount} sections</span>
                  {' '}synced
                  {fetchedAt && (
                    <span style={{ color: isDarkMode ? '#555' : '#aaa' }}>
                      {' '}· {timeAgo(fetchedAt)}
                    </span>
                  )}
                </>
              ) : (
                <>
                  Using cached data
                  {error && (
                    <span style={{ color: isDarkMode ? '#555' : '#aaa' }}>
                      {' '}· {error}
                    </span>
                  )}
                </>
              )}
            </span>
          </div>
          <button
            onClick={refetch}
            className={styles.refreshBtn}
            style={{ color: accent, borderColor: `${accent}30` }}
            title="Refresh data from source document"
            aria-label="Refresh data"
          >
            <RefreshCw size={11} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Top row */}
        <div className={styles.topRow}>
          <div>
            <div className={styles.small} style={{ color: muted }}>
              <span style={{ color: accent }}>LIGHTHEART</span> — IMMERSIVE GALLERY
            </div>
            <div className={styles.tiny} style={{ color: muted }}>
              Dublin, Ireland · Opening {SPECS.opening}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className={styles.tiny} style={{ color: muted }}>
              {TEAM.brendan.name} · {TEAM.kev.name} · {TEAM.kris.name}
            </div>
            <div className={styles.tiny} style={{ color: muted }}>
              Technical Specification by <span style={{ color: accent }}>IDIRNET</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} style={{ borderTopColor: border }} />

        {/* Bottom row */}
        <div className={styles.bottomRow}>
          <div className={styles.tiny} style={{ color: muted }}>
            Project Lead: Krisjanis Berzins · <CopyEmail email="kris@idirnet.com" />
          </div>
          <div className={styles.bottomRight}>
            <a
              href={DOC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              style={{ color: accent }}
            >
              Source Document
            </a>
            <span style={{ color: muted }}>v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
