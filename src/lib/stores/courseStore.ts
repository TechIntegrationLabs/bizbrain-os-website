// Course progress store using Zustand
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ============================================
// TYPES
// ============================================
export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g., "5 min"
  type: 'video' | 'text' | 'interactive' | 'quiz';
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface CourseProgress {
  completedLessons: Set<string>;
  currentLesson: string | null;
  currentModule: string | null;
  quizScores: Record<string, number>; // lessonId -> score (0-100)
  bookmarks: Set<string>;
  notes: Record<string, string>; // lessonId -> notes
  lastAccessed: Date | null;
  totalTimeSpent: number; // in seconds
}

interface CourseState {
  // Progress data
  progress: CourseProgress;

  // Actions
  completeLesson: (lessonId: string) => void;
  uncompleteLesson: (lessonId: string) => void;
  setCurrentLesson: (lessonId: string, moduleId: string) => void;
  saveQuizScore: (lessonId: string, score: number) => void;
  toggleBookmark: (lessonId: string) => void;
  saveNote: (lessonId: string, note: string) => void;
  addTimeSpent: (seconds: number) => void;
  resetProgress: () => void;

  // Computed
  getLessonProgress: (moduleId: string, lessons: Lesson[]) => number;
  isLessonCompleted: (lessonId: string) => boolean;
  isBookmarked: (lessonId: string) => boolean;
}

const initialProgress: CourseProgress = {
  completedLessons: new Set(),
  currentLesson: null,
  currentModule: null,
  quizScores: {},
  bookmarks: new Set(),
  notes: {},
  lastAccessed: null,
  totalTimeSpent: 0,
};

// Custom storage to handle Set serialization
const customStorage = {
  getItem: (name: string) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    const parsed = JSON.parse(str);
    return {
      ...parsed,
      state: {
        ...parsed.state,
        progress: {
          ...parsed.state.progress,
          completedLessons: new Set(parsed.state.progress.completedLessons || []),
          bookmarks: new Set(parsed.state.progress.bookmarks || []),
          lastAccessed: parsed.state.progress.lastAccessed
            ? new Date(parsed.state.progress.lastAccessed)
            : null,
        },
      },
    };
  },
  setItem: (name: string, value: unknown) => {
    const val = value as { state: { progress: CourseProgress } };
    const toStore = {
      ...val,
      state: {
        ...val.state,
        progress: {
          ...val.state.progress,
          completedLessons: Array.from(val.state.progress.completedLessons),
          bookmarks: Array.from(val.state.progress.bookmarks),
        },
      },
    };
    localStorage.setItem(name, JSON.stringify(toStore));
  },
  removeItem: (name: string) => localStorage.removeItem(name),
};

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      progress: initialProgress,

      completeLesson: (lessonId) => {
        set((state) => ({
          progress: {
            ...state.progress,
            completedLessons: new Set([...state.progress.completedLessons, lessonId]),
            lastAccessed: new Date(),
          },
        }));
      },

      uncompleteLesson: (lessonId) => {
        set((state) => {
          const newCompleted = new Set(state.progress.completedLessons);
          newCompleted.delete(lessonId);
          return {
            progress: {
              ...state.progress,
              completedLessons: newCompleted,
            },
          };
        });
      },

      setCurrentLesson: (lessonId, moduleId) => {
        set((state) => ({
          progress: {
            ...state.progress,
            currentLesson: lessonId,
            currentModule: moduleId,
            lastAccessed: new Date(),
          },
        }));
      },

      saveQuizScore: (lessonId, score) => {
        set((state) => ({
          progress: {
            ...state.progress,
            quizScores: {
              ...state.progress.quizScores,
              [lessonId]: score,
            },
          },
        }));
      },

      toggleBookmark: (lessonId) => {
        set((state) => {
          const newBookmarks = new Set(state.progress.bookmarks);
          if (newBookmarks.has(lessonId)) {
            newBookmarks.delete(lessonId);
          } else {
            newBookmarks.add(lessonId);
          }
          return {
            progress: {
              ...state.progress,
              bookmarks: newBookmarks,
            },
          };
        });
      },

      saveNote: (lessonId, note) => {
        set((state) => ({
          progress: {
            ...state.progress,
            notes: {
              ...state.progress.notes,
              [lessonId]: note,
            },
          },
        }));
      },

      addTimeSpent: (seconds) => {
        set((state) => ({
          progress: {
            ...state.progress,
            totalTimeSpent: state.progress.totalTimeSpent + seconds,
          },
        }));
      },

      resetProgress: () => {
        set({ progress: initialProgress });
      },

      getLessonProgress: (moduleId, lessons) => {
        const { completedLessons } = get().progress;
        const moduleLessons = lessons.filter((l) => l.id.startsWith(moduleId));
        if (moduleLessons.length === 0) return 0;
        const completed = moduleLessons.filter((l) => completedLessons.has(l.id)).length;
        return Math.round((completed / moduleLessons.length) * 100);
      },

      isLessonCompleted: (lessonId) => {
        return get().progress.completedLessons.has(lessonId);
      },

      isBookmarked: (lessonId) => {
        return get().progress.bookmarks.has(lessonId);
      },
    }),
    {
      name: 'bizbrain-course-progress',
      storage: createJSONStorage(() => customStorage as Storage),
    }
  )
);

