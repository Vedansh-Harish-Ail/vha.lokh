import React from 'react';
import { ArrowDown, MessageCircle, Globe, HeartHandshake, Image as ImageIcon, Headphones, CheckCircle2 } from 'lucide-react';
import { HeroMockupShowcase } from './HeroMockupShowcase';

interface HeroProps {
  onExploreWork: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenContact }) => {
  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-200 bg-[#F8FAFC] overflow-hidden">
      {/* Background subtle ambient glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-100/60 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 2-Column Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Context, Badges, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Official Brand Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-xs font-semibold text-indigo-900 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
              <span className="font-bold">vha.lokh</span>
              <span className="text-indigo-300">•</span>
              <span>Where Ideas Take Shape</span>
              <span className="text-indigo-300">•</span>
              <span className="text-indigo-700 font-normal">Mangaluru, India</span>
            </div>

            {/* Big Clear Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Web Solutions That{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Work for You.
              </span>
            </h1>

            {/* Subhead Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              Need a custom website or digital solution? Alongside software engineering, I undertake select freelance engagements under my independent brand <strong>vha.lokh</strong>. 
              I collaborate with small businesses, events, and individuals to create responsive websites, bespoke wedding invitation platforms, digital cards, promotional posters, and provide end-to-end IT support.
            </p>

            {/* 4 Core Offerings Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
                Small Business Websites
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
                Wedding Portals & Cards
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
                Digital Marketing & Posters
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
                Digital & IT Support
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-4 items-center">
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
          </div>

          {/* Right Column: 21st.dev Interactive Device & Project Mockup */}
          <div className="lg:col-span-5">
            <HeroMockupShowcase />
          </div>

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
