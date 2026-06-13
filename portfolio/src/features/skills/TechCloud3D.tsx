import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

function ParticleCore({ count = 8000 }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate a spherical point cloud with noise
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Math for a sphere with concentrated poles or random distribution
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      // We can create a shape that resembles a core by concentrating points
      // or adding a ring around it. Let's make a dense sphere + a wide disk.
      
      let x, y, z;
      if (i < count * 0.6) {
        // Dense sphere
        const rSphere = 3 + Math.random() * 0.5;
        x = rSphere * Math.sin(phi) * Math.cos(theta);
        y = rSphere * Math.sin(phi) * Math.sin(theta);
        z = rSphere * Math.cos(phi);
      } else {
        // Accretion disk / Rings
        const rDisk = 3.5 + Math.random() * 4;
        const angle = Math.random() * Math.PI * 2;
        // Make the disk thin in the y-axis
        x = Math.cos(angle) * rDisk;
        z = Math.sin(angle) * rDisk;
        y = (Math.random() - 0.5) * 0.5; // very thin
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
      pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group rotation={[0.2, 0, 0.1]}>
      <Points ref={pointsRef} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export function TechCloud3D() {
  return (
    <div className="w-full h-screen relative flex items-center justify-center bg-[#08080A] pt-24 pb-16 overflow-hidden">
      
      {/* Sci-Fi HUD Overlays */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Outer dashed ring */}
        <div className="absolute w-[90vw] max-w-[900px] aspect-square rounded-full border border-dashed border-white/10 animate-[spin_120s_linear_infinite]" />
        
        {/* Inner solid segmented ring */}
        <div className="absolute w-[70vw] max-w-[700px] aspect-square rounded-full border-t-2 border-r-2 border-transparent border-l-accent-teal/30 border-b-accent-teal/30 animate-[spin_60s_linear_infinite_reverse]" />
        
        {/* Crosshairs */}
        <div className="absolute w-full h-[1px] bg-white/5" />
        <div className="absolute h-full w-[1px] bg-white/5" />
      </div>

      <div className="absolute top-32 left-8 sm:left-12 z-20 pointer-events-none">
        <div className="w-8 h-8 border-t-2 border-l-2 border-accent-yellow mb-2" />
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-[0.2em] mb-1">SYSTEM CORE</h3>
        <p className="text-[0.65rem] font-mono text-white/50 tracking-widest uppercase max-w-xs leading-relaxed">
          Neural network visualizer. Displaying active data nodes and accretion disk topology.
        </p>
      </div>
      
      <div className="w-full h-full relative z-10">
        <Canvas camera={{ position: [0, 2, 12], fov: 45 }}>
          <color attach="background" args={['#08080A']} />
          <ambientLight intensity={1} />
          <ParticleCore count={15000} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.5} 
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>
    </div>
  );
}
