// Demo data for interactive components

// ============================================
// TERMINAL COMMANDS
// ============================================
export interface TerminalCommand {
  command: string;
  description: string;
  output: string[];
  category: 'status' | 'search' | 'generate' | 'manage' | 'system';
}

export const terminalCommands: Record<string, TerminalCommand> = {
  '/status': {
    command: '/status',
    description: 'Generate business-wide status dashboard',
    category: 'status',
    output: [
      '> Generating business-wide status...',
      '',
      '╔══════════════════════════════════════════╗',
      '║         BUSINESS PULSE DASHBOARD         ║',
      '╠══════════════════════════════════════════╣',
      '║ Active Projects: 5                       ║',
      '║ Healthy: 4 │ At Risk: 1                 ║',
      '║                                          ║',
      '║ BuildTrack      ████████░░ 80%          ║',
      '║ Perdia v5       ██████████ 95%          ║',
      '║ EDF-Pro         ██░░░░░░░░ 20%          ║',
      '║ ContentForge    ██████░░░░ 60%          ║',
      '║ BB1 GUI         ████████░░ 78%          ║',
      '║                                          ║',
      '║ Open Tasks: 23                           ║',
      '║ Due This Week: 7                         ║',
      '║ Overdue: 2 ⚠️                            ║',
      '╚══════════════════════════════════════════╝',
    ],
  },
  '/find invoice': {
    command: '/find invoice',
    description: 'Search for invoices across all entities',
    category: 'search',
    output: [
      '> Searching across all entities...',
      '',
      'Found 5 results:',
      '',
      '  1. GetEducated - Invoice #1234',
      '     Amount: $2,500 │ Status: OVERDUE (30 days)',
      '',
      '  2. BuildTrack - Invoice #1189',
      '     Amount: $5,000 │ Status: OVERDUE (7 days)',
      '',
      '  3. Emerald Beacon - Invoice #1201',
      '     Amount: $3,200 │ Status: Pending',
      '',
      '  4. ContentForge - Invoice #1156',
      '     Amount: $1,500 │ Status: PAID',
      '',
      '  5. Archive/OldClient - Invoice #0987',
      '     Amount: $800 │ Status: PAID',
      '',
      'Actions: /remind, /invoice-followup, /mark-paid',
    ],
  },
  '/brief BuildTrack': {
    command: '/brief BuildTrack',
    description: 'Generate comprehensive project briefing',
    category: 'generate',
    output: [
      '> Generating comprehensive briefing...',
      '',
      '═══════════════════════════════════════════',
      '         BUILDTRACK PROJECT BRIEFING        ',
      '═══════════════════════════════════════════',
      '',
      '  Client:   Tim (Disruptors Media)',
      '  Project:  Construction tracking app',
      '  Status:   Active Development (80%)',
      '  Budget:   $15,000 (spent: $12,000)',
      '',
      '  ─── Recent Activity ───',
      '  • Driver log feature requested ($5K budget)',
      '  • GPS tracking requirement added',
      '  • Deadline: End of January',
      '',
      '  ─── Open Items ───',
      '  • Finalize driver log spec',
      '  • Send SOW for new feature',
      '  • Schedule demo call',
      '',
      '  ─── Key Contacts ───',
      '  • Tim (Owner) - tim@disruptors.com',
      '  • Sarah (PM) - sarah@disruptors.com',
      '',
      'Full briefing saved to: /Projects/BuildTrack/client-docs/',
    ],
  },
  '/intake': {
    command: '/intake',
    description: 'Process files in the intake folder',
    category: 'manage',
    output: [
      '> Processing _intake-dump folder...',
      '',
      'Found 3 files to process:',
      '',
      '  ┌─ voice-note-2024-01-02.m4a',
      '  │  Transcribing... ✓',
      '  │  Extracting: 2 todos, 1 decision, 1 deadline',
      '  │  Routing to: /Projects/BuildTrack/',
      '  └─ Status: ✓ Processed',
      '',
      '  ┌─ tim-email.txt',
      '  │  Analyzing... ✓',
      '  │  Extracting: 1 requirement, 1 question',
      '  │  Routing to: /Partners/Disruptors-Media/',
      '  └─ Status: ✓ Processed',
      '',
      '  ┌─ contract-draft.pdf',
      '  │  Parsing... ✓',
      '  │  Type: SOW Amendment',
      '  │  Routing to: /Contracts-and-Terms/clients/',
      '  └─ Status: ✓ Processed',
      '',
      '✓ All files processed. Context updated in 4 locations.',
    ],
  },
  '/hours': {
    command: '/hours',
    description: 'Show timesheet summary',
    category: 'status',
    output: [
      '> Loading timesheet data...',
      '',
      '═══ TIMESHEET SUMMARY ═══',
      '',
      '  Today:      2.5 hours',
      '  This Week:  18.25 hours',
      '  This Month: 67.5 hours',
      '',
      '  ─── By Project ───',
      '  BuildTrack     │ 8.0 hrs  │ ████████░░',
      '  Perdia v5      │ 5.5 hrs  │ █████░░░░░',
      '  BB1 System     │ 4.75 hrs │ ████░░░░░░',
      '',
      '  Billable: $2,737.50 (@ $150/hr)',
      '',
      '  Run /timesheet for detailed breakdown',
      '  Run /notion-sync to push to Notion',
    ],
  },
  '/add-client': {
    command: '/add-client',
    description: 'Create a new client with full folder structure',
    category: 'manage',
    output: [
      '> Initializing new client wizard...',
      '',
      '  Enter client name: Acme Corp',
      '  Enter primary contact: john@acmecorp.com',
      '  Enter industry: Technology',
      '',
      '  Creating folder structure...',
      '',
      '  ✓ /Clients/Acme-Corp/README.md',
      '  ✓ /Clients/Acme-Corp/CLAUDE.md',
      '  ✓ /Clients/Acme-Corp/_meta.json',
      '  ✓ /Clients/Acme-Corp/_dump/',
      '  ✓ /Clients/Acme-Corp/_context/',
      '  ✓ /Clients/Acme-Corp/_pulse/STATUS.md',
      '',
      '  Cross-references created:',
      '  ✓ /Finance/income/by-client/acme-corp.md',
      '  ✓ /Operations/todos/by-client/acme-corp.md',
      '',
      '✓ Client "Acme Corp" created successfully!',
    ],
  },
  '/snapshot': {
    command: '/snapshot',
    description: 'Create a versioned backup',
    category: 'system',
    output: [
      '> Creating versioned snapshot...',
      '',
      '  Current version: v1.8.0',
      '  New version: v1.8.1',
      '',
      '  Changes detected:',
      '  • 12 files modified',
      '  • 3 files added',
      '  • 0 files deleted',
      '',
      '  Creating git commit...',
      '  Creating git tag...',
      '',
      '  ✓ Snapshot created: v1.8.1',
      '  ✓ CHANGELOG.md updated',
      '  ✓ VERSION.json updated',
      '',
      '  To restore: /rollback v1.8.1',
    ],
  },
  '/contractgen': {
    command: '/contractgen',
    description: 'Generate a contract from template',
    category: 'generate',
    output: [
      '> Starting contract generator...',
      '',
      '  Select template:',
      '  1. Master Service Agreement (MSA)',
      '  2. Statement of Work (SOW)',
      '  3. Non-Disclosure Agreement (NDA)',
      '  4. Subcontractor Agreement',
      '',
      '  > Selected: SOW',
      '',
      '  Loading client data for BuildTrack...',
      '  Applying pricing rules...',
      '  Generating milestone schedule...',
      '',
      '  ┌─────────────────────────────────────┐',
      '  │ STATEMENT OF WORK                   │',
      '  │                                     │',
      '  │ Project: Driver Log Feature         │',
      '  │ Client: Disruptors Media / Tim      │',
      '  │ Budget: $5,000                      │',
      '  │ Timeline: 3 weeks                   │',
      '  │                                     │',
      '  │ Milestones:                         │',
      '  │ • M1: UI Design - $1,500            │',
      '  │ • M2: Implementation - $2,500       │',
      '  │ • M3: Testing & Deploy - $1,000     │',
      '  └─────────────────────────────────────┘',
      '',
      '  ✓ Contract saved to:',
      '    /Contracts-and-Terms/clients/buildtrack-sow-driver-log.md',
      '',
      '  ✓ PDF generated:',
      '    /Contracts-and-Terms/clients/buildtrack-sow-driver-log.pdf',
    ],
  },
};

