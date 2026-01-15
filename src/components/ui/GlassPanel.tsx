'use client';

import React, { useRef, useCallback, forwardRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { spring as springConfig } from '@/lib/animations';

// ============================================
// GLASS PANEL - Synaptic Glass Design System
// Core building block for glass morphism UI
// ============================================

type GlassVariant = 'default' | 'interactive' | 'subtle' | 'solid';
type GlowColor = 'teal' | 'emerald' | 'pink' | 'amber' | 'none';

interface GlassPanelProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  variant?: GlassVariant;
  glow?: GlowColor;
  tilt?: boolean;
  tiltIntensity?: number;
  hover?: boolean;
  pulse?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  border?: boolean;
  className?: string;
}

// Variant class mappings
const variantClasses: Record<GlassVariant, string> = {
  default: 'glass-panel',
  interactive: 'glass-panel-interactive',
  subtle: 'glass-panel-subtle',
  solid: 'glass-panel-solid',
};

// Glow class mappings
const glowClasses: Record<GlowColor, string> = {
  teal: 'glow-teal',
  emerald: 'glow-emerald',
  pink: 'glow-pink',
  amber: 'glow-amber',
  none: '',
};

// Padding mappings
const paddingClasses: Record<string, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

// Rounded mappings
const roundedClasses: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
};

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    {
      children,
      variant = 'default',
      glow = 'none',
      tilt = false,
      tiltIntensity = 7,
      hover = true,
      pulse = false,
      padding = 'lg',
      rounded = '2xl',
      border = true,
      className = '',
      ...props
    },
    forwardedRef
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLDivElement>) || localRef;

    // Motion values for 3D tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth tilt animation
    const mouseX = useSpring(x, springConfig.magnetic);
    const mouseY = useSpring(y, springConfig.magnetic);

    // Transform mouse position to rotation
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]);

    // Handle mouse movement for tilt effect
    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current || !tilt) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
      },
      [x, y, tilt, ref]
    );

    // Reset tilt on mouse leave
    const handleMouseLeave = useCallback(() => {
      x.set(0);
      y.set(0);
    }, [x, y]);

    // Build class names
    const classes = cn(
      // Base variant
      variantClasses[variant],
      // Padding
      paddingClasses[padding],
      // Rounded corners
      roundedClasses[rounded],
      // Glow effect
      glowClasses[glow],
      // Border (can be disabled)
      !border && 'border-0',
      // Hover effects
      hover && 'transition-all duration-300',
      hover && variant !== 'subtle' && 'hover:border-frost-hover',
      // Pulse animation
      pulse && 'animate-neural-pulse',
      // Base utilities
      'relative overflow-hidden',
      // Custom classes
      className
    );

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: tilt ? rotateX : 0,
          rotateY: tilt ? rotateY : 0,
          transformStyle: 'preserve-3d',
          transformPerspective: 1000,
        }}
        className={classes}
        {...props}
      >
        {/* Hover gradient overlay - appears on hover */}
        {hover && (
          <div
            className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ transform: 'translateZ(0px)' }}
          />
        )}

        {/* Glow pulse overlay - for animated glow effects */}
        {glow !== 'none' && (
          <div
            className={cn(
              'absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none',
              'group-hover:opacity-100',
              glow === 'teal' && 'shadow-[inset_0_0_40px_rgba(45,212,191,0.1)]',
              glow === 'emerald' && 'shadow-[inset_0_0_40px_rgba(16,185,129,0.1)]',
              glow === 'pink' && 'shadow-[inset_0_0_40px_rgba(244,114,182,0.1)]',
              glow === 'amber' && 'shadow-[inset_0_0_40px_rgba(245,158,11,0.1)]'
            )}
          />
        )}

        {/* Content container with 3D depth */}
        <div
          className="relative z-10"
          style={{ transform: tilt ? 'translateZ(20px)' : undefined }}
        >
          {children}
        </div>
      </motion.div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';

// ============================================
// GLASS PANEL HEADER
// Optional header component for GlassPanel
// ============================================
interface GlassPanelHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassPanelHeader: React.FC<GlassPanelHeaderProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between pb-4 mb-4 border-b border-frost',
        className
      )}
    >
      {children}
    </div>
  );
};

// ============================================
// GLASS PANEL TITLE
// Title component for GlassPanel
// ============================================
interface GlassPanelTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const GlassPanelTitle: React.FC<GlassPanelTitleProps> = ({
  children,
  className = '',
  as: Component = 'h3',
}) => {
  return (
    <Component
      className={cn(
        'font-display font-semibold text-text-primary',
        Component === 'h1' && 'text-2xl',
        Component === 'h2' && 'text-xl',
        Component === 'h3' && 'text-lg',
        Component === 'h4' && 'text-base',
        className
      )}
    >
      {children}
    </Component>
  );
};

// ============================================
// GLASS PANEL DESCRIPTION
// Description component for GlassPanel
// ============================================
interface GlassPanelDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassPanelDescription: React.FC<GlassPanelDescriptionProps> = ({
  children,
  className = '',
}) => {
  return (
    <p className={cn('text-sm text-text-secondary', className)}>{children}</p>
  );
};

// ============================================
// GLASS PANEL FOOTER
// Optional footer component for GlassPanel
// ============================================
interface GlassPanelFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassPanelFooter: React.FC<GlassPanelFooterProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between pt-4 mt-4 border-t border-frost',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassPanel;
