'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary'
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = clientX - (rect.left + rect.width / 2);
    const y = clientY - (rect.top + rect.height / 2);

    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden group";

  const variantStyles = {
    primary: "",
    secondary: "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(baseStyles, variantStyles[variant], className)}
    >
      {variant === 'primary' && (
        <>
          {/* Base gradient */}
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Hover gradient */}
          <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Glow effect */}
          <span className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-emerald-500 blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
        </>
      )}

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default MagneticButton;
