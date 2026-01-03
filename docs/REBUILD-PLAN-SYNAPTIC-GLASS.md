# BizBrain OS Website Rebuild Plan
## "Synaptic Glass" Design Language v2.0

> **Branch:** `newdesign`
> **Created:** 2026-01-03
> **Design System:** Synaptic Glass v2.0 - Bioluminescent Intelligence Aesthetic

---

## Executive Summary

This document outlines the complete rebuild strategy for bizbrain-os.com using the Synaptic Glass Design Language v2.0. The goal is to transform the site into a premium, highly interactive experience that visualizes intelligence through bioluminescent aesthetics, layered glass panels, and physics-based animations.

**Core Philosophy:**
- "Intelligence is Visible" - Neural patterns, data flows, synaptic connections
- "Depth is Data" - Layered glass panels suggest depth of understanding
- "Subtle Animation" - Elements pulse, breathe, and flow like a living system

---

## Phase 1: Design Tokens & Foundation

### 1.1 Color System Update

**Current → New Color Mapping:**

| Token | Current Value | New Value | Notes |
|-------|---------------|-----------|-------|
| `--void` | N/A | `#030308` | NEW: Pure void for deep backgrounds |
| `--abyss` | `#0a0a0f` | `#0a0a0f` | Keep: Primary background |
| `--surface` | `#13131f` | `#13131f` | Keep: Card backgrounds |
| `--surface-light` | `#1a1a2e` | `#1a1a2e` | Keep: Elevated surfaces |
| `--surface-glow` | N/A | `#252542` | NEW: Active/hovered surfaces |
| `--primary` | `#06b6d4` (Cyan) | `#2dd4bf` (Teal) | UPDATE: Slightly warmer teal |
| `--primary-glow` | N/A | `rgba(45, 212, 191, 0.4)` | NEW: Glow effect color |
| `--secondary` | `#10b981` | `#10b981` | Keep: Emerald |
| `--accent` | `#f59e0b` | `#f59e0b` | Keep: Amber |
| `--neural-pink` | N/A | `#f472b6` | NEW: Alerts, emphasis, 3rd accent |
| `--frost` | N/A | `rgba(255, 255, 255, 0.08)` | NEW: Border frost effect |
| `--frost-hover` | N/A | `rgba(255, 255, 255, 0.15)` | NEW: Border frost on hover |

**New CSS Variables to Add:**
```css
:root {
  /* Synaptic Glass Palette */
  --void: #030308;
  --abyss: #0a0a0f;
  --surface: #13131f;
  --surface-light: #1a1a2e;
  --surface-glow: #252542;

  /* Neural Accent Colors */
  --neural-teal: #2dd4bf;
  --neural-emerald: #10b981;
  --neural-amber: #f59e0b;
  --neural-pink: #f472b6;

  /* Glow Effects */
  --glow-teal: rgba(45, 212, 191, 0.4);
  --glow-emerald: rgba(16, 185, 129, 0.4);
  --glow-pink: rgba(244, 114, 182, 0.4);

  /* Frost Effects */
  --frost: rgba(255, 255, 255, 0.08);
  --frost-hover: rgba(255, 255, 255, 0.15);
  --frost-active: rgba(255, 255, 255, 0.20);

  /* Backdrop */
  --blur-sm: 8px;
  --blur-md: 16px;
  --blur-lg: 24px;
  --blur-xl: 40px;
}
```

### 1.2 Typography System

**Font Stack (Already correct, minor refinements):**
```css
--font-display: 'Space Grotesk', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

**Type Scale (New):**
| Class | Size | Weight | Line Height | Use Case |
|-------|------|--------|-------------|----------|
| `.text-display-xl` | 80px | 700 | 0.95 | Hero headline |
| `.text-display-lg` | 64px | 700 | 1.0 | Section headlines |
| `.text-display-md` | 48px | 600 | 1.1 | Sub-headlines |
| `.text-display-sm` | 32px | 600 | 1.2 | Card titles |
| `.text-body-lg` | 18px | 400 | 1.7 | Lead paragraphs |
| `.text-body-md` | 16px | 400 | 1.6 | Body text |
| `.text-body-sm` | 14px | 400 | 1.5 | Captions |
| `.text-mono` | 14px | 400 | 1.5 | Code/terminal |

### 1.3 Spacing & Grid

**8px Base Grid:**
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```

