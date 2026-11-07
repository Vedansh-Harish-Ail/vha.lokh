import React, { useState } from 'react';
import { CustomCursor, CursorMode } from './components/ui/CustomCursor';
import { NoiseOverlay } from './components/ui/NoiseOverlay';
import { Marquee } from './components/ui/Marquee';
import { soundEngine } from './components/ui/AudioHaptic';
import { BrandHeader } from './components/brand/BrandHeader';
import { ProjectModal } from './components/brand/ProjectModal';
import { HeroSection } from './components/sections/HeroSection';
import { ManifestoSection } from './components/sections/ManifestoSection';
import { DisciplinesSection } from './components/sections/DisciplinesSection';
import { SelectedWorksSection } from './components/sections/SelectedWorksSection';
import { PhilosophySection } from './components/sections/PhilosophySection';
import { ProcessSection } from './components/sections/ProcessSection';
import { LabSection } from './components/sections/LabSection';
import { ContactSection } from './components/sections/ContactSection';
import { BrandFooter } from './components/sections/BrandFooter';
import { Project } from './types';

export const App: React.FC = () => {
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    soundEngine.enabled = nextState;
    setSoundEnabled(nextState);
  };

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCommission = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreWork = () => {
    const workElem = document.getElementById('works');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tickerItemsOne = [
    'INDEPENDENT DIGITAL CREATIVE STUDIO',
    'BESPOKE BRAND ARCHITECTURE',
    'HIGH-CRAFT WEB EXPERIENCES',
    'AVANT-GARDE ART DIRECTION',
    'RIGOROUS SOFTWARE ENGINEERING',
    'ZERO COMPLACENCY',
  ];

  const tickerItemsTwo = [
    'ACCEPTING Q2 / Q3 2025 COMMISSIONS',
    'NEW DELHI [28.61° N, 77.20° E]',
    '60FPS PERFORMANCE BUDGET',
    'WCAG AAA ACCESSIBILITY',
    'ENDURING DIGITAL ARTIFACTS',
  ];

  return (
    <div className="relative min-h-screen bg-obsidian text-bone selection:bg-accent-acid selection:text-obsidian font-sans">
      {/* Subtle Analog Grain Overlay */}
      <NoiseOverlay />

      {/* Interactive Custom Cursor */}
      <CustomCursor mode={cursorMode} label={cursorLabel} />

      {/* Brand Header */}
      <BrandHeader
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onNavigate={handleNavigate}
        onOpenCommission={handleOpenCommission}
      />

      {/* Main Experience Stream */}
      <main id="top">
        {/* 01. Hero Experience */}
        <HeroSection
          onOpenCommission={handleOpenCommission}
          onExploreWork={handleExploreWork}
        />

        {/* Kinetic Ticker */}
        <Marquee items={tickerItemsOne} speed="normal" />

        {/* 02. The Studio Manifesto */}
        <ManifestoSection />

        {/* 03. Disciplines / What We Create */}
        <DisciplinesSection />

        {/* 04. Selected Works */}
        <SelectedWorksSection
          onSelectProject={(proj) => {
            setSelectedProject(proj);
            setCursorMode('default');
          }}
          onSetCursorMode={(mode) => {
            setCursorMode(mode);
            setCursorLabel(mode === 'project' ? 'VIEW' : '');
          }}
        />

        {/* 05. Creative Philosophy */}
        <PhilosophySection />

        {/* 06. The Production Protocol */}
        <ProcessSection />

        {/* 07. Studio Interactive Lab */}
        <LabSection />

        {/* Secondary Inverted Ticker */}
        <Marquee items={tickerItemsTwo} speed="slow" reverse />

        {/* 08. Contact / Initiate Collaboration */}
        <ContactSection />
      </main>

      {/* Brand Closing / Footer */}
      <BrandFooter />

      {/* Architectural Case Study Spec Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenCommission={() => {
          setSelectedProject(null);
          handleOpenCommission();
        }}
      />
    </div>
  );
};

export default App;
