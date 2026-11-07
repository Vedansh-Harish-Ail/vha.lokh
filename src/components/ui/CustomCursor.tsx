import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export type CursorMode = 'default' | 'link' | 'project' | 'action' | 'drag';

interface CustomCursorProps {
  mode: CursorMode;
  label?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ mode, label }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device has pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  const isProject = mode === 'project';
  const isLink = mode === 'link';
  const isAction = mode === 'action';

  return (
    <div className="custom-cursor-element pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Central dot */}
      <motion.div
        className="fixed top-0 left-0 h-2 w-2 rounded-full bg-accent-acid mix-blend-difference pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isProject || isAction ? 0 : isLink ? 1.5 : 1,
          opacity: isProject || isAction ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing interactive ring/badge */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center border font-mono text-[10px] uppercase tracking-widest"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isProject ? 90 : isAction ? 80 : isLink ? 44 : 28,
          height: isProject ? 90 : isAction ? 80 : isLink ? 44 : 28,
          borderRadius: '9999px',
          borderColor: isProject
            ? 'rgba(212, 255, 63, 0.9)'
            : isLink
            ? 'rgba(244, 242, 236, 0.4)'
            : 'rgba(244, 242, 236, 0.2)',
          backgroundColor: isProject
            ? 'rgba(212, 255, 63, 0.95)'
            : isAction
            ? 'rgba(244, 242, 236, 0.9)'
            : 'rgba(8, 8, 8, 0.05)',
          color: isProject || isAction ? '#080808' : '#f4f2ec',
          scale: 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 280 }}
      >
        {(isProject || isAction) && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-bold text-[10px] tracking-wider"
          >
            {label || (isProject ? 'VIEW' : 'CLICK')}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};

