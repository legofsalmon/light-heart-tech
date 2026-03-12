/**
 * Milestone Dependency Graph Data
 * 17 milestones as Directed Acyclic Graph (DAG)
 * For: /executive page React Flow diagram
 * 
 * Timeline: March 13, 2026 → September 12, 2026 (Opening)
 * Critical path marked for fire cert, AV install, exhibition
 */

export type MilestoneStatus = 
  | 'complete' 
  | 'in-progress' 
  | 'pending' 
  | 'at-risk' 
  | 'blocked';

export type PhaseNumber = 1 | 2 | 3 | 4 | 5;

export interface Milestone {
  id: string;
  date: string; // ISO date string
  title: string;
  description: string;
  status: MilestoneStatus;
  phase: PhaseNumber;
  dependsOn: string[]; // IDs of prerequisite milestones
  unlocks: string[];   // IDs of milestones this enables
  criticalPath: boolean;
  owner?: string;
  deliverables: string[];
  acceptanceCriteria?: string;
  position?: { x: number; y: number };
}

export interface MilestoneEdge {
  id: string;
  source: string;
  target: string;
  type: 'dependency' | 'critical-path' | 'parallel';
  animated?: boolean;
}

// ============================================
// PHASE 1: FOUNDATION (March - April 2026)
// ============================================

