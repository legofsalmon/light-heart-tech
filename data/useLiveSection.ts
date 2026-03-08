'use client';

import { useMemo } from 'react';
import { useLiveDoc } from './LiveDocProvider';
import type { DocSection, SpecData } from './types';

/* ──────────────────────────────────────────────────
 * useLiveSection — find a single section by title
 * ────────────────────────────────────────────────── */

export function useLiveSection(titleFragment: string): DocSection | undefined {
  const { data } = useLiveDoc();
  return useMemo(() => {
    const lower = titleFragment.toLowerCase();
    return data.sections.find((s) =>
      s.title.toLowerCase().includes(lower),
    );
  }, [data.sections, titleFragment]);
}

/* ──────────────────────────────────────────────────
 * useLiveSections — find a range of sections by title
 * Returns all sections from startFragment to endFragment (inclusive)
 * ────────────────────────────────────────────────── */

export function useLiveSections(
  startFragment: string,
  endFragment: string,
): DocSection[] {
  const { data } = useLiveDoc();
  return useMemo(() => {
    const sections = data.sections;
    const startLower = startFragment.toLowerCase();
    const endLower = endFragment.toLowerCase();

    const startIdx = sections.findIndex((s) =>
      s.title.toLowerCase().includes(startLower),
    );
    if (startIdx === -1) return [];

    const endIdx = sections.findIndex(
      (s, i) => i > startIdx && s.title.toLowerCase().includes(endLower),
    );

    return sections.slice(startIdx, endIdx === -1 ? undefined : endIdx + 1);
  }, [data.sections, startFragment, endFragment]);
}

/* ──────────────────────────────────────────────────
 * useSectionRange — get sections by index range
 * Most reliable for fixed section mappings.
 *
 * Section index map (from the Google Doc):
 *   0-6    Preamble / TOC
 *   7-13   Section 1:  Original Brief
 *   14-21  Section 2:  Technical Direction Overview
 *   22-32  Section 3:  Projectors
 *   33-37  Section 4:  Signal Transport
 *   38-46  Section 5:  Surface Treatment
 *   47-54  Section 6:  Sensors
 *   55-65  Section 7:  Network
 *   66-79  Section 8:  Audio System / L-ISA
 *   80-92  Section 9:  Audio Bridging Architectures
 *   93-102 Section 10: Latency Budgeting
 *   103-117 Section 11: Server Room
 *   118-123 Section 12: HVAC
 *   124-143 Section 13: Contractors / Vendors
 *   144-145 Section 14: 3D Viz
 * ────────────────────────────────────────────────── */

export function useSectionRange(
  startIndex: number,
  endIndex: number,
): DocSection[] {
  const { data } = useLiveDoc();
  return useMemo(
    () => data.sections.slice(startIndex, endIndex + 1),
    [data.sections, startIndex, endIndex],
  );
}

/* ──────────────────────────────────────────────────
 * useSpecField — get a top-level key-value field
 * e.g. useSpecField('projectAtAGlance')
 * ────────────────────────────────────────────────── */

type SpecFieldKey = keyof Omit<SpecData, '_meta' | 'sections'>;

export function useSpecField<K extends SpecFieldKey>(key: K): SpecData[K] {
  const { data } = useLiveDoc();
  return data[key];
}

/* ──────────────────────────────────────────────────
 * useSpecValue — get a specific value from a KV field
 * e.g. useSpecValue('projectAtAGlance', 'Location')
 * ────────────────────────────────────────────────── */

export function useSpecValue(
  field: SpecFieldKey,
  key: string,
  fallback: string = '',
): string {
  const { data } = useLiveDoc();
  const obj = data[field];
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    return (obj as Record<string, string>)[key] ?? fallback;
  }
  return fallback;
}

/* ──────────────────────────────────────────────────
 * Pre-defined page hooks — convenience wrappers
 * Each returns the exact sections for that page.
 * ────────────────────────────────────────────────── */

export const useOriginalBriefSections  = () => useSectionRange(7, 13);
export const useTechDirectionSections  = () => useSectionRange(14, 21);
export const useProjectionSections     = () => useSectionRange(22, 32);
export const useSignalSections         = () => useSectionRange(33, 37);
export const useSurfaceSections        = () => useSectionRange(38, 46);
export const useSensorSections         = () => useSectionRange(47, 54);
export const useNetworkSections        = () => useSectionRange(55, 65);
export const useAudioSections          = () => useSectionRange(66, 79);
export const useAudioBridgingSections  = () => useSectionRange(80, 92);
export const useLatencySections        = () => useSectionRange(93, 102);
export const useServerSections         = () => useSectionRange(103, 117);
export const useHVACSections           = () => useSectionRange(118, 123);
export const useVendorSections         = () => useSectionRange(124, 143);
export const useVisualizationSections  = () => useSectionRange(144, 145);
