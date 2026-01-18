'use client';

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
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

// Import new cinematic components
import { CinematicSlide } from '@/components/explainer/ui/CinematicTransition';
import { CinemaNavigation } from '@/components/explainer/ui/CinemaNavigation';
import { CinemaMode, NoiseOverlay } from '@/components/explainer/ui/PremiumEffects';

// Dynamic import for 3D scene (SSR-safe)
const ImmersiveScene = dynamic(
  () => import('@/components/explainer/ui/ImmersiveScene').then(mod => ({ default: mod.ImmersiveScene })),
  { ssr: false }
);

const GradientMesh = dynamic(
  () => import('@/components/explainer/ui/ImmersiveScene').then(mod => ({ default: mod.GradientMesh })),
  { ssr: false }
);

// Slide configuration - flat list of all slides
const slides = [
  { key: 'intro', label: 'Introduction', chapter: 'The Challenge', icon: <Sparkles className="w-4 h-4" /> },
  { key: 'graph', label: 'The Reality', chapter: 'The Challenge', icon: <TrendingUp className="w-4 h-4" /> },
  { key: 'problem', label: 'The Problem', chapter: 'The Challenge', icon: <AlertTriangle className="w-4 h-4" /> },
  { key: 'missingPiece', label: 'The Solution', chapter: 'The Solution', icon: <Brain className="w-4 h-4" /> },
  { key: 'howItWorks', label: 'How It Works', chapter: 'The Solution', icon: <Workflow className="w-4 h-4" /> },
  { key: 'automation', label: 'Automation', chapter: 'The Solution', icon: <Zap className="w-4 h-4" /> },
  { key: 'caseStudy', label: 'Case Study', chapter: 'Real Results', icon: <FileCheck className="w-4 h-4" /> },
  { key: 'strategic', label: 'Strategic Advisor', chapter: 'Real Results', icon: <MessageSquare className="w-4 h-4" /> },
  { key: 'guarantee', label: 'The Guarantee', chapter: 'Get Started', icon: <Shield className="w-4 h-4" /> },
  { key: 'offer', label: 'Get Started', chapter: 'Get Started', icon: <Gift className="w-4 h-4" /> },
];

// Chapter configuration for navigation - matching CinemaNavigation interface
const chapters = [
  { name: 'The Challenge', icon: <AlertTriangle className="w-4 h-4" />, startIndex: 0, endIndex: 2, color: '#06b6d4' },
  { name: 'The Solution', icon: <Brain className="w-4 h-4" />, startIndex: 3, endIndex: 5, color: '#10b981' },
  { name: 'Real Results', icon: <FileCheck className="w-4 h-4" />, startIndex: 6, endIndex: 7, color: '#f59e0b' },
  { name: 'Get Started', icon: <Gift className="w-4 h-4" />, startIndex: 8, endIndex: 9, color: '#ec4899' },
];

// Helper to get chapter ID from slide index
const getChapterId = (slideIndex: number): 'challenge' | 'solution' | 'results' | 'getStarted' => {
  if (slideIndex <= 2) return 'challenge';
  if (slideIndex <= 5) return 'solution';
  if (slideIndex <= 7) return 'results';
  return 'getStarted';
};

// Map slide keys to components
const slideComponents: Record<string, React.FC<{ isActive: boolean; onComplete?: () => void }>> = {
  intro: IntroSlide,
  graph: GraphSlide,
  problem: ProblemSlide,
  missingPiece: MissingPieceSlide,
  howItWorks: HowItWorksSlide,
  automation: AutomationSlide,
  caseStudy: CaseStudySlide,
  strategic: StrategicSlide,
  guarantee: GuaranteeSlide,
  offer: OfferSlide,
};

// Transition sequence for dramatic effect
const transitionSequence: Array<'fade' | 'reveal' | 'zoom' | 'morph' | 'split' | 'dissolve'> = [
  'reveal',
  'zoom',
  'morph',
  'split',
  'dissolve',
  'fade',
  'reveal',
  'zoom',
  'morph',
  'split',
];

