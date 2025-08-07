 import { useEffect, useState, useRef } from "react";
import { Navbar, Hero, Features, Viewer } from './Components';
import SceneCanvas from './layout/SceneCanvas';
import LightRays from './Components/LightRays';
import { colorOptions } from './data';
import './App.css';

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

const INITIAL_COLOR = colorOptions[0]; // Space Gray

function getColorIndices(selectedIndex, arr) {
  const prev = (selectedIndex - 1 + arr.length) % arr.length;
  const next = (selectedIndex + 1) % arr.length;
  return { prev, next };
}

function App() {
  const [fade, setFade] = useState(0);
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const [selectedColor, setSelectedColor] = useState(INITIAL_COLOR);
  const viewerRef = useRef(null);

  // Fade logic for LightRays
  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.getElementById("features");
      if (!featuresSection) return;
      const rect = featuresSection.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = windowH * 0.8;
      const end = windowH * 0.2;
      let progress = (start - rect.top) / (start - end);
      progress = clamp(progress, 0, 1);
      setFade(progress);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Controls logic for Viewer section + color reset
  useEffect(() => {
    const handleScroll = () => {
      const viewerSection = document.getElementById("viewer");
      if (!viewerSection) return;
      const rect = viewerSection.getBoundingClientRect();
      const windowH = window.innerHeight;
      const inView = rect.top < windowH * 0.6 && rect.bottom > windowH * 0.4;
      setControlsEnabled(inView);

      // Reset color if not in view
      if (!inView) setSelectedColor(INITIAL_COLOR);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Carousel logic
  const selectedIndex = colorOptions.findIndex(c => c.name === selectedColor.name);
  const { prev, next } = getColorIndices(selectedIndex, colorOptions);
  
  const prevColor = colorOptions[prev];
  const nextColor = colorOptions[next];
  return (
    <main>
      {/* Hero rays */}
      <LightRays
        raysOrigin="top-center"
        raysColor="var(--color-secondary-accent)"
        raysSpeed={1}
        lightSpread={1.2}
        rayLength={2}
        pulsating={true}
        fadeDistance={1.0}
        saturation={1.0}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.0}
        distortion={0.0}
        opacity={1 - fade}
        zIndex={-5}
      />
      {/* Features rays */}
      <LightRays
        raysOrigin="left"
        raysColor="var(--color-secondary-accent)"
        raysSpeed={1}
        lightSpread={1.2}
        rayLength={2}
        pulsating={true}
        fadeDistance={1.0}
        saturation={1.0}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.0}
        distortion={0.0}
        opacity={fade}
        zIndex={-4}
      />
      <SceneCanvas
        controlsEnabled={controlsEnabled}
        selectedColor={colorOptions[selectedIndex]}
        prevColor={colorOptions[prev]}
        nextColor={colorOptions[next]}
        inViewer={controlsEnabled} 
      />
      <Navbar />
      <Hero />
      <Features />
      <Viewer
        viewerRef={viewerRef}
        colorOptions={colorOptions}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        prev={prev}
        next={next}
      />
    </main>
  );
}

export default App;