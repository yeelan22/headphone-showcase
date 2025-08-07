import React, { useState } from 'react'
import FeatureSlide from './FeatureSlide'
import FeatureStepper from './FeatureStepper'

export const Features = () => {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <section
      id="features"
      className="relative w-full h-[400vh] overflow-visible"
    >
      {/* Pin this container */}
      <div
        id="features-pin"
        className="w-full h-screen flex justify-center md:justify-end items-center sticky top-0"
      >
        <div className="w-full md:w-1/2 h-full flex items-start flex-col pt-24 pl-8 z-10">
          <p className="heading text-3xl md:text-4xl font-semibold">Why you'll Love it ?</p>
          <FeatureSlide setActiveStep={setActiveStep} />
        </div>
        <FeatureStepper activeStep={activeStep} />
      </div>
    </section>
  )
}