export const milestones: Milestone[] = [
  {
    id: 'fire-submit',
    date: '2026-03-24',
    title: 'Fire Certification Submitted',
    description: 'Fire officer cert submission for Building Control Authority',
    status: 'pending',
    phase: 1,
    dependsOn: [],
    unlocks: ['fire-approve'],
    criticalPath: true,
    owner: 'CA-Stephen Doherty',
    deliverables: [
      'Fire safety certificate application',
      'Fire stopping report',
      'Emergency lighting plan',
      'Escape route signage'
    ],
    acceptanceCriteria: 'Building Control Authority acknowledges receipt'
  },
  {
    id: 'fire-approve',
    date: '2026-04-30',
    title: 'Fire Certification Approved',
    description: 'BCA approval of fire safety certificate (max 8 weeks)',
    status: 'pending',
    phase: 1,
    dependsOn: ['fire-submit'],
    unlocks: ['proj-install', 'audio-install', 'servers-install'],
    criticalPath: true,
    owner: 'BCA / CA-Stephen Doherty',
    deliverables: [
      'Fire safety certificate',
      'Conditional approval (if applicable)',
      'Opening permission dependency cleared'
    ],
    acceptanceCriteria: 'Formal approval letter received from BCA'
  },
  {
    id: 'spatial-scan',
    date: '2026-03-31',
    title: 'Spatial Scan Complete',
    description: 'Point cloud / floor plan scan for projection mapping',
    status: 'pending',
    phase: 1,
    dependsOn: [],
    unlocks: ['projection-content'],
    criticalPath: false,
    owner: 'Projectionist Team',
    deliverables: [
      'Point cloud data (verified vs tape in 2 spots)',
      'Floor plan for projection mapping',
      'Spatial data for 3D alignment'
    ],
    acceptanceCriteria: 'Scan verified against physical tape measures'
  },

  // ============================================
  // PHASE 2: CONTENT PRODUCTION (April - May 2026)
  // ============================================
  {
    id: 'projection-content',
    date: '2026-04-20',
    title: 'Projection Content Finalised',
    description: 'Content rendered to 3D-aligned template for all projectors',
    status: 'pending',
    phase: 2,
    dependsOn: ['spatial-scan'],
    unlocks: ['content-load'],
    criticalPath: false,
    owner: 'Creative Team',
    deliverables: [
      'Content rendered to 37 projector templates',
      '3D alignment verified',
      'Subtitle/caption tracks included'
    ],
    acceptanceCriteria: 'Content renders correctly on test projection surface'
  },
  {
    id: 'audio-soundscape',
    date: '2026-04-20',
    title: 'Audio Soundscape Finalised',
    description: 'Spatial audio design complete with 96 object channels',
    status: 'pending',
    phase: 2,
    dependsOn: [],
    unlocks: ['audio-calibrate'],
    criticalPath: false,
    owner: 'L-Acoustics Team',
    deliverables: [
      '96 spatial audio objects configured',
      'Room 1 + Room 2 soundscape designs',
      'Binaural downmix for preview'
    ],
    acceptanceCriteria: 'Soundscape plays correctly in L-ISA processor'
  },
  {
    id: 'journey-map',
    date: '2026-05-01',
    title: 'Visitor Journey Map Complete',
    description: 'Full circulation plan with dwell timing and transition zones',
    status: 'pending',
    phase: 2,
    dependsOn: [],
    unlocks: ['staff-train'],
    criticalPath: false,
    owner: 'TSM Design Team',
    deliverables: [
      'Circulation plan with timing',
      'Entry/exit sequencing',
      'Dwell zone definitions',
      'Opt-in/opt-out decision points'
    ]
  },

  // ============================================
  // PHASE 3: INSTALLATION (May - June 2026)
  // ============================================
  {
    id: 'proj-install',
    date: '2026-06-13',
    title: 'Projector Installation',
    description: '37 Barco projectors mounted and aligned (13 days)',
    status: 'pending',
    phase: 3,
    dependsOn: ['fire-approve'],
    unlocks: ['proj-align', 'av-integration'],
    criticalPath: true,
    owner: 'WAVE / Barco Team',
    deliverables: [
      '24× Room 1 projectors mounted',
      '13× Room 2 projectors mounted',
      'Power + network connected',
      'Safety fixtures installed'
    ],
    acceptanceCriteria: 'All projectors powered and network accessible'
  },
  {
    id: 'audio-install',
    date: '2026-06-16',
    title: 'Audio System Installation',
    description: '87 speakers + 6 amplifiers + L-ISA processor installed',
    status: 'pending',
    phase: 3,
    dependsOn: ['fire-approve'],
    unlocks: ['audio-calibrate', 'av-integration'],
    criticalPath: true,
    owner: 'L-Acoustics Team',
    deliverables: [
      '87 speakers (71 mains + 16 subs) installed',
      '6× LA7.16i amplifiers racked',
      'L-ISA processor configured',
      'LS10 AVB switches deployed'
    ],
    acceptanceCriteria: 'All speakers produce test tone'
  },
  {
    id: 'servers-install',
    date: '2026-06-13',
    title: 'Media Servers Installed',
    description: '5× Pixera PX2 Octo servers racked and networked',
    status: 'pending',
    phase: 3,
    dependsOn: ['fire-approve'],
    unlocks: ['content-load', 'sensor-integrate'],
    criticalPath: true,
    owner: 'AV Integrator',
    deliverables: [
      '5× Pixera PX2 Octo servers racked',
      'Netgear M4500 switches configured',
      'Meinberg sync generator connected',
      'Network segmentation verified'
    ]
  },

  // ============================================
  // PHASE 4: CALIBRATION & INTEGRATION (July - August 2026)
  // ============================================
  {
    id: 'proj-align',
    date: '2026-07-15',
    title: 'Projector Alignment Complete',
    description: 'Edge blending, geometry correction, brightness matched',
    status: 'pending',
    phase: 4,
    dependsOn: ['proj-install'],
    unlocks: ['av-integration'],
    criticalPath: true,
    owner: 'WAVE / Projectionist',
    deliverables: [
      'Edge blending across all surfaces',
      'Geometry correction per projector',
      'Brightness uniformity <10% variance',
      'Color calibration to D65'
    ],
    acceptanceCriteria: 'No visible seams at 2m viewing distance'
  },
  {
    id: 'audio-calibrate',
    date: '2026-07-15',
    title: 'Audio Calibration Complete',
    description: 'L-ISA spatial audio tuned per listening position',
    status: 'pending',
    phase: 4,
    dependsOn: ['audio-install', 'audio-soundscape'],
    unlocks: ['av-integration'],
    criticalPath: true,
    owner: 'L-Acoustics Team',
    deliverables: [
      '96 audio objects positioned',
      'Per-position EQ applied',
      'SPL measurements documented',
      'Frequency response verified'
    ],
    acceptanceCriteria: 'Flat frequency response ±3dB in listening zone'
  },
  {
    id: 'sensor-integrate',
    date: '2026-07-31',
    title: 'Sensors Integrated',
    description: '44 Luxonis cameras + tracking software fully integrated',
    status: 'pending',
    phase: 4,
    dependsOn: ['servers-install'],
    unlocks: ['av-integration'],
    criticalPath: false,
    owner: 'AV Integrator',
    deliverables: [
      '44 Luxonis OAK cameras networked',
      'Depth + RGB streams validated',
      'Tracking software configured',
      'Privacy protocols active'
    ]
  },
  {
    id: 'content-load',
    date: '2026-07-31',
    title: 'Content Loaded',
    description: 'All projection + audio content on servers',
    status: 'pending',
    phase: 4,
    dependsOn: ['projection-content', 'servers-install'],
    unlocks: ['av-integration'],
    criticalPath: true,
    owner: 'Creative Team',
    deliverables: [
      'Video content on all 5 servers',
      'Audio content on L-ISA processor',
      'Subtitle tracks loaded',
      'Backup/restore tested'
    ]
  },
  {
    id: 'av-integration',
    date: '2026-08-15',
    title: 'Full AV Integration Test',
    description: 'End-to-end test: video + audio + sensors + control',
    status: 'pending',
    phase: 4,
    dependsOn: ['proj-align', 'audio-calibrate', 'sensor-integrate', 'content-load'],
    unlocks: ['staff-train', 'soft-opening'],
    criticalPath: true,
    owner: 'AV Integrator / Creative Team',
    deliverables: [
      'Video-audio sync verified (±1 frame)',
      'Sensor-triggered content tested',
      '50-minute show runs flawlessly',
      'Emergency stops functional',
      'Tech-rider delivered'
    ],
    acceptanceCriteria: '3 consecutive flawless show runs'
  },

  // ============================================
  // PHASE 5: READINESS (August - September 2026)
  // ============================================
  {
    id: 'staff-train',
    date: '2026-08-20',
    title: 'Staff Training Complete',
    description: 'All staff trained on operation, safety, visitor guidance',
    status: 'pending',
    phase: 5,
    dependsOn: ['journey-map', 'av-integration'],
    unlocks: ['soft-opening'],
    criticalPath: true,
    owner: 'Operations Team',
    deliverables: [
      'Staff training manual delivered',
      'All staff pass assessment',
      'Emergency protocols drilled',
      'Visitor guidance scripts learned'
    ],
    acceptanceCriteria: 'All staff demonstrate competency in role'
  },
  {
    id: 'soft-opening',
    date: '2026-09-05',
    title: 'Soft Opening',
    description: 'Controlled visitor tests with feedback collection',
    status: 'pending',
    phase: 5,
    dependsOn: ['staff-train', 'av-integration'],
    unlocks: ['grand-opening'],
    criticalPath: true,
    owner: 'Operations / Creative Team',
    deliverables: [
      '50 visitors across test sessions',
      'Feedback forms collected',
      'Observations documented',
      'Adjustments implemented'
    ],
    acceptanceCriteria: '90%+ positive feedback + no critical issues'
  },
  {
    id: 'grand-opening',
    date: '2026-09-12',
    title: 'Grand Opening',
    description: 'Public opening of Lightheart Immersive Gallery',
    status: 'pending',
    phase: 5,
    dependsOn: ['soft-opening'],
    unlocks: [],
    criticalPath: true,
    owner: 'Full Team',
    deliverables: [
      'Gallery open to public',
      'Exhibition 1 operational',
      'Press launch completed',
      'Horizon cards distributed'
    ],
    acceptanceCriteria: 'Successful first public day with zero incidents'
  }
];

