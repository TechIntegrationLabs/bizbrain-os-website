'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Square,
  Clock,
  Calendar,
  Activity,
  TrendingUp,
  Zap,
  FileText,
  FolderOpen,
  Terminal,
  ChevronDown,
  RotateCcw,
  Download,
  DollarSign,
  Timer,
  Cpu,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { spring, staggerContainer, staggerItem } from '@/lib/animations';

interface TimeEntry {
  id: string;
  project: string;
  task: string;
  duration: number; // in seconds
  startTime: Date;
  endTime?: Date;
  toolsUsed: string[];
  type: 'active' | 'completed';
}

interface DailyStats {
  totalTime: number;
  blocks: number;
  earnings: number;
  sessions: number;
  projectBreakdown: { project: string; time: number; color: string }[];
}

// Sample data
const sampleEntries: TimeEntry[] = [
  {
    id: '1',
    project: 'BuildTrack',
    task: 'Implement dashboard charts',
    duration: 5400, // 1.5 hours
    startTime: new Date(Date.now() - 7200000),
    endTime: new Date(Date.now() - 1800000),
    toolsUsed: ['Read', 'Write', 'Bash', 'Grep'],
    type: 'completed',
  },
  {
    id: '2',
    project: 'EDF Pro',
    task: 'API endpoint development',
    duration: 3600, // 1 hour
    startTime: new Date(Date.now() - 10800000),
    endTime: new Date(Date.now() - 7200000),
    toolsUsed: ['Read', 'Edit', 'Bash'],
    type: 'completed',
  },
  {
    id: '3',
    project: 'Business Brain',
    task: 'Update documentation',
    duration: 1800, // 30 minutes
    startTime: new Date(Date.now() - 12600000),
    endTime: new Date(Date.now() - 10800000),
    toolsUsed: ['Read', 'Write'],
    type: 'completed',
  },
];

const projectColors: Record<string, string> = {
  'BuildTrack': '#06b6d4',
  'EDF Pro': '#10b981',
  'Business Brain': '#8b5cf6',
  'Content Engine': '#f59e0b',
};

const HOURLY_RATE = 150;

// Format time from seconds
const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const formatDuration = (seconds: number): string => {
  const hrs = seconds / 3600;
  if (hrs < 1) {
    return `${Math.round(seconds / 60)}m`;
  }
  return `${hrs.toFixed(1)}h`;
};

// Calculate 15-minute blocks (billing)
const calculateBlocks = (seconds: number): number => {
  return Math.ceil(seconds / 900); // 900 seconds = 15 minutes
};

interface TimeTrackerProps {
  className?: string;
}

