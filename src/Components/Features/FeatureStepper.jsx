export default function FeatureStepper({ activeStep }) {
  return (
    <div className="flex flex-col items-center gap-2 absolute right-12 top-1/2 -translate-y-1/2 z-20">
      {[1, 2, 3, 4].map((num) => (
        <div
          key={num}
          className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-bold mb-2
          ${num === activeStep ? 'bg-yellow-300 text-black border-yellow-300' : 'bg-transparent text-white border-gray-500'}`}
        >
          {num}
        </div>
      ))}
    </div>
  )
}
