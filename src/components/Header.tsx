import { useState, useEffect, useRef } from 'react';
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
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const borderColor = isDarkMode ? 'border-[#1a1a22]' : 'border-[#e0e0e0]';

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${borderColor}`}
      style={{
        backgroundColor: isDarkMode
          ? isScrolled ? 'rgba(6, 6, 8, 0.95)' : 'rgba(6, 6, 8, 0.8)'
          : isScrolled ? 'rgba(245, 245, 240, 0.95)' : 'rgba(245, 245, 240, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 shrink-0">
            <span className={`font-display text-base md:text-lg font-bold tracking-tight ${isDarkMode ? 'text-[#e0e0e0]' : 'text-[#1a1a1a]'}`}>
              LIGHTHEART
            </span>
            <span className={`hidden sm:inline text-[10px] ${isDarkMode ? 'text-[#333]' : 'text-[#ccc]'}`}>|</span>
            <span className={`hidden sm:inline text-[10px] uppercase tracking-[0.15em] ${isDarkMode ? 'text-[#444]' : 'text-[#999]'}`}>
              Tech Spec
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-0.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="relative px-2 py-1.5 text-[10px] uppercase tracking-wider transition-colors duration-200"
                  style={{
                    color: isActive
                      ? (isDarkMode ? '#00d4ff' : '#0066cc')
                      : (isDarkMode ? '#555' : '#999'),
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = isDarkMode ? '#aaa' : '#444';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = isDarkMode ? '#555' : '#999';
                    }
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-2 right-2 h-px"
                      style={{ backgroundColor: isDarkMode ? '#00d4ff' : '#0066cc' }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onThemeToggle}
              className={`p-2 border ${borderColor} transition-all duration-200 hover:border-[${isDarkMode ? '#333' : '#bbb'}]`}
              style={{ color: isDarkMode ? '#555' : '#999' }}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`xl:hidden p-2 border ${borderColor} transition-all duration-200`}
              style={{ color: isDarkMode ? '#555' : '#999' }}
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
          className={`xl:hidden border-t ${borderColor}`}
          style={{
            backgroundColor: isDarkMode ? 'rgba(6, 6, 8, 0.98)' : 'rgba(245, 245, 240, 0.98)',
          }}
        >
          <nav className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-3 py-2.5 text-[11px] uppercase tracking-wider transition-colors duration-200 ${
                    isActive
                      ? (isDarkMode ? 'text-[#00d4ff] bg-[#00d4ff]/5' : 'text-[#0066cc] bg-[#0066cc]/5')
                      : (isDarkMode ? 'text-[#555] hover:text-[#aaa]' : 'text-[#999] hover:text-[#444]')
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
