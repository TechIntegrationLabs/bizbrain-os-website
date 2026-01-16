'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Brain,
  Workflow,
  Zap,
  FileCheck,
  MessageSquare,
  Shield,
  Gift
} from 'lucide-react';

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
import { SlideNavigation } from '@/components/explainer/ui/SlideNavigation';

// Slide configuration with icons for grid view
const slides = [
  { key: 'intro', label: 'Introduction', component: IntroSlide, icon: <Sparkles className="w-5 h-5" />, chapter: 'The Challenge' },
  { key: 'graph', label: 'The Reality', component: GraphSlide, icon: <TrendingUp className="w-5 h-5" />, chapter: 'The Challenge' },
  { key: 'problem', label: 'The Problem', component: ProblemSlide, icon: <AlertTriangle className="w-5 h-5" />, chapter: 'The Challenge' },
  { key: 'missingPiece', label: 'The Solution', component: MissingPieceSlide, icon: <Brain className="w-5 h-5" />, chapter: 'The Solution' },
  { key: 'howItWorks', label: 'How It Works', component: HowItWorksSlide, icon: <Workflow className="w-5 h-5" />, chapter: 'The Solution' },
  { key: 'automation', label: 'Automation', component: AutomationSlide, icon: <Zap className="w-5 h-5" />, chapter: 'The Solution' },
  { key: 'caseStudy', label: 'Case Study', component: CaseStudySlide, icon: <FileCheck className="w-5 h-5" />, chapter: 'Real Results' },
  { key: 'strategic', label: 'Strategic Advisor', component: StrategicSlide, icon: <MessageSquare className="w-5 h-5" />, chapter: 'Real Results' },
  { key: 'guarantee', label: 'The Guarantee', component: GuaranteeSlide, icon: <Shield className="w-5 h-5" />, chapter: 'Get Started' },
  { key: 'offer', label: 'Get Started', component: OfferSlide, icon: <Gift className="w-5 h-5" />, chapter: 'Get Started' },
];

export default function ExplainerPage() {
  const router = useRouter();
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

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* Enhanced Navigation Component */}
      <SlideNavigation
        slides={slides.map(s => ({ key: s.key, label: s.label, icon: s.icon, chapter: s.chapter }))}
        currentSlide={currentSlide}
        onSlideChange={goToSlide}
        isAutoPlaying={isAutoPlaying}
        onAutoPlayToggle={() => setIsAutoPlaying(!isAutoPlaying)}
        narrationEnabled={narrationEnabled}
        onNarrationToggle={toggleNarration}
        onHomeClick={() => router.push('/')}
      />

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

      {/* Narration subtitle display */}
      <NarrationControls />
    </div>
  );
}
