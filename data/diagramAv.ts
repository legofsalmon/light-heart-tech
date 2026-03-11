/**
 * AV Architecture Diagram Data
 * Hardware components and signal flow
 * For: /ops and /technology pages
 * 
 * Signal flow: projectors → signal transport → media servers → network → audio → speakers → sensors
 */

export type AVNodeType = 
  | 'projector' 
  | 'speaker' 
  | 'subwoofer'
  | 'media-server'
  | 'audio-processor'
  | 'amplifier'
  | 'network-switch'
  | 'signal-transport'
  | 'sync-generator'
  | 'sensor';

export type AVStatus = 'installed' | 'pending' | 'testing' | 'operational';

export interface AVNode {
  id: string;
  type: AVNodeType;
  name: string;
  model: string;
  count: number;
  room?: 'room1' | 'room2' | 'both' | 'server-room';
  specs: Record<string, string | number>;
  status: AVStatus;
  inputs: string[];  // IDs of connected sources
  outputs: string[]; // IDs of connected destinations
  position?: { x: number; y: number }; // For diagram layout
}

export interface AVEdge {
  id: string;
  source: string;
  target: string;
  signalType: 'video' | 'audio' | 'data' | 'control' | 'sync';
  bandwidth?: string;
  protocol?: string;
  animated?: boolean;
}

// ============================================
// VIDEO SYSTEM NODES
// ============================================

