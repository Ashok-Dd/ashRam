"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";


interface Props { className?: string }

export default function Globe({ className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef    = useRef(1.82); // start facing India
  const dragging  = useRef(false);
  const lastX     = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w   = canvas.offsetWidth || 480;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width:  w * dpr,
      height: w * dpr,
      phi:    phiRef.current,
      theta:  0.25,
      dark:   1,
      diffuse:       1.1,
      mapSamples:    16000,
      mapBrightness: 5.5,
      baseColor:   [0.16, 0.16, 0.16],
      markerColor: [0.95, 0.95, 0.95],
      glowColor:   [0.12, 0.12, 0.12],
    });

    let raf: number;
    const animate = () => {
      if (!dragging.current) phiRef.current += 0.0025;
      globe.update({ phi: phiRef.current, theta: 0.25 });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // Mouse drag
    const onDown      = (e: MouseEvent) => { dragging.current = true;  lastX.current = e.clientX; };
    const onMove      = (e: MouseEvent) => {
      if (!dragging.current) return;
      phiRef.current += (e.clientX - lastX.current) * 0.006;
      lastX.current = e.clientX;
    };
    const onUp        = () => { dragging.current = false; };

    // Touch drag
    const onTouchStart = (e: TouchEvent) => { dragging.current = true;  lastX.current = e.touches[0].clientX; };
    const onTouchMove  = (e: TouchEvent) => {
      if (!dragging.current) return;
      phiRef.current += (e.touches[0].clientX - lastX.current) * 0.006;
      lastX.current = e.touches[0].clientX;
    };

    canvas.addEventListener("mousedown",  onDown);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("mousemove",  onMove,       { passive: true });
    window.addEventListener("touchmove",  onTouchMove,  { passive: true });
    window.addEventListener("mouseup",    onUp);
    window.addEventListener("touchend",   onUp);

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      canvas.removeEventListener("mousedown",  onDown);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("mouseup",    onUp);
      window.removeEventListener("touchend",   onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", aspectRatio: "1 / 1", cursor: "grab" }}
    />
  );
}
