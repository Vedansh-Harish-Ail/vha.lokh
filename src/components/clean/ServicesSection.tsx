import React from 'react';
import { motion } from 'framer-motion';
import { Globe, HeartHandshake, Image as ImageIcon, Headphones, Check, ArrowRight } from 'lucide-react';
import { SERVICES } from '../../config/brand';
import { SpotlightCard } from '../ui/SpotlightCard';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'small-business-websites':
        return <Globe className="h-6 w-6 text-indigo-600" />;
      case 'wedding-portals-cards':
        return <HeartHandshake className="h-6 w-6 text-rose-600" />;
      case 'digital-marketing-posters':
        return <ImageIcon className="h-6 w-6 text-amber-600" />;
      case 'it-support-services':
        return <Headphones className="h-6 w-6 text-blue-600" />;
      default:
        return <Globe className="h-6 w-6 text-indigo-600" />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
            <span>Freelance & Client Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            What We Provide
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            From responsive business websites and interactive wedding portals to promotional posters and hands-on IT support, here is how we can collaborate.
          </p>
        </motion.div>

        {/* 4 Core Offerings Grid with Spotlight and Spring hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: idx * 0.08, type: 'spring', damping: 20, stiffness: 250 }}
            >
              <SpotlightCard className="h-full bg-[#F8FAFC] border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-colors group">
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    {getIcon(service.id)}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-700 mt-1">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Key Benefits */}
                  <div className="pt-2 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200/80 flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-medium">
                    <strong className="text-slate-700">Ideal for:</strong> {service.bestFor.split('.')[0]}
                  </div>

                  <motion.button
                    onClick={() => onSelectService(service.title)}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <span>Inquire Now</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </motion.button>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
