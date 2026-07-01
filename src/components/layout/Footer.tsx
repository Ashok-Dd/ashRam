"use client";

import Link from "next/link";
import Image from "next/image";
import { agency, footer, contact } from "@/data/data";
import MarqueeStrip from "@/components/ui/MarqueeStrip";

const taglineItems = [
  agency.tagline,
  "Web Development",
  "Mobile Apps",
  "SaaS Products",
  "UI/UX Design",
  "E-Commerce",
  "Brand Identity",
];

export default function Footer() {
  return (
    <footer
      className="overflow-hidden"
      style={{ background: "#080808", color: "#f0f0f0" }}
    >
      {/* Marquee separator */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }} className="py-4">
        <MarqueeStrip
          items={taglineItems}
          speed={20}
          itemClassName="text-[rgba(240,240,240,0.25)]"
        />
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="relative h-8 w-28 mb-6">
              <Image
                src={agency.logoDark}
                alt={agency.name}
                fill
                className="object-contain object-left"
              />
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs mb-4"
              style={{ color: "rgba(240,240,240,0.4)" }}
            >
              {agency.description}
            </p>

            {/* Availability dot */}
            <div className="flex items-center gap-2 mt-6">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#4ade80" }}
              />
              <span
                className="text-[9px] uppercase tracking-[0.2em]"
                style={{ color: "rgba(240,240,240,0.3)" }}
              >
                {contact.availability}
              </span>
            </div>
          </div>

          {/* Link columns */}
          {footer.columns.map((col) => (
            <div key={col.heading}>
              <h4
                className="text-[9px] font-medium uppercase tracking-[0.28em] mb-6"
                style={{ color: "rgba(240,240,240,0.3)" }}
              >
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "rgba(240,240,240,0.5)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "rgba(240,240,240,0.9)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,240,240,0.5)")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p
          className="text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "rgba(240,240,240,0.25)" }}
        >
          {footer.copyright}
        </p>
        <a
          href={`mailto:${contact.email}`}
          className="text-[11px] transition-colors duration-200"
          style={{ color: "rgba(240,240,240,0.35)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(240,240,240,0.75)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,240,240,0.35)")}
        >
          {contact.email}
        </a>
      </div>

      {/*
        Watermark — in-flow at the very bottom, after all content.
        Container height controls exactly how much of the oversized text is visible.
        The footer's overflow:hidden clips the rest cleanly.
        16vw container / 28vw font ≈ 57% of letterforms visible.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none text-center overflow-hidden"
        style={{ height: "14vw" }}
      >
        <span
          className="font-heading font-bold whitespace-nowrap block"
          style={{ fontSize: "18vw", opacity: 0.06, color: "#f0f0f0", lineHeight: 1 }}
        >
          {agency.name}
        </span>
      </div>
    </footer>
  );
}
