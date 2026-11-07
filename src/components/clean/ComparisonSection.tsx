import React from 'react';
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
    <section className="py-20 md:py-28 bg-[#FAF9F5] border-b border-stone-200">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-stone-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-700 shadow-sm">
            <span>The Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Why Business Owners Choose Us
          </h2>
          <p className="text-base text-stone-600 font-normal">
            See how custom craftsmanship compares against slow, cookie-cutter website builders.
          </p>
        </div>

        {/* Comparison Table Card (21st.dev Component) */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50/70 text-xs uppercase tracking-wider text-stone-600">
                  <th className="py-4 px-6 font-bold">Key Factors</th>
                  <th className="py-4 px-6 font-bold text-brand-800 bg-brand-50/50">
                    With vha.lokh
                  </th>
                  <th className="py-4 px-6 font-bold text-stone-500">
                    Generic DIY / Clunky Templates
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {points.map((point, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/40 transition-colors">
                    <td className="py-4 px-6 font-semibold text-stone-900">
                      {point.feature}
                    </td>
                    <td className="py-4 px-6 text-brand-900 font-medium bg-brand-50/30">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{point.vhalokh}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-stone-500">
                      <div className="flex items-center gap-2">
                        <X className="h-4 w-4 text-stone-400 shrink-0" />
                        <span>{point.generic}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
