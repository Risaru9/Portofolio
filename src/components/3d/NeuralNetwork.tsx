import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  originalPosition: THREE.Vector3;
}

function NeuralParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();
  
  const particleCount = 60;
  const connectionDistance = 3;
  
  const { positions, particlesData, linePositions, lineColors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const particlesData: ParticleData[] = [];
    const linePositions = new Float32Array(particleCount * particleCount * 6);
    const lineColors = new Float32Array(particleCount * particleCount * 6);
    
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 5;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      particlesData.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.005
        ),
        originalPosition: new THREE.Vector3(x, y, z)
      });
    }
    
    return { positions, particlesData, linePositions, lineColors };
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useFrame((state) => {
    if (!meshRef.current || !linesRef.current) return;
    
    const positionsArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    const linePositionsArray = linesRef.current.geometry.attributes.position.array as Float32Array;
    const lineColorsArray = linesRef.current.geometry.attributes.color.array as Float32Array;
    
    let lineIndex = 0;
    const time = state.clock.elapsedTime;
    
    // Update particles
    for (let i = 0; i < particleCount; i++) {
      const particle = particlesData[i];
      
      // Add subtle floating motion
      particle.position.x += particle.velocity.x + Math.sin(time * 0.5 + i) * 0.002;
      particle.position.y += particle.velocity.y + Math.cos(time * 0.3 + i) * 0.002;
      particle.position.z += particle.velocity.z;
      
      // Mouse interaction - particles move away from mouse
      const mouseX = mouseRef.current.x * viewport.width * 0.5;
      const mouseY = mouseRef.current.y * viewport.height * 0.5;
      const dx = particle.position.x - mouseX;
      const dy = particle.position.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 2) {
        const force = (2 - dist) * 0.02;
        particle.position.x += dx * force;
        particle.position.y += dy * force;
      }
      
      // Boundary check - gently return to original area
      if (Math.abs(particle.position.x) > 8) {
        particle.velocity.x *= -1;
      }
      if (Math.abs(particle.position.y) > 6) {
        particle.velocity.y *= -1;
      }
      
      positionsArray[i * 3] = particle.position.x;
      positionsArray[i * 3 + 1] = particle.position.y;
      positionsArray[i * 3 + 2] = particle.position.z;
      
      // Create connections
      for (let j = i + 1; j < particleCount; j++) {
        const otherParticle = particlesData[j];
        const distance = particle.position.distanceTo(otherParticle.position);
        
        if (distance < connectionDistance) {
          linePositionsArray[lineIndex * 6] = particle.position.x;
          linePositionsArray[lineIndex * 6 + 1] = particle.position.y;
          linePositionsArray[lineIndex * 6 + 2] = particle.position.z;
          linePositionsArray[lineIndex * 6 + 3] = otherParticle.position.x;
          linePositionsArray[lineIndex * 6 + 4] = otherParticle.position.y;
          linePositionsArray[lineIndex * 6 + 5] = otherParticle.position.z;
          
          // Gradient colors: yellow to blue
          lineColorsArray[lineIndex * 6] = 1;
          lineColorsArray[lineIndex * 6 + 1] = 0.92;
          lineColorsArray[lineIndex * 6 + 2] = 0;
          lineColorsArray[lineIndex * 6 + 3] = 0;
          lineColorsArray[lineIndex * 6 + 4] = 0.27;
          lineColorsArray[lineIndex * 6 + 5] = 1;
          
          lineIndex++;
        }
      }
    }
    
    // Clear remaining line positions
    for (let i = lineIndex * 6; i < linePositionsArray.length; i++) {
      linePositionsArray[i] = 0;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
  });
  
  return (
    <>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#FFEA00"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
}

function FloatingNodes() {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4
      ] as [number, number, number],
      scale: 0.1 + Math.random() * 0.15,
      color: i % 3 === 0 ? '#FFEA00' : i % 3 === 1 ? '#0044FF' : '#FF0000',
      speed: 0.5 + Math.random() * 0.5
    }));
  }, []);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    
    groupRef.current.children.forEach((child, i) => {
      child.position.y += Math.sin(time * nodes[i].speed + i) * 0.003;
      child.rotation.x = time * 0.2 * nodes[i].speed;
      child.rotation.y = time * 0.3 * nodes[i].speed;
    });
  });
  
  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <octahedronGeometry args={[node.scale, 0]} />
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function NeuralNetwork() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <NeuralParticles />
        <FloatingNodes />
      </Canvas>
    </div>
  );
}