// ============================================
// DEPENDENCY EDGES
// ============================================

export const milestoneEdges: MilestoneEdge[] = [
  // Phase 1 → Phase 2
  { id: 'm1', source: 'fire-submit', target: 'fire-approve', type: 'critical-path', animated: true },
  { id: 'm2', source: 'spatial-scan', target: 'projection-content', type: 'dependency' },
  
  // Phase 2 internal
  { id: 'm3', source: 'audio-soundscape', target: 'audio-calibrate', type: 'dependency' },
  
  // Fire approval gates Phase 3
  { id: 'm4', source: 'fire-approve', target: 'proj-install', type: 'critical-path', animated: true },
  { id: 'm5', source: 'fire-approve', target: 'audio-install', type: 'critical-path', animated: true },
  { id: 'm6', source: 'fire-approve', target: 'servers-install', type: 'critical-path', animated: true },
  
  // Phase 3 → Phase 4
  { id: 'm7', source: 'proj-install', target: 'proj-align', type: 'dependency' },
  { id: 'm8', source: 'audio-install', target: 'audio-calibrate', type: 'dependency' },
  { id: 'm9', source: 'servers-install', target: 'sensor-integrate', type: 'dependency' },
  { id: 'm10', source: 'servers-install', target: 'content-load', type: 'dependency' },
  { id: 'm11', source: 'projection-content', target: 'content-load', type: 'dependency' },
  
  // Phase 4 convergence
  { id: 'm12', source: 'proj-align', target: 'av-integration', type: 'critical-path' },
  { id: 'm13', source: 'audio-calibrate', target: 'av-integration', type: 'critical-path' },
  { id: 'm14', source: 'sensor-integrate', target: 'av-integration', type: 'dependency' },
  { id: 'm15', source: 'content-load', target: 'av-integration', type: 'critical-path' },
  
  // Phase 4 → Phase 5
  { id: 'm16', source: 'journey-map', target: 'staff-train', type: 'dependency' },
  { id: 'm17', source: 'av-integration', target: 'staff-train', type: 'dependency' },
  { id: 'm18', source: 'staff-train', target: 'soft-opening', type: 'critical-path', animated: true },
  { id: 'm19', source: 'av-integration', target: 'soft-opening', type: 'critical-path' },
  { id: 'm20', source: 'soft-opening', target: 'grand-opening', type: 'critical-path', animated: true }
];

