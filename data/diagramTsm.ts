/**
 * TSM Diagram Data
 * Triple Stack Model: 3 Stacks × 7 Planes
 * For: /ops page React Flow diagram
 * 
 * Cross-stack dependencies show how the planes interconnect
 * Status: planned | active | complete | blocked
 */

export type TSMStack = 'global' | 'internal' | 'external';
export type TSMStatus = 'planned' | 'active' | 'complete' | 'blocked';

export interface TSMNode {
  id: string;
  stack: TSMStack;
  plane: string;
  name: string;
  detail: string;
  status: TSMStatus;
  dependsOn: string[]; // IDs of nodes this depends on
  unlocks: string[];   // IDs of nodes this unlocks
  deliverables: string[];
  acceptanceCriteria?: string;
}

export const tsmNodes: TSMNode[] = [
  // ============================================
  // GLOBAL STACK (Infrastructure & Systems)
  // ============================================
  {
    id: 'global-ground',
    stack: 'global',
    plane: 'Ground',
    name: 'Ground',
    detail: 'Power, stability, HVAC, safety systems — the felt capacity of the room',
    status: 'active',
    dependsOn: [],
    unlocks: ['global-runtime', 'internal-root'],
    deliverables: [
      '1.07 Fire certification submission',
      '1.08 Fire certification approval',
      '1.10 Electrical infrastructure spec',
      '1.11 HVAC specification',
      '3.06 Projector installation',
      '3.08 L-ISA audio system installation'
    ],
    acceptanceCriteria: 'Room can hold comfortable silence at operating temperature'
  },
  {
    id: 'global-runtime',
    stack: 'global',
    plane: 'Runtime',
    name: 'Runtime',
    detail: 'Media servers, clock sync, playback, subtitle systems — the room\'s felt beat',
    status: 'planned',
    dependsOn: ['global-ground'],
    unlocks: ['global-circulation', 'internal-sacral'],
    deliverables: [
      '3.15 Full AV system integration test',
      'Media server setup (5× Pixera PX2 Octo)',
      'Sync generator (Meinberg Microsync)',
      'Real-time playback systems'
    ],
    acceptanceCriteria: 'Steady playback without visible artefacts, heat and fan noise within comfort band'
  },
  {
    id: 'global-circulation',
    stack: 'global',
    plane: 'Circulation',
    name: 'Circulation',
    detail: 'Visitor flow, entry sequence, dwell timing, exit legibility',
    status: 'planned',
    dependsOn: ['global-runtime', 'external-space'],
    unlocks: ['global-channels', 'internal-solar'],
    deliverables: [
      '3.17 Visitor journey map',
      '3.19 Circulation plan',
      'Entry/exit sequencing',
      'Dwell zone design'
    ]
  },
  {
    id: 'global-channels',
    stack: 'global',
    plane: 'Channels',
    name: 'Channels',
    detail: 'Permissions, consent protocol, GDPR, photography policy, recording disclosure',
    status: 'planned',
    dependsOn: ['global-circulation'],
    unlocks: ['global-frames', 'internal-throat'],
    deliverables: [
      '3.22 Consent and data protocol',
      'GDPR compliance documentation',
      'Photography policy',
      'Recording disclosure system'
    ]
  },
  {
    id: 'global-frames',
    stack: 'global',
    plane: 'Frames',
    name: 'Frames',
    detail: 'Sightlines, luminance, caption readability, response timing — legibility layer',
    status: 'planned',
    dependsOn: ['global-channels', 'external-portal'],
    unlocks: ['global-roles', 'internal-third-eye'],
    deliverables: [
      'Sightline testing documentation',
      'Luminance checks (light meter validation)',
      'Caption/subtitle readability test',
      'Response timing calibration'
    ],
    acceptanceCriteria: 'One comfortable out-breath can cover a subtitle line'
  },
  {
    id: 'global-roles',
    stack: 'global',
    plane: 'Roles',
    name: 'Roles',
    detail: 'Staff positions, visitor roles, steward training, participation scripts',
    status: 'planned',
    dependsOn: ['global-frames', 'external-gesture'],
    unlocks: ['global-horizons', 'internal-crown'],
    deliverables: [
      'Staff training manual',
      'Visitor role definitions',
      'Steward scripts and positioning',
      'Participation protocols'
    ]
  },
  {
    id: 'global-horizons',
    stack: 'global',
    plane: 'Horizons',
    name: 'Horizons',
    detail: 'Quarterly review protocol, horizon cards, metric definitions, governance',
    status: 'planned',
    dependsOn: ['global-roles', 'external-feedback'],
    unlocks: [],
    deliverables: [
      '1.06 TSM Integration Brief',
      'Quarterly review protocol',
      'Horizon card system',
      'Metric definitions and KPIs'
    ]
  },

  // ============================================
  // INTERNAL STACK (Embodied Perception)
  // ============================================
  {
    id: 'internal-root',
    stack: 'internal',
    plane: 'Root',
    name: 'Root',
    detail: 'Physical grounding — floor surface, seating, temperature, somatic settling',
    status: 'planned',
    dependsOn: ['global-ground'],
    unlocks: ['internal-sacral'],
    deliverables: [
      'Floor surface design spec',
      'Seating specification',
      'Temperature band definition',
      'Physical grounding protocols'
    ]
  },
  {
    id: 'internal-sacral',
    stack: 'internal',
    plane: 'Sacral',
    name: 'Sacral',
    detail: 'Creativity and pacing — emotional arc, transition timing, composed rhythm',
    status: 'planned',
    dependsOn: ['internal-root', 'global-runtime'],
    unlocks: ['internal-solar'],
    deliverables: [
      '3.13 Exhibition 1 adaptation brief',
      'Exhibition pacing document',
      'Emotional arc design',
      'Transition timing specification'
    ],
    acceptanceCriteria: 'At least one "quiet pocket" within the 50-minute journey'
  },
  {
    id: 'internal-solar',
    stack: 'internal',
    plane: 'Solar Plexus',
    name: 'Solar Plexus',
    detail: 'Agency and choice — opt-in/opt-out design, intensity zones, visitor control',
    status: 'planned',
    dependsOn: ['internal-sacral', 'global-circulation'],
    unlocks: ['internal-heart'],
    deliverables: [
      '3.23 Visitor choice architecture',
      'Opt-in/opt-out design',
      'Intensity zone specification',
      'Reversible participation protocols'
    ]
  },
  {
    id: 'internal-heart',
    stack: 'internal',
    plane: 'Heart',
    name: 'Heart',
    detail: 'Connection and co-regulation — group pacing, shared breath moments, collective presence',
    status: 'planned',
    dependsOn: ['internal-solar'],
    unlocks: ['internal-throat'],
    deliverables: [
      'Co-regulation design',
      'Group experience pacing',
      'Shared perception moments',
      'Collective breath protocols'
    ],
    acceptanceCriteria: 'At least one moment where the room breathes together'
  },
  {
    id: 'internal-throat',
    stack: 'internal',
    plane: 'Throat',
    name: 'Throat',
    detail: 'Articulation and expression — staff language guide, visitor communication, signage tone',
    status: 'planned',
    dependsOn: ['internal-heart', 'global-channels'],
    unlocks: ['internal-third-eye'],
    deliverables: [
      'Staff language guide',
      'Visitor communication scripts',
      'Signage tone specification',
      'Verbal threshold protocols'
    ]
  },
  {
    id: 'internal-third-eye',
    stack: 'internal',
    plane: 'Third Eye',
    name: 'Third Eye',
    detail: 'Perception and attention — gaze direction, flicker safety, attention design',
    status: 'planned',
    dependsOn: ['internal-throat', 'global-frames'],
    unlocks: ['internal-crown'],
    deliverables: [
      'Attention design documentation',
      'Gaze direction mapping',
      'Flicker safety protocols',
      'Visual comfort testing'
    ]
  },
  {
    id: 'internal-crown',
    stack: 'internal',
    plane: 'Crown',
    name: 'Crown',
    detail: 'Integration and transcendence — exit experience, reflection space, post-visit',
    status: 'planned',
    dependsOn: ['internal-third-eye', 'global-roles'],
    unlocks: [],
    deliverables: [
      'Exit experience design',
      'Reflection space specification',
      'Post-visit integration materials',
      'Horizon card distribution'
    ]
  },

  // ============================================
  // EXTERNAL STACK (Mediation & Ritual)
  // ============================================
  {
    id: 'external-space',
    stack: 'external',
    plane: 'Space',
    name: 'Space',
    detail: 'Point cloud verification, sightline testing, route mapping, spatial legibility',
    status: 'active',
    dependsOn: [],
    unlocks: ['external-portal', 'global-circulation'],
    deliverables: [
      '1.17 Point cloud / floor plan scan',
      'Sightline testing documentation',
      'Route mapping',
      'Spatial data for projection mapping'
    ],
    acceptanceCriteria: 'Scan verified against tape in at least two spots'
  },
  {
    id: 'external-portal',
    stack: 'external',
    plane: 'Portal',
    name: 'Portal',
    detail: 'Threshold design — entry count-in, consent line, cross-room sync, exit cue',
    status: 'planned',
    dependsOn: ['external-space'],
    unlocks: ['external-gesture', 'global-frames'],
    deliverables: [
      '3.18 Threshold (Portal) design',
      'Entry count-in system',
      'Consent line protocols',
      'Exit cue visibility design'
    ]
  },
  {
    id: 'external-gesture',
    stack: 'external',
    plane: 'Gesture',
    name: 'Gesture',
    detail: 'Movement and consent — accessible pacing, abort protocol, movement scores',
    status: 'planned',
    dependsOn: ['external-portal'],
    unlocks: ['external-mirror', 'global-roles'],
    deliverables: [
      'Consent-based movement score',
      'Accessible pacing protocols',
      'Abort/reverse procedures',
      'Gesture vocabulary'
    ]
  },
  {
    id: 'external-mirror',
    stack: 'external',
    plane: 'Mirror',
    name: 'Mirror',
    detail: 'Feedback and reflection — visitor state indicators, echo design, feedback systems',
    status: 'planned',
    dependsOn: ['external-gesture'],
    unlocks: ['external-narrative'],
    deliverables: [
      'Feedback system design',
      'Echo/reverb protocols',
      'Visitor state indicators',
      'Reflection mechanisms'
    ]
  },
  {
    id: 'external-narrative',
    stack: 'external',
    plane: 'Narrative',
    name: 'Narrative',
    detail: 'Story and journey — horizon cards, change logs, visitor narrative, offboarding',
    status: 'planned',
    dependsOn: ['external-mirror'],
    unlocks: ['external-atmosphere'],
    deliverables: [
      'Horizon card system',
      'Change log documentation',
      'Visitor journey narrative',
      'Offboarding experience'
    ]
  },
  {
    id: 'external-atmosphere',
    stack: 'external',
    plane: 'Atmosphere',
    name: 'Atmosphere',
    detail: 'Ambient conditions — luminance, warmth, air, reverb, SPL caps, quiet pocket',
    status: 'planned',
    dependsOn: ['external-narrative'],
    unlocks: ['external-feedback'],
    deliverables: [
      '3.20 Atmosphere specification',
      'Luminance bands defined',
      'SPL caps per room',
      'Temperature ranges',
      'Quiet pocket location'
    ]
  },
  {
    id: 'external-feedback',
    stack: 'external',
    plane: 'Feedback Loop',
    name: 'Feedback Loop',
    detail: 'Learning and adaptation — data collection, posted changes, learning cycles',
    status: 'planned',
    dependsOn: ['external-atmosphere'],
    unlocks: ['global-horizons'],
    deliverables: [
      'Data collection protocol',
      'Posted change process',
      'Learning cycle documentation',
      'Continuous improvement system'
    ]
  }
];

