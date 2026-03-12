'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

interface StatusNodeData {
  label: string;
  detail?: string;
  status: 'active' | 'pending' | 'critical' | 'blocked' | 'upcoming' | 'target' | 'completed';
  color?: string;
  [key: string]: unknown;
}

const STATUS_COLORS: Record<string, string> = {
  active: '#00ff66',
  completed: '#00ff66',
  pending: '#ff8c00',
  critical: '#ff3333',
  blocked: '#ff3333',
  upcoming: '#00d4ff',
  target: '#c4a265',
};

export const StatusNode = memo(({ data }: NodeProps) => {
  const { label, detail, status, color } = data as StatusNodeData;
  const statusColor = color || STATUS_COLORS[status] || '#666';

  return (
    <div style={{
      background: 'rgba(10, 10, 10, 0.9)',
      border: `1px solid ${statusColor}30`,
      borderRadius: 8,
      padding: '10px 14px',
      minWidth: 140,
      backdropFilter: 'blur(8px)',
    }}>
      <Handle type="target" position={Position.Top} style={{ background: statusColor, width: 6, height: 6 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: detail ? 4 : 0 }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: statusColor,
          boxShadow: `0 0 6px ${statusColor}60`,
        }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.03em' }}>
          {label}
        </span>
      </div>
      {detail && (
        <div style={{ fontSize: 10, color: '#888', lineHeight: 1.4, paddingLeft: 14 }}>
          {detail}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} style={{ background: statusColor, width: 6, height: 6 }} />
    </div>
  );
});

StatusNode.displayName = 'StatusNode';
