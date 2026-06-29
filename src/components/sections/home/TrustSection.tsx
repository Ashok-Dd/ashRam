import AnimatedCounter from "@/components/ui/AnimatedCounter";
import MarqueeStrip from "@/components/ui/MarqueeStrip";
import SectionReveal from "@/components/ui/SectionReveal";
import { metrics, clientLogos } from "@/data/data";

export default function TrustSection() {
  const logoNames = clientLogos.map((c) => c.name);

  return (
    <section className="bg-foreground text-background py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <SectionReveal>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-background/50 mb-12">
            The Numbers
          </p>
        </SectionReveal>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-0 md:divide-x md:divide-background/10 mb-20">
          {metrics.map((m, i) => (
            <SectionReveal key={m.label} delay={i * 0.12}>
              <div className="md:px-12 first:pl-0 last:pr-0">
                <div className="font-heading text-[clamp(3.5rem,8vw,7rem)] leading-none text-background mb-3">
                  <AnimatedCounter value={m.value} suffix={m.suffix} />
                </div>
                <p className="text-sm text-background/50 uppercase tracking-[0.2em]">{m.label}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* Client logos marquee — full width */}
      <div className="border-t border-background/10 border-b py-6">
        <MarqueeStrip
          items={logoNames}
          speed={25}
          itemClassName="text-background/40"
        />
      </div>

      {/* Trust badges */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mt-12">
        <SectionReveal>
          <div className="flex flex-wrap gap-4">
            {["100% On-Time Delivery", "Clean Code Guarantee", "32+ Products Shipped", "3+ Years of Excellence"].map((badge) => (
              <span
                key={badge}
                className="inline-block border border-background/15 text-background/60 text-xs uppercase tracking-widest px-5 py-2.5"
              >
                {badge}
              </span>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
