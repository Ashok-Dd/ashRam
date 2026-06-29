"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionReveal from "@/components/ui/SectionReveal";
import { testimonials } from "@/data/data";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (idx: number, dir: number) => {
    setDirection(dir);
    setCurrent(idx);
  };

  const prev = () => go((current - 1 + testimonials.length) % testimonials.length, -1);
  const next = () => go((current + 1) % testimonials.length, 1);

  useEffect(() => {
    timerRef.current = setInterval(() => next(), 6000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -50 : 50, opacity: 0 }),
  };

  const t = testimonials[current];

  return (
    <section className="bg-background border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Meta row */}
        <SectionReveal>
          <div className="flex items-center justify-between py-7 border-b border-border">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              What Clients Say
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground tabular-nums">
              {String(current + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(testimonials.length).padStart(2, "0")}
            </p>
          </div>
        </SectionReveal>

        {/* Quote area */}
        <div className="relative py-20 md:py-28">

          {/* Decorative opening quote */}
          <span
            aria-hidden="true"
            className="absolute -top-6 left-0 font-heading text-[18rem] leading-none text-foreground/4 select-none pointer-events-none"
          >
            &ldquo;
          </span>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="will-gpu relative z-10"
            >
              {/* Quote text */}
              <blockquote className="font-heading text-[clamp(1.6rem,3.5vw,2.8rem)] leading-[1.2] tracking-tight text-foreground mb-12 max-w-4xl">
                {t.quote}
              </blockquote>

              {/* Attribution */}
              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-foreground/30 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground leading-tight">{t.author}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.role}, {t.company}</p>
                  </div>
                </div>
                <span className="text-[10px] font-medium uppercase tracking-[0.28em] border border-border px-4 py-2 text-muted-foreground">
                  {t.outcome}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls row */}
          <div className="flex items-center justify-between mt-16">

            {/* Progress lines — active wider */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > current ? 1 : -1)}
                  className={`h-px transition-all duration-300 cursor-pointer ${
                    i === current
                      ? "w-10 bg-foreground"
                      : "w-5 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex gap-3">
              <Button variant="outline" size="icon" onClick={prev} aria-label="Previous testimonial">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </Button>
              <Button variant="outline" size="icon" onClick={next} aria-label="Next testimonial">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
