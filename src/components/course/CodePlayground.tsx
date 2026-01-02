'use client';

import React, { useState } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  useSandpack,
  SandpackThemeProvider,
} from '@codesandbox/sandpack-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  RotateCcw,
  Maximize2,
  Minimize2,
  Terminal,
  Eye,
  Copy,
  Check,
  Code,
} from 'lucide-react';

import { cn } from '@/lib/utils';

// Custom dark theme matching our design
const customTheme = {
  colors: {
    surface1: '#0a0a0f',
    surface2: '#13131f',
    surface3: '#1a1a2e',
    clickable: '#6e6e8f',
    base: '#e1e1e8',
    disabled: '#4e4e5f',
    hover: '#7e7e9f',
    accent: '#06b6d4',
    error: '#ef4444',
    errorSurface: '#451a1a',
  },
  syntax: {
    plain: '#e1e1e8',
    comment: { color: '#6e6e8f', fontStyle: 'italic' },
    keyword: '#06b6d4',
    tag: '#10b981',
    punctuation: '#6e6e8f',
    definition: '#f59e0b',
    property: '#06b6d4',
    static: '#f59e0b',
    string: '#10b981',
  },
  font: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace',
    size: '13px',
    lineHeight: '1.6',
  },
};

interface CodePlaygroundProps {
  files: Record<string, string>;
  activeFile?: string;
  template?: 'react' | 'react-ts' | 'vanilla' | 'vanilla-ts' | 'node';
  title?: string;
  description?: string;
  showPreview?: boolean;
  showConsole?: boolean;
  readOnly?: boolean;
  height?: number | string;
}

export function CodePlayground({
  files,
  activeFile,
  template = 'react-ts',
  title,
  description,
  showPreview = true,
  showConsole = false,
  readOnly = false,
  height = 400,
}: CodePlaygroundProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'console'>('preview');

  // Normalize files for Sandpack
  const sandpackFiles: Record<string, string> = {};
  Object.entries(files).forEach(([path, content]) => {
    // Ensure paths start with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    sandpackFiles[normalizedPath] = content;
  });

  const normalizedActiveFile = activeFile
    ? activeFile.startsWith('/')
      ? activeFile
      : `/${activeFile}`
    : undefined;

  return (
    <div
      className={cn(
        'rounded-xl border border-white/10 bg-surface overflow-hidden',
        isFullscreen && 'fixed inset-4 z-50'
      )}
    >
      {/* Header */}
      {(title || description) && (
        <div className="px-4 py-3 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h4 className="text-sm font-medium text-white flex items-center gap-2">
                  <Code className="w-4 h-4 text-cyan-400" />
                  {title}
                </h4>
              )}
              {description && (
                <p className="text-xs text-white/40 mt-0.5">{description}</p>
              )}
            </div>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-md hover:bg-white/10 text-white/40 hover:text-white transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}

      <SandpackProvider
        template={template}
        files={sandpackFiles}
        options={{
          activeFile: normalizedActiveFile,
          visibleFiles: Object.keys(sandpackFiles),
          recompileMode: 'delayed',
          recompileDelay: 500,
        }}
        theme={customTheme}
      >
        <div
          style={{ height: isFullscreen ? 'calc(100vh - 120px)' : height }}
          className="flex"
        >
          {/* Editor */}
          <div className="flex-1 min-w-0 border-r border-white/10">
            <SandpackCodeEditor
              showTabs
              showLineNumbers
              showInlineErrors
              wrapContent
              closableTabs={false}
              readOnly={readOnly}
              style={{ height: '100%' }}
            />
          </div>

          {/* Preview/Console Panel */}
          {(showPreview || showConsole) && (
            <div className="w-[45%] flex flex-col">
              {/* Tab Switcher */}
              {showPreview && showConsole && (
                <div className="flex border-b border-white/10 bg-white/[0.02]">
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 text-sm transition-colors',
                      activeTab === 'preview'
                        ? 'text-cyan-400 border-b-2 border-cyan-400'
                        : 'text-white/40 hover:text-white'
                    )}
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    onClick={() => setActiveTab('console')}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 text-sm transition-colors',
                      activeTab === 'console'
                        ? 'text-cyan-400 border-b-2 border-cyan-400'
                        : 'text-white/40 hover:text-white'
                    )}
                  >
                    <Terminal className="w-4 h-4" />
                    Console
                  </button>
                </div>
              )}

              {/* Content */}
              <div className="flex-1 relative">
                {showPreview && (
                  <div
                    className={cn(
                      'absolute inset-0',
                      activeTab !== 'preview' && showConsole && 'hidden'
                    )}
                  >
                    <SandpackPreview
                      showOpenInCodeSandbox={false}
                      showRefreshButton={false}
                      style={{ height: '100%' }}
                    />
                  </div>
                )}
                {showConsole && (
                  <div
                    className={cn(
                      'absolute inset-0',
                      activeTab !== 'console' && showPreview && 'hidden'
                    )}
                  >
                    <SandpackConsole style={{ height: '100%' }} />
                  </div>
                )}
              </div>

              {/* Actions */}
              <PlaygroundActions />
            </div>
          )}
        </div>
      </SandpackProvider>
    </div>
  );
}

// Actions component inside Sandpack context
function PlaygroundActions() {
  const { sandpack } = useSandpack();
  const [copied, setCopied] = useState(false);

  const handleReset = () => {
    sandpack.resetAllFiles();
  };

  const handleCopy = async () => {
    const activeFile = sandpack.activeFile;
    const content = sandpack.files[activeFile]?.code || '';
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 p-2 border-t border-white/10 bg-white/[0.02]">
      <button
        onClick={handleReset}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 text-white/60 text-xs hover:bg-white/10 hover:text-white transition-colors"
      >
        <RotateCcw className="w-3 h-3" />
        Reset
      </button>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 text-white/60 text-xs hover:bg-white/10 hover:text-white transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-emerald-400" />
            Copied
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" />
            Copy
          </>
        )}
      </button>
    </div>
  );
}

// Simple code display without preview (for non-executable code)
interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="rounded-xl border border-white/10 bg-surface overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-amber-500/60" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
          </div>
          {filename && (
            <span className="text-xs text-white/40 ml-2">{filename}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-white/40 hover:text-white hover:bg-white/10 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <span className="select-none w-8 text-right pr-4 text-white/20">
                  {i + 1}
                </span>
              )}
              <code className="text-white/80">{line || ' '}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

export default CodePlayground;
