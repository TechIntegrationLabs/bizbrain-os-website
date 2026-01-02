'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Sparkles,
  Target,
  Heart,
  Zap,
  Users,
  Code,
  MessageCircle,
  Calendar,
  CheckCircle,
  Globe,
  Lightbulb,
  Rocket,
} from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/animations';

const timeline = [
  {
    date: '2024 Q1',
    title: 'The Problem',
    description: 'Running a dev consultancy meant drowning in context switching. Every client call required 30 minutes of prep just to remember where we left off.',
    icon: Target,
  },
  {
    date: '2024 Q2',
    title: 'The Experiment',
    description: 'Started building a "second brain" folder system. Dropped voice notes, got structured context. The first version was hacky but magical.',
    icon: Lightbulb,
  },
  {
    date: '2024 Q3',
    title: 'The System',
    description: 'Formalized the Business Brain concept. Added MCP integrations, slash commands, and subagents. 87% reduction in admin time.',
    icon: Brain,
  },
  {
    date: '2024 Q4',
    title: 'The Course',
    description: 'People started asking how it worked. Built a comprehensive course to teach the system from scratch.',
    icon: Rocket,
  },
];

const values = [
  {
    icon: Brain,
    title: 'Context is Everything',
    description: 'Information without context is noise. We build systems that maintain understanding across time and projects.',
  },
  {
    icon: Zap,
    title: 'Automate the Tedious',
    description: 'Repetitive tasks should become one-command operations. Your brain should focus on creative problem-solving.',
  },
  {
    icon: Heart,
    title: 'Human-Centered AI',
    description: 'AI should amplify human capabilities, not replace human judgment. We build tools that make you more effective.',
  },
  {
    icon: Code,
    title: 'Build in Public',
    description: 'We document our journey, share our systems, and learn from the community. Transparency drives improvement.',
  },
];

const stats = [
  { value: '87%', label: 'Time saved on admin' },
  { value: '25+', label: 'Slash commands' },
  { value: '19', label: 'MCP integrations' },
  { value: '7', label: 'Course modules' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-surface/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
              <div className="w-px h-6 bg-white/10" />
              <h1 className="font-semibold text-white">About</h1>
            </div>

            <Link
              href="/course"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm hover:bg-cyan-500/20 transition-colors"
            >
              Get the Course
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-medium">Our Story</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Built by Operators,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              For Operators
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60"
          >
            We were drowning in context switching, client management, and admin work.
            So we built the system we wished existed. Now we&apos;re sharing it with you.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl border border-white/10 bg-surface/50"
            >
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/40">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            The Journey
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-emerald-500/50 to-transparent" />

            <motion.div
              variants={staggerContainer(0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="relative pl-20"
                  >
                    {/* Node */}
                    <div className="absolute left-4 w-8 h-8 rounded-full bg-surface border-2 border-cyan-500/50 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </div>

                    {/* Content */}
                    <div className="rounded-2xl border border-white/10 bg-surface/50 p-6">
                      <div className="text-sm text-cyan-400 font-medium mb-2">
                        {item.date}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-white/60">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Values */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            What We Believe
          </h2>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="rounded-2xl border border-white/10 bg-surface/50 p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-white/60">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Team/Founder Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-surface to-cyan-950/20 p-8 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">TIL</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Tech Integration Labs
            </h3>
            <p className="text-white/60 mb-6">
              A boutique development consultancy specializing in AI-powered operations
              and custom software solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/60 text-sm">
                <Globe className="w-4 h-4" />
                Remote-first
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/60 text-sm">
                <Users className="w-4 h-4" />
                Small but mighty
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/60 text-sm">
                <Code className="w-4 h-4" />
                AI-native
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to build your Business Brain?
          </h3>
          <p className="text-white/60 mb-8">
            Join the community of operators transforming how they work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/course"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              Get the Course
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/demos"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all"
            >
              Try the Demos
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
