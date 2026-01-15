'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { TrendingUp, Zap } from 'lucide-react';

/**
 * EffectivenessGraph - Homepage-ready component
 *
 * Animated graph comparing Generic AI (flat) vs AI + Business Brain (exponential growth)
 * Triggers animation when scrolled into view.
 */
export const EffectivenessGraph: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [showLabels, setShowLabels] = useState(false);
  const pathControls = useAnimation();

  // Trigger animation when in view
  useEffect(() => {
    if (isInView) {
      pathControls.start({
        pathLength: 1,
        transition: { duration: 2, ease: "easeOut" }
      });
      setTimeout(() => setShowLabels(true), 1500);
    }
  }, [isInView, pathControls]);

  // SVG path data
  const genericAIPath = "M 60 350 Q 150 345 250 340 Q 400 335 550 330 Q 700 325 740 320";
  const businessBrainPath = "M 60 350 Q 150 340 250 300 Q 400 220 550 120 Q 650 60 740 40";

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
          <TrendingUp className="w-4 h-4" />
          The Effectiveness Gap
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Why Context Changes{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            Everything
          </span>
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Generic AI stays flat. AI with your complete business context compounds over time.
        </p>
      </motion.div>

      {/* Graph Container */}
      <div className="relative bg-surface rounded-2xl border border-white/10 p-6 md:p-8 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2" />

        {/* Y-axis label */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
          <span className="text-white/30 text-xs font-medium tracking-widest uppercase">
            Effectiveness
          </span>
        </div>

        {/* X-axis label */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <span className="text-white/30 text-xs font-medium tracking-widest uppercase">
            Time
          </span>
        </div>

        {/* SVG Graph */}
        <svg
          viewBox="0 0 800 400"
          className="w-full h-[300px] md:h-[400px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Generic AI Path (flat) */}
          <motion.path
            d={genericAIPath}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="8 4"
            initial={{ pathLength: 0 }}
            animate={pathControls}
          />

          {/* Business Brain Path (exponential) */}
          <motion.path
            d={businessBrainPath}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={pathControls}
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* End point glow */}
          {showLabels && (
            <motion.circle
              cx="740"
              cy="40"
              r="8"
              fill="#10b981"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              <animate
                attributeName="r"
                values="6;10;6"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="1;0.5;1"
                dur="2s"
                repeatCount="indefinite"
              />
            </motion.circle>
          )}
        </svg>

        {/* Labels */}
        <motion.div
          className="absolute top-1/2 right-8 transform -translate-y-1/2 space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={showLabels ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Business Brain label */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded" />
            <div>
              <div className="text-white font-bold text-sm">AI + Business Brain</div>
              <div className="text-emerald-400 text-xs">Compounds over time</div>
            </div>
          </div>

          {/* Generic AI label */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-1 bg-white/30 rounded" style={{ borderStyle: 'dashed' }} />
            <div>
              <div className="text-white/60 font-bold text-sm">Generic AI</div>
              <div className="text-white/40 text-xs">Stays flat</div>
            </div>
          </div>
        </motion.div>

        {/* Stats overlay */}
        <motion.div
          className="absolute bottom-6 left-6 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={showLabels ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-bold text-sm">10x more effective</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EffectivenessGraph;