**Container Widths:**
- Max width: 1400px
- Content width: 1200px
- Narrow content: 800px

---

## Phase 2: Spring Physics Animation System

### 2.1 Spring Presets

**Add to `src/lib/animations.ts`:**

```typescript
// Synaptic Glass Spring Presets
export const springPresets = {
  // Default - balanced feel
  default: { stiffness: 200, damping: 25, mass: 1 },

  // Quick - snappy micro-interactions
  quick: { stiffness: 400, damping: 30, mass: 0.8 },

  // Slow - ambient, breathing animations
  slow: { stiffness: 100, damping: 20, mass: 1.2 },

  // Bouncy - playful interactions
  bouncy: { stiffness: 300, damping: 15, mass: 1 },

  // Stiff - precise, technical feel
  stiff: { stiffness: 500, damping: 40, mass: 0.5 },

  // Magnetic - cursor following
  magnetic: { stiffness: 150, damping: 15, mass: 0.5 },
};

// Timing functions
export const easing = {
  smooth: [0.16, 1, 0.3, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  sharp: [0.4, 0, 0.2, 1],
};

// Duration presets
export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
};
```

### 2.2 Animation Patterns

**Entrance Animations:**
```typescript
export const entranceVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeScale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  slideIn: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  glowIn: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
};
```

**Hover States (Spring-based):**
- Cards: Scale 1.02, shadow glow increase, border frost brighten
- Buttons: Scale 1.05, glow pulse
- Links: Color shift with spring timing

**Scroll Animations:**
- Parallax layers with different speeds
- Neural node connections animate on scroll
- Stagger children with 0.1s delays

---

## Phase 3: Component Library Rebuild

### 3.1 GlassPanel Component (Enhanced)

**Replace current `GlassCard.tsx` with enhanced `GlassPanel.tsx`:**

```typescript
// src/components/ui/GlassPanel.tsx
interface GlassPanelProps {
  variant?: 'default' | 'interactive' | 'subtle' | 'solid';
  glow?: 'none' | 'teal' | 'emerald' | 'pink';
  enableTilt?: boolean;
  enableHover?: boolean;
  children: React.ReactNode;
  className?: string;
}
```

**Variant Styles:**

| Variant | Background | Backdrop Blur | Border | Use Case |
|---------|------------|---------------|--------|----------|
| `default` | `surface/30` | `blur-xl` | `frost` | Primary cards |
| `interactive` | `surface/40` | `blur-xl` | `frost-hover on hover` | Clickable cards |
| `subtle` | `surface/10` | `blur-md` | `frost/50` | Background elements |
| `solid` | `surface` | `none` | `frost` | Non-glass cards |

**Glow Effects:**
```css
.glow-teal { box-shadow: 0 0 60px -15px var(--glow-teal); }
.glow-emerald { box-shadow: 0 0 60px -15px var(--glow-emerald); }
.glow-pink { box-shadow: 0 0 60px -15px var(--glow-pink); }
```

### 3.2 NeuralNodeGraph Component (Enhanced)

**Current Hero canvas is good - enhance with:**

1. **Configurable Props:**
   ```typescript
   interface NeuralNodeGraphProps {
     particleCount?: number;          // Default: 120
     connectionDistance?: number;     // Default: 150
     primaryColor?: string;           // Default: neural-teal
     connectionColor?: string;        // Default: neural-emerald
     enableMouseInteraction?: boolean;
     enableParallax?: boolean;
     speed?: 'slow' | 'normal' | 'fast';
   }
   ```

2. **New Features:**
   - "Synaptic fire" - occasional bright pulses traveling along connections (partially exists)
   - Depth-of-field blur for distant nodes
   - Optional grid overlay
   - WebGL option for better performance

### 3.3 New Components to Build

