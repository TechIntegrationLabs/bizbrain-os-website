# BizBrain OS Website - Product Requirements Document

> **Version:** 1.0.0
> **Last Updated:** December 31, 2024
> **Status:** Draft for Review

---

## Executive Summary

BizBrain OS is a revolutionary folder-based business intelligence system that transforms how solopreneurs and small teams manage their operations. The bizbrain-os.com website will serve as the primary introduction, demonstration, and conversion vehicle for both the open-source system and the premium course offering.

The website must accomplish three critical objectives:
1. **Educate** - Explain the Business Brain concept in an intuitive, memorable way
2. **Demonstrate** - Showcase capabilities through interactive, hands-on components
3. **Convert** - Drive course enrollments and community growth

---

## Target Audience

### Primary Persona: "The Overwhelmed Operator"
- **Demographics:** Solopreneurs, freelancers, small agency owners (1-10 people)
- **Pain Points:**
  - Drowning in scattered information across dozens of tools
  - Context constantly lost between conversations, projects, clients
  - Spending 70% of time on admin, 30% on actual value creation
  - Tried every productivity tool, none stick
  - AI tools feel disconnected and siloed
- **Goals:**
  - Run a "self-driving" business with minimal overhead
  - Never lose context or forget important details
  - Automate repetitive operational tasks
  - Scale without hiring operations staff
- **Technical Level:** Comfortable with technology, may or may not code

### Secondary Persona: "The Claude Power User"
- **Demographics:** Developers, technical operators already using Claude Code
- **Pain Points:**
  - Using Claude Code but not systematically
  - Custom commands scattered across projects
  - No unified approach to context management
- **Goals:**
  - Level up their Claude Code workflow
  - Build reusable systems across projects
  - Learn advanced patterns and techniques

---

## Core Value Propositions

### 1. The Self-Driving Company
> "Stop playing human router. Your business should organize itself."

Traditional business tools require constant human intervention. BizBrain OS creates an autonomous intelligence layer that routes, processes, and acts on information automatically.

### 2. Total Context Capture
> "Nothing falls through the cracks. Ever."

Every voice note, email, meeting, and document feeds into a living knowledge base. Context is preserved across time, projects, and people.

### 3. Natural Language Operations
> "Run your business with slash commands."

No complex interfaces. Type `/status` for a dashboard. `/brief client-name` for instant context. `/intake` to process new information.

### 4. AI That Actually Understands Your Company
> "Not just an assistant. An operator."

BizBrain OS learns your terminology, relationships, and patterns. It knows that "Tim's project" means BuildTrack, that Q4 means November priorities.

---

## Website Goals & Success Metrics

### Primary Goals
| Goal | Metric | Target |
|------|--------|--------|
| Course Enrollments | Monthly signups | 100+ in first 3 months |
| Email List Growth | Subscribers | 1,000+ in first month |
| Engagement | Avg. time on site | >3 minutes |
| Demo Interactions | Clicks on interactive elements | 60%+ of visitors |

### Secondary Goals
- GitHub stars for open-source components
- Community Discord growth
- Social sharing of interactive demos
- Documentation page views

---

## Site Structure & Information Architecture

```
bizbrain-os.com/
├── / (Homepage - Single Page Application)
│   ├── Hero (3D Neural Network)
│   ├── Problem Statement
│   ├── Solution Overview
│   ├── Interactive Demos
│   ├── Features Grid
│   ├── Use Cases
│   ├── Course Introduction
│   ├── Testimonials
│   ├── Pricing
│   ├── FAQ
│   └── Final CTA
│
├── /course (Course Landing Page)
│   ├── Curriculum Overview
│   ├── Module Breakdowns
│   ├── Instructor Bio
│   ├── Student Results
│   └── Enrollment CTA
│
├── /docs (Documentation - MDX)
│   ├── Getting Started
│   ├── Folder Structure
│   ├── Commands Reference
│   ├── Automation Guide
│   └── API Reference
│
├── /playground (Interactive Sandbox)
│   ├── Terminal Simulator
│   ├── Folder Explorer
│   └── Context Graph
│
└── /blog (Content Marketing)
    └── Articles on business automation
```

---

## Homepage Sections (Detailed)

### Section 1: Hero
**Purpose:** Immediate captivation, establish brand identity, create wonder

**Components:**
- 3D Neural Network canvas animation (mouse-reactive)
- Headline: "Your Business **Brain**"
- Subhead: Typewriter effect showing commands executing
- Scroll indicator

**Interactive Elements:**
- Neural network responds to mouse movement
- Particles form temporary connections on hover
- Parallax scroll effect (fade, scale, blur)

**Technical Notes:**
- Canvas-based for performance
- 60fps animation target
- Mobile: reduced particle count
- Accessibility: prefers-reduced-motion support

---

### Section 2: Problem Statement
**Purpose:** Create emotional resonance, identify with pain

**Content Frame:**
> "Entropy is the Default State"

**Visual Treatment:**
- Split screen or before/after
- Left: Chaos (scattered files, missed deadlines, lost context)
- Right: Order (structured folders, automated flows)

