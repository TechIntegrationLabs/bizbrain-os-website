'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { playNarration, stopNarration } from '../ui/Narration';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

export const StrategicSlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [typedText, setTypedText] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const fullText = "What should I focus on this week?";

  useEffect(() => {
    if (isActive) {
      setTypedText('');
      setShowAnswer(false);
      playNarration("Your AI goes from a simple assistant to a Strategic Advisor. When it knows your hires, your clients, and your finances, you can ask the big questions.");

      let i = 0;
      const interval = setInterval(() => {
        setTypedText(fullText.slice(0, i + 1));
        i++;
        if (i === fullText.length) {
          clearInterval(interval);
          setTimeout(() => {
            setShowAnswer(true);
            playNarration("And it answers them. Not with generic advice, but with deep, contextual strategy.");
          }, 800);
        }
      }, 50);

      return () => clearInterval(interval);
    } else {
      stopNarration();
      setTypedText('');
      setShowAnswer(false);
    }
  }, [isActive]);

  const preQuestions = [
    "What should our next hire be?",
    "Which clients are at risk of leaving?",
    "We have extra money—where should we invest it?"
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent" />

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
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Your AI goes from an assistant to a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 italic">
              strategic advisor
            </span>.
          </h2>
        </motion.div>

        {/* Chat interface mockup */}
        <motion.div
          className="bg-surface rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: isActive ? 1 : 0.95, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Browser header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <div className="w-3 h-3 rounded-full bg-green-400/70" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs text-white/30 font-mono">Business Brain Assistant</span>
            </div>
          </div>

          {/* Chat content */}
          <div className="p-6 md:p-8 min-h-[350px] font-mono text-sm md:text-base">
            {/* Example questions (faded) */}
            <div className="space-y-2 text-white/30 mb-8">
              {preQuestions.map((q, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isActive ? 0.5 : 0, x: isActive ? 0 : -10 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  {q}
                </motion.p>
              ))}
            </div>

            {/* Main question - typed effect */}
            <div className="border-l-4 border-cyan-500 pl-4 py-2 mb-6">
              <span className="text-white font-bold text-lg md:text-xl">{typedText}</span>
              <motion.span
                className="text-cyan-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                |
              </motion.span>
            </div>

            {/* AI Response */}
            <motion.div
              className="bg-white/5 rounded-xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showAnswer ? 1 : 0, y: showAnswer ? 0 : 20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-white/80 leading-relaxed font-sans">
                  Based on the client churn risk identified in the &apos;Smith Project&apos; emails
                  and the cash flow surplus from Q3, you should prioritize a{' '}
                  <span className="font-bold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                    Customer Success Manager
                  </span>.
                  We have 3 clients showing warning signs in communication patterns.
                </p>
              </div>

              {/* Insight tags */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded-full">3 At-Risk Clients</span>
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full">Q3 Surplus Available</span>
                <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded-full">Pattern Detected</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Continue button */}
        {onComplete && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: showAnswer ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button
              onClick={onComplete}
              className="group inline-flex items-center gap-2 text-cyan-400 hover:text-white font-medium transition-colors"
            >
              <span className="text-sm uppercase tracking-widest">The Guarantee</span>
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
