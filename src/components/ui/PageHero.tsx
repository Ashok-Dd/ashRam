"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  inverted?: boolean;
  className?: string;
}

export default function PageHero({ eyebrow, heading, subheading, inverted = false, className }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const h = headingRef.current;
    if (!h) return;
    const words = h.textContent?.split(" ") || [];
    h.innerHTML = words
      .map(w => `<span class="inline-block overflow-hidden"><span class="inline-block will-gpu">${w}</span></span>`)
      .join(" ");

    const spans = h.querySelectorAll<HTMLSpanElement>("span > span");
    const ctx = gsap.context(() => {
      gsap.from(eyebrowRef.current, { opacity: 0, y: 12, duration: 0.6, delay: 0.1 });
      gsap.from(spans, {
        y: "105%",
        opacity: 0,
        duration: 0.85,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.25,
      });
      gsap.from(subRef.current, { opacity: 0, y: 16, duration: 0.7, delay: 0.7 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className={cn(
        "pt-36 pb-20 px-6 md:px-12 lg:px-20",
        inverted ? "bg-surface text-foreground" : "bg-background text-foreground",
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {eyebrow && (
          <p
            ref={eyebrowRef}
            className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-8"
          >
            {eyebrow}
          </p>
        )}
        <h1
          ref={headingRef}
          className="font-heading text-[clamp(3rem,8vw,8rem)] leading-[0.88] mb-8"
        >
          {heading}
        </h1>
        {subheading && (
          <p
            ref={subRef}
            className="text-lg font-light text-muted-foreground max-w-xl leading-relaxed"
          >
            {subheading}
          </p>
        )}
      </div>
    </section>
  );
}
