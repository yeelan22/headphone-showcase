import LightRays  from  "./LightRays"
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
            <span className="">Unmatched experience.</span>
        </div>
      <button
        className="
        relative
        py-2.5 px-8
        rounded-full
        bg-[var(--color-background)]
        border border-[var(--color-primary-accent)]
        shadow-[0_4px_24px_0_rgba(0,183,194,0.15)]
        transition
        hover:bg-[var(--color-secondary-accent)]/20
        hover:border-[var(--color-secondary-accent)]
        active:scale-95
        text-[var(--color-primary-text)] font-semibold
        text-lg
        flex items-center gap-2
        z-10
        overflow-visible
        cursor-pointer
      "

    >
      <span className="relative z-10">Explore</span>
      {/* Optional: Add a right arrow icon for emphasis */}
      <svg className="w-5 h-5 relative z-10 text-[var(--color-highlight)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
      </div>
    
    </section>
  )
}