import React from 'react';
import { HOW_IT_WORKS } from '../../config/brand';

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="process" className="py-20 md:py-28 bg-white border-b border-stone-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700">
            <span>Simple & Transparent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            How We Work Together
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            No endless meetings or confusing technical jargon. We keep the process simple, collaborative, and fast.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOW_IT_WORKS.map((step) => (
            <div
              key={step.step}
              className="bg-[#FAF9F5] border border-stone-200 rounded-2xl p-6 relative flex flex-col justify-between"
            >
              <div>
                <span className="font-bold text-3xl text-stone-300 block mb-4">
                  {step.step}
                </span>
                <h3 className="text-lg font-bold text-stone-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200/60">
                <span className="text-[11px] font-semibold uppercase text-brand-700 tracking-wider">
                  Step {step.step} of 04
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
