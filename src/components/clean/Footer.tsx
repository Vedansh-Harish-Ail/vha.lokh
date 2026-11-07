import React from 'react';
import { ArrowUp } from 'lucide-react';
import { STUDIO_CONFIG } from '../../config/brand';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-stone-200 py-12 text-stone-600">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-700 text-white font-bold text-xs">
                vl
              </div>
              <span className="font-bold text-lg text-stone-900 tracking-tight">
                {STUDIO_CONFIG.name}
              </span>
            </div>
            <p className="mt-1 text-xs text-stone-500 max-w-md">
              Clean, mobile-friendly web design for small businesses, salons, and independent professionals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-stone-600">
            <a href="#work" className="hover:text-stone-900 transition-colors">Our Work</a>
            <a href="#services" className="hover:text-stone-900 transition-colors">Services</a>
            <a href="#process" className="hover:text-stone-900 transition-colors">How It Works</a>
            <a href="#contact" className="hover:text-stone-900 transition-colors">Contact</a>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {STUDIO_CONFIG.name}. Based in Mangalore, India.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-stone-900 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

