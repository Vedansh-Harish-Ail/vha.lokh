export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  clientType: string;
  description: string;
  whatWeDid: string[];
  image: string;
  mobileImage?: string;
  liveUrl: string;
  featured: boolean;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  bestFor: string;
}

export interface StudioConfig {
  name: string;
  tagline: string;
  subheading: string;
  location: string;
  email: string;
  whatsappNumber: string;
  whatsappMessage: string;
  availability: string;
}
