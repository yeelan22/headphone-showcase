import { Sparkles } from '@react-three/drei';
import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function ParticleField() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Fade out BEFORE features is pinned
    const st = ScrollTrigger.create({
      trigger: "#features",
      start: "top bottom", // when features enters viewport
      end: "top 90%",      // adjust this value as needed
      scrub: true,
      onUpdate: (self) => {
        setOpacity(1 - self.progress);
      }
    });

    return () => st.kill();
  }, []);

  return (
    <Sparkles
      count={60}
      scale={[6, 5, 6]}
      size={5}
      speed={0.4}
      color="#FFD580"
      noise={1}
      opacity={opacity}
      transparent
    />
  );
}