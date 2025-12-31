# BizBrain OS - Animation Guide

> Comprehensive animation specifications for consistent, performant, delightful interactions.

---

## Animation Philosophy

### Core Principles

1. **Purposeful Motion** - Every animation serves a purpose (guide attention, provide feedback, create delight)
2. **Performance First** - 60fps minimum, GPU-accelerated transforms only
3. **Subtle Over Flashy** - Micro-interactions > dramatic transitions
4. **Consistent Timing** - Unified easing curves across the site
5. **Respect User Preferences** - Honor `prefers-reduced-motion`

---

## Timing & Easing

### Duration Scale

| Token | Duration | Use Case |
|-------|----------|----------|
| `instant` | 100ms | Hover states, toggles |
| `fast` | 200ms | Button clicks, micro-interactions |
| `normal` | 300ms | Card reveals, tooltips |
| `slow` | 500ms | Section transitions, modals |
| `slower` | 800ms | Page transitions, hero animations |
| `slowest` | 1200ms | Initial load sequences |

### Easing Curves

```typescript
// framer-motion easing presets
export const easing = {
  // Standard ease-out for most animations
  smooth: [0.25, 0.1, 0.25, 1],

  // Snappy for UI feedback
  snappy: [0.22, 1, 0.36, 1],

  // Bouncy for playful elements
  bounce: [0.68, -0.55, 0.265, 1.55],

  // Gentle for content reveals
  gentle: [0.4, 0, 0.2, 1],

  // Spring physics (stiffness, damping, mass)
  spring: { type: "spring", stiffness: 400, damping: 30 },
  springGentle: { type: "spring", stiffness: 200, damping: 20 },
  springBouncy: { type: "spring", stiffness: 500, damping: 15 },
};
```

---

## Scroll Animations

### Section Reveal Pattern

Each section uses staggered fade-up animation on scroll:

```typescript
// Container variant
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Child variant
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Usage with useInView
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-100px" });

<motion.div
  ref={ref}
  variants={containerVariants}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
>
  {children.map((child, i) => (
    <motion.div key={i} variants={itemVariants}>
      {child}
    </motion.div>
  ))}
</motion.div>
```

### Parallax Effects

```typescript
// Hero parallax (scale + fade on scroll)
const { scrollY } = useScroll();
const opacity = useTransform(scrollY, [0, 600], [1, 0]);
const scale = useTransform(scrollY, [0, 600], [1, 1.3]);
const blur = useTransform(scrollY, [0, 600], [0, 10]);

// Section parallax (slower movement)
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"]
});
const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
```

---

## Interactive Component Animations

### IC-01: Neural Network Hero

```typescript
// Particle system animation loop
const animate = () => {
  time += 0.01;

  // Smooth rotation dampening
  targetRotY += (mouseX - targetRotY) * 0.05;
  targetRotX += (mouseY - targetRotX) * 0.05;

  particles.forEach(p => {
    // Z-depth movement (fly-through effect)
    p.z -= 0.5;
    if (p.z < -500) p.z += width;

    // Pulse size animation
    const pulse = 1 + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.3;
    p.size = p.baseSize * pulse;
  });

  // "Thought spark" - random bright pulses on connections
  if (Math.random() < 0.0005) {
    drawSpark(connection);
  }

  requestAnimationFrame(animate);
};
```

### IC-02: Terminal Simulator

```typescript
// Typing animation
const typeCommand = async (command: string) => {
  for (let i = 0; i <= command.length; i++) {
    setDisplayedText(command.slice(0, i));
    await delay(50 + Math.random() * 30); // Variable speed for realism
  }
};

// Output reveal (line by line)
const revealOutput = async (lines: string[]) => {
  for (const line of lines) {
    setOutput(prev => [...prev, ""]);
    for (let i = 0; i <= line.length; i++) {
      setOutput(prev => {
        const newOutput = [...prev];
        newOutput[newOutput.length - 1] = line.slice(0, i);
        return newOutput;
      });
      await delay(5); // Fast output typing
    }
    await delay(100); // Pause between lines
  }
};

// Cursor blink
const cursorVariants = {
  blink: {
    opacity: [1, 0, 1],
    transition: { duration: 1, repeat: Infinity },
  },
};
```

### IC-03: Voice Note Processor

```typescript
// Waveform animation (recording state)
const waveformVariants = {
  idle: {
    scaleY: 0.3,
  },
  recording: {
    scaleY: [0.3, 1, 0.5, 0.8, 0.3],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Processing spinner
const processingVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Context card reveal (stagger from center)
const cardRevealVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};
```

### IC-04: Context Graph

```typescript
// Node hover effect
const nodeVariants = {
  default: { scale: 1 },
  hover: {
    scale: 1.2,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  },
  active: {
    scale: 1.5,
    boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)",
  },
};

// Edge pulse animation
const edgePulse = {
  opacity: [0.3, 0.8, 0.3],
  strokeWidth: [1, 2, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// New connection draw
const drawConnection = {
  pathLength: [0, 1],
  transition: {
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1],
  },
};
```

### IC-05: Folder Explorer

