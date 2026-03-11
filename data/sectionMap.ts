import type { DocSection } from './types';
import type { Zone } from './accessConfig';

/** URL slug to display metadata */
export interface SectionMeta {
  slug: string;
  navLabel: string;
  zone: Zone;
}

/**
 * Navigation items grouped by zone.
 * Admin sees all. Other roles see only their zone's items.
 */
export const NAV_ITEMS: SectionMeta[] = [
  // ── Tech Spec zone ──
  { slug: 'brief', navLabel: 'BRIEF', zone: 'techspec' },
  { slug: 'technical-direction', navLabel: 'TECHNICAL DIRECTION', zone: 'techspec' },
  { slug: 'projection', navLabel: 'PROJECTION', zone: 'techspec' },
  { slug: 'signal', navLabel: 'SIGNAL', zone: 'techspec' },
  { slug: 'surface', navLabel: 'SURFACE', zone: 'techspec' },
  { slug: 'sensors', navLabel: 'SENSORS', zone: 'techspec' },
  { slug: 'network', navLabel: 'NETWORK', zone: 'techspec' },
  { slug: 'audio-bridging', navLabel: 'AUDIO BRIDGE', zone: 'techspec' },
  { slug: 'audio', navLabel: 'AUDIO', zone: 'techspec' },
  { slug: 'latency', navLabel: 'LATENCY', zone: 'techspec' },
  { slug: 'server', navLabel: 'SERVER', zone: 'techspec' },
  { slug: 'hvac', navLabel: 'HVAC', zone: 'techspec' },
  { slug: 'vendors', navLabel: 'VENDORS', zone: 'techspec' },
  { slug: 'visualization', navLabel: '3D VIZ', zone: 'techspec' },
  { slug: 'disclaimer', navLabel: 'DISCLAIMER', zone: 'techspec' },
  { slug: 'dev-notes', navLabel: 'DEV NOTES', zone: 'techspec' },

  // ── Operations zone ──
  { slug: 'ops', navLabel: 'OPS HUB', zone: 'ops' },
  { slug: 'plan', navLabel: 'MASTER PLAN', zone: 'ops' },
  { slug: 'technology', navLabel: 'TECHNOLOGY', zone: 'ops' },

  // ── Executive zone ──
  { slug: 'executive', navLabel: 'EXECUTIVE', zone: 'executive' },

  // ── Marketing zone ──
  { slug: 'marketing', navLabel: 'MARKETING', zone: 'marketing' },
];

/** Mapping from slug keywords to section title patterns in the doc */
const SLUG_TO_PATTERN: Record<string, string> = {
  'brief': 'original brief',
  'technical-direction': 'technical direction',
  'projection': 'projector',
  'signal': 'signal transport',
  'surface': 'surface treatment',
  'sensors': 'sensor',
  'network': 'network',
  'audio-bridging': 'audio bridging',
  'audio': 'audio system',
  'latency': 'latency',
  'server': 'server room',
  'hvac': 'hvac',
  'vendors': 'contractor',
  'visualization': '3d viz',
  'disclaimer': 'disclaimer',
  'dev-notes': 'dev notes',
};

/**
 * Finds all "Section N:" headers in the doc and returns their indices.
 * This is the auto-detection that makes it truly doc-driven.
 */
function findSectionHeaders(sections: DocSection[]): number[] {
  return sections
    .map((s, i) => (/^Section\s+\d+/i.test(s.title) ? i : -1))
    .filter((i) => i !== -1);
}

/**
 * Given a slug and the full sections array, returns the section range.
 * Automatically detects boundaries from the doc structure.
 */
export function getSectionRange(
  slug: string,
  sections: DocSection[],
): { startIndex: number; endIndex: number; sectionNumber: string; title: string } | null {
  if (!sections || sections.length === 0) return null;

  const pattern = SLUG_TO_PATTERN[slug];
  if (!pattern) return null;

  // Find all "Section N:" headers
  const headers = findSectionHeaders(sections);

  // Find the header that matches this slug's pattern
  const headerIdx = headers.findIndex((idx) => {
    const title = sections[idx].title.toLowerCase();
    return title.includes(pattern);
  });

  if (headerIdx === -1) return null;

  const startIndex = headers[headerIdx];
  // End at the next section header, or end of array
  const endIndex =
    headerIdx + 1 < headers.length
      ? headers[headerIdx + 1] - 1
      : sections.length - 1;

  // Extract section number from "Section 3: Projectors" → "03"
  const numMatch = sections[startIndex].title.match(/Section\s+(\d+)/i);
  const sectionNumber = numMatch
    ? numMatch[1].padStart(2, '0')
    : String(headerIdx + 1).padStart(2, '0');

  // Extract clean title: "Section 3: Projectors" → "PROJECTORS"
  const titleMatch = sections[startIndex].title.match(/Section\s+\d+:\s*(.*)/i);
  const title = titleMatch
    ? titleMatch[1].trim().toUpperCase()
    : sections[startIndex].title.toUpperCase();

  return { startIndex, endIndex, sectionNumber, title };
}
