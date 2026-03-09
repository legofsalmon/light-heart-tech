'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useTheme } from '@/components/ThemeProvider';
import { useHighlights } from '@/components/ControlPanel/HighlightContext';
import PasswordGate from '@/components/PasswordGate/PasswordGate';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import SyncBanner from '@/components/SyncBanner/SyncBanner';
import HudBackground, { DEFAULT_PARAMS } from '@/components/HudBackground/HudBackground';
import ControlPanel from '@/components/ControlPanel/ControlPanel';
import type { HudParams } from '@/components/HudBackground/types';
import ScrollToTop from '@/components/ScrollToTop';
import { useGlobalSoundEffects } from '@/hooks/useSoundEffects';

function SoundEffectsAttacher() {
  useGlobalSoundEffects();
  return null;
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { isDarkMode } = useTheme();
  const { showResearchFlags } = useHighlights();
  const [showSyncBanner, setShowSyncBanner] = useState(false);
  const [hudParams, setHudParams] = useState<HudParams>(DEFAULT_PARAMS);

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
      <SoundEffectsAttacher />
      <HudBackground params={hudParams} />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div
        className={showResearchFlags ? '' : 'hide-research-flags'}
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
        <main id="main-content" role="main" style={{ paddingTop: '5rem', flex: 1, position: 'relative', zIndex: 1 }}>
          {children}
        </main>
        <Footer />
      </div>
      <ControlPanel hudParams={hudParams} onHudChange={setHudParams} />
    </>
  );
}
