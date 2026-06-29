import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionReveal from "@/components/ui/SectionReveal";
import { about, agency } from "@/data/data";

export default function AboutPreview() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: eyebrow + heading */}
          <SectionReveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-6">
              {about.eyebrow}
            </p>
            <h2 className="font-heading text-[clamp(2rem,5vw,4.5rem)] mb-0 text-foreground">
              {about.heading}
            </h2>
          </SectionReveal>

          {/* Right: body + CTA */}
          <SectionReveal delay={0.15}>
            <div className="space-y-5 mb-10">
              {about.body.map((para, i) => (
                <p key={i} className="text-base font-light text-muted-foreground leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Button asChild variant="outline" className="uppercase tracking-wider text-xs px-6">
                <Link href="/about">About Us</Link>
              </Button>
              <span className="text-xs text-muted-foreground">Est. {agency.founded}</span>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
