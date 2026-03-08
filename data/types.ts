// ─── Types for the Cloudflare Worker JSON ───────────────
// Copied from the Vite project's useSpecData.ts

export interface SyncMeta {
  source: string;
  syncedAt: string;
  sectionCount: number;
  tableCount: number;
  version: number;
}

export interface DocSection {
  title: string;
  fullText: string;
  tables: string[][][];
  listItems: string[];
  subsections?: Array<{
    title: string;
    text: string;
    tables: string[][][];
    lists: string[];
  }>;
  h4Subsections?: Array<{
    title: string;
    text: string;
  }>;
}

export interface BudgetItem {
  Category: string;
  Amount: string;
  Status: string;
}

export interface SpecData {
  _meta: SyncMeta;
  sections: DocSection[];
  projectAtAGlance: Record<string, string>;
  projectionSystems: Record<string, string>;
  mediaServers: Record<string, string>;
  audioSystem: Record<string, string>;
  networkInfrastructure: Record<string, string>;
  serverRoom: Record<string, string>;
  heatLoad: Record<string, string>;
  budgetSummary: BudgetItem[];
  vendorStatus: Record<string, string>;
  signalTransport: string[][];
  projectorTotals: Record<string, string>;
}

/** Find a section by partial title match (case-insensitive). */
export function findSection(
  sections: DocSection[],
  titleFragment: string
): DocSection | undefined {
  const lower = titleFragment.toLowerCase();
  return sections.find((s) => s.title.toLowerCase().includes(lower));
}

/** Find all sections between two title fragments (inclusive). */
export function findSectionRange(
  sections: DocSection[],
  startFragment: string,
  endFragment: string
): DocSection[] {
  const startLower = startFragment.toLowerCase();
  const endLower = endFragment.toLowerCase();
  const startIdx = sections.findIndex((s) =>
    s.title.toLowerCase().includes(startLower)
  );
  if (startIdx === -1) return [];

  const endIdx = sections.findIndex(
    (s, i) => i > startIdx && s.title.toLowerCase().includes(endLower)
  );

  // If no end found, return from start to end of array
  return sections.slice(startIdx, endIdx === -1 ? undefined : endIdx + 1);
}