export const TimeTracker: React.FC<TimeTrackerProps> = ({ className }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentProject, setCurrentProject] = useState('BuildTrack');
  const [currentTask, setCurrentTask] = useState('Working on new feature...');
  const [entries, setEntries] = useState<TimeEntry[]>(sampleEntries);
  const [showProjectSelect, setShowProjectSelect] = useState(false);
  const [simulatedTools, setSimulatedTools] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const toolIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Available tools for simulation
  const availableTools = ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob', 'Task', 'WebFetch'];

  // Start/stop timer
  const toggleTimer = useCallback(() => {
    if (isRunning) {
      // Stop - save entry
      if (currentTime > 0) {
        const newEntry: TimeEntry = {
          id: Date.now().toString(),
          project: currentProject,
          task: currentTask,
          duration: currentTime,
          startTime: new Date(Date.now() - currentTime * 1000),
          endTime: new Date(),
          toolsUsed: simulatedTools,
          type: 'completed',
        };
        setEntries((prev) => [newEntry, ...prev]);
      }
      setCurrentTime(0);
      setSimulatedTools([]);
    }
    setIsRunning(!isRunning);
  }, [isRunning, currentTime, currentProject, currentTask, simulatedTools]);

  // Reset timer
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setCurrentTime(0);
    setSimulatedTools([]);
  }, []);

  // Timer effect
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => prev + 1);
      }, 1000);

      // Simulate tool usage
      toolIntervalRef.current = setInterval(() => {
        const randomTool = availableTools[Math.floor(Math.random() * availableTools.length)];
        setSimulatedTools((prev) => {
          if (!prev.includes(randomTool)) {
            return [...prev, randomTool].slice(-6);
          }
          return prev;
        });
      }, 3000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (toolIntervalRef.current) clearInterval(toolIntervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (toolIntervalRef.current) clearInterval(toolIntervalRef.current);
    };
  }, [isRunning]);

  // Calculate daily stats
  const dailyStats: DailyStats = React.useMemo(() => {
    const totalTime = entries.reduce((sum, e) => sum + e.duration, 0) + currentTime;
    const blocks = calculateBlocks(totalTime);
    const earnings = (blocks * 0.25) * HOURLY_RATE;

    const projectTimes: Record<string, number> = {};
    entries.forEach((e) => {
      projectTimes[e.project] = (projectTimes[e.project] || 0) + e.duration;
    });
    if (currentTime > 0) {
      projectTimes[currentProject] = (projectTimes[currentProject] || 0) + currentTime;
    }

    const projectBreakdown = Object.entries(projectTimes).map(([project, time]) => ({
      project,
      time,
      color: projectColors[project] || '#64748b',
    }));

    return {
      totalTime,
      blocks,
      earnings,
      sessions: entries.length + (currentTime > 0 ? 1 : 0),
      projectBreakdown,
    };
  }, [entries, currentTime, currentProject]);

  return (
    <div className={cn('rounded-2xl bg-surface/80 border border-white/10 overflow-hidden', className)}>
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Time Tracker</h3>
              <p className="text-xs text-white/40">Automatic session tracking</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-white/40">
              <Calendar className="w-3 h-3 inline mr-1" />
              Today
            </div>
            <button className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Current Session */}
      <div className="p-6 border-b border-white/10 bg-gradient-to-r from-cyan-500/5 to-transparent">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-white/40 uppercase tracking-wide">Current Session</span>
              {isRunning && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Recording
                </span>
              )}
            </div>

            {/* Project Select */}
            <div className="relative mb-2">
              <button
                onClick={() => setShowProjectSelect(!showProjectSelect)}
                className="flex items-center gap-2 text-lg font-semibold text-white hover:text-cyan-400 transition-colors"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: projectColors[currentProject] }}
                />
                {currentProject}
                <ChevronDown className={cn('w-4 h-4 transition-transform', showProjectSelect && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {showProjectSelect && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 p-2 bg-surface border border-white/10 rounded-lg shadow-xl z-10 min-w-[200px]"
                  >
                    {Object.keys(projectColors).map((project) => (
                      <button
                        key={project}
                        onClick={() => {
                          setCurrentProject(project);
                          setShowProjectSelect(false);
                        }}
                        className={cn(
                          'flex items-center gap-2 w-full px-3 py-2 rounded text-sm text-left transition-colors',
                          currentProject === project
                            ? 'bg-white/10 text-white'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                        )}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: projectColors[project] }}
                        />
                        {project}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <input
              type="text"
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
              placeholder="What are you working on?"
              className="text-white/60 text-sm bg-transparent border-none outline-none w-full max-w-xs"
            />
          </div>

          {/* Timer Display */}
          <div className="text-right">
            <div className="text-4xl font-mono font-bold text-white tabular-nums">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm text-white/40 mt-1">
              {calculateBlocks(currentTime)} blocks • ${((calculateBlocks(currentTime) * 0.25) * HOURLY_RATE).toFixed(0)}
            </div>
          </div>
        </div>

        {/* Tools Used */}
        <AnimatePresence>
          {simulatedTools.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <div className="text-xs text-white/40 mb-2">Tools used:</div>
              <div className="flex flex-wrap gap-1">
                {simulatedTools.map((tool, i) => (
                  <motion.span
                    key={`${tool}-${i}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-xs"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTimer}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all',
              isRunning
                ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                : 'bg-cyan-500 text-white hover:bg-cyan-600'
            )}
          >
            {isRunning ? (
              <>
                <Square className="w-4 h-4" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start
              </>
            )}
          </button>

          {currentTime > 0 && (
            <button
              onClick={resetTimer}
              className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Daily Stats */}
      <div className="p-4 border-b border-white/10">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-cyan-500/10 flex items-center justify-center mb-2">
              <Timer className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-lg font-semibold text-white">{formatDuration(dailyStats.totalTime)}</div>
            <div className="text-xs text-white/40">Total Time</div>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/10 flex items-center justify-center mb-2">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-lg font-semibold text-white">{dailyStats.blocks}</div>
            <div className="text-xs text-white/40">15min Blocks</div>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/10 flex items-center justify-center mb-2">
              <DollarSign className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-lg font-semibold text-white">${dailyStats.earnings.toFixed(0)}</div>
            <div className="text-xs text-white/40">Billable</div>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-violet-500/10 flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-violet-400" />
            </div>
            <div className="text-lg font-semibold text-white">{dailyStats.sessions}</div>
            <div className="text-xs text-white/40">Sessions</div>
          </div>
        </div>
      </div>

      {/* Project Breakdown */}
      {dailyStats.projectBreakdown.length > 0 && (
        <div className="p-4 border-b border-white/10">
          <div className="text-xs text-white/40 uppercase tracking-wide mb-3">Project Breakdown</div>
          <div className="space-y-3">
            {dailyStats.projectBreakdown.map((item) => {
              const percentage = (item.time / dailyStats.totalTime) * 100;
              return (
                <div key={item.project}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-white">{item.project}</span>
                    </div>
                    <span className="text-white/60">{formatDuration(item.time)}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Sessions */}
      <div className="p-4">
        <div className="text-xs text-white/40 uppercase tracking-wide mb-3">Recent Sessions</div>
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {entries.slice(0, 5).map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: projectColors[entry.project] || '#64748b' }}
                />
                <div>
                  <div className="text-sm text-white">{entry.project}</div>
                  <div className="text-xs text-white/40">{entry.task}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white">{formatDuration(entry.duration)}</div>
                <div className="text-xs text-white/40">
                  {entry.toolsUsed.slice(0, 3).join(', ')}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 bg-white/[0.02]">
        <div className="flex items-center justify-between text-xs text-white/40">
          <div className="flex items-center gap-4">
            <span>
              <Cpu className="w-3 h-3 inline mr-1" />
              Auto-tracking via Claude Code hooks
            </span>
          </div>
          <span className="text-cyan-400">
            /hours • /timesheet
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;
