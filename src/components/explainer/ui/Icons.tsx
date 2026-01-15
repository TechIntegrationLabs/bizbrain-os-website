'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface IconProps {
  className?: string;
  isActive?: boolean;
  phase?: 'idle' | 'capturing' | 'processing' | 'distributing';
}

// Animated Business Brain Icon - Neural network visualization
export const BusinessBrainIcon: React.FC<IconProps> = ({
  className = '',
  isActive = false,
  phase = 'idle'
}) => {
  const pulseScale = phase === 'processing' ? [1, 1.05, 1] : [1, 1, 1];

  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      initial={{ opacity: 0.5 }}
      animate={{
        opacity: isActive ? 1 : 0.5,
        scale: pulseScale
      }}
      transition={{
        duration: 1.5,
        repeat: phase === 'processing' ? Infinity : 0,
        ease: "easeInOut"
      }}
    >
      {/* Outer glow ring */}
      <motion.circle
        cx="100"
        cy="100"
        r="95"
        fill="none"
        stroke="url(#brainGradient)"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: isActive ? 1 : 0,
          opacity: isActive ? 0.6 : 0
        }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Inner structure - hexagonal core */}
      <motion.path
        d="M100 30 L155 65 L155 135 L100 170 L45 135 L45 65 Z"
        fill="none"
        stroke="#06b6d4"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0.3 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Neural connection nodes */}
      {[
        { cx: 100, cy: 50, delay: 0 },
        { cx: 145, cy: 80, delay: 0.1 },
        { cx: 145, cy: 120, delay: 0.2 },
        { cx: 100, cy: 150, delay: 0.3 },
        { cx: 55, cy: 120, delay: 0.4 },
        { cx: 55, cy: 80, delay: 0.5 },
        { cx: 100, cy: 100, delay: 0.6 }, // Center
      ].map((node, i) => (
        <motion.circle
          key={i}
          cx={node.cx}
          cy={node.cy}
          r={i === 6 ? 12 : 6}
          fill={i === 6 ? "#06b6d4" : "#10b981"}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isActive ? 1 : 0,
            opacity: isActive ? 1 : 0
          }}
          transition={{ duration: 0.4, delay: node.delay }}
        />
      ))}

      {/* Connection lines to center */}
      {[
        "M100 50 L100 100",
        "M145 80 L100 100",
        "M145 120 L100 100",
        "M100 150 L100 100",
        "M55 120 L100 100",
        "M55 80 L100 100",
      ].map((path, i) => (
        <motion.path
          key={i}
          d={path}
          fill="none"
          stroke="#06b6d4"
          strokeWidth="1.5"
          strokeOpacity="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
        />
      ))}

      {/* Data flow particles */}
      {phase === 'capturing' && (
        <motion.circle
          r="4"
          fill="#f59e0b"
          initial={{ cx: 0, cy: 100, opacity: 0 }}
          animate={{ cx: 100, cy: 100, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      )}

      {phase === 'distributing' && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <motion.circle
              key={i}
              r="3"
              fill="#10b981"
              initial={{ cx: 100, cy: 100, opacity: 0 }}
              animate={{
                cx: [100, 180 + (i % 2) * 20],
                cy: [100, 50 + i * 35],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </>
      )}

      <defs>
        <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

// AI Core Icon - Processor chip visualization
export const AICoreIcon: React.FC<IconProps> = ({ className = '', isActive = false }) => (
  <motion.svg
    viewBox="0 0 100 100"
    className={className}
    initial={{ opacity: 0.5 }}
    animate={{ opacity: isActive ? 1 : 0.5 }}
  >
    {/* Central chip */}
    <motion.rect
      x="25"
      y="25"
      width="50"
      height="50"
      rx="4"
      fill="none"
      stroke="#06b6d4"
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isActive ? 1 : 0.3 }}
      transition={{ duration: 1 }}
    />

    {/* Inner core */}
    <motion.rect
      x="35"
      y="35"
      width="30"
      height="30"
      rx="2"
      fill="#06b6d4"
      fillOpacity="0.2"
      stroke="#06b6d4"
      strokeWidth="1"
    />

    {/* Connection pins */}
    {[
      { x1: 30, y1: 25, x2: 30, y2: 10 },
      { x1: 50, y1: 25, x2: 50, y2: 10 },
      { x1: 70, y1: 25, x2: 70, y2: 10 },
      { x1: 30, y1: 75, x2: 30, y2: 90 },
      { x1: 50, y1: 75, x2: 50, y2: 90 },
      { x1: 70, y1: 75, x2: 70, y2: 90 },
      { x1: 25, y1: 35, x2: 10, y2: 35 },
      { x1: 25, y1: 50, x2: 10, y2: 50 },
      { x1: 25, y1: 65, x2: 10, y2: 65 },
      { x1: 75, y1: 35, x2: 90, y2: 35 },
      { x1: 75, y1: 50, x2: 90, y2: 50 },
      { x1: 75, y1: 65, x2: 90, y2: 65 },
    ].map((line, i) => (
      <motion.line
        key={i}
        {...line}
        stroke="#10b981"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={{ duration: 0.3, delay: i * 0.05 }}
      />
    ))}

    {/* Center pulse */}
    <motion.circle
      cx="50"
      cy="50"
      r="8"
      fill="#06b6d4"
      animate={isActive ? {
        scale: [1, 1.2, 1],
        opacity: [0.8, 1, 0.8]
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.svg>
);

// Bridge Icon - Connection visualization
export const BridgeIcon: React.FC<IconProps> = ({ className = '', isActive = false }) => (
  <motion.svg
    viewBox="0 0 200 100"
    className={className}
    initial={{ opacity: 0.5 }}
    animate={{ opacity: isActive ? 1 : 0.5 }}
  >
    {/* Bridge arc */}
    <motion.path
      d="M10 80 Q100 0 190 80"
      fill="none"
      stroke="url(#bridgeGradient)"
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isActive ? 1 : 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />

    {/* Support pillars */}
    {[35, 100, 165].map((x, i) => (
      <motion.line
        key={i}
        x1={x}
        y1={isActive ? (i === 1 ? 40 : 60) : 80}
        x2={x}
        y2="95"
        stroke="#06b6d4"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.8 + i * 0.2 }}
      />
    ))}

    {/* Data flow dots */}
    {isActive && (
      <motion.circle
        r="4"
        fill="#f59e0b"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          cx: [10, 100, 190],
          cy: [80, 25, 80]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    )}

    <defs>
      <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="50%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
  </motion.svg>
);

// Flow Arrow - Animated directional indicator
export const FlowArrow: React.FC<IconProps & { direction?: 'right' | 'left' | 'down' }> = ({
  className = '',
  isActive = false,
  direction = 'right'
}) => {
  const rotation = direction === 'down' ? 90 : direction === 'left' ? 180 : 0;

  return (
    <motion.svg
      viewBox="0 0 60 24"
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Arrow line */}
      <motion.path
        d="M0 12 H50"
        stroke="#06b6d4"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
      />

      {/* Arrow head */}
      <motion.path
        d="M45 6 L55 12 L45 18"
        stroke="#06b6d4"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.3 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      />

      {/* Flow particle */}
      {isActive && (
        <motion.circle
          r="3"
          fill="#10b981"
          initial={{ cx: 0, cy: 12, opacity: 0 }}
          animate={{
            cx: [0, 55],
            cy: 12,
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </motion.svg>
  );
};
