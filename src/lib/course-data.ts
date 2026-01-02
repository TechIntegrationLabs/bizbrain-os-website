// Course Data Structure
// Complete 7-module Business Brain course

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  type: 'video' | 'reading' | 'interactive' | 'quiz' | 'lab';
  content?: string; // MDX content or video URL
  codeExample?: {
    files: Record<string, string>;
    activeFile?: string;
  };
  quiz?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Module {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  duration: number; // total minutes
  lessons: Lesson[];
}

export interface CourseProgress {
  completedLessons: string[];
  currentLesson: string | null;
  quizScores: Record<string, number>;
  startedAt: string;
  lastAccessedAt: string;
}

// Course Modules Data
export const modules: Module[] = [
  {
    id: 'introduction',
    number: 1,
    title: 'Introduction to Business Brains',
    description: 'Understand the concept, the problem it solves, and how everything connects.',
    icon: 'Brain',
    color: '#06b6d4',
    duration: 45,
    lessons: [
      {
        id: 'what-is-bb',
        title: 'What is a Business Brain?',
        description: 'The concept of a living, breathing knowledge system for your business.',
        duration: 10,
        type: 'video',
        content: `
# What is a Business Brain?

A Business Brain is a **folder-based knowledge system** that:

1. **Ingests raw data** - voice notes, emails, documents
2. **Extracts context** - entities, decisions, todos
3. **Maintains understanding** - living documentation
4. **Enables automation** - slash commands and AI agents

Think of it as giving Claude a permanent memory of your entire business.

## The Core Insight

Every conversation with an AI starts fresh. You waste time rebuilding context.

The Business Brain solves this by:
- Storing context in structured folders
- Using CLAUDE.md files to brief the AI
- Auto-updating as new information arrives

## What You'll Build

By the end of this course, you'll have:
- A complete folder structure
- 25+ slash commands
- MCP integrations
- Automatic time tracking
- Document generation
- And much more...
        `,
      },
      {
        id: 'problem-it-solves',
        title: 'The Problem It Solves',
        description: 'Why traditional project management fails knowledge workers.',
        duration: 12,
        type: 'reading',
        content: `
# The Problem It Solves

## The Context Switching Tax

Every time you switch projects, you pay a tax:
- 23 minutes to regain focus (research)
- 5-10 minutes finding where you left off
- Mental energy rebuilding context

Multiply this by 5-10 switches per day...

## Information Scattered Everywhere

- Client details in email
- Project notes in Notion
- Decisions in Slack
- Files in Google Drive
- Context in your head

The Business Brain **centralizes everything**.

## The Solution

\`\`\`
Drop voice note → Get structured context
Run /brief client → Get complete history
Run /status → See everything at once
\`\`\`

One system. Full context. Instant access.
        `,
      },
      {
        id: 'core-concepts',
        title: 'Core Concepts Overview',
        description: 'The five pillars of the Business Brain system.',
        duration: 15,
        type: 'interactive',
        content: `
# Core Concepts

## 1. The Intake System

Everything enters through \`_intake/\`. Drop any file:
- Voice notes
- PDFs
- Emails
- Screenshots

The system analyzes, extracts, and routes.

## 2. Living Context

\`_context/\` folders contain auto-generated understanding:
- \`overview.md\` - High-level summary
- \`decisions.md\` - Key decisions made
- \`stakeholders.md\` - People involved

These update automatically as you work.

## 3. Entity Management

Three types of business relationships:
- **Clients** - They pay you (revenue)
- **Partners** - Strategic relationships
- **Vendors** - You pay them (expenses)

## 4. Slash Commands

25+ commands for common operations:
- \`/intake\` - Process dropped files
- \`/status\` - Business dashboard
- \`/brief\` - Generate client briefing

## 5. MCP Integrations

Connect external tools:
- Notion for documentation
- GoHighLevel for CRM
- Calendar for scheduling
- And 16 more...
        `,
      },
      {
        id: 'quiz-1',
        title: 'Module 1 Quiz',
        description: 'Test your understanding of Business Brain concepts.',
        duration: 8,
        type: 'quiz',
        quiz: [
          {
            id: 'q1-1',
            question: 'What is the primary purpose of the _intake/ folder?',
            options: [
              'To store completed projects',
              'To receive and process incoming information',
              'To hold client contracts',
              'To backup important files',
            ],
            correctIndex: 1,
            explanation: 'The _intake/ folder is the central nervous system where all incoming information is dropped for processing and routing.',
          },
          {
            id: 'q1-2',
            question: 'Which of these is NOT one of the three entity types?',
            options: ['Clients', 'Partners', 'Employees', 'Vendors'],
            correctIndex: 2,
            explanation: 'The three entity types are Clients (revenue), Partners (strategic), and Vendors (expenses). Employees would be managed differently.',
          },
          {
            id: 'q1-3',
            question: 'What do CLAUDE.md files do?',
            options: [
              'Store encryption keys',
              'Brief the AI about the folder/project context',
              'Log error messages',
              'Track file changes',
            ],
            correctIndex: 1,
            explanation: 'CLAUDE.md files provide context to the AI, explaining what the folder contains and how to work with it.',
          },
        ],
      },
    ],
  },
  {
    id: 'setup',
    number: 2,
    title: 'Setting Up Your Business Brain',
    description: 'Create your folder structure and configure the core system.',
    icon: 'FolderTree',
    color: '#10b981',
    duration: 60,
    lessons: [
      {
        id: 'folder-structure',
        title: 'Folder Structure Deep Dive',
        description: 'Understanding every folder and its purpose.',
        duration: 15,
        type: 'reading',
        content: `
# Folder Structure Deep Dive

## Root Level

\`\`\`
Business Brain/
├── _intake/          # Central data ingestion
├── Projects/         # Active work
├── Clients/          # Revenue sources
├── Partners/         # Strategic relationships
├── Vendors/          # Service providers
├── Operations/       # System infrastructure
├── Knowledge/        # Accumulated wisdom
├── Finance/          # Money tracking
└── Archive/          # Inactive items
\`\`\`

## The _intake/ Folder

\`\`\`
_intake/
├── _router/      # Needs manual routing
├── _digested/    # Processed items
└── [drop files here]
\`\`\`

Drop anything here. The system will:
1. Analyze the content
2. Extract entities, todos, decisions
3. Route to appropriate locations
4. Update relevant context files

## Project Structure

\`\`\`
Projects/
└── [project-name]/
    ├── _project-dump/   # Project-specific intake
    ├── _context/        # Extracted understanding
    ├── _pulse/          # Live status
    ├── CLAUDE.md        # AI context
    └── README.md        # Human overview
\`\`\`
        `,
      },
      {
        id: 'initial-config',
        title: 'Initial Configuration',
        description: 'Setting up CLAUDE.md files and system preferences.',
        duration: 20,
        type: 'interactive',
        codeExample: {
          files: {
            'CLAUDE.md': `# My Business Brain

> This is the operational headquarters for [Your Company].

## Quick Commands

| Command | Description |
|---------|-------------|
| /intake | Process incoming files |
| /status | View business dashboard |
| /brief [client] | Generate client briefing |

## Active Projects

- Project Alpha (Client: Acme Corp)
- Project Beta (Internal)

## Key Contacts

- John Smith - Acme Corp (CEO)
- Jane Doe - Partner at XYZ

## Current Focus

This week: Completing Phase 2 of Project Alpha
`,
            'Operations/CLAUDE.md': `# Operations

System infrastructure and tooling.

## Subsystems

- /dev-config-system - Credentials management
- /timesheet-system - Time tracking
- /context-automation - Intake processing
`,
          },
          activeFile: 'CLAUDE.md',
        },
        duration: 20,
        content: `
# Initial Configuration

## The Root CLAUDE.md

This is the most important file. It tells Claude:
- What this folder system is
- What commands are available
- Current business context
- Key relationships

## Best Practices

1. **Keep it current** - Update weekly
2. **Be specific** - Include names, projects, priorities
3. **Link to details** - Reference other folders
4. **Include commands** - List what's available
        `,
      },
      {
        id: 'external-services',
        title: 'Connecting External Services',
        description: 'Setting up MCP servers and integrations.',
        duration: 18,
        type: 'video',
        content: `
# Connecting External Services

## MCP Configuration

Model Context Protocol (MCP) connects Claude to external tools.

### Setup Location

\`\`\`
~/.config/claude/mcp.json
\`\`\`

### Example Configuration

\`\`\`json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["@anthropic/mcp-notion"],
      "env": {
        "NOTION_TOKEN": "your-token"
      }
    },
    "gohighlevel": {
      "command": "node",
      "args": ["path/to/ghl-mcp/index.js"]
    }
  }
}
\`\`\`

## Available Integrations

| Service | Purpose |
|---------|---------|
| Notion | Documentation, databases |
| GoHighLevel | CRM, contacts |
| Gmail | Email access |
| Calendar | Scheduling |
| Playwright | Browser automation |
| markdown2pdf | PDF generation |
        `,
      },
      {
        id: 'lab-1',
        title: 'Hands-on Lab: Your First Setup',
        description: 'Create your Business Brain folder structure.',
        duration: 20,
        type: 'lab',
        content: `
# Lab: Your First Setup

## Objective

Create the foundational folder structure for your Business Brain.

## Steps

### 1. Create Root Folder

\`\`\`bash
mkdir "My Business Brain"
cd "My Business Brain"
\`\`\`

### 2. Create Core Folders

\`\`\`bash
mkdir _intake Projects Clients Partners Vendors
mkdir Operations Knowledge Finance Archive
\`\`\`

### 3. Create Your CLAUDE.md

Create a file called \`CLAUDE.md\` in the root with:
- Your business name
- Current projects
- Key contacts
- Available commands (we'll add these later)

### 4. Initialize Git

\`\`\`bash
git init
git add .
git commit -m "Initial Business Brain setup"
\`\`\`

## Verification

Run \`ls -la\` and confirm you see all folders.

## Next Steps

In the next lesson, we'll configure the intake system.
        `,
      },
    ],
  },
  {
    id: 'intake-system',
    number: 3,
    title: 'The Intake System',
    description: 'Master voice notes, context extraction, and intelligent routing.',
    icon: 'Inbox',
    color: '#f59e0b',
    duration: 55,
    lessons: [
      {
        id: 'voice-notes',
        title: 'Voice Notes & Transcripts',
        description: 'Turning spoken thoughts into structured data.',
        duration: 12,
        type: 'video',
      },
      {
        id: 'context-extraction',
        title: 'Context Extraction',
        description: 'How the system identifies entities, todos, and decisions.',
        duration: 15,
        type: 'interactive',
      },
      {
        id: 'routing-rules',
        title: 'Routing Rules',
        description: 'Configuring where different types of content go.',
        duration: 12,
        type: 'reading',
      },
      {
        id: 'custom-processors',
        title: 'Building Custom Processors',
        description: 'Creating your own intake processing rules.',
        duration: 18,
        type: 'lab',
      },
    ],
  },
  {
    id: 'entity-management',
    number: 4,
    title: 'Entity Management',
    description: 'Organize clients, partners, and vendors with full context.',
    icon: 'Users',
    color: '#8b5cf6',
    duration: 50,
    lessons: [
      {
        id: 'entity-types',
        title: 'Clients, Partners, Vendors',
        description: 'Understanding the three entity types and their differences.',
        duration: 10,
        type: 'reading',
      },
      {
        id: 'cross-references',
        title: 'Cross-References',
        description: 'Linking entities to projects, finances, and context.',
        duration: 15,
        type: 'interactive',
      },
      {
        id: 'entity-automation',
        title: 'Entity Automation',
        description: 'Auto-updating entity context from conversations.',
        duration: 15,
        type: 'video',
      },
      {
        id: 'lab-2',
        title: 'Hands-on Lab: Entity Setup',
        description: 'Create your first client, partner, and vendor.',
        duration: 18,
        type: 'lab',
      },
    ],
  },
  {
    id: 'commands-agents',
    number: 5,
    title: 'Slash Commands & Subagents',
    description: 'Build powerful automation with custom commands and AI agents.',
    icon: 'Terminal',
    color: '#ec4899',
    duration: 65,
    lessons: [
      {
        id: 'builtin-commands',
        title: 'Built-in Commands',
        description: 'Mastering the 25+ commands that come with the system.',
        duration: 15,
        type: 'interactive',
      },
      {
        id: 'custom-commands',
        title: 'Creating Custom Commands',
        description: 'Building your own slash commands for repetitive tasks.',
        duration: 18,
        type: 'lab',
      },
      {
        id: 'subagent-architecture',
        title: 'Subagent Architecture',
        description: 'Understanding how specialized AI agents work.',
        duration: 12,
        type: 'video',
      },
      {
        id: 'building-subagents',
        title: 'Building Your First Subagent',
        description: 'Create a custom agent for your workflow.',
        duration: 22,
        type: 'lab',
      },
    ],
  },
  {
    id: 'mcp-integration',
    number: 6,
    title: 'MCP Integration',
    description: 'Connect to external services with Model Context Protocol.',
    icon: 'Server',
    color: '#a855f7',
    duration: 55,
    lessons: [
      {
        id: 'understanding-mcp',
        title: 'Understanding MCP',
        description: 'What MCP is and how it enables tool integration.',
        duration: 10,
        type: 'reading',
      },
      {
        id: 'available-servers',
        title: 'Available Servers',
        description: 'Tour of the 19 MCP servers included with the system.',
        duration: 15,
        type: 'interactive',
      },
      {
        id: 'configuring-mcps',
        title: 'Configuring MCPs',
        description: 'Setting up and customizing MCP servers.',
        duration: 15,
        type: 'video',
      },
      {
        id: 'custom-mcp-tools',
        title: 'Building Custom MCP Tools',
        description: 'Create your own MCP server for custom integrations.',
        duration: 20,
        type: 'lab',
      },
    ],
  },
  {
    id: 'advanced-workflows',
    number: 7,
    title: 'Advanced Workflows',
    description: 'Content factory, contracts, multi-project management, and more.',
    icon: 'Workflow',
    color: '#14b8a6',
    duration: 70,
    lessons: [
      {
        id: 'content-factory',
        title: 'Content Factory',
        description: 'Auto-generate tutorials and content from your work.',
        duration: 18,
        type: 'interactive',
      },
      {
        id: 'contract-generation',
        title: 'Contract Generation',
        description: 'Using templates for MSAs, SOWs, and NDAs.',
        duration: 15,
        type: 'video',
      },
      {
        id: 'multi-project',
        title: 'Multi-Project Management',
        description: 'Handling multiple active projects without context loss.',
        duration: 15,
        type: 'reading',
      },
      {
        id: 'team-collaboration',
        title: 'Team Collaboration',
        description: 'Sharing your Business Brain with team members.',
        duration: 12,
        type: 'video',
      },
      {
        id: 'final-project',
        title: 'Final Project',
        description: 'Build a complete workflow for your business.',
        duration: 25,
        type: 'lab',
      },
    ],
  },
];

