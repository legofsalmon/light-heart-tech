'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  authenticate: (password: string) => boolean;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  authenticate: () => false,
});

export function useAuth() {
  return useContext(AuthContext);
}

const PASSWORD = 'pharmakon';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('lightheart_auth') === PASSWORD) {
      setIsAuthenticated(true);
    }
  }, []);

  const authenticate = useCallback((password: string) => {
    if (password === PASSWORD) {
      sessionStorage.setItem('lightheart_auth', PASSWORD);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
}
