import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionReveal from "@/components/ui/SectionReveal";
import { metrics, agency } from "@/data/data";

export default function ProcessOutro() {
  return (
    <section className="bg-foreground text-background overflow-hidden">
      {/* Large agency name — visual echo of the expanding logo from ProcessSection */}
      <div className="px-6 md:px-12 lg:px-20 pt-10 pb-0 select-none" aria-hidden="true">
        <span className="font-heading text-[clamp(4rem,14vw,13rem)] font-light text-background/10 leading-none whitespace-nowrap">
          {agency.name}
        </span>
      </div>

      {/* Stats + CTA */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-8 pb-24 md:pb-36">
        <SectionReveal>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-background/40 mb-16">
            The Numbers
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 mb-20 divide-y sm:divide-y-0 sm:divide-x divide-background/10">
          {metrics.map((m, i) => (
            <SectionReveal key={m.label} delay={i * 0.12}>
              <div className="py-8 sm:py-0 sm:px-12 first:pl-0 last:pr-0">
                <div className="font-heading text-[clamp(4rem,9vw,8rem)] leading-none text-background mb-3">
                  <AnimatedCounter value={m.value} suffix={m.suffix} />
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-background/45">
                  {m.label}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.2}>
          <h2 className="font-heading text-[clamp(2.2rem,5vw,4.5rem)] text-background mb-10 max-w-xl leading-tight">
            Built to Last.
          </h2>
          <Button asChild size="lg" variant="inverted">
            <Link href="/works">See Our Work</Link>
          </Button>
        </SectionReveal>
      </div>
    </section>
  );
}
