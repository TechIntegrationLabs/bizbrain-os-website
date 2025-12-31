'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';

interface Particle {
  x: number;
  y: number;
  z: number;
  baseSize: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax / Fade effect for the canvas container based on scroll
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.5]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Neural Node Particle System
    const particles: Particle[] = [];
    const connectionDistance = 150;
    const particleCount = width < 768 ? 60 : 140;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * width,
        baseSize: Math.random() * 2 + 0.5,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) * 0.0005;
      mouseY = (e.clientY - height / 2) * 0.0005;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.01;

      // Smooth rotation dampening
      targetRotY += (mouseX - targetRotY) * 0.05;
      targetRotX += (mouseY - targetRotX) * 0.05;

      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, width, height);

      // Project particles
      const projectedParticles = particles.map(p => {
        // Rotate around Y
        const x1 = p.x * Math.cos(targetRotY) - p.z * Math.sin(targetRotY);
        const z1 = p.z * Math.cos(targetRotY) + p.x * Math.sin(targetRotY);

        // Rotate around X
        const y1 = p.y * Math.cos(targetRotX) - z1 * Math.sin(targetRotX);
        let z2 = z1 * Math.cos(targetRotX) + p.y * Math.sin(targetRotX);

        // Gentle constant z-movement (fly through)
        z2 -= 0.5;
        if (z2 < -500) z2 += width;

        // Perspective projection
        const projScale = 800 / (800 + z2);
        const x2D = x1 * projScale + width / 2;
        const y2D = y1 * projScale + height / 2;

        // Pulse size
        const size = p.baseSize * projScale * (1 + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.3);

        return { x: x2D, y: y2D, z: z2, size, scale: projScale, original: p };
      });

      // Draw Connections (Neural Pathways)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedParticles.length; i++) {
        const p1 = projectedParticles[i];
        if (p1.z < -400) continue; // Don't draw if too close/behind camera

        // Draw node
        const alpha = Math.min(1, (p1.z + 500) / 1000); // Fade in from distance
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`; // Cyan nodes
        ctx.fill();

        // Connect to neighbors
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const p2 = projectedParticles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance * p1.scale) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            // Distance based opacity
            const edgeAlpha = (1 - dist / (connectionDistance * p1.scale)) * 0.4 * alpha;
            ctx.strokeStyle = `rgba(16, 185, 129, ${edgeAlpha})`; // Emerald connections
            ctx.stroke();

            // "Thought Sparks" (occasional bright pulses on lines)
            if (Math.random() < 0.0005) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${edgeAlpha * 3})`;
              ctx.lineWidth = 2;
              ctx.stroke();
              ctx.lineWidth = 0.5;
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToDemo = () => {
    const element = document.getElementById('demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Canvas Background */}
      <motion.div
        style={{ opacity, scale }}
        className="absolute inset-0 z-0"
      >
        <canvas ref={canvasRef} className="block w-full h-full" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background pointer-events-none" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="font-light text-white/80">Your Business </span>
          <br className="md:hidden" />
          <span className="gradient-text text-glow-cyan">
            Brain
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8"
        >
          A living system that ingests chaos, builds context, and automates everything.
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
          <MagneticButton onClick={scrollToDemo}>
            See It In Action
          </MagneticButton>
          <MagneticButton variant="secondary">
            Take the Course
          </MagneticButton>
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
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-8 h-8 text-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// Typewriter Effect Component
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
    <p className="font-mono text-sm md:text-lg text-cyan-400/80">
      {displayed}
      <span className="cursor-blink">_</span>
    </p>
  );
};

export default Hero;
