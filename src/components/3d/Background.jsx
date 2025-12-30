import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// --- STAR LAYER COMPONENT ---
const StarLayer = ({ count, size, color, opacity, transparent = true }) => {
  const mesh = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 3000;
      const y = (Math.random() - 0.5) * 3000;
      const z = (Math.random() - 0.5) * 3000; 
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count]);

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={size} 
        color={color} 
        transparent={transparent} 
        opacity={opacity} 
        sizeAttenuation={true} 
        depthWrite={false} 
      />
    </points>
  );
};

// --- MAIN SCENE CONTENT ---
const SceneContent = ({ isMobile }) => {
  const { camera } = useThree();
  const targetZ = useRef(100);

  useFrame((state, delta) => {
    const scrollY = window.scrollY;
    
    // Smooth camera movement
    const newZ = 100 - (scrollY * 0.1); 
    targetZ.current = THREE.MathUtils.lerp(targetZ.current, newZ, 0.1);
    camera.position.z = targetZ.current;

    // Subtle rotation
    camera.rotation.z = scrollY * 0.0002;
  });

  // PERFORMANCE FIX: significantly reduced mobile counts to prevent thermal throttling
  const counts = isMobile 
    ? { dust: 1500, stars: 800, beacons: 100 }  // Mobile (Optimized)
    : { dust: 12000, stars: 5000, beacons: 800 }; // Desktop (Ultra)

  return (
    <group>
      <StarLayer count={counts.dust} size={0.5} color="#64748b" opacity={0.5} />
      <StarLayer count={counts.stars} size={1.2} color="#ffffff" opacity={0.8} />
      <StarLayer count={counts.beacons} size={2.5} color="#38bdf8" opacity={1} />
    </group>
  );
};

// --- EXPORTED COMPONENT ---
const Background = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // 1. Check Mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    // 2. Accessibility: Respect 'Reduce Motion' preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) setShouldRender(false);

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!shouldRender) return <div className="fixed inset-0 -z-10 bg-black" />;

  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#000000] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 100], fov: 75 }}
        gl={{ 
            antialias: false, 
            powerPreference: "high-performance",
            depth: true 
        }}
        // Limit DPR to 1.5 to save battery on high-res screens
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}
      >
        <SceneContent isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default Background;