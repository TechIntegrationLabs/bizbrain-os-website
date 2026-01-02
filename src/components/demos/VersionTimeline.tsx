'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitBranch,
  GitCommit,
  Tag,
  Clock,
  User,
  FileText,
  Plus,
  Minus,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Check,
  Copy,
  Filter,
} from 'lucide-react';

import { cn } from '@/lib/utils';

interface Commit {
  id: string;
  hash: string;
  message: string;
  description?: string;
  author: string;
  date: string;
  timestamp: number;
  type: 'feature' | 'fix' | 'refactor' | 'docs' | 'chore' | 'release';
  tag?: string;
  files: {
    name: string;
    additions: number;
    deletions: number;
  }[];
  isCurrent?: boolean;
}

// Sample commit history
const commits: Commit[] = [
  {
    id: '1',
    hash: '05a4825',
    message: 'Add interactive demos and component library',
    description: 'Major feature update with 6 new demo components for website showcase',
    author: 'Claude',
    date: '2 hours ago',
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    type: 'feature',
    isCurrent: true,
    files: [
      { name: 'ContextGraph.tsx', additions: 420, deletions: 0 },
      { name: 'EntityDashboard.tsx', additions: 380, deletions: 0 },
      { name: 'TimeTracker.tsx', additions: 295, deletions: 0 },
      { name: 'MCPPanel.tsx', additions: 310, deletions: 0 },
    ],
  },
  {
    id: '2',
    hash: '9f3b2c1',
    message: 'v1.8.0 - Entity System & Content Factory',
    author: 'Will',
    date: 'Yesterday',
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    type: 'release',
    tag: 'v1.8.0',
    files: [
      { name: 'CHANGELOG.md', additions: 45, deletions: 2 },
      { name: 'VERSION.json', additions: 12, deletions: 8 },
      { name: 'entity-system.ts', additions: 280, deletions: 45 },
    ],
  },
  {
    id: '3',
    hash: '7d8e4f2',
    message: 'Implement auto-content generation from dev work',
    author: 'Claude',
    date: '2 days ago',
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
    type: 'feature',
    files: [
      { name: 'content-factory.ts', additions: 156, deletions: 0 },
      { name: 'tutorial-generator.ts', additions: 89, deletions: 0 },
    ],
  },
  {
    id: '4',
    hash: '3a1b5c9',
    message: 'Fix timesheet calculation for overlapping sessions',
    author: 'Will',
    date: '3 days ago',
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
    type: 'fix',
    files: [
      { name: 'timesheet-calculator.ts', additions: 23, deletions: 15 },
      { name: 'session-merger.ts', additions: 45, deletions: 32 },
    ],
  },
  {
    id: '5',
    hash: '8c2d6e7',
    message: 'Refactor intake processor for better performance',
    author: 'Claude',
    date: '4 days ago',
    timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
    type: 'refactor',
    files: [
      { name: 'intake-processor.ts', additions: 67, deletions: 112 },
      { name: 'router.ts', additions: 34, deletions: 45 },
    ],
  },
  {
    id: '6',
    hash: '1f4a9b3',
    message: 'Update documentation for new slash commands',
    author: 'Will',
    date: '5 days ago',
    timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
    type: 'docs',
    files: [
      { name: 'CLAUDE.md', additions: 89, deletions: 12 },
      { name: 'README.md', additions: 34, deletions: 8 },
    ],
  },
  {
    id: '7',
    hash: '6e8c2d1',
    message: 'v1.7.0 - Cross-platform portability',
    author: 'Will',
    date: '1 week ago',
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
    type: 'release',
    tag: 'v1.7.0',
    files: [
      { name: 'setup-mac.sh', additions: 156, deletions: 0 },
      { name: 'launch-gui.sh', additions: 45, deletions: 0 },
      { name: 'MAC-SETUP.md', additions: 234, deletions: 0 },
    ],
  },
];

const typeColors: Record<string, { bg: string; text: string; label: string }> = {
  feature: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Feature' },
  fix: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Fix' },
  refactor: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Refactor' },
  docs: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Docs' },
  chore: { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'Chore' },
  release: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', label: 'Release' },
};

