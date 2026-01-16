'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { AlertTriangle, Settings, ShieldCheck, Bell, Clock, DollarSign, ArrowRight, Lock, FileText, RefreshCw } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { playNarration, stopNarration } from '../ui/Narration';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

// 3D Alert Icon
const Alert3D: React.FC<{ color: string; isActive: boolean }> = ({ color, isActive }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <group ref={meshRef}>
        {/* Triangle base */}
        <mesh rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.6, 0.9, 3]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isActive ? 0.8 : 0.3}
          />
        </mesh>
        {/* Exclamation mark */}
        <mesh position={[0, 0.1, 0.3]}>
          <boxGeometry args={[0.08, 0.35, 0.08]} />
          <meshStandardMaterial color="#0a0a0f" />
        </mesh>
        <mesh position={[0, -0.2, 0.3]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#0a0a0f" />
        </mesh>
      </group>
    </Float>
  );
};

// 3D Shield Icon
const Shield3D: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.5, 1]} />
        <MeshDistortMaterial
          color="#10b981"
          distort={isActive ? 0.3 : 0.1}
          speed={isActive ? 3 : 1}
          emissive="#10b981"
          emissiveIntensity={isActive ? 0.6 : 0.2}
        />
      </mesh>
    </Float>
  );
};

// Live cost ticker
const CostTicker: React.FC<{ targetAmount: number; isLeaking: boolean; isRecovered: boolean }> = ({
  targetAmount, isLeaking, isRecovered
}) => {
  const [currentAmount, setCurrentAmount] = useState(0);

  useEffect(() => {
    if (!isLeaking && !isRecovered) {
      setCurrentAmount(0);
      return;
    }

    if (isRecovered) {
      // Animate recovery
      const duration = 2000;
      const steps = 40;
      const stepTime = duration / steps;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrentAmount(targetAmount - (targetAmount * eased));

        if (step >= steps) {
          clearInterval(interval);
          setCurrentAmount(0);
        }
      }, stepTime);

      return () => clearInterval(interval);
    }

    if (isLeaking) {
      // Animate leak
      const duration = 3000;
      const steps = 60;
      const stepTime = duration / steps;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const eased = progress * progress; // Ease in quad
        setCurrentAmount(Math.round(targetAmount * eased));

        if (step >= steps) {
          clearInterval(interval);
          setCurrentAmount(targetAmount);
        }
      }, stepTime);

      return () => clearInterval(interval);
    }
  }, [isLeaking, isRecovered, targetAmount]);

  return (
    <motion.div
      className={`font-mono text-5xl md:text-7xl font-black transition-colors duration-500 ${
        isRecovered ? 'text-emerald-400' : isLeaking ? 'text-red-400' : 'text-white/30'
      }`}
      animate={isLeaking && !isRecovered ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 0.3, repeat: isLeaking && !isRecovered ? Infinity : 0 }}
    >
      {isRecovered ? (
        <span className="flex items-center gap-3">
          <ShieldCheck className="w-12 h-12 text-emerald-400" />
          +$1,800
        </span>
      ) : (
        <>-${currentAmount.toLocaleString()}</>
      )}
    </motion.div>
  );
};

// Notification toast
interface NotificationProps {
  icon: typeof Bell;
  title: string;
  message: string;
  color: 'red' | 'cyan' | 'emerald';
  delay: number;
  isVisible: boolean;
}

const NotificationToast: React.FC<NotificationProps> = ({ icon: Icon, title, message, color, delay, isVisible }) => {
  const colorClasses = {
    red: 'border-red-500/50 bg-red-500/10',
    cyan: 'border-cyan-500/50 bg-cyan-500/10',
    emerald: 'border-emerald-500/50 bg-emerald-500/10'
  };

  const iconColors = {
    red: 'text-red-400',
    cyan: 'text-cyan-400',
    emerald: 'text-emerald-400'
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4, delay, type: 'spring', stiffness: 100 }}
      className={`flex items-start gap-3 p-4 rounded-xl border ${colorClasses[color]} backdrop-blur-sm`}
    >
      <Icon className={`w-5 h-5 mt-0.5 ${iconColors[color]}`} />
      <div>
        <span className="font-bold text-white text-sm block">{title}</span>
        <span className="text-white/60 text-xs">{message}</span>
      </div>
    </motion.div>
  );
};

