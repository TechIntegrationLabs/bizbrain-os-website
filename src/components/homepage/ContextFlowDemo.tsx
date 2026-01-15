'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Mic, FileText, Lightbulb, CheckCircle, User, FileOutput, Calendar, Brain, ArrowRight } from 'lucide-react';

/**
 * ContextFlowDemo - Homepage-ready component
 *
 * Interactive demo showing how Business Brain processes inputs and distributes updates.
 * Click an input source to see the flow animation.
 */

type FlowPhase = 'idle' | 'capturing' | 'processing' | 'distributing' | 'complete';

const inputSources = [
  { id: 'voice', title: 'Voice Note', icon: Mic, desc: 'Record a thought' },
  { id: 'meeting', title: 'Meeting', icon: FileText, desc: 'Full transcript' },
  { id: 'idea', title: 'Random Thought', icon: Lightbulb, desc: 'Late night idea' },
];

const outputs = [
  { id: 'crm', icon: CheckCircle, label: 'CRM Records' },
  { id: 'team', icon: User, label: 'Stakeholders' },
  { id: 'docs', icon: FileOutput, label: 'Project Docs' },
  { id: 'calendar', icon: Calendar, label: 'Timeline' },
];

export const ContextFlowDemo: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [phase, setPhase] = useState<FlowPhase>('idle');
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [activeOutputIndex, setActiveOutputIndex] = useState<number | null>(null);

  // Handle source click
  const handleSourceClick = (id: string) => {
    if (phase !== 'idle' && phase !== 'complete') return;

    setSelectedSource(id);
    setPhase('capturing');
    setActiveOutputIndex(null);

    // Animate through phases
    setTimeout(() => setPhase('processing'), 1000);
    setTimeout(() => {
      setPhase('distributing');
      // Cycle through outputs
      let i = 0;
      const cycleOutputs = () => {
        if (i < outputs.length) {
          setActiveOutputIndex(i);
          i++;
          setTimeout(cycleOutputs, 600);
        } else {
          setTimeout(() => setPhase('complete'), 500);
        }
      };
      cycleOutputs();
    }, 2500);
  };

  // Auto-demo on first view
  useEffect(() => {
    if (isInView && phase === 'idle') {
      const timer = setTimeout(() => handleSourceClick('voice'), 1500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
          <Brain className="w-4 h-4" />
          See It In Action
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          One Input.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            Complete Distribution.
          </span>
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Click an input source to see how Business Brain processes and distributes across your ecosystem.
        </p>
      </motion.div>

      {/* Flow Visualization */}
      <div className="relative bg-surface rounded-2xl border border-white/10 p-8 overflow-hidden">
        {/* Ambient effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center relative z-10">
          {/* Input Sources */}
          <div className="space-y-4">
            <div className="text-center md:text-left mb-4">
              <span className="text-white/30 text-xs font-medium tracking-widest uppercase">
                Input Sources
              </span>
            </div>
            {inputSources.map((source) => {
              const Icon = source.icon;
              const isSelected = selectedSource === source.id;
              return (
                <motion.button
                  key={source.id}
                  onClick={() => handleSourceClick(source.id)}
                  disabled={phase !== 'idle' && phase !== 'complete'}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 text-left ${
                    isSelected
                      ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                      : 'bg-white/5 border-white/10 hover:border-cyan-500/30 hover:bg-white/10'
                  } ${phase !== 'idle' && phase !== 'complete' && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                  whileHover={phase === 'idle' || phase === 'complete' ? { scale: 1.02 } : {}}
                  whileTap={phase === 'idle' || phase === 'complete' ? { scale: 0.98 } : {}}
                >
                  <div className={`p-3 rounded-xl ${isSelected ? 'bg-cyan-500/20' : 'bg-white/5'}`}>
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-cyan-400' : 'text-white/60'}`} />
                  </div>
                  <div>
                    <div className={`font-bold ${isSelected ? 'text-white' : 'text-white/80'}`}>
                      {source.title}
                    </div>
                    <div className="text-white/40 text-sm">{source.desc}</div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Center Processing */}
          <div className="flex flex-col items-center justify-center py-8">
            {/* Flow arrows (mobile hidden) */}
            <div className="hidden md:flex items-center gap-4">
              <motion.div
                className="flex items-center"
                animate={phase === 'capturing' ? { x: [0, 20, 0] } : {}}
                transition={{ duration: 0.8, repeat: phase === 'capturing' ? Infinity : 0 }}
              >
                <ArrowRight className={`w-6 h-6 ${phase === 'capturing' ? 'text-cyan-400' : 'text-white/20'}`} />
              </motion.div>
            </div>

            {/* Brain */}
            <motion.div
              className={`w-24 h-24 rounded-full flex items-center justify-center my-4 transition-all ${
                phase === 'processing'
                  ? 'bg-gradient-to-br from-cyan-500/30 to-emerald-500/30 shadow-2xl shadow-cyan-500/30'
                  : phase === 'distributing'
                  ? 'bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 shadow-2xl shadow-emerald-500/30'
                  : 'bg-white/5'
              }`}
              animate={phase === 'processing' ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.8, repeat: phase === 'processing' ? Infinity : 0 }}
            >
              <Brain className={`w-10 h-10 ${
                phase === 'processing' || phase === 'distributing' ? 'text-cyan-400' : 'text-white/40'
              }`} />
            </motion.div>

            {/* Status text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                className="text-center h-12"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {phase === 'capturing' && (
                  <span className="text-cyan-400 text-sm font-medium">Capturing input...</span>
                )}
                {phase === 'processing' && (
                  <span className="text-cyan-400 text-sm font-medium animate-pulse">Processing context...</span>
                )}
                {phase === 'distributing' && (
                  <span className="text-emerald-400 text-sm font-medium">Distributing updates...</span>
                )}
                {phase === 'complete' && (
                  <span className="text-emerald-400 text-sm font-medium">✓ All systems updated</span>
                )}
                {phase === 'idle' && (
                  <span className="text-white/40 text-sm">Click an input to start</span>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Flow arrows (mobile hidden) */}
            <div className="hidden md:flex items-center gap-4">
              <motion.div
                className="flex items-center"
                animate={phase === 'distributing' ? { x: [0, 20, 0] } : {}}
                transition={{ duration: 0.6, repeat: phase === 'distributing' ? Infinity : 0 }}
              >
                <ArrowRight className={`w-6 h-6 ${phase === 'distributing' ? 'text-emerald-400' : 'text-white/20'}`} />
              </motion.div>
            </div>
          </div>

          {/* Outputs */}
          <div className="space-y-3">
            <div className="text-center md:text-left mb-4">
              <span className="text-white/30 text-xs font-medium tracking-widest uppercase">
                Updated Systems
              </span>
            </div>
            {outputs.map((output, index) => {
              const Icon = output.icon;
              const isActive = activeOutputIndex !== null && index <= activeOutputIndex;
              return (
                <motion.div
                  key={output.id}
                  className={`p-4 rounded-xl border transition-all flex items-center gap-4 ${
                    isActive
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-white/5 border-white/10'
                  }`}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: isActive ? 1 : 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isActive ? 'bg-emerald-500/20' : 'bg-white/5'
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-white/40'}`} />
                  </div>
                  <span className={`font-medium ${isActive ? 'text-white' : 'text-white/60'}`}>
                    {output.label}
                  </span>
                  {isActive && (
                    <motion.span
                      className="ml-auto text-emerald-400 text-sm"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContextFlowDemo;
