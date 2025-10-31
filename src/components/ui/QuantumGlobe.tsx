import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface QuantumGlobeProps {
  isActive: boolean;
}

export const QuantumGlobe: React.FC<QuantumGlobeProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current || !isActive) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // Create sphere with points
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const vertices = geometry.attributes.position;
    const points: THREE.Vector3[] = [];

    for (let i = 0; i < vertices.count; i++) {
      points.push(
        new THREE.Vector3(
          vertices.getX(i),
          vertices.getY(i),
          vertices.getZ(i)
        )
      );
    }

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00BFFF,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create connecting lines
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x00BFFF,
      transparent: true,
      opacity: 0.3,
    });

    const linesGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const distance = points[i].distanceTo(points[j]);
        if (distance < 0.8) {
          linePositions.push(points[i].x, points[i].y, points[i].z);
          linePositions.push(points[j].x, points[j].y, points[j].z);
        }
      }
    }

    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // Animation loop
    const animate = () => {
      particlesMesh.rotation.x += 0.005;
      particlesMesh.rotation.y += 0.01;
      linesMesh.rotation.x += 0.005;
      linesMesh.rotation.y += 0.01;

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      particlesGeometry.dispose();
      linesGeometry.dispose();
      particlesMaterial.dispose();
      linesMaterial.dispose();
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="flex justify-center items-center py-8">
      <div
        ref={containerRef}
        className="rounded-full overflow-hidden shadow-[0_0_40px_rgba(0,191,255,0.3)]"
      />
    </div>
  );
};
