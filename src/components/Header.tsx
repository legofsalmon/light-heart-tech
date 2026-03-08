import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const navItems = [
  { label: 'TECHNICAL DIRECTION', href: '/technical-direction' },
  { label: 'PROJECTION', href: '/projection' },
  { label: 'SIGNAL', href: '/signal' },
  { label: 'SURFACE', href: '/surface' },
  { label: 'SENSORS', href: '/sensors' },
  { label: 'NETWORK', href: '/network' },
  { label: 'AUDIO', href: '/audio' },
  { label: 'LATENCY', href: '/latency' },
  { label: 'SERVER', href: '/server' },
  { label: 'HVAC', href: '/hvac' },
  { label: 'VENDORS', href: '/vendors' },
  { label: '3D VIZ', href: '/visualization' },
  { label: 'DISCLAIMER', href: '/disclaimer' },
];

export default function Header({ isDarkMode, onThemeToggle }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);


  const borderColor = isDarkMode ? 'border-[#333]' : 'border-[#ddd]';
  const textColor = isDarkMode ? 'text-[#e0e0e0]' : 'text-[#1a1a1a]';
  const accentHex = isDarkMode ? '#00d4ff' : '#0066cc';
  const mutedColor = isDarkMode ? 'text-[#666]' : 'text-[#999]';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b ${borderColor} transition-all duration-300`}
      style={{
        backgroundColor: isDarkMode
          ? (isScrolled ? 'rgba(10, 10, 10, 0.97)' : 'rgba(10, 10, 10, 0.85)')
          : (isScrolled ? 'rgba(245, 245, 240, 0.97)' : 'rgba(245, 245, 240, 0.85)'),
        borderBottomColor: isDarkMode && isScrolled ? 'rgba(0, 212, 255, 0.08)' : undefined,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <span className={`font-display text-lg md:text-xl font-bold tracking-tight ${textColor}`}>
              LIGHTHEART
            </span>
            <span className={`hidden sm:inline text-xs ${mutedColor}`}>|</span>
            <span className={`hidden sm:inline text-xs uppercase tracking-wider ${mutedColor}`}>Tech Spec</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative px-2 py-1 text-[10px] uppercase tracking-wider transition-colors ${
                    isActive
                      ? (isDarkMode ? 'text-[#00d4ff]' : 'text-[#0066cc]')
                      : mutedColor + ' hover:' + textColor
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                      style={{
                        backgroundColor: accentHex,
                        boxShadow: isDarkMode ? `0 0 6px ${accentHex}60` : 'none',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={onThemeToggle}
              className={`p-2 border ${borderColor} ${mutedColor} hover:${textColor} transition-colors`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 border ${borderColor} ${mutedColor} hover:${textColor} transition-colors`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className={`lg:hidden border-t ${borderColor} ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f0]'}`}>
          <nav className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 text-xs uppercase tracking-wider transition-colors ${
                    isActive
                      ? (isDarkMode ? 'bg-[#00d4ff]/20 text-[#00d4ff]' : 'bg-[#0066cc]/20 text-[#0066cc]')
                      : mutedColor + ' hover:' + textColor
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
