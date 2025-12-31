# BizBrain OS - Interactive Components Specification

> **Purpose:** Detailed specifications for all interactive components on bizbrain-os.com
> **Philosophy:** The best way to understand a product is to use it.

---

## Overview

The website features **7 major interactive components** that allow visitors to experience BizBrain OS functionality without installing anything. These aren't just demos—they're functional micro-applications.

---

## IC-01: Neural Network Hero

### Purpose
Create immediate visual impact and establish the "living intelligence" brand identity.

### Technical Implementation

```typescript
interface Particle {
  x: number;           // 3D X position
  y: number;           // 3D Y position
  z: number;           // 3D Z position (depth)
  baseSize: number;    // Base particle radius
  pulseSpeed: number;  // Individual pulse rate
  pulseOffset: number; // Pulse phase offset
}

interface NeuralNetworkConfig {
  particleCount: number;        // 140 desktop, 60 mobile
  connectionDistance: number;   // 150px (scaled by perspective)
  rotationSpeed: number;        // Mouse influence multiplier
  sparkProbability: number;     // 0.0005 per frame
  fov: number;                  // 800 (perspective)
}
```

### Behavior Specification

1. **Particle System**
   - Particles distributed in 3D space (x, y, z)
   - Continuous z-axis movement (fly-through effect)
   - Particles wrap around when passing camera
   - Each particle has individual pulse animation

2. **Mouse Interaction**
   - Mouse position tracked relative to center
   - Entire particle field rotates on X and Y axes
   - Smooth dampening (lerp factor: 0.05)
   - No movement if mouse leaves window

3. **Connections**
   - Lines drawn between particles within range
   - Opacity based on distance (closer = brighter)
   - Color: Cyan (`#06b6d4`) with alpha
   - "Thought sparks": Random bright white pulses

4. **Scroll Response**
   - Opacity: 1 → 0 over 800px scroll
   - Scale: 1 → 1.5 over 800px scroll
   - Blur: 0px → 10px over 800px scroll

### Accessibility
- `prefers-reduced-motion`: Static particles, no animation
- Canvas has `role="img"` and descriptive `aria-label`

### Performance Targets
- 60fps on modern devices
- <5% CPU usage at idle
- Graceful degradation on low-power devices

---

## IC-02: Terminal Simulator

### Purpose
Let visitors experience slash commands in a realistic environment.

### Technical Implementation

```typescript
interface TerminalState {
  history: TerminalLine[];
  inputBuffer: string;
  cursorPosition: number;
  isProcessing: boolean;
}

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
  timestamp: Date;
}

interface CommandHandler {
  name: string;
  aliases: string[];
  description: string;
  execute: (args: string[]) => Promise<string>;
}
```

### Commands Available

| Command | Output |
|---------|--------|
| `/help` | List all available commands |
| `/status` | Business dashboard summary |
| `/hours` | Today's timesheet |
| `/hours week` | Last 7 days breakdown |
| `/brief tim` | Client briefing for "Tim" |
| `/brief buildtrack` | Project briefing |
| `/intake` | Demo of intake processing |
| `/find [query]` | Search simulation |
| `/snapshot` | Version control demo |
| `clear` | Clear terminal |

### Command Output Examples

```
> /status

╭──────────────────────────────────────────────╮
│  BIZBRAIN OS STATUS DASHBOARD                │
├──────────────────────────────────────────────┤
│                                              │
│  System Status     ● NOMINAL                 │
│  Active Projects   4                         │
│  Open Todos        12                        │
│  Hours Today       3.5h                      │
│                                              │
│  RECENT ACTIVITY                             │
│  ─────────────────                           │
│  • Processed invoice.pdf          2m ago    │
│  • Updated BuildTrack status      15m ago   │
│  • Generated Tim briefing         1h ago    │
│                                              │
╰──────────────────────────────────────────────╯
```

