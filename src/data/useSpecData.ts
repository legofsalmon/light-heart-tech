/**
 * useSpecData.ts
 *
 * Typed access to the synced Google Doc data.
 *
 * Usage in any page:
 *   import { specData } from '@/data/useSpecData';
 *   const location = specData.projectAtAGlance['Location'];
 */

import rawData from './specData.json';

export interface SpecDataMeta {
  source: string;
  syncedAt: string;
  tableCount: number;
  sectionCount: number;
}

export interface SpecSection {
  title: string;
  textPreview: string;
  subsections: Array<{
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
  _meta: SpecDataMeta;
  sections: SpecSection[];
  tables: { raw: string[][][] };
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

/**
 * Helper to get a value with a fallback.
 * Useful when the doc hasn't been synced yet.
 */
export function getSpec(
  section: keyof Omit<SpecData, '_meta' | 'sections' | 'tables'>,
  key: string,
  fallback: string = ''
): string {
  const data = specData[section];
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    return (data as Record<string, string>)[key] ?? fallback;
  }
  return fallback;
}

/**
 * Check if data has been synced (vs placeholder).
 */
export function isSynced(): boolean {
  return specData._meta.syncedAt !== 'not yet synced';
}
