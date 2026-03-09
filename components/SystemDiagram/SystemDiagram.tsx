'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import {
  Projector, Speaker, Cpu, Thermometer,
  Radio, Wifi, Clock, Server, Users, MonitorPlay, Layers,
  ArrowRight,
} from 'lucide-react';
import { useLiveDoc } from '@/data/LiveDocProvider';
import styles from './SystemDiagram.module.scss';

/* ── Node definitions ──────────────────────── */

interface DiagramNode {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  slug: string;
  group: 'content' | 'transport' | 'infrastructure' | 'experience';
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

interface DiagramEdge {
  from: string;
  to: string;
  label: string;
  type: 'signal' | 'network' | 'power' | 'audio' | 'data';
}

const NODES: DiagramNode[] = [
  // Row 1 — Content Delivery (top center)
  { id: 'server',     label: 'MEDIA SERVERS',    icon: Server,     slug: 'server',     group: 'infrastructure', x: 50, y: 10 },
  // Row 2 — Signal chain
  { id: 'signal',     label: 'SIGNAL TRANSPORT', icon: Radio,      slug: 'signal',     group: 'transport',      x: 25, y: 28 },
  { id: 'projection', label: 'PROJECTORS',       icon: Projector,  slug: 'projection', group: 'content',        x: 75, y: 28 },
  // Row 3 — Infrastructure + Experience core
  { id: 'network',    label: 'NETWORK',          icon: Wifi,       slug: 'network',    group: 'infrastructure', x: 15, y: 50 },
  { id: 'sensors',    label: 'SENSORS',          icon: Cpu,        slug: 'sensors',    group: 'experience',     x: 50, y: 50 },
  { id: 'surface',    label: 'SURFACES',         icon: Layers,     slug: 'surface',    group: 'content',        x: 85, y: 50 },
  // Row 4 — Audio
  { id: 'audio-bridging', label: 'AUDIO BRIDGE', icon: MonitorPlay, slug: 'audio-bridging', group: 'transport', x: 25, y: 72 },
  { id: 'audio',      label: 'L-ISA AUDIO',      icon: Speaker,    slug: 'audio',      group: 'experience',     x: 75, y: 72 },
  // Row 5 — Bottom support
  { id: 'latency',    label: 'LATENCY',          icon: Clock,      slug: 'latency',    group: 'transport',      x: 50, y: 90 },
  { id: 'hvac',       label: 'HVAC',             icon: Thermometer, slug: 'hvac',      group: 'infrastructure', x: 15, y: 90 },
  { id: 'vendors',    label: 'VENDORS',          icon: Users,      slug: 'vendors',    group: 'infrastructure', x: 85, y: 90 },
];

const EDGES: DiagramEdge[] = [
  // Signal flow from servers
  { from: 'server',   to: 'signal',          label: 'NDI / SDVoE',       type: 'signal' },
  { from: 'server',   to: 'projection',      label: 'Media Output',      type: 'signal' },
  { from: 'signal',   to: 'projection',      label: '4K Distribution',   type: 'signal' },
  // Network backbone
  { from: 'network',  to: 'signal',          label: '10GbE Backbone',    type: 'network' },
  { from: 'network',  to: 'sensors',         label: 'PoE / Data',        type: 'network' },
  { from: 'network',  to: 'audio-bridging',  label: 'Dante / AVB',       type: 'network' },
  // Audio chain
  { from: 'audio-bridging', to: 'audio',     label: 'Milan-AVB Bridge',  type: 'audio' },
  { from: 'server',   to: 'audio-bridging',  label: 'Dante Audio',       type: 'audio' },
  // Projection → surfaces
  { from: 'projection', to: 'surface',       label: 'Light Output',      type: 'signal' },
  // Sensors → server (feedback loop)
  { from: 'sensors',  to: 'server',          label: 'Tracking Data',     type: 'data' },
  // Infrastructure
  { from: 'hvac',     to: 'server',          label: 'Cooling',           type: 'power' },
  // Latency affects signal + audio
  { from: 'latency',  to: 'signal',          label: 'Timing Budget',     type: 'data' },
  { from: 'latency',  to: 'audio',           label: 'Sync Target',       type: 'data' },
];

/* ── Edge color by type ────────── */
const EDGE_COLORS: Record<string, string> = {
  signal:  'rgba(0, 240, 255, 0.3)',
  network: 'rgba(0, 255, 136, 0.25)',
  audio:   'rgba(180, 130, 255, 0.3)',
  power:   'rgba(255, 140, 0, 0.25)',
  data:    'rgba(255, 255, 255, 0.15)',
};

const EDGE_COLORS_ACTIVE: Record<string, string> = {
  signal:  'rgba(0, 240, 255, 0.85)',
  network: 'rgba(0, 255, 136, 0.75)',
  audio:   'rgba(180, 130, 255, 0.8)',
  power:   'rgba(255, 140, 0, 0.75)',
  data:    'rgba(255, 255, 255, 0.55)',
};

const GROUP_LABELS: Record<string, { label: string; color: string }> = {
  content:        { label: 'CONTENT',         color: 'rgba(0, 240, 255, 0.05)' },
  transport:      { label: 'TRANSPORT',       color: 'rgba(0, 255, 136, 0.04)' },
  infrastructure: { label: 'INFRASTRUCTURE',  color: 'rgba(255, 140, 0, 0.04)' },
  experience:     { label: 'EXPERIENCE',      color: 'rgba(180, 130, 255, 0.04)' },
};

/* ── Summary data keys for quick stats ────── */
const SLUG_STATS_KEY: Record<string, string> = {
  'projection': 'projectionSystems',
  'audio':      'audioSystem',
  'network':    'networkInfrastructure',
  'server':     'serverRoom',
  'hvac':       'heatLoad',
};

export default function SystemDiagram() {
  const router = useRouter();
  const { data } = useLiveDoc();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ w: 1000, h: 720 });

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<number | null>(null);

  // Track canvas size for SVG viewBox
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const measure = () => {
      setCanvasSize({ w: el.offsetWidth, h: el.offsetHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Entrance animation — use opacity only (not scale/transform) to avoid conflict with CSS translate centering
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(`.${styles.nodeInner}`,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'expo.out', delay: 0.3 }
      );
      gsap.fromTo(`.${styles.edgePath}`,
        { strokeDashoffset: 400, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 1, stagger: 0.04, ease: 'expo.out', delay: 0.5 }
      );
    }, containerRef.current);
    return () => ctx.revert();
  }, []);

  const isNodeConnected = useCallback((nodeId: string) => {
    if (!hoveredNode) return false;
    if (nodeId === hoveredNode) return true;
    return EDGES.some(e =>
      (e.from === hoveredNode && e.to === nodeId) ||
      (e.to === hoveredNode && e.from === nodeId)
    );
  }, [hoveredNode]);

  const isEdgeConnected = useCallback((edge: DiagramEdge) => {
    if (!hoveredNode) return false;
    return edge.from === hoveredNode || edge.to === hoveredNode;
  }, [hoveredNode]);

  // Get quick stats for a node — truncated for compact tooltip display
  const getNodeStats = useCallback((slug: string) => {
    const key = SLUG_STATS_KEY[slug];
    if (!key) return [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const record = (data as any)[key];
    if (!record || typeof record !== 'object') return [];
    return Object.entries(record).slice(0, 2).map(([k, v]) => {
      let val = String(v);
      // Truncate long values for compact node tooltip
      if (val.length > 18) {
        // Try to extract a leading number with unit
        const numMatch = val.match(/^~?([\d,.]+\s*(?:x\s*)?[A-Za-z\d/]+)/);
        if (numMatch) {
          val = numMatch[0];
        } else {
          val = val.substring(0, 16) + '…';
        }
      }
      const label = k.length > 12 ? k.substring(0, 11) + '…' : k;
      return { label, value: val };
    });
  }, [data]);

  /* ── Compute bezier path between two nodes using pixel coords ────── */
  const getEdgePath = useCallback((from: DiagramNode, to: DiagramNode): string => {
    const { w, h } = canvasSize;
    const fx = (from.x / 100) * w;
    const fy = (from.y / 100) * h;
    const tx = (to.x / 100) * w;
    const ty = (to.y / 100) * h;

    const mx = (fx + tx) / 2;
    const my = (fy + ty) / 2;

    const dx = tx - fx;
    const dy = ty - fy;

    // Control point offsets for nice curves
    const offsetX = Math.abs(dy) > Math.abs(dx) ? dx * 0.35 : 0;
    const offsetY = Math.abs(dx) > Math.abs(dy) ? dy * 0.35 : 0;

    return `M ${fx} ${fy} Q ${mx + offsetX} ${my + offsetY}, ${tx} ${ty}`;
  }, [canvasSize]);

  /* ── Edge label midpoint ────── */
  const getEdgeMid = useCallback((from: DiagramNode, to: DiagramNode) => {
    const { w, h } = canvasSize;
    return {
      x: ((from.x + to.x) / 2 / 100) * w,
      y: ((from.y + to.y) / 2 / 100) * h,
    };
  }, [canvasSize]);

  const nodeMap = Object.fromEntries(NODES.map(n => [n.id, n]));

  return (
    <div ref={containerRef} className={styles.diagram}>
      <div className={styles.diagramHeader}>
        <h2 className={styles.diagramTitle}>SYSTEM ARCHITECTURE</h2>
        <p className={styles.diagramSubtitle}>
          Interactive overview of the Lightheart AV installation.
          Hover nodes to explore connections. Click to navigate to section detail.
        </p>
        <div className={styles.legend}>
          {Object.entries(EDGE_COLORS_ACTIVE).map(([type, color]) => (
            <div key={type} className={styles.legendItem}>
              <span className={styles.legendLine} style={{ background: color }} />
              <span>{type.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>

      <div ref={canvasRef} className={styles.canvas}>
        {/* SVG connection lines — viewBox matches pixel dimensions */}
        <svg
          className={styles.svg}
          viewBox={`0 0 ${canvasSize.w} ${canvasSize.h}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {EDGES.map((edge, i) => {
            const from = nodeMap[edge.from];
            const to = nodeMap[edge.to];
            if (!from || !to) return null;
            const active = isEdgeConnected(edge);
            const dimmed = hoveredNode && !active;
            const hovered = hoveredEdge === i;
            const mid = getEdgeMid(from, to);

            return (
              <g key={i}>
                {/* Wider invisible hit area for hover */}
                <path
                  d={getEdgePath(from, to)}
                  stroke="transparent"
                  strokeWidth="12"
                  fill="none"
                  onMouseEnter={() => setHoveredEdge(i)}
                  onMouseLeave={() => setHoveredEdge(null)}
                  style={{ pointerEvents: 'stroke', cursor: 'default' }}
                />
                {/* Visible edge */}
                <path
                  d={getEdgePath(from, to)}
                  className={styles.edgePath}
                  stroke={active || hovered ? EDGE_COLORS_ACTIVE[edge.type] : EDGE_COLORS[edge.type]}
                  strokeWidth={active || hovered ? 2.5 : 1.5}
                  fill="none"
                  strokeDasharray={edge.type === 'data' ? '6 4' : 'none'}
                  style={{
                    opacity: dimmed ? 0.1 : 1,
                    transition: 'all 0.3s ease',
                  }}
                />
                {/* Edge label on hover */}
                {(active || hovered) && (
                  <text
                    x={mid.x}
                    y={mid.y - 8}
                    className={styles.edgeLabel}
                    fill={EDGE_COLORS_ACTIVE[edge.type]}
                    textAnchor="middle"
                    fontSize="11"
                    fontFamily="'JetBrains Mono', monospace"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Node cards */}
        {NODES.map((node) => {
          const Icon = node.icon;
          const connected = isNodeConnected(node.id);
          const dimmed = hoveredNode !== null && !connected;
          const isHovered = hoveredNode === node.id;
          const stats = getNodeStats(node.slug);
          const groupInfo = GROUP_LABELS[node.group];

          return (
            <div
              key={node.id}
              className={`${styles.node} ${isHovered ? styles.nodeHovered : ''} ${dimmed ? styles.nodeDimmed : ''} ${connected && !isHovered ? styles.nodeConnected : ''}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => router.push(`/${node.slug}`)}
              data-group={node.group}
            >
              <div className={styles.nodeInner}>
                <div className={styles.nodeIconRow}>
                  <div className={styles.nodeIcon} style={{
                    borderColor: isHovered ? groupInfo.color.replace('0.0', '0.') : undefined,
                  }}>
                    <Icon size={18} />
                  </div>
                  <span className={styles.nodeStatus}>
                    <span className={`status-led ${isHovered ? 'cyan' : 'lime'}`} />
                  </span>
                </div>
                <div className={styles.nodeLabel}>{node.label}</div>

                {/* Stat preview on hover */}
                {isHovered && stats.length > 0 && (
                  <div className={styles.nodeStats}>
                    {stats.map((s, i) => (
                      <div key={i} className={styles.nodeStat}>
                        <span className={styles.nodeStatValue}>{s.value}</span>
                        <span className={styles.nodeStatLabel}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {isHovered && (
                  <div className={styles.nodeAction}>
                    <ArrowRight size={11} />
                    <span>VIEW SECTION</span>
                  </div>
                )}
              </div>

              {/* Group tag */}
              <div className={styles.nodeGroup}>{groupInfo.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
