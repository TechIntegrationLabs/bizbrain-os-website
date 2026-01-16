'use client';

import React, { useEffect, useRef, useState, Suspense } from 'react';
import { motion, useAnimation, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { playNarration, stopNarration } from '../ui/Narration';
import { TrendingUp, Zap, Clock, ChevronRight, Info } from 'lucide-react';
import * as THREE from 'three';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

interface DataPoint {
  x: number;
  y: number;
  label?: string;
  milestone?: boolean;
}

// Data points for the graph
const genericAIData: DataPoint[] = [
  { x: 0, y: 10, label: 'Start' },
  { x: 1, y: 15 },
  { x: 2, y: 18 },
  { x: 3, y: 22, label: 'Initial Gains', milestone: true },
  { x: 4, y: 25 },
  { x: 5, y: 28 },
  { x: 6, y: 30, label: 'Plateau Begins', milestone: true },
  { x: 7, y: 32 },
  { x: 8, y: 33 },
  { x: 9, y: 34 },
  { x: 10, y: 35, label: 'Limited Growth' }
];

const businessBrainData: DataPoint[] = [
  { x: 0, y: 10, label: 'Start' },
  { x: 1, y: 25 },
  { x: 2, y: 40, label: 'Context Kicks In', milestone: true },
  { x: 3, y: 52 },
  { x: 4, y: 62 },
  { x: 5, y: 70, label: 'Compounding', milestone: true },
  { x: 6, y: 78 },
  { x: 7, y: 85 },
  { x: 8, y: 90, label: 'Strategic Partner', milestone: true },
  { x: 9, y: 94 },
  { x: 10, y: 97, label: 'Unfair Advantage' }
];

// 3D Growth Icon
const GrowthIcon3D: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <group ref={meshRef}>
        {/* Arrow pointing up */}
        <mesh position={[0, 0.3, 0]}>
          <coneGeometry args={[0.3, 0.5, 4]} />
          <MeshDistortMaterial
            color={isActive ? '#06b6d4' : '#374151'}
            distort={isActive ? 0.2 : 0.1}
            speed={isActive ? 3 : 1}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Shaft */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.5, 8]} />
          <meshStandardMaterial
            color={isActive ? '#06b6d4' : '#374151'}
            emissive={isActive ? '#06b6d4' : '#000000'}
            emissiveIntensity={isActive ? 0.5 : 0}
          />
        </mesh>

        {isActive && (
          <Sparkles
            count={20}
            scale={1.5}
            size={2}
            speed={0.5}
            color="#06b6d4"
          />
        )}

        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#06b6d4" />
      </group>
    </Float>
  );
};

// Data Point Tooltip
const DataPointTooltip: React.FC<{
  point: DataPoint;
  x: number;
  y: number;
  color: string;
  isHovered: boolean;
  isBrain: boolean;
}> = ({ point, x, y, color, isHovered, isBrain }) => {
  return (
    <g className="cursor-pointer">
      {/* Glow effect */}
      <circle
        cx={x}
        cy={y}
        r={isHovered ? 12 : 6}
        fill={color}
        opacity={isHovered ? 0.3 : 0}
        className="transition-all duration-300"
      />

      {/* Main dot */}
      <circle
        cx={x}
        cy={y}
        r={isHovered ? 8 : 4}
        fill={color}
        className="transition-all duration-300"
        style={{ filter: `drop-shadow(0 0 ${isHovered ? 12 : 4}px ${color})` }}
      />

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && point.label && (
          <foreignObject
            x={x - 80}
            y={y - 60}
            width={160}
            height={50}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-surface border border-white/20 rounded-lg px-3 py-2 text-center shadow-xl"
            >
              <p className="text-xs font-medium text-white">{point.label}</p>
              <p className="text-[10px] text-white/50">
                {isBrain ? 'AI + Context' : 'Generic AI'}: {point.y}%
              </p>
            </motion.div>
          </foreignObject>
        )}
      </AnimatePresence>

      {/* Milestone marker */}
      {point.milestone && (
        <circle
          cx={x}
          cy={y}
          r={isHovered ? 14 : 10}
          fill="none"
          stroke={color}
          strokeWidth={1}
          strokeDasharray="4 2"
          opacity={0.5}
          className="transition-all duration-300"
        />
      )}
    </g>
  );
};

