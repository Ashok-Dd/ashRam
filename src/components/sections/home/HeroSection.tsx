"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { hero, agency } from "@/data/data";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero]", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.9,
        ease: "power2.out",
        delay: 0.15,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-background px-6">
      <div ref={containerRef} className="text-center max-w-2xl mx-auto w-full">


        {/* Headline — moderate, clean size */}
        <h1
          data-hero
          className="font-heading font-semibold text-[clamp(2.6rem,5.5vw,5rem)] leading-[1.08] tracking-tight text-foreground mb-7"
        >
          {hero.headlineLines.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h1>

        {/* Thin accent line */}
        <div data-hero className="flex justify-center mb-7">
          <div className="w-14 h-px bg-foreground/25" />
        </div>

        {/* Subheadline */}
        <p
          data-hero
          className="text-base font-light text-muted-foreground max-w-sm mx-auto leading-relaxed mb-10"
        >
          {hero.subheadline}
        </p>

        {/* CTAs */}
        <div data-hero className="flex flex-wrap items-center justify-center gap-4">
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
