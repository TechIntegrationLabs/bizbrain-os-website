'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Terminal,
  Upload,
  Network,
  Users,
  Clock,
  Server,
  Sparkles,
  ChevronRight,
  Grid3X3,
  List,
  ArrowLeft,
  FileText,
  GitBranch,
} from 'lucide-react';
import Link from 'next/link';

import { TerminalPlayground } from '@/components/demos/TerminalPlayground';
import { IntakeProcessor } from '@/components/demos/IntakeProcessor';
import { ContextGraph } from '@/components/demos/ContextGraph';
import { EntityDashboard } from '@/components/demos/EntityDashboard';
import { TimeTracker } from '@/components/demos/TimeTracker';
import { MCPPanel } from '@/components/demos/MCPPanel';
import { DocumentGenerator } from '@/components/demos/DocumentGenerator';
import { VersionTimeline } from '@/components/demos/VersionTimeline';

import { staggerContainer, staggerItem } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface Demo {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  component: React.ReactNode;
  tags: string[];
}

const demos: Demo[] = [
  {
    id: 'terminal',
    name: 'Terminal Playground',
    description: 'Try 25+ slash commands with real output simulation',
    icon: Terminal,
    color: '#06b6d4',
    component: <TerminalPlayground />,
    tags: ['Commands', 'Interactive', 'CLI'],
  },
  {
    id: 'intake',
    name: 'Intake Processor',
    description: 'Drag and drop files to see intelligent routing in action',
    icon: Upload,
    color: '#10b981',
    component: <IntakeProcessor />,
    tags: ['Files', 'Routing', 'Context'],
  },
  {
    id: 'graph',
    name: 'Context Graph',
    description: 'Explore the interconnected knowledge structure',
    icon: Network,
    color: '#8b5cf6',
    component: <ContextGraph />,
    tags: ['Visualization', 'D3', 'Knowledge'],
  },
  {
    id: 'entities',
    name: 'Entity Dashboard',
    description: 'Manage clients, partners, and vendors in one place',
    icon: Users,
    color: '#f59e0b',
    component: <EntityDashboard />,
    tags: ['CRM', 'Management', 'Dashboard'],
  },
  {
    id: 'time',
    name: 'Time Tracker',
    description: 'Automatic time tracking with billing calculations',
    icon: Clock,
    color: '#ec4899',
    component: <TimeTracker />,
    tags: ['Tracking', 'Billing', 'Sessions'],
  },
  {
    id: 'mcp',
    name: 'MCP Panel',
    description: 'View and manage Model Context Protocol servers',
    icon: Server,
    color: '#a855f7',
    component: <MCPPanel />,
    tags: ['Integrations', 'Tools', 'API'],
  },
  {
    id: 'docs',
    name: 'Document Generator',
    description: 'Create professional documents with live preview',
    icon: FileText,
    color: '#f97316',
    component: <DocumentGenerator />,
    tags: ['Templates', 'PDF', 'Markdown'],
  },
  {
    id: 'versions',
    name: 'Version Timeline',
    description: 'Browse git history with visual diff and rollback',
    icon: GitBranch,
    color: '#14b8a6',
    component: <VersionTimeline />,
    tags: ['Git', 'History', 'Snapshots'],
  },
];

export default function DemosPage() {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const activeDemo = demos.find((d) => d.id === selectedDemo);

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
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-white">Interactive Demos</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 rounded transition-colors',
                    viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/40'
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 rounded transition-colors',
                    viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/40'
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {selectedDemo && (
                <button
                  onClick={() => setSelectedDemo(null)}
                  className="px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors text-sm"
                >
                  View All
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {!selectedDemo ? (
          <>
            {/* Hero */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Experience the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                  Business Brain
                </span>
              </h1>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Explore fully functional demos of every major feature. Click any demo to try it yourself.
              </p>
            </div>

            {/* Demo Grid/List */}
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              animate="visible"
              className={cn(
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              )}
            >
              {demos.map((demo) => {
                const Icon = demo.icon as React.FC<{ className?: string; style?: React.CSSProperties }>;
                return (
                  <motion.div
                    key={demo.id}
                    variants={staggerItem}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedDemo(demo.id)}
                    className={cn(
                      'group cursor-pointer rounded-2xl border border-white/10 bg-surface/50 overflow-hidden hover:border-white/20 transition-all',
                      viewMode === 'list' && 'flex items-center'
                    )}
                  >
                    {/* Preview Area */}
                    <div
                      className={cn(
                        'relative overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent',
                        viewMode === 'grid' ? 'h-48' : 'w-48 h-32 flex-shrink-0'
                      )}
                    >
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          background: `radial-gradient(circle at center, ${demo.color} 0%, transparent 70%)`,
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-20 h-20 rounded-2xl flex items-center justify-center"
                          style={{ backgroundColor: `${demo.color}20` }}
                        >
                          <Icon className="w-10 h-10" style={{ color: demo.color }} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={cn('p-6', viewMode === 'list' && 'flex-1 flex items-center justify-between')}>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                            {demo.name}
                          </h3>
                          <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-sm text-white/60 mb-4">{demo.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {demo.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded text-xs bg-white/5 text-white/40"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {viewMode === 'list' && (
                        <button
                          className="px-4 py-2 rounded-lg text-sm transition-colors"
                          style={{
                            backgroundColor: `${demo.color}20`,
                            color: demo.color,
                          }}
                        >
                          Try Demo
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </>
        ) : (
          /* Selected Demo View */
          <div>
            {activeDemo && (
              <>
                {/* Demo Header */}
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => setSelectedDemo(null)}
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${activeDemo.color}20` }}
                    >
                      {(() => {
                        const ActiveIcon = activeDemo.icon as React.FC<{ className?: string; style?: React.CSSProperties }>;
                        return <ActiveIcon className="w-6 h-6" style={{ color: activeDemo.color }} />;
                      })()}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{activeDemo.name}</h2>
                      <p className="text-white/60">{activeDemo.description}</p>
                    </div>
                  </div>
                </div>

                {/* Demo Component */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeDemo.component}
                </motion.div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/10">
                  {(() => {
                    const currentIndex = demos.findIndex((d) => d.id === selectedDemo);
                    const prevDemo = demos[currentIndex - 1];
                    const nextDemo = demos[currentIndex + 1];

                    return (
                      <>
                        {prevDemo ? (
                          <button
                            onClick={() => setSelectedDemo(prevDemo.id)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            {prevDemo.name}
                          </button>
                        ) : (
                          <div />
                        )}

                        {nextDemo && (
                          <button
                            onClick={() => setSelectedDemo(nextDemo.id)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                          >
                            {nextDemo.name}
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        )}
                      </>
                    );
                  })()}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