// ============================================
// FOLDER STRUCTURE DATA
// ============================================
export interface FolderItem {
  name: string;
  type: 'folder' | 'file';
  children?: FolderItem[];
  description?: string;
}

export const businessBrainStructure: FolderItem = {
  name: 'Tech Integration Labs BB1',
  type: 'folder',
  children: [
    {
      name: '_intake-dump',
      type: 'folder',
      description: 'Central data ingestion - drop any file here',
      children: [
        { name: 'voice-note-2024-01-02.m4a', type: 'file' },
        { name: 'meeting-transcript.txt', type: 'file' },
        { name: '_digested', type: 'folder', description: 'Processed items archive' },
      ],
    },
    {
      name: 'Projects',
      type: 'folder',
      description: 'Active development projects',
      children: [
        {
          name: 'BuildTrack',
          type: 'folder',
          children: [
            { name: '_context', type: 'folder', description: 'AI-extracted understanding' },
            { name: '_pulse', type: 'folder', description: 'Live status dashboard' },
            { name: 'CLAUDE.md', type: 'file' },
          ],
        },
        {
          name: 'EDF-Pro',
          type: 'folder',
          children: [
            { name: '_context', type: 'folder' },
            { name: '_pulse', type: 'folder' },
          ],
        },
      ],
    },
    {
      name: 'Clients',
      type: 'folder',
      description: 'Revenue sources - entities that pay us',
      children: [
        {
          name: 'GetEducated',
          type: 'folder',
          children: [
            { name: 'README.md', type: 'file' },
            { name: '_meta.json', type: 'file' },
            { name: '_dump', type: 'folder' },
            { name: '_context', type: 'folder' },
          ],
        },
      ],
    },
    {
      name: 'Partners',
      type: 'folder',
      description: 'Strategic business relationships',
      children: [
        { name: 'Disruptors-Media', type: 'folder' },
        { name: 'Emerald-Beacon', type: 'folder' },
      ],
    },
    {
      name: 'Vendors',
      type: 'folder',
      description: 'Service providers we pay',
      children: [
        { name: 'OpenAI', type: 'folder' },
        { name: 'Vercel', type: 'folder' },
        { name: 'Supabase', type: 'folder' },
      ],
    },
    {
      name: 'Finance',
      type: 'folder',
      description: 'Business finances',
      children: [
        { name: 'subscriptions', type: 'folder' },
        { name: 'income', type: 'folder' },
        { name: 'expenses', type: 'folder' },
      ],
    },
    {
      name: 'Operations',
      type: 'folder',
      description: 'Operational infrastructure',
      children: [
        { name: 'dev-config-system', type: 'folder', description: 'Credential management' },
        { name: 'timesheet-system', type: 'folder', description: 'Auto time tracking' },
        { name: 'mcp-configs', type: 'folder', description: 'MCP server configs' },
      ],
    },
    {
      name: 'Knowledge',
      type: 'folder',
      description: 'Accumulated wisdom',
      children: [
        { name: 'claude-code', type: 'folder' },
        { name: 'dev-practices', type: 'folder' },
      ],
    },
  ],
};

