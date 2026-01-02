'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { spring } from '@/lib/animations';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
  rating: number;
  highlight?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Agency Owner',
    company: 'Digital Wave',
    content:
      "The Business Brain completely transformed how we manage client context. What used to take hours of searching through Slack and emails now takes seconds with /find. Our team onboarding went from 2 weeks to 3 days.",
    rating: 5,
    highlight: '2 weeks to 3 days onboarding',
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    role: 'Freelance Developer',
    company: 'Independent',
    content:
      "I was skeptical about another productivity system, but this is different. It actually works WITH my workflow instead of against it. The intake processing alone saves me an hour every day.",
    rating: 5,
    highlight: '1 hour saved daily',
  },
  {
    id: '3',
    name: 'Emily Nakamura',
    role: 'Operations Director',
    company: 'TechStart Inc',
    content:
      "Finally, a system that keeps context alive. No more explaining the same project details over and over. The /brief command alone is worth the entire course price.",
    rating: 5,
    highlight: 'Context that never dies',
  },
  {
    id: '4',
    name: 'David Thompson',
    role: 'Consultant',
    company: 'Thompson Advisory',
    content:
      "The MCP integrations are game-changing. Having Claude talk directly to Notion, GitHub, and my CRM means I actually use those tools now instead of just paying for them.",
    rating: 5,
    highlight: 'Tools that finally talk',
  },
  {
    id: '5',
    name: 'Jessica Park',
    role: 'Product Manager',
    company: 'Acme Corp',
    content:
      "I manage 5 products and 12 stakeholders. The entity system keeps all my client preferences, decisions, and context organized. My team thinks I have superhuman memory.",
    rating: 5,
    highlight: 'Superhuman memory',
  },
];

interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials = defaultTestimonials,
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(next, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, next]);

  const current = testimonials[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div className={cn('relative', className)}>
      {/* Main Testimonial Card */}
      <div className="relative overflow-hidden rounded-2xl bg-surface/80 border border-white/10 p-8 md:p-12 min-h-[400px]">
        {/* Quote Icon */}
        <div className="absolute top-6 right-6 text-cyan-500/20">
          <Quote className="w-16 h-16" />
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={spring.default}
            className="relative z-10"
          >
            {/* Rating Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'w-5 h-5',
                    i < current.rating ? 'text-amber-400 fill-amber-400' : 'text-white/20'
                  )}
                />
              ))}
            </div>

            {/* Content */}
            <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 font-light">
              &ldquo;{current.content}&rdquo;
            </blockquote>

            {/* Highlight Badge */}
            {current.highlight && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
                <Star className="w-4 h-4 fill-cyan-400" />
                {current.highlight}
              </div>
            )}

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-xl font-bold text-white">
                {current.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <div className="font-semibold text-white">{current.name}</div>
                <div className="text-white/60 text-sm">
                  {current.role} at {current.company}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors z-20"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-white/60" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors z-20"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 text-white/60" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              index === currentIndex
                ? 'bg-cyan-400 w-6'
                : 'bg-white/20 hover:bg-white/40'
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Grid variant for displaying multiple testimonials
interface TestimonialGridProps {
  testimonials?: Testimonial[];
  columns?: 2 | 3;
  className?: string;
}

export const TestimonialGrid: React.FC<TestimonialGridProps> = ({
  testimonials = defaultTestimonials.slice(0, 6),
  columns = 3,
  className,
}) => {
  return (
    <div
      className={cn(
        'grid gap-6',
        columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <div className="h-full rounded-2xl bg-surface/50 border border-white/10 p-6 hover:border-cyan-500/30 transition-colors">
            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'w-4 h-4',
                    i < testimonial.rating
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-white/20'
                  )}
                />
              ))}
            </div>

            {/* Content */}
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              &ldquo;{testimonial.content}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-sm font-bold text-white">
                {testimonial.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <div className="font-medium text-white text-sm">{testimonial.name}</div>
                <div className="text-white/40 text-xs">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Mini testimonial for inline use
interface MiniTestimonialProps {
  testimonial: Testimonial;
  className?: string;
}

export const MiniTestimonial: React.FC<MiniTestimonialProps> = ({
  testimonial,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
        {testimonial.name
          .split(' ')
          .map((n) => n[0])
          .join('')}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white/70 text-sm truncate">
          &ldquo;{testimonial.content.slice(0, 80)}...&rdquo;
        </p>
        <div className="text-white/40 text-xs mt-1">
          {testimonial.name}, {testimonial.company}
        </div>
      </div>
      <div className="flex gap-0.5 flex-shrink-0">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
