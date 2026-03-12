'use client';

/**
 * TSMDetailPanel — Slide-in sidebar showing full detail for a selected TSM node.
 *
 * Uses Radix Dialog for accessibility (focus trap, Escape to close).
 * Shows: description, deliverables, acceptance criteria, dependencies, page links.
 */

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ArrowRight, FileText, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useTSM } from '@/data/TSMProvider';
import { useTheme } from '@/components/ThemeProvider';
import {
  TSM_STACK_COLORS,
  TSM_STACK_SHORT,
  getNodeById,
  getNeighbours,
} from '@/data/tsmPageMap';
import type { TSMNode, TSMStack } from '@/data/diagramTsm';
import styles from './TSMDetailPanel.module.scss';

// ─── Status display config ──────────────────────────────────────────────────

const STATUS_DISPLAY: Record<string, { label: string; color: string; bg: string }> = {
  active: { label: 'Active', color: '#00d4ff', bg: 'rgba(0, 212, 255, 0.15)' },
  planned: { label: 'Planned', color: '#ff8c00', bg: 'rgba(255, 140, 0, 0.12)' },
  complete: { label: 'Complete', color: '#00ff66', bg: 'rgba(0, 255, 102, 0.12)' },
  blocked: { label: 'Blocked', color: '#ff3333', bg: 'rgba(255, 51, 51, 0.12)' },
};

// ─── Component ──────────────────────────────────────────────────────────────

export default function TSMDetailPanel() {
  const { selectedNode, selectedNodeId, selectNode, isDetailOpen } = useTSM();
  const { isDarkMode } = useTheme();
  const panelRef = useRef<HTMLDivElement>(null);

  // GSAP entrance animation
  useEffect(() => {
    if (isDetailOpen && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.4, ease: 'expo.out' },
      );
    }
  }, [isDetailOpen, selectedNodeId]);

  if (!selectedNode) return null;

  const node: TSMNode = selectedNode;
  const stackColor = TSM_STACK_COLORS[node.stack];
  const stackLabel = TSM_STACK_SHORT[node.stack];
  const statusInfo = STATUS_DISPLAY[node.status] || STATUS_DISPLAY.planned;
  const { upstream, downstream } = getNeighbours(node.id);

  const handleDepClick = (depId: string) => {
    selectNode(depId);
  };

  const panelClass = [styles.panel, !isDarkMode ? styles.lightPanel : '']
    .filter(Boolean)
    .join(' ');

  return (
    <Dialog.Root open={isDetailOpen} onOpenChange={(open) => !open && selectNode(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          ref={panelRef}
          className={panelClass}
          style={{ '--stack-color': stackColor } as React.CSSProperties}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {/* Stack accent bar at top */}
          <div className={styles.stackAccent} style={{ background: stackColor }} />

          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <Dialog.Title className={styles.planeName}>
                {node.plane}
              </Dialog.Title>
              <div className={styles.badges}>
                <span
                  className={styles.stackBadge}
                  style={{
                    color: stackColor,
                    borderColor: `${stackColor}40`,
                    background: `${stackColor}10`,
                  }}
                >
                  {stackLabel}
                </span>
                <span
                  className={styles.statusBadge}
                  style={{
                    color: statusInfo.color,
                    background: statusInfo.bg,
                  }}
                >
                  {statusInfo.label}
                </span>
              </div>
            </div>
            <Dialog.Close asChild>
              <button className={styles.closeBtn} aria-label="Close panel">
                <X size={16} />
              </button>
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className={styles.body}>
            {/* Description */}
            <div className={styles.section}>
              <span className={styles.sectionLabel}>Description</span>
              <p className={styles.description}>{node.detail}</p>
            </div>

            {/* Acceptance Criteria */}
            {node.acceptanceCriteria && (
              <div className={styles.section}>
                <span className={styles.sectionLabel}>Acceptance Criteria</span>
                <div className={styles.criteria}>{node.acceptanceCriteria}</div>
              </div>
            )}

            {/* Deliverables */}
            {node.deliverables.length > 0 && (
              <div className={styles.section}>
                <span className={styles.sectionLabel}>
                  Deliverables ({node.deliverables.length})
                </span>
                <ul className={styles.deliverables}>
                  {node.deliverables.map((d, i) => (
                    <li key={i} className={styles.deliverable}>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Dependencies — Depends On */}
            {upstream.length > 0 && (
              <div className={styles.section}>
                <span className={styles.sectionLabel}>Depends On</span>
                <div className={styles.depRow}>
                  {upstream.map((depId) => {
                    const depNode = getNodeById(depId);
                    if (!depNode) return null;
                    const depColor = TSM_STACK_COLORS[depNode.stack];
                    return (
                      <button
                        key={depId}
                        className={styles.depPill}
                        style={{ '--stack-color': depColor } as React.CSSProperties}
                        onClick={() => handleDepClick(depId)}
                      >
                        {depNode.plane}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dependencies — Unlocks */}
            {downstream.length > 0 && (
              <div className={styles.section}>
                <span className={styles.sectionLabel}>Unlocks</span>
                <div className={styles.depRow}>
                  {downstream.map((unlockId) => {
                    const unlockNode = getNodeById(unlockId);
                    if (!unlockNode) return null;
                    const unlockColor = TSM_STACK_COLORS[unlockNode.stack];
                    return (
                      <button
                        key={unlockId}
                        className={styles.depPill}
                        style={{ '--stack-color': unlockColor } as React.CSSProperties}
                        onClick={() => handleDepClick(unlockId)}
                      >
                        {unlockNode.plane}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Linked Pages */}
            {node.pageLinks.length > 0 && (
              <div className={styles.section}>
                <span className={styles.sectionLabel}>
                  Linked Pages ({node.pageLinks.length})
                </span>
                <div className={styles.pageLinks}>
                  {node.pageLinks.map((link) => {
                    const href = link.section
                      ? `/${link.slug}${link.section}`
                      : `/${link.slug}`;
                    return (
                      <Link
                        key={`${link.slug}-${link.section ?? ''}`}
                        href={href}
                        className={styles.pageLink}
                        onClick={() => selectNode(null)}
                      >
                        <FileText className={styles.pageLinkIcon} />
                        <span className={styles.pageLinkLabel}>{link.label}</span>
                        <ArrowUpRight className={styles.pageLinkArrow} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
