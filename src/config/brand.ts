import { StudioConfig, Discipline, Project, PhilosophyTenet, ProcessStage } from '../types';

export const STUDIO_CONFIG: StudioConfig = {
  name: 'vha.lokh',
  identityTagline: 'Independent Digital Creative & Technology Studio',
  metaDescription: 'Engineering high-craft web experiences, bespoke digital brand systems, and creative software architectures with editorial precision and technical rigor.',
  studioLocation: 'New Delhi / Global Remote',
  timeZone: 'Asia/Kolkata',
  established: '2024',
  status: {
    availability: 'Accepting Commissions',
    quarter: 'Q2 / Q3 2025',
    notice: 'Direct creative direction & engineering commissions available for select engagements.'
  },
  contact: {
    email: 'contact@vhalokh.studio',
    calendly: 'https://cal.com/vhalokh',
    locationCity: 'New Delhi',
    country: 'India'
  },
  social: {
    github: 'https://github.com/vhalokh',
    twitter: 'https://twitter.com/vhalokh',
    linkedin: 'https://linkedin.com/company/vhalokh',
    readcv: 'https://read.cv/vhalokh'
  }
};

export const DISCIPLINES: Discipline[] = [
  {
    id: 'web-experiences',
    code: '01',
    title: 'High-Craft Web Experiences',
    tagline: 'Defying disposable templates with bespoke editorial interaction.',
    description: 'We conceive and engineer digital experiences characterized by meticulous art direction, bespoke typography systems, fluid physics-based interactions, and immersive spatial hierarchy.',
    capabilities: [
      'Art Directed Brand Websites',
      'Editorial & Cultural Portals',
      'Interactive Storytelling Environments',
      'Micro-interactions & Physics Animation',
      'Responsive Architectural Layouts'
    ],
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'WebGL/Canvas', 'Lenis']
  },
  {
    id: 'creative-engineering',
    code: '02',
    title: 'Creative Engineering & Systems',
    tagline: 'Bridging avant-garde aesthetic vision and performant production code.',
    description: 'We treat code as a physical material. Every animation curve, state machine, and render cycle is measured against 60fps frame budgets and uncompromising accessibility standards.',
    capabilities: [
      'Component Architecture Systems',
      'Custom Design Systems & Tokens',
      'Shader & Canvas Visualizations',
      'Headless CMS & Modular Backends',
      'Full-Stack Web Applications'
    ],
    tools: ['Next.js', 'Vite', 'Node.js', 'PostgreSQL', 'GraphQL', 'Tailwind']
  },
  {
    id: 'digital-brand-identity',
    code: '03',
    title: 'Digital Brand Architecture',
    tagline: 'Translating strategic brand intent into systematic digital ecosystems.',
    description: 'A brand in the digital age is not a static PDF styleguide. It is living typography, motion rhythm, interaction sound, and systematic digital cohesion across every touchpoint.',
    capabilities: [
      'Digital Design Direction',
      'Typographic Pairing & Hierarchy',
      'Motion Design & Kinetic Guides',
      'Interactive Design Tokens',
      'Interactive Design Systems'
    ],
    tools: ['Figma', 'Design Systems', 'Typography Engineering', 'Token Orchestration']
  },
  {
    id: 'creative-tooling',
    code: '04',
    title: 'Experimental Interfaces & Tools',
    tagline: 'Designing tomorrow’s interactive instruments and digital artifacts.',
    description: 'From generative UI interfaces to developer tools and bespoke creative software, we explore the outer boundaries of human-computer interaction with rigor and restraint.',
    capabilities: [
      'Generative UI Interfaces',
      'Creative Coding & Visual Tools',
      'Agentic & AI-assisted Workflows',
      'Interactive Audio-Visual Toys',
      'Bespoke Micro-APIs & SDKs'
    ],
    tools: ['Web Audio API', 'Canvas 2D', 'LLM Agent Architectures', 'Web Workers']
  }
];