**Interactive Elements:**
- Hover to reveal chaos → order transformation
- Animated icons representing pain points
- Statistics counter (time wasted, context lost)

---

### Section 3: Solution Overview
**Purpose:** Introduce the Business Brain concept simply

**Content:**
- 3-step visual: **Ingest → Process → Act**
- Brief explanation of each phase
- Folder structure visualization

**Interactive Elements:**
- Click through the three phases
- Animated folder tree that expands
- Files "dropping" into intake, emerging processed

---

### Section 4: Interactive Demo Zone (FLAGSHIP)
**Purpose:** Hands-on experience, "aha moment" creation

**Demo 1: Voice Note Processor**
- Drag-and-drop zone
- User drops a "voice note" (we provide sample)
- Watch it process in real-time
- See extracted: todos, decisions, mentions, deadlines
- Output appears in formatted cards

**Demo 2: Terminal Simulator**
- Functional terminal interface
- User can type real commands: `/status`, `/hours`, `/brief`
- Shows realistic output
- Command palette with suggestions
- Celebrates when user completes a command

**Demo 3: Context Graph**
- Interactive knowledge graph visualization
- Nodes: Projects, Clients, People, Concepts
- Click nodes to see connections
- Search to highlight paths
- Zoom, pan, explore

**Demo 4: Entity Browser**
- Mini version of GUI entity management
- Tabs: Clients, Partners, Vendors
- Click to see details
- Shows relationship web

---

### Section 5: Features Grid
**Purpose:** Comprehensive capability overview

**Features (6-8 cards):**
1. **Universal Ingest** - "Drop anything. We understand everything."
2. **Living Context** - "Auto-updating knowledge base."
3. **Slash Commands** - "Natural language operations."
4. **Entity Management** - "Clients, vendors, partners unified."
5. **Timesheet Automation** - "Time tracking without tracking."
6. **Contract Generation** - "Proposals in seconds."
7. **Version Control** - "Snapshot, rollback, restore."
8. **GUI Dashboard** - "Visual operations center."

**Interactive Elements:**
- Hover for expanded descriptions
- Click to see mini-demo or video
- Icons animate on scroll-in

---

### Section 6: Use Cases
**Purpose:** Concrete examples of value delivered

**Case Studies:**
1. **The Agency Owner** - Managing 10 clients, never loses context
2. **The Solopreneur** - One-person business operating like a team
3. **The Builder** - Shipping projects while documenting everything

**Format:**
- Before/After metrics
- Quote from user
- Key features used
- Visual of their setup

---

### Section 7: Course Introduction
**Purpose:** Transition from interest to purchase intent

**Content:**
- "Learn to Build Your Own Business Brain"
- What's included (modules, templates, support)
- Timeline: "Operational in 30 days"
- Instructor credibility

**Interactive Elements:**
- Module accordion with previews
- Video trailer autoplay (muted)
- Curriculum progress visualization

---

### Section 8: Social Proof
**Purpose:** Reduce purchase anxiety

**Elements:**
- Testimonial carousel with photos
- Logo bar of companies using it
- GitHub activity widget
- Discord community member count
- "Building in Public" social feed

---

### Section 9: Pricing
**Purpose:** Clear path to conversion

**Tiers:**
1. **Open Source** (Free)
   - Core system
   - Documentation
   - Community support
   - CTA: "Get Started"

2. **Pro Course** ($297)
   - Video curriculum
   - Template library
   - Private Discord
   - 1:1 onboarding call
   - CTA: "Enroll Now"

3. **Enterprise** (Custom)
   - Custom implementation
   - Team training
   - Dedicated support
   - CTA: "Contact Sales"

**Interactive Elements:**
- Toggle: Monthly/Annual (if applicable)
- Feature comparison matrix
- Hover to highlight differences

---

### Section 10: FAQ
**Purpose:** Address objections, reduce friction

**Questions:**
- "Do I need to code?"
- "What tools does it integrate with?"
- "How long until I'm operational?"
- "Is my data secure?"
- "What if I need help?"

**Format:**
- Accordion with smooth animation
- Search/filter capability
- Related questions linking

---

### Section 11: Final CTA
**Purpose:** Maximum conversion pressure

**Design:**
- Full-screen takeover feel
- Hypnotic background (conic gradient rotation)
- Strong headline: "Awaken Your Business"
- Dual CTAs: Start Free / Enroll in Course
- Urgency element (if applicable)

---

## Interactive Component Specifications

### IC-01: Neural Network Hero
**Library:** Canvas API + custom implementation
**Behavior:**
- 140 particles on desktop, 60 on mobile
- Connection lines between particles within 150px
- Mouse movement rotates entire field
- "Thought sparks" - random white pulses (0.05% per frame)
- Scroll triggers: opacity fade, scale up, blur increase

### IC-02: Terminal Simulator
**Library:** xterm.js or custom implementation
**Commands Supported:**
```
/status - Show business dashboard
/hours - Timesheet summary
/hours week - Last 7 days
/brief [name] - Client/project briefing
/intake - Process demonstration
/find [query] - Search simulation
/help - Show available commands
```
**Features:**
- Command history (up/down arrows)
- Tab completion
- Realistic typing delay on output
- Syntax highlighting
- Copy output button

