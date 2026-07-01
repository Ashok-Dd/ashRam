"use client";

import { useRef, useEffect, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  text: string;
  className?: string;
  style?: CSSProperties;
  stagger?: number;
  scrub?: boolean;
  start?: string;
  as?: "p" | "h2" | "h3" | "div" | "span" | "blockquote";
}

export default function WordReveal({
  text,
  className = "",
  style,
  stagger = 0.03,
  scrub = false,
  start = "top 82%",
  as: Tag = "p",
}: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const el = containerRef.current;
    if (!el) return;

    const innerSpans = el.querySelectorAll<HTMLSpanElement>("[data-wr-inner]");

    const ctx = gsap.context(() => {
      if (scrub) {
        gsap.fromTo(
          innerSpans,
          { y: "110%" },
          {
            y: "0%",
            stagger,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start,
              end: "bottom 30%",
              scrub: 1,
            },
          }
        );
      } else {
        gsap.from(innerSpans, {
          y: "110%",
          stagger,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [mounted, stagger, scrub, start]);

  const words = text.split(" ");

  return (
    // @ts-expect-error — dynamic tag
    <Tag ref={containerRef} className={className} style={style} aria-label={text}>
      {mounted
        ? words.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-bottom"
              style={{ marginRight: "0.28em" }}
              aria-hidden="true"
            >
              <span
                data-wr-inner
                className="inline-block will-change-transform"
                style={{ transform: "translateY(110%)" }}
              >
                {word}
              </span>
            </span>
          ))
        : text}
    </Tag>
  );
}