```
> /hours

╭──────────────────────────────────────────────╮
│  TIMESHEET - Today                           │
├──────────────────────────────────────────────┤
│                                              │
│  09:00-11:30   BuildTrack      2.50h        │
│  13:00-14:15   Client Calls    1.25h        │
│  15:00-16:00   Documentation   1.00h        │
│  ─────────────────────────────────────       │
│  Total Today                   4.75h        │
│                                              │
╰──────────────────────────────────────────────╯
```

### Features

1. **Typing Simulation**
   - Output appears character-by-character
   - Configurable speed (default: 10ms/char)
   - Can be skipped by pressing Enter

2. **Command History**
   - Up/Down arrows navigate history
   - History persists in session
   - Max 50 entries

3. **Tab Completion**
   - Typing `/st` + Tab → `/status`
   - Shows suggestions on partial match

4. **Command Palette**
   - Floating panel showing available commands
   - Appears on `?` key or button click
   - Click to insert command

5. **Copy Output**
   - Button to copy last output
   - Copies plain text (no ANSI)

### Visual Design
- Background: `#0a0a0f`
- Font: JetBrains Mono, 14px
- Prompt: `> ` in cyan
- Text: White
- Errors: Red
- System: Dim gray
- Cursor: Blinking block

### Library Options
- **xterm.js** - Full terminal emulator
- **Custom React** - Lighter, more control

---

## IC-03: Voice Note Processor

### Purpose
Demonstrate the "drop anything, we understand everything" capability.

### User Flow

```
┌─────────────────────────────────────────────────┐
│                                                 │
│    ┌─────────────────────────────────────┐     │
│    │                                     │     │
│    │   Drop a voice note here            │     │
│    │   or click to use a sample          │     │
│    │                                     │     │
│    │        [📁 Use Sample File]         │     │
│    │                                     │     │
│    └─────────────────────────────────────┘     │
│                                                 │
└─────────────────────────────────────────────────┘
                        │
                        ▼ (on drop/click)
┌─────────────────────────────────────────────────┐
│                                                 │
│    ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░  Processing...         │
│                                                 │
│    ● Transcribing audio                        │
│    ● Extracting entities                       │
│    ○ Identifying action items                  │
│    ○ Mapping relationships                     │
│                                                 │
└─────────────────────────────────────────────────┘
                        │
                        ▼ (after ~3 seconds)
┌─────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────┐  │
│  │ 📋 EXTRACTED TODOS                        │  │
│  ├──────────────────────────────────────────┤  │
│  │ ☐ Send proposal to Tim by Friday        │  │
│  │ ☐ Review BuildTrack wireframes          │  │
│  │ ☐ Schedule call with Sarah              │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │ 🎯 DECISIONS MADE                         │  │
│  ├──────────────────────────────────────────┤  │
│  │ • Go with React for the dashboard       │  │
│  │ • Delay Phase 2 until Q2                │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │ 👥 PEOPLE MENTIONED                       │  │
│  ├──────────────────────────────────────────┤  │
│  │ Tim (Client) • Sarah (Partner)          │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │ 📅 DEADLINES                              │  │
│  ├──────────────────────────────────────────┤  │
│  │ Friday, Jan 10 • "Proposal due"         │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│          [🔄 Try Another]  [Learn More →]      │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Technical Implementation

```typescript
interface ProcessingResult {
  todos: Todo[];
  decisions: Decision[];
  people: Person[];
  deadlines: Deadline[];
  raw_transcript?: string;
}

interface Todo {
  text: string;
  priority: 'high' | 'medium' | 'low';
  deadline?: string;
  assignee?: string;
}

interface Person {
  name: string;
  role: string;
  context: string;
}
```

### Sample Files
Pre-baked sample voice notes with known outputs:
1. **Project Kickoff** - Planning meeting notes
2. **Client Call** - Requirement gathering
3. **Daily Standup** - Quick status update

### Animation Sequence
1. File drops → Scale/bounce
2. Progress bar fills (eased)
3. Processing steps animate in sequence
4. Results cards slide in staggered
5. Each card has subtle entrance animation

---

## IC-04: Context Graph

### Purpose
Visualize the relationship web that BizBrain builds automatically.

### Technical Implementation

```typescript
interface GraphNode {
  id: string;
  label: string;
  type: 'project' | 'client' | 'person' | 'concept' | 'file';
  metadata: Record<string, any>;
}

