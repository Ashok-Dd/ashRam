"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface PaperTearProps {
  variant?: "dark" | "light";
  className?: string;
  height?: number;
}

export default function PaperTear({ variant = "dark", height = 72, className }: PaperTearProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      style={{ height }}
      className={cn(
        "w-full will-gpu",
        variant === "dark" ? "tear-dark" : "tear-light",
        className
      )}
      aria-hidden="true"
    />
  );
}
