'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

// ============================================================================
// GLASS CARD - Premium glassmorphism with 3D tilt
// ============================================================================

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  tiltEnabled?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glowColor = '#06b6d4',
  intensity = 'medium',
  tiltEnabled = true,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springConfig = { stiffness: 200, damping: 25 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const intensityMap = {
    subtle: { blur: 8, opacity: 0.3, border: 0.1 },
    medium: { blur: 12, opacity: 0.5, border: 0.2 },
    strong: { blur: 20, opacity: 0.7, border: 0.3 },
  };

  const settings = intensityMap[intensity];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !tiltEnabled) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    rotateX.set(mouseY / 15);
    rotateY.set(-mouseX / 15);

    const glowPosX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowPosY = ((e.clientY - rect.top) / rect.height) * 100;
    glowX.set(glowPosX);
    glowY.set(glowPosY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(600px circle at ${x}% ${y}%, ${glowColor}15, transparent 40%)`
  );

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden rounded-2xl cursor-pointer ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glass background */}
      <div
        className="absolute inset-0 backdrop-blur-xl"
        style={{
          backdropFilter: `blur(${settings.blur}px)`,
          backgroundColor: `rgba(19, 19, 31, ${settings.opacity})`,
        }}
      />

      {/* Border */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          border: `1px solid rgba(255, 255, 255, ${settings.border})`,
        }}
      />

      {/* Dynamic glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: glowBackground }}
      />

      {/* Inner highlight */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// ============================================================================
// HOLOGRAPHIC BADGE - Iridescent animated badge
// ============================================================================

interface HolographicBadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'premium' | 'success' | 'warning';
}

export const HolographicBadge: React.FC<HolographicBadgeProps> = ({
  children,
  className = '',
  variant = 'default',
}) => {
  const variantColors = {
    default: ['#06b6d4', '#3b82f6', '#8b5cf6'],
    premium: ['#f59e0b', '#ec4899', '#8b5cf6'],
    success: ['#10b981', '#06b6d4', '#3b82f6'],
    warning: ['#f59e0b', '#ef4444', '#ec4899'],
  };

  const colors = variantColors[variant];

  return (
    <motion.span
      className={`relative inline-flex items-center px-4 py-1.5 rounded-full overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `linear-gradient(90deg, ${colors[0]}40, ${colors[1]}40, ${colors[2]}40)`,
            `linear-gradient(180deg, ${colors[1]}40, ${colors[2]}40, ${colors[0]}40)`,
            `linear-gradient(270deg, ${colors[2]}40, ${colors[0]}40, ${colors[1]}40)`,
            `linear-gradient(360deg, ${colors[0]}40, ${colors[1]}40, ${colors[2]}40)`,
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Border */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${colors[0]}60`,
        }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.5) 50%, transparent 80%)',
          ],
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 2,
        }}
      />

      {/* Content */}
      <span className="relative z-10 text-white text-sm font-medium">{children}</span>
    </motion.span>
  );
};

// ============================================================================
// MAGNETIC BUTTON - Button that follows cursor
// ============================================================================

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  magneticStrength = 0.3,
  onClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className={className}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

// ============================================================================
// ANIMATED BORDER - Rotating gradient border
// ============================================================================

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
  thickness?: number;
}

export const AnimatedBorder: React.FC<AnimatedBorderProps> = ({
  children,
  className = '',
  colors = ['#06b6d4', '#10b981', '#f59e0b', '#ec4899'],
  speed = 4,
  thickness = 2,
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Rotating gradient border */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          padding: thickness,
          background: `conic-gradient(from 0deg, ${colors.join(', ')}, ${colors[0]})`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="w-full h-full rounded-2xl bg-background" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 rounded-2xl bg-surface/50 backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// REVEAL CONTAINER - Scroll/trigger based reveal
// ============================================================================

interface RevealContainerProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  trigger?: boolean;
}

export const RevealContainer: React.FC<RevealContainerProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  trigger = true,
}) => {
  const directions = {
    up: { initial: { y: 60, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    down: { initial: { y: -60, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    left: { initial: { x: 60, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    right: { initial: { x: -60, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  };

  return (
    <motion.div
      className={className}
      initial={directions[direction].initial}
      animate={trigger ? directions[direction].animate : directions[direction].initial}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// COUNTER UP - Animated number with blur effect
// ============================================================================

interface CounterUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export const CounterUp: React.FC<CounterUpProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  delay = 0,
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      // Easing function
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [started, value, duration]);

  return (
    <motion.span
      className={`tabular-nums ${className}`}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, delay }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
};

// ============================================================================
// TYPING EFFECT - Typewriter with blinking cursor
// ============================================================================

interface TypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursorColor?: string;
  onComplete?: () => void;
}

export const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
  cursorColor = '#06b6d4',
  onComplete,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          setDisplayText(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, onComplete]);

  // Blinking cursor
  useEffect(() => {
    if (isComplete) {
      const interval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isComplete]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        className="inline-block w-0.5 h-[1em] ml-0.5 align-middle"
        style={{ backgroundColor: cursorColor }}
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      />
    </span>
  );
};

// ============================================================================
// PARALLAX CONTAINER - Depth-based parallax effect
// ============================================================================

interface ParallaxContainerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'vertical' | 'horizontal';
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'vertical',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = centerY - viewportCenter;

      if (direction === 'vertical') {
        y.set(distance * speed);
      } else {
        x.set(distance * speed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction, x, y]);

  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={{ y: direction === 'vertical' ? y : 0, x: direction === 'horizontal' ? x : 0 }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// CINEMA MODE OVERLAY - Darkens edges for focus
// ============================================================================

interface CinemaModeProps {
  isActive: boolean;
  intensity?: number;
}

export const CinemaMode: React.FC<CinemaModeProps> = ({ isActive, intensity = 0.5 }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(0,0,0,${intensity}) 100%)
            `,
          }}
        />
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// NOISE OVERLAY - Film grain texture
// ============================================================================

interface NoiseOverlayProps {
  opacity?: number;
  className?: string;
}

export const NoiseOverlay: React.FC<NoiseOverlayProps> = ({
  opacity = 0.03,
  className = '',
}) => {
  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[100] ${className}`}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default GlassCard;
