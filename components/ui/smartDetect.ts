/**
 * Smart pattern detection for worker JSON data.
 * Detects table shapes, value types, and content patterns
 * to choose the best rendering strategy.
 */

/* ── Value type detection ──────────────────────── */

const CURRENCY_RE = /[€$£]\s?[\d,.]+/;
const NUMBER_UNIT_RE = /^[\d,.]+\s*(kg|g|W|kW|BTU\/h|lm|dB|mm|m|sq\.\s?m\.?|Gbps|MHz|ms|A|°)$/i;
const PERCENTAGE_RE = /^\d+(\.\d+)?%$/;
const LARGE_NUMBER_RE = /^[\d,]+$/;

export type ValueType = 'currency' | 'unit' | 'percentage' | 'number' | 'status' | 'text';

export function detectValueType(value: string): ValueType {
  const v = value.trim();
  if (CURRENCY_RE.test(v)) return 'currency';
  if (NUMBER_UNIT_RE.test(v)) return 'unit';
  if (PERCENTAGE_RE.test(v)) return 'percentage';
  if (isStatusValue(v)) return 'status';
  if (LARGE_NUMBER_RE.test(v) && v.length <= 10) return 'number';
  return 'text';
}

/* ── Status detection ──────────────────────────── */

const STATUS_MAP: Record<string, 'cyan' | 'lime' | 'orange' | 'red'> = {
  confirmed: 'cyan',
  active: 'cyan',
  connected: 'cyan',
  complete: 'cyan',
  completed: 'cyan',
  installed: 'cyan',
  ready: 'cyan',
  quoted: 'orange',
  quoting: 'orange',
  pending: 'orange',
  tbc: 'orange',
  'tbd': 'orange',
  'under review': 'orange',
  'in progress': 'orange',
  'not started': 'red',
  cancelled: 'red',
  rejected: 'red',
  'not procured': 'red',
};

export function isStatusValue(value: string): boolean {
  return value.trim().toLowerCase() in STATUS_MAP;
}

export function getStatusColor(value: string): 'cyan' | 'lime' | 'orange' | 'red' {
  return STATUS_MAP[value.trim().toLowerCase()] || 'orange';
}

/* ── Table shape detection ─────────────────────── */

export type TableShape =
  | 'key-value'      // 2 cols, col1=labels, col2=values
  | 'stat-grid'      // 2 cols, col2 contains numbers/currencies
  | 'data-table'     // 3+ cols, standard tabular data
  | 'single-column'  // 1 col
  | 'empty';

export function detectTableShape(rows: string[][]): TableShape {
  if (!rows || rows.length === 0) return 'empty';

  const colCount = rows[0]?.length || 0;
  if (colCount === 0) return 'empty';
  if (colCount === 1) return 'single-column';

  if (colCount === 2) {
    // Check if col2 values are mostly numeric/currency/unit
    const dataRows = rows.slice(1); // skip header
    if (dataRows.length === 0) return 'key-value';

    let numericCount = 0;
    for (const row of dataRows) {
      const vtype = detectValueType(row[1] || '');
      if (vtype !== 'text') numericCount++;
    }

    const ratio = numericCount / dataRows.length;
    if (ratio >= 0.5) return 'stat-grid';
    return 'key-value';
  }

  return 'data-table';
}

/* ── Content pattern detection ─────────────────── */

/** Check if a text paragraph looks like a callout/warning/note */
export function isCallout(text: string): boolean {
  const lower = text.trim().toLowerCase();
  return (
    lower.startsWith('note:') ||
    lower.startsWith('important:') ||
    lower.startsWith('warning:') ||
    lower.startsWith('action required:') ||
    lower.startsWith('critical:') ||
    lower.startsWith('⚠') ||
    lower.startsWith('note –') ||
    lower.startsWith('nb:')
  );
}

/** Check if a section title suggests a product/hardware spec */
export function isProductSpec(title: string): boolean {
  const lower = title.toLowerCase();
  const brands = [
    'barco', 'luxonis', 'oak', 'netgear', 'l-acoustics', 'l-isa',
    'pixera', 'goo systems', 'dvigear', 'dvi-', 'cisco', 'dante',
    'audinate', 'motu', 'shure', 'sennheiser', 'panasonic', 'epson',
  ];
  return brands.some((b) => lower.includes(b));
}

/** Extract a "big stat" from a value string — the numeric/currency portion */
export function extractStatValue(value: string): { main: string; unit: string } | null {
  // Currency: €275,000
  const currMatch = value.match(/([€$£]\s?[\d,.]+)/);
  if (currMatch) return { main: currMatch[1], unit: '' };

  // Number + unit: 851.80 kg, 24,510W, 82,880 BTU/h
  const unitMatch = value.match(/^([\d,.]+)\s*(kg|g|W|kW|BTU\/h|lm|dB|mm|m|Gbps|MHz|ms|A)(.*)$/i);
  if (unitMatch) return { main: unitMatch[1], unit: unitMatch[2] + (unitMatch[3] || '') };

  // Plain big number
  const numMatch = value.match(/^([\d,]+)$/);
  if (numMatch && value.length >= 2) return { main: numMatch[1], unit: '' };

  return null;
}

/** Detect if list items contain technical bullet specs (key: value patterns) */
export function isSpecList(items: string[]): boolean {
  if (items.length < 2) return false;
  let kvCount = 0;
  for (const item of items) {
    if (item.includes(':') || item.includes('–') || item.includes('—')) kvCount++;
  }
  return kvCount / items.length >= 0.4;
}
