# BizBrain OS - Design System

> **Version:** 1.0.0
> **Design Philosophy:** Dark, clean, intelligent, alive

---

## Design Principles

### 1. Living Intelligence
The interface should feel alive. Subtle animations, real-time updates, and responsive interactions create the sense that the system is always thinking, always processing.

### 2. Clarity Through Darkness
Dark mode isn't just aesthetic—it focuses attention. High contrast text, strategic use of color, and generous whitespace create hierarchy without clutter.

### 3. Progressive Revelation
Don't overwhelm. Show the essential first, reveal complexity on demand. Hover states, expandable sections, and drill-down interactions.

### 4. Purposeful Motion
Every animation has a reason. Entry animations guide attention. Hover states provide feedback. Transitions maintain spatial awareness.

### 5. Technical Credibility
Typography, spacing, and components should feel precise and engineered. Monospace accents, grid alignments, and sharp corners convey technical competence.

---

## Color System

### Core Palette

```css
:root {
  /* Backgrounds */
  --bg-primary: #0a0a0f;      /* Near black - main background */
  --bg-secondary: #12121a;    /* Elevated surfaces */
  --bg-tertiary: #1a1a24;     /* Cards, modals */
  --bg-quaternary: #24242e;   /* Hover states */

  /* Primary Accent: Cyan */
  --primary-50: #ecfeff;
  --primary-100: #cffafe;
  --primary-200: #a5f3fc;
  --primary-300: #67e8f9;
  --primary-400: #22d3ee;
  --primary-500: #06b6d4;     /* Main primary */
  --primary-600: #0891b2;
  --primary-700: #0e7490;
  --primary-800: #155e75;
  --primary-900: #164e63;

  /* Secondary Accent: Emerald */
  --secondary-50: #ecfdf5;
  --secondary-100: #d1fae5;
  --secondary-200: #a7f3d0;
  --secondary-300: #6ee7b7;
  --secondary-400: #34d399;
  --secondary-500: #10b981;   /* Main secondary */
  --secondary-600: #059669;
  --secondary-700: #047857;
  --secondary-800: #065f46;
  --secondary-900: #064e3b;

  /* Tertiary Accent: Amber */
  --tertiary-50: #fffbeb;
  --tertiary-100: #fef3c7;
  --tertiary-200: #fde68a;
  --tertiary-300: #fcd34d;
  --tertiary-400: #fbbf24;
  --tertiary-500: #f59e0b;    /* Main tertiary */
  --tertiary-600: #d97706;
  --tertiary-700: #b45309;
  --tertiary-800: #92400e;
  --tertiary-900: #78350f;

  /* Semantic Colors */
  --success: #10b981;         /* Emerald-500 */
  --warning: #f59e0b;         /* Amber-500 */
  --error: #ef4444;           /* Red-500 */
  --info: #06b6d4;            /* Cyan-500 */

  /* Text Colors */
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;  /* Zinc-400 */
  --text-muted: #71717a;      /* Zinc-500 */
  --text-dim: #52525b;        /* Zinc-600 */

  /* Border Colors */
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.10);
  --border-strong: rgba(255, 255, 255, 0.20);
  --border-accent: var(--primary-500);

  /* Glass/Overlay */
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.08);
  --overlay: rgba(10, 10, 15, 0.80);
}
```

### Gradients

```css
:root {
  /* Primary Gradient: Cyan → Emerald */
  --gradient-primary: linear-gradient(135deg, #06b6d4 0%, #10b981 100%);

  /* Accent Gradient: Emerald → Amber */
  --gradient-warm: linear-gradient(135deg, #10b981 0%, #f59e0b 100%);

  /* Surface Gradient: For cards */
  --gradient-surface: linear-gradient(180deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%);

  /* Radial Glow */
  --glow-primary: radial-gradient(circle at center, rgba(6, 182, 212, 0.15) 0%, transparent 70%);
  --glow-secondary: radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%);

  /* Noise Texture */
  --noise: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
}
```

### Color Usage Guidelines

| Use Case | Color | Token |
|----------|-------|-------|
| Primary CTAs | Cyan-500 | `--primary-500` |
| Secondary CTAs | Emerald-500 | `--secondary-500` |
| Highlights/Accents | Amber-500 | `--tertiary-500` |
| Success states | Emerald-500 | `--success` |
| Error states | Red-500 | `--error` |
| Links | Cyan-400 | `--primary-400` |
| Link hover | Cyan-300 | `--primary-300` |
| Body text | White | `--text-primary` |
| Secondary text | Zinc-400 | `--text-secondary` |
| Captions/labels | Zinc-500 | `--text-muted` |

