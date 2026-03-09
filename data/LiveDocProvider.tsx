'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import type { SpecData, DocSection } from './types';
import fallbackData from './specData.json';

const WORKER_URL =
  'https://lightheart-doc-sync.idirnet-lightheart.workers.dev';

/* ── Client-side sanitizer ──────────────────────────
   Strip lines that look like injected JavaScript
   (e.g. Google Docs injects <script> content that
   parseDoc may capture as text in the last section). */
const JS_LINE_RE =
  /^(var |let |const |function |if\s*\(|for\s*\(|\}\s*$|\{$|try\s*\{|catch\s*\(|window\.|document\.|google\.|new google\.|\.prototype\.|module\.exports|export |import |\/\/\s*@|goog\.|this\._|_initializeModules|_DumpException|iml\(|je_|jspb\.|_callbacks_|\.push\(function|\.setAttribute|\.getElementById|chrome\.)|^\s*[\]}),;]+\s*$/;

function sanitizeSection(section: DocSection): DocSection {
  if (!section.fullText) return section;
  const lines = section.fullText.split('\n');
  const jsLineCount = lines.filter(l => JS_LINE_RE.test(l.trim())).length;
  // Only sanitize if >30% of lines look like JS (avoids false positives)
  if (jsLineCount < lines.length * 0.3) return section;
  const cleanLines = lines.filter(l => !JS_LINE_RE.test(l.trim()));
  return { ...section, fullText: cleanLines.join('\n') };
}

function sanitizeSections(data: SpecData): SpecData {
  if (!data.sections) return data;
  return {
    ...data,
    sections: data.sections.map(sanitizeSection),
  };
}

/* ── Context shape ──────────────────────────────── */

interface LiveDocState {
  data: SpecData;
  isLive: boolean;
  loading: boolean;
  error: string | null;
  lastFetched: string | null;
  fetchedAt: Date | null;
  sectionCount: number;
  refetch: () => void;
}

const LiveDocContext = createContext<LiveDocState>({
  data: fallbackData as unknown as SpecData,
  isLive: false,
  loading: false,
  error: null,
  lastFetched: null,
  fetchedAt: null,
  sectionCount: 0,
  refetch: () => {},
});

/* ── Hook: access the live doc context ──────────── */

export function useLiveDoc() {
  return useContext(LiveDocContext);
}

/* ── Provider ───────────────────────────────────── */

interface LiveDocProviderProps {
  children: React.ReactNode;
}

export function LiveDocProvider({ children }: LiveDocProviderProps) {
  const [data, setData] = useState<SpecData>(
    fallbackData as unknown as SpecData,
  );
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<Date | null>(null);
  const fetchedRef = useRef(false);

  const fetchLiveData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(WORKER_URL, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`Worker returned ${response.status}`);
      }

      const liveData = (await response.json()) as SpecData;

      if (liveData._meta?.syncedAt) {
        setData(sanitizeSections(liveData));
        setIsLive(true);
        setLastFetched(liveData._meta.syncedAt);
        setFetchedAt(new Date());
        setError(null);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Fetch failed';
      setError(msg);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchLiveData();
  }, [fetchLiveData]);

  const sectionCount = data.sections?.length ?? 0;

  return (
    <LiveDocContext.Provider
      value={{
        data,
        isLive,
        loading,
        error,
        lastFetched,
        fetchedAt,
        sectionCount,
        refetch: fetchLiveData,
      }}
    >
      {children}
    </LiveDocContext.Provider>
  );
}
