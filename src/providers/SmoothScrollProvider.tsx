'use client';

import { useEffect, useRef, createContext, useContext, ReactNode } from 'react';
import Lenis from 'lenis';
import { useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';

// ============================================
// LENIS CONFIGURATION
// Synaptic Glass Design System v2.0
// ============================================
const LENIS_CONFIG = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical' as const,
  gestureOrientation: 'vertical' as const,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
};

// ============================================
// CONTEXT TYPES
// ============================================
interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  scrollYSmooth: MotionValue<number>;
  scrollTo: (target: string | number | HTMLElement, options?: ScrollToOptions) => void;
  stop: () => void;
  start: () => void;
}

interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
  lock?: boolean;
}

// ============================================
// CONTEXT
// ============================================
const SmoothScrollContext = createContext<SmoothScrollContextType | null>(null);

// ============================================
// PROVIDER COMPONENT
// ============================================
interface SmoothScrollProviderProps {
  children: ReactNode;
  options?: Partial<typeof LENIS_CONFIG>;
}

export function SmoothScrollProvider({
  children,
  options = {},
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  // Motion values for scroll tracking
  const scrollY = useMotionValue(0);
  const scrollYSmooth = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Create scroll progress (0 to 1)
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Initialize Lenis with merged config
    const lenis = new Lenis({
      ...LENIS_CONFIG,
      ...options,
      // Disable smooth scroll if user prefers reduced motion
      smoothWheel: prefersReducedMotion ? false : (options.smoothWheel ?? LENIS_CONFIG.smoothWheel),
    });

    lenisRef.current = lenis;

    // Update motion values on scroll
    lenis.on('scroll', ({ scroll, limit }: { scroll: number; limit: number }) => {
      scrollY.set(scroll);
      scrollYProgress.set(limit > 0 ? scroll / limit : 0);
    });

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options, scrollY, scrollYProgress]);

  // Scroll control methods
  const scrollTo = (
    target: string | number | HTMLElement,
    scrollOptions: ScrollToOptions = {}
  ) => {
    lenisRef.current?.scrollTo(target, scrollOptions);
  };

  const stop = () => {
    lenisRef.current?.stop();
  };

  const start = () => {
    lenisRef.current?.start();
  };

  const contextValue: SmoothScrollContextType = {
    lenis: lenisRef.current,
    scrollY,
    scrollYProgress,
    scrollYSmooth,
    scrollTo,
    stop,
    start,
  };

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

// ============================================
// HOOK
// ============================================
export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error('useSmoothScroll must be used within SmoothScrollProvider');
  }
  return context;
}

// ============================================
// PARALLAX HOOK
// Create parallax effects based on scroll
// ============================================
interface ParallaxOptions {
  speed?: number;
  offset?: number;
}

export function useParallax({ speed = 0.5, offset = 0 }: ParallaxOptions = {}) {
  const { scrollY } = useSmoothScroll();

  const y = useTransform(scrollY, (value) => {
    return offset + value * speed;
  });

  return { y };
}

// ============================================
// SCROLL VELOCITY HOOK
// Track scroll velocity for animations
// ============================================
export function useScrollVelocity() {
  const { scrollY } = useSmoothScroll();
  const prevScrollY = useRef(0);
  const velocity = useMotionValue(0);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      const delta = latest - prevScrollY.current;
      velocity.set(delta);
      prevScrollY.current = latest;
    });

    return () => unsubscribe();
  }, [scrollY, velocity]);

  return velocity;
}

// ============================================
// SCROLL DIRECTION HOOK
// Track scroll direction (up/down)
// ============================================
export function useScrollDirection() {
  const { scrollY } = useSmoothScroll();
  const prevScrollY = useRef(0);
  const direction = useMotionValue<'up' | 'down' | 'none'>('none');

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      if (latest > prevScrollY.current) {
        direction.set('down');
      } else if (latest < prevScrollY.current) {
        direction.set('up');
      } else {
        direction.set('none');
      }
      prevScrollY.current = latest;
    });

    return () => unsubscribe();
  }, [scrollY, direction]);

  return direction;
}

export default SmoothScrollProvider;