export const avNodes: AVNode[] = [
  // Projectors - Room 1
  {
    id: 'proj-r1-wall',
    type: 'projector',
    name: 'Room 1 Wall Projectors',
    model: 'Barco I600-4K10',
    count: 14,
    room: 'room1',
    specs: {
      resolution: 'WQUXGA 3840×2400',
      brightness: '10,000 ISO lumens',
      lens: 'ILD 0.37 UST',
      technology: 'Barco Pulse with SuperShift™',
      power: '490W each'
    },
    status: 'pending',
    inputs: ['signal-dvigeor-r1'],
    outputs: [],
    position: { x: 100, y: 100 }
  },
  {
    id: 'proj-r1-floor',
    type: 'projector',
    name: 'Room 1 Floor Projectors',
    model: 'Barco G50-W8',
    count: 10,
    room: 'room1',
    specs: {
      resolution: 'WUXGA (2K)',
      brightness: '8,900 ISO lumens',
      lens: 'G-Lens 0.65-0.75:1 zoom',
      technology: 'Laser phosphor',
      power: '375W each'
    },
    status: 'pending',
    inputs: ['signal-dvigeor-r1'],
    outputs: [],
    position: { x: 100, y: 200 }
  },

  // Projectors - Room 2
  {
    id: 'proj-r2-wall',
    type: 'projector',
    name: 'Room 2 Wall Projectors',
    model: 'Barco I600-4K8',
    count: 8,
    room: 'room2',
    specs: {
      resolution: 'WQUXGA 3840×2400',
      brightness: '8,000 ISO lumens',
      lens: 'ILD 0.37 UST',
      technology: 'Barco Pulse',
      power: '440W each'
    },
    status: 'pending',
    inputs: ['signal-dvigeor-r2'],
    outputs: [],
    position: { x: 700, y: 100 }
  },
  {
    id: 'proj-r2-floor',
    type: 'projector',
    name: 'Room 2 Floor Projectors',
    model: 'Barco G50-W8',
    count: 5,
    room: 'room2',
    specs: {
      resolution: 'WUXGA (2K)',
      brightness: '8,900 ISO lumens',
      lens: 'G-Lens 0.65-0.75:1 zoom',
      technology: 'Laser phosphor',
      power: '375W each'
    },
    status: 'pending',
    inputs: ['signal-dvigeor-r2'],
    outputs: [],
    position: { x: 700, y: 200 }
  },

  // ============================================
  // SIGNAL TRANSPORT
  // ============================================
  {
    id: 'signal-dvigeor-r1',
    type: 'signal-transport',
    name: 'Room 1 Signal Transport',
    model: 'DVIGear DVI-7380',
    count: 12,
    room: 'room1',
    specs: {
      medium: 'OS2 single-mode fiber',
      protocol: 'DisplayPort 1.4',
      bandwidth: '25 Gbps',
      maxResolution: '4K uncompressed',
      distance: 'Up to 100m'
    },
    status: 'pending',
    inputs: ['pixera-server-1', 'pixera-server-2', 'pixera-server-3'],
    outputs: ['proj-r1-wall', 'proj-r1-floor'],
    position: { x: 100, y: 300 }
  },
  {
    id: 'signal-dvigeor-r2',
    type: 'signal-transport',
    name: 'Room 2 Signal Transport',
    model: 'DVIGear DVI-7380',
    count: 8,
    room: 'room2',
    specs: {
      medium: 'OS2 single-mode fiber',
      protocol: 'DisplayPort 1.4',
      bandwidth: '25 Gbps',
      maxResolution: '4K uncompressed',
      distance: 'Up to 100m'
    },
    status: 'pending',
    inputs: ['pixera-server-4', 'pixera-server-5'],
    outputs: ['proj-r2-wall', 'proj-r2-floor'],
    position: { x: 700, y: 300 }
  },

  // ============================================
  // MEDIA SERVERS
  // ============================================
  {
    id: 'pixera-server-1',
    type: 'media-server',
    name: 'Media Server 1',
    model: 'Pixera PX2 Octo',
    count: 1,
    room: 'server-room',
    specs: {
      formFactor: '2U rack-mount',
      outputs: '8× 4K60',
      network: '10GBase-T',
      power: '800W',
      storage: 'High-speed SSD array',
      processing: 'Real-time compositing'
    },
    status: 'pending',
    inputs: ['net-core-1', 'sync-meinberg'],
    outputs: ['signal-dvigeor-r1'],
    position: { x: 200, y: 400 }
  },
  {
    id: 'pixera-server-2',
    type: 'media-server',
    name: 'Media Server 2',
    model: 'Pixera PX2 Octo',
    count: 1,
    room: 'server-room',
    specs: {
      formFactor: '2U rack-mount',
      outputs: '8× 4K60',
      network: '10GBase-T',
      power: '800W',
      storage: 'High-speed SSD array',
      processing: 'Real-time compositing'
    },
    status: 'pending',
    inputs: ['net-core-1', 'sync-meinberg'],
    outputs: ['signal-dvigeor-r1'],
    position: { x: 300, y: 400 }
  },
  {
    id: 'pixera-server-3',
    type: 'media-server',
    name: 'Media Server 3',
    model: 'Pixera PX2 Octo',
    count: 1,
    room: 'server-room',
    specs: {
      formFactor: '2U rack-mount',
      outputs: '8× 4K60',
      network: '10GBase-T',
      power: '800W',
      storage: 'High-speed SSD array',
      processing: 'Real-time compositing'
    },
    status: 'pending',
    inputs: ['net-core-1', 'sync-meinberg'],
    outputs: ['signal-dvigeor-r1'],
    position: { x: 400, y: 400 }
  },
  {
    id: 'pixera-server-4',
    type: 'media-server',
    name: 'Media Server 4',
    model: 'Pixera PX2 Octo',
    count: 1,
    room: 'server-room',
    specs: {
      formFactor: '2U rack-mount',
      outputs: '8× 4K60',
      network: '10GBase-T',
      power: '800W',
      storage: 'High-speed SSD array',
      processing: 'Real-time compositing'
    },
    status: 'pending',
    inputs: ['net-core-2', 'sync-meinberg'],
    outputs: ['signal-dvigeor-r2'],
    position: { x: 500, y: 400 }
  },
  {
    id: 'pixera-server-5',
    type: 'media-server',
    name: 'Media Server 5',
    model: 'Pixera PX2 Octo',
    count: 1,
    room: 'server-room',
    specs: {
      formFactor: '2U rack-mount',
      outputs: '8× 4K60',
      network: '10GBase-T',
      power: '800W',
      storage: 'High-speed SSD array',
      processing: 'Real-time compositing'
    },
    status: 'pending',
    inputs: ['net-core-2', 'sync-meinberg'],
    outputs: ['signal-dvigeor-r2'],
    position: { x: 600, y: 400 }
  },

  // ============================================
  // SYNC GENERATOR
  // ============================================
  {
    id: 'sync-meinberg',
    type: 'sync-generator',
    name: 'Master Sync Generator',
    model: 'Meinberg Microsync Broadcast',
    count: 1,
    room: 'server-room',
    specs: {
      protocols: 'PTP + Tri-level genlock',
      accuracy: 'Sample-accurate',
      outputs: 'Multi-format sync',
      purpose: 'Video + audio synchronization'
    },
    status: 'pending',
    inputs: [],
    outputs: ['pixera-server-1', 'pixera-server-2', 'pixera-server-3', 'pixera-server-4', 'pixera-server-5', 'lisa-processor'],
    position: { x: 400, y: 500 }
  },

  // ============================================
  // NETWORK INFRASTRUCTURE
  // ============================================
  {
    id: 'net-core-1',
    type: 'network-switch',
    name: 'Core Switch A',
    model: 'Netgear M4500-32C',
    count: 1,
    room: 'server-room',
    specs: {
      ports: '32× 100G QSFP28',
      bandwidth: '100G backbone',
      purpose: 'Server interconnect + Room 1',
      failover: 'Redundant link to Core B'
    },
    status: 'pending',
    inputs: ['net-edge-1'],
    outputs: ['pixera-server-1', 'pixera-server-2', 'pixera-server-3', 'net-core-2'],
    position: { x: 250, y: 550 }
  },
  {
    id: 'net-core-2',
    type: 'network-switch',
    name: 'Core Switch B',
    model: 'Netgear M4500-32C',
    count: 1,
    room: 'server-room',
    specs: {
      ports: '32× 100G QSFP28',
      bandwidth: '100G backbone',
      purpose: 'Server interconnect + Room 2',
      failover: 'Redundant link to Core A'
    },
    status: 'pending',
    inputs: ['net-edge-2', 'net-core-1'],
    outputs: ['pixera-server-4', 'pixera-server-5', 'lisa-processor'],
    position: { x: 550, y: 550 }
  },
  {
    id: 'net-edge-1',
    type: 'network-switch',
    name: 'Edge Switch A',
    model: 'Netgear XSM4344C',
    count: 1,
    room: 'server-room',
    specs: {
      ports: '44× 10Gb PoE+',
      purpose: 'Room 1 AVB + sensors',
      poeBudget: 'High PoE+ for cameras'
    },
    status: 'pending',
    inputs: ['sensors-r1'],
    outputs: ['net-core-1', 'ls10-r1'],
    position: { x: 100, y: 600 }
  },
  {
    id: 'net-edge-2',
    type: 'network-switch',
    name: 'Edge Switch B',
    model: 'Netgear XSM4344C',
    count: 1,
    room: 'server-room',
    specs: {
      ports: '44× 10Gb PoE+',
      purpose: 'Room 2 AVB + sensors',
      poeBudget: 'High PoE+ for cameras'
    },
    status: 'pending',
    inputs: ['sensors-r2'],
    outputs: ['net-core-2', 'ls10-r2'],
    position: { x: 700, y: 600 }
  },

  // ============================================
  // AUDIO SYSTEM
  // ============================================
  {
    id: 'lisa-processor',
    type: 'audio-processor',
    name: 'L-ISA Processor II',
    model: 'L-Acoustics L-ISA Processor II',
    count: 1,
    room: 'server-room',
    specs: {
      inputs: '128',
      outputs: '128',
      objects: '96 spatial objects',
      sampleRate: '96kHz',
      latency: '3.2ms',
      protocol: 'Milan-AVB'
    },
    status: 'pending',
    inputs: ['net-core-2', 'sync-meinberg'],
    outputs: ['amp-r1', 'amp-r2'],
    position: { x: 400, y: 650 }
  },
  {
    id: 'ls10-r1',
    type: 'network-switch',
    name: 'Room 1 AVB Switch',
    model: 'L-Acoustics LS10',
    count: 2,
    room: 'room1',
    specs: {
      protocol: 'Milan-AVB certified',
      purpose: 'Audio network for Room 1',
      features: 'Seamless failover'
    },
    status: 'pending',
    inputs: ['net-edge-1'],
    outputs: ['amp-r1'],
    position: { x: 100, y: 700 }
  },
  {
    id: 'ls10-r2',
    type: 'network-switch',
    name: 'Room 2 AVB Switch',
    model: 'L-Acoustics LS10',
    count: 2,
    room: 'room2',
    specs: {
      protocol: 'Milan-AVB certified',
      purpose: 'Audio network for Room 2',
      features: 'Seamless failover'
    },
    status: 'pending',
    inputs: ['net-edge-2'],
    outputs: ['amp-r2'],
    position: { x: 700, y: 700 }
  },
  {
    id: 'amp-r1',
    type: 'amplifier',
    name: 'Room 1 Amplifiers',
    model: 'L-Acoustics LA7.16i CE',
    count: 4,
    room: 'room1',
    specs: {
      channels: '16 per unit',
      power: '1300W @ 8Ω',
      totalChannels: '64',
      network: 'AVB/Milan'
    },
    status: 'pending',
    inputs: ['lisa-processor', 'ls10-r1'],
    outputs: ['speakers-r1-main', 'speakers-r1-height', 'sub-r1'],
    position: { x: 100, y: 750 }
  },
  {
    id: 'amp-r2',
    type: 'amplifier',
    name: 'Room 2 Amplifiers',
    model: 'L-Acoustics LA7.16i CE',
    count: 2,
    room: 'room2',
    specs: {
      channels: '16 per unit',
      power: '1300W @ 8Ω',
      totalChannels: '32',
      network: 'AVB/Milan'
    },
    status: 'pending',
    inputs: ['lisa-processor', 'ls10-r2'],
    outputs: ['speakers-r2-main', 'speakers-r2-height', 'sub-r2'],
    position: { x: 700, y: 750 }
  },

  // Speakers - Room 1 (40 mains + 8 subs = 48 total)
  {
    id: 'speakers-r1-main',
    type: 'speaker',
    name: 'Room 1 Surround Speakers',
    model: 'L-Acoustics X8i',
    count: 20,
    room: 'room1',
    specs: {
      type: 'Main surround',
      coverage: 'Ear level 360°',
      power: 'Powered via LA7.16i',
      response: 'Full-range'
    },
    status: 'pending',
    inputs: ['amp-r1'],
    outputs: [],
    position: { x: 50, y: 850 }
  },
  {
    id: 'speakers-r1-height',
    type: 'speaker',
    name: 'Room 1 Height/Overhead',
    model: 'L-Acoustics X6i',
    count: 20,
    room: 'room1',
    specs: {
      type: 'Height/Overhead',
      coverage: 'Vertical spatial audio',
      power: 'Powered via LA7.16i',
      response: 'Full-range compact'
    },
    status: 'pending',
    inputs: ['amp-r1'],
    outputs: [],
    position: { x: 100, y: 850 }
  },
  {
    id: 'sub-r1',
    type: 'subwoofer',
    name: 'Room 1 Subwoofers',
    model: 'L-Acoustics SYVA SUB',
    count: 8,
    room: 'room1',
    specs: {
      type: 'Subwoofer',
      frequency: 'Low frequency extension',
      power: 'Powered via LA7.16i',
      placement: 'Distributed'
    },
    status: 'pending',
    inputs: ['amp-r1'],
    outputs: [],
    position: { x: 150, y: 850 }
  },

  // Speakers - Room 2 (31 mains + 8 subs = 39 total)
  {
    id: 'speakers-r2-main',
    type: 'speaker',
    name: 'Room 2 Surround Speakers',
    model: 'L-Acoustics X8i',
    count: 14,
    room: 'room2',
    specs: {
      type: 'Main surround',
      coverage: 'Ear level 360°',
      power: 'Powered via LA7.16i',
      response: 'Full-range'
    },
    status: 'pending',
    inputs: ['amp-r2'],
    outputs: [],
    position: { x: 650, y: 850 }
  },
  {
    id: 'speakers-r2-height',
    type: 'speaker',
    name: 'Room 2 Height/Overhead',
    model: 'L-Acoustics X6i',
    count: 17,
    room: 'room2',
    specs: {
      type: 'Height/Overhead',
      coverage: 'Vertical spatial audio',
      power: 'Powered via LA7.16i',
      response: 'Full-range compact'
    },
    status: 'pending',
    inputs: ['amp-r2'],
    outputs: [],
    position: { x: 700, y: 850 }
  },
  {
    id: 'sub-r2',
    type: 'subwoofer',
    name: 'Room 2 Subwoofers',
    model: 'L-Acoustics SYVA SUB',
    count: 8,
    room: 'room2',
    specs: {
      type: 'Subwoofer',
      frequency: 'Low frequency extension',
      power: 'Powered via LA7.16i',
      placement: 'Distributed'
    },
    status: 'pending',
    inputs: ['amp-r2'],
    outputs: [],
    position: { x: 750, y: 850 }
  },

  // ============================================
  // SENSORS
  // ============================================
  {
    id: 'sensors-r1',
    type: 'sensor',
    name: 'Room 1 Depth Sensors',
    model: 'Luxonis OAK 4 D Pro Wide',
    count: 28,
    room: 'room1',
    specs: {
      fov: '120° horizontal',
      depthRange: '3.4m at 1m standoff',
      processing: 'Onboard depth + neural',
      interface: 'PoE+ 2.5GbE',
      privacy: 'No facial recognition',
      purpose: 'Presence + movement tracking'
    },
    status: 'pending',
    inputs: [],
    outputs: ['net-edge-1', 'pixera-server-1', 'pixera-server-2'],
    position: { x: 50, y: 650 }
  },
  {
    id: 'sensors-r2',
    type: 'sensor',
    name: 'Room 2 Depth Sensors',
    model: 'Luxonis OAK 4 D Pro Wide',
    count: 16,
    room: 'room2',
    specs: {
      fov: '120° horizontal',
      depthRange: '3.4m at 1m standoff',
      processing: 'Onboard depth + neural',
      interface: 'PoE+ 2.5GbE',
      privacy: 'No facial recognition',
      purpose: 'Presence + movement tracking'
    },
    status: 'pending',
    inputs: [],
    outputs: ['net-edge-2', 'pixera-server-4', 'pixera-server-5'],
    position: { x: 750, y: 650 }
  }
];

