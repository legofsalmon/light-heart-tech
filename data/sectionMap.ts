import type { DocSection } from './types';

/** URL slug to display metadata */
export interface SectionMeta {
  slug: string;
  navLabel: string;
}

/**
 * All valid URL slugs for the nav.
 * The nav labels and slugs are the ONLY hardcoded config in the entire app.
 * Everything else (titles, content, section ranges) comes from the doc.
 */
export const NAV_ITEMS: SectionMeta[] = [
  { slug: 'brief', navLabel: 'BRIEF' },
  { slug: 'technical-direction', navLabel: 'TECHNICAL DIRECTION' },
  { slug: 'projection', navLabel: 'PROJECTION' },
  { slug: 'signal', navLabel: 'SIGNAL' },
  { slug: 'surface', navLabel: 'SURFACE' },
  { slug: 'sensors', navLabel: 'SENSORS' },
  { slug: 'network', navLabel: 'NETWORK' },
  { slug: 'audio', navLabel: 'AUDIO' },
  { slug: 'audio-bridging', navLabel: 'AUDIO BRIDGE' },
  { slug: 'latency', navLabel: 'LATENCY' },
  { slug: 'server', navLabel: 'SERVER' },
  { slug: 'hvac', navLabel: 'HVAC' },
  { slug: 'vendors', navLabel: 'VENDORS' },
  { slug: 'visualization', navLabel: '3D VIZ' },
  { slug: 'disclaimer', navLabel: 'DISCLAIMER' },
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
