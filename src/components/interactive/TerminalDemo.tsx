'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Command {
  input: string;
  output: string[];
}

const commands: Record<string, string[]> = {
  '/status': [
    '> Generating business-wide status...',
    '',
    '╔══════════════════════════════════════╗',
    '║         BUSINESS PULSE               ║',
    '╠══════════════════════════════════════╣',
    '║ Active Projects: 5                   ║',
    '║ Healthy: 4 │ At Risk: 1             ║',
    '║                                      ║',
    '║ BuildTrack      ████████░░ 80%      ║',
    '║ Perdia v5       ██████████ 95%      ║',
    '║ EDF-Pro         ██░░░░░░░░ 20%      ║',
    '║                                      ║',
    '║ Open Tasks: 23                       ║',
    '║ Due This Week: 7                     ║',
    '║ Overdue: 2 ⚠️                        ║',
    '╚══════════════════════════════════════╝'
  ],
  '/find invoice overdue': [
    '> Searching across all entities...',
    '',
    'Found 3 results:',
    '1. GetEducated - Invoice #1234 - $2,500 - 30 days overdue',
    '2. BuildTrack - Invoice #1189 - $5,000 - 7 days overdue',
    '3. Archive/OldClient - Invoice #0987 - $800 - PAID (was overdue)',
    '',
    'Actions available: /remind, /invoice-followup'
  ],
  '/brief BuildTrack': [
    '> Generating comprehensive briefing...',
    '',
    '═══ BUILDTRACK BRIEFING ═══',
    '',
    'Client: Tim (Disruptors Media)',
    'Project: Construction tracking app',
    'Status: Active Development (80%)',
    'Budget: $15,000 (spent: $12,000)',
    '',
    'Recent Activity:',
    '• Driver log feature requested (5K budget)',
    '• GPS tracking requirement added',
    '• Deadline: End of January',
    '',
    'Open Items:',
    '• Finalize driver log spec',
    '• Send SOW for new feature',
    '• Schedule demo call',
    '',
    'Full briefing saved to: /Projects/BuildTrack/client-docs/'
  ]
};

const availableCommands = Object.keys(commands);

export const TerminalDemo: React.FC = () => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [displayedCommand, setDisplayedCommand] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [commandIndex, setCommandIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  const typeCommand = async (command: string) => {
    setIsTyping(true);
    setDisplayedCommand('');
    setOutput([]);

    for (let i = 0; i <= command.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 30));
      setDisplayedCommand(command.substring(0, i));
    }

    setIsTyping(false);
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    const commandOutput = commands[command] || ['Command not found'];
    for (const line of commandOutput) {
      await new Promise(resolve => setTimeout(resolve, 30));
      setOutput(prev => [...prev, line]);
    }

    setIsProcessing(false);
  };

  const runNextCommand = () => {
    const command = availableCommands[commandIndex];
    setCurrentCommand(command);
    typeCommand(command);
    setCommandIndex((prev) => (prev + 1) % availableCommands.length);
  };

  useEffect(() => {
    // Start with first command after a delay
    const timer = setTimeout(() => {
      runNextCommand();
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <section id="demo" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Power at Your{' '}
            <span className="gradient-text">Fingertips</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Type a command. Watch the magic.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {/* Terminal Window */}
          <div className="terminal">
            {/* Header */}
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500" />
              <div className="terminal-dot bg-yellow-500" />
              <div className="terminal-dot bg-green-500" />
              <span className="text-white/40 text-sm ml-4 font-mono">bizbrain-os</span>
            </div>

            {/* Body */}
            <div
              ref={terminalRef}
              className="terminal-body h-80 overflow-y-auto"
            >
              {/* Command Input */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-emerald-400">$</span>
                <span className="text-white">{displayedCommand}</span>
                {isTyping && <span className="cursor-blink text-cyan-400">|</span>}
              </div>

              {/* Processing indicator */}
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white/40 mb-2"
                >
                  Processing...
                </motion.div>
              )}

              {/* Output */}
              <AnimatePresence>
                {output.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.1 }}
                    className={`text-sm ${
                      line.startsWith('>') ? 'text-cyan-400' :
                      line.includes('═') || line.includes('╔') || line.includes('╚') || line.includes('║') ? 'text-emerald-400' :
                      line.includes('⚠️') ? 'text-amber-400' :
                      line.includes('$') ? 'text-emerald-400' :
                      'text-white/70'
                    }`}
                  >
                    {line || '\u00A0'}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Command Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {availableCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setCurrentCommand(cmd);
                  typeCommand(cmd);
                }}
                disabled={isTyping || isProcessing}
                className={`px-4 py-2 rounded-lg text-sm font-mono transition-all ${
                  currentCommand === cmd
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                    : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {cmd}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalDemo;