// Helper functions
export function getModule(moduleId: string): Module | undefined {
  return modules.find(m => m.id === moduleId);
}

export function getLesson(moduleId: string, lessonId: string): Lesson | undefined {
  const module = getModule(moduleId);
  return module?.lessons.find(l => l.id === lessonId);
}

export function getNextLesson(moduleId: string, lessonId: string): { moduleId: string; lessonId: string } | null {
  const module = getModule(moduleId);
  if (!module) return null;

  const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);

  // Next lesson in same module
  if (lessonIndex < module.lessons.length - 1) {
    return { moduleId, lessonId: module.lessons[lessonIndex + 1].id };
  }

  // First lesson of next module
  const moduleIndex = modules.findIndex(m => m.id === moduleId);
  if (moduleIndex < modules.length - 1) {
    const nextModule = modules[moduleIndex + 1];
    return { moduleId: nextModule.id, lessonId: nextModule.lessons[0].id };
  }

  return null;
}

export function getPreviousLesson(moduleId: string, lessonId: string): { moduleId: string; lessonId: string } | null {
  const module = getModule(moduleId);
  if (!module) return null;

  const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);

  // Previous lesson in same module
  if (lessonIndex > 0) {
    return { moduleId, lessonId: module.lessons[lessonIndex - 1].id };
  }

  // Last lesson of previous module
  const moduleIndex = modules.findIndex(m => m.id === moduleId);
  if (moduleIndex > 0) {
    const prevModule = modules[moduleIndex - 1];
    return { moduleId: prevModule.id, lessonId: prevModule.lessons[prevModule.lessons.length - 1].id };
  }

  return null;
}

export function calculateProgress(completedLessons: string[]): number {
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  return Math.round((completedLessons.length / totalLessons) * 100);
}

export function getTotalDuration(): number {
  return modules.reduce((sum, m) => sum + m.duration, 0);
}

export function getTotalLessons(): number {
  return modules.reduce((sum, m) => sum + m.lessons.length, 0);
}
