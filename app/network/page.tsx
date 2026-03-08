'use client';
import SpecPage from '@/components/ui/SpecPage';

export default function NetworkPage() {
  return (
    <SpecPage
      sectionNumber="07"
      title="NETWORK"
      description="100G spine network with strict segregation between video, audio, sensor, and control traffic."
      startIndex={55}
      endIndex={65}
      stats={[
        { label: 'SPINE', value: '100G' },
        { label: 'SWITCH', value: 'M4500-32C' },
        { label: 'BUDGET', value: '€93,080' },
        { label: 'STATUS', value: 'Confirmed', status: 'cyan' as const },
      ]}
    />
  );
}
