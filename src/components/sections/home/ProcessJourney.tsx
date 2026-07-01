"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionReveal from "@/components/ui/SectionReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { about, agency, metrics } from "@/data/data";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessJourney() {
  const processLogo = agency.logoDark;
  const statsLogo   = agency.logoDark;

  const outerRef        = useRef<HTMLElement>(null);
  const stickyRef       = useRef<HTMLDivElement>(null);
  const trackRef        = useRef<HTMLDivElement>(null);
  const stepsContentRef = useRef<HTMLDivElement>(null); // fades out in Phase 2
  const logoRef         = useRef<HTMLDivElement>(null); // THE logo, sibling of stepsContent inside track
  const outroRef        = useRef<HTMLDivElement>(null);
  const logoLandingRef  = useRef<HTMLDivElement>(null);
  const nodeRefs        = useRef<(HTMLDivElement | null)[]>([]);
  const pathRefs        = useRef<(SVGPathElement | null)[]>([]);
  const dotPathRefs     = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const outer        = outerRef.current;
      const track        = trackRef.current;
      const stepsContent = stepsContentRef.current;
      const logo         = logoRef.current;
      const outro        = outroRef.current;
      const logoLanding  = logoLandingRef.current;

      const sticky = stickyRef.current!;

      if (!outer || !track || !stepsContent || !logo || !outro || !logoLanding) return;

      const paths    = pathRefs.current.filter(Boolean) as SVGPathElement[];
      const dotPaths = dotPathRefs.current.filter(Boolean) as SVGPathElement[];

      // Measure as offset from the sticky container's top edge, NOT the viewport.
      // At setup time the section hasn't started sticking yet, so the sticky
      // container could be 1000px below the viewport — viewport-based measurements
      // would be completely wrong. Offset-from-sticky is constant and correct.
      const logoNaturalTop =
        logo.getBoundingClientRect().top - sticky.getBoundingClientRect().top;

      // How far the track must slide left to centre the logo.
      // Compensates for any GSAP x already on the track so it's safe on refresh.
      const getScrollToCenter = () => {
        const rect = logo.getBoundingClientRect();
        const logoW = rect.width || 110;
        const currentTrackX = (gsap.getProperty(track, "x") as number) || 0;
        const naturalLeft = rect.left - currentTrackX;
        return Math.max(0, naturalLeft + logoW / 2 - window.innerWidth / 2);
      };

      // Phase 3 target — where logo.x / logo.y must be (in track coords) so the
      // logo appears exactly over the static landing logo in the outro panel.
      //
      // All Y values are expressed as offsets from the sticky container top so the
      // calculation is correct whether called during sticking or on early refresh.
      const getFlyEndInTrack = () => {
        const r = logoLanding.getBoundingClientRect();
        const stickyTop = sticky.getBoundingClientRect().top;
        return {
          // X: logo is centred (vw/2 - 55) after Phase 1; shift to landing.left
          x: r.left - window.innerWidth / 2 + 55,
          // Y: offset of landing from sticky top, minus offset of logo from sticky top
          y: (r.top - stickyTop) - logoNaturalTop,
        };
      };

      const ctx = gsap.context(() => {
        gsap.set(paths,    { attr: { "stroke-dashoffset": 1 } });
        gsap.set(dotPaths, { attr: { "stroke-dashoffset": 1 } });
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

        paths.forEach((path, i) => {
          const segStart = 0.1 + i * 0.7;
          const segEnd   = segStart + 0.55;
          tl.to(path, { attr: { "stroke-dashoffset": 0 }, ease: "none", duration: segEnd - segStart }, segStart);

          // Traveling segment — leads the drawn stroke
          if (dotPaths[i]) {
            tl.fromTo(
              dotPaths[i],
              { attr: { "stroke-dashoffset": "0" } },
              { attr: { "stroke-dashoffset": "-0.95" }, ease: "none", duration: segEnd - segStart },
              segStart,
            );
          }

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

        // ── Phase 2 (3.4 → 5.0): logo expands to fill screen ───────────────
        // 110px × 16 = 1760px — wider than any typical viewport.
        tl.to(logo, { scale: 8, ease: "power3.in", duration: 1.6 }, 3.4);
        tl.to(stepsContent, { opacity: 0, ease: "power1.in", duration: 0.8 }, 3.8);

        // ── Hold (5.0 → 5.5): logo sits at full scale so the expansion reads ─
        // No tween needed — the timeline just advances with the logo frozen.

        // Outro dark panel fades in while logo is still large (5.0 → 6.2)
        tl.to(outro, { opacity: 1, ease: "power1.out", duration: 1.2 }, 5.0);

        // ── Phase 3 (5.5 → 7.5): logo shrinks and settles at landing spot ───
        // Position and scale use separate tweens so each has its own easing.
        tl.to(logo, {
          x: () => getFlyEndInTrack().x,
          y: () => getFlyEndInTrack().y,
          ease: "power3.inOut",
          duration: 2,
          invalidateOnRefresh: true,
        }, 5.5);

        // back.out overshoot gives the final "settle" feel
        tl.to(logo, { scale: 1, ease: "back.out(1.6)", duration: 2 }, 5.5);

        // Filter inverts as logo shrinks onto the dark outro background
        tl.to(logo, { filter: "invert(1)", ease: "none", duration: 0.5 }, 5.7);

        // ── Phase 4 (7.5 → 8.0): animated logo hands off to static logo ─────
        tl.to(logo, { opacity: 0, duration: 0.5 }, 7.5);
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
          {/* z-[2] keeps the logo above the outro panel during the fly animation.
              pointer-events-none lets clicks through to the outro CTA. */}
          <div
            ref={trackRef}
            className="absolute inset-0 flex items-start will-gpu z-2 pointer-events-none"
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
              <div className="w-80 shrink-0 mr-28 -mt-4">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-5">
                  How We Work
                </p>
                <h2 className="font-heading text-[clamp(2rem,3.5vw,3.5rem)] text-foreground leading-tight mb-8">
                  From Brief<br />to Build.
                </h2>
                <p className="text-xs text-muted-foreground/40 flex items-center gap-2">
                  <span aria-hidden="true">→</span>
                  <span>scroll to explore</span>
                </p>
              </div>

              {/* Step nodes + curvy SVG connectors */}
              {about.process.map((step, i) => (
                <React.Fragment key={step.step}>
                  {/* Odd-indexed steps drop 64 px to create the wave */}
                  <div
                    className="shrink-0 flex flex-col items-center w-64"
                    style={{ marginTop: i % 2 !== 0 ? "64px" : "0" }}
                  >
                    <div
                      ref={(el) => { nodeRefs.current[i] = el; }}
                      className={[
                        "w-14 h-14 rounded-full border flex items-center justify-center",
                        "text-xs font-medium tracking-widest transition-colors duration-300",
                        i === 0
                          ? "bg-foreground text-background border-foreground"
                          : "border-foreground/20 text-muted-foreground",
                      ].join(" ")}
                    >
                      {step.step}
                    </div>
                    <div className="mt-8 text-center px-4">
                      <h3 className="font-heading text-2xl text-foreground mb-3 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </div>

                  {/* Curvy bezier connector between steps */}
                  {i < about.process.length - 1 && (
                    <div
                      className="shrink-0 self-start relative"
                      style={{ width: "140px", height: "56px" }}
                      aria-hidden="true"
                    >
                      <svg
                        width="140"
                        height="140"
                        viewBox="0 0 140 140"
                        fill="none"
                        style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}
                      >
                        {/* faint base path — always visible */}
                        <path
                          d={i % 2 === 0
                            ? "M 0,28 C 70,28 70,92 140,92"
                            : "M 0,92 C 70,92 70,28 140,28"}
                          stroke="var(--foreground)"
                          strokeOpacity="0.1"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        {/* animated draw path */}
                        <path
                          ref={(el) => { pathRefs.current[i] = el; }}
                          d={i % 2 === 0
                            ? "M 0,28 C 70,28 70,92 140,92"
                            : "M 0,92 C 70,92 70,28 140,28"}
                          pathLength="1"
                          strokeDasharray="1"
                          strokeDashoffset="1"
                          stroke="var(--foreground)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                        {/* traveling segment — bright thick cap that leads the draw */}
                        <path
                          ref={(el) => { dotPathRefs.current[i] = el; }}
                          d={i % 2 === 0
                            ? "M 0,28 C 70,28 70,92 140,92"
                            : "M 0,92 C 70,92 70,28 140,28"}
                          pathLength="1"
                          strokeDasharray="0.05 1"
                          strokeDashoffset="1"
                          stroke="var(--foreground)"
                          strokeWidth="5"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
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
