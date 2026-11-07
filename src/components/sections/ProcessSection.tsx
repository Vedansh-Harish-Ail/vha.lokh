import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STAGES } from '../../config/brand';
import { soundEngine } from '../ui/AudioHaptic';
import { GitCommit, Check } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="protocol" className="relative py-24 md:py-36 bg-obsidian-deep hairline-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-8 hairline-b mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent-acid uppercase tracking-widest">
              // Section 05
            </span>
            <span className="text-bone/20">|</span>
            <span className="font-mono text-xs uppercase tracking-widest text-bone/60">
              The Production Protocol
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-bone/40 uppercase">
            <GitCommit className="h-3.5 w-3.5 text-accent-acid" />
            <span>Execution Lifecycle</span>
          </div>
        </div>

        {/* Section Intro */}
        <div className="mb-16 max-w-3xl">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-bone">
            The Protocol
          </h2>
          <p className="mt-4 text-base md:text-lg text-bone/60 leading-relaxed">
            Every engagement follows a rigorous, non-linear progression engineered to eliminate ambiguity and guarantee flawless aesthetic execution.
          </p>
        </div>

        {/* Interactive Step Navigator */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-10">
          {PROCESS_STAGES.map((stage, idx) => (
            <button
              key={stage.step}
              onClick={() => {
                soundEngine.playClick();
                setActiveStep(idx);
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className={`p-4 text-left font-mono transition-all duration-200 hairline-border ${
                activeStep === idx
                  ? 'bg-accent-acid text-obsidian border-accent-acid font-bold'
                  : 'bg-obsidian-surface text-bone/60 hover:text-bone hover:border-bone/30'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] uppercase mb-1">
                <span>Phase {stage.step}</span>
                <span className={activeStep === idx ? 'text-obsidian' : 'text-accent-acid'}>
                  {stage.timeline}
                </span>
              </div>
              <div className="font-display text-sm uppercase truncate">
                {stage.title.split('&')[0]}
              </div>
            </button>
          ))}
        </div>

        {/* Active Stage Detailed Display */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="p-8 sm:p-12 bg-obsidian-surface hairline-border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="bg-bone text-obsidian px-3 py-1 font-mono text-xs font-bold uppercase">
                Stage {PROCESS_STAGES[activeStep].step}
              </span>
              <span className="font-mono text-xs uppercase text-accent-acid">
                {PROCESS_STAGES[activeStep].timeline}
              </span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-bone">
              {PROCESS_STAGES[activeStep].title}
            </h3>

            <p className="text-base sm:text-lg text-bone/80 leading-relaxed font-normal">
              {PROCESS_STAGES[activeStep].focus}
            </p>
          </div>

          <div className="lg:col-span-5 bg-obsidian-card p-6 hairline-border space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-bone/50 block">
              Core Milestones & Outputs
            </span>
            <ul className="space-y-3 font-mono text-xs text-bone/80">
              {PROCESS_STAGES[activeStep].deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="h-4 w-4 rounded-none bg-accent-acid/10 border border-accent-acid flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-accent-acid" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

