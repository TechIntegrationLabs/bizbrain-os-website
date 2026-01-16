'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { Shield, Clock, Headphones, RefreshCw, ArrowRight, TrendingUp, Zap, Calculator, Trophy } from 'lucide-react';
import * as THREE from 'three';
import { playNarration, stopNarration } from '../ui/Narration';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

// 3D Trophy Component
const Trophy3D: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const trophyRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (trophyRef.current) {
      trophyRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      if (hovered) {
        trophyRef.current.scale.setScalar(1.1 + Math.sin(state.clock.elapsedTime * 3) * 0.05);
      } else {
        trophyRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group
        ref={trophyRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {/* Trophy Cup */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.5, 0.3, 0.8, 32]} />
          <MeshDistortMaterial
            color="#10b981"
            metalness={0.9}
            roughness={0.1}
            distort={0.1}
            speed={2}
          />
        </mesh>

        {/* Trophy Base */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.25, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#1f2937" metalness={0.5} roughness={0.3} />
        </mesh>

        {/* Trophy Stem */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.1, 0.15, 0.3, 16]} />
          <meshStandardMaterial color="#10b981" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Handles */}
        <mesh position={[0.55, 0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[0.15, 0.04, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#10b981" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.55, 0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <torusGeometry args={[0.15, 0.04, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#10b981" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Star on top */}
        <mesh position={[0, 0.85, 0]}>
          <octahedronGeometry args={[0.15, 0]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
        </mesh>

        {isActive && (
          <Sparkles count={30} scale={2} size={3} speed={0.5} color="#10b981" />
        )}
      </group>

      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#10b981" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#06b6d4" />
    </Float>
  );
};

// Flip Card Component
interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  isFlipped: boolean;
  onClick: () => void;
  delay: number;
  isRevealed: boolean;
}

const FlipCard: React.FC<FlipCardProps> = ({ front, back, isFlipped, onClick, delay, isRevealed }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: -30 }}
      animate={isRevealed ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative w-full h-44 cursor-pointer"
      onClick={onClick}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-surface/50 rounded-2xl border border-white/10 p-5 flex flex-col items-center justify-center hover:border-emerald-500/30 transition-colors"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {front}
          <span className="absolute bottom-2 text-[10px] text-white/30">Click to flip</span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl p-5 flex flex-col items-center justify-center text-white"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {back}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ROI Calculator Component
interface ROICalculatorProps {
  isVisible: boolean;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ isVisible }) => {
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(100);
  const [months, setMonths] = useState(6);

  const weeklySavings = hoursPerWeek * hourlyRate;
  const totalSavings = weeklySavings * (months * 4);
  const investmentCost = 1500 + (250 * months);
  const roi = Math.max(0, ((totalSavings - investmentCost) / investmentCost * 100)).toFixed(0);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-surface/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 w-full"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="font-bold text-white">ROI Calculator</h4>
              <p className="text-xs text-white/40">Estimate your potential return</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Hours Saved Slider */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/60">Hours saved per week</span>
                <span className="font-bold text-cyan-400">{hoursPerWeek} hrs</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            {/* Hourly Rate Slider */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/60">Your hourly rate</span>
                <span className="font-bold text-cyan-400">${hourlyRate}/hr</span>
              </div>
              <input
                type="range"
                min="25"
                max="300"
                step="25"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            {/* Months Slider */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/60">Time period</span>
                <span className="font-bold text-cyan-400">{months} months</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={months}
                onChange={(e) => setMonths(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            {/* Results */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white/5 rounded-xl">
                <p className="text-xs text-white/40 mb-1">Time Savings</p>
                <p className="text-xl font-bold text-white">{hoursPerWeek * months * 4} hrs</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-xl">
                <p className="text-xs text-white/40 mb-1">Value Created</p>
                <p className="text-xl font-bold text-emerald-400">${totalSavings.toLocaleString()}</p>
              </div>
            </div>

            <motion.div
              className="text-center p-4 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-xl border border-cyan-500/20"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-sm text-white/60 mb-1">Projected ROI</p>
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">{roi}%</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Live Head Start Counter
interface HeadStartCounterProps {
  isActive: boolean;
  startTime: number | null;
}

const HeadStartCounter: React.FC<HeadStartCounterProps> = ({ isActive, startTime }) => {
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [advantagePoints, setAdvantagePoints] = useState(0);

  useEffect(() => {
    if (!isActive || !startTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = now - startTime;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setElapsed({ days, hours, minutes, seconds });
      setAdvantagePoints(Math.floor(diff / 100)); // 10 points per second
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, startTime]);

  const units = [
    { label: 'DAYS', value: elapsed.days },
    { label: 'HRS', value: elapsed.hours },
    { label: 'MIN', value: elapsed.minutes },
    { label: 'SEC', value: elapsed.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface/80 backdrop-blur-xl rounded-2xl border border-white/10 p-5 text-white"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-bold text-white/60">YOUR HEAD START</span>
        </div>
        <motion.div
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-bold text-emerald-400">LIVE</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {units.map((unit) => (
          <div key={unit.label} className="text-center">
            <motion.div
              className="text-2xl font-mono font-bold text-white"
              key={unit.value}
              initial={{ opacity: 0.5, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {String(unit.value).padStart(2, '0')}
            </motion.div>
            <div className="text-[10px] text-white/40 font-bold tracking-wider">{unit.label}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <span className="text-sm text-white/40">Advantage Points</span>
        <motion.span
          className="text-xl font-bold text-emerald-400"
          key={advantagePoints}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
        >
          +{advantagePoints.toLocaleString()}
        </motion.span>
      </div>
    </motion.div>
  );
};

// Interactive Competitive Chart
const CompetitiveChart: React.FC<{ isVisible: boolean; timelineProgress: number }> = ({ isVisible, timelineProgress }) => {
  const width = 400;
  const height = 220;
  const padding = 40;

  const getYouY = (x: number): number => {
    const normalized = x / 100;
    return 100 - (normalized * normalized * 100);
  };

  const getCompetitorY = (x: number): number => {
    const normalized = x / 100;
    return 100 - (normalized * 40);
  };

  const createPath = (getY: (x: number) => number): string => {
    const points: string[] = [];
    const maxX = Math.min(100, timelineProgress);

    for (let x = 0; x <= maxX; x += 2) {
      const px = padding + (x / 100) * (width - padding * 2);
      const py = padding + (getY(x) / 100) * (height - padding * 2);
      points.push(`${x === 0 ? 'M' : 'L'} ${px} ${py}`);
    }

    return points.join(' ');
  };

  const youPath = createPath(getYouY);
  const competitorPath = createPath(getCompetitorY);

  const currentX = padding + (timelineProgress / 100) * (width - padding * 2);
  const currentYouY = padding + (getYouY(timelineProgress) / 100) * (height - padding * 2);
  const currentCompY = padding + (getCompetitorY(timelineProgress) / 100) * (height - padding * 2);

  const gap = currentCompY - currentYouY;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <svg width={width} height={height} className="overflow-visible">
            {/* Grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect x={padding} y={padding} width={width - padding * 2} height={height - padding * 2} fill="url(#grid)" />

            {/* Axes */}
            <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

            {/* Axis Labels */}
            <text x={width / 2} y={height - 10} textAnchor="middle" className="fill-white/40 text-[10px] font-bold">TIME</text>

            {/* Gap Area */}
            {timelineProgress > 10 && (
              <motion.path
                d={`${youPath} L ${currentX} ${currentCompY} ${competitorPath.split(' ').reverse().join(' ')} Z`}
                fill="url(#gapGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}

            <defs>
              <linearGradient id="gapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Competitor Line */}
            <motion.path
              d={competitorPath}
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5 }}
            />

            {/* Your Line */}
            <motion.path
              d={youPath}
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5 }}
            />

            {/* Current Position Markers */}
            {timelineProgress > 5 && (
              <>
                <motion.circle
                  cx={currentX}
                  cy={currentYouY}
                  r="6"
                  fill="#10b981"
                  stroke="white"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
                <motion.circle
                  cx={currentX}
                  cy={currentCompY}
                  r="4"
                  fill="rgba(255,255,255,0.4)"
                  stroke="white"
                  strokeWidth="1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />

                {/* Gap Indicator */}
                {gap > 20 && (
                  <g>
                    <line x1={currentX + 15} y1={currentYouY} x2={currentX + 15} y2={currentCompY} stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />
                    <foreignObject x={currentX + 20} y={(currentYouY + currentCompY) / 2 - 12} width="70" height="24">
                      <div className="bg-cyan-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">
                        +{Math.round(gap / 2)}% Lead
                      </div>
                    </foreignObject>
                  </g>
                )}
              </>
            )}

            {/* Labels */}
            <foreignObject x={width - 100} y={currentYouY - 25} width="80" height="20">
              <div className="text-xs font-bold text-emerald-400">You + BB</div>
            </foreignObject>
            <foreignObject x={width - 100} y={currentCompY - 25} width="80" height="20">
              <div className="text-xs font-bold text-white/40">Others</div>
            </foreignObject>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Guarantee cards data
const guaranteeCards = [
  {
    icon: Shield,
    title: "First Mover Advantage",
    front: (
      <>
        <Shield className="w-10 h-10 text-emerald-400 mb-2" />
        <h3 className="font-bold text-white text-sm text-center">First Mover Advantage</h3>
      </>
    ),
    back: (
      <>
        <h3 className="font-bold text-base mb-1">Why It Matters</h3>
        <p className="text-xs opacity-90 text-center">Every day you wait, competitors could be building their context layer. Early adopters create insurmountable leads.</p>
      </>
    )
  },
  {
    icon: TrendingUp,
    title: "Compounding Intelligence",
    front: (
      <>
        <TrendingUp className="w-10 h-10 text-cyan-400 mb-2" />
        <h3 className="font-bold text-white text-sm text-center">Compounding Intelligence</h3>
      </>
    ),
    back: (
      <>
        <h3 className="font-bold text-base mb-1">How It Works</h3>
        <p className="text-xs opacity-90 text-center">Your Business Brain learns more each day. 6 months of context can&apos;t be replicated—it must be earned.</p>
      </>
    )
  },
  {
    icon: Zap,
    title: "Instant Deployment",
    front: (
      <>
        <Zap className="w-10 h-10 text-amber-400 mb-2" />
        <h3 className="font-bold text-white text-sm text-center">Instant Deployment</h3>
      </>
    ),
    back: (
      <>
        <h3 className="font-bold text-base mb-1">Start Today</h3>
        <p className="text-xs opacity-90 text-center">No complex setup. We integrate with your existing tools and start building context immediately.</p>
      </>
    )
  }
];

export const GuaranteeSlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [show, setShow] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [showCalculator, setShowCalculator] = useState(false);
  const [counterStartTime, setCounterStartTime] = useState<number | null>(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  useEffect(() => {
    if (isActive) {
      setShow(true);
      setCounterStartTime(Date.now());
      playNarration("The guarantee isn't a specific ROI number. It's a strategic advantage. Starting now gives you a head start that compounds daily.");

      // Animate timeline progress
      const interval = setInterval(() => {
        setTimelineProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(interval);
    } else {
      setShow(false);
      setFlippedCards(new Set());
      setShowCalculator(false);
      setCounterStartTime(null);
      setTimelineProgress(0);
      stopNarration();
    }
  }, [isActive]);

  const toggleCard = (index: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-start py-6 px-6 relative overflow-y-auto">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-cyan-500/5" />

      <motion.div
        className="relative z-10 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: show ? 0 : 20, opacity: show ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-4">
            THE GUARANTEE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Not ROI. <span className="text-emerald-400">Strategic Advantage.</span>
          </h2>
          <p className="text-base text-white/50 max-w-xl mx-auto">
            Starting now gives you a head start that compounds daily.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-5">
            {/* 3D Trophy */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={show ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="h-44 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-surface to-surface/50 border border-white/10"
            >
              <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                <React.Suspense fallback={null}>
                  <Trophy3D isActive={show} />
                </React.Suspense>
              </Canvas>
            </motion.div>

            {/* Competitive Chart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={show ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="bg-surface/50 rounded-2xl p-5 border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white text-sm">Competitive Advantage</h3>
                <div className="text-xs text-white/40">
                  Progress: <span className="font-bold text-emerald-400">{timelineProgress}%</span>
                </div>
              </div>
              <CompetitiveChart isVisible={show} timelineProgress={timelineProgress} />
            </motion.div>

            {/* Live Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <HeadStartCounter isActive={show} startTime={counterStartTime} />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Flip Cards */}
            <div className="grid grid-cols-3 gap-3">
              {guaranteeCards.map((card, i) => (
                <FlipCard
                  key={i}
                  front={card.front}
                  back={card.back}
                  isFlipped={flippedCards.has(i)}
                  onClick={() => toggleCard(i)}
                  delay={0.4 + i * 0.15}
                  isRevealed={show}
                />
              ))}
            </div>

            {/* Calculator Toggle */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={show ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              onClick={() => setShowCalculator(!showCalculator)}
              className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all ${
                showCalculator
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white'
                  : 'bg-surface/50 border border-white/10 text-white hover:border-cyan-500/50'
              }`}
            >
              <Calculator className="w-5 h-5" />
              {showCalculator ? 'Hide' : 'Calculate Your'} ROI
            </motion.button>

            {/* ROI Calculator */}
            <ROICalculator isVisible={showCalculator} />

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
              className="bg-surface/30 rounded-xl p-4 border-l-4 border-emerald-500"
            >
              <p className="text-sm text-white/70 italic">
                &quot;What I CAN guarantee: getting into an AI context layer now—with YOUR business data—positions you ahead of anyone else in your industry.&quot;
              </p>
            </motion.div>
          </div>
        </div>

        {/* CTA Button */}
        {onComplete && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: timelineProgress > 50 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={onComplete}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white rounded-full font-bold text-lg transition-all shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
            >
              See the Offer
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
