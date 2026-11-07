import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { STUDIO_CONFIG } from '../../config/brand';
import { soundEngine } from '../ui/AudioHaptic';
import { LiveTelemetry } from '../ui/LiveTelemetry';
import { MagneticButton } from '../ui/MagneticButton';

interface BrandHeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenCommission: () => void;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onNavigate,
  onOpenCommission,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Disciplines', id: 'disciplines' },
    { label: 'Selected Works', id: 'works' },
    { label: 'Philosophy', id: 'philosophy' },
    { label: 'Protocol', id: 'protocol' },
    { label: 'Studio Lab', id: 'lab' },
  ];

  const handleNavClick = (id: string) => {
    soundEngine.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-obsidian/85 backdrop-blur-md hairline-b transition-all duration-300">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Mark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              soundEngine.playClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-3 select-none"
          >
            {/* Geometric brand glyph */}
            <div className="relative flex h-8 w-8 items-center justify-center bg-bone text-obsidian font-mono font-black text-sm tracking-tighter transition-transform duration-300 group-hover:scale-95 group-hover:bg-accent-acid">
              <span>VL</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-tight text-bone transition-colors group-hover:text-accent-acid">
                {STUDIO_CONFIG.name}
              </span>
              <span className="font-mono text-[9px] tracking-widest uppercase text-bone/50 -mt-1">
                Studio ®
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => soundEngine.playHover()}
                className="group relative font-mono text-xs uppercase tracking-wider text-bone/70 hover:text-bone transition-colors py-1"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-accent-acid transition-all duration-200 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Controls: Audio Haptic + Telemetry + CTA */}
          <div className="flex items-center gap-3">
            {/* Live Telemetry (compact on tablet/desktop) */}
            <div className="hidden md:block">
              <LiveTelemetry compact />
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                onToggleSound();
                soundEngine.playClick();
              }}
              aria-label={soundEnabled ? 'Disable audio haptics' : 'Enable audio haptics'}
              className="flex h-9 w-9 items-center justify-center hairline-border bg-obsidian-surface/80 text-bone/80 hover:text-accent-acid hover:border-accent-acid transition-colors"
              title={soundEnabled ? 'Mute haptic audio' : 'Enable haptic audio'}
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4 text-accent-acid" />
              ) : (
                <VolumeX className="h-4 w-4 text-bone/40" />
              )}
            </button>

            {/* Magnetic Initiate CTA */}
            <div className="hidden sm:block">
              <MagneticButton
                variant="brutalist"
                onClick={() => {
                  soundEngine.playClick();
                  onOpenCommission();
                }}
                className="py-2 px-4 text-xs font-mono font-bold"
              >
                <span>Initiate Brief</span>
                <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </MagneticButton>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => {
                soundEngine.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden flex h-9 w-9 items-center justify-center hairline-border bg-obsidian-surface text-bone hover:text-accent-acid"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 flex flex-col bg-obsidian px-6 pt-24 pb-8 lg:hidden animate-in fade-in duration-200">
          <div className="mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-acid">
              // Navigation Index
            </span>
          </div>

          <nav className="flex flex-col gap-6">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="group flex items-baseline justify-between hairline-b pb-4 text-left font-display text-3xl font-bold uppercase tracking-tight text-bone hover:text-accent-acid transition-colors"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-bone/40 group-hover:text-accent-acid">
                  0{idx + 1}
                </span>
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-4 pt-8 hairline-t">
            <div className="py-2">
              <LiveTelemetry compact />
            </div>
            <MagneticButton
              variant="brutalist"
              onClick={() => {
                soundEngine.playClick();
                onOpenCommission();
                setMobileMenuOpen(false);
              }}
              className="w-full py-4 text-sm font-mono"
            >
              Initiate Project Brief
            </MagneticButton>
          </div>
        </div>
      )}
    </>
  );
};

