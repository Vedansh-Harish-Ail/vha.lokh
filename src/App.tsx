import React, { useState } from 'react';
import { Navbar } from './components/clean/Navbar';
import { HeroSection44 } from './components/ui/shadcn-studio-hero-section-44';
import { WorksShowcase } from './components/clean/WorksShowcase';
import { BentoFeatures } from './components/clean/BentoFeatures';
import { ServicesSection } from './components/clean/ServicesSection';
import { ScopeCalculator } from './components/clean/ScopeCalculator';
import { ComparisonSection } from './components/clean/ComparisonSection';
import { HowItWorksSection } from './components/clean/HowItWorksSection';
import { FAQAccordion } from './components/clean/FAQAccordion';
import { Footer } from './components/clean/Footer';

export const App: React.FC = () => {
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('');

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

      <main id="top">
        {/* 2. Hero Section: 3D Physics ID Lanyard Badge with vha.lokh Brand Logo */}
        <HeroSection44
          greetings={['Namaskara', 'Hello', 'नमस्ते', 'Hey']}
          role="Where Ideas Take Shape."
          availabilityLabel="Accepting Engagements • Mangaluru, IN"
          downloadAction={{ label: 'See Selected Work', href: '#work' }}
          connectAction={{ label: 'Discuss a Project', href: '#contact' }}
        />

        {/* 3. Real Client Works Showcase (with verified mobile layouts) */}
        <WorksShowcase />

        {/* 4. 21st.dev Feature Bento Grid */}
        <BentoFeatures />

        {/* 6. Services: What We Provide */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 7. Comparison Table */}
        <ComparisonSection />

        {/* 8. Simple 4-Step Process */}
        <HowItWorksSection />

        {/* 9. Interactive Tactile FAQ Drawer */}
        <FAQAccordion />

        {/* 10. Tactile Project Intake & Direct Contact Section */}
        <ScopeCalculator initialService={selectedServiceForInquiry} />
      </main>

      {/* 11. Clean Light Footer */}
      <Footer />
    </div>
  );
};

export default App;
