'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { NAV_ITEMS } from '@/data/sectionMap';
import SearchButton from '@/components/Search/Search';
import styles from './Header.module.scss';

const navItems = NAV_ITEMS.map(item => ({
  label: item.navLabel,
  href: `/${item.slug}`,
}));

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const accent = isDarkMode ? '#00d4ff' : '#004d80';
  const muted = isDarkMode ? '#777' : '#555';
  const text = isDarkMode ? '#e0e0e0' : '#1a1a1a';
  const border = isDarkMode ? '#333' : '#ccc';

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
            <SearchButton />
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
