# BizBrain OS Website

> The official marketing website for BizBrain OS - introducing the Business Brain concept and selling the course.

---

## Project Overview

**URL:** bizbrain-os.com
**Status:** Documentation Complete, Ready for Development
**Tech Stack:** Next.js 15 + React 19 + TypeScript + Tailwind CSS 4 + Framer Motion

---

## Quick Links

| Document | Description |
|----------|-------------|
| [PRD.md](./docs/PRD.md) | Product Requirements - goals, personas, sections, components |
| [DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md) | Colors, typography, components, effects |
| [INTERACTIVE-COMPONENTS.md](./docs/INTERACTIVE-COMPONENTS.md) | 7 interactive demo component specs |
| [TECH-STACK.md](./docs/TECH-STACK.md) | Dependencies, structure, installation |
| [ANIMATION-GUIDE.md](./docs/ANIMATION-GUIDE.md) | Timing, easing, component animations |
| [CONTENT-OUTLINE.md](./docs/CONTENT-OUTLINE.md) | All copy and content blocks |

---

## Design Inspirations

Two Gemini AI Studio mockups were analyzed and merged:

### V1 Contributions:
- Boot sequence animation concept
- Section structure (Problem → Solution → Features → Pricing)
- Pricing tier approach

### V2 Contributions (Primary):
- **3D Neural Network Hero** - Canvas particle system with mouse interaction
- **GlassCard** - 3D tilt effect on hover
- **MagneticButton** - Cursor-following button
- Glass morphism aesthetic
- Color palette base (adapted - NO PURPLE)

---

## Color Palette

**Critical:** NO PURPLE anywhere in the design.

| Role | Color | Hex |
|------|-------|-----|
| Background | Deep Space | `#0a0a0f` |
| Surface | Charcoal | `#13131f` |
| Primary | Cyan | `#06b6d4` |
| Secondary | Emerald | `#10b981` |
| Accent | Amber | `#f59e0b` |
| Text | White | `#ffffff` |
| Muted | Gray | `#6b7280` |

---

## Site Sections (11 Total)

1. **Hero** - 3D neural network + headline + typewriter terminal
2. **The Problem** - 3 pain point cards
3. **What Is a Business Brain?** - Definition + animated diagram
4. **Voice to Context Demo** - Interactive voice processor
5. **Features Grid** - 6 feature cards with commands
6. **Terminal Demo** - Interactive command simulator
7. **Folder Explorer** - Interactive file tree
8. **Context Graph** - Force-directed knowledge graph
9. **Use Cases / Social Proof** - Testimonials + metrics
10. **Course Section** - Module breakdown + pricing
11. **Final CTA** - Conversion-focused close

---

## Interactive Components (7 Total)

| ID | Component | Complexity |
|----|-----------|------------|
| IC-01 | Neural Network Hero | High |
| IC-02 | Terminal Simulator | Medium |
| IC-03 | Voice Note Processor | High |
| IC-04 | Context Graph | High |
| IC-05 | Folder Explorer | Medium |
| IC-06 | Metrics Dashboard | Medium |
| IC-07 | Entity Cards | Low |

---

## Key Features

### Hero Animation
- 140 particles with 3D depth
- Mouse-reactive rotation
- Cyan connections with "thought spark" pulses
- Parallax fade on scroll

### Interactive Demos
- **Voice Processor:** Simulated recording → extraction → context display
- **Terminal:** Type commands, see formatted output
- **Folder Explorer:** Click to expand, hover for tooltips
- **Context Graph:** Click nodes to explore relationships

### Animations
- Staggered section reveals on scroll
- Smooth Lenis scrolling
- Spring-based micro-interactions
- 60fps performance target

---

## Development Phases

### Phase 1: Foundation (Week 1)
- [ ] Project setup (Next.js, Tailwind, Framer Motion)
- [ ] Design system implementation
- [ ] Layout components
- [ ] Hero section with neural network

### Phase 2: Sections (Week 2)
- [ ] Problem section
- [ ] Business Brain explanation
- [ ] Features grid
- [ ] Use cases section

### Phase 3: Interactive Components (Week 3-4)
- [ ] Terminal simulator
- [ ] Folder explorer
- [ ] Voice note processor
- [ ] Context graph

### Phase 4: Course & Conversion (Week 5)
- [ ] Course section
- [ ] Pricing component
- [ ] Final CTA
- [ ] Forms and payment integration

### Phase 5: Polish (Week 6)
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] SEO implementation
- [ ] Analytics setup
- [ ] Launch preparation

---

## Getting Started

```bash
# Clone and install
git clone [repo-url]
cd bizbrain-website
npm install

# Development
npm run dev

# Build
npm run build

# Lint
npm run lint
```

---

## Source Files

Reference implementations from Gemini mockups:

| File | Location |
|------|----------|
| V1 Main | `~/Downloads/bizbrain-os-extracted/index.tsx` |
| V2 Hero | `~/Downloads/bizbrain-os-v2-extracted/components/sections/Hero.tsx` |
| V2 GlassCard | `~/Downloads/bizbrain-os-v2-extracted/components/ui/GlassCard.tsx` |
| V2 MagneticButton | `~/Downloads/bizbrain-os-v2-extracted/components/ui/MagneticButton.tsx` |

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 90+ |
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |
| Bundle Size (initial) | < 150kb gzipped |
| Animation FPS | 60fps |

---

## Notes

- All interactive demos are simulated (no real backend integration)
- Voice processor uses pre-built scenarios (no actual speech recognition)
- Terminal commands have pre-defined outputs
- Course payment will integrate with Stripe

---

*Last Updated: December 2024*