interface GraphEdge {
  source: string;
  target: string;
  type: 'works_on' | 'owns' | 'relates_to' | 'mentions';
  weight: number;
}

interface GraphConfig {
  nodeRadius: number;
  linkDistance: number;
  chargeStrength: number;
  centerForce: number;
}
```

### Node Types & Colors

| Type | Color | Icon |
|------|-------|------|
| Project | Cyan | Folder |
| Client | Emerald | Building |
| Person | Amber | User |
| Concept | Rose | Lightbulb |
| File | Gray | File |

### Interactions

1. **Pan & Zoom**
   - Scroll to zoom
   - Drag background to pan
   - Double-click to reset view

2. **Node Selection**
   - Click node to focus
   - Connected nodes highlight
   - Unconnected nodes dim

3. **Node Hover**
   - Tooltip with details
   - Edge labels appear
   - Glow effect

4. **Search**
   - Text input filters nodes
   - Matching nodes pulse
   - Path highlighting

5. **Expand/Collapse**
   - Click to expand connected
   - Right-click to collapse

### Sample Data

```json
{
  "nodes": [
    { "id": "buildtrack", "label": "BuildTrack", "type": "project" },
    { "id": "tim", "label": "Tim", "type": "client" },
    { "id": "sarah", "label": "Sarah", "type": "person" },
    { "id": "construction", "label": "Construction", "type": "concept" },
    { "id": "proposal.pdf", "label": "proposal.pdf", "type": "file" }
  ],
  "edges": [
    { "source": "tim", "target": "buildtrack", "type": "owns" },
    { "source": "buildtrack", "target": "construction", "type": "relates_to" },
    { "source": "sarah", "target": "buildtrack", "type": "works_on" },
    { "source": "proposal.pdf", "target": "buildtrack", "type": "relates_to" }
  ]
}
```

### Library: react-force-graph-2d or D3.js

---

## IC-05: Folder Explorer

### Purpose
Show the structured organization that BizBrain creates.

### Technical Implementation

```typescript
interface TreeNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
  metadata?: {
    size?: string;
    modified?: string;
    description?: string;
  };
}
```

### Structure to Display

```
Business Brain/
├── _intake-dump/              ← "Drop anything here"
│   ├── _router/
│   └── _digested/
├── Projects/
│   ├── BuildTrack/            ← Click to expand
│   │   ├── _context/
│   │   │   ├── overview.md
│   │   │   ├── requirements.md
│   │   │   └── decisions.md
│   │   ├── _pulse/
│   │   │   └── STATUS.md
│   │   └── docs/
│   └── EDF-Pro/
├── Clients/
│   ├── Tim/
│   │   ├── _context/
│   │   ├── _pulse/
│   │   └── README.md
│   └── Emerald-Beacon/
├── Partners/
├── Vendors/
├── Operations/
│   ├── timesheet-system/
│   └── dev-config-system/
└── Knowledge/
```

### Interactions

1. **Expand/Collapse**
   - Click folder to toggle
   - Smooth animation
   - Indent lines connect

2. **File Preview**
   - Click file to see preview
   - Slides in from right
   - Markdown rendered

3. **Folder Highlights**
   - Special folders highlighted
   - `_intake-dump` glows
   - `_context` has icon

4. **Breadcrumbs**
   - Show current path
   - Click to navigate

### Animation
- Folders expand with spring animation
- Files slide in staggered
- Icons animate on expand

### Library: react-arborist

---

## IC-06: Metrics Dashboard

### Purpose
Show real-time (simulated) system activity.

### Metrics Displayed

| Metric | Starting Value | Animation |
|--------|----------------|-----------|
| Time Saved | 847h | Counts up slowly |
| Files Processed | 12,483 | Increments randomly |
| Automations Run | 3,247 | Increments on action |
| Context Preserved | 2.4GB | Grows slowly |

### Live Chart
- Area chart showing "activity" over time
- Updates every second
- Smooth transitions
- Two data series (different colors)

### Status Indicators
- "LIVE FEED" badge with pulse
- Latency display (fake: 12ms)
- Uptime: 99.99%

### Technical Implementation

```typescript
interface DashboardState {
  timeSaved: number;
  filesProcessed: number;
  automationsRun: number;
  contextSize: number;
  chartData: DataPoint[];
}

