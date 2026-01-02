'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, notFound, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Clock,
  BookOpen,
  Play,
  Check,
  Lock,
  ChevronRight,
  FlaskConical,
  HelpCircle,
  Code,
} from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { getModule, modules, CourseProgress } from '@/lib/course-data';
import { staggerContainer, staggerItem } from '@/lib/animations';

const lessonTypeConfig = {
  video: { icon: Play, label: 'Video', color: '#ef4444' },
  reading: { icon: BookOpen, label: 'Reading', color: '#06b6d4' },
  interactive: { icon: Code, label: 'Interactive', color: '#10b981' },
  quiz: { icon: HelpCircle, label: 'Quiz', color: '#f59e0b' },
  lab: { icon: FlaskConical, label: 'Lab', color: '#8b5cf6' },
};

// Icon mapping for modules
const moduleIcons: Record<string, React.ElementType> = {
  Brain,
};

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.module as string;

  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const module = getModule(moduleId);

  useEffect(() => {
    const stored = localStorage.getItem('courseProgress');
    if (stored) {
      setProgress(JSON.parse(stored));
    }
    const purchased = localStorage.getItem('coursePurchased') === 'true';
    setIsPurchased(purchased);
    setIsLoaded(true);
  }, []);

  if (!module) {
    notFound();
  }

  const completedLessons = progress?.completedLessons || [];
  const moduleIndex = modules.findIndex(m => m.id === moduleId);
  const isFreeModule = moduleIndex === 0;
  const isAccessible = isPurchased || isFreeModule;

  // Calculate module progress
  const moduleProgress = Math.round(
    (module.lessons.filter(l => completedLessons.includes(l.id)).length /
      module.lessons.length) *
      100
  );

  // Get next/previous modules
  const prevModule = moduleIndex > 0 ? modules[moduleIndex - 1] : null;
  const nextModule = moduleIndex < modules.length - 1 ? modules[moduleIndex + 1] : null;

  // Find first incomplete lesson
  const firstIncompleteLesson =
    module.lessons.find(l => !completedLessons.includes(l.id)) || module.lessons[0];

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
                href="/course"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Course
              </Link>
              <div className="w-px h-6 bg-white/10" />
              <h1 className="font-semibold text-white">Module {module.number}</h1>
            </div>

            {isAccessible && (
              <Link
                href={`/course/${moduleId}/${firstIncompleteLesson.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                <Play className="w-4 h-4" />
                {moduleProgress > 0 ? 'Continue' : 'Start Module'}
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Module Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6"
            style={{ backgroundColor: `${module.color}20` }}
          >
            <Brain className="w-10 h-10" style={{ color: module.color }} />
          </div>

          <div className="text-sm text-white/40 mb-2">Module {module.number}</div>
          <h1 className="text-4xl font-bold text-white mb-4">{module.title}</h1>
          <p className="text-lg text-white/60 mb-6">{module.description}</p>

          {/* Module Stats */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-white/40">
              <BookOpen className="w-4 h-4" />
              {module.lessons.length} lessons
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <Clock className="w-4 h-4" />
              {module.duration} min
            </div>
            {moduleProgress > 0 && (
              <div className="flex items-center gap-2 text-emerald-400">
                <Check className="w-4 h-4" />
                {moduleProgress}% complete
              </div>
            )}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: module.color }}
              initial={{ width: 0 }}
              animate={{ width: `${moduleProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Lesson List */}
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto space-y-3"
        >
          {module.lessons.map((lesson, index) => {
            const config = lessonTypeConfig[lesson.type];
            const Icon = config.icon;
            const isCompleted = completedLessons.includes(lesson.id);
            const isLocked = !isAccessible;

            return (
              <motion.div key={lesson.id} variants={staggerItem}>
                <Link
                  href={isLocked ? '#' : `/course/${moduleId}/${lesson.id}`}
                  className={cn(
                    'group flex items-center gap-4 p-4 rounded-xl border transition-all',
                    isLocked
                      ? 'cursor-not-allowed opacity-50 border-white/5 bg-white/[0.02]'
                      : isCompleted
                        ? 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50'
                        : 'border-white/10 bg-surface/50 hover:border-white/20 hover:bg-white/5'
                  )}
                >
                  {/* Number/Status */}
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                      isCompleted
                        ? 'bg-emerald-500/20'
                        : isLocked
                          ? 'bg-white/5'
                          : 'bg-white/5 group-hover:bg-white/10'
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-emerald-400" />
                    ) : isLocked ? (
                      <Lock className="w-4 h-4 text-white/40" />
                    ) : (
                      <span className="text-sm font-medium text-white/60">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className={cn(
                          'font-medium',
                          isCompleted ? 'text-white/60' : 'text-white'
                        )}
                      >
                        {lesson.title}
                      </h3>
                      <div
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                        style={{
                          backgroundColor: `${config.color}20`,
                          color: config.color,
                        }}
                      >
                        <Icon className="w-3 h-3" />
                        {config.label}
                      </div>
                    </div>
                    <p className="text-sm text-white/40 truncate">
                      {lesson.description}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm text-white/40">
                    <Clock className="w-4 h-4" />
                    {lesson.duration}m
                  </div>

                  {/* Arrow */}
                  <ChevronRight
                    className={cn(
                      'w-5 h-5 text-white/20',
                      !isLocked && 'group-hover:text-white/40 transition-colors'
                    )}
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Module Navigation */}
        <div className="max-w-3xl mx-auto mt-12 flex items-center justify-between">
          {prevModule ? (
            <Link
              href={`/course/${prevModule.id}`}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-white/40" />
              <div className="text-left">
                <div className="text-xs text-white/40">Previous Module</div>
                <div className="text-sm text-white">{prevModule.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextModule ? (
            <Link
              href={`/course/${nextModule.id}`}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="text-right">
                <div className="text-xs text-white/40">Next Module</div>
                <div className="text-sm text-white">{nextModule.title}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/40" />
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Locked CTA */}
        {!isAccessible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent"
          >
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block p-6 rounded-2xl border border-white/10 bg-surface">
                <Lock className="w-8 h-8 text-white/40 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  This module is locked
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  Get full access to unlock all {modules.length} modules and{' '}
                  {modules.reduce((sum, m) => sum + m.lessons.length, 0)} lessons.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  Unlock Full Course
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
