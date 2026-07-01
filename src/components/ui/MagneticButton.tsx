"use client";

import { useRef, useCallback, type ReactNode } from "react";
import { gsap } from "gsap";

interface Props {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.38,
  radius = 120,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = e.clientX - cx;
    const dy   = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < radius) {
      const pull = (1 - dist / radius) * strength;
      gsap.to(el, { x: dx * pull, y: dy * pull, duration: 0.3, ease: "power2.out" });
    }
  }, [radius, strength]);

  const onLeave = useCallback(() => {
    gsap.to(wrapRef.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`inline-block will-change-transform ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
