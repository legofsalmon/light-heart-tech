'use client';

import { useCallback, useEffect, useRef } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from '@xyflow/react';
import gsap from 'gsap';
import { useTheme } from '@/components/ThemeProvider';
import { StatusNode } from './nodes/StatusNode';
import { StackNode } from './nodes/StackNode';
import { SpecNode } from './nodes/SpecNode';
import { AnimatedEdge } from './edges/AnimatedEdge';
import styles from './FlowDiagram.module.scss';

const nodeTypes = {
  status: StatusNode,
  stack: StackNode,
  spec: SpecNode,
};

const edgeTypes = {
  animated: AnimatedEdge,
};

interface FlowDiagramProps {
  initialNodes: Node[];
  initialEdges: Edge[];
  height?: number | string;
  fitView?: boolean;
  interactive?: boolean;
  onNodeClick?: (nodeId: string) => void;
}

export default function FlowDiagram({
  initialNodes,
  initialEdges,
  height = 500,
  fitView = true,
  interactive = true,
  onNodeClick,
}: FlowDiagramProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  // Sync nodes when initialNodes change (for interactive highlight/dim states)
  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0, y: 20, duration: 0.6, ease: 'expo.out',
      });
    }
  }, []);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      onNodeClick?.(node.id);
    },
    [onNodeClick],
  );

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ height, background: isDarkMode ? '#0d0d0d' : '#fafaf8' }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView={fitView}
        nodesDraggable={interactive}
        nodesConnectable={false}
        elementsSelectable={interactive}
        proOptions={{ hideAttribution: true }}
        minZoom={0.3}
        maxZoom={2}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color={isDarkMode ? '#1a1a1a' : '#e0e0dc'}
        />
        <Controls
          showInteractive={false}
          style={{
            borderRadius: 8,
            border: isDarkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
            background: isDarkMode ? '#111' : '#fff',
          }}
        />
        <MiniMap
          nodeColor={(n) => {
            const data = n.data as { color?: string };
            return data?.color || (isDarkMode ? '#333' : '#ccc');
          }}
          style={{
            borderRadius: 8,
            border: isDarkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
            background: isDarkMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)',
          }}
          maskColor={isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)'}
        />
      </ReactFlow>
    </div>
  );
}
