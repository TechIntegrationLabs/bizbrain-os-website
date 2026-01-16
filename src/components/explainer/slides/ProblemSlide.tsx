'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Brain, Zap, AlertTriangle, ChevronDown, Clock, Users, FileX, Database, ArrowRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { playNarration, stopNarration } from '../ui/Narration';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

// 3D Warning Icon Component
const Warning3D: React.FC<{ color: string; isActive: boolean }> = ({ color, isActive }) => {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh rotation={[0, 0, 0]}>
        <coneGeometry args={[0.5, 0.8, 3]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isActive ? 0.8 : 0.3} wireframe={!isActive} />
      </mesh>
      <mesh position={[0, -0.2, 0.01]}>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, -0.5, 0.01]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
      </mesh>
    </Float>
  );
};

// Floating Warning Particles
const WarningParticles: React.FC<{ count: number }> = ({ count }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 4
    ] as [number, number, number],
    scale: Math.random() * 0.1 + 0.03,
    color: ['#ef4444', '#f97316', '#eab308', '#f59e0b'][Math.floor(Math.random() * 4)]
  }));

  return (
    <>
      {particles.map((particle, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh position={particle.position}>
            <sphereGeometry args={[particle.scale, 8, 8]} />
            <meshStandardMaterial
              color={particle.color}
              emissive={particle.color}
              emissiveIntensity={0.5}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

// Pain Meter Component
const PainMeter: React.FC<{ level: number; maxLevel: number }> = ({ level, maxLevel }) => {
  const percentage = (level / maxLevel) * 100;
  const severity = level === 0 ? 'Low' : level <= 2 ? 'Medium' : level <= 3 ? 'High' : 'Critical';
  const severityColor = level === 0 ? 'text-green-400' : level <= 2 ? 'text-yellow-400' : level <= 3 ? 'text-orange-400' : 'text-red-400';

  return (
    <div className="w-full max-w-sm mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-white/50 uppercase tracking-wider">Business Pain Level</span>
        <span className={`text-sm font-bold ${severityColor}`}>{severity}</span>
      </div>
      <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, #22c55e 0%, #eab308 30%, #f97316 60%, #ef4444 100%)`
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-white/30">0</span>
        <span className="text-[10px] text-white/30">{maxLevel}</span>
      </div>
    </div>
  );
};

// Expandable Problem Card
const ProblemCard: React.FC<{
  item: typeof problemItems[0];
  index: number;
  isVisible: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onPainIncrease: () => void;
}> = ({ item, index, isVisible, isExpanded, onToggle, onPainIncrease }) => {
  const handleClick = () => {
    if (!isExpanded) {
      onPainIncrease();
    }
    onToggle();
  };

  return (
    <motion.div
      className={`relative rounded-2xl border ${item.borderColor} ${item.bgColor} backdrop-blur-sm overflow-hidden cursor-pointer group`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 30,
        scale: isVisible ? 1 : 0.95
      }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Pulse effect on hover */}
      <motion.div
        className={`absolute inset-0 ${item.bgColor} opacity-0 group-hover:opacity-100`}
        animate={isExpanded ? { opacity: [0.3, 0.1, 0.3] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="relative p-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* 3D Icon Container */}
            <div className={`w-14 h-14 rounded-xl ${item.bgColor} border ${item.borderColor} overflow-hidden`}>
              <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
                <Suspense fallback={null}>
                  <Warning3D color={item.hexColor} isActive={isExpanded} />
                  <ambientLight intensity={0.4} />
                  <pointLight position={[2, 2, 2]} intensity={0.8} color={item.hexColor} />
                </Suspense>
              </Canvas>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-sm text-white/40">{item.subtitle}</p>
            </div>
          </div>

          {/* Expand indicator */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`p-2 rounded-full ${item.bgColor}`}
          >
            <ChevronDown className={`w-5 h-5 ${item.color}`} />
          </motion.div>
        </div>

        {/* Main description */}
        <p className="text-white/60 mb-4">{item.description}</p>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className={`pt-4 border-t ${item.borderColor}`}>
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {item.stats.map((stat, i) => (
                    <div key={i} className={`p-3 rounded-lg ${item.bgColor} border ${item.borderColor}`}>
                      <div className={`text-2xl font-bold ${item.color}`}>{stat.value}</div>
                      <div className="text-xs text-white/40">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Impact list */}
                <div className="space-y-2">
                  <span className="text-xs font-medium text-white/50 uppercase tracking-wider">Impact</span>
                  {item.impacts.map((impact, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.color.replace('text-', 'bg-')}`} />
                      {impact}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click hint */}
        {!isExpanded && (
          <motion.div
            className="absolute bottom-2 right-4 text-[10px] text-white/20 uppercase tracking-wider"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click to explore
          </motion.div>
        )}
      </div>

      {/* Decorative corner glow */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full ${item.bgColor} blur-3xl opacity-30 group-hover:opacity-50 transition-opacity`} />
    </motion.div>
  );
};

const problemItems = [
  {
    icon: RefreshCw,
    title: "Endless Re-explaining",
    subtitle: "The Amnesia Problem",
    description: "Every conversation starts from scratch. You waste 10-15 minutes per session just providing context.",
    color: "text-red-400",
    hexColor: "#f87171",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    stats: [
      { value: "15min", label: "Avg context setup time" },
      { value: "40hrs", label: "Lost per month" }
    ],
    impacts: [
      "Repeated explanations drain mental energy",
      "Context never builds or compounds",
      "Each session starts at zero"
    ]
  },
  {
    icon: Brain,
    title: "No Business IQ",
    subtitle: "The Stranger Problem",
    description: "It doesn't know your clients, your projects, or your strategic goals. It's like talking to a stranger.",
    color: "text-orange-400",
    hexColor: "#fb923c",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    stats: [
      { value: "0%", label: "Business context" },
      { value: "100%", label: "Generic advice" }
    ],
    impacts: [
      "Can't reference past decisions",
      "No understanding of relationships",
      "Misses strategic nuances"
    ]
  },
  {
    icon: Zap,
    title: "Generic Responses",
    subtitle: "The Template Problem",
    description: "Without context, you get generic advice that anyone could Google. No competitive edge.",
    color: "text-yellow-400",
    hexColor: "#facc15",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    stats: [
      { value: "80%", label: "Generic output" },
      { value: "20%", label: "Actually useful" }
    ],
    impacts: [
      "Advice lacks specificity",
      "No industry/niche understanding",
      "Competitors get same responses"
    ]
  },
  {
    icon: AlertTriangle,
    title: "Scattered Knowledge",
    subtitle: "The Fragmentation Problem",
    description: "Your business intelligence lives in 12 different tools. Nothing connects. Nothing compounds.",
    color: "text-amber-400",
    hexColor: "#fbbf24",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    stats: [
      { value: "12+", label: "Disconnected tools" },
      { value: "0", label: "Unified context" }
    ],
    impacts: [
      "Knowledge trapped in silos",
      "Manual copy-paste between tools",
      "Insights never surface automatically"
    ]
  }
];

export const ProblemSlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [visibleItems, setVisibleItems] = useState<number>(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [painLevel, setPainLevel] = useState<number>(0);
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    if (isActive) {
      playNarration("Here is the problem. Even the smartest AI is blind to your daily operations. Click the sources to see what it's missing.");

      // Stagger reveal of problem items
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setVisibleItems(count);
        if (count >= problemItems.length) {
          clearInterval(interval);
          // Play second narration when all items revealed
          setTimeout(() => {
            setShowQuote(true);
            playNarration("Without this data, it's just a generalist. But if we bridge this gap... everything changes.");
          }, 800);
        }
      }, 500);

      return () => clearInterval(interval);
    } else {
      stopNarration();
      setVisibleItems(0);
      setExpandedIndex(null);
      setPainLevel(0);
      setShowQuote(false);
    }
  }, [isActive]);

  const handleToggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handlePainIncrease = () => {
    setPainLevel(prev => Math.min(prev + 1, problemItems.length));
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* 3D Warning Background */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <Suspense fallback={null}>
            <WarningParticles count={30} />
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.5} color="#ef4444" />
            <pointLight position={[-5, -5, 5]} intensity={0.5} color="#f97316" />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-red-500/10 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0a0a0f] to-transparent" />

      <motion.div
        className="relative z-10 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: isActive ? 0 : 30, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm font-medium mb-4"
            animate={{
              boxShadow: ['0 0 0 0 rgba(239, 68, 68, 0)', '0 0 20px 5px rgba(239, 68, 68, 0.3)', '0 0 0 0 rgba(239, 68, 68, 0)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertTriangle className="w-4 h-4" />
            THE PROBLEM
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your AI has{' '}
            <motion.span
              className="text-red-400 inline-block"
              animate={{
                textShadow: ['0 0 0px #ef4444', '0 0 30px #ef4444', '0 0 0px #ef4444']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              amnesia.
            </motion.span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Every conversation starts from zero. No memory. No context. No business intelligence.
          </p>
        </motion.div>

        {/* Pain Meter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: visibleItems > 0 ? 1 : 0, y: visibleItems > 0 ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <PainMeter level={painLevel} maxLevel={problemItems.length} />
        </motion.div>

        {/* Problem grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problemItems.map((item, index) => (
            <ProblemCard
              key={item.title}
              item={item}
              index={index}
              isVisible={visibleItems > index}
              isExpanded={expandedIndex === index}
              onToggle={() => handleToggleExpand(index)}
              onPainIncrease={handlePainIncrease}
            />
          ))}
        </div>

        {/* Bottom quote */}
        <AnimatePresence>
          {showQuote && (
            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <blockquote className="text-xl text-white/80 italic max-w-2xl mx-auto border-l-4 border-red-500/50 pl-6">
                &ldquo;The AI is powerful. But it&apos;s like hiring a genius who forgets everything after every conversation.&rdquo;
              </blockquote>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue button */}
        {onComplete && (
          <motion.button
            onClick={onComplete}
            className="mt-8 group flex items-center gap-3 mx-auto px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 rounded-xl text-cyan-400 hover:text-white hover:border-cyan-400/50 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showQuote ? 1 : 0, y: showQuote ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-medium tracking-wide uppercase">Discover the Solution</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};