// ============================================
// ANALYSIS HELPERS
// ============================================

export const getMilestonesByPhase = (phase: PhaseNumber) => 
  milestones.filter(m => m.phase === phase);

export const getCriticalPath = () => 
  milestones.filter(m => m.criticalPath);

export const getBlockers = (milestoneId: string): string[] => {
  const milestone = milestones.find(m => m.id === milestoneId);
  if (!milestone) return [];
  return milestone.dependsOn.filter(depId => {
    const dep = milestones.find(m => m.id === depId);
    return dep && !['complete', 'in-progress'].includes(dep.status);
  });
};

export const getReadyMilestones = (): Milestone[] => {
  return milestones.filter(m => {
    if (m.status !== 'pending') return false;
    const blockers = getBlockers(m.id);
    return blockers.length === 0;
  });
};

// Date helpers
export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-IE', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

export const daysUntilOpening = (): number => {
  const opening = new Date('2026-09-12');
  const now = new Date();
  const diff = opening.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// Phase metadata
export const phaseMeta = {
  1: { name: 'Foundation', dates: 'Mar-Apr 2026', color: '#D4AF37', theme: 'Certification & Scanning' },
  2: { name: 'Content', dates: 'Apr-May 2026', color: '#8B7355', theme: 'Media Production' },
  3: { name: 'Installation', dates: 'May-Jun 2026', color: '#6B5B73', theme: 'Hardware Install' },
  4: { name: 'Calibration', dates: 'Jul-Aug 2026', color: '#4A5D23', theme: 'Tuning & Integration' },
  5: { name: 'Readiness', dates: 'Aug-Sep 2026', color: '#1A3A3A', theme: 'Training & Launch' }
};

// Summary statistics
export const milestoneStats = {
  total: milestones.length,
  complete: milestones.filter(m => m.status === 'complete').length,
  inProgress: milestones.filter(m => m.status === 'in-progress').length,
  pending: milestones.filter(m => m.status === 'pending').length,
  atRisk: milestones.filter(m => m.status === 'at-risk').length,
  criticalPath: milestones.filter(m => m.criticalPath).length,
  phases: {
    1: milestones.filter(m => m.phase === 1).length,
    2: milestones.filter(m => m.phase === 2).length,
    3: milestones.filter(m => m.phase === 3).length,
    4: milestones.filter(m => m.phase === 4).length,
    5: milestones.filter(m => m.phase === 5).length
  }
};
