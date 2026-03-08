'use client';
import SpecPage from '@/components/ui/SpecPage';

export default function LatencyPage() {
  return (
    <SpecPage
      sectionNumber="10"
      title="LATENCY BUDGETING"
      description="End-to-end latency analysis across the complete signal chain from sensor input to projection output."
      startIndex={93}
      endIndex={102}
      stats={[
        { label: 'E2E TARGET', value: '<100ms' },
        { label: 'VIDEO SYNC', value: 'Genlock' },
        { label: 'A/V SYNC', value: '±10ms' },
      ]}
    />
  );
}
