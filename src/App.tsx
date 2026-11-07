import React, { useState } from 'react';
import { Navbar } from './components/clean/Navbar';
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
        {/* 2. Hero Section: Direct Value & Trust */}
        <Hero
          onExploreWork={() => scrollTo('work')}
          onOpenContact={() => scrollTo('contact')}
        />

        {/* 3. Real Client Works Showcase */}
        <WorksShowcase />

        {/* 4. 21st.dev Feature Bento Grid */}
        <BentoFeatures />

        {/* 5. Services: What We Build */}
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
