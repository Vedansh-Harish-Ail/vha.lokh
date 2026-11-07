import React from 'react';
import { Zap, MessageCircle, ShieldCheck, HeartHandshake, Sparkles, MapPin } from 'lucide-react';

export const InfiniteMarquee: React.FC = () => {
  const items = [
    { text: 'Sub-2s Mobile Loading', icon: <Zap className="h-3.5 w-3.5 text-indigo-500" /> },
    { text: '1-Tap WhatsApp Lead Capture', icon: <MessageCircle className="h-3.5 w-3.5 text-emerald-500" /> },
    { text: 'Google Local SEO & 4.6★ Proof', icon: <ShieldCheck className="h-3.5 w-3.5 text-amber-500" /> },
    { text: 'Interactive Wedding Portals & RSVPs', icon: <HeartHandshake className="h-3.5 w-3.5 text-rose-500" /> },
    { text: 'Promotional Posters & Marketing Collateral', icon: <Sparkles className="h-3.5 w-3.5 text-blue-500" /> },
    { text: 'Mangaluru Studio Practice', icon: <MapPin className="h-3.5 w-3.5 text-indigo-500" /> },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-white/70 backdrop-blur-sm border-y border-slate-200/80 py-3.5 select-none">
      {/* Left and right gradient fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10" />

      <div className="flex w-max animate-marquee">
        {/* Render twice for continuous loop */}
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 mx-6 text-xs font-semibold text-slate-700 hover:text-indigo-600 transition-colors cursor-default"
          >
            <span className="p-1 rounded-md bg-slate-100 border border-slate-200/60 shadow-2xs">
              {item.icon}
            </span>
            <span>{item.text}</span>
            <span className="text-slate-300 ml-4">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
