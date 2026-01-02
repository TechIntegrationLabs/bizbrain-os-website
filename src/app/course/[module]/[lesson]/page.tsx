'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, notFound, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { LessonViewer, ProgressTracker } from '@/components/course';
import {
  getModule,
  getLesson,
  getNextLesson,
  getPreviousLesson,
  modules,
  CourseProgress,
} from '@/lib/course-data';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.module as string;
  const lessonId = params.lesson as string;

  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const module = getModule(moduleId);
  const lesson = getLesson(moduleId, lessonId);

  useEffect(() => {
    const stored = localStorage.getItem('courseProgress');
    if (stored) {
      setProgress(JSON.parse(stored));
    } else {
      const initial: CourseProgress = {
        completedLessons: [],
        currentLesson: null,
        quizScores: {},
        startedAt: new Date().toISOString(),
        lastAccessedAt: new Date().toISOString(),
      };
      setProgress(initial);
    }
    const purchased = localStorage.getItem('coursePurchased') === 'true';
    setIsPurchased(purchased);
    setIsLoaded(true);
  }, []);

  // Update last accessed
  useEffect(() => {
    if (progress) {
      const updated = {
        ...progress,
        currentLesson: lessonId,
        lastAccessedAt: new Date().toISOString(),
      };
      localStorage.setItem('courseProgress', JSON.stringify(updated));
    }
  }, [lessonId, progress]);

  if (!module || !lesson) {
    notFound();
  }

  const moduleIndex = modules.findIndex(m => m.id === moduleId);
  const isFreeModule = moduleIndex === 0;
  const isAccessible = isPurchased || isFreeModule;

  // Check access
  if (isLoaded && !isAccessible) {
    router.push('/course');
    return null;
  }

  const completedLessons = progress?.completedLessons || [];
  const isCompleted = completedLessons.includes(lessonId);

  const nextLessonInfo = getNextLesson(moduleId, lessonId);
  const prevLessonInfo = getPreviousLesson(moduleId, lessonId);

  const handleComplete = () => {
    if (!progress) return;

    const updated: CourseProgress = {
      ...progress,
      completedLessons: [...new Set([...progress.completedLessons, lessonId])],
      lastAccessedAt: new Date().toISOString(),
    };
    localStorage.setItem('courseProgress', JSON.stringify(updated));
    setProgress(updated);
  };

  const handleNext = () => {
    if (nextLessonInfo) {
      router.push(`/course/${nextLessonInfo.moduleId}/${nextLessonInfo.lessonId}`);
    }
  };

  const handlePrevious = () => {
    if (prevLessonInfo) {
      router.push(`/course/${prevLessonInfo.moduleId}/${prevLessonInfo.lessonId}`);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-white/10 bg-surface/50 backdrop-blur-xl z-40">
        <div className="px-4 md:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 -ml-2 rounded-lg hover:bg-white/10 text-white/60"
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

              <Link
                href={`/course/${moduleId}`}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Module {module.number}</span>
              </Link>
              <div className="hidden sm:block w-px h-6 bg-white/10" />
              <h1 className="font-medium text-white truncate max-w-[200px] sm:max-w-none">
                {lesson.title}
              </h1>
            </div>

            <Link
              href="/course"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/60 text-sm hover:bg-white/10 hover:text-white transition-colors"
            >
              Course Overview
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-80 border-r border-white/10 bg-surface/30">
          <ProgressTracker
            completedLessons={completedLessons}
            currentModuleId={moduleId}
            currentLessonId={lessonId}
            isLocked={!isPurchased && !isFreeModule}
          />
        </aside>

        {/* Sidebar - Mobile */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-50 w-80 bg-surface border-r border-white/10 transform transition-transform md:hidden',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="h-full pt-16">
            <ProgressTracker
              completedLessons={completedLessons}
              currentModuleId={moduleId}
              currentLessonId={lessonId}
              isLocked={!isPurchased && !isFreeModule}
            />
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Lesson Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 overflow-hidden"
        >
          <LessonViewer
            lesson={lesson}
            moduleTitle={module.title}
            moduleColor={module.color}
            isCompleted={isCompleted}
            onComplete={handleComplete}
            onNext={handleNext}
            onPrevious={handlePrevious}
            hasNext={!!nextLessonInfo}
            hasPrevious={!!prevLessonInfo}
          />
        </motion.div>
      </div>
    </main>
  );
}
