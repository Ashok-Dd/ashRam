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
    enter:  (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  const t = testimonials[current];

  return (
    <section className="bg-surface py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionReveal>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-16">
            Client Words
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end">
          {/* Quote */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="will-gpu"
              >
                <blockquote className="font-heading text-[clamp(1.5rem,4vw,3rem)] leading-[1.1] text-foreground mb-10 max-w-4xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-foreground/30" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                  </div>
                  <span className="ml-4 text-xs border border-border px-3 py-1 text-muted-foreground">
                    {t.outcome}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Counter */}
            <span className="text-xs text-muted-foreground tabular-nums w-12 text-right">
              {String(current + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
            <Button variant="outline" size="icon" onClick={prev}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
            </Button>
            <Button variant="outline" size="icon" onClick={next}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
            </Button>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              className={`w-6 h-px transition-all duration-300 ${
                i === current ? "bg-foreground" : "bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
