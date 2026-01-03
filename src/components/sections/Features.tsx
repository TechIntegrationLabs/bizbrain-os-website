'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Globe, Users, BarChart3, Search, Zap } from 'lucide-react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { staggerContainer, staggerItem } from '@/lib/utils';

const features = [
  {
    icon: Download,
    title: "Drop Anything, Get Structure",
    description: "Voice notes, PDFs, emails, screenshots - throw it all in. The system analyzes, extracts, and routes automatically.",
    command: "/intake",
    color: "from-teal-500 to-teal-600"
  },
  {
    icon: Globe,
    title: "Self-Updating Documentation",
    description: "Context files that evolve with every interaction. No more stale wikis or outdated docs.",
    command: "/digest",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    icon: Users,
    title: "Clients, Partners, Vendors",
    description: "Unified relationship management with full history, preferences, and interaction timeline.",
    command: "/add-client",
    color: "from-amber-500 to-amber-600"
  },
  {
    icon: BarChart3,
    title: "Real-time Status Dashboard",
    description: "Always-current project status. Health metrics, blockers, and activity - updated automatically.",
    command: "/status",
    color: "from-rose-500 to-rose-600"
  },
  {
    icon: Search,
    title: "Find Anything, Instantly",
    description: "Natural language search across all projects, clients, and context. Your entire business, queryable.",
    command: "/find",
    color: "from-violet-500 to-violet-600"
  },
  {
    icon: Zap,
    title: "Slash Commands for Everything",
    description: "One-word commands that trigger complex workflows. Create contracts, generate briefs, sync timesheets.",
    command: "/contractgen",
    color: "from-blue-500 to-blue-600"
  }
];

export const Features: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={staggerContainer()}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={staggerItem}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Everything You Need.{' '}
            <span className="text-white/40">Nothing You Don&apos;t.</span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            Powerful features that work together seamlessly. Each one accessible with a simple slash command.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={staggerItem}>
              <GlassPanel className="h-full group">
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4 flex-grow">
                    {feature.description}
                  </p>

                  {/* Command */}
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono bg-white/5 px-2 py-1 rounded text-teal-400">
                      {feature.command}
                    </code>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
