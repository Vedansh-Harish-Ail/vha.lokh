import React from 'react';
import FaqDrawer from '@/components/ui/faq-drawer';

export const FAQAccordion: React.FC = () => {
  return (
    <section id="faq" className="py-20 md:py-28 bg-[#F8FAFC] border-b border-slate-200">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <FaqDrawer
          label="Common Inquiries"
          title="Frequently Asked Questions."
          lead="Everything you need to know about our web design, wedding portals, timelines, and IT services. Pull any card to inspect answers."
          drawer="vha.lokh · FAQ"
          count={7}
          open="1"
          single={true}
          askNote="Have a custom requirement or question not listed in the drawer? We respond within hours."
          askLabel="Chat with Us on WhatsApp"
          askHref="https://wa.me/918431873138"
          finish="aluminium"
        />
      </div>
    </section>
  );
};
