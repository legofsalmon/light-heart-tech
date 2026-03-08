'use client';
import SpecPage from '@/components/ui/SpecPage';
import { useSpecField } from '@/data/useLiveSection';

export default function ProjectionPage() {
  const totals = useSpecField('projectorTotals');
  const stats = totals && Object.keys(totals).length > 0
    ? Object.entries(totals).map(([label, value]) => ({ label: label.toUpperCase(), value: String(value) }))
    : [
        { label: 'TOTAL UNITS', value: '37' },
        { label: 'TOTAL COST', value: '€943,100' },
        { label: 'RIGGING WEIGHT', value: '851.80 kg' },
        { label: 'POWER DRAW', value: '24,510W' },
        { label: 'HEAT LOAD', value: '82,880 BTU/h' },
      ];

  return (
    <SpecPage
      sectionNumber="03"
      title="PROJECTION SYSTEMS"
      description="37 projectors. Barco laser projection systems capable of edge-blending seamlessly across multiple surfaces."
      startIndex={22}
      endIndex={32}
      stats={stats}
    />
  );
}
