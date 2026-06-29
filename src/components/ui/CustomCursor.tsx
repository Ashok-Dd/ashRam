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

  const isHovering = useRef(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", move);

    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      isHovering.current = !!(el.closest("a, button, [data-cursor='hover']"));
    };
    window.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [mx, my]);

  return (
    <>
      {/* Inner dot — snappy */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full will-gpu
                   w-2 h-2 bg-foreground -translate-x-1/2 -translate-y-1/2"
        style={{ x: dotX, y: dotY }}
      />
      {/* Outer ring — lagging */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full will-gpu
                   w-8 h-8 border border-foreground/30 -translate-x-1/2 -translate-y-1/2"
        style={{ x: ringX, y: ringY }}
      />
    </>
  );
}
