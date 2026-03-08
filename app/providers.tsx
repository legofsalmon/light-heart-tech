'use client';

import { LiveDocProvider } from '@/data/LiveDocProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/components/AuthProvider';
import AppShell from './AppShell';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LiveDocProvider>
          <AppShell>{children}</AppShell>
        </LiveDocProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