### IC-03: Context Graph
**Library:** react-force-graph or D3.js
**Nodes:**
- Projects (blue)
- Clients (green)
- People (yellow)
- Concepts (purple... no wait, use amber)
- Files (gray)

**Interactions:**
- Drag to reposition
- Click to focus/expand
- Hover to highlight connections
- Search to filter
- Zoom controls

### IC-04: Folder Explorer
**Library:** react-arborist
**Structure:**
```
Business Brain/
├── _intake-dump/
├── Projects/
│   ├── BuildTrack/
│   └── EDF-Pro/
├── Clients/
├── Partners/
├── Operations/
└── Knowledge/
```
**Features:**
- Expand/collapse with animation
- Click file to see preview
- Drag simulation (demo only)
- Breadcrumb navigation

### IC-05: Voice Note Processor Demo
**Custom Implementation**
**Flow:**
1. User drags file to dropzone (or clicks to use sample)
2. Upload animation (progress bar)
3. "Processing..." with animated dots
4. Card-by-card reveal:
   - Extracted Todos (3-5 items)
   - Decisions Made (2-3 items)
   - People Mentioned (with entity links)
   - Deadlines Found (date chips)
5. "Try another" reset button

### IC-06: Metrics Dashboard
**Library:** Recharts + custom counters
**Metrics:**
- Time Saved (counting up)
- Files Processed (real-time simulation)
- Automations Run (ticker)
- Context Preserved (storage visualization)

**Animations:**
- Number counting with easing
- Chart data updating live
- Pulse effects on change

### IC-07: Entity Cards
**Custom Implementation**
**Card Front:**
- Entity type badge
- Name
- Key metric (revenue, hours, etc.)
- Status indicator

**Card Back (on flip):**
- Full details
- Relationship list
- Recent activity
- Quick actions

---

## Technical Requirements

### Performance Targets
| Metric | Target |
|--------|--------|
| Lighthouse Performance | >90 |
| First Contentful Paint | <1.5s |
| Time to Interactive | <3.0s |
| Cumulative Layout Shift | <0.1 |
| Bundle Size (initial) | <200KB |

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari/Chrome (latest 2 versions)

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation for all interactive elements
- Screen reader announcements for dynamic content
- prefers-reduced-motion support
- High contrast mode support
- Focus indicators on all interactive elements

### SEO Requirements
- Semantic HTML structure
- Meta tags for all pages
- Open Graph / Twitter Cards
- JSON-LD structured data
- Sitemap.xml
- robots.txt
- Core Web Vitals optimization

---

## Content Requirements

### Copy Tone
- **Confident** but not arrogant
- **Technical** but accessible
- **Philosophical** moments balanced with practical
- **Direct** - no fluff, every word earns its place

### Visual Content Needed
- Product screenshots (GUI, terminal)
- Animated GIFs of key flows
- Video: 60-90 second product overview
- Video: Course trailer
- Headshots: Instructor, testimonials
- Diagrams: Architecture, flow charts

### Iconography
- Lucide React (consistent with existing)
- Custom icons for unique concepts if needed
- Animated icons for key moments

---

## Analytics & Tracking

### Events to Track
- Scroll depth (25%, 50%, 75%, 100%)
- Interactive demo engagement (per component)
- Command typed in terminal
- File dropped in processor
- Pricing section views
- CTA clicks
- FAQ expansions
- Video plays / completion

### Conversion Funnels
1. Homepage → Course Page → Checkout
2. Homepage → Docs → GitHub → Email Signup
3. Homepage → Playground → Email Signup

---

## Launch Phases

### Phase 1: MVP (Week 1-2)
- Hero section
- Problem/Solution sections
- Basic features grid
- Terminal demo (simplified)
- Pricing section
- Email capture

### Phase 2: Interactive (Week 3-4)
- Full terminal simulator
- Voice note processor demo
- Context graph visualization
- Folder explorer

### Phase 3: Course (Week 5-6)
- Course landing page
- Curriculum details
- Payment integration
- Student dashboard

### Phase 4: Documentation (Week 7-8)
- Full docs site
- Search functionality
- Code examples
- API reference

---

## Success Criteria

### Launch (30 days post-launch)
- [ ] 500+ email subscribers
- [ ] 50+ course enrollments
- [ ] <3s page load time
- [ ] >85 Lighthouse score
- [ ] 0 critical accessibility issues

### Growth (90 days post-launch)
- [ ] 2,500+ email subscribers
- [ ] 200+ course enrollments
- [ ] 1,000+ GitHub stars
- [ ] 500+ Discord members
- [ ] 3+ viral demo shares

---

## Appendix

### Competitive Analysis
- Motion.dev - Animation excellence, interactive docs
- Linear.app - Clean, dark, performant
- Vercel.com - Developer-focused, impressive demos
- Raycast.com - Command palette UX

### Inspiration Sites
- https://ui.aceternity.com/
- https://www.awwwards.com/
- https://www.framer.com/motion/
- https://lenis.darkroom.engineering/

---

*Document maintained by Tech Integration Labs*
