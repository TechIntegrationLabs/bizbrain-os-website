'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Folder, FolderOpen, FileText, File, Mic, Users, DollarSign, Settings } from 'lucide-react';

interface TreeNode {
  name: string;
  type: 'folder' | 'file';
  icon?: React.ElementType;
  color?: string;
  tooltip?: string;
  children?: TreeNode[];
}

const folderStructure: TreeNode[] = [
  {
    name: '_intake-dump',
    type: 'folder',
    tooltip: 'Drop any file here. The system will analyze and route it automatically.',
    color: 'text-cyan-400',
    children: [
      { name: 'voice-note-dec-15.txt', type: 'file', icon: Mic, color: 'text-cyan-400' }
    ]
  },
  {
    name: 'Projects',
    type: 'folder',
    color: 'text-emerald-400',
    children: [
      {
        name: 'BuildTrack',
        type: 'folder',
        children: [
          { name: '_context', type: 'folder', tooltip: 'Auto-generated understanding', color: 'text-amber-400' },
          { name: '_pulse', type: 'folder', tooltip: 'Live status dashboard', color: 'text-rose-400' },
          { name: 'client-docs', type: 'folder', tooltip: 'Ready to share with clients' }
        ]
      },
      { name: 'Perdia-v5', type: 'folder' }
    ]
  },
  {
    name: 'Clients',
    type: 'folder',
    icon: Users,
    color: 'text-amber-400',
    children: [
      {
        name: 'GetEducated',
        type: 'folder',
        children: [
          { name: 'README.md', type: 'file', icon: FileText },
          { name: '_meta.json', type: 'file' },
          { name: '_context', type: 'folder' }
        ]
      },
      { name: 'Tim-BuildTrack', type: 'folder' }
    ]
  },
  {
    name: 'Finance',
    type: 'folder',
    icon: DollarSign,
    color: 'text-emerald-400',
    children: [
      { name: 'income', type: 'folder' },
      { name: 'expenses', type: 'folder' }
    ]
  },
  {
    name: 'Operations',
    type: 'folder',
    icon: Settings,
    color: 'text-white/60',
    children: [
      { name: 'timesheet-system', type: 'folder' },
      { name: 'dev-config-system', type: 'folder' }
    ]
  }
];

interface FolderNodeProps {
  node: TreeNode;
  depth: number;
}

const FolderNode: React.FC<FolderNodeProps> = ({ node, depth }) => {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const [showTooltip, setShowTooltip] = useState(false);

  const Icon = (node.type === 'folder'
    ? (isOpen ? FolderOpen : (node.icon || Folder))
    : (node.icon || File)) as React.FC<{ className?: string; style?: React.CSSProperties }>;

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <motion.div
        className={`flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer relative group ${
          node.type === 'folder' ? 'hover:bg-white/5' : 'hover:bg-cyan-500/10'
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => node.type === 'folder' && setIsOpen(!isOpen)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ x: 2 }}
        transition={{ duration: 0.15 }}
      >
        {/* Expand Arrow */}
        {hasChildren && (
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-white/40"
          >
            <ChevronRight className="w-3 h-3" />
          </motion.div>
        )}
        {!hasChildren && <div className="w-3" />}

        {/* Icon */}
        <Icon className={`w-4 h-4 ${node.color || 'text-white/60'}`} />

        {/* Name */}
        <span className={`text-sm ${node.type === 'folder' ? 'text-white/80' : 'text-white/60'}`}>
          {node.name}
        </span>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && node.tooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute left-full ml-4 px-3 py-2 bg-surface-light border border-white/10 rounded-lg text-xs text-white/70 whitespace-nowrap z-50"
            >
              {node.tooltip}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Children */}
      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {node.children!.map((child, index) => (
              <FolderNode key={index} node={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FolderExplorer: React.FC = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-surface/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Structure That{' '}
            <span className="gradient-text">Makes Sense</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Every piece of information has a home. Hover over folders to learn what they do.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="terminal">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500" />
              <div className="terminal-dot bg-yellow-500" />
              <div className="terminal-dot bg-green-500" />
              <span className="text-white/40 text-sm ml-4 font-mono">Tech Integration Labs BB1/</span>
            </div>

            <div className="p-4 font-mono text-sm max-h-96 overflow-y-auto">
              {folderStructure.map((node, index) => (
                <FolderNode key={index} node={node} depth={0} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FolderExplorer;
