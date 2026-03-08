import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PasswordGate from './components/PasswordGate';
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

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem('lightheart_auth');
    if (auth === 'pharmakon') {
      setIsAuthenticated(true);
    }
  }, []);

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
    return <PasswordGate onAuth={handleAuth} isDarkMode={isDarkMode} />;
  }

  return (
    <HashRouter>
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0a] text-[#e0e0e0]' : 'bg-[#f5f5f0] text-[#1a1a1a]'}`}>
        <Header isDarkMode={isDarkMode} onThemeToggle={toggleTheme} />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
            <Route path="/technical-direction" element={<TechnicalDirectionPage isDarkMode={isDarkMode} />} />
            <Route path="/projection" element={<ProjectionPage isDarkMode={isDarkMode} />} />
            <Route path="/signal" element={<SignalPage isDarkMode={isDarkMode} />} />
            <Route path="/surface" element={<SurfacePage isDarkMode={isDarkMode} />} />
            <Route path="/sensors" element={<SensorsPage isDarkMode={isDarkMode} />} />
            <Route path="/network" element={<NetworkPage isDarkMode={isDarkMode} />} />
            <Route path="/audio" element={<AudioPage isDarkMode={isDarkMode} />} />
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
    </HashRouter>
  );
}

export default App;
