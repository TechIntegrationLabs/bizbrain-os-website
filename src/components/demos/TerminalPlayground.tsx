'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  ChevronRight,
  Clock,
  Zap,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { spring } from '@/lib/animations';

// Full command database with 25+ commands
const commandDatabase: Record<string, { output: string[]; description: string; category: string }> = {
  '/status': {
    description: 'View business-wide status dashboard',
    category: 'Core',
    output: [
      '> Generating business-wide status...',
      '',
      '╔══════════════════════════════════════════════════════════╗',
      '║                    BUSINESS PULSE                        ║',
      '╠══════════════════════════════════════════════════════════╣',
      '║  Active Projects: 5         Open Tasks: 23               ║',
      '║  Healthy: 4 │ At Risk: 1    Due This Week: 7             ║',
      '║                             Overdue: 2 ⚠️                 ║',
      '╠══════════════════════════════════════════════════════════╣',
      '║                                                          ║',
      '║  BuildTrack      ████████████████░░░░ 80%  Active       ║',
      '║  Perdia v5       ████████████████████ 95%  Active       ║',
      '║  EDF-Pro         ████░░░░░░░░░░░░░░░░ 20%  Planning     ║',
      '║  ContentForge    ██████████████░░░░░░ 70%  Active       ║',
      '║  BB1-Website     ████████████░░░░░░░░ 60%  In Review    ║',
      '║                                                          ║',
      '╠══════════════════════════════════════════════════════════╣',
      '║  Revenue MTD: $23,500    Pipeline: $45,000               ║',
      '║  Hours Logged: 127       Billable: 89%                   ║',
      '╚══════════════════════════════════════════════════════════╝',
    ],
  },
  '/find': {
    description: 'Search across all projects and entities',
    category: 'Core',
    output: [
      'Usage: /find <query>',
      '',
      'Examples:',
      '  /find invoice overdue',
      '  /find client preferences',
      '  /find BuildTrack deadlines',
      '  /find @sarah tasks',
      '',
      'Tip: Use quotes for exact phrases: /find "meeting notes"',
    ],
  },
  '/find invoice overdue': {
    description: 'Find overdue invoices',
    category: 'Core',
    output: [
      '> Searching across all entities...',
      '',
      'Found 3 results:',
      '',
      '┌─────────────────────────────────────────────────────────┐',
      '│ 1. GetEducated     Invoice #1234    $2,500   30d overdue│',
      '│ 2. BuildTrack      Invoice #1189    $5,000    7d overdue│',
      '│ 3. Archive/Old     Invoice #0987      $800   PAID ✓     │',
      '└─────────────────────────────────────────────────────────┘',
      '',
      'Actions: /remind <id>, /invoice-followup <id>',
    ],
  },
  '/find client preferences': {
    description: 'Find client preferences',
    category: 'Core',
    output: [
      '> Searching client context files...',
      '',
      'Client preferences found:',
      '',
      '→ BuildTrack (Tim):',
      '  • Communication: Slack preferred, email for documents',
      '  • Meetings: Tuesdays/Thursdays 2-5pm EST',
      '  • Style: Detailed specs, no surprises',
      '',
      '→ GetEducated:',
      '  • Communication: Email only, CC project manager',
      '  • Meetings: Async preferred, Loom videos',
      '  • Style: High-level summaries, quick turnaround',
      '',
      '→ Emerald Beacon:',
      '  • Communication: Mix of Slack and email',
      '  • Meetings: Weekly sync Fridays 10am',
      '  • Style: Technical details welcome',
    ],
  },
  '/brief': {
    description: 'Generate comprehensive briefing on client/project',
    category: 'Core',
    output: [
      'Usage: /brief <project|client>',
      '',
      'Examples:',
      '  /brief BuildTrack',
      '  /brief GetEducated',
      '  /brief EDF-Pro',
      '',
      'This generates a comprehensive briefing including:',
      '• Project status and timeline',
      '• Recent activity and decisions',
      '• Open tasks and blockers',
      '• Key contacts and preferences',
      '• Budget and financial status',
    ],
  },
  '/brief BuildTrack': {
    description: 'Briefing for BuildTrack project',
    category: 'Core',
    output: [
      '> Generating comprehensive briefing...',
      '',
      '══════════════════════════════════════════════════════',
      '                 BUILDTRACK BRIEFING                  ',
      '══════════════════════════════════════════════════════',
      '',
      'Client: Tim (via Disruptors Media)',
      'Project: Construction Operating System',
      'Status: Active Development',
      'Progress: 80% complete',
      '',
      '┌─ BUDGET ────────────────────────────────────────────┐',
      '│ Total: $15,000    Spent: $12,000    Remaining: $3K  │',
      '│ Hours: 120 logged │ Rate: $100/hr                   │',
      '└─────────────────────────────────────────────────────┘',
      '',
      '┌─ RECENT ACTIVITY (7 days) ──────────────────────────┐',
      '│ • Driver log feature requested (+$5K approved)      │',
      '│ • GPS tracking requirement added                    │',
      '│ • Dashboard redesign approved                       │',
      '│ • Mobile responsive fixes deployed                  │',
      '└─────────────────────────────────────────────────────┘',
      '',
      '┌─ OPEN ITEMS ────────────────────────────────────────┐',
      '│ 1. Finalize driver log spec          Due: Jan 15   │',
      '│ 2. Send SOW for new feature          Due: Jan 12   │',
      '│ 3. Schedule demo call                Due: Jan 18   │',
      '│ 4. Review GPS integration options    Due: Jan 20   │',
      '└─────────────────────────────────────────────────────┘',
      '',
      'Full briefing saved to: /Projects/BuildTrack/client-docs/',
    ],
  },
  '/intake': {
    description: 'Process files in the intake folder',
    category: 'Core',
    output: [
      '> Scanning _intake-dump/ folder...',
      '',
      'Found 4 files to process:',
      '',
      '┌───────────────────────────────────────────────────────┐',
      '│ 1. voice-note-2024-01-10.m4a                         │',
      '│    → Transcribing... ✓                               │',
      '│    → Extracted: 3 todos, 1 decision, BuildTrack      │',
      '│    → Routed to: Projects/BuildTrack/_context/        │',
      '├───────────────────────────────────────────────────────┤',
      '│ 2. client-email-geteduc.pdf                          │',
      '│    → Parsing PDF... ✓                                │',
      '│    → Extracted: contract terms, deadline             │',
      '│    → Routed to: Clients/GetEducated/_context/        │',
      '├───────────────────────────────────────────────────────┤',
      '│ 3. meeting-notes-friday.md                           │',
      '│    → Analyzing... ✓                                  │',
      '│    → Extracted: 5 action items, 2 decisions          │',
      '│    → Routed to: Multiple (3 project folders)         │',
      '├───────────────────────────────────────────────────────┤',
      '│ 4. screenshot-wireframe.png                          │',
      '│    → OCR processing... ✓                             │',
      '│    → Detected: UI mockup, ContentForge               │',
      '│    → Routed to: Products/ContentForge/designs/       │',
      '└───────────────────────────────────────────────────────┘',
      '',
      '✓ All files processed and moved to _digested/',
      '  Context files updated: 7',
      '  New todos created: 8',
    ],
  },
  '/hours': {
    description: 'View timesheet summary',
    category: 'Time',
    output: [
      '> Calculating timesheet for this week...',
      '',
      '══════════════════════════════════════════════════════',
      '           TIMESHEET: Jan 6 - Jan 12, 2025            ',
      '══════════════════════════════════════════════════════',
      '',
      '┌─ BY PROJECT ────────────────────────────────────────┐',
      '│ BuildTrack         │ 18.5 hrs │ ████████████████   │',
      '│ ContentForge       │ 12.0 hrs │ ██████████░░░░░░   │',
      '│ EDF-Pro            │  8.25 hrs│ ███████░░░░░░░░░   │',
      '│ Internal/BB1       │  4.0 hrs │ ███░░░░░░░░░░░░░   │',
      '│ Admin              │  2.25 hrs│ ██░░░░░░░░░░░░░░   │',
      '└─────────────────────────────────────────────────────┘',
      '',
      'Total: 45.0 hrs │ Billable: 38.75 hrs (86%)',
      '',
      '┌─ BY DAY ────────────────────────────────────────────┐',
      '│ Mon:  9.25 hrs  │ ████████████████████             │',
      '│ Tue:  8.5 hrs   │ ██████████████████               │',
      '│ Wed:  7.75 hrs  │ ████████████████░                │',
      '│ Thu:  10.0 hrs  │ ████████████████████████         │',
      '│ Fri:  9.5 hrs   │ ████████████████████░            │',
      '└─────────────────────────────────────────────────────┘',
      '',
      'Commands: /hours week, /hours month, /hours project <name>',
    ],
  },
  '/add-client': {
    description: 'Create new client with full structure',
    category: 'Entities',
    output: [
      'Usage: /add-client <name>',
      '',
      'This creates a complete client folder structure:',
      '',
      'Clients/<name>/',
      '├── README.md           # Client overview',
      '├── CLAUDE.md           # AI context',
      '├── _meta.json          # Structured metadata',
      '├── _dump/              # Raw data dump',
      '│   └── _processed/     # Archived files',
      '├── _context/           # Extracted understanding',
      '│   ├── overview.md',
      '│   ├── contacts.md',
      '│   └── history.md',
      '└── _pulse/             # Live status',
      '    └── STATUS.md',
      '',
      'Example: /add-client "Acme Corp"',
    ],
  },
  '/add-client "Acme Corp"': {
    description: 'Create Acme Corp client',
    category: 'Entities',
    output: [
      '> Creating new client: Acme Corp...',
      '',
      '✓ Created Clients/Acme-Corp/',
      '✓ Created README.md with template',
      '✓ Created CLAUDE.md with AI context',
      '✓ Created _meta.json with defaults',
      '✓ Created _dump/ folder',
      '✓ Created _context/ with templates',
      '✓ Created _pulse/STATUS.md',
      '',
      'Client structure ready!',
      '',
      'Next steps:',
      '1. Edit README.md with client details',
      '2. Add contacts to _context/contacts.md',
      '3. Drop initial documents into _dump/',
      '4. Run /intake to process',
    ],
  },
  '/add-partner': {
    description: 'Create new partner relationship',
    category: 'Entities',
    output: [
      'Usage: /add-partner <name>',
      '',
      'Creates a partner folder structure for strategic relationships.',
      'Partners differ from clients - bidirectional value exchange.',
      '',
      'Example: /add-partner "Digital Agency Co"',
    ],
  },
  '/add-vendor': {
    description: 'Create new vendor with structure',
    category: 'Entities',
    output: [
      'Usage: /add-vendor <name>',
      '',
      'Creates a vendor folder for service providers you pay.',
      'Includes cost tracking, contract storage, and service docs.',
      '',
      'Example: /add-vendor "AWS"',
    ],
  },
  '/snapshot': {
    description: 'Create versioned backup',
    category: 'System',
    output: [
      '> Creating versioned snapshot...',
      '',
      'Current version: v1.8.0',
      '',
      'Changes since last snapshot:',
      '  + 12 files added',
      '  ~ 34 files modified',
      '  - 3 files deleted',
      '',
      'Enter description (or press enter for auto):',
      '> Added entity management system and content factory',
      '',
      '✓ Snapshot created: v1.8.1',
      '✓ Git commit: abc123f',
      '✓ Tag created: v1.8.1',
      '✓ VERSION.json updated',
      '✓ CHANGELOG.md updated',
      '',
      'Backup complete! Use /rollback v1.8.0 to restore.',
    ],
  },
  '/rollback': {
    description: 'Rollback to a previous version',
    category: 'System',
    output: [
      'Usage: /rollback [version]',
      '',
      'Available versions:',
      '',
      '┌───────────────────────────────────────────────────────┐',
      '│ v1.8.1   │ 2 hours ago  │ Entity management system   │',
      '│ v1.8.0   │ 3 days ago   │ Content Factory release    │',
      '│ v1.7.0   │ 1 week ago   │ PDF generation system      │',
      '│ v1.6.0   │ 2 weeks ago  │ GUI dashboard launch       │',
      '│ v1.5.0   │ 3 weeks ago  │ Cross-platform support     │',
      '└───────────────────────────────────────────────────────┘',
      '',
      'Example: /rollback v1.8.0',
      'Warning: This will discard changes since that version.',
    ],
  },
  '/history': {
    description: 'View version history and changes',
    category: 'System',
    output: [
      '> Loading version history...',
      '',
      '══════════════════════════════════════════════════════',
      '               VERSION HISTORY                        ',
      '══════════════════════════════════════════════════════',
      '',
      'v1.8.1 (current) - Jan 10, 2025',
      '  • Added entity management system',
      '  • Enhanced content factory',
      '  • Fixed intake routing bugs',
      '',
      'v1.8.0 - Jan 7, 2025',
      '  • Content Factory auto-generation',
      '  • Build log system',
      '  • Tutorial factory',
      '',
      'v1.7.0 - Dec 28, 2024',
      '  • PDF generation with markdown2pdf',
      '  • Custom styling system',
      '  • Playwright fallback',
      '',
      'Use /history <version> for detailed changes',
      'Use /history compare v1.7.0 v1.8.0 for diff',
    ],
  },
  '/contractgen': {
    description: 'Generate contract from template',
    category: 'Documents',
    output: [
      'Usage: /contractgen <type> <client>',
      '',
      'Available templates:',
      '  • msa      - Master Services Agreement',
      '  • sow      - Statement of Work',
      '  • nda      - Non-Disclosure Agreement',
      '  • subcon   - Subcontractor Agreement',
      '  • proposal - Project Proposal',
      '',
      'Example: /contractgen sow BuildTrack',
    ],
  },
  '/contractgen sow BuildTrack': {
    description: 'Generate SOW for BuildTrack',
    category: 'Documents',
    output: [
      '> Generating Statement of Work for BuildTrack...',
      '',
      '✓ Loading template: templates/sow-template.md',
      '✓ Fetching client data from: Clients/Disruptors-Media/',
      '✓ Fetching project scope from: Projects/BuildTrack/',
      '✓ Calculating pricing from: Strategy/pricing.md',
      '',
      'Variables populated:',
      '  • Client: Disruptors Media (Tim)',
      '  • Project: BuildTrack Driver Log Feature',
      '  • Scope: 5 deliverables extracted',
      '  • Timeline: 4 weeks (Jan 15 - Feb 12)',
      '  • Budget: $5,000 (50 hours @ $100/hr)',
      '',
      '✓ Generated: BuildTrack-DriverLog-SOW-2025.md',
      '✓ PDF created: BuildTrack-DriverLog-SOW-2025.pdf',
      '',
      'Files saved to: Contracts-and-Terms/clients/disruptors-media/',
      '',
      'Review and send: /pdf-export to create final version',
    ],
  },
  '/onboard': {
    description: 'Guide for new team members',
    category: 'System',
    output: [
      '> Starting onboarding guide...',
      '',
      '══════════════════════════════════════════════════════',
      '        WELCOME TO THE BUSINESS BRAIN                 ',
      '══════════════════════════════════════════════════════',
      '',
      'This system maintains comprehensive context across all',
      'business operations. Here\'s how to get started:',
      '',
      '1. UNDERSTAND THE STRUCTURE',
      '   • /Projects - Active development work',
      '   • /Clients - Entities that pay us',
      '   • /Partners - Strategic relationships',
      '   • /Vendors - Service providers',
      '   • /Operations - System infrastructure',
      '',
      '2. ESSENTIAL COMMANDS',
      '   • /status - See everything at a glance',
      '   • /find <query> - Search across all context',
      '   • /brief <project> - Get up to speed quickly',
      '   • /hours - Track your time',
      '',
      '3. PROCESSING INFORMATION',
      '   • Drop files into _intake-dump/',
      '   • Run /intake to process',
      '   • Context updates automatically',
      '',
      '4. KEY PRINCIPLES',
      '   • Context is king - capture everything',
      '   • Automate the tedious - build commands',
      '   • Document as you go - knowledge > lost',
      '',
      'Full guide: /Knowledge/onboarding/',
    ],
  },
  '/gui': {
    description: 'Launch the Business Brain GUI',
    category: 'System',
    output: [
      '> Launching Business Brain GUI...',
      '',
      '✓ Starting backend server on port 3100',
      '✓ Starting frontend on port 5173',
      '',
      '╔══════════════════════════════════════════════════════╗',
      '║                BUSINESS BRAIN GUI                    ║',
      '╠══════════════════════════════════════════════════════╣',
      '║                                                      ║',
      '║   Local:   http://localhost:5173                    ║',
      '║   Network: http://192.168.1.100:5173                ║',
      '║                                                      ║',
      '║   Features:                                         ║',
      '║   • Dashboard with project overview                 ║',
      '║   • Entity management (Clients/Partners/Vendors)    ║',
      '║   • File browser with context preview               ║',
      '║   • Task management                                 ║',
      '║   • Repository status                               ║',
      '║                                                      ║',
      '╚══════════════════════════════════════════════════════╝',
      '',
      'Press Ctrl+C to stop the server.',
    ],
  },
  '/verify': {
    description: 'Comprehensive system verification',
    category: 'System',
    output: [
      '> Running comprehensive system verification...',
      '',
      '┌─ FOLDER STRUCTURE ───────────────────────────────────┐',
      '│ ✓ Projects/          5 active projects               │',
      '│ ✓ Clients/           3 clients tracked               │',
      '│ ✓ Partners/          4 partners                      │',
      '│ ✓ Vendors/           8 vendors                       │',
      '│ ✓ Operations/        All systems present             │',
      '│ ✓ Knowledge/         Documentation up to date        │',
      '└─────────────────────────────────────────────────────┘',
      '',
      '┌─ MCP SERVERS ────────────────────────────────────────┐',
      '│ ✓ notion            Connected, 15 databases          │',
      '│ ✓ gohighlevel       Connected, API healthy           │',
      '│ ✓ markdown2pdf      Ready                            │',
      '│ ✓ playwright        Browser ready                    │',
      '│ ✓ github            Authenticated                    │',
      '│ ⚠ vercel            Token expired (renew needed)     │',
      '└─────────────────────────────────────────────────────┘',
      '',
      '┌─ HOOKS & AUTOMATION ─────────────────────────────────┐',
      '│ ✓ timesheet-hook    Capturing sessions               │',
      '│ ✓ voice-hook        Ready for processing             │',
      '│ ✓ git-hooks         Pre-commit active                │',
      '└─────────────────────────────────────────────────────┘',
      '',
      'Overall Status: HEALTHY (1 warning)',
      'Fix: Run /setup vercel to renew token',
    ],
  },
  '/mcp-status': {
    description: 'View MCP server status',
    category: 'System',
    output: [
      '> Checking MCP server status...',
      '',
      '══════════════════════════════════════════════════════',
      '              MCP SERVER STATUS                       ',
      '══════════════════════════════════════════════════════',
      '',
      '┌───────────────┬──────────┬─────────────────────────┐',
      '│ Server        │ Status   │ Available Tools         │',
      '├───────────────┼──────────┼─────────────────────────┤',
      '│ notion        │ ● Active │ 12 tools (pages, dbs)   │',
      '│ gohighlevel   │ ● Active │ 45 tools (CRM, comms)   │',
      '│ markdown2pdf  │ ● Active │ 1 tool (conversion)     │',
      '│ playwright    │ ● Active │ 15 tools (browser)      │',
      '│ puppeteer     │ ● Active │ 8 tools (browser)       │',
      '│ github        │ ● Active │ 6 tools (repos, PRs)    │',
      '│ filesystem    │ ● Active │ 5 tools (file ops)      │',
      '│ sqlite        │ ○ Idle   │ 4 tools (database)      │',
      '└───────────────┴──────────┴─────────────────────────┘',
      '',
      'Total: 96 tools available across 8 servers',
      '',
      'Commands: /mcp-tools <server>, /mcp-reload',
    ],
  },
  '/project': {
    description: 'Switch projects and manage worktrees',
    category: 'Navigation',
    output: [
      '> Available projects:',
      '',
      '┌───────────────────────────────────────────────────────┐',
      '│ Alias          │ Status   │ Description              │',
      '├───────────────────────────────────────────────────────┤',
      '│ buildtrack     │ ● Active │ Construction app         │',
      '│ perdia         │ ● Active │ Content Engine           │',
      '│ edf            │ ◐ Plan   │ Dental practice platform │',
      '│ contentforge   │ ● Active │ Multi-tenant SaaS        │',
      '│ bb1            │ ● Active │ This Business Brain      │',
      '└───────────────────────────────────────────────────────┘',
      '',
      'Usage:',
      '  /project <name>              Switch to project',
      '  /project <name> feature/xyz  Create feature worktree',
      '',
      'Example: /project buildtrack',
    ],
  },
  '/sync': {
    description: 'Sync with Google Drive',
    category: 'System',
    output: [
      '> Syncing Business Brain with Google Drive...',
      '',
      '┌─ SYNC STATUS ───────────────────────────────────────┐',
      '│ Local → Cloud                                       │',
      '│   ↑ 23 files uploaded                              │',
      '│   ~ 12 files updated                               │',
      '│                                                     │',
      '│ Cloud → Local                                       │',
      '│   ↓ 5 files downloaded                             │',
      '│   ~ 3 files updated                                │',
      '│                                                     │',
      '│ Conflicts: 0                                        │',
      '└─────────────────────────────────────────────────────┘',
      '',
      '✓ Sync complete!',
      'Last sync: Just now',
      'Next auto-sync: In 15 minutes',
    ],
  },
  '/list-entities': {
    description: 'List all entities with filtering',
    category: 'Entities',
    output: [
      '> Listing all entities...',
      '',
      '┌─ CLIENTS (3) ───────────────────────────────────────┐',
      '│ Disruptors Media    │ Active   │ BuildTrack project │',
      '│ GetEducated         │ Active   │ ContentEngine      │',
      '│ Emerald Beacon      │ Active   │ Website + EDF      │',
      '└─────────────────────────────────────────────────────┘',
      '',
      '┌─ PARTNERS (4) ──────────────────────────────────────┐',
      '│ Disruptors Media    │ Strategic │ Dev partnership   │',
      '│ Emerald Beacon      │ Strategic │ Dental tech       │',
      '│ GetEducated         │ Active    │ Content client    │',
      '│ TechStart           │ Prospect  │ Potential partner │',
      '└─────────────────────────────────────────────────────┘',
      '',
      '┌─ VENDORS (8) ───────────────────────────────────────┐',
      '│ Anthropic           │ AI/LLM   │ Claude API         │',
      '│ Vercel              │ Hosting  │ Deployments        │',
      '│ Supabase            │ Database │ PostgreSQL + Auth  │',
      '│ ... and 5 more                                      │',
      '└─────────────────────────────────────────────────────┘',
      '',
      'Filter: /list-entities --type=clients',
    ],
  },
  '/build-log': {
    description: 'Document changes to BB1',
    category: 'Documentation',
    output: [
      'Usage: /build-log [entry]',
      '',
      'Document changes to the Business Brain with reasoning.',
      '',
      'Options:',
      '  /build-log "Added new intake processor"',
      '  /build-log decision "Chose Zustand over Redux"',
      '  /build-log session "Completed entity system"',
      '',
      'Logs saved to: Knowledge/wjw_dev_bible/bb1-build-log/',
    ],
  },
  '/content-capture': {
    description: 'Capture content opportunity',
    category: 'Content',
    output: [
      'Usage: /content-capture [description]',
      '',
      'Capture content ideas from current work.',
      '',
      'Types:',
      '  /content-capture "Quick tip about slash commands"',
      '  /content-capture reel "Building a Business Brain"',
      '  /content-capture tutorial "MCP Integration Guide"',
      '',
      'Auto-generates drafts for:',
      '  • Instagram Reels',
      '  • Twitter/X threads',
      '  • YouTube tutorials',
      '',
      'Queue: Knowledge/wjw_dev_bible/content-creation/auto-queue/',
    ],
  },
  'help': {
    description: 'Show all available commands',
    category: 'Help',
    output: [
      '> Available commands:',
      '',
      '┌─ CORE ──────────────────────────────────────────────┐',
      '│ /status        View business-wide status dashboard  │',
      '│ /find <query>  Search across all projects          │',
      '│ /brief <name>  Generate comprehensive briefing     │',
      '│ /intake        Process files in intake folder      │',
      '└─────────────────────────────────────────────────────┘',
      '',
      '┌─ TIME ──────────────────────────────────────────────┐',
      '│ /hours         View timesheet summary              │',
      '│ /hours week    Last 7 days summary                 │',
      '│ /hours month   Monthly summary                     │',
      '└─────────────────────────────────────────────────────┘',
      '',
      '┌─ ENTITIES ──────────────────────────────────────────┐',
      '│ /add-client    Create new client structure         │',
      '│ /add-partner   Create new partner structure        │',
      '│ /add-vendor    Create new vendor structure         │',
      '│ /list-entities List all entities with filtering    │',
      '└─────────────────────────────────────────────────────┘',
      '',
      '┌─ SYSTEM ────────────────────────────────────────────┐',
      '│ /snapshot      Create versioned backup             │',
      '│ /rollback      Rollback to previous version        │',
      '│ /history       View version history                │',
      '│ /verify        System health check                 │',
      '│ /gui           Launch web dashboard                │',
      '│ /sync          Sync with Google Drive              │',
      '└─────────────────────────────────────────────────────┘',
      '',
      'Type any command for usage details.',
      'Tab completion available.',
    ],
  },
  'clear': {
    description: 'Clear terminal output',
    category: 'Terminal',
    output: [],
  },
};

