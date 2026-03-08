'use client';

import styles from './SpecTable.module.scss';

interface SpecTableProps {
  rows: string[][];
  caption?: string;
}

export default function SpecTable({ rows, caption }: SpecTableProps) {
  if (!rows || rows.length === 0) return null;

  const [header, ...body] = rows;

  return (
    <div className={styles.wrapper}>
      {caption && <div className={styles.caption}>{caption}</div>}
      <div className={styles.scroll}>
        <table className={styles.table}>
          {header && (
            <thead>
              <tr>
                {header.map((cell, i) => (
                  <th key={i} className={styles.th}>{cell}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} className={styles.tr}>
                {row.map((cell, ci) => (
                  <td key={ci} className={styles.td}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
