'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

interface StackNodeData {
  label: string;
  detail?: string;
  stack: string;
  status: 'wip' | 'pending' | 'done';
  color?: string;
  [key: string]: unknown;
}

const STATUS_MAP: Record<string, { bg: string; label: string }> = {
  wip: { bg: 'rgba(0, 212, 255, 0.15)', label: 'WIP' },
  pending: { bg: 'rgba(255, 140, 0, 0.1)', label: '\u2022' },
  done: { bg: 'rgba(0, 255, 102, 0.1)', label: '\u2713' },
};

export const StackNode = memo(({ data }: NodeProps) => {
  const { label, detail, color = '#c4a265', status = 'pending' } = data as StackNodeData;
  const st = STATUS_MAP[status] || STATUS_MAP.pending;

  return (
    <div style={{
      background: st.bg,
      border: `1px solid ${color}40`,
      borderLeft: `3px solid ${color}`,
      borderRadius: 6,
      padding: '8px 12px',
      minWidth: 120,
    }}>
      <Handle type="target" position={Position.Top} style={{ background: color, width: 5, height: 5 }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#e0e0e0' }}>{label}</span>
        <span style={{ fontSize: 9, color, fontWeight: 700 }}>{st.label}</span>
      </div>
      {detail && (
        <div style={{ fontSize: 9, color: '#777', marginTop: 2 }}>{detail}</div>
      )}
      <Handle type="source" position={Position.Bottom} style={{ background: color, width: 5, height: 5 }} />
    </div>
  );
});

StackNode.displayName = 'StackNode';
