import React from "react";

export const CustomButton = ({ children, icon = true, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      className={`
        relative
        py-2.5 px-8
        rounded-full
        bg-transparent
        border border-primary-accent
        shadow-[0_4px_24px_0_rgba(0,183,194,0.15)]
        transition
        hover:bg-secondary-accent/20
        hover:border-secondary-accent
        active:scale-95
        text-primary-text font-semibold
        text-lg
        flex items-center justify-center gap-2
        z-10
        cursor-pointer
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      {icon && (
        <svg
          className="w-5 h-5 relative z-10 text-highlight"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
};
