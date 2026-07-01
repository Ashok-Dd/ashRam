"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { team } from "@/data/data";

function Portrait({ member, index }: { member: typeof team[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -6;
      const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  6;
      gsap.to(el, { rotateX: rx, rotateY: ry, transformPerspective: 1000, duration: 0.5, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "elastic.out(1,0.3)" });

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <Link href="/team" className="group flex flex-col gap-5 flex-1 min-h-0">
      {/* Portrait frame */}
      <div
        ref={cardRef}
        className="relative flex-1 overflow-hidden will-change-transform"
        style={{
          borderRadius: "16px",
          transformStyle: "preserve-3d",
          minHeight: 0,
        }}
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(min-width:1024px) 35vw, 90vw"
          priority
        />

        {/* Bottom gradient so info overlay is legible */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(8,8,8,0.75) 0%, transparent 45%)",
          }}
        />

        {/* Role badge — bottom-left inside the photo */}
        <span
          style={{
            position: "absolute",
            bottom: "1.25rem",
            left: "1.25rem",
            fontSize: "7px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(240,240,240,0.55)",
            fontFamily: '"Satoshi", sans-serif',
          }}
        >
          {member.role}
        </span>

        {/* Ghost number */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "0.5rem",
            right: "1rem",
            fontSize: "5rem",
            color: "rgba(255,255,255,0.05)",
            lineHeight: 1,
            fontFamily: '"Clash Display", sans-serif',
            userSelect: "none",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Name row */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h3
            style={{
              fontFamily: '"Clash Display", sans-serif',
              fontSize: "clamp(1.2rem,2vw,1.75rem)",
              color: "rgba(240,240,240,0.88)",
              lineHeight: 1,
              letterSpacing: "-0.015em",
            }}
          >
            {member.name}
          </h3>
          <p style={{ fontSize: "0.78rem", color: "rgba(240,240,240,0.35)", marginTop: "0.3rem", fontFamily: '"Satoshi", sans-serif' }}>
            {member.shortBio?.split(".")[0]}.
          </p>
        </div>
        <span
          className="transition-transform duration-300 group-hover:translate-x-1"
          style={{ color: "rgba(240,240,240,0.2)", fontSize: "1rem" }}
        >
          →
        </span>
      </div>
    </Link>
  );
}

export default function TeamPreview() {
  return (
    <section
      style={{
        height: "100vh",
        background: "#080808",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        padding: "clamp(4rem,7vw,6rem) clamp(2rem,5vw,5rem) clamp(2rem,4vw,3.5rem)",
      }}
    >
      {/* Top row — label + CTA */}
      <div
        className="flex items-center justify-between shrink-0"
        style={{ marginBottom: "clamp(1.5rem,3vw,3rem)", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1.25rem" }}
      >
        <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(240,240,240,0.28)", fontFamily: '"Satoshi", sans-serif' }}>
          The Team
        </p>
        <Link
          href="/team"
          className="hidden md:inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.28em] transition-opacity duration-200 hover:opacity-80"
          style={{ color: "rgba(240,240,240,0.3)", fontFamily: '"Satoshi", sans-serif' }}
        >
          Meet the full team →
        </Link>
      </div>

      {/* Main — heading left, portraits right */}
      <div className="flex-1 flex gap-12 lg:gap-16 min-h-0 items-stretch">

        {/* Left: heading block */}
        <div className="hidden lg:flex flex-col justify-between shrink-0" style={{ width: "clamp(220px,28vw,360px)" }}>
          <div>
            <h2
              className="font-heading"
              style={{
                fontSize: "clamp(2.4rem,4.5vw,4.5rem)",
                color: "rgba(240,240,240,0.9)",
                lineHeight: 0.9,
                letterSpacing: "-0.025em",
                marginBottom: "1.5rem",
              }}
            >
              Two Minds,
              <br />
              <em style={{ fontStyle: "normal", color: "rgba(240,240,240,0.38)" }}>One Obsession.</em>
            </h2>
            <p style={{ fontSize: "0.85rem", color: "rgba(240,240,240,0.35)", lineHeight: 1.7, maxWidth: "28ch", fontFamily: '"Satoshi", sans-serif' }}>
              A two-person studio obsessed with clean code, thoughtful UX, and products that actually ship.
            </p>
          </div>

          <Link
            href="/team"
            className="btn-fill-outline inline-flex items-center gap-3 px-5 py-2.5 text-[9px] uppercase tracking-[0.25em] border border-white/15 self-start"
          >
            Meet the Team →
          </Link>
        </div>

        {/* Right: 2 portrait cards */}
        <div className="flex flex-1 gap-4 md:gap-6 min-h-0">
          {team.map((member, i) => (
            <Portrait key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
