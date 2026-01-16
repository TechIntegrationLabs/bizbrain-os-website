'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
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
  Search,
  Zap,
  Shield,
  BarChart3,
  Workflow,
  MessagesSquare,
  Globe,
  Sparkles,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface Feature {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  icon: React.ElementType;
  color: string;
  category: 'core' | 'automation' | 'integration' | 'management';
  demoId?: string;
  highlights: string[];
}

const features: Feature[] = [
  // Core Features
  {
    id: 'voice',
    name: 'Voice Processing',
    shortDesc: 'Drop voice notes, get structured context',
    longDesc: 'Transcribe voice notes automatically and extract actionable context - todos, decisions, mentions, and more.',
    icon: Mic,
    color: '#06b6d4',
    category: 'core',
    demoId: 'intake',
    highlights: ['Auto-transcription', 'Entity extraction', 'Smart routing'],
  },
  {
    id: 'context',
    name: 'Context Engine',
    shortDesc: 'AI-powered understanding that grows',
    longDesc: 'Every piece of information feeds into living context files that auto-update as your business evolves.',
    icon: Brain,
    color: '#10b981',
    category: 'core',
    demoId: 'graph',
    highlights: ['Living documentation', 'Cross-references', 'Auto-updates'],
  },
  {
    id: 'entities',
    name: 'Entity System',
    shortDesc: 'Clients, partners, vendors - unified',
    longDesc: 'Track all business relationships in one place with full history, context, and intelligent cross-referencing.',
    icon: Users,
    color: '#f59e0b',
    category: 'core',
    demoId: 'entities',
    highlights: ['CRM integration', 'Relationship tracking', 'Revenue attribution'],
  },
  {
    id: 'projects',
    name: 'Project Management',
    shortDesc: 'Git worktrees meet AI assistance',
    longDesc: 'Switch between projects instantly with full context loading. Work on multiple branches simultaneously.',
    icon: FolderKanban,
    color: '#8b5cf6',
    category: 'management',
    highlights: ['Worktree management', 'Context switching', 'Parallel development'],
  },
  {
    id: 'time',
    name: 'Time Tracking',
    shortDesc: 'Automatic, invisible, accurate',
    longDesc: 'Every Claude interaction is logged. 15-minute billing blocks calculated automatically across projects.',
    icon: Clock,
    color: '#ec4899',
    category: 'core',
    demoId: 'time',
    highlights: ['Auto-logging', 'Billing calculation', 'CRM sync'],
  },
  {
    id: 'mcp',
    name: 'MCP Integration',
    shortDesc: 'Connect any tool via Model Context Protocol',
    longDesc: 'Notion, GoHighLevel, Gmail, Calendar - seamlessly integrated through standardized MCP servers.',
    icon: Server,
    color: '#a855f7',
    category: 'integration',
    demoId: 'mcp',
    highlights: ['19+ servers', 'Hot-swappable', 'Custom tools'],
  },
  {
    id: 'documents',
    name: 'Document Generation',
    shortDesc: 'Markdown to polished PDF instantly',
    longDesc: 'Generate contracts, proposals, reports with variable interpolation and professional styling.',
    icon: FileText,
    color: '#f97316',
    category: 'automation',
    demoId: 'docs',
    highlights: ['Template system', 'PDF export', 'Custom styling'],
  },
  {
    id: 'versioning',
    name: 'Version Control',
    shortDesc: 'Snapshot, compare, rollback anything',
    longDesc: 'Git-based versioning for your entire Business Brain. Never lose a decision or document again.',
    icon: GitBranch,
    color: '#14b8a6',
    category: 'core',
    demoId: 'versions',
    highlights: ['Snapshots', 'Diff comparison', 'Instant rollback'],
  },
  {
    id: 'content',
    name: 'Content Factory',
    shortDesc: 'Auto-generate tutorials from dev work',
    longDesc: 'Turn your development sessions into Instagram reels, YouTube tutorials, and Twitter threads automatically.',
    icon: Factory,
    color: '#eab308',
    category: 'automation',
    highlights: ['Reel scripts', 'Tutorial generation', 'Multi-platform'],
  },
  {
    id: 'contracts',
    name: 'Contract System',
    shortDesc: 'Templates, clauses, and negotiations',
    longDesc: 'MSA, SOW, NDA templates with intelligent clause selection and pricing framework integration.',
    icon: FileSignature,
    color: '#0ea5e9',
    category: 'management',
    highlights: ['7 templates', 'Auto-fill', 'Version tracking'],
  },
  {
    id: 'devconfig',
    name: 'Dev Config System',
    shortDesc: 'Encrypted credentials, anywhere',
    longDesc: 'Centralized credential management with web GUI. Sync environments across projects securely.',
    icon: KeyRound,
    color: '#ef4444',
    category: 'integration',
    highlights: ['Encrypted storage', 'Web GUI', 'Project sync'],
  },
  {
    id: 'network',
    name: 'Network Access',
    shortDesc: 'Access your brain from any device',
    longDesc: 'SMB file share and web GUI accessible from any device on your network - phone, tablet, other computers.',
    icon: Wifi,
    color: '#22c55e',
    category: 'integration',
    highlights: ['SMB share', 'Web dashboard', 'Mobile access'],
  },
  // Additional features
  {
    id: 'terminal',
    name: 'Slash Commands',
    shortDesc: '25+ powerful commands at your fingertips',
    longDesc: 'From /intake to /snapshot to /brief - every operation is a simple command away.',
    icon: Terminal,
    color: '#06b6d4',
    category: 'core',
    demoId: 'terminal',
    highlights: ['25+ commands', 'Tab completion', 'Custom commands'],
  },
  {
    id: 'intake',
    name: 'Intake Processing',
    shortDesc: 'Drop anything, get organized context',
    longDesc: 'The central nervous system. Drop files in _intake, get analyzed, routed, and contextualized content.',
    icon: Inbox,
    color: '#10b981',
    category: 'core',
    demoId: 'intake',
    highlights: ['Multi-format', 'Smart routing', 'OCR support'],
  },
  {
    id: 'search',
    name: 'Intelligent Search',
    shortDesc: 'Find anything across all projects',
    longDesc: 'Semantic search that understands context. Find that decision you made 3 months ago in seconds.',
    icon: Search,
    color: '#8b5cf6',
    category: 'core',
    highlights: ['Cross-project', 'Semantic', 'Instant results'],
  },
  {
    id: 'automation',
    name: 'Task Automation',
    shortDesc: 'Subagents that work while you sleep',
    longDesc: 'Specialized AI agents for contracts, intake processing, status reporting, and more.',
    icon: Zap,
    color: '#f59e0b',
    category: 'automation',
    highlights: ['12+ subagents', 'Background tasks', 'Chained workflows'],
  },
  {
    id: 'security',
    name: 'Vault System',
    shortDesc: 'Confidential info stays confidential',
    longDesc: 'Private _vault folders that never appear in generated content or external communications.',
    icon: Shield,
    color: '#ef4444',
    category: 'management',
    highlights: ['Auto-redaction', 'Access control', 'Audit logs'],
  },
  {
    id: 'metrics',
    name: 'Business Metrics',
    shortDesc: 'Real-time pulse on everything',
    longDesc: 'Track project health, revenue attribution, time allocation, and more from one dashboard.',
    icon: BarChart3,
    color: '#0ea5e9',
    category: 'management',
    highlights: ['Live dashboards', 'Revenue tracking', 'Health scores'],
  },
  {
    id: 'workflows',
    name: 'Custom Workflows',
    shortDesc: 'Build your own automation chains',
    longDesc: 'Chain commands, connect MCPs, trigger actions. Build workflows without code.',
    icon: Workflow,
    color: '#a855f7',
    category: 'automation',
    highlights: ['Visual builder', 'Trigger chains', 'Custom logic'],
  },
  {
    id: 'briefings',
    name: 'Auto-Briefings',
    shortDesc: 'Client briefings in one command',
    longDesc: '/brief client-name generates comprehensive briefings with full project context and history.',
    icon: MessagesSquare,
    color: '#ec4899',
    category: 'automation',
    highlights: ['One command', 'Full context', 'PDF ready'],
  },
  {
    id: 'crossplatform',
    name: 'Cross-Platform',
    shortDesc: 'Windows, Mac, Linux - it all works',
    longDesc: 'Portable setup scripts for any platform. Clone once, run anywhere.',
    icon: Globe,
    color: '#14b8a6',
    category: 'integration',
    highlights: ['Mac setup', 'Linux support', 'Portable'],
  },
  {
    id: 'ai',
    name: 'AI-Native Design',
    shortDesc: 'Built for Claude from the ground up',
    longDesc: 'Every folder structure, file format, and convention optimized for AI-assisted operations.',
    icon: Sparkles,
    color: '#06b6d4',
    category: 'core',
    highlights: ['CLAUDE.md everywhere', 'Context-optimized', 'AI-first'],
  },
];

