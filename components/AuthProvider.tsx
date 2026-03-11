'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  type Role,
  type Zone,
  PASSWORD_MAP,
  ROLE_LABELS,
  canAccess,
  canAccessRoute,
  getAccessibleZones,
} from '@/data/accessConfig';

interface AuthState {
  isAuthenticated: boolean;
  role: Role | null;
  roleLabel: string;
  authenticate: (password: string) => boolean;
  canAccessZone: (zone: Zone) => boolean;
  canAccessPath: (pathname: string) => boolean;
  accessibleZones: Zone[];
  logout: () => void;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  role: null,
  roleLabel: '',
  authenticate: () => false,
  canAccessZone: () => false,
  canAccessPath: () => false,
  accessibleZones: [],
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

const STORAGE_KEY = 'lightheart_auth';
const ROLE_KEY = 'lightheart_role';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const savedRole = sessionStorage.getItem(ROLE_KEY) as Role | null;
    const savedAuth = sessionStorage.getItem(STORAGE_KEY);
    if (savedRole && savedAuth === 'true') {
      setRole(savedRole);
      setIsAuthenticated(true);
    }
  }, []);

  const authenticate = useCallback((password: string) => {
    const matchedRole = PASSWORD_MAP[password.trim().toLowerCase()];
    if (matchedRole) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      sessionStorage.setItem(ROLE_KEY, matchedRole);
      setRole(matchedRole);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(ROLE_KEY);
    sessionStorage.removeItem('lightheart_sync_shown');
    setRole(null);
    setIsAuthenticated(false);
  }, []);

  const canAccessZone = useCallback(
    (zone: Zone) => (role ? canAccess(role, zone) : false),
    [role],
  );

  const canAccessPath = useCallback(
    (pathname: string) => (role ? canAccessRoute(role, pathname) : false),
    [role],
  );

  const accessibleZones = role ? getAccessibleZones(role) : [];
  const roleLabel = role ? ROLE_LABELS[role] : '';

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        roleLabel,
        authenticate,
        canAccessZone,
        canAccessPath,
        accessibleZones,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
