'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Cog,
  Smartphone,
  MessageSquare,
  Clock,
  FolderX,
  ArrowRight,
  Check,
  X,
  Zap,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { cn } from '@/lib/utils';
import { spring, staggerContainer, staggerItem, scaleIn } from '@/lib/animations';

// Pain points data
const painPoints = [
  {
    icon: Brain,
    title: 'Context Dies in Conversations',
    description:
      'Important decisions buried in Slack. Client preferences lost in email threads. Every new conversation starts from zero.',
    stat: '67%',
    statLabel: 'of context lost daily',
    color: 'cyan',
  },
  {
    icon: Cog,
    title: 'You Are the Automation',
    description:
      'Copy-pasting between tools. Manually updating status docs. Remembering to follow up. Your brain is the integration layer.',
    stat: '4.5hrs',
    statLabel: 'wasted on manual tasks',
    color: 'emerald',
  },
  {
    icon: Smartphone,
    title: '10 Tools, Zero Memory',
    description:
      "Notion for notes. Slack for chat. Email for clients. Drive for files. None of them talk to each other.",
    stat: '12+',
    statLabel: 'disconnected tools',
    color: 'amber',
  },
  {
    icon: MessageSquare,
    title: 'Repetitive Explanations',
    description:
      'Explaining the same project context over and over. New team members take weeks to get up to speed.',
    stat: '3x',
    statLabel: 'longer onboarding',
    color: 'cyan',
  },
  {
    icon: Clock,
    title: 'Time Vanishes',
    description:
      "Where did the day go? You worked hard but can't remember what you accomplished. No system tracks your wins.",
    stat: '40%',
    statLabel: 'time unaccounted for',
    color: 'emerald',
  },
  {
    icon: FolderX,
    title: 'Files Everywhere',
    description:
      'Downloads folder chaos. Desktop covered in screenshots. That document from last week? Good luck finding it.',
    stat: '19min',
    statLabel: 'avg. search time',
    color: 'amber',
  },
];

// Before/After comparison data
const comparisonItems = [
  {
    before: 'Hunt through 5 apps to find client preferences',
    after: "Ask Claude: 'What does this client prefer?'",
  },
  {
    before: 'Manually update project status in 3 places',
    after: '/status auto-updates everything',
  },
  {
    before: 'Forget action items from voice notes',
    after: 'Intake processor extracts & routes automatically',
  },
  {
    before: 'Explain project context to new team members',
    after: '/onboard gives comprehensive briefing instantly',
  },
  {
    before: 'Wonder where your time went',
    after: '/hours shows detailed breakdown',
  },
  {
    before: 'Search through folders for that one file',
    after: '/find locates anything in seconds',
  },
];

// Stats data
const stats = [
  { value: 73, suffix: '%', label: 'Less time on admin tasks', icon: Clock },
  { value: 4.5, suffix: 'x', label: 'Faster project onboarding', icon: Users },
  { value: 95, suffix: '%', label: 'Context retention rate', icon: Brain },
  { value: 25, prefix: '+', suffix: '', label: 'Slash commands available', icon: Zap },
];

// Pain Point Card Component
const PainPointCard: React.FC<{
  point: (typeof painPoints)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}> = ({ point, index, isActive, onClick }) => {
  const colorClasses = {
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  };

  const colors = colorClasses[point.color as keyof typeof colorClasses];

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'cursor-pointer transition-all duration-300',
        isActive && 'ring-2 ring-cyan-500/50'
      )}
    >
      <GlassCard className="h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center border',
                colors
              )}
            >
              <point.icon className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className={cn('text-2xl font-bold', colors.split(' ')[0])}>
                {point.stat}
              </div>
              <div className="text-xs text-white/40">{point.statLabel}</div>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
          <p className="text-white/60 text-sm leading-relaxed flex-1">
            {point.description}
          </p>
        </div>
      </GlassCard>
    </motion.div>
  );
};

// Before/After Comparison Slider
const ComparisonSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={sliderRef}
      className="relative rounded-2xl overflow-hidden border border-white/10 bg-surface/50 select-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      style={{ touchAction: 'none' }}
    >
      {/* Before Side */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 to-surface">
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
              <X className="w-4 h-4 text-red-400" />
            </div>
            <span className="text-red-400 font-semibold">Before</span>
          </div>
          <div className="space-y-3">
            {comparisonItems.map((item, i) => (
              <motion.div
                key={`before-${i}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 text-sm text-white/60"
              >
                <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                <span>{item.before}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* After Side (overlaid) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 to-surface"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="text-cyan-400 font-semibold">After</span>
          </div>
          <div className="space-y-3">
            {comparisonItems.map((item, i) => (
              <motion.div
                key={`after-${i}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 text-sm text-white/80"
              >
                <Check className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>{item.after}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
            <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
          </div>
        </div>
      </div>

      {/* Invisible overlay for height */}
      <div className="invisible p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8" />
          <span>Label</span>
        </div>
        <div className="space-y-3">
          {comparisonItems.map((_, i) => (
            <div key={i} className="flex items-start gap-3 text-sm">
              <span className="w-4 h-4 flex-shrink-0" />
              <span>Placeholder text for height</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Stats Section
const StatsSection: React.FC<{ isInView: boolean }> = ({ isInView }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <GlassCard className="text-center py-6">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <stat.icon className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.value % 1 !== 0 ? 1 : 0}
                delay={index * 0.15}
              />
            </div>
            <div className="text-sm text-white/60">{stat.label}</div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
};

// Main Component
export const ProblemSolution: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activePoint, setActivePoint] = useState(0);

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Problem Header */}
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div
            variants={staggerItem}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6"
          >
            <Target className="w-4 h-4" />
            The Problem
          </motion.div>
          <motion.h2
            variants={staggerItem}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Your Business Is{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              Scattered
            </span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            You&apos;re not disorganized. Your tools are. Information lives
            everywhere, context gets lost, and you spend more time managing than
            doing.
          </motion.p>
        </motion.div>

        {/* Pain Points Grid */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-24"
        >
          {painPoints.map((point, index) => (
            <PainPointCard
              key={index}
              point={point}
              index={index}
              isActive={activePoint === index}
              onClick={() => setActivePoint(index)}
            />
          ))}
        </motion.div>

        {/* Transition Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center mb-24"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 flex items-center justify-center">
            <ArrowRight className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Solution Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
            <Zap className="w-4 h-4" />
            The Solution
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            One{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Business Brain
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A single system that ingests everything, maintains context, and
            automates the tedious. Your AI-powered second brain for business
            operations.
          </p>
        </motion.div>

        {/* Before/After Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mb-24"
        >
          <h3 className="text-center text-xl md:text-2xl font-semibold mb-8">
            Drag to compare:{' '}
            <span className="text-white/40">Before</span> vs{' '}
            <span className="text-cyan-400">After</span>
          </h3>
          <ComparisonSlider />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-center text-xl md:text-2xl font-semibold mb-8">
            The Results Speak for Themselves
          </h3>
          <StatsSection isInView={isInView} />
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolution;
