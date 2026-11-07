import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Layers } from 'lucide-react';
import { DISCIPLINES } from '../../config/brand';
import { soundEngine } from '../ui/AudioHaptic';

export const DisciplinesSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(DISCIPLINES[0].id);

  const handleToggle = (id: string) => {
    soundEngine.playClick();
    setActiveId(activeId === id ? '' : id);
  };

  return (
    <section id="disciplines" className="relative py-24 md:py-36 bg-obsidian hairline-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 hairline-b mb-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent-acid uppercase tracking-widest">
              // Section 02
            </span>
            <span className="text-bone/20">|</span>
            <span className="font-mono text-xs uppercase tracking-widest text-bone/60">
              Disciplines & Practices
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-bone/40 uppercase">
            <Layers className="h-3.5 w-3.5 text-accent-acid" />
            <span>Core Capabilities</span>
          </div>
        </div>

        {/* Section Title Intro */}
        <div className="mb-16 max-w-3xl">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-bone">
            What We Create
          </h2>
          <p className="mt-4 text-base md:text-lg text-bone/60 font-normal leading-relaxed">
            We don't offer generic service bundles. We engineer focused creative and technical systems tailored to brands that demand absolute distinction.
          </p>
        </div>

        {/* Interactive Disciplines Stack */}
        <div className="space-y-4">
          {DISCIPLINES.map((discipline) => {
            const isOpen = activeId === discipline.id;

            return (
              <div
                key={discipline.id}
                className={`transition-colors duration-200 hairline-border ${
                  isOpen ? 'bg-obsidian-surface border-bone/30' : 'bg-obsidian hover:bg-obsidian-surface/60'
                }`}
              >
                {/* Row Header Button */}
                <button
                  onClick={() => handleToggle(discipline.id)}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left group"
                >
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="font-mono text-sm sm:text-base text-accent-acid font-semibold">
                      {discipline.code}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-bone group-hover:text-accent-acid transition-colors">
                        {discipline.title}
                      </h3>
                      <p className="mt-1 font-editorial text-base sm:text-lg italic text-bone/60">
                        {discipline.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 ml-4">
                    <div className="h-9 w-9 flex items-center justify-center hairline-border text-bone/70 group-hover:text-accent-acid group-hover:border-accent-acid transition-colors">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </div>
                  </div>
                </button>

                {/* Collapsible Details */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden hairline-t bg-obsidian-card/40"
                    >
                      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Description */}
                        <div className="md:col-span-6 space-y-4">
                          <span className="font-mono text-xs uppercase tracking-widest text-bone/40 block">
                            Scope & Rationale
                          </span>
                          <p className="text-base text-bone/80 leading-relaxed">
                            {discipline.description}
                          </p>
                        </div>

                        {/* Deliverables List */}
                        <div className="md:col-span-3 space-y-3">
                          <span className="font-mono text-xs uppercase tracking-widest text-bone/40 block">
                            Key Deliverables
                          </span>
                          <ul className="space-y-1.5 font-mono text-xs text-bone/80">
                            {discipline.capabilities.map((cap, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="h-1 w-1 bg-accent-acid" />
                                <span>{cap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Stack / Tools */}
                        <div className="md:col-span-3 space-y-3">
                          <span className="font-mono text-xs uppercase tracking-widest text-bone/40 block">
                            Technology Tools
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {discipline.tools.map((tool) => (
                              <span
                                key={tool}
                                className="px-2.5 py-1 font-mono text-[11px] bg-obsidian hairline-border text-bone/70"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
