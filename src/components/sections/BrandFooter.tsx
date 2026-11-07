import React from 'react';
import { ArrowUp, ExternalLink } from 'lucide-react';
import { STUDIO_CONFIG } from '../../config/brand';
import { soundEngine } from '../ui/AudioHaptic';
import { LiveTelemetry } from '../ui/LiveTelemetry';

export const BrandFooter: React.FC = () => {
  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-obsidian-deep text-bone overflow-hidden hairline-t">
      {/* Top Footer Navigation & Channels */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 items-start">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center bg-accent-acid text-obsidian font-mono font-black text-sm">
                VL
              </div>
              <span className="font-display text-2xl font-bold uppercase tracking-tight text-bone">
                {STUDIO_CONFIG.name}
              </span>
            </div>

            <p className="text-sm text-bone/60 leading-relaxed max-w-sm">
              Independent Digital Creative & Technology Studio. Engineering high-craft web experiences, bespoke brand systems, and creative software architectures.
            </p>

            <div className="pt-2">
              <LiveTelemetry compact />
            </div>
          </div>

          {/* Sitemap links */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-acid block">
              // Studio Navigation
            </span>
            <ul className="space-y-2.5 font-mono text-xs text-bone/70">
              <li>
                <a
                  href="#disciplines"
                  onClick={() => soundEngine.playClick()}
                  className="hover:text-accent-acid transition-colors"
                >
                  01. Disciplines & Practices
                </a>
              </li>
              <li>
                <a
                  href="#works"
                  onClick={() => soundEngine.playClick()}
                  className="hover:text-accent-acid transition-colors"
                >
                  02. Selected Works
                </a>
              </li>
              <li>
                <a
                  href="#philosophy"
                  onClick={() => soundEngine.playClick()}
                  className="hover:text-accent-acid transition-colors"
                >
                  03. Design Philosophy
                </a>
              </li>
              <li>
                <a
                  href="#protocol"
                  onClick={() => soundEngine.playClick()}
                  className="hover:text-accent-acid transition-colors"
                >
                  04. The Production Protocol
                </a>
              </li>
              <li>
                <a
                  href="#lab"
                  onClick={() => soundEngine.playClick()}
                  className="hover:text-accent-acid transition-colors"
                >
                  05. Interactive Lab
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => soundEngine.playClick()}
                  className="hover:text-accent-acid transition-colors"
                >
                  06. Initiate Brief
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Electronic Channels */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-acid block">
              // Digital Presence
            </span>

            <div className="space-y-3 font-mono text-xs">
              <a
                href={STUDIO_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-obsidian-surface hairline-border hover:border-accent-acid hover:text-accent-acid transition-colors"
              >
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub Repository</span>
                </div>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <a
                href={STUDIO_CONFIG.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-obsidian-surface hairline-border hover:border-accent-acid hover:text-accent-acid transition-colors"
              >
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>X / Twitter Dispatch</span>
                </div>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <a
                href={STUDIO_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-obsidian-surface hairline-border hover:border-accent-acid hover:text-accent-acid transition-colors"
              >
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76c0 .98-.78 1.76-1.75 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                  <span>LinkedIn Network</span>
                </div>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Back to top row */}
        <div className="mt-16 pt-8 hairline-t flex items-center justify-between">
          <span className="font-mono text-xs text-bone/40">
            © {new Date().getFullYear()} {STUDIO_CONFIG.name}. ALL RIGHTS RESERVED.
          </span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-bone/70 hover:text-accent-acid transition-colors"
          >
            <span>Back to Summit</span>
            <div className="h-7 w-7 flex items-center justify-center hairline-border">
              <ArrowUp className="h-3.5 w-3.5" />
            </div>
          </button>
        </div>
      </div>

      {/* Massive Monumental Brand Typography Stamp */}
      <div className="w-full hairline-t bg-obsidian select-none overflow-hidden py-4 sm:py-6 text-center">
        <span className="block font-display font-black text-[15vw] leading-none tracking-tighter text-bone/[0.07] uppercase hover:text-bone/[0.12] transition-colors">
          {STUDIO_CONFIG.name}
        </span>
      </div>
    </footer>
  );
};
