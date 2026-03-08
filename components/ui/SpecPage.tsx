'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useSectionRange } from '@/data/useLiveSection';
import { useLiveDoc } from '@/data/LiveDocProvider';
import DocSectionRenderer from '@/components/ui/DocSectionRenderer';
import { AccordionItem } from '@/components/ui/Accordion';
import SpecTable from '@/components/ui/SpecTable';
import styles from './SpecPage.module.scss';

interface StatCard {
  label: string;
  value: string;
  status?: 'cyan' | 'orange' | 'lime';
}

interface SpecPageProps {
  sectionNumber: string;
  title: string;
  startIndex: number;
  endIndex: number;
  description?: string;
  /** Summary stat cards shown at the top of the page */
  stats?: StatCard[];
  /** Extra content before the sections */
  headerExtra?: React.ReactNode;
  /** Extra content after the sections */
  footerExtra?: React.ReactNode;
}

export default function SpecPage({
  sectionNumber,
  title,
  startIndex,
  endIndex,
  description,
  stats,
  headerExtra,
  footerExtra,
}: SpecPageProps) {
  const sections = useSectionRange(startIndex, endIndex);
  const { loading } = useLiveDoc();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const ctx = gsap.context(() => {
      gsap.from('.spec-card', {
        y: 30, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'expo.out', delay: 0.15,
      });
      if (stats && stats.length) {
        gsap.from('.stat-card', {
          y: 20, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'expo.out', delay: 0.1,
        });
      }
    }, page);
    return () => ctx.revert();
  }, [sections, stats]);

  // First section is the "Section N: Title" header — skip it, render from index 1
  const contentSections = sections.length > 1 ? sections.slice(1) : sections;

  // Separate the page description from the first section's text
  const pageDesc = description || sections[0]?.fullText?.split('\n')[0] || '';

  return (
    <div ref={pageRef} className={`page-enter ${styles.page}`}>
      <div className={styles.container}>
        {/* Page header */}
        <div className={styles.header}>
          <div className={styles.headerMeta}>
            <span className="status-led cyan" />
            <span className="mono text-soft-gray">SECTION {sectionNumber}</span>
          </div>
          <h1 className={styles.title}>{title}</h1>
          {pageDesc && <p className={styles.description}>{pageDesc}</p>}
        </div>

        {/* Stat cards */}
        {stats && stats.length > 0 && (
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <div key={i} className={`stat-card ${styles.statCard}`}>
                <div className={`${styles.statValue} text-neon-cyan`}>{stat.value}</div>
                <div className={`${styles.statLabel} mono text-soft-gray`}>{stat.label}</div>
                {stat.status && <span className={`status-led ${stat.status}`} />}
              </div>
            ))}
          </div>
        )}

        {headerExtra}

        {/* Loading */}
        {loading && sections.length === 0 && (
          <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
            <span className="status-led orange" style={{ marginRight: '0.5rem' }} />
            <span className="text-soft-gray">Loading sections...</span>
          </div>
        )}

        {/* Content sections as accordions */}
        {contentSections.map((section, i) => {
          const hasContent =
            section.fullText ||
            (section.tables && section.tables.length > 0) ||
            (section.listItems && section.listItems.length > 0) ||
            (section.subsections && section.subsections.length > 0);

          if (!hasContent && !section.title) return null;

          // Sections with substantial content → accordion
          // Short/empty sections → flat render
          if (section.title && hasContent) {
            return (
              <div key={i} className="spec-card">
                <AccordionItem title={section.title} defaultOpen={i < 3}>
                  <DocSectionRenderer section={section} showTitle={false} />
                </AccordionItem>
              </div>
            );
          }

          // Sections with tables but no title — render flat in a glass panel
          if (section.tables && section.tables.length > 0) {
            return (
              <div key={i} className="spec-card glass-panel" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                {section.tables.map((table, ti) => (
                  <SpecTable key={ti} rows={table} />
                ))}
              </div>
            );
          }

          return null;
        })}

        {footerExtra}
      </div>
    </div>
  );
}
