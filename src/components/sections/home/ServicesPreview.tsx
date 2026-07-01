"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/data";

gsap.registerPlugin(ScrollTrigger);

// ── Pendulum configs — unique amplitude / period / phase per card ─────────────
const SWING = [
  { a:  2.2, d: 4.2, s: 0.00 },
  { a: -1.8, d: 3.8, s: 0.60 },
  { a:  1.5, d: 4.6, s: 0.30 },
  { a: -2.0, d: 3.5, s: 0.90 },
  { a:  1.9, d: 4.1, s: 0.15 },
  { a: -1.6, d: 3.9, s: 0.70 },
  { a:  2.3, d: 4.4, s: 0.45 },
  { a: -1.7, d: 3.6, s: 0.25 },
];

// ── Service icons ─────────────────────────────────────────────────────────────
const ICONS: Record<string, React.ReactNode> = {
  "web-dev": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  "mobile-dev": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  "saas": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
  "backend": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  "ecommerce": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  "ui-ux": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  "branding": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  "maintenance": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
};

// ── Single hanging card ───────────────────────────────────────────────────────
// swingRef (outer column) — pendulum rotationZ, pivot at 50% 0% (grommet center)
// cardRef  (inner body)   — 3D rotationX/Y tilt on hover only
function HangingCard({
  service,
  index,
}: {
  service: typeof services[0];
  index: number;
}) {
  const swingRef = useRef<HTMLDivElement>(null);
  const cardRef  = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [hovered, setHovered] = useState(false);

  const sw = SWING[index % SWING.length];

  // Idle pendulum — pivot around the grommet/rod point (top-center of swingRef)
  useEffect(() => {
    const el = swingRef.current;
    if (!el) return;
    tweenRef.current = gsap.to(el, {
      rotationZ: sw.a,
      transformOrigin: "50% 0%",
      duration: sw.d,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: sw.s,
    });
    return () => { tweenRef.current?.kill(); };
  }, [sw.a, sw.d, sw.s]);

  const onEnter = () => {
    setHovered(true);
    tweenRef.current?.pause();
    gsap.to(swingRef.current, {
      rotationZ: 0,
      transformOrigin: "50% 0%",
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current!.getBoundingClientRect();
    const cx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
    const cy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    gsap.to(cardRef.current, {
      rotationX: -cy * 6,
      rotationY:  cx * 9,
      transformPerspective: 900,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    setHovered(false);
    gsap.to(cardRef.current, {
      rotationX: 0, rotationY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
    gsap.delayedCall(0.25, () => tweenRef.current?.resume());
  };

  return (
    <div
      ref={swingRef}
      style={{
        width: "clamp(232px, 20vw, 276px)",
        flexShrink: 0,
        position: "relative",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
    >
      {/* ── Grommet / eyelet ──
          Straddling the card's top edge: top:-13px means the top half sits in the rod
          area, bottom half is visible inside the card top.
          background: #080808 matches the section bg → creates the "punched hole" illusion.
          The rod is z:30 in the sticky parent so it renders on top of everything here,
          visually threading through each grommet ring. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-13px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          border: "2.5px solid rgba(185,185,185,0.78)",
          background: "#080808",
          zIndex: 25,
          boxShadow: [
            "inset 0 1.5px 0 rgba(255,255,255,0.3)",
            "inset 0 -1.5px 0 rgba(0,0,0,0.45)",
            "0 2px 10px rgba(0,0,0,0.7)",
            "0 0 0 1.5px rgba(0,0,0,0.35)",
          ].join(", "),
        }}
      />

      {/* Card body */}
      <div ref={cardRef} style={{ width: "100%", willChange: "transform" }}>
        <div
          style={{
            width: "100%",
            height: "clamp(305px, 50vh, 456px)",
            padding:
              "clamp(2.2rem, 2.8vh, 2.8rem) clamp(1.4rem,1.9vw,1.9rem) clamp(1.4rem,1.9vw,1.9rem)",
            background:
              "linear-gradient(158deg, rgba(22,22,24,0.98) 0%, rgba(10,10,12,0.99) 100%)",
            border: "1px solid",
            borderColor: hovered
              ? "rgba(255,255,255,0.12)"
              : "rgba(255,255,255,0.07)",
            borderRadius: "14px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
            transition: "border-color 0.35s ease, box-shadow 0.35s ease",
            boxShadow: hovered
              ? "0 32px 64px rgba(0,0,0,0.78), 0 8px 22px rgba(0,0,0,0.52), inset 0 1px 0 rgba(255,255,255,0.08)"
              : "0 18px 44px rgba(0,0,0,0.62), 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Top-edge shimmer */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0, left: "14%", right: "14%", height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent)",
              pointerEvents: "none",
            }}
          />

          {/* Hover glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0,
              background: hovered
                ? "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.05), transparent 52%)"
                : "none",
              borderRadius: "14px",
              transition: "background 0.35s ease",
              pointerEvents: "none",
            }}
          />

          {/* Ghost number */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute", top: "0.55rem", right: "0.75rem",
              fontFamily: '"Clash Display", sans-serif',
              fontSize: "clamp(2.8rem,4vw,4rem)",
              lineHeight: 1, letterSpacing: "-0.025em",
              color: "rgba(255,255,255,0.04)",
              userSelect: "none", pointerEvents: "none",
            }}
          >
            {service.number}
          </span>

          {/* Icon */}
          <div
            style={{
              width: "38px", height: "38px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "9px",
              color: "rgba(240,240,240,0.48)",
              marginBottom: "clamp(1rem,1.8vh,1.4rem)",
              flexShrink: 0,
            }}
          >
            {ICONS[service.id]}
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: '"Clash Display", sans-serif',
              fontSize: "clamp(0.95rem,1.35vw,1.18rem)",
              color: "rgba(240,240,240,0.9)",
              lineHeight: 1.18,
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
              flexShrink: 0,
            }}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: "0.71rem",
              color: "rgba(240,240,240,0.37)",
              lineHeight: 1.76,
              fontFamily: '"Satoshi", sans-serif',
              flex: 1,
            }}
          >
            {service.description}
          </p>

          {/* Tag pills */}
          <div
            style={{
              display: "flex", flexWrap: "wrap", gap: "4px",
              marginTop: "1.1rem", flexShrink: 0,
            }}
          >
            {service.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "6.5px", letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(240,240,240,0.27)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "9999px",
                  padding: "2.5px 7px",
                  fontFamily: '"Satoshi", sans-serif',
                  flexShrink: 0,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky  = stickyRef.current;
    const track   = trackRef.current;
    if (!section || !sticky || !track) return;

    const ctx = gsap.context(() => {
      const setHeight = () => {
        const scrollableX = track.scrollWidth - sticky.offsetWidth;
        section.style.height =
          `${sticky.offsetHeight + scrollableX + sticky.offsetHeight * 0.25}px`;
      };
      setHeight();
      ScrollTrigger.addEventListener("refreshInit", setHeight);

      const tl = gsap.timeline({ defaults: { ease: "none" } });
      tl.to(track, {
        x: () => -(track.scrollWidth - sticky.offsetWidth + 64),
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 2.2,
        animation: tl,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // ROD_TOP: well below the header block (~220px max) with generous breathing room.
  // Rod height: 8px → rod center = ROD_TOP + 4px.
  // Track top = rod center so card-column top (= grommet center) aligns with rod center.
  const ROD_TOP   = "clamp(285px, 42vh, 385px)";
  const TRACK_TOP = `calc(${ROD_TOP} + 4px)`;

  return (
    <section
      ref={sectionRef}
      style={{ background: "#080808", minHeight: "300vh" }}
    >
      <div
        ref={stickyRef}
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
      >

        {/* ── Section header ── */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            zIndex: 20,
            padding: "clamp(2rem,3.8vw,3.5rem) clamp(2rem,5vw,5rem) 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              paddingBottom: "1.1rem",
              marginBottom: "clamp(1rem,2vw,1.75rem)",
            }}
          >
            <p
              style={{
                fontSize: "9px", letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "rgba(240,240,240,0.28)",
                fontFamily: '"Satoshi", sans-serif',
              }}
            >
              What We Do
            </p>
            <Link
              href="/services"
              style={{
                fontSize: "9px", letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(240,240,240,0.22)",
                fontFamily: '"Satoshi", sans-serif',
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(240,240,240,0.7)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(240,240,240,0.22)")
              }
            >
              All Services →
            </Link>
          </div>

          <h2
            style={{
              fontFamily: '"Clash Display", sans-serif',
              fontSize: "clamp(2.2rem, 4.8vw, 5rem)",
              color: "rgba(240,240,240,0.9)",
              lineHeight: 0.92,
              letterSpacing: "-0.025em",
            }}
          >
            Our Services
          </h2>
        </div>

        {/* ── Metallic rod ──
            z-index: 30 — above the card track (z:6) and all card bodies.
            Renders on top of grommet rings → visually threads through each eyelet,
            exactly like a curtain rod passing through curtain-panel holes. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: ROD_TOP,
            left: "-3%", right: "-3%",
            height: "8px",
            borderRadius: "4px",
            zIndex: 30,
            background:
              "linear-gradient(180deg, #8a8a8a 0%, #d2d2d2 28%, #f0f0f0 50%, #c8c8c8 72%, #7a7a7a 100%)",
            boxShadow: [
              "0 8px 26px rgba(0,0,0,0.75)",
              "0 2px 8px rgba(0,0,0,0.55)",
              "inset 0 3px 0 rgba(255,255,255,0.6)",
              "inset 0 -3px 0 rgba(0,0,0,0.42)",
            ].join(", "),
          }}
        >
          {/* Left wall-mount */}
          <div
            style={{
              position: "absolute",
              left: "2.5%", top: "50%",
              transform: "translateY(-50%)",
              width: "18px", height: "34px",
              background: "linear-gradient(to right, #2e2e2e, #7a7a7a, #484848)",
              borderRadius: "4px",
              boxShadow:
                "-2px 0 12px rgba(0,0,0,0.65), inset 1px 0 1px rgba(255,255,255,0.14)",
            }}
          />
          {/* Right wall-mount */}
          <div
            style={{
              position: "absolute",
              right: "2.5%", top: "50%",
              transform: "translateY(-50%)",
              width: "18px", height: "34px",
              background: "linear-gradient(to left, #2e2e2e, #7a7a7a, #484848)",
              borderRadius: "4px",
              boxShadow:
                "2px 0 12px rgba(0,0,0,0.65), inset -1px 0 1px rgba(255,255,255,0.14)",
            }}
          />
        </div>

        {/* ── Card track ──
            z-index: 6 — behind the rod (z:30).
            paddingTop: 13px gives the grommet ring (which extends 13px above
            TRACK_TOP) its own visual space before each card body begins. */}
        <div
          ref={trackRef}
          style={{
            position: "absolute",
            top: TRACK_TOP,
            left: "clamp(2rem, 5vw, 5rem)",
            display: "flex",
            gap: "clamp(1.5rem, 2.5vw, 2.5rem)",
            zIndex: 6,
            willChange: "transform",
            paddingTop: "13px",
            paddingRight: "clamp(4rem, 8vw, 8rem)",
          }}
        >
          {services.map((svc, i) => (
            <HangingCard key={svc.id} service={svc} index={i} />
          ))}
        </div>

        {/* Left edge fade */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0, left: 0, bottom: 0,
            width: "clamp(1.5rem,4vw,4rem)",
            background: "linear-gradient(to right, #080808, transparent)",
            zIndex: 15, pointerEvents: "none",
          }}
        />
        {/* Right edge fade */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0, right: 0, bottom: 0,
            width: "clamp(80px,12vw,160px)",
            background: "linear-gradient(to left, #080808, transparent)",
            zIndex: 15, pointerEvents: "none",
          }}
        />

        {/* Scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(1.5rem,3vh,2.5rem)",
            left: "50%", transform: "translateX(-50%)",
            display: "flex", alignItems: "center", gap: "0.875rem",
            zIndex: 20, pointerEvents: "none",
          }}
        >
          <div style={{ width: "28px", height: "1px", background: "rgba(240,240,240,0.2)" }} />
          <p
            style={{
              fontSize: "8px", letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(240,240,240,0.2)",
              fontFamily: '"Satoshi", sans-serif',
              whiteSpace: "nowrap",
            }}
          >
            Scroll to explore
          </p>
          <svg
            width="14" height="8" viewBox="0 0 14 8" fill="none"
            style={{ opacity: 0.28 }}
          >
            <style>{`@keyframes arrowSlide{0%,100%{transform:translateX(0)}50%{transform:translateX(4px)}}`}</style>
            <path
              d="M1 4h12M9 1l3 3-3 3"
              stroke="rgba(240,240,240,0.8)"
              strokeWidth="1.2"
              strokeLinecap="round"
              style={{ animation: "arrowSlide 1.6s ease-in-out infinite" }}
            />
          </svg>
          <div style={{ width: "28px", height: "1px", background: "rgba(240,240,240,0.2)" }} />
        </div>

      </div>
    </section>
  );
}
