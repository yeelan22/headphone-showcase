import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import HeadphoneModel from '../models/HeadphoneModel';
import { ParticleField } from '../Components';
import gsap from 'gsap';

export default function SceneCanvas({
  controlsEnabled,
  selectedColor,
  prevColor,
  nextColor,
  inViewer,
  viewerInView,
}) {
  const leftModelRef = useRef();
  const rightModelRef = useRef();
  const [dimmed, setDimmed] = useState(true);

  useEffect(() => {
    setDimmed(!viewerInView);
  }, [viewerInView]);

  // Animate side models
  useEffect(() => {
    if (!leftModelRef.current || !rightModelRef.current) return;
    gsap.to(leftModelRef.current.position, {
      x: inViewer ? -3.2 : -6,
      duration: 1.3,
      ease: "power3.inOut"
    });
    gsap.to(rightModelRef.current.position, {
      x: inViewer ? 3.2 : 6,
      duration: 1.3,
      ease: "power3.inOut"
    });
  }, [inViewer]);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: inViewer ? 5 : 0,
        pointerEvents: controlsEnabled ? 'auto' : 'none',
      }}
    >
      <ambientLight intensity={0.2} />
      <spotLight position={[0, 19, 5]} angle={0.4} intensity={2.5} color="#ffaa55" />

      <React.Suspense fallback={null}>
        <ParticleField />

        <group>
          <group ref={leftModelRef} position={[-6, 0, 0]} scale={[0.4, 0.4, 0.4]}>
            <HeadphoneModel colorOption={prevColor} dimmed={dimmed} />
          </group>
          <group ref={rightModelRef} position={[6, 0, 0]} scale={[0.4, 0.4, 0.4]}>
            <HeadphoneModel colorOption={nextColor} dimmed={dimmed} />
          </group>
          <group position={[0, 0, 0]}>
            <HeadphoneModel colorOption={selectedColor} draggable={controlsEnabled} />
          </group>
        </group>

        <Environment preset="warehouse" />
      </React.Suspense>

      <Preload all />
    </Canvas>
  );
}
