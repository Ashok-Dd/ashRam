import SectionReveal from "@/components/ui/SectionReveal";
import { about } from "@/data/data";
import TrustSection from "../home/TrustSection";

export default function Manifesto() {
  return (
    <section className="bg-background py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <SectionReveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-8">
              Our Manifesto
            </p>
            <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] text-foreground">
              Precision Over Pretty.
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <blockquote className="text-lg md:text-xl font-light text-muted-foreground leading-relaxed border-l-2 border-foreground/20 pl-8 mb-10">
              {about.manifesto}
            </blockquote>
            <div className="space-y-4">
              {about.body.map((para, i) => (
                <p key={i} className="text-base font-light text-muted-foreground leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
      <div className="py-5">
        <TrustSection />
      </div>
    </section>
  );
}
