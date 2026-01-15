'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { playNarration, stopNarration } from '../ui/Narration';
import { BridgeIcon, BusinessBrainIcon } from '../ui/Icons';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

export const MissingPieceSlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [phase, setPhase] = useState<'intro' | 'reveal' | 'complete'>('intro');

  useEffect(() => {
    if (isActive) {
      playNarration("What if there was a bridge? A persistent layer of context that sits between you and AI. Something that remembers your clients, your projects, your patterns. We call it... the Business Brain.");

      setPhase('intro');

      setTimeout(() => setPhase('reveal'), 2000);
      setTimeout(() => setPhase('complete'), 4000);
    } else {
      stopNarration();
      setPhase('intro');
    }
  }, [isActive]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent" />

      <motion.div
        className="relative z-10 w-full max-w-4xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Pre-reveal: The question */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{
            opacity: phase === 'intro' ? 1 : 0,
            y: phase === 'intro' ? 0 : -30,
            scale: phase === 'intro' ? 1 : 0.9
          }}
          transition={{ duration: 0.6 }}
          className={phase !== 'intro' ? 'pointer-events-none absolute inset-0' : ''}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What if there was a{' '}
            <span className="text-cyan-400">bridge?</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            A persistent layer of context that sits between you and AI.
          </p>
        </motion.div>

        {/* The reveal: Business Brain */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: phase === 'reveal' || phase === 'complete' ? 1 : 0,
            scale: phase === 'reveal' || phase === 'complete' ? 1 : 0.8
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={phase === 'intro' ? 'pointer-events-none' : ''}
        >
          {/* Bridge visualization */}
          <div className="mb-8">
            <BridgeIcon
              className="w-64 h-32 mx-auto"
              isActive={phase === 'reveal' || phase === 'complete'}
            />
          </div>

          <motion.span
            className="inline-block px-4 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase !== 'intro' ? 1 : 0, y: phase !== 'intro' ? 0 : 10 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            INTRODUCING
          </motion.span>

          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase !== 'intro' ? 1 : 0, y: phase !== 'intro' ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400">
              The Business Brain
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-white/70 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase !== 'intro' ? 1 : 0, y: phase !== 'intro' ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            A comprehensive context system that gives AI complete knowledge of your business —
            <span className="text-white font-medium"> clients, projects, decisions, and history.</span>
          </motion.p>

          {/* Visual representation */}
          <motion.div
            className="flex items-center justify-center gap-8 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'complete' ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* You */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-sm text-white/50">You</span>
            </div>

            {/* Arrow */}
            <motion.div
              className="flex items-center"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <div className="w-8 h-0.5 bg-gradient-to-r from-white/20 to-cyan-500" />
            </motion.div>

            {/* Business Brain */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center mb-2">
                <BusinessBrainIcon
                  className="w-full h-full"
                  isActive={phase === 'complete'}
                />
              </div>
              <span className="text-sm text-cyan-400 font-medium">Business Brain</span>
            </div>

            {/* Arrow */}
            <motion.div
              className="flex items-center"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500" />
            </motion.div>

            {/* AI */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="text-sm text-white/50">AI</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Continue button */}
        {onComplete && (
          <motion.button
            onClick={onComplete}
            className="mt-12 group flex items-center gap-2 mx-auto px-6 py-3 text-cyan-400 hover:text-white transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'complete' ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="text-sm font-medium tracking-wide uppercase">See How It Works</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};
