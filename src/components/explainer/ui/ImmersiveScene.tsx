'use client';

import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial, Trail, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

// ============================================================================
// CHAPTER COLORS - Used to shift scene mood
// ============================================================================

const chapterColors = {
  challenge: { primary: '#06b6d4', secondary: '#3b82f6', ambient: 0.3 },
  solution: { primary: '#10b981', secondary: '#06b6d4', ambient: 0.4 },
  results: { primary: '#f59e0b', secondary: '#10b981', ambient: 0.5 },
  getStarted: { primary: '#ec4899', secondary: '#f59e0b', ambient: 0.6 },
};

// ============================================================================
// NEURAL NETWORK - Floating connected nodes
// ============================================================================

interface NeuralNodeProps {
  position: [number, number, number];
  color: string;
  connections: Array<[number, number, number]>;
  pulseDelay: number;
  isActive: boolean;
}

const NeuralNode: React.FC<NeuralNodeProps> = ({
  position,
  color,
  connections,
  pulseDelay,
  isActive,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef(0);

  useFrame((state) => {
    if (!meshRef.current) return;

    pulseRef.current += 0.02;
    const pulse = Math.sin(pulseRef.current + pulseDelay) * 0.5 + 0.5;

    // Subtle floating movement
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + pulseDelay) * 0.1;
    meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.5 + pulseDelay) * 0.05;

    if (isActive) {
      meshRef.current.scale.setScalar(1 + pulse * 0.3);
    }
  });

  return (
    <group position={position}>
      {/* Core node */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.8 : 0.3}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Glow */}
      <mesh scale={1.5}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Connections */}
      {connections.map((target, i) => (
        <ConnectionLine
          key={i}
          start={[0, 0, 0]}
          end={[target[0] - position[0], target[1] - position[1], target[2] - position[2]]}
          color={color}
          isActive={isActive}
        />
      ))}
    </group>
  );
};

// ============================================================================
// CONNECTION LINE - Animated line between nodes
// ============================================================================

interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  isActive: boolean;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({ start, end, color, isActive }) => {
  const lineRef = useRef<THREE.Group>(null);

  const lineObject = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3((start[0] + end[0]) / 2, (start[1] + end[1]) / 2 + 0.2, (start[2] + end[2]) / 2),
      new THREE.Vector3(...end)
    );
    const points = curve.getPoints(20);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: isActive ? 0.4 : 0.1,
    });
    return new THREE.Line(geometry, material);
  }, [start, end, color, isActive]);

  return (
    <group ref={lineRef}>
      <primitive object={lineObject} />
    </group>
  );
};

// ============================================================================
// FLOATING ORBS - Large decorative orbs
// ============================================================================

interface FloatingOrbProps {
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
  distort: number;
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({
  position,
  color,
  size,
  speed,
  distort,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.1;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.15;
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 4]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.15}
          distort={distort}
          speed={speed}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>
    </Float>
  );
};

// ============================================================================
// PARTICLE FIELD - Background particles with depth
// ============================================================================

interface ParticleFieldProps {
  count: number;
  color: string;
  spread: number;
  intensity: number;
}

const ParticleField: React.FC<ParticleFieldProps> = ({
  count,
  color,
  spread,
  intensity,
}) => {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      sizes[i] = Math.random() * 0.5 + 0.1;
    }

    return { positions, sizes };
  }, [count, spread]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(points.positions, 3));
    return geo;
  }, [points.positions]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color={color}
        transparent
        opacity={intensity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// ============================================================================
// CAMERA CONTROLLER - Smooth camera movements between slides
// ============================================================================

interface CameraControllerProps {
  slideIndex: number;
  totalSlides: number;
}

const CameraController: React.FC<CameraControllerProps> = ({ slideIndex, totalSlides }) => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 5));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    // Calculate camera position based on slide
    const progress = slideIndex / (totalSlides - 1);
    const angle = progress * Math.PI * 0.5; // Quarter circle path

    targetPosition.current.set(
      Math.sin(angle) * 2,
      Math.cos(progress * Math.PI * 2) * 0.5,
      5 - progress * 1
    );

    targetLookAt.current.set(
      Math.sin(angle) * 0.5,
      0,
      0
    );
  }, [slideIndex, totalSlides]);

  useFrame(() => {
    camera.position.lerp(targetPosition.current, 0.02);
    const lookAtTarget = new THREE.Vector3();
    lookAtTarget.lerp(targetLookAt.current, 0.02);
    camera.lookAt(lookAtTarget);
  });

  return null;
};

// ============================================================================
// AMBIENT LIGHTS - Dynamic lighting based on chapter
// ============================================================================

interface AmbientLightsProps {
  chapter: keyof typeof chapterColors;
}

