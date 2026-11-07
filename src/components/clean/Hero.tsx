import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowDown, MessageCircle, Globe, HeartHandshake, Image as ImageIcon, Headphones, CheckCircle2 } from 'lucide-react';
import { HeroMockupShowcase } from './HeroMockupShowcase';
import { InfiniteMarquee } from '../ui/InfiniteMarquee';

interface HeroProps {
  onExploreWork: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenContact }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 24,
        stiffness: 260,
      },
    },
  };

  const pillVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300,
      },
    },
  };

  return (
    <section className="relative pt-10 pb-0 md:pt-16 md:pb-0 bg-[#F8FAFC] overflow-hidden">
      {/* Background soft ambient glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-100/60 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10 pb-16 md:pb-20">
        {/* 2-Column Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Context, Badges, CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >
            {/* Official Brand Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full bg-indigo-50/90 border border-indigo-100 px-4 py-1.5 text-xs font-semibold text-indigo-900 shadow-sm backdrop-blur-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
              </span>
              <span className="font-bold">vha.lokh</span>
              <span className="text-indigo-300">•</span>
              <span>Where Ideas Take Shape</span>
              <span className="text-indigo-300">•</span>
              <span className="text-indigo-700 font-normal">Mangaluru, India</span>
            </motion.div>

            {/* Big Clear Headline with smooth gradient */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]"
            >
              Web Solutions That{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Work for You.
              </span>
            </motion.h1>

            {/* Subhead Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl"
            >
              Need a custom website or digital solution? Alongside software engineering, I undertake select freelance engagements under my independent brand <strong>vha.lokh</strong>. 
              I collaborate with small businesses, events, and individuals to create responsive websites, bespoke wedding invitation platforms, digital cards, promotional posters, and provide end-to-end IT support.
            </motion.p>

            {/* 4 Core Offerings Pills with subtle hover */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-1">
              {[
                'Small Business Websites',
                'Wedding Portals & Cards',
                'Digital Marketing & Posters',
                'Digital & IT Support',
              ].map((service, index) => (
                <motion.span
                  key={index}
                  variants={pillVariants}
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 400 }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs hover:border-indigo-300 hover:text-indigo-900 transition-colors cursor-default"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                  <span>{service}</span>
                </motion.span>
              ))}
            </motion.div>

            {/* Action Buttons with spring physics */}
            <motion.div variants={itemVariants} className="pt-2 flex flex-wrap gap-4 items-center">
              <motion.button
                onClick={onExploreWork}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', damping: 15, stiffness: 400 }}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-600 transition-colors hover:shadow-indigo-500/20"
              >
                <span>See Selected Work</span>
                <ArrowDown className="h-4 w-4" />
              </motion.button>

              <motion.button
                onClick={onOpenContact}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', damping: 15, stiffness: 400 }}
                className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-300 px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 hover:border-slate-400 transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-indigo-600" />
                <span>Discuss a Project</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column: 21st.dev Interactive Device & Project Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <HeroMockupShowcase />
          </motion.div>

        </div>

        {/* 4 Pillars Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 pt-10 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          <div className="flex items-start gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs text-indigo-600 group-hover:scale-105 group-hover:border-indigo-300 transition-transform">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Small Business Websites</h4>
              <p className="text-xs text-slate-500 mt-0.5">Mobile-first, fast, with WhatsApp booking.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs text-blue-600 group-hover:scale-105 group-hover:border-blue-300 transition-transform">
              <HeartHandshake className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Wedding Portals & Cards</h4>
              <p className="text-xs text-slate-500 mt-0.5">Live RSVP tracking & countdowns.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs text-indigo-600 group-hover:scale-105 group-hover:border-indigo-300 transition-transform">
              <ImageIcon className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Posters & Marketing</h4>
              <p className="text-xs text-slate-500 mt-0.5">Promotional flyers & social graphics.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs text-blue-600 group-hover:scale-105 group-hover:border-blue-300 transition-transform">
              <Headphones className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Digital & IT Support</h4>
              <p className="text-xs text-slate-500 mt-0.5">Domains, hosting & tech consulting.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 21st.dev Infinite Scrolling Trust Marquee Ribbon */}
      <InfiniteMarquee />
    </section>
  );
};