// Update logic
useEffect(() => {
  const interval = setInterval(() => {
    setState(prev => ({
      ...prev,
      filesProcessed: prev.filesProcessed + Math.floor(Math.random() * 3),
      chartData: [...prev.chartData.slice(1), generateNewPoint()]
    }));
  }, 1000);
  return () => clearInterval(interval);
}, []);
```

### Library: Recharts

---

## IC-07: Entity Cards

### Purpose
Showcase client/vendor/partner management.

### Card Structure

```
┌─────────────────────────────────────┐
│  CLIENT                      ● Active│
├─────────────────────────────────────┤
│                                     │
│  Tim                                │
│  Disruptors Media                   │
│                                     │
│  ┌─────────┐ ┌─────────┐           │
│  │ $24,500 │ │ 3       │           │
│  │ Revenue │ │ Projects│           │
│  └─────────┘ └─────────┘           │
│                                     │
│  Last Contact: 2 days ago          │
│                                     │
│         [View Details →]            │
│                                     │
└─────────────────────────────────────┘
```

### Card Back (on hover/click)

```
┌─────────────────────────────────────┐
│  ← Back                             │
├─────────────────────────────────────┤
│                                     │
│  RELATIONSHIP CONTEXT               │
│  ─────────────────────              │
│  Key client since 2023. Primary     │
│  contact for BuildTrack project.    │
│  Prefers async communication.       │
│                                     │
│  ACTIVE PROJECTS                    │
│  ─────────────────                  │
│  • BuildTrack (In Progress)        │
│  • Dashboard Redesign (Planned)    │
│                                     │
│  RECENT NOTES                       │
│  ─────────────                      │
│  "Discussed Q2 timeline..."         │
│                                     │
└─────────────────────────────────────┘
```

### Interactions

1. **Flip Animation**
   - 3D flip on click
   - Spring physics
   - Back has different info

2. **Tab Switching**
   - Clients / Partners / Vendors
   - Smooth content transition
   - Active tab indicator

3. **Hover Effects**
   - Scale up slightly
   - Border glow
   - Shadow increase

---

## Shared Behaviors

### Loading States
All interactive components have loading states:
- Skeleton screens (not spinners)
- Subtle pulse animation
- Progressive reveal

### Error States
If something fails:
- Friendly error message
- "Try again" button
- Report issue link

### Mobile Optimization
- Terminal: Touch keyboard, larger text
- Graph: Simplified, tap to select
- Cards: Stack vertically, swipe to flip
- Folder: Collapsible with clear icons

### Analytics Events
Every component tracks:
- `component_viewed` - Entered viewport
- `component_interacted` - First interaction
- `component_completed` - Meaningful completion
- `component_error` - Error occurred

---

## Implementation Priority

| Component | Priority | Complexity | Phase |
|-----------|----------|------------|-------|
| Neural Network Hero | P0 | High | 1 |
| Terminal Simulator | P0 | Medium | 1 |
| Voice Note Processor | P1 | Medium | 2 |
| Folder Explorer | P1 | Low | 2 |
| Context Graph | P2 | High | 3 |
| Metrics Dashboard | P2 | Medium | 3 |
| Entity Cards | P2 | Low | 3 |

---

*Interactive Components Spec maintained by Tech Integration Labs*
