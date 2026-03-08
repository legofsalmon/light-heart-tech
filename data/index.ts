// Data layer — barrel export
export { LiveDocProvider, useLiveDoc } from './LiveDocProvider';
export {
  useLiveSection,
  useLiveSections,
  useSectionRange,
  useSpecField,
  useSpecValue,
  // Pre-defined page hooks
  useOriginalBriefSections,
  useTechDirectionSections,
  useProjectionSections,
  useSignalSections,
  useSurfaceSections,
  useSensorSections,
  useNetworkSections,
  useAudioSections,
  useAudioBridgingSections,
  useLatencySections,
  useServerSections,
  useHVACSections,
  useVendorSections,
  useVisualizationSections,
} from './useLiveSection';
export type {
  SpecData,
  DocSection,
  SyncMeta,
  BudgetItem,
} from './types';
