import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Menu, X, ArrowUpRight } from 'lucide-react';
import { STUDIO_CONFIG } from '../../config/brand';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Work', id: 'work' },
    { label: 'Services', id: 'services' },
    { label: 'Estimator', id: 'estimator' },
    { label: 'How It Works', id: 'process' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8FAFC]/90 backdrop-blur-md border-b border-slate-200/80 transition-shadow">
      <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-16 py-3.5">
        {/* Official Brand Logo with Pure Transparent Emblem (No Flat Background Box) */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group"
        >
          {/* Pure transparent ribbon emblem without flat background box */}
          <motion.img
            src="/assets/brand/vha-lokh-symbol-transparent.png"
            alt="vha.lokh emblem"
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', damping: 15, stiffness: 350 }}
            className="h-8 md:h-9 w-auto object-contain cursor-pointer"
          />

          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              {STUDIO_CONFIG.name}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 -mt-1">
              Ideas • Websites • Solutions
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <motion.button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {link.label}
            </motion.button>
          ))}
        </nav>

        {/* Action Button & Location Badge */}
        <div className="hidden sm:flex items-center gap-4">
          <span className="hidden lg:inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Mangaluru, IN</span>
          </span>

          <motion.button
            onClick={() => handleNavClick('contact')}
            whileHover={{ y: -1.5, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', damping: 15, stiffness: 400 }}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4.5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-600 transition-colors"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-slate-200 bg-white px-6 py-6 shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-left text-sm font-bold uppercase tracking-wider text-slate-800 hover:text-indigo-600"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Discuss Your Requirement</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
