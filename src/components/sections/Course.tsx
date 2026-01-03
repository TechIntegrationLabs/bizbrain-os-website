'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Play, Clock, BookOpen, Users } from 'lucide-react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { staggerContainer, staggerItem } from '@/lib/utils';

const modules = [
  {
    number: 1,
    title: "Foundation",
    lessons: ["What is a Business Brain?", "The folder philosophy", "Setting up your environment"]
  },
  {
    number: 2,
    title: "Intake Mastery",
    lessons: ["Voice note workflows", "Document processing", "The digest system"]
  },
  {
    number: 3,
    title: "Context Building",
    lessons: ["Auto-generated documentation", "Living context files", "The pulse dashboard"]
  },
  {
    number: 4,
    title: "Entity Management",
    lessons: ["Clients, partners, vendors", "Relationship tracking", "Financial integration"]
  },
  {
    number: 5,
    title: "Automation Deep-Dive",
    lessons: ["Slash commands", "Subagents", "Custom workflows"]
  },
  {
    number: 6,
    title: "Integration Layer",
    lessons: ["MCP servers", "External tools", "API connections"]
  },
  {
    number: 7,
    title: "Advanced Patterns",
    lessons: ["Multi-project management", "Team collaboration", "Scaling the system"]
  },
  {
    number: 8,
    title: "Your Custom Brain",
    lessons: ["Personalization", "Industry-specific setups", "Continuous improvement"]
  }
];

interface ModuleCardProps {
  module: typeof modules[0];
  isOpen: boolean;
  onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, isOpen, onClick }) => {
  return (
    <motion.div
      layout
      className="glass-panel rounded-xl overflow-hidden"
    >
      <button
        onClick={onClick}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-sm font-bold">
            {module.number}
          </span>
          <span className="font-medium">{module.title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0">
              <div className="border-t border-white/10 pt-4">
                {module.lessons.map((lesson, index) => (
                  <div key={index} className="flex items-center gap-3 py-2 text-sm text-white/60">
                    <Play className="w-3 h-3 text-teal-400" />
                    <span>{lesson}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Course: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openModule, setOpenModule] = useState<number | null>(1);

  return (
    <section id="course" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
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
            Build Your Own{' '}
            <span className="gradient-text">Business Brain</span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-white/60 max-w-2xl mx-auto mb-8"
          >
            A comprehensive course to set up, customize, and master your personal operating system.
          </motion.p>

          {/* Course Stats */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="flex items-center gap-2 text-white/60">
              <BookOpen className="w-5 h-5 text-teal-400" />
              <span>8 Modules</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Clock className="w-5 h-5 text-emerald-400" />
              <span>4+ Hours</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Users className="w-5 h-5 text-amber-400" />
              <span>Lifetime Access</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Module List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            {modules.map((module) => (
              <ModuleCard
                key={module.number}
                module={module}
                isOpen={openModule === module.number}
                onClick={() => setOpenModule(openModule === module.number ? null : module.number)}
              />
            ))}
          </motion.div>

          {/* Pricing Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.5 }}
          >
            <GlassPanel className="sticky top-8">
              <div className="text-center mb-8">
                <div className="text-sm text-teal-400 font-medium mb-2">Early Access Pricing</div>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-5xl font-bold">$197</span>
                  <span className="text-xl text-white/40 line-through">$397</span>
                </div>
                <div className="text-white/60">50% off for early adopters</div>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "Full 8-module course",
                  "Templates & starter files",
                  "Private community access",
                  "All future updates included",
                  "1:1 setup support session"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-white/70">{feature}</span>
                  </div>
                ))}
              </div>

              <MagneticButton className="w-full justify-center">
                Enroll Now - $197
              </MagneticButton>

              <p className="text-center text-sm text-white/40 mt-4">
                30-day money-back guarantee
              </p>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Course;
