# BizBrain OS Website - Technology Stack

> **Version:** 1.0.0
> **Philosophy:** Modern, performant, developer-friendly

---

## Framework & Build

### Core Framework
```
Next.js 15.x (App Router)
├── React 19.x
├── TypeScript 5.x
└── Node.js 20.x LTS
```

**Why Next.js 15?**
- App Router for modern patterns
- Server Components for performance
- Built-in image optimization
- Edge runtime support
- Excellent DX with fast refresh

### Package Manager
```bash
pnpm 9.x  # Fast, disk-efficient
```

### Build Tool
```
Turbopack (via Next.js)
├── Faster than Webpack
├── Incremental builds
└── HMR in milliseconds
```

---

## Styling

### Primary: Tailwind CSS 4.x
```bash
pnpm add tailwindcss@next postcss autoprefixer
```

**Configuration:**
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#12121a',
        'surface-2': '#1a1a24',
        primary: {
          DEFAULT: '#06b6d4',
          50: '#ecfeff',
          // ... full scale
        },
        secondary: {
          DEFAULT: '#10b981',
          // ... full scale
        },
        tertiary: {
          DEFAULT: '#f59e0b',
          // ... full scale
        },
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)'],
        body: ['var(--font-inter)'],
        mono: ['var(--font-jetbrains)'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 10s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}
```

### CSS Variables
```css
/* globals.css */
@layer base {
  :root {
    --background: 10 10 15;
    --foreground: 255 255 255;
    --primary: 6 182 212;
    --secondary: 16 185 129;
    --tertiary: 245 158 11;
    /* ... */
  }
}
```

### Class Variance Authority (CVA)
```bash
pnpm add class-variance-authority
```

For component variants without bloat.

---

## Animation Libraries

### Primary: Framer Motion 11.x
```bash
pnpm add framer-motion
```

**Use Cases:**
- Page transitions
- Scroll-triggered animations
- Layout animations
- Gesture handling
- Exit animations

### Smooth Scroll: Lenis
```bash
pnpm add lenis
```

**Configuration:**
```typescript
// lib/lenis.ts
import Lenis from 'lenis';

export const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

### Complex Timelines: GSAP (Optional)
```bash
pnpm add gsap
```

Only if needed for complex sequenced animations.

---

## UI Primitives

### Radix UI
```bash
pnpm add @radix-ui/react-dialog \
         @radix-ui/react-dropdown-menu \
         @radix-ui/react-tabs \
         @radix-ui/react-accordion \
         @radix-ui/react-tooltip \
         @radix-ui/react-scroll-area
```

**Why Radix?**
- Unstyled, accessible primitives
- Full keyboard navigation
- WAI-ARIA compliant
- Composable

### Headless UI (Alternative)
```bash
pnpm add @headlessui/react
```

For simpler components.

---

## Data Visualization

### Charts: Recharts
```bash
pnpm add recharts
```

**Use Cases:**
- Dashboard metrics
- Area/Line charts
- Bar charts
- Responsive containers

### Force Graph: react-force-graph
```bash
pnpm add react-force-graph-2d
```

**Use Cases:**
- Context graph visualization
- Entity relationships
- Knowledge map

### Alternative: D3.js
```bash
pnpm add d3
```

For custom, complex visualizations.

---

## Interactive Components

### Terminal: xterm.js
```bash
pnpm add xterm @xterm/addon-fit
```

**Alternative:** Custom React implementation (lighter)

### Tree View: react-arborist
```bash
pnpm add react-arborist
```

**Use Cases:**
- Folder explorer
- File browser
- Hierarchical navigation

### Drag & Drop: dnd-kit
```bash
pnpm add @dnd-kit/core @dnd-kit/sortable
```

**Use Cases:**
- Voice note drop zone
- Reorderable lists

---

## 3D & Canvas

### Three.js (if needed)
```bash
pnpm add three @react-three/fiber @react-three/drei
```

**Note:** The neural network hero uses raw Canvas API for performance.
Three.js is optional for more complex 3D needs.

### Canvas Utilities
```typescript
// Custom canvas particle system
// No external dependencies for hero
// See: components/hero/NeuralNetwork.tsx
```

---

## Content & Documentation

### MDX Support
```bash
pnpm add @next/mdx @mdx-js/loader @mdx-js/react
pnpm add rehype-highlight rehype-slug rehype-autolink-headings
pnpm add remark-gfm
```

**Configuration:**
```javascript
// next.config.mjs
import createMDX from '@next/mdx';

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings],
  },
});

export default withMDX(nextConfig);
```

### Syntax Highlighting: Shiki
```bash
pnpm add shiki
```

Beautiful code blocks without client JS.

---

## Icons

