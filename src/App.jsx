import { useEffect, useState, useRef } from "react";
import {
  Navbar,
  Hero,
  Features,
  Viewer,
  Footer,
  CTASection,
} from "./Components";
import SceneCanvas from "./layout/SceneCanvas";
import LightRays from "./Components/LightRays";
import { colorOptions } from "./data";
import "./App.css";

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

const INITIAL_COLOR = colorOptions[0];

function getColorIndices(selectedIndex, arr) {
  const prev = (selectedIndex - 1 + arr.length) % arr.length;
  const next = (selectedIndex + 1) % arr.length;
  return { prev, next };
}

function App() {
  const [fade, setFade] = useState(0);
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const [selectedColor, setSelectedColor] = useState(INITIAL_COLOR);
  const [raysOrigin, setRaysOrigin] = useState("top-center");
  const viewerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      const features = document.getElementById("features");
      const viewer = document.getElementById("viewer");
      const cta = document.getElementById("cta");

      const sections = [
        { el: hero, origin: "top-center" },
        { el: features, origin: "left" },
        { el: viewer, origin: "top-center" },
        { el: cta, origin: "top-center" },
      ];

      let newOrigin = "top-center";
      let viewerInView = false;
      let progressFade = 0;

      const windowH = window.innerHeight;

      sections.forEach(({ el, origin }) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const inView = rect.top < windowH * 0.6 && rect.bottom > windowH * 0.4;

        if (inView && origin) {
          newOrigin = origin;
        }
      });

      if (features) {
        const rect = features.getBoundingClientRect();
        const start = windowH * 0.8;
        const end = windowH * 0.2;
        let progress = (start - rect.top) / (start - end);
        progressFade = clamp(progress, 0, 1);
      }

      if (viewer) {
        const rect = viewer.getBoundingClientRect();
        viewerInView = rect.top < windowH * 0.6 && rect.bottom > windowH * 0.4;
      }

      setFade(progressFade);
      setRaysOrigin(newOrigin);
      setControlsEnabled(viewerInView);

      if (!viewerInView) setSelectedColor(INITIAL_COLOR);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const selectedIndex = colorOptions.findIndex(
    (c) => c.name === selectedColor.name
  );
  const { prev, next } = getColorIndices(selectedIndex, colorOptions);

  return (
    <main>
      {/* Light Rays Background (two layers for fade effect) */}
      <LightRays
        raysOrigin={raysOrigin}
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
      <LightRays
        raysOrigin={raysOrigin}
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

      {/* 3D Scene */}
      <SceneCanvas
        controlsEnabled={controlsEnabled}
        selectedColor={colorOptions[selectedIndex]}
        prevColor={colorOptions[prev]}
        nextColor={colorOptions[next]}
        inViewer={controlsEnabled}
      />

      {/* Content Sections */}
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <div id="features">
        <Features />
      </div>
      <div id="viewer">
        <Viewer
          viewerRef={viewerRef}
          colorOptions={colorOptions}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          prev={prev}
          next={next}
        />
      </div>
      <div id="cta">
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}

export default App;
