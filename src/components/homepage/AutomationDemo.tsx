'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mic, CheckSquare, Mail, UserPlus, FileEdit, Bell, Sparkles } from 'lucide-react';

/**
 * AutomationDemo - Homepage-ready component
 *
 * Shows how one voice note triggers multiple automated updates.
 * Animates when scrolled into view.
 */

const automatedActions = [
  { icon: CheckSquare, text: 'Updates to-do list', delay: 0 },
  { icon: FileEdit, text: 'Creates change order if needed', delay: 0.15 },
  { icon: UserPlus, text: 'Adds new client with contact info', delay: 0.3 },
  { icon: Mail, text: 'Sends "nice to meet you" email', delay: 0.45 },
  { icon: Bell, text: 'Sends Slack + email notifications', delay: 0.6 },
];

export const AutomationDemo: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [step, setStep] = useState(0);
  const [completedActions, setCompletedActions] = useState<number[]>([]);

  // Trigger animation when in view
  useEffect(() => {
    if (isInView) {
      // Show voice note input
      setTimeout(() => setStep(1), 500);

      // Start showing outputs
      setTimeout(() => setStep(2), 1500);

      // Complete each action with delay
      automatedActions.forEach((_, index) => {
        setTimeout(() => {
          setCompletedActions(prev => [...prev, index]);
        }, 2000 + index * 400);
      });

      // Show completion state
      setTimeout(() => setStep(3), 2000 + automatedActions.length * 400 + 500);
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          Zero Manual Work
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          One Voice Note.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            Ten Updates.
          </span>
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Record a quick thought. Business Brain handles the rest.
        </p>
      </motion.div>

      {/* Demo Container */}
      <div className="relative bg-surface rounded-2xl border border-white/10 p-8 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          {/* Voice Input */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={step >= 1 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-32 border-2 border-white/20 rounded-2xl flex flex-col items-center justify-center relative bg-white/5">
              <Mic className={`w-8 h-8 ${step >= 1 ? 'text-cyan-400' : 'text-white/40'}`} />

              {/* Waveform animation */}
              {step >= 1 && step < 3 && (
                <div className="absolute bottom-4 flex gap-1 items-end h-6">
                  {[1, 3, 2, 4, 2, 3, 1].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-cyan-400 rounded-full"
                      animate={{ height: [`${h * 4}px`, `${h * 8}px`, `${h * 4}px`] }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            <span className="mt-4 text-white/60 text-sm font-medium">Voice Note</span>
          </motion.div>

          {/* Flow Lines (SVG) */}
          <div className="hidden md:block flex-1 h-[300px] relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
              {/* Connection paths */}
              {automatedActions.map((_, i) => {
                const yOffset = 30 + i * 50;
                const isComplete = completedActions.includes(i);
                return (
                  <motion.path
                    key={i}
                    d={`M 0,150 Q 100,150 200,${yOffset} Q 300,${yOffset} 400,${yOffset}`}
                    fill="none"
                    stroke={isComplete ? '#10b981' : 'rgba(255,255,255,0.1)'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={step >= 2 ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                  />
                );
              })}

              {/* Animated pulse along paths */}
              {step >= 2 && step < 3 && (
                <motion.circle
                  r="4"
                  fill="#06b6d4"
                  animate={{
                    cx: [0, 200, 400],
                    cy: [150, 150, 150],
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </svg>
          </div>

          {/* Mobile arrow */}
          <div className="md:hidden flex items-center justify-center">
            <motion.div
              className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center"
              animate={step >= 2 ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.8, repeat: step < 3 ? Infinity : 0 }}
            >
              <span className="text-cyan-400">↓</span>
            </motion.div>
          </div>

          {/* Output Actions */}
          <div className="flex flex-col gap-3 w-full md:w-auto">
            {automatedActions.map((action, i) => {
              const Icon = action.icon;
              const isComplete = completedActions.includes(i);
              return (
                <motion.div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    isComplete
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-white/5 border-white/10'
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={step >= 2 ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: action.delay }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isComplete ? 'bg-emerald-500/20' : 'bg-white/5'
                  }`}>
                    <Icon className={`w-4 h-4 ${isComplete ? 'text-emerald-400' : 'text-white/40'}`} />
                  </div>
                  <span className={`text-sm ${isComplete ? 'text-white' : 'text-white/60'}`}>
                    {action.text}
                  </span>
                  {isComplete && (
                    <motion.span
                      className="ml-auto text-emerald-400"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Completion message */}
        {step >= 3 && (
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="text-emerald-400 font-medium text-sm">
                ✓ All updates complete • Zero manual work
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AutomationDemo;