const categories = [
  { id: 'all', name: 'All Features', count: features.length },
  { id: 'core', name: 'Core', count: features.filter(f => f.category === 'core').length },
  { id: 'automation', name: 'Automation', count: features.filter(f => f.category === 'automation').length },
  { id: 'integration', name: 'Integration', count: features.filter(f => f.category === 'integration').length },
  { id: 'management', name: 'Management', count: features.filter(f => f.category === 'management').length },
];

export function FeaturesShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  const filteredFeatures = selectedCategory === 'all'
    ? features
    : features.filter(f => f.category === selectedCategory);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-medium">22 Integrated Features</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Everything You Need,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Nothing You Don&apos;t
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            From voice notes to version control, every system designed to work together seamlessly.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              )}
            >
              {cat.name}
              <span className={cn(
                'ml-2 px-1.5 py-0.5 rounded-full text-xs',
                selectedCategory === cat.id ? 'bg-white/20' : 'bg-white/10'
              )}>
                {cat.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredFeatures.map((feature) => {
              const Icon = feature.icon as React.FC<{ className?: string; style?: React.CSSProperties }>;
              const isExpanded = expandedFeature === feature.id;
              const isHovered = hoveredFeature === feature.id;

              return (
                <motion.div
                  key={feature.id}
                  variants={staggerItem}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -4 }}
                  onHoverStart={() => setHoveredFeature(feature.id)}
                  onHoverEnd={() => setHoveredFeature(null)}
                  onClick={() => setExpandedFeature(isExpanded ? null : feature.id)}
                  className={cn(
                    'group relative rounded-2xl border transition-all cursor-pointer overflow-hidden',
                    isExpanded
                      ? 'border-white/20 bg-white/[0.05] col-span-1 md:col-span-2'
                      : 'border-white/10 bg-surface/50 hover:border-white/20'
                  )}
                >
                  {/* Glow effect */}
                  <div
                    className={cn(
                      'absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none',
                      isHovered && 'opacity-100'
                    )}
                    style={{
                      background: `radial-gradient(circle at center, ${feature.color}15 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${feature.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: feature.color }} />
                      </div>

                      {feature.demoId && (
                        <Link
                          href={`/demos?demo=${feature.demoId}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors"
                          style={{
                            backgroundColor: `${feature.color}20`,
                            color: feature.color,
                          }}
                        >
                          Try Demo
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                      {feature.name}
                    </h3>
                    <p className="text-sm text-white/60 mb-3">
                      {isExpanded ? feature.longDesc : feature.shortDesc}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1.5">
                      {feature.highlights.map((highlight, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-white/40"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-white/10"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-white/40 uppercase tracking-wider">
                              Category: {feature.category}
                            </span>
                            {feature.demoId && (
                              <Link
                                href={`/demos?demo=${feature.demoId}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-2 text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
                              >
                                View Interactive Demo
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/demos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            Explore All Demos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesShowcase;
