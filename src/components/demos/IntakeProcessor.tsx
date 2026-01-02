'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
  Upload,
  FileText,
  FileAudio,
  FileImage,
  File,
  FolderOpen,
  Check,
  Clock,
  Zap,
  Users,
  ListTodo,
  MessageSquare,
  AlertCircle,
  ChevronRight,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { spring } from '@/lib/animations';
import { GlassCard } from '@/components/ui/GlassCard';

// Sample files for demo
interface DemoFile {
  id: string;
  name: string;
  type: 'voice' | 'pdf' | 'markdown' | 'image' | 'email';
  size: string;
  description: string;
}

const sampleFiles: DemoFile[] = [
  {
    id: 'voice-1',
    name: 'voice-note-jan10.m4a',
    type: 'voice',
    size: '2.4 MB',
    description: 'Voice memo about BuildTrack project',
  },
  {
    id: 'pdf-1',
    name: 'client-contract.pdf',
    type: 'pdf',
    size: '156 KB',
    description: 'Contract terms from GetEducated',
  },
  {
    id: 'md-1',
    name: 'meeting-notes.md',
    type: 'markdown',
    size: '8 KB',
    description: 'Friday standup meeting notes',
  },
  {
    id: 'img-1',
    name: 'wireframe-screenshot.png',
    type: 'image',
    size: '340 KB',
    description: 'ContentForge UI wireframe',
  },
  {
    id: 'email-1',
    name: 'client-feedback.eml',
    type: 'email',
    size: '24 KB',
    description: 'Email from Tim about driver log',
  },
];

// Extraction results for each file
interface ExtractionResult {
  project?: string;
  client?: string;
  todos: string[];
  decisions: string[];
  mentions: string[];
  sentiment?: 'positive' | 'neutral' | 'urgent';
  routing: string[];
}

const extractionResults: Record<string, ExtractionResult> = {
  'voice-1': {
    project: 'BuildTrack',
    client: 'Disruptors Media',
    todos: [
      'Finalize driver log spec',
      'Schedule demo call with Tim',
      'Review GPS integration options',
    ],
    decisions: ['Approved $5K budget for driver log feature'],
    mentions: ['@Tim', '@BuildTrack'],
    sentiment: 'positive',
    routing: ['Projects/BuildTrack/_context/', 'Clients/Disruptors-Media/'],
  },
  'pdf-1': {
    client: 'GetEducated',
    todos: ['Review contract terms', 'Sign and return by Jan 15'],
    decisions: ['Net-30 payment terms agreed'],
    mentions: ['@GetEducated', '@Legal'],
    sentiment: 'neutral',
    routing: ['Clients/GetEducated/_context/', 'Contracts-and-Terms/clients/'],
  },
  'md-1': {
    project: 'Multiple',
    todos: [
      'EDF: Send updated proposal',
      'ContentForge: Fix login bug',
      'BB1: Document intake system',
    ],
    decisions: ['Weekly syncs moving to Fridays', 'Prioritize mobile-first'],
    mentions: ['@BuildTrack', '@EDF-Pro', '@ContentForge'],
    sentiment: 'neutral',
    routing: ['Projects/BuildTrack/', 'Projects/EDF-Pro/', 'Projects/ContentForge/'],
  },
  'img-1': {
    project: 'ContentForge',
    todos: ['Implement nav redesign', 'Add dark mode toggle'],
    decisions: [],
    mentions: ['@ContentForge', '@UI'],
    sentiment: 'neutral',
    routing: ['Products/ContentForge/designs/', 'Projects/ContentForge/_context/'],
  },
  'email-1': {
    project: 'BuildTrack',
    client: 'Disruptors Media',
    todos: ['Add offline capability to driver log', 'Send ETA for feature'],
    decisions: [],
    mentions: ['@Tim', '@BuildTrack'],
    sentiment: 'urgent',
    routing: ['Projects/BuildTrack/_context/', 'Clients/Disruptors-Media/_dump/'],
  },
};

// File type icons
const fileTypeIcons = {
  voice: FileAudio,
  pdf: FileText,
  markdown: FileText,
  image: FileImage,
  email: File,
};

const fileTypeColors = {
  voice: 'text-purple-400 bg-purple-500/10',
  pdf: 'text-red-400 bg-red-500/10',
  markdown: 'text-cyan-400 bg-cyan-500/10',
  image: 'text-emerald-400 bg-emerald-500/10',
  email: 'text-amber-400 bg-amber-500/10',
};

// Processing states
type ProcessingState = 'idle' | 'uploading' | 'analyzing' | 'extracting' | 'routing' | 'complete';

