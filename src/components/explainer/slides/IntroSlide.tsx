'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { playNarration, stopNarration } from '../ui/Narration';
import { BusinessBrainIcon } from '../ui/Icons';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

export const IntroSlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  useEffect(() => {
    if (isActive) {
      playNarration("You're not using AI. You're feeding it one piece of context at a time.");
    } else {
      stopNarration();
    }
  }, [isActive]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 40 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Animated brain icon */}
        <motion.div
          className="w-32 h-32 mx-auto mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <BusinessBrainIcon className="w-full h-full" isActive={isActive} />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          You&apos;re not{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            using AI.
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          You&apos;re feeding it one piece of context at a time.
          <span className="text-white/80 font-medium"> Every. Single. Conversation.</span>
        </motion.p>

        {/* Animated tagline */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {['Your clients', 'Your projects', 'Your goals', 'Your history'].map((item, i) => (
            <motion.span
              key={item}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/60 text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
              transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA to continue */}
        {onComplete && (
          <motion.button
            onClick={onComplete}
            className="mt-12 group flex items-center gap-2 mx-auto px-6 py-3 text-cyan-400 hover:text-white transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <span className="text-sm font-medium tracking-wide uppercase">See the Problem</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};
