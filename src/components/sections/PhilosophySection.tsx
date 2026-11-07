import React from 'react';
import { motion } from 'framer-motion';
import { PHILOSOPHY_TENETS } from '../../config/brand';
import { soundEngine } from '../ui/AudioHaptic';
import { Sparkle } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="relative py-24 md:py-36 bg-obsidian hairline-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-8 hairline-b mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent-acid uppercase tracking-widest">
              // Section 04
            </span>
            <span className="text-bone/20">|</span>
            <span className="font-mono text-xs uppercase tracking-widest text-bone/60">
              Creative Philosophy & Design Doctrine
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-bone/40 uppercase">
            <Sparkle className="h-3.5 w-3.5 text-accent-acid" />
            <span>Foundational Tenets</span>
          </div>
        </div>

        {/* Section Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-8">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-bone leading-none">
              The Doctrine of Restraint
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="font-editorial text-xl italic text-bone/70 leading-relaxed">
              We reject the decorative clutter of modern product design in favor of sharp typographic tension, mathematical grid systems, and structural honesty.
            </p>
          </div>
        </div>

        {/* 4-Quadrant Asymmetric Brutalist Tenet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-bone/10 hairline-border bg-obsidian-surface">
          {PHILOSOPHY_TENETS.map((tenet, idx) => (
            <motion.div
              key={tenet.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => soundEngine.playHover()}
              className="p-8 sm:p-12 space-y-6 group hover:bg-obsidian-card transition-colors duration-200"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-3xl font-extrabold text-bone/30 group-hover:text-accent-acid transition-colors">
                  {tenet.number}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-bone/40">
                  TENET // 0{idx + 1}
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-bone group-hover:text-accent-acid transition-colors">
                  {tenet.title}
                </h3>
                <p className="mt-2 font-editorial text-lg italic text-bone-muted">
                  "{tenet.subtitle}"
                </p>
              </div>

              <p className="text-sm text-bone/70 leading-relaxed font-normal">
                {tenet.elaboration}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

