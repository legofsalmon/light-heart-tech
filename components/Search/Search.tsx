'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react';
import { useLiveDoc } from '@/data/LiveDocProvider';
import { NAV_ITEMS } from '@/data/sectionMap';
import { getSectionRange } from '@/data/sectionMap';
import { useTheme } from '@/components/ThemeProvider';
import styles from './Search.module.scss';

interface SearchResult {
  title: string;
  slug: string;
  snippet: string;
  sectionNumber: string;
}

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data } = useLiveDoc();
  const { isDarkMode } = useTheme();
  const router = useRouter();

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  const search = useCallback((q: string) => {
    setQuery(q);
    if (!q.trim() || q.length < 2) {
      setResults([]);
      return;
    }

    const lower = q.toLowerCase();
    const found: SearchResult[] = [];

    // Search through nav items / section ranges
    for (const nav of NAV_ITEMS) {
      const range = getSectionRange(nav.slug, data.sections);
      if (!range) continue;

      const sections = data.sections.slice(range.startIndex, range.endIndex + 1);
      const allText = sections.map(s => {
        let t = (s.title || '') + ' ' + (s.fullText || '');
        if (s.listItems) t += ' ' + s.listItems.join(' ');
        if (s.subsections) t += ' ' + s.subsections.map(sub => (sub.title || '') + ' ' + (sub.text || '')).join(' ');
        if (s.tables) t += ' ' + s.tables.flat(2).join(' ');
        return t;
      }).join(' ');

      if (allText.toLowerCase().includes(lower) || nav.navLabel.toLowerCase().includes(lower)) {
        // Extract snippet around the match
        const idx = allText.toLowerCase().indexOf(lower);
        let snippet = '';
        if (idx >= 0) {
          const start = Math.max(0, idx - 40);
          const end = Math.min(allText.length, idx + q.length + 60);
          snippet = (start > 0 ? '...' : '') + allText.slice(start, end).trim() + (end < allText.length ? '...' : '');
        }

        found.push({
          title: range.title,
          slug: nav.slug,
          snippet,
          sectionNumber: range.sectionNumber,
        });
      }
    }

    setResults(found);
  }, [data]);

  const navigate = useCallback((slug: string) => {
    setIsOpen(false);
    router.push(`/${slug}`);
  }, [router]);

  const accent = isDarkMode ? '#00F0FF' : '#005580';
  const bg = isDarkMode ? 'rgba(10, 10, 10, 0.98)' : 'rgba(245, 245, 240, 0.98)';
  const cardBg = isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
  const borderColor = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const textColor = isDarkMode ? '#e0e0e0' : '#1a1a1a';
  const mutedColor = isDarkMode ? '#777' : '#555';

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className={styles.trigger}
        style={{ borderColor, color: mutedColor }}
        aria-label="Search specification"
      >
        <SearchIcon size={14} />
        <span className={styles.triggerLabel}>Search</span>
        <kbd className={styles.kbd} style={{ borderColor, color: mutedColor }}>⌘K</kbd>
      </button>

      {/* Search overlay */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div
            className={styles.modal}
            style={{ background: bg, borderColor }}
            onClick={e => e.stopPropagation()}
          >
            {/* Search input */}
            <div className={styles.inputRow} style={{ borderBottomColor: borderColor }}>
              <SearchIcon size={18} style={{ color: accent, flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => search(e.target.value)}
                placeholder="Search sections, equipment, specs..."
                className={styles.input}
                style={{ color: textColor }}
              />
              <button onClick={() => setIsOpen(false)} className={styles.closeBtn} style={{ color: mutedColor }}>
                <X size={16} />
              </button>
            </div>

            {/* Results */}
            <div className={styles.results}>
              {query.length >= 2 && results.length === 0 && (
                <div className={styles.empty} style={{ color: mutedColor }}>
                  No matching sections found for &ldquo;{query}&rdquo;
                </div>
              )}

              {results.map((r, i) => (
                <button
                  key={i}
                  className={styles.result}
                  style={{ borderBottomColor: borderColor }}
                  onClick={() => navigate(r.slug)}
                >
                  <div className={styles.resultHeader}>
                    <span className={styles.resultSection} style={{ color: accent }}>
                      SECTION {r.sectionNumber}
                    </span>
                    <span className={styles.resultTitle} style={{ color: textColor }}>
                      {r.title}
                    </span>
                  </div>
                  {r.snippet && (
                    <p className={styles.resultSnippet} style={{ color: mutedColor }}>
                      {r.snippet}
                    </p>
                  )}
                  <span className={styles.resultArrow} style={{ color: accent }}>
                    <ArrowRight size={14} />
                  </span>
                </button>
              ))}

              {!query && (
                <div className={styles.hints} style={{ color: mutedColor }}>
                  <p>Try searching for: <strong style={{ color: textColor }}>projector</strong>, <strong style={{ color: textColor }}>network</strong>, <strong style={{ color: textColor }}>Barco</strong>, <strong style={{ color: textColor }}>L-ISA</strong></p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
