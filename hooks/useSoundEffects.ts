'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useSounds } from '@/components/SoundEngine/SoundEngine';

/**
 * Attaches global sound effects to DOM events.
 * Call once at the app level.
 */
export function useGlobalSoundEffects() {
  const { play, muted } = useSounds();
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  // Navigation sound
  useEffect(() => {
    if (pathname !== prevPath.current) {
      play('navigate');
      prevPath.current = pathname;
    }
  }, [pathname, play]);

  // Global click and hover delegation
  useEffect(() => {
    if (muted) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Accordion triggers
      if (target.closest('button[data-state]') || target.closest('[class*="accordion"]') || target.closest('[class*="Accordion"]')) {
        const btn = target.closest('button[data-state]');
        if (btn) {
          const state = btn.getAttribute('data-state');
          play(state === 'open' ? 'collapse' : 'expand');
          return;
        }
      }

      // Download buttons
      if (target.closest('button')?.textContent?.includes('CSV')) {
        play('scan');
        return;
      }

      // Copy actions
      if (target.closest('[title*="copy"]') || target.closest('[title*="Copy"]')) {
        play('copy');
        return;
      }

      // Nav links
      if (target.closest('nav a')) {
        play('click');
        return;
      }

      // Any button
      if (target.closest('button')) {
        play('click');
        return;
      }
    };

    const throttle = { last: 0 };
    const handleHover = (e: MouseEvent) => {
      const now = Date.now();
      if (now - throttle.last < 120) return;
      const target = e.target as HTMLElement;
      if (target.closest('nav a') || target.closest('button')) {
        throttle.last = now;
        play('hover');
      }
    };

    document.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('mouseenter', handleHover, { passive: true, capture: true });
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseenter', handleHover, { capture: true });
    };
  }, [play, muted]);
}
