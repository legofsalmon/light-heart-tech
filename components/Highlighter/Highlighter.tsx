'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Highlighter as HighlighterIcon, X } from 'lucide-react';
import styles from './Highlighter.module.scss';

const STORAGE_KEY = 'lightheart_highlights';

/* Highlightable element selectors (works with CSS-module-mangled names) */
const TARGETS = [
  'td',
  '[class*="kvCard"]',
  '[class*="statCard"]',
  '[class*="list"] li',
  '[class*="callout"]',
].join(', ');

/** Simple hash of text content for stable identification */
function textHash(s: string): string {
  let h = 0;
  const str = s.trim().substring(0, 120);
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return 'h' + Math.abs(h).toString(36);
}

export default function HighlighterTool() {
  const [active, setActive] = useState(false);
  const [hlSet, setHlSet] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      return s ? new Set(JSON.parse(s)) : new Set();
    } catch {
      return new Set();
    }
  });
  const pathname = usePathname();

  /* Persist to localStorage */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...hlSet]));
    } catch { /* quota exceeded — ignore */ }
  }, [hlSet]);

  /* Apply highlights to current page elements */
  const applyHighlights = useCallback(() => {
    document.querySelectorAll(TARGETS).forEach(el => {
      const text = el.textContent || '';
      const id = textHash(text);
      if (hlSet.has(id)) {
        (el as HTMLElement).dataset.highlighted = 'true';
      } else {
        delete (el as HTMLElement).dataset.highlighted;
      }
    });
  }, [hlSet]);

  /* Re-apply on navigation or highlight changes */
  useEffect(() => {
    const timer = setTimeout(applyHighlights, 250);
    return () => clearTimeout(timer);
  }, [pathname, applyHighlights]);

  /* Toggle body class for cursor change */
  useEffect(() => {
    document.body.classList.toggle('highlight-mode', active);
    return () => { document.body.classList.remove('highlight-mode'); };
  }, [active]);

  /* Click handler when highlight mode is active */
  useEffect(() => {
    if (!active) return;

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(TARGETS) as HTMLElement | null;
      if (!el) return;

      e.preventDefault();
      e.stopPropagation();

      const text = el.textContent || '';
      const id = textHash(text);

      setHlSet(prev => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
          delete el.dataset.highlighted;
        } else {
          next.add(id);
          el.dataset.highlighted = 'true';
        }
        return next;
      });
    };

    const main = document.querySelector('main');
    main?.addEventListener('click', onClick, true);
    return () => { main?.removeEventListener('click', onClick, true); };
  }, [active]);

  const count = hlSet.size;

  return (
    <div className={styles.wrap}>
      {active && count > 0 && (
        <button
          className={styles.clearBtn}
          onClick={() => {
            setHlSet(new Set());
            document.querySelectorAll('[data-highlighted]').forEach(el => {
              delete (el as HTMLElement).dataset.highlighted;
            });
          }}
          aria-label={`Clear ${count} highlight${count !== 1 ? 's' : ''}`}
        >
          <X size={14} />
          <span className={styles.count}>{count}</span>
        </button>
      )}
      <button
        className={`${styles.fab} ${active ? styles.fabActive : ''}`}
        onClick={() => setActive(p => !p)}
        aria-label={active ? 'Exit highlight mode' : 'Enter highlight mode'}
        title={active ? 'Exit highlight mode' : 'Highlight mode'}
      >
        <HighlighterIcon size={18} />
      </button>
    </div>
  );
}
