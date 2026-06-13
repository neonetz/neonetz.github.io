import { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

function ParticleText() {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useEffect(() => {
    const loader = new FontLoader();
    // Using a highly reliable CDN to prevent any local routing/CORS 404s on GH pages
    loader.load('https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json', (font) => {
      const textGeo = new TextGeometry('NEONETZ', {
        font: font,
        size: 2.5,
        depth: 0.5,
        curveSegments: 3,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.05,
        bevelSegments: 2
      });
      textGeo.center();
      setGeometry(textGeo);
    });
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      pointsRef.current.scale.set(scale, scale, scale);
    }
  });

  if (!geometry) return null;

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        transparent
        color="#f0c808"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ParticleCore({ count = 18000 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      let x, y, z;
      if (i < count * 0.3) {
        const rSphere = 2 + Math.random() * 0.5;
        x = rSphere * Math.sin(phi) * Math.cos(theta);
        y = rSphere * Math.sin(phi) * Math.sin(theta);
        z = rSphere * Math.cos(phi);
      } else if (i < count * 0.7) {
        const rDisk = 3.5 + Math.random() * 6;
        const angle = Math.random() * Math.PI * 2;
        x = Math.cos(angle) * rDisk;
        z = Math.sin(angle) * rDisk;
        y = (Math.random() - 0.5) * 0.3; 
      } else {
        const rDisk = 6 + Math.random() * 8;
        const angle = Math.random() * Math.PI * 2;
        x = Math.cos(angle) * rDisk;
        z = Math.sin(angle) * rDisk;
        y = (Math.random() - 0.5) * 2;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.15;
    }
  });

  return (
    <group rotation={[0.2, 0, 0.1]}>
      <Points ref={pointsRef} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#2bc0d4"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

export function TechCloud3D() {
  return (
    <div className="w-full h-[100svh] relative flex items-center justify-center bg-[#08080A] pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="absolute w-[90vw] max-w-[900px] aspect-square rounded-full border border-dashed border-white/10 animate-[spin_120s_linear_infinite]" />
        <div className="absolute w-[70vw] max-w-[700px] aspect-square rounded-full border-t-2 border-r-2 border-transparent border-l-accent-teal/30 border-b-accent-teal/30 animate-[spin_60s_linear_infinite_reverse]" />
        <div className="absolute w-full h-[1px] bg-white/5" />
        <div className="absolute h-full w-[1px] bg-white/5" />
      </div>

      <div className="absolute top-12 md:top-32 left-8 md:left-12 z-20 pointer-events-none">
        <div className="w-8 h-8 border-t-2 border-l-2 border-accent-yellow mb-2" />
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-[0.2em] mb-1">SYSTEM CORE</h3>
        <p className="text-[0.65rem] font-mono text-white/50 tracking-widest uppercase max-w-xs leading-relaxed">
          Neural network visualizer. Displaying active data nodes and accretion disk topology.
        </p>
      </div>
      
      <div className="w-full h-full relative z-10">
        <Canvas camera={{ position: [0, 3, 18], fov: 45 }}>
          <color attach="background" args={['#08080A']} />
          <ambientLight intensity={1} />
          
          <Suspense fallback={null}>
            <ParticleText />
            <ParticleCore count={18000} />
          </Suspense>
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.8} 
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>
    </div>
  );
}
