'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Settings, ShieldCheck } from 'lucide-react';
import { playNarration, stopNarration } from '../ui/Narration';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

export const CaseStudySlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (isActive) {
      setPhase(1);
      playNarration("Here is a real example. An $1,800 API leak. Normally? Panic. Stress. A ruined weekend.");

      setTimeout(() => {
        setPhase(2);
        playNarration("But the Business Brain detected it immediately. It ran the security protocol, rotated the keys, and analyzed the logs.");
      }, 4000);

      setTimeout(() => {
        setPhase(3);
        playNarration("In 20 minutes, it drafted the incident report, submitted the dispute, and secured a full refund. Zero human intervention.");
      }, 8000);
    } else {
      setPhase(0);
      stopNarration();
    }
  }, [isActive]);

  const phases = [
    {
      icon: AlertTriangle,
      title: "PANIC",
      subtitle: "$1,800 Leak Detected",
      activeColor: "border-red-500 text-red-400 shadow-red-500/20",
      inactiveColor: "border-white/20 text-white/30",
      bgPulse: "bg-red-500/20"
    },
    {
      icon: Settings,
      title: "ACTION",
      subtitle: "System runs security protocol",
      activeColor: "border-cyan-500 text-cyan-400 shadow-cyan-500/20",
      inactiveColor: "border-white/20 text-white/30",
      bgPulse: "bg-cyan-500/20"
    },
    {
      icon: ShieldCheck,
      title: "RESOLUTION",
      subtitle: "Full Refund Secured",
      activeColor: "border-emerald-500 text-emerald-400 shadow-emerald-500/20",
      inactiveColor: "border-white/20 text-white/30",
      bgPulse: "bg-emerald-500/20"
    }
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-emerald-500/5" />

      <motion.div
        className="relative z-10 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 bg-white/5 border border-white/10 rounded-full text-white/60 text-sm font-medium mb-6">
            REAL CASE STUDY
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            From a <span className="text-red-400">$1,800 API leak</span> to
            <br />a <span className="text-emerald-400">full refund</span> in 20 minutes.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative flex items-center justify-between px-8 md:px-16">

          {/* Progress line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 mx-20 md:mx-32">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 via-cyan-500 to-emerald-500"
              initial={{ width: '0%' }}
              animate={{
                width: phase >= 3 ? '100%' : phase >= 2 ? '50%' : '0%'
              }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>

          {/* Phase nodes */}
          {phases.map((p, i) => {
            const phaseIndex = i + 1;
            const isActive = phase >= phaseIndex;
            const isCurrent = phase === phaseIndex;

            return (
              <motion.div
                key={p.title}
                className="relative flex flex-col items-center z-10"
                initial={{ opacity: 0.3, scale: 0.9 }}
                animate={{
                  opacity: isActive ? 1 : 0.3,
                  scale: isActive ? 1 : 0.9
                }}
                transition={{ duration: 0.6 }}
              >
                {/* Icon circle */}
                <div className="relative">
                  <div
                    className={`w-20 h-20 md:w-28 md:h-28 rounded-full border-4 bg-surface flex items-center justify-center transition-all duration-500 ${
                      isActive ? p.activeColor : p.inactiveColor
                    } ${isActive ? 'shadow-xl' : ''}`}
                  >
                    <p.icon className={`w-8 h-8 md:w-12 md:h-12 ${isCurrent && phaseIndex === 2 ? 'animate-spin-slow' : ''}`} />
                  </div>

                  {/* Pulse animation for current phase */}
                  {isCurrent && (
                    <motion.div
                      className={`absolute inset-0 rounded-full ${p.bgPulse}`}
                      animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Labels */}
                <div className="text-center mt-4 md:mt-6">
                  <span className={`font-black tracking-widest text-xs uppercase block mb-1 ${
                    isActive ? 'text-white' : 'text-white/40'
                  }`}>
                    {p.title}
                  </span>
                  <p className={`text-sm md:text-base max-w-[150px] transition-opacity ${
                    isActive ? 'text-white/70' : 'text-white/30'
                  }`}>
                    {p.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Result highlight */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <div className="text-left">
              <span className="text-emerald-400 font-bold text-lg block">$1,800 Recovered</span>
              <span className="text-white/60 text-sm">Zero human intervention required</span>
            </div>
          </div>
        </motion.div>

        {/* Continue button */}
        {onComplete && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 3 ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button
              onClick={onComplete}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-surface hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full font-bold text-white transition-all"
            >
              The Strategic Shift
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
