import React from 'react';
import { ArrowDown, MessageCircle, Smartphone, Zap, MapPin } from 'lucide-react';
import { STUDIO_CONFIG } from '../../config/brand';

interface HeroProps {
  onExploreWork: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenContact }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-stone-200 bg-[#FAF9F5]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Availability Pill */}
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 mb-8">
          <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>{STUDIO_CONFIG.availability}</span>
          <span className="text-emerald-400">•</span>
          <span className="text-emerald-700 font-normal">Mangalore, India</span>
        </div>

        {/* Big Clear Heading */}
        <div className="max-w-4xl space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15]">
            Clean, modern websites that make your business look established and{' '}
            <span className="text-brand-700 underline decoration-brand-200 decoration-wavy decoration-2 underline-offset-8">
              bring in real customers
            </span>
            .
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 leading-relaxed max-w-3xl font-normal">
            We build fast, beautifully crafted websites for salons, clinics, independent professionals, and local brands. 
            No confusing tech jargon. No slow clunky templates. Just clean websites with 1-tap WhatsApp booking, mobile-first design, and clear pricing.
          </p>
        </div>

        {/* Clear Action Buttons */}
        <div className="mt-10 flex flex-wrap gap-4 items-center">
          <button
            onClick={onExploreWork}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-brand-800 transition-all hover:shadow-lg"
          >
            <span>See What We’ve Built</span>
            <ArrowDown className="h-4 w-4" />
          </button>

          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 rounded-xl bg-white border border-stone-300 px-6 py-3.5 text-sm font-semibold text-stone-800 shadow-sm hover:bg-stone-50 hover:border-stone-400 transition-all"
          >
            <MessageCircle className="h-4 w-4 text-emerald-600" />
            <span>Discuss Your Project</span>
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-16 pt-10 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0 shadow-sm">
              <Smartphone className="h-4 w-4 text-brand-700" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">100% Mobile Ready</h4>
              <p className="text-xs text-stone-500 mt-0.5">Looks sharp and easy to navigate on every phone.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0 shadow-sm">
              <MessageCircle className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">WhatsApp & Calls</h4>
              <p className="text-xs text-stone-500 mt-0.5">Direct 1-tap buttons for clients to book instantly.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0 shadow-sm">
              <Zap className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Fast & Clean Code</h4>
              <p className="text-xs text-stone-500 mt-0.5">Loads in under 2 seconds without annoying lag.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0 shadow-sm">
              <MapPin className="h-4 w-4 text-brand-700" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Based in Mangalore</h4>
              <p className="text-xs text-stone-500 mt-0.5">Direct communication with reliable local support.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
