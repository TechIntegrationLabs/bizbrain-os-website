'use client';

import React, { useEffect, useState, useRef, Suspense, useCallback } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Mic, CheckSquare, Mail, UserPlus, FileEdit, Bell, Clock, Zap, ArrowRight, GripVertical } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { playNarration, stopNarration } from '../ui/Narration';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

// 3D Waveform Visualization
const Waveform3D: React.FC<{ isRecording: boolean; isProcessing: boolean }> = ({ isRecording, isProcessing }) => {
  const groupRef = useRef<THREE.Group>(null);
  const barsRef = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }

    barsRef.current.forEach((bar, i) => {
      if (bar) {
        const baseHeight = 0.3;
        if (isRecording) {
          const wave = Math.sin(state.clock.elapsedTime * 4 + i * 0.5) * 0.5 + 0.5;
          bar.scale.y = baseHeight + wave * 0.7;
        } else if (isProcessing) {
          const pulse = Math.sin(state.clock.elapsedTime * 8 + i * 0.3) * 0.5 + 0.5;
          bar.scale.y = baseHeight + pulse * 1.2;
        } else {
          bar.scale.y = baseHeight;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = Math.cos(angle) * 0.8;
        const z = Math.sin(angle) * 0.8;

        return (
          <mesh
            key={i}
            ref={(el) => { if (el) barsRef.current[i] = el; }}
            position={[x, 0, z]}
          >
            <boxGeometry args={[0.1, 1, 0.1]} />
            <meshStandardMaterial
              color={isProcessing ? '#10b981' : '#06b6d4'}
              emissive={isProcessing ? '#10b981' : '#06b6d4'}
              emissiveIntensity={isRecording || isProcessing ? 0.8 : 0.3}
            />
          </mesh>
        );
      })}

      {/* Central sphere */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <MeshDistortMaterial
            color={isProcessing ? '#10b981' : '#06b6d4'}
            distort={isProcessing ? 0.4 : 0.2}
            speed={isProcessing ? 4 : 2}
            emissive={isProcessing ? '#10b981' : '#06b6d4'}
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
};

// Time counter component
const TimeCounter: React.FC<{ targetSeconds: number; isActive: boolean; label: string; color: 'red' | 'green' }> = ({
  targetSeconds, isActive, label, color
}) => {
  const [displayTime, setDisplayTime] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayTime(0);
      return;
    }

    const duration = color === 'red' ? 3000 : 1500; // Red counts slower (60 min), green counts fast (10 sec)
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      setDisplayTime(Math.round(targetSeconds * eased));

      if (step >= steps) {
        clearInterval(interval);
        setDisplayTime(targetSeconds);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [isActive, targetSeconds, color]);

  const formatTime = (seconds: number) => {
    if (seconds >= 3600) {
      return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
    } else if (seconds >= 60) {
      return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs font-medium text-white/50 uppercase tracking-wider">{label}</span>
      <div className={`flex items-center gap-2 font-mono text-3xl font-bold ${
        color === 'red' ? 'text-red-400' : 'text-emerald-400'
      }`}>
        <Clock className="w-6 h-6" />
        {formatTime(displayTime)}
      </div>
    </div>
  );
};

// Draggable output item
interface OutputItem {
  id: string;
  icon: typeof CheckSquare;
  text: string;
  color: 'cyan' | 'emerald' | 'amber';
  manualTime: number; // seconds
}

const outputItems: OutputItem[] = [
  { id: 'todo', icon: CheckSquare, text: "Updates my to-do list", color: "cyan", manualTime: 180 },
  { id: 'change', icon: FileEdit, text: "Creates change order if needed", color: "emerald", manualTime: 600 },
  { id: 'client', icon: UserPlus, text: "Adds new client with contact info", color: "cyan", manualTime: 300 },
  { id: 'email', icon: Mail, text: "Sends 'nice to meet you' email", color: "amber", manualTime: 480 },
  { id: 'notify', icon: Bell, text: "Sends Slack + email notification", color: "emerald", manualTime: 120 },
];

const DraggableOutput: React.FC<{
  item: OutputItem;
  isComplete: boolean;
  index: number;
}> = ({ item, isComplete, index }) => {
  const colorClass = item.color === 'cyan'
    ? 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30'
    : item.color === 'emerald'
      ? 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30'
      : 'text-amber-400 bg-amber-500/20 border-amber-500/30';

  return (
    <Reorder.Item
      value={item}
      className={`flex items-center gap-4 p-4 bg-surface/50 rounded-xl border cursor-grab active:cursor-grabbing transition-all ${
        isComplete ? 'border-white/20' : 'border-white/10'
      }`}
      whileDrag={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
    >
      <GripVertical className="w-4 h-4 text-white/30" />
      <div className={`p-2 rounded-lg border ${colorClass}`}>
        <item.icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <span className="font-medium text-white/80">{item.text}</span>
        <span className="block text-xs text-white/40 mt-1">
          Manual: ~{Math.round(item.manualTime / 60)} min
        </span>
      </div>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isComplete ? 1 : 0,
          opacity: isComplete ? 1 : 0
        }}
        transition={{ duration: 0.3, type: "spring" }}
        className="text-emerald-400"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
    </Reorder.Item>
  );
};

