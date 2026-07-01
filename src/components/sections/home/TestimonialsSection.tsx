"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import ParticleLogo from "@/components/ui/ParticleLogo";
import { testimonials } from "@/data/data";

// ── Initials avatar ──────────────────────────────────────────────────────────
function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: "2.75rem", height: "2.75rem", borderRadius: "50%", flexShrink: 0,
      background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))",
      border: "1px solid rgba(255,255,255,0.12)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "10px", fontWeight: 600, letterSpacing: "0.06em",
      color: "rgba(240,240,240,0.65)", fontFamily: '"Satoshi", sans-serif',
    }}>
      {initials}
    </div>
  );
}

// ── Single testimonial card ──────────────────────────────────────────────────
function Card({ t }: { t: typeof testimonials[0] }) {
  return (
    <div style={{
      height: "100%", padding: "clamp(1.75rem,3vw,2.5rem)",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.09)",
      borderRadius: "20px",
      backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      display: "flex", flexDirection: "column", gap: "1.25rem",
      position: "relative", overflow: "hidden",
      boxSizing: "border-box",
    }}>
      {/* Decorative " */}
      <span aria-hidden="true" style={{
        position: "absolute", top: "0.75rem", right: "1.25rem",
        fontSize: "5rem", lineHeight: 1, color: "rgba(240,240,240,0.035)",
        fontFamily: '"Clash Display", sans-serif', userSelect: "none", pointerEvents: "none",
      }}>&ldquo;</span>

      {/* Stars */}
      <div style={{ display: "flex", gap: "3px", flexShrink: 0 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="rgba(240,200,60,0.7)">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote style={{
        flex: 1, fontSize: "clamp(0.88rem,1.3vw,1.05rem)",
        color: "rgba(240,240,240,0.75)", lineHeight: 1.78,
        fontWeight: 300, fontFamily: '"Satoshi", sans-serif',
        overflow: "hidden",
      }}>
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", flexShrink: 0 }} />

      {/* Author + badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <Avatar name={t.author} />
          <div>
            <p style={{ fontSize: "0.84rem", fontWeight: 500, color: "rgba(240,240,240,0.82)", fontFamily: '"Satoshi", sans-serif' }}>
              {t.author}
            </p>
            <p style={{ fontSize: "0.71rem", color: "rgba(240,240,240,0.38)", marginTop: "2px", fontFamily: '"Satoshi", sans-serif' }}>
              {t.role}, {t.company}
            </p>
          </div>
        </div>
        <span style={{
          fontSize: "7px", letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(240,240,240,0.3)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "9999px", padding: "4px 11px", whiteSpace: "nowrap",
          fontFamily: '"Satoshi", sans-serif', flexShrink: 0,
        }}>
          {t.outcome}
        </span>
      </div>
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  // Explicit pixel width so slots and GSAP always use the same value
  const [cardW, setCardW] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);

  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStart  = useRef(0);
  const isDragging = useRef(false);

  const go = useCallback((idx: number) => {
    setCurrent((idx + testimonials.length) % testimonials.length);
  }, []);

  // Measure viewport width and keep it in sync on resize
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCardW(el.offsetWidth));
    ro.observe(el);
    setCardW(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 6000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  // Slide by exactly one card width (cardW === container.offsetWidth)
  useEffect(() => {
    const track = trackRef.current;
    if (!track || cardW === 0) return;
    gsap.to(track, {
      x: -(current * cardW),
      duration: 0.62,
      ease: "power3.inOut",
    });
  }, [current, cardW]);

  const startDrag = (x: number) => {
    isDragging.current = true;
    dragStart.current  = x;
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const endDrag = (x: number) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = dragStart.current - x;
    if (Math.abs(delta) > 55) go(current + (delta > 0 ? 1 : -1));
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 6000);
  };

  return (
    <section style={{
      background: "#0a0a0a",
      paddingTop: "clamp(5rem,9vw,8rem)",
      paddingBottom: "clamp(5rem,9vw,8rem)",
      overflow: "hidden",
    }}>
      <div
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20"
        style={{ display: "flex", flexDirection: "column", gap: "clamp(2.5rem,4vw,4rem)" }}
      >

        {/* ── Header ── */}
        <div
          className="flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1.25rem" }}
        >
          <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(240,240,240,0.28)", fontFamily: '"Satoshi", sans-serif' }}>
            What Clients Say
          </p>
          <p style={{ fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(240,240,240,0.18)", fontFamily: '"Satoshi", sans-serif' }}>
            {String(current + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </p>
        </div>

        {/* ── Body — explicit height anchors both columns so carousel cards can use height:100% ── */}
        <div style={{
          display: "flex",
          gap: "clamp(2rem,4vw,5rem)",
          alignItems: "stretch",
          height: "clamp(420px,52vh,580px)",
        }}>

          {/* ── LEFT: Particle Logo ── */}
          <div
            className="hidden lg:flex"
            style={{
              width: "clamp(280px,40%,460px)",
              flexShrink: 0,
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div style={{
              flex: 1,
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              background: "#0a0a0a",
              minHeight: 0,
            }}>
              <ParticleLogo className="absolute inset-0" />
            </div>
            
          </div>

          {/* ── RIGHT: Testimonial carousel ── */}
          <div style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
          }}>

            {/* Carousel viewport */}
            <div
              ref={containerRef}
              style={{
                flex: 1,
                minHeight: 0,
                overflow: "hidden",
                position: "relative",
                cursor: "grab",
                userSelect: "none",
              }}
              onMouseDown={(e)  => startDrag(e.clientX)}
              onMouseUp={(e)    => endDrag(e.clientX)}
              onMouseLeave={(e) => endDrag(e.clientX)}
              onTouchStart={(e) => startDrag(e.touches[0].clientX)}
              onTouchEnd={(e)   => endDrag(e.changedTouches[0].clientX)}
            >
              {/* Track: each card is exactly containerWidth wide */}
              <div
                ref={trackRef}
                style={{ display: "flex", height: "100%", willChange: "transform" }}
              >
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    style={{
                      // Explicit pixel width = viewport width → slots are always exactly one step
                      width: cardW > 0 ? cardW : "100%",
                      flexShrink: 0,
                      height: "100%",
                      padding: "0 3px",
                      boxSizing: "border-box",
                    }}
                  >
                    <Card t={t} />
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              {/* Progress pills */}
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    style={{
                      height: "2px", borderRadius: "2px", border: "none", padding: 0,
                      cursor: "pointer", transition: "all 0.35s ease",
                      width: i === current ? "34px" : "14px",
                      background: i === current ? "rgba(240,240,240,0.72)" : "rgba(240,240,240,0.14)",
                    }}
                  />
                ))}
              </div>

              {/* Prev / Next */}
              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  { label: "Previous", d: "M15 18l-6-6 6-6", fn: () => go(current - 1) },
                  { label: "Next",     d: "M9 18l6-6-6-6",   fn: () => go(current + 1) },
                ].map(({ label, d, fn }) => (
                  <button
                    key={label}
                    onClick={fn}
                    aria-label={label}
                    className="btn-fill-outline"
                    style={{ width: "40px", height: "40px", border: "1px solid rgba(255,255,255,0.12)", flexShrink: 0 }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d={d} />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
