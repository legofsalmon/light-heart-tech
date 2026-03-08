'use client';

import styles from './Callout.module.scss';

type CalloutType = 'note' | 'warning' | 'action' | 'critical';

interface CalloutProps {
  text: string;
}

function detectType(text: string): CalloutType {
  const lower = text.trim().toLowerCase();
  if (lower.startsWith('critical:') || lower.startsWith('⚠')) return 'critical';
  if (lower.startsWith('warning:')) return 'warning';
  if (lower.startsWith('action required:') || lower.startsWith('action:')) return 'action';
  return 'note';
}

export default function Callout({ text }: CalloutProps) {
  const type = detectType(text);

  return (
    <div className={`${styles.callout} ${styles[type]}`}>
      <div className={styles.text}>{text}</div>
    </div>
  );
}
