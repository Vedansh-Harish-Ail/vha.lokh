import React, { useState } from 'react';
import { MessageSquare, Menu, X, ArrowUpRight } from 'lucide-react';
import { STUDIO_CONFIG } from '../../config/brand';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Featured Work', id: 'work' },
    { label: 'Services', id: 'services' },
    { label: 'How It Works', id: 'process' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Brand Logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-white font-bold text-sm shadow-sm group-hover:bg-brand-800 transition-colors">
            vl
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-stone-900 group-hover:text-brand-700 transition-colors">
              {STUDIO_CONFIG.name}
            </span>
            <span className="text-[11px] font-medium text-stone-500 -mt-1">
              Web Design Studio
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Button & Location Badge */}
        <div className="hidden sm:flex items-center gap-4">
          <span className="hidden lg:inline-flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Mangalore, IN</span>
          </span>

          <button
            onClick={() => handleNavClick('contact')}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-800 transition-colors"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-white px-6 py-6 shadow-lg animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left text-base font-semibold text-stone-800 hover:text-brand-700"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="mt-6 pt-6 border-t border-stone-100">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand-700 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-800"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Discuss Your Website</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

