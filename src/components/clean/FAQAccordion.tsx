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
      question: 'How long does a typical website or wedding portal take to build?',
      answer:
        'Small business websites and interactive wedding portals typically take between 4 to 7 business days from kickoff to live launch. For urgent wedding cards or promotional posters, turnaround can be as fast as 24 to 48 hours.',
    },
    {
      question: 'Can you design posters, social media flyers, or digital wedding cards standalone?',
      answer:
        'Yes, absolutely. We design standalone visual promotional posters, digital marketing flyers, festival discount graphics, and custom digital wedding cards ready to share via WhatsApp or print.',
    },
    {
      question: 'What is included in the Wedding Portal & Digital Card service?',
      answer:
        'You receive an interactive celebration web portal with live online RSVP tracking, ceremony countdowns, interactive Google Maps venue pins, and digital photo archives, alongside customized digital wedding invitation cards.',
    },
    {
      question: 'What kind of Digital Support & IT Services do you provide?',
      answer:
        'We provide hands-on technical support including custom domain registration (.com, .in), DNS configuration, reliable web hosting setup with SSL security, website maintenance, troubleshooting, and technical consultation for students and local businesses.',
    },
    {
      question: 'How do we communicate and get started?',
      answer:
        'You can chat with us directly on WhatsApp or drop us an email. We discuss your requirements, review any reference styles you have in mind, share a clear quote and timeline, and keep you updated with drafts throughout the process.',
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
            Everything you need to know about our services, turnaround timelines, and working together.
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