// Timeline Slider
const TimelineSlider: React.FC<{
  value: number;
  onChange: (v: number) => void;
  max: number;
  isActive: boolean;
}> = ({ value, onChange, max, isActive }) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue((value / max) * 100);

  const handleDrag = (event: any, info: any) => {
    if (!constraintsRef.current) return;
    const rect = constraintsRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, (info.point.x - rect.left) / rect.width * 100));
    const newValue = Math.round((percentage / 100) * max);
    onChange(newValue);
  };

  return (
    <motion.div
      ref={constraintsRef}
      className="relative h-8 w-full max-w-md mx-auto cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
      transition={{ delay: 1 }}
    >
      {/* Track */}
      <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>

      {/* Time markers */}
      {Array.from({ length: max + 1 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 w-0.5 h-3 -translate-y-1/2 bg-white/20"
          style={{ left: `${(i / max) * 100}%` }}
        />
      ))}

      {/* Thumb */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50 flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ left: `${(value / max) * 100}%` }}
        drag="x"
        dragConstraints={constraintsRef}
        dragElastic={0}
        dragMomentum={false}
        onDrag={handleDrag}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <Clock className="w-3 h-3 text-white" />
      </motion.div>

      {/* Labels */}
      <div className="absolute -bottom-6 left-0 text-xs text-white/40">Now</div>
      <div className="absolute -bottom-6 right-0 text-xs text-white/40">1 Year</div>
    </motion.div>
  );
};

// Gap Indicator
const GapIndicator: React.FC<{
  genericY: number;
  brainY: number;
  x: number;
  graphHeight: number;
  maxY: number;
  isVisible: boolean;
}> = ({ genericY, brainY, x, graphHeight, maxY, isVisible }) => {
  const yScale = graphHeight / maxY;
  const topY = graphHeight - brainY * yScale;
  const bottomY = graphHeight - genericY * yScale;
  const gap = brainY - genericY;

  return (
    <AnimatePresence>
      {isVisible && gap > 10 && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Gap line */}
          <line
            x1={x}
            y1={topY}
            x2={x}
            y2={bottomY}
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="4 4"
          />

          {/* Gap value */}
          <foreignObject
            x={x + 10}
            y={(topY + bottomY) / 2 - 15}
            width={80}
            height={30}
          >
            <motion.div
              className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-2 py-1 text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
            >
              <span className="text-xs font-bold text-emerald-400">+{gap}%</span>
            </motion.div>
          </foreignObject>
        </motion.g>
      )}
    </AnimatePresence>
  );
};

