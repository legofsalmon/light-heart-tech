'use client';

import type { DocSection } from '@/data/types';
import SpecTable from '@/components/ui/SpecTable';
import styles from './DocSectionRenderer.module.scss';

interface DocSectionRendererProps {
  section: DocSection;
  /** If true, render the title as an h2 inside a glass panel header */
  showTitle?: boolean;
  /** CSS class for the wrapper */
  className?: string;
}

/**
 * Renders a single DocSection from the worker JSON.
 * Handles: fullText, tables, listItems, subsections.
 */
export default function DocSectionRenderer({
  section,
  showTitle = true,
  className,
}: DocSectionRendererProps) {
  if (!section) return null;

  const hasContent =
    section.fullText ||
    section.tables?.length > 0 ||
    section.listItems?.length > 0 ||
    (section.subsections && section.subsections.length > 0);

  if (!hasContent && !showTitle) return null;

  return (
    <div className={`${styles.section} ${className || ''}`}>
      {showTitle && section.title && (
        <h3 className={styles.title}>{section.title}</h3>
      )}

      {/* Full text — split into paragraphs */}
      {section.fullText && (
        <div className={styles.text}>
          {section.fullText
            .split('\n')
            .filter((p) => p.trim())
            .map((para, i) => (
              <p key={i}>{para}</p>
            ))}
        </div>
      )}

      {/* Tables */}
      {section.tables?.map((table, i) => (
        <SpecTable key={`t-${i}`} rows={table} />
      ))}

      {/* List items */}
      {section.listItems && section.listItems.length > 0 && (
        <ul className={styles.list}>
          {section.listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}

      {/* Subsections */}
      {section.subsections?.map((sub, i) => (
        <div key={`sub-${i}`} className={styles.subsection}>
          {sub.title && <h4 className={styles.subTitle}>{sub.title}</h4>}
          {sub.text && (
            <div className={styles.text}>
              {sub.text
                .split('\n')
                .filter((p) => p.trim())
                .map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
            </div>
          )}
          {sub.tables?.map((table, ti) => (
            <SpecTable key={`sub-t-${ti}`} rows={table} />
          ))}
          {sub.lists && sub.lists.length > 0 && (
            <ul className={styles.list}>
              {sub.lists.map((item, li) => (
                <li key={li}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
