'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Grid3X3,
  X,
  Maximize2,
  Minimize2,
  Settings,
  SkipForward,
} from 'lucide-react';
import { HolographicBadge, MagneticButton } from './PremiumEffects';

// ============================================================================
// TYPES
// ============================================================================

interface SlideInfo {
  key: string;
  label: string;
  chapter: string;
  icon: React.ReactNode;
}

interface ChapterInfo {
  name: string;
  icon: React.ReactNode;
  startIndex: number;
  endIndex: number;
  color: string;
}

interface CinemaNavigationProps {
  slides: SlideInfo[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
  isAutoPlaying: boolean;
  onAutoPlayToggle: () => void;
  narrationEnabled: boolean;
  onNarrationToggle: () => void;
  onHomeClick: () => void;
  chapters: ChapterInfo[];
  cinemaMode?: boolean;
  onCinemaModeToggle?: () => void;
}

// ============================================================================
// CINEMATIC PROGRESS BAR - Sleek animated progress
// ============================================================================

interface CinemaProgressBarProps {
  currentSlide: number;
  totalSlides: number;
  chapters: ChapterInfo[];
  onSlideClick: (index: number) => void;
  isHovered: boolean;
}

const CinemaProgressBar: React.FC<CinemaProgressBarProps> = ({
  currentSlide,
  totalSlides,
  chapters,
  onSlideClick,
  isHovered,
}) => {
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Main track */}
      <div className="relative h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        {/* Chapter segments (visible on hover) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {chapters.map((chapter, idx) => {
                const segmentWidth = ((chapter.endIndex - chapter.startIndex + 1) / totalSlides) * 100;

