# BizBrain OS Website - Claude Code Context

> AI context for developing bizbrain-os.com

---

## Project Summary

Marketing website for BizBrain OS - introducing the Business Brain concept and selling the course. Modern, highly interactive, dark-mode first design.

**Critical Design Rule:** NO PURPLE. The primary accent is Cyan (#06b6d4).

---

## Quick Reference

### Color Palette
```
Background: #0a0a0f
Surface: #13131f
Primary/Cyan: #06b6d4
Secondary/Emerald: #10b981
Accent/Amber: #f59e0b
```

### Tech Stack
- Next.js 15 (App Router)
- React 19 + TypeScript 5
- Tailwind CSS 4
- Framer Motion 11
- Lenis (smooth scroll)
- Radix UI (primitives)

---

## Key Components to Build

### Must-Have from V2 Mockup:
1. **Neural Network Hero** (`Hero.tsx`)
   - 3D canvas particle system
   - Mouse-reactive rotation
   - Parallax scroll effects
   - Keep the exact implementation, just change violet to cyan

2. **GlassCard** - 3D tilt on hover
3. **MagneticButton** - Cursor-following spring physics

### Interactive Demos:
- Terminal Simulator (IC-02)
- Voice Note Processor (IC-03)
- Context Graph (IC-04)
- Folder Explorer (IC-05)
- Metrics Dashboard (IC-06)
- Entity Cards (IC-07)

---

## File Locations

### Documentation
```
/docs/PRD.md                    - Full requirements
/docs/DESIGN-SYSTEM.md          - Colors, typography, components
/docs/INTERACTIVE-COMPONENTS.md - Component specs
/docs/TECH-STACK.md             - Dependencies, structure
/docs/ANIMATION-GUIDE.md        - Animation patterns
/docs/CONTENT-OUTLINE.md        - All copy/content
```

### Reference Source (Gemini Mockups)
```
~/Downloads/bizbrain-os-v2-extracted/
├── components/sections/Hero.tsx      ← CRITICAL - Keep this hero
├── components/ui/GlassCard.tsx       ← 3D tilt effect
├── components/ui/MagneticButton.tsx  ← Magnetic button
└── App.tsx                           ← Structure reference
```

---

## Development Guidelines

### When Building Components:
1. Reference the DESIGN-SYSTEM.md for colors/spacing
2. Check ANIMATION-GUIDE.md for timing/easing
3. Follow component specs in INTERACTIVE-COMPONENTS.md
4. Use content from CONTENT-OUTLINE.md

### Animation Priorities:
- 60fps always
- GPU-accelerated transforms only
- Honor `prefers-reduced-motion`
- Use spring physics for UI feedback

### Code Style:
- Functional components with hooks
- Framer Motion for all animations
- Tailwind for styling (no CSS-in-JS)
- TypeScript strict mode

---

## Commands Available

When working on this project:
- Reference `/docs/` folder for all specifications
- Use Framer Motion patterns from ANIMATION-GUIDE.md
- Check V2 source files for implementation examples

---

## Important Notes

1. **Hero is sacred** - User explicitly loves the V2 hero. Keep the neural network particle system, just change colors.

2. **Interactive over static** - Site should feel alive. Every demo should be functional (simulated).

3. **Performance matters** - 90+ Lighthouse score target. Lazy load heavy components.

4. **Copy is done** - All content is in CONTENT-OUTLINE.md. Don't improvise.

---

*Context file for BizBrain OS Website development*
