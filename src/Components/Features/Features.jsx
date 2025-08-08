import React, { useState } from 'react'
import FeatureSlide from './FeatureSlide'
import FeatureStepper from './FeatureStepper'

export const Features = () => {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <section id="features" className="relative w-full h-[400vh] overflow-visible px-3 md:px-4">
      <div
        id="features-pin"
        className="relative w-full h-screen flex justify-center md:justify-end items-center sticky top-0"
      >
        {/* Left content */}
        <div className="w-full md:w-1/2 h-full flex flex-col items-start pt-20 pl-4 md:pl-8 z-10">
          <p className="heading text-3xl md:text-4xl font-semibold text-center md:text-left">
            Why you'll Love it ?
          </p>
          <FeatureSlide setActiveStep={setActiveStep} />
        </div>

        {/* Stepper */}
        <FeatureStepper activeStep={activeStep} setActiveStep={setActiveStep} />

      </div>
    </section>
  )
}