'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  BookOpen,
  Code,
  HelpCircle,
  FlaskConical,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  Circle,
  ArrowRight,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

import { cn } from '@/lib/utils';
import { Lesson, QuizQuestion } from '@/lib/course-data';

interface LessonViewerProps {
  lesson: Lesson;
  moduleTitle: string;
  moduleColor: string;
  isCompleted: boolean;
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

const lessonTypeConfig = {
  video: { icon: Play, label: 'Video', color: '#ef4444' },
  reading: { icon: BookOpen, label: 'Reading', color: '#06b6d4' },
  interactive: { icon: Code, label: 'Interactive', color: '#10b981' },
  quiz: { icon: HelpCircle, label: 'Quiz', color: '#f59e0b' },
  lab: { icon: FlaskConical, label: 'Lab', color: '#8b5cf6' },
};

export function LessonViewer({
  lesson,
  moduleTitle,
  moduleColor,
  isCompleted,
  onComplete,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: LessonViewerProps) {
  const [quizState, setQuizState] = useState<{
    currentQuestion: number;
    answers: Record<string, number>;
    showResults: boolean;
  }>({
    currentQuestion: 0,
    answers: {},
    showResults: false,
  });

  const config = lessonTypeConfig[lesson.type];
  const Icon = config.icon;

  // Reset quiz state when lesson changes
  useEffect(() => {
    setQuizState({
      currentQuestion: 0,
      answers: {},
      showResults: false,
    });
  }, [lesson.id]);

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answerIndex },
    }));
  };

  const calculateQuizScore = () => {
    if (!lesson.quiz) return 0;
    const correct = lesson.quiz.filter(
      q => quizState.answers[q.id] === q.correctIndex
    ).length;
    return Math.round((correct / lesson.quiz.length) * 100);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-white/10 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-sm text-white/40">{moduleTitle}</div>
          <ChevronRight className="w-4 h-4 text-white/20" />
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ backgroundColor: `${config.color}20` }}
            >
              <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
            </div>
            <span className="text-sm font-medium" style={{ color: config.color }}>
              {config.label}
            </span>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {lesson.title}
        </h1>
        <p className="text-white/60 mb-4">{lesson.description}</p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-white/40">
            <Clock className="w-4 h-4" />
            {lesson.duration} min
          </div>
          {isCompleted && (
            <div className="flex items-center gap-2 text-sm text-emerald-400">
              <CheckCircle className="w-4 h-4" />
              Completed
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Video Lesson */}
        {lesson.type === 'video' && (
          <VideoLesson lesson={lesson} moduleColor={moduleColor} />
        )}

        {/* Reading Lesson */}
        {(lesson.type === 'reading' || lesson.type === 'interactive') && (
          <ReadingLesson lesson={lesson} />
        )}

        {/* Lab Lesson */}
        {lesson.type === 'lab' && <LabLesson lesson={lesson} />}

        {/* Quiz Lesson */}
        {lesson.type === 'quiz' && lesson.quiz && (
          <QuizLesson
            quiz={lesson.quiz}
            state={quizState}
            onAnswer={handleQuizAnswer}
            onShowResults={() => setQuizState(prev => ({ ...prev, showResults: true }))}
            onRetry={() =>
              setQuizState({
                currentQuestion: 0,
                answers: {},
                showResults: false,
              })
            }
          />
        )}
      </div>

      {/* Footer Navigation */}
      <div className="flex-shrink-0 border-t border-white/10 p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              hasPrevious
                ? 'bg-white/5 text-white hover:bg-white/10'
                : 'text-white/20 cursor-not-allowed'
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-3">
            {!isCompleted && (
              <button
                onClick={onComplete}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors"
              >
                <Check className="w-4 h-4" />
                Mark Complete
              </button>
            )}

            <button
              onClick={onNext}
              disabled={!hasNext}
              className={cn(
                'flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all',
                hasNext
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                  : 'bg-white/5 text-white/40 cursor-not-allowed'
              )}
            >
              {hasNext ? 'Next Lesson' : 'Course Complete!'}
              {hasNext && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Video Lesson Component
function VideoLesson({ lesson, moduleColor }: { lesson: Lesson; moduleColor: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="space-y-6">
      {/* Video Placeholder */}
      <div className="relative aspect-video rounded-xl bg-surface border border-white/10 overflow-hidden">
        {!isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: `radial-gradient(circle at center, ${moduleColor}, transparent 70%)`,
              }}
            />
            <motion.button
              onClick={() => setIsPlaying(true)}
              className="relative w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${moduleColor}20` }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play
                className="w-8 h-8 ml-1"
                style={{ color: moduleColor }}
                fill={moduleColor}
              />
            </motion.button>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/60 text-sm">Loading video...</p>
            </div>
          </div>
        )}
      </div>

      {/* Lesson Content */}
      {lesson.content && (
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {lesson.content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

// Reading Lesson Component
function ReadingLesson({ lesson }: { lesson: Lesson }) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-white/70 prose-strong:text-white prose-code:text-cyan-400 prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-surface prose-pre:border prose-pre:border-white/10">
      {lesson.content && (
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {lesson.content}
        </ReactMarkdown>
      )}
    </div>
  );
}

// Lab Lesson Component
function LabLesson({ lesson }: { lesson: Lesson }) {
  const [currentStep, setCurrentStep] = useState(0);

  // Parse steps from content (assume markdown with ## headings)
  const steps = lesson.content?.split(/(?=### \d+\.)/g).filter(s => s.trim()) || [];

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center gap-2">
        {steps.map((_, index) => (
          <div
            key={index}
            className={cn(
              'h-2 flex-1 rounded-full transition-colors',
              index <= currentStep ? 'bg-cyan-500' : 'bg-white/10'
            )}
          />
        ))}
      </div>

      {/* Lab content */}
      <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-white/70 prose-strong:text-white prose-code:text-cyan-400 prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-surface prose-pre:border prose-pre:border-white/10">
        {lesson.content && (
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {lesson.content}
          </ReactMarkdown>
        )}
      </div>

      {/* Lab navigation */}
      <div className="flex items-center gap-4 pt-4 border-t border-white/10">
        <button
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous Step
        </button>
        <div className="flex-1 text-center text-sm text-white/40">
          Step {currentStep + 1} of {steps.length || 1}
        </div>
        <button
          onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
          disabled={currentStep >= steps.length - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Step
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Quiz Lesson Component
function QuizLesson({
  quiz,
  state,
  onAnswer,
  onShowResults,
  onRetry,
}: {
  quiz: QuizQuestion[];
  state: {
    currentQuestion: number;
    answers: Record<string, number>;
    showResults: boolean;
  };
  onAnswer: (questionId: string, answerIndex: number) => void;
  onShowResults: () => void;
  onRetry: () => void;
}) {
  const allAnswered = quiz.every(q => state.answers[q.id] !== undefined);
  const score = quiz.filter(q => state.answers[q.id] === q.correctIndex).length;
  const percentage = Math.round((score / quiz.length) * 100);

  if (state.showResults) {
    return (
      <div className="space-y-6">
        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <div
            className={cn(
              'text-6xl font-bold mb-4',
              percentage >= 70 ? 'text-emerald-400' : 'text-amber-400'
            )}
          >
            {percentage}%
          </div>
          <p className="text-white/60 mb-6">
            You got {score} out of {quiz.length} questions correct
          </p>
          <button
            onClick={onRetry}
            className="px-6 py-3 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
          >
            Try Again
          </button>
        </motion.div>

        {/* Question Review */}
        <div className="space-y-6">
          {quiz.map((question, index) => {
            const userAnswer = state.answers[question.id];
            const isCorrect = userAnswer === question.correctIndex;

            return (
              <div
                key={question.id}
                className={cn(
                  'p-6 rounded-xl border',
                  isCorrect
                    ? 'bg-emerald-500/5 border-emerald-500/20'
                    : 'bg-red-500/5 border-red-500/20'
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                      isCorrect ? 'bg-emerald-500/20' : 'bg-red-500/20'
                    )}
                  >
                    {isCorrect ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <span className="text-red-400 text-sm">✕</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-3">
                      {index + 1}. {question.question}
                    </h4>
                    <div className="space-y-2 mb-4">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={cn(
                            'px-4 py-2 rounded-lg text-sm',
                            optIndex === question.correctIndex
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : optIndex === userAnswer && !isCorrect
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : 'bg-white/5 text-white/60'
                          )}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-white/60 bg-surface p-3 rounded-lg">
                      <strong className="text-white">Explanation:</strong>{' '}
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2">
        {quiz.map((q, index) => (
          <button
            key={q.id}
            onClick={() =>
              state.answers[q.id] === undefined
                ? null
                : null /* Could navigate to question */
            }
            className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors',
              state.answers[q.id] !== undefined
                ? 'bg-cyan-500/20 text-cyan-400'
                : index === state.currentQuestion
                  ? 'bg-white/10 text-white'
                  : 'bg-white/5 text-white/40'
            )}
          >
            {state.answers[q.id] !== undefined ? <Check className="w-4 h-4" /> : index + 1}
          </button>
        ))}
      </div>

      {/* Questions */}
      <AnimatePresence mode="wait">
        {quiz.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={cn(index !== state.currentQuestion && 'hidden')}
          >
            <h3 className="text-xl font-semibold text-white mb-6">
              {index + 1}. {question.question}
            </h3>

            <div className="space-y-3">
              {question.options.map((option, optIndex) => (
                <button
                  key={optIndex}
                  onClick={() => onAnswer(question.id, optIndex)}
                  className={cn(
                    'w-full text-left px-6 py-4 rounded-xl border transition-all',
                    state.answers[question.id] === optIndex
                      ? 'bg-cyan-500/10 border-cyan-500/50 text-white'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                        state.answers[question.id] === optIndex
                          ? 'border-cyan-500 bg-cyan-500'
                          : 'border-white/30'
                      )}
                    >
                      {state.answers[question.id] === optIndex && (
                        <Circle className="w-2 h-2 text-white" fill="white" />
                      )}
                    </div>
                    {option}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <button
          onClick={() =>
            state.currentQuestion > 0 &&
            (state as any).setCurrentQuestion?.(state.currentQuestion - 1)
          }
          disabled={state.currentQuestion === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:text-white disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="text-sm text-white/40">
          Question {state.currentQuestion + 1} of {quiz.length}
        </div>

        {state.currentQuestion < quiz.length - 1 ? (
          <button
            onClick={() => {
              /* Navigate to next - would need setState passed in */
            }}
            disabled={state.answers[quiz[state.currentQuestion].id] === undefined}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 disabled:opacity-50"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onShowResults}
            disabled={!allAnswered}
            className={cn(
              'flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all',
              allAnswered
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:shadow-lg'
                : 'bg-white/5 text-white/40 cursor-not-allowed'
            )}
          >
            See Results
          </button>
        )}
      </div>
    </div>
  );
}

export default LessonViewer;
