'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { spring } from '@/lib/animations';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
  variant?: 'default' | 'cards' | 'minimal';
  allowMultiple?: boolean;
}

const defaultFAQs: FAQItem[] = [
  {
    question: 'What exactly is a Business Brain?',
    answer:
      'A Business Brain is a structured folder system enhanced with AI capabilities. It ingests raw data (voice notes, emails, documents), extracts meaningful context, routes information to the right places, and enables powerful slash commands for automation. Think of it as your second brain for business operations.',
  },
  {
    question: 'Do I need coding skills to use this?',
    answer:
      'No coding required for basic usage! The system comes with 25+ built-in slash commands that work out of the box. For customization and advanced features like custom subagents, basic familiarity with markdown and JSON is helpful but not required.',
  },
  {
    question: 'How does the AI context extraction work?',
    answer:
      "When you drop a file into the intake folder, Claude analyzes it to extract: project names, client mentions, action items, decisions, deadlines, and more. It then routes this information to the appropriate folders and updates relevant context files automatically. You don't lose any information.",
  },
  {
    question: 'Can I use this with my existing tools?',
    answer:
      'Absolutely! The Business Brain integrates with external tools via MCP (Model Context Protocol). Out of the box, we support Notion, GitHub, GoHighLevel CRM, Vercel, and more. You can also build custom MCP integrations for any tool with an API.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Your data stays on your machine - the Business Brain is a local folder system. Sensitive information can be stored in _vault folders which are excluded from version control. The dev-config-system uses encryption for credentials. No data is sent to external servers unless you explicitly configure integrations.',
  },
  {
    question: 'How is this different from Notion or Obsidian?',
    answer:
      "Unlike note-taking apps, the Business Brain is designed for active automation, not just storage. It's Claude Code-native, meaning AI assistants can directly read, write, and execute commands in your system. The folder structure follows business patterns (clients, projects, vendors) rather than generic note categories.",
  },
  {
    question: 'What comes with the course?',
    answer:
      'The course includes 7 modules covering everything from initial setup to advanced workflows. You get interactive code playgrounds, hands-on labs, quizzes, and a final project. Plus lifetime access to updates, community support, and the template files to get started immediately.',
  },
];

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items = defaultFAQs,
  className,
  variant = 'default',
  allowMultiple = false,
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(index);
      }
      return newSet;
    });
  };

  const isOpen = (index: number) => openItems.has(index);

  if (variant === 'cards') {
    return (
      <div className={cn('space-y-4', className)}>
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={false}
            className={cn(
              'rounded-2xl overflow-hidden transition-colors',
              isOpen(index)
                ? 'bg-white/[0.08] border border-white/10'
                : 'bg-white/[0.03] border border-white/5 hover:border-white/10'
            )}
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left"
            >
              <span className="font-medium text-white pr-4">{item.question}</span>
              <motion.div
                animate={{ rotate: isOpen(index) ? 180 : 0 }}
                transition={spring.default}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-5 h-5 text-cyan-400" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen(index) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-6 pb-5 text-white/60 leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={cn('divide-y divide-white/10', className)}>
        {items.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => toggleItem(index)}
              className="w-full py-5 flex items-center justify-between text-left group"
            >
              <span className="font-medium text-white group-hover:text-cyan-400 transition-colors pr-4">
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen(index) ? 45 : 0 }}
                transition={spring.default}
                className="flex-shrink-0"
              >
                <Plus className="w-5 h-5 text-white/40 group-hover:text-cyan-400 transition-colors" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen(index) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="pb-5 text-white/60 leading-relaxed pr-10">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-xl border border-white/10 overflow-hidden bg-surface/50"
        >
          <button
            onClick={() => toggleItem(index)}
            className={cn(
              'w-full px-5 py-4 flex items-center justify-between text-left transition-colors',
              isOpen(index) ? 'bg-white/5' : 'hover:bg-white/[0.03]'
            )}
          >
            <span className="font-medium text-white pr-4">{item.question}</span>
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
              <motion.div
                animate={{ rotate: isOpen(index) ? 180 : 0 }}
                transition={spring.default}
              >
                {isOpen(index) ? (
                  <Minus className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Plus className="w-4 h-4 text-white/40" />
                )}
              </motion.div>
            </div>
          </button>
          <AnimatePresence initial={false}>
            {isOpen(index) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="px-5 pb-4 text-white/60 leading-relaxed border-t border-white/5 pt-4">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

// Single FAQ Item for custom layouts
interface FAQItemComponentProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const FAQItemComponent: React.FC<FAQItemComponentProps> = ({
  question,
  answer,
  isOpen = false,
  onToggle,
  className,
}) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-white/10 overflow-hidden bg-surface/50',
        className
      )}
    >
      <button
        onClick={onToggle}
        className={cn(
          'w-full px-5 py-4 flex items-center justify-between text-left transition-colors',
          isOpen ? 'bg-white/5' : 'hover:bg-white/[0.03]'
        )}
      >
        <span className="font-medium text-white pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={spring.default}
        >
          <ChevronDown className="w-5 h-5 text-cyan-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-5 pb-4 text-white/60 leading-relaxed border-t border-white/5 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQAccordion;
