import React from 'react';

interface MarqueeProps {
  items: string[];
  separator?: string;
  speed?: 'slow' | 'normal' | 'fast';
  reverse?: boolean;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  separator = '✦',
  speed = 'normal',
  reverse = false,
  className = '',
}) => {
  const speedClass = {
    slow: 'duration-[45s]',
    normal: 'duration-[25s]',
    fast: 'duration-[15s]',
  }[speed];

  const content = (
    <div className="flex shrink-0 items-center gap-8 py-3 whitespace-nowrap">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-bone/70">
          <span>{item}</span>
          <span className="text-accent-acid/80">{separator}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`relative flex w-full overflow-hidden hairline-t hairline-b bg-obsidian-deep ${className}`}>
      <div
        className={`flex shrink-0 animate-marquee hover:[animation-play-state:paused] ${
          reverse ? 'direction-reverse animate-marquee-reverse' : ''
        } ${speedClass}`}
      >
        {content}
        {content}
      </div>
      <div
        className={`flex shrink-0 animate-marquee hover:[animation-play-state:paused] ${
          reverse ? 'direction-reverse animate-marquee-reverse' : ''
        } ${speedClass}`}
        aria-hidden="true"
      >
        {content}
        {content}
      </div>
    </div>
  );
};