// Before/After comparison card
const ComparisonCard: React.FC<{
  type: 'before' | 'after';
  isActive: boolean;
  items: string[];
}> = ({ type, isActive, items }) => {
  const isBefore = type === 'before';

  return (
    <motion.div
      initial={{ opacity: 0, x: isBefore ? -30 : 30 }}
      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : (isBefore ? -30 : 30) }}
      transition={{ duration: 0.6, delay: isBefore ? 0 : 0.3 }}
      className={`p-6 rounded-2xl border ${
        isBefore
          ? 'bg-red-500/5 border-red-500/20'
          : 'bg-emerald-500/5 border-emerald-500/20'
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${isBefore ? 'bg-red-500/20' : 'bg-emerald-500/20'}`}>
          {isBefore ? <Clock className="w-5 h-5 text-red-400" /> : <Zap className="w-5 h-5 text-emerald-400" />}
        </div>
        <span className={`font-bold text-lg ${isBefore ? 'text-red-400' : 'text-emerald-400'}`}>
          {isBefore ? 'Without Business Brain' : 'With Business Brain'}
        </span>
      </div>

      <ul className="space-y-2">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
            className="flex items-start gap-2 text-sm text-white/70"
          >
            <span className={`mt-1 w-1.5 h-1.5 rounded-full ${isBefore ? 'bg-red-400' : 'bg-emerald-400'}`} />
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export const AutomationSlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [phase, setPhase] = useState<'idle' | 'recording' | 'processing' | 'complete'>('idle');
  const [completedOutputs, setCompletedOutputs] = useState<string[]>([]);
  const [items, setItems] = useState(outputItems);
  const [showComparison, setShowComparison] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalManualTime = outputItems.reduce((acc, item) => acc + item.manualTime, 0);

  useEffect(() => {
    if (isActive) {
      playNarration("Imagine one voice note. Normally, that's an hour of admin work. Organizing, emailing, updating. With the Business Brain, it happens in seconds.");

      setPhase('recording');
      setCompletedOutputs([]);
      setShowComparison(false);

      // Recording phase
      setTimeout(() => {
        setPhase('processing');
        // Stagger complete outputs
        outputItems.forEach((item, i) => {
          setTimeout(() => {
            setCompletedOutputs(prev => [...prev, item.id]);
          }, i * 400);
        });
      }, 2000);

      // Complete phase
      setTimeout(() => {
        setPhase('complete');
        setShowComparison(true);
      }, 2000 + outputItems.length * 400 + 1000);
    } else {
      stopNarration();
      setPhase('idle');
      setCompletedOutputs([]);
      setShowComparison(false);
    }
  }, [isActive]);

  const beforeItems = [
    "Open email, compose message manually",
    "Update CRM, copy-paste contact details",
    "Create task in project management tool",
    "Draft change order in separate document",
    "Send notifications to team members"
  ];

  const afterItems = [
    "One voice note while driving",
    "AI extracts all action items automatically",
    "All systems updated in parallel",
    "10 seconds total, zero typing",
    "Never forget a follow-up again"
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: 0
            }}
            animate={phase !== 'idle' ? {
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: [0, 0.5, 0]
            } : {}}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

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
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            One voice note.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Ten updates.
            </span>
          </h2>
          <p className="text-xl text-white/50">Drag to reorder. Watch the magic happen.</p>
        </motion.div>

        {/* Time comparison */}
        <motion.div
          className="flex justify-center gap-12 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase !== 'idle' ? 1 : 0, y: phase !== 'idle' ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <TimeCounter
            targetSeconds={totalManualTime}
            isActive={phase !== 'idle'}
            label="Manual Work"
            color="red"
          />
          <div className="flex items-center">
            <ArrowRight className="w-8 h-8 text-white/30" />
          </div>
          <TimeCounter
            targetSeconds={10}
            isActive={phase === 'processing' || phase === 'complete'}
            label="With Business Brain"
            color="green"
          />
        </motion.div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">

          {/* Input - 3D Voice Note */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-40 h-48 border-2 border-white/20 rounded-3xl bg-surface/50 flex items-center justify-center relative overflow-hidden">
                {/* 3D Waveform */}
                <div className="absolute inset-0">
                  {mounted ? (
                    <Suspense fallback={
                      <div className="w-full h-full flex items-center justify-center">
                        <Mic className="w-10 h-10 text-cyan-400 animate-pulse" />
                      </div>
                    }>
                      <Canvas camera={{ position: [0, 2, 4], fov: 50 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <Waveform3D
                          isRecording={phase === 'recording'}
                          isProcessing={phase === 'processing'}
                        />
                      </Canvas>
                    </Suspense>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Mic className="w-10 h-10 text-cyan-400 animate-pulse" />
                    </div>
                  )}
                </div>
              </div>

              {/* Status indicator */}
              <motion.div
                className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                  phase === 'recording'
                    ? 'bg-cyan-500 text-white'
                    : phase === 'processing'
                      ? 'bg-emerald-500 text-white'
                      : phase === 'complete'
                        ? 'bg-white/10 text-white/70'
                        : 'bg-white/5 text-white/40'
                }`}
                animate={phase === 'recording' ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 1, repeat: phase === 'recording' ? Infinity : 0 }}
              >
                {phase === 'recording' && '🔴 Recording...'}
                {phase === 'processing' && '⚡ Processing...'}
                {phase === 'complete' && '✓ Done!'}
                {phase === 'idle' && 'Ready'}
              </motion.div>

              {/* Pulse effect */}
              <AnimatePresence>
                {(phase === 'recording' || phase === 'processing') && (
                  <motion.div
                    className={`absolute inset-0 border-2 rounded-3xl ${
                      phase === 'recording' ? 'border-cyan-500' : 'border-emerald-500'
                    }`}
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.15, 1] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </AnimatePresence>
            </div>
            <span className="font-bold text-white">Voice Note</span>
          </motion.div>

          {/* Flow animation */}
          <div className="hidden lg:flex items-center justify-center w-24">
            <svg className="w-full h-[300px] overflow-visible">
              {items.map((_, i) => {
                const startY = 150;
                const endY = 30 + i * 55;
                const isRevealed = completedOutputs.includes(items[i].id);

                return (
                  <g key={i}>
                    <motion.path
                      d={`M 0,${startY} C 40,${startY} 60,${endY} 96,${endY}`}
                      fill="none"
                      stroke="url(#flowGradient)"
                      strokeWidth="2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: isRevealed ? 1 : 0,
                        opacity: isRevealed ? 1 : 0
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    {/* Data pulse */}
                    {isRevealed && (
                      <motion.circle
                        r="4"
                        fill="#06b6d4"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          offsetDistance: ['0%', '100%']
                        }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ offsetPath: `path('M 0,${startY} C 40,${startY} 60,${endY} 96,${endY}')` }}
                      />
                    )}
                  </g>
                );
              })}
              <defs>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Mobile arrow */}
          <div className="lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'processing' || phase === 'complete' ? 1 : 0 }}
              className="text-cyan-500"
            >
              <ArrowRight className="w-8 h-8 rotate-90" />
            </motion.div>
          </div>

          {/* Draggable Outputs */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: phase !== 'idle' ? 0 : 30, opacity: phase !== 'idle' ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-md"
          >
            <Reorder.Group
              axis="y"
              values={items}
              onReorder={setItems}
              className="flex flex-col gap-3"
            >
              {items.map((item, i) => (
                <DraggableOutput
                  key={item.id}
                  item={item}
                  isComplete={completedOutputs.includes(item.id)}
                  index={i}
                />
              ))}
            </Reorder.Group>
          </motion.div>
        </div>

        {/* Before/After Comparison */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto"
            >
              <ComparisonCard type="before" isActive={showComparison} items={beforeItems} />
              <ComparisonCard type="after" isActive={showComparison} items={afterItems} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue button */}
        {onComplete && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase === 'complete' ? 1 : 0, y: phase === 'complete' ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={onComplete}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 hover:from-cyan-500/30 hover:to-emerald-500/30 border border-cyan-500/30 hover:border-cyan-500/50 rounded-full text-white font-medium transition-all"
            >
              <Zap className="w-5 h-5 text-cyan-400" />
              See a real crisis example
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
