import { useRef, useMemo } from 'react';
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
      // Make text always face the camera like a billboard
      ref.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={0.8}
        color="#2bc0d4"
        font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff"
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
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    const n = skills.length;
    
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2; // y goes from 1 to -1
      const r = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment
      
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
    <div className="w-full h-[400px] lg:h-[500px] relative">
      {/* Decorative HUD Elements */}
      <div className="absolute inset-0 pointer-events-none border border-accent-teal/20 cut-corner-sm flex items-center justify-center">
        <div className="w-[80%] h-[80%] border border-dashed border-accent-teal/10 rounded-full animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[60%] h-[60%] border-t border-b border-accent-yellow/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
        <div className="absolute top-2 left-2 text-[0.5rem] font-mono text-accent-teal/50">SYS.VISUALIZER.3D</div>
      </div>
      
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={1} />
        <Cloud radius={4.5} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
