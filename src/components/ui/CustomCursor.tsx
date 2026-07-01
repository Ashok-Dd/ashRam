"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const dotX  = useSpring(mx, { stiffness: 600, damping: 30 });
  const dotY  = useSpring(my, { stiffness: 600, damping: 30 });
  const ringX = useSpring(mx, { stiffness: 80,  damping: 20 });
  const ringY = useSpring(my, { stiffness: 80,  damping: 20 });

  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);

      // Position label 18px right of cursor dot
      const lbl = labelRef.current;
      if (lbl) {
        lbl.style.transform = `translate(${e.clientX + 18}px, ${e.clientY - 10}px)`;
      }
    };

    const over = (e: MouseEvent) => {
      const el  = e.target as HTMLElement;
      const lbl = labelRef.current;
      if (!lbl) return;

      const labelHost = el.closest<HTMLElement>("[data-cursor-label]");
      if (labelHost) {
        const text = labelHost.getAttribute("data-cursor-label") || "";
        lbl.textContent = text;
        lbl.classList.add("visible");
      } else {
        lbl.classList.remove("visible");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [mx, my]);

  return (
    <>
      {/* Inner dot — snappy */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full will-gpu w-2 h-2 bg-foreground -translate-x-1/2 -translate-y-1/2"
        style={{ x: dotX, y: dotY }}
      />

      {/* Outer ring — lagging */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full will-gpu w-8 h-8 border border-foreground/30 -translate-x-1/2 -translate-y-1/2"
        style={{ x: ringX, y: ringY }}
      />

      {/* Cursor label pill */}
      <div
        ref={labelRef}
        className="cursor-label"
        aria-hidden="true"
      />
    </>
  );
}
