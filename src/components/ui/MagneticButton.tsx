import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface MagneticButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  strength?: number;
  variant?: 'primary' | 'secondary' | 'outline' | 'brutalist';
  className?: string;
  onClick?: () => void;
  onHoverStartCustom?: () => void;
  onHoverEndCustom?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.35,
  variant = 'primary',
  className = '',
  onClick,
  onHoverStartCustom,
  onHoverEndCustom,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    if (onHoverEndCustom) onHoverEndCustom();
  };

  const handleMouseEnter = () => {
    if (onHoverStartCustom) onHoverStartCustom();
  };

  const variantStyles = {
    primary:
      'bg-bone text-obsidian border border-bone hover:bg-accent-acid hover:border-accent-acid hover:text-obsidian',
    secondary:
      'bg-obsidian-surface text-bone border border-bone/20 hover:border-bone hover:bg-obsidian-card',
    outline:
      'bg-transparent text-bone border border-bone/30 hover:border-accent-acid hover:text-accent-acid',
    brutalist:
      'bg-accent-acid text-obsidian font-mono uppercase tracking-wider font-semibold border border-accent-acid hover:bg-bone hover:border-bone',
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 180, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center px-6 py-3 text-xs md:text-sm tracking-wider uppercase transition-colors duration-200 select-none ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
