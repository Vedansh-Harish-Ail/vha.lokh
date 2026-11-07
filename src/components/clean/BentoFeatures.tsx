import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Zap, MessageCircle, MapPin, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';

export const BentoFeatures: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F8FAFC] border-b border-slate-200">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
            <span>Engineered for Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Everything Your Business Needs to Win Online
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            A website shouldn't just sit there looking pretty. It must load instantly, look stunning on mobile phones, and make it effortless for customers to contact you.
          </p>
        </motion.div>

        {/* 21st.dev Inspired Bento Grid with Spotlight Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Mobile First (Spans 2 columns on tablet/desktop) */}
          <SpotlightCard className="md:col-span-2 rounded-3xl bg-white border border-slate-200 p-8 flex flex-col justify-between shadow-sm hover:border-indigo-300">
            <div className="space-y-4 max-w-lg">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 shadow-2xs">
                <Smartphone className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Crafted for the Screen in Everyone’s Pocket
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Over 85% of your customers visit from their phones. We test every font size, tap target, and button to ensure browsing your website feels as smooth as an elite mobile app.
              </p>
            </div>

            {/* Visual Mini Mockup Bar */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-medium text-slate-700">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Large Tap Targets</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Zero Horizontal Lag</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Crisp Typography</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 2: 1-Tap WhatsApp Conversion */}
          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.15)"
            className="rounded-3xl bg-emerald-50/50 border border-emerald-200/80 p-8 flex flex-col justify-between shadow-sm hover:border-emerald-400"
          >
            <div className="space-y-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white border border-emerald-200 text-emerald-600 shadow-2xs">
                <MessageCircle className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                1-Tap WhatsApp Lead Capture
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No complex multi-step forms. Visitors tap one button on their phone and start a direct conversation with you on WhatsApp.
              </p>
            </div>

            <div className="mt-6 p-3.5 rounded-2xl bg-white border border-emerald-200 text-xs text-slate-700 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="font-semibold text-emerald-950">Pre-filled WhatsApp RFQ</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-emerald-600" />
            </div>
          </SpotlightCard>

          {/* Card 3: Instant Speed (Sub-2s) */}
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.15)"
            className="rounded-3xl bg-amber-50/40 border border-amber-200/80 p-8 flex flex-col justify-between shadow-sm hover:border-amber-400"
          >
            <div className="space-y-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white border border-amber-200 text-amber-600 shadow-2xs">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Sub-2-Second Loading
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Slow websites lose customers before they even see your menu. Our clean code loads instantly, even on 4G cellular connections.
              </p>
            </div>

            <div className="mt-6 flex items-baseline gap-2 bg-white p-3.5 rounded-2xl border border-amber-200/80 shadow-2xs">
              <span className="text-3xl font-extrabold text-slate-900">98+</span>
              <span className="text-xs text-amber-900 font-semibold">Google Performance Score</span>
            </div>
          </SpotlightCard>

          {/* Card 4: Google Local SEO (Spans 2 columns) */}
          <SpotlightCard className="md:col-span-2 rounded-3xl bg-white border border-slate-200 p-8 flex flex-col justify-between shadow-sm hover:border-indigo-300">
            <div className="space-y-4 max-w-lg">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 shadow-2xs">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Google Search & Location Ready
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Proper page titles, business descriptions, and Google Maps location integration so local customers searching for your services can easily find you and your reviews.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-3 text-xs font-medium text-slate-700">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <ShieldCheck className="h-4 w-4 text-indigo-600 shrink-0" />
                <span>Google Reviews Highlight</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <ShieldCheck className="h-4 w-4 text-indigo-600 shrink-0" />
                <span>Clean Metadata & Schema</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <ShieldCheck className="h-4 w-4 text-indigo-600 shrink-0" />
                <span>SSL Security Included</span>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
