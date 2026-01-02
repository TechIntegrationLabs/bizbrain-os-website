'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Clock,
  BookOpen,
  Award,
  Play,
  Lock,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { ProgressTracker } from '@/components/course';
import {
  modules,
  getTotalDuration,
  getTotalLessons,
  calculateProgress,
  CourseProgress,
} from '@/lib/course-data';
import { staggerContainer, staggerItem } from '@/lib/animations';

// Load progress from localStorage
function useProgress() {
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('courseProgress');
    if (stored) {
      setProgress(JSON.parse(stored));
    } else {
      // Initialize empty progress
      const initial: CourseProgress = {
        completedLessons: [],
        currentLesson: null,
        quizScores: {},
        startedAt: new Date().toISOString(),
        lastAccessedAt: new Date().toISOString(),
      };
      setProgress(initial);
    }
    setIsLoaded(true);
  }, []);

  const saveProgress = (newProgress: CourseProgress) => {
    localStorage.setItem('courseProgress', JSON.stringify(newProgress));
    setProgress(newProgress);
  };

  return { progress, saveProgress, isLoaded };
}

export default function CoursePage() {
  const { progress, isLoaded } = useProgress();
  const [isPurchased, setIsPurchased] = useState(false);

  // Check purchase status (simulated)
  useEffect(() => {
    const purchased = localStorage.getItem('coursePurchased') === 'true';
    setIsPurchased(purchased);
  }, []);

  const completedLessons = progress?.completedLessons || [];
  const overallProgress = calculateProgress(completedLessons);
  const totalDuration = getTotalDuration();
  const totalLessons = getTotalLessons();

  // Find first incomplete lesson
  const getStartLesson = () => {
    for (const module of modules) {
      for (const lesson of module.lessons) {
        if (!completedLessons.includes(lesson.id)) {
          return { moduleId: module.id, lessonId: lesson.id };
        }
      }
    }
    return { moduleId: modules[0].id, lessonId: modules[0].lessons[0].id };
  };

  const startLesson = getStartLesson();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-surface/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
              <div className="w-px h-6 bg-white/10" />
              <h1 className="font-semibold text-white">Course</h1>
            </div>

            {isPurchased ? (
              <Link
                href={`/course/${startLesson.moduleId}/${startLesson.lessonId}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                <Play className="w-4 h-4" />
                {overallProgress > 0 ? 'Continue Learning' : 'Start Course'}
              </Link>
            ) : (
              <Link
                href="/pricing"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                Get Access
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-medium">
              {modules.length} Modules &bull; {totalLessons} Lessons
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Build Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Business Brain
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            The complete system for AI-powered business operations. From folder
            structure to advanced automation.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12"
        >
          {[
            {
              icon: BookOpen,
              value: `${modules.length}`,
              label: 'Modules',
              color: '#06b6d4',
            },
            {
              icon: Clock,
              value: `${Math.round(totalDuration / 60)}h`,
              label: 'Content',
              color: '#10b981',
            },
            {
              icon: Award,
              value: '7',
              label: 'Labs',
              color: '#f59e0b',
            },
            {
              icon: Sparkles,
              value: 'Lifetime',
              label: 'Access',
              color: '#8b5cf6',
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="p-4 rounded-xl border border-white/10 bg-surface/50 text-center"
              >
                <div
                  className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/40">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Course Content */}
        {isPurchased ? (
          <div className="max-w-4xl mx-auto">
            <ProgressTracker
              completedLessons={completedLessons}
              variant="full"
            />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Module Preview (Locked) */}
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {modules.map((module, index) => {
                const isFree = index === 0; // First module is free preview

                return (
                  <motion.div
                    key={module.id}
                    variants={staggerItem}
                    className={cn(
                      'relative rounded-xl border p-6',
                      isFree
                        ? 'border-cyan-500/30 bg-cyan-500/5'
                        : 'border-white/10 bg-surface/50'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${module.color}20` }}
                      >
                        <Brain
                          className="w-7 h-7"
                          style={{ color: module.color }}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm text-white/40">
                            Module {module.number}
                          </span>
                          {isFree ? (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-500/20 text-emerald-400">
                              Free Preview
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-white/5 text-white/40">
                              <Lock className="w-3 h-3" />
                              Locked
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {module.title}
                        </h3>
                        <p className="text-white/60 mb-4">{module.description}</p>

                        <div className="flex items-center gap-4 text-sm text-white/40">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {module.lessons.length} lessons
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {module.duration} min
                          </span>
                        </div>
                      </div>

                      {isFree && (
                        <Link
                          href={`/course/${module.id}/${module.lessons[0].id}`}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition-colors"
                        >
                          Start Free
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>

                    {/* Lesson list preview */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {module.lessons.slice(0, 4).map((lesson, li) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.02]"
                          >
                            <div
                              className={cn(
                                'w-6 h-6 rounded-md flex items-center justify-center text-xs',
                                isFree
                                  ? 'bg-cyan-500/20 text-cyan-400'
                                  : 'bg-white/5 text-white/40'
                              )}
                            >
                              {li + 1}
                            </div>
                            <span
                              className={cn(
                                'text-sm',
                                isFree ? 'text-white/80' : 'text-white/40'
                              )}
                            >
                              {lesson.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <div className="inline-block p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-surface to-cyan-950/20">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Ready to get started?
                </h3>
                <p className="text-white/60 mb-6">
                  Get lifetime access to the complete course with all updates.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  Get Full Access - $297
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="mt-4 text-sm text-white/40">
                  30-day money-back guarantee
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}