                return (
                  <div
                    key={chapter.name}
                    className="h-full transition-colors duration-300"
                    style={{
                      width: `${segmentWidth}%`,
                      backgroundColor:
                        currentSlide >= chapter.startIndex && currentSlide <= chapter.endIndex
                          ? `${chapter.color}40`
                          : 'transparent',
                    }}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active progress fill */}
        <motion.div
          className="absolute inset-y-0 left-0"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Gradient fill */}
          <div
            className="h-full"
            style={{
              background: `linear-gradient(90deg, ${chapters
                .map((c) => c.color)
                .join(', ')})`,
            }}
          />

          {/* Glowing tip */}
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{
              backgroundColor:
                chapters.find(
                  (c) => currentSlide >= c.startIndex && currentSlide <= c.endIndex
                )?.color || '#06b6d4',
              boxShadow: `0 0 20px ${
                chapters.find(
                  (c) => currentSlide >= c.startIndex && currentSlide <= c.endIndex
                )?.color || '#06b6d4'
              }`,
            }}
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>

      {/* Slide markers (visible on hover) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute -bottom-4 left-0 right-0 flex justify-between px-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {Array.from({ length: totalSlides }).map((_, i) => {
              const chapter = chapters.find(
                (c) => i >= c.startIndex && i <= c.endIndex
              );

              return (
                <button
                  key={i}
                  onClick={() => onSlideClick(i)}
                  className="relative group"
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full transition-all"
                    style={{
                      backgroundColor:
                        i === currentSlide
                          ? chapter?.color || '#06b6d4'
                          : i < currentSlide
                          ? `${chapter?.color || '#06b6d4'}80`
                          : 'rgba(255,255,255,0.2)',
                    }}
                    whileHover={{ scale: 1.5 }}
                  />
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ============================================================================
// FLOATING CONTROLS - Minimalist floating control panel
// ============================================================================

interface FloatingControlsProps {
  isAutoPlaying: boolean;
  onAutoPlayToggle: () => void;
  narrationEnabled: boolean;
  onNarrationToggle: () => void;
  cinemaMode: boolean;
  onCinemaModeToggle: () => void;
  onGridOpen: () => void;
  currentSlide: number;
  totalSlides: number;
  chapterColor: string;
}

const FloatingControls: React.FC<FloatingControlsProps> = ({
  isAutoPlaying,
  onAutoPlayToggle,
  narrationEnabled,
  onNarrationToggle,
  cinemaMode,
  onCinemaModeToggle,
  onGridOpen,
  currentSlide,
  totalSlides,
  chapterColor,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <motion.div
        className="flex items-center gap-2 p-2 bg-surface/80 backdrop-blur-xl border border-white/10 rounded-full"
        animate={{
          width: isExpanded ? 'auto' : 56,
          paddingRight: isExpanded ? 16 : 8,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Main play/pause button */}
        <MagneticButton
          onClick={onAutoPlayToggle}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isAutoPlaying
              ? 'text-white'
              : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'
          }`}
          magneticStrength={0.2}
        >
          <motion.div
            className="w-full h-full rounded-full flex items-center justify-center"
            style={{
              background: isAutoPlaying
                ? `linear-gradient(135deg, ${chapterColor}, ${chapterColor}80)`
                : 'transparent',
              boxShadow: isAutoPlaying ? `0 0 20px ${chapterColor}50` : 'none',
            }}
          >
            {isAutoPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </motion.div>
        </MagneticButton>

        {/* Expanded controls */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex items-center gap-1"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
            >
              {/* Narration toggle */}
              <button
                onClick={onNarrationToggle}
                className={`p-2 rounded-full transition-all ${
                  narrationEnabled
                    ? 'text-cyan-400 bg-cyan-500/20'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {narrationEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>

              {/* Cinema mode toggle */}
              <button
                onClick={onCinemaModeToggle}
                className={`p-2 rounded-full transition-all ${
                  cinemaMode
                    ? 'text-amber-400 bg-amber-500/20'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {cinemaMode ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>

              {/* Grid view */}
              <button
                onClick={onGridOpen}
                className="p-2 rounded-full text-white/40 hover:text-white/70 transition-all"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>

              {/* Slide counter */}
              <div className="px-3 text-white/40 text-xs font-mono">
                {String(currentSlide + 1).padStart(2, '0')}/{String(totalSlides).padStart(2, '0')}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// SLIDE GRID OVERLAY - Premium grid view
// ============================================================================

interface SlideGridOverlayProps {
  slides: SlideInfo[];
  currentSlide: number;
  chapters: ChapterInfo[];
  onSelect: (index: number) => void;
  onClose: () => void;
}

const SlideGridOverlay: React.FC<SlideGridOverlayProps> = ({
  slides,
  currentSlide,
  chapters,
  onSelect,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="max-w-6xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">All Slides</h2>
            <p className="text-white/40 text-sm">
              Jump to any point in the presentation
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapter sections */}
        {chapters.map((chapter) => (
          <div key={chapter.name} className="mb-8">
            {/* Chapter header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${chapter.color}20`, color: chapter.color }}
              >
                {chapter.icon}
              </div>
              <span className="text-white font-medium">{chapter.name}</span>
              <div
                className="flex-1 h-px"
                style={{
                  background: `linear-gradient(90deg, ${chapter.color}40, transparent)`,
                }}
              />
            </div>

            {/* Slides grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {slides
                .filter(
                  (_, i) => i >= chapter.startIndex && i <= chapter.endIndex
                )
                .map((slide, relIndex) => {
                  const absoluteIndex = chapter.startIndex + relIndex;
                  const isActive = absoluteIndex === currentSlide;

                  return (
                    <motion.button
                      key={slide.key}
                      onClick={() => {
                        onSelect(absoluteIndex);
                        onClose();
                      }}
                      className="relative aspect-video rounded-xl overflow-hidden group"
                      style={{
                        backgroundColor: 'rgba(19, 19, 31, 0.8)',
                        border: isActive
                          ? `2px solid ${chapter.color}`
                          : '2px solid rgba(255,255,255,0.1)',
                        boxShadow: isActive
                          ? `0 0 30px ${chapter.color}30`
                          : 'none',
                      }}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Slide number */}
                      <div
                        className="absolute top-3 left-3 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                        style={{
                          backgroundColor: isActive
                            ? chapter.color
                            : 'rgba(255,255,255,0.1)',
                          color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                        }}
                      >
                        {absoluteIndex + 1}
                      </div>

                      {/* Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="p-5 rounded-2xl"
                          style={{
                            backgroundColor: `${chapter.color}20`,
                            color: chapter.color,
                          }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {slide.icon}
                        </motion.div>
                      </div>

                      {/* Label */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                        <div className="text-white text-sm font-medium truncate">
                          {slide.label}
                        </div>
                      </div>

                      {/* Hover overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: `linear-gradient(135deg, ${chapter.color}10, transparent)`,
                        }}
                      />
                    </motion.button>
                  );
                })}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// MAIN CINEMA NAVIGATION COMPONENT
// ============================================================================

export const CinemaNavigation: React.FC<CinemaNavigationProps> = ({
  slides,
  currentSlide,
  onSlideChange,
  isAutoPlaying,
  onAutoPlayToggle,
  narrationEnabled,
  onNarrationToggle,
  onHomeClick,
  chapters,
  cinemaMode = false,
  onCinemaModeToggle,
}) => {
  const [showGrid, setShowGrid] = useState(false);
  const [isProgressHovered, setIsProgressHovered] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const currentChapter = chapters.find(
    (c) => currentSlide >= c.startIndex && currentSlide <= c.endIndex
  ) || chapters[0];

  // Auto-hide controls in cinema mode
  useEffect(() => {
    if (cinemaMode) {
      const handleMouseMove = () => {
        setShowControls(true);
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
        hideTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
      };
    } else {
      setShowControls(true);
    }
  }, [cinemaMode]);

  return (
    <>
      {/* Top bar with progress */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4">
              {/* Home button */}
              <MagneticButton
                onClick={onHomeClick}
                className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white bg-surface/50 backdrop-blur-xl border border-white/10 rounded-full transition-all"
                magneticStrength={0.2}
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Home</span>
              </MagneticButton>

              {/* Progress bar */}
              <div
                className="flex-1 py-2"
                onMouseEnter={() => setIsProgressHovered(true)}
                onMouseLeave={() => setIsProgressHovered(false)}
              >
                <CinemaProgressBar
                  currentSlide={currentSlide}
                  totalSlides={slides.length}
                  chapters={chapters}
                  onSlideClick={onSlideChange}
                  isHovered={isProgressHovered}
                />
              </div>

              {/* Chapter indicator */}
              <HolographicBadge variant="default">
                <span className="flex items-center gap-2">
                  {currentChapter.icon}
                  <span className="hidden sm:inline">{currentChapter.name}</span>
                </span>
              </HolographicBadge>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom navigation arrows */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="fixed bottom-8 left-8 flex items-center gap-4 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {/* Previous */}
            <MagneticButton
              onClick={() => onSlideChange(currentSlide - 1)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full backdrop-blur-xl transition-all ${
                currentSlide === 0
                  ? 'bg-white/5 text-white/30 cursor-not-allowed'
                  : 'bg-surface/50 border border-white/10 text-white hover:bg-white/10'
              }`}
              magneticStrength={currentSlide > 0 ? 0.3 : 0}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Back</span>
            </MagneticButton>

            {/* Next */}
            <MagneticButton
              onClick={() => onSlideChange(currentSlide + 1)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                currentSlide === slides.length - 1
                  ? 'bg-white/5 text-white/30 cursor-not-allowed'
                  : 'text-white shadow-lg'
              }`}
              magneticStrength={currentSlide < slides.length - 1 ? 0.3 : 0}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    currentSlide < slides.length - 1
                      ? `linear-gradient(135deg, ${currentChapter.color}, ${
                          chapters[
                            (chapters.indexOf(currentChapter) + 1) % chapters.length
                          ].color
                        })`
                      : 'none',
                }}
              />
              <span className="relative text-sm">Continue</span>
              <ChevronRight className="relative w-5 h-5" />
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating controls */}
      <FloatingControls
        isAutoPlaying={isAutoPlaying}
        onAutoPlayToggle={onAutoPlayToggle}
        narrationEnabled={narrationEnabled}
        onNarrationToggle={onNarrationToggle}
        cinemaMode={cinemaMode}
        onCinemaModeToggle={onCinemaModeToggle || (() => {})}
        onGridOpen={() => setShowGrid(true)}
        currentSlide={currentSlide}
        totalSlides={slides.length}
        chapterColor={currentChapter.color}
      />

      {/* Keyboard hints (hidden in cinema mode) */}
      {!cinemaMode && showControls && (
        <motion.div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 text-white/20 text-xs hidden lg:flex items-center gap-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span>← → Navigate</span>
          <span>Space Play/Pause</span>
          <span>G Grid</span>
          <span>F Fullscreen</span>
        </motion.div>
      )}

      {/* Slide Grid Overlay */}
      <AnimatePresence>
        {showGrid && (
          <SlideGridOverlay
            slides={slides}
            currentSlide={currentSlide}
            chapters={chapters}
            onSelect={onSlideChange}
            onClose={() => setShowGrid(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default CinemaNavigation;
