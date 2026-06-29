"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import ScrambleText from "@/components/ui/ScrambleText";
import { hero, agency } from "@/data/data";

// ── timing constants ─────────────────────────────────────────────────────────
const INITIAL_DELAY  = 200;  // ms before the first word starts
const WORD_DURATION  = 400;  // ms each word takes to scramble → settle
// next word fires immediately when the previous finishes (gap = 0)

// ── pre-compute word-level delays ────────────────────────────────────────────
// Flatten all lines into one ordered word array so each word knows its turn.
const allWords = hero.headlineLines.flatMap((line) => line.split(" "));
const totalScrambleMs = INITIAL_DELAY + allWords.length * WORD_DURATION; // ~2600 ms

export default function HeroSection() {
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = subRef.current;
    if (!el) return;
    // Sub-elements fade in after the headline finishes scrambling
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-sub]", {
        opacity: 0,
        y: 14,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        delay: totalScrambleMs / 1000 + 0.1,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  let globalWordIdx = 0; // increments across both lines

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-background px-6 md:px-12">

      <div ref={subRef} className="text-center w-full max-w-5xl mx-auto">

        {/* Headline — word-by-word scramble reveal */}
        <h1
          className="font-heading text-[clamp(2.6rem,5.5vw,5.5rem)] leading-[1.05] tracking-tight text-foreground mb-8"
          aria-label={hero.headlineLines.join(" ")}
        >
          {hero.headlineLines.map((line, li) => (
            <span key={li} className="block md:whitespace-nowrap">
              {line.split(" ").map((word, wi) => {
                const idx   = globalWordIdx++;
                const delay = INITIAL_DELAY + idx * WORD_DURATION;
                // Space is prepended to every word except the first in a line
                // so the space is hidden along with the word it belongs to.
                const display = wi === 0 ? word : ` ${word}`;
                return (
                  <ScrambleText
                    key={wi}
                    text={display}
                    delay={delay}
                    duration={WORD_DURATION}
                    startHidden
                  />
                );
              })}
            </span>
          ))}
        </h1>

        {/* Accent divider */}
        <div data-hero-sub className="flex justify-center mb-7">
          <div className="w-14 h-px bg-foreground/25" />
        </div>

        {/* Subheadline */}
        <p
          data-hero-sub
          className="text-base font-light text-muted-foreground max-w-sm mx-auto leading-relaxed mb-10"
        >
          {hero.subheadline}
        </p>

        {/* CTAs */}
        <div data-hero-sub className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href={hero.cta.href}>{hero.cta.label}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
          </Button>
        </div>

      </div>

      {/* Bottom strip */}
      <div className="absolute bottom-10 inset-x-0 flex items-center justify-between px-6 md:px-20 text-xs text-muted-foreground uppercase tracking-[0.25em]">
        <span>Est. {agency.founded}</span>
        <span>{agency.location}</span>
      </div>

    </section>
  );
}
