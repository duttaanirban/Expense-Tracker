// 3d-bg.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text } from '@react-three/drei';

const ThreeDBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        <Float speed={2} rotationIntensity={1.2} floatIntensity={2}>
          <Coin />
        </Float>
  <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};


export default ThreeDBackground;

// --- Move Droplet and THREE import outside the component ---
import * as THREE from 'three';

// Coin shape using CylinderGeometry and a raised '$' symbol
function Coin() {
  return (
    <group>
      {/* Coin body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.1, 1.1, 0.3, 64]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={1}
          roughness={0.09}
          emissive="#FFC300"
          emissiveIntensity={0.45}
        />
      </mesh>
      {/* Coin edge */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.13, 1.13, 0.32, 64, 1, true]} />
        <meshStandardMaterial
          color="#FFC300"
          metalness={0.95}
          roughness={0.13}
          emissive="#FFD700"
          emissiveIntensity={0.28}
        />
      </mesh>
      {/* Dollar sign using Drei Text */}
      <Text
        position={[0, 0.18, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.7}
        color="#fffde4"
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
      >
        $
      </Text>
    </group>
  );
}
