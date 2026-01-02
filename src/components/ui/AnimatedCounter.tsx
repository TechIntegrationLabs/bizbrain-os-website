'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  startOnView?: boolean;
  delay?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
  startOnView = true,
  delay = 0,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hasStarted, setHasStarted] = useState(!startOnView);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const displayValue = useTransform(springValue, (val) => {
    return val.toFixed(decimals);
  });

  useEffect(() => {
    if (startOnView && isInView && !hasStarted) {
      const timer = setTimeout(() => {
        setHasStarted(true);
        motionValue.set(value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    } else if (!startOnView) {
      motionValue.set(value);
    }
  }, [isInView, startOnView, value, delay, hasStarted, motionValue]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
};

// Stats Counter Component for displaying multiple stats
interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

interface StatsCounterProps {
  stats: Stat[];
  className?: string;
}

export const StatsCounter: React.FC<StatsCounterProps> = ({ stats, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div
      ref={ref}
      className={cn(
        'grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12',
        className
      )}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-center"
        >
          <div className="text-4xl md:text-5xl font-bold text-white mb-2">
            <AnimatedCounter
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              delay={index * 0.15}
            />
          </div>
          <div className="text-sm text-white/60">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

// Circular Progress Counter
interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
  color?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  label,
  className,
  color = '#06b6d4', // cyan-500
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min((value / max) * 100, 100);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 80,
  });
  const strokeDashoffset = useTransform(
    springValue,
    [0, 100],
    [circumference, 0]
  );

  useEffect(() => {
    if (isInView) {
      motionValue.set(percentage);
    }
  }, [isInView, percentage, motionValue]);

  return (
    <div ref={ref} className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedCounter
          value={value}
          className="text-2xl font-bold text-white"
          suffix="%"
        />
        {label && <span className="text-xs text-white/60 mt-1">{label}</span>}
      </div>
    </div>
  );
};

// Linear Progress Bar with Animation
interface LinearProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
  color?: string;
  height?: number;
}

export const LinearProgress: React.FC<LinearProgressProps> = ({
  value,
  max = 100,
  label,
  showValue = true,
  className,
  color = 'bg-gradient-to-r from-cyan-500 to-emerald-500',
  height = 8,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div ref={ref} className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm text-white/70">{label}</span>}
          {showValue && (
            <AnimatedCounter
              value={value}
              className="text-sm font-medium text-white"
              suffix="%"
            />
          )}
        </div>
      )}
      <div
        className="w-full bg-white/10 rounded-full overflow-hidden"
        style={{ height }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className={cn('h-full rounded-full', color)}
        />
      </div>
    </div>
  );
};

// Counting up display with formatting
interface CountUpDisplayProps {
  value: number;
  format?: 'number' | 'currency' | 'percentage' | 'hours';
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export const CountUpDisplay: React.FC<CountUpDisplayProps> = ({
  value,
  format = 'number',
  label,
  icon,
  className,
}) => {
  const getFormatted = () => {
    switch (format) {
      case 'currency':
        return { prefix: '$', suffix: '', decimals: 0 };
      case 'percentage':
        return { prefix: '', suffix: '%', decimals: 0 };
      case 'hours':
        return { prefix: '', suffix: ' hrs', decimals: 1 };
      default:
        return { prefix: '', suffix: '', decimals: 0 };
    }
  };

  const { prefix, suffix, decimals } = getFormatted();

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-cyan-400">
          {icon}
        </div>
      )}
      <div>
        <div className="text-3xl font-bold text-white">
          <AnimatedCounter
            value={value}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
          />
        </div>
        <div className="text-sm text-white/60">{label}</div>
      </div>
    </div>
  );
};

export default AnimatedCounter;
