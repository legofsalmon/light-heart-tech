/**
 * Multi-level access control configuration.
 *
 * Each password maps to a role, and each role grants access to specific zones.
 * Routes are assigned to zones. The admin role has access to everything.
 */

export type Role = 'admin' | 'techspec' | 'coreteam' | 'executive' | 'marketing';

export type Zone = 'techspec' | 'ops' | 'executive' | 'marketing' | 'brand';

/** Password → Role mapping */
export const PASSWORD_MAP: Record<string, Role> = {
  pharmakon: 'admin',
  techspec2026: 'techspec',
  coreteam2026: 'coreteam',
  brendan2026: 'executive',
  lightheart2026: 'marketing',
};

/** Role → Zones granted */
export const ROLE_ZONES: Record<Role, Zone[] | 'all'> = {
  admin: 'all',
  techspec: ['techspec'],
  coreteam: ['ops', 'techspec'],
  executive: ['executive'],
  marketing: ['marketing', 'brand'],
};

/** Role → Display label (shown after login) */
export const ROLE_LABELS: Record<Role, string> = {
  admin: 'Administrator',
  techspec: 'Technical Specification',
  coreteam: 'Core Team',
  executive: 'Executive',
  marketing: 'Marketing',
};

/** Route prefix → Zone mapping */
export function getRouteZone(pathname: string): Zone {
  if (pathname.startsWith('/ops')) return 'ops';
  if (pathname.startsWith('/plan')) return 'ops';
  if (pathname.startsWith('/executive')) return 'executive';
  if (pathname.startsWith('/marketing')) return 'marketing';
  if (pathname.startsWith('/brand')) return 'brand';
  // All tech spec routes: /, /brief, /projection, /signal, etc.
  return 'techspec';
}

/** Check if a role can access a given zone */
export function canAccess(role: Role, zone: Zone): boolean {
  const zones = ROLE_ZONES[role];
  if (zones === 'all') return true;
  return zones.includes(zone);
}

/** Check if a role can access a given route */
export function canAccessRoute(role: Role, pathname: string): boolean {
  return canAccess(role, getRouteZone(pathname));
}

/** Get all zones a role can access */
export function getAccessibleZones(role: Role): Zone[] {
  const zones = ROLE_ZONES[role];
  if (zones === 'all') return ['techspec', 'ops', 'executive', 'marketing', 'brand'];
  return zones;
}
