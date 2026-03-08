'use client';
import SpecPage from '@/components/ui/SpecPage';

export default function ServerPage() {
  return (
    <SpecPage
      sectionNumber="11"
      title="SERVER ROOM"
      description="Pixera PX2 Octo media servers, processing hardware, network infrastructure, and rack specifications."
      startIndex={103}
      endIndex={117}
      stats={[
        { label: 'MEDIA SERVERS', value: '5× PX2 Octo' },
        { label: 'BUDGET', value: '€443,103' },
        { label: 'POWER', value: '~8kW' },
        { label: 'STATUS', value: 'Confirmed', status: 'cyan' as const },
      ]}
    />
  );
}
