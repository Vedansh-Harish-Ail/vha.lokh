import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'How long does a website take to build?',
      answer:
        'Most small business, salon, and portfolio websites take between 4 to 8 business days from kickoff to launch. Because we work directly without bureaucracy, we move fast while maintaining high quality.',
    },
    {
      question: 'Can I update my prices, services, and photos later?',
      answer:
        'Yes. We build clean, modular architectures where updating your phone number, service pricing, salon treatments, or adding new photos is quick and painless. We also provide ongoing support whenever you need updates.',
    },
    {
      question: 'Do I need to buy a domain and hosting before contacting you?',
      answer:
        'No, you don’t need to buy anything in advance. If you already have a domain, we will connect it. If you don’t, we will guide you through getting your domain (.com / .in) and set up fast, reliable hosting with zero stress.',
    },
    {
      question: 'How does the WhatsApp booking integration work?',
      answer:
        'When visitors tap "Book on WhatsApp" or "Inquire" on their phone, it opens their WhatsApp app with a customized, pre-filled message mentioning the specific service they are interested in. You receive the lead directly on your phone.',
    },
    {
      question: 'What do you need from me to get started?',
      answer:
        'Just your business name, the services you provide, your pricing (if you want it displayed), any photos of your work or location, and your contact details. If you don’t have professional photos, we can help source high-quality imagery that fits your brand.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 md:py-28 bg-white border-b border-stone-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-stone-700">
            <HelpCircle className="h-3.5 w-3.5 text-brand-700" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-stone-600 font-normal">
            Everything you need to know about working with us, timelines, and how your website will work.
          </p>
        </div>

        {/* 21st.dev Style Smooth Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'bg-[#FAF9F5] border-stone-300 shadow-sm'
                    : 'bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left group"
                >
                  <span className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-brand-700 transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`h-8 w-8 rounded-full border flex items-center justify-center shrink-0 ml-4 transition-transform duration-200 ${
                      isOpen
                        ? 'rotate-180 bg-brand-700 border-brand-700 text-white'
                        : 'border-stone-200 text-stone-500 bg-white group-hover:border-stone-400'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-stone-600 leading-relaxed border-t border-stone-200/60">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
