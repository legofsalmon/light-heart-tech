'use client';

import { Download, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import type { DocSection } from '@/data/types';
import styles from './DocSectionRenderer.module.scss';

/* ═══ Pattern detection ═══════════════════════════ */

const CURRENCY_RE = /€[\d,.]+/;
const NUM_UNIT_RE = /[\d,.]+\s*(kg|kW|W\b|BTU\/h|BTU|lm|dB|mm|m\b|Gbps|MHz|ms|sq\.\s*m)/i;
const STATUS_RE = /\b(confirmed|quoted|pending|tbc|quoting|ordered|in progress|complete|active|specified)\b/i;
const KV_RE = /^([A-Z][^:]{1,40}):\s+(.+)/;
const WARN_RE = /\b(important|warning|caution|note|action required|critical|open items?)\b/i;

function isCurr(s: string) { return CURRENCY_RE.test(s); }
function isNum(s: string) { return NUM_UNIT_RE.test(s) || /^[\d,.]+$/.test(s.trim()); }
function isStat(s: string) { return STATUS_RE.test(s); }

function statColor(s: string): string {
  const l = s.toLowerCase();
  if (/confirmed|complete|active|specified/.test(l)) return '#00ff88';
  if (/quoted|in progress|ordered/.test(l)) return '#00F0FF';
  if (/pending|tbc|quoting/.test(l)) return '#ff8c00';
  return '#888';
}

function extractNum(s: string) {
  const cm = s.match(/€([\d,.]+)/);
  if (cm) return { n: '€' + cm[1], u: '' };
  const nm = s.match(/([\d,.]+)\s*(kg|kW|W\b|BTU\/h|BTU|lm|dB|Gbps|MHz|ms|sq\.\s*m)/i);
  if (nm) return { n: nm[1], u: nm[2] };
  return null;
}

function classifyTable(rows: string[][]): 'kv' | 'stats' | 'data' {
  if (!rows || rows.length === 0) return 'data';
  const cols = rows[0]?.length || 0;
  if (cols === 2) {
    const numRows = rows.filter(r => isNum(r[1]) || isCurr(r[1])).length;
    return numRows >= rows.length * 0.4 ? 'stats' : 'kv';
  }
  return 'data';
}

function downloadCSV(rows: string[][], name: string) {
  const csv = rows.map(r => r.map(c => '"' + c.replace(/"/g, '""') + '"').join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name.replace(/\s+/g, '_') + '.csv';
  a.click();
}

/* ═══ Sub-renderers ═══════════════════════════════ */

function KVCards({ rows }: { rows: string[][] }) {
  return (
    <div className={styles.kvGrid}>
      {rows.map((r, i) => (
        <div key={i} className={styles.kvCard}>
          <div className={styles.kvLabel}>{r[0]}</div>
          <div className={styles.kvValue}>{r[1]}</div>
        </div>
      ))}
    </div>
  );
}

function StatCards({ rows }: { rows: string[][] }) {
  return (
    <div className={styles.statGrid}>
      {rows.map((r, i) => {
        const ex = extractNum(r[1]);
        return (
          <div key={i} className={styles.statCard}>
            <div className={styles.statValue}>{ex ? ex.n : r[1]}</div>
            {ex?.u && <div className={styles.statUnit}>{ex.u}</div>}
            <div className={styles.statLabel}>{r[0]}</div>
          </div>
        );
      })}
    </div>
  );
}

function DataTable({ rows, title }: { rows: string[][]; title?: string }) {
  if (rows.length === 0) return null;
  const [header, ...body] = rows;
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableHeader}>
        {title && <span className={styles.tableCaption}>{title}</span>}
        {rows.length > 2 && (
          <button className={styles.csvBtn} onClick={() => downloadCSV(rows, title || 'data')}>
            <Download size={12} /> DOWNLOAD CSV
          </button>
        )}
      </div>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead><tr>{header.map((c, i) => <th key={i} className={styles.th}>{c}</th>)}</tr></thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} className={styles.tr}>
                {row.map((cell, ci) => (
                  <td key={ci} className={styles.td} style={{
                    color: isStat(cell) ? statColor(cell) : isCurr(cell) ? '#00F0FF' : undefined,
                    fontWeight: isCurr(cell) ? 600 : undefined,
                  }}>
                    {isStat(cell) ? (
                      <span className={styles.statusBadge} style={{ color: statColor(cell), borderColor: statColor(cell) + '40' }}>{cell}</span>
                    ) : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SmartList({ items }: { items: string[] }) {
  const kvItems = items.filter(item => KV_RE.test(item));
  const plainItems = items.filter(item => !KV_RE.test(item));

  const parsed = kvItems.map(item => {
    const m = item.match(KV_RE);
    return m ? { key: m[1].trim(), value: m[2].trim() } : null;
  }).filter(Boolean) as { key: string; value: string }[];

  const numCount = parsed.filter(kv => isNum(kv.value) || isCurr(kv.value)).length;
  const isStatLike = parsed.length > 0 && numCount >= parsed.length * 0.4;

  return (
    <>
      {parsed.length > 0 && (
        isStatLike ? (
          <div className={styles.statGrid}>
            {parsed.map((kv, i) => {
              const ex = extractNum(kv.value);
              const numMatch = kv.value.match(/(\d[\d,.]*)/);
              return (
                <div key={i} className={styles.statCard}>
                  <div className={styles.statValue}>{ex ? ex.n : numMatch ? numMatch[1] : kv.value.substring(0, 20)}</div>
                  {ex?.u && <div className={styles.statUnit}>{ex.u}</div>}
                  <div className={styles.statLabel}>{kv.key}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.kvGrid}>
            {parsed.map((kv, i) => (
              <div key={i} className={styles.kvCard}>
                <div className={styles.kvLabel}>{kv.key}</div>
                <div className={styles.kvValue}>{kv.value}</div>
              </div>
            ))}
          </div>
        )
      )}
      {plainItems.length > 0 && (
        <ul className={styles.list}>
          {plainItems.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )}
    </>
  );
}

function Callout({ text }: { text: string }) {
  const isWarn = /important|critical|warning|caution/i.test(text);
  const color = isWarn ? '#ff8c00' : '#00F0FF';
  const bg = isWarn ? 'rgba(255,140,0,0.06)' : 'rgba(0,240,255,0.04)';
  const Icon = isWarn ? AlertTriangle : Info;
  return (
    <div className={styles.callout} style={{ borderColor: color, background: bg }}>
      <Icon size={16} style={{ color, flexShrink: 0, marginTop: '2px' }} />
      <div className={styles.calloutText}>{text}</div>
    </div>
  );
}

/* ═══ Prose extraction ═════════════════════════════
 * fullText contains ALL text, including table cells and list items
 * rendered as plain text. We extract only the actual prose (copy)
 * by removing lines that exist in the structured data.
 * ═════════════════════════════════════════════════ */

function extractProse(
  fullText: string,
  tables: string[][][] | undefined,
  listItems: string[] | undefined,
): string[] {
  if (!fullText) return [];

  // Collect exact cell/item values for matching (case-insensitive)
  const exact = new Set<string>();

  (tables || []).forEach(table => {
    table.forEach(row => {
      // Each individual cell
      row.forEach(cell => {
        const t = cell.trim().toLowerCase();
        if (t) exact.add(t);
      });
      // Full row joined (handles fullText lines that concat multiple cells)
      const joined = row.map(c => c.trim()).filter(Boolean).join('\t').toLowerCase();
      if (joined) exact.add(joined);
      const joinedSpace = row.map(c => c.trim()).filter(Boolean).join(' ').toLowerCase();
      if (joinedSpace) exact.add(joinedSpace);
    });
  });

  (listItems || []).forEach(item => {
    const t = item.trim().toLowerCase();
    if (t) exact.add(t);
  });

  if (exact.size === 0) {
    return fullText.split('\n').filter(p => p.trim());
  }

  return fullText
    .split('\n')
    .filter(line => {
      const t = line.trim();
      if (!t) return false;
      const lower = t.toLowerCase();

      // Exact match — line IS a cell or list item
      if (exact.has(lower)) return false;

      // Tab-separated — line is a row of cells joined by tabs
      const tabs = lower.split('\t').map(s => s.trim()).filter(Boolean);
      if (tabs.length > 1 && tabs.every(seg => exact.has(seg))) return false;

      return true;
    });
}

/* ═══ Main Smart Renderer ═════════════════════════ */

interface Props {
  section: DocSection;
  showTitle?: boolean;
  className?: string;
}

export default function DocSectionRenderer({ section, showTitle = true, className }: Props) {
  if (!section) return null;

  const titleIsCallout = section.title && WARN_RE.test(section.title);

  // Extract only the prose (copy) from fullText, excluding table/list data
  const proseLines = extractProse(section.fullText, section.tables, section.listItems);

  return (
    <div className={`${styles.section} ${className || ''}`}>
      {showTitle && section.title && (
        titleIsCallout
          ? <Callout text={section.fullText || section.title} />
          : <h3 className={styles.title}>{section.title}</h3>
      )}

      {/* Prose copy from the doc */}
      {proseLines.length > 0 && !titleIsCallout && (
        <div className={styles.text}>
          {proseLines.map((para, i) => {
            if (WARN_RE.test(para)) return <Callout key={i} text={para} />;
            // Short lines without ending punctuation → sub-heading / caption
            const isCaption = para.length < 60 && !/[.!?]$/.test(para.trim()) && /^[A-Z]/.test(para);
            return isCaption
              ? <h5 key={i} className={styles.captionLabel}>{para}</h5>
              : <p key={i}>{para}</p>;
          })}
        </div>
      )}

      {/* Tables — smart rendering based on shape */}
      {section.tables?.map((table, i) => {
        const shape = classifyTable(table);
        if (shape === 'kv') return <KVCards key={'t' + i} rows={table} />;
        if (shape === 'stats') return <StatCards key={'t' + i} rows={table} />;
        return <DataTable key={'t' + i} rows={table} title={section.title} />;
      })}

      {/* List items — smart rendering based on pattern */}
      {section.listItems && section.listItems.length > 0 && (
        <SmartList items={section.listItems} />
      )}

      {/* Subsections */}
      {section.subsections?.map((sub, i) => {
        const subProse = extractProse(sub.text, sub.tables, sub.lists);
        return (
          <div key={'s' + i} className={styles.subsection}>
            {sub.title && <h4 className={styles.subTitle}>{sub.title}</h4>}
            {subProse.length > 0 && (
              <div className={styles.text}>
                {subProse.map((para, j) => <p key={j}>{para}</p>)}
              </div>
            )}
            {sub.tables?.map((table, ti) => {
              const shape = classifyTable(table);
              if (shape === 'kv') return <KVCards key={'st' + ti} rows={table} />;
              if (shape === 'stats') return <StatCards key={'st' + ti} rows={table} />;
              return <DataTable key={'st' + ti} rows={table} />;
            })}
            {sub.lists && sub.lists.length > 0 && <SmartList items={sub.lists} />}
          </div>
        );
      })}
    </div>
  );
}
