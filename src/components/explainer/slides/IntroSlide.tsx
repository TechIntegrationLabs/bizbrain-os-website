'use client';

import React, { useEffect, useState, Suspense, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { playNarration, stopNarration } from '../ui/Narration';
import { NeuralParticleField, FloatingOrbCluster } from '../ui/3d';
import { ThumbsUp, ThumbsDown, Meh, ArrowRight, Sparkles, Users } from 'lucide-react';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

// Simulated poll results animation
const PollResult: React.FC<{
  label: string;
  percentage: number;
  color: string;
  icon: React.ReactNode;
  isSelected?: boolean;
  delay?: number;
}> = ({ label, percentage, color, icon, isSelected, delay = 0 }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 2;
        if (current >= percentage) {
          setAnimatedPercentage(percentage);
          clearInterval(interval);
        } else {
          setAnimatedPercentage(current);
        }
      }, 20);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay / 1000 }}
      className={`relative p-4 rounded-2xl border transition-all ${
        isSelected
          ? `border-${color}-500/50 bg-${color}-500/10`
          : 'border-white/10 bg-white/5'
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${isSelected ? `bg-${color}-500/20` : 'bg-white/5'}`}>
          {icon}
        </div>
        <span className="text-white/80 font-medium text-sm">{label}</span>
        <span className={`ml-auto font-bold ${isSelected ? `text-${color}-400` : 'text-white/60'}`}>
          {animatedPercentage}%
        </span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            color === 'cyan' ? 'bg-gradient-to-r from-cyan-500 to-cyan-400' :
            color === 'amber' ? 'bg-gradient-to-r from-amber-500 to-amber-400' :
            'bg-gradient-to-r from-rose-500 to-rose-400'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${animatedPercentage}%` }}
          transition={{ duration: 0.8, delay: delay / 1000, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
};

// Floating response bubbles
const ResponseBubble: React.FC<{
  response: string;
  position: { x: number; y: number };
  delay: number;
}> = ({ response, position, delay }) => (
  <motion.div
    className="absolute px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/60 border border-white/10"
    initial={{ opacity: 0, scale: 0, x: position.x, y: position.y }}
    animate={{
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0.8],
      y: [position.y, position.y - 30, position.y - 50, position.y - 80],
    }}
    transition={{ duration: 3, delay, ease: 'easeOut' }}
  >
    {response}
  </motion.div>
);

export const IntroSlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [step, setStep] = useState(0);
  const [selectedPollOption, setSelectedPollOption] = useState<string | null>(null);
  const [showPollResults, setShowPollResults] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [bubbles, setBubbles] = useState<Array<{ id: number; response: string; position: { x: number; y: number }; delay: number }>>([]);

  const responses = ['Same here!', 'Totally!', 'Yep...', 'So true', 'Me too', 'Definitely', '100%'];

  useEffect(() => {
    if (isActive) {
      setStep(1);
      playNarration("Welcome. Quick question: How many of you have actually used AI for your business?");
    } else {
      setStep(0);
      setSelectedPollOption(null);
      setShowPollResults(false);
      setTypedText('');
      setBubbles([]);
      stopNarration();
    }
  }, [isActive]);

  // Typewriter effect for step 3
  useEffect(() => {
    if (step === 3) {
      const text = "Let me show you...";
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          setTypedText(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 60);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handlePollVote = useCallback((option: string) => {
    setSelectedPollOption(option);
    setShowPollResults(true);

    // Generate floating bubbles
    const newBubbles = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      response: responses[Math.floor(Math.random() * responses.length)],
      position: { x: -150 + Math.random() * 300, y: 0 },
      delay: i * 0.3,
    }));
    setBubbles(newBubbles);

    setTimeout(() => {
      setStep(2);
      playNarration("And be honest... did it feel generic? Like it didn't really know who you are?");
    }, 2500);
  }, []);

  const handleSecondResponse = useCallback(() => {
    setStep(3);
    playNarration("Exactly. There is a reason for that gap. Let me show you.");
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 3500);
  }, [onComplete]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-4 md:px-8 relative overflow-hidden">
      {/* 3D Neural Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          <Suspense fallback={null}>
            <NeuralParticleField
              nodeCount={30}
              connectionCount={50}
              color="#06b6d4"
            />
            <FloatingOrbCluster
              count={3}
              colors={['#06b6d4', '#10b981', '#f59e0b']}
            />
            <ambientLight intensity={0.3} />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 z-0" />

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 40 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Animated logo/badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-surface/50 backdrop-blur-sm rounded-full border border-white/10 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -20 }}
          transition={{ delay: 0.3 }}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs text-white/60 uppercase tracking-wider font-medium">Live Presentation</span>
          <motion.div
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>

        {/* Step 1: Opening Question with Interactive Poll */}
        <AnimatePresence mode="wait">
          {step >= 1 && step < 3 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                How many of you have used{' '}
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-[length:200%_auto]"
                  animate={{ backgroundPosition: ['0% center', '200% center'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  AI
                </motion.span>{' '}
                for your business?
              </h1>

              {/* Interactive Poll */}
              {step === 1 && !showPollResults && (
                <motion.div
                  className="flex flex-wrap justify-center gap-4 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  {[
                    { id: 'yes', label: 'Yes, regularly', icon: <ThumbsUp className="w-5 h-5 text-cyan-400" />, color: 'cyan' },
                    { id: 'sometimes', label: 'Sometimes', icon: <Meh className="w-5 h-5 text-amber-400" />, color: 'amber' },
                    { id: 'no', label: 'Not yet', icon: <ThumbsDown className="w-5 h-5 text-white/60" />, color: 'white' },
                  ].map((option, i) => (
                    <motion.button
                      key={option.id}
                      onClick={() => handlePollVote(option.id)}
                      className={`group flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all ${
                        option.color === 'cyan'
                          ? 'border-cyan-500/30 bg-cyan-500/10 hover:border-cyan-500/60 hover:bg-cyan-500/20'
                          : option.color === 'amber'
                            ? 'border-amber-500/30 bg-amber-500/10 hover:border-amber-500/60 hover:bg-amber-500/20'
                            : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="p-2 rounded-xl bg-white/5"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.3 }}
                      >
                        {option.icon}
                      </motion.div>
                      <span className="text-white font-medium">{option.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* Poll Results */}
              {showPollResults && (
                <motion.div
                  className="max-w-md mx-auto mt-8 space-y-3 relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {/* Floating response bubbles */}
                  {bubbles.map((bubble) => (
                    <ResponseBubble key={bubble.id} {...bubble} />
                  ))}

                  <div className="flex items-center justify-center gap-2 mb-4 text-white/40 text-sm">
                    <Users className="w-4 h-4" />
                    <span>847 people responded</span>
                  </div>

                  <PollResult
                    label="Yes, regularly"
                    percentage={72}
                    color="cyan"
                    icon={<ThumbsUp className="w-4 h-4 text-cyan-400" />}
                    isSelected={selectedPollOption === 'yes'}
                    delay={0}
                  />
                  <PollResult
                    label="Sometimes"
                    percentage={21}
                    color="amber"
                    icon={<Meh className="w-4 h-4 text-amber-400" />}
                    isSelected={selectedPollOption === 'sometimes'}
                    delay={200}
                  />
                  <PollResult
                    label="Not yet"
                    percentage={7}
                    color="rose"
                    icon={<ThumbsDown className="w-4 h-4 text-rose-400" />}
                    isSelected={selectedPollOption === 'no'}
                    delay={400}
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: Follow-up Question */}
        <AnimatePresence>
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <motion.p
                className="text-xl md:text-2xl lg:text-3xl text-white/80 mb-6 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                And be honest... did it feel{' '}
                <motion.span
                  className="text-cyan-400 font-semibold relative"
                  animate={{ textShadow: ['0 0 10px #06b6d4', '0 0 20px #06b6d4', '0 0 10px #06b6d4'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  generic
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  />
                </motion.span>
                ?
              </motion.p>
              <p className="text-lg md:text-xl text-white/50 mb-8">
                Like it didn&apos;t really know who you are?
              </p>

              <motion.button
                onClick={handleSecondResponse}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-surface/50 backdrop-blur-sm border border-white/20 text-white rounded-full font-medium hover:bg-white/10 hover:border-white/40 transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Yes, exactly</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>

              {/* Emphatic response options */}
              <motion.div
                className="flex flex-wrap justify-center gap-2 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {['Totally!', 'Same...', 'Every time', 'So frustrating'].map((text, i) => (
                  <motion.button
                    key={text}
                    onClick={handleSecondResponse}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/40 hover:text-white/70 hover:border-white/30 transition-all"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {text}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: The Promise */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.p
                className="text-2xl md:text-4xl lg:text-5xl text-white font-bold mb-4"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
              >
                <motion.span
                  className="text-emerald-400"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Exactly.
                </motion.span>{' '}
                There is a reason for that gap.
              </motion.p>

              <motion.p
                className="text-xl md:text-2xl text-white/60 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {typedText}
                <motion.span
                  className="inline-block w-0.5 h-6 bg-cyan-400 ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              </motion.p>

              {/* Visual transition indicator */}
              <motion.div
                className="mt-12 flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-cyan-500"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-cyan-500"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-cyan-500"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-5" />
    </div>
  );
};
