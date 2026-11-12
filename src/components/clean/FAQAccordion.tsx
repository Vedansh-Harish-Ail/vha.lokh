import React from 'react';
import FaqDrawer from '@/components/ui/faq-drawer';

export const FAQAccordion: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <FaqDrawer
          label="FAQ"
          title="Questions & Answers."
          lead="Everything you need to know about our web design, wedding portals, and IT solutions. Pull a card to inspect details."
          drawer="vha.lokh · FAQ"
          count={7}
          open="1"
          single={true}
          askNote="Have a unique requirement or question not listed? Chat directly with us."
          askLabel="Chat with Us"
          askHref="https://wa.me/918431873138"
          finish="graphite"
        />
      </div>
    </section>
  );
};
