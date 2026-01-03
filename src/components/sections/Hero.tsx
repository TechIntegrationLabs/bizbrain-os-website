'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { SynapticButton } from '@/components/ui/SynapticButton';
import { NeuralNodeGraph } from '@/components/backgrounds';
import { easing } from '@/lib/animations';

// ============================================
// HERO SECTION - Synaptic Glass Design System
// Neural network particle system with teal accent
// ============================================

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax / Fade effect for the background
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.5]);

  const scrollToDemo = () => {
    const element = document.getElementById('demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Neural Network Background */}
      <NeuralNodeGraph
        opacity={opacity}
        scale={scale}
        particleCount={140}
        connectionDistance={150}
        flySpeed={0.5}
        mouseInteraction={true}
        vignette={true}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easing.synaptic }}
          className="text-5xl md:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="font-light text-white/80">Your Business </span>
          <br className="md:hidden" />
          <span className="gradient-text-teal">Brain</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: easing.synaptic }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8"
        >
          A living system that ingests chaos, builds context, and automates
          everything.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-8 md:h-10 mb-12 flex justify-center items-center"
        >
          <TypewriterText text="> Initializing neural architecture... system online." />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <SynapticButton
            onClick={scrollToDemo}
            variant="primary"
            glow="teal"
            size="lg"
            icon={<Sparkles className="w-5 h-5" />}
            iconPosition="right"
          >
            See It In Action
          </SynapticButton>
          <SynapticButton variant="secondary" size="lg" glow="emerald">
            Take the Course
          </SynapticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-8 h-8 text-neural-teal" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============================================
// TYPEWRITER EFFECT COMPONENT
// ============================================
const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, index));
      index++;
      if (index > text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className="font-mono text-sm md:text-lg text-neural-teal/80">
      {displayed}
      <span className="animate-cursor-blink">_</span>
    </p>
  );
};

export default Hero;
