'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { playNarration, stopNarration } from '../ui/Narration';
import {
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Mail,
  FileText,
  Database,
  Brain,
  ChevronRight,
  Zap
} from 'lucide-react';
import * as THREE from 'three';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

// Strategic questions with their AI responses and context sources
interface StrategicQuestion {
  id: string;
  question: string;
  icon: React.ElementType;
  answer: string;
  highlight: string;
  contextSources: ContextSource[];
  insights: Insight[];
}

interface ContextSource {
  type: 'email' | 'meeting' | 'crm' | 'finance' | 'calendar';
  label: string;
  detail: string;
}

interface Insight {
  label: string;
  color: 'cyan' | 'emerald' | 'amber' | 'red';
}

// 3D Brain visualization
const Brain3D: React.FC<{ isProcessing: boolean; isComplete: boolean }> = ({ isProcessing, isComplete }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      if (isProcessing) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.1);
      } else if (isComplete) {
        meshRef.current.scale.setScalar(1.1);
      }
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -state.clock.elapsedTime * 0.5;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group>
        {/* Core brain sphere */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.8, 2]} />
          <MeshDistortMaterial
            color={isComplete ? '#10b981' : isProcessing ? '#06b6d4' : '#374151'}
            distort={isProcessing ? 0.4 : 0.2}
            speed={isProcessing ? 5 : 2}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Orbital ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[1.2, 0.02, 16, 100]} />
          <meshStandardMaterial
            color={isComplete ? '#10b981' : '#06b6d4'}
            emissive={isComplete ? '#10b981' : '#06b6d4'}
            emissiveIntensity={isProcessing ? 1 : 0.5}
          />
        </mesh>

        {/* Data points orbiting */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos(i * Math.PI * 0.4) * 1.2,
              Math.sin(i * Math.PI * 0.4) * 1.2,
              0
            ]}
          >
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#f59e0b"
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}

        {/* Sparkle effect when complete */}
        {isComplete && (
          <Sparkles
            count={30}
            scale={2.5}
            size={3}
            speed={0.4}
            color="#10b981"
          />
        )}

        {/* Processing sparkles */}
        {isProcessing && (
          <Sparkles
            count={50}
            scale={2}
            size={2}
            speed={2}
            color="#06b6d4"
          />
        )}

        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#06b6d4" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#10b981" />
      </group>
    </Float>
  );
};

