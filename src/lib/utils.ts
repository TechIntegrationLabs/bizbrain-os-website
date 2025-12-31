import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Animation easing presets
export const easing = {
  smooth: [0.25, 0.1, 0.25, 1] as const,
  snappy: [0.22, 1, 0.36, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  gentle: [0.4, 0, 0.2, 1] as const,
};

// Spring configs
export const spring = {
  default: { type: "spring" as const, stiffness: 400, damping: 30 },
  gentle: { type: "spring" as const, stiffness: 200, damping: 20 },
  bouncy: { type: "spring" as const, stiffness: 500, damping: 15 },
  stiff: { type: "spring" as const, stiffness: 600, damping: 40 },
};

// Stagger variants for Framer Motion
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easing.smooth }
  },
};

// Fade variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

// Delay helper
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Throttle function for performance
export const throttle = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
