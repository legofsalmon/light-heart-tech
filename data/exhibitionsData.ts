/**
 * Digital Nature Exhibition — Structured Data
 * For: /exhibitions page React/Vue/Next.js implementation
 * 
 * Status: Draft — pending artist input
 * Last updated: 2026-03-10
 */

export interface Exhibition {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  status: 'upcoming' | 'current' | 'past' | 'draft';
  dates: {
    opening: string; // ISO date
    closing: string;
    openingNight?: string;
  };
  duration: {
    minutes: number;
    description: string;
  };
  artist: Artist;
  concept: Concept;
  experience: Experience;
  technical: TechnicalSpec;
  timeline: TimelineEvent[];
  quotes: Quote[];
  visitorInfo: VisitorInfo;
  assets: AssetRequirements;
  press: PressInfo;
  meta: ExhibitionMeta;
}

export interface Artist {
  name: string;
  slug: string;
  location: string;
  bio: {
    short: string; // 50 words
    extended: string; // 150 words
  };
  portrait?: {
    url: string;
    credit: string;
    alt: string;
  };
  socialMedia?: {
    instagram?: string;
    website?: string;
  };
  // For Pauric: 75,000 followers mentioned in planning docs
  reach?: {
    followers?: number;
    platform?: string;
  };
}

export interface Concept {
  summary: string; // Fortune-first 150 words
  coreIdea: string;
  curatorialRationale: string[]; // Each principle explanation
  influences?: string[]; // [DRAFT - PENDING ARTIST INPUT]
}

export interface Experience {
  preVisit: string;
  arrival: string;
  room1: RoomExperience;
  transition: string;
  room2: RoomExperience;
  exit: string;
  postVisit?: string;
}

export interface RoomExperience {
  title: string;
  duration: string;
  description: string; // [DRAFT - PENDING ARTIST INPUT]
  keyMoments: string[]; // [DRAFT - PENDING ARTIST INPUT]
  technicalNotes: string;
}

export interface TechnicalSpec {
  projectors: {
    total: number;
    room1: number;
    room2: number;
    models: string[];
    notes: string;
  };
  audio: {
    totalSpeakers: number;
    mains: number;
    subs: number;
    spatialObjects: number;
    processor: string;
    notes: string;
  };
  sensors: {
    total: number;
    room1: number;
    room2: number;
    model: string;
    trackingCapabilities: string[];
  };
  servers: {
    count: number;
    model: string;
    renderingEngine?: string; // [DRAFT - PENDING ARTIST INPUT]
  };
  powerDraw: string;
}

export interface TimelineEvent {
  date: string;
  phase: 'commissioning' | 'development' | 'installation' | 'opening' | 'documentation';
  title: string;
  status: 'completed' | 'scheduled' | 'pending' | 'draft';
  description?: string;
}

export interface Quote {
  id: string;
  text: string;
  attribution: string;
  role?: string;
  context: 'artist' | 'curator' | 'press' | 'visitor';
  status: 'confirmed' | 'draft';
}

export interface VisitorInfo {
  duration: number; // minutes
  capacity: {
    total: number;
    room1: number;
    room2: number;
    status: 'confirmed' | 'draft';
  };
  schedule?: {
    weekdays: string[];
    weekends: string[];
  };
  pricing?: {
    adult?: number;
    student?: number;
    senior?: number;
    child?: number;
    member: 'free' | number;
    status: 'confirmed' | 'draft';
  };
  accessibility: {
    wheelchairAccessible: boolean;
    audioDescription?: boolean;
    relaxedPerformances?: boolean;
    exitPossible: boolean;
    notes: string;
  };
  ageRecommendation: {
    minAge: number;
    notes: string;
    status: 'confirmed' | 'draft';
  };
}

export interface AssetRequirements {
  photography: string[];
  video: string[];
  print: string[];
  digital: string[];
}

export interface PressInfo {
  primaryHook: string;
  secondaryAngles: string[];
  targetOutlets: string[];
}

export interface ExhibitionMeta {
  lastUpdated: string;
  contentStatus: 'draft' | 'review' | 'final';
  pendingInputs: string[];
  readyForImplementation: boolean;
  notes: string;
}

// ============================================
// DIGITAL NATURE EXHIBITION DATA
// ============================================

