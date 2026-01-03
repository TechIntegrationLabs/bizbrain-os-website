'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Mic, FileText, CheckSquare, FolderOpen } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/utils';

const capabilities = [
  "Ingests raw data (voice notes, emails, documents)",
  "Extracts and connects context automatically",
  "Maintains living documentation that updates itself",
  "Enables intelligent automation across operations"
];

export const WhatIs: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-surface/50">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={staggerContainer()}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={staggerItem} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              One System That{' '}
              <span className="gradient-text">Actually Thinks</span>
            </h2>
          </motion.div>

          {/* Definition */}
          <motion.div
            variants={staggerItem}
            className="glass-panel rounded-2xl p-8 md:p-12 mb-12"
          >
            <p className="text-lg md:text-xl text-white/80 mb-8">
              A Business Brain is a folder system enhanced with AI that:
            </p>
            <ul className="space-y-4">
              {capabilities.map((cap, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-teal-400" />
                  </span>
                  <span className="text-white/70">{cap}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Flow Diagram */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12"
          >
            {/* Input */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-panel rounded-xl p-4 flex items-center gap-3"
            >
              <Mic className="w-5 h-5 text-teal-400" />
              <span className="text-sm">Voice Note</span>
            </motion.div>

            <ArrowRight className="w-6 h-6 text-white/30 rotate-90 md:rotate-0" />

            {/* Brain */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-panel-strong rounded-xl p-6 flex items-center gap-3 border-teal-500/30"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                <span className="text-lg font-bold">BB</span>
              </div>
              <span className="font-semibold">Business Brain</span>
            </motion.div>

            <ArrowRight className="w-6 h-6 text-white/30 rotate-90 md:rotate-0" />

            {/* Outputs */}
            <div className="flex flex-col gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-panel rounded-lg px-3 py-2 flex items-center gap-2 text-sm"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Updated Docs</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-panel rounded-lg px-3 py-2 flex items-center gap-2 text-sm"
              >
                <CheckSquare className="w-4 h-4 text-amber-400" />
                <span>Tasks Created</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-panel rounded-lg px-3 py-2 flex items-center gap-2 text-sm"
              >
                <FolderOpen className="w-4 h-4 text-teal-400" />
                <span>Context Built</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            variants={staggerItem}
            className="text-center"
          >
            <p className="text-xl md:text-2xl text-white/60 italic">
              &ldquo;It&apos;s not another app to check. It&apos;s the system that checks everything for you.&rdquo;
            </p>
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIs;
