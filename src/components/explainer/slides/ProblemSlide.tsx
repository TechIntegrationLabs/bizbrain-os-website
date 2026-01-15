'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Brain, Zap, AlertTriangle } from 'lucide-react';
import { playNarration, stopNarration } from '../ui/Narration';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

const problemItems = [
  {
    icon: RefreshCw,
    title: "Endless Re-explaining",
    description: "Every conversation starts from scratch. Your AI has amnesia.",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20"
  },
  {
    icon: Brain,
    title: "No Business IQ",
    description: "It doesn't know your clients, your projects, or your goals.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20"
  },
  {
    icon: Zap,
    title: "Generic Responses",
    description: "Without context, you get generic advice anyone could get.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20"
  },
  {
    icon: AlertTriangle,
    title: "Scattered Knowledge",
    description: "Your business intelligence is fragmented across tools.",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20"
  }
];

export const ProblemSlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [visibleItems, setVisibleItems] = useState<number>(0);

  useEffect(() => {
    if (isActive) {
      playNarration("Think about your current AI usage. You explain your business every time. It doesn't know who Smith Corp is. It can't remember last month's strategy. The problem isn't the AI. The problem is the context.");

      // Stagger reveal of problem items
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setVisibleItems(count);
        if (count >= problemItems.length) {
          clearInterval(interval);
        }
      }, 600);

      return () => clearInterval(interval);
    } else {
      stopNarration();
      setVisibleItems(0);
    }
  }, [isActive]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Warning gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-red-500/5 via-transparent to-transparent opacity-50" />

      <motion.div
        className="relative z-10 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: isActive ? 0 : 30, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm font-medium mb-4">
            THE PROBLEM
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your AI has{' '}
            <span className="text-red-400">amnesia.</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Every conversation starts from zero. No memory. No context. No business intelligence.
          </p>
        </motion.div>

        {/* Problem grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problemItems.map((item, index) => (
            <motion.div
              key={item.title}
              className={`relative p-6 rounded-2xl border ${item.borderColor} ${item.bgColor} backdrop-blur-sm overflow-hidden`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{
                opacity: visibleItems > index ? 1 : 0,
                y: visibleItems > index ? 0 : 30,
                scale: visibleItems > index ? 1 : 0.95
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center mb-4`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/60">{item.description}</p>

              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-20 h-20 ${item.bgColor} rounded-bl-full opacity-50`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: visibleItems >= problemItems.length ? 1 : 0, y: visibleItems >= problemItems.length ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <blockquote className="text-xl text-white/80 italic max-w-2xl mx-auto">
            &ldquo;The AI is powerful. But it&apos;s like hiring a genius who forgets everything after every conversation.&rdquo;
          </blockquote>
        </motion.div>

        {/* Continue button */}
        {onComplete && (
          <motion.button
            onClick={onComplete}
            className="mt-8 group flex items-center gap-2 mx-auto px-6 py-3 text-cyan-400 hover:text-white transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: visibleItems >= problemItems.length ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="text-sm font-medium tracking-wide uppercase">Discover the Solution</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};
