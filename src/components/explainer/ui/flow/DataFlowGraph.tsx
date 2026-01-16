'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  type Node,
  type Edge,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  MarkerType,
  Position,
  Handle,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, FileText, Lightbulb, Brain, CheckCircle, User, Calendar, FileOutput } from 'lucide-react';

// Custom node types
interface InputNodeData {
  label: string;
  icon: 'mic' | 'file' | 'idea';
  isActive?: boolean;
  onClick?: () => void;
}

interface BrainNodeData {
  label: string;
  phase?: 'idle' | 'capturing' | 'processing' | 'distributing' | 'complete';
}

interface OutputNodeData {
  label: string;
  icon: 'crm' | 'user' | 'calendar' | 'docs';
  detail?: string;
  isActive?: boolean;
}

const iconMap = {
  mic: Mic,
  file: FileText,
  idea: Lightbulb,
  crm: CheckCircle,
  user: User,
  calendar: Calendar,
  docs: FileOutput,
};

// Input Node Component
function InputNode({ data }: NodeProps) {
  const nodeData = data as unknown as InputNodeData;
  const Icon = iconMap[nodeData.icon];

  return (
    <motion.div
      className={`
        px-6 py-4 rounded-2xl border-2 cursor-pointer transition-all
        ${nodeData.isActive
          ? 'bg-gray-900 border-cyan-500 shadow-lg shadow-cyan-500/30'
          : 'bg-gray-800/80 border-gray-600 hover:border-cyan-400'
        }
      `}
      onClick={nodeData.onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      animate={nodeData.isActive ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.3 }}
    >
      <Handle type="source" position={Position.Right} className="!bg-cyan-500 !w-3 !h-3" />
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${nodeData.isActive ? 'bg-cyan-500/20' : 'bg-gray-700'}`}>
          <Icon className={`w-5 h-5 ${nodeData.isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
        </div>
        <span className={`font-semibold ${nodeData.isActive ? 'text-white' : 'text-gray-300'}`}>
          {nodeData.label}
        </span>
      </div>
    </motion.div>
  );
}

// Brain/Processing Node Component
function BrainNode({ data }: NodeProps) {
  const nodeData = data as unknown as BrainNodeData;
  const getPhaseStyles = () => {
    switch (nodeData.phase) {
      case 'capturing':
        return 'border-yellow-500 shadow-yellow-500/30';
      case 'processing':
        return 'border-cyan-500 shadow-cyan-500/50 animate-pulse';
      case 'distributing':
        return 'border-emerald-500 shadow-emerald-500/30';
      case 'complete':
        return 'border-emerald-400 shadow-emerald-400/20';
      default:
        return 'border-gray-500';
    }
  };

  return (
    <motion.div
      className={`
        px-8 py-6 rounded-3xl border-3 bg-gray-900 transition-all shadow-2xl
        ${getPhaseStyles()}
      `}
      animate={nodeData.phase === 'processing' ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 0.5, repeat: nodeData.phase === 'processing' ? Infinity : 0 }}
    >
      <Handle type="target" position={Position.Left} className="!bg-cyan-500 !w-3 !h-3" />
      <Handle type="source" position={Position.Right} className="!bg-emerald-500 !w-3 !h-3" />

      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <Brain className={`w-12 h-12 ${
            nodeData.phase === 'processing' ? 'text-cyan-400' :
            nodeData.phase === 'distributing' ? 'text-emerald-400' :
            'text-gray-400'
          }`} />
          {nodeData.phase === 'processing' && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyan-400"
              animate={{ scale: [1, 1.5], opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>
        <span className="font-bold text-white text-lg">{nodeData.label}</span>
        {nodeData.phase && nodeData.phase !== 'idle' && (
          <span className="text-xs text-cyan-400 uppercase tracking-wider">
            {nodeData.phase}...
          </span>
        )}
      </div>
    </motion.div>
  );
}

// Output Node Component
function OutputNode({ data }: NodeProps) {
  const nodeData = data as unknown as OutputNodeData;
  const Icon = iconMap[nodeData.icon];

  return (
    <motion.div
      className={`
        px-5 py-4 rounded-xl border-2 transition-all
        ${nodeData.isActive
          ? 'bg-emerald-900/50 border-emerald-500 shadow-lg shadow-emerald-500/20'
          : 'bg-gray-800/60 border-gray-600 opacity-50'
        }
      `}
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: nodeData.isActive ? 1 : 0.4,
        x: 0,
        scale: nodeData.isActive ? 1 : 0.95
      }}
      transition={{ duration: 0.4 }}
    >
      <Handle type="target" position={Position.Left} className="!bg-emerald-500 !w-2 !h-2" />

      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${nodeData.isActive ? 'bg-emerald-500/20' : 'bg-gray-700'}`}>
          <Icon className={`w-4 h-4 ${nodeData.isActive ? 'text-emerald-400' : 'text-gray-500'}`} />
        </div>
        <div className="flex flex-col">
          <span className={`font-medium text-sm ${nodeData.isActive ? 'text-white' : 'text-gray-400'}`}>
            {nodeData.label}
          </span>
          <AnimatePresence>
            {nodeData.isActive && nodeData.detail && (
              <motion.span
                className="text-xs text-emerald-400"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {nodeData.detail}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

const nodeTypes = {
  input: InputNode,
  brain: BrainNode,
  output: OutputNode,
};

// Edge animation styles
const animatedEdgeStyle = {
  stroke: '#06b6d4',
  strokeWidth: 2,
  strokeDasharray: '5,5',
};

const activeEdgeStyle = {
  stroke: '#10b981',
  strokeWidth: 3,
  animation: 'flowPulse 1s ease-in-out infinite',
};

interface DataFlowGraphProps {
  className?: string;
  phase?: 'idle' | 'capturing' | 'processing' | 'distributing' | 'complete';
  selectedInput?: string | null;
  activeOutputIndex?: number | null;
  onInputSelect?: (id: string) => void;
}

export const DataFlowGraph: React.FC<DataFlowGraphProps> = ({
  className = '',
  phase = 'idle',
  selectedInput = null,
  activeOutputIndex = null,
  onInputSelect,
}) => {
  const initialNodes: Node[] = [
    // Input nodes
    {
      id: 'voice',
      type: 'input',
      position: { x: 0, y: 50 },
      data: { label: 'Voice Note', icon: 'mic', isActive: selectedInput === 'voice', onClick: () => onInputSelect?.('voice') },
    },
    {
      id: 'meeting',
      type: 'input',
      position: { x: 0, y: 150 },
      data: { label: 'Meeting', icon: 'file', isActive: selectedInput === 'meeting', onClick: () => onInputSelect?.('meeting') },
    },
    {
      id: 'idea',
      type: 'input',
      position: { x: 0, y: 250 },
      data: { label: 'Random Thought', icon: 'idea', isActive: selectedInput === 'idea', onClick: () => onInputSelect?.('idea') },
    },
    // Brain node
    {
      id: 'brain',
      type: 'brain',
      position: { x: 280, y: 120 },
      data: { label: 'Business Brain', phase },
    },
    // Output nodes
    {
      id: 'crm',
      type: 'output',
      position: { x: 520, y: 0 },
      data: { label: 'CRM Records', icon: 'crm', detail: 'Contact updated', isActive: activeOutputIndex !== null && activeOutputIndex >= 0 },
    },
    {
      id: 'stakeholders',
      type: 'output',
      position: { x: 520, y: 80 },
      data: { label: 'Stakeholders', icon: 'user', detail: 'Notifications sent', isActive: activeOutputIndex !== null && activeOutputIndex >= 1 },
    },
    {
      id: 'docs',
      type: 'output',
      position: { x: 520, y: 160 },
      data: { label: 'Project Docs', icon: 'docs', detail: 'Proposal created', isActive: activeOutputIndex !== null && activeOutputIndex >= 2 },
    },
    {
      id: 'timeline',
      type: 'output',
      position: { x: 520, y: 240 },
      data: { label: 'Timeline', icon: 'calendar', detail: 'Meeting scheduled', isActive: activeOutputIndex !== null && activeOutputIndex >= 3 },
    },
  ];

  const initialEdges: Edge[] = [
    // Input to Brain
    {
      id: 'voice-brain',
      source: 'voice',
      target: 'brain',
      animated: selectedInput === 'voice' && phase === 'capturing',
      style: selectedInput === 'voice' ? activeEdgeStyle : { stroke: '#4b5563', strokeWidth: 1 },
      markerEnd: { type: MarkerType.ArrowClosed, color: selectedInput === 'voice' ? '#06b6d4' : '#4b5563' },
    },
    {
      id: 'meeting-brain',
      source: 'meeting',
      target: 'brain',
      animated: selectedInput === 'meeting' && phase === 'capturing',
      style: selectedInput === 'meeting' ? activeEdgeStyle : { stroke: '#4b5563', strokeWidth: 1 },
      markerEnd: { type: MarkerType.ArrowClosed, color: selectedInput === 'meeting' ? '#06b6d4' : '#4b5563' },
    },
    {
      id: 'idea-brain',
      source: 'idea',
      target: 'brain',
      animated: selectedInput === 'idea' && phase === 'capturing',
      style: selectedInput === 'idea' ? activeEdgeStyle : { stroke: '#4b5563', strokeWidth: 1 },
      markerEnd: { type: MarkerType.ArrowClosed, color: selectedInput === 'idea' ? '#06b6d4' : '#4b5563' },
    },
    // Brain to Outputs
    {
      id: 'brain-crm',
      source: 'brain',
      target: 'crm',
      animated: phase === 'distributing' && activeOutputIndex === 0,
      style: activeOutputIndex !== null && activeOutputIndex >= 0 ? { stroke: '#10b981', strokeWidth: 2 } : { stroke: '#4b5563', strokeWidth: 1 },
      markerEnd: { type: MarkerType.ArrowClosed, color: activeOutputIndex !== null && activeOutputIndex >= 0 ? '#10b981' : '#4b5563' },
    },
    {
      id: 'brain-stakeholders',
      source: 'brain',
      target: 'stakeholders',
      animated: phase === 'distributing' && activeOutputIndex === 1,
      style: activeOutputIndex !== null && activeOutputIndex >= 1 ? { stroke: '#10b981', strokeWidth: 2 } : { stroke: '#4b5563', strokeWidth: 1 },
      markerEnd: { type: MarkerType.ArrowClosed, color: activeOutputIndex !== null && activeOutputIndex >= 1 ? '#10b981' : '#4b5563' },
    },
    {
      id: 'brain-docs',
      source: 'brain',
      target: 'docs',
      animated: phase === 'distributing' && activeOutputIndex === 2,
      style: activeOutputIndex !== null && activeOutputIndex >= 2 ? { stroke: '#10b981', strokeWidth: 2 } : { stroke: '#4b5563', strokeWidth: 1 },
      markerEnd: { type: MarkerType.ArrowClosed, color: activeOutputIndex !== null && activeOutputIndex >= 2 ? '#10b981' : '#4b5563' },
    },
    {
      id: 'brain-timeline',
      source: 'brain',
      target: 'timeline',
      animated: phase === 'distributing' && activeOutputIndex === 3,
      style: activeOutputIndex !== null && activeOutputIndex >= 3 ? { stroke: '#10b981', strokeWidth: 2 } : { stroke: '#4b5563', strokeWidth: 1 },
      markerEnd: { type: MarkerType.ArrowClosed, color: activeOutputIndex !== null && activeOutputIndex >= 3 ? '#10b981' : '#4b5563' },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes and edges when props change
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [phase, selectedInput, activeOutputIndex]);

  return (
    <div className={`${className}`}>
      <style jsx global>{`
        @keyframes flowPulse {
          0%, 100% { stroke-dashoffset: 0; }
          50% { stroke-dashoffset: 10; }
        }
      `}</style>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        minZoom={0.8}
        maxZoom={1.2}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#1f2937" gap={20} size={1} />
      </ReactFlow>
    </div>
  );
};

export default DataFlowGraph;
