'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, FileText, Lightbulb, CheckCircle, User, FileOutput, Calendar } from 'lucide-react';
import { playNarration, stopNarration } from '../ui/Narration';
import { BusinessBrainIcon } from '../ui/Icons';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

type FlowPhase = 'idle' | 'capturing' | 'processing' | 'distributing' | 'complete';

export const HowItWorksSlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [phase, setPhase] = useState<FlowPhase>('idle');
  const [activeOutputIndex, setActiveOutputIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isActive) {
      playNarration("The Business Brain is more than a bridge; it's a second brain that never forgets. Select a source on the left to see how it takes raw input, processes it contextually, and updates your entire business ecosystem.");
    } else {
      stopNarration();
      setSelectedNode(null);
      setPhase('idle');
      setActiveOutputIndex(null);
    }
  }, [isActive]);

  const handleScenarioClick = (id: string) => {
    if (phase !== 'idle' && phase !== 'complete') return;

    setSelectedNode(id);
    setPhase('capturing');
    setActiveOutputIndex(null);

    playNarration("Capturing raw input signal...");

    setTimeout(() => {
      setPhase('processing');
      playNarration("Correlating with client history, existing projects, and strategy...");
    }, 1500);

    setTimeout(() => {
      setPhase('distributing');
      playNarration("Updates integrated across your business ecosystem.");
      cycleOutputs(0);
    }, 3500);
  };

  const cycleOutputs = (index: number) => {
    if (index >= 4) {
      setTimeout(() => setPhase('complete'), 1000);
      return;
    }
    setActiveOutputIndex(index);
    setTimeout(() => cycleOutputs(index + 1), 1000);
  };

  const scenarios = [
    { id: 'voice', title: 'Voice Note', desc: 'Record a quick thought while driving.', icon: Mic, color: 'cyan' },
    { id: 'meet', title: 'Meeting', desc: 'A full client meeting transcript.', icon: FileText, color: 'emerald' },
    { id: 'idea', title: 'Random Thought', desc: 'A late night strategy idea.', icon: Lightbulb, color: 'amber' }
  ];

  const outputs = [
    { id: 'crm', icon: CheckCircle, label: "CRM Records", detail: "Contact updated with new sentiment." },
    { id: 'user', icon: User, label: "Stakeholders", detail: "Notifications sent to key managers." },
    { id: 'docs', icon: FileOutput, label: "Project Docs", detail: "Proposal draft created v1.2." },
    { id: 'cal', icon: Calendar, label: "Timeline", detail: "Follow-up meeting scheduled." }
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-4 md:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5" />

      <motion.div
        className="relative z-10 w-full max-w-7xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            The Ecosystem of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Context
            </span>
          </h2>
          <p className="text-white/50 text-sm md:text-base">
            Experience how the Business Brain turns raw data into <span className="text-white font-medium">Integrated Action</span>
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-6 items-center min-h-[500px] relative">

          {/* INPUT COLUMN */}
          <motion.div
            className="space-y-4"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: isActive ? 0 : -30, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center mb-2">
              <span className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase">Step 1: Capture</span>
            </div>
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => handleScenarioClick(s.id)}
                disabled={phase !== 'idle' && phase !== 'complete'}
                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 text-left group ${
                  selectedNode === s.id
                    ? 'bg-surface border-cyan-500/50 shadow-lg shadow-cyan-500/10 scale-[1.02]'
                    : 'bg-surface/50 border-white/10 hover:border-cyan-500/30 hover:bg-surface/80'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${
                  selectedNode === s.id ? 'bg-cyan-500/20' : 'bg-white/5'
                }`}>
                  <s.icon className={`w-5 h-5 ${selectedNode === s.id ? 'text-cyan-400' : 'text-white/40'}`} />
                </div>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block mb-0.5 ${
                    selectedNode === s.id ? 'text-cyan-400' : 'text-white/30'
                  }`}>Source</span>
                  <span className={`font-semibold text-sm ${selectedNode === s.id ? 'text-white' : 'text-white/70'}`}>
                    {s.title}
                  </span>
                </div>
              </button>
            ))}
          </motion.div>

          {/* PROCESSING CENTER */}
          <motion.div
            className="relative flex flex-col items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: isActive ? 1 : 0.9, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Brain icon */}
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <BusinessBrainIcon
                className="w-full h-full"
                isActive={isActive}
                phase={phase === 'distributing' ? 'distributing' : phase === 'processing' ? 'processing' : phase === 'capturing' ? 'capturing' : 'idle'}
              />

              {/* Glow effect during processing */}
              {phase === 'processing' && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>

            {/* Status text */}
            <div className="h-16 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {phase === 'processing' && (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center"
                  >
                    <span className="text-cyan-400 font-bold tracking-wider text-xs uppercase block mb-1">
                      Processing Context
                    </span>
                    <span className="text-white/40 text-xs">
                      Parsing intent & connecting entities...
                    </span>
                  </motion.div>
                )}
                {phase === 'distributing' && (
                  <motion.div
                    key="distributing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center"
                  >
                    <span className="text-emerald-400 font-bold tracking-wider text-xs uppercase">
                      Distributing Updates
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* OUTPUT COLUMN */}
          <motion.div
            className="space-y-3"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: isActive ? 0 : 30, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-2">
              <span className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase">Step 3: Integrate</span>
            </div>
            {outputs.map((item, i) => {
              const isOutputActive = activeOutputIndex === i;
              return (
                <motion.div
                  key={item.id}
                  className={`relative p-4 bg-surface/50 rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOutputActive
                      ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                      : 'border-white/10 opacity-40'
                  }`}
                  animate={{
                    scale: isOutputActive ? 1.02 : 1,
                  }}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isOutputActive ? 'bg-cyan-500 text-white' : 'bg-white/5 text-white/40'
                    }`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">
                        {item.label}
                      </span>
                      <p className={`text-xs transition-all ${
                        isOutputActive ? 'text-white/80 opacity-100' : 'text-white/40 opacity-0 h-0'
                      }`}>
                        {isOutputActive && item.detail}
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  {isOutputActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-cyan-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.8, ease: "linear" }}
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Continue button */}
        {onComplete && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'complete' ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={onComplete}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full font-bold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <span>See the Results</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
