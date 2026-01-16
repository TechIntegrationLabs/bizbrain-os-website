'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  FolderTree,
  Inbox,
  Users,
  Terminal,
  Server,
  Workflow,
  ChevronDown,
  ChevronRight,
  Check,
  Play,
  BookOpen,
  Code,
  HelpCircle,
  FlaskConical,
  Lock,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Module, Lesson, modules, calculateProgress } from '@/lib/course-data';

// Icon mapping for modules
const moduleIcons: Record<string, React.ElementType> = {
  Brain,
  FolderTree,
  Inbox,
  Users,
  Terminal,
  Server,
  Workflow,
};

const lessonTypeIcons = {
  video: Play,
  reading: BookOpen,
  interactive: Code,
  quiz: HelpCircle,
  lab: FlaskConical,
};

interface ProgressTrackerProps {
  completedLessons: string[];
  currentModuleId?: string;
  currentLessonId?: string;
  isLocked?: boolean;
  variant?: 'sidebar' | 'full';
}

export function ProgressTracker({
  completedLessons,
  currentModuleId,
  currentLessonId,
  isLocked = false,
  variant = 'sidebar',
}: ProgressTrackerProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>(
    currentModuleId ? [currentModuleId] : [modules[0].id]
  );

  const progress = calculateProgress(completedLessons);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const isLessonCompleted = (lessonId: string) =>
    completedLessons.includes(lessonId);

  const isModuleCompleted = (module: Module) =>
    module.lessons.every(l => completedLessons.includes(l.id));

  const getModuleProgress = (module: Module) => {
    const completed = module.lessons.filter(l =>
      completedLessons.includes(l.id)
    ).length;
    return Math.round((completed / module.lessons.length) * 100);
  };

  if (variant === 'full') {
    return (
      <div className="space-y-8">
        {/* Overall Progress */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-4 border-cyan-500/20 relative mb-4">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                fill="none"
                stroke="rgba(6, 182, 212, 0.2)"
                strokeWidth="8"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="8"
                strokeDasharray={`${progress * 3.64} 364`}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{progress}%</div>
              <div className="text-xs text-white/40">Complete</div>
            </div>
          </div>
          <p className="text-white/60">
            {completedLessons.length} of{' '}
            {modules.reduce((sum, m) => sum + m.lessons.length, 0)} lessons
            completed
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((module, index) => {
            const Icon = (moduleIcons[module.icon] || Brain) as React.FC<{ className?: string; style?: React.CSSProperties }>;
            const moduleProgress = getModuleProgress(module);
            const isComplete = isModuleCompleted(module);

            return (
              <Link
                key={module.id}
                href={isLocked ? '#' : `/course/${module.id}`}
                className={cn(
                  'group relative rounded-xl border p-6 transition-all',
                  isLocked
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:border-white/20 hover:bg-white/5',
                  isComplete
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-white/10 bg-surface/50'
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${module.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: module.color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-white/40">
                        Module {module.number}
                      </span>
                      {isComplete && (
                        <span className="flex items-center gap-1 text-xs text-emerald-400">
                          <Check className="w-3 h-3" />
                          Complete
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-semibold mb-1 truncate">
                      {module.title}
                    </h3>
                    <p className="text-white/40 text-sm line-clamp-2">
                      {module.description}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: module.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${moduleProgress}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between text-xs text-white/40">
                  <span>
                    {module.lessons.filter(l => completedLessons.includes(l.id)).length}
                    /{module.lessons.length} lessons
                  </span>
                  <span>{module.duration} min</span>
                </div>

                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-xl">
                    <Lock className="w-6 h-6 text-white/40" />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // Sidebar variant
  return (
    <div className="h-full flex flex-col">
      {/* Progress Header */}
      <div className="flex-shrink-0 p-4 border-b border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-10 h-10">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="3"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="3"
                strokeDasharray={`${progress * 1.01} 101`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
              {progress}%
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-white">Your Progress</div>
            <div className="text-xs text-white/40">
              {completedLessons.length}/
              {modules.reduce((sum, m) => sum + m.lessons.length, 0)} lessons
            </div>
          </div>
        </div>
      </div>

      {/* Module List */}
      <div className="flex-1 overflow-y-auto">
        {modules.map(module => {
          const Icon = (moduleIcons[module.icon] || Brain) as React.FC<{ className?: string; style?: React.CSSProperties }>;
          const isExpanded = expandedModules.includes(module.id);
          const isComplete = isModuleCompleted(module);
          const isCurrent = currentModuleId === module.id;

          return (
            <div key={module.id} className="border-b border-white/5 last:border-0">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className={cn(
                  'w-full flex items-center gap-3 p-4 text-left transition-colors',
                  isCurrent
                    ? 'bg-cyan-500/10'
                    : 'hover:bg-white/5'
                )}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                    isComplete ? 'bg-emerald-500/20' : `bg-[${module.color}20]`
                  )}
                  style={!isComplete ? { backgroundColor: `${module.color}20` } : undefined}
                >
                  {isComplete ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Icon
                      className="w-4 h-4"
                      style={{ color: module.color }}
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white/40 mb-0.5">
                    Module {module.number}
                  </div>
                  <div
                    className={cn(
                      'text-sm font-medium truncate',
                      isCurrent ? 'text-cyan-400' : 'text-white'
                    )}
                  >
                    {module.title}
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-white/40" />
                </motion.div>
              </button>

              {/* Lesson List */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-2">
                      {module.lessons.map((lesson, index) => {
                        const LessonIcon = lessonTypeIcons[lesson.type];
                        const isLessonComplete = isLessonCompleted(lesson.id);
                        const isCurrentLesson =
                          currentModuleId === module.id &&
                          currentLessonId === lesson.id;

                        return (
                          <Link
                            key={lesson.id}
                            href={
                              isLocked
                                ? '#'
                                : `/course/${module.id}/${lesson.id}`
                            }
                            className={cn(
                              'flex items-center gap-3 px-4 py-2 ml-4 border-l transition-colors',
                              isCurrentLesson
                                ? 'border-cyan-500 bg-cyan-500/5'
                                : isLessonComplete
                                  ? 'border-emerald-500/50'
                                  : 'border-white/10 hover:border-white/20 hover:bg-white/5',
                              isLocked && 'cursor-not-allowed opacity-50'
                            )}
                          >
                            <div
                              className={cn(
                                'w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0',
                                isLessonComplete
                                  ? 'bg-emerald-500/20'
                                  : 'bg-white/5'
                              )}
                            >
                              {isLessonComplete ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <LessonIcon className="w-3 h-3 text-white/40" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div
                                className={cn(
                                  'text-sm truncate',
                                  isCurrentLesson
                                    ? 'text-cyan-400 font-medium'
                                    : isLessonComplete
                                      ? 'text-white/60'
                                      : 'text-white/80'
                                )}
                              >
                                {lesson.title}
                              </div>
                            </div>

                            <div className="flex items-center gap-1 text-xs text-white/30">
                              <Clock className="w-3 h-3" />
                              {lesson.duration}m
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressTracker;
