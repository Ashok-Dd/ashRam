"use client";

import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";
import Globe from "@/components/ui/Globe";
import { about, agency } from "@/data/data";

export default function AboutPreview() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0a0a0a", paddingTop: "clamp(6rem,10vw,9rem)", paddingBottom: "clamp(5rem,8vw,7rem)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* ── Eyebrow row ── */}
        <SectionReveal>
          <div
            className="flex items-center justify-between pb-6 mb-14 md:mb-20"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.35em]" style={{ color: "rgba(240,240,240,0.3)" }}>
              {about.eyebrow}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em]" style={{ color: "rgba(240,240,240,0.3)" }}>
              Est. {agency.founded} &nbsp;·&nbsp; {agency.location}
            </p>
          </div>
        </SectionReveal>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left — text content */}
          <SectionReveal>
            <div className="flex flex-col gap-8">

              {/* Section heading */}
              <h2
                className="font-heading leading-[0.92] tracking-tight"
                style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "rgba(240,240,240,0.9)" }}
              >
                {about.heading}
              </h2>

              {/* Body */}
              <div className="space-y-4">
                {about.body.map((para, i) => (
                  <p key={i} className="text-sm font-light leading-relaxed" style={{ color: "rgba(240,240,240,0.45)" }}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="border-l pl-5 font-light italic text-sm leading-relaxed"
                style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(240,240,240,0.35)" }}
              >
                &ldquo;{about.manifesto}&rdquo;
              </blockquote>

              <div>
                <Link
                  href="/about"
                  className="btn-fill-outline inline-flex items-center gap-2 px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] border border-white/15"
                >
                  About the Studio
                  <span>→</span>
                </Link>
              </div>
            </div>
          </SectionReveal>

          {/* Right — interactive 3D globe */}
          <SectionReveal delay={0.15}>
            <div className="relative flex flex-col items-center">

              {/* Glow ring behind globe */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)",
                  transform: "scale(1.15)",
                }}
                aria-hidden="true"
              />

              {/* Globe canvas */}
              <Globe className="w-full max-w-120 mx-auto" />


            </div>
          </SectionReveal>
        </div>

      </div>
    </section>
  );
}
