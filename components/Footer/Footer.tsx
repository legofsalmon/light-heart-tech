'use client';

import { useTheme } from '@/components/ThemeProvider';
import CopyEmail from '@/components/CopyEmail/CopyEmail';
import styles from './Footer.module.scss';

const DOC_URL =
  'https://docs.google.com/document/d/e/2PACX-1vSJ8rnmkn1zCp507nFc3UPsdmSSrHNW4vzEv1AQnuyF73XIIx9vU3vRShav2kqxNhbdsMky_7s035VO/pub';

export default function Footer() {
  const { isDarkMode } = useTheme();
  const accent = isDarkMode ? '#00F0FF' : '#004d80';
  const muted = isDarkMode ? '#666' : '#999';
  const border = isDarkMode ? '#1F1F1F' : '#ddd';

  return (
    <footer
      className={styles.footer}
      style={{
        borderTopColor: border,
        backgroundColor: isDarkMode ? '#0a0a0a' : '#f0f0ec',
      }}
    >
      <div className={styles.inner}>
        {/* Top row */}
        <div className={styles.topRow}>
          <div>
            <div className={styles.small} style={{ color: muted }}>
              <span style={{ color: accent }}>LIGHTHEART</span> — IMMERSIVE EXPERIENCE
            </div>
            <div className={styles.tiny} style={{ color: muted }}>
              Dublin, Ireland · Target Opening September 2026
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className={styles.tiny} style={{ color: muted }}>
              TECHNICAL SPECIFICATION BY <span style={{ color: accent }}>IDIRNET</span>
            </div>
            <div className={styles.tiny} style={{ color: muted }}>
              Document Date: 4 March 2026
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
