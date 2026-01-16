'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { playNarration, stopNarration } from '../ui/Narration';
import { User, Zap, Brain, ArrowRight, Grip, Check, Sparkle } from 'lucide-react';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

// 3D Animated Brain
const Brain3D: React.FC<{ isActive: boolean; isConnected: boolean }> = ({ isActive, isConnected }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group>
        {/* Core brain mesh */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1, 2]} />
          <MeshDistortMaterial
            color={isConnected ? '#06b6d4' : '#374151'}
            emissive={isConnected ? '#06b6d4' : '#1f2937'}
            emissiveIntensity={isConnected ? 0.5 : 0.1}
            distort={isConnected ? 0.4 : 0.2}
            speed={isConnected ? 3 : 1}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Neural connections */}
        {isConnected && (
          <>
            <Sparkles
              count={50}
              scale={3}
              size={3}
              speed={1}
              color="#06b6d4"
            />
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              return (
                <mesh key={i} position={[Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0]}>
                  <sphereGeometry args={[0.08, 16, 16]} />
                  <meshStandardMaterial
                    color="#10b981"
                    emissive="#10b981"
                    emissiveIntensity={0.8}
                  />
                </mesh>
              );
            })}
          </>
        )}

        {/* Outer glow ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.3, 0.02, 16, 100]} />
          <meshStandardMaterial
            color={isConnected ? '#06b6d4' : '#374151'}
            emissive={isConnected ? '#06b6d4' : '#374151'}
            emissiveIntensity={isConnected ? 1 : 0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Connection Line Animation
const ConnectionLine: React.FC<{
  isActive: boolean;
  from: 'left' | 'right';
}> = ({ isActive, from }) => {
  return (
    <motion.div
      className="absolute top-1/2 h-1 -translate-y-1/2"
      style={{
        left: from === 'left' ? '0' : 'auto',
        right: from === 'right' ? '0' : 'auto',
        width: '100%'
      }}
    >
      <motion.div
        className={`h-full rounded-full ${from === 'left' ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-white/20 via-cyan-500 to-emerald-500`}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ transformOrigin: from }}
      />
      {/* Animated pulse along the line */}
      {isActive && (
        <motion.div
          className="absolute top-1/2 w-4 h-4 -translate-y-1/2 rounded-full bg-cyan-400 blur-sm"
          initial={{ left: from === 'left' ? '0%' : '100%' }}
          animate={{ left: from === 'left' ? '100%' : '0%' }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </motion.div>
  );
};

// Draggable Node Component
const DraggableNode: React.FC<{
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  borderColor: string;
  bgColor: string;
  position: { x: number; y: number };
  onDragEnd: (id: string, position: { x: number; y: number }) => void;
  isLocked: boolean;
  isConnected: boolean;
}> = ({ id, icon, label, color, borderColor, bgColor, position, onDragEnd, isLocked, isConnected }) => {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      className={`relative flex flex-col items-center cursor-grab active:cursor-grabbing ${isLocked ? 'pointer-events-none' : ''}`}
      drag={!isLocked}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        onDragEnd(id, { x: info.point.x, y: info.point.y });
      }}
      whileDrag={{ scale: 1.1, zIndex: 50 }}
      whileHover={{ scale: isLocked ? 1 : 1.05 }}
    >
      {/* Connection indicator */}
      {isConnected && (
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          <Check className="w-4 h-4 text-white" />
        </motion.div>
      )}

      {/* Main node */}
      <motion.div
        className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${bgColor} border-2 ${borderColor} flex items-center justify-center mb-3 relative overflow-hidden`}
        animate={{
          boxShadow: isConnected
            ? ['0 0 0 0 rgba(6, 182, 212, 0)', '0 0 30px 10px rgba(6, 182, 212, 0.3)', '0 0 0 0 rgba(6, 182, 212, 0)']
            : 'none'
        }}
        transition={{ duration: 2, repeat: isConnected ? Infinity : 0 }}
      >
        {icon}
        {/* Drag handle indicator */}
        {!isLocked && (
          <div className="absolute bottom-1 right-1 text-white/20">
            <Grip className="w-4 h-4" />
          </div>
        )}
      </motion.div>

      <span className={`text-sm font-medium ${color}`}>{label}</span>

      {/* Drag hint */}
      {!isLocked && !isConnected && (
        <motion.span
          className="text-[10px] text-white/30 uppercase tracking-wider mt-1"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Drag me
        </motion.span>
      )}
    </motion.div>
  );
};

// Spark Effect Component
const SparkBurst: React.FC<{ position: { x: number; y: number } }> = ({ position }) => {
  const sparks = Array.from({ length: 12 }, (_, i) => ({
    angle: (i / 12) * Math.PI * 2,
    distance: 30 + Math.random() * 40,
    delay: Math.random() * 0.2
  }));

  return (
    <div className="absolute pointer-events-none" style={{ left: position.x, top: position.y }}>
      {sparks.map((spark, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(spark.angle) * spark.distance,
            y: Math.sin(spark.angle) * spark.distance,
            opacity: 0,
            scale: 0
          }}
          transition={{ duration: 0.6, delay: spark.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

export const MissingPieceSlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [phase, setPhase] = useState<'intro' | 'drag' | 'connecting' | 'complete'>('intro');
  const [leftConnected, setLeftConnected] = useState(false);
  const [rightConnected, setRightConnected] = useState(false);
  const [sparkPositions, setSparkPositions] = useState<{ x: number; y: number }[]>([]);
  const brainRef = useRef<HTMLDivElement>(null);

  const isFullyConnected = leftConnected && rightConnected;

  useEffect(() => {
    if (isActive) {
      playNarration("This is the solution. I call it the Business Brain. It takes your raw, unfiltered input and connects it to the AI.");

      setPhase('intro');
      setLeftConnected(false);
      setRightConnected(false);

      // Transition to drag phase
      setTimeout(() => setPhase('drag'), 2500);
    } else {
      stopNarration();
      setPhase('intro');
      setLeftConnected(false);
      setRightConnected(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (isFullyConnected && phase === 'drag') {
      setPhase('connecting');
      setTimeout(() => {
        setPhase('complete');
        playNarration("Once connected, your AI is no longer a generic tool. It becomes a specialized partner that understands your entire business.");
      }, 1000);
    }
  }, [isFullyConnected, phase]);

  const handleDragEnd = (id: string, position: { x: number; y: number }) => {
    if (!brainRef.current) return;

    const brainRect = brainRef.current.getBoundingClientRect();
    const brainCenter = {
      x: brainRect.left + brainRect.width / 2,
      y: brainRect.top + brainRect.height / 2
    };

    // Check if dropped near the brain (within 150px)
    const distance = Math.sqrt(
      Math.pow(position.x - brainCenter.x, 2) +
      Math.pow(position.y - brainCenter.y, 2)
    );

    if (distance < 180) {
      // Create spark effect
      setSparkPositions(prev => [...prev, { x: brainCenter.x, y: brainCenter.y }]);
      setTimeout(() => {
        setSparkPositions(prev => prev.slice(1));
      }, 1000);

      if (id === 'user') {
        setLeftConnected(true);
      } else if (id === 'ai') {
        setRightConnected(true);
      }
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <Suspense fallback={null}>
            <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
              <Sparkles count={100} scale={10} size={2} speed={0.5} color="#06b6d4" />
            </Float>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.5} color="#06b6d4" />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent" />

      {/* Spark effects */}
      {sparkPositions.map((pos, i) => (
        <SparkBurst key={i} position={pos} />
      ))}

      <motion.div
        className="relative z-10 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Pre-reveal: The question */}
        <AnimatePresence>
          {phase === 'intro' && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                What if there was a{' '}
                <motion.span
                  className="text-cyan-400 inline-block"
                  animate={{
                    textShadow: ['0 0 0px #06b6d4', '0 0 30px #06b6d4', '0 0 0px #06b6d4']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  bridge?
                </motion.span>
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                A persistent layer of context that sits between you and AI.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drag phase and beyond */}
        <AnimatePresence>
          {phase !== 'intro' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Header */}
              <div className="text-center mb-12">
                <motion.span
                  className="inline-flex items-center gap-2 px-4 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Sparkle className="w-4 h-4" />
                  {phase === 'drag' ? 'CONNECT THE PIECES' : 'INTRODUCING'}
                </motion.span>

                <motion.h2
                  className="text-4xl md:text-6xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400">
                    The Business Brain
                  </span>
                </motion.h2>

                {phase === 'drag' && (
                  <motion.p
                    className="text-lg text-white/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Drag the nodes to connect them to the Business Brain
                  </motion.p>
                )}
              </div>

              {/* Connection visualization */}
              <div className="flex items-center justify-center gap-4 md:gap-12 relative">
                {/* You node */}
                <DraggableNode
                  id="user"
                  icon={<User className="w-10 h-10 text-white/70" />}
                  label="You"
                  color="text-white/70"
                  borderColor="border-white/20"
                  bgColor="bg-white/10"
                  position={{ x: 0, y: 0 }}
                  onDragEnd={handleDragEnd}
                  isLocked={leftConnected}
                  isConnected={leftConnected}
                />

                {/* Connection line - left */}
                <div className="relative w-16 md:w-24 h-1">
                  <ConnectionLine isActive={leftConnected} from="left" />
                </div>

                {/* Brain - center */}
                <div
                  ref={brainRef}
                  className="relative w-32 h-32 md:w-44 md:h-44"
                >
                  <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                    <Suspense fallback={null}>
                      <Brain3D isActive={true} isConnected={isFullyConnected} />
                      <ambientLight intensity={0.4} />
                      <pointLight position={[3, 3, 3]} intensity={0.8} color="#06b6d4" />
                      <pointLight position={[-3, -3, 3]} intensity={0.5} color="#10b981" />
                    </Suspense>
                  </Canvas>

                  {/* Drop zone indicator */}
                  {phase === 'drag' && !isFullyConnected && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}

                  {/* Label */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center">
                    <span className="text-sm font-medium text-cyan-400">Business Brain</span>
                  </div>
                </div>

                {/* Connection line - right */}
                <div className="relative w-16 md:w-24 h-1">
                  <ConnectionLine isActive={rightConnected} from="right" />
                </div>

                {/* AI node */}
                <DraggableNode
                  id="ai"
                  icon={<Zap className="w-10 h-10 text-emerald-400" />}
                  label="AI"
                  color="text-emerald-400"
                  borderColor="border-emerald-500/30"
                  bgColor="bg-emerald-500/10"
                  position={{ x: 0, y: 0 }}
                  onDragEnd={handleDragEnd}
                  isLocked={rightConnected}
                  isConnected={rightConnected}
                />
              </div>

              {/* Status message */}
              <motion.div
                className="mt-16 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {phase === 'drag' && !isFullyConnected && (
                  <div className="flex items-center justify-center gap-4">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${leftConnected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/30'}`}>
                      {leftConnected ? <Check className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-white/30" />}
                      <span className="text-sm">User Connected</span>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${rightConnected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/30'}`}>
                      {rightConnected ? <Check className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-white/30" />}
                      <span className="text-sm">AI Connected</span>
                    </div>
                  </div>
                )}

                {phase === 'complete' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-xl text-white/70 max-w-2xl mx-auto mb-2">
                      Your AI now has complete knowledge of your business —
                    </p>
                    <p className="text-lg text-cyan-400 font-medium">
                      clients, projects, decisions, and history.
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Continue button */}
              {onComplete && phase === 'complete' && (
                <motion.button
                  onClick={onComplete}
                  className="mt-10 group flex items-center gap-3 mx-auto px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 rounded-xl text-cyan-400 hover:text-white hover:border-cyan-400/50 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm font-medium tracking-wide uppercase">See How It Works</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
