import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Compass, Terminal } from 'lucide-react';
import { STUDIO_CONFIG } from '../../config/brand';
import { soundEngine } from '../ui/AudioHaptic';
import { MagneticButton } from '../ui/MagneticButton';
import { LiveTelemetry } from '../ui/LiveTelemetry';

interface HeroSectionProps {
  onOpenCommission: () => void;
  onExploreWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCommission,
  onExploreWork,
}) => {
  const letters = ['v', 'h', 'a', '.', 'l', 'o', 'k', 'h'];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-6 pb-12 overflow-hidden hairline-b">
      {/* Background architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
        <div className="h-full w-full grid grid-cols-4 md:grid-cols-8 divide-x divide-bone" />
      </div>

      {/* Top telemetry bar */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <LiveTelemetry />
      </div>

      {/* Centerpiece Hero Statement & Giant Typography */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 my-auto py-12 z-10">
        {/* Subtle context tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-bone/60 mb-6"
        >
          <span className="flex h-2 w-2 bg-accent-acid" />
          <span>Independent Digital Creative & Technology Studio</span>
          <span className="text-bone/20">—</span>
          <span className="text-bone/40">EST. {STUDIO_CONFIG.established}</span>
        </motion.div>

        {/* Oversized Kinetic Studio Typography */}
        <div className="relative select-none">
          <div className="flex flex-wrap items-baseline font-display font-extrabold tracking-tighter text-[17vw] sm:text-[15vw] md:text-[13vw] lg:text-[11vw] leading-[0.88] uppercase text-bone">
            {letters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.04 }}
                whileHover={{
                  y: -12,
                  color: char === '.' ? '#d4ff3f' : '#f4f2ec',
                  transition: { type: 'spring', stiffness: 350 },
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`inline-block transition-colors duration-150 cursor-pointer ${
                  char === '.' ? 'text-accent-acid' : 'hover:text-accent-acid'
                }`}
              >
                {char}
              </motion.span>
            ))}
            <span className="font-mono text-sm md:text-xl text-bone/40 font-normal align-top ml-2 tracking-normal">
              ®
            </span>
          </div>
        </div>

        {/* Asymmetric Studio Manifesto & Editorial Column */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-7 space-y-4"
          >
            <h1 className="font-editorial text-2xl sm:text-3xl md:text-4xl italic text-bone/95 leading-tight font-light">
              Crafting high-presence digital artifacts, bespoke brand systems, and creative engineering architectures.
            </h1>
            <p className="text-sm md:text-base text-bone/60 max-w-xl font-normal leading-relaxed">
              We operate at the volatile intersection of experimental art direction and rigorous software engineering. 
              No generic templates. No disposable trends. Only digital experiences built to command presence and endure.
            </p>
          </motion.div>

          {/* Action Hub */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-5 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 md:justify-end"
          >
            <MagneticButton
              variant="brutalist"
              onClick={() => {
                soundEngine.playClick();
                onOpenCommission();
              }}
              className="py-4 px-6 text-xs md:text-sm"
            >
              <span>Initiate Studio Brief</span>
              <ArrowDownRight className="ml-2 h-4 w-4" />
            </MagneticButton>

            <MagneticButton
              variant="outline"
              onClick={() => {
                soundEngine.playClick();
                onExploreWork();
              }}
              className="py-4 px-6 text-xs md:text-sm"
            >
              <span>Explore Selected Work</span>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Bottom Technical Coordinates Bar */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 hairline-t font-mono text-[11px] text-bone/50 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Compass className="h-3.5 w-3.5 text-accent-acid" />
            <span>LAT 28°37' N / LON 77°12' E</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline">ARCHITECTURE: REACT 19 / TS / TAILWIND</span>
            <div className="flex items-center gap-1.5">
              <Terminal className="h-3 w-3 text-bone/40" />
              <span className="text-bone/80">FRAMEWORK: EDITORIAL BRUTALISM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
