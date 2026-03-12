'use client';

/**
 * TSMContextWidget — Compact inline strip showing which TSM nodes
 * relate to the current page. Clicking a node navigates to /ops?node=<id>.
 *
 * Renders nothing if no TSM mapping exists for the current route.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import {
  getNodesForSlugGrouped,
  hasTSMMapping,
  TSM_STACK_COLORS,
  TSM_STACK_SHORT,
} from '@/data/tsmPageMap';
import type { TSMStack } from '@/data/diagramTsm';
import styles from './TSMContextWidget.module.scss';

// ─── Status color map ───────────────────────────────────────────────────────

const STATUS_DOT_COLORS: Record<string, string> = {
  active: '#00d4ff',
  planned: '#ff8c00',
  complete: '#00ff66',
  blocked: '#ff3333',
};

// ─── Component ──────────────────────────────────────────────────────────────

interface TSMContextWidgetProps {
  /** Override the route slug (for fixed-route pages like /technology, /executive) */
  slugOverride?: string;
}

export default function TSMContextWidget({ slugOverride }: TSMContextWidgetProps) {
  const pathname = usePathname();
  const { isDarkMode } = useTheme();

  // Derive slug from pathname: /projection → 'projection', /technology → 'technology'
  const slug = slugOverride ?? pathname.replace(/^\//, '').split('/')[0];

  if (!slug || !hasTSMMapping(slug)) return null;

  const grouped = getNodesForSlugGrouped(slug);
  const stacks: TSMStack[] = ['global', 'internal', 'external'];
  const hasEntries = stacks.some((s) => grouped[s].length > 0);

  if (!hasEntries) return null;

  const widgetClass = [styles.widget, !isDarkMode ? styles.lightWidget : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={widgetClass}>
      <span className={styles.tsmLabel}>TSM</span>
      {stacks.map((stack) => {
        const entries = grouped[stack];
        if (entries.length === 0) return null;
        const color = TSM_STACK_COLORS[stack];

        return (
          <div key={stack} className={styles.stackGroup}>
            {entries.map((entry) => {
              const dotColor =
                STATUS_DOT_COLORS[entry.node.status] || STATUS_DOT_COLORS.planned;
              return (
                <Link
                  key={entry.nodeId}
                  href={`/ops?node=${entry.nodeId}`}
                  className={styles.nodePill}
                  style={{
                    color,
                    borderColor: `${color}40`,
                    background: `${color}08`,
                  }}
                  title={`${TSM_STACK_SHORT[stack]} — ${entry.node.plane}: ${entry.node.detail}`}
                >
                  <span
                    className={styles.statusDot}
                    style={{ background: dotColor }}
                  />
                  {entry.node.plane}
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
