import { LightRays } from "./LightRays"
export const Hero = () => {
   return (
    <section className="h-[calc(100vh-72px)] w-full flex items-end">
      <h1 className="gradient-heading absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 text-nowrap -z-2 text-white 	text-5xl md:text-9xl  leading-tight font-bold">
      Hear the Future
      </h1>
      <div className="w-full flex justify-between items-end px-8">
        <div className="flex flex-col text-3xl font-semibold">
            <span>Immersive audio. </span>
            <span>Futuristic design.</span>
            <span className="text-highlight text-4xl">Unmatched experience.</span>
        </div>
         <button
            className="
                glass-shine-border
                relative
                py-2 px-6
                rounded-full
                bg-white/10
                border border-white/30
                shadow-[0_4px_24px_0_rgba(0,0,0,0.15)]
                backdrop-blur-lg
                transition
                hover:bg-white/20
                active:scale-95
                text-white font-semibold
                z-10
                overflow-visible
            "
            >
            <span className="relative z-10">Explore</span>
        </button>
      </div>
    
    </section>
  )
}