'use client';

import { isSpecList } from './smartDetect';
import styles from './SmartList.module.scss';

interface SmartListProps {
  items: string[];
}

/**
 * Smart list renderer:
 * - Spec lists (containing "key: value" patterns) → styled spec items
 * - Regular lists → cyan bullet list
 */
export default function SmartList({ items }: SmartListProps) {
  if (!items || items.length === 0) return null;

  if (isSpecList(items)) {
    return (
      <div className={styles.specList}>
        {items.map((item, i) => {
          // Split on first colon or dash
          const colonIdx = item.indexOf(':');
          const dashIdx = item.indexOf('–');
          const splitIdx = colonIdx > 0 ? colonIdx : dashIdx > 0 ? dashIdx : -1;

          if (splitIdx > 0 && splitIdx < item.length * 0.6) {
            const label = item.substring(0, splitIdx).trim();
            const value = item.substring(splitIdx + 1).trim();
            return (
              <div key={i} className={styles.specItem}>
                <span className={styles.specLabel}>{label}</span>
                <span className={styles.specValue}>{value}</span>
              </div>
            );
          }

          return (
            <div key={i} className={styles.specItemFull}>
              {item}
            </div>
          );
        })}
      </div>
    );
  }

  // Regular bullet list
  return (
    <ul className={styles.bulletList}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
