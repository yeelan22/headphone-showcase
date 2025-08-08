import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Box3, Vector3, TextureLoader } from 'three';

gsap.registerPlugin(ScrollTrigger);

const MODEL_PATH = 'src/assets/headphone/appleHeadphone.glb';

const HeadphoneModel = ({ colorOption, dimmed, animate = true, draggable = false }) => {
  const { scene: originalScene } = useGLTF(MODEL_PATH);

  const modelRef = useRef();
  const [center, setCenter] = useState(new Vector3(0, 0, 0));
  const texture = useLoader(TextureLoader, colorOption.img);

  const scene = useMemo(() => originalScene.clone(true), [originalScene]);

  // Apply color
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.map = null;
        child.material.color.set(colorOption.hex);
        child.material.needsUpdate = true;

        if (dimmed) {
          // child.material.opacity = 0.5;
          // child.material.transparent = true;
        } else {
          child.material.opacity = 1.0;
          child.material.transparent = false;
        }
      }
    });
  }, [scene, texture, colorOption, dimmed]);

  // Center the model
  useEffect(() => {
    if (!scene) return;
    const box = new Box3().setFromObject(scene);
    const centerVec = new Vector3();
    box.getCenter(centerVec);
    setCenter(centerVec);
  }, [scene]);

  const velocityRef = useRef({ x: 0, y: 0 });

  // Drag behavior
  useEffect(() => {
    if (!draggable || !modelRef.current) return;

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      velocityRef.current.x = deltaX * 0.01;
      velocityRef.current.y = deltaY * 0.01;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [draggable]);

  // GSAP scroll animation (one unified timeline)
  useEffect(() => {
    if (!modelRef.current || dimmed || !animate) return;

    const model = modelRef.current;

    // Set initial pose
    model.position.set(-center.x, -center.y, -center.z);
    model.rotation.set(0, 1.75, 0);
    model.scale.set(1.1, 1.1, 1.1); // constant scale

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: '#hero', // start from hero
          start: 'top top',
          endTrigger: '#viewer',
          end: 'top top',
          scrub: 2,
        },
      })
        .to(model.position, {
          x: -3 + center.x,
          z: -1 - center.z,
          y: -center.y,
          ease: 'power2.inOut',
        }, 0)
        .to(model.rotation, {
          y: -0.9,
          x: -0.02,
          ease: 'power2.out',
        }, 0)
        .to(model.position, {
          x: center.x,
          y: center.y,
          z: -2 - center.z,
          ease: 'power2.out',
        }, 0.6)
        .to(model.rotation, {
          y: 1,
          x: 0,
          z: 0,
          ease: 'power2.out',
        }, 0.6);
    });

    return () => ctx.revert();
  }, [center, dimmed, animate]);

  // Floating + Drag
  useFrame((state) => {
    const model = modelRef.current;
    if (!model || dimmed || !animate) return;

    const floatY = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    model.position.y += floatY * 0.05; // gentle, additive float

    // Drag rotation
    if (draggable) {
      const { x, y } = velocityRef.current;
      model.rotation.y += x;
      model.rotation.x += y;

      if (state.pointer && state.pointer.shiftKey) {
        model.rotation.z += x;
      }

      velocityRef.current.x *= 0.9;
      velocityRef.current.y *= 0.9;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={1.1}
      position={[-center.x, -center.y, -center.z]}
    />
  );
};

useGLTF.preload(MODEL_PATH); 
export default HeadphoneModel;