// Cross-stack connection definitions for React Flow edges
export interface TSMEdge {
  id: string;
  source: string;
  target: string;
  type: 'dependency' | 'unlocks' | 'cross-stack';
  animated?: boolean;
}

export const tsmEdges: TSMEdge[] = [
  // Within Global Stack
  { id: 'e1', source: 'global-ground', target: 'global-runtime', type: 'dependency', animated: true },
  { id: 'e2', source: 'global-runtime', target: 'global-circulation', type: 'dependency' },
  { id: 'e3', source: 'global-circulation', target: 'global-channels', type: 'dependency' },
  { id: 'e4', source: 'global-channels', target: 'global-frames', type: 'dependency' },
  { id: 'e5', source: 'global-frames', target: 'global-roles', type: 'dependency' },
  { id: 'e6', source: 'global-roles', target: 'global-horizons', type: 'dependency' },

  // Within Internal Stack
  { id: 'e7', source: 'internal-root', target: 'internal-sacral', type: 'dependency', animated: true },
  { id: 'e8', source: 'internal-sacral', target: 'internal-solar', type: 'dependency' },
  { id: 'e9', source: 'internal-solar', target: 'internal-heart', type: 'dependency' },
  { id: 'e10', source: 'internal-heart', target: 'internal-throat', type: 'dependency' },
  { id: 'e11', source: 'internal-throat', target: 'internal-third-eye', type: 'dependency' },
  { id: 'e12', source: 'internal-third-eye', target: 'internal-crown', type: 'dependency' },

  // Within External Stack
  { id: 'e13', source: 'external-space', target: 'external-portal', type: 'dependency', animated: true },
  { id: 'e14', source: 'external-portal', target: 'external-gesture', type: 'dependency' },
  { id: 'e15', source: 'external-gesture', target: 'external-mirror', type: 'dependency' },
  { id: 'e16', source: 'external-mirror', target: 'external-narrative', type: 'dependency' },
  { id: 'e17', source: 'external-narrative', target: 'external-atmosphere', type: 'dependency' },
  { id: 'e18', source: 'external-atmosphere', target: 'external-feedback', type: 'dependency' },

  // Cross-stack connections (the magic)
  { id: 'c1', source: 'global-ground', target: 'internal-root', type: 'cross-stack', animated: true },
  { id: 'c2', source: 'global-runtime', target: 'internal-sacral', type: 'cross-stack' },
  { id: 'c3', source: 'global-circulation', target: 'internal-solar', type: 'cross-stack' },
  { id: 'c4', source: 'global-channels', target: 'internal-throat', type: 'cross-stack' },
  { id: 'c5', source: 'global-frames', target: 'internal-third-eye', type: 'cross-stack' },
  { id: 'c6', source: 'global-roles', target: 'internal-crown', type: 'cross-stack' },
  { id: 'c7', source: 'global-horizons', target: 'external-feedback', type: 'cross-stack' },

  { id: 'c8', source: 'external-space', target: 'global-circulation', type: 'cross-stack', animated: true },
  { id: 'c9', source: 'external-portal', target: 'global-frames', type: 'cross-stack' },
  { id: 'c10', source: 'external-gesture', target: 'global-roles', type: 'cross-stack' },
  { id: 'c11', source: 'external-feedback', target: 'global-horizons', type: 'cross-stack' }
];

// Helper function to get nodes by stack
export const getNodesByStack = (stack: TSMStack): TSMNode[] => {
  return tsmNodes.filter(node => node.stack === stack);
};

// Helper function to get active critical path
export const getCriticalPath = (): TSMNode[] => {
  return tsmNodes.filter(node => 
    ['global-ground', 'global-runtime', 'external-space', 'external-portal'].includes(node.id)
  );
};
