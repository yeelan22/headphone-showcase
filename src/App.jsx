import { Hero, Navbar, LightRays, Features } from './Components'
import SceneCanvas from './layout/SceneCanvas';
import './App.css'

function App() {
  return (
    <main>
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffff"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="fixed left-0 top-0 w-full h-full z-0 pointer-events-none"
      />
      <SceneCanvas />
      <Navbar />
      <Hero />
      <Features />
    </main>
  )
}

export default App