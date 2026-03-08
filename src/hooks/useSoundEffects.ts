import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSounds } from '../components/SoundEngine';

/**
 * Attaches global sound effects to DOM events.
 * Call once at the app level.
 */
export function useGlobalSoundEffects() {
  const { play, muted } = useSounds();
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  // Navigation sound
  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      play('navigate');
      prevPath.current = location.pathname;
    }
  }, [location.pathname, play]);

  // Global click and hover delegation
  useEffect(() => {
    if (muted) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Accordion triggers
      if (target.closest('button[data-state]') || target.closest('[class*="accordion"]')) {
        const btn = target.closest('button[data-state]');
        if (btn) {
          const state = btn.getAttribute('data-state');
          play(state === 'open' ? 'collapse' : 'expand');
          return;
        }
      }

      // Tab buttons
      if (target.closest('button[class*="uppercase"]')) {
        play('click');
        return;
      }

      // Download buttons
      if (target.closest('button[class*="border"]') && target.closest('button')?.textContent?.includes('CSV')) {
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
    };

    const throttle = { last: 0 };
    const handleHover = (e: MouseEvent) => {
      const now = Date.now();
      if (now - throttle.last < 120) return;

      const target = e.target as HTMLElement;

      // Nav items
      if (target.closest('nav a') || target.closest('button[class*="border"]')) {
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