export const digitalNatureExhibition: Exhibition = {
  id: 'digital-nature-2026',
  slug: 'digital-nature',
  title: 'Digital Nature',
  subtitle: '[DRAFT - PENDING ARTIST INPUT] Where the forest learns to breathe with the room.',
  status: 'draft',
  
  dates: {
    opening: '2026-09-12',
    closing: '2026-12-06',
    openingNight: '2026-09-12T19:00:00'
  },
  
  duration: {
    minutes: 50,
    description: '50 minutes, no intermission'
  },
  
  artist: {
    name: 'Pauric Freeman',
    slug: 'pauric-freeman',
    location: 'Berlin (b. Dublin)',
    bio: {
      short: 'Pauric Freeman is a Berlin-based artist working at the intersection of real-time graphics, spatial audio, and embodied interaction. His practice explores how digital environments can develop the responsive qualities of living systems—creating work that exists only in the moment of encounter.',
      extended: 'Pauric Freeman (b. Dublin, based Berlin) creates immersive environments where digital processes mimic organic behaviour. Working with real-time engines, spatial audio, and sensor systems, he builds worlds that respond to collective presence rather than playing pre-rendered content. His work has been presented at [VENUE 1], [VENUE 2], and [FESTIVAL]—each time creating singular experiences that resist documentation. Freeman\'s practice is grounded in the belief that digital art should demand the same physical presence as performance: you cannot experience it through a screen. Digital Nature represents Freeman\'s most ambitious work to date—a full-gallery installation using Lightheart\'s complete technical infrastructure to create a world that genuinely breathes with its visitors.'
    },
    portrait: undefined, // [DRAFT - PENDING ASSET]
    socialMedia: {
      instagram: '[DRAFT]',
      website: '[DRAFT]'
    },
    reach: {
      followers: 75000,
      platform: 'Social media (per March 2026 planning docs)'
    }
  },
  
  concept: {
    summary: 'Step inside a living system. Digital Nature transforms Lightheart\'s twin galleries into an responsive ecology where organic forms and digital processes merge. This is not nature documentary projected large—this is an environment that senses, responds, and evolves with the collective presence of those within it. In Room 1, towering projections engulf visitors in a generative forest that breathes at the pace of the room. As you move, the environment notices. As the group settles, the system settles with you. Room 2 offers an intimate counterpoint: a meditative space where individual gesture ripples through liquid light. Berlin-based artist Pauric Freeman creates a world that exists only when inhabited—work that cannot be photographed, screenshotted, or satisfactorily described. You simply have to be there.',
    
    coreIdea: '[DRAFT - PENDING ARTIST INPUT] Digital Nature asks: What if digital environments developed the responsive intelligence of natural ecosystems? Rather than projecting nature imagery onto walls, this work creates a synthetic ecology that behaves like a living system—sensing collective presence, adapting to group energy, and evolving over the 50-minute encounter.',
    
    curatorialRationale: [
      'Embodied Participation: The work only functions when bodies are present. Sensors track collective movement and presence, feeding real-time systems that respond to the actual humans in the room. This is not content you consume—it\'s an environment you co-create through your presence.',
      'Purpose-Built Specificity: Freeman\'s work engages every aspect of Lightheart\'s technical infrastructure—the 37 projectors, 87 speakers, and 44 sensors are not tools he uses but collaborators in the work. This exhibition could not exist anywhere else.',
      'Technogenetic Integration: The real-time systems are co-authors. The Pixera servers, L-ISA processor, and Luxonis sensors make decisions in milliseconds, creating behaviour that emerges from the interaction of human presence and computational process.',
      'Negentropic Practice: The 50-minute duration allows the work to develop slowly—rewarding sustained attention with deepening complexity. This is the antithesis of scroll-and-swipe culture.'
    ],
    
    influences: [
      '[DRAFT - PENDING ARTIST INPUT]'
    ]
  },
  
  experience: {
    preVisit: '[DRAFT - PENDING ARTIST INPUT] Visitors receive minimal information before arrival—just the title, artist name, and duration. We withhold imagery because no photograph captures the experience. The website offers only text: "You simply have to be there."',
    
    arrival: 'Visitors enter Lightheart\'s lobby and are welcomed by staff trained in the TSM hospitality protocol. After check-in, they receive the Horizon Card for Digital Nature—a physical card with prompts for attention and reflection. Staff explain the 50-minute journey ahead and the simple choice: participate fully or opt out at any threshold. The entry sequence builds anticipation through controlled revelation. Visitors move from bright lobby to dim transition corridor to the threshold of Room 1—each shift preparing the senses for what follows.',
    
    room1: {
      title: 'The Collective Forest',
      duration: '25-30 minutes',
      description: '[DRAFT - PENDING ARTIST INPUT] Visitors enter a vast space where 24 projectors and 48 speakers create an immersive forest environment. The scale is overwhelming—projection fills peripheral vision while spatial audio places sounds in three-dimensional space around and above. The forest responds. As the group moves, the environment notices. As visitors settle, the system settles with them.',
      keyMoments: [
        '[DRAFT - PENDING ARTIST INPUT]: Entry disorientation—brief loss of spatial reference',
        '[DRAFT - PENDING ARTIST INPUT]: Discovery of agency—realisation that presence affects the environment',
        '[DRAFT - PENDING ARTIST INPUT]: Collective synchronisation—moment when the room breathes together',
        '[DRAFT - PENDING ARTIST INPUT]: Gradual emergence—climax of the Room 1 arc'
      ],
      technicalNotes: 'Room 1: 24 projectors (14 wall + 10 floor), 48 speakers (20 X8i + 20 X6i + 8 SYVA SUB), 28 depth cameras'
    },
    
    transition: 'A choreographed corridor connects the galleries. As visitors move from Room 1\'s collective intensity to Room 2\'s individual intimacy, the transition space provides psychological reset. Light changes. Soundscape shifts. The body is prepared for a different mode of attention.',
    
    room2: {
      title: 'The Individual Gesture',
      duration: '15-20 minutes',
      description: '[DRAFT - PENDING ARTIST INPUT] Room 2 offers intimacy after Room 1\'s scale. Here, 13 projectors and 39 speakers create a more contained environment where individual gesture takes precedence.',
      keyMoments: [
        '[DRAFT - PENDING ARTIST INPUT]: Entry into intimacy—sense of personal space restored',
        '[DRAFT - PENDING ARTIST INPUT]: Gesture recognition—system responds to individual movement',
        '[DRAFT - PENDING ARTIST INPUT]: Reflection moment—quiet pocket for internal processing',
        '[DRAFT - PENDING ARTIST INPUT]: Integration—connection between personal action and collective result'
      ],
      technicalNotes: 'Room 2: 13 projectors (8 wall + 5 floor), 39 speakers (14 X8i + 17 X6i + 8 SYVA SUB), 16 depth cameras'
    },
    
    exit: 'Visitors exit through a reflection space designed for decompression and sense-making. Horizon Card prompts guide visitors to articulate what they experienced. Staff are available for conversation but do not direct interpretation. The exit experience acknowledges that Digital Nature is not easily processed. Visitors leave with questions, not answers—with the sense that something significant happened that they don\'t yet have language for.',
    
    postVisit: '[DRAFT - PENDING ARTIST INPUT] Optional: Email follow-up with documentation of the work\'s systems (revealing what was happening technically), artist commentary, and invitation to return. The work evolves over its 12-week run—repeat visits reveal new dimensions.'
  },
  
  technical: {
    projectors: {
      total: 37,
      room1: 24,
      room2: 13,
      models: ['Barco I600-4K10', 'Barco I600-4K8', 'Barco G50-W8'],
      notes: 'Room 1: 14× I600-4K10 wall + 10× G50-W8 floor. Room 2: 8× I600-4K8 wall + 5× G50-W8 floor.'
    },
    
    audio: {
      totalSpeakers: 87,
      mains: 71,
      subs: 16,
      spatialObjects: 96,
      processor: 'L-Acoustics L-ISA Processor II',
      notes: '71 L-Acoustics mains (34 X8i + 37 X6i) + 16 SYVA SUB subwoofers. Room 1: 48 speakers. Room 2: 39 speakers.'
    },
    
    sensors: {
      total: 44,
      room1: 28,
      room2: 16,
      model: 'Luxonis OAK 4 D Pro Wide',
      trackingCapabilities: [
        'Presence detection',
        'Movement tracking',
        'Collective gesture recognition',
        '[DRAFT - PENDING ARTIST INPUT: specific tracking requirements]'
      ]
    },
    
    servers: {
      count: 5,
      model: 'Pixera PX2 Octo',
      renderingEngine: '[DRAFT - PENDING ARTIST INPUT: Unreal Engine? Unity? Custom?]'
    },
    
    powerDraw: '~28kW (full system)'
  },
  
  timeline: [
    // Commissioning Phase
    { date: '2026-03-15', phase: 'commissioning', title: 'Commission signed', status: 'pending', description: '[DRAFT - PENDING]' },
    { date: '2026-03-20', phase: 'commissioning', title: 'Technical consultation with IDIRNET', status: 'pending' },
    { date: '2026-03-31', phase: 'commissioning', title: 'Spatial scan of galleries complete', status: 'pending' },
    
    // Development Phase
    { date: '2026-04-01', phase: 'development', title: 'Content development begins', status: 'pending' },
    { date: '2026-04-15', phase: 'development', title: 'Real-time system development', status: 'pending' },
    { date: '2026-05-01', phase: 'development', title: 'Spatial audio composition', status: 'pending' },
    { date: '2026-05-15', phase: 'development', title: 'Technical review + adjustments', status: 'pending' },
    { date: '2026-06-01', phase: 'development', title: 'Content finalised', status: 'pending' },
    
    // Installation Phase
    { date: '2026-06-13', phase: 'installation', title: 'Projector installation', status: 'scheduled' },
    { date: '2026-06-13', phase: 'installation', title: 'Media servers installed', status: 'scheduled' },
    { date: '2026-06-16', phase: 'installation', title: 'Audio system installation', status: 'scheduled' },
    { date: '2026-07-15', phase: 'installation', title: 'Projector alignment complete', status: 'scheduled' },
    { date: '2026-07-15', phase: 'installation', title: 'Audio calibration complete', status: 'scheduled' },
    { date: '2026-07-31', phase: 'installation', title: 'Sensors integrated', status: 'scheduled' },
    { date: '2026-07-31', phase: 'installation', title: 'Content loaded to servers', status: 'scheduled' },
    { date: '2026-08-15', phase: 'installation', title: 'Full AV integration test', status: 'scheduled' },
    
    // Opening Phase
    { date: '2026-08-20', phase: 'opening', title: 'Staff training complete', status: 'scheduled' },
    { date: '2026-09-05', phase: 'opening', title: 'Soft opening', status: 'scheduled' },
    { date: '2026-09-12', phase: 'opening', title: 'GRAND OPENING', status: 'scheduled' },
    
    // Documentation Phase
    { date: '2026-03-15', phase: 'documentation', title: 'Pauric Freeman promotional video shoot (separate from exhibition)', status: 'scheduled' },
    { date: '2026-09-12', phase: 'documentation', title: 'Opening night documentation', status: 'scheduled' },
    { date: '2026-10-15', phase: 'documentation', title: 'Mid-run review + adjustments', status: 'pending' },
    { date: '2026-12-06', phase: 'documentation', title: 'Final documentation + archive', status: 'scheduled' }
  ],
  
  quotes: [
    {
      id: 'q1-nature',
      text: '[DRAFT - PENDING ARTIST INPUT] "I\'m not interested in projecting nature onto walls. I want to create systems that behave like nature—responsive, unpredictable, alive only when engaged. The digital and the organic aren\'t opposites. They\'re converging."',
      attribution: 'Pauric Freeman',
      role: 'Artist',
      context: 'artist',
      status: 'draft'
    },
    {
      id: 'q2-presence',
      text: '[DRAFT - PENDING ARTIST INPUT] "This work doesn\'t exist without you. Not as a metaphor—literally. The servers are rendering nothing until the sensors detect presence. The forest is dormant. Your arrival wakes it."',
      attribution: 'Pauric Freeman',
      role: 'Artist',
      context: 'artist',
      status: 'draft'
    },
    {
      id: 'q3-technology',
      text: '[DRAFT - PENDING ARTIST INPUT] "We usually think of technology as mediation—screens between us and the world. But these systems can be immediate. The projector isn\'t showing you a forest. It is the forest, in that moment, responding to your breath."',
      attribution: 'Pauric Freeman',
      role: 'Artist',
      context: 'artist',
      status: 'draft'
    },
    {
      id: 'q4-lightheart',
      text: '[DRAFT - PENDING ARTIST INPUT] "When Kev described what they were building in Dublin, I knew immediately. This isn\'t a venue you adapt to—it\'s a canvas designed for this specific kind of work. I couldn\'t make Digital Nature anywhere else."',
      attribution: 'Pauric Freeman',
      role: 'Artist',
      context: 'artist',
      status: 'draft'
    },
    {
      id: 'q5-curatorial',
      text: '"We chose Digital Nature as our inaugural exhibition because it demonstrates everything Lightheart stands for. Pauric isn\'t using our technology—he\'s collaborating with it. The projectors, speakers, and sensors aren\'t tools; they\'re co-authors in a work that exists only in the moment of encounter."',
      attribution: 'Kev Freeney',
      role: 'Creative Director',
      context: 'curator',
      status: 'confirmed'
    }
  ],
  
  visitorInfo: {
    duration: 50,
    capacity: {
      total: 40,
      room1: 25,
      room2: 15,
      status: 'draft'
    },
    schedule: undefined, // [DRAFT - PENDING OPERATIONAL PLANNING]
    pricing: {
      member: 'free',
      status: 'draft'
    },
    accessibility: {
      wheelchairAccessible: true,
      audioDescription: undefined, // [DRAFT - PENDING]
      relaxedPerformances: undefined, // [DRAFT - PENDING]
      exitPossible: true,
      notes: 'Exit always possible. Staff trained to assist. [DRAFT - FULL ACCESSIBILITY AUDIT PENDING]'
    },
    ageRecommendation: {
      minAge: 12,
      notes: 'Recommended for ages 12+ (darkness, immersive scale, 50-minute duration)',
      status: 'draft'
    }
  },
  
  assets: {
    photography: [
      'Artist portrait (studio + environmental)',
      'Work-in-progress documentation',
      'Technical setup shots',
      'Opening night documentation',
      'Visitor experience (staged for privacy)'
    ],
    video: [
      'Artist interview (3-5 minutes)',
      'Behind-the-scenes installation',
      'Trailer (30-60 seconds, no spoilers)',
      'Social media clips (15 seconds each)'
    ],
    print: [
      'Exhibition poster',
      'Horizon Card design',
      'Program/leaflet',
      'Press kit'
    ],
    digital: [
      'Website hero imagery',
      'Social media templates',
      'Email graphics',
      'Digital signage'
    ]
  },
  
  press: {
    primaryHook: '"Ireland\'s first purpose-built immersive gallery opens with work that can only be experienced in person"',
    secondaryAngles: [
      '[DRAFT - PENDING ARTIST INPUT] Artist\'s return to Dublin after Berlin success',
      '[DRAFT] Technical innovation: real-time systems creating "living" digital art',
      '[DRAFT] The anti-selfie-museum: work that resists documentation',
      '[DRAFT] Collaboration between Lightheart and Berlin-based Irish artist'
    ],
    targetOutlets: [
      'Irish Times, Irish Independent (culture sections)',
      'RTÉ Culture, BBC Arts',
      'Design Week, Creative Review',
      'MUTEK, Ars Electronica networks'
    ]
  },
  
  meta: {
    lastUpdated: '2026-03-10',
    contentStatus: 'draft',
    pendingInputs: [
      'Artist quotes (awaiting Pauric input)',
      'Specific interaction mechanics (awaiting technical collaboration)',
      'Exact visitor capacity (pending safety review)',
      'Ticket pricing (pending strategy finalisation)',
      'Detailed room descriptions (pending artist input)',
      'Accessibility accommodations (pending audit)',
      'Artist-approved biography',
      'Artist portrait photography',
      'Rendering engine specification'
    ],
    readyForImplementation: true, // Structure is ready
    notes: 'Page structure complete. All [DRAFT] sections marked for artist input. Core facts confirmed: dates, artist, infrastructure usage, duration.'
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getQuotesByContext = (exhibition: Exhibition, context: Quote['context']) => {
  return exhibition.quotes.filter(q => q.context === context);
};

export const getTimelineByPhase = (exhibition: Exhibition, phase: TimelineEvent['phase']) => {
  return exhibition.timeline.filter(t => t.phase === phase);
};

export const getConfirmedTimeline = (exhibition: Exhibition) => {
  return exhibition.timeline.filter(t => t.status === 'scheduled' || t.status === 'completed');
};

export const getDraftContent = (exhibition: Exhibition): string[] => {
  const drafts: string[] = [];
  // This is a simplified check - in real implementation you'd walk the object
  if (exhibition.subtitle?.includes('[DRAFT]')) drafts.push('subtitle');
  if (exhibition.artist.bio.extended.includes('[VENUE')) drafts.push('artist bio');
  // ... etc
  return drafts;
};

export default digitalNatureExhibition;
