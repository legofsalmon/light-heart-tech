import rawData from './specData.json';

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
  subsections: Array<{
    title: string;
    text: string;
    tables: string[][][];
    lists: string[];
  }>;
  h4Subsections: Array<{
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

export const specData: SpecData = rawData as unknown as SpecData;

/** Find a section by partial title match (case-insensitive). */
export function findSection(titleFragment: string): DocSection | undefined {
  const lower = titleFragment.toLowerCase();
  return specData.sections.find(s => s.title.toLowerCase().includes(lower));
}

/** Get a named key-value field with fallback. */
export function getSpec(
  section: keyof Omit<SpecData, '_meta' | 'sections'>,
  key: string,
  fallback: string = ''
): string {
  const data = specData[section];
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    return (data as Record<string, string>)[key] ?? fallback;
  }
  return fallback;
}

/** Check if data has been synced. */
export function isSynced(): boolean {
  return specData._meta.syncedAt !== 'not yet synced';
}

/** Get sync timestamp as readable string. */
export function getSyncDate(): string {
  if (!isSynced()) return 'Not synced';
  const d = new Date(specData._meta.syncedAt);
  return d.toLocaleDateString('en-IE', { day: 'numeric', month: 'long', year: 'numeric' });
}
