'use client';
import SpecPage from '@/components/ui/SpecPage';
export default function SurfacePage() {
  return (
    <SpecPage
      sectionNumber="05"
      title="SURFACE TREATMENT"
      description="Goo Systems projection paint specification for walls and floors across both rooms."
      startIndex={38}
      endIndex={46}
      stats={[
        { label: 'WALL PAINT', value: 'Screen Goo' },
        { label: 'FLOOR PAINT', value: 'Reference White' },
        { label: 'GAIN', value: '1.0 Unity' },
      ]}
    />
  );
}
