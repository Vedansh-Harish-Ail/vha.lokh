import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Check, MessageCircle, ArrowRight, Clock } from 'lucide-react';
import { STUDIO_CONFIG } from '../../config/brand';

export const ScopeCalculator: React.FC = () => {
  const serviceTypes = [
    { id: 'business-site', label: 'Small Business Website', turnaround: '4–7 Days' },
    { id: 'wedding-portal', label: 'Wedding Portal & Digital Cards', turnaround: '3–5 Days' },
    { id: 'marketing-posters', label: 'Posters & Digital Marketing Collateral', turnaround: '1–3 Days' },
    { id: 'it-support', label: 'Digital Support & IT Consultation', turnaround: '1–2 Days' },
  ];

  const featureOptions = [
    { id: 'mobile', label: 'Responsive, Mobile-First Web Architecture', checkedByDefault: true },
    { id: 'whatsapp', label: 'Direct WhatsApp Chat & 1-Tap Call Dispatch', checkedByDefault: true },
    { id: 'rsvp', label: 'Live Online RSVP Tracking & Ceremony Countdowns', checkedByDefault: false },
    { id: 'posters', label: 'Custom Promotional Posters & Social Media Flyers', checkedByDefault: false },
    { id: 'domain-dns', label: 'Domain Registration, DNS & Hosting Setup (.com / .in)', checkedByDefault: true },
    { id: 'reviews-maps', label: 'Google Maps Location & 4.6★ Reviews Integration', checkedByDefault: true },
  ];

  const [selectedType, setSelectedType] = useState(serviceTypes[0]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'mobile',
    'whatsapp',
    'domain-dns',
    'reviews-maps',
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
      `Hi vha.lokh, I would like to inquire about: ${selectedType.label}.\n\nDesired Deliverables: ${featureLabels}.\n\nCould we discuss the details and an estimate?`
    );
    window.open(`https://wa.me/${STUDIO_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <section id="estimator" className="py-20 md:py-28 bg-[#F8FAFC] border-b border-slate-200">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700 shadow-2xs">
            <Calculator className="h-3.5 w-3.5 text-indigo-600" />
            <span>Interactive Project Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Configure Your Digital Requirement
          </h2>
          <p className="text-base text-slate-600 font-normal">
            Select the service you need and desired features to see estimated turnaround times and initiate a direct conversation.
          </p>
        </motion.div>

        {/* The Interactive Estimator Card (21st.dev Component) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm"
        >
          <div className="space-y-8">
            {/* Step 1: Service Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                1. Select Service Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceTypes.map((type) => {
                  const isSelected = selectedType.id === type.id;
                  return (
                    <motion.button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 350 }}
                      className={`p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-50/80 border-indigo-600 text-indigo-950 shadow-xs font-semibold'
                          : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-sm font-medium">{type.label}</span>
                      {isSelected && (
                        <div className="h-5 w-5 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Features Needed */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                2. Key Deliverables Required
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {featureOptions.map((feature) => {
                  const isChecked = selectedFeatures.includes(feature.id);
                  return (
                    <motion.button
                      key={feature.id}
                      type="button"
                      onClick={() => toggleFeature(feature.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 350 }}
                      className={`p-3.5 rounded-2xl text-left border text-xs font-medium transition-all flex items-center gap-3 ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-600 text-emerald-950 font-semibold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`h-4.5 w-4.5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                          isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                        }`}
                      >
                        {isChecked && <Check className="h-3 w-3" />}
                      </div>
                      <span>{feature.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Summary Output & Action */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80">
              <div>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Estimated Delivery Turnaround</span>
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedType.turnaround}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-baseline gap-2 mt-0.5"
                  >
                    <span className="text-2xl font-extrabold text-slate-900">{selectedType.turnaround}</span>
                    <span className="text-xs text-slate-500 font-medium">typical delivery timeline</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.button
                onClick={handleWhatsAppInquiry}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', damping: 15, stiffness: 400 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 text-sm font-bold shadow-md hover:shadow-emerald-600/20 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Discuss This on WhatsApp</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
