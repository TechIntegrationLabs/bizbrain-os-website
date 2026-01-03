// Synaptic Glass Design System - Animation Presets
// Version 2.0 - Bioluminescent Intelligence Aesthetic
import { Variants, Transition } from 'framer-motion';

// ============================================
// DESIGN SYSTEM COLORS (for reference)
// ============================================
const colors = {
  neural: {
    teal: '#2dd4bf',
    emerald: '#10b981',
    amber: '#f59e0b',
    pink: '#f472b6',
  },
  glow: {
    teal: 'rgba(45, 212, 191, 0.4)',
    tealIntense: 'rgba(45, 212, 191, 0.6)',
    emerald: 'rgba(16, 185, 129, 0.4)',
    pink: 'rgba(244, 114, 182, 0.4)',
    amber: 'rgba(245, 158, 11, 0.4)',
  },
};

// ============================================
// EASING CURVES
// ============================================
export const easing = {
  // Synaptic Glass standard easings
  smooth: [0.25, 0.1, 0.25, 1] as const,
  snappy: [0.22, 1, 0.36, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  gentle: [0.4, 0, 0.2, 1] as const,

  // Neural-optimized easings
  neural: [0.33, 1, 0.68, 1] as const,
  synaptic: [0.16, 1, 0.3, 1] as const,

  // Apple-style easings
  apple: [0.16, 1, 0.3, 1] as const,
  appleSpring: [0.33, 1, 0.68, 1] as const,

  // Dramatic easings
  explosive: [0.7, 0, 0.3, 1] as const,
  anticipate: [0.68, -0.6, 0.32, 1.6] as const,
};

// ============================================
// SYNAPTIC GLASS SPRING PRESETS
// Physics-based spring configurations
// ============================================
export const spring = {
  // Default - balanced and natural
  default: { type: 'spring' as const, stiffness: 200, damping: 25, mass: 1 },

  // Quick - snappy UI feedback
  quick: { type: 'spring' as const, stiffness: 400, damping: 30, mass: 0.8 },

  // Slow - deliberate, elegant motion
  slow: { type: 'spring' as const, stiffness: 100, damping: 20, mass: 1.2 },

  // Bouncy - playful with overshoot
  bouncy: { type: 'spring' as const, stiffness: 300, damping: 15, mass: 1 },

  // Stiff - minimal oscillation
  stiff: { type: 'spring' as const, stiffness: 500, damping: 40, mass: 0.5 },

  // Magnetic - cursor-following, responsive
  magnetic: { type: 'spring' as const, stiffness: 150, damping: 15, mass: 0.5 },

  // Legacy springs (backward compatibility)
  gentle: { type: 'spring' as const, stiffness: 200, damping: 20 },
  wobbly: { type: 'spring' as const, stiffness: 180, damping: 12 },
  molasses: { type: 'spring' as const, stiffness: 120, damping: 14 },
};

// ============================================
// SPRING PRESETS (Exported for direct use)
// ============================================
export const springPresets = {
  default: { stiffness: 200, damping: 25, mass: 1 },
  quick: { stiffness: 400, damping: 30, mass: 0.8 },
  slow: { stiffness: 100, damping: 20, mass: 1.2 },
  bouncy: { stiffness: 300, damping: 15, mass: 1 },
  stiff: { stiffness: 500, damping: 40, mass: 0.5 },
  magnetic: { stiffness: 150, damping: 15, mass: 0.5 },
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
    transition: { duration: duration.medium, ease: easing.synaptic },
  },
  exit: { opacity: 0, y: -20, transition: { duration: duration.fast } },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.medium, ease: easing.synaptic },
  },
  exit: { opacity: 0, y: 20, transition: { duration: duration.fast } },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.medium, ease: easing.synaptic },
  },
  exit: { opacity: 0, x: 30, transition: { duration: duration.fast } },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.medium, ease: easing.synaptic },
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
    transition: { duration: duration.normal, ease: easing.synaptic },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: duration.fast } },
};

export const scaleInBounce: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: spring.bouncy,
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: duration.fast } },
};

export const popIn: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: spring.wobbly,
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
    transition: { duration: duration.medium, ease: easing.synaptic },
  },
  exit: { y: '100%', opacity: 0, transition: { duration: duration.fast } },
};

export const slideInFromTop: Variants = {
  initial: { y: '-100%', opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: duration.medium, ease: easing.synaptic },
  },
  exit: { y: '-100%', opacity: 0, transition: { duration: duration.fast } },
};

export const slideInFromLeft: Variants = {
  initial: { x: '-100%', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: duration.medium, ease: easing.synaptic },
  },
  exit: { x: '-100%', opacity: 0, transition: { duration: duration.fast } },
};

