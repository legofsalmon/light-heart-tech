'use client';

/**
 * TSMProvider — React context for TSM interaction state.
 *
 * Manages: selected node, hovered node, dependency chain highlights,
 * stack/status filtering. Scoped to internal pages only — not added
 * to root layout. Each internal page wraps its content as needed.
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import {
  tsmNodes,
  type TSMStack,
  type TSMStatus,
  type TSMNode,
} from './diagramTsm';
import { getUpstream, getDownstream, getNodeById } from './tsmPageMap';

// ─── Types ──────────────────────────────────────────────────────────────────

interface TSMState {
  /** Currently selected node (opens detail panel) */
  selectedNodeId: string | null;
  selectNode: (id: string | null) => void;

  /** Currently hovered node (highlights dependency chain) */
  hoveredNodeId: string | null;
  hoverNode: (id: string | null) => void;

  /** Computed: IDs of upstream + downstream nodes from hovered node */
  highlightedIds: Set<string>;

  /** Stack filter — null = show all */
  filterStack: TSMStack | null;
  setFilterStack: (stack: TSMStack | null) => void;

  /** Status filter — null = show all */
  filterStatus: TSMStatus | null;
  setFilterStatus: (status: TSMStatus | null) => void;

  /** Filtered nodes based on current filters */
  filteredNodes: TSMNode[];

  /** Selected node data (convenience getter) */
  selectedNode: TSMNode | null;

  /** Detail panel visibility */
  isDetailOpen: boolean;
}

// ─── Context ────────────────────────────────────────────────────────────────

const TSMContext = createContext<TSMState>({
  selectedNodeId: null,
  selectNode: () => {},
  hoveredNodeId: null,
  hoverNode: () => {},
  highlightedIds: new Set(),
  filterStack: null,
  setFilterStack: () => {},
  filterStatus: null,
  setFilterStatus: () => {},
  filteredNodes: tsmNodes,
  selectedNode: null,
  isDetailOpen: false,
});

export function useTSM() {
  return useContext(TSMContext);
}

// ─── Provider ───────────────────────────────────────────────────────────────

interface TSMProviderProps {
  children: ReactNode;
  /** Pre-select a node on mount (e.g. from ?node= query param) */
  initialNodeId?: string | null;
}

export function TSMProvider({ children, initialNodeId }: TSMProviderProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(
    initialNodeId ?? null,
  );
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [filterStack, setFilterStack] = useState<TSMStack | null>(null);
  const [filterStatus, setFilterStatus] = useState<TSMStatus | null>(null);

  // Select a node — toggle if same node clicked again
  const selectNode = useCallback((id: string | null) => {
    setSelectedNodeId((prev) => (prev === id ? null : id));
  }, []);

  const hoverNode = useCallback((id: string | null) => {
    setHoveredNodeId(id);
  }, []);

  // Compute highlighted dependency chain for hovered node
  const highlightedIds = useMemo(() => {
    if (!hoveredNodeId) return new Set<string>();
    const upstream = getUpstream(hoveredNodeId);
    const downstream = getDownstream(hoveredNodeId);
    return new Set([hoveredNodeId, ...upstream, ...downstream]);
  }, [hoveredNodeId]);

  // Filtered nodes based on stack/status filters
  const filteredNodes = useMemo(() => {
    return tsmNodes.filter((node) => {
      if (filterStack && node.stack !== filterStack) return false;
      if (filterStatus && node.status !== filterStatus) return false;
      return true;
    });
  }, [filterStack, filterStatus]);

  // Convenience getter for selected node
  const selectedNode = useMemo(
    () => (selectedNodeId ? getNodeById(selectedNodeId) ?? null : null),
    [selectedNodeId],
  );

  const isDetailOpen = selectedNodeId !== null;

  const value = useMemo<TSMState>(
    () => ({
      selectedNodeId,
      selectNode,
      hoveredNodeId,
      hoverNode,
      highlightedIds,
      filterStack,
      setFilterStack,
      filterStatus,
      setFilterStatus,
      filteredNodes,
      selectedNode,
      isDetailOpen,
    }),
    [
      selectedNodeId,
      selectNode,
      hoveredNodeId,
      hoverNode,
      highlightedIds,
      filterStack,
      setFilterStack,
      filterStatus,
      setFilterStatus,
      filteredNodes,
      selectedNode,
      isDetailOpen,
    ],
  );

  return <TSMContext.Provider value={value}>{children}</TSMContext.Provider>;
}
