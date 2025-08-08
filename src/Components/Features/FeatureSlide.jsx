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
      const fadeInDuration = 1.2
      const fadeOutDuration = 1

      // Initial state: hide all
      stepsRef.current.forEach((step) => {
        if (!step) return
        gsap.set([step.querySelector('.title'), step.querySelector('.desc')], {
          autoAlpha: 0,
          y: 50,
        })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#features',
          start: 'top top',
          end: `+=${window.innerHeight * features.length}`,
          scrub: 2,
          pin: '#features-pin',
          anticipatePin: 1,
          delay: 0.6,
          onUpdate: (self) => {
            const total = features.length
            const stepSize = 1 / total
            const index = Math.min(
              total - 1,
              Math.floor(self.progress / stepSize + 0.001)
            )
            requestAnimationFrame(() => {
              setActiveStep(index + 1) // Sync with stepper
            })
          },
        },
      })

      // Sequential animation
      features.forEach((_, i) => {
        const step = stepsRef.current[i]
        if (!step) return

        const title = step.querySelector('.title')
        const desc = step.querySelector('.desc')

        // Animate current step in
        tl.to(
          [title, desc],
          {
            autoAlpha: 1,
            y: 0,
            duration: fadeInDuration,
            ease: 'power3.out',
            stagger: 0.2,
          },
          '+=0.2'
        )

        // Animate it out (if not last)
        if (i !== features.length - 1) {
          tl.to(
            [title, desc],
            {
              autoAlpha: 0,
              y: -30,
              duration: fadeOutDuration,
              ease: 'power3.inOut',
              stagger: 0.1,
            },
            '+=1.5'
          )
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [setActiveStep])

  return (
    <div ref={containerRef} className="w-full flex items-center justify-center">
      <div className="relative w-full h-72">
        {features.map((feature, i) => (
          <div
            key={feature.step}
            id={`step-${feature.step}`} // 👈 Required for scrollIntoView
            ref={(el) => (stepsRef.current[i] = el)}
            className="absolute inset-0 pr-4 flex flex-col justify-center transition-opacity duration-700 ease-in-out"
          >
            <h3 className="title max-w-[500px] text-2xl md:text-3xl font-semibold bg-animated-gradient animate-gradient text-white">
              {feature.title}
            </h3>
            <p className="desc mt-2 text-base md:text-lg text-secondary-text">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureSlide