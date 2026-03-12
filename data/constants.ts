/**
 * Canonical technical specifications from IDIRNET tech spec.
 * Single source of truth — all pages import from here.
 *
 * Source: /Marketing Research/idirnet tech spec for lightheart/
 */

export const SPECS = {
  // Projectors
  projectors: 37,
  room1WallProjectors: 14,    // Barco I600-4K10 (10,000 lm)
  room1FloorProjectors: 10,   // Barco G50-W8 (8,900 lm)
  room2WallProjectors: 8,     // Barco I600-4K8 (8,000 lm)
  room2FloorProjectors: 5,    // Barco G50-W8 (8,000 lm)

  // Audio
  speakers: 87,               // All units (71 mains + 16 subs)
  speakersMains: 71,          // X8i + X6i only (tech spec figure)
  speakersSubs: 16,           // SYVA SUB
  room1Speakers: 48,          // 20 X8i + 20 X6i + 8 SYVA SUB
  room2Speakers: 39,          // 14 X8i + 17 X6i + 8 SYVA SUB
  audioObjects: 96,           // L-ISA Processor II (64 outputs)
  amplifiers: 6,              // LA7.16i CE

  // Media Servers
  mediaServers: 5,            // Pixera PX2 Octo

  // Sensors
  depthCameras: 44,           // Depth-sensing RGB-D cameras

  // Venue
  galleries: 2,
  room1Area: 180,             // sq. m.
  room2Area: 100,             // sq. m.
  totalArea: 280,             // sq. m.

  // Infrastructure
  totalPowerProjectors: 24610,   // watts
  totalThermal: 118491,          // BTU/h (full system)
  cat6aRuns: 75,
  tenGbPorts: 88,
  fiberRuns: 50,                 // OS2 4-core LC

  // Commercial
  investment: '€4-4.5M',
  opening: 'September 2026',
  serverCostPerUnit: '£39,100',
  serverCostTotal: '£195,500',
} as const;

/** Team members — canonical credits */
export const TEAM = {
  brendan: { name: 'Brendan Dillon', title: 'Founder' },
  kev: { name: 'Kev Freeney', title: 'Creative Director', org: 'IDIRNET' },
  kris: { name: 'Krisjanis Berzins', title: 'Technical Director', org: 'IDIRNET' },
} as const;

/** Contact emails */
export const CONTACTS = {
  general: 'hello@lightheart.ie',
  press: 'press@lightheart.ie',
  partnerships: 'partnerships@lightheart.ie',
  membership: 'membership@lightheart.ie',
  accessibility: 'accessibility@lightheart.ie',
  education: 'education@lightheart.ie',
  creative: 'kev@lightheart.ie',
} as const;

/** Technical partners */
export const PARTNERS = {
  audio: { name: 'Audiotek', brand: 'L-Acoustics' },
  projection: { name: 'Barco', brand: 'Barco' },
  mediaServers: { name: 'Pixera', brand: 'AV Stumpfl' },
  network: { name: 'Netgear', brand: 'Netgear' },
  signalTransport: { name: 'DVIGear', brand: 'DVIGear' },
  sync: { name: 'Meinberg', brand: 'Meinberg' },
} as const;
