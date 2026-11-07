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
    id: 'monolith-os',
    slug: 'monolith-os',
    title: 'Monolith OS',
    subtitle: 'Experimental brutalist interface exploring spatial file organization.',
    category: 'Creative Engineering',
    year: '2025',
    clientOrContext: 'Studio Internal Exploration',
    description: 'A tactile, minimalist desktop web environment built around monolithic geometric containers, instantaneous local state synchronization, and zero-latency keyboard command palettes.',
    challenge: 'Reinventing the perception of a browser desktop without relying on generic OS skeuomorphism or bloated legacy design patterns.',
    solution: 'Designed an uncompromised high-contrast monochrome design system with custom spring physics, micro-feedback sounds, and instant client-side state caching.',
    metrics: 'Sub-30ms interaction latency, 100% lighthouse accessibility score.',
    deliverables: ['Web Application', 'Custom Spring Physics Engine', 'Design System'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Web Audio API'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://github.com/vhalokh',
    sourceUrl: 'https://github.com/vhalokh',
    featured: true
  },
  {
    id: 'hyperion-sound',
    slug: 'hyperion-sound',
    title: 'Hyperion Sound',
    subtitle: 'Kinetic sound-sculpting workspace for algorithmic audio synthesis.',
    category: 'Interactive Systems',
    year: '2024',
    clientOrContext: 'Creative Technology Lab',
    description: 'An interactive audio-visual canvas that translates procedural frequency waves into real-time geometric typography distortions and spatial reverberation.',
    challenge: 'Achieving synchronous visual distortion at 60fps driven directly by Web Audio API frequency analyzers without thread blocking.',
    solution: 'Offloaded FFT spectral analysis to audio worklets while using hardware-accelerated Canvas render loops to morph SVG glyph bezier paths.',
    metrics: 'Zero dropped audio frames, 60fps fluid visual feedback.',
    deliverables: ['Spatial Audio Engine', 'Generative Typography System', 'Interactive Canvas'],
    techStack: ['Web Audio API', 'Canvas API', 'TypeScript', 'Vite'],
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://github.com/vhalokh',
    sourceUrl: 'https://github.com/vhalokh',
    featured: true
  },
  {
    id: 'aethelgard-archive',
    slug: 'aethelgard-archive',
    title: 'Aethelgard Archive',
    subtitle: 'Editorial digital repository for rare architectural treatises.',
    category: 'Editorial Luxury',
    year: '2024',
    clientOrContext: 'Cultural Archive Initiative',
    description: 'A digital reading sanctuary pairing classical typographic proportions with hyper-modern progressive enhancement, dual-column horizontal pacing, and tactile page turns.',
    challenge: 'Balancing the gravitas of multi-century architectural scholarship with modern web responsiveness and immediate readability.',
    solution: 'Developed an asymmetric Swiss layout grid with dynamic baseline typographic alignment, custom footnote drawer reveals, and non-linear chapter indexing.',
    metrics: 'Average reading session duration > 6.4 minutes, 99.4% mobile reading retention.',
    deliverables: ['Editorial Publication System', 'Bespoke Typography Hierarchy', 'Accessible Reader'],
    techStack: ['Next.js', 'Tailwind CSS', 'TypeScript', 'CSS Grid'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://github.com/vhalokh',
    sourceUrl: 'https://github.com/vhalokh',
    featured: true
  },
  {
    id: 'strata-protocol',
    slug: 'strata-protocol',
    title: 'Strata Protocol',
    subtitle: 'Real-time telemetry dashboard for distributed data pipelines.',
    category: 'Web Application',
    year: '2024',
    clientOrContext: 'Infrastructure Systems',
    description: 'A high-density brutalist monitoring surface rendering thousands of concurrent data streams into intuitive geographic and topological vectors with zero visual clutter.',
    challenge: 'Presenting dense, multi-dimensional operational metrics without overwhelming system engineers during high-stress incident resolution.',
    solution: 'Implemented visual hierarchy based on strict luminescent contrast levels, monochromatic information grouping, and high-precision tabular monospace typography.',
    metrics: '15,000+ data nodes visualized at sub-second refresh rates.',
    deliverables: ['Real-time Dashboard', 'High-Density Data Grid', 'Design Token Spec'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'SVG Topology'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
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
