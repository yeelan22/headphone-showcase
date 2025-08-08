export default function FeatureStepper({ activeStep, setActiveStep }) {
  const steps = [1, 2, 3, 4];

  const handleClick = (index) => {
    const section = document.querySelector(`#step-${index}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveStep(index);
    }
  };

  return (
    <div className="absolute right-6 top-0 z-20 flex items-center h-2/3">
      {/* Stepper Container - Vertically centered block */}
      <div className="relative flex flex-col items-center justify-between h-full pt-12">
        
        {/* 🔧 Responsive Vertical Line from first item to dot */}
        <div className="absolute top-0 bottom-2 left-1/2 w-[2px] bg-gray-800 -translate-x-1/2 z-[-1]" />

        {/* 🔢 Stepper Circles */}
        {steps.map((num) => (
          <button
            key={num}
            onClick={() => handleClick(num)}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
              transition-all duration-300 ease-in-out cursor-pointer
              hover:scale-110 hover:shadow-lg
              ${
                num === activeStep
                  ? 'bg-gradient-to-br from-cyan-400 to-secondary-accent text-white shadow-md'
                  : 'bg-gray-800 text-secondary-text'
              }
            `}
          >
            {num}
          </button>
        ))}

        {/* ✅ Small Bottom Dot */}
        <div className="w-2 h-2 rounded-full bg-secondary-accent mt-2" />
      </div>
    </div>
  );
}