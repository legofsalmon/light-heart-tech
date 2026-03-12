'use client';

/**
 * Full-screen TSM View — /ops/tsm
 *
 * 100vh interactive diagram with floating controls, legend,
 * back link, and detail panel. Reads ?node= query param
 * to pre-select a node on mount.
 */

import { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Filter } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { TSMProvider, useTSM } from '@/data/TSMProvider';
import TSMDetailPanel from '@/components/TSM/TSMDetailPanel';
import { tsmNodes, tsmEdges, type TSMStack, type TSMStatus } from '@/data/diagramTsm';
import { TSM_STACK_COLORS, TSM_STACK_SHORT } from '@/data/tsmPageMap';
import dynamic from 'next/dynamic';
import styles from './page.module.scss';

const FlowDiagram = dynamic(
  () => import('@/components/FlowDiagram').then((m) => ({ default: m.FlowDiagram })),
  {
    ssr: false,
    loading: () => (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '0.8rem' }}>
        Loading TSM diagram…
      </div>
    ),
  },
);

// ─── Build flow nodes from real data ────────────────────

const STACK_X: Record<TSMStack, number> = { global: 0, internal: 260, external: 520 };
const STACKS: TSMStack[] = ['global', 'internal', 'external'];
const STATUSES: TSMStatus[] = ['active', 'planned', 'complete', 'blocked'];
const STATUS_COLORS: Record<TSMStatus, string> = { active: '#00d4ff', planned: '#ff8c00', complete: '#00ff66', blocked: '#ff3333' };

const EDGE_TYPE_MAP: Record<string, string> = {
  dependency: 'data',
  unlocks: 'signal',
  'cross-stack': 'network',
};

const FLOW_EDGES = tsmEdges.map((edge) => ({
  id: edge.id,
  source: edge.source,
  target: edge.target,
  type: 'animated' as const,
  data: { edgeType: EDGE_TYPE_MAP[edge.type] || 'data' },
  animated: edge.animated ?? false,
}));

function buildNodes(
  onSelect?: (id: string) => void,
  onHover?: (id: string | null) => void,
  highlightedIds?: Set<string>,
  selectedNodeId?: string | null,
  hoveredNodeId?: string | null,
) {
  const byStack: Record<TSMStack, typeof tsmNodes> = { global: [], internal: [], external: [] };
  for (const node of tsmNodes) byStack[node.stack].push(node);

  return STACKS.flatMap((stack) =>
    byStack[stack].map((node, i) => ({
      id: node.id,
      type: 'stack' as const,
      position: { x: STACK_X[stack], y: i * 84 },
      data: {
        label: node.plane,
        detail: node.detail,
        stack,
        nodeId: node.id,
        status: node.status,
        color: TSM_STACK_COLORS[stack],
        linkCount: node.pageLinks.length,
        isHighlighted: hoveredNodeId ? highlightedIds?.has(node.id) ?? false : false,
        isDimmed: hoveredNodeId ? !(highlightedIds?.has(node.id) ?? false) : false,
        isSelected: selectedNodeId === node.id,
        onSelect,
        onHover,
      },
    })),
  );
}

// ─── Inner component (needs TSM context) ────────────────

function TSMFullView() {
  const { isDarkMode } = useTheme();
  const {
    selectNode, hoverNode, highlightedIds, selectedNodeId, hoveredNodeId,
    filterStack, setFilterStack, filterStatus, setFilterStatus,
  } = useTSM();

  const flowNodes = useMemo(
    () => buildNodes(selectNode, hoverNode, highlightedIds, selectedNodeId, hoveredNodeId),
    [selectNode, hoverNode, highlightedIds, selectedNodeId, hoveredNodeId],
  );

  const backLinkClass = [styles.backLink, !isDarkMode ? styles.lightBackLink : ''].filter(Boolean).join(' ');
  const controlBarClass = [styles.controlBar, !isDarkMode ? styles.lightControlBar : ''].filter(Boolean).join(' ');
  const legendClass = [styles.legend, !isDarkMode ? styles.lightLegend : ''].filter(Boolean).join(' ');

  return (
    <div className={styles.viewport}>
      {/* Diagram */}
      <FlowDiagram
        initialNodes={flowNodes}
        initialEdges={FLOW_EDGES}
        height="100vh"
        onNodeClick={(nodeId: string) => selectNode(nodeId)}
      />

      {/* Back link */}
      <Link href="/ops" className={backLinkClass}>
        <ArrowLeft size={14} /> Back to Ops
      </Link>

      {/* Floating filter controls */}
      <div className={styles.controls}>
        <div className={controlBarClass}>
          <Filter size={10} style={{ color: '#888' }} />
          {STACKS.map((stack) => (
            <button
              key={stack}
              className={`${styles.filterBtn} ${filterStack === stack ? styles.filterBtnActive : ''}`}
              onClick={() => setFilterStack(filterStack === stack ? null : stack)}
              style={{
                color: filterStack === stack ? TSM_STACK_COLORS[stack] : undefined,
                borderColor: filterStack === stack ? `${TSM_STACK_COLORS[stack]}60` : undefined,
                background: filterStack === stack ? `${TSM_STACK_COLORS[stack]}15` : undefined,
              }}
            >
              {TSM_STACK_SHORT[stack]}
            </button>
          ))}
        </div>
        <div className={controlBarClass}>
          {STATUSES.map((status) => (
            <button
              key={status}
              className={`${styles.filterBtn} ${filterStatus === status ? styles.filterBtnActive : ''}`}
              onClick={() => setFilterStatus(filterStatus === status ? null : status)}
              style={{
                color: filterStatus === status ? STATUS_COLORS[status] : undefined,
                borderColor: filterStatus === status ? `${STATUS_COLORS[status]}60` : undefined,
                background: filterStatus === status ? `${STATUS_COLORS[status]}15` : undefined,
                textTransform: 'capitalize',
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className={legendClass}>
        {STACKS.map((stack) => (
          <div key={stack} className={styles.legendItem}>
            <div className={styles.legendDot} style={{ background: TSM_STACK_COLORS[stack] }} />
            {TSM_STACK_SHORT[stack]}
          </div>
        ))}
      </div>

      {/* Watermark title */}
      <div className={styles.titleOverlay}>
        <div className={`${styles.titleMain} ${!isDarkMode ? styles.lightTitleMain : ''}`}>
          Triple Stack Model
        </div>
        <div className={`${styles.titleSub} ${!isDarkMode ? styles.lightTitleSub : ''}`}>
          3 stacks × 7 planes = 21 nodes
        </div>
      </div>

      {/* Detail panel */}
      <TSMDetailPanel />
    </div>
  );
}

// ─── Inner wrapper (reads searchParams inside Suspense) ─

function TSMPageInner() {
  const searchParams = useSearchParams();
  const initialNodeId = searchParams.get('node');

  return (
    <TSMProvider initialNodeId={initialNodeId}>
      <TSMFullView />
    </TSMProvider>
  );
}

// ─── Page wrapper ───────────────────────────────────────

export default function TSMPage() {
  return (
    <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>Loading TSM…</div>}>
      <TSMPageInner />
    </Suspense>
  );
}
