"use client";

import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";
import { contact } from "@/data/data";

export default function CTABanner() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#080808", paddingTop: "clamp(6rem,12vw,10rem)", paddingBottom: "clamp(6rem,12vw,10rem)" }}
    >
      {/* Subtle noise grain */}
      <div className="hero-grain absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 text-center">

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#4ade80" }}
            aria-hidden="true"
          />
          <span
            className="text-[9px] uppercase tracking-[0.35em] font-medium"
            style={{ color: "rgba(240,240,240,0.35)" }}
          >
            {contact.availability}
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-heading leading-[0.92] tracking-[-0.02em] mb-10"
          style={{ fontSize: "clamp(3rem,8vw,7.5rem)", color: "rgba(240,240,240,0.92)" }}
        >
          Let&apos;s Build Something<br />
          <span className="italic font-light">Remarkable.</span>
        </h2>

        <p
          className="text-sm font-light leading-relaxed max-w-md mx-auto mb-12"
          style={{ color: "rgba(240,240,240,0.4)" }}
        >
          Tell us what you&apos;re building and we&apos;ll tell you how we can help.
        </p>

        {/* Magnetic CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton>
            <Link
              href="/contact"
              className="btn-fill-outline group inline-flex items-center gap-3 px-8 py-4 text-[10px] uppercase tracking-[0.25em] font-medium border border-white/25"
            >
              Let&apos;s Talk
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </MagneticButton>

          <a
            href={`mailto:${contact.email}`}
            className="text-[11px] transition-colors duration-300"
            style={{ color: "rgba(240,240,240,0.3)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(240,240,240,0.75)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,240,240,0.3)")}
          >
            {contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
