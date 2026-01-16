'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  Check,
  ArrowRight,
  Sparkles,
  Zap,
  Users,
  Star,
  Gift,
  Calendar,
  Clock,
  Shield,
  TrendingUp,
  Timer,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  X,
  Crown
} from 'lucide-react';
import { playNarration, stopNarration } from '../ui/Narration';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles as ThreeSparkles, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface SlideProps {
  isActive: boolean;
  onComplete?: () => void;
}

// 3D Crown Component for VIP tier
const Crown3D: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const crownRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (crownRef.current) {
      crownRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      crownRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={crownRef}>
        {/* Crown Base */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.35, 0.15, 32]} />
          <MeshDistortMaterial
            color="#f59e0b"
            metalness={0.9}
            roughness={0.1}
            distort={0.05}
            speed={2}
          />
        </mesh>

        {/* Crown Points */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(angle * Math.PI / 180) * 0.3,
              0.2,
              Math.sin(angle * Math.PI / 180) * 0.3
            ]}
          >
            <coneGeometry args={[0.08, 0.25, 4]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}

        {/* Gems */}
        {[0, 120, 240].map((angle, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(angle * Math.PI / 180) * 0.37,
              0.05,
              Math.sin(angle * Math.PI / 180) * 0.37
            ]}
          >
            <octahedronGeometry args={[0.05]} />
            <meshStandardMaterial
              color={i === 0 ? '#ef4444' : i === 1 ? '#10b981' : '#3b82f6'}
              metalness={0.8}
              roughness={0.1}
            />
          </mesh>
        ))}

        {isActive && (
          <ThreeSparkles
            count={20}
            scale={1.5}
            size={3}
            speed={0.5}
            color="#f59e0b"
          />
        )}
      </group>
    </Float>
  );
};

// 3D Gift Box Component
const GiftBox3D: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const boxRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Mesh>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setIsOpen(true), 2000);
      return () => clearTimeout(timer);
    }
    setIsOpen(false);
  }, [isActive]);

  useFrame((state) => {
    if (boxRef.current) {
      boxRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      boxRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  const lidRotation = isOpen ? -Math.PI / 3 : 0;
  const lidY = isOpen ? 0.6 : 0.35;
  const lidZ = isOpen ? -0.2 : 0;

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={boxRef}>
        {/* Box Body */}
        <RoundedBox args={[0.8, 0.6, 0.8]} radius={0.05} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#10b981"
            metalness={0.6}
            roughness={0.2}
            distort={0.05}
            speed={2}
          />
        </RoundedBox>

        {/* Ribbon Vertical */}
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[0.1, 0.62, 0.82]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Ribbon Horizontal */}
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[0.82, 0.62, 0.1]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Lid */}
        <mesh ref={lidRef} position={[0, lidY, lidZ]} rotation={[lidRotation, 0, 0]}>
          <RoundedBox args={[0.85, 0.1, 0.85]} radius={0.03}>
            <MeshDistortMaterial
              color="#10b981"
              metalness={0.6}
              roughness={0.2}
              distort={0.02}
              speed={2}
            />
          </RoundedBox>
        </mesh>

        {/* Sparkles when open */}
        {isOpen && isActive && (
          <ThreeSparkles
            count={50}
            scale={2}
            size={4}
            speed={0.8}
            color="#f59e0b"
          />
        )}
      </group>
    </Float>
  );
};

// Scarcity Counter Component
interface ScarcityCounterProps {
  spotsRemaining: number;
  isVisible: boolean;
}

