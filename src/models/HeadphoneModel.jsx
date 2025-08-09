import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useGLTF, useProgress } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Box3, Vector3, Color } from 'three';

gsap.registerPlugin(ScrollTrigger);

const MODEL_PATH = 'src/assets/headphone/appleHeadphone.glb';

// ⛔ Mesh names that should NOT be colored
const EXCLUDED_MESHES = ['Headrest_Metallic_0'];

const HeadphoneModel = ({ colorOption, dimmed, animate = true, draggable = false }) => {
  const { scene: originalScene } = useGLTF(MODEL_PATH);
  const scene = useMemo(() => originalScene.clone(true), [originalScene]);

  const modelRef = useRef();
  const velocityRef = useRef({ x: 0, y: 0 });

  const [center, setCenter] = useState(new Vector3(0, 0, 0));
  const [ready, setReady] = useState(false);

  const { active: isLoading } = useProgress();

  // Compute center of model
  useEffect(() => {
    if (!scene) return;
    const box = new Box3().setFromObject(scene);
    const centerVec = new Vector3();
    box.getCenter(centerVec);
    setCenter(centerVec);
  }, [scene]);

  // Assign materials & fade in
  useEffect(() => {
    if (!scene || !ready) return;

    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (EXCLUDED_MESHES.includes(child.name)) return;

        child.material = child.material.clone();
        child.material.map = null ; // Remove texture if any
        child.material.color.set(colorOption.hex);
        child.material.needsUpdate = true;
      }
    });
  }, [scene, colorOption.hex, ready]);

  // Animate color change smoothly
  useEffect(() => {
    if (!modelRef.current || !ready) return;

    modelRef.current.traverse((child) => {
      if (child.isMesh && child.material) {
        if (EXCLUDED_MESHES.includes(child.name)) return;

        const targetColor = new Color(colorOption.hex);
        gsap.to(child.material.color, {
          r: targetColor.r,
          g: targetColor.g,
          b: targetColor.b,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    });
  }, [colorOption.hex, ready]);

  // Initial transform setup
  useEffect(() => {
    const model = modelRef.current;
    if (!model) return;

    model.position.set(-center.x, -center.y, -center.z);
    model.rotation.set(0, 1.75, 0);
    model.scale.set(1.1, 1.1, 1.1);

    const timeout = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timeout);
  }, [center]);

  // GSAP scroll-triggered animation
  useEffect(() => {
    if (!modelRef.current || dimmed || !animate || !ready) return;

    const model = modelRef.current;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
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
  }, [center, dimmed, animate, ready]);

  // Floating + Dragging
  useFrame((state) => {
    const model = modelRef.current;
    if (!model || dimmed || !animate) return;

    const floatY = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    model.position.y += floatY * 0.05;

    if (draggable) {
      const { x, y } = velocityRef.current;
      model.rotation.y += x;
      model.rotation.x += y;

      if (state.pointer?.shiftKey) {
        model.rotation.z += x;
      }

      velocityRef.current.x *= 0.9;
      velocityRef.current.y *= 0.9;
    }
  });

  // Handle drag behavior
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

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={1.1}
      position={[-center.x, -center.y, -center.z]}
      visible={ready}
    />
  );
};

useGLTF.preload(MODEL_PATH);

export default HeadphoneModel;