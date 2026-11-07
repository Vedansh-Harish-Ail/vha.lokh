import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Monitor, ExternalLink, Zap, Star, MessageCircle, ShieldCheck } from 'lucide-react';
import { PROJECTS } from '../../config/brand';

export const HeroMockupShowcase: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const project = PROJECTS[activeIdx];

  const floatingAlerts = [
    {
      title: 'WhatsApp Inquiry Sent',
      subtitle: 'HVAC quotation request generated in 1 tap',
      icon: <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-950',
    },
    {
      title: 'Google Social Proof',
      subtitle: 'Rated 4.6★ across 258+ real client reviews',
      icon: <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />,
      bg: 'bg-amber-50 border-amber-200 text-amber-950',
    },
    {
      title: 'Fast Mobile Loading',
      subtitle: 'First Contentful Paint in 1.1s on 4G cellular',
      icon: <Zap className="h-3.5 w-3.5 text-indigo-600" />,
      bg: 'bg-indigo-50 border-indigo-200 text-indigo-950',
    },
    {
      title: 'Real-Time RSVP Received',
      subtitle: 'Guest attendance confirmed with seat count',
      icon: <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />,
      bg: 'bg-blue-50 border-blue-200 text-blue-950',
    },
  ];

  const currentAlert = floatingAlerts[activeIdx % floatingAlerts.length];

  return (
    <div className="relative w-full max-w-lg lg:max-w-none mx-auto select-none">
      {/* Background Soft Aura Gradient (21st.dev style) */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-blue-500/15 to-indigo-500/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 -z-10" />

      {/* Main Container Card */}
      <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-5 sm:p-6 space-y-5">
        
        {/* Top Control Bar: Logo mark + Desktop/Mobile View Switcher */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/brand/vha-lokh-symbol-transparent.png"
              alt="vha.lokh logo mark"
              className="h-7 w-auto object-contain"
            />
            <div>
              <span className="font-extrabold text-sm text-slate-900 block leading-none">vha.lokh</span>
              <span className="text-[10px] text-slate-400 font-medium">Verified Client Production</span>
            </div>
          </div>

          {/* Device Viewport Toggle (21st.dev Pattern) */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'desktop'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Desktop Browser View"
            >
              <Monitor className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-[11px]">Desktop</span>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'mobile'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Mobile Phone View"
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-[11px]">Mobile</span>
            </button>
          </div>
        </div>

        {/* Dynamic Mockup Viewport */}
        <AnimatePresence mode="wait">
          {viewMode === 'desktop' ? (
            /* Desktop Browser Frame */
            <motion.div
              key="desktop"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner"
            >
              {/* Browser chrome header */}
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-100 border-b border-slate-200 text-xs text-slate-500 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-0.5 rounded-md text-[11px] max-w-[210px] truncate shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="truncate">{project.liveUrl.replace('https://', '')}</span>
                </div>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-indigo-600 transition-colors"
                  title="Open live website"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Desktop screenshot */}
              <div className="relative aspect-[16/10] overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-slate-900/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-white text-slate-900 font-bold text-xs px-4 py-2 rounded-xl shadow-xl hover:bg-slate-50 transition-transform hover:scale-105"
                  >
                    <span>Launch Live Site</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Mobile Phone Mockup Frame */
            <motion.div
              key="mobile"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="flex justify-center py-2"
            >
              <div className="w-[240px] rounded-[32px] border-4 border-slate-800 bg-slate-900 p-1.5 shadow-2xl relative">
                {/* Phone speaker notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-slate-800 rounded-full z-20" />

                <div className="rounded-[24px] overflow-hidden bg-white aspect-[9/16] relative group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                  />

                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-white text-slate-900 font-bold text-[11px] px-3 py-1.5 rounded-lg shadow-lg"
                    >
                      <span>Open Website</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Meta Details */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">{project.title}</h3>
            <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md">
              {project.category}
            </span>
          </div>
          <p className="text-xs text-slate-500 line-clamp-1">{project.subtitle}</p>
        </div>

        {/* 21st.dev Tab Switcher */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Select Client Work:
            </span>
            <span className="text-[10px] font-semibold text-indigo-600">
              {activeIdx + 1} of {PROJECTS.length}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => setActiveIdx(idx)}
                className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all text-center truncate border ${
                  activeIdx === idx
                    ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                    : 'bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {proj.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating 21st.dev Style Dynamic Notification Pill */}
      <motion.div
        key={activeIdx}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className={`hidden sm:flex items-center gap-3 absolute -bottom-5 left-4 right-4 bg-white border border-slate-200/90 rounded-2xl p-3 shadow-xl`}
      >
        <div className="h-8 w-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
          {currentAlert.icon}
        </div>
        <div className="flex-1 min-w-0 text-left">
          <span className="text-xs font-bold text-slate-900 block leading-tight truncate">
            {currentAlert.title}
          </span>
          <span className="text-[11px] text-slate-500 truncate block">
            {currentAlert.subtitle}
          </span>
        </div>
        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full shrink-0">
          VERIFIED
        </span>
      </motion.div>
    </div>
  );
};
