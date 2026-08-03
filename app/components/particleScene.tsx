"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 1800 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.04;
    mesh.current.rotation.x = t * 0.01;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#4ade80"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingRing() {
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ring.current) return;
    const t = clock.getElapsedTime();
    ring.current.rotation.x = t * 0.3;
    ring.current.rotation.y = t * 0.2;
    ring.current.position.y = Math.sin(t * 0.5) * 0.3;
  });

  return (
    <mesh ref={ring} position={[3.5, 0, -1]}>
      <torusGeometry args={[1.4, 0.03, 16, 120]} />
      <meshBasicMaterial color="#4ade80" transparent opacity={0.25} />
    </mesh>
  );
}

function FloatingRing2() {
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ring.current) return;
    const t = clock.getElapsedTime();
    ring.current.rotation.x = -t * 0.15;
    ring.current.rotation.z = t * 0.25;
    ring.current.position.y = Math.cos(t * 0.4) * 0.4;
  });

  return (
    <mesh ref={ring} position={[3.5, 0, -1]}>
      <torusGeometry args={[2.0, 0.02, 16, 120]} />
      <meshBasicMaterial color="#4ade80" transparent opacity={0.12} />
    </mesh>
  );
}

function IcosahedronCore() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.18;
    mesh.current.rotation.y = t * 0.22;
    mesh.current.rotation.z = t * 0.1;
  });

  return (
    <mesh ref={mesh} position={[3.5, 0, -1]}>
      <icosahedronGeometry args={[0.7, 0]} />
      <meshBasicMaterial color="#4ade80" wireframe transparent opacity={0.4} />
    </mesh>
  );
}

export default function ParticleScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <Particles />
      <FloatingRing />
      <FloatingRing2 />
      <IcosahedronCore />
    </Canvas>
  );
}
