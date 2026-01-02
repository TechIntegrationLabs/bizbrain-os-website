// Animation presets and variants for Framer Motion
import { Variants, Transition } from 'framer-motion';

// ============================================
// EASING CURVES
// ============================================
export const easing = {
  // Standard easings
  smooth: [0.25, 0.1, 0.25, 1] as const,
  snappy: [0.22, 1, 0.36, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  gentle: [0.4, 0, 0.2, 1] as const,

  // Apple-style easings
  apple: [0.16, 1, 0.3, 1] as const,
  appleSpring: [0.33, 1, 0.68, 1] as const,

  // Dramatic easings
  explosive: [0.7, 0, 0.3, 1] as const,
  anticipate: [0.68, -0.6, 0.32, 1.6] as const,
};

// ============================================
// SPRING CONFIGURATIONS
// ============================================
export const spring = {
  default: { type: "spring" as const, stiffness: 400, damping: 30 },
  gentle: { type: "spring" as const, stiffness: 200, damping: 20 },
  bouncy: { type: "spring" as const, stiffness: 500, damping: 15 },
  stiff: { type: "spring" as const, stiffness: 600, damping: 40 },
  wobbly: { type: "spring" as const, stiffness: 180, damping: 12 },
  molasses: { type: "spring" as const, stiffness: 120, damping: 14 },
  quick: { type: "spring" as const, stiffness: 700, damping: 35 },
};

// ============================================
// DURATION PRESETS
// ============================================
export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  medium: 0.5,
  slow: 0.7,
  dramatic: 1,
  leisurely: 1.5,
};

// ============================================
// FADE VARIANTS
// ============================================
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: duration.normal } },
  exit: { opacity: 0, transition: { duration: duration.fast } },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.medium, ease: easing.apple }
  },
  exit: { opacity: 0, y: -20, transition: { duration: duration.fast } },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.medium, ease: easing.apple }
  },
  exit: { opacity: 0, y: 20, transition: { duration: duration.fast } },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.medium, ease: easing.apple }
  },
  exit: { opacity: 0, x: 30, transition: { duration: duration.fast } },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.medium, ease: easing.apple }
  },
  exit: { opacity: 0, x: -30, transition: { duration: duration.fast } },
};

// ============================================
// SCALE VARIANTS
// ============================================
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: easing.apple }
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: duration.fast } },
};

export const scaleInBounce: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: spring.bouncy
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: duration.fast } },
};

export const popIn: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: spring.wobbly
  },
  exit: { opacity: 0, scale: 0.5, transition: { duration: duration.fast } },
};

// ============================================
// SLIDE VARIANTS
// ============================================
export const slideInFromBottom: Variants = {
  initial: { y: '100%', opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: duration.medium, ease: easing.apple }
  },
  exit: { y: '100%', opacity: 0, transition: { duration: duration.fast } },
};

export const slideInFromTop: Variants = {
  initial: { y: '-100%', opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: duration.medium, ease: easing.apple }
  },
  exit: { y: '-100%', opacity: 0, transition: { duration: duration.fast } },
};

export const slideInFromLeft: Variants = {
  initial: { x: '-100%', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: duration.medium, ease: easing.apple }
  },
  exit: { x: '-100%', opacity: 0, transition: { duration: duration.fast } },
};

export const slideInFromRight: Variants = {
  initial: { x: '100%', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: duration.medium, ease: easing.apple }
  },
  exit: { x: '100%', opacity: 0, transition: { duration: duration.fast } },
};

// ============================================
// STAGGER VARIANTS
// ============================================
export const staggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0
): Variants => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: staggerChildren / 2, staggerDirection: -1 },
  },
});

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.medium, ease: easing.apple },
  },
  exit: { opacity: 0, y: -10, transition: { duration: duration.fast } },
};

export const staggerItemScale: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: spring.bouncy,
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: duration.fast } },
};

// ============================================
// SPECIAL EFFECTS
// ============================================
export const glowPulse: Variants = {
  initial: { boxShadow: '0 0 0 rgba(6, 182, 212, 0)' },
  animate: {
    boxShadow: [
      '0 0 20px rgba(6, 182, 212, 0.3)',
      '0 0 40px rgba(6, 182, 212, 0.6)',
      '0 0 20px rgba(6, 182, 212, 0.3)',
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const float: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const rotate: Variants = {
  animate: {
    rotate: [0, 360],
    transition: { duration: 20, repeat: Infinity, ease: 'linear' },
  },
};

export const shimmer: Variants = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: { duration: 3, repeat: Infinity, ease: 'linear' },
  },
};

// ============================================
// HOVER STATES
// ============================================
export const hoverScale = {
  scale: 1.05,
  transition: spring.default,
};

export const hoverScaleTap = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: spring.default,
};

export const hoverLift = {
  whileHover: { y: -5, transition: spring.default },
  whileTap: { y: 0 },
};

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 10px 40px rgba(6, 182, 212, 0.3)',
    transition: { duration: 0.3 }
  },
};

// ============================================
// SCROLL REVEAL VARIANTS
// ============================================
export const revealFromBottom: Variants = {
  initial: { opacity: 0, y: 80 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.apple },
  },
  viewport: { once: true, margin: '-100px' },
};

export const revealFromLeft: Variants = {
  initial: { opacity: 0, x: -80 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.apple },
  },
  viewport: { once: true, margin: '-100px' },
};

export const revealFromRight: Variants = {
  initial: { opacity: 0, x: 80 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.apple },
  },
  viewport: { once: true, margin: '-100px' },
};

// ============================================
// TYPEWRITER EFFECT HELPER
// ============================================
export const typewriterTransition = (charDelay = 0.05): Transition => ({
  delay: charDelay,
  duration: 0,
});

// ============================================
// TRANSITION PRESETS
// ============================================
export const transition = {
  fast: { duration: duration.fast, ease: easing.smooth },
  normal: { duration: duration.normal, ease: easing.apple },
  medium: { duration: duration.medium, ease: easing.apple },
  slow: { duration: duration.slow, ease: easing.apple },
  bouncy: spring.bouncy,
  gentle: spring.gentle,
  stiff: spring.stiff,
};
