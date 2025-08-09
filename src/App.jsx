import { useEffect, useState, useRef } from "react";
import {
  Navbar, Hero, Features, Viewer, Footer, CTASection
} from "./Components";
import SceneCanvas from "./layout/SceneCanvas";
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
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const [selectedColor, setSelectedColor] = useState(INITIAL_COLOR);
  const [viewerInView, setViewerInView] = useState(false);

  const viewerRef = useRef(null);
  const selectedIndex = colorOptions.findIndex(c => c.name === selectedColor.name);
  const { prev, next } = getColorIndices(selectedIndex, colorOptions);

  useEffect(() => {
    const handleScroll = () => {
      const viewer = document.getElementById("viewer");
      const windowH = window.innerHeight;

      if (viewer) {
        const rect = viewer.getBoundingClientRect();
        const inView = rect.top < windowH * 0.1 && rect.bottom > windowH * 0.5;
        setViewerInView(inView);
        setControlsEnabled(inView);
        if (!inView) setSelectedColor(INITIAL_COLOR);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main>
      <LoaderOverlay />

      <SceneCanvas
        controlsEnabled={controlsEnabled}
        selectedColor={colorOptions[selectedIndex]}
        prevColor={colorOptions[prev]}
        nextColor={colorOptions[next]}
        inViewer={controlsEnabled}
        viewerInView={viewerInView}
      />

      <Navbar />

      <section id="hero" style={{ position: "relative", overflow: "hidden" }}>
        <Hero />
      </section>

      <Features />
      <Viewer
        viewerRef={viewerRef}
        colorOptions={colorOptions}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        prev={prev}
        next={next}
      />
      <CTASection />
      <Footer />
    </main>
  );
}

export default App;
