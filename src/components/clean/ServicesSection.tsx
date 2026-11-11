import React from 'react';
import { motion } from 'framer-motion';
import { Globe, HeartHandshake, Image as ImageIcon, Headphones, ArrowRight } from 'lucide-react';
import { SERVICES } from '../../config/brand';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'small-business-websites':
        return <Globe className="h-5 w-5 text-indigo-600" />;
      case 'wedding-portals-cards':
        return <HeartHandshake className="h-5 w-5 text-rose-600" />;
      case 'digital-marketing-posters':
        return <ImageIcon className="h-5 w-5 text-amber-600" />;
      case 'it-support-services':
        return <Headphones className="h-5 w-5 text-blue-600" />;
      default:
        return <Globe className="h-5 w-5 text-indigo-600" />;
    }
  };

  return (
    <section id="services" className="py-14 md:py-20 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header: Brief, Human, Direct */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              <span>What We Offer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Services & Capabilities
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Four focused areas. Direct communication, quick turnaround, and no technical jargon.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">04 Core Offerings</span>
        </div>

        {/* Compact 4-Column Service Cards (Fits in 1 Row on Desktop, No Vertical Bloat) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="h-full"
            >
              <div className="h-full bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-300 hover:bg-white hover:shadow-sm transition-all group">
                <div className="space-y-3.5">
                  {/* Top Bar: Icon + Step Counter */}
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                      {getIcon(service.id)}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & One-Sentence Pitch */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                      {service.description}
                    </p>
                  </div>

                  {/* Clean Deliverable Tags (No bulky checkmark list) */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {service.benefits.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="mt-5 pt-3.5 border-t border-slate-200/70 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-500">
                    {service.bestFor.split('.')[0]}
                  </span>
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:text-indigo-800 transition-colors"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
