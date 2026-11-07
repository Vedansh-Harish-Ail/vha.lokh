import { StudioConfig, Project, Service } from '../types';

export const STUDIO_CONFIG: StudioConfig = {
  name: 'vha.lokh',
  tagline: 'Clean, High-Impact Web Design for Growing Businesses',
  subheading: 'Based in Mangalore. We build clean, fast, and mobile-friendly websites for small businesses, salons, clinics, professionals, and personal brands.',
  location: 'Mangalore, India',
  email: 'contact@vhalokh.studio',
  whatsappNumber: '+919999999999', // User can update their business WhatsApp
  whatsappMessage: 'Hi, I would like to discuss building a website for my business.',
  availability: 'Available for New Projects',
};

export const PROJECTS: Project[] = [
  {
    id: 'dimple-beauty-salon',
    title: 'Dimple Beauty Salon',
    subtitle: 'Luxury ladies salon in Kopar Khairane, Navi Mumbai',
    category: 'Local Business & Salon',
    clientType: 'Beauty & Wellness Flagship',
    description: 'A clean, welcoming website built for an acclaimed women-owned beauty parlour. Designed to showcase their hair, skin, and bridal services while making it effortless for local visitors to book appointments on WhatsApp or phone.',
    whatWeDid: [
      'Clean, luxury design matching salon interiors',
      'Direct WhatsApp & phone call booking buttons',
      'Clear service menu with transparent pricing',
      'Google 4.6★ rating & 258+ reviews integration',
      'Bilingual interface (English & Hindi)',
      'Fast loading on mobile phones'
    ],
    image: '/assets/projects/dimple-beauty-salon.jpg',
    liveUrl: 'https://dimple-beauty-salon.vercel.app/',
    featured: true,
  },
  {
    id: 'vrinda-makeup-artist',
    title: 'VRINDA Makeup Artistry',
    subtitle: 'Bridal & editorial makeup artist portfolio',
    category: 'Creative Portfolio',
    clientType: 'Bridal & Fashion Artist',
    description: 'A high-contrast luxury portfolio designed for a premier bridal makeup artist. High-resolution photo galleries showcase real bridal transformations, while floating WhatsApp and call buttons ensure prospective brides can initiate consultations instantly.',
    whatWeDid: [
      'High-resolution visual showcase for bridal looks',
      'Elegant dark aesthetic with smooth mobile pacing',
      'Floating 1-tap WhatsApp consultation button',
      'Fast photo loading optimized for mobile data',
      'Service catalog for bridal, party, and editorial makeup'
    ],
    image: '/assets/projects/vrinda-makeup-artist.jpg',
    liveUrl: 'https://vrinda-make-up-artist.vercel.app/',
    featured: true,
  },
  {
    id: 'lekhak-and-anupallavi',
    title: 'Lekhak & Anupallavi',
    subtitle: 'Digital wedding invitation & interactive guest portal',
    category: 'Event & Wedding Experience',
    clientType: 'Wedding Celebration',
    description: 'A modern digital celebration portal created to replace paper invites with an interactive experience. Family and friends can read the couple’s story, check ceremony timings, browse photo archives, and submit their attendance through an online RSVP form.',
    whatWeDid: [
      'Digital invitation with warm, editorial typography',
      'Interactive photo gallery archive',
      'Online guest RSVP form system',
      'Event schedule and venue directions',
      'Works seamlessly on all smartphones'
    ],
    image: '/assets/projects/lekhak-and-anupallavi.jpg',
    liveUrl: 'https://lekhak-and-anupallavi.vercel.app/',
    featured: true,
  },
];

export const SERVICES: Service[] = [
  {
    id: 'business-websites',
    title: 'Small Business & Salon Websites',
    tagline: 'Get found on Google and convert visitors into paying clients.',
    description: 'A complete, professional website tailored for local businesses—salons, clinics, cafes, boutiques, and service providers. Includes WhatsApp chat buttons, Google Maps location, and your full service list.',
    benefits: [
      'Direct 1-tap WhatsApp & phone call buttons',
      'Google Maps & review integration',
      'Menu / service list with pricing',
      'Sub-2-second loading on mobile phones'
    ],
    bestFor: 'Salons, clinics, local shops, restaurants, and service businesses.'
  },
  {
    id: 'portfolio-websites',
    title: 'Professional & Personal Portfolios',
    tagline: 'Showcase your work with credibility and elegance.',
    description: 'For makeup artists, photographers, architects, designers, doctors, and independent consultants who need to look established, display their past work, and receive high-value client inquiries.',
    benefits: [
      'High-resolution visual galleries that load fast',
      'About section telling your experience and story',
      'Client testimonials and project breakdowns',
      'Frictionless contact & inquiry form'
    ],
    bestFor: 'Makeup artists, photographers, doctors, consultants, and creators.'
  },
  {
    id: 'event-wedding-portals',
    title: 'Wedding & Event Websites',
    tagline: 'Replace paper invites with an unforgettable digital experience.',
    description: 'Custom celebration websites for weddings, milestones, and corporate events. Share ceremonial schedules, venue directions, and collected photo galleries with real-time online guest RSVPs.',
    benefits: [
      'Interactive online RSVP collection',
      'Ceremony timeline & venue Google Maps link',
      'Digital photo album & memory archive',
      'Accessible to all age groups on any phone'
    ],
    bestFor: 'Couples, wedding planners, event organizers, and celebrations.'
  },
  {
    id: 'redesign-speed',
    title: 'Website Redesign & Upgrades',
    tagline: 'Turn your slow, outdated website into a modern asset.',
    description: 'Already have a website that looks dated, loads slowly, or does not work properly on mobile? We rebuild it from the ground up to be lightning-fast, modern, and easy for your customers to use.',
    benefits: [
      'Full mobile responsiveness overhaul',
      'Instant loading speed improvements',
      'Modern, clean visual design',
      'No messy plugins or security vulnerabilities'
    ],
    bestFor: 'Businesses with existing websites that need a fresh, modern look.'
  }
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Quick Chat & Planning',
    description: 'We talk about your business, the pages you need, your brand colors, and the goals you want to achieve.'
  },
  {
    step: '02',
    title: 'Design Preview',
    description: 'We share a visual design preview tailored to your brand. You review it, suggest adjustments, and we refine it.'
  },
  {
    step: '03',
    title: 'Build & Mobile Testing',
    description: 'We develop your website, optimize it for phone screens, hook up your WhatsApp buttons, contact forms, and Google links.'
  },
  {
    step: '04',
    title: 'Launch & Handoff',
    description: 'Your website goes live on your custom domain (.com / .in). We hand it over with clear instructions and ongoing support.'
  }
];
