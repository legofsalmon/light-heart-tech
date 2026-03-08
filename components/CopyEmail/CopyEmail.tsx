'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import styles from './CopyEmail.module.scss';

interface CopyEmailProps {
  email: string;
}

export default function CopyEmail({ email }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const { isDarkMode } = useTheme();
  const accent = isDarkMode ? '#00F0FF' : '#0066CC';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={styles.btn}
      style={{ color: accent }}
      title={`Click to copy ${email}`}
    >
      <span
        className={styles.email}
        style={{ borderColor: `${accent}60` }}
      >
        {email}
      </span>
      {copied ? (
        <span
          className={`copy-toast ${styles.badge}`}
          style={{ backgroundColor: `${accent}15`, color: accent }}
        >
          <Check size={12} /> Copied
        </span>
      ) : (
        <Copy size={12} className={styles.copyIcon} />
      )}
    </button>
  );
}
