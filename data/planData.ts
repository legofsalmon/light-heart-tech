/* ────────────────────────────────────────
   PR & Marketing Master Plan — Structured Data
   Extracted from plan.html (94KB)
   ──────────────────────────────────────── */

export interface PlanSection {
  id: string;
  num: string;
  title: string;
  content: SectionContent[];
}

export type SectionContent =
  | { type: 'text'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'heading'; level: 3 | 4; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'pre'; text: string }
  | { type: 'cards'; items: { title: string; text: string; color?: string }[] }
  | { type: 'status-list'; items: { status: 'complete' | 'critical' | 'planned'; text: string }[] };

export const PLAN_SECTIONS: PlanSection[] = [
  {
    id: 'sec1', num: '1', title: 'Project Overview',
    content: [
      { type: 'heading', level: 3, text: 'What is Lightheart?' },
      { type: 'text', text: 'A world-class immersive gallery in Dublin, located on the quays near the Guinness Storehouse. Quarterly changing exhibitions that balance large-scale populist "hero" shows with smaller, niche, community-led programming.' },
      { type: 'heading', level: 3, text: 'Key Facts' },
      { type: 'table', headers: ['Item', 'Detail'], rows: [
        ['Location', 'Dublin quays, near Guinness Storehouse'],
        ['Buildings purchased', 'Summer 2024'],
        ['Total investment', '~€4-4.5m'],
        ['Projection rooms', '2 rooms, 37 Barco projectors (4K + 2K), mapped floors'],
        ['Sound system', 'L-ISA, 87 L-Acoustics speakers (71 mains + 16 subs), 96 spatial audio objects'],
        ['Target opening', 'September 2026'],
        ['Programming model', 'Quarterly changeover exhibitions'],
        ['Year 1 priority', '3 major populist shows (financial recovery focus)'],
      ]},
      { type: 'heading', level: 3, text: 'Construction Status (as of Mar 9, 2026)' },
      { type: 'status-list', items: [
        { status: 'complete', text: 'Buildings purchased' },
        { status: 'complete', text: 'Roof replacement & internal supports completed (2024)' },
        { status: 'complete', text: 'Architect engaged (since October 2024)' },
        { status: 'complete', text: 'Multiple contractors active on-site' },
        { status: 'complete', text: 'Planning application submitted (2 weeks ago)' },
        { status: 'critical', text: 'Fire certification submission — targeted within next 2 weeks (CRITICAL PATH)' },
        { status: 'planned', text: 'Level-setting works — contractor paused pending finalized levels' },
        { status: 'planned', text: 'Fire certification approval — critical to September opening' },
      ]},
    ],
  },
  {
    id: 'sec2', num: '2', title: 'Curatorial Philosophy & Brand DNA',
    content: [
      { type: 'text', text: 'Four founding principles that govern all communications and programming:' },
      { type: 'heading', level: 3, text: 'Principle 1: Independence' },
      { type: 'text', text: 'Lightheart retains full editorial and curatorial independence. External funding is acceptable but never at the cost of programmatic freedom.' },
      { type: 'text', text: 'Comms implication: Messaging must signal strength of conviction without being combative. Position as self-funded, self-directed, beholden to no agenda.' },
      { type: 'heading', level: 3, text: 'Principle 2: Future Optimism' },
      { type: 'text', text: 'The gallery embraces AI, robotics, spatial audio, 3D, sensor technology — not to warn about the future but to show what\'s possible. Counter the prevailing doom narrative in contemporary art.' },
      { type: 'text', text: 'Comms implication: Tone should be energising and forward-looking. Avoid catastrophism. Show technology as empowering.' },
      { type: 'heading', level: 3, text: 'Principle 3: Awe' },
      { type: 'text', text: 'Collective wonder over individual spectacle. Communal experiences where audiences feel profound awe together. Constantly push boundaries of what\'s technically possible.' },
      { type: 'text', text: 'Comms implication: Visual content must convey scale and wonder. BTS content showing the mechanism builds credibility.' },
      { type: 'heading', level: 3, text: 'Principle 4: Pluralism' },
      { type: 'text', text: 'Everyone\'s story can be told. Ideas should be challenged through art, not censored. Resist the culture of cancellation. Focus on shared humanity rather than identity categories.' },
    ],
  },
  {
    id: 'sec3', num: '3', title: 'Process & Method: The Unified Toolkit',
    content: [
      { type: 'quote', text: 'Lightheart uses six methodological tools in tandem. Five are drawn from marketing strategy. One — the Triple Stack Model — comes from Kev Freeney\'s practice-based research into embodied perception and immersive art. None of these tools operates alone.' },
      { type: 'heading', level: 3, text: 'The Six Tools at a Glance' },
      { type: 'table', headers: ['Tool', 'Source', 'What It Does for Us', 'When We Reach for It'], rows: [
        ['Triple Stack Model (TSM)', 'Kev Freeney, MA Thesis (NCAD/UL 2025)', 'Three-layer audit: infrastructure → embodied perception → relational space', 'Exhibition design, space planning, visitor journey, staff training'],
        ['Alchemy', 'Rory Sutherland', 'Psycho-logic over logic. Reframe how people perceive value.', 'Pricing perception, queue design, naming, counter-intuitive positioning'],
        ['Purple Cow / Sneezers', 'Seth Godin', 'Be remarkable or be invisible. Identify and activate the spreaders.', 'Launch mechanics, Founding Circle, referral loops, content that earns attention'],
        ['6 Principles of Persuasion', 'Robert Cialdini', 'Reciprocity, commitment, social proof, authority, liking, scarcity.', 'CTA design, testimonials, early-bird offers, partnership leverage'],
        ['Story-Driven / Fortune Cookie', 'Bernadette Jiwa', 'Start with how the customer feels, not what you sell.', 'Brand narrative, tone of voice, website copy, press angles'],
        ['RACE Model', 'Helen McNulty / Smart Insights', 'Reach → Act → Convert → Engage. Structured digital funnel.', 'Channel planning, KPI setting, campaign structure, analytics'],
      ]},
      { type: 'heading', level: 3, text: 'How the Tools Work Together' },
      { type: 'text', text: 'A practical example — planning the Founding Circle launch:' },
      { type: 'table', headers: ['Tool', 'Contribution'], rows: [
        ['TSM', 'Design the preview night as a concrescence event — check all three stacks'],
        ['Sutherland', 'Price the tiers using psycho-logic. Frame the €250 tier as "less than a euro a day."'],
        ['Godin', 'Identify the 50 sneezers who\'ll tell 500. Give them something remarkable.'],
        ['Cialdini', 'Scarcity (200 places), commitment (annual = identity), social proof (waiting list counter).'],
        ['Jiwa', 'Lead with the feeling: "You were there before anyone else." Not the features.'],
        ['McNulty', 'Map the funnel: Instagram reach → landing page act → checkout convert → member community engage.'],
      ]},
      { type: 'text', text: 'Every major deliverable in this plan can be stress-tested against all six. If a decision only satisfies one tool, it\'s probably incomplete.' },
      { type: 'heading', level: 3, text: 'The Triple Stack Model — In Detail' },
      { type: 'text', text: 'The TSM provides a three-layer audit for any experience, exhibition, or event. It asks: Are the conditions right? Does the body know? Is the transition handled?' },
      { type: 'heading', level: 4, text: 'Global Stack — Infrastructure & Systems' },
      { type: 'table', headers: ['Plane', 'Operational Check'], rows: [
        ['Ground', 'Electrical, HVAC, safety — the felt capacity of the room'],
        ['Runtime', 'Media server, clock sync, playback — the room\'s beat'],
        ['Circulation', 'Visitor flow, entry sequence, dwell timing, exit legibility'],
        ['Channels', 'Consent protocol, photography policy, GDPR, recording disclosure'],
        ['Frames', 'Sightlines, luminance, caption readability, response timing'],
        ['Roles', 'Staff positions, visitor roles, steward training'],
        ['Horizons', 'Quarterly review cycle, metric definitions, programme direction'],
      ]},
      { type: 'heading', level: 4, text: 'Internal Stack — Embodied Perception' },
      { type: 'table', headers: ['Plane', 'Operational Check'], rows: [
        ['Root', 'Floor surface, seating, temperature — physical grounding'],
        ['Sacral', 'Exhibition pacing, emotional arc, transition timing'],
        ['Solar Plexus', 'Visitor choice architecture, opt-in/opt-out, intensity zones'],
        ['Heart', 'Co-regulation, group pacing, shared perception moments'],
        ['Throat', 'Staff language guide, signage tone, visitor communication'],
        ['Third Eye', 'Attention design, gaze direction, flicker safety'],
        ['Crown', 'Exit experience, reflection space, post-visit integration'],
      ]},
      { type: 'heading', level: 4, text: 'External Stack — Transition & Relational Space' },
      { type: 'table', headers: ['Plane', 'Operational Check'], rows: [
        ['Space', 'Sightline testing, route mapping, spatial verification'],
        ['Portal (Threshold)', 'Entry count-in, consent line, exit cue visibility'],
        ['Gesture', 'Movement pacing, accessible alternatives, abort protocol'],
        ['Mirror', 'Feedback systems, echo design, visitor state indicators'],
        ['Narrative', 'Visitor journey arc, change log, offboarding sequence'],
        ['Atmosphere', 'Luminance/warmth/air ranges, SPL caps, quiet pockets'],
        ['Feedback Loop', 'Learning cycles, data collection, posted change process'],
      ]},
      { type: 'heading', level: 4, text: 'Concrescence — When the Stacks Converge' },
      { type: 'text', text: 'The moment when all three stacks align into temporary unity — infrastructure, perception, and participation cohere. Opening night is the first concrescence. Each exhibition opening thereafter is another. The quarterly rhythm creates a cycle the city can organise around.' },
      { type: 'heading', level: 3, text: 'T.E.M.P.O. — The Communication Method' },
      { type: 'table', headers: ['Step', 'Action', 'Example: "Immersive Art"'], rows: [
        ['Term', 'Define in plain language', '"Art that surrounds you — projected on every surface, with sound that moves through the room."'],
        ['Emergence', 'Where does this come from?', '"Started with teamLab in Japan, Meow Wolf in the US. Now a global movement."'],
        ['Materialisation', 'How does it appear at Lightheart?', '"37 projectors, 87 speakers, floors included. You walk through it."'],
        ['Positioning', 'How does it relate to what people know?', '"Not a museum. Not a theme park. The gallery where you stand inside the art."'],
        ['Operation', 'How does it function in our system?', '"New exhibition every quarter. Each one a completely new world."'],
      ]},
      { type: 'heading', level: 3, text: '4E Cognition — Why the Experience Works' },
      { type: 'list', items: [
        'Embodied: Exhibitions engage the body, not just the eye — this is why the floor is projected too',
        'Embedded: The gallery\'s physical environment actively patterns attention and movement',
        'Extended: Technology participates in perception — it\'s not a screen you watch, it\'s an extension of how you sense the room',
        'Enactive: The visitor\'s experience is enacted through their movement, not passively received — this is what separates Lightheart from cinema',
      ]},
    ],
  },
  {
    id: 'sec4', num: '4', title: 'Strategic Positioning',
    content: [
      { type: 'heading', level: 3, text: 'Core Strategic Mantra' },
      { type: 'quote', text: 'Build credibility first. Build clarity second. Build noise last.' },
      { type: 'heading', level: 3, text: 'Layer 1 — The Core Product (Homepage level)' },
      { type: 'list', items: [
        'A world-class immersive gallery in Dublin',
        'Quarterly changing exhibitions',
        'High quality audiovisual work',
        'Ticketed cultural destination',
        'Clear visitor promise',
      ]},
      { type: 'heading', level: 3, text: 'Layer 2 — The Ambition (About page level)' },
      { type: 'list', items: [
        'Community infrastructure for digital art',
        'Digital art advocacy & policy positioning',
        'Education alignment (NCAD, Trinity, schools)',
        'R&D possibilities',
        'Future pipeline & artist development',
      ]},
      { type: 'text', text: 'Rule: If the ambition narrative overtakes the core offer, you lose clarity. Layer 2 enriches Layer 1 but never replaces it.' },
      { type: 'heading', level: 3, text: 'What Lightheart Is NOT' },
      { type: 'table', headers: ['Not this', 'Why'], rows: [
        ['Instagram trap / selfie museum', 'Commodified spectacle. Two illusion galleries on Dame Street already occupy this space.'],
        ['One-room optical gimmick', 'Existing Dublin "immersive" offerings are described as gimmicky and child-focused.'],
        ['Tourist trap', 'Lightheart aims to be the venue people actively recommend, not stumble into.'],
        ['Trend-driven product', 'Brand must have timelessness and institutional longevity.'],
        ['5-channel social media blitz', 'Controlled visibility > noise. Intros > social media.'],
      ]},
      { type: 'heading', level: 3, text: 'Key Differentiator: Quarterly Changeover' },
      { type: 'list', items: [
        'Freshness & repeat visits',
        'Membership potential',
        'Media hooks every quarter',
        'An ongoing story to tell',
        'Cultural rhythm',
      ]},
    ],
  },
  {
    id: 'sec5', num: '5', title: 'Audience Segmentation',
    content: [
      { type: 'heading', level: 3, text: 'Primary: General Public (Experience-Seekers)' },
      { type: 'table', headers: ['Element', 'Detail'], rows: [
        ['Who', 'Dublin residents, domestic tourists, international visitors (14+)'],
        ['Key message', 'A new kind of cultural experience in Dublin — see art that surrounds you'],
        ['Proof points', 'Quarterly changing exhibitions, world-class technology, curated not gimmicky'],
        ['Desired action', 'Buy tickets, subscribe to newsletter, share experience'],
        ['Best channel', 'Instagram (visual credibility), Website (SEO/search), Tourism listings'],
      ]},
      { type: 'heading', level: 3, text: 'Secondary: Creative Community (Artists & Designers)' },
      { type: 'table', headers: ['Element', 'Detail'], rows: [
        ['Who', 'Digital artists, designers, NCAD/Trinity students, tech-art practitioners'],
        ['Key message', 'A serious space for serious work — infrastructure built for artists'],
        ['Proof points', 'Tech specs (37 Barco projectors, L-ISA spatial audio), artist-first programming, open calls'],
        ['Desired action', 'Submit work, attend events, advocate within community'],
        ['Best channel', 'LinkedIn, direct outreach, artist networks, website tech-spec page'],
      ]},
      { type: 'heading', level: 3, text: 'Tertiary: Institutions (Education, Councils, Funders, Tourism)' },
      { type: 'table', headers: ['Element', 'Detail'], rows: [
        ['Who', 'Dublin City Council, Failte Ireland, Arts Council, universities, schools'],
        ['Key message', 'Lightheart is infrastructure — it raises Ireland\'s cultural capacity'],
        ['Proof points', 'Investment scale, governance structure, education alignment, quarterly model'],
        ['Desired action', 'Partner, list venue, refer visitors, co-fund programmes'],
        ['Best channel', 'LinkedIn, direct email, governance page, institutional language'],
      ]},
    ],
  },
  {
    id: 'sec6', num: '6', title: 'Brand Identity Status',
    content: [
      { type: 'table', headers: ['Item', 'Status'], rows: [
        ['Brand agency', 'RAD (David Lawler + Brian) — confirmed Mar 9'],
        ['Meeting cadence', 'Rolling Tuesdays'],
        ['Design direction', 'European/Swiss style, timeless, not trendy. Striking, bold, simple.'],
        ['Name', '"Lightheart" preferred as one word'],
        ['Trademark risk', 'Ireland-only jurisdiction may reduce risk. May need modifier: "Lightheart Immersive"'],
        ['Brand system', 'Needs to flex between "arty/experimental" and "family-friendly/accessible"'],
        ['Typography', 'Identified as critical connective thread'],
        ['Deliverables', 'Brand identity, key assets, website front-end & back-end'],
        ['Invoice', '50% deposit sent'],
      ]},
      { type: 'heading', level: 3, text: 'Brand System Components Needed' },
      { type: 'list', items: [
        'Logo system (primary + variations for extensions: Lightheart Cafe, Lightheart Club)',
        'Typography system (flex between experimental and accessible)',
        'Colour system',
        'Graphic devices & systematic layout structures',
        'Watermark rules',
        'End-cards (video)',
        'Lower-thirds',
        'Caption style',
        'Credits format',
        'Brand stack document (for onboarding)',
      ]},
    ],
  },
  {
    id: 'sec7', num: '7', title: 'The 5-Phase Marketing Timeline',
    content: [
      { type: 'pre', text: 'MAR           APR           MAY           JUN           JUL           AUG           SEP\n|── FOUNDATIONS ──|── CONTROLLED ──|── PRE-LAUNCH BUILD ─────|── LAUNCH ──|── RHYTHM ──|\n     Wk 1-6           VISIBILITY         Wk 9-18              Wk 19-22     Wk 23+\n                       Wk 5-8' },
      { type: 'table', headers: ['Phase', 'Period', 'Focus', 'Key Deliverable'], rows: [
        ['1. Foundations', 'Mar 1 - Apr 11', 'Positioning, website architecture, SEO, personas, analytics', 'Lean but strong website live'],
        ['2. Controlled Visibility', 'Apr 12 - May 30', 'Content pillars, social channels, newsletter, editorial calendar', '3-month content calendar + email funnel'],
        ['3. Pre-Launch Build', 'Jun 1 - Jul 31', 'Press materials, photography, video, asset bank, invite previews', 'Press outreach schedule + asset bank'],
        ['4. Launch', 'Aug 1 - Aug 31', 'Countdown campaign, press embargo, partnerships, paid ads test', 'Gallery launch'],
        ['5. Post-Launch Rhythm', 'Sep 1+', 'Quarterly exhibition cycle, data tracking, annual programming', 'Annual programming marketing calendar'],
      ]},
    ],
  },
  {
    id: 'sec8', num: '8', title: 'Phase 1: Foundations (Wk 1-6)',
    content: [
      { type: 'quote', text: 'Mantra: Document → Credibility → Foundations' },
      { type: 'heading', level: 3, text: '8.1 Strategy & Positioning' },
      { type: 'table', headers: ['ID', 'Task', 'Owner', 'Dates', 'Status'], rows: [
        ['M1-01', 'Draft purpose statements', 'Kev', 'Mar 1-7', 'Planned'],
        ['M1-02', 'Define category language', 'Kev', 'Mar 2-7', 'Planned'],
        ['M1-03', 'Define 3 primary audience groups', 'Kev', 'Mar 8-14', 'Planned'],
        ['—', 'Define tone of voice', 'Kev', 'Mar 15-21', 'Planned'],
        ['—', 'Clarify quarterly programming model', 'Kev', 'Mar 15-21', 'Planned'],
      ]},
      { type: 'heading', level: 3, text: '8.2 Documentation & Space Capture' },
      { type: 'table', headers: ['ID', 'Task', 'Owner', 'Dates', 'Status'], rows: [
        ['M1-04', 'Documentation plan', 'Producer', 'Mar 1-7', 'Planned'],
        ['M1-05', 'Photo shoot (space)', 'Video lead', 'Mar 8-11', 'Planned'],
        ['M1-06', 'Tech spec capture', 'Producer', 'Mar 10-14', 'Planned'],
      ]},
      { type: 'heading', level: 3, text: '8.3 Digital Presence' },
      { type: 'table', headers: ['ID', 'Task', 'Owner', 'Dates', 'Status'], rows: [
        ['M1-07', 'Website sitemap', 'Web dev', 'Mar 1-10', 'Planned'],
        ['M1-08', 'Website copy v1', 'Kev', 'Mar 15-21', 'Planned'],
        ['M1-11', 'Analytics baseline', 'Data', 'Mar 22-28', 'Planned'],
      ]},
    ],
  },
  {
    id: 'sec9', num: '9', title: 'Phase 2: Controlled Visibility (Wk 5-8)',
    content: [
      { type: 'quote', text: 'Mantra: Content System → Series → Controlled Visibility' },
      { type: 'heading', level: 3, text: '9.1 Website MVP & SEO' },
      { type: 'table', headers: ['ID', 'Task', 'Owner', 'Dates', 'Status'], rows: [
        ['M2-01', 'Website MVP build', 'Web dev', 'Mar 29 - Apr 7', 'Planned'],
        ['M2-02', 'SEO hygiene', 'Web dev', 'Mar 29 - Apr 7', 'Planned'],
      ]},
      { type: 'heading', level: 3, text: '9.2 Content System' },
      { type: 'table', headers: ['ID', 'Task', 'Owner', 'Dates', 'Status'], rows: [
        ['M2-03', 'Content pillars matrix', 'Comms lead', 'Mar 29 - Apr 4', 'Planned'],
        ['M2-04', 'Editorial calendar 90 days', 'Comms lead', 'Mar 29 - Apr 7', 'Planned'],
      ]},
      { type: 'heading', level: 3, text: 'Content Pillars Matrix' },
      { type: 'table', headers: ['Pillar', 'What it covers', 'Content types', 'Primary audience'], rows: [
        ['The Work', 'Exhibitions, installations, artist features', 'Hero video, artist profiles, exhibition teasers', 'Public + Creative'],
        ['The Mechanism', 'BTS, tech specs, how it works', 'BTS reels, tech breakdowns, space walkthroughs', 'Creative + Institutions'],
        ['The People', 'Artists, team, community', 'Interviews, founder stories, community features', 'All'],
        ['The Why', 'Vision, philosophy, cultural positioning', 'Long-form LinkedIn, think pieces, governance updates', 'Institutions + Creative'],
      ]},
    ],
  },
  {
    id: 'sec10', num: '10', title: 'Phase 3: Pre-Launch Build (Wk 9-18)',
    content: [
      { type: 'quote', text: 'Mantra: Asset Creation → Press Readiness → Community Seeding' },
      { type: 'heading', level: 3, text: 'Channel Setup & Content Release' },
      { type: 'table', headers: ['ID', 'Task', 'Dates', 'Output'], rows: [
        ['M3-01', 'Channel setup — IG, TikTok, LinkedIn', 'Apr 26-28', 'Profiles live'],
        ['M3-02', 'Publish Agustin / Glasseye XR feature', 'Apr 27 - May 3', 'Agustin release week'],
        ['M3-03', 'Publish Immersive Literacy series', 'May 3-17', 'Series live'],
        ['M3-04', 'Interview series v1', 'May 3-12', 'Interview pack v1'],
      ]},
      { type: 'heading', level: 3, text: 'Press Materials' },
      { type: 'table', headers: ['Task', 'Dates', 'Output'], rows: [
        ['Draft master press release', 'Jun 1-14', 'Press kit'],
        ['Cultural long-form pitch', 'Jun 8-21', 'Pitch document'],
        ['Behind-the-scenes feature pitch', 'Jun 15-28', 'Pitch document'],
        ['Tourism positioning pitch', 'Jun 22 - Jul 5', 'Pitch document'],
        ['Build press list', 'Jun 29 - Jul 12', 'Media list'],
      ]},
    ],
  },
  {
    id: 'sec11', num: '11', title: 'Phase 4: Launch (Wk 19-22)',
    content: [
      { type: 'table', headers: ['Task', 'Dates', 'Notes'], rows: [
        ['Countdown campaign planning', 'Aug 1-7', 'Social countdown sequence'],
        ['Press embargo coordination', 'Aug 8-14', 'Embargo + exclusive access for key journalists'],
        ['Personal intro invites', 'Aug 8-21', 'Warm invitations to key cultural figures'],
        ['LinkedIn founder story', 'Aug 15-21', 'Kev\'s personal narrative — the journey to opening'],
        ['DCC website feature', 'Aug 15-28', 'Dublin City Council cultural listing'],
        ['Small budget paid ads test', 'Aug 22-31', 'First paid campaign — test & learn'],
      ]},
      { type: 'heading', level: 3, text: 'Launch Week Checklist' },
      { type: 'list', items: [
        'Press embargo lifts',
        'Website fully live with exhibition content',
        'Ticket sales open',
        'Social channels active with countdown content',
        'Newsletter announcement sent',
        'Key media coverage lands',
        'Invite-only preview event held',
        'DCC listing live',
        'Google Business profile active',
      ]},
    ],
  },
  {
    id: 'sec12', num: '12', title: 'Phase 5: Post-Launch Rhythm (Wk 23+)',
    content: [
      { type: 'heading', level: 3, text: 'Ongoing Rhythm' },
      { type: 'list', items: [
        'Quarterly: New exhibition launch → press cycle → content burst → review',
        'Monthly: Newsletter, KPI review, editorial calendar update',
        'Weekly: 1-2 posts per channel, community engagement',
        'Continuous: Feedback loop → editorial calendar updates → website copy improvements',
      ]},
    ],
  },
  {
    id: 'sec13', num: '13', title: 'Content Clusters & Production Pipeline',
    content: [
      { type: 'heading', level: 3, text: 'Central Hub Nodes' },
      { type: 'list', ordered: true, items: [
        'Feedback Loop — Audience responses, analytics insights, and stakeholder feedback continuously refine the editorial calendar and website copy.',
        'Asset Library / DAM — Every photo, video, render, and document feeds into a central library. All channels pull from this single source.',
        'Website as Source of Truth — The website is the canonical source. Social media drives traffic to the website.',
      ]},
      { type: 'heading', level: 3, text: 'Critical Cross-Links' },
      { type: 'pre', text: 'Photography + Video → Asset Library → Website → Every channel\nTech Spec Capture → Rental Partners → Equipment Spec Sheets → Press kit + Artist onboarding\nAgustin Vidal Saavedra / Glasseye XR shoot → Artist Series → Reels/TikTok → Website feature page\nTerminology Explainers → References map → Interview series → Website articles\nPublic brainstorm → Governance node → LinkedIn credibility → Press angles\nFeedback loop → Editorial calendar updates → Website copy improvements' },
    ],
  },
  {
    id: 'sec14', num: '14', title: 'Channel Strategy',
    content: [
      { type: 'heading', level: 3, text: 'Channel Hierarchy' },
      { type: 'table', headers: ['Priority', 'Channel', 'Purpose', 'Audience', 'Cadence'], rows: [
        ['1', 'Website', 'Source of truth, SEO, ticketing, newsletter capture', 'All', 'Continuous updates'],
        ['2', 'Instagram Reels', 'Visual credibility, artist-led clips, BTS, scale shots', 'Public + Creative', '1-2 posts/week'],
        ['3', 'LinkedIn', 'Partnerships, governance, institutional language', 'Institutions + Creative', '1 post/week'],
        ['4', 'TikTok', 'Educational series, terminology, fast references', 'Public (younger)', '1-2 posts/week'],
        ['5', 'Newsletter', 'Direct relationship, exhibition announcements', 'Warm audience', '1/month'],
      ]},
      { type: 'heading', level: 3, text: 'What NOT to Do (Strategic Guardrails)' },
      { type: 'list', items: [
        'Do NOT launch 5 social channels simultaneously',
        'Do NOT burn budget on paid ads before organic credibility is established',
        'Do NOT oversell "National Centre" language too soon',
        'Do NOT frame as tourist selfie venue',
        'Do NOT compete with illusion galleries on their terms',
        'Do NOT use generic social media templates — every piece must feel intentional',
      ]},
    ],
  },
  {
    id: 'sec15', num: '15', title: 'Press & PR Strategy',
    content: [
      { type: 'heading', level: 3, text: 'Press Narrative Angles' },
      { type: 'table', headers: ['Angle', 'Target Publications', 'Hook'], rows: [
        ['Cultural long-form', 'Irish Times Arts, Journal of Music, Totally Dublin', 'New kind of cultural space opens in Dublin'],
        ['Behind-the-scenes / tech', 'Silicon Republic, Tech Central, Wired UK', 'The tech behind immersive art'],
        ['Tourism positioning', 'Irish Independent Travel, Lonely Planet, Failte Ireland', 'Dublin\'s newest must-visit cultural destination'],
        ['Founder story', 'Business Post, Irish Examiner, LinkedIn', 'From NCAD to €4.5m gallery'],
        ['Artist feature', 'Visual Artists Ireland, Paper Visual Art', 'Agustin Vidal Saavedra / Glasseye XR residency \u2014 first artist to activate the space'],
      ]},
      { type: 'heading', level: 3, text: 'Press Kit Contents (Target: June)' },
      { type: 'list', items: [
        'Master press release',
        'Founder bio + headshot',
        'Space fact sheet (tech specs, dimensions)',
        '10-15 hero photographs (high-res)',
        '2-3 render visuals',
        'Short teaser film',
        'Quote sheet (founder, advisory, first artist)',
        'Exhibition schedule (Q3/Q4 2026)',
      ]},
    ],
  },
  {
    id: 'sec16', num: '16', title: 'Partnerships & Outreach',
    content: [
      { type: 'heading', level: 3, text: 'Wave 1: Warm Intros (April, 10 contacts)' },
      { type: 'table', headers: ['Contact', 'Type', 'Purpose'], rows: [
        ['NCAD', 'Education', 'Alumni network, student engagement, exhibition pipeline'],
        ['Trinity', 'Education', 'Research partnerships, digital humanities'],
        ['Beta Festival', 'Creative ecosystem', 'Cross-promotion, shared audience'],
        ['DCC Listings', 'Institutional', 'Cultural listings, tourism promotion'],
        ['Spencer (referred)', 'Cultural connector', 'Introductions into Dublin\'s creative class'],
      ]},
      { type: 'heading', level: 3, text: 'Wave 2: Institutional (May-June)' },
      { type: 'list', items: [
        'Failte Ireland tourism listing',
        'Dublin Tourism board',
        'Arts Council notification (not funding application)',
        'Local business associations (quays area)',
      ]},
    ],
  },
  {
    id: 'sec17', num: '17', title: 'Measurement & KPIs',
    content: [
      { type: 'heading', level: 3, text: 'Phase 1-2 KPIs' },
      { type: 'table', headers: ['Metric', 'Target', 'Tool'], rows: [
        ['Website indexed pages', 'All MVP pages indexed', 'Google Search Console'],
        ['Newsletter signups', 'First 100 subscribers', 'Email platform'],
        ['SEO ranking', 'Appear for "immersive gallery Dublin"', 'Search Console'],
        ['Outreach responses', '5 of 10 warm intros respond', 'Outreach tracker'],
      ]},
      { type: 'heading', level: 3, text: 'Phase 3-4 KPIs' },
      { type: 'table', headers: ['Metric', 'Target', 'Tool'], rows: [
        ['Press coverage', '3-5 articles at launch', 'Press tracker'],
        ['Newsletter subscribers', '500 pre-launch', 'Email platform'],
        ['Social following', 'Combined 1,000+ across channels', 'Platform analytics'],
        ['Video views', 'Agustin hero video: 5,000+ views', 'Platform analytics'],
      ]},
    ],
  },
  {
    id: 'sec18', num: '18', title: 'Reading List — Key Principles',
    content: [
      { type: 'heading', level: 3, text: 'Rory Sutherland — Alchemy (2019)' },
      { type: 'text', text: 'Core thesis: Human beings are psycho-logical, not logical. The most valuable marketing solutions live in the "doesn\'t make sense but works" quadrant.' },
      { type: 'heading', level: 3, text: 'Seth Godin — Purple Cow (2003)' },
      { type: 'text', text: 'Core thesis: In a saturated market, being competent is the fastest route to invisibility. Remarkability must be designed into the product itself.' },
      { type: 'heading', level: 3, text: 'Robert Cialdini — Influence (1984/2021)' },
      { type: 'table', headers: ['Principle', 'Mechanism', 'Lightheart Tactic'], rows: [
        ['Reciprocation', 'A gift creates a debt', 'Free preview events for 100 cultural influencers'],
        ['Commitment & Consistency', 'Small yeses lead to big yeses', 'Progressive ladder: Follow → Subscribe → Preview → Ticket → Membership'],
        ['Social Proof', 'Uncertainty → look to others', 'Display sold-out sessions, visitor testimonials'],
        ['Authority', 'Deference to expertise', 'Curator credentials, institutional partnerships'],
        ['Liking', 'We say yes to people we like', 'Host/ambassador programme, warm staff'],
        ['Scarcity', 'Rare = valuable', 'Quarterly exhibitions with hard end dates, 200 founding members'],
      ]},
      { type: 'heading', level: 3, text: 'Bernadette Jiwa — 6-Book Synthesis' },
      { type: 'text', text: 'Core thesis: Marketing is not about being seen — it is about mattering. Products are cookies. Meaning is the fortune. Lead with the fortune.' },
      { type: 'heading', level: 3, text: 'Helen McNulty — RACE Model' },
      { type: 'table', headers: ['Stage', 'Action', 'Lightheart Tactics'], rows: [
        ['Reach', 'Build awareness', 'Instagram Reels, PR/media, SEO, LinkedIn'],
        ['Act', 'Engagement', 'Website, exhibition pages, newsletter signup'],
        ['Convert', 'Transaction', 'Ticket booking, corporate enquiry, early-bird pricing'],
        ['Engage', 'Retention', 'Email sequences, membership, quarterly cycle, ambassador programme'],
      ]},
    ],
  },
  {
    id: 'sec19', num: '19', title: 'Risk Register',
    content: [
      { type: 'table', headers: ['Risk', 'Likelihood', 'Impact', 'Mitigation'], rows: [
        ['Fire certification delayed → September opening missed', 'Medium', 'Critical', 'Track weekly. Identify backup dates.'],
        ['Brand identity from RAD not ready for Agustin video', 'Medium', 'High', 'Logo at minimum needed by Wk 6-7.'],
        ['Trademark conflict with "Lightheart" name', 'Low-Medium', 'Medium', 'Legal review. "Lightheart Immersive" as fallback.'],
        ['Agustin Vidal Saavedra unavailable', 'Low', 'High', 'Alternative anchor artist as backup.'],
        ['Website not ready for Controlled Visibility', 'Medium', 'High', 'MVP approach — launch lean, iterate.'],
        ['Social media comparison with illusion galleries', 'Medium', 'Medium', 'Clear differentiation in all messaging.'],
        ['Level-setting construction delays', 'Medium', 'High', 'Marketing timeline can flex by 2-4 weeks.'],
      ]},
    ],
  },
  {
    id: 'sec20', num: '20', title: 'Decision Log',
    content: [
      { type: 'table', headers: ['Date', 'Decision', 'Rationale', 'Owner'], rows: [
        ['2026-03-10', 'TSM integrated as artistic/operational method', 'Thesis methodology provides coherent framework', 'Kev'],
        ['2026-03-10', '150-deliverable timeline created (Mar–Sep 2026)', 'Comprehensive phase-gated checklist', 'Kev'],
        ['2026-03-09', 'RAD confirmed as brand agency', 'European/Swiss design alignment', 'Kev'],
        ['2026-03-09', 'Rolling Tuesday meetings with RAD', 'Mondays for campaign, Tuesdays for brand', 'Kev + RAD'],
        ['2026-03-09', 'Brand direction: striking, bold, simple, timeless', 'Institutional longevity', 'RAD'],
        ['2026-03-09', '"Lightheart" name retained', 'Ireland-only jurisdiction reduces risk', 'Kev'],
        ['2026-03-01', '3-month marketing plan adopted (DCC session)', 'Credibility-first approach', 'Kev'],
        ['2026-03-01', 'Agustin Vidal Saavedra (Glasseye XR) as anchor content artist', 'First public content piece', 'Kev'],
        ['2026-03-01', 'Website = source of truth', 'Search > impulse scroll. AI indexing matters.', 'Kev'],
        ['2024', 'Buildings purchased', 'Strategic location on Dublin quays', '—'],
      ]},
    ],
  },
  {
    id: 'sec21', num: '21', title: 'Weekly Sprint Tracker',
    content: [
      { type: 'heading', level: 3, text: 'Week 2 (Mar 8-14) — CURRENT' },
      { type: 'table', headers: ['Task', 'Owner', 'Status'], rows: [
        ['Define 3 primary audience groups', 'Kev', 'In progress'],
        ['Define category language', 'Kev', 'In progress'],
        ['Photo shoot (space)', 'Video lead', 'Planned'],
        ['Tech spec capture', 'Producer', 'Planned'],
      ]},
      { type: 'heading', level: 3, text: 'Week 3 (Mar 15-21)' },
      { type: 'table', headers: ['Task', 'Owner', 'Status'], rows: [
        ['Define tone of voice', 'Kev', 'Planned'],
        ['Clarify quarterly programming model', 'Kev', 'Planned'],
        ['Website copy v1', 'Kev', 'Planned'],
        ['Template kit v1 (RAD)', 'RAD', 'Planned'],
        ['Rental partner map begins', 'Partnerships', 'Planned'],
      ]},
      { type: 'heading', level: 3, text: 'Week 4 (Mar 22-28)' },
      { type: 'table', headers: ['Task', 'Owner', 'Status'], rows: [
        ['Create 3 clear personas', 'Kev', 'Planned'],
        ['Build relationship map', 'Kev', 'Planned'],
        ['Analytics baseline', 'Data', 'Planned'],
        ['About page development begins', 'Web dev', 'Planned'],
      ]},
    ],
  },
];

export const PLAN_NAV_GROUPS = [
  {
    label: 'Master Plan Sections',
    items: PLAN_SECTIONS.map(s => ({ id: s.id, label: `${s.num}. ${s.title}` })),
  },
];
