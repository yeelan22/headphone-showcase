import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import HeadphoneModel from '../models/HeadphoneModel';
import { ParticleField } from '../Components';

export default function SceneCanvas() {
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
            zIndex: 0, // <--- Make sure this is above LightRays
            pointerEvents: 'none', // Optional: so UI is clickable
        }}
>
    
      <ambientLight intensity={0.2} />
      <spotLight position={[0, 19, 5]} angle={0.4} intensity={2.5} color="#ffaa55" />

      <Suspense fallback={null}>
        <ParticleField />
        <HeadphoneModel />
        <Environment preset="warehouse" />
      </Suspense>

      <OrbitControls enableZoom={false} enableRotate={false} />
    </Canvas>
  );
}