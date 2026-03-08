import { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { SpecData } from './useSpecData';
import fallbackData from './specData.json';

const WORKER_URL = 'https://lightheart-doc-sync.idirnet-lightheart.workers.dev';

interface LiveDocState {
  data: SpecData;
  isLive: boolean;
  loading: boolean;
  error: string | null;
  lastFetched: string | null;
  sectionCount: number;
  refetch: () => void;
}

const LiveDocContext = createContext<LiveDocState>({
  data: fallbackData as unknown as SpecData,
  isLive: false,
  loading: false,
  error: null,
  lastFetched: null,
  sectionCount: 0,
  refetch: () => {},
});

export function useLiveDoc() {
  return useContext(LiveDocContext);
}

interface LiveDocProviderProps {
  children: React.ReactNode;
}

export function LiveDocProvider({ children }: LiveDocProviderProps) {
  const [data, setData] = useState<SpecData>(fallbackData as unknown as SpecData);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  const fetchLiveData = async () => {
    setLoading(true);
    try {
      const response = await fetch(WORKER_URL, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`Worker returned ${response.status}`);
      }

      const liveData = await response.json() as SpecData;

      if (liveData._meta?.syncedAt) {
        setData(liveData);
        setIsLive(true);
        setLastFetched(liveData._meta.syncedAt);
        setError(null);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Fetch failed';
      setError(msg);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchLiveData();
  }, []);

  const sectionCount = data.sections?.length ?? 0;

  return (
    <LiveDocContext.Provider value={{
      data, isLive, loading, error, lastFetched, sectionCount, refetch: fetchLiveData,
    }}>
      {children}
    </LiveDocContext.Provider>
  );
}
