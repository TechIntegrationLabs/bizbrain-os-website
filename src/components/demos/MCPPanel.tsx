'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server,
  Power,
  Settings,
  ChevronRight,
  Activity,
  CheckCircle2,
  XCircle,
  Loader2,
  Wrench,
  Database,
  Globe,
  FileText,
  GitBranch,
  Mail,
  Calendar,
  MessageSquare,
  RefreshCw,
  Zap,
  Shield,
  Search,
  Filter,
  MoreVertical,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { spring, staggerContainer, staggerItem } from '@/lib/animations';

type ServerStatus = 'connected' | 'disconnected' | 'connecting' | 'error';

interface MCPTool {
  name: string;
  description: string;
  parameters?: string[];
}

interface MCPServer {
  id: string;
  name: string;
  description: string;
  status: ServerStatus;
  icon: React.ElementType;
  color: string;
  tools: MCPTool[];
  category: 'productivity' | 'development' | 'communication' | 'data';
  latency?: number;
  lastUsed?: string;
}

const sampleServers: MCPServer[] = [
  {
    id: 'notion',
    name: 'Notion',
    description: 'Page and database management',
    status: 'connected',
    icon: FileText,
    color: '#ffffff',
    category: 'productivity',
    latency: 45,
    lastUsed: '2 min ago',
    tools: [
      { name: 'create_page', description: 'Create a new Notion page', parameters: ['parent_id', 'title', 'content'] },
      { name: 'search', description: 'Search across Notion workspace', parameters: ['query', 'filter'] },
      { name: 'update_page', description: 'Update existing page content', parameters: ['page_id', 'properties'] },
      { name: 'list_databases', description: 'List all accessible databases' },
      { name: 'query_database', description: 'Query database with filters', parameters: ['database_id', 'filter'] },
    ],
  },
  {
    id: 'gohighlevel',
    name: 'GoHighLevel',
    description: 'CRM and marketing automation',
    status: 'connected',
    icon: MessageSquare,
    color: '#10b981',
    category: 'communication',
    latency: 120,
    lastUsed: '15 min ago',
    tools: [
      { name: 'get_contacts', description: 'Retrieve contacts from CRM', parameters: ['limit', 'offset'] },
      { name: 'create_contact', description: 'Create a new contact', parameters: ['name', 'email', 'phone'] },
      { name: 'send_sms', description: 'Send SMS to contact', parameters: ['contact_id', 'message'] },
      { name: 'get_opportunities', description: 'List sales opportunities' },
      { name: 'create_task', description: 'Create a follow-up task', parameters: ['contact_id', 'title', 'due_date'] },
    ],
  },
  {
    id: 'playwright',
    name: 'Playwright',
    description: 'Browser automation and testing',
    status: 'connected',
    icon: Globe,
    color: '#06b6d4',
    category: 'development',
    latency: 30,
    lastUsed: '1 hour ago',
    tools: [
      { name: 'navigate', description: 'Navigate to URL', parameters: ['url'] },
      { name: 'screenshot', description: 'Take page screenshot', parameters: ['name', 'selector'] },
      { name: 'click', description: 'Click element', parameters: ['selector'] },
      { name: 'fill', description: 'Fill form input', parameters: ['selector', 'value'] },
      { name: 'save_as_pdf', description: 'Save page as PDF', parameters: ['outputPath'] },
    ],
  },
  {
    id: 'markdown2pdf',
    name: 'Markdown2PDF',
    description: 'Convert markdown to styled PDFs',
    status: 'connected',
    icon: FileText,
    color: '#f59e0b',
    category: 'productivity',
    latency: 25,
    lastUsed: 'Just now',
    tools: [
      { name: 'convert_markdown_to_pdf', description: 'Convert markdown content to PDF', parameters: ['markdown', 'output_path', 'options'] },
      { name: 'apply_template', description: 'Apply styling template', parameters: ['template_name'] },
    ],
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Repository and issue management',
    status: 'disconnected',
    icon: GitBranch,
    color: '#8b5cf6',
    category: 'development',
    tools: [
      { name: 'create_issue', description: 'Create a new issue', parameters: ['repo', 'title', 'body'] },
      { name: 'list_repos', description: 'List user repositories' },
      { name: 'get_file', description: 'Get file content', parameters: ['repo', 'path'] },
      { name: 'create_pr', description: 'Create pull request', parameters: ['repo', 'title', 'head', 'base'] },
    ],
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Database and authentication',
    status: 'connecting',
    icon: Database,
    color: '#10b981',
    category: 'data',
    tools: [
      { name: 'query', description: 'Execute SQL query', parameters: ['sql'] },
      { name: 'insert', description: 'Insert records', parameters: ['table', 'data'] },
      { name: 'update', description: 'Update records', parameters: ['table', 'data', 'filter'] },
      { name: 'list_tables', description: 'List all database tables' },
    ],
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Email management',
    status: 'error',
    icon: Mail,
    color: '#ef4444',
    category: 'communication',
    tools: [
      { name: 'send_email', description: 'Send email', parameters: ['to', 'subject', 'body'] },
      { name: 'search_emails', description: 'Search inbox', parameters: ['query'] },
      { name: 'get_email', description: 'Get email content', parameters: ['email_id'] },
    ],
  },
  {
    id: 'calendar',
    name: 'Google Calendar',
    description: 'Event and schedule management',
    status: 'disconnected',
    icon: Calendar,
    color: '#4285f4',
    category: 'productivity',
    tools: [
      { name: 'list_events', description: 'List upcoming events', parameters: ['days'] },
      { name: 'create_event', description: 'Create calendar event', parameters: ['title', 'start', 'end'] },
      { name: 'find_free_time', description: 'Find available time slots', parameters: ['duration', 'range'] },
    ],
  },
];

