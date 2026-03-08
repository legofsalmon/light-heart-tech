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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? 'rgba(5, 5, 5, 0.95)' : 'rgba(5, 5, 5, 0.7)',
        backdropFilter: `blur(${isScrolled ? 16 : 8}px)`,
        WebkitBackdropFilter: `blur(${isScrolled ? 16 : 8}px)`,
        borderBottom: isScrolled
          ? '1px solid rgba(0, 240, 255, 0.08)'
          : '1px solid rgba(255, 255, 255, 0.04)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 shrink-0">
            <span className="text-base md:text-lg font-bold tracking-tight text-white">
              LIGHTHEART
            </span>
            <span className="hidden sm:inline text-[10px] text-[#333]">|</span>
            <span className="hidden sm:inline text-[10px] tracking-[0.15em] text-[#555] font-mono uppercase">
              Tech Docs v1.0
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="relative px-2.5 py-1.5 text-[10px] uppercase tracking-wider transition-all duration-200 font-mono"
                  style={{
                    color: isActive ? '#00F0FF' : '#555',
                    backgroundColor: isActive ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
                    borderRadius: '4px',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#ccc';
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#555';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-0.5 left-2 right-2 h-[2px] rounded-full"
                      style={{
                        backgroundColor: '#00F0FF',
                        boxShadow: '0 0 6px rgba(0, 240, 255, 0.4)',
                      }}
                    />
                  )}
                </Link>
              );
            })}

            {/* LIVE indicator */}
            <div className="ml-3 flex items-center gap-1.5 px-2">
              <span className="status-dot" style={{ width: 5, height: 5 }} />
              <span className="text-[10px] font-mono tracking-wider text-[#555]">LIVE</span>
            </div>
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-md transition-all duration-200"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#555',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                e.currentTarget.style.color = '#00F0FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = '#555';
              }}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden p-2 rounded-md transition-all duration-200"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#555',
              }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          className="xl:hidden"
          style={{
            backgroundColor: 'rgba(5, 5, 5, 0.98)',
            borderTop: '1px solid rgba(0, 240, 255, 0.08)',
          }}
        >
          <nav className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="px-3 py-2.5 text-[11px] uppercase tracking-wider font-mono transition-colors duration-200 rounded"
                  style={{
                    color: isActive ? '#00F0FF' : '#555',
                    backgroundColor: isActive ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
                  }}
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
