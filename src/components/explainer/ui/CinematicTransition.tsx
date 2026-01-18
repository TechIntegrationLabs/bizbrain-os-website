'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ============================================================================
// CINEMATIC SLIDE WRAPPER - Creates dramatic reveal effects
// ============================================================================

interface CinematicSlideProps {
  children: React.ReactNode;
  isActive: boolean;
  slideIndex: number;
  direction?: 'forward' | 'backward';
  variant?: 'fade' | 'reveal' | 'zoom' | 'morph' | 'split' | 'dissolve';
}

// Dramatic transition variants
const transitionVariants = {
  fade: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
  },
  reveal: {
    initial: { opacity: 0, clipPath: 'circle(0% at 50% 50%)' },
    animate: { opacity: 1, clipPath: 'circle(150% at 50% 50%)' },
    exit: { opacity: 0, clipPath: 'circle(0% at 50% 50%)' },
  },
  zoom: {
    initial: { opacity: 0, scale: 1.5, filter: 'blur(20px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
  },
  morph: {
    initial: { opacity: 0, borderRadius: '50%', scale: 0.5 },
    animate: { opacity: 1, borderRadius: '0%', scale: 1 },
    exit: { opacity: 0, borderRadius: '50%', scale: 0.5 },
  },
  split: {
    initial: { opacity: 0, y: 100, rotateX: 45 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    exit: { opacity: 0, y: -100, rotateX: -45 },
  },
  dissolve: {
    initial: { opacity: 0, filter: 'saturate(0) brightness(2)' },
    animate: { opacity: 1, filter: 'saturate(1) brightness(1)' },
    exit: { opacity: 0, filter: 'saturate(0) brightness(0.5)' },
  },
};

export const CinematicSlide: React.FC<CinematicSlideProps> = ({
  children,
  isActive,
  slideIndex,
  direction = 'forward',
  variant = 'reveal',
}) => {
  const variants = transitionVariants[variant];

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={slideIndex}
          className="absolute inset-0"
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for cinematic feel
          }}
          style={{
            transformPerspective: 1200,
            transformOrigin: 'center center',
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// DRAMATIC REVEAL - Cascading content reveal animation
// ============================================================================

interface DramaticRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate';
  staggerChildren?: number;
  className?: string;
}

export const DramaticReveal: React.FC<DramaticRevealProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  direction = 'up',
  staggerChildren = 0.1,
  className = '',
}) => {
  const directionVariants = {
    up: { initial: { y: 80, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    down: { initial: { y: -80, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    left: { initial: { x: 80, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    right: { initial: { x: -80, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    scale: { initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 } },
    rotate: { initial: { rotate: -15, scale: 0.8, opacity: 0 }, animate: { rotate: 0, scale: 1, opacity: 1 } },
  };

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: {
            delayChildren: delay,
            staggerChildren: staggerChildren,
          },
        },
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          variants={directionVariants[direction]}
          transition={{
            duration,
            delay: delay + index * staggerChildren,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// ============================================================================
// KINETIC TEXT - Dramatic text animations
// ============================================================================

interface KineticTextProps {
  text: string;
  className?: string;
  variant?: 'slide' | 'fade' | 'wave' | 'glitch' | 'typewriter' | 'blur';
  delay?: number;
  duration?: number;
  stagger?: number;
  highlightWords?: string[];
  highlightColor?: string;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  className = '',
  variant = 'slide',
  delay = 0,
  duration = 0.6,
  stagger = 0.03,
  highlightWords = [],
  highlightColor = '#06b6d4',
}) => {
  const words = text.split(' ');

  const getVariant = () => {
    switch (variant) {
      case 'slide':
        return {
          initial: { y: 60, opacity: 0, rotateX: -40 },
          animate: { y: 0, opacity: 1, rotateX: 0 },
        };
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        };
      case 'wave':
        return {
          initial: { y: 30, opacity: 0 },
          animate: { y: 0, opacity: 1 },
        };
      case 'glitch':
        return {
          initial: { x: -20, opacity: 0, skewX: 20 },
          animate: { x: 0, opacity: 1, skewX: 0 },
        };
      case 'typewriter':
        return {
          initial: { opacity: 0, width: 0 },
          animate: { opacity: 1, width: 'auto' },
        };
      case 'blur':
        return {
          initial: { filter: 'blur(12px)', opacity: 0 },
          animate: { filter: 'blur(0px)', opacity: 1 },
        };
      default:
        return {
          initial: { y: 40, opacity: 0 },
          animate: { y: 0, opacity: 1 },
        };
    }
  };

  const wordVariant = getVariant();

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      style={{ perspective: 600 }}
    >
      {words.map((word, i) => {
        const isHighlighted = highlightWords.includes(word.replace(/[.,!?]/g, ''));

        return (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block mr-[0.3em] whitespace-nowrap"
            initial={wordVariant.initial}
            animate={wordVariant.animate}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={isHighlighted ? { color: highlightColor } : undefined}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
};

// ============================================================================
// SPLIT TEXT - Character-by-character animation
// ============================================================================

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  variant?: 'slideUp' | 'fadeIn' | 'scaleUp' | 'rotateIn';
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.02,
  variant = 'slideUp',
}) => {
  const chars = text.split('');

  const variants = {
    slideUp: {
      initial: { y: '100%', opacity: 0 },
      animate: { y: '0%', opacity: 1 },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    scaleUp: {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
    },
    rotateIn: {
      initial: { rotate: 90, opacity: 0, y: 20 },
      animate: { rotate: 0, opacity: 1, y: 0 },
    },
  };

  return (
    <span className={`inline-flex overflow-hidden ${className}`}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={variants[variant].initial}
          animate={variants[variant].animate}
          transition={{
            duration: 0.5,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

// ============================================================================
// DRAMATIC NUMBER - Animated number counter with effects
// ============================================================================

interface DramaticNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
  format?: (n: number) => string;
}

export const DramaticNumber: React.FC<DramaticNumberProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  delay = 0,
  className = '',
  format = (n) => Math.round(n).toLocaleString(),
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const timeout = setTimeout(() => {
      setHasAnimated(true);
      let start = 0;
      const end = value;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = (currentTime - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = start + (end - start) * eased;

        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [value, duration, delay, hasAnimated]);

  return (
    <motion.span
      className={`tabular-nums ${className}`}
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {prefix}
      {format(displayValue)}
      {suffix}
    </motion.span>
  );
};

// ============================================================================
// PULSE GLOW - Dramatic pulsing glow effect
// ============================================================================

interface PulseGlowProps {
  children: React.ReactNode;
  color?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
}

export const PulseGlow: React.FC<PulseGlowProps> = ({
  children,
  color = '#06b6d4',
  intensity = 'medium',
  speed = 'medium',
  className = '',
}) => {
  const intensityMap = {
    subtle: '0 0 20px',
    medium: '0 0 40px',
    strong: '0 0 80px',
  };

  const speedMap = {
    slow: 3,
    medium: 2,
    fast: 1,
  };

  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        boxShadow: [
          `${intensityMap[intensity]} ${color}00`,
          `${intensityMap[intensity]} ${color}60`,
          `${intensityMap[intensity]} ${color}00`,
        ],
      }}
      transition={{
        duration: speedMap[speed],
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// FLOATING ELEMENT - Smooth floating animation
// ============================================================================

interface FloatingElementProps {
  children: React.ReactNode;
  amplitude?: number;
  frequency?: number;
  delay?: number;
  className?: string;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  amplitude = 10,
  frequency = 3,
  delay = 0,
  className = '',
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration: frequency,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// PARTICLE BURST - Burst of particles on trigger
// ============================================================================

interface ParticleBurstProps {
  trigger: boolean;
  count?: number;
  colors?: string[];
  className?: string;
}

export const ParticleBurst: React.FC<ParticleBurstProps> = ({
  trigger,
  count = 20,
  colors = ['#06b6d4', '#10b981', '#f59e0b'],
  className = '',
}) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    angle: number;
    velocity: number;
  }>>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: 0,
        y: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 8,
        angle: (i / count) * 360 + Math.random() * 30,
        velocity: 100 + Math.random() * 150,
      }));
      setParticles(newParticles);

      setTimeout(() => setParticles([]), 1500);
    }
  }, [trigger, count, colors]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <AnimatePresence>
        {particles.map((particle) => {
          const rad = (particle.angle * Math.PI) / 180;
          const endX = Math.cos(rad) * particle.velocity;
          const endY = Math.sin(rad) * particle.velocity;

          return (
            <motion.div
              key={particle.id}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: endX,
                y: endY,
                opacity: 0,
                scale: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1,
                ease: 'easeOut',
              }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// SPOTLIGHT EFFECT - Moving spotlight that follows content
// ============================================================================

interface SpotlightEffectProps {
  children: React.ReactNode;
  color?: string;
  size?: number;
  className?: string;
}

export const SpotlightEffect: React.FC<SpotlightEffectProps> = ({
  children,
  color = 'rgba(6, 182, 212, 0.15)',
  size = 400,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(${size}px circle at ${x}px ${y}px, ${color}, transparent 80%)`
  );

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  transitionVariants,
};
