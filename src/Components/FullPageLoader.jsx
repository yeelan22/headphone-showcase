// components/LoaderOverlay.jsx
import React from 'react';
import { Html, useProgress } from '@react-three/drei';

export function LoaderOverlay() {
  const { progress } = useProgress();

  return (
    <Html
      fullscreen
      style={{
        backgroundColor: 'black',
        color: 'white',
        display: progress < 100 ? 'flex' : 'none',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        zIndex: 9999,
      }}
    >
      <div style={{ marginBottom: 20 }}>Loading Model... {progress.toFixed(0)}%</div>

      <div
        style={{
          width: '70vw',
          maxWidth: 600,
          height: 12,
          border: '2px solid white',
          borderRadius: 6,
          overflow: 'hidden',
          backgroundColor: '#222',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#ffaa55',
            transition: 'width 0.3s ease-out',
          }}
        />
      </div>
    </Html>
  );
}
