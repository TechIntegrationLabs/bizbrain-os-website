'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import Link from 'next/link';

// Import all slides
import { IntroSlide } from '@/components/explainer/slides/IntroSlide';
import { GraphSlide } from '@/components/explainer/slides/GraphSlide';
import { ProblemSlide } from '@/components/explainer/slides/ProblemSlide';
import { MissingPieceSlide } from '@/components/explainer/slides/MissingPieceSlide';
import { HowItWorksSlide } from '@/components/explainer/slides/HowItWorksSlide';
import { AutomationSlide } from '@/components/explainer/slides/AutomationSlide';
import { CaseStudySlide } from '@/components/explainer/slides/CaseStudySlide';
import { StrategicSlide } from '@/components/explainer/slides/StrategicSlide';
import { GuaranteeSlide } from '@/components/explainer/slides/GuaranteeSlide';
import { OfferSlide } from '@/components/explainer/slides/OfferSlide';
import { useNarrationStore, NarrationControls } from '@/components/explainer/ui/Narration';

// Slide configuration
const slides = [
  { key: 'intro', label: 'Introduction', component: IntroSlide },
  { key: 'graph', label: 'The Reality', component: GraphSlide },
  { key: 'problem', label: 'The Problem', component: ProblemSlide },
  { key: 'missingPiece', label: 'The Solution', component: MissingPieceSlide },
  { key: 'howItWorks', label: 'How It Works', component: HowItWorksSlide },
  { key: 'automation', label: 'Automation', component: AutomationSlide },
  { key: 'caseStudy', label: 'Case Study', component: CaseStudySlide },
  { key: 'strategic', label: 'Strategic Advisor', component: StrategicSlide },
  { key: 'guarantee', label: 'The Guarantee', component: GuaranteeSlide },
  { key: 'offer', label: 'Get Started', component: OfferSlide },
];

export default function ExplainerPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { audioEnabled: narrationEnabled, toggleAudio: toggleNarration } = useNarrationStore();

  // Handle slide navigation
  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
    }
  }, []);

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      // Last slide - stop autoplay
      setIsAutoPlaying(false);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(slides.length - 1);
          break;
        case 'Escape':
          setIsAutoPlaying(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentSlide(prev => {
          if (prev < slides.length - 1) {
            return prev + 1;
          } else {
            setIsAutoPlaying(false);
            return prev;
          }
        });
      }, 12000); // 12 seconds per slide
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying]);

  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Top navigation */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-50">
        {/* Home button */}
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all"
        >
          <Home className="w-4 h-4" />
          <span className="text-sm font-medium hidden sm:inline">Back to Home</span>
        </Link>

        {/* Slide counter */}
        <div className="text-white/40 text-sm font-mono">
          {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Auto-play toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`p-2 rounded-full transition-all ${
              isAutoPlaying
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
            title={isAutoPlaying ? 'Pause auto-play' : 'Start auto-play'}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Narration toggle */}
          <button
            onClick={toggleNarration}
            className={`p-2 rounded-full transition-all ${
              narrationEnabled
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
            title={narrationEnabled ? 'Mute narration' : 'Enable narration'}
          >
            {narrationEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main slide area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute top-14 bottom-24 left-0 right-0 overflow-hidden"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {slides.map((slide, index) => {
            const SlideComponent = slide.component;
            return (
              <div
                key={slide.key}
                className={`absolute inset-0 ${index === currentSlide ? 'visible' : 'hidden'}`}
              >
                <SlideComponent
                  isActive={index === currentSlide}
                  onComplete={nextSlide}
                />
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Bottom navigation */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 z-50">
        {/* Previous button */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            currentSlide === 0
              ? 'bg-white/5 text-white/30 cursor-not-allowed'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm font-medium hidden sm:inline">Previous</span>
        </button>

        {/* Slide indicators */}
        <div className="flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.key}
              onClick={() => goToSlide(index)}
              className="group relative p-1"
              title={slide.label}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-cyan-400 scale-125'
                    : index < currentSlide
                    ? 'bg-emerald-500/60'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-surface rounded text-xs text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {slide.label}
              </div>
            </button>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            currentSlide === slides.length - 1
              ? 'bg-white/5 text-white/30 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:from-cyan-400 hover:to-emerald-400 shadow-lg shadow-cyan-500/20'
          }`}
        >
          <span className="text-sm font-medium hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Narration subtitle display */}
      <NarrationControls />

      {/* Keyboard hints */}
      <div className="absolute bottom-4 right-4 text-white/20 text-xs hidden lg:flex items-center gap-4 z-50">
        <span>← → Navigate</span>
        <span>Space Next</span>
        <span>Esc Exit Auto-play</span>
      </div>
    </div>
  );
}
