import React from 'react';
import { Store, UserCheck, CalendarHeart, RefreshCw, Check } from 'lucide-react';
import { SERVICES } from '../../config/brand';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'business-websites':
        return <Store className="h-6 w-6 text-brand-700" />;
      case 'portfolio-websites':
        return <UserCheck className="h-6 w-6 text-emerald-700" />;
      case 'event-wedding-portals':
        return <CalendarHeart className="h-6 w-6 text-rose-700" />;
      case 'redesign-speed':
        return <RefreshCw className="h-6 w-6 text-amber-700" />;
      default:
        return <Store className="h-6 w-6 text-brand-700" />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-[#FAF9F5] border-b border-stone-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700">
            <span>What We Build</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Websites Tailored to Your Specific Needs
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            Whether you want to show up on Google for local customers, showcase your creative portfolio, or celebrate a milestone, we provide full end-to-end development.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between hover:border-brand-500 transition-colors"
            >
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center">
                  {getIcon(service.id)}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-stone-900">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-brand-700 mt-1">
                    {service.tagline}
                  </p>
                </div>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Key Benefits */}
                <div className="pt-2 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    What's Included:
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-600">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-stone-100 flex items-center justify-between">
                <div className="text-xs text-stone-500 font-medium">
                  <strong>Best for:</strong> {service.bestFor.split('.')[0]}
                </div>

                <button
                  onClick={() => onSelectService(service.title)}
                  className="text-xs font-semibold text-brand-700 hover:text-brand-900 transition-colors"
                >
                  Inquire →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

