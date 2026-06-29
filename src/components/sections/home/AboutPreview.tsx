import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionReveal from "@/components/ui/SectionReveal";
import { about, agency } from "@/data/data";

export default function AboutPreview() {
  return (
    <section className="bg-background py-24 md:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* ── Meta row ─────────────────────────────────────────────────────── */}
        <SectionReveal>
          <div className="flex items-center justify-between pb-7 border-b border-border mb-14 md:mb-20">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              {about.eyebrow}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              Est. {agency.founded} &nbsp;·&nbsp; {agency.location}
            </p>
          </div>
        </SectionReveal>

        {/* ── Large heading ────────────────────────────────────────────────── */}
        <SectionReveal delay={0.08}>
          <h2 className="font-heading text-[clamp(2.6rem,6.5vw,6.5rem)] text-foreground leading-[0.93] tracking-tight mb-16 md:mb-24 max-w-5xl">
            {about.heading}
          </h2>
        </SectionReveal>

        {/* ── Content row ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-10 border-t border-border">

          {/* Body paragraphs */}
          <SectionReveal className="md:col-span-6" delay={0.14}>
            <div className="space-y-5">
              {about.body.map((para, i) => (
                <p key={i} className="text-sm font-light text-muted-foreground leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </SectionReveal>

          {/* Pull-quote + CTA */}
          <SectionReveal className="md:col-span-5 md:col-start-8" delay={0.22}>
            <div className="flex flex-col justify-between h-full gap-10">
              {/* Manifesto pull-quote */}
              <blockquote className="border-l-2 border-foreground/15 pl-5">
                <p className="text-sm font-light text-muted-foreground/70 leading-relaxed">
                  &ldquo;{about.manifesto}&rdquo;
                </p>
              </blockquote>

              <Button
                asChild
                variant="outline"
                className="self-start uppercase tracking-wider text-xs px-8"
              >
                <Link href="/about">About Us</Link>
              </Button>
            </div>
          </SectionReveal>

        </div>
      </div>
    </section>
  );
}
