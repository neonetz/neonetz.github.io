import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

function ParticleCore({ count = 35000 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [particlesPosition] = useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      let x, y, z;
      
      if (i < count * 0.4) {
        // Saturn Planet Body (Dense Sphere)
        const rSphere = 2.5 + (Math.random() * 0.1); 
        x = rSphere * Math.sin(phi) * Math.cos(theta);
        y = rSphere * Math.sin(phi) * Math.sin(theta);
        z = rSphere * Math.cos(phi);
      } else {
        // Saturn Rings (Wide, flat, with gaps)
        // Main rings from radius 3.5 to 7.0
        let rDisk = 3.5 + Math.random() * 3.5;
        
        // Create a gap (Cassini Division) between 5.0 and 5.5
        if (rDisk > 5.0 && rDisk < 5.5) {
            rDisk += 0.5; // Push particles outward to create the gap
        }
        
        const angle = Math.random() * Math.PI * 2;
        x = Math.cos(angle) * rDisk;
        z = Math.sin(angle) * rDisk;
        
        // Extremely thin on the Y axis to look like real planetary rings
        y = (Math.random() - 0.5) * 0.05; 
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  });

  useFrame((state) => {
    if (pointsRef.current) {
      // Gentle rotation of the entire Saturn system
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    // Saturn's axial tilt is ~26.7 degrees (0.46 radians)
    <group rotation={[0.46, 0, -0.2]}>
      <Points ref={pointsRef} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.025}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.7}
        />
      </Points>
    </group>
  );
}

export function TechCloud3D() {
  return (
    <section id="system" className="w-full h-[100svh] relative flex items-center justify-center bg-[#08080A] pt-24 pb-16 overflow-hidden">
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
            <ParticleCore count={35000} />
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
    </section>
  );
}