// Get all command names for autocomplete
const allCommands = Object.keys(commandDatabase);

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success' | 'info';
  content: string;
  timestamp?: Date;
}

interface TerminalPlaygroundProps {
  className?: string;
  initialCommand?: string;
  autoRun?: boolean;
}

export const TerminalPlayground: React.FC<TerminalPlaygroundProps> = ({
  className,
  initialCommand = '/status',
  autoRun = true,
}) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new content
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Auto-run initial command
  useEffect(() => {
    if (autoRun && initialCommand) {
      const timer = setTimeout(() => {
        executeCommand(initialCommand, true);
      }, 1000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autocomplete suggestions
  useEffect(() => {
    if (currentInput.length > 0) {
      const matches = allCommands
        .filter((cmd) => cmd.toLowerCase().startsWith(currentInput.toLowerCase()))
        .slice(0, 5);
      setSuggestions(matches);
      setSelectedSuggestion(0);
    } else {
      setSuggestions([]);
    }
  }, [currentInput]);

  const executeCommand = async (command: string, animate = false) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    setIsProcessing(true);

    // Add input line
    if (animate) {
      // Typewriter effect for initial command
      for (let i = 0; i <= trimmedCommand.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 40));
        setCurrentInput(trimmedCommand.substring(0, i));
      }
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    setLines((prev) => [
      ...prev,
      { type: 'input', content: trimmedCommand, timestamp: new Date() },
    ]);
    setCurrentInput('');
    setSuggestions([]);

    // Add to history
    setHistory((prev) => [trimmedCommand, ...prev.slice(0, 49)]);
    setHistoryIndex(-1);

    // Special handling for 'clear'
    if (trimmedCommand.toLowerCase() === 'clear') {
      setLines([]);
      setIsProcessing(false);
      return;
    }

    // Find matching command
    const cmdData = commandDatabase[trimmedCommand] ||
      commandDatabase[trimmedCommand.split(' ')[0]];

    await new Promise((resolve) => setTimeout(resolve, 300));

    if (cmdData) {
      // Output each line with animation
      for (const line of cmdData.output) {
        await new Promise((resolve) => setTimeout(resolve, 20));
        setLines((prev) => [
          ...prev,
          {
            type: line.startsWith('>') || line.startsWith('✓')
              ? 'success'
              : line.includes('⚠')
              ? 'info'
              : 'output',
            content: line,
          },
        ]);
      }
    } else {
      setLines((prev) => [
        ...prev,
        {
          type: 'error',
          content: `Command not found: ${trimmedCommand}`,
        },
        {
          type: 'info',
          content: 'Type "help" for available commands',
        },
      ]);
    }

    setIsProcessing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0 && currentInput !== suggestions[selectedSuggestion]) {
        setCurrentInput(suggestions[selectedSuggestion]);
      } else {
        executeCommand(currentInput);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setCurrentInput(suggestions[selectedSuggestion]);
        setSuggestions([]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestion((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      } else if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestion((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      } else if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(history[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    } else if (e.key === 'Escape') {
      setSuggestions([]);
    }
  };

  const copyOutput = () => {
    const text = lines
      .map((l) => (l.type === 'input' ? `$ ${l.content}` : l.content))
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'input':
        return 'text-emerald-400';
      case 'success':
        return 'text-cyan-400';
      case 'error':
        return 'text-red-400';
      case 'info':
        return 'text-amber-400';
      default:
        return 'text-white/70';
    }
  };

  return (
    <motion.div
      className={cn(
        'relative',
        isFullscreen && 'fixed inset-4 z-50',
        className
      )}
      layout
    >
      {/* Fullscreen backdrop */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm -z-10"
            onClick={() => setIsFullscreen(false)}
          />
        )}
      </AnimatePresence>

      {/* Terminal Window */}
      <div
        className={cn(
          'rounded-2xl border border-white/10 bg-[#0d0d14] overflow-hidden shadow-2xl',
          isFullscreen ? 'h-full flex flex-col' : ''
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#13131f] border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Terminal className="w-4 h-4" />
              <span className="font-mono">bizbrain-os</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyOutput}
              className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white/60 transition-colors"
              title="Copy output"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white/60 transition-colors"
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Body */}
        <div
          ref={terminalRef}
          className={cn(
            'p-4 overflow-y-auto font-mono text-sm',
            isFullscreen ? 'flex-1' : 'h-96'
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Welcome message */}
          {lines.length === 0 && !isProcessing && (
            <div className="text-white/40 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Business Brain Terminal</span>
              </div>
              <div className="text-xs">
                Type &quot;help&quot; for commands or try &quot;/status&quot;
              </div>
            </div>
          )}

          {/* Output lines */}
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn('whitespace-pre-wrap', getLineColor(line.type))}
            >
              {line.type === 'input' ? (
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">$</span>
                  <span className="text-white">{line.content}</span>
                </div>
              ) : (
                line.content || '\u00A0'
              )}
            </motion.div>
          ))}

          {/* Processing indicator */}
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-white/40"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Clock className="w-4 h-4" />
              </motion.div>
              <span>Processing...</span>
            </motion.div>
          )}

          {/* Input line */}
          <div className="flex items-center gap-2 mt-2 relative">
            <span className="text-emerald-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isProcessing}
              className="flex-1 bg-transparent text-white outline-none caret-cyan-400"
              placeholder={isProcessing ? '' : 'Type a command...'}
              autoFocus
            />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-cyan-400"
            >
              |
            </motion.span>
          </div>

          {/* Suggestions dropdown */}
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 rounded-lg border border-white/10 bg-[#1a1a24] overflow-hidden"
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setCurrentInput(suggestion);
                      setSuggestions([]);
                      inputRef.current?.focus();
                    }}
                    className={cn(
                      'w-full px-3 py-2 text-left text-sm flex items-center gap-2 transition-colors',
                      index === selectedSuggestion
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'text-white/60 hover:bg-white/5'
                    )}
                  >
                    <ChevronRight className="w-3 h-3" />
                    <span className="font-mono">{suggestion}</span>
                    <span className="text-white/30 text-xs ml-auto">
                      {commandDatabase[suggestion]?.description}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer with quick commands */}
        <div className="px-4 py-3 border-t border-white/10 bg-[#13131f]">
          <div className="flex flex-wrap gap-2">
            {['/status', '/find', '/brief', '/intake', '/hours', 'help'].map(
              (cmd) => (
                <button
                  key={cmd}
                  onClick={() => executeCommand(cmd)}
                  disabled={isProcessing}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-mono transition-all',
                    'bg-white/5 text-white/60 border border-white/10',
                    'hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/30',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                >
                  {cmd}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Info panel */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-white/40">
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 font-mono">Tab</kbd>
          <span>autocomplete</span>
        </div>
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 font-mono">↑↓</kbd>
          <span>history</span>
        </div>
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 font-mono">Enter</kbd>
          <span>execute</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalPlayground;
