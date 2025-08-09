import { useEffect, useState, useRef } from "react";
import {
  Navbar, Hero, Features, Viewer, Footer, CTASection
} from "./Components";
import SceneCanvas from "./layout/SceneCanvas";
import LightRays from "./Components/LightRays";
import { colorOptions } from "./data";
import "./App.css";
import { useProgress } from '@react-three/drei';

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

const INITIAL_COLOR = colorOptions[0];
function getColorIndices(selectedIndex, arr) {
  const prev = (selectedIndex - 1 + arr.length) % arr.length;
  const next = (selectedIndex + 1) % arr.length;
  return { prev, next };
}

function LoaderOverlay() {
  const { progress, active } = useProgress();
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [active]);

  if (!active) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: '#000', color: '#fff', display: 'flex',
      alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
      zIndex: 9999
    }}>
      Loading {progress.toFixed(0)}%
    </div>
  );
}

function App() {
  const [fade, setFade] = useState(0);
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const [selectedColor, setSelectedColor] = useState(INITIAL_COLOR);
  const [raysOrigin, setRaysOrigin] = useState("top-center");
  const [viewerInView, setViewerInView] = useState(false);

  const viewerRef = useRef(null);
  const selectedIndex = colorOptions.findIndex(c => c.name === selectedColor.name);
  const { prev, next } = getColorIndices(selectedIndex, colorOptions);

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
      let progressFade = 0;
      const windowH = window.innerHeight;

      sections.forEach(({ el, origin }) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const inView = rect.top < windowH * 0.6 && rect.bottom > windowH * 0.8;
        if (inView && origin) newOrigin = origin;
      });

      if (features) {
        const rect = features.getBoundingClientRect();
        const start = windowH * 0.8;
        const end = windowH * 0.2;
        progressFade = clamp((start - rect.top) / (start - end), 0, 1);
      }

      if (viewer) {
        const rect = viewer.getBoundingClientRect();
        // Start visibility earlier
        const inView = rect.top < windowH * 0.5 && rect.bottom > windowH * 0.5;
        setViewerInView(inView);
        setControlsEnabled(inView);
        if (!inView) setSelectedColor(INITIAL_COLOR);
      }

      setFade(progressFade);
      setRaysOrigin(newOrigin);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main>
      <LoaderOverlay />

      <LightRays raysOrigin={raysOrigin} raysColor="var(--color-secondary-accent)"
        raysSpeed={1} lightSpread={1.2} rayLength={2} pulsating fadeDistance={1.0}
        saturation={1.0} followMouse mouseInfluence={0.1} noiseAmount={0}
        distortion={0} opacity={1 - fade} zIndex={-5} />
      <LightRays raysOrigin={raysOrigin} raysColor="var(--color-secondary-accent)"
        raysSpeed={1} lightSpread={1.2} rayLength={2} pulsating fadeDistance={1.0}
        saturation={1.0} followMouse mouseInfluence={0.1} noiseAmount={0}
        distortion={0} opacity={fade} zIndex={-4} />

      <SceneCanvas
        controlsEnabled={controlsEnabled}
        selectedColor={colorOptions[selectedIndex]}
        prevColor={colorOptions[prev]}
        nextColor={colorOptions[next]}
        inViewer={controlsEnabled}
        viewerInView={viewerInView}
      />

      <Navbar />
      <Hero />
      <Features />
      <Viewer viewerRef={viewerRef} colorOptions={colorOptions}
          selectedColor={selectedColor} setSelectedColor={setSelectedColor}
          prev={prev} next={next} />
      
      <CTASection />
      <Footer />
    </main>
  );
}

export default App;
