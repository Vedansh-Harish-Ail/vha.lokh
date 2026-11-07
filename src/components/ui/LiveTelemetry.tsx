import React, { useEffect, useState } from 'react';
import { STUDIO_CONFIG } from '../../config/brand';

export const LiveTelemetry: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: STUDIO_CONFIG.timeZone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setTime(formatter.format(now));
      } catch {
        setTime(new Date().toTimeString().slice(0, 8));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (compact) {
    return (
      <div className="flex items-center gap-3 font-mono text-[11px] text-bone/60">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-acid animate-pulse" />
          <span className="text-bone/90">{time || '00:00:00'} IST</span>
        </span>
        <span className="text-bone/30">/</span>
        <span>{STUDIO_CONFIG.studioLocation.split('/')[0].trim()}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-2 px-4 bg-obsidian-surface/60 hairline-border font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-bone/70 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-acid opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-acid"></span>
          </span>
          <span className="text-bone font-medium">{STUDIO_CONFIG.status.availability}</span>
        </div>
        <span className="text-bone/30">|</span>
        <span>SLOT: {STUDIO_CONFIG.status.quarter}</span>
      </div>

      <div className="flex items-center gap-4">
        <div>
          <span className="text-bone/40">LOC: </span>
          <span className="text-bone">NEW DELHI [28.61° N, 77.20° E]</span>
        </div>
        <span className="text-bone/30">|</span>
        <div>
          <span className="text-bone/40">LOCAL: </span>
          <span className="text-accent-acid font-semibold">{time || '00:00:00'}</span>
          <span className="text-bone/50 text-[9px] ml-1">UTC+5:30</span>
        </div>
      </div>
    </div>
  );
};
