'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useTheme } from '@/components/ThemeProvider';
import PasswordGate from '@/components/PasswordGate/PasswordGate';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import SyncBanner from '@/components/SyncBanner/SyncBanner';
import HudBackground, { DEFAULT_PARAMS } from '@/components/HudBackground/HudBackground';
import type { HudParams } from '@/components/HudBackground/types';
import ScrollToTop from '@/components/ScrollToTop';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { isDarkMode } = useTheme();
  const [showSyncBanner, setShowSyncBanner] = useState(false);
  const [hudParams] = useState<HudParams>(DEFAULT_PARAMS);

  useEffect(() => {
    if (isAuthenticated && !sessionStorage.getItem('lightheart_sync_shown')) {
      setShowSyncBanner(true);
      sessionStorage.setItem('lightheart_sync_shown', 'true');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <PasswordGate />;
  }

  return (
    <>
      <ScrollToTop />
      <HudBackground params={hudParams} />
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          transition: 'background-color 0.3s ease, color 0.3s ease',
          backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f0',
          color: isDarkMode ? '#e0e0e0' : '#1a1a1a',
        }}
      >
        <Header />
        {showSyncBanner && <SyncBanner />}
        <main style={{ paddingTop: '5rem', flex: 1, position: 'relative', zIndex: 1 }}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
