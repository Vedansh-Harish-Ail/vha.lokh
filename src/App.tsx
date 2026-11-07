import React, { useState } from 'react';
import { Navbar } from './components/clean/Navbar';
import { HeroSection44 } from './components/ui/shadcn-studio-hero-section-44';
import { Hero } from './components/clean/Hero';
import { WorksShowcase } from './components/clean/WorksShowcase';
import { BentoFeatures } from './components/clean/BentoFeatures';
import { ServicesSection } from './components/clean/ServicesSection';
import { ScopeCalculator } from './components/clean/ScopeCalculator';
import { ComparisonSection } from './components/clean/ComparisonSection';
import { HowItWorksSection } from './components/clean/HowItWorksSection';
import { FAQAccordion } from './components/clean/FAQAccordion';
import { ContactSection } from './components/clean/ContactSection';
import { Footer } from './components/clean/Footer';
import { Sparkles, Monitor } from 'lucide-react';

export const App: React.FC = () => {
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('');
  const [heroVariant, setHeroVariant] = useState<'3d-badge' | 'device-preview'>('3d-badge');

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceForInquiry(serviceTitle);
    scrollTo('contact');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#18181B] font-sans selection:bg-brand-100 selection:text-brand-900">
      {/* 1. Clean Light Navigation */}
      <Navbar onNavigate={scrollTo} />

      <main id="top" className="relative">
        {/* Hero Variant Toggle Pill */}
        <div className="absolute top-3 right-4 sm:right-8 z-30">
          <div className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-full border border-slate-200 shadow-sm text-[11px] font-semibold text-slate-600">
            <button
              onClick={() => setHeroVariant('3d-badge')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                heroVariant === '3d-badge'
                  ? 'bg-slate-900 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="h-3 w-3 text-indigo-400" />
              <span>3D Physics Lanyard</span>
            </button>
            <button
              onClick={() => setHeroVariant('device-preview')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                heroVariant === 'device-preview'
                  ? 'bg-slate-900 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="h-3 w-3" />
              <span>Device Showcase</span>
            </button>
          </div>
        </div>

        {/* 2. Hero Section: 3D Physics ID Lanyard Badge or Device Preview */}
        {heroVariant === '3d-badge' ? (
          <HeroSection44
            greetings={['Hello', 'Namaskara', 'नमस्ते', 'Hey']}
            name="vha.lokh"
            role="Where Ideas Take Shape."
            availabilityLabel="Accepting Engagements • Mangaluru, IN"
            downloadAction={{ label: 'Explore Selected Work', href: '#work' }}
            connectAction={{ label: 'Discuss a Project', href: '#contact' }}
          />
        ) : (
          <Hero
            onExploreWork={() => scrollTo('work')}
            onOpenContact={() => scrollTo('contact')}
          />
        )}

        {/* 3. Real Client Works Showcase (with mobile versions) */}
        <WorksShowcase />

        {/* 4. 21st.dev Feature Bento Grid */}
        <BentoFeatures />

        {/* 5. Services: What We Provide */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 6. 21st.dev Interactive Scope & Turnaround Estimator */}
        <ScopeCalculator />

        {/* 7. 21st.dev Comparison Table */}
        <ComparisonSection />

        {/* 8. Simple 4-Step Process */}
        <HowItWorksSection />

        {/* 9. 21st.dev Interactive Animated FAQ Accordion */}
        <FAQAccordion />

        {/* 10. Direct Contact & 1-Tap WhatsApp Channel */}
        <ContactSection initialService={selectedServiceForInquiry} />
      </main>

      {/* 11. Clean Light Footer */}
      <Footer />
    </div>
  );
};

export default App;
