// src/features/public/landing/components/HeroCanvas.tsx
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import type { Mesh } from "three";

function VolunteerOrb() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={1.6}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.35}
          speed={1.8}
          roughness={0.15}
          metalness={0.6}
        />
      </mesh>
    </Float>
  );
}

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#a5b4fc" />
          <VolunteerOrb />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}