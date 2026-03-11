'use client';

import { memo } from 'react';
import { BaseEdge, getBezierPath, type EdgeProps } from '@xyflow/react';

const TYPE_COLORS: Record<string, string> = {
  signal: '#00d4ff',
  audio: '#c4a265',
  network: '#00ff66',
  data: '#ff8c00',
  dependency: '#666',
  critical: '#ff3333',
};

export const AnimatedEdge = memo((props: EdgeProps) => {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data } = props;
  const edgeData = data as { type?: string; label?: string } | undefined;
  const color = TYPE_COLORS[edgeData?.type || 'dependency'] || '#444';

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition,
  });

  return (
    <>
      <BaseEdge
        {...props}
        path={edgePath}
        style={{
          stroke: color,
          strokeWidth: 1.5,
          strokeDasharray: '6 3',
          animation: 'flowDash 1.5s linear infinite',
          opacity: 0.6,
        }}
      />
      {edgeData?.label && (
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: 9,
            fill: color,
            fontWeight: 600,
            letterSpacing: '0.03em',
            pointerEvents: 'none',
          }}
        >
          {edgeData.label}
        </text>
      )}
      <style>{`
        @keyframes flowDash {
          to { stroke-dashoffset: -18; }
        }
      `}</style>
    </>
  );
});

AnimatedEdge.displayName = 'AnimatedEdge';
