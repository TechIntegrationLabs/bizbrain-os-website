'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  spread?: number;
  opacity?: number;
  className?: string;
}

function ParticleCloud({
  count = 500,
  color = '#06b6d4',
  size = 0.02,
  speed = 0.3,
  spread = 10,
  opacity = 0.6
}: Omit<ParticleFieldProps, 'className'>) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    return positions;
  }, [count, spread]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.1;
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.15;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={opacity}
      />
    </Points>
  );
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  className = '',
  ...props
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ParticleCloud {...props} />
      </Canvas>
    </div>
  );
};

// Neural network style connection particles
interface NeuralParticlesProps {
  nodeCount?: number;
  connectionCount?: number;
  color?: string;
  className?: string;
}

function NeuralNetwork({
  nodeCount = 30,
  connectionCount = 50,
  color = '#06b6d4'
}: Omit<NeuralParticlesProps, 'className'>) {
  const groupRef = useRef<THREE.Group>(null);

  const { nodes, connections } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      ));
    }

    const connections: [number, number][] = [];
    for (let i = 0; i < connectionCount; i++) {
      const a = Math.floor(Math.random() * nodeCount);
      let b = Math.floor(Math.random() * nodeCount);
      while (b === a) b = Math.floor(Math.random() * nodeCount);
      connections.push([a, b]);
    }

    return { nodes, connections };
  }, [nodeCount, connectionCount]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.15) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <mesh key={`node-${i}`} position={pos}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.8} />
        </mesh>
      ))}

      {/* Connections */}
      {connections.map(([a, b], i) => {
        const points = [nodes[a].toArray(), nodes[b].toArray()] as [number, number, number][];
        return (
          <Line
            key={`conn-${i}`}
            points={points}
            color={color}
            transparent
            opacity={0.2}
            lineWidth={1}
          />
        );
      })}
    </group>
  );
}

export const NeuralParticleField: React.FC<NeuralParticlesProps> = ({
  className = '',
  ...props
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <NeuralNetwork {...props} />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
};

export default ParticleField;
