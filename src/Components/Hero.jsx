import { useEffect, useRef } from "react";
import { CustomButton } from "./CustomButton";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const linesRef = useRef([]);
  const buttonRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: -1,
        paused: true,
      });

      linesRef.current.forEach((line) => {
        tl.to(line, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        })
          .to(line, {
            opacity: 0,
            y: -20,
            duration: 1,
            delay: 1,
            ease: "power2.in",
          });
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        once: false,
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.pause(0),
      });

      // Button animation
      gsap.fromTo(
        buttonRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="h-[calc(100vh-72px)] w-full flex flex-col items-center justify-center text-white relative overflow-hidden"
    >
      {/* Gradient Heading */}
      <h1 className="gradient-heading absolute top-20 text-center text-nowrap text-5xl md:text-9xl font-bold -z-10">
        Hear the Future
      </h1>

      {/* Animated Text Lines */}
      <div className="text-3xl md:text-5xl md:text-nowrap font-semibold leading-snug text-primary-text md:mt-20 flex flex-col items-center min-w-[500px]  relative z-20 h-[50px]">
        {["Immersive audio.", "Futuristic design.", "Unmatched experience."].map(
          (text, index) => (
            <span
              key={index}
              ref={(el) => (linesRef.current[index] = el)}
              className="opacity-0 absolute translate-y-5 bg-animated-gradient animate-gradient"
            >
              {text}
            </span>
          )
        )}
      </div>

      {/* Button */}
      <div className="md:mt-8 mt-3 z-20" ref={buttonRef}>
        <CustomButton type="button">Explore Now</CustomButton>
      </div>
    </section>
  );
};
