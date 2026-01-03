'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

// ============================================
// NEURAL NODE GRAPH - Synaptic Glass Design System
// Reusable 3D particle system background
// ============================================

interface Particle {
  x: number;
  y: number;
  z: number;
  baseSize: number;
  pulseSpeed: number;
  pulseOffset: number;
}

// Synaptic Glass color palette
const COLORS = {
  // Neural Teal (primary accent)
  nodePrimary: { r: 45, g: 212, b: 191 },      // #2dd4bf
  // Neural Emerald (secondary)
  nodeSecondary: { r: 16, g: 185, b: 129 },    // #10b981
  // Neural Pink (accent for sparks)
  nodePink: { r: 244, g: 114, b: 182 },        // #f472b6
  // Background
  background: '#0a0a0f',
};

interface NeuralNodeGraphProps {
  /** Number of particles (auto-reduces on mobile) */
  particleCount?: number;
  /** Maximum distance for connections */
  connectionDistance?: number;
  /** Speed of Z-axis movement (0 = static) */
  flySpeed?: number;
  /** Enable mouse interaction */
  mouseInteraction?: boolean;
  /** Parallax scroll container ref */
  scrollContainerRef?: React.RefObject<HTMLElement>;
  /** Custom opacity motion value */
  opacity?: MotionValue<number>;
  /** Custom scale motion value */
  scale?: MotionValue<number>;
  /** Additional CSS classes */
  className?: string;
  /** Show vignette overlay */
  vignette?: boolean;
}

export const NeuralNodeGraph: React.FC<NeuralNodeGraphProps> = ({
  particleCount: basePCount = 140,
  connectionDistance = 150,
  flySpeed = 0.5,
  mouseInteraction = true,
  scrollContainerRef,
  opacity: externalOpacity,
  scale: externalScale,
  className,
  vignette = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Default parallax / fade effect based on scroll
  const defaultOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const defaultScale = useTransform(scrollY, [0, 800], [1, 1.5]);

  const opacity = externalOpacity ?? defaultOpacity;
  const scale = externalScale ?? defaultScale;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Adjust particle count for mobile
    const particleCount = width < 768 ? Math.floor(basePCount * 0.4) : basePCount;

    // Neural Node Particle System
    const particles: Particle[] = [];

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
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseInteraction) return;
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

      ctx.fillStyle = COLORS.background;
      ctx.fillRect(0, 0, width, height);

      // Project particles
      const projectedParticles = particles.map((p) => {
        // Rotate around Y
        const x1 = p.x * Math.cos(targetRotY) - p.z * Math.sin(targetRotY);
        const z1 = p.z * Math.cos(targetRotY) + p.x * Math.sin(targetRotY);

        // Rotate around X
        const y1 = p.y * Math.cos(targetRotX) - z1 * Math.sin(targetRotX);
        let z2 = z1 * Math.cos(targetRotX) + p.y * Math.sin(targetRotX);

        // Gentle constant z-movement (fly through)
        z2 -= flySpeed;
        if (z2 < -500) z2 += width;

        // Perspective projection
        const projScale = 800 / (800 + z2);
        const x2D = x1 * projScale + width / 2;
        const y2D = y1 * projScale + height / 2;

        // Pulse size
        const size =
          p.baseSize *
          projScale *
          (1 + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.3);

        return { x: x2D, y: y2D, z: z2, size, scale: projScale, original: p };
      });

      // Draw Connections (Neural Pathways)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedParticles.length; i++) {
        const p1 = projectedParticles[i];
        if (p1.z < -400) continue; // Don't draw if too close/behind camera

        // Draw node - Neural Teal (#2dd4bf)
        const alpha = Math.min(1, (p1.z + 500) / 1000); // Fade in from distance
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        const { r, g, b } = COLORS.nodePrimary;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
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

            // Distance based opacity - Neural Emerald connections
            const edgeAlpha =
              (1 - dist / (connectionDistance * p1.scale)) * 0.4 * alpha;
            const { r: er, g: eg, b: eb } = COLORS.nodeSecondary;
            ctx.strokeStyle = `rgba(${er}, ${eg}, ${eb}, ${edgeAlpha})`;
            ctx.stroke();

            // "Synaptic Sparks" (occasional bright pulses on lines) - Neural Pink
            if (Math.random() < 0.0005) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              const { r: pr, g: pg, b: pb } = COLORS.nodePink;
              ctx.strokeStyle = `rgba(${pr}, ${pg}, ${pb}, ${edgeAlpha * 3})`;
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
  }, [basePCount, connectionDistance, flySpeed, mouseInteraction]);

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, scale }}
      className={cn('absolute inset-0 z-0', className)}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* Vignette */}
      {vignette && (
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-abyss/50 to-abyss pointer-events-none" />
      )}
    </motion.div>
  );
};

export default NeuralNodeGraph;