```typescript
// Folder expand/collapse
const folderVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
};

// File highlight on hover
const fileHoverVariants = {
  default: {
    backgroundColor: "rgba(255,255,255,0)",
    x: 0,
  },
  hover: {
    backgroundColor: "rgba(6, 182, 212, 0.1)",
    x: 4,
    transition: { duration: 0.15 },
  },
};

// New file creation animation
const newFileVariants = {
  hidden: { opacity: 0, x: -20, height: 0 },
  visible: {
    opacity: 1,
    x: 0,
    height: "auto",
    transition: {
      opacity: { duration: 0.2 },
      x: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
      height: { duration: 0.3 },
    },
  },
};
```

### IC-06: Metrics Dashboard

```typescript
// Counter animation
const animateValue = (start: number, end: number, duration: number) => {
  const startTime = performance.now();

  const update = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    const current = Math.round(start + (end - start) * eased);
    setValue(current);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
};

// Chart line draw
const chartVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: {
      duration: 1.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Bar chart grow
const barVariants = {
  hidden: { scaleY: 0, originY: 1 },
  visible: (i: number) => ({
    scaleY: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};
```

### IC-07: Entity Cards

```typescript
// 3D card flip
const cardFlipVariants = {
  front: {
    rotateY: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
  back: {
    rotateY: 180,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Card hover tilt (from V2 GlassCard)
const useTiltEffect = (ref: RefObject<HTMLDivElement>) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xFromCenter = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const yFromCenter = (e.clientY - rect.top - rect.height / 2) / rect.height;
    x.set(xFromCenter);
    y.set(yFromCenter);
  };

  return { rotateX, rotateY, handleMouseMove };
};
```

---

## Hover & Micro-interactions

### Button Animations

```typescript
// Primary button
const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

// Magnetic effect (from V2)
const useMagneticButton = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return { position, handleMouseMove, handleMouseLeave };
};

// Glow pulse on hover
const glowVariants = {
  idle: { opacity: 0.3 },
  hover: {
    opacity: [0.3, 0.6, 0.3],
    transition: { duration: 1.5, repeat: Infinity },
  },
};
```

### Link Underline

```typescript
// Animated underline
const linkVariants = {
  idle: { scaleX: 0, originX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.3 } },
};

<motion.a>
  Link Text
  <motion.span
    className="absolute bottom-0 left-0 h-px w-full bg-cyan-400"
    variants={linkVariants}
    initial="idle"
    whileHover="hover"
  />
</motion.a>
```

### Icon Animations

```typescript
// Rotate on hover
const iconRotate = {
  idle: { rotate: 0 },
  hover: { rotate: 90, transition: { duration: 0.3 } },
};

// Bounce on click
const iconBounce = {
  tap: {
    y: [0, -8, 0],
    transition: { duration: 0.3, times: [0, 0.4, 1] },
  },
};

// Pulse (for notifications)
const iconPulse = {
  animate: {
    scale: [1, 1.2, 1],
    transition: { duration: 0.6, repeat: Infinity },
  },
};
```

---

## Page Transitions

### Route Change Animation

```typescript
// Wrap in AnimatePresence
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

### Shared Layout Animations

```typescript
// For course module navigation
<motion.div layoutId={`module-${id}`}>
  <motion.h3 layout="position">{title}</motion.h3>
  <motion.div layout>
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
</motion.div>
```

---

## Loading States

### Skeleton Loader

```typescript
const skeletonVariants = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// CSS
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.03) 0%,
    rgba(255,255,255,0.08) 50%,
    rgba(255,255,255,0.03) 100%
  );
  background-size: 200% 100%;
}
```

### Spinner

```typescript
const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Dots loading
const dotsVariants = {
  animate: (i: number) => ({
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      delay: i * 0.1,
    },
  }),
};
```

---

## Accessibility

### Reduced Motion

```typescript
// Hook for checking preference
const usePrefersReducedMotion = () => {
  const [prefers, setPrefers] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefers(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefers(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefers;
};

// Usage
const prefersReducedMotion = usePrefersReducedMotion();

const variants = prefersReducedMotion
  ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  : { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
```

### Focus Indicators

```typescript
// Animated focus ring
const focusRing = {
  boxShadow: [
    "0 0 0 2px rgba(6, 182, 212, 0)",
    "0 0 0 2px rgba(6, 182, 212, 0.5)",
  ],
  transition: { duration: 0.2 },
};
```

---

## Performance Guidelines

### GPU-Accelerated Properties Only

Always animate these properties:
- `transform` (translate, scale, rotate)
- `opacity`

Never animate:
- `width`, `height` (use `scale` instead)
- `top`, `left` (use `translate` instead)
- `margin`, `padding`
- `border-radius` on large elements

### Will-Change Usage

```css
/* Apply sparingly to animated elements */
.animated-element {
  will-change: transform, opacity;
}

/* Remove after animation completes */
.animation-complete {
  will-change: auto;
}
```

### Debounce Scroll Handlers

```typescript
const throttle = (fn: Function, limit: number) => {
  let inThrottle = false;
  return (...args: any[]) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const handleScroll = throttle(() => {
  // Scroll logic
}, 16); // ~60fps
```

---

## Animation Utilities

### Shared Motion Config

```typescript
// motion-config.ts
export const defaultTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

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

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
};
```

### Stagger Container

```typescript
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
```

---

*Animation specifications v1.0 - BizBrain OS*
