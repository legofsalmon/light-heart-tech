'use client';
import SpecPage from '@/components/ui/SpecPage';

export default function AudioPage() {
  return (
    <SpecPage
      sectionNumber="08"
      title="AUDIO SYSTEM / L-ISA"
      description="L-Acoustics L-ISA spatial audio system. 71 speakers across two rooms for fully immersive 3D soundscapes."
      startIndex={66}
      endIndex={79}
      stats={[
        { label: 'TOTAL SPEAKERS', value: '71' },
        { label: 'SYSTEM', value: 'L-ISA' },
        { label: 'BUDGET', value: '€401,586' },
        { label: 'STATUS', value: 'Quoted', status: 'orange' as const },
      ]}
    />
  );
}
