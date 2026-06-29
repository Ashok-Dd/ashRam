"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { process as steps } from "@/data/data";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Connecting line draws left-to-right
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Cards stagger in
      gsap.from(cardsRef.current.filter(Boolean), {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-surface py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
            How It Works
          </p>
          <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] text-foreground">
            From Brief to Beautiful
          </h2>
        </div>

        {/* Desktop: 4-column layout with connecting line */}
        <div className="hidden md:block relative">
          {/* Connecting line */}
          <div
            ref={lineRef}
            className="absolute top-8 left-0 right-0 h-px bg-border will-gpu"
            aria-hidden="true"
          />
          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="relative pt-16"
              >
                {/* Step indicator dot */}
                <div className="absolute top-[26px] left-0 w-5 h-5 rounded-full bg-background border-2 border-foreground/30 will-gpu" />
                <span className="font-heading text-[5rem] leading-none text-foreground/8 select-none pointer-events-none block mb-4">
                  {step.number}
                </span>
                <h3
                  className={`font-heading text-xl md:text-2xl text-foreground mb-3 ${
                    i === steps.length - 1 ? "text-foreground" : ""
                  }`}
                >
                  {step.label}
                </h3>
                <p className={`text-sm font-light leading-relaxed text-muted-foreground ${i === steps.length - 1 ? "font-normal" : ""}`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical stack with left border line */}
        <div className="md:hidden relative">
          {/* Vertical connecting line */}
          <div className="absolute top-0 bottom-0 left-3 w-px bg-border" aria-hidden="true" />
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="relative pl-12"
              >
                {/* Dot on vertical line */}
                <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-background border-2 border-foreground/30 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-foreground/40">{i + 1}</span>
                </div>
                <span className="font-heading text-6xl leading-none text-foreground/8 select-none block mb-2">
                  {step.number}
                </span>
                <h3 className="font-heading text-2xl text-foreground mb-2">{step.label}</h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
