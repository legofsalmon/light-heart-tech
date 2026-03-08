'use client';
import SpecPage from '@/components/ui/SpecPage';

export default function SignalPage() {
  return (
    <SpecPage
      sectionNumber="04"
      title="SIGNAL TRANSPORT"
      description="Fiber optic signal transport architecture using DVIGear DVI-7380 for reliable 4K distribution."
      startIndex={33}
      endIndex={37}
      stats={[
        { label: 'SOLUTION', value: 'FIBER OPTIC' },
        { label: 'EXTENDER', value: 'DVI-7380' },
        { label: 'WALL FEED', value: '4K 60Hz' },
      ]}
    />
  );
}
