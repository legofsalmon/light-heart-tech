'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import gsap from 'gsap';
import { useLiveDoc } from '@/data/LiveDocProvider';
import { getSectionRange } from '@/data/sectionMap';
import DocSectionRenderer from '@/components/ui/DocSectionRenderer';
import { AccordionItem } from '@/components/ui/Accordion';
import styles from './page.module.scss';

export default function SectionPage() {
  const params = useParams();
  const slug = params.section as string;
  const { data, loading } = useLiveDoc();
  const pageRef = useRef<HTMLDivElement>(null);

  const range = getSectionRange(slug, data.sections);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || !range) return;
    const ctx = gsap.context(() => {
      gsap.from('.spec-card', {
        y: 30, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'expo.out', delay: 0.15,
      });
    }, page);
    return () => ctx.revert();
  }, [range]);

  // 404 for unknown slugs
  if (!loading && !range) {
    return (
      <div className={`page-enter ${styles.page}`}>
        <div className={styles.container}>
          <h1 className={styles.title}>SECTION NOT FOUND</h1>
          <p className="text-soft-gray">No matching section in the specification document.</p>
        </div>
      </div>
    );
  }

  if (!range) {
    return (
      <div className={`page-enter ${styles.page}`}>
        <div className={styles.container}>
          <span className="status-led orange" /> <span className="text-soft-gray">Loading...</span>
        </div>
      </div>
    );
  }

  const sections = data.sections.slice(range.startIndex, range.endIndex + 1);
  // First section is the "Section N: Title" header — the rest is content
  const contentSections = sections.length > 1 ? sections.slice(1) : sections;
  // Get description from the header section's subsections or fullText
  const headerSec = sections[0];
  const description = headerSec?.subsections?.[0]?.text
    || headerSec?.fullText?.split('\n')[0]
    || '';

  return (
    <div ref={pageRef} className={`page-enter ${styles.page}`}>
      <div className={styles.container}>
        {/* Page header */}
        <div className={styles.header}>
          <div className={styles.headerMeta}>
            <span className="status-led cyan" />
            <span className="mono text-soft-gray">SECTION {range.sectionNumber}</span>
          </div>
          <h1 className={styles.title}>{range.title}</h1>
          {description && <p className={styles.description}>{description}</p>}
        </div>

        {/* Content sections as accordions */}
        {contentSections.map((section, i) => {
          const hasContent =
            section.fullText ||
            (section.tables && section.tables.length > 0) ||
            (section.listItems && section.listItems.length > 0) ||
            (section.subsections && section.subsections.length > 0);

          if (!hasContent && !section.title) return null;

          // Sections with title + content → accordion
          if (section.title && hasContent) {
            return (
              <div key={i} className="spec-card">
                <AccordionItem title={section.title} defaultOpen={i < 3}>
                  <DocSectionRenderer section={section} showTitle={false} />
                </AccordionItem>
              </div>
            );
          }

          // Untitled content blocks → flat render
          if (hasContent) {
            return (
              <div key={i} className="spec-card glass-panel" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <DocSectionRenderer section={section} showTitle={false} />
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
