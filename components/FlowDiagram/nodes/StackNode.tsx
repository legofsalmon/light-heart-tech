'use client';

import { memo, useCallback } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { ExternalLink } from 'lucide-react';
import styles from './StackNode.module.scss';

// ─── Types ──────────────────────────────────────────────────────────────────

interface StackNodeData {
  label: string;
  detail?: string;
  stack: string;
  nodeId: string;
  status: 'active' | 'planned' | 'complete' | 'blocked';
  color?: string;
  linkCount?: number;
  /** Injected from parent: is this node in the highlighted chain? */
  isHighlighted?: boolean;
  /** Injected: should this node be dimmed? */
  isDimmed?: boolean;
  /** Injected: is this node selected? */
  isSelected?: boolean;
  /** Injected: callback when node is clicked */
  onSelect?: (nodeId: string) => void;
  /** Injected: callback when node is hovered */
  onHover?: (nodeId: string | null) => void;
  [key: string]: unknown;
}

const STATUS_CONFIG: Record<string, { bg: string; label: string; color: string }> = {
  active: {
    bg: 'rgba(0, 212, 255, 0.12)',
    label: 'ACTIVE',
    color: '#00d4ff',
  },
  planned: {
    bg: 'rgba(255, 140, 0, 0.08)',
    label: 'PLANNED',
    color: '#ff8c00',
  },
  complete: {
    bg: 'rgba(0, 255, 102, 0.1)',
    label: 'DONE',
    color: '#00ff66',
  },
  blocked: {
    bg: 'rgba(255, 51, 51, 0.1)',
    label: 'BLOCKED',
    color: '#ff3333',
  },
};

// ─── Component ──────────────────────────────────────────────────────────────

export const StackNode = memo(({ data }: NodeProps) => {
  const {
    label,
    detail,
    nodeId,
    color = '#c4a265',
    status = 'planned',
    linkCount = 0,
    isHighlighted = false,
    isDimmed = false,
    isSelected = false,
    onSelect,
    onHover,
  } = data as StackNodeData;

  const st = STATUS_CONFIG[status] || STATUS_CONFIG.planned;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onSelect?.(nodeId);
    },
    [onSelect, nodeId],
  );

  const handleMouseEnter = useCallback(() => {
    onHover?.(nodeId);
  }, [onHover, nodeId]);

  const handleMouseLeave = useCallback(() => {
    onHover?.(null);
  }, [onHover]);

  // Build class list
  const classNames = [
    styles.node,
    isHighlighted ? styles.highlighted : '',
    isDimmed ? styles.dimmed : '',
    isSelected ? styles.selected : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      style={{
        background: st.bg,
        border: `1px solid ${color}40`,
        borderLeft: `3px solid ${color}`,
        // CSS custom props for dynamic theming in SCSS
        '--stack-color': color,
        '--stack-glow': `${color}25`,
        '--stack-color-dim': `${color}30`,
      } as React.CSSProperties}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Handle
        type="target"
        position={Position.Top}
        className={styles.handle}
        style={{ background: color }}
      />

      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span
          className={styles.statusBadge}
          style={{ color: st.color, background: `${st.color}15` }}
        >
          {st.label}
        </span>
      </div>

      {detail && <div className={styles.detail}>{detail}</div>}

      {linkCount > 0 && (
        <div className={styles.linkBadge}>
          <ExternalLink className={styles.linkIcon} />
          {linkCount} {linkCount === 1 ? 'page' : 'pages'}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className={styles.handle}
        style={{ background: color }}
      />
    </div>
  );
});

StackNode.displayName = 'StackNode';
