/**
 * Founding Circle Membership — Structured Data
 * For: /membership page implementation
 * 
 * Design System: CRUNK
 * Status: Ready for implementation
 */

export interface MembershipTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: 'year';
  availability: {
    total: number;
    available: number;
    percentage: number;
  };
  profile: string;
  bestFor: string[];
  benefits: {
    fortune: string;
    cookie: string[];
  };
  includes: string[];
  cta: string;
  cardType: 'embossed' | 'metal' | 'premium-metal';
}

export interface Benefit {
  id: string;
  title: string;
  fortune: string;
  cookie: string[];
  icon?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

// ============================================
// TIER DATA
// ============================================

export const membershipTiers: MembershipTier[] = [
  {
    id: 'circle',
    name: 'Circle',
    price: 199,
    currency: 'EUR',
    period: 'year',
    availability: {
      total: 120,
      available: 120, // Update dynamically
      percentage: 60
    },
    profile: 'The culturally engaged Dubliner who values supporting something new',
    bestFor: [
      'Art lovers',
      'Festival-goers',
      'Cultural explorers',
      'Those wanting insider status without major commitment'
    ],
    benefits: {
      fortune: 'You are the sneezer. The early adopter whose enthusiasm is contagious. You are the person who tells ten friends that this is the most significant cultural opening in Dublin in a decade.',
      cookie: [
        '48-hour priority booking window',
        'Unlimited exhibition visits (self only)',
        'Founding Circle preview evenings (quarterly)',
        '2 bring-a-friend passes per year',
        'Monthly Founding Circle newsletter',
        'Name on founding wall (permanent)',
        'Standard membership card (numbered, embossed)',
        'Welcome pack (tote, programme, personal letter)'
      ]
    },
    includes: [
      '48-hour priority booking window',
      'Unlimited exhibition visits (self only)',
      'Founding Circle preview evenings (quarterly)',
      '2 bring-a-friend passes per year',
      'Founding Circle newsletter (monthly)',
      'Name on founding wall (permanent)',
      'Standard membership card (numbered, embossed)',
      'Welcome pack (tote, programme, personal letter)'
    ],
    cta: 'Join Circle',
    cardType: 'embossed'
  },
  {
    id: 'inner-circle',
    name: 'Inner Circle',
    price: 499,
    currency: 'EUR',
    period: 'year',
    availability: {
      total: 60,
      available: 60, // Update dynamically
      percentage: 30
    },
    profile: 'The professional who values depth, exclusivity, and early access',
    bestFor: [
      'Creative professionals',
      'Business leaders',
      'Cultural patrons',
      'Those wanting deeper engagement and guest privileges'
    ],
    benefits: {
      fortune: 'You want depth. The curator walkthrough, the artist dinner, the story behind the work. You are the person who brings visiting clients and friends from abroad — who introduces them to something they cannot find anywhere else.',
      cookie: [
        'Everything in Circle, plus:',
        '1-week priority booking window (extended)',
        'Unlimited exhibition visits (self + 1 permanent guest)',
        'Curator-led walkthroughs (quarterly, limited to 30)',
        'Behind-the-scenes studio/tech visits (1x per year)',
        '6 bring-a-friend passes per year',
        'Website founding member listing (opt-in)',
        'Premium metal membership card',
        'Enhanced welcome pack (+ hardcover catalogue, notebook)'
      ]
    },
    includes: [
      'Everything in Circle, plus:',
      '1-week priority booking window (extended)',
      'Unlimited exhibition visits (self + 1 permanent guest)',
      'Curator-led walkthroughs (quarterly, limited to 30)',
      'Behind-the-scenes studio/tech visits (1x per year)',
      '6 bring-a-friend passes per year',
      'Website founding member listing (opt-in)',
      'Premium metal membership card',
      'Enhanced welcome pack (+ hardcover catalogue, notebook)'
    ],
    cta: 'Join Inner Circle',
    cardType: 'metal'
  },
  {
    id: 'cornerstone',
    name: 'Cornerstone',
    price: 999,
    currency: 'EUR',
    period: 'year',
    availability: {
      total: 20,
      available: 20, // Update dynamically
      percentage: 10
    },
    profile: 'The patron who believes in Dublin\'s cultural future',
    bestFor: [
      'Art collectors',
      'Business leaders',
      'Philanthropists',
      'Those making a meaningful personal commitment to culture'
    ],
    benefits: {
      fortune: 'You are the patron. Your support is foundational. You sit across the table from the artist at dinner. You have the artistic director\'s email. You are not just part of Lightheart\'s story — you helped write the first chapter.',
      cookie: [
        'Everything in Inner Circle, plus:',
        'Guaranteed session availability (any session, any exhibition)',
        'Artist dinners (2x per year, limited to 25 per dinner)',
        'Direct communication line to artistic director',
        'Prominent placement on founding wall',
        '12 bring-a-friend passes per year',
        '1 gift membership included (give a Circle membership, value €199)',
        'Premium metal membership card (hand-finished)',
        'Full welcome pack (+ limited-edition artist print)'
      ]
    },
    includes: [
      'Everything in Inner Circle, plus:',
      'Guaranteed session availability (any session, any exhibition)',
      'Artist dinners (2x per year, limited to 25 per dinner)',
      'Direct communication line to artistic director',
      'Prominent placement on founding wall',
      '12 bring-a-friend passes per year',
      '1 gift membership included (give a Circle membership, value €199)',
      'Premium metal membership card (hand-finished)',
      'Full welcome pack (+ limited-edition artist print)'
    ],
    cta: 'Join Cornerstone',
    cardType: 'premium-metal'
  }
];

// ============================================
// BENEFITS DATA
// ============================================

export const membershipBenefits: Benefit[] = [
  {
    id: 'priority-access',
    title: 'Priority Access',
    fortune: 'You will never miss an exhibition. You will always be first.',
    cookie: [
      '48-hour priority booking before public ticket release',
      'Guaranteed session availability (Cornerstone tier)',
      'Unlimited visits to all exhibitions'
    ],
    icon: 'Zap'
  },
  {
    id: 'exclusive-previews',
    title: 'Exclusive Previews',
    fortune: 'Standing in the room before anyone else. Seeing the art in silence. The privilege of the first impression.',
    cookie: [
      'Founding Circle preview evening for each new exhibition (quarterly)',
      'See the work before the reviews, before the crowds',
      'Welcome drinks, remarks from artistic director',
      'Capacity: all 200 members + guests'
    ],
    icon: 'Eye'
  },
  {
    id: 'members-events',
    title: 'Members-Only Events',
    fortune: 'Access to the mind behind the work. Conversations, not presentations. The difference between seeing and knowing.',
    cookie: [
      'Curator walkthroughs (Inner Circle + Cornerstone): Quarterly, limited to 30',
      'Artist dinners (Cornerstone only): Twice yearly, 25 per dinner',
      'Behind-the-scenes visits (Inner Circle + Cornerstone): Tour the technical infrastructure',
      'Annual Founding Circle gathering (all tiers): Year-end celebration'
    ],
    icon: 'Users'
  },
  {
    id: 'guest-tickets',
    title: 'Guest Tickets',
    fortune: 'The ability to give this experience to someone you care about. The social currency of introducing someone to something extraordinary.',
    cookie: [
      'Circle: 2 bring-a-friend passes per year',
      'Inner Circle: 6 bring-a-friend passes per year',
      'Cornerstone: 12 bring-a-friend passes per year'
    ],
    icon: 'Gift'
  },
  {
    id: 'physical-recognition',
    title: 'Physical Recognition',
    fortune: 'Permanence. The knowledge that your name is part of the building\'s story.',
    cookie: [
      'Your name on the founding wall (permanent, in-gallery)',
      'Annual report acknowledgment',
      'Website founding member listing (opt-in, Inner Circle + Cornerstone)',
      'Premium tiers receive prominent placement on the wall'
    ],
    icon: 'Award'
  },
  {
    id: 'membership-card',
    title: 'Membership Card',
    fortune: 'An object you carry that reminds you who you are.',
    cookie: [
      'Designed by RAD as part of the brand system',
      'Individually numbered (001–200)',
      'Year of founding inscribed (2026)',
      'Circle tier: Heavy-stock card, embossed numbering',
      'Inner Circle + Cornerstone: Metal card (anodised aluminium or brass)'
    ],
    icon: 'CreditCard'
  },
  {
    id: 'welcome-pack',
    title: 'Welcome Pack',
    fortune: 'The feeling of being personally received, not processed.',
    cookie: [
      'Circle: Tote bag, exhibition programme, personal letter from artistic director',
      'Inner Circle: All of Circle + hardcover exhibition catalogue, branded notebook',
      'Cornerstone: All of Inner Circle + limited-edition print from opening exhibition artist',
      'Handwritten signature on every letter (minimum)',
      'Packaging reflects exhibition-quality production values'
    ],
    icon: 'Package'
  },
  {
    id: 'insider-communication',
    title: 'Insider Communication',
    fortune: 'Knowing things the public does not. The pleasure of depth in a world of surfaces.',
    cookie: [
      'Monthly Founding Circle newsletter (insider content, behind-the-scenes)',
      'Early access to exhibition announcements (before press, before public)',
      'Production diaries, video content, artist interviews',
      'Direct email line to artistic director (Cornerstone only, with response commitment)'
    ],
    icon: 'Mail'
  }
];

// ============================================
// FAQ DATA
// ============================================

export const membershipFAQ: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What happens if the Founding Circle doesn\'t reach 200 members?',
    answer: 'The programme proceeds regardless. The 200-member cap is a maximum, not a minimum. Whether we have 50 or 200 founding members, those who join retain their founding designation permanently. The scarcity is real, but the community is what matters.'
  },
  {
    id: 'faq-2',
    question: 'Can I upgrade my tier later?',
    answer: 'Yes, you can upgrade at any time during your membership year by paying the difference. However, tier availability is subject to remaining capacity in that tier. If a tier is sold out, you will be placed on a waitlist for upgrades.'
  },
  {
    id: 'faq-3',
    question: 'What happens if I don\'t renew after the first year?',
    answer: 'Your founding designation on the wall remains permanent — this is a promise we make at joining and never break. However, active benefits (priority booking, events, newsletter, guest passes) cease. If you wish to rejoin later, you may do so at the then-current rate (not the founding price). The founding price is a reward for continuity.'
  },
  {
    id: 'faq-4',
    question: 'Can I bring guests to the preview evenings?',
    answer: 'Founding Circle preview evenings include the member plus one guest. Additional guest tickets may be purchased depending on capacity. Your bring-a-friend passes can also be used for regular exhibition visits.'
  },
  {
    id: 'faq-5',
    question: 'Is this a charitable donation? Can I get tax relief?',
    answer: 'No. The Founding Circle is a membership programme, not a charitable donation. You are receiving substantial benefits in exchange for your membership fee. No tax relief applies.'
  },
  {
    id: 'faq-6',
    question: 'When will I receive my membership card and welcome pack?',
    answer: 'Welcome packs are sent within 14 days of joining. Membership cards are individually numbered and produced in batches. You will receive your card before the gallery opens in September 2026. If you join after opening, your pack ships within 14 days.'
  },
  {
    id: 'faq-7',
    question: 'What if I move away from Dublin? Can I still be a member?',
    answer: 'Yes. Many founding members may not visit every exhibition. The membership maintains your connection to Lightheart, your founding status, and your access to exclusive digital content. If you relocate permanently, you may transfer your membership to a Dublin-based friend or family member (one-time transfer).'
  },
  {
    id: 'faq-8',
    question: 'How do I use my benefits?',
    answer: 'All benefits are managed through your member portal. Priority booking opens automatically for members before public release. Event invitations are sent by email with RSVP links. Guest passes are digital codes you can share. The artistic director\'s direct line (Cornerstone) is an email address with a 48-hour response commitment.'
  }
];

