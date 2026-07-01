"use client";

import { useRef, useCallback, type ReactNode, type CSSProperties } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  radius?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function SpotlightCard({
  children,
  className = "",
  style,
  radius = 220,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
    el.style.setProperty("--sr", `${radius}px`);
  }, [radius]);

  const onLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "-30%");
  }, []);

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      style={{ ...style, "--mx": "50%", "--my": "-30%", "--sr": `${radius}px` } as CSSProperties}
      onMouseMove={onMove}
      onMouseLeave={() => { onLeave(); onMouseLeave?.(); }}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </div>
  );
}
