import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  "PYTHON", "REACT", "TYPESCRIPT", "TAILWIND", 
  "C/C++", "OPENCV", "GODOT", "DJANGO", 
  "LINUX", "GIT", "SQL", "DOCKER"
];

function Word({ children, position }: { children: string, position: THREE.Vector3 }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={0.8}
        color="#2bc0d4"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#145c66"
      >
        {children}
      </Text>
    </group>
  );
}

function Cloud({ radius = 5 }: { radius?: number }) {
  const words = useMemo(() => {
    const temp = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); 
    const n = skills.length;
    
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2; 
      const r = Math.sqrt(1 - y * y); 
      const theta = phi * i; 
      
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      
      temp.push({
        word: skills[i],
        pos: new THREE.Vector3(x * radius, y * radius, z * radius)
      });
    }
    return temp;
  }, [radius]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {words.map((w, i) => (
        <Word key={i} position={w.pos}>
          {w.word}
        </Word>
      ))}
    </group>
  );
}

export function TechCloud3D() {
  return (
    <div className="w-full h-screen relative flex items-center justify-center bg-bg-secondary pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[80vw] max-w-[800px] aspect-square border border-dashed border-accent-teal/10 rounded-full animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[60vw] max-w-[600px] aspect-square border-t border-b border-accent-yellow/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
      </div>
      
      <div className="absolute top-32 left-12 text-[0.65rem] font-mono text-accent-teal/50 tracking-widest uppercase border-l-2 border-accent-teal pl-3">
        SYS.VISUALIZER.3D <br/>
        ORBITAL MATRIX
      </div>
      
      <div className="w-full max-w-4xl h-[600px] relative z-10">
        <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
            <Cloud radius={5.5} />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
        </Canvas>
      </div>
    </div>
  );
}
