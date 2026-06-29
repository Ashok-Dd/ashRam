"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionReveal from "@/components/ui/SectionReveal";
import { about, agency } from "@/data/data";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const outerRef  = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef  = useRef<HTMLDivElement>(null);
  const logoRef   = useRef<HTMLDivElement>(null);
  const nodeRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const fillRefs  = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const outer  = outerRef.current;
      const sticky = stickyRef.current;
      const track  = trackRef.current;
      const logo   = logoRef.current;
      if (!outer || !sticky || !track || !logo) return;

      let rafId = 0;
      const ctx = gsap.context(() => {
        rafId = requestAnimationFrame(() => {
          const vw = window.innerWidth;

          // Measure logo position BEFORE any animation (natural layout position)
          const logoRect  = logo.getBoundingClientRect();
          const logoCenter = logoRect.left + logoRect.width / 2;
          const scrollToCenter = Math.max(0, logoCenter - vw / 2);

          const fills = fillRefs.current.filter(Boolean) as HTMLDivElement[];
          gsap.set(fills, { scaleX: 0, transformOrigin: "left center" });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: outer,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.5,
            },
          });

          // Phase 1 (0→6): track slides left until logo is centered
          tl.to(track, { x: -scrollToCenter, ease: "none", duration: 6 }, 0);

          // Path segments + node activations spread across phase 1
          fills.forEach((fill, i) => {
            const segStart = 0.2 + i * 1.35;
            const segEnd   = segStart + 1.1;
            tl.to(fill, { scaleX: 1, ease: "none", duration: segEnd - segStart }, segStart);
            const nextNode = nodeRefs.current[i + 1];
            if (nextNode) {
              tl.to(
                nextNode,
                {
                  backgroundColor: "var(--foreground)",
                  color: "var(--background)",
                  borderColor: "var(--foreground)",
                  ease: "none",
                  duration: 0.15,
                },
                segEnd - 0.05,
              );
            }
          });

          // Phase 2 (6→10): logo stays centered, expands to fill the screen
          // Text scales without pixelation because it's vector-rendered
          tl.to(logo, { scale: 10, ease: "power2.in", duration: 4 }, 6);
          // Subtle opacity pulse on the rest of the track as logo dominates
          tl.to(track, { opacity: 0, ease: "power1.in", duration: 2 }, 7.5);
        });
      });

      return () => {
        cancelAnimationFrame(rafId);
        ctx.revert();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div>
      {/* ── DESKTOP: sticky horizontal scroll ──────────────────────────────── */}
      <section
        ref={outerRef}
        className="hidden md:block relative"
        style={{ height: "500vh" }}
        aria-label="Our development process"
      >
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen overflow-hidden bg-background flex items-center"
        >
          <div
            ref={trackRef}
            className="flex items-start will-gpu"
            style={{
              paddingLeft:  "max(10vw, 3rem)",
              // 50vw ensures logo can always be scrolled to viewport center
              paddingRight: "50vw",
              paddingTop:   "calc(50vh - 5.5rem)",
              width:        "max-content",
            }}
          >
            {/* Intro panel */}
            <div className="w-72 shrink-0 mr-24 -mt-6">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-5">
                How We Work
              </p>
              <h2 className="font-heading text-[clamp(1.8rem,3vw,2.8rem)] text-foreground leading-tight mb-6">
                From Brief<br />to Build.
              </h2>
              <p className="text-xs text-muted-foreground/40 flex items-center gap-2">
                <span aria-hidden="true">→</span>
                <span>scroll to explore</span>
              </p>
            </div>

            {/* Step nodes with animated path segments */}
            {about.process.map((step, i) => (
              <React.Fragment key={step.step}>
                <div className="shrink-0 flex flex-col items-center w-52">
                  <div
                    ref={(el) => { nodeRefs.current[i] = el; }}
                    className={[
                      "w-12 h-12 rounded-full border flex items-center justify-center",
                      "text-xs font-medium transition-colors duration-300",
                      i === 0
                        ? "bg-foreground text-background border-foreground"
                        : "border-foreground/20 text-muted-foreground",
                    ].join(" ")}
                  >
                    {step.step}
                  </div>
                  <div className="mt-7 text-center px-2">
                    <h3 className="font-heading text-xl text-foreground mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>

                {i < about.process.length - 1 && (
                  <div
                    className="shrink-0 relative"
                    style={{ width: "6rem", height: "1px", marginTop: "23px" }}
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 bg-foreground/12" />
                    <div
                      ref={(el) => { fillRefs.current[i] = el; }}
                      className="absolute inset-0 bg-foreground"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}

            {/* Logo endpoint
                Crispness fix: serve at 1200px source via sizes prop, display small via CSS.
                At scale(10) = ~1100px displayed from 1200px source → nearly 1:1 pixel density.
                Color: agency.logoDark = white logo; invert in light mode, keep in dark mode. */}
            <div
              ref={logoRef}
              className="shrink-0 ml-24 flex items-center justify-center"
              style={{ marginTop: "2px" }}
              aria-hidden="true"
            >
              <Image
                src={agency.logoDark}
                alt={agency.name}
                width={1200}
                height={400}
                sizes="1200px"
                className="w-27.5 h-auto object-contain select-none pointer-events-none invert dark:invert-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE: clean vertical fallback ────────────────────────────────── */}
      <section className="md:hidden bg-background py-20">
        <div className="max-w-2xl mx-auto px-6">
          <SectionReveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
              How We Work
            </p>
            <h2 className="font-heading text-[clamp(2rem,6vw,3rem)] text-foreground mb-14">
              From Brief to Build.
            </h2>
          </SectionReveal>

          <div className="relative">
            <div
              className="absolute left-5.5 top-5 bottom-5 w-px bg-foreground/10"
              aria-hidden="true"
            />
            <div className="space-y-0">
              {about.process.map((step, i) => (
                <SectionReveal key={step.step} delay={i * 0.1}>
                  <div className="flex gap-8 pb-12 relative">
                    <div className="w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-medium shrink-0 relative z-10">
                      {step.step}
                    </div>
                    <div className="pt-2 pb-2">
                      <h3 className="font-heading text-2xl text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm font-light text-muted-foreground leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
