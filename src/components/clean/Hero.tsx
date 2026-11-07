import React from 'react';
import { ArrowDown, MessageCircle, Globe, HeartHandshake, Image as ImageIcon, Headphones, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreWork: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenContact }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-stone-200 bg-[#FAF9F5]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-xs font-semibold text-emerald-800 mb-8 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-bold">FREELANCE & CLIENT SERVICES</span>
          <span className="text-emerald-400">•</span>
          <span>vha.lokh (2023 – Present)</span>
          <span className="text-emerald-400">•</span>
          <span className="text-emerald-700 font-normal">Mangalore, India</span>
        </div>

        {/* Big Clear Heading */}
        <div className="max-w-4xl space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15]">
            Need a Custom Website or{' '}
            <span className="text-brand-700 underline decoration-brand-200 decoration-wavy decoration-2 underline-offset-8">
              Digital Solution?
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 leading-relaxed max-w-3xl font-normal">
            Alongside software engineering, I undertake select freelance engagements under my independent brand <strong>vha.lokh</strong>. 
            I collaborate with small businesses, events, and individuals to create responsive websites, bespoke wedding invitation platforms, digital cards, promotional posters, and provide end-to-end IT support.
          </p>
        </div>

        {/* 4 Core Offerings Pills */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-800 shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            Small Business Websites
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-800 shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            Wedding Portals & Cards
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-800 shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            Digital Marketing & Posters
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-800 shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            Digital & IT Support
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap gap-4 items-center">
          <button
            onClick={onExploreWork}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-brand-800 transition-all hover:shadow-lg"
          >
            <span>See Selected Work</span>
            <ArrowDown className="h-4 w-4" />
          </button>

          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 rounded-xl bg-white border border-stone-300 px-6 py-3.5 text-sm font-semibold text-stone-800 shadow-sm hover:bg-stone-50 hover:border-stone-400 transition-all"
          >
            <MessageCircle className="h-4 w-4 text-emerald-600" />
            <span>Discuss a Project</span>
          </button>
        </div>

        {/* 4 Pillars Trust Bar */}
        <div className="mt-16 pt-10 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0 shadow-sm">
              <Globe className="h-4 w-4 text-brand-700" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Small Business Websites</h4>
              <p className="text-xs text-stone-500 mt-0.5">Mobile-first, fast, with WhatsApp booking.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0 shadow-sm">
              <HeartHandshake className="h-4 w-4 text-rose-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Wedding Portals & Cards</h4>
              <p className="text-xs text-stone-500 mt-0.5">Live RSVP tracking & countdowns.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0 shadow-sm">
              <ImageIcon className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Posters & Marketing</h4>
              <p className="text-xs text-stone-500 mt-0.5">Promotional flyers & social graphics.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0 shadow-sm">
              <Headphones className="h-4 w-4 text-brand-700" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Digital & IT Support</h4>
              <p className="text-xs text-stone-500 mt-0.5">Domains, hosting & tech consulting.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
