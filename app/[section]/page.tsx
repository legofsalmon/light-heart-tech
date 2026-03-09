'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useParams } from 'next/navigation';
import gsap from 'gsap';
import {
  Projector, Speaker, Cpu, Thermometer, FileText, Compass,
  Radio, Wifi, Clock, Server, Users, ShieldAlert, MonitorPlay, Layers,
} from 'lucide-react';
import { useLiveDoc } from '@/data/LiveDocProvider';
import { getSectionRange } from '@/data/sectionMap';
import DocSectionRenderer from '@/components/ui/DocSectionRenderer';
import { AccordionItem } from '@/components/ui/Accordion';
import styles from './page.module.scss';

/** Map slugs to top-level summary data fields */
const SLUG_SUMMARY: Record<string, string> = {
  'projection': 'projectionSystems',
  'audio': 'audioSystem',
  'network': 'networkInfrastructure',
  'server': 'serverRoom',
  'hvac': 'heatLoad',
};

/** Section icon for each section */
const SLUG_ICON: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'brief': FileText,
  'technical-direction': Compass,
  'projection': Projector,
  'signal': Radio,
  'surface': Layers,
  'sensors': Cpu,
  'network': Wifi,
  'audio-bridging': MonitorPlay,
  'audio': Speaker,
  'latency': Clock,
  'server': Server,
  'hvac': Thermometer,
  'vendors': Users,
  'disclaimer': ShieldAlert,
};

export default function SectionPage() {
  const params = useParams();
  const slug = params.section as string;
  const { data, loading } = useLiveDoc();
  const pageRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const range = getSectionRange(slug, data.sections);

  // Stable key so animation only fires once per slug
  const rangeKey = range ? `${slug}-${range.startIndex}` : null;

  useEffect(() => {
    // Reset animation flag when slug changes
    hasAnimated.current = false;
  }, [slug]);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || !rangeKey || hasAnimated.current) return;
    hasAnimated.current = true;
    const ctx = gsap.context(() => {
      gsap.fromTo('.spec-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'expo.out', delay: 0.15 },
      );
    }, page);
    return () => ctx.revert();
  }, [rangeKey]);

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
  const contentSections = sections.length > 1 ? sections.slice(1) : sections;
  const headerSec = sections[0];
  const headerLines = (headerSec?.fullText || '').split('\n').filter((l: string) => l.trim());
  const description = headerSec?.subsections?.[0]?.text
    || headerLines.find((l: string) => l !== 'What This Section Is About' && l !== 'Why It Matters' && l.length > 20)
    || '';

  const summaryField = SLUG_SUMMARY[slug];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const summaryData = summaryField ? (data as any)[summaryField] : null;
  const summaryPairs: [string, string][] = summaryData && typeof summaryData === 'object' && !Array.isArray(summaryData)
    ? Object.entries(summaryData) as [string, string][]
    : [];

  const IconComponent = SLUG_ICON[slug];

  return (
    <div ref={pageRef} className={`page-enter ${styles.page}`}>
      <div className={styles.container}>
        {/* Page header with section icon */}
        <div className={styles.header}>
          <div className={styles.headerMeta}>
            <span className="status-led cyan" />
            <span className="mono text-soft-gray">SECTION {range.sectionNumber}</span>
          </div>
          <div className={styles.titleRow}>
            {IconComponent && (
              <div className={styles.sectionIcon}>
                <IconComponent size={28} />
              </div>
            )}
            <h1 className={styles.title}>{range.title}</h1>
          </div>
          {description && <p className={styles.description}>{description}</p>}
        </div>

        {/* Summary stats bar */}
        {summaryPairs.length > 0 && (
          <div className={`spec-card ${styles.summaryBar}`}>
            {summaryPairs.slice(0, 4).map(([key, value], i) => (
              <div key={i} className={styles.summaryCard}>
                <div className={styles.summaryValue}>{value}</div>
                <div className={styles.summaryLabel}>{key}</div>
              </div>
            ))}
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

          if (section.title && hasContent) {
            return (
              <div key={i} className="spec-card">
                <AccordionItem title={section.title} defaultOpen={i < 3}>
                  <DocSectionRenderer section={section} showTitle={false} />
                </AccordionItem>
              </div>
            );
          }

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
