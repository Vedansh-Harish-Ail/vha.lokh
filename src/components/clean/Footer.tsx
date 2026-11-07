import React from 'react';
import { ArrowUp, Mail, MapPin } from 'lucide-react';
import { STUDIO_CONFIG } from '../../config/brand';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 py-12 text-slate-600">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center p-1 shadow-sm">
                <img
                  src="/assets/brand/vha-lokh-symbol.jpg"
                  alt="vha.lokh logo mark"
                  className="h-full w-full object-contain rounded"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                  {STUDIO_CONFIG.name}
                </span>
                <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider -mt-0.5">
                  Where Ideas Take Shape.
                </span>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500 max-w-md">
              Clean, mobile-first websites, wedding portals, promotional posters, and IT support for businesses and individuals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <a href="#work" className="hover:text-indigo-600 transition-colors">Work</a>
            <a href="#services" className="hover:text-indigo-600 transition-colors">Services</a>
            <a href="#estimator" className="hover:text-indigo-600 transition-colors">Estimator</a>
            <a href="#process" className="hover:text-indigo-600 transition-colors">How It Works</a>
            <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-indigo-600" />
              <span>Mangaluru, India</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-indigo-600" />
              <span>{STUDIO_CONFIG.email}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} {STUDIO_CONFIG.name}. All rights reserved.</p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
