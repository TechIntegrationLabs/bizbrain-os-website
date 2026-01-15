'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { playNarration, stopNarration } from '../ui/Narration';
import { BusinessBrainIcon } from '../ui/Icons';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

export const IntroSlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isActive) {
      setStep(1);
      playNarration("Welcome. Quick question: How many of you have actually used AI for your business?");
    } else {
      setStep(0);
      stopNarration();
    }
  }, [isActive]);

  const handleFirstResponse = () => {
    setStep(2);
    playNarration("And be honest... did it feel generic? Like it didn't really know who you are?");
  };

  const handleSecondResponse = () => {
    setStep(3);
    playNarration("Exactly. There is a reason for that gap. Let me show you.");
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000);
  };

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
          className="w-24 h-24 mx-auto mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <BusinessBrainIcon className="w-full h-full" isActive={isActive} />
        </motion.div>

        {/* Step 1: Opening Question */}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              How many of you have used{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                AI
              </span>{' '}
              for your business?
            </h1>
            {step === 1 && (
              <motion.button
                onClick={handleFirstResponse}
                className="mt-6 px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-full font-bold text-lg hover:from-cyan-400 hover:to-emerald-400 transition-all shadow-lg shadow-cyan-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Yes, I have
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Step 2: Follow-up Question */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <p className="text-xl md:text-2xl text-white/70 mb-6">
              And be honest... did it feel{' '}
              <span className="text-cyan-400 font-semibold">generic</span>?
              <br />
              Like it didn&apos;t really know who you are?
            </p>
            {step === 2 && (
              <motion.button
                onClick={handleSecondResponse}
                className="mt-4 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-medium hover:bg-white/20 transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Yes, exactly
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Step 3: The Promise */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-2xl md:text-3xl text-white font-medium">
              <span className="text-emerald-400">Exactly.</span> There is a reason for that gap.
            </p>
            <p className="text-xl text-white/60 mt-4">
              Let me show you...
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
