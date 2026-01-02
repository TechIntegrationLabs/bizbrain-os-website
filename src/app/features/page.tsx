'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Filter,
  Mic,
  Brain,
  Users,
  FolderKanban,
  Clock,
  Server,
  FileText,
  GitBranch,
  Factory,
  FileSignature,
  KeyRound,
  Wifi,
  Terminal,
  Inbox,
  Zap,
  Shield,
  BarChart3,
  Workflow,
  MessagesSquare,
  Globe,
  Sparkles,
  ChevronRight,
  Check,
  X,
} from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface Feature {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  category: 'core' | 'automation' | 'integration' | 'management';
  capabilities: string[];
  demoId?: string;
}

const features: Feature[] = [
  {
    id: 'voice',
    name: 'Voice Processing',
    description: 'Drop voice notes into your Business Brain and watch them transform into structured, actionable context.',
    icon: Mic,
    color: '#06b6d4',
    category: 'core',
    demoId: 'intake',
    capabilities: [
      'Automatic transcription',
      'Entity extraction (people, projects, dates)',
      'Todo detection',
      'Decision capture',
      'Smart routing to relevant folders',
    ],
  },
  {
    id: 'context',
    name: 'Context Engine',
    description: 'Living documentation that grows with your business. Every piece of information feeds the system.',
    icon: Brain,
    color: '#10b981',
    category: 'core',
    demoId: 'graph',
    capabilities: [
      'Auto-updating context files',
      'Cross-project references',
      'Intelligent summarization',
      'Decision history',
      'Relationship mapping',
    ],
  },
  {
    id: 'entities',
    name: 'Entity System',
    description: 'Unified management of clients, partners, and vendors with full history and context.',
    icon: Users,
    color: '#f59e0b',
    category: 'core',
    demoId: 'entities',
    capabilities: [
      'Client/Partner/Vendor tracking',
      'Revenue attribution',
      'Relationship context',
      'Communication history',
      'Cross-reference with projects',
    ],
  },
  {
    id: 'projects',
    name: 'Project Management',
    description: 'Git worktrees meet AI assistance. Switch contexts instantly with full understanding.',
    icon: FolderKanban,
    color: '#8b5cf6',
    category: 'management',
    capabilities: [
      'Instant context switching',
      'Parallel branch development',
      'Auto-context loading',
      'Project health tracking',
      'Milestone management',
    ],
  },
  {
    id: 'time',
    name: 'Time Tracking',
    description: 'Automatic, invisible, accurate. Every Claude interaction logged and billable.',
    icon: Clock,
    color: '#ec4899',
    category: 'core',
    demoId: 'time',
    capabilities: [
      'Automatic session logging',
      '15-minute billing blocks',
      'Project attribution',
      'CRM sync (GoHighLevel)',
      'Notion reporting',
    ],
  },
  {
    id: 'mcp',
    name: 'MCP Integration',
    description: 'Connect any tool via Model Context Protocol. 19+ servers ready to use.',
    icon: Server,
    color: '#a855f7',
    category: 'integration',
    demoId: 'mcp',
    capabilities: [
      'Notion integration',
      'GoHighLevel CRM',
      'Gmail access',
      'Calendar management',
      'Custom tool building',
    ],
  },
  {
    id: 'documents',
    name: 'Document Generation',
    description: 'Professional PDFs from markdown in seconds. Templates with variable interpolation.',
    icon: FileText,
    color: '#f97316',
    category: 'automation',
    demoId: 'docs',
    capabilities: [
      'Proposal templates',
      'Contract generation',
      'Status reports',
      'Invoice creation',
      'Custom styling',
    ],
  },
  {
    id: 'versioning',
    name: 'Version Control',
    description: 'Git-based versioning for your entire Business Brain. Never lose anything.',
    icon: GitBranch,
    color: '#14b8a6',
    category: 'core',
    demoId: 'versions',
    capabilities: [
      'Semantic versioning',
      'Instant snapshots',
      'Diff comparison',
      'One-click rollback',
      'Full history',
    ],
  },
  {
    id: 'content',
    name: 'Content Factory',
    description: 'Turn development work into content. Reels, tutorials, threads - automatically.',
    icon: Factory,
    color: '#eab308',
    category: 'automation',
    capabilities: [
      'Instagram reel scripts',
      'YouTube tutorials',
      'Twitter threads',
      'Build log documentation',
      'Multi-platform output',
    ],
  },
  {
    id: 'contracts',
    name: 'Contract System',
    description: 'MSA, SOW, NDA templates with intelligent clause selection.',
    icon: FileSignature,
    color: '#0ea5e9',
    category: 'management',
    capabilities: [
      '7 contract templates',
      'Auto-fill from context',
      'Clause library',
      'Version tracking',
      'PDF export',
    ],
  },
  {
    id: 'devconfig',
    name: 'Dev Config System',
    description: 'Centralized, encrypted credential management with web GUI.',
    icon: KeyRound,
    color: '#ef4444',
    category: 'integration',
    capabilities: [
      'Encrypted storage',
      'Web dashboard',
      'Project sync',
      'IDE setup generator',
      'SSH key management',
    ],
  },
  {
    id: 'network',
    name: 'Network Access',
    description: 'Access your Business Brain from any device on your network.',
    icon: Wifi,
    color: '#22c55e',
    category: 'integration',
    capabilities: [
      'SMB file share',
      'Web GUI dashboard',
      'Mobile access',
      'Multi-device sync',
      'Remote operations',
    ],
  },
  {
    id: 'terminal',
    name: 'Slash Commands',
    description: '25+ powerful commands for every operation you need.',
    icon: Terminal,
    color: '#06b6d4',
    category: 'core',
    demoId: 'terminal',
    capabilities: [
      '/intake processing',
      '/snapshot versioning',
      '/brief generation',
      '/status dashboard',
      'Custom commands',
    ],
  },
  {
    id: 'automation',
    name: 'Task Automation',
    description: 'Specialized AI agents that handle complex workflows.',
    icon: Zap,
    color: '#f59e0b',
    category: 'automation',
    capabilities: [
      '12+ subagents',
      'Background processing',
      'Chained workflows',
      'Event triggers',
      'Custom agents',
    ],
  },
  {
    id: 'security',
    name: 'Vault System',
    description: 'Private folders that never appear in generated content.',
    icon: Shield,
    color: '#ef4444',
    category: 'management',
    capabilities: [
      'Auto-redaction',
      'Access control',
      'Audit logs',
      'Encryption at rest',
      'Secure sharing',
    ],
  },
  {
    id: 'metrics',
    name: 'Business Metrics',
    description: 'Real-time dashboards for project health, revenue, and more.',
    icon: BarChart3,
    color: '#0ea5e9',
    category: 'management',
    capabilities: [
      'Live dashboards',
      'Revenue tracking',
      'Health scores',
      'Time analytics',
      'Custom reports',
    ],
  },
];

