'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useAuth } from '@/components/AuthProvider';
import { NAV_ITEMS } from '@/data/sectionMap';
import type { Zone } from '@/data/accessConfig';
import SearchButton from '@/components/Search/Search';
import styles from './Header.module.scss';

/** Zone display order and labels for the nav */
const ZONE_ORDER: { zone: Zone; label: string; homeSlug: string }[] = [
  { zone: 'techspec', label: 'TECH SPEC', homeSlug: '/' },
  { zone: 'ops', label: 'OPS HUB', homeSlug: '/ops' },
  { zone: 'executive', label: 'EXECUTIVE', homeSlug: '/executive' },
  { zone: 'marketing', label: 'MARKETING', homeSlug: '/marketing' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isDarkMode } = useTheme();
  const { role, canAccessZone, roleLabel, userName, logout } = useAuth();

  const isAdmin = role === 'admin';

  // Filter nav items to only those the user can access
  const visibleNavItems = useMemo(() => {
    return NAV_ITEMS
      .filter((item) => canAccessZone(item.zone))
      .map((item) => ({
        label: item.navLabel,
        href: `/${item.slug}`,
        zone: item.zone,
      }));
  }, [canAccessZone]);

  // For admin, show zone tabs. For others, show their section links directly.
  const accessibleZones = useMemo(() => {
    return ZONE_ORDER.filter((z) => canAccessZone(z.zone));
  }, [canAccessZone]);

  // Determine current zone from pathname
  const currentZone = useMemo(() => {
    if (pathname.startsWith('/ops')) return 'ops';
    if (pathname.startsWith('/technology')) return 'ops';
    if (pathname.startsWith('/executive')) return 'executive';
    if (pathname.startsWith('/marketing')) return 'marketing';
    if (pathname.startsWith('/brand')) return 'brand';
    return 'techspec';
  }, [pathname]);

  // Get section nav items for current zone
  const sectionNavItems = useMemo(() => {
    return visibleNavItems.filter((item) => item.zone === currentZone);
  }, [visibleNavItems, currentZone]);

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

  const showZoneTabs = isAdmin || accessibleZones.length > 1;

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
        {/* Top row: Logo + zone tabs + actions */}
        <div className={styles.row}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText} style={{ color: text }}>
              LIGHTHEART
            </span>
            {showZoneTabs ? (
              <>
                <span className={styles.logoDivider} style={{ color: muted }}>|</span>
                <div className={styles.zoneTabs}>
                  {accessibleZones.map((z) => {
                    const isActive = currentZone === z.zone;
                    return (
                      <Link
                        key={z.zone}
                        href={z.homeSlug}
                        className={styles.zoneTab}
                        style={{
                          color: isActive ? accent : muted,
                          borderBottomColor: isActive ? accent : 'transparent',
                        }}
                      >
                        {z.label}
                      </Link>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <span className={styles.logoDivider} style={{ color: muted }}>|</span>
                <span className={styles.logoSub} style={{ color: muted }}>
                  {accessibleZones[0]?.label || 'Portal'}
                </span>
              </>
            )}
          </Link>

          <div className={styles.actions}>
            <SearchButton />
            {role && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {userName && (
                  <span style={{
                    fontSize: '0.7rem',
                    color: muted,
                    letterSpacing: '0.03em',
                    display: 'none',
                  }} className={styles.userName}>
                    {userName}
                  </span>
                )}
                <button
                  onClick={logout}
                  className={styles.logoutBtn}
                  style={{ color: muted, borderColor: border }}
                  aria-label="Logout"
                  title={`Signed in as ${userName || roleLabel}`}
                >
                  <LogOut size={14} />
                </button>
              </div>
            )}
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

        {/* Section nav row — shows section links for the current zone */}
        {sectionNavItems.length > 1 && (
          <nav className={styles.desktopNav}>
            {sectionNavItems.map((item) => {
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
        )}
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
            {showZoneTabs && accessibleZones.length > 1 && (
              <div className={styles.mobileZoneGroup}>
                {accessibleZones.map((z) => (
                  <Link
                    key={z.zone}
                    href={z.homeSlug}
                    onClick={() => setIsMenuOpen(false)}
                    className={styles.mobileZoneLink}
                    style={{
                      color: currentZone === z.zone ? accent : text,
                      backgroundColor: currentZone === z.zone ? `${accent}15` : 'transparent',
                      borderColor: currentZone === z.zone ? `${accent}30` : border,
                    }}
                  >
                    {z.label}
                  </Link>
                ))}
              </div>
            )}
            {sectionNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={styles.mobileLink}
                  style={{
                    color: isActive ? accent : muted,
                    backgroundColor: isActive ? `${accent}20` : 'transparent',
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