const statusConfig: Record<ServerStatus, { color: string; icon: React.ElementType; label: string }> = {
  connected: { color: '#10b981', icon: CheckCircle2, label: 'Connected' },
  disconnected: { color: '#64748b', icon: XCircle, label: 'Disconnected' },
  connecting: { color: '#f59e0b', icon: Loader2, label: 'Connecting...' },
  error: { color: '#ef4444', icon: XCircle, label: 'Error' },
};

const categoryLabels: Record<string, string> = {
  productivity: 'Productivity',
  development: 'Development',
  communication: 'Communication',
  data: 'Data & Storage',
};

interface MCPPanelProps {
  className?: string;
}

export const MCPPanel: React.FC<MCPPanelProps> = ({ className }) => {
  const [servers, setServers] = useState<MCPServer[]>(sampleServers);
  const [selectedServer, setSelectedServer] = useState<MCPServer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [showOnlyConnected, setShowOnlyConnected] = useState(false);

  // Toggle server connection
  const toggleServer = (serverId: string) => {
    setServers((prev) =>
      prev.map((server) => {
        if (server.id !== serverId) return server;
        if (server.status === 'connected') {
          return { ...server, status: 'disconnected' as ServerStatus };
        } else if (server.status === 'disconnected' || server.status === 'error') {
          // Simulate connecting
          setTimeout(() => {
            setServers((p) =>
              p.map((s) =>
                s.id === serverId ? { ...s, status: 'connected' as ServerStatus, latency: Math.floor(Math.random() * 100) + 20 } : s
              )
            );
          }, 1500);
          return { ...server, status: 'connecting' as ServerStatus };
        }
        return server;
      })
    );
  };

  // Filtered servers
  const filteredServers = servers.filter((server) => {
    const matchesSearch =
      searchQuery === '' ||
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || server.category === categoryFilter;
    const matchesConnection = !showOnlyConnected || server.status === 'connected';
    return matchesSearch && matchesCategory && matchesConnection;
  });

  // Stats
  const connectedCount = servers.filter((s) => s.status === 'connected').length;
  const totalTools = servers.reduce((sum, s) => sum + s.tools.length, 0);

  return (
    <div className={cn('rounded-2xl bg-surface/80 border border-white/10 overflow-hidden', className)}>
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
              <Server className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">MCP Panel</h3>
              <p className="text-xs text-white/40">Model Context Protocol servers</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-white/60">{connectedCount} connected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-white/40" />
                <span className="text-white/60">{totalTools} tools</span>
              </div>
            </div>
            <button className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search servers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50"
            />
          </div>

          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg">
            <button
              onClick={() => setCategoryFilter(null)}
              className={cn(
                'px-3 py-1.5 rounded text-xs transition-colors',
                !categoryFilter ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'
              )}
            >
              All
            </button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setCategoryFilter(categoryFilter === key ? null : key)}
                className={cn(
                  'px-3 py-1.5 rounded text-xs transition-colors',
                  categoryFilter === key ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowOnlyConnected(!showOnlyConnected)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors',
              showOnlyConnected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/40'
            )}
          >
            <Shield className="w-3.5 h-3.5" />
            Active only
          </button>
        </div>
      </div>

      {/* Server List */}
      <div className="p-4 h-[400px] overflow-y-auto">
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {filteredServers.map((server) => {
            const StatusIcon = statusConfig[server.status].icon;
            const ServerIcon = server.icon;
            const isSelected = selectedServer?.id === server.id;

            return (
              <motion.div
                key={server.id}
                variants={staggerItem}
                className={cn(
                  'rounded-xl border transition-all overflow-hidden',
                  isSelected
                    ? 'bg-white/5 border-violet-500/30'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                )}
              >
                {/* Server Row */}
                <div
                  className="flex items-center gap-3 p-3 cursor-pointer"
                  onClick={() => setSelectedServer(isSelected ? null : server)}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${server.color}15` }}
                  >
                    <ServerIcon className="w-5 h-5" style={{ color: server.color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-white">{server.name}</h4>
                      <span
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                        style={{
                          backgroundColor: `${statusConfig[server.status].color}15`,
                          color: statusConfig[server.status].color,
                        }}
                      >
                        <StatusIcon className={cn('w-3 h-3', server.status === 'connecting' && 'animate-spin')} />
                        {statusConfig[server.status].label}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 truncate">{server.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {server.latency && server.status === 'connected' && (
                      <span className="text-xs text-white/40">{server.latency}ms</span>
                    )}
                    <span className="text-xs text-white/40">{server.tools.length} tools</span>

                    {/* Toggle Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleServer(server.id);
                      }}
                      disabled={server.status === 'connecting'}
                      className={cn(
                        'p-2 rounded-lg transition-colors',
                        server.status === 'connected'
                          ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                          : server.status === 'connecting'
                          ? 'bg-amber-500/20 text-amber-400 cursor-not-allowed'
                          : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'
                      )}
                    >
                      <Power className="w-4 h-4" />
                    </button>

                    <ChevronRight
                      className={cn(
                        'w-4 h-4 text-white/20 transition-transform',
                        isSelected && 'rotate-90'
                      )}
                    />
                  </div>
                </div>

                {/* Expanded Tools */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/10 bg-white/[0.02]"
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-white/40 uppercase tracking-wide">Available Tools</span>
                          {server.lastUsed && (
                            <span className="text-xs text-white/30">Last used: {server.lastUsed}</span>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {server.tools.map((tool, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5"
                            >
                              <Wrench className="w-3.5 h-3.5 text-violet-400 mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm text-white font-mono">{tool.name}</div>
                                <div className="text-xs text-white/40 truncate">{tool.description}</div>
                                {tool.parameters && tool.parameters.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {tool.parameters.map((param, j) => (
                                      <span
                                        key={j}
                                        className="px-1.5 py-0.5 rounded bg-white/5 text-xs text-white/30 font-mono"
                                      >
                                        {param}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredServers.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Server className="w-8 h-8 text-white/20" />
            </div>
            <p className="text-white/40 mb-2">No servers found</p>
            <p className="text-white/30 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 bg-white/[0.02]">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-white/40">
            <Info className="w-3 h-3" />
            MCP servers extend Claude&apos;s capabilities with external tools
          </div>
          <button className="flex items-center gap-1 text-violet-400 hover:text-violet-300 transition-colors">
            <Settings className="w-3 h-3" />
            Configure
          </button>
        </div>
      </div>
    </div>
  );
};

export default MCPPanel;