// Action log item
const ActionLogItem: React.FC<{ text: string; isComplete: boolean; delay: number }> = ({ text, isComplete, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center gap-3 text-sm"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isComplete ? 1 : 0 }}
        transition={{ duration: 0.3, delay: delay + 0.3 }}
        className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center"
      >
        <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
      <span className="text-white/70 font-mono">{text}</span>
    </motion.div>
  );
};

// Timeline scrubber
const TimelineScrubber: React.FC<{
  phase: number;
  onPhaseChange: (phase: number) => void;
  isInteractive: boolean;
}> = ({ phase, onPhaseChange, isInteractive }) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [trackWidth, setTrackWidth] = useState(400);

  useEffect(() => {
    if (constraintsRef.current) {
      setTrackWidth(constraintsRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    // Sync x position with phase
    const positions = [0, trackWidth * 0.5, trackWidth];
    x.set(positions[phase - 1] || 0);
  }, [phase, trackWidth, x]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isInteractive) return;

    const position = x.get();
    const segment = trackWidth / 2;

    if (position < segment * 0.5) {
      onPhaseChange(1);
    } else if (position < segment * 1.5) {
      onPhaseChange(2);
    } else {
      onPhaseChange(3);
    }
  };

  const phases = [
    { label: '0:00', title: 'Detection', color: 'red' },
    { label: '0:05', title: 'Response', color: 'cyan' },
    { label: '20:00', title: 'Resolution', color: 'emerald' }
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      <div ref={constraintsRef} className="relative h-16">
        {/* Track */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-white/10 rounded-full -translate-y-1/2">
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 via-cyan-500 to-emerald-500 rounded-full"
            style={{ width: useTransform(x, [0, trackWidth], ['0%', '100%']) }}
          />
        </div>

        {/* Phase markers */}
        {phases.map((p, i) => {
          const position = i === 0 ? '0%' : i === 1 ? '50%' : '100%';
          const colorClass = p.color === 'red' ? 'bg-red-500' : p.color === 'cyan' ? 'bg-cyan-500' : 'bg-emerald-500';
          const isActive = phase > i;

          return (
            <div
              key={p.label}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
              style={{ left: position }}
            >
              <button
                onClick={() => isInteractive && onPhaseChange(i + 1)}
                className={`w-4 h-4 rounded-full transition-all ${isActive ? colorClass : 'bg-white/20'} ${
                  isInteractive ? 'cursor-pointer hover:scale-125' : ''
                }`}
              />
              <span className="text-[10px] text-white/40 mt-8 font-mono">{p.label}</span>
              <span className="text-[10px] text-white/60 font-medium">{p.title}</span>
            </div>
          );
        })}

        {/* Draggable thumb */}
        {isInteractive && (
          <motion.div
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0}
            onDragEnd={handleDragEnd}
            style={{ x }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center"
          >
            <Clock className="w-4 h-4 text-gray-800" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export const CaseStudySlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showActionLog, setShowActionLog] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    if (isActive) {
      setPhase(1);
      setShowNotifications(true);
      playNarration("Here is a real example. An $1,800 API leak. Normally? Panic. Stress. A ruined weekend.");

      setTimeout(() => {
        setPhase(2);
        setShowActionLog(true);
        playNarration("But the Business Brain detected it immediately. It ran the security protocol, rotated the keys, and analyzed the logs.");
      }, 4000);

      setTimeout(() => {
        setPhase(3);
        setIsInteractive(true);
        playNarration("In 20 minutes, it drafted the incident report, submitted the dispute, and secured a full refund. Zero human intervention.");
      }, 8000);
    } else {
      setPhase(0);
      setShowNotifications(false);
      setShowActionLog(false);
      setIsInteractive(false);
      stopNarration();
    }
  }, [isActive]);

  const notifications = [
    { icon: AlertTriangle, title: '🚨 Security Alert', message: 'Unusual API usage detected', color: 'red' as const },
    { icon: Lock, title: 'Keys Rotated', message: 'API credentials secured', color: 'cyan' as const },
    { icon: FileText, title: 'Report Generated', message: 'Incident documentation complete', color: 'cyan' as const },
    { icon: RefreshCw, title: 'Dispute Submitted', message: 'Refund request filed', color: 'cyan' as const },
    { icon: DollarSign, title: '💰 Refund Approved', message: '$1,800 returned to account', color: 'emerald' as const },
  ];

  const actionLogItems = [
    'Analyzing API usage patterns...',
    'Identified unauthorized access point',
    'Rotating compromised credentials',
    'Generating incident timeline',
    'Drafting refund request documentation',
    'Submitting dispute to provider'
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-emerald-500/5" />

      {/* Animated warning lines (when leaking) */}
      <AnimatePresence>
        {phase === 1 && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
                style={{ top: `${20 + i * 15}%`, left: 0, right: 0 }}
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: [0, 1, 0], x: '100%' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Notifications panel (right side) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-72 space-y-3 z-20">
        {notifications.map((n, i) => (
          <NotificationToast
            key={i}
            {...n}
            delay={i * 0.3}
            isVisible={showNotifications && (
              (n.color === 'red' && phase >= 1) ||
              (n.color === 'cyan' && phase >= 2 && i <= 3) ||
              (n.color === 'emerald' && phase >= 3)
            )}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 w-full max-w-5xl"
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
          <span className="inline-block px-4 py-1 bg-white/5 border border-white/10 rounded-full text-white/60 text-sm font-medium mb-4">
            REAL CASE STUDY
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            From a <span className="text-red-400">$1,800 API leak</span> to
            <br />a <span className="text-emerald-400">full refund</span> in 20 minutes.
          </h2>
        </motion.div>

        {/* Cost Ticker */}
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <CostTicker
            targetAmount={1800}
            isLeaking={phase >= 1}
            isRecovered={phase >= 3}
          />
        </motion.div>

        {/* 3D Icons Row */}
        <div className="flex justify-center items-center gap-8 mb-8">
          {/* Alert Icon */}
          <motion.div
            className="w-24 h-24"
            animate={{ opacity: phase === 1 ? 1 : 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <Suspense fallback={<AlertTriangle className="w-12 h-12 text-red-400 mx-auto" />}>
              <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Alert3D color="#ef4444" isActive={phase === 1} />
              </Canvas>
            </Suspense>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 1 : 0 }}
            className="text-white/30"
          >
            <ArrowRight className="w-8 h-8" />
          </motion.div>

          {/* Settings/Processing */}
          <motion.div
            className="w-24 h-24"
            animate={{ opacity: phase === 2 ? 1 : 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-full h-full flex items-center justify-center"
              animate={phase === 2 ? { rotate: 360 } : {}}
              transition={{ duration: 2, repeat: phase === 2 ? Infinity : 0, ease: 'linear' }}
            >
              <Settings className="w-16 h-16 text-cyan-400" />
            </motion.div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 3 ? 1 : 0 }}
            className="text-white/30"
          >
            <ArrowRight className="w-8 h-8" />
          </motion.div>

          {/* Shield */}
          <motion.div
            className="w-24 h-24"
            animate={{ opacity: phase === 3 ? 1 : 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <Suspense fallback={<ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />}>
              <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Shield3D isActive={phase === 3} />
              </Canvas>
            </Suspense>
          </motion.div>
        </div>

        {/* Action Log (appears during phase 2) */}
        <AnimatePresence>
          {showActionLog && phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-md mx-auto mb-8 p-4 bg-surface/50 rounded-xl border border-white/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <Settings className="w-4 h-4 text-cyan-400 animate-spin" />
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">System Actions</span>
              </div>
              <div className="space-y-2">
                {actionLogItems.map((item, i) => (
                  <ActionLogItem
                    key={i}
                    text={item}
                    isComplete={phase >= 2}
                    delay={i * 0.2}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timeline Scrubber */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <TimelineScrubber
            phase={phase}
            onPhaseChange={setPhase}
            isInteractive={isInteractive}
          />
          {isInteractive && (
            <p className="text-center text-white/40 text-xs mt-6">
              Drag the timeline to replay the incident
            </p>
          )}
        </motion.div>

        {/* Continue button */}
        {onComplete && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 3 ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button
              onClick={onComplete}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 hover:from-cyan-500/30 hover:to-emerald-500/30 border border-cyan-500/30 hover:border-cyan-500/50 rounded-full font-bold text-white transition-all"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              The Strategic Shift
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
