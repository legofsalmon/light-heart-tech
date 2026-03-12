/**
 * TSM Page Map — Auto-computed reverse index
 *
 * Single source of truth: derived from diagramTsm.ts pageLinks.
 * Never manually duplicate — always computed.
 *
 * Usage:
 *   getNodesForSlug('projection') → ['global-ground', 'global-frames', ...]
 *   hasTSMMapping('server')       → true
 *   getNodeById('global-ground')  → TSMNode
 */

import { tsmNodes, type TSMNode, type TSMStack } from './diagramTsm';

/** Canonical stack colors (used in StackNode, DetailPanel, ContextWidget) */
export const TSM_STACK_COLORS: Record<TSMStack, string> = {
  global: '#4a8abf',
  internal: '#c4a265',
  external: '#27ae60',
};

/** Canonical stack labels */
export const TSM_STACK_LABELS: Record<TSMStack, string> = {
  global: 'Global — Infrastructure & Systems',
  internal: 'Internal — Embodied Perception',
  external: 'External — Mediation & Ritual',
};

/** Short stack labels (for badges, pills) */
export const TSM_STACK_SHORT: Record<TSMStack, string> = {
  global: 'Global',
  internal: 'Internal',
  external: 'External',
};

// ─── Build the reverse index ────────────────────────────────────────────────

interface PageMapEntry {
  nodeId: string;
  node: TSMNode;
  section?: string;
  label: string;
}

const _pageMap = new Map<string, PageMapEntry[]>();

for (const node of tsmNodes) {
  for (const link of node.pageLinks) {
    const slug = link.slug;
    if (!_pageMap.has(slug)) {
      _pageMap.set(slug, []);
    }
    _pageMap.get(slug)!.push({
      nodeId: node.id,
      node,
      section: link.section,
      label: link.label,
    });
  }
}

// ─── Public API ─────────────────────────────────────────────────────────────

/** Get all TSM nodes that link to a given page slug */
export function getNodesForSlug(slug: string): PageMapEntry[] {
  return _pageMap.get(slug) ?? [];
}

/** Check if a page slug has any TSM node mappings */
export function hasTSMMapping(slug: string): boolean {
  return _pageMap.has(slug) && _pageMap.get(slug)!.length > 0;
}

/** Get a TSM node by its ID */
export function getNodeById(id: string): TSMNode | undefined {
  return tsmNodes.find((n) => n.id === id);
}

/** Get all unique page slugs that have TSM mappings */
export function getAllMappedSlugs(): string[] {
  return Array.from(_pageMap.keys());
}

/** Group nodes for a slug by stack */
export function getNodesForSlugGrouped(slug: string): Record<TSMStack, PageMapEntry[]> {
  const entries = getNodesForSlug(slug);
  const grouped: Record<TSMStack, PageMapEntry[]> = {
    global: [],
    internal: [],
    external: [],
  };
  for (const entry of entries) {
    grouped[entry.node.stack].push(entry);
  }
  return grouped;
}

/** Get upstream dependencies for a node (recursive) */
export function getUpstream(nodeId: string, visited = new Set<string>()): string[] {
  if (visited.has(nodeId)) return [];
  visited.add(nodeId);

  const node = getNodeById(nodeId);
  if (!node) return [];

  const upstream: string[] = [];
  for (const depId of node.dependsOn) {
    upstream.push(depId);
    upstream.push(...getUpstream(depId, visited));
  }
  return upstream;
}

/** Get downstream nodes that this node unlocks (recursive) */
export function getDownstream(nodeId: string, visited = new Set<string>()): string[] {
  if (visited.has(nodeId)) return [];
  visited.add(nodeId);

  const node = getNodeById(nodeId);
  if (!node) return [];

  const downstream: string[] = [];
  for (const unlockId of node.unlocks) {
    downstream.push(unlockId);
    downstream.push(...getDownstream(unlockId, visited));
  }
  return downstream;
}

/** Get immediate neighbours (dependsOn + unlocks) without recursion */
export function getNeighbours(nodeId: string): { upstream: string[]; downstream: string[] } {
  const node = getNodeById(nodeId);
  if (!node) return { upstream: [], downstream: [] };
  return { upstream: node.dependsOn, downstream: node.unlocks };
}

/** Compute completion stats per stack */
export function getStackStats(): Record<TSMStack, { total: number; complete: number; active: number; blocked: number; pct: number }> {
  const stacks: TSMStack[] = ['global', 'internal', 'external'];
  const result = {} as Record<TSMStack, { total: number; complete: number; active: number; blocked: number; pct: number }>;

  for (const stack of stacks) {
    const nodes = tsmNodes.filter((n) => n.stack === stack);
    const complete = nodes.filter((n) => n.status === 'complete').length;
    const active = nodes.filter((n) => n.status === 'active').length;
    const blocked = nodes.filter((n) => n.status === 'blocked').length;
    result[stack] = {
      total: nodes.length,
      complete,
      active,
      blocked,
      pct: nodes.length > 0 ? Math.round((complete / nodes.length) * 100) : 0,
    };
  }
  return result;
}
