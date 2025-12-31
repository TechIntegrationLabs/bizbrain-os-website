'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Cog, Smartphone } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { staggerContainer, staggerItem } from '@/lib/utils';

const problems = [
  {
    icon: Brain,
    title: "Context Dies in Conversations",
    description: "Important decisions buried in Slack. Client preferences lost in email threads. Every new conversation starts from zero.",
    color: "text-cyan-400"
  },
  {
    icon: Cog,
    title: "You Are the Automation",
    description: "Copy-pasting between tools. Manually updating status docs. Remembering to follow up. Your brain is the integration layer.",
    color: "text-emerald-400"
  },
  {
    icon: Smartphone,
    title: "10 Tools, Zero Memory",
    description: "Notion for notes. Slack for chat. Email for clients. Drive for files. None of them talk to each other.",
    color: "text-amber-400"
  }
];

export const Problem: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-50" />

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
            Your Business Is{' '}
            <span className="text-white/40">Scattered</span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            You&apos;re not disorganized. Your tools are. Information lives everywhere,
            context gets lost, and you spend more time managing than doing.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6"
        >
          {problems.map((problem, index) => (
            <motion.div key={index} variants={staggerItem}>
              <GlassCard className="h-full">
                <div className="flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${problem.color}`}>
                    <problem.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{problem.description}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
