'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Trail, MeshDistortMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedBrainProps {
  isActive?: boolean;
  phase?: 'idle' | 'capturing' | 'processing' | 'distributing' | 'complete';
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
  size?: number;
}

// Neural node that pulses
function NeuralNode({
  position,
  color,
  size = 0.08,
  pulseSpeed = 1,
  isActive = true
}: {
  position: [number, number, number];
  color: string;
  size?: number;
  pulseSpeed?: number;
  isActive?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !isActive) return;
    const scale = 1 + Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.2;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={isActive ? 0.8 : 0.2}
        transparent
        opacity={isActive ? 1 : 0.5}
      />
    </mesh>
  );
}

// Data particle that flows through the brain
function DataParticle({
  startPosition,
  endPosition,
  color,
  duration = 2,
  delay = 0,
  onComplete
}: {
  startPosition: [number, number, number];
  endPosition: [number, number, number];
  color: string;
  duration?: number;
  delay?: number;
  onComplete?: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [progress, setProgress] = useState(0);
  const startTime = useRef<number | null>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime + delay;
    }

    const elapsed = state.clock.elapsedTime - startTime.current;
    if (elapsed < 0) return;

    const t = Math.min(elapsed / duration, 1);
    setProgress(t);

    // Bezier curve interpolation for organic movement
    const midPoint = [
      (startPosition[0] + endPosition[0]) / 2 + (Math.random() - 0.5) * 0.5,
      (startPosition[1] + endPosition[1]) / 2 + 0.5,
      (startPosition[2] + endPosition[2]) / 2
    ];

    const x = (1 - t) * (1 - t) * startPosition[0] + 2 * (1 - t) * t * midPoint[0] + t * t * endPosition[0];
    const y = (1 - t) * (1 - t) * startPosition[1] + 2 * (1 - t) * t * midPoint[1] + t * t * endPosition[1];
    const z = (1 - t) * (1 - t) * startPosition[2] + 2 * (1 - t) * t * midPoint[2] + t * t * endPosition[2];

    meshRef.current.position.set(x, y, z);

    if (t >= 1 && onComplete) {
      onComplete();
    }
  });

  if (progress >= 1) return null;

  return (
    <Trail
      width={0.1}
      length={5}
      color={color}
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef} position={startPosition}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
}

// Main brain structure
function BrainStructure({
  isActive = true,
  phase = 'idle',
  primaryColor = '#06b6d4',
  secondaryColor = '#10b981',
  size = 1
}: Omit<AnimatedBrainProps, 'className'>) {
  const groupRef = useRef<THREE.Group>(null);
  const [particles, setParticles] = useState<number[]>([]);

  // Generate neural network nodes
  const nodes = useMemo(() => {
    const nodePositions: [number, number, number][] = [];
    // Create a brain-like shape with nodes
    for (let i = 0; i < 40; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = (0.6 + Math.random() * 0.4) * size;

      // Squash to make it brain-shaped
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * 0.7 * Math.cos(phi);
      const z = r * 0.8 * Math.sin(phi) * Math.sin(theta);

      nodePositions.push([x, y, z]);
    }
    return nodePositions;
  }, [size]);

  // Generate connections between nearby nodes
  const connections = useMemo(() => {
    const conns: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt(
          Math.pow(nodes[i][0] - nodes[j][0], 2) +
          Math.pow(nodes[i][1] - nodes[j][1], 2) +
          Math.pow(nodes[i][2] - nodes[j][2], 2)
        );
        if (dist < 0.8 * size) {
          conns.push([i, j]);
        }
      }
    }
    return conns;
  }, [nodes, size]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Gentle rotation
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;

    // Phase-based animations
    if (phase === 'processing') {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  // Spawn particles during processing phase
  useEffect(() => {
    if (phase === 'processing' || phase === 'distributing') {
      const interval = setInterval(() => {
        setParticles(prev => [...prev, Date.now()]);
      }, 300);
      return () => clearInterval(interval);
    } else {
      setParticles([]);
    }
  }, [phase]);

  const getPhaseIntensity = () => {
    switch (phase) {
      case 'capturing': return 0.6;
      case 'processing': return 1;
      case 'distributing': return 0.8;
      case 'complete': return 0.4;
      default: return 0.3;
    }
  };

  return (
    <group ref={groupRef}>
      {/* Core brain sphere */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <Sphere args={[size * 0.5, 32, 32]}>
          <MeshDistortMaterial
            color={primaryColor}
            distort={phase === 'processing' ? 0.5 : 0.2}
            speed={phase === 'processing' ? 4 : 1}
            roughness={0.3}
            metalness={0.8}
            emissive={primaryColor}
            emissiveIntensity={getPhaseIntensity()}
            transparent
            opacity={0.6}
          />
        </Sphere>
      </Float>

      {/* Neural nodes */}
      {nodes.map((pos, i) => (
        <NeuralNode
          key={i}
          position={pos}
          color={i % 3 === 0 ? secondaryColor : primaryColor}
          size={0.04 + (i % 5) * 0.01}
          pulseSpeed={1 + (i % 3)}
          isActive={isActive}
        />
      ))}

      {/* Connections */}
      {connections.map(([a, b], i) => {
        const points: [number, number, number][] = [
          nodes[a],
          nodes[b]
        ];
        return (
          <Line
            key={`conn-${i}`}
            points={points}
            color={primaryColor}
            transparent
            opacity={phase === 'processing' ? 0.6 : 0.15}
            lineWidth={1}
          />
        );
      })}

      {/* Data particles */}
      {particles.slice(-10).map((id, i) => (
        <DataParticle
          key={id}
          startPosition={nodes[i % nodes.length]}
          endPosition={nodes[(i + 10) % nodes.length]}
          color={secondaryColor}
          duration={1.5}
          delay={i * 0.1}
        />
      ))}

      {/* Outer glow during active phases */}
      {(phase === 'processing' || phase === 'distributing') && (
        <mesh>
          <sphereGeometry args={[size * 0.8, 32, 32]} />
          <meshBasicMaterial
            color={primaryColor}
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </group>
  );
}

export const AnimatedBrain: React.FC<AnimatedBrainProps> = ({
  className = '',
  ...props
}) => {
  return (
    <div className={`${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight
          position={[0, 0, 2]}
          intensity={1}
          color={props.primaryColor || '#06b6d4'}
        />
        <BrainStructure {...props} />
      </Canvas>
    </div>
  );
};

export default AnimatedBrain;
