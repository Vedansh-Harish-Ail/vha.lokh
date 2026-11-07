import React, { useState } from 'react';
import { Calculator, Check, MessageCircle, ArrowRight } from 'lucide-react';
import { STUDIO_CONFIG } from '../../config/brand';

export const ScopeCalculator: React.FC = () => {
  const businessTypes = [
    { id: 'salon', label: 'Salon / Beauty Parlour', turnaround: '4–6 Days' },
    { id: 'portfolio', label: 'Creative / Professional Portfolio', turnaround: '5–7 Days' },
    { id: 'clinic', label: 'Clinic / Local Business', turnaround: '5–8 Days' },
    { id: 'wedding', label: 'Wedding / Celebration Portal', turnaround: '3–5 Days' },
  ];

  const featureOptions = [
    { id: 'whatsapp', label: '1-Tap WhatsApp Booking & Calls', checkedByDefault: true },
    { id: 'reviews', label: 'Google 4.6★ Reviews Integration', checkedByDefault: true },
    { id: 'gallery', label: 'High-Res Photo Gallery (Mobile Optimized)', checkedByDefault: true },
    { id: 'bilingual', label: 'Bilingual Interface (English + Hindi/Regional)', checkedByDefault: false },
    { id: 'maps', label: 'Interactive Google Maps & Store Timings', checkedByDefault: true },
  ];

  const [selectedType, setSelectedType] = useState(businessTypes[0]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'whatsapp',
    'reviews',
    'gallery',
    'maps',
  ]);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleWhatsAppInquiry = () => {
    const featureLabels = featureOptions
      .filter((f) => selectedFeatures.includes(f.id))
      .map((f) => f.label)
      .join(', ');

    const message = encodeURIComponent(
      `Hi, I checked your website estimator for a ${selectedType.label}.\n\nDesired Features: ${featureLabels}.\n\nCould you provide an estimated quote and timeline?`
    );
    window.open(`https://wa.me/${STUDIO_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <section className="py-20 md:py-28 bg-[#FAF9F5] border-b border-stone-200">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-stone-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-700 shadow-sm">
            <Calculator className="h-3.5 w-3.5" />
            <span>Interactive Project Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Configure What Your Business Needs
          </h2>
          <p className="text-base text-stone-600 font-normal">
            Select your business type and desired features to see the estimated turnaround time and discuss direct pricing.
          </p>
        </div>

        {/* The Interactive Estimator Card (21st.dev Component) */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-sm">
          <div className="space-y-8">
            {/* Step 1: Business Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
                1. Select Your Business Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {businessTypes.map((type) => {
                  const isSelected = selectedType.id === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-brand-50/70 border-brand-700 text-brand-900 shadow-sm font-semibold'
                          : 'bg-stone-50/50 border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <span className="text-sm">{type.label}</span>
                      {isSelected && <Check className="h-4 w-4 text-brand-700" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Features Needed */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
                2. Key Features Included
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {featureOptions.map((feature) => {
                  const isChecked = selectedFeatures.includes(feature.id);
                  return (
                    <button
                      key={feature.id}
                      type="button"
                      onClick={() => toggleFeature(feature.id)}
                      className={`p-3.5 rounded-xl text-left border text-xs font-medium transition-all flex items-center gap-3 ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-600 text-emerald-950 font-semibold'
                          : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <div
                        className={`h-4 w-4 rounded flex items-center justify-center shrink-0 border ${
                          isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300'
                        }`}
                      >
                        {isChecked && <Check className="h-3 w-3" />}
                      </div>
                      <span>{feature.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Summary Output & Action */}
            <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#FAF9F5] p-6 rounded-xl">
              <div>
                <span className="text-xs text-stone-500 font-medium">Estimated Delivery Time</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-bold text-stone-900">{selectedType.turnaround}</span>
                  <span className="text-xs text-stone-500 font-medium">from initial kickoff</span>
                </div>
              </div>

              <button
                onClick={handleWhatsAppInquiry}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 text-sm font-semibold shadow-sm transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Discuss This Scope on WhatsApp</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
