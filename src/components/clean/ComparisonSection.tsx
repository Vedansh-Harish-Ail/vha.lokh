import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  const points = [
    {
      feature: 'Mobile Loading Speed',
      vhalokh: 'Under 2 seconds (High Google Speed Score)',
      generic: 'Often 6–10+ seconds with heavy bloated plugins',
    },
    {
      feature: 'WhatsApp & Call Booking',
      vhalokh: 'Built directly into header, service cards & footer',
      generic: 'Usually hidden inside complex email contact forms',
    },
    {
      feature: 'Design & Brand Customization',
      vhalokh: 'Custom-crafted to match your business & interior colors',
      generic: 'Generic copy-pasted templates used by hundreds of sites',
    },
    {
      feature: 'Google Reviews & Maps',
      vhalokh: 'Embedded directly to build instant customer trust',
      generic: 'Missing or requires expensive recurring plugin subscriptions',
    },
    {
      feature: 'Direct Communication',
      vhalokh: 'Work directly with the engineer building your site',
      generic: 'Passed around between account managers or offshore support',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
            <span>The Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Why Business Owners Choose Us
          </h2>
          <p className="text-base text-slate-600 font-normal">
            See how custom craftsmanship compares against slow, cookie-cutter website builders.
          </p>
        </motion.div>

        {/* Comparison Table Card (21st.dev Component) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-600">
                  <th className="py-4.5 px-6 font-bold">Key Factors</th>
                  <th className="py-4.5 px-6 font-bold text-indigo-900 bg-indigo-50/60">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-indigo-600" />
                      <span>With vha.lokh</span>
                    </span>
                  </th>
                  <th className="py-4.5 px-6 font-bold text-slate-500">
                    Generic DIY / Clunky Templates
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {points.map((point, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      {point.feature}
                    </td>
                    <td className="py-4 px-6 text-indigo-950 font-medium bg-indigo-50/30">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{point.vhalokh}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      <div className="flex items-center gap-2">
                        <X className="h-4 w-4 text-slate-400 shrink-0" />
                        <span>{point.generic}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
