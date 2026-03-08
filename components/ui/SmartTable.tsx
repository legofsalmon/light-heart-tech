'use client';

import {
  detectTableShape,
  detectValueType,
  getStatusColor,
  extractStatValue,
  isStatusValue,
} from './smartDetect';
import styles from './SmartTable.module.scss';

interface SmartTableProps {
  rows: string[][];
  caption?: string;
}

/**
 * Smart table renderer — detects data patterns and chooses the best layout:
 * - 2-col with numbers → stat card grid
 * - 2-col text → key-value spec card
 * - 3+ cols → styled data table
 */
export default function SmartTable({ rows, caption }: SmartTableProps) {
  if (!rows || rows.length === 0) return null;

  const shape = detectTableShape(rows);

  switch (shape) {
    case 'stat-grid':
      return <StatGrid rows={rows} caption={caption} />;
    case 'key-value':
      return <KeyValueCard rows={rows} caption={caption} />;
    case 'data-table':
      return <DataTable rows={rows} caption={caption} />;
    case 'single-column':
      return <SingleColumn rows={rows} />;
    default:
      return null;
  }
}

/* ── Stat Grid: big numbers in cards ──────────── */

function StatGrid({ rows, caption }: { rows: string[][]; caption?: string }) {
  const [header, ...body] = rows;
  const isHeaderLabels = header && header[0] && !/[\d€$£]/.test(header[0]);

  return (
    <div className={styles.statGridWrap}>
      {caption && <div className={styles.caption}>{caption}</div>}
      <div className={styles.statGrid}>
        {body.map((row, i) => {
          const label = row[0] || '';
          const value = row[1] || '';
          const stat = extractStatValue(value);
          const vtype = detectValueType(value);

          return (
            <div key={i} className={styles.statCard}>
              {stat ? (
                <>
                  <div className={`${styles.statValue} ${styles[vtype]}`}>
                    {stat.main}
                    {stat.unit && <span className={styles.statUnit}>{stat.unit}</span>}
                  </div>
                </>
              ) : isStatusValue(value) ? (
                <div className={styles.statusBadgeWrap}>
                  <span className={`${styles.statusBadge} ${styles[`status_${getStatusColor(value)}`]}`}>
                    {value}
                  </span>
                </div>
              ) : (
                <div className={styles.statValue}>{value}</div>
              )}
              <div className={styles.statLabel}>{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Key-Value Card: label → value pairs ─────── */

function KeyValueCard({ rows, caption }: { rows: string[][]; caption?: string }) {
  const [header, ...body] = rows;
  // If first row looks like a header (no values), skip it
  const hasHeader = header && header.length === 2 && !header[1].match(/[\d€]/);

  const dataRows = hasHeader ? body : rows;

  return (
    <div className={styles.kvWrap}>
      {caption && <div className={styles.caption}>{caption}</div>}
      <div className={styles.kvGrid}>
        {dataRows.map((row, i) => {
          const label = row[0] || '';
          const value = row[1] || '';
          const vtype = detectValueType(value);

          return (
            <div key={i} className={styles.kvItem}>
              <div className={styles.kvLabel}>{label}</div>
              <div className={`${styles.kvValue} ${styles[vtype]}`}>
                {isStatusValue(value) ? (
                  <span className={`${styles.statusBadge} ${styles[`status_${getStatusColor(value)}`]}`}>
                    {value}
                  </span>
                ) : (
                  value
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Data Table: standard multi-column table ──── */

function DataTable({ rows, caption }: { rows: string[][]; caption?: string }) {
  if (!rows || rows.length === 0) return null;
  const [header, ...body] = rows;

  return (
    <div className={styles.tableWrap}>
      {caption && <div className={styles.caption}>{caption}</div>}
      <div className={styles.tableScroll}>
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
                {row.map((cell, ci) => {
                  const vtype = detectValueType(cell);
                  return (
                    <td key={ci} className={`${styles.td} ${styles[vtype]}`}>
                      {isStatusValue(cell) ? (
                        <span className={`${styles.statusBadge} ${styles[`status_${getStatusColor(cell)}`]}`}>
                          {cell}
                        </span>
                      ) : (
                        cell
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Single Column: rendered as a list ────────── */

function SingleColumn({ rows }: { rows: string[][] }) {
  return (
    <div className={styles.singleCol}>
      {rows.map((row, i) => (
        <div key={i} className={styles.singleItem}>{row[0]}</div>
      ))}
    </div>
  );
}
