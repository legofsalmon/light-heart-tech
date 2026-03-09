'use client';

import { createContext, useContext, useState, useCallback } from 'react';

interface HighlightState {
  showResearchFlags: boolean;
  toggleResearchFlags: () => void;
}

const HighlightContext = createContext<HighlightState>({
  showResearchFlags: true,
  toggleResearchFlags: () => {},
});

export function useHighlights() {
  return useContext(HighlightContext);
}

export function HighlightProvider({ children }: { children: React.ReactNode }) {
  const [showResearchFlags, setShow] = useState(true);

  const toggleResearchFlags = useCallback(() => {
    setShow(prev => !prev);
  }, []);

  return (
    <HighlightContext.Provider value={{ showResearchFlags, toggleResearchFlags }}>
      {children}
    </HighlightContext.Provider>
  );
}