export const SELECTED_WORKS: Project[] = [
  {
    id: 'lekhak-and-anupallavi',
    slug: 'lekhak-and-anupallavi',
    title: 'Lekhak & Anupallavi',
    subtitle: 'The Wedding Celebration — Editorial digital invitation & interactive guest archive.',
    category: 'Editorial Luxury',
    year: '2025',
    clientOrContext: 'Anupallavi & Lekhak Wedding Commission',
    description: '"Join us as we begin our next chapter, surrounded by the people we love most." A bespoke digital wedding publication translating sacred tradition and romantic warmth into modern progressive web architecture. Features an interactive photo archive, ceremonial event itinerary, dynamic RSVP workflow, and instant mobile responsiveness.',
    challenge: 'Translating the emotional intimacy, ceremony timeline, and cultural sanctity of an Indian wedding into a timeless web publication accessible across multi-generational guest cohorts and cellular connections.',
    solution: 'Designed an editorial typographic layout with Next.js image optimization, progressive asset loading, interactive photo gallery archives, and frictionless real-time RSVP submission handling.',
    metrics: '100% Mobile Guest RSVP Completion, Sub-1.2s First Contentful Paint.',
    deliverables: ['Digital Wedding Publication', 'Interactive Photo Archive', 'Real-Time RSVP Portal', 'Mobile-Optimized Interface'],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: '/assets/projects/lekhak-and-anupallavi.jpg',
    liveUrl: 'https://lekhak-and-anupallavi.vercel.app/',
    featured: true
  },
  {
    id: 'vrinda-makeup-artist',
    slug: 'vrinda-makeup-artist',
    title: 'VRINDA Artistry',
    subtitle: 'Bridal & Editorial Artist — Enhancing your natural beauty with elegance.',
    category: 'Brand Experience',
    year: '2024',
    clientOrContext: 'Vrinda Luxury Makeup Studio',
    description: '"Bridal & Editorial Artist — Enhancing Your Natural Beauty with Elegance." A high-contrast luxury digital identity and portfolio for a premier makeup artist. Emphasizes fine cosmetic textures, bridal collections, and friction-free consultation booking workflows.',
    challenge: 'Showcasing high-definition bridal photography and fine cosmetic details without degrading mobile loading speed or compromising the brand’s luxury editorial presence.',
    solution: 'Constructed a moody, high-contrast dark aesthetic with tailored Tailwind container queries, progressive image loading, floating channel access, and instant WhatsApp / calendar consultation scheduling pathways.',
    metrics: 'Significant surge in direct bridal inquiries and organic appointment bookings.',
    deliverables: ['Luxury Digital Flagship', 'Curated Editorial Portfolio', 'Direct WhatsApp & Call Dispatch', 'Responsive Motion'],
    techStack: ['Tailwind CSS', 'JavaScript', 'CSS Grid', 'Micro-Interactions'],
    image: '/assets/projects/vrinda-makeup-artist.jpg',
    liveUrl: 'https://vrinda-make-up-artist.vercel.app/',
    featured: true
  },
  {
    id: 'dimple-beauty-salon',
    slug: 'dimple-beauty-salon',
    title: 'Dimple Beauty Salon',
    subtitle: 'Timeless Beauty, Personally Crafted — Luxury ladies salon in Kopar Khairane.',
    category: 'Digital Flagship',
    year: '2024',
    clientOrContext: 'Dimple Beauty Salon, Kopar Khairane, Navi Mumbai',
    description: '"Timeless Beauty, Personally Crafted." A ladies-only sanctuary in Kopar Khairane, Navi Mumbai — trusted for over a decade for quietly luxurious hair, skin, nail, and bridal care. Features a bilingual interface (English/Hindi), Google 4.6★ reviews social proof with 258+ reviews, live operational status, interactive service catalog, and direct WhatsApp/call booking pathways.',
    challenge: 'Elevating an established local luxury salon into an authoritative digital destination that builds instant trust and converts visitors into confirmed appointments.',
    solution: 'Crafted an emerald and gold luxury visual identity pairing classical Cormorant Garamond typography with DM Sans readability, category-filtered treatment accordions, and one-tap appointment triggers.',
    metrics: 'Rated 4.6★ on Google with 258+ verified client reviews; instant mobile booking conversion.',
    deliverables: ['Digital Flagship Web Platform', 'Bilingual (EN/HI) Experience', 'Interactive Treatment Menu', 'Google Reviews Integration', 'Direct WhatsApp & Call Dispatch'],
    techStack: ['React', 'Tailwind CSS', 'Cormorant Garamond', 'DM Sans', 'Local SEO Architecture'],
    image: '/assets/projects/dimple-beauty-salon.jpg',
    liveUrl: 'https://dimple-beauty-salon.vercel.app/',
    featured: true
  },
  {
    id: 'monolith-os',
    slug: 'monolith-os',
    title: 'Monolith OS',
    subtitle: 'Experimental brutalist spatial interface and audio-tactile web workspace.',
    category: 'Creative Engineering',
    year: '2025',
    clientOrContext: 'Studio Internal R&D Lab',
    description: 'A tactile, minimalist desktop web environment built around monolithic geometric containers, instantaneous local state synchronization, and zero-latency keyboard command palettes.',
    challenge: 'Reinventing spatial desktop navigation in the browser without relying on dated skeuomorphism or bloated legacy desktop window managers.',
    solution: 'Designed an uncompromised monochrome design system with custom spring physics, micro-feedback audio haptics, and instant client-side state caching.',
    metrics: 'Sub-30ms interaction latency, 100% lighthouse accessibility score.',
    deliverables: ['Web Application', 'Custom Spring Physics Engine', 'Design System Spec'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Web Audio API'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://github.com/vhalokh',
    sourceUrl: 'https://github.com/vhalokh',
    featured: false
  }
];

export const PHILOSOPHY_TENETS: PhilosophyTenet[] = [
  {
    number: '01',
    title: 'Substance Over Novelty',
    subtitle: 'Aesthetic presence anchored in functional depth.',
    elaboration: 'We reject ephemeral visual tricks that degrade usability. True avant-garde design does not conceal weak foundations; it clarifies purpose through radical visual hierarchy and uncompromising structural integrity.'
  },
  {
    number: '02',
    title: 'Extreme Kinetic Restraint',
    subtitle: 'Motion is punctuation, never filler.',
    elaboration: 'Every transition, deceleration curve, and scroll transformation must communicate physical weight and spatial intent. If an animation does not inform the user of spatial orientation or brand texture, it is eliminated.'
  },
  {
    number: '03',
    title: 'Code as Physical Material',
    subtitle: 'Craftsmanship down to the single pixel and frame budget.',
    elaboration: 'We do not view development as mechanical assembly of external libraries. We hand-tune DOM structures, CSS architectures, and state machines like precision instruments, guaranteeing timeless longevity.'
  },
  {
    number: '04',
    title: 'Enduring Brand Architecture',
    subtitle: 'Building digital spaces that outlast the trends.',
    elaboration: 'Generic SaaS templates expire in six months. By grounding our visual language in timeless Swiss typography, asymmetric editorial tension, and monochrome discipline, we build digital homes that remain legendary.'
  }
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: '01',
    title: 'Discovery & Strategic Framing',
    focus: 'Deconstructing brand essence, competitive vacuum, and architectural requirements.',
    deliverables: ['Brand Thesis', 'Spatial Flow Map', 'Art Direction Moodboard', 'Technical Scope Matrix'],
    timeline: 'Week 01'
  },
  {
    step: '02',
    title: 'Conceptualization & Art Direction',
    focus: 'Establishing distinctive typographic voice, color contrast tokens, and interactive compositions.',
    deliverables: ['Editorial Grid System', 'High-Fidelity Compositions', 'Interactive Design Tokens', 'Motion Grammar'],
    timeline: 'Week 02'
  },
  {
    step: '03',
    title: 'Prototyping & Motion Engineering',
    focus: 'Validating spring physics, gesture models, audio-visual feedback, and responsive transitions.',
    deliverables: ['Interactive Code Prototype', 'Animation Curve Tuning', 'Responsive Stress-Tests'],
    timeline: 'Week 03'
  },
  {
    step: '04',
    title: 'Production Engineering & Optimization',
    focus: 'Building the full production system in React, TypeScript, and modern headless infrastructure.',
    deliverables: ['Production Web System', 'Accessibility Verification (WCAG AAA)', 'Performance Audit (100 Core Web Vitals)'],
    timeline: 'Weeks 04 — 05'
  },
  {
    step: '05',
    title: 'Deployment & Living Stewardship',
    focus: 'Deploying to edge CDN infrastructure, setting up telemetry, and handing off editable architectures.',
    deliverables: ['Global Edge Deployment', 'Design Token Documentation', 'Living Component Library'],
    timeline: 'Week 06'
  }
];