interface ProcessingFile extends DemoFile {
  state: ProcessingState;
  result?: ExtractionResult;
  progress: number;
}

export const IntakeProcessor: React.FC<{ className?: string }> = ({ className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [processingFiles, setProcessingFiles] = useState<ProcessingFile[]>([]);
  const [availableFiles, setAvailableFiles] = useState<DemoFile[]>(sampleFiles);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Reset demo
  const resetDemo = () => {
    setProcessingFiles([]);
    setAvailableFiles(sampleFiles);
  };

  // Simulate processing a file
  const processFile = async (file: DemoFile) => {
    const newFile: ProcessingFile = { ...file, state: 'uploading', progress: 0 };
    setProcessingFiles((prev) => [...prev, newFile]);
    setAvailableFiles((prev) => prev.filter((f) => f.id !== file.id));

    // Uploading
    await updateFileState(file.id, 'uploading', 25);
    await delay(500);

    // Analyzing
    await updateFileState(file.id, 'analyzing', 50);
    await delay(800);

    // Extracting
    await updateFileState(file.id, 'extracting', 75);
    await delay(600);

    // Routing
    await updateFileState(file.id, 'routing', 90);
    await delay(400);

    // Complete
    const result = extractionResults[file.id];
    setProcessingFiles((prev) =>
      prev.map((f) =>
        f.id === file.id
          ? { ...f, state: 'complete', progress: 100, result }
          : f
      )
    );
  };

  const updateFileState = (id: string, state: ProcessingState, progress: number) => {
    return new Promise<void>((resolve) => {
      setProcessingFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, state, progress } : f))
      );
      setTimeout(resolve, 100);
    });
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Handle drag events
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      // Get the file ID from the drag data
      const fileId = e.dataTransfer.getData('text/plain');
      const file = availableFiles.find((f) => f.id === fileId);
      if (file) {
        processFile(file);
      }
    },
    [availableFiles]
  );

  const handleDragStart = (e: React.DragEvent, file: DemoFile) => {
    e.dataTransfer.setData('text/plain', file.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Get state label
  const getStateLabel = (state: ProcessingState) => {
    switch (state) {
      case 'uploading':
        return 'Uploading...';
      case 'analyzing':
        return 'Analyzing content...';
      case 'extracting':
        return 'Extracting context...';
      case 'routing':
        return 'Routing to destinations...';
      case 'complete':
        return 'Complete';
      default:
        return 'Pending';
    }
  };

  // Get state color
  const getStateColor = (state: ProcessingState) => {
    switch (state) {
      case 'complete':
        return 'text-emerald-400';
      case 'routing':
        return 'text-cyan-400';
      default:
        return 'text-white/60';
    }
  };

  const completedFiles = processingFiles.filter((f) => f.state === 'complete');
  const totalTodos = completedFiles.reduce((acc, f) => acc + (f.result?.todos.length || 0), 0);
  const totalDecisions = completedFiles.reduce((acc, f) => acc + (f.result?.decisions.length || 0), 0);
  const totalRoutes = completedFiles.reduce((acc, f) => acc + (f.result?.routing.length || 0), 0);

  return (
    <div className={cn('', className)}>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Panel - Drop Zone and Files */}
        <div className="space-y-4">
          {/* Drop Zone */}
          <div
            ref={dropZoneRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              'relative rounded-2xl border-2 border-dashed transition-all duration-300 p-8',
              isDragging
                ? 'border-cyan-400 bg-cyan-500/10 scale-[1.02]'
                : 'border-white/20 bg-surface/50 hover:border-white/30'
            )}
          >
            <div className="text-center">
              <motion.div
                animate={{
                  y: isDragging ? -10 : 0,
                  scale: isDragging ? 1.1 : 1,
                }}
                transition={spring.bouncy}
                className={cn(
                  'w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center',
                  isDragging ? 'bg-cyan-500/20' : 'bg-white/5'
                )}
              >
                <Upload
                  className={cn(
                    'w-8 h-8',
                    isDragging ? 'text-cyan-400' : 'text-white/40'
                  )}
                />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">
                {isDragging ? 'Drop to process!' : 'Drop files here'}
              </h3>
              <p className="text-sm text-white/40">
                Drag files from below or drop your own
              </p>
            </div>

            {/* Processing indicator */}
            <AnimatePresence>
              {isDragging && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-4 rounded-xl border border-cyan-400 bg-cyan-500/5 flex items-center justify-center"
                >
                  <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Available Files */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-sm font-medium text-white/60">
                Sample Files ({availableFiles.length})
              </h4>
              {availableFiles.length < sampleFiles.length && (
                <button
                  onClick={resetDemo}
                  className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            <div className="grid gap-2">
              <AnimatePresence mode="popLayout">
                {availableFiles.map((file) => {
                  const Icon = fileTypeIcons[file.type];
                  const colors = fileTypeColors[file.type];

                  return (
                    <motion.div
                      key={file.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, scale: 0.9 }}
                      draggable
                      onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, file)}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                        <div
                          className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center',
                            colors
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-sm text-white truncate">
                            {file.name}
                          </div>
                          <div className="text-xs text-white/40">
                            {file.size} • {file.description}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {availableFiles.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-6 text-white/40 text-sm"
                >
                  All files processed! Click reset to try again.
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Processing Results */}
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <GlassCard className="text-center py-4">
              <div className="text-2xl font-bold text-cyan-400">{completedFiles.length}</div>
              <div className="text-xs text-white/40">Processed</div>
            </GlassCard>
            <GlassCard className="text-center py-4">
              <div className="text-2xl font-bold text-emerald-400">{totalTodos}</div>
              <div className="text-xs text-white/40">Todos Found</div>
            </GlassCard>
            <GlassCard className="text-center py-4">
              <div className="text-2xl font-bold text-amber-400">{totalRoutes}</div>
              <div className="text-xs text-white/40">Routes</div>
            </GlassCard>
          </div>

          {/* Processing Queue */}
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {processingFiles.map((file) => {
                const Icon = fileTypeIcons[file.type];
                const colors = fileTypeColors[file.type];

                return (
                  <motion.div
                    key={file.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <GlassCard className="overflow-hidden">
                      {/* File Header */}
                      <div className="flex items-center gap-3 p-4 border-b border-white/5">
                        <div
                          className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center',
                            colors
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-sm text-white truncate">
                            {file.name}
                          </div>
                          <div
                            className={cn(
                              'text-xs flex items-center gap-1',
                              getStateColor(file.state)
                            )}
                          >
                            {file.state === 'complete' ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Clock className="w-3 h-3 animate-spin" />
                            )}
                            {getStateLabel(file.state)}
                          </div>
                        </div>
                        {file.result?.sentiment === 'urgent' && (
                          <div className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs">
                            Urgent
                          </div>
                        )}
                      </div>

                      {/* Progress Bar */}
                      {file.state !== 'complete' && (
                        <div className="px-4 py-2">
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${file.progress}%` }}
                              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                            />
                          </div>
                        </div>
                      )}

                      {/* Results */}
                      {file.state === 'complete' && file.result && (
                        <div className="p-4 space-y-3">
                          {/* Project/Client */}
                          <div className="flex flex-wrap gap-2">
                            {file.result.project && (
                              <span className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs">
                                {file.result.project}
                              </span>
                            )}
                            {file.result.client && (
                              <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">
                                {file.result.client}
                              </span>
                            )}
                          </div>

                          {/* Todos */}
                          {file.result.todos.length > 0 && (
                            <div>
                              <div className="flex items-center gap-1 text-xs text-white/40 mb-1">
                                <ListTodo className="w-3 h-3" />
                                Todos Extracted
                              </div>
                              <div className="space-y-1">
                                {file.result.todos.map((todo, i) => (
                                  <div
                                    key={i}
                                    className="flex items-start gap-2 text-xs text-white/70"
                                  >
                                    <ChevronRight className="w-3 h-3 mt-0.5 text-cyan-400" />
                                    <span>{todo}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Decisions */}
                          {file.result.decisions.length > 0 && (
                            <div>
                              <div className="flex items-center gap-1 text-xs text-white/40 mb-1">
                                <MessageSquare className="w-3 h-3" />
                                Decisions Made
                              </div>
                              <div className="space-y-1">
                                {file.result.decisions.map((decision, i) => (
                                  <div
                                    key={i}
                                    className="flex items-start gap-2 text-xs text-white/70"
                                  >
                                    <Check className="w-3 h-3 mt-0.5 text-emerald-400" />
                                    <span>{decision}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Routing */}
                          <div>
                            <div className="flex items-center gap-1 text-xs text-white/40 mb-1">
                              <FolderOpen className="w-3 h-3" />
                              Routed To
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {file.result.routing.map((route, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded bg-white/5 text-white/50 text-xs font-mono"
                                >
                                  {route}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </GlassCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {processingFiles.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white/20" />
                </div>
                <p className="text-white/40 text-sm">
                  Drag a file to see the magic happen
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 text-center text-xs text-white/40">
        <div className="inline-flex items-center gap-2">
          <AlertCircle className="w-3 h-3" />
          <span>
            This is a demo visualization. In the real system, Claude analyzes actual file contents.
          </span>
        </div>
      </div>
    </div>
  );
};

export default IntakeProcessor;