// Context Source Badge
const ContextBadge: React.FC<{
  source: ContextSource;
  isActive: boolean;
  delay: number;
}> = ({ source, isActive, delay }) => {
  const iconMap = {
    email: Mail,
    meeting: Users,
    crm: Database,
    finance: DollarSign,
    calendar: Calendar
  };

  const colorMap = {
    email: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30',
    meeting: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30',
    crm: 'from-amber-500/20 to-amber-600/20 border-amber-500/30',
    finance: 'from-green-500/20 to-green-600/20 border-green-500/30',
    calendar: 'from-purple-500/20 to-purple-600/20 border-purple-500/30'
  };

  const Icon = iconMap[source.type];

  return (
    <motion.div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${colorMap[source.type]} border text-xs`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isActive ? 1 : 0,
        opacity: isActive ? 1 : 0
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        delay: delay * 0.1
      }}
    >
      <Icon className="w-3 h-3 text-white/70" />
      <span className="text-white/80">{source.label}</span>
    </motion.div>
  );
};

// Question Card
const QuestionCard: React.FC<{
  question: StrategicQuestion;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}> = ({ question, isSelected, onClick, index }) => {
  const Icon = question.icon as React.FC<{ className?: string; style?: React.CSSProperties }>;

  return (
    <motion.button
      className={`w-full text-left p-4 rounded-xl border transition-all ${
        isSelected
          ? 'bg-cyan-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
      }`}
      onClick={onClick}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 + 0.3 }}
      whileHover={{ scale: isSelected ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500/30' : 'bg-white/10'}`}>
          <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-white/50'}`} />
        </div>
        <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-white/70'}`}>
          {question.question}
        </span>
        <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
          isSelected ? 'rotate-90 text-cyan-400' : 'text-white/30'
        }`} />
      </div>
    </motion.button>
  );
};

// Insight Tag
const InsightTag: React.FC<{ insight: Insight; delay: number }> = ({ insight, delay }) => {
  const colorClasses = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20'
  };

  return (
    <motion.span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${colorClasses[insight.color]}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', delay: delay * 0.15 + 0.5 }}
    >
      {insight.label}
    </motion.span>
  );
};

export const StrategicSlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [typedText, setTypedText] = useState('');

  const questions: StrategicQuestion[] = [
    {
      id: 'focus',
      question: 'What should I focus on this week?',
      icon: TrendingUp,
      answer: 'Based on the Smith Project emails and Q3 cash flow surplus, prioritize customer retention. You have 3 clients showing warning signs in communication patterns.',
      highlight: 'Customer Success Manager',
      contextSources: [
        { type: 'email', label: 'Smith Project', detail: 'Sentiment analysis' },
        { type: 'finance', label: 'Q3 Surplus', detail: '$47K available' },
        { type: 'crm', label: 'Client Health', detail: '3 at risk' }
      ],
      insights: [
        { label: '3 At-Risk Clients', color: 'red' },
        { label: 'Q3 Surplus Available', color: 'emerald' },
        { label: 'Pattern Detected', color: 'cyan' }
      ]
    },
    {
      id: 'hire',
      question: 'What should our next hire be?',
      icon: Users,
      answer: 'Your bottleneck is client communication. Response times have increased 40% over 3 months. A dedicated account manager would free up 12 hours/week for your senior team.',
      highlight: 'Account Manager',
      contextSources: [
        { type: 'email', label: 'Response Times', detail: '+40% slower' },
        { type: 'calendar', label: 'Team Load', detail: 'Overbooked' },
        { type: 'meeting', label: 'Client Calls', detail: '18 pending' }
      ],
      insights: [
        { label: '+40% Response Time', color: 'red' },
        { label: '12 hrs/week recoverable', color: 'emerald' },
        { label: 'Bottleneck Identified', color: 'amber' }
      ]
    },
    {
      id: 'invest',
      question: 'Where should we invest extra budget?',
      icon: DollarSign,
      answer: 'Marketing automation would 3x your current ROI. Your lead-to-close ratio dropped 15% last quarter due to manual follow-up delays. Invest in HubSpot or ActiveCampaign.',
      highlight: 'Marketing Automation',
      contextSources: [
        { type: 'finance', label: 'ROI Analysis', detail: '3x potential' },
        { type: 'crm', label: 'Conversion', detail: '-15% last Q' },
        { type: 'email', label: 'Follow-ups', detail: 'Delayed avg 3 days' }
      ],
      insights: [
        { label: '3x ROI Potential', color: 'emerald' },
        { label: '-15% Conversion', color: 'red' },
        { label: 'Automation Gap', color: 'cyan' }
      ]
    }
  ];

  const currentQuestion = questions.find(q => q.id === selectedQuestion);

  useEffect(() => {
    if (isActive) {
      setSelectedQuestion(null);
      setShowResponse(false);
      setIsProcessing(false);
      setTypedText('');
      playNarration("Your AI goes from a simple assistant to a Strategic Advisor. When it knows your hires, your clients, and your finances, you can ask the big questions.");
    } else {
      stopNarration();
      setSelectedQuestion(null);
      setShowResponse(false);
      setIsProcessing(false);
      setTypedText('');
    }
  }, [isActive]);

  const handleQuestionSelect = (questionId: string) => {
    if (isProcessing) return;

    setSelectedQuestion(questionId);
    setShowResponse(false);
    setIsProcessing(true);
    setTypedText('');

    playNarration("Analyzing context from emails, meetings, and financial data...");

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowResponse(true);

      const question = questions.find(q => q.id === questionId);
      if (question) {
        // Type out the answer
        let i = 0;
        const interval = setInterval(() => {
          setTypedText(question.answer.slice(0, i + 1));
          i++;
          if (i === question.answer.length) {
            clearInterval(interval);
            playNarration("Not generic advice, but deep contextual strategy based on your actual business data.");
          }
        }, 20);
      }
    }, 2000);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-4 md:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent" />

      <motion.div
        className="relative z-10 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Your AI becomes a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 italic">
              Strategic Advisor
            </span>
          </h2>
          <p className="text-white/50 mt-3 text-sm md:text-base">
            Ask the big questions. Get answers backed by your actual data.
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Questions panel */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                Ask the Brain
              </span>
            </div>
            {questions.map((q, i) => (
              <QuestionCard
                key={q.id}
                question={q}
                isSelected={selectedQuestion === q.id}
                onClick={() => handleQuestionSelect(q.id)}
                index={i}
              />
            ))}
          </div>

          {/* 3D Brain visualization */}
          <div className="flex items-center justify-center">
            <motion.div
              className="w-48 h-48 md:w-64 md:h-64"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                <Suspense fallback={null}>
                  <Brain3D isProcessing={isProcessing} isComplete={showResponse} />
                </Suspense>
              </Canvas>
            </motion.div>

            {/* Processing indicator */}
            <AnimatePresence>
              {isProcessing && (
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-cyan-500/20 px-4 py-2 rounded-full border border-cyan-500/30"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                >
                  <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="text-xs text-cyan-400 font-medium">Analyzing context...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Response panel */}
          <div className="bg-surface rounded-2xl border border-white/10 p-5 min-h-[300px]">
            <AnimatePresence mode="wait">
              {!selectedQuestion && (
                <motion.div
                  key="empty"
                  className="h-full flex flex-col items-center justify-center text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-white/20" />
                  </div>
                  <p className="text-white/30 text-sm">
                    Select a question to see<br />contextual AI analysis
                  </p>
                </motion.div>
              )}

              {currentQuestion && showResponse && (
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Context sources */}
                  <div className="mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 block mb-2">
                      Context Sources
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentQuestion.contextSources.map((source, i) => (
                        <ContextBadge
                          key={i}
                          source={source}
                          isActive={showResponse}
                          delay={i}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Answer */}
                  <div className="mb-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/30 to-emerald-500/30 border border-cyan-500/30 flex items-center justify-center shrink-0">
                        <Brain className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {typedText}
                          {typedText.length < currentQuestion.answer.length && (
                            <motion.span
                              className="text-cyan-400"
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity }}
                            >
                              |
                            </motion.span>
                          )}
                        </p>
                        {typedText.length === currentQuestion.answer.length && (
                          <motion.div
                            className="mt-3 inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-lg"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <Zap className="w-3 h-3 text-cyan-400" />
                            <span className="text-cyan-400 text-xs font-bold">
                              Recommended: {currentQuestion.highlight}
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Insights */}
                  {typedText.length === currentQuestion.answer.length && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 block mb-2">
                        Key Insights
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {currentQuestion.insights.map((insight, i) => (
                          <InsightTag key={i} insight={insight} delay={i} />
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {currentQuestion && isProcessing && (
                <motion.div
                  key="processing"
                  className="h-full flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="space-y-3 w-full">
                    {currentQuestion.contextSources.map((source, i) => (
                      <motion.div
                        key={i}
                        className="h-3 bg-white/5 rounded-full overflow-hidden"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500/50 to-cyan-500/20"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.5, delay: i * 0.3 }}
                        />
                      </motion.div>
                    ))}
                    <p className="text-center text-white/30 text-xs mt-4">
                      Correlating data sources...
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Continue button */}
        {onComplete && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: showResponse ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button
              onClick={onComplete}
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              <span>See the Guarantee</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
