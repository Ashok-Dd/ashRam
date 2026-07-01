"use client";

import { useEffect, useRef } from "react";
import type React from "react";

interface Particle {
  hx: number; hy: number;
  x:  number; y:  number;
  vx: number; vy: number;
}

export default function ParticleLogo({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const particles = useRef<Particle[]>([]);
  const rafRef    = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W   = canvas.offsetWidth;
    const H   = canvas.offsetHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    // ── Draw logo on offscreen canvas & sample ─────────────────────────────
    const buildParticles = async () => {
      const off    = document.createElement("canvas");
      off.width    = W;
      off.height   = H;
      const offCtx = off.getContext("2d");
      if (!offCtx) return;

      // Load the actual logo image (white logo on transparent bg)
      const img = new window.Image();
      img.src   = "/white-logo.png";

      await new Promise<void>((res) => {
        img.onload  = () => res();
        img.onerror = () => res(); // fall back to text if image fails
      });

      if (img.naturalWidth > 0) {
        // Scale logo to fill ~85% width, centred vertically
        const scale = Math.min((W * 0.85) / img.naturalWidth, (H * 0.72) / img.naturalHeight);
        const ix    = (W - img.naturalWidth  * scale) / 2;
        const iy    = (H - img.naturalHeight * scale) / 2;
        offCtx.drawImage(img, ix, iy, img.naturalWidth * scale, img.naturalHeight * scale);
      } else {
        // Fallback: draw wordmark text
        offCtx.fillStyle    = "white";
        offCtx.textAlign    = "center";
        offCtx.textBaseline = "middle";
        const fs = Math.min(W * 0.2, 88);
        offCtx.font = `700 ${fs}px "Clash Display", sans-serif`;
        offCtx.fillText("AshRam", W / 2, H / 2);
      }

      // Sample white/light pixels → particle home positions
      const data = offCtx.getImageData(0, 0, W, H).data;
      const gap  = 3;
      const list: Particle[] = [];

      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          const i = (y * W + x) * 4;
          if (data[i + 3] > 90) { // alpha threshold
            list.push({
              hx: x + (Math.random() - 0.5) * 1.5,
              hy: y + (Math.random() - 0.5) * 1.5,
              // Scatter widely on spawn — they float home on first frames
              x:  Math.random() * W,
              y:  Math.random() * H,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
            });
          }
        }
      }
      particles.current = list;
    };

    // ── Animation loop ──────────────────────────────────────────────────────
    const REPEL_R   = 115;   // repulsion zone radius (px)
    const REPEL_K   = 22;    // push force — strong so particles FLY away
    const SPRING    = 0.016; // very weak spring — particles drift back slowly
    const DAMP      = 0.91;  // high damping to let them coast far
    const P_RADIUS  = 1.1;   // particle dot size

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const p of particles.current) {
        // Cursor repulsion
        const dx   = p.x - mx;
        const dy   = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_R && dist > 0) {
          // Quadratic falloff so particles near cursor get blasted away
          const f = ((REPEL_R - dist) / REPEL_R) ** 2 * REPEL_K;
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }

        // Gentle spring toward home
        p.vx += (p.hx - p.x) * SPRING;
        p.vy += (p.hy - p.y) * SPRING;

        // Velocity damping (high = particles travel far before stopping)
        p.vx *= DAMP;
        p.vy *= DAMP;

        p.x += p.vx;
        p.y += p.vy;

        // Brightness: near-home = bright, displaced = dimmer
        const dd    = Math.sqrt((p.x - p.hx) ** 2 + (p.y - p.hy) ** 2);
        const alpha = Math.max(0.15, 0.9 - dd / 50);

        ctx.fillStyle = `rgba(240,240,240,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, P_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const init = async () => {
      await buildParticles();
      animate();
    };
    init();

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = {
        x: (e.clientX - r.left) * (W / r.width),
        y: (e.clientY - r.top)  * (H / r.height),
      };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };

    canvas.addEventListener("mousemove",  onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove",  onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%", cursor: "default", ...style }}
    />
  );
}
