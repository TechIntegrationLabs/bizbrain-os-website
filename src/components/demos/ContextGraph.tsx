'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Search,
  Filter,
  X,
  Folder,
  Users,
  Briefcase,
  FileText,
  GitBranch,
  Database,
  Brain,
  Building2,
  User,
  RefreshCw,
} from 'lucide-react';
import * as d3 from 'd3';
import { cn } from '@/lib/utils';
import { spring } from '@/lib/animations';

// Node types with their visual properties
type NodeType = 'project' | 'client' | 'partner' | 'vendor' | 'file' | 'context' | 'command' | 'entity';

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: NodeType;
  description?: string;
  connections?: number;
  size?: number;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
  type: 'references' | 'contains' | 'relates-to' | 'depends-on';
  strength?: number;
}

// Node type configurations
const nodeTypeConfig: Record<NodeType, { color: string; icon: React.ElementType; label: string }> = {
  project: { color: '#06b6d4', icon: Folder, label: 'Projects' },
  client: { color: '#10b981', icon: Building2, label: 'Clients' },
  partner: { color: '#8b5cf6', icon: Users, label: 'Partners' },
  vendor: { color: '#f59e0b', icon: Briefcase, label: 'Vendors' },
  file: { color: '#64748b', icon: FileText, label: 'Files' },
  context: { color: '#ec4899', icon: Brain, label: 'Context' },
  command: { color: '#22d3ee', icon: GitBranch, label: 'Commands' },
  entity: { color: '#a855f7', icon: Database, label: 'Entities' },
};

// Sample graph data representing a Business Brain
const sampleNodes: GraphNode[] = [
  // Projects
  { id: 'buildtrack', name: 'BuildTrack', type: 'project', description: 'Construction management app', connections: 8 },
  { id: 'edf-pro', name: 'EDF Pro', type: 'project', description: 'Dental platform MVP', connections: 6 },
  { id: 'content-engine', name: 'Content Engine', type: 'project', description: 'AI content production', connections: 5 },

  // Clients
  { id: 'tim-client', name: 'Tim Garcia', type: 'client', description: 'BuildTrack primary client', connections: 4 },
  { id: 'edf-client', name: 'Elite Dental', type: 'client', description: 'EDF Pro client', connections: 3 },

  // Partners
  { id: 'disruptors', name: 'Disruptors Media', type: 'partner', description: 'Strategic partner', connections: 5 },
  { id: 'emerald', name: 'Emerald Beacon', type: 'partner', description: 'Development partner', connections: 4 },

  // Vendors
  { id: 'supabase', name: 'Supabase', type: 'vendor', description: 'Database provider', connections: 3 },
  { id: 'vercel', name: 'Vercel', type: 'vendor', description: 'Hosting platform', connections: 4 },
  { id: 'anthropic', name: 'Anthropic', type: 'vendor', description: 'AI provider', connections: 5 },

  // Context files
  { id: 'ctx-decisions', name: 'decisions.md', type: 'context', description: 'Key decisions log', connections: 6 },
  { id: 'ctx-requirements', name: 'requirements.md', type: 'context', description: 'Project requirements', connections: 4 },
  { id: 'ctx-stakeholders', name: 'stakeholders.md', type: 'context', description: 'People involved', connections: 5 },

  // Commands
  { id: 'cmd-status', name: '/status', type: 'command', description: 'Generate status report', connections: 3 },
  { id: 'cmd-brief', name: '/brief', type: 'command', description: 'Client briefing', connections: 4 },
  { id: 'cmd-intake', name: '/intake', type: 'command', description: 'Process intake files', connections: 5 },

  // Files
  { id: 'file-prd', name: 'PRD.md', type: 'file', description: 'Product requirements', connections: 3 },
  { id: 'file-contract', name: 'contract.pdf', type: 'file', description: 'Client contract', connections: 2 },
];