export function VersionTimeline() {
  const [expandedCommit, setExpandedCommit] = useState<string | null>('1');
  const [selectedCommit, setSelectedCommit] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [showRollbackConfirm, setShowRollbackConfirm] = useState<string | null>(null);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleRollback = (commitId: string) => {
    setShowRollbackConfirm(null);
    // Simulate rollback action
    setSelectedCommit(commitId);
    setTimeout(() => setSelectedCommit(null), 2000);
  };

  const filteredCommits = filterType
    ? commits.filter(c => c.type === filterType)
    : commits;

  return (
    <div className="rounded-2xl border border-white/10 bg-surface/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <GitBranch className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Version Timeline</h3>
            <p className="text-xs text-white/40">main branch • {commits.length} commits</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/40" />
          <select
            value={filterType || ''}
            onChange={(e) => setFilterType(e.target.value || null)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500/50"
          >
            <option value="">All types</option>
            {Object.entries(typeColors).map(([type, { label }]) => (
              <option key={type} value={type}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative max-h-[500px] overflow-auto">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />

        <div className="p-4 space-y-2">
          {filteredCommits.map((commit, index) => {
            const typeStyle = typeColors[commit.type];
            const isExpanded = expandedCommit === commit.id;
            const isSelected = selectedCommit === commit.id;

            return (
              <motion.div
                key={commit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  'relative pl-12 transition-colors',
                  isSelected && 'bg-cyan-500/10 rounded-xl'
                )}
              >
                {/* Node */}
                <div className={cn(
                  'absolute left-[22px] w-4 h-4 rounded-full border-2 border-surface z-10',
                  commit.tag ? 'bg-cyan-500' : 'bg-white/20',
                  commit.isCurrent && 'ring-2 ring-cyan-500/50'
                )}>
                  {commit.tag && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full" />
                  )}
                </div>

                {/* Commit Card */}
                <div
                  className={cn(
                    'group rounded-xl border transition-all cursor-pointer',
                    isExpanded
                      ? 'border-white/20 bg-white/[0.03]'
                      : 'border-transparent hover:border-white/10 hover:bg-white/[0.02]'
                  )}
                  onClick={() => setExpandedCommit(isExpanded ? null : commit.id)}
                >
                  <div className="p-3">
                    {/* Main row */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {commit.tag && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs">
                              <Tag className="w-3 h-3" />
                              {commit.tag}
                            </span>
                          )}
                          <span className={cn(
                            'px-2 py-0.5 rounded-full text-xs',
                            typeStyle.bg,
                            typeStyle.text
                          )}>
                            {typeStyle.label}
                          </span>
                          {commit.isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">
                              HEAD
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-white font-medium truncate">
                          {commit.message}
                        </p>

                        <div className="flex items-center gap-3 mt-1.5 text-xs text-white/40">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {commit.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {commit.date}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyHash(commit.hash);
                            }}
                            className="flex items-center gap-1 font-mono hover:text-white transition-colors"
                          >
                            {copiedHash === commit.hash ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            {commit.hash}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* File stats */}
                        <div className="flex items-center gap-2 text-xs">
                          <span className="flex items-center gap-1 text-emerald-400">
                            <Plus className="w-3 h-3" />
                            {commit.files.reduce((sum, f) => sum + f.additions, 0)}
                          </span>
                          <span className="flex items-center gap-1 text-red-400">
                            <Minus className="w-3 h-3" />
                            {commit.files.reduce((sum, f) => sum + f.deletions, 0)}
                          </span>
                        </div>

                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          className="text-white/40"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-white/10">
                            {commit.description && (
                              <p className="text-sm text-white/60 mb-4">
                                {commit.description}
                              </p>
                            )}

                            {/* Changed files */}
                            <div className="space-y-2 mb-4">
                              <p className="text-xs text-white/40 font-medium">
                                {commit.files.length} files changed
                              </p>
                              {commit.files.map((file, i) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.03]"
                                >
                                  <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-white/40" />
                                    <span className="text-sm text-white/80 font-mono">
                                      {file.name}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs font-mono">
                                    <span className="text-emerald-400">+{file.additions}</span>
                                    <span className="text-red-400">-{file.deletions}</span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyHash(commit.hash);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-white/5 text-white/60 hover:text-white text-xs transition-colors flex items-center gap-1"
                              >
                                <GitCommit className="w-3 h-3" />
                                View Diff
                              </button>

                              {!commit.isCurrent && (
                                <div className="relative">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowRollbackConfirm(commit.id);
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 text-xs transition-colors flex items-center gap-1"
                                  >
                                    <RotateCcw className="w-3 h-3" />
                                    Rollback
                                  </button>

                                  <AnimatePresence>
                                    {showRollbackConfirm === commit.id && (
                                      <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="absolute top-full left-0 mt-2 p-3 rounded-lg bg-surface border border-white/10 shadow-xl z-20 w-64"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <p className="text-sm text-white mb-3">
                                          Rollback to <span className="font-mono text-cyan-400">{commit.hash}</span>?
                                        </p>
                                        <div className="flex gap-2">
                                          <button
                                            onClick={() => handleRollback(commit.id)}
                                            className="flex-1 px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-medium hover:bg-amber-600 transition-colors"
                                          >
                                            Confirm
                                          </button>
                                          <button
                                            onClick={() => setShowRollbackConfirm(null)}
                                            className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-xs hover:bg-white/10 transition-colors"
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              )}

                              {commit.tag && (
                                <button
                                  onClick={(e) => e.stopPropagation()}
                                  className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 text-xs transition-colors flex items-center gap-1"
                                >
                                  <Tag className="w-3 h-3" />
                                  View Release
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-between p-4 border-t border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-6 text-xs text-white/40">
          <span className="flex items-center gap-1">
            <GitCommit className="w-4 h-4" />
            {commits.length} commits
          </span>
          <span className="flex items-center gap-1">
            <Tag className="w-4 h-4" />
            {commits.filter(c => c.tag).length} releases
          </span>
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            2 contributors
          </span>
        </div>

        <button className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
          View all history
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export default VersionTimeline;
