import React from 'react';
import { motion } from 'framer-motion';
import { HOW_IT_WORKS } from '../../config/brand';
import { ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="process" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
            <span>Simple & Transparent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            How We Work Together
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            No endless meetings or confusing technical jargon. We keep the process simple, collaborative, and fast.
          </p>
        </motion.div>

        {/* 4 Steps Grid with Animated Step Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {HOW_IT_WORKS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.1, type: 'spring', damping: 20, stiffness: 250 }}
              whileHover={{ y: -4 }}
              className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-6 relative flex flex-col justify-between shadow-2xs hover:border-indigo-300 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-extrabold text-3xl text-slate-300 group-hover:text-indigo-600 transition-colors">
                    {step.step}
                  </span>
                  {idx < HOW_IT_WORKS.length - 1 && (
                    <ArrowRight className="hidden lg:block h-4 w-4 text-slate-300 -mr-2" />
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase text-indigo-700 tracking-wider">
                  Step {step.step} of 04
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 opacity-60" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
