import React, { useRef, useEffect, useState, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Box3, Vector3, TextureLoader } from 'three'

gsap.registerPlugin(ScrollTrigger)

const MODEL_PATH = 'src/assets/headphone/appleHeadphone.glb'

const HeadphoneModel = ({ colorOption, dimmed, animate = true }) => {
  const { scene: originalScene } = useGLTF(MODEL_PATH)
  const modelRef = useRef()
  const [center, setCenter] = useState(new Vector3(0, 0, 0))
  const texture = useLoader(TextureLoader, colorOption.img)

  // Clone the scene for each instance
  const scene = useMemo(() => originalScene.clone(true), [originalScene])

  // Apply texture and dimming
   useEffect(() => {
  if (!scene) return;
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = child.material.clone();
      // If you want to use a solid color:
      child.material.map = null;
      child.material.color.set(colorOption.hex);
      // If you want to use a texture, comment the above two lines and use:
      // child.material.map = texture;
      // child.material.color.set('#fff');
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

  // Calculate model center
  useEffect(() => {
    if (!scene) return
    const box = new Box3().setFromObject(scene)
    const centerVec = new Vector3()
    box.getCenter(centerVec)
    setCenter(centerVec)
  }, [scene])

  // Scroll-based animation with timeline (only for main model, not dimmed)
  useEffect(() => {
    if (!modelRef.current || dimmed || !animate) return

    const model = modelRef.current
    model.position.set(-center.x, -center.y, -center.z)
    model.rotation.set(0, 1.75, 0)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#features',
          start: 'top bottom',
          end: 'top top',
          scrub: 1.5,
        },
      })

      // Stage 1: z = 0 → z = 2
      tl.to(model.position, {
        z: 2 - center.z,
        duration: 1,
        ease: 'power2.inOut',
      })

      // Stage 2: z = 2 → z = -1
      tl.to(model.position, {
        x: -3 + center.x,
        z: -1 - center.z,
        duration: 1,
        ease: 'power3.out',
      })

      // Optional rotation animation over same timeline
      tl.to(
        model.rotation,
        {
          y: -0.9,
          x: -0.02,
          ease: 'power2.out',
          duration: 2, // matches both stages
        },
        0 // start at beginning of timeline
      )
    })

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: '#viewer',
        start: 'top bottom',
        end: 'top top',
        scrub: 2,
      }
    })
    tl2.to(model.position, {
        z: 2 - center.z,
        duration: 1,
        ease: 'power2.inOut',
    })
    tl2.to(model.rotation, {
      y: 1,
      z: 0,
      x: 0,
      duration: 1,
      ease: 'power2.out',
    })
    tl2.to(model.position, {
      z: -2 - center.z,
      y: center.y,
      x: center.x,
      duration: 1,
      ease: 'power3.out',
    })

    return () => ctx.revert()
  }, [center, dimmed, animate])

  // Floating idle animation (only in hero, not dimmed)
  useFrame((state) => {
    if (modelRef.current && !dimmed && animate && window.scrollY < window.innerHeight * 0.9) {
      const floatY = Math.sin(state.clock.elapsedTime * 1.5) * 0.05
      modelRef.current.position.y = -center.y + floatY
    }
  })

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={1.1}
      position={[-center.x, -center.y, -center.z]}
    />
  )
}

useGLTF.preload(MODEL_PATH)
export default HeadphoneModel