import React from 'react';
import { InteractiveLab } from '../brand/InteractiveLab';
import { Terminal, Cpu } from 'lucide-react';

export const LabSection: React.FC = () => {
  return (
    <section id="lab" className="relative py-24 md:py-36 bg-obsidian hairline-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 hairline-b mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent-acid uppercase tracking-widest">
              // Section 05.5
            </span>
            <span className="text-bone/20">|</span>
            <span className="font-mono text-xs uppercase tracking-widest text-bone/60">
              Interactive Creative Technology Sandbox
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-bone/40 uppercase">
            <Cpu className="h-3.5 w-3.5 text-accent-acid" />
            <span>Hardware Accelerated Canvas</span>
          </div>
        </div>

        {/* Section Header Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-end">
          <div className="lg:col-span-8">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-bone">
              Studio Interactive Lab
            </h2>
            <p className="mt-3 text-base md:text-lg text-bone/60 max-w-2xl leading-relaxed">
              We prototype our kinetic ideas directly in code. Test the real-time deflection matrix below—interactive spring physics, algorithmic character distribution, and procedural sound feedback.
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="p-4 bg-obsidian-surface hairline-border font-mono text-xs text-bone/70 space-y-1">
              <div className="flex items-center gap-2 text-accent-acid">
                <Terminal className="h-3.5 w-3.5" />
                <span>ACTIVE SHADER WORKLET</span>
              </div>
              <p className="text-[11px] text-bone/50">
                Zero third-party 3D bloat. Pure 60fps Canvas 2D + Web Audio API.
              </p>
            </div>
          </div>
        </div>

        {/* The Interactive Lab Canvas */}
        <InteractiveLab />
      </div>
    </section>
  );
};

