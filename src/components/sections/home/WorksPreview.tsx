"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StackedProjects from "@/components/ui/StackedProjects";
import { projects } from "@/data/data";

gsap.registerPlugin(ScrollTrigger);

const featured  = projects.filter((p) => p.featured).slice(0, 3);
const remaining = projects.filter((p) => !p.featured).slice(0, 4);
const TOTAL     = 4; // 3 projects + 1 "view more"

export default function WorksPreview() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>(Array(TOTAL).fill(null));

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null);
    if (cards.length < TOTAL) return;

    const ctx = gsap.context(() => {
      // Card 0 visible; rest sit one viewport below
      gsap.set(cards[0], { x: "0%", y: "0%" });
      for (let i = 1; i < TOTAL; i++) gsap.set(cards[i], { x: "0%", y: "100%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
        },
      });

      // Initial breathe on Card 0
      tl.to({}, { duration: 0.15 });

      // Transition i → i+1:  current exits LEFT, next enters from BOTTOM
      for (let i = 0; i < TOTAL - 1; i++) {
        tl.to(cards[i],     { x: "-108%", duration: 0.22, ease: "power2.inOut" }, ">");
        tl.to(cards[i + 1], { y: "0%",   duration: 0.22, ease: "power3.out"   }, "<");
        tl.to({}, { duration: 0.18 }); // read time on incoming card
      }

      // Hold on "View More", then slide entire panel UP → TeamPreview revealed beneath
      tl.to({}, { duration: 0.12 });
      tl.to(inner, { y: "-100%", duration: 0.45, ease: "power2.inOut" });
    }, outer);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────
          DESKTOP — 500 vh scroll-jacked carousel
          Cards have 2.5 rem margin on all sides, rounded corners & shadow.
          Outer is transparent so TeamPreview (z:1 below) shows through
          the moment the inner panel sweeps up.
      ───────────────────────────────────────────────────────────────── */}
      <div
        ref={outerRef}
        className="hidden lg:block"
        style={{ height: "500vh", position: "relative", background: "transparent" }}
      >
        {/* Sticky shell: transparent, overflow clips the inner as it exits */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            background: "transparent",
          }}
        >
          {/* Inner — translates up on exit */}
          <div
            ref={innerRef}
            style={{ width: "100%", height: "100%", position: "relative", background: "#080808", willChange: "transform" }}
          >
            {/* ── Top label row (always visible) ── */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "space-between",
                padding: "clamp(5rem,8vw,7.5rem) clamp(2.5rem,5vw,5rem) 0",
                zIndex: 30,
                pointerEvents: "none",
              }}
            >
              <span style={{ fontSize: "9px", letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(240,240,240,0.25)" }}>
                Selected Work
              </span>
              <span style={{ fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(240,240,240,0.15)" }}>
                {projects.length} Projects
              </span>
            </div>

            {/* ── Project cards ── */}
            {featured.map((project, i) => (
              <div
                key={project.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "clamp(5.5rem,9vw,8rem) clamp(2.5rem,4vw,4rem) clamp(2rem,3.5vw,3.5rem)",
                }}
              >
                {/* The actual card — smaller than viewport with margins + rounded + shadow */}
                <div
                  className="group"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 40px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Full-bleed image */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(min-width:1024px) 90vw, 100vw"
                    priority={i === 0}
                  />

                  {/* Subtle vignette */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(135deg, rgba(8,8,8,0.08) 0%, rgba(8,8,8,0.25) 100%)",
                    }}
                  />

                  {/* Card counter top-right */}
                  <span
                    style={{
                      position: "absolute",
                      top: "1.75rem",
                      right: "2rem",
                      fontSize: "9px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(240,240,240,0.4)",
                      zIndex: 10,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")} — {String(featured.length).padStart(2, "0")}
                  </span>

                  {/* ── White info shape — bottom-left ── */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "2rem",
                      left: "2rem",
                      zIndex: 10,
                      background: "rgba(255, 255, 255, 0.94)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      borderRadius: "16px",
                      padding: "1.75rem 2.25rem",
                      maxWidth: "min(420px, 45%)",
                    }}
                  >
                    {/* Badge */}
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "7px",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "rgba(8,8,8,0.45)",
                        marginBottom: "0.75rem",
                        fontFamily: '"Satoshi", sans-serif',
                      }}
                    >
                      {project.category} · {project.year}
                    </span>

                    {/* Title */}
                    <h2
                      style={{
                        fontFamily: '"Clash Display", sans-serif',
                        fontSize: "clamp(1.4rem,2.5vw,2.25rem)",
                        color: "#080808",
                        lineHeight: 1,
                        letterSpacing: "-0.025em",
                        marginBottom: "0.6rem",
                      }}
                    >
                      {project.title}
                    </h2>

                    {/* Short desc */}
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "rgba(8,8,8,0.52)",
                        lineHeight: 1.6,
                        marginBottom: "1.25rem",
                        fontFamily: '"Satoshi", sans-serif',
                        fontWeight: 400,
                        maxWidth: "30ch",
                      }}
                    >
                      {project.description.split(".")[0]}.
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "7px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "rgba(8,8,8,0.4)",
                            border: "1px solid rgba(0,0,0,0.12)",
                            borderRadius: "9999px",
                            padding: "2px 9px",
                            fontFamily: '"Satoshi", sans-serif',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA link */}
                    <Link
                      href="/works"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "9px",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: "#080808",
                        fontFamily: '"Satoshi", sans-serif',
                        fontWeight: 500,
                        textDecoration: "none",
                      }}
                    >
                      View Project <span>→</span>
                    </Link>
                  </div>

                  {/* Full-card accessible link */}
                  <Link href="/works" className="absolute inset-0 z-20">
                    <span className="sr-only">View {project.title}</span>
                  </Link>
                </div>
              </div>
            ))}

            {/* ── "View More" card ── */}
            <div
              ref={(el) => { cardRefs.current[3] = el; }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "clamp(5.5rem,9vw,8rem) clamp(2.5rem,4vw,4rem) clamp(2rem,3.5vw,3.5rem)",
              }}
            >
              {/* Premium "View All" card */}
              <Link
                href="/works"
                style={{
                  position: "relative", width: "100%", height: "100%",
                  borderRadius: "20px", overflow: "hidden", display: "block",
                  background: "linear-gradient(135deg, #0f0f0f 0%, #161616 50%, #0a0a0a 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
                  textDecoration: "none",
                }}
                className="group"
              >
                {/* Subtle radial glow top-right */}
                <div aria-hidden="true" style={{
                  position: "absolute", top: "-20%", right: "-10%",
                  width: "50%", aspectRatio: "1",
                  background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />

                {/* ── Top section: counter + heading ── */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0,
                  padding: "clamp(2rem,4vw,3.5rem) clamp(2rem,4vw,3.5rem) 0",
                }}>
                  {/* Eyebrow */}
                  <p style={{
                    fontSize: "8px", letterSpacing: "0.42em", textTransform: "uppercase",
                    color: "rgba(240,240,240,0.22)", marginBottom: "1.5rem",
                    fontFamily: '"Satoshi", sans-serif',
                  }}>
                    More Work
                  </p>

                  {/* Giant counter */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span className="font-heading" style={{
                      fontSize: "clamp(4rem,9vw,9rem)", color: "rgba(240,240,240,0.06)",
                      lineHeight: 1, letterSpacing: "-0.04em", userSelect: "none",
                    }}>
                      {String(projects.length - 3).padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className="font-heading" style={{
                    fontSize: "clamp(2rem,4.5vw,4.5rem)", color: "rgba(240,240,240,0.88)",
                    lineHeight: 0.9, letterSpacing: "-0.03em",
                  }}>
                    More Projects<br />
                    <em style={{ fontStyle: "normal", color: "rgba(240,240,240,0.32)" }}>Awaiting You</em>
                  </h2>
                </div>

                {/* ── Thumbnail grid ── */}
                {remaining.length > 0 && (
                  <div style={{
                    position: "absolute",
                    bottom: "clamp(5rem,8vw,7rem)",
                    left: "clamp(2rem,4vw,3.5rem)",
                    right: "clamp(2rem,4vw,3.5rem)",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "0.5rem",
                  }}>
                    {remaining.slice(0, 4).map((p, i) => (
                      <div key={p.id} style={{
                        aspectRatio: "4/3", position: "relative",
                        borderRadius: "8px", overflow: "hidden",
                        opacity: 0.28 + i * 0.04,
                        transition: "opacity 0.3s ease",
                      }}>
                        <Image src={p.image} alt={p.title} fill className="object-cover" sizes="150px" />
                        {/* Project name on bottom */}
                        <div style={{
                          position: "absolute", inset: 0,
                          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                        }} />
                        <span style={{
                          position: "absolute", bottom: "0.4rem", left: "0.5rem",
                          fontSize: "6px", letterSpacing: "0.15em", textTransform: "uppercase",
                          color: "rgba(240,240,240,0.5)", fontFamily: '"Satoshi", sans-serif',
                        }}>
                          {p.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Bottom CTA bar ── */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "1.25rem clamp(2rem,4vw,3.5rem)",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "rgba(255,255,255,0.01)",
                }}>
                  <span style={{
                    fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase",
                    color: "rgba(240,240,240,0.4)", fontFamily: '"Satoshi", sans-serif',
                  }}>
                    Explore All Work
                  </span>
                  <span
                    className="group-hover:translate-x-1"
                    style={{
                      width: "2.25rem", height: "2.25rem", borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "rgba(240,240,240,0.6)", fontSize: "0.9rem",
                      transition: "all 0.3s ease",
                    }}
                  >
                    →
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <section className="lg:hidden relative" style={{ background: "#080808", padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,3rem) clamp(4rem,8vw,6rem)" }}>
        <div style={{ marginBottom: "clamp(2.5rem,6vw,4rem)" }}>
          <p style={{ color: "rgba(240,240,240,0.3)", fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Selected Work
          </p>
          <h2 className="font-heading" style={{ fontSize: "clamp(2.2rem,8vw,4rem)", color: "rgba(240,240,240,0.9)", lineHeight: 0.9, letterSpacing: "-0.02em" }}>
            Our Portfolio
          </h2>
        </div>
        <StackedProjects projects={featured} />
        <div className="mt-10 text-center">
          <Link href="/works" className="btn-fill-outline inline-flex items-center gap-3 px-7 py-3.5 text-[10px] uppercase tracking-[0.25em] border border-white/15">
            View All Work <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
