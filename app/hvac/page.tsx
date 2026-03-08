'use client';
import SpecPage from '@/components/ui/SpecPage';

export default function HVACPage() {
  return (
    <SpecPage
      sectionNumber="12"
      title="SERVER ROOM & GENERAL HVAC"
      description="Heat load analysis and HVAC sizing for all equipment across both rooms and server infrastructure."
      startIndex={118}
      endIndex={123}
      stats={[
        { label: 'TOTAL HEAT', value: '118,491 BTU/h' },
        { label: 'SERVER ROOM', value: '35,611 BTU/h' },
        { label: 'ROOM 1', value: '57,320 BTU/h' },
        { label: 'ROOM 2', value: '25,560 BTU/h' },
      ]}
    />
  );
}
