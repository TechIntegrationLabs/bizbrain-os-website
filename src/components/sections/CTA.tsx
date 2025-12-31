'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowRight } from 'lucide-react';

export const CTA: React.FC = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />

      {/* Animated gradient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'conic-gradient(from 0deg, #06b6d4, #10b981, #f59e0b, #06b6d4)'
        }}
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Stop Managing.{' '}
            <br className="hidden md:block" />
            <span className="gradient-text">Start Operating.</span>
          </h2>

          <p className="text-xl text-white/60 mb-12 max-w-xl mx-auto">
            Your business deserves a brain that never forgets.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <MagneticButton>
              Start Building Today
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton variant="secondary">
              Take the Course
            </MagneticButton>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
            <span>No credit card required for preview</span>
            <span className="hidden sm:block">•</span>
            <span>Works with Claude Code (free tier available)</span>
            <span className="hidden sm:block">•</span>
            <span>Join 500+ organized operators</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
