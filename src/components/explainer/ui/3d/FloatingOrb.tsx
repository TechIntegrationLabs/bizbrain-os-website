'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, GradientTexture, Float } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingOrbProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  distort?: number;
  speed?: number;
  className?: string;
  intensity?: number;
}

function Orb({
  color = '#06b6d4',
  secondaryColor = '#10b981',
  size = 1.5,
  distort = 0.4,
  speed = 2,
  intensity = 1
}: Omit<FloatingOrbProps, 'className'>) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[size, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={speed}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={intensity * 0.3}
        >
          <GradientTexture
            stops={[0, 0.5, 1]}
            colors={[color, secondaryColor, color]}
          />
        </MeshDistortMaterial>
      </Sphere>
    </Float>
  );
}

export const FloatingOrb: React.FC<FloatingOrbProps> = ({
  className = '',
  ...props
}) => {
  return (
    <div className={`${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color={props.color || '#06b6d4'} />
        <Orb {...props} />
      </Canvas>
    </div>
  );
};

// Multiple orbs floating together
interface OrbClusterProps {
  count?: number;
  colors?: string[];
  className?: string;
}

function OrbCluster({
  count = 5,
  colors = ['#06b6d4', '#10b981', '#f59e0b']
}: Omit<OrbClusterProps, 'className'>) {
  const orbs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3
      ] as [number, number, number],
      size: 0.3 + Math.random() * 0.5,
      color: colors[i % colors.length],
      speed: 1 + Math.random() * 2
    }));
  }, [count, colors]);

  return (
    <>
      {orbs.map((orb, i) => (
        <Float key={i} speed={orb.speed} rotationIntensity={0.3} floatIntensity={0.5}>
          <mesh position={orb.position}>
            <sphereGeometry args={[orb.size, 32, 32]} />
            <meshStandardMaterial
              color={orb.color}
              emissive={orb.color}
              emissiveIntensity={0.5}
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export const FloatingOrbCluster: React.FC<OrbClusterProps> = ({
  className = '',
  ...props
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <OrbCluster {...props} />
      </Canvas>
    </div>
  );
};

export default FloatingOrb;
