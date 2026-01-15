'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, CheckSquare, Mail, UserPlus, FileEdit, Bell } from 'lucide-react';
import { playNarration, stopNarration } from '../ui/Narration';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

const outputs = [
  { icon: CheckSquare, text: "Updates my to-do list", color: "cyan" },
  { icon: FileEdit, text: "Creates change order if needed", color: "emerald" },
  { icon: UserPlus, text: "Adds new client with contact info", color: "cyan" },
  { icon: Mail, text: "Sends 'nice to meet you' email", color: "amber" },
  { icon: Bell, text: "Sends Slack + email notification", color: "emerald" },
];

export const AutomationSlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [step, setStep] = useState(0);
  const [completedOutputs, setCompletedOutputs] = useState<number[]>([]);

  useEffect(() => {
    if (isActive) {
      playNarration("Imagine one voice note. Normally, that's an hour of admin work. Organizing, emailing, updating. With the Business Brain, it happens in seconds.");

      setStep(1);
      setCompletedOutputs([]);

      setTimeout(() => {
        setStep(2);
        // Stagger complete outputs
        outputs.forEach((_, i) => {
          setTimeout(() => {
            setCompletedOutputs(prev => [...prev, i]);
          }, i * 400);
        });
      }, 1500);

      setTimeout(() => setStep(3), 1500 + outputs.length * 400 + 1000);
    } else {
      stopNarration();
      setStep(0);
      setCompletedOutputs([]);
    }
  }, [isActive]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5" />

      <motion.div
        className="relative z-10 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12"
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
          <p className="text-xl text-white/50">Zero manual work.</p>
        </motion.div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">

          {/* Input - Voice Note */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-28 h-36 border-2 border-white/20 rounded-3xl bg-surface/50 flex items-center justify-center relative overflow-hidden">
                <Mic className="w-10 h-10 text-cyan-400" />

                {/* Waveform animation */}
                <div className="absolute bottom-4 flex gap-1 items-end h-8">
                  {[1, 3, 2, 4, 2, 3, 1].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-cyan-500 rounded-full"
                      animate={step >= 1 ? {
                        height: [`${h * 15}%`, `${h * 30}%`, `${h * 15}%`]
                      } : { height: `${h * 15}%` }}
                      transition={{
                        duration: 0.8,
                        repeat: step >= 1 && step < 3 ? Infinity : 0,
                        delay: i * 0.1
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Pulse effect */}
              {step >= 1 && step < 3 && (
                <motion.div
                  className="absolute inset-0 border-2 border-cyan-500 rounded-3xl"
                  animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </div>
            <span className="font-bold text-white">Voice Note</span>
          </motion.div>

          {/* Flow lines (desktop) */}
          <div className="hidden lg:block relative w-48 h-[300px]">
            <svg className="absolute inset-0 w-full h-full overflow-visible">
              {outputs.map((_, i) => {
                const startY = 150;
                const endY = 30 + i * 60;
                const isRevealed = step >= 2 && completedOutputs.includes(i);

                return (
                  <motion.path
                    key={i}
                    d={`M 0,${startY} C 80,${startY} 100,${endY} 180,${endY}`}
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
            <motion.svg
              className="w-8 h-8 text-cyan-500 rotate-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: step >= 2 ? 1 : 0 }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </div>

          {/* Outputs */}
          <div className="flex flex-col gap-3 w-full max-w-md">
            {outputs.map((item, i) => {
              const isComplete = completedOutputs.includes(i);
              const colorClass = item.color === 'cyan' ? 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30' :
                                 item.color === 'emerald' ? 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30' :
                                 'text-amber-400 bg-amber-500/20 border-amber-500/30';

              return (
                <motion.div
                  key={i}
                  className={`flex items-center gap-4 p-4 bg-surface/50 rounded-xl border border-white/10 transition-all ${
                    isComplete ? 'border-white/20' : ''
                  }`}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{
                    x: step >= 2 ? 0 : 30,
                    opacity: step >= 2 ? 1 : 0
                  }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className={`p-2 rounded-lg border ${colorClass}`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-white/80 flex-1">{item.text}</span>
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
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Continue button */}
        {onComplete && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={onComplete}
              className="group inline-flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-white font-medium transition-all"
            >
              See a real crisis example
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
