export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  clientOrContext: string;
  description: string;
  challenge: string;
  solution: string;
  metrics?: string;
  deliverables: string[];
  techStack: string[];
  image: string;
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
}

export interface Discipline {
  id: string;
  code: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  tools: string[];
}

export interface PhilosophyTenet {
  number: string;
  title: string;
  subtitle: string;
  elaboration: string;
}

export interface ProcessStage {
  step: string;
  title: string;
  focus: string;
  deliverables: string[];
  timeline: string;
}

export interface StudioConfig {
  name: string;
  identityTagline: string;
  metaDescription: string;
  studioLocation: string;
  timeZone: string;
  established: string;
  status: {
    availability: 'Accepting Commissions' | 'Limited Availability' | 'Booking Next Quarter';
    quarter: string;
    notice: string;
  };
  contact: {
    email: string;
    calendly?: string;
    locationCity: string;
    country: string;
  };
  social: {
    github: string;
    twitter: string;
    linkedin: string;
    readcv?: string;
  };
}

