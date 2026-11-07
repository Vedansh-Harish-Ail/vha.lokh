import React from 'react';
import { ArrowDown, MessageCircle, Globe, HeartHandshake, Image as ImageIcon, Headphones, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreWork: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenContact }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200 bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Official Brand Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-xs font-semibold text-indigo-900 mb-8 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
          <span className="font-bold">vha.lokh</span>
          <span className="text-indigo-300">•</span>
          <span>Where Ideas Take Shape</span>
          <span className="text-indigo-300">•</span>
          <span className="text-indigo-700 font-normal">Mangaluru, India</span>
        </div>

        {/* Big Clear Heading with Official Brand Typography */}
        <div className="max-w-4xl space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Web Solutions That{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Work for You.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl font-normal">
            Need a custom website or digital solution? Alongside software engineering, I undertake select freelance engagements under my independent brand <strong>vha.lokh</strong>. 
            I collaborate with small businesses, events, and individuals to create responsive websites, bespoke wedding invitation platforms, digital cards, promotional posters, and provide end-to-end IT support.
          </p>
        </div>

        {/* 4 Core Offerings Pills */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
            Small Business Websites
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
            Wedding Portals & Cards
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
            Digital Marketing & Posters
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
            Digital & IT Support
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap gap-4 items-center">
          <button
            onClick={onExploreWork}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-600 transition-all hover:shadow-lg"
          >
            <span>See Selected Work</span>
            <ArrowDown className="h-4 w-4" />
          </button>

          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-300 px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 hover:border-slate-400 transition-all"
          >
            <MessageCircle className="h-4 w-4 text-indigo-600" />
            <span>Discuss a Project</span>
          </button>
        </div>

        {/* 4 Pillars Trust Bar */}
        <div className="mt-16 pt-10 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm text-indigo-600">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Small Business Websites</h4>
              <p className="text-xs text-slate-500 mt-0.5">Mobile-first, fast, with WhatsApp booking.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm text-blue-600">
              <HeartHandshake className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Wedding Portals & Cards</h4>
              <p className="text-xs text-slate-500 mt-0.5">Live RSVP tracking & countdowns.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm text-indigo-600">
              <ImageIcon className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Posters & Marketing</h4>
              <p className="text-xs text-slate-500 mt-0.5">Promotional flyers & social graphics.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm text-blue-600">
              <Headphones className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Digital & IT Support</h4>
              <p className="text-xs text-slate-500 mt-0.5">Domains, hosting & tech consulting.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
