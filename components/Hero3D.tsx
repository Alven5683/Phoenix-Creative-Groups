// components/Hero3D.tsx
'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

export default function Hero3D() {
  if (typeof window !== 'undefined' && window.innerWidth < 1024) return null;
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 2]} />
        <Sphere args={[1.2, 64, 64]} scale={1.2}>
          <MeshDistortMaterial
            color="#a259ff"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
          />
        </Sphere>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate />
      </Canvas>
    </div>
  );
}
