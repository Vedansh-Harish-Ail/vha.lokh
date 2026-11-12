import { StudioConfig, Project, Service } from '../types';

export const STUDIO_CONFIG: StudioConfig = {
  name: 'vha.lokh',
  tagline: 'Where Ideas Take Shape.',
  subheading: 'Web solutions that work for you. Websites, wedding invitation portals, digital marketing posters, and IT support for businesses and individuals.',
  location: 'Mangaluru, India',
  email: 'ailvedansh@gmail.com',
  whatsappNumber: '+91 6282277490',
  whatsappMessage: 'Hi vha.lokh, I would like to discuss a custom website / digital solution.',
  availability: 'Accepting Client Engagements',
};

export const PROJECTS: Project[] = [
  {
    id: 'mata-refrigeration',
    title: 'Mata Refrigeration',
    subtitle: 'Refrigerant Gas & HVAC supply experts in Kopar Khairane, Navi Mumbai',
    category: 'B2B & Industrial Website',
    clientType: 'HVAC & Industrial Distributor',
    description: 'A high-credibility B2B web portal engineered for Navi Mumbai’s leading distributor of refrigerant gases, compressor oils, copper pipes, and industrial cooling components. Built with 1-tap WhatsApp RFQs, brand partner showcases (Floron, MPCL, Mafron, Chemours), and direct Google Maps directions.',
    whatWeDid: [
      'B2B product catalog & quotation request workflow',
      'Direct WhatsApp inquiry & phone call dispatch',
      'Authorized dealer brand partner trust showcase',
      'Interactive location directions & store contact',
      'Mobile-first responsive design for on-site HVAC technicians',
      'Fast loading speed optimized for 4G connections'
    ],
    image: '/assets/projects/mata-refrigeration.jpg',
    mobileImage: '/assets/projects/mata-refrigeration-mobile.png',
    liveUrl: 'https://matha-profile.vercel.app/',
    featured: true,
  },
  {
    id: 'dimple-beauty-salon',
    title: 'Dimple Beauty Salon',
    subtitle: 'Luxury ladies salon in Kopar Khairane, Navi Mumbai',
    category: 'Small Business Website',
    clientType: 'Beauty & Wellness Flagship',
    description: 'A clean, welcoming website built for an acclaimed women-owned beauty parlour. Designed to showcase their hair, skin, and bridal services while making it effortless for local visitors to book appointments on WhatsApp or phone.',
    whatWeDid: [
      'Responsive, mobile-first design matching salon interiors',
      'Direct WhatsApp & phone call booking integration',
      'Clear service menu with transparent pricing',
      'Google 4.6★ rating & 258+ reviews social proof',
      'Bilingual interface (English & Hindi)',
      'Sub-2-second loading speed on smartphones'
    ],
    image: '/assets/projects/dimple-beauty-salon.jpg',
    mobileImage: '/assets/projects/dimple-beauty-salon-mobile.jpg',
    liveUrl: 'https://dimple-beauty-salon.vercel.app/',
    featured: true,
  },
  {
    id: 'vrinda-makeup-artist',
    title: 'VRINDA Makeup Artistry',
    subtitle: 'Bridal & editorial makeup artist portfolio',
    category: 'Small Business Website',
    clientType: 'Bridal & Fashion Artist',
    description: 'A high-contrast luxury portfolio designed for a premier bridal makeup artist. High-resolution photo galleries showcase real bridal transformations, while floating WhatsApp and call buttons ensure prospective brides can initiate consultations instantly.',
    whatWeDid: [
      'High-resolution visual showcase for bridal makeup collections',
      'Clean luxury dark aesthetic with smooth mobile pacing',
      'Floating 1-tap WhatsApp consultation dispatch',
      'Fast photo loading optimized for mobile networks',
      'Service catalog for bridal, party, and editorial makeup'
    ],
    image: '/assets/projects/vrinda-makeup-artist.jpg',
    mobileImage: '/assets/projects/vrinda-makeup-artist.jpg',
    liveUrl: 'https://vrinda-make-up-artist.vercel.app/',
    featured: true,
  },
  {
    id: 'lekhak-and-anupallavi',
    title: 'Lekhak & Anupallavi',
    subtitle: 'Interactive wedding portal & digital card experience',
    category: 'Wedding Portal & Card',
    clientType: 'Wedding Celebration',
    description: 'A modern digital celebration portal created to replace paper invites with an interactive experience. Family and friends can read the couple’s story, check ceremony countdowns, browse photo archives, and submit their attendance through a live RSVP form.',
    whatWeDid: [
      'Interactive wedding invitation web experience',
      'Live online RSVP tracking system',
      'Interactive location maps and ceremony countdown',
      'Digital photo album & memory archive',
      'Works seamlessly across all smartphones'
    ],
    image: '/assets/projects/lekhak-and-anupallavi.jpg',
    mobileImage: '/assets/projects/lekhak-and-anupallavi-mobile.png',
    liveUrl: 'https://lekhak-and-anupallavi.vercel.app/',
    featured: true,
  },
];

export const SERVICES: Service[] = [
  {
    id: 'small-business-websites',
    title: 'Small Business Websites',
    tagline: 'Fast, mobile-first sites that generate inquiries.',
    description: 'Clean websites engineered with 1-tap WhatsApp booking, Google Maps, and fast loading speeds to turn local visitors into paying customers.',
    benefits: ['Mobile-First', '1-Tap WhatsApp', 'Google SEO', 'Sub-2s Loading'],
    bestFor: 'Salons, clinics, suppliers, and local businesses.'
  },
  {
    id: 'wedding-portals-cards',
    title: 'Wedding Portals & Digital Cards',
    tagline: 'Modern digital celebration websites & invites.',
    description: 'Interactive celebration sites with live online RSVP tracking, ceremony countdowns, interactive venue maps, and WhatsApp-ready digital cards.',
    benefits: ['Live RSVP', 'Venue Maps', 'Countdown Timers', 'WhatsApp-Ready'],
    bestFor: 'Couples, families, and modern celebrations.'
  },
  {
    id: 'digital-marketing-posters',
    title: 'Posters & Digital Marketing',
    tagline: 'High-impact creative promotional collateral.',
    description: 'Promotional posters, festival marketing flyers, and social media creative assets designed to stand out and drive immediate customer response.',
    benefits: ['Festival Promos', 'Instagram Stories', 'Print & Digital', 'Fast Turnaround'],
    bestFor: 'Campaigns, festive offers, and local announcements.'
  },
  {
    id: 'it-support-services',
    title: 'Digital Support & IT Services',
    tagline: 'Hands-on domain setup, hosting & maintenance.',
    description: 'Direct technical support for custom domain setup, cloud hosting configuration, website bug fixing, speed improvements, and ongoing upkeep.',
    benefits: ['Custom Domains', 'Cloud Hosting', 'Bug Fixing', 'Direct Support'],
    bestFor: 'Business owners wanting hassle-free website maintenance.'
  }
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Discussion & Requirements',
    description: 'Tell us about your business, event, or IT requirement. We discuss the scope, features, and timeline.'
  },
  {
    step: '02',
    title: 'Design & Draft Preview',
    description: 'We share visual drafts or design mockups for your website, digital card, or promotional poster for your review.'
  },
  {
    step: '03',
    title: 'Development & Setup',
    description: 'We build the responsive pages, configure interactive elements (WhatsApp, Maps, RSVPs), and test on mobile.'
  },
  {
    step: '04',
    title: 'Delivery & Ongoing Support',
    description: 'We launch on your custom domain, deliver the final creative assets, and provide hands-on technical support.'
  }
];