const categories = [
  { id: 'all', name: 'All Features', icon: Sparkles },
  { id: 'core', name: 'Core', icon: Brain },
  { id: 'automation', name: 'Automation', icon: Zap },
  { id: 'integration', name: 'Integration', icon: Server },
  { id: 'management', name: 'Management', icon: FolderKanban },
];

export default function FeaturesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  const filteredFeatures = features.filter(f => {
    const matchesCategory = selectedCategory === 'all' || f.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-surface/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
              <div className="w-px h-6 bg-white/10" />
              <h1 className="font-semibold text-white">Features</h1>
            </div>

            <Link
              href="/demos"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm hover:bg-cyan-500/20 transition-colors"
            >
              Try Demos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-medium">{features.length} Integrated Features</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Everything in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              One System
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            A complete operating system for your business. Each feature designed to work seamlessly with the others.
          </motion.p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search features..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    selectedCategory === cat.id
                      ? 'bg-cyan-500 text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredFeatures.map((feature) => {
              const Icon = feature.icon;
              const isExpanded = expandedFeature === feature.id;

              return (
                <motion.div
                  key={feature.id}
                  variants={staggerItem}
                  layout
                  className={cn(
                    'group rounded-2xl border border-white/10 bg-surface/50 overflow-hidden hover:border-white/20 transition-all',
                    isExpanded && 'md:col-span-2 lg:col-span-2'
                  )}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${feature.color}20` }}
                      >
                        <Icon className="w-7 h-7" style={{ color: feature.color }} />
                      </div>

                      {feature.demoId && (
                        <Link
                          href={`/demos?demo=${feature.demoId}`}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors"
                          style={{
                            backgroundColor: `${feature.color}20`,
                            color: feature.color,
                          }}
                        >
                          Demo
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.name}
                    </h3>
                    <p className="text-white/60 mb-4">
                      {feature.description}
                    </p>

                    {/* Capabilities */}
                    <div className="space-y-2">
                      {feature.capabilities.slice(0, isExpanded ? undefined : 3).map((cap, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          {cap}
                        </div>
                      ))}
                    </div>

                    {feature.capabilities.length > 3 && (
                      <button
                        onClick={() => setExpandedFeature(isExpanded ? null : feature.id)}
                        className="mt-4 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        {isExpanded ? 'Show less' : `+${feature.capabilities.length - 3} more capabilities`}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredFeatures.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/40">No features match your search.</p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            View Pricing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
