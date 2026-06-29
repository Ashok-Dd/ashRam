"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({ value, suffix = "", duration = 2.5, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const proxy = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        val: value,
        duration,
        ease: "power2.out",
        onUpdate() {
          if (el) el.textContent = Math.floor(proxy.val).toString();
        },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, [value, duration]);

  return (
    <span className={className}>
      <span ref={ref}>0</span>{suffix}
    </span>
  );
}