const ScarcityCounter: React.FC<ScarcityCounterProps> = ({ spotsRemaining, isVisible }) => {
  const [displaySpots, setDisplaySpots] = useState(5);
  const [pulseSpot, setPulseSpot] = useState<number | null>(null);

  useEffect(() => {
    if (isVisible && displaySpots > spotsRemaining) {
      const timer = setTimeout(() => {
        setPulseSpot(displaySpots);
        setTimeout(() => {
          setDisplaySpots(prev => prev - 1);
          setPulseSpot(null);
        }, 500);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, displaySpots, spotsRemaining]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-gradient-to-r from-red-500/20 via-amber-500/20 to-red-500/20
                 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm"
    >
      <div className="flex items-center justify-center gap-4 mb-4">
        <AlertTriangle className="w-6 h-6 text-amber-400 animate-pulse" />
        <span className="text-lg font-bold text-white">Founding Client Spots</span>
        <Timer className="w-6 h-6 text-amber-400 animate-pulse" />
      </div>

      <div className="flex justify-center gap-3">
        {[1, 2, 3, 4, 5].map((spot) => {
          const isTaken = spot > displaySpots;
          const isPulsing = spot === pulseSpot;

          return (
            <motion.div
              key={spot}
              animate={isPulsing ? { scale: [1, 1.3, 0], opacity: [1, 1, 0] } : {}}
              transition={{ duration: 0.5 }}
              className={`relative w-14 h-14 rounded-xl flex items-center justify-center
                         transition-all duration-300 ${
                isTaken
                  ? 'bg-red-500/30 border-2 border-red-500/50'
                  : 'bg-emerald-500/30 border-2 border-emerald-500/50'
              }`}
            >
              {isTaken ? (
                <X className="w-6 h-6 text-red-400" />
              ) : (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Check className="w-6 h-6 text-emerald-400" />
                </motion.div>
              )}

              <span className="absolute -bottom-5 text-xs text-white/50">#{spot}</span>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-center mt-6 text-amber-400 font-medium"
      >
        {displaySpots} of 5 spots remaining
      </motion.p>
    </motion.div>
  );
};

// Value Calculator Component
interface ValueCalculatorProps {
  isVisible: boolean;
}

const ValueCalculator: React.FC<ValueCalculatorProps> = ({ isVisible }) => {
  const [hoursWeekly, setHoursWeekly] = useState(10);
  const [hourlyValue, setHourlyValue] = useState(150);
  const [showDetails, setShowDetails] = useState(false);

  const yearlyTimeSaved = hoursWeekly * 52;
  const yearlyValueSaved = yearlyTimeSaved * hourlyValue;
  const setupCost = 1500;
  const monthlyCost = 250 * 12;
  const totalCost = setupCost + monthlyCost;
  const netValue = yearlyValueSaved - totalCost;
  const roi = Math.max(0, ((netValue / totalCost) * 100)).toFixed(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          Your Value Calculator
        </h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-white/50 hover:text-white transition-colors"
        >
          {showDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      <div className="space-y-4">
        {/* Hours Slider */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/70">Hours saved weekly</span>
            <span className="text-cyan-400 font-bold">{hoursWeekly} hrs</span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            value={hoursWeekly}
            onChange={(e) => setHoursWeekly(parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4
                       [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cyan-400
                       [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>

        {/* Value Slider */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/70">Your hourly value</span>
            <span className="text-emerald-400 font-bold">${hourlyValue}</span>
          </div>
          <input
            type="range"
            min="50"
            max="500"
            step="25"
            value={hourlyValue}
            onChange={(e) => setHourlyValue(parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4
                       [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-emerald-400
                       [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>

        {/* Details Expansion */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2 pt-4 border-t border-white/10 overflow-hidden"
            >
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Annual time saved</span>
                <span className="text-white">{yearlyTimeSaved} hours</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Value of time saved</span>
                <span className="text-emerald-400">${yearlyValueSaved.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Annual investment</span>
                <span className="text-red-400">-${totalCost.toLocaleString()}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final ROI */}
        <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl p-4 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-white/70 text-sm block">Net Annual Value</span>
              <span className="text-2xl font-bold text-white">${netValue.toLocaleString()}</span>
            </div>
            <div className="text-right">
              <span className="text-white/70 text-sm block">ROI</span>
              <span className="text-3xl font-bold text-emerald-400">{roi}%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Pricing Tier Card Component
interface PricingTierProps {
  tier: {
    id: string;
    name: string;
    price: string;
    originalPrice?: string;
    period?: string;
    description: string;
    features: string[];
    highlight?: boolean;
    badge?: string;
    icon: React.ReactNode;
    color: string;
  };
  isVisible: boolean;
  delay: number;
  isSelected: boolean;
  onSelect: () => void;
}

const PricingTier: React.FC<PricingTierProps> = ({ tier, isVisible, delay, isSelected, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    rotateX.set(mouseY / 20);
    rotateY.set(-mouseX / 20);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 50,
        scale: isVisible ? (tier.highlight ? 1.05 : 1) : 0.9
      }}
      transition={{ duration: 0.6, delay }}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      className={`relative cursor-pointer transition-all duration-300 ${
        tier.highlight ? 'z-10' : 'z-0'
      }`}
    >
      {/* Badge */}
      {tier.badge && (
        <motion.div
          initial={{ scale: 0, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: delay + 0.3, type: 'spring' }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500
                     text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-20"
        >
          {tier.badge}
        </motion.div>
      )}

      <div
        className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
          isSelected
            ? 'border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)]'
            : tier.highlight
              ? 'border-cyan-400/50 shadow-[0_0_40px_rgba(6,182,212,0.2)]'
              : 'border-white/10 hover:border-white/30'
        } ${tier.highlight ? 'bg-gradient-to-b from-cyan-500/10 to-surface' : 'bg-surface/80'}`}
      >
        {/* Glow Effect */}
        {(isSelected || tier.highlight) && (
          <div className={`absolute inset-0 bg-gradient-to-b ${
            isSelected ? 'from-amber-500/10' : 'from-cyan-500/10'
          } to-transparent pointer-events-none`} />
        )}

        <div className="p-6">
          {/* Icon */}
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${tier.color}`}>
            {tier.icon}
          </div>

          {/* Name */}
          <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
          <p className="text-white/50 text-sm mb-4">{tier.description}</p>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-black text-white">{tier.price}</span>
            {tier.period && <span className="text-white/50">{tier.period}</span>}
            {tier.originalPrice && (
              <span className="text-white/30 line-through text-lg">{tier.originalPrice}</span>
            )}
          </div>

          {/* Features */}
          <ul className="space-y-3">
            {tier.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -10 }}
                transition={{ delay: delay + 0.1 * i }}
                className="flex items-center gap-3 text-sm text-white/80"
              >
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                {feature}
              </motion.li>
            ))}
          </ul>

          {/* Select Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full mt-6 py-3 rounded-xl font-bold transition-all ${
              isSelected
                ? 'bg-amber-500 text-white'
                : tier.highlight
                  ? 'bg-cyan-500 text-white hover:bg-cyan-400'
                  : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isSelected ? 'Selected' : 'Choose Plan'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Calendar Booking Component
interface CalendarBookingProps {
  isVisible: boolean;
  selectedTier: string | null;
}

const CalendarBooking: React.FC<CalendarBookingProps> = ({ isVisible, selectedTier }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i + 1);
    return date;
  });

  const times = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  if (!selectedTier) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, height: isVisible ? 'auto' : 0 }}
      transition={{ duration: 0.5 }}
      className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden"
    >
      <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-cyan-400" />
        Book Your Discovery Call
      </h3>

      {/* Date Selection */}
      <div className="mb-4">
        <p className="text-white/50 text-sm mb-2">Select a date</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dates.map((date, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedDate(date)}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedDate?.toDateString() === date.toDateString()
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {formatDate(date)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="text-white/50 text-sm mb-2">Select a time</p>
            <div className="grid grid-cols-3 gap-2">
              {times.map((time, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedTime === time
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {time}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Button */}
      <AnimatePresence>
        {selectedDate && selectedTime && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white
                       rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Confirm Booking
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main OfferSlide Component
export const OfferSlide: React.FC<SlideProps> = ({ isActive, onComplete }) => {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<'intro' | 'pricing' | 'complete'>('intro');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [spotsRemaining] = useState(3); // Simulated scarcity

  // SSR fix: Only render Canvas after client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isActive) {
      setPhase('intro');
      playNarration("I'm looking for founding clients. Building this takes time to customize. In exchange for your detailed feedback, you get pricing that won't exist again. I have 5 spots available.");

      setTimeout(() => setPhase('pricing'), 2000);
    } else {
      setPhase('intro');
      setSelectedTier(null);
      stopNarration();
    }
  }, [isActive]);

  const pricingTiers = [
    {
      id: 'setup',
      name: 'Full Setup',
      price: '$1,500',
      originalPrice: '$3,000',
      description: 'One-time setup and configuration',
      features: [
        'Complete Business Brain setup',
        'CRM integration',
        'Custom workflows',
        'Data migration',
        '2 hours training'
      ],
      icon: <Zap className="w-7 h-7" />,
      color: 'bg-cyan-500/20 text-cyan-400',
    },
    {
      id: 'monthly',
      name: 'Monthly Support',
      price: '$250',
      period: '/month',
      description: 'Ongoing optimization & support',
      features: [
        '2-3 hours monthly support',
        'Priority response',
        'Monthly optimization',
        'Feature updates',
        'Strategy sessions'
      ],
      highlight: true,
      badge: 'MOST POPULAR',
      icon: <Star className="w-7 h-7" />,
      color: 'bg-amber-500/20 text-amber-400',
    },
    {
      id: 'trial',
      name: 'First Month',
      price: 'FREE',
      description: 'Risk-free trial period',
      features: [
        'Full system access',
        'No commitment',
        'Cancel anytime',
        'Full support included',
        'Money-back guarantee'
      ],
      icon: <Gift className="w-7 h-7" />,
      color: 'bg-emerald-500/20 text-emerald-400',
    }
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-start py-8 px-6 relative
                    bg-gradient-to-b from-surface via-surface to-black overflow-y-auto">

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                        bg-emerald-500/3 rounded-full blur-3xl" />
      </div>

      {/* 3D Scene */}
      <div className="absolute top-4 right-8 w-40 h-40 pointer-events-none">
        {mounted && (
          <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <pointLight position={[-10, -10, -10]} intensity={0.3} color="#06b6d4" />
              <Crown3D isActive={isActive && phase !== 'intro'} />
            </Suspense>
          </Canvas>
        )}
      </div>

      {/* Gift Box 3D - Left Side */}
      <div className="absolute bottom-20 left-8 w-32 h-32 pointer-events-none">
        {mounted && (
          <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <pointLight position={[5, 5, 5]} intensity={0.6} />
              <GiftBox3D isActive={isActive && phase !== 'intro'} />
            </Suspense>
          </Canvas>
        )}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -20 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20
                     rounded-full text-amber-400 text-sm font-medium mb-6"
        >
          <Sparkles className="w-4 h-4" />
          Limited Founding Client Offer
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-serif font-black text-white leading-tight">
          An exclusive offer for you:
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Become a Founding Client.
          </span>
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/50 mt-4 max-w-2xl mx-auto"
        >
          Building this takes time to customize for your business.
          That's why I'm only taking a few clients to start.
        </motion.p>
      </motion.div>

      {/* Scarcity Counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: phase !== 'intro' ? 1 : 0, y: phase !== 'intro' ? 0 : 20 }}
        className="w-full max-w-lg mb-8 relative z-10"
      >
        <ScarcityCounter spotsRemaining={spotsRemaining} isVisible={phase !== 'intro'} />
      </motion.div>

      {/* Main Content Grid - Pricing Tiers */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 relative z-10">
        {pricingTiers.map((tier, i) => (
          <PricingTier
            key={tier.id}
            tier={tier}
            isVisible={phase !== 'intro'}
            delay={0.2 + i * 0.15}
            isSelected={selectedTier === tier.id}
            onSelect={() => setSelectedTier(tier.id)}
          />
        ))}
      </div>

      {/* Bottom Section: Calculator and Calendar */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        <ValueCalculator isVisible={phase !== 'intro'} />
        <CalendarBooking isVisible={phase !== 'intro'} selectedTier={selectedTier} />
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: selectedTier ? 1 : 0,
          y: selectedTier ? 0 : 20
        }}
        transition={{ duration: 0.5 }}
        className="mt-8 relative z-10"
      >
        <motion.button
          onClick={onComplete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group px-12 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white
                     rounded-2xl font-black text-xl shadow-[0_0_40px_rgba(245,158,11,0.4)]
                     flex items-center gap-4"
        >
          <Sparkles className="w-6 h-6" />
          Claim Your Founding Spot
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase !== 'intro' ? 1 : 0 }}
        transition={{ delay: 1.5 }}
        className="flex flex-wrap items-center justify-center gap-8 mt-8 text-white/30 text-sm relative z-10"
      >
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span>Money-back guarantee</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>Setup in 48 hours</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>White-glove onboarding</span>
        </div>
      </motion.div>
    </div>
  );
};