---

## Typography

### Font Stack

```css
:root {
  --font-heading: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
}
```

### Type Scale

| Name | Size | Line Height | Weight | Use |
|------|------|-------------|--------|-----|
| `display-xl` | 72px / 4.5rem | 1.0 | 700 | Hero headlines |
| `display-lg` | 56px / 3.5rem | 1.1 | 700 | Section headers |
| `display-md` | 40px / 2.5rem | 1.2 | 600 | Subsection headers |
| `heading-lg` | 32px / 2rem | 1.3 | 600 | Card titles |
| `heading-md` | 24px / 1.5rem | 1.4 | 600 | Component headers |
| `heading-sm` | 20px / 1.25rem | 1.4 | 500 | Small headers |
| `body-lg` | 18px / 1.125rem | 1.6 | 400 | Lead paragraphs |
| `body-md` | 16px / 1rem | 1.6 | 400 | Body text |
| `body-sm` | 14px / 0.875rem | 1.5 | 400 | Secondary text |
| `caption` | 12px / 0.75rem | 1.4 | 500 | Labels, captions |
| `mono-md` | 14px / 0.875rem | 1.5 | 400 | Code, terminal |
| `mono-sm` | 12px / 0.75rem | 1.4 | 400 | Small code |

### Typography CSS

```css
.display-xl {
  font-family: var(--font-heading);
  font-size: 4.5rem;
  line-height: 1.0;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.display-lg {
  font-family: var(--font-heading);
  font-size: 3.5rem;
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.body-md {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  font-weight: 400;
}

.mono-md {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.5;
  font-weight: 400;
}

/* Utility: Uppercase tracking */
.label {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  line-height: 1.4;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

---

## Spacing System

### Scale (8px base)

| Token | Value | Use |
|-------|-------|-----|
| `space-0` | 0 | - |
| `space-1` | 4px | Tight gaps |
| `space-2` | 8px | Icon gaps |
| `space-3` | 12px | Small gaps |
| `space-4` | 16px | Default gaps |
| `space-5` | 20px | - |
| `space-6` | 24px | Component padding |
| `space-8` | 32px | Section gaps |
| `space-10` | 40px | - |
| `space-12` | 48px | Large gaps |
| `space-16` | 64px | Section padding |
| `space-20` | 80px | - |
| `space-24` | 96px | Section margins |
| `space-32` | 128px | Hero spacing |

### Container Widths

```css
:root {
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
}
```

---

## Component Library

### Buttons

#### Primary Button
```tsx
<button className="
  px-6 py-3
  bg-gradient-to-r from-primary-500 to-secondary-500
  text-white font-semibold text-sm
  rounded-full
  shadow-[0_0_20px_rgba(6,182,212,0.3)]
  hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]
  hover:scale-[1.02]
  active:scale-[0.98]
  transition-all duration-300
  flex items-center gap-2
">
  Button Text <ArrowRight size={16} />
</button>
```

#### Secondary Button
```tsx
<button className="
  px-6 py-3
  bg-white/5 backdrop-blur-md
  border border-white/10
  text-white font-medium text-sm
  rounded-full
  hover:bg-white/10 hover:border-white/20
  transition-all duration-300
">
  Secondary Action
</button>
```

#### Ghost Button
```tsx
<button className="
  px-4 py-2
  text-text-secondary text-sm font-medium
  hover:text-text-primary
  transition-colors duration-200
">
  Ghost Action
</button>
```

### Cards

#### Glass Card
```tsx
<div className="
  p-6 rounded-2xl
  bg-white/[0.03] backdrop-blur-md
  border border-white/[0.08]
  hover:border-white/20 hover:bg-white/[0.05]
  transition-all duration-500
  group
">
  {/* 3D tilt effect on mouse move */}
  {children}
</div>
```

#### Feature Card
```tsx
<div className="
  p-8 rounded-2xl
  bg-gradient-to-b from-bg-tertiary to-bg-secondary
  border border-border-subtle
  hover:border-primary-500/30
  transition-all duration-300
