import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Preload} from '@react-three/drei';
import HeadphoneModel from '../models/HeadphoneModel';
import { ParticleField } from '../Components';


// No LoaderOverlay here anymore
export default function SceneCanvas({
  controlsEnabled,
  selectedColor,
  prevColor,
  nextColor,
  inViewer,
}) {
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

        <group position={[0, 0, 0]}>
          {inViewer && (
            <>
              <group position={[-2.5, 0, 0]} scale={[0.7, 0.7, 0.7]}>
                <HeadphoneModel colorOption={prevColor} dimmed />
              </group>
              <group position={[2.5, 0, 0]} scale={[0.7, 0.7, 0.7]}>
                <HeadphoneModel colorOption={nextColor} dimmed />
              </group>
            </>
          )}
          <group position={[0, 0, 0]}>
            <HeadphoneModel
              colorOption={selectedColor}
              draggable={controlsEnabled}
            />
          </group>
        </group>

        <Environment preset="warehouse" />
      </React.Suspense>
      <Preload all />
    </Canvas>
  );
}
