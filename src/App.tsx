import React, { useState } from 'react';
import { Navbar } from './components/clean/Navbar';
import { Hero } from './components/clean/Hero';
import { WorksShowcase } from './components/clean/WorksShowcase';
import { ServicesSection } from './components/clean/ServicesSection';
import { HowItWorksSection } from './components/clean/HowItWorksSection';
import { ContactSection } from './components/clean/ContactSection';
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
      {/* Clean Light Navigation */}
      <Navbar onNavigate={scrollTo} />

      <main id="top">
        {/* 1. Hero: Clear Value Proposition */}
        <Hero
          onExploreWork={() => scrollTo('work')}
          onOpenContact={() => scrollTo('contact')}
        />

        {/* 2. Real Client Works Showcase */}
        <WorksShowcase />

        {/* 3. Services: What We Build */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 4. Simple 4-Step Process */}
        <HowItWorksSection />

        {/* 5. Friendly Contact & WhatsApp Channel */}
        <ContactSection initialService={selectedServiceForInquiry} />
      </main>

      {/* Clean Footer */}
      <Footer />
    </div>
  );
};

export default App;
