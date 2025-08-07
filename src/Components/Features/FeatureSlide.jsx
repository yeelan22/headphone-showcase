import React, { useRef, useEffect } from 'react'
import { features } from '../../data'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FeatureSlide = ({ setActiveStep }) => {
  const containerRef = useRef()
  const stepsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
        stepsRef.current.forEach((el) => gsap.set(el, { autoAlpha: 0 }))

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#features",
        start: "top top",
        end: `+=${window.innerHeight * features.length}`, // 1 screen per feature
        scrub: true,
        pin: "#features-pin",
        anticipatePin: 1,
        onUpdate: (self) => {
          const index = Math.min(
            features.length - 1,
            Math.floor(self.progress * features.length)
          )
          setActiveStep(index + 1)
        },
      },
    })

    features.forEach((_, i) => {
      timeline.to(stepsRef.current[i], { autoAlpha: 1, duration: 0.2, ease: 'power2.inOut' }, i)
      if (i !== features.length - 1) {
        timeline.to(stepsRef.current[i], { autoAlpha: 0, duration: 0.2, ease: 'power2.inOut' }, i + 0.8)
      }
    })
  }, containerRef)

  return () => ctx.revert()
}, [setActiveStep])
  return (
    <div
      ref={containerRef}
      className="w-full flex items-center justify-center"
    >
      <div className="relative w-full  h-72">
        {features.map((feature, i) => (
          <div
            key={feature.step}
            ref={(el) => (stepsRef.current[i] = el)}
            className="w-full opacity-0 pointer-events-none"
          >
            <h3 className="text-2xl md:text-3xl font-semibold">{feature.title}</h3>
            <p className="text-base md:text-lg text-gray-300 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureSlide