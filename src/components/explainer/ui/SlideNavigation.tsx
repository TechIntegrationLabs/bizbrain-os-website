'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Grid3X3,
  X,
  Sparkles,
  Brain,
  Zap,
  TrendingUp,
  Shield,
  Gift
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface SlideInfo {
  key: string;
  label: string;
  chapter: string;
  icon: React.ReactNode;
}

interface SlideNavigationProps {
  slides: SlideInfo[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
  isAutoPlaying: boolean;
  onAutoPlayToggle: () => void;
  narrationEnabled: boolean;
  onNarrationToggle: () => void;
  onHomeClick: () => void;
}

interface ChapterInfo {
  name: string;
  icon: React.ReactNode;
  startIndex: number;
  endIndex: number;
  color: string;
}

// ============================================================================
// CHAPTER DEFINITIONS
// ============================================================================

const chapters: ChapterInfo[] = [
  {
    name: 'The Challenge',
    icon: <Sparkles className="w-4 h-4" />,
    startIndex: 0,
    endIndex: 2,
    color: '#06b6d4' // cyan
  },
  {
    name: 'The Solution',
    icon: <Brain className="w-4 h-4" />,
    startIndex: 3,
    endIndex: 5,
    color: '#10b981' // emerald
  },
  {
    name: 'Real Results',
    icon: <TrendingUp className="w-4 h-4" />,
    startIndex: 6,
    endIndex: 7,
    color: '#f59e0b' // amber
  },
  {
    name: 'Get Started',
    icon: <Gift className="w-4 h-4" />,
    startIndex: 8,
    endIndex: 9,
    color: '#ec4899' // pink
  },
];

// ============================================================================
// ANIMATED PROGRESS DOT
// ============================================================================

interface ProgressDotProps {
  index: number;
  currentSlide: number;
  slide: SlideInfo;
  onClick: () => void;
  chapter: ChapterInfo;
}

const ProgressDot: React.FC<ProgressDotProps> = ({
  index,
  currentSlide,
  slide,
  onClick,
  chapter
}) => {
  const isActive = index === currentSlide;
  const isPast = index < currentSlide;
  const [isHovered, setIsHovered] = useState(false);

  const scale = useMotionValue(1);
  const scaleSpring = useSpring(scale, { stiffness: 400, damping: 25 });

  useEffect(() => {
    scale.set(isActive ? 1.5 : isHovered ? 1.3 : 1);
  }, [isActive, isHovered, scale]);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group p-2"
      whileTap={{ scale: 0.9 }}
    >
      {/* Dot */}
      <motion.div
        style={{ scale: scaleSpring }}
        className="relative"
      >
        {/* Outer ring for active */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: chapter.color }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Main dot */}
        <motion.div
          className="w-3 h-3 rounded-full relative z-10 transition-colors duration-300"
          style={{
            backgroundColor: isActive
              ? chapter.color
              : isPast
                ? `${chapter.color}99`
                : 'rgba(255,255,255,0.2)',
            boxShadow: isActive ? `0 0 20px ${chapter.color}` : 'none'
          }}
        />

