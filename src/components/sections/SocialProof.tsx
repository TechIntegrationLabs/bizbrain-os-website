'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Quote,
  Star,
  Clock,
  TrendingUp,
  Users,
  FileText,
  Sparkles,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  highlight: string;
  rating: number;
}

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "I went from spending 2 hours a day on admin work to 15 minutes. The Business Brain literally knows everything about my projects.",
    author: 'Marcus Chen',
    role: 'Freelance Developer',
    company: 'Independent',
    avatar: 'MC',
    highlight: '2 hours → 15 min',
    rating: 5,
  },
  {
    id: '2',
    quote: "The intake processor alone is worth 10x the course price. Drop a voice note, get organized context. Magic.",
    author: 'Sarah Williams',
    role: 'Agency Owner',
    company: 'Digital Spark',
    avatar: 'SW',
    highlight: '10x ROI',
    rating: 5,
  },
  {
    id: '3',
    quote: "Finally, an AI system that actually understands my business. No more context-switching headaches.",
    author: 'David Park',
    role: 'Tech Consultant',
    company: 'Park & Associates',
    avatar: 'DP',
    highlight: 'Zero context loss',
    rating: 5,
  },
  {
    id: '4',
    quote: "The entity system changed how I track client relationships. Everything is connected, nothing falls through the cracks.",
    author: 'Emily Torres',
    role: 'Operations Manager',
    company: 'Startup Studio',
    avatar: 'ET',
    highlight: 'Complete visibility',
    rating: 5,
  },
];

const stats: Stat[] = [
  {
    value: 87,
    suffix: '%',
    label: 'Time Saved on Admin',
    icon: Clock,
    color: '#06b6d4',
  },
  {
    value: 23,
    suffix: '+',
    label: 'Integrated Features',
    icon: Sparkles,
    color: '#10b981',
  },
  {
    value: 15,
    suffix: 'min',
    label: 'Average Daily Admin',
    icon: TrendingUp,
    color: '#f59e0b',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Context Retention',
    icon: FileText,
    color: '#8b5cf6',
  },
];

const partners = [
  'Used by developers at',
  'Agencies',
  'Consultants',
  'Freelancers',
  'Startups',
];

export function SocialProof() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Stats Section */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon as React.FC<{ className?: string; style?: React.CSSProperties }>;
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6 text-center">
                  <div
                    className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <AnimatedCounter
                      value={stat.value}
                      duration={2}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6"
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400 font-medium">Trusted by Professionals</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Real Results,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Real People
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            See how developers, agencies, and consultants are transforming their operations.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl border border-white/10 bg-surface/50 p-6 hover:border-white/20 transition-all"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-cyan-500/20 transition-colors" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/80 mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Highlight badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm mb-6">
                <TrendingUp className="w-3 h-3" />
                {testimonial.highlight}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-white">{testimonial.author}</p>
                  <p className="text-sm text-white/40">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-16 border-t border-white/10"
        >
          <p className="text-center text-sm text-white/40 mb-6">
            Trusted by developers, agencies, and consultants worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {['Freelancers', 'Agencies', 'Consultants', 'Startups', 'Enterprise Teams'].map((type, i) => (
              <div
                key={i}
                className="px-6 py-2 rounded-full border border-white/10 text-white/40 text-sm"
              >
                {type}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default SocialProof;
