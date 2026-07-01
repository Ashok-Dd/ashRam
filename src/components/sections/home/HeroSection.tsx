"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { agency, hero, metrics } from "@/data/data";

gsap.registerPlugin(ScrollTrigger);

const VIDEOS = ["/intro/intro-1.mp4", "/intro/intro-2.mp4", "/intro/intro-3.mp4"];

export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const videoRefs   = useRef<(HTMLVideoElement | null)[]>([]);
  const activeIndex = useRef(0);

  // ── Video crossfade sequence ─────────────────────────────────────────────
  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
    if (!videos.length) return;

    let destroyed = false;

    const advance = () => {
      if (destroyed) return;
      const current = activeIndex.current;
      const next    = (current + 1) % videos.length;

      gsap.to(videos[current], { opacity: 0, duration: 1.6, ease: "power2.inOut" });
      gsap.to(videos[next],    { opacity: 1, duration: 1.6, ease: "power2.inOut" });

      videos[next].currentTime = 0;
      videos[next].play().catch(() => {});
      activeIndex.current = next;
    };

    videos.forEach((v, i) => {
      v.addEventListener("ended", advance);
      // Only first video plays on load; others sit at opacity 0
      if (i === 0) {
        v.play().catch(() => {});
      } else {
        v.pause();
        v.style.opacity = "0";
      }
    });

    return () => {
      destroyed = true;
      videos.forEach((v) => {
        v.removeEventListener("ended", advance);
        v.pause();
      });
    };
  }, []);

  // ── Entrance animation ────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-h]", {
        opacity: 0,
        y: 28,
        stagger: 0.1,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.4,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ── Scroll parallax on content ────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.8,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden select-none"
      style={{ minHeight: "100svh", background: "#080808" }}
      aria-label="AshRam — Software Development Studio"
    >

      {/* ── Video stack (atmospheric texture) ── */}
      {VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => { videoRefs.current[i] = el; }}
          src={src}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
      ))}

      {/* ── Dark overlay — video becomes watermark texture ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: "linear-gradient(180deg, rgba(8,8,8,0.78) 0%, rgba(8,8,8,0.68) 40%, rgba(8,8,8,0.88) 100%)",
        }}
      />

      {/* ── Film grain ── */}
      <div
        aria-hidden="true"
        className="hero-grain absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* ── Content ── */}
      <div
        ref={contentRef}
        className="relative flex flex-col"
        style={{ zIndex: 10, minHeight: "100svh" }}
      >

        {/* Top bar */}
        <div
          data-h
          className="flex items-center justify-between px-6 md:px-14 lg:px-20"
          style={{ paddingTop: "clamp(6rem,9vw,7.5rem)" }}
        >
          <span
            className="text-[9px] uppercase tracking-[0.35em]"
            style={{ color: "rgba(240,240,240,0.3)" }}
          >
            {agency.name} Studio
          </span>
          <span
            className="hidden sm:block text-[9px] uppercase tracking-[0.35em]"
            style={{ color: "rgba(240,240,240,0.3)" }}
          >
            Est. {agency.founded} · {agency.location}
          </span>
        </div>

        {/* Spacer — pushes content to bottom */}
        <div className="flex-1" />

        {/* ── Top-left statement ── */}
        <div className="px-6 md:px-14 lg:px-20">
          {/* Eyebrow */}
          <div data-h className="flex items-center gap-3 mb-8">
            <div className="h-px w-7 shrink-0" style={{ background: "rgba(240,240,240,0.18)" }} />
            <span
              className="text-[8px] uppercase tracking-[0.35em]"
              style={{ color: "rgba(240,240,240,0.28)" }}
            >
              Software Development Studio
            </span>
          </div>

          <div data-h>
            <p
              className="font-heading leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(3rem,9vw,9rem)", color: "rgba(240,240,240,0.92)" }}
            >
              We Build
            </p>
            <p
              className="font-heading italic font-light leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(3rem,9vw,9rem)", color: "rgba(240,240,240,0.92)" }}
            >
              Software.
            </p>
          </div>
        </div>

        {/* Spacer between the two halves */}
        <div className="flex-1" />

        {/* ── Bottom-right statement + CTAs ── */}
        <div className="px-6 md:px-14 lg:px-20 pb-0">
          <div
            data-h
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "2rem" }}
          >
            {/* Right-aligned headline */}
            <div className="md:order-2 md:text-right">
              <p
                className="font-heading leading-[0.88] tracking-tight"
                style={{ fontSize: "clamp(3rem,9vw,9rem)", color: "rgba(240,240,240,0.92)" }}
              >
                That Moves
              </p>
              <p
                className="font-heading font-light leading-[0.88] tracking-tight"
                style={{ fontSize: "clamp(3rem,9vw,9rem)", color: "rgba(240,240,240,0.92)" }}
              >
                Businesses.
              </p>
            </div>

            {/* Left — description + CTAs */}
            <div data-h className="md:order-1 flex flex-col gap-5 max-w-xs shrink-0 pb-1">
              <p
                className="text-sm font-light leading-relaxed"
                style={{ color: "rgba(240,240,240,0.38)" }}
              >
                {hero.subheadline}
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  href={hero.cta.href}
                  className="btn-fill-outline group inline-flex items-center gap-4 px-6 py-3 text-[9px] uppercase tracking-[0.25em] border border-white/20"
                >
                  {hero.cta.label}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href={hero.secondaryCta.href}
                  className="text-[9px] uppercase tracking-[0.25em] opacity-30 hover:opacity-60 transition-opacity duration-300 px-1 py-1"
                  style={{ color: "#f0f0f0" }}
                >
                  {hero.secondaryCta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics bar */}
        <div
          data-h
          className="flex items-center justify-between flex-wrap gap-4 px-6 md:px-14 lg:px-20 py-5"
        >
          <div className="flex items-center gap-8 md:gap-14">
            {metrics.map((m) => (
              <div key={m.label} className="flex items-baseline gap-1">
                <span
                  className="font-heading font-light text-2xl leading-none"
                  style={{ color: "rgba(240,240,240,0.7)" }}
                >
                  {m.value}{m.suffix}
                </span>
                <span
                  className="text-[8px] uppercase tracking-[0.22em] ml-1"
                  style={{ color: "rgba(240,240,240,0.25)" }}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Scroll nudge */}
          <div
            className="flex items-center gap-2"
            style={{ color: "rgba(240,240,240,0.2)" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            <span className="text-[8px] uppercase tracking-[0.3em]">Scroll</span>
          </div>
        </div>

      </div>
    </section>
  );
}