export default function ExplainerPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [cinemaMode, setCinemaMode] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { audioEnabled: narrationEnabled, toggleAudio: toggleNarration } = useNarrationStore();

  // Get current chapter for scene theming
  const currentChapter = useMemo(() => {
    return getChapterId(currentSlide);
  }, [currentSlide]);

  // Get gradient colors for current chapter
  const gradientColors = useMemo(() => {
    const chapterColors: Record<string, string[]> = {
      challenge: ['#06b6d4', '#3b82f6', '#8b5cf6'],
      solution: ['#10b981', '#06b6d4', '#3b82f6'],
      results: ['#f59e0b', '#10b981', '#06b6d4'],
      getStarted: ['#ec4899', '#f59e0b', '#10b981'],
    };
    return chapterColors[currentChapter] || chapterColors.challenge;
  }, [currentChapter]);

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

  // Toggle cinema mode
  const toggleCinemaMode = useCallback(() => {
    setCinemaMode(prev => !prev);
  }, []);

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
          setCinemaMode(false);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleCinemaMode();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, toggleCinemaMode]);

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
      {/* Immersive 3D Background Scene */}
      <ImmersiveScene
        slideIndex={currentSlide}
        totalSlides={slides.length}
        chapter={currentChapter}
        className="z-0"
      />

      {/* Gradient Mesh Overlay */}
      <GradientMesh colors={gradientColors} className="z-1 opacity-50" />

      {/* Subtle noise texture */}
      <NoiseOverlay opacity={0.02} />

      {/* Cinema Mode Overlay */}
      <CinemaMode isActive={cinemaMode} />

      {/* Enhanced Navigation Component */}
      <CinemaNavigation
        slides={slides}
        chapters={chapters}
        currentSlide={currentSlide}
        onSlideChange={goToSlide}
        isAutoPlaying={isAutoPlaying}
        onAutoPlayToggle={() => setIsAutoPlaying(!isAutoPlaying)}
        narrationEnabled={narrationEnabled}
        onNarrationToggle={toggleNarration}
        cinemaMode={cinemaMode}
        onCinemaModeToggle={toggleCinemaMode}
        onHomeClick={() => router.push('/')}
      />

      {/* Main slide area with cinematic transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {slides.map((slide, index) => {
            const SlideComponent = slideComponents[slide.key];
            const transitionType = transitionSequence[index % transitionSequence.length];

            if (index !== currentSlide) return null;

            return (
              <CinematicSlide
                key={slide.key}
                isActive={index === currentSlide}
                slideIndex={index}
                variant={transitionType}
              >
                <div className="h-full w-full pt-16 pb-24">
                  <SlideComponent
                    isActive={index === currentSlide}
                    onComplete={nextSlide}
                  />
                </div>
              </CinematicSlide>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Vignette effect for cinematic feel */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Narration subtitle display */}
      <NarrationControls />

      {/* Keyboard hints (show briefly on first load) */}
      <KeyboardHints />
    </div>
  );
}

// Keyboard hints component
const KeyboardHints: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-3 bg-black/60 backdrop-blur-xl rounded-full border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 text-xs text-white/60">
            <kbd className="px-2 py-1 bg-white/10 rounded text-white/80">←</kbd>
            <kbd className="px-2 py-1 bg-white/10 rounded text-white/80">→</kbd>
            <span>Navigate</span>
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="flex items-center gap-2 text-xs text-white/60">
            <kbd className="px-2 py-1 bg-white/10 rounded text-white/80">F</kbd>
            <span>Cinema Mode</span>
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="flex items-center gap-2 text-xs text-white/60">
            <kbd className="px-2 py-1 bg-white/10 rounded text-white/80">Esc</kbd>
            <span>Exit</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