        {/* Inner glow for active */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: chapter.color }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.4, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none z-50"
          >
            <div
              className="px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap"
              style={{
                backgroundColor: 'rgba(19, 19, 31, 0.95)',
                border: `1px solid ${chapter.color}40`,
                boxShadow: `0 4px 20px ${chapter.color}20`
              }}
            >
              <div className="text-white/90">{slide.label}</div>
              <div className="text-white/50 text-[10px] mt-0.5">{chapter.name}</div>
            </div>
            {/* Arrow */}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
              style={{ borderTopColor: 'rgba(19, 19, 31, 0.95)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// ============================================================================
// CHAPTER MARKER
// ============================================================================

interface ChapterMarkerProps {
  chapter: ChapterInfo;
  isActive: boolean;
  isPast: boolean;
  onClick: () => void;
}

const ChapterMarker: React.FC<ChapterMarkerProps> = ({ chapter, isActive, isPast, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all"
      style={{
        backgroundColor: isActive ? `${chapter.color}20` : isPast ? `${chapter.color}10` : 'rgba(255,255,255,0.05)',
        border: `1px solid ${isActive ? chapter.color : isPast ? `${chapter.color}40` : 'rgba(255,255,255,0.1)'}`,
        color: isActive ? chapter.color : isPast ? `${chapter.color}` : 'rgba(255,255,255,0.5)'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {chapter.icon}
      <span className="text-xs font-medium hidden md:inline">{chapter.name}</span>
    </motion.button>
  );
};

// ============================================================================
// SLIDE GRID OVERLAY
// ============================================================================

interface SlideGridProps {
  slides: SlideInfo[];
  currentSlide: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

const SlideGrid: React.FC<SlideGridProps> = ({ slides, currentSlide, onSelect, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="max-w-5xl w-full"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">All Slides</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {slides.map((slide, index) => {
            const chapter = chapters.find(c => index >= c.startIndex && index <= c.endIndex) || chapters[0];
            const isActive = index === currentSlide;

            return (
              <motion.button
                key={slide.key}
                onClick={() => {
                  onSelect(index);
                  onClose();
                }}
                className="relative aspect-video rounded-xl overflow-hidden group"
                style={{
                  backgroundColor: 'rgba(19, 19, 31, 0.8)',
                  border: isActive ? `2px solid ${chapter.color}` : '2px solid rgba(255,255,255,0.1)'
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Slide number */}
                <div
                  className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: isActive ? chapter.color : 'rgba(255,255,255,0.1)',
                    color: isActive ? 'white' : 'rgba(255,255,255,0.6)'
                  }}
                >
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="p-4 rounded-full"
                    style={{
                      backgroundColor: `${chapter.color}20`,
                      color: chapter.color
                    }}
                  >
                    {slide.icon}
                  </div>
                </div>

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-white text-sm font-medium truncate">{slide.label}</div>
                  <div className="text-white/50 text-xs">{chapter.name}</div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// PROGRESS BAR WITH CHAPTERS
// ============================================================================

interface ChapterProgressBarProps {
  currentSlide: number;
  totalSlides: number;
}

const ChapterProgressBar: React.FC<ChapterProgressBarProps> = ({ currentSlide, totalSlides }) => {
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/5 z-50">
      {/* Chapter segments */}
      <div className="absolute inset-0 flex">
        {chapters.map((chapter, idx) => {
          const segmentWidth = ((chapter.endIndex - chapter.startIndex + 1) / totalSlides) * 100;
          const segmentStart = (chapter.startIndex / totalSlides) * 100;
          const isActive = currentSlide >= chapter.startIndex && currentSlide <= chapter.endIndex;
          const isPast = currentSlide > chapter.endIndex;

          return (
            <div
              key={chapter.name}
              className="absolute h-full transition-opacity duration-300"
              style={{
                left: `${segmentStart}%`,
                width: `${segmentWidth}%`,
                backgroundColor: isPast || isActive ? `${chapter.color}30` : 'transparent'
              }}
            />
          );
        })}
      </div>

      {/* Active progress */}
      <motion.div
        className="h-full relative"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Gradient fill based on current chapter */}
        {chapters.map((chapter, idx) => {
          const segmentStart = (chapter.startIndex / totalSlides) * 100;
          const segmentEnd = ((chapter.endIndex + 1) / totalSlides) * 100;

          return (
            <div
              key={chapter.name}
              className="absolute h-full"
              style={{
                left: `${(segmentStart / progress) * 100}%`,
                width: `${((segmentEnd - segmentStart) / progress) * 100}%`,
                backgroundColor: chapter.color,
                clipPath: progress > segmentStart ? 'none' : 'polygon(0 0, 0 0, 0 100%, 0 100%)'
              }}
            />
          );
        })}

        {/* Glow at the end */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full blur-sm"
          style={{
            backgroundColor: chapters.find(c => currentSlide >= c.startIndex && currentSlide <= c.endIndex)?.color || '#06b6d4'
          }}
        />
      </motion.div>

      {/* Chapter dividers */}
      {chapters.slice(1).map((chapter) => (
        <div
          key={`divider-${chapter.name}`}
          className="absolute top-0 bottom-0 w-px bg-white/20"
          style={{ left: `${(chapter.startIndex / totalSlides) * 100}%` }}
        />
      ))}
    </div>
  );
};

// ============================================================================
// MAIN NAVIGATION COMPONENT
// ============================================================================

export const SlideNavigation: React.FC<SlideNavigationProps> = ({
  slides,
  currentSlide,
  onSlideChange,
  isAutoPlaying,
  onAutoPlayToggle,
  narrationEnabled,
  onNarrationToggle,
  onHomeClick
}) => {
  const [showGrid, setShowGrid] = useState(false);
  const [showChapters, setShowChapters] = useState(true);

  const currentChapter = chapters.find(
    c => currentSlide >= c.startIndex && currentSlide <= c.endIndex
  ) || chapters[0];

  // Map slides to include chapter info
  const slidesWithInfo: SlideInfo[] = slides.map((slide, index) => ({
    ...slide,
    chapter: chapters.find(c => index >= c.startIndex && index <= c.endIndex)?.name || 'Introduction',
    icon: slide.icon || <Sparkles className="w-5 h-5" />
  }));

  return (
    <>
      {/* Enhanced Progress Bar */}
      <ChapterProgressBar currentSlide={currentSlide} totalSlides={slides.length} />

      {/* Top Navigation */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-50">
        {/* Left: Home + Chapter markers */}
        <div className="flex items-center gap-3">
          {/* Home button */}
          <motion.button
            onClick={onHomeClick}
            className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Home</span>
          </motion.button>

          {/* Chapter markers (desktop only) */}
          <div className="hidden lg:flex items-center gap-2">
            {chapters.map((chapter) => (
              <ChapterMarker
                key={chapter.name}
                chapter={chapter}
                isActive={currentSlide >= chapter.startIndex && currentSlide <= chapter.endIndex}
                isPast={currentSlide > chapter.endIndex}
                onClick={() => onSlideChange(chapter.startIndex)}
              />
            ))}
          </div>
        </div>

        {/* Center: Slide counter with chapter name */}
        <div className="flex flex-col items-center">
          <div
            className="text-sm font-bold"
            style={{ color: currentChapter.color }}
          >
            {currentChapter.name}
          </div>
          <div className="text-white/40 text-xs font-mono">
            {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          {/* Grid view toggle */}
          <motion.button
            onClick={() => setShowGrid(true)}
            className="p-2 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="View all slides"
          >
            <Grid3X3 className="w-4 h-4" />
          </motion.button>

          {/* Auto-play toggle */}
          <motion.button
            onClick={onAutoPlayToggle}
            className={`p-2 rounded-full transition-all ${
              isAutoPlaying
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isAutoPlaying ? 'Pause auto-play' : 'Start auto-play'}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </motion.button>

          {/* Narration toggle */}
          <motion.button
            onClick={onNarrationToggle}
            className={`p-2 rounded-full transition-all ${
              narrationEnabled
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={narrationEnabled ? 'Mute narration' : 'Enable narration'}
          >
            {narrationEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 z-50">
        {/* Previous button */}
        <motion.button
          onClick={() => onSlideChange(currentSlide - 1)}
          disabled={currentSlide === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            currentSlide === 0
              ? 'bg-white/5 text-white/30 cursor-not-allowed'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          whileHover={currentSlide > 0 ? { scale: 1.05 } : {}}
          whileTap={currentSlide > 0 ? { scale: 0.95 } : {}}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm font-medium hidden sm:inline">Previous</span>
        </motion.button>

        {/* Slide indicators with chapters */}
        <div className="flex items-center gap-1">
          {slidesWithInfo.map((slide, index) => {
            const chapter = chapters.find(c => index >= c.startIndex && index <= c.endIndex) || chapters[0];
            const isChapterStart = index === chapter.startIndex && index > 0;

            return (
              <React.Fragment key={slide.key}>
                {/* Chapter divider */}
                {isChapterStart && (
                  <div className="w-px h-4 bg-white/20 mx-1" />
                )}
                <ProgressDot
                  index={index}
                  currentSlide={currentSlide}
                  slide={slide}
                  onClick={() => onSlideChange(index)}
                  chapter={chapter}
                />
              </React.Fragment>
            );
          })}
        </div>

        {/* Next button */}
        <motion.button
          onClick={() => onSlideChange(currentSlide + 1)}
          disabled={currentSlide === slides.length - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            currentSlide === slides.length - 1
              ? 'bg-white/5 text-white/30 cursor-not-allowed'
              : 'text-white shadow-lg'
          }`}
          style={{
            background: currentSlide === slides.length - 1
              ? undefined
              : `linear-gradient(135deg, ${currentChapter.color}, ${chapters[(chapters.indexOf(currentChapter) + 1) % chapters.length].color})`,
            boxShadow: currentSlide === slides.length - 1
              ? undefined
              : `0 4px 20px ${currentChapter.color}40`
          }}
          whileHover={currentSlide < slides.length - 1 ? { scale: 1.05 } : {}}
          whileTap={currentSlide < slides.length - 1 ? { scale: 0.95 } : {}}
        >
          <span className="text-sm font-medium hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Keyboard hints */}
      <div className="absolute bottom-4 right-4 text-white/20 text-xs hidden lg:flex items-center gap-4 z-50">
        <span>← → Navigate</span>
        <span>Space Next</span>
        <span>G Grid</span>
        <span>Esc Exit</span>
      </div>

      {/* Slide Grid Overlay */}
      <AnimatePresence>
        {showGrid && (
          <SlideGrid
            slides={slidesWithInfo}
            currentSlide={currentSlide}
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

export { chapters };
export type { SlideInfo, ChapterInfo };
