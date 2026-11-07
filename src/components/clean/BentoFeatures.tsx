import React from 'react';
import { Smartphone, Zap, MessageCircle, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';

export const BentoFeatures: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-stone-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700">
            <span>Engineered for Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Everything Your Business Needs to Win Online
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            A website shouldn't just sit there looking pretty. It must load instantly, look stunning on mobile phones, and make it effortless for customers to contact you.
          </p>
        </div>

        {/* 21st.dev Inspired Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Mobile First (Spans 2 columns on tablet/desktop) */}
          <div className="md:col-span-2 rounded-2xl bg-[#FAF9F5] border border-stone-200 p-8 flex flex-col justify-between hover:border-brand-500 transition-all shadow-sm">
            <div className="space-y-4 max-w-lg">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-stone-200 text-brand-700 shadow-sm">
                <Smartphone className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900">
                Crafted for the Screen in Everyone’s Pocket
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Over 85% of your customers visit from their phones. We test every font size, tap target, and button to ensure browsing your website feels as smooth as an elite mobile app.
              </p>
            </div>

            {/* Visual Mini Mockup Bar */}
            <div className="mt-8 pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-xs font-medium text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Large Tap Targets</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Zero Horizontal Lag</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Crisp Typography</span>
              </div>
            </div>
          </div>

          {/* Card 2: 1-Tap WhatsApp Conversion */}
          <div className="rounded-2xl bg-emerald-50/60 border border-emerald-200/80 p-8 flex flex-col justify-between hover:border-emerald-500 transition-all shadow-sm">
            <div className="space-y-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-emerald-200 text-emerald-600 shadow-sm">
                <MessageCircle className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">
                1-Tap WhatsApp Lead Capture
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                No complex multi-step forms. Visitors tap one button on their phone and start a direct conversation with you on WhatsApp.
              </p>
            </div>

            <div className="mt-6 p-3.5 rounded-xl bg-white border border-emerald-200 text-xs text-stone-700 shadow-sm flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-semibold text-emerald-950">Pre-filled inquiry ready in 1 tap</span>
            </div>
          </div>

          {/* Card 3: Instant Speed (Sub-2s) */}
          <div className="rounded-2xl bg-amber-50/50 border border-amber-200/80 p-8 flex flex-col justify-between hover:border-amber-400 transition-all shadow-sm">
            <div className="space-y-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-amber-200 text-amber-600 shadow-sm">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">
                Sub-2-Second Loading
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Slow websites lose customers before they even see your menu. Our clean code loads instantly, even on 4G cellular connections.
              </p>
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-stone-900">98+</span>
              <span className="text-xs text-stone-500 font-medium">Google Performance Score</span>
            </div>
          </div>

          {/* Card 4: Google Local SEO (Spans 2 columns) */}
          <div className="md:col-span-2 rounded-2xl bg-[#FAF9F5] border border-stone-200 p-8 flex flex-col justify-between hover:border-brand-500 transition-all shadow-sm">
            <div className="space-y-4 max-w-lg">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-stone-200 text-brand-700 shadow-sm">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900">
                Google Search & Location Ready
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Proper page titles, business descriptions, and Google Maps location integration so local customers searching for your services can easily find you and your reviews.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-wrap gap-4 text-xs font-medium text-stone-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-700 shrink-0" />
                <span>Google Reviews Highlight</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-700 shrink-0" />
                <span>Clean Metadata & Schema</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-700 shrink-0" />
                <span>SSL Security Included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

