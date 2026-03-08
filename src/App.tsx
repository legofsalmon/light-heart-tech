import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SyncBanner from './components/SyncBanner';
import HudBackground from './components/HudBackground';
import HudSettings, { DEFAULT_PARAMS } from './components/HudSettings';
import type { HudParams } from './components/HudSettings';
import { SoundProvider } from './components/SoundEngine';
import { useGlobalSoundEffects } from './hooks/useSoundEffects';
import PasswordGate from './components/PasswordGate';
import OriginalBriefPage from './pages/OriginalBriefPage';
import AudioBridgingPage from './pages/AudioBridgingPage';
import HomePage from './pages/HomePage';
import TechnicalDirectionPage from './pages/TechnicalDirectionPage';
import ProjectionPage from './pages/ProjectionPage';
import SignalPage from './pages/SignalPage';
import SurfacePage from './pages/SurfacePage';
import SensorsPage from './pages/SensorsPage';
import NetworkPage from './pages/NetworkPage';
import AudioPage from './pages/AudioPage';
import LatencyPage from './pages/LatencyPage';
import ServerPage from './pages/ServerPage';
import HVACPage from './pages/HVACPage';
import VendorPage from './pages/VendorPage';
import VisualizationPage from './pages/VisualizationPage';
import DisclaimerPage from './pages/DisclaimerPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function SoundEffectsAttacher() {
  useGlobalSoundEffects();
  return null;
}

function AppContent({ isDarkMode, hudParams, showSyncBanner, toggleTheme }: {
  isDarkMode: boolean;
  hudParams: HudParams;
  showSyncBanner: boolean;
  toggleTheme: () => void;
}) {
  return (
    <>
      <ScrollToTop />
      <SoundEffectsAttacher />
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0a] text-[#e0e0e0]' : 'bg-[#f5f5f0] text-[#1a1a1a]'}`}>
        <HudBackground isDarkMode={isDarkMode} params={hudParams} />
        <Header isDarkMode={isDarkMode} onThemeToggle={toggleTheme} />
        {showSyncBanner && <SyncBanner isDarkMode={isDarkMode} />}
        <main className="pt-20 flex-1 relative z-[1]">
          <Routes>
            <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
            <Route path="/brief" element={<OriginalBriefPage isDarkMode={isDarkMode} />} />
            <Route path="/technical-direction" element={<TechnicalDirectionPage isDarkMode={isDarkMode} />} />
            <Route path="/projection" element={<ProjectionPage isDarkMode={isDarkMode} />} />
            <Route path="/signal" element={<SignalPage isDarkMode={isDarkMode} />} />
            <Route path="/surface" element={<SurfacePage isDarkMode={isDarkMode} />} />
            <Route path="/sensors" element={<SensorsPage isDarkMode={isDarkMode} />} />
            <Route path="/network" element={<NetworkPage isDarkMode={isDarkMode} />} />
            <Route path="/audio" element={<AudioPage isDarkMode={isDarkMode} />} />
            <Route path="/audio-bridging" element={<AudioBridgingPage isDarkMode={isDarkMode} />} />
            <Route path="/latency" element={<LatencyPage isDarkMode={isDarkMode} />} />
            <Route path="/server" element={<ServerPage isDarkMode={isDarkMode} />} />
            <Route path="/hvac" element={<HVACPage isDarkMode={isDarkMode} />} />
            <Route path="/vendors" element={<VendorPage isDarkMode={isDarkMode} />} />
            <Route path="/visualization" element={<VisualizationPage isDarkMode={isDarkMode} />} />
            <Route path="/disclaimer" element={<DisclaimerPage isDarkMode={isDarkMode} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSyncBanner, setShowSyncBanner] = useState(false);
  const [hudParams, setHudParams] = useState<HudParams>(DEFAULT_PARAMS);

  useEffect(() => {
    const auth = sessionStorage.getItem('lightheart_auth');
    if (auth === 'pharmakon') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const shown = sessionStorage.getItem('lightheart_sync_shown');
      if (!shown) {
        setShowSyncBanner(true);
        sessionStorage.setItem('lightheart_sync_shown', 'true');
      }
    }
  }, [isAuthenticated]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const handleAuth = (password: string) => {
    if (password === 'pharmakon') {
      sessionStorage.setItem('lightheart_auth', 'pharmakon');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  if (!isAuthenticated) {
    return (
      <SoundProvider>
        <PasswordGate onAuth={handleAuth} isDarkMode={isDarkMode} />
      </SoundProvider>
    );
  }

  return (
    <SoundProvider>
      <HashRouter>
        <AppContent
          isDarkMode={isDarkMode}
          hudParams={hudParams}
          showSyncBanner={showSyncBanner}
          toggleTheme={toggleTheme}
        />
        <HudSettings params={hudParams} onChange={setHudParams} isDarkMode={isDarkMode} />
      </HashRouter>
    </SoundProvider>
  );
}

export default App;
