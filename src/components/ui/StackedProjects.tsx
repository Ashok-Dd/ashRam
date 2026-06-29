"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/data";
import { cn } from "@/lib/utils";

type Project = (typeof projects)[number];

interface Props {
  projects: Project[];
  className?: string;
}

const CARD_H = 520;
const PEEK   = 16;
const DEPTH  = 3;

const slideVariants = {
  enter: (d: number) => ({ x: d * 80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (d: number) => ({ x: -d * 80, opacity: 0 }),
};

export default function StackedProjects({ projects, className }: Props) {
  const n = projects.length;
  const [active,    setActive]    = useState(0);
  const [direction, setDirection] = useState(1);
  const [touchX,    setTouchX]    = useState<number | null>(null);

  const next = () => { setDirection(1);  setActive((p) => (p + 1) % n); };
  const prev = () => { setDirection(-1); setActive((p) => (p - 1 + n) % n); };

  const onTouchStart = (e: React.TouchEvent) => setTouchX(e.touches[0].clientX);
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchX === null) return;
    const dx = touchX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 48) dx > 0 ? next() : prev();
    setTouchX(null);
  };

  if (n === 0) return null;

  const containerH = CARD_H + (DEPTH - 1) * PEEK;
  const project    = projects[active];

  return (
    <div className={cn("w-full", className)}>

      {/* ── Stack ───────────────────────────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{ height: `${containerH}px` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Static depth layers (back → middle) */}
        {[DEPTH - 1, DEPTH - 2].map((layerDist) => (
          <div
            key={layerDist}
            className="absolute inset-x-0 bottom-0 rounded-2xl border border-border bg-muted/30"
            style={{
              height         : `${CARD_H}px`,
              zIndex         : DEPTH - layerDist,
              opacity        : 1 - layerDist * 0.22,
              transform      : `translateY(${-layerDist * PEEK}px) scale(${1 - layerDist * 0.032})`,
              transformOrigin: "center bottom",
            }}
          />
        ))}

        {/* Animated front card */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={active}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 bottom-0 rounded-2xl border border-border bg-background overflow-hidden will-gpu"
            style={{ height: `${CARD_H}px`, zIndex: DEPTH + 1 }}
          >
            <div className="flex flex-col md:flex-row h-full">

              {/* Info: bottom on mobile, left on desktop */}
              <div className="md:w-[40%] md:shrink-0 flex flex-col justify-between p-6 md:p-10 order-2 md:order-1">
                <div>
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-foreground/20 text-[11px] font-medium text-muted-foreground mb-5 md:mb-7">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground/55 mb-2">
                    {project.year}&nbsp;·&nbsp;{project.category}
                  </p>
                  <h3 className="font-heading text-[clamp(1.4rem,2.1vw,2.2rem)] text-foreground leading-tight mb-2 md:mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-3">
                    {project.description}
                  </p>
                </div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/35 mt-5">
                  {project.metrics}
                </p>
              </div>

              {/* Image: top on mobile, right on desktop */}
              <div className="relative order-1 md:order-2 flex-1 overflow-hidden h-[220px] md:h-full bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Controls ────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mt-6 md:mt-8">
        <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
          {String(active + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(n).padStart(2, "0")}
        </p>
        {n > 1 && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="w-10 h-10 p-0 flex items-center justify-center"
              onClick={prev}
              aria-label="Previous project"
            >
              ←
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-10 h-10 p-0 flex items-center justify-center"
              onClick={next}
              aria-label="Next project"
            >
              →
            </Button>
          </div>
        )}
      </div>

    </div>
  );
}
