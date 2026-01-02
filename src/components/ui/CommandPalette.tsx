'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  FileText,
  Users,
  Clock,
  Settings,
  Briefcase,
  FolderOpen,
  Terminal,
  Zap,
  BookOpen,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { spring, scaleIn } from '@/lib/animations';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  shortcut?: string;
  action?: () => void;
  category: string;
}

const defaultCommands: CommandItem[] = [
  {
    id: 'status',
    label: '/status',
    description: 'View business-wide status dashboard',
    icon: <Zap className="w-4 h-4" />,
    shortcut: '⌘S',
    category: 'Actions',
  },
  {
    id: 'find',
    label: '/find',
    description: 'Search across all projects and entities',
    icon: <Search className="w-4 h-4" />,
    shortcut: '⌘F',
    category: 'Actions',
  },
  {
    id: 'intake',
    label: '/intake',
    description: 'Process files in the intake folder',
    icon: <FolderOpen className="w-4 h-4" />,
    category: 'Actions',
  },
  {
    id: 'brief',
    label: '/brief',
    description: 'Generate comprehensive project briefing',
    icon: <FileText className="w-4 h-4" />,
    category: 'Actions',
  },
  {
    id: 'hours',
    label: '/hours',
    description: 'View timesheet summary',
    icon: <Clock className="w-4 h-4" />,
    category: 'Actions',
  },
  {
    id: 'add-client',
    label: '/add-client',
    description: 'Create new client with full structure',
    icon: <Users className="w-4 h-4" />,
    category: 'Entities',
  },
  {
    id: 'add-partner',
    label: '/add-partner',
    description: 'Create new partner relationship',
    icon: <Briefcase className="w-4 h-4" />,
    category: 'Entities',
  },
  {
    id: 'contractgen',
    label: '/contractgen',
    description: 'Generate contract from template',
    icon: <FileText className="w-4 h-4" />,
    category: 'Generate',
  },
  {
    id: 'snapshot',
    label: '/snapshot',
    description: 'Create versioned backup',
    icon: <Settings className="w-4 h-4" />,
    category: 'System',
  },
  {
    id: 'course',
    label: 'Take the Course',
    description: 'Start learning Business Brain',
    icon: <BookOpen className="w-4 h-4" />,
    category: 'Navigation',
  },
];

interface CommandPaletteProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  commands?: CommandItem[];
  placeholder?: string;
  onSelect?: (command: CommandItem) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen: controlledIsOpen,
  onOpenChange,
  commands = defaultCommands,
  placeholder = 'Type a command or search...',
  onSelect,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  // Keyboard shortcut to open
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, setIsOpen]);

  const handleSelect = useCallback(
    (command: CommandItem) => {
      setIsOpen(false);
      setSearch('');
      onSelect?.(command);
      command.action?.();
    },
    [setIsOpen, onSelect]
  );

  // Group commands by category
  const groupedCommands = commands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = [];
    }
    acc[command.category].push(command);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Command Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={spring.default}
            className="fixed left-1/2 top-[20%] -translate-x-1/2 z-50 w-full max-w-xl"
          >
            <Command
              className="rounded-2xl border border-white/10 bg-surface/95 backdrop-blur-xl shadow-2xl overflow-hidden"
              loop
            >
              {/* Input */}
              <div className="flex items-center gap-3 px-4 border-b border-white/10">
                <Search className="w-5 h-5 text-white/40" />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder={placeholder}
                  className="flex-1 h-14 bg-transparent text-white placeholder:text-white/40 outline-none text-base"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-white/40" />
                </button>
              </div>

              {/* Results */}
              <Command.List className="max-h-[400px] overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-white/40 text-sm">
                  No commands found.
                </Command.Empty>

                {Object.entries(groupedCommands).map(([category, items]) => (
                  <Command.Group
                    key={category}
                    heading={category}
                    className="text-xs text-white/40 px-2 py-2 font-medium uppercase tracking-wider"
                  >
                    {items.map((command) => (
                      <Command.Item
                        key={command.id}
                        value={`${command.label} ${command.description}`}
                        onSelect={() => handleSelect(command)}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer',
                          'text-white/80 hover:text-white',
                          'data-[selected=true]:bg-primary/20 data-[selected=true]:text-white',
                          'transition-colors'
                        )}
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-primary">
                          {command.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium font-mono text-sm">
                            {command.label}
                          </div>
                          {command.description && (
                            <div className="text-xs text-white/40 truncate">
                              {command.description}
                            </div>
                          )}
                        </div>
                        {command.shortcut && (
                          <div className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded">
                            {command.shortcut}
                          </div>
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              </Command.List>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-white/10 flex items-center gap-4 text-xs text-white/40">
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 font-mono">↵</kbd>
                  <span>Select</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 font-mono">↑↓</kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 font-mono">Esc</kbd>
                  <span>Close</span>
                </div>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Demo component that shows the palette inline (not as modal)
export const CommandPaletteDemo: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCommand, setSelectedCommand] = useState<CommandItem | null>(null);

  return (
    <div className="w-full max-w-xl mx-auto">
      <Command className="rounded-2xl border border-white/10 bg-surface/80 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Input */}
        <div className="flex items-center gap-3 px-4 border-b border-white/10">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <Command.Input
            value={search}
            onValueChange={setSearch}
            placeholder="Type a command or search..."
            className="flex-1 h-12 bg-transparent text-white placeholder:text-white/40 outline-none text-sm font-mono"
          />
          <div className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded font-mono">
            ⌘K
          </div>
        </div>

        {/* Results */}
        <Command.List className="max-h-[300px] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-white/40 text-sm">
            No commands found.
          </Command.Empty>

          <Command.Group
            heading="Quick Actions"
            className="text-xs text-white/40 px-2 py-2 font-medium uppercase tracking-wider"
          >
            {defaultCommands.slice(0, 5).map((command) => (
              <Command.Item
                key={command.id}
                value={`${command.label} ${command.description}`}
                onSelect={() => setSelectedCommand(command)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer',
                  'text-white/80 hover:text-white',
                  'data-[selected=true]:bg-cyan-500/20 data-[selected=true]:text-white',
                  'transition-colors'
                )}
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 text-cyan-400">
                  {command.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium font-mono text-sm">{command.label}</div>
                  {command.description && (
                    <div className="text-xs text-white/40 truncate">
                      {command.description}
                    </div>
                  )}
                </div>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>

        {/* Footer hint */}
        <div className="px-4 py-2 border-t border-white/10 flex items-center gap-4 text-xs text-white/40">
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 font-mono">↵</kbd>
          <span>to run command</span>
        </div>
      </Command>

      {/* Selected command output */}
      <AnimatePresence>
        {selectedCommand && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 rounded-xl bg-black/40 border border-white/10"
          >
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Terminal className="w-4 h-4" />
              <span className="font-mono text-sm">
                $ {selectedCommand.label}
              </span>
            </div>
            <p className="text-white/60 text-sm">
              Command selected: {selectedCommand.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommandPalette;
