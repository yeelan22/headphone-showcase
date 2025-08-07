import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useEffect } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import HeadphoneModel from '../models/HeadphoneModel';
import { ParticleField } from '../Components';

export default function SceneCanvas({ controlsEnabled, selectedColor, prevColor, nextColor, inViewer }) {
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [controlsEnabled]);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100%',
        zIndex: 0,
        pointerEvents: controlsEnabled ? 'auto' : 'none',
      }}
    >
      <ambientLight intensity={0.2} />
      <spotLight position={[0, 19, 5]} angle={0.4} intensity={2.5} color="#ffaa55" />

      <Suspense fallback={null}>
        <ParticleField />
        {inViewer ? (
          <>
            {/* Left (prev) */}
            <group position={[-2.5, 0, 0]} scale={[0.7, 0.7, 0.7]}>
              <HeadphoneModel colorOption={prevColor} dimmed />
            </group>
            {/* Center (selected) */}
            <group position={[0, 0, 0]}  >
              <HeadphoneModel colorOption={selectedColor} />
            </group>
            {/* Right (next) */}
            <group position={[2.5, 0, 0]} scale={[0.7, 0.7, 0.7]}>
              <HeadphoneModel colorOption={nextColor} dimmed />
            </group>
          </>
        ) : (
          <HeadphoneModel colorOption={selectedColor} />
        )}
        <Environment preset="warehouse" />
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        enabled={controlsEnabled}
        enableRotate={controlsEnabled}
        enablePan={false}
        enableZoom={false}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}