const sampleLinks: GraphLink[] = [
  // Project to client relationships
  { source: 'buildtrack', target: 'tim-client', type: 'relates-to' },
  { source: 'edf-pro', target: 'edf-client', type: 'relates-to' },

  // Partner relationships
  { source: 'buildtrack', target: 'disruptors', type: 'relates-to' },
  { source: 'edf-pro', target: 'emerald', type: 'relates-to' },
  { source: 'disruptors', target: 'tim-client', type: 'references' },

  // Vendor dependencies
  { source: 'buildtrack', target: 'supabase', type: 'depends-on' },
  { source: 'edf-pro', target: 'supabase', type: 'depends-on' },
  { source: 'content-engine', target: 'anthropic', type: 'depends-on' },
  { source: 'buildtrack', target: 'vercel', type: 'depends-on' },
  { source: 'content-engine', target: 'vercel', type: 'depends-on' },

  // Context relationships
  { source: 'buildtrack', target: 'ctx-decisions', type: 'contains' },
  { source: 'buildtrack', target: 'ctx-requirements', type: 'contains' },
  { source: 'edf-pro', target: 'ctx-decisions', type: 'contains' },
  { source: 'ctx-stakeholders', target: 'tim-client', type: 'references' },
  { source: 'ctx-stakeholders', target: 'disruptors', type: 'references' },

  // Command relationships
  { source: 'cmd-status', target: 'buildtrack', type: 'references' },
  { source: 'cmd-status', target: 'edf-pro', type: 'references' },
  { source: 'cmd-brief', target: 'tim-client', type: 'references' },
  { source: 'cmd-brief', target: 'ctx-stakeholders', type: 'references' },
  { source: 'cmd-intake', target: 'ctx-decisions', type: 'relates-to' },

  // File relationships
  { source: 'file-prd', target: 'buildtrack', type: 'contains' },
  { source: 'file-contract', target: 'tim-client', type: 'relates-to' },
  { source: 'file-prd', target: 'ctx-requirements', type: 'references' },

  // Cross-project connections
  { source: 'content-engine', target: 'disruptors', type: 'relates-to' },
  { source: 'anthropic', target: 'cmd-intake', type: 'depends-on' },
];

interface ContextGraphProps {
  className?: string;
}