// ============================================
// SIGNAL FLOW EDGES
// ============================================

export const avEdges: AVEdge[] = [
  // Video signal flow
  { id: 'v1', source: 'pixera-server-1', target: 'signal-dvigeor-r1', signalType: 'video', bandwidth: '4K60 per output', animated: true },
  { id: 'v2', source: 'pixera-server-2', target: 'signal-dvigeor-r1', signalType: 'video', bandwidth: '4K60 per output', animated: true },
  { id: 'v3', source: 'pixera-server-3', target: 'signal-dvigeor-r1', signalType: 'video', bandwidth: '4K60 per output', animated: true },
  { id: 'v4', source: 'pixera-server-4', target: 'signal-dvigeor-r2', signalType: 'video', bandwidth: '4K60 per output', animated: true },
  { id: 'v5', source: 'pixera-server-5', target: 'signal-dvigeor-r2', signalType: 'video', bandwidth: '4K60 per output', animated: true },
  
  { id: 'v6', source: 'signal-dvigeor-r1', target: 'proj-r1-wall', signalType: 'video', protocol: 'DisplayPort 1.4 over fiber' },
  { id: 'v7', source: 'signal-dvigeor-r1', target: 'proj-r1-floor', signalType: 'video', protocol: 'DisplayPort 1.4 over fiber' },
  { id: 'v8', source: 'signal-dvigeor-r2', target: 'proj-r2-wall', signalType: 'video', protocol: 'DisplayPort 1.4 over fiber' },
  { id: 'v9', source: 'signal-dvigeor-r2', target: 'proj-r2-floor', signalType: 'video', protocol: 'DisplayPort 1.4 over fiber' },

  // Audio signal flow
  { id: 'a1', source: 'lisa-processor', target: 'amp-r1', signalType: 'audio', protocol: 'Milan-AVB', animated: true },
  { id: 'a2', source: 'lisa-processor', target: 'amp-r2', signalType: 'audio', protocol: 'Milan-AVB', animated: true },
  
  { id: 'a3', source: 'amp-r1', target: 'speakers-r1-main', signalType: 'audio', protocol: 'Analog amplified' },
  { id: 'a4', source: 'amp-r1', target: 'speakers-r1-height', signalType: 'audio', protocol: 'Analog amplified' },
  { id: 'a5', source: 'amp-r1', target: 'sub-r1', signalType: 'audio', protocol: 'Analog amplified' },
  
  { id: 'a6', source: 'amp-r2', target: 'speakers-r2-main', signalType: 'audio', protocol: 'Analog amplified' },
  { id: 'a7', source: 'amp-r2', target: 'speakers-r2-height', signalType: 'audio', protocol: 'Analog amplified' },
  { id: 'a8', source: 'amp-r2', target: 'sub-r2', signalType: 'audio', protocol: 'Analog amplified' },

  // Network infrastructure
  { id: 'n1', source: 'net-core-1', target: 'pixera-server-1', signalType: 'data', bandwidth: '10Gbps', animated: true },
  { id: 'n2', source: 'net-core-1', target: 'pixera-server-2', signalType: 'data', bandwidth: '10Gbps', animated: true },
  { id: 'n3', source: 'net-core-1', target: 'pixera-server-3', signalType: 'data', bandwidth: '10Gbps', animated: true },
  { id: 'n4', source: 'net-core-2', target: 'pixera-server-4', signalType: 'data', bandwidth: '10Gbps', animated: true },
  { id: 'n5', source: 'net-core-2', target: 'pixera-server-5', signalType: 'data', bandwidth: '10Gbps', animated: true },
  { id: 'n6', source: 'net-core-2', target: 'lisa-processor', signalType: 'data', bandwidth: '100G backbone', animated: true },
  
  { id: 'n7', source: 'net-edge-1', target: 'net-core-1', signalType: 'data', bandwidth: '10Gbps' },
  { id: 'n8', source: 'net-edge-2', target: 'net-core-2', signalType: 'data', bandwidth: '10Gbps' },
  
  { id: 'n9', source: 'ls10-r1', target: 'amp-r1', signalType: 'audio', protocol: 'Milan-AVB' },
  { id: 'n10', source: 'ls10-r2', target: 'amp-r2', signalType: 'audio', protocol: 'Milan-AVB' },

  // Sensor data flow
  { id: 's1', source: 'sensors-r1', target: 'net-edge-1', signalType: 'data', bandwidth: '2.5GbE per camera', animated: true },
  { id: 's2', source: 'sensors-r2', target: 'net-edge-2', signalType: 'data', bandwidth: '2.5GbE per camera', animated: true },

  // Sync distribution
  { id: 'sync1', source: 'sync-meinberg', target: 'pixera-server-1', signalType: 'sync', protocol: 'PTP + Tri-level' },
  { id: 'sync2', source: 'sync-meinberg', target: 'pixera-server-2', signalType: 'sync', protocol: 'PTP + Tri-level' },
  { id: 'sync3', source: 'sync-meinberg', target: 'pixera-server-3', signalType: 'sync', protocol: 'PTP + Tri-level' },
  { id: 'sync4', source: 'sync-meinberg', target: 'pixera-server-4', signalType: 'sync', protocol: 'PTP + Tri-level' },
  { id: 'sync5', source: 'sync-meinberg', target: 'pixera-server-5', signalType: 'sync', protocol: 'PTP + Tri-level' },
  { id: 'sync6', source: 'sync-meinberg', target: 'lisa-processor', signalType: 'sync', protocol: 'PTP + Tri-level' }
];

// Helper functions
export const getNodesByRoom = (room: AVNode['room']) => avNodes.filter(n => n.room === room);
export const getNodesByType = (type: AVNodeType) => avNodes.filter(n => n.type === type);
export const getSignalPath = (sourceId: string, targetId: string) => {
  // Find path between two nodes
  const path: string[] = [];
  // Simple BFS could be implemented here
  return path;
};

// System totals for display
export const avSystemTotals = {
  projectors: { total: 37, room1: 24, room2: 13 },
  speakers: { 
    total: 87, 
    mains: 71,
    subs: 16,
    room1: 48, // 40 mains + 8 subs
    room2: 39  // 31 mains + 8 subs
  },
  cameras: { total: 44, room1: 28, room2: 16 },
  mediaServers: 5,
  audioObjects: 96,
  networkSpeed: '100G'
};
