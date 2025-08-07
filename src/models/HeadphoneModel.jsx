import React, { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Box3, Vector3 } from 'three'

gsap.registerPlugin(ScrollTrigger)

const HeadphoneModel = () => {
  const { scene } = useGLTF('src/assets/headphone/appleHeadphone.glb')
  const modelRef = useRef()
  const [center, setCenter] = useState(new Vector3(0, 0, 0))

  // Calculate model center
  useEffect(() => {
    if (!scene) return
    const box = new Box3().setFromObject(scene)
    const centerVec = new Vector3()
    box.getCenter(centerVec)
    setCenter(centerVec)
  }, [scene])

  // Scroll-based animation with timeline
  useEffect(() => {
    if (!modelRef.current) return

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

    return () => ctx.revert()
  }, [center])

  // Floating idle animation (only in hero)
  useFrame((state) => {
    if (modelRef.current && window.scrollY < window.innerHeight * 0.9) {
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

useGLTF.preload('src/assets/headphone/appleHeadphone.glb')
export default HeadphoneModel
