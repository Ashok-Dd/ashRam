"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionReveal from "@/components/ui/SectionReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { about, agency, metrics } from "@/data/data";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessJourney() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const processLogo = (!mounted || resolvedTheme === "dark") ? agency.logoDark : agency.logoLight;
  const statsLogo   = (!mounted || resolvedTheme === "dark") ? agency.logoLight : agency.logoDark;

  const outerRef        = useRef<HTMLElement>(null);
  const stickyRef       = useRef<HTMLDivElement>(null);
  const trackRef        = useRef<HTMLDivElement>(null);
  const stepsContentRef = useRef<HTMLDivElement>(null); // fades out in Phase 2
  const logoRef         = useRef<HTMLDivElement>(null); // THE logo, sibling of stepsContent inside track
  const outroRef        = useRef<HTMLDivElement>(null);
  const logoLandingRef  = useRef<HTMLDivElement>(null);
  const nodeRefs        = useRef<(HTMLDivElement | null)[]>([]);
  const fillRefs        = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const outer        = outerRef.current;
      const track        = trackRef.current;
      const stepsContent = stepsContentRef.current;
      const logo         = logoRef.current;
      const outro        = outroRef.current;
      const logoLanding  = logoLandingRef.current;

      if (!outer || !track || !stepsContent || !logo || !outro || !logoLanding) return;

      const fills = fillRefs.current.filter(Boolean) as HTMLDivElement[];

      // Logo's natural viewport top — captured once before any GSAP transforms.
      // Track has no vertical translation so this stays constant during Phase 1.
      const logoNaturalTop = logo.getBoundingClientRect().top;

      // How far the track must slide left to centre the logo.
      // Compensates for any GSAP x already on the track so it's safe on refresh.
      const getScrollToCenter = () => {
        const rect = logo.getBoundingClientRect();
        const logoW = rect.width || 110;
        const currentTrackX = (gsap.getProperty(track, "x") as number) || 0;
        const naturalLeft = rect.left - currentTrackX;
        return Math.max(0, naturalLeft + logoW / 2 - window.innerWidth / 2);
      };

      // Phase 3 target — where logo.x / logo.y must be (in track coords) for the
      // logo to appear over the landing element in the outro panel.
      //
      // Because the track has `position:absolute left:0` and no y-translation,
      // logo's viewport x = logo.naturalLeft + track.x + logo.x_gsap
      // After Phase 1: logo.naturalLeft + track.x = vw/2 - 55  (centred)
      // So target logo.x_gsap = landing.left - (vw/2 - 55) = landing.left - vw/2 + 55
      //    target logo.y_gsap = landing.top  - logoNaturalTop
      const getFlyEndInTrack = () => {
        const r = logoLanding.getBoundingClientRect();
        return {
          x: r.left - window.innerWidth / 2 + 55,
          y: r.top  - logoNaturalTop,
        };
      };

      const ctx = gsap.context(() => {
        gsap.set(fills, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(outro, { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outer,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });

        // ── Phase 1 (0 → 3): track slides left until logo reaches centre ──────
        // Logo is inside the track so it moves automatically — no extra tween.
        tl.to(track, {
          x: () => -getScrollToCenter(),
          ease: "none",
          duration: 3,
          invalidateOnRefresh: true,
        }, 0);

        fills.forEach((fill, i) => {
          const segStart = 0.1 + i * 0.7;
          const segEnd   = segStart + 0.55;
          tl.to(fill, { scaleX: 1, ease: "none", duration: segEnd - segStart }, segStart);
          const nextNode = nodeRefs.current[i + 1];
          if (nextNode) {
            tl.to(nextNode, {
              backgroundColor: "var(--foreground)",
              color: "var(--background)",
              borderColor: "var(--foreground)",
              ease: "none",
              duration: 0.12,
            }, segEnd - 0.04);
          }
        });

        // ── Phase 2 (3.4 → 5): logo expands; steps fade ─────────────────────
        // Small gap 3 → 3.4 gives breathing room after the scroll stops.
        tl.to(logo, { scale: 8, ease: "power2.in", duration: 1.5 }, 3.4);
        tl.to(stepsContent, { opacity: 0, ease: "power1.in", duration: 0.8 }, 3.8);

        // ── Phase 3 (4.9 → 6.9): logo flies from centre to landing spot ──────
        tl.to(logo, {
          x: () => getFlyEndInTrack().x,
          y: () => getFlyEndInTrack().y,
          scale: 1,
          ease: "power3.inOut",
          duration: 2,
          invalidateOnRefresh: true,
        }, 4.9);

        tl.to(logo, { filter: "invert(1)", ease: "none", duration: 0.4 }, 5.6);
        tl.to(outro, { opacity: 1, ease: "power2.out", duration: 1.5 }, 5.2);

        // ── Phase 4 (6.9 → 7.4): animated logo hands off to static logo ──────
        tl.to(logo, { opacity: 0, duration: 0.5 }, 6.9);
      });

      const onLoad = () => ScrollTrigger.refresh();
      if (document.readyState === "complete") {
        ScrollTrigger.refresh();
      } else {
        window.addEventListener("load", onLoad, { once: true });
      }

      return () => {
        window.removeEventListener("load", onLoad);
        ctx.revert();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div>
      {/* ── DESKTOP ──────────────────────────────────────────────────────────── */}
      <section
        ref={outerRef}
        className="hidden md:block relative"
        style={{ height: "700vh" }}
        aria-label="How we work"
      >
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen overflow-hidden bg-background"
        >

          {/* ── Horizontal track ─────────────────────────────────────────────── */}
          <div
            ref={trackRef}
            className="absolute inset-0 flex items-start will-gpu"
            style={{
              paddingLeft:  "max(10vw, 3rem)",
              paddingRight: "50vw",
              paddingTop:   "calc(50vh - 5.5rem)",
              width: "max-content",
            }}
          >
            {/* Steps content — fades out in Phase 2 while logo stays */}
            <div ref={stepsContentRef} className="flex items-start">
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

              {/* Step nodes + connecting path segments */}
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
            </div>

            {/* THE logo — sibling of stepsContent so it survives the fade.
                Moves with the track during Phase 1, then GSAP drives scale + fly. */}
            <div
              ref={logoRef}
              className="shrink-0 ml-24 flex items-center justify-center will-gpu"
              style={{ marginTop: "2px" }}
              aria-hidden="true"
            >
              <Image
                src={processLogo}
                alt={agency.name}
                width={1200}
                height={400}
                sizes="1200px"
                priority
                className="w-27.5 h-auto object-contain select-none pointer-events-none"
              />
            </div>
          </div>

          {/* ── Stats outro (fades in as logo lands) ─────────────────────────── */}
          <div
            ref={outroRef}
            className="absolute inset-0 bg-foreground text-background flex flex-col justify-center will-gpu"
            style={{ opacity: 0, padding: "6vh max(10vw, 5rem)" }}
            aria-hidden="true"
          >
            {/* Static logo — animated logo hands off here at Phase 4 */}
            <div ref={logoLandingRef} className="mb-10">
              <Image
                src={statsLogo}
                alt={agency.name}
                width={400}
                height={133}
                sizes="400px"
                priority
                className="w-27.5 h-auto object-contain select-none"
              />
            </div>

            <p className="text-xs font-medium uppercase tracking-[0.3em] text-background/40 mb-12">
              The Numbers
            </p>

            <div className="grid grid-cols-3 gap-0 divide-x divide-background/10 mb-14">
              {metrics.map((m) => (
                <div key={m.label} className="px-10 first:pl-0 last:pr-0">
                  <div className="font-heading text-[clamp(3rem,7vw,7rem)] leading-none text-background mb-3">
                    <AnimatedCounter value={m.value} suffix={m.suffix} />
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-background/45">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="font-heading text-[clamp(2rem,4vw,4rem)] text-background mb-10 max-w-xl leading-tight">
              Built to Last.
            </h2>

            <Button asChild size="lg" variant="inverted">
              <Link href="/works">See Our Work</Link>
            </Button>
          </div>

        </div>
      </section>

      {/* ── MOBILE: vertical process ──────────────────────────────────────────── */}
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
            <div className="absolute left-5.5 top-5 bottom-5 w-px bg-foreground/10" aria-hidden="true" />
            <div className="space-y-0">
              {about.process.map((step, i) => (
                <SectionReveal key={step.step} delay={i * 0.1}>
                  <div className="flex gap-8 pb-12 relative">
                    <div className="w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-medium shrink-0 relative z-10">
                      {step.step}
                    </div>
                    <div className="pt-2">
                      <h3 className="font-heading text-2xl text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm font-light text-muted-foreground leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE: stats ────────────────────────────────────────────────────── */}
      <section className="md:hidden bg-foreground text-background py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <SectionReveal>
            <Image
              src={statsLogo}
              alt={agency.name}
              width={200}
              height={67}
              className="w-24 h-auto mb-14"
            />
          </SectionReveal>

          <p className="text-xs font-medium uppercase tracking-[0.3em] text-background/40 mb-12">
            The Numbers
          </p>

          <div className="space-y-10 mb-16">
            {metrics.map((m, i) => (
              <SectionReveal key={m.label} delay={i * 0.1}>
                <div>
                  <div className="font-heading text-6xl text-background leading-none mb-2">
                    <AnimatedCounter value={m.value} suffix={m.suffix} />
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-background/45">{m.label}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <h2 className="font-heading text-4xl text-background mb-10 leading-tight">Built to Last.</h2>
            <Button asChild size="lg" variant="inverted">
              <Link href="/works">See Our Work</Link>
            </Button>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
