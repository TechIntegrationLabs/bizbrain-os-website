'use client';

import React, { useRef, useState, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { spring as springConfig } from '@/lib/animations';

// ============================================
// SYNAPTIC BUTTON - Synaptic Glass Design System
// Magnetic button with neural glow effects
// ============================================

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'neural';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
type GlowColor = 'teal' | 'emerald' | 'pink' | 'amber';

interface SynapticButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  glow?: GlowColor;
  magnetic?: boolean;
  magneticStrength?: number;
  pulse?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
}

// Size configurations
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
  xl: 'px-10 py-5 text-xl gap-3',
};

// Glow color configurations
const glowColors: Record<GlowColor, { from: string; to: string; glow: string }> = {
  teal: {
    from: 'from-teal-400',
    to: 'to-emerald-500',
    glow: 'rgba(45, 212, 191, 0.6)',
  },
  emerald: {
    from: 'from-emerald-400',
    to: 'to-teal-500',
    glow: 'rgba(16, 185, 129, 0.6)',
  },
  pink: {
    from: 'from-pink-400',
    to: 'to-rose-500',
    glow: 'rgba(244, 114, 182, 0.6)',
  },
  amber: {
    from: 'from-amber-400',
    to: 'to-orange-500',
    glow: 'rgba(245, 158, 11, 0.6)',
  },
};

export const SynapticButton = forwardRef<HTMLButtonElement, SynapticButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      glow = 'teal',
      magnetic = true,
      magneticStrength = 0.2,
      pulse = false,
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      className = '',
      disabled,
      ...props
    },
    forwardedRef
  ) => {
    const localRef = useRef<HTMLButtonElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLButtonElement>) || localRef;
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const colors = glowColors[glow];

    // Handle magnetic effect
    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || disabled) return;

      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      setPosition({ x: x * magneticStrength, y: y * magneticStrength });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    // Base styles
    const baseStyles = cn(
      'relative font-semibold rounded-full overflow-hidden',
      'flex items-center justify-center',
      'transition-all duration-300',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-neural-teal focus-visible:ring-offset-2 focus-visible:ring-offset-abyss',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      sizeClasses[size],
      fullWidth && 'w-full'
    );

    // Variant-specific styles
    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return 'text-white';
        case 'secondary':
          return 'bg-white/5 border border-frost text-text-primary hover:bg-white/10 hover:border-frost-hover';
        case 'ghost':
          return 'bg-transparent text-text-primary hover:bg-white/5';
        case 'outline':
          return cn(
            'bg-transparent border-2 text-text-primary',
            glow === 'teal' && 'border-teal-500/50 hover:border-teal-500 hover:text-teal-400',
            glow === 'emerald' && 'border-emerald-500/50 hover:border-emerald-500 hover:text-emerald-400',
            glow === 'pink' && 'border-pink-500/50 hover:border-pink-500 hover:text-pink-400',
            glow === 'amber' && 'border-amber-500/50 hover:border-amber-500 hover:text-amber-400'
          );
        case 'neural':
          return 'text-white bg-surface-glow border border-frost hover:border-frost-hover';
        default:
          return '';
      }
    };

    // Loading spinner
    const LoadingSpinner = () => (
      <svg
        className="animate-spin h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    return (
      <motion.button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ x: position.x, y: position.y }}
        transition={springConfig.magnetic}
        whileTap={{ scale: 0.95 }}
        disabled={disabled || loading}
        className={cn(baseStyles, getVariantStyles(), 'group', className)}
        {...props}
      >
        {/* Primary variant gradients and glow */}
        {variant === 'primary' && (
          <>
            {/* Base gradient */}
            <span
              className={cn(
                'absolute inset-0 bg-gradient-to-r opacity-90 group-hover:opacity-100 transition-opacity duration-300',
                colors.from,
                colors.to
              )}
            />
            {/* Hover gradient (reversed) */}
            <span
              className={cn(
                'absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                colors.to,
                colors.from
              )}
            />
            {/* Outer glow */}
            <span
              className={cn(
                'absolute -inset-1 bg-gradient-to-r blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300',
                colors.from,
                colors.to
              )}
            />
          </>
        )}

        {/* Neural variant glow effect */}
        {variant === 'neural' && (
          <>
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: `inset 0 0 30px ${colors.glow}`,
              }}
            />
            <span
              className="absolute -inset-1 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"
              style={{
                background: `linear-gradient(to right, ${colors.glow}, transparent)`,
              }}
            />
          </>
        )}

        {/* Pulse animation overlay */}
        {pulse && !disabled && (
          <span
            className="absolute inset-0 animate-neural-pulse"
            style={{
              boxShadow: `0 0 20px ${colors.glow}`,
            }}
          />
        )}

        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {icon && iconPosition === 'left' && (
                <span className="transition-transform group-hover:-translate-x-0.5">
                  {icon}
                </span>
              )}
              {children}
              {icon && iconPosition === 'right' && (
                <span className="transition-transform group-hover:translate-x-0.5">
                  {icon}
                </span>
              )}
            </>
          )}
        </span>
      </motion.button>
    );
  }
);

