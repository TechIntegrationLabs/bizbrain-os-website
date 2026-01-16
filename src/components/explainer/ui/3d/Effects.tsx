'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import * as THREE from 'three';

// Spark effect for connections and impacts
interface SparkEffectProps {
  position?: [number, number, number];
  color?: string;
  count?: number;
  duration?: number;
  className?: string;
  trigger?: boolean;
}

function Sparks({
  position = [0, 0, 0],
  color = '#f59e0b',
  count = 20,
  duration = 1,
  trigger = true
}: Omit<SparkEffectProps, 'className'>) {
  const groupRef = useRef<THREE.Group>(null);
  const [active, setActive] = useState(false);
  const startTime = useRef<number | null>(null);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3
      ),
      position: new THREE.Vector3(...position),
      size: 0.02 + Math.random() * 0.03
    }));
  }, [count, position]);

  useEffect(() => {
    if (trigger) {
      setActive(true);
      startTime.current = null;
    }
  }, [trigger]);

  useFrame((state) => {
    if (!groupRef.current || !active) return;

    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - startTime.current;
    const progress = elapsed / duration;

    if (progress >= 1) {
      setActive(false);
      return;
    }

    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        const particle = particles[i];
        child.position.add(particle.velocity.clone().multiplyScalar(0.02));
        child.material.opacity = 1 - progress;
        child.scale.setScalar(1 - progress * 0.5);
      }
    });
  });

  if (!active) return null;

  return (
    <group ref={groupRef} position={position}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position.toArray()}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={1} />
        </mesh>
      ))}
    </group>
  );
}

export const SparkEffect: React.FC<SparkEffectProps> = ({
  className = '',
  ...props
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Sparks {...props} />
      </Canvas>
    </div>
  );
};

// Animated connection beam between two points
interface ConnectionBeamProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  pulseSpeed?: number;
  className?: string;
  active?: boolean;
}

function Beam({
  start,
  end,
  color = '#06b6d4',
  pulseSpeed = 2,
  active = true
}: Omit<ConnectionBeamProps, 'className'>) {
  const tubeRef = useRef<THREE.Mesh>(null);
  const [pulsePosition, setPulsePosition] = useState(0);

  const curve = useMemo(() => {
    const midPoint = new THREE.Vector3(
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2 + 0.5,
      (start[2] + end[2]) / 2
    );
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      midPoint,
      new THREE.Vector3(...end)
    );
  }, [start, end]);

  useFrame((state) => {
    if (!active) return;
    setPulsePosition((state.clock.elapsedTime * pulseSpeed) % 1);
  });

  const pulsePoint = curve.getPoint(pulsePosition);

  return (
    <group>
      {/* Main beam */}
      <mesh>
        <tubeGeometry args={[curve, 20, 0.01, 8, false]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>

      {/* Glowing pulse */}
      {active && (
        <mesh position={pulsePoint}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
}

export const ConnectionBeam: React.FC<ConnectionBeamProps> = ({
  className = '',
  ...props
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Beam {...props} />
      </Canvas>
    </div>
  );
};

// Animated data flow particles
interface DataFlowProps {
  paths: [number, number, number][][];
  color?: string;
  particleCount?: number;
  speed?: number;
  className?: string;
}

function DataFlowParticles({
  paths,
  color = '#06b6d4',
  particleCount = 5,
  speed = 1
}: Omit<DataFlowProps, 'className'>) {
  const groupRef = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    return paths.flatMap((path, pathIndex) =>
      Array.from({ length: particleCount }, (_, i) => ({
        pathIndex,
        offset: i / particleCount,
        speed: 0.5 + Math.random() * speed
      }))
    );
  }, [paths, particleCount, speed]);

  const curves = useMemo(() => {
    return paths.map(path => {
      if (path.length === 2) {
        const mid = new THREE.Vector3(
          (path[0][0] + path[1][0]) / 2,
          (path[0][1] + path[1][1]) / 2 + 0.3,
          (path[0][2] + path[1][2]) / 2
        );
        return new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(...path[0]),
          mid,
          new THREE.Vector3(...path[1])
        );
      }
      return new THREE.CatmullRomCurve3(
        path.map(p => new THREE.Vector3(...p))
      );
    });
  }, [paths]);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.children.forEach((child, i) => {
      const particle = particles[i];
      const curve = curves[particle.pathIndex];
      const t = ((state.clock.elapsedTime * particle.speed + particle.offset) % 1);
      const point = curve.getPoint(t);
      child.position.copy(point);
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((_, i) => (
        <Trail
          key={i}
          width={0.05}
          length={3}
          color={color}
          attenuation={(t) => t * t}
        >
          <mesh>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color={color} />
          </mesh>
        </Trail>
      ))}
    </group>
  );
}

export const DataFlow: React.FC<DataFlowProps> = ({
  className = '',
  ...props
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <DataFlowParticles {...props} />
      </Canvas>
    </div>
  );
};

export default SparkEffect;