// ============================================
// ENTITY DATA
// ============================================
export interface Entity {
  id: string;
  name: string;
  type: 'client' | 'partner' | 'vendor';
  status: 'active' | 'inactive' | 'prospect';
  avatar?: string;
  description: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export const entities: Entity[] = [
  {
    id: 'geteducated',
    name: 'GetEducated',
    type: 'client',
    status: 'active',
    description: 'AI content production for education platform',
    metrics: [
      { label: 'Revenue', value: '$12,500' },
      { label: 'Active Projects', value: '2' },
      { label: 'Hours This Month', value: '45' },
    ],
  },
  {
    id: 'tim-buildtrack',
    name: 'BuildTrack (Tim)',
    type: 'client',
    status: 'active',
    description: 'Construction tracking application',
    metrics: [
      { label: 'Revenue', value: '$15,000' },
      { label: 'Progress', value: '80%' },
      { label: 'Next Milestone', value: 'Jan 15' },
    ],
  },
  {
    id: 'disruptors',
    name: 'Disruptors Media',
    type: 'partner',
    status: 'active',
    description: 'Strategic agency partnership',
    metrics: [
      { label: 'Projects Together', value: '3' },
      { label: 'Referrals', value: '5' },
    ],
  },
  {
    id: 'emerald',
    name: 'Emerald Beacon',
    type: 'partner',
    status: 'active',
    description: 'Healthcare tech partnership',
    metrics: [
      { label: 'Active Project', value: 'EDF-Pro' },
      { label: 'Budget', value: '$250K' },
    ],
  },
  {
    id: 'openai',
    name: 'OpenAI',
    type: 'vendor',
    status: 'active',
    description: 'AI API provider',
    metrics: [
      { label: 'Monthly Cost', value: '$350' },
      { label: 'API Calls', value: '125K' },
    ],
  },
  {
    id: 'vercel',
    name: 'Vercel',
    type: 'vendor',
    status: 'active',
    description: 'Hosting and deployment',
    metrics: [
      { label: 'Monthly Cost', value: '$20' },
      { label: 'Deployments', value: '45' },
    ],
  },
  {
    id: 'supabase',
    name: 'Supabase',
    type: 'vendor',
    status: 'active',
    description: 'Database and auth',
    metrics: [
      { label: 'Monthly Cost', value: '$25' },
      { label: 'Projects', value: '4' },
    ],
  },
];

// ============================================
// MCP SERVERS DATA
// ============================================
export interface MCPServer {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'disconnected' | 'error';
  tools: string[];
  icon: string;
}

export const mcpServers: MCPServer[] = [
  {
    id: 'notion',
    name: 'Notion',
    description: 'Page and database management',
    status: 'connected',
    tools: ['create_page', 'update_database', 'search', 'append_blocks'],
    icon: '📝',
  },
  {
    id: 'gohighlevel',
    name: 'GoHighLevel',
    description: 'CRM integration',
    status: 'connected',
    tools: ['create_contact', 'send_sms', 'create_opportunity', 'update_pipeline'],
    icon: '📊',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Repository management',
    status: 'connected',
    tools: ['create_repo', 'create_issue', 'create_pr', 'search_code'],
    icon: '🐙',
  },
  {
    id: 'playwright',
    name: 'Playwright',
    description: 'Browser automation',
    status: 'connected',
    tools: ['navigate', 'screenshot', 'click', 'fill', 'save_pdf'],
    icon: '🎭',
  },
  {
    id: 'markdown2pdf',
    name: 'Markdown2PDF',
    description: 'Document generation',
    status: 'connected',
    tools: ['convert_markdown', 'add_watermark', 'set_style'],
    icon: '📄',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Deployment management',
    status: 'disconnected',
    tools: ['deploy', 'list_projects', 'set_env', 'rollback'],
    icon: '▲',
  },
];

// ============================================
// FEATURES DATA
// ============================================
export interface Feature {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  demoType?: 'terminal' | 'interactive' | 'visual';
}

export const features: Feature[] = [
  {
    id: 'intake',
    title: 'Intelligent Intake',
    description: 'Drop files, voice notes, or text into the intake folder. AI analyzes, extracts context, and routes to the right place.',
    category: 'Core',
    icon: '📥',
    demoType: 'interactive',
  },
  {
    id: 'context',
    title: 'Living Context',
    description: 'Auto-generated understanding files that update as new information arrives. Never lose context again.',
    category: 'Core',
    icon: '🧠',
    demoType: 'visual',
  },
  {
    id: 'commands',
    title: 'Slash Commands',
    description: '25+ built-in commands for instant actions. Create custom commands for your specific workflows.',
    category: 'Automation',
    icon: '⌨️',
    demoType: 'terminal',
  },
  {
    id: 'entities',
    title: 'Entity System',
    description: 'Track clients, partners, and vendors with intelligent cross-references and automated updates.',
    category: 'Organization',
    icon: '👥',
    demoType: 'interactive',
  },
  {
    id: 'timesheet',
    title: 'Auto Time Tracking',
    description: 'Every session automatically logged. 15-minute billing blocks. Export to Notion or CRM.',
    category: 'Automation',
    icon: '⏱️',
    demoType: 'terminal',
  },
  {
    id: 'mcp',
    title: 'MCP Integration',
    description: 'Connect to external tools via Model Context Protocol. Notion, GitHub, CRM, and more.',
    category: 'Integration',
    icon: '🔌',
    demoType: 'interactive',
  },
  {
    id: 'versioning',
    title: 'Version Control',
    description: 'Snapshot your entire brain. Rollback anytime. Full history with changelogs.',
    category: 'System',
    icon: '📸',
    demoType: 'terminal',
  },
  {
    id: 'contracts',
    title: 'Contract Generation',
    description: 'Generate MSAs, SOWs, and NDAs from templates. Auto-populate client data. PDF output.',
    category: 'Automation',
    icon: '📝',
    demoType: 'terminal',
  },
  {
    id: 'content',
    title: 'Content Factory',
    description: 'Auto-generate tutorials and tips from your development work. Build in public, effortlessly.',
    category: 'Automation',
    icon: '🏭',
  },
  {
    id: 'subagents',
    title: 'AI Subagents',
    description: 'Specialized AI agents for specific tasks. Project architect, contract generator, briefing agent.',
    category: 'AI',
    icon: '🤖',
  },
  {
    id: 'network',
    title: 'Network Access',
    description: 'Access your brain from any device. Web GUI, file share, mobile apps.',
    category: 'System',
    icon: '🌐',
  },
  {
    id: 'crossplatform',
    title: 'Cross-Platform',
    description: 'Works on Windows, Mac, and Linux. One-command setup. Portable secrets.',
    category: 'System',
    icon: '💻',
  },
];

// ============================================
// STATS DATA
// ============================================
export const stats = [
  { label: 'Commands Available', value: 25, suffix: '+' },
  { label: 'Hours Saved/Month', value: 40, suffix: '+' },
  { label: 'MCP Integrations', value: 19, suffix: '' },
  { label: 'Auto-Updated Files', value: 100, suffix: '+' },
];

// ============================================
// TESTIMONIALS
// ============================================
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "The Business Brain transformed how I run my agency. Context that used to take hours to rebuild is now instant.",
    author: "Sarah Chen",
    role: "Agency Owner",
    company: "Digital Forward",
  },
  {
    quote: "I dropped a voice note and watched it automatically update my project docs, todo lists, and client files. Magic.",
    author: "Marcus Johnson",
    role: "Freelance Developer",
    company: "Independent",
  },
  {
    quote: "We've integrated the Business Brain across our entire team. Onboarding new devs went from 2 weeks to 2 days.",
    author: "Emily Rodriguez",
    role: "CTO",
    company: "TechStart Labs",
  },
];

// ============================================
// PRICING DATA
// ============================================
export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Perfect for learning the basics',
    features: [
      'Core folder structure',
      '10 slash commands',
      'Basic intake processing',
      'Community support',
    ],
    cta: 'Get Started',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'For serious solopreneurs',
    features: [
      'Everything in Starter',
      '25+ slash commands',
      'Full MCP integration',
      'Auto time tracking',
      'Contract generation',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For teams and agencies',
    features: [
      'Everything in Pro',
      'Multi-user support',
      'Custom subagents',
      'White-label option',
      'Dedicated support',
      'Training included',
    ],
    cta: 'Contact Sales',
  },
];