SynapticButton.displayName = 'SynapticButton';

// ============================================
// SYNAPTIC ICON BUTTON
// Icon-only button variant
// ============================================
interface SynapticIconButtonProps extends Omit<SynapticButtonProps, 'children' | 'icon' | 'iconPosition'> {
  icon: React.ReactNode;
  'aria-label': string;
}

export const SynapticIconButton = forwardRef<HTMLButtonElement, SynapticIconButtonProps>(
  ({ icon, size = 'md', className = '', ...props }, ref) => {
    const iconSizeClasses: Record<ButtonSize, string> = {
      sm: 'p-2',
      md: 'p-3',
      lg: 'p-4',
      xl: 'p-5',
    };

    return (
      <SynapticButton
        ref={ref}
        size={size}
        className={cn(iconSizeClasses[size], '!rounded-full', className)}
        {...props}
      >
        {icon}
      </SynapticButton>
    );
  }
);

SynapticIconButton.displayName = 'SynapticIconButton';

// ============================================
// SYNAPTIC LINK BUTTON
// Link styled as button with magnetic effect
// ============================================
interface SynapticLinkButtonProps extends Omit<HTMLMotionProps<'a'>, 'children'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  glow?: GlowColor;
  magnetic?: boolean;
  magneticStrength?: number;
  className?: string;
}

export const SynapticLinkButton = forwardRef<HTMLAnchorElement, SynapticLinkButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      glow = 'teal',
      magnetic = true,
      magneticStrength = 0.2,
      className = '',
      ...props
    },
    forwardedRef
  ) => {
    const localRef = useRef<HTMLAnchorElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLAnchorElement>) || localRef;
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const colors = glowColors[glow];

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!magnetic) return;

      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      setPosition({ x: x * magneticStrength, y: y * magneticStrength });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    return (
      <motion.a
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ x: position.x, y: position.y }}
        transition={springConfig.magnetic}
        className={cn(
          'relative inline-flex items-center justify-center font-semibold rounded-full overflow-hidden',
          'transition-all duration-300 cursor-pointer group',
          sizeClasses[size],
          variant === 'primary' && 'text-white',
          variant === 'secondary' && 'bg-white/5 border border-frost text-text-primary hover:bg-white/10',
          className
        )}
        {...props}
      >
        {variant === 'primary' && (
          <>
            <span
              className={cn(
                'absolute inset-0 bg-gradient-to-r opacity-90 group-hover:opacity-100 transition-opacity duration-300',
                colors.from,
                colors.to
              )}
            />
            <span
              className={cn(
                'absolute -inset-1 bg-gradient-to-r blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300',
                colors.from,
                colors.to
              )}
            />
          </>
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.a>
    );
  }
);

SynapticLinkButton.displayName = 'SynapticLinkButton';

export default SynapticButton;