| Component | Priority | Description |
|-----------|----------|-------------|
| `SynapticButton` | High | Spring-physics button with glow states |
| `DataStreamChart` | High | Animated streaming data visualization |
| `NeuralCard` | High | Enhanced GlassPanel with neural accents |
| `ConnectionPulse` | Medium | Animated connection lines between elements |
| `GlowBadge` | Medium | Status badges with glow effects |
| `MetricCounter` | Medium | Animated number counters |
| `ContextGraph` | Medium | D3-based context visualization |
| `ParallaxSection` | High | Lenis-powered parallax wrapper |
| `MorphingText` | Low | Text that morphs between states |

### 3.4 Button System

**SynapticButton Variants:**

```typescript
interface SynapticButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  magnetic?: boolean;
  loading?: boolean;
}
```

**Styles:**
| Variant | Background | Border | Glow |
|---------|------------|--------|------|
| `primary` | Gradient teal→emerald | None | Yes |
| `secondary` | `surface/50` | `frost` | On hover |
| `ghost` | Transparent | None | On hover |
| `danger` | `neural-pink/20` | `neural-pink/50` | Yes |

---

## Phase 4: Page Sections Rebuild

### 4.1 Hero Section (Keep & Enhance)

**Current:** Good neural particle system, typewriter effect
**Changes:**
- [ ] Update colors to new teal (#2dd4bf)
- [ ] Add subtle grid overlay behind particles
- [ ] Enhance "synaptic fire" pulses
- [ ] Add Lenis smooth scroll
- [ ] Implement parallax on headline text

### 4.2 Problem/Solution Section

**Rebuild with:**
- Split-screen layout
- Glass panels for problem vs solution
- Animated icons that "connect" when scrolled into view
- Neural connection animation between problem and solution

### 4.3 Features Showcase

**Current:** FeaturesShowcase.tsx exists
**Changes:**
- [ ] Convert to tabbed interface with live demos
- [ ] Each feature has interactive GlassPanel
- [ ] DataStreamChart showing real-time simulation
- [ ] ContextGraph visualization for "context building" feature

### 4.4 Interactive Demos Section

**Enhance existing demos:**
- Terminal Playground → Add streaming output effect
- Intake Processor → Add neural processing animation
- Entity Dashboard → Add live data streaming
- Time Tracker → Add animated progress rings

### 4.5 Social Proof Section

**Rebuild with:**
- Testimonial cards with glass morphism
- Logo carousel with subtle glow on hover
- Metric counters with spring animation

### 4.6 Course Section

**Enhance with:**
- Module cards with progress indicators
- "Neural pathway" connecting modules
- Unlock animations for progression

### 4.7 Pricing Section

**Rebuild with:**
- Three-tier glass cards
- "Recommended" tier with glow effect
- Feature comparison with animated checkmarks
- CTA buttons with magnetic effect

### 4.8 Final CTA

**Full-width section with:**
- NeuralNodeGraph background
- Centered glass panel
- Large magnetic button
- Subtle data stream animations

---

## Phase 5: Technical Implementation

### 5.1 File Structure Changes

```
src/
├── app/
│   ├── globals.css          → UPDATE: New design tokens
│   ├── layout.tsx           → UPDATE: Add Lenis provider
│   └── page.tsx             → UPDATE: Section composition
│
├── components/
│   ├── ui/
│   │   ├── GlassPanel.tsx   → NEW: Replace GlassCard
│   │   ├── SynapticButton.tsx → NEW: Replace MagneticButton
│   │   ├── GlowBadge.tsx    → NEW
│   │   ├── MetricCounter.tsx → NEW
│   │   └── index.ts         → UPDATE: Export all
│   │
│   ├── backgrounds/         → NEW FOLDER
│   │   ├── NeuralNodeGraph.tsx → MOVE from Hero
│   │   ├── DataStream.tsx   → NEW
│   │   └── GridOverlay.tsx  → NEW
│   │
│   ├── sections/            → UPDATE all
│   │   ├── Hero.tsx
│   │   ├── ProblemSolution.tsx
│   │   ├── FeaturesShowcase.tsx
│   │   └── ...
│   │
│   └── layout/
│       ├── Navigation.tsx   → UPDATE: Glass nav
│       └── Footer.tsx       → UPDATE: Glass footer
│
├── lib/
│   ├── animations.ts        → UPDATE: Spring presets
│   ├── utils.ts             → Keep
│   └── lenis.ts             → NEW: Lenis config
│
└── styles/
    └── design-tokens.css    → NEW: All tokens in one place
```

### 5.2 Dependencies to Add

```json
{
  "dependencies": {
    "lenis": "^1.1.0",           // Smooth scroll
    "@studio-freight/react-lenis": "^0.0.47",
    "three": "^0.160.0",          // Optional: WebGL backgrounds
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.88.0"
  }
}
```

### 5.3 Lenis Setup

```typescript
// src/lib/lenis.ts
import Lenis from 'lenis';

export const createLenis = () => {
  return new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });
};
```

---

## Phase 6: Implementation Order

### Sprint 1: Foundation (Days 1-2)
- [ ] Update `globals.css` with new design tokens
- [ ] Create `design-tokens.css` for organization
- [ ] Update `animations.ts` with spring presets
- [ ] Set up Lenis smooth scroll
- [ ] Update color usage across existing components

### Sprint 2: Core Components (Days 3-5)
- [ ] Build `GlassPanel.tsx` component
- [ ] Build `SynapticButton.tsx` component
- [ ] Extract `NeuralNodeGraph` to backgrounds/
- [ ] Build `DataStream.tsx` background
- [ ] Build `GlowBadge.tsx` component
- [ ] Build `MetricCounter.tsx` component

### Sprint 3: Section Rebuilds (Days 6-10)
- [ ] Update Hero with new colors and enhancements
- [ ] Rebuild Problem/Solution section
- [ ] Rebuild Features Showcase with tabs
- [ ] Update all demo components
- [ ] Rebuild Social Proof section
- [ ] Rebuild Pricing section
- [ ] Rebuild Final CTA

### Sprint 4: Polish & Performance (Days 11-12)
- [ ] Navigation glass effect
- [ ] Footer update
- [ ] Reduced motion support
- [ ] Performance optimization (lazy loading, code splitting)
- [ ] Lighthouse audit (target: 90+)
- [ ] Mobile responsiveness pass

---

## Accessibility Considerations

1. **Reduced Motion:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

2. **Focus States:**
   - All interactive elements need visible focus rings
   - Use `--neural-teal` for focus color
   - Ring offset for glass backgrounds

3. **Color Contrast:**
   - Text on glass panels: minimum 4.5:1 ratio
   - Use `white/90` for primary text
   - Use `white/60` for secondary text

4. **Screen Readers:**
   - Decorative backgrounds have `aria-hidden="true"`
   - Meaningful animations have descriptions
   - Interactive demos have keyboard navigation

---

## Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Lighthouse Performance | 90+ | TBD |
| First Contentful Paint | < 1.5s | TBD |
| Largest Contentful Paint | < 2.5s | TBD |
| Cumulative Layout Shift | < 0.1 | TBD |
| Total Blocking Time | < 200ms | TBD |

**Optimization Strategies:**
- Lazy load below-fold sections
- Code split demo components
- Use `will-change` sparingly
- Prefer CSS animations over JS where possible
- WebGL fallback to Canvas for neural graph

---

## Testing Checklist

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] iOS Safari
- [ ] Chrome Android
- [ ] Reduced motion mode
- [ ] Screen reader (VoiceOver/NVDA)
- [ ] Keyboard navigation only

---

## Resources

- **Design System Document:** User-provided "Synaptic Glass v2.0"
- **Current Site:** bizbrain-os.com
- **Framer Motion Docs:** https://www.framer.com/motion/
- **Lenis Docs:** https://lenis.studiofreight.com/
- **Tailwind CSS 4 Docs:** https://tailwindcss.com/docs

---

*Document created: 2026-01-03*
*Last updated: 2026-01-03*