### Lucide React
```bash
pnpm add lucide-react
```

**Why Lucide?**
- Consistent with existing codebase
- Tree-shakeable
- Customizable stroke width
- 1,400+ icons

---

## Forms & Validation

### React Hook Form
```bash
pnpm add react-hook-form
```

### Zod
```bash
pnpm add zod @hookform/resolvers
```

**Usage:**
```typescript
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

---

## State Management

### Zustand (if needed)
```bash
pnpm add zustand
```

For global state (user preferences, demo state).

### React Context
For simpler scoped state (theme, modals).

---

## API & Backend

### API Routes
Next.js App Router API routes for:
- Contact form submission
- Email list signup
- Analytics events

### Email: Resend
```bash
pnpm add resend
```

For transactional emails.

### Payment: Stripe (for course)
```bash
pnpm add stripe @stripe/stripe-js
```

---

## Analytics & Monitoring

### Vercel Analytics
```bash
pnpm add @vercel/analytics @vercel/speed-insights
```

### PostHog (Optional)
```bash
pnpm add posthog-js
```

For detailed event tracking and funnels.

---

## Testing

### Vitest
```bash
pnpm add -D vitest @vitejs/plugin-react
```

### React Testing Library
```bash
pnpm add -D @testing-library/react @testing-library/jest-dom
```

### Playwright (E2E)
```bash
pnpm add -D @playwright/test
```

---

## Development Tools

### ESLint
```bash
pnpm add -D eslint eslint-config-next @typescript-eslint/parser
```

### Prettier
```bash
pnpm add -D prettier prettier-plugin-tailwindcss
```

### Husky + lint-staged
```bash
pnpm add -D husky lint-staged
```

---

## Project Structure

```
bizbrain-website/
├── public/
│   ├── fonts/
│   ├── images/
│   └── videos/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── page.tsx          # Homepage
│   │   │   ├── course/
│   │   │   └── pricing/
│   │   ├── docs/
│   │   │   └── [...slug]/
│   │   ├── playground/
│   │   ├── api/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                   # Primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── sections/             # Page sections
│   │   │   ├── hero.tsx
│   │   │   ├── features.tsx
│   │   │   └── ...
│   │   ├── interactive/          # Demo components
│   │   │   ├── terminal.tsx
│   │   │   ├── voice-processor.tsx
│   │   │   ├── context-graph.tsx
│   │   │   ├── folder-explorer.tsx
│   │   │   └── ...
│   │   └── layout/
│   │       ├── header.tsx
│   │       ├── footer.tsx
│   │       └── nav.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── animations.ts
│   │   ├── lenis.ts
│   │   └── analytics.ts
│   ├── hooks/
│   │   ├── use-scroll-progress.ts
│   │   ├── use-intersection.ts
│   │   └── use-media-query.ts
│   ├── styles/
│   │   └── fonts.ts
│   ├── content/
│   │   └── docs/                 # MDX files
│   └── types/
│       └── index.ts
├── .env.local
├── .env.example
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Environment Variables

```bash
# .env.example

# Site
NEXT_PUBLIC_SITE_URL=https://bizbrain-os.com

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# Email
RESEND_API_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Optional: CMS
NOTION_API_KEY=
```

---

## Deployment

### Platform: Vercel
- Automatic deploys from GitHub
- Preview deployments for PRs
- Edge runtime for API routes
- Built-in analytics

### Domain
- Primary: bizbrain-os.com
- Redirects: www → non-www

### CDN
- Vercel Edge Network
- Image optimization built-in

---

## Performance Budget

| Metric | Budget |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |
| Total Blocking Time | < 300ms |
| Bundle Size (JS) | < 200KB initial |
| Lighthouse Score | > 90 |

---

## Installation Script

```bash
# Create project
pnpm create next-app@latest bizbrain-website --typescript --tailwind --eslint --app --src-dir

cd bizbrain-website

# Core dependencies
pnpm add framer-motion lenis lucide-react \
         @radix-ui/react-dialog @radix-ui/react-tabs \
         @radix-ui/react-accordion @radix-ui/react-tooltip \
         class-variance-authority clsx tailwind-merge \
         recharts react-force-graph-2d react-arborist \
         @dnd-kit/core react-hook-form zod @hookform/resolvers \
         resend

# Dev dependencies
pnpm add -D @next/mdx @mdx-js/loader @mdx-js/react \
           rehype-highlight rehype-slug remark-gfm \
           tailwindcss-animate @tailwindcss/typography \
           prettier prettier-plugin-tailwindcss \
           vitest @testing-library/react

# Optional
pnpm add stripe @stripe/stripe-js posthog-js zustand xterm
```

---

*Tech Stack maintained by Tech Integration Labs*
