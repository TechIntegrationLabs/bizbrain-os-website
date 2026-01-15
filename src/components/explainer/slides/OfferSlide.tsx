'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Zap, Users } from 'lucide-react';
import { playNarration, stopNarration } from '../ui/Narration';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

const includedFeatures = [
  "Complete Business Brain setup",
  "All integrations configured",
  "30-day onboarding support",
  "Weekly strategy calls",
  "Unlimited AI interactions",
  "Custom automation workflows"
];

export const OfferSlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [revealed, setRevealed] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    if (isActive) {
      playNarration("I'm looking for founding clients. Building this takes time to customize. In exchange for your detailed feedback, you get pricing that won't exist again. I have 5 spots available.");

      setRevealed(false);
      setShowCTA(false);

      setTimeout(() => setRevealed(true), 500);
      setTimeout(() => setShowCTA(true), 2000);
    } else {
      stopNarration();
      setRevealed(false);
      setShowCTA(false);
    }
  }, [isActive]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/5 to-transparent rounded-full blur-3xl" />

      <motion.div
        className="relative z-10 w-full max-w-4xl"
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
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium mb-6"
            animate={revealed ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Sparkles className="w-4 h-4" />
            Limited Founding Client Offer
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Deploy Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Business Brain
            </span>
          </h2>
        </motion.div>

        {/* Pricing card */}
        <motion.div
          className="bg-surface rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: revealed ? 1 : 0.95, opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Top banner */}
          <div className="bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 px-6 py-4 border-b border-white/10">
            <div className="flex items-center justify-center gap-2 text-cyan-400">
              <Users className="w-5 h-5" />
              <span className="font-bold">Only 5 founding client spots available</span>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
              {/* Pricing */}
              <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
                <div className="mb-6">
                  <span className="text-white/40 text-lg">One-time setup</span>
                  <div className="flex items-baseline justify-center lg:justify-start gap-2">
                    <span className="text-5xl md:text-6xl font-bold text-white">Custom</span>
                  </div>
                  <span className="text-white/60">Based on your business complexity</span>
                </div>

                <div className="mb-6 pt-6 border-t border-white/10">
                  <span className="text-white/40 text-lg">Monthly maintenance</span>
                  <div className="flex items-baseline justify-center lg:justify-start gap-2 mt-2">
                    <span className="text-3xl font-bold text-white">Starting at</span>
                    <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                      $250
                    </span>
                    <span className="text-white/60">/mo</span>
                  </div>
                </div>

                {/* Special offer */}
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0.9 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">First Month Free</span>
                  <span className="text-emerald-400/60">for founding clients</span>
                </motion.div>
              </div>

              {/* Features */}
              <div className="flex-1">
                <h4 className="text-white/40 uppercase tracking-widest text-xs font-bold mb-4">
                  Everything Included
                </h4>
                <ul className="space-y-3">
                  {includedFeatures.map((feature, i) => (
                    <motion.li
                      key={feature}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: revealed ? 1 : 0, x: revealed ? 0 : 20 }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    >
                      <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-cyan-400" />
                      </div>
                      <span className="text-white/80">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showCTA ? 1 : 0, y: showCTA ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={onComplete}
            className="group inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white rounded-full font-bold text-xl transition-all shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105"
          >
            Get Started Today
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="mt-6 text-white/40 text-sm">
            Schedule a free discovery call • No commitment required
          </p>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-8 text-white/30 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: showCTA ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span>✓ 30-Day Money Back</span>
          <span>✓ White-Glove Setup</span>
          <span>✓ Unlimited Support</span>
        </motion.div>
      </motion.div>
    </div>
  );
};
