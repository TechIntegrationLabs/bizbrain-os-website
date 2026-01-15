'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { playNarration, stopNarration } from '../ui/Narration';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

// Data points for the graph
const genericAIData = [
  { x: 0, y: 10 }, { x: 1, y: 15 }, { x: 2, y: 18 }, { x: 3, y: 22 },
  { x: 4, y: 25 }, { x: 5, y: 28 }, { x: 6, y: 30 }, { x: 7, y: 32 },
  { x: 8, y: 33 }, { x: 9, y: 34 }, { x: 10, y: 35 }
];

const businessBrainData = [
  { x: 0, y: 10 }, { x: 1, y: 25 }, { x: 2, y: 40 }, { x: 3, y: 52 },
  { x: 4, y: 62 }, { x: 5, y: 70 }, { x: 6, y: 78 }, { x: 7, y: 85 },
  { x: 8, y: 90 }, { x: 9, y: 94 }, { x: 10, y: 97 }
];

// Convert data to SVG path
const dataToPath = (data: typeof genericAIData, width: number, height: number, maxY: number) => {
  const xScale = width / (data.length - 1);
  const yScale = height / maxY;

  return data.map((point, i) => {
    const x = point.x * xScale;
    const y = height - point.y * yScale;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
};

export const GraphSlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [showBrainLine, setShowBrainLine] = useState(false);
  const genericControls = useAnimation();
  const brainControls = useAnimation();

  const graphWidth = 600;
  const graphHeight = 350;
  const maxY = 100;

  useEffect(() => {
    if (isActive) {
      playNarration("Businesses that fully integrate AI will win. Others simply won't be able to compete. Generic AI plateaus quickly. But when you add a Context Layer...");

      // Animate generic AI line first
      genericControls.start({
        pathLength: 1,
        transition: { duration: 2, ease: "easeOut" }
      });

      // Show and animate Business Brain line after delay
      setTimeout(() => {
        setShowBrainLine(true);
        playNarration("Your advantage compounds. It learns you. It gets smarter. The gap becomes impossible to close.");
        brainControls.start({
          pathLength: 1,
          transition: { duration: 2.5, ease: "easeOut" }
        });
      }, 5000);
    } else {
      stopNarration();
      setShowBrainLine(false);
      genericControls.set({ pathLength: 0 });
      brainControls.set({ pathLength: 0 });
    }
  }, [isActive, genericControls, brainControls]);

  const genericPath = dataToPath(genericAIData, graphWidth, graphHeight, maxY);
  const brainPath = dataToPath(businessBrainData, graphWidth, graphHeight, maxY);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />

      <motion.div
        className="relative z-10 w-full max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Context is{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            everything.
          </span>
        </motion.h2>

        <motion.p
          className="text-lg text-white/50 text-center mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          AI effectiveness over time with and without deep business context.
        </motion.p>

        {/* Graph container */}
        <motion.div
          className="relative bg-surface/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: isActive ? 1 : 0.95, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Y-axis label */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90">
            <span className="text-xs text-white/40 uppercase tracking-widest">Effectiveness</span>
          </div>

          {/* X-axis label */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <span className="text-xs text-white/40 uppercase tracking-widest">Time</span>
          </div>

          {/* SVG Graph */}
          <svg
            viewBox={`0 0 ${graphWidth} ${graphHeight}`}
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Grid lines */}
            {[0.25, 0.5, 0.75].map((ratio) => (
              <line
                key={ratio}
                x1="0"
                y1={graphHeight * ratio}
                x2={graphWidth}
                y2={graphHeight * ratio}
                stroke="rgba(255,255,255,0.1)"
                strokeDasharray="5,5"
              />
            ))}

            {/* Generic AI line (gray/amber) */}
            <motion.path
              d={genericPath}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={genericControls}
              style={{ filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.4))' }}
            />

            {/* Business Brain line (cyan) */}
            {showBrainLine && (
              <motion.path
                d={brainPath}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={brainControls}
                style={{ filter: 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))' }}
              />
            )}

            {/* Area fill for Business Brain */}
            {showBrainLine && (
              <motion.path
                d={`${brainPath} L ${graphWidth} ${graphHeight} L 0 ${graphHeight} Z`}
                fill="url(#brainGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 1, delay: 2 }}
              />
            )}

            {/* Gradient definition */}
            <defs>
              <linearGradient id="brainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>

          {/* Legend */}
          <div className="flex justify-center gap-8 mt-6">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <div className="w-4 h-1 bg-amber-500 rounded-full" />
              <span className="text-sm text-white/60">Generic AI</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: showBrainLine ? 1 : 0, x: showBrainLine ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="w-4 h-1 bg-cyan-500 rounded-full" />
              <span className="text-sm text-white/60">AI + Business Brain</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Key insight */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showBrainLine ? 1 : 0, y: showBrainLine ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <p className="text-xl text-white/80">
            The gap isn&apos;t about the AI. It&apos;s about{' '}
            <span className="text-cyan-400 font-semibold">what it knows about your business.</span>
          </p>
        </motion.div>

        {/* Continue button */}
        {onComplete && (
          <motion.button
            onClick={onComplete}
            className="mt-8 group flex items-center gap-2 mx-auto px-6 py-3 text-cyan-400 hover:text-white transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: showBrainLine ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 2.5 }}
          >
            <span className="text-sm font-medium tracking-wide uppercase">See the Problem</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};