export const ContextGraph: React.FC<ContextGraphProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Set<NodeType>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [zoom, setZoom] = useState(1);
  const simulationRef = useRef<d3.Simulation<GraphNode, GraphLink> | null>(null);

  // Filter nodes based on search and type filters
  const filteredNodes = sampleNodes.filter((node) => {
    const matchesSearch = searchQuery === '' ||
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilters.size === 0 || activeFilters.has(node.type);
    return matchesSearch && matchesFilter;
  });

  const filteredNodeIds = new Set(filteredNodes.map((n) => n.id));
  const filteredLinks = sampleLinks.filter(
    (link) =>
      filteredNodeIds.has(typeof link.source === 'string' ? link.source : link.source.id) &&
      filteredNodeIds.has(typeof link.target === 'string' ? link.target : link.target.id)
  );

  // Toggle filter
  const toggleFilter = (type: NodeType) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  // Initialize D3 visualization
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = dimensions.width;
    const height = dimensions.height;

    // Create container for zoom/pan
    const g = svg.append('g');

    // Add zoom behavior
    const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        setZoom(event.transform.k);
      });

    svg.call(zoomBehavior);

    // Create link lines
    const linkGroup = g.append('g').attr('class', 'links');
    const link = linkGroup
      .selectAll('line')
      .data(filteredLinks)
      .join('line')
      .attr('stroke', (d) => {
        switch (d.type) {
          case 'contains': return '#06b6d4';
          case 'references': return '#10b981';
          case 'relates-to': return '#f59e0b';
          case 'depends-on': return '#ec4899';
          default: return '#64748b';
        }
      })
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5);

    // Create node groups
    const nodeGroup = g.append('g').attr('class', 'nodes');
    const node = nodeGroup
      .selectAll('g')
      .data(filteredNodes)
      .join('g')
      .attr('cursor', 'pointer')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .call(
        d3.drag<SVGGElement, GraphNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }) as any
      );

    // Add circles to nodes
    node
      .append('circle')
      .attr('r', (d) => 8 + (d.connections || 0) * 1.5)
      .attr('fill', (d) => nodeTypeConfig[d.type].color)
      .attr('stroke', '#0a0a0f')
      .attr('stroke-width', 2)
      .attr('opacity', 0.9);

    // Add glow effect
    node
      .append('circle')
      .attr('r', (d) => 12 + (d.connections || 0) * 1.5)
      .attr('fill', (d) => nodeTypeConfig[d.type].color)
      .attr('opacity', 0.15)
      .attr('filter', 'blur(4px)');

    // Add labels
    node
      .append('text')
      .text((d) => d.name)
      .attr('x', (d) => 12 + (d.connections || 0) * 1.5)
      .attr('y', 4)
      .attr('fill', '#e2e8f0')
      .attr('font-size', '11px')
      .attr('font-family', 'inherit');

    // Click handler
    node.on('click', (event, d) => {
      event.stopPropagation();
      setSelectedNode(d);
    });

    // Hover effects
    node
      .on('mouseenter', function(event, d) {
        d3.select(this).select('circle').attr('stroke', nodeTypeConfig[d.type].color).attr('stroke-width', 3);

        // Highlight connected links
        link.attr('stroke-opacity', (l) => {
          const sourceId = typeof l.source === 'string' ? l.source : l.source.id;
          const targetId = typeof l.target === 'string' ? l.target : l.target.id;
          return sourceId === d.id || targetId === d.id ? 0.9 : 0.1;
        });
      })
      .on('mouseleave', function() {
        d3.select(this).select('circle').attr('stroke', '#0a0a0f').attr('stroke-width', 2);
        link.attr('stroke-opacity', 0.4);
      });

    // Click on background to deselect
    svg.on('click', () => setSelectedNode(null));

    // Create simulation
    const simulation = d3.forceSimulation<GraphNode>(filteredNodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(filteredLinks)
        .id((d) => d.id)
        .distance(80)
        .strength(0.5))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<GraphNode>().radius((d) => 20 + (d.connections || 0) * 1.5));

    simulationRef.current = simulation;

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as GraphNode).x || 0)
        .attr('y1', (d) => (d.source as GraphNode).y || 0)
        .attr('x2', (d) => (d.target as GraphNode).x || 0)
        .attr('y2', (d) => (d.target as GraphNode).y || 0);

      node.attr('transform', (d) => `translate(${d.x || 0},${d.y || 0})`);
    });

    return () => {
      simulation.stop();
    };
  }, [dimensions, filteredNodes, filteredLinks]);

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height: isFullscreen ? height : Math.max(500, height) });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isFullscreen]);

  // Restart simulation
  const restartSimulation = useCallback(() => {
    if (simulationRef.current) {
      simulationRef.current.alpha(1).restart();
    }
  }, []);

  // Zoom controls
  const handleZoomIn = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.transition().duration(300).call(
        d3.zoom<SVGSVGElement, unknown>().scaleBy as any,
        1.3
      );
    }
  };

  const handleZoomOut = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.transition().duration(300).call(
        d3.zoom<SVGSVGElement, unknown>().scaleBy as any,
        0.7
      );
    }
  };

  return (
    <div
      className={cn(
        'relative rounded-2xl bg-surface/80 border border-white/10 overflow-hidden',
        isFullscreen && 'fixed inset-4 z-50',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-surface/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Context Graph</h3>
            <p className="text-xs text-white/40">
              {filteredNodes.length} nodes • {filteredLinks.length} connections
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 w-40"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'p-2 rounded-lg transition-colors',
              showFilters || activeFilters.size > 0
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            )}
          >
            <Filter className="w-4 h-4" />
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg">
            <button
              onClick={handleZoomOut}
              className="p-1 text-white/60 hover:text-white transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs text-white/40 w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button
              onClick={handleZoomIn}
              className="p-1 text-white/60 hover:text-white transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Restart */}
          <button
            onClick={restartSimulation}
            className="p-2 bg-white/5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            title="Restart simulation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 bg-white/5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-white/10 bg-surface/30 overflow-hidden"
          >
            <div className="p-4">
              <p className="text-xs text-white/40 mb-3">Filter by node type:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(nodeTypeConfig).map(([type, config]) => {
                  const isActive = activeFilters.has(type as NodeType);
                  const Icon = config.icon as React.FC<{ className?: string; style?: React.CSSProperties }>;
                  return (
                    <button
                      key={type}
                      onClick={() => toggleFilter(type as NodeType)}
                      className={cn(
                        'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all',
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
                      )}
                      style={{
                        borderColor: isActive ? config.color : 'transparent',
                        borderWidth: '1px',
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
                      {config.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Graph Container */}
      <div
        ref={containerRef}
        className={cn('relative', isFullscreen ? 'h-[calc(100%-140px)]' : 'h-[500px]')}
      >
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-full"
        />

        {/* Legend */}
        <div className="absolute bottom-4 left-4 p-3 bg-surface/90 rounded-lg border border-white/10 backdrop-blur-sm">
          <p className="text-xs text-white/40 mb-2">Connection Types</p>
          <div className="space-y-1.5">
            {[
              { type: 'contains', color: '#06b6d4', label: 'Contains' },
              { type: 'references', color: '#10b981', label: 'References' },
              { type: 'relates-to', color: '#f59e0b', label: 'Relates to' },
              { type: 'depends-on', color: '#ec4899', label: 'Depends on' },
            ].map((item) => (
              <div key={item.type} className="flex items-center gap-2">
                <div
                  className="w-4 h-0.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-white/60">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 right-4 text-xs text-white/30">
          Drag nodes • Scroll to zoom • Click for details
        </div>
      </div>

      {/* Node Detail Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={spring.default}
            className="absolute top-16 right-4 w-72 p-4 bg-surface/95 rounded-xl border border-white/10 backdrop-blur-sm shadow-xl"
          >
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-3 right-3 text-white/40 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${nodeTypeConfig[selectedNode.type].color}20` }}
              >
                {React.createElement(nodeTypeConfig[selectedNode.type].icon, {
                  className: 'w-6 h-6',
                  style: { color: nodeTypeConfig[selectedNode.type].color },
                })}
              </div>
              <div>
                <h4 className="font-semibold text-white">{selectedNode.name}</h4>
                <p className="text-xs text-white/40">{nodeTypeConfig[selectedNode.type].label}</p>
              </div>
            </div>

            {selectedNode.description && (
              <p className="text-sm text-white/60 mb-4">{selectedNode.description}</p>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/40">Connections</span>
                <span className="text-white">{selectedNode.connections || 0}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/40">Node ID</span>
                <span className="text-white font-mono text-xs">{selectedNode.id}</span>
              </div>
            </div>

            {/* Connected nodes preview */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/40 mb-2">Connected to:</p>
              <div className="flex flex-wrap gap-1">
                {sampleLinks
                  .filter((link) => {
                    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
                    const targetId = typeof link.target === 'string' ? link.target : link.target.id;
                    return sourceId === selectedNode.id || targetId === selectedNode.id;
                  })
                  .slice(0, 5)
                  .map((link, i) => {
                    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
                    const connectedId = sourceId === selectedNode.id
                      ? (typeof link.target === 'string' ? link.target : link.target.id)
                      : sourceId;
                    const connectedNode = sampleNodes.find((n) => n.id === connectedId);
                    if (!connectedNode) return null;
                    return (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-xs"
                        style={{
                          backgroundColor: `${nodeTypeConfig[connectedNode.type].color}20`,
                          color: nodeTypeConfig[connectedNode.type].color,
                        }}
                      >
                        {connectedNode.name}
                      </span>
                    );
                  })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContextGraph;