export const slideInFromRight: Variants = {
  initial: { x: '100%', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: duration.medium, ease: easing.synaptic },
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
    transition: { duration: duration.medium, ease: easing.synaptic },
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
// SYNAPTIC GLASS EFFECTS
// Neural glow and pulse animations
// ============================================

// Teal glow pulse (primary accent)
export const glowPulse: Variants = {
  initial: { boxShadow: '0 0 0 rgba(45, 212, 191, 0)' },
  animate: {
    boxShadow: [
      '0 0 20px rgba(45, 212, 191, 0.3)',
      '0 0 40px rgba(45, 212, 191, 0.6)',
      '0 0 20px rgba(45, 212, 191, 0.3)',
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

// Emerald glow pulse
export const glowPulseEmerald: Variants = {
  initial: { boxShadow: '0 0 0 rgba(16, 185, 129, 0)' },
  animate: {
    boxShadow: [
      '0 0 20px rgba(16, 185, 129, 0.3)',
      '0 0 40px rgba(16, 185, 129, 0.6)',
      '0 0 20px rgba(16, 185, 129, 0.3)',
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

// Pink glow pulse
export const glowPulsePink: Variants = {
  initial: { boxShadow: '0 0 0 rgba(244, 114, 182, 0)' },
  animate: {
    boxShadow: [
      '0 0 20px rgba(244, 114, 182, 0.3)',
      '0 0 40px rgba(244, 114, 182, 0.6)',
      '0 0 20px rgba(244, 114, 182, 0.3)',
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

// Neural pulse - subtle synapse firing effect
export const neuralPulse: Variants = {
  initial: { opacity: 0.3 },
  animate: {
    opacity: [0.3, 1, 0.3],
    scale: [1, 1.02, 1],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

// Synaptic fire - quick burst animation
export const synapticFire: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.8, 1],
    transition: { duration: 0.3, ease: easing.snappy },
  },
};

// Data stream - flowing animation for backgrounds
export const dataStream: Variants = {
  animate: {
    backgroundPosition: ['0% 0%', '100% 100%'],
    transition: { duration: 20, repeat: Infinity, ease: 'linear' },
  },
};

// ============================================
// MOTION EFFECTS
// ============================================
export const float: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const floatSlow: Variants = {
  animate: {
    y: [0, -15, 0],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const rotate: Variants = {
  animate: {
    rotate: [0, 360],
    transition: { duration: 20, repeat: Infinity, ease: 'linear' },
  },
};

export const rotateSlow: Variants = {
  animate: {
    rotate: [0, 360],
    transition: { duration: 60, repeat: Infinity, ease: 'linear' },
  },
};

export const shimmer: Variants = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: { duration: 3, repeat: Infinity, ease: 'linear' },
  },
};

// ============================================
// GLASS PANEL EFFECTS
// 3D tilt and glass interactions
// ============================================
export const glassTilt = {
  // Props to spread on motion.div
  whileHover: {
    rotateX: 5,
    rotateY: -5,
    transition: spring.magnetic,
  },
  style: { transformPerspective: 1000 },
};

export const glassHover: Variants = {
  initial: {
    borderColor: 'rgba(255, 255, 255, 0.08)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    borderColor: 'rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 40px rgba(45, 212, 191, 0.15)',
    transition: { duration: 0.3 },
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
  transition: spring.quick,
};

export const hoverLift = {
  whileHover: { y: -5, transition: spring.default },
  whileTap: { y: 0 },
};

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 10px 40px rgba(45, 212, 191, 0.3)',
    transition: { duration: 0.3 },
  },
};

export const hoverGlowIntense = {
  whileHover: {
    boxShadow: '0 0 60px rgba(45, 212, 191, 0.4)',
    transition: { duration: 0.3 },
  },
};

// Magnetic hover (cursor-following effect)
export const magneticHover = {
  transition: spring.magnetic,
};

// ============================================
// BUTTON EFFECTS
// ============================================
export const buttonPulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const buttonPress = {
  whileTap: { scale: 0.95 },
  transition: spring.quick,
};

export const buttonGlow = {
  whileHover: {
    boxShadow: [
      '0 0 20px rgba(45, 212, 191, 0.4)',
      '0 0 30px rgba(45, 212, 191, 0.6)',
    ],
  },
  transition: { duration: 0.3 },
};

// ============================================
// SCROLL REVEAL VARIANTS
// ============================================

// Viewport config for scroll reveal animations
export const revealViewport = { once: true, margin: '-100px' as const };

export const revealFromBottom: Variants = {
  initial: { opacity: 0, y: 80 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.synaptic },
  },
};

export const revealFromLeft: Variants = {
  initial: { opacity: 0, x: -80 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.synaptic },
  },
};

export const revealFromRight: Variants = {
  initial: { opacity: 0, x: 80 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.synaptic },
  },
};

export const revealScale: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease: easing.synaptic },
  },
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
  instant: { duration: duration.instant, ease: easing.smooth },
  fast: { duration: duration.fast, ease: easing.smooth },
  normal: { duration: duration.normal, ease: easing.synaptic },
  medium: { duration: duration.medium, ease: easing.synaptic },
  slow: { duration: duration.slow, ease: easing.synaptic },
  bouncy: spring.bouncy,
  gentle: spring.gentle,
  stiff: spring.stiff,
  magnetic: spring.magnetic,
};

// ============================================
// CURSOR EFFECTS (for MagneticButton)
// ============================================
export const cursorVariants = {
  default: {
    scale: 1,
    backgroundColor: 'rgba(45, 212, 191, 0.1)',
  },
  hover: {
    scale: 1.5,
    backgroundColor: 'rgba(45, 212, 191, 0.2)',
  },
  click: {
    scale: 0.9,
    backgroundColor: 'rgba(45, 212, 191, 0.4)',
  },
};

// ============================================
// PARALLAX HELPERS
// ============================================
export const parallaxConfig = {
  subtle: { offset: 20, speed: 0.5 },
  medium: { offset: 50, speed: 0.3 },
  dramatic: { offset: 100, speed: 0.2 },
};

// Helper function to calculate parallax transform
export const getParallaxOffset = (
  scrollY: number,
  speed: number,
  offset: number = 0
) => {
  return offset + scrollY * speed;
};
