'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Headphones, RefreshCw } from 'lucide-react';
import { playNarration, stopNarration } from '../ui/Narration';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

const guarantees = [
  {
    icon: Shield,
    title: "ROI Guarantee",
    description: "See measurable results in 30 days or get your money back. No questions asked.",
    highlight: "30-Day Money Back"
  },
  {
    icon: Clock,
    title: "Time Savings",
    description: "Save 10+ hours per week on repetitive tasks within the first month.",
    highlight: "10+ Hours/Week"
  },
  {
    icon: Headphones,
    title: "White-Glove Setup",
    description: "We build your entire system for you. You just answer questions about your business.",
    highlight: "Done For You"
  },
  {
    icon: RefreshCw,
    title: "Continuous Evolution",
    description: "Your Business Brain learns and improves with every interaction.",
    highlight: "Always Learning"
  }
];

export const GuaranteeSlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    if (isActive) {
      playNarration("Here's our commitment: We're not selling software. We're selling transformation. If you don't see measurable results in 30 days, you get your money back. No questions asked.");

      setVisibleItems(0);
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setVisibleItems(count);
        if (count >= guarantees.length) {
          clearInterval(interval);
        }
      }, 400);

      return () => clearInterval(interval);
    } else {
      stopNarration();
      setVisibleItems(0);
    }
  }, [isActive]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-cyan-500/5" />

      <motion.div
        className="relative z-10 w-full max-w-5xl"
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
          <span className="inline-block px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-6">
            OUR COMMITMENT
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Results or your{' '}
            <span className="text-emerald-400">money back.</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            We&apos;re not selling software. We&apos;re selling transformation.
          </p>
        </motion.div>

        {/* Guarantee grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guarantees.map((item, i) => (
            <motion.div
              key={item.title}
              className="relative p-6 bg-surface/50 rounded-2xl border border-white/10 overflow-hidden group hover:border-white/20 transition-colors"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{
                opacity: visibleItems > i ? 1 : 0,
                y: visibleItems > i ? 0 : 30,
                scale: visibleItems > i ? 1 : 0.95
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Icon */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-emerald-400" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-xs font-medium rounded-full">
                      {item.highlight}
                    </span>
                  </div>
                  <p className="text-white/60">{item.description}</p>
                </div>
              </div>

              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Trust statement */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: visibleItems >= guarantees.length ? 1 : 0, y: visibleItems >= guarantees.length ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl">
            <Shield className="w-8 h-8 text-emerald-400" />
            <p className="text-white/80 text-lg">
              <span className="font-bold">Zero risk.</span> If it doesn&apos;t work, you don&apos;t pay.
            </p>
          </div>
        </motion.div>

        {/* Continue button */}
        {onComplete && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: visibleItems >= guarantees.length ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button
              onClick={onComplete}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white rounded-full font-bold text-lg transition-all shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
            >
              See the Offer
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
