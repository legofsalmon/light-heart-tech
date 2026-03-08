'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import styles from './Header.module.scss';

const navItems = [
  { label: 'BRIEF', href: '/brief' },
  { label: 'TECHNICAL DIRECTION', href: '/technical-direction' },
  { label: 'PROJECTION', href: '/projection' },
  { label: 'SIGNAL', href: '/signal' },
  { label: 'SURFACE', href: '/surface' },
  { label: 'SENSORS', href: '/sensors' },
  { label: 'NETWORK', href: '/network' },
  { label: 'AUDIO', href: '/audio' },
  { label: 'AUDIO BRIDGE', href: '/audio-bridging' },
  { label: 'LATENCY', href: '/latency' },
  { label: 'SERVER', href: '/server' },
  { label: 'HVAC', href: '/hvac' },
  { label: 'VENDORS', href: '/vendors' },
  { label: '3D VIZ', href: '/visualization' },
  { label: 'DISCLAIMER', href: '/disclaimer' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const accent = isDarkMode ? '#00d4ff' : '#0066cc';
  const muted = isDarkMode ? '#666' : '#999';
  const text = isDarkMode ? '#e0e0e0' : '#1a1a1a';
  const border = isDarkMode ? '#333' : '#ddd';

  return (
    <header
      className={styles.header}
      style={{
        backgroundColor: isDarkMode
          ? isScrolled ? 'rgba(10, 10, 10, 0.97)' : 'rgba(10, 10, 10, 0.85)'
          : isScrolled ? 'rgba(245, 245, 240, 0.97)' : 'rgba(245, 245, 240, 0.85)',
        borderBottomColor: isDarkMode && isScrolled ? 'rgba(0, 212, 255, 0.08)' : border,
      }}
    >
      <div className={styles.inner}>
        <div className={styles.row}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText} style={{ color: text }}>
              LIGHTHEART
            </span>
            <span className={styles.logoDivider} style={{ color: muted }}>|</span>
            <span className={styles.logoSub} style={{ color: muted }}>Tech Spec</span>
          </Link>

          {/* Desktop nav */}
          <nav className={styles.desktopNav}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.navLink}
                  style={{ color: isActive ? accent : muted }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className={styles.navIndicator}
                      style={{
                        backgroundColor: accent,
                        boxShadow: isDarkMode ? `0 0 6px ${accent}60` : 'none',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className={styles.actions}>
            <button
              onClick={toggleTheme}
              className={styles.iconBtn}
              style={{ borderColor: border, color: muted }}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={styles.menuBtn}
              style={{ borderColor: border, color: muted }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className={styles.mobileMenu}
          style={{
            borderTopColor: border,
            backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f0',
          }}
        >
          <nav className={styles.mobileNav}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={styles.mobileLink}
                  style={{
                    color: isActive ? accent : muted,
                    backgroundColor: isActive
                      ? `${accent}20`
                      : 'transparent',
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