">
  <div className="p-3 w-fit rounded-xl bg-primary-500/10 border border-primary-500/20 mb-6">
    <Icon className="text-primary-500" size={24} />
  </div>
  <h3 className="heading-md mb-3">{title}</h3>
  <p className="body-md text-text-secondary">{description}</p>
</div>
```

### Inputs

#### Text Input
```tsx
<input className="
  w-full px-4 py-3
  bg-bg-tertiary
  border border-border-default
  rounded-lg
  text-text-primary placeholder:text-text-dim
  focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30
  transition-all duration-200
" />
```

### Badges

#### Status Badge
```tsx
<span className="
  inline-flex items-center gap-1.5
  px-3 py-1
  bg-primary-500/10
  border border-primary-500/20
  rounded-full
  text-primary-400 text-xs font-medium
">
  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
  Active
</span>
```

### Navigation

#### Nav Item
```tsx
<a className="
  text-sm font-medium
  text-text-secondary
  hover:text-text-primary
  transition-colors duration-200
  relative
  after:content-[''] after:absolute after:bottom-0 after:left-0
  after:w-0 after:h-0.5 after:bg-primary-500
  hover:after:w-full after:transition-all after:duration-300
">
  Features
</a>
```

---

## Animation Guidelines

### Timing Functions

```css
:root {
  /* Smooth, natural */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

  /* Bouncy entrance */
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Snappy interaction */
  --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);

  /* Subtle spring */
  --spring: cubic-bezier(0.22, 1, 0.36, 1);
}
```

### Duration Scale

| Token | Duration | Use |
|-------|----------|-----|
| `duration-fast` | 150ms | Hovers, toggles |
| `duration-normal` | 300ms | Standard transitions |
| `duration-slow` | 500ms | Complex animations |
| `duration-slower` | 800ms | Page transitions |
| `duration-slowest` | 1200ms | Hero animations |

### Framer Motion Presets

```tsx
// Fade In Up
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

// Stagger Children
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Scale In
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

// Slide In from Left
export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

// Reveal Text (word by word)
export const revealText = {
  initial: { y: "100%" },
  animate: { y: 0 },
  transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
};
```

### Scroll Animations

```tsx
// Using Framer Motion's useScroll
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"]
});

// Parallax
const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

// Fade on scroll
const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
```

---

## Effects & Treatments

### Glass Effect
```css
.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### Glow Effect
```css
.glow-primary {
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
}

.glow-text {
  text-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
}
```

### Noise Overlay
```css
.noise::before {
  content: '';
  position: fixed;
  inset: 0;
  background: var(--noise);
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
}
```

### Grid Background
```css
.grid-bg {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

### Vignette
```css
.vignette {
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(10, 10, 15, 0.5) 70%,
    rgba(10, 10, 15, 1) 100%
  );
}
```

---

## Responsive Breakpoints

```css
/* Mobile First */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### Usage
```tsx
// Tailwind classes
className="text-2xl md:text-4xl lg:text-6xl"

// Container
className="container mx-auto px-4 md:px-6 lg:px-8"

// Grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

---

## Iconography

### Icon Library
**Lucide React** - Consistent, clean, customizable

### Icon Sizes
| Size | Pixels | Use |
|------|--------|-----|
| `xs` | 12px | Inline with caption |
| `sm` | 16px | Buttons, badges |
| `md` | 20px | Default |
| `lg` | 24px | Feature icons |
| `xl` | 32px | Hero accents |
| `2xl` | 48px | Illustrations |

### Icon Styling
```tsx
<Icon
  size={24}
  className="text-primary-500"
  strokeWidth={1.5}
/>
```

---

## Dark Mode (Default)

This design system is dark-mode first and only. The rationale:
1. Reduces eye strain for extended use
2. Creates focus on content
3. Allows accent colors to pop
4. Matches developer/technical aesthetic
5. Feels "premium" and modern

If light mode is ever needed, swap:
- Background colors to light grays
- Text colors to dark grays
- Reduce glow/shadow intensities
- Increase border contrast

---

## Accessibility Checklist

- [ ] Color contrast ratio ≥ 4.5:1 for body text
- [ ] Color contrast ratio ≥ 3:1 for large text
- [ ] Focus indicators visible on all interactive elements
- [ ] No information conveyed by color alone
- [ ] Animations respect `prefers-reduced-motion`
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Skip to content link available
- [ ] Keyboard navigation works for all interactions
- [ ] ARIA labels where needed

---

*Design System maintained by Tech Integration Labs*
