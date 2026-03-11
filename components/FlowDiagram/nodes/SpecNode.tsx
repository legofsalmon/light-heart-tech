'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

interface SpecNodeData {
  label: string;
  stats?: string;
  icon?: string;
  color?: string;
  [key: string]: unknown;
}

export const SpecNode = memo(({ data }: NodeProps) => {
  const { label, stats, color = '#00d4ff' } = data as SpecNodeData;

  return (
    <div style={{
      background: 'rgba(10, 10, 10, 0.92)',
      border: `1px solid ${color}25`,
      borderRadius: 8,
      padding: '10px 14px',
      minWidth: 150,
      backdropFilter: 'blur(8px)',
    }}>
      <Handle type="target" position={Position.Top} style={{ background: color, width: 6, height: 6 }} />
      <div style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: '0.05em', marginBottom: stats ? 4 : 0 }}>
        {label}
      </div>
      {stats && (
        <div style={{ fontSize: 10, color: '#888', lineHeight: 1.4 }}>
          {stats}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} style={{ background: color, width: 6, height: 6 }} />
    </div>
  );
});

SpecNode.displayName = 'SpecNode';