// Convert data to SVG path
const dataToPath = (data: DataPoint[], width: number, height: number, maxY: number, upToX: number) => {
  const xScale = width / (data.length - 1);
  const yScale = height / maxY;

  return data
    .filter(point => point.x <= upToX)
    .map((point, i) => {
      const x = point.x * xScale;
      const y = height - point.y * yScale;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
};

export const GraphSlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [showBrainLine, setShowBrainLine] = useState(false);
  const [timelineValue, setTimelineValue] = useState(0);
  const [hoveredPoint, setHoveredPoint] = useState<{ type: 'generic' | 'brain'; index: number } | null>(null);
  const [showGap, setShowGap] = useState(false);
  const genericControls = useAnimation();
  const brainControls = useAnimation();

  const graphWidth = 600;
  const graphHeight = 350;
  const maxY = 100;

  useEffect(() => {
    if (isActive) {
      playNarration("Businesses that fully integrate AI will win. Others simply won't be able to compete. Generic AI plateaus quickly. But when you add a Context Layer...");

      // Animate generic AI line first
      genericControls.start({
        pathLength: 1,
        transition: { duration: 2, ease: "easeOut" }
      });

      // Animate timeline
      let frame = 0;
      const interval = setInterval(() => {
        frame++;
        if (frame <= 10) {
          setTimelineValue(frame);
        } else {
          clearInterval(interval);
        }
      }, 300);

      // Show and animate Business Brain line after delay
      setTimeout(() => {
        setShowBrainLine(true);
        playNarration("Your advantage compounds. It learns you. It gets smarter. The gap becomes impossible to close.");
        brainControls.start({
          pathLength: 1,
          transition: { duration: 2.5, ease: "easeOut" }
        });

        setTimeout(() => setShowGap(true), 1500);
      }, 4000);

      return () => clearInterval(interval);
    } else {
      stopNarration();
      setShowBrainLine(false);
      setTimelineValue(0);
      setShowGap(false);
      setHoveredPoint(null);
      genericControls.set({ pathLength: 0 });
      brainControls.set({ pathLength: 0 });
    }
  }, [isActive, genericControls, brainControls]);

  const genericPath = dataToPath(genericAIData, graphWidth, graphHeight, maxY, timelineValue);
  const brainPath = dataToPath(businessBrainData, graphWidth, graphHeight, maxY, timelineValue);

  const xScale = graphWidth / (genericAIData.length - 1);
  const yScale = graphHeight / maxY;

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-4 md:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />

      <motion.div
        className="relative z-10 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header with 3D icon */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
          <motion.div
            className="w-20 h-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
              <Suspense fallback={null}>
                <GrowthIcon3D isActive={showBrainLine} />
              </Suspense>
            </Canvas>
          </motion.div>

          <div className="text-center md:text-left">
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Context is{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                everything.
              </span>
            </motion.h2>

            <motion.p
              className="text-sm md:text-lg text-white/50 mt-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Drag the timeline to see the compounding advantage
            </motion.p>
          </div>
        </div>

        {/* Timeline slider */}
        <div className="mb-6">
          <TimelineSlider
            value={timelineValue}
            onChange={setTimelineValue}
            max={10}
            isActive={isActive}
          />
        </div>

        {/* Graph container */}
        <motion.div
          className="relative bg-surface/50 border border-white/10 rounded-2xl p-4 md:p-8 backdrop-blur-sm"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: isActive ? 1 : 0.95, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Y-axis label */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 hidden md:block">
            <span className="text-xs text-white/40 uppercase tracking-widest">Effectiveness</span>
          </div>

          {/* X-axis label */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <span className="text-xs text-white/40 uppercase tracking-widest">Time</span>
          </div>

          {/* SVG Graph */}
          <svg
            viewBox={`0 0 ${graphWidth} ${graphHeight}`}
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Grid lines */}
            {[0.25, 0.5, 0.75].map((ratio) => (
              <line
                key={ratio}
                x1="0"
                y1={graphHeight * ratio}
                x2={graphWidth}
                y2={graphHeight * ratio}
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="5,5"
              />
            ))}

            {/* Vertical grid lines */}
            {Array.from({ length: 11 }).map((_, i) => (
              <line
                key={i}
                x1={i * (graphWidth / 10)}
                y1="0"
                x2={i * (graphWidth / 10)}
                y2={graphHeight}
                stroke="rgba(255,255,255,0.03)"
              />
            ))}

            {/* Gradient definitions */}
            <defs>
              <linearGradient id="brainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <linearGradient id="genericGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Area fills */}
            <motion.path
              d={`${genericPath} L ${timelineValue * xScale} ${graphHeight} L 0 ${graphHeight} Z`}
              fill="url(#genericGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 1 }}
            />

            {showBrainLine && (
              <motion.path
                d={`${brainPath} L ${timelineValue * xScale} ${graphHeight} L 0 ${graphHeight} Z`}
                fill="url(#brainGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 1, delay: 1 }}
              />
            )}

            {/* Generic AI line */}
            <motion.path
              d={genericPath}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={genericControls}
              filter="url(#glow)"
            />

            {/* Business Brain line */}
            {showBrainLine && (
              <motion.path
                d={brainPath}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={brainControls}
                filter="url(#glow)"
              />
            )}

            {/* Gap indicator */}
            <GapIndicator
              genericY={genericAIData[timelineValue]?.y || 0}
              brainY={businessBrainData[timelineValue]?.y || 0}
              x={timelineValue * xScale}
              graphHeight={graphHeight}
              maxY={maxY}
              isVisible={showGap && showBrainLine}
            />

            {/* Data points - Generic AI */}
            {genericAIData.filter(p => p.x <= timelineValue).map((point, i) => (
              <DataPointTooltip
                key={`generic-${i}`}
                point={point}
                x={point.x * xScale}
                y={graphHeight - point.y * yScale}
                color="#f59e0b"
                isHovered={hoveredPoint?.type === 'generic' && hoveredPoint.index === i}
                isBrain={false}
              />
            ))}

            {/* Data points - Business Brain */}
            {showBrainLine && businessBrainData.filter(p => p.x <= timelineValue).map((point, i) => (
              <DataPointTooltip
                key={`brain-${i}`}
                point={point}
                x={point.x * xScale}
                y={graphHeight - point.y * yScale}
                color="#06b6d4"
                isHovered={hoveredPoint?.type === 'brain' && hoveredPoint.index === i}
                isBrain={true}
              />
            ))}

            {/* Interactive overlay for hover detection */}
            {genericAIData.filter(p => p.x <= timelineValue).map((point, i) => (
              <circle
                key={`hover-generic-${i}`}
                cx={point.x * xScale}
                cy={graphHeight - point.y * yScale}
                r={20}
                fill="transparent"
                onMouseEnter={() => setHoveredPoint({ type: 'generic', index: i })}
                onMouseLeave={() => setHoveredPoint(null)}
                style={{ cursor: 'pointer' }}
              />
            ))}

            {showBrainLine && businessBrainData.filter(p => p.x <= timelineValue).map((point, i) => (
              <circle
                key={`hover-brain-${i}`}
                cx={point.x * xScale}
                cy={graphHeight - point.y * yScale}
                r={20}
                fill="transparent"
                onMouseEnter={() => setHoveredPoint({ type: 'brain', index: i })}
                onMouseLeave={() => setHoveredPoint(null)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </svg>

          {/* Legend */}
          <div className="flex justify-center gap-8 mt-6">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <div className="w-4 h-1 bg-amber-500 rounded-full" style={{ boxShadow: '0 0 8px #f59e0b' }} />
              <span className="text-xs md:text-sm text-white/60">Generic AI</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: showBrainLine ? 1 : 0, x: showBrainLine ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="w-4 h-1 bg-cyan-500 rounded-full" style={{ boxShadow: '0 0 8px #06b6d4' }} />
              <span className="text-xs md:text-sm text-white/60">AI + Business Brain</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-6 grid grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showBrainLine ? 1 : 0, y: showBrainLine ? 0 : 20 }}
          transition={{ delay: 2 }}
        >
          {[
            { label: 'Gap at Month 6', value: '+48%', color: 'emerald' },
            { label: 'Compounding Rate', value: '~15%/mo', color: 'cyan' },
            { label: 'Plateau Point', value: 'Never', color: 'amber' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-surface/50 border border-white/10 rounded-xl p-4 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2 + i * 0.1 }}
            >
              <p className={`text-lg md:text-2xl font-bold ${
                stat.color === 'emerald' ? 'text-emerald-400' :
                stat.color === 'cyan' ? 'text-cyan-400' : 'text-amber-400'
              }`}>
                {stat.value}
              </p>
              <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Key insight */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showBrainLine ? 1 : 0, y: showBrainLine ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 2.5 }}
        >
          <p className="text-base md:text-xl text-white/80">
            The gap isn&apos;t about the AI. It&apos;s about{' '}
            <span className="text-cyan-400 font-semibold">what it knows about your business.</span>
          </p>
        </motion.div>

        {/* Continue button */}
        {onComplete && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: showBrainLine ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 3 }}
          >
            <button
              onClick={onComplete}
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              <span>See the Problem</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