// ============================================
// PAGE META
// ============================================

export const membershipPageMeta = {
  title: 'The Founding Circle — Membership | Lightheart Immersive Gallery',
  description: 'Join Lightheart\'s Founding Circle. Limited to 200 members. Priority access, exclusive events, permanent recognition. From €199/year.',
  ogImage: '/images/membership-og.jpg', // Placeholder
  totalCapacity: 200,
  foundingYear: 2026,
  galleryOpening: '2026-09-12'
};

// ============================================
// COMPARISON TABLE CONFIG
// ============================================

export const comparisonTableConfig = {
  rows: [
    { label: 'Price', key: 'price', format: 'currency' },
    { label: 'Priority booking', key: 'priorityBooking' },
    { label: 'Unlimited visits', key: 'unlimitedVisits' },
    { label: 'Preview evenings', key: 'previewEvenings' },
    { label: 'Curator walkthroughs', key: 'curatorWalkthroughs' },
    { label: 'Artist dinners', key: 'artistDinners' },
    { label: 'Behind-the-scenes', key: 'behindScenes' },
    { label: 'Bring-a-friend passes', key: 'guestPasses' },
    { label: 'Gift membership', key: 'giftMembership' },
    { label: 'Direct director line', key: 'directorLine' },
    { label: 'Membership card', key: 'membershipCard' },
    { label: 'Welcome pack', key: 'welcomePack' },
    { label: 'Name on founding wall', key: 'foundingWall' },
    { label: 'Website listing', key: 'websiteListing' }
  ],
  tiers: ['circle', 'inner-circle', 'cornerstone']
};