const AmbientLights: React.FC<AmbientLightsProps> = ({ chapter }) => {
  const colors = chapterColors[chapter];
  const pointLight1Ref = useRef<THREE.PointLight>(null);
  const pointLight2Ref = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (pointLight1Ref.current) {
      pointLight1Ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 5;
      pointLight1Ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.2) * 3;
    }
    if (pointLight2Ref.current) {
      pointLight2Ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.25) * 5;
      pointLight2Ref.current.position.z = Math.sin(state.clock.elapsedTime * 0.35) * 3;
    }
  });

  return (
    <>
      <ambientLight intensity={colors.ambient} />
      <pointLight
        ref={pointLight1Ref}
        position={[5, 3, 2]}
        intensity={1}
        color={colors.primary}
        distance={15}
      />
      <pointLight
        ref={pointLight2Ref}
        position={[-5, -2, 3]}
        intensity={0.8}
        color={colors.secondary}
        distance={12}
      />
    </>
  );
};

// ============================================================================
// ENERGY RING - Rotating energy ring around content
// ============================================================================

interface EnergyRingProps {
  radius: number;
  color: string;
  speed: number;
  opacity: number;
}

const EnergyRing: React.FC<EnergyRingProps> = ({ radius, color, speed, opacity }) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = state.clock.elapsedTime * speed;
    ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
};

// ============================================================================
// MAIN SCENE COMPONENT
// ============================================================================

interface ImmersiveSceneProps {
  slideIndex: number;
  totalSlides: number;
  chapter: 'challenge' | 'solution' | 'results' | 'getStarted';
  className?: string;
}

const SceneContent: React.FC<ImmersiveSceneProps> = ({
  slideIndex,
  totalSlides,
  chapter,
}) => {
  const colors = chapterColors[chapter];

  // Generate neural network nodes
  const nodes = useMemo(() => {
    const result: Array<{
      position: [number, number, number];
      connections: Array<[number, number, number]>;
    }> = [];

    for (let i = 0; i < 15; i++) {
      const pos: [number, number, number] = [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4 - 2,
      ];

      // Connect to 1-3 nearest nodes
      const connections: Array<[number, number, number]> = [];
      for (let j = 0; j < Math.min(i, 2); j++) {
        if (result[j]) {
          connections.push(result[j].position);
        }
      }

      result.push({ position: pos, connections });
    }

    return result;
  }, []);

  return (
    <>
      <CameraController slideIndex={slideIndex} totalSlides={totalSlides} />
      <AmbientLights chapter={chapter} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a0f', 5, 15]} />

      {/* Particle field background */}
      <ParticleField count={500} color={colors.primary} spread={20} intensity={0.3} />

      {/* Neural network nodes */}
      {nodes.map((node, i) => (
        <NeuralNode
          key={i}
          position={node.position}
          color={colors.primary}
          connections={node.connections}
          pulseDelay={i * 0.3}
          isActive={slideIndex % 3 === i % 3}
        />
      ))}

      {/* Floating orbs */}
      <FloatingOrb
        position={[-4, 2, -3]}
        color={colors.primary}
        size={1.5}
        speed={1}
        distort={0.3}
      />
      <FloatingOrb
        position={[4, -1, -4]}
        color={colors.secondary}
        size={1}
        speed={1.5}
        distort={0.4}
      />
      <FloatingOrb
        position={[0, 3, -5]}
        color={colors.primary}
        size={0.8}
        speed={2}
        distort={0.5}
      />

      {/* Energy rings */}
      <EnergyRing radius={3} color={colors.primary} speed={0.2} opacity={0.1} />
      <EnergyRing radius={4} color={colors.secondary} speed={-0.15} opacity={0.05} />

      {/* Central sparkles */}
      <Sparkles
        count={50}
        scale={8}
        size={1.5}
        speed={0.3}
        color={colors.primary}
        opacity={0.5}
      />
    </>
  );
};

export const ImmersiveScene: React.FC<ImmersiveSceneProps> = (props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none ${props.className || ''}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent {...props} />
        </Suspense>
      </Canvas>
    </div>
  );
};

// ============================================================================
// GRADIENT MESH BACKGROUND - CSS-based animated gradient
// ============================================================================

interface GradientMeshProps {
  colors: string[];
  className?: string;
}

export const GradientMesh: React.FC<GradientMeshProps> = ({ colors, className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base gradient */}
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background: `radial-gradient(ellipse at 20% 30%, ${colors[0]}15 0%, transparent 50%),
                       radial-gradient(ellipse at 80% 70%, ${colors[1]}15 0%, transparent 50%),
                       radial-gradient(ellipse at 50% 50%, ${colors[2] || colors[0]}10 0%, transparent 60%)`,
        }}
      />

      {/* Moving orbs */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl animate-float-slow"
        style={{
          background: `radial-gradient(circle, ${colors[0]}20 0%, transparent 70%)`,
          top: '10%',
          left: '20%',
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl animate-float-slow-reverse"
        style={{
          background: `radial-gradient(circle, ${colors[1]}20 0%, transparent 70%)`,
          bottom: '20%',
          right: '15%',
          animationDelay: '-2s',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export { chapterColors };
