'use client';

import { LiveDocProvider } from '@/data/LiveDocProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { SoundProvider } from '@/components/SoundEngine/SoundEngine';
import AppShell from './AppShell';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SoundProvider>
      <ThemeProvider>
        <AuthProvider>
          <LiveDocProvider>
            <AppShell>{children}</AppShell>
          </LiveDocProvider>
        </AuthProvider>
      </ThemeProvider>
    </SoundProvider>
  );
}