// ============================================
// COURSE DATA
// ============================================
export const courseModules: Module[] = [
  {
    id: 'module-1',
    title: 'Introduction to Business Brains',
    description: 'Understand the core concepts and philosophy behind the Business Brain system.',
    lessons: [
      { id: 'module-1-lesson-1', title: 'What is a Business Brain?', duration: '8 min', type: 'video' },
      { id: 'module-1-lesson-2', title: 'The Problem It Solves', duration: '6 min', type: 'video' },
      { id: 'module-1-lesson-3', title: 'Core Concepts Overview', duration: '10 min', type: 'text' },
      { id: 'module-1-quiz', title: 'Module 1 Quiz', duration: '5 min', type: 'quiz' },
    ],
  },
  {
    id: 'module-2',
    title: 'Setting Up Your Business Brain',
    description: 'Get hands-on with creating your first Business Brain folder structure.',
    lessons: [
      { id: 'module-2-lesson-1', title: 'Folder Structure Deep Dive', duration: '12 min', type: 'video' },
      { id: 'module-2-lesson-2', title: 'Initial Configuration', duration: '15 min', type: 'interactive' },
      { id: 'module-2-lesson-3', title: 'Connecting External Services', duration: '10 min', type: 'video' },
      { id: 'module-2-lab', title: 'Hands-on Lab: Your First Brain', duration: '20 min', type: 'interactive' },
    ],
  },
  {
    id: 'module-3',
    title: 'The Intake System',
    description: 'Master the art of ingesting and processing information automatically.',
    lessons: [
      { id: 'module-3-lesson-1', title: 'Voice Notes & Transcripts', duration: '8 min', type: 'video' },
      { id: 'module-3-lesson-2', title: 'Context Extraction', duration: '12 min', type: 'video' },
      { id: 'module-3-lesson-3', title: 'Routing Rules', duration: '10 min', type: 'text' },
      { id: 'module-3-lesson-4', title: 'Building Custom Processors', duration: '18 min', type: 'interactive' },
      { id: 'module-3-quiz', title: 'Module 3 Quiz', duration: '5 min', type: 'quiz' },
    ],
  },
  {
    id: 'module-4',
    title: 'Entity Management',
    description: 'Track clients, partners, and vendors with intelligent relationships.',
    lessons: [
      { id: 'module-4-lesson-1', title: 'Clients, Partners, Vendors', duration: '10 min', type: 'video' },
      { id: 'module-4-lesson-2', title: 'Cross-References', duration: '8 min', type: 'text' },
      { id: 'module-4-lesson-3', title: 'Entity Automation', duration: '15 min', type: 'interactive' },
      { id: 'module-4-lab', title: 'Hands-on Lab: Entity Dashboard', duration: '20 min', type: 'interactive' },
    ],
  },
  {
    id: 'module-5',
    title: 'Slash Commands & Subagents',
    description: 'Unlock the power of custom commands and AI subagents.',
    lessons: [
      { id: 'module-5-lesson-1', title: 'Built-in Commands', duration: '12 min', type: 'video' },
      { id: 'module-5-lesson-2', title: 'Creating Custom Commands', duration: '20 min', type: 'interactive' },
      { id: 'module-5-lesson-3', title: 'Subagent Architecture', duration: '15 min', type: 'video' },
      { id: 'module-5-lesson-4', title: 'Building Your First Subagent', duration: '25 min', type: 'interactive' },
      { id: 'module-5-quiz', title: 'Module 5 Quiz', duration: '5 min', type: 'quiz' },
    ],
  },
  {
    id: 'module-6',
    title: 'MCP Integration',
    description: 'Connect to external tools via Model Context Protocol.',
    lessons: [
      { id: 'module-6-lesson-1', title: 'Understanding MCP', duration: '10 min', type: 'video' },
      { id: 'module-6-lesson-2', title: 'Available Servers', duration: '8 min', type: 'text' },
      { id: 'module-6-lesson-3', title: 'Configuring MCPs', duration: '15 min', type: 'interactive' },
      { id: 'module-6-lesson-4', title: 'Building Custom MCP Tools', duration: '30 min', type: 'interactive' },
      { id: 'module-6-lab', title: 'Hands-on Lab: Notion Integration', duration: '20 min', type: 'interactive' },
    ],
  },
  {
    id: 'module-7',
    title: 'Advanced Workflows',
    description: 'Take your Business Brain to the next level with advanced automation.',
    lessons: [
      { id: 'module-7-lesson-1', title: 'Content Factory', duration: '15 min', type: 'video' },
      { id: 'module-7-lesson-2', title: 'Contract Generation', duration: '12 min', type: 'interactive' },
      { id: 'module-7-lesson-3', title: 'Multi-Project Management', duration: '18 min', type: 'video' },
      { id: 'module-7-lesson-4', title: 'Team Collaboration', duration: '15 min', type: 'text' },
      { id: 'module-7-final', title: 'Final Project', duration: '60 min', type: 'interactive' },
    ],
  },
];

// Helper to get total lesson count
export const getTotalLessons = () => {
  return courseModules.reduce((acc, m) => acc + m.lessons.length, 0);
};

// Helper to get all lessons flat
export const getAllLessons = () => {
  return courseModules.flatMap((m) => m.lessons);
};
