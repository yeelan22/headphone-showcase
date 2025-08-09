import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useGLTF, useProgress } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Box3, Vector3, Color } from 'three';

gsap.registerPlugin(ScrollTrigger);

const MODEL_PATH = 'src/assets/headphone/appleHeadphone.glb';
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

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setReady(true);
      });
    });
  }, [scene]);

  // Assign materials (unchanged)
  useEffect(() => {
    if (!scene || !ready) return;

    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.map = null;
        if (!EXCLUDED_MESHES.includes(child.name)) {
          child.material.color.set(colorOption.hex);
        }
        child.material.transparent = true;
        child.material.opacity = dimmed ? 0 : 1;
        child.material.needsUpdate = true;
      }
    });
  }, [scene, ready]);

  // Animate color change (unchanged)
  useEffect(() => {
    if (!modelRef.current || !ready) return;

    modelRef.current.traverse((child) => {
      if (child.isMesh && child.material && !EXCLUDED_MESHES.includes(child.name)) {
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

  // Fade in/out when dimmed changes (unchanged)
  useEffect(() => {
    if (!modelRef.current || !ready) return;

    modelRef.current.traverse((child) => {
      if (child.isMesh && child.material) {
        gsap.to(child.material, {
          opacity: dimmed ? 0 : 1,
          duration: 0.6,
          ease: 'power2.out'
        });
      }
    });
  }, [dimmed, ready]);

  // Initial position and scale setup, but scale animates on load
  useEffect(() => {
    if (!modelRef.current || !ready || !center) return;

    const model = modelRef.current;

    model.position.set(-center.x, -center.y, -center.z);
    model.rotation.set(0, 1.75, 0);
    // Start scale smaller for fade-in scaling animation:
    model.scale.set(1.1, 1.1, 1.1);
    model.materialsOpacity = 1; // custom flag for fade in

    // Animate scale and opacity fade-in after ready:
 
    model.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.opacity = 0;
        gsap.to(child.material, {
          opacity: dimmed ? 0 : 1,
          duration: 1.2,
          ease: "power2.out",
          delay: 0,
        });
      }
    });
  }, [center, ready, dimmed]);

  // ScrollTrigger animation for Z position & rotation between sections
  useEffect(() => {
  if (!modelRef.current || !animate || !ready) return;
  const model = modelRef.current;

  const initialPos = new Vector3(-center.x, -center.y, -center.z);
  const featuresPos = new Vector3(-3 - center.x, -center.y, -1);
  const viewerPos = new Vector3(-center.x, -center.y, -1);

  // Immediately set position for consistency
  model.position.copy(initialPos);

  // Flag to track if load animation ran
  let loadAnimationDone = false;

  // Animate scale and rotation on first load ONLY
  gsap.fromTo(model.scale,
    { x: 0.8, y: 0.8, z: 0.8 },
    {
      x: 1.1,
      y: 1.1,
      z: 1.1,
      duration: 1.2,
      ease: "power2.out",
      onComplete: () => { loadAnimationDone = true; },
    }
  );

  gsap.fromTo(model.rotation,
    { x: 0, y: 0, z: 0 },
    {
      x: 0,
      y: 1.75,
      z: 0,
      duration: 1.2,
      ease: "power2.out",
    }
  );

  // ScrollTrigger for hero -> features
  const tlHeroToFeatures = gsap.timeline({
    scrollTrigger: {
      trigger: '#features',
      start: 'top bottom',
      end: 'top center',
      scrub: 1.5,
      onEnterBack: () => {
        // When scrolling back to hero from features,
        // immediately jump to final scale & rotation (no replay)
        if (loadAnimationDone) {
          gsap.set(model.scale, { x: 1.1, y: 1.1, z: 1.1 });
          gsap.set(model.rotation, { x: 0, y: 1.75, z: 0 });
        }
      }
    },
  });

  tlHeroToFeatures
    .to(model.position, {
      z: 2,
      duration: 0.5,
      ease: "power2.inOut",
    })
    .to(model.rotation, {
      y: 1.2, // example rotation during scroll
      duration: 0.7,
      ease: "power2.inOut",
    }, "<0.1")
    .to(model.position, {
      z: featuresPos.z,
      x: featuresPos.x,
      duration: 0.7,
      ease: "power2.inOut",
    }, "<0.1");

  // ScrollTrigger for features -> viewer
  const tlFeaturesToViewer = gsap.timeline({
    scrollTrigger: {
      trigger: '#viewer',
      start: 'top bottom',
      end: 'top center',
      scrub: 1.5,
    },
  });

  tlFeaturesToViewer
    .to(model.position, {
      x: viewerPos.x,
      y: viewerPos.y,
      z: viewerPos.z,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(model.rotation, {
      y: 1.75,
      duration: 1,
      ease: "power2.inOut",
    }, "<");

  return () => {
    tlHeroToFeatures.scrollTrigger?.kill();
    tlFeaturesToViewer.scrollTrigger?.kill();
    tlHeroToFeatures.kill();
    tlFeaturesToViewer.kill();
  };
}, [center, animate, ready]);



  // Floating effect (unchanged)
  useFrame((state) => {
    const model = modelRef.current;
    if (!model || !animate) return;
    const floatY = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    model.position.y += floatY * 0.05;

    if (draggable) {
      const { x, y } = velocityRef.current;
      model.rotation.y += x;
      model.rotation.x += y;
      if (state.pointer?.shiftKey) model.rotation.z += x;
      velocityRef.current.x *= 0.9;
      velocityRef.current.y *= 0.9;
    }
  });

  // Drag handling (unchanged)
  useEffect(() => {
    if (!draggable || !modelRef.current) return;
    let isDragging = false;
    let lastX = 0, lastY = 0;

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
    const onPointerUp = () => { isDragging = false; };

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
      // scale is animated via GSAP, initial scale set in effect
      position={[-center.x, -center.y, -center.z]}
      visible={ready}
    />
  );
};

useGLTF.preload(MODEL_PATH);
export default HeadphoneModel;
