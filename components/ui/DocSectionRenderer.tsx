'use client';

import React from 'react';
import { Download, AlertTriangle, Info, Table2, List, Hash, FileText, ChevronRight } from 'lucide-react';
import type { DocSection } from '@/data/types';
import styles from './DocSectionRenderer.module.scss';

/* ═══ Pattern detection ═══════════════════════════ */

const CURRENCY_RE = /€[\d,.]+/;
const NUM_UNIT_RE = /[\d,.]+\s*(kg|kW|W\b|BTU\/h|BTU|lm|dB|mm|m\b|Gbps|MHz|ms|sq\.\s*m)/i;
const STATUS_RE = /\b(confirmed|quoted|pending|tbc|quoting|ordered|in progress|complete|active|specified)\b/i;
const KV_RE = /^([A-Z][^:]{1,40}):\s+(.+)/;
const WARN_RE = /\b(important|warning|caution|note|action required|critical|open items?)\b/i;

/* ═══ Research-flag auto-highlight ════════════════ */
const RESEARCH_RE = /\b(TBC|TBD|pending|quoting|pending final spec|action required|open items?|to be confirmed|to be determined|awaiting|under review|not yet specified|needs? (?:review|decision|confirmation))\b/gi;

/** Wraps research-flag keywords in <mark> tags. Returns a React fragment. */
function flagText(text: string): React.ReactNode {
  if (!RESEARCH_RE.test(text)) return text;
  // Reset lastIndex after test
  RESEARCH_RE.lastIndex = 0;
  const parts: React.ReactNode[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  while ((match = RESEARCH_RE.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.slice(lastIdx, match.index));
    }
    parts.push(
      <mark key={match.index} className="research-flag">{match[0]}</mark>
    );
    lastIdx = match.index + match[0].length;
  }
  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx));
  }
  RESEARCH_RE.lastIndex = 0;
  return <>{parts}</>;
}

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
    // Only classify as stats if values are SHORT numeric/currency — not long specs
    const pureStatRows = rows.filter(r => {
      const val = r[1]?.trim() || '';
      const isPureNum = /^[\d,.]+$/.test(val);
      const isShortCurr = isCurr(val) && val.length < 20;
      const isShortNum = isNum(val) && val.length < 25;
      return isPureNum || isShortCurr || isShortNum;
    });
    // Need majority of rows to be short numeric for stat display
    if (pureStatRows.length >= rows.length * 0.5) return 'stats';
    return 'kv';
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

/* ═══ Content type badge ═════════════════════════ */

function ContentBadge({ type, count }: { type: 'table' | 'stats' | 'kv' | 'list'; count?: number }) {
  const config = {
    table:  { icon: Table2, label: 'DATA TABLE', color: 'rgba(0, 240, 255, 0.12)' },
    stats:  { icon: Hash,   label: 'METRICS',    color: 'rgba(0, 255, 136, 0.10)' },
    kv:     { icon: FileText, label: 'SPECS',    color: 'rgba(180, 130, 255, 0.10)' },
    list:   { icon: List,   label: 'ITEMS',      color: 'rgba(255, 140, 0, 0.10)' },
  };
  const { icon: Icon, label, color } = config[type];
  return (
    <div className={styles.contentBadge} style={{ background: color }}>
      <Icon size={10} />
      <span>{label}</span>
      {count !== undefined && count > 1 && <span className={styles.badgeCount}>{count}</span>}
    </div>
  );
}

/* ═══ Sub-renderers ═══════════════════════════════ */

function KVCards({ rows }: { rows: string[][] }) {
  return (
    <div className={styles.kvSection}>
      <ContentBadge type="kv" count={rows.length} />
      <div className={styles.kvGrid}>
        {rows.map((r, i) => (
          <div key={i} className={styles.kvCard}>
            <div className={styles.kvLabel}>{r[0]}</div>
            <div className={styles.kvValue}>{flagText(r[1])}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCards({ rows }: { rows: string[][] }) {
  // Split into numeric (short display) vs text-heavy (KV display)
  const numericRows = rows.filter(r => extractNum(r[1]) !== null || r[1].trim().length <= 25);
  const textRows = rows.filter(r => extractNum(r[1]) === null && r[1].trim().length > 25);

  return (
    <>
      {numericRows.length > 0 && (
        <div className={styles.statsSection}>
          <ContentBadge type="stats" count={numericRows.length} />
          <div className={styles.statGrid}>
            {numericRows.map((r, i) => {
              const ex = extractNum(r[1]);
              const val = ex ? ex.n : r[1];
              const isLong = val.length > 15;
              return (
                <div key={i} className={styles.statCard}>
                  <div className={`${styles.statValue} ${isLong ? styles.statValueCompact : ''}`}>
                    {val}
                  </div>
                  {ex?.u && <div className={styles.statUnit}>{ex.u}</div>}
                  <div className={styles.statLabel}>{r[0]}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {textRows.length > 0 && (
        <div className={styles.kvSection}>
          <ContentBadge type="kv" count={textRows.length} />
          <div className={styles.kvGrid}>
            {textRows.map((r, i) => (
              <div key={i} className={styles.kvCard}>
                <div className={styles.kvLabel}>{r[0]}</div>
                <div className={styles.kvValue}>{flagText(r[1])}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function DataTable({ rows, title }: { rows: string[][]; title?: string }) {
  if (rows.length === 0) return null;
  const [header, ...body] = rows;
  return (
    <div className={styles.tableSection}>
      <div className={styles.tableWrap}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderLeft}>
            <ContentBadge type="table" />
            {title && <span className={styles.tableCaption}>{title}</span>}
          </div>
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
                      ) : flagText(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.tableFooter}>
          <span>{body.length} row{body.length !== 1 ? 's' : ''} &middot; {header.length} column{header.length !== 1 ? 's' : ''}</span>
        </div>
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

  // Only stat-like if values are SHORT numbers/currency — not long equipment descriptions
  const numCount = parsed.filter(kv => {
    const v = kv.value.trim();
    return (isNum(v) || isCurr(v)) && v.length < 25;
  }).length;
  const isStatLike = parsed.length > 0 && numCount >= parsed.length * 0.5;

  return (
    <>
      {parsed.length > 0 && (
        isStatLike ? (
          <div className={styles.statsSection}>
            <ContentBadge type="stats" count={parsed.length} />
            <div className={styles.statGrid}>
              {parsed.map((kv, i) => {
                const ex = extractNum(kv.value);
                const numMatch = kv.value.match(/(\d[\d,.]*)/);
                const val = ex ? ex.n : numMatch ? numMatch[1] : kv.value.substring(0, 20);
                const isLong = val.length > 15;
                return (
                  <div key={i} className={styles.statCard}>
                    <div className={`${styles.statValue} ${isLong ? styles.statValueCompact : ''}`}>{val}</div>
                    {ex?.u && <div className={styles.statUnit}>{ex.u}</div>}
                    <div className={styles.statLabel}>{kv.key}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className={styles.kvSection}>
            <ContentBadge type="kv" count={parsed.length} />
            <div className={styles.kvGrid}>
              {parsed.map((kv, i) => (
                <div key={i} className={styles.kvCard}>
                  <div className={styles.kvLabel}>{kv.key}</div>
                  <div className={styles.kvValue}>{flagText(kv.value)}</div>
                </div>
              ))}
            </div>
          </div>
        )
      )}
      {plainItems.length > 0 && (
        <div className={styles.listSection}>
          <ContentBadge type="list" count={plainItems.length} />
          <ul className={styles.list}>
            {plainItems.map((item, i) => <li key={i}>{flagText(item)}</li>)}
          </ul>
        </div>
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

/* ═══ Prose extraction ═════════════════════════════ */

function extractProse(
  fullText: string,
  tables: string[][][] | undefined,
  listItems: string[] | undefined,
): string[] {
  if (!fullText) return [];
  const exact = new Set<string>();

  (tables || []).forEach(table => {
    table.forEach(row => {
      row.forEach(cell => { const t = cell.trim().toLowerCase(); if (t) exact.add(t); });
      const joined = row.map(c => c.trim()).filter(Boolean).join('\t').toLowerCase();
      if (joined) exact.add(joined);
      const joinedSpace = row.map(c => c.trim()).filter(Boolean).join(' ').toLowerCase();
      if (joinedSpace) exact.add(joinedSpace);
    });
  });

  (listItems || []).forEach(item => { const t = item.trim().toLowerCase(); if (t) exact.add(t); });

  if (exact.size === 0) return fullText.split('\n').filter(p => p.trim());

  return fullText.split('\n').filter(line => {
    const t = line.trim();
    if (!t) return false;
    const lower = t.toLowerCase();
    if (exact.has(lower)) return false;
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
  const proseLines = extractProse(section.fullText, section.tables, section.listItems);

  // Count content types for summary badge
  const tableCount = section.tables?.length || 0;
  const listCount = section.listItems?.length || 0;
  const subCount = section.subsections?.length || 0;

  return (
    <div className={`${styles.section} ${className || ''}`}>
      {showTitle && section.title && (
        titleIsCallout
          ? <Callout text={section.fullText || section.title} />
          : (
            <div className={styles.titleBar}>
              <h3 className={styles.title}>{section.title}</h3>
              {/* Content type indicators */}
              <div className={styles.titleMeta}>
                {tableCount > 0 && <span className={styles.metaChip}><Table2 size={10} /> {tableCount}</span>}
                {listCount > 0 && <span className={styles.metaChip}><List size={10} /> {listCount}</span>}
                {subCount > 0 && <span className={styles.metaChip}><ChevronRight size={10} /> {subCount}</span>}
              </div>
            </div>
          )
      )}

      {/* Prose copy from the doc */}
      {proseLines.length > 0 && !titleIsCallout && (
        <div className={styles.text}>
          {proseLines.map((para, i) => {
            if (WARN_RE.test(para)) return <Callout key={i} text={para} />;
            const isCaption = para.length < 60 && !/[.!?]$/.test(para.trim()) && /^[A-Z]/.test(para);
            return isCaption
              ? <h5 key={i} className={styles.captionLabel}>{flagText(para)}</h5>
              : <p key={i}>{flagText(para)}</p>;
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
                {subProse.map((para, j) => {
                  if (WARN_RE.test(para)) return <Callout key={j} text={para} />;
                  return <p key={j}>{flagText(para)}</p>;
                })}
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
