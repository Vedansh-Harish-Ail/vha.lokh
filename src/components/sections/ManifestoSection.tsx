import React from 'react';
import { soundEngine } from '../ui/AudioHaptic';

export const ManifestoSection: React.FC = () => {
  return (
    <section className="relative py-24 md:py-36 bg-obsidian-deep hairline-b overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header Tag */}
        <div className="flex items-center justify-between pb-8 hairline-b mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent-acid tracking-widest uppercase">
              // Section 01
            </span>
            <span className="text-bone/20">|</span>
            <span className="font-mono text-xs uppercase tracking-widest text-bone/60">
              The Studio Manifesto
            </span>
          </div>

          <span className="font-mono text-xs text-bone/40 uppercase hidden sm:block">
            Statement of Intent
          </span>
        </div>

        {/* Asymmetric Typography Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Monumental Editorial Statement */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-bone leading-[1.1]">
              The modern web is suffering from a pandemic of{' '}
              <span className="font-editorial lowercase italic font-normal text-accent-acid">
                complacency
              </span>
              . Identical templates. Disposable cards. Forgettable interactions.
            </h2>

            <div className="pt-6 text-lg sm:text-xl md:text-2xl text-bone/80 font-normal leading-relaxed max-w-3xl space-y-6">
              <p>
                At <strong className="text-bone font-semibold">vha.lokh</strong>, we believe digital platforms should 
                feel as intentional and enduring as physical architecture. We do not design for the quick dopamine hit; 
                we design for permanence, distinctiveness, and tangible utility.
              </p>
              <p className="text-bone/60 text-base md:text-lg">
                Every line of code is an aesthetic decision. Every transition is an exercise in restraint. 
                By pairing avant-garde art direction with high-performance engineering, we elevate digital products 
                into unmistakable brand identities.
              </p>
            </div>
          </div>

          {/* Right Column: Brutalist Metadata & Tenet Matrix */}
          <div className="lg:col-span-4 space-y-6 pt-4 lg:pt-0">
            <div className="p-6 bg-obsidian-surface hairline-border space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-accent-acid block">
                Studio Thesis // 01
              </span>
              <p className="font-editorial text-2xl italic text-bone font-light">
                "Restraint is the highest form of creative courage."
              </p>
              <p className="text-xs text-bone/60 leading-relaxed font-mono">
                True digital sophistication is not achieved when there is nothing left to add, but when every remaining 
                element serves an essential architectural purpose.
              </p>
            </div>

            <div className="p-6 bg-obsidian-card hairline-border space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-bone/50 block">
                Primary Directives
              </span>
              <ul className="space-y-2.5 font-mono text-xs text-bone/80">
                <li
                  onMouseEnter={() => soundEngine.playHover()}
                  className="flex items-center gap-2 hover:text-accent-acid transition-colors cursor-default"
                >
                  <span className="text-accent-acid">01.</span>
                  <span>Zero generic boilerplate templates</span>
                </li>
                <li
                  onMouseEnter={() => soundEngine.playHover()}
                  className="flex items-center gap-2 hover:text-accent-acid transition-colors cursor-default"
                >
                  <span className="text-accent-acid">02.</span>
                  <span>Typography-first spatial hierarchy</span>
                </li>
                <li
                  onMouseEnter={() => soundEngine.playHover()}
                  className="flex items-center gap-2 hover:text-accent-acid transition-colors cursor-default"
                >
                  <span className="text-accent-acid">03.</span>
                  <span>Physics-calibrated interaction models</span>
                </li>
                <li
                  onMouseEnter={() => soundEngine.playHover()}
                  className="flex items-center gap-2 hover:text-accent-acid transition-colors cursor-default"
                >
                  <span className="text-accent-acid">04.</span>
                  <span>Uncompromised 60fps performance budgets</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
