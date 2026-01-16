'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Mic, FileText, Lightbulb, CheckCircle, User, FileOutput, Calendar, Sparkles, Zap, Terminal } from 'lucide-react';
import { playNarration, stopNarration } from '../ui/Narration';
import { AnimatedBrain, ParticleField, SparkEffect } from '../ui/3d';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

type FlowPhase = 'idle' | 'capturing' | 'processing' | 'distributing' | 'complete';

// Animated connection line between elements
const ConnectionLine: React.FC<{
  active: boolean;
  direction: 'left' | 'right';
  color?: string;
}> = ({ active, direction, color = 'cyan' }) => {
  const colors = {
    cyan: 'from-cyan-500 to-cyan-400',
    emerald: 'from-emerald-500 to-emerald-400',
    amber: 'from-amber-500 to-amber-400',
  };

  return (
    <div className={`absolute top-1/2 ${direction === 'left' ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} w-16 h-0.5 overflow-hidden`}>
      <motion.div
        className={`h-full bg-gradient-to-r ${colors[color as keyof typeof colors] || colors.cyan}`}
        initial={{ x: direction === 'left' ? '100%' : '-100%' }}
        animate={{ x: active ? '0%' : direction === 'left' ? '100%' : '-100%' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      {active && (
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-lg shadow-cyan-500/50"
          initial={{ x: direction === 'left' ? 0 : 64 }}
          animate={{ x: direction === 'left' ? 64 : 0 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'loop' }}
        />
      )}
    </div>
  );
};

// Live terminal output simulation
const LiveTerminal: React.FC<{ phase: FlowPhase; selectedInput: string | null }> = ({ phase, selectedInput }) => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (phase === 'idle') {
      setLines([]);
      return;
    }

    const terminalOutput: Record<FlowPhase, string[]> = {
      idle: [],
      capturing: [
        `> Capturing ${selectedInput || 'input'}...`,
        '> Analyzing audio waveform...',
        '> Transcription complete.',
      ],
      processing: [
        '> Parsing semantic intent...',
        '> Cross-referencing client database...',
        '> Matching project context: EDF-Pro',
        '> Sentiment analysis: Positive',
        '> Priority: High',
      ],
      distributing: [
        '> Updating CRM records...',
        '> Notifying stakeholders...',
        '> Creating document draft...',
        '> Scheduling follow-up...',
      ],
      complete: [
        '> All systems updated.',
        '> Context synchronized.',
      ],
    };

    const currentLines = terminalOutput[phase] || [];
    let lineIndex = 0;

    const interval = setInterval(() => {
      if (lineIndex < currentLines.length) {
        setLines(prev => [...prev, currentLines[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [phase, selectedInput]);

  return (
    <motion.div
      className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-3 font-mono text-xs overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: phase !== 'idle' ? 1 : 0, y: phase !== 'idle' ? 0 : 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-2 text-cyan-400">
        <Terminal className="w-3 h-3" />
        <span className="text-[10px] uppercase tracking-wider">Business Brain v3.2</span>
      </div>
      <div className="space-y-0.5 max-h-20 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {lines.map((line, i) => (
            <motion.div
              key={`${phase}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-emerald-400/80"
            >
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
        {phase !== 'idle' && phase !== 'complete' && (
          <motion.span
            className="inline-block w-2 h-3 bg-cyan-400"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
};

export const HowItWorksSlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [phase, setPhase] = useState<FlowPhase>('idle');
  const [activeOutputIndex, setActiveOutputIndex] = useState<number | null>(null);
  const [showSparks, setShowSparks] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  useEffect(() => {
    if (isActive) {
      playNarration("The Business Brain is more than a bridge; it's a second brain that never forgets. Select a source on the left to see how it takes raw input, processes it contextually, and updates your entire business ecosystem.");
    } else {
      stopNarration();
      setSelectedNode(null);
      setPhase('idle');
      setActiveOutputIndex(null);
      setShowSparks(false);
      setShowCustomInput(false);
    }
  }, [isActive]);

  const handleScenarioClick = useCallback((id: string) => {
    if (phase !== 'idle' && phase !== 'complete') return;

    setSelectedNode(id);
    setPhase('capturing');
    setActiveOutputIndex(null);
    setShowSparks(false);

    playNarration("Capturing raw input signal...");

    setTimeout(() => {
      setPhase('processing');
      setShowSparks(true);
      playNarration("Correlating with client history, existing projects, and strategy...");
    }, 1500);

    setTimeout(() => {
      setPhase('distributing');
      setShowSparks(false);
      playNarration("Updates integrated across your business ecosystem.");
      cycleOutputs(0);
    }, 4000);
  }, [phase]);

  const cycleOutputs = useCallback((index: number) => {
    if (index >= 4) {
      setTimeout(() => setPhase('complete'), 1000);
      return;
    }
    setActiveOutputIndex(index);
    setTimeout(() => cycleOutputs(index + 1), 1200);
  }, []);

  const handleCustomSubmit = useCallback(() => {
    if (!customInput.trim()) return;
    setShowCustomInput(false);
    handleScenarioClick('custom');
  }, [customInput, handleScenarioClick]);

  const scenarios = [
    { id: 'voice', title: 'Voice Note', desc: 'Record a quick thought while driving.', icon: Mic, color: 'cyan' },
    { id: 'meet', title: 'Meeting', desc: 'A full client meeting transcript.', icon: FileText, color: 'emerald' },
    { id: 'idea', title: 'Random Thought', desc: 'A late night strategy idea.', icon: Lightbulb, color: 'amber' },
  ];

  const outputs = [
    { id: 'crm', icon: CheckCircle, label: "CRM Records", detail: "Contact updated with new sentiment.", color: 'cyan' },
    { id: 'user', icon: User, label: "Stakeholders", detail: "Notifications sent to key managers.", color: 'emerald' },
    { id: 'docs', icon: FileOutput, label: "Project Docs", detail: "Proposal draft created v1.2.", color: 'amber' },
    { id: 'cal', icon: Calendar, label: "Timeline", detail: "Follow-up meeting scheduled.", color: 'cyan' },
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-4 md:px-8 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <ParticleField count={100} color="#06b6d4" speed={0.2} opacity={0.3} />
            <ambientLight intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 z-0" />

      <motion.div
        className="relative z-10 w-full max-w-7xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
            The Ecosystem of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 animate-gradient">
              Context
            </span>
          </h2>
          <p className="text-white/50 text-sm md:text-base">
            Experience how the Business Brain turns raw data into{' '}
            <span className="text-white font-medium">Integrated Action</span>
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-4 lg:gap-8 items-center min-h-[550px] relative">

          {/* INPUT COLUMN */}
          <motion.div
            className="space-y-3 relative"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: isActive ? 0 : -30, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center mb-2 flex items-center justify-center gap-2">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">Step 1: Capture</span>
            </div>

            {scenarios.map((s, index) => (
              <motion.button
                key={s.id}
                onClick={() => handleScenarioClick(s.id)}
                disabled={phase !== 'idle' && phase !== 'complete'}
                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 text-left group relative overflow-hidden ${
                  selectedNode === s.id
                    ? 'bg-surface border-cyan-500/50 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-surface/50 border-white/10 hover:border-cyan-500/30 hover:bg-surface/80'
                }`}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: phase === 'idle' || phase === 'complete' ? 1.02 : 1 }}
                whileTap={{ scale: phase === 'idle' || phase === 'complete' ? 0.98 : 1 }}
              >
                {/* Animated background on select */}
                {selectedNode === s.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10"
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                )}

                <div className={`relative z-10 p-3 rounded-xl shrink-0 transition-all ${
                  selectedNode === s.id ? 'bg-cyan-500/20 shadow-lg shadow-cyan-500/20' : 'bg-white/5'
                }`}>
                  <s.icon className={`w-5 h-5 transition-colors ${
                    selectedNode === s.id ? 'text-cyan-400' : 'text-white/40 group-hover:text-white/60'
                  }`} />
                </div>
                <div className="relative z-10 flex-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider block mb-0.5 ${
                    selectedNode === s.id ? 'text-cyan-400' : 'text-white/30'
                  }`}>Source</span>
                  <span className={`font-semibold text-sm block ${
                    selectedNode === s.id ? 'text-white' : 'text-white/70'
                  }`}>
                    {s.title}
                  </span>
                  <span className="text-[11px] text-white/40">{s.desc}</span>
                </div>

                {/* Pulse indicator when selected */}
                {selectedNode === s.id && phase === 'capturing' && (
                  <motion.div
                    className="absolute right-3 w-2 h-2 rounded-full bg-cyan-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}

            {/* Custom input toggle */}
            <motion.button
              onClick={() => setShowCustomInput(!showCustomInput)}
              className="w-full p-3 rounded-xl border border-dashed border-white/20 hover:border-cyan-500/30 transition-all text-center text-white/40 hover:text-white/60 text-sm"
              whileHover={{ scale: 1.01 }}
            >
              <Sparkles className="w-4 h-4 inline mr-2" />
              Try your own input...
            </motion.button>

            {/* Custom input field */}
            <AnimatePresence>
              {showCustomInput && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-surface/80 rounded-xl p-3 border border-white/10">
                    <input
                      type="text"
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="Type your idea or note..."
                      className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-white/30"
                      onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
                    />
                    <button
                      onClick={handleCustomSubmit}
                      className="mt-2 w-full py-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg text-cyan-400 text-xs font-medium transition-colors"
                    >
                      Process Input
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* PROCESSING CENTER - 3D Brain */}
          <motion.div
            className="relative flex flex-col items-center justify-center py-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: isActive ? 1 : 0.9, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Connection lines */}
            {phase !== 'idle' && (
              <>
                <motion.div
                  className="absolute left-0 top-1/2 w-16 lg:w-24 h-0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-transparent to-cyan-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    style={{ transformOrigin: 'left' }}
                    transition={{ duration: 0.5 }}
                  />
                  {(phase === 'capturing' || phase === 'processing') && (
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"
                      animate={{ x: [0, 80, 80] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>
                <motion.div
                  className="absolute right-0 top-1/2 w-16 lg:w-24 h-0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: phase === 'distributing' || phase === 'complete' ? 1 : 0 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    style={{ transformOrigin: 'left' }}
                    transition={{ duration: 0.5 }}
                  />
                  {phase === 'distributing' && (
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"
                      animate={{ x: [0, 80] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </>
            )}

            {/* 3D Brain Canvas */}
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                <Suspense fallback={null}>
                  <AnimatedBrain
                    isActive={isActive}
                    phase={phase}
                    primaryColor="#06b6d4"
                    secondaryColor="#10b981"
                    size={1.5}
                  />
                  <ambientLight intensity={0.4} />
                  <pointLight position={[10, 10, 10]} intensity={0.8} color="#06b6d4" />
                  <pointLight position={[-10, -10, -10]} intensity={0.4} color="#10b981" />
                </Suspense>
              </Canvas>

              {/* Spark effects during processing */}
              {showSparks && (
                <div className="absolute inset-0 pointer-events-none">
                  <Canvas camera={{ position: [0, 0, 5] }}>
                    <Suspense fallback={null}>
                      <SparkEffect
                        position={[0, 0, 0]}
                        color="#06b6d4"
                        count={20}
                      />
                    </Suspense>
                  </Canvas>
                </div>
              )}

              {/* Glow effects */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)',
                }}
                animate={{
                  opacity: phase === 'processing' ? [0.5, 1, 0.5] : 0.3,
                  scale: phase === 'processing' ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 2, repeat: phase === 'processing' ? Infinity : 0 }}
              />
            </div>

            {/* Status text */}
            <div className="h-20 flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {phase === 'idle' && (
                  <motion.p
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-white/30 text-sm text-center"
                  >
                    Select an input source to begin
                  </motion.p>
                )}
                {phase === 'capturing' && (
                  <motion.div
                    key="capturing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center"
                  >
                    <span className="text-cyan-400 font-bold tracking-wider text-xs uppercase block mb-1">
                      Capturing Signal
                    </span>
                    <span className="text-white/40 text-xs">
                      Receiving raw input data...
                    </span>
                  </motion.div>
                )}
                {phase === 'processing' && (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center"
                  >
                    <motion.span
                      className="text-cyan-400 font-bold tracking-wider text-xs uppercase block mb-1"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Processing Context
                    </motion.span>
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
                    <span className="text-emerald-400 font-bold tracking-wider text-xs uppercase block mb-1">
                      Distributing Updates
                    </span>
                    <span className="text-white/40 text-xs">
                      Syncing across all systems...
                    </span>
                  </motion.div>
                )}
                {phase === 'complete' && (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-500/30"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-bold text-sm">Context Synchronized</span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Live terminal */}
            <LiveTerminal phase={phase} selectedInput={selectedNode} />
          </motion.div>

          {/* OUTPUT COLUMN */}
          <motion.div
            className="space-y-3"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: isActive ? 0 : 30, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">Step 3: Integrate</span>
            </div>

            {outputs.map((item, i) => {
              const isOutputActive = activeOutputIndex === i;
              const isPast = activeOutputIndex !== null && i < activeOutputIndex;

              return (
                <motion.div
                  key={item.id}
                  className={`relative p-4 rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOutputActive
                      ? 'bg-surface border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                      : isPast
                        ? 'bg-surface/70 border-emerald-500/30'
                        : 'bg-surface/30 border-white/10 opacity-40'
                  }`}
                  animate={{
                    scale: isOutputActive ? 1.02 : 1,
                    y: isOutputActive ? -2 : 0,
                  }}
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <motion.div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        isOutputActive
                          ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                          : isPast
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-white/5 text-white/40'
                      }`}
                      animate={isOutputActive ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <item.icon className="w-5 h-5" />
                    </motion.div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">
                        {item.label}
                      </span>
                      <AnimatePresence>
                        {(isOutputActive || isPast) && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`text-xs ${isOutputActive ? 'text-white/80' : 'text-emerald-400/60'}`}
                          >
                            {item.detail}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Checkmark for completed */}
                    {isPast && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center"
                      >
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                      </motion.div>
                    )}
                  </div>

                  {/* Progress bar */}
                  {isOutputActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, ease: "linear" }}
                    />
                  )}

                  {/* Completed indicator */}
                  {isPast && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500/50" />
                  )}
                </motion.div>
              );
            })}

            {/* Stats summary after complete */}
            <AnimatePresence>
              {phase === 'complete' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-surface/50 rounded-xl border border-white/10"
                >
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div>
                      <div className="text-2xl font-bold text-cyan-400">4</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider">Systems Updated</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">~3s</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider">Total Time</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Continue button */}
        {onComplete && (
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase === 'complete' ? 1 : 0, y: phase === 'complete' ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              onClick={onComplete}
              className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white rounded-full font-bold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>See the Results</span>
              <motion.svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