// ============================================
// CTA COPY
// ============================================

export const membershipCTA = {
  hero: {
    primary: 'Apply Now',
    secondary: 'Learn More'
  },
  tiers: {
    circle: 'Join Circle',
    innerCircle: 'Join Inner Circle',
    cornerstone: 'Join Cornerstone'
  },
  final: {
    primary: 'Apply Now →',
    secondary: 'Contact us with questions',
    trust: [
      'Secure payment processed by Stripe',
      'Cancel anytime within 14 days for full refund',
      'Questions? Email: founding@lightheart.ie'
    ]
  }
};

// ============================================
// HERO COPY
// ============================================

export const membershipHero = {
  headline: 'Join the Founding Circle',
  subheadline: 'Be one of 200 people who believed in Lightheart before the doors opened. Priority access. Exclusive events. A permanent place in our story.',
  supporting: '€199–€999/year • Limited to 200 members • Founding designation permanent'
};

// ============================================
// SCARCITY DATA
// ============================================

export const membershipScarcity = {
  totalCapacity: 200,
  currentMembers: 0, // Update dynamically from backend
  remainingPlaces: 200, // Update dynamically
  isOpen: true,
  phases: [
    { name: 'Warm Network', target: 50, period: 'June 2026, Weeks 1-2' },
    { name: 'Extended Network', target: 100, period: 'June 2026, Weeks 3-5' },
    { name: 'Public Waitlist', target: 50, period: 'July 2026' }
  ]
};

// Helper function to format price
export const formatPrice = (price: number, currency: string = 'EUR'): string => {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  }).format(price);
};

// Helper to get tier by ID
export const getTierById = (id: string): MembershipTier | undefined => {
  return membershipTiers.find(tier => tier.id === id);
};

// Helper to get all benefits for a tier
export const getTierBenefits = (tierId: string): string[] => {
  const tier = getTierById(tierId);
  return tier?.includes || [];
};

export default {
  tiers: membershipTiers,
  benefits: membershipBenefits,
  faq: membershipFAQ,
  meta: membershipPageMeta,
  cta: membershipCTA,
  hero: membershipHero,
  scarcity: membershipScarcity
};
