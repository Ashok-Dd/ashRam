import SectionReveal from "@/components/ui/SectionReveal";
import { about, agency } from "@/data/data";

const principles = [
  {
    number: "01",
    title:  "Build with Intent",
    body:   "Every architecture decision, every UI element, every API endpoint is deliberate. No shortcuts — only considered trade-offs.",
  },
  {
    number: "02",
    title:  "Ship on Time",
    body:   "We plan carefully upfront so deadlines become commitments. You always know exactly what is happening and when it ships.",
  },
  {
    number: "03",
    title:  "Deliver Ownership",
    body:   "When we hand over a project, you truly own it — clean code, full documentation, and a handoff your team can build on.",
  },
] as const;

export default function Manifesto() {
  return (
    <section className="bg-background py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Meta row */}
        <SectionReveal>
          <div className="flex items-center justify-between pb-7 border-b border-border mb-14 md:mb-20">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              Our Manifesto
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              {agency.name} Studio
            </p>
          </div>
        </SectionReveal>

        {/* Heading + body — 2-col editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-20 md:mb-28">
          <SectionReveal>
            <h2 className="font-heading text-[clamp(2.4rem,5vw,4.5rem)] text-foreground leading-[1.0] tracking-tight">
              Precision<br />Over Pretty.
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.12}>
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

        {/* Principles — 3-col row */}
        <SectionReveal delay={0.08}>
          <div className="border-t border-border pt-14 md:pt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-border">
              {principles.map((p) => (
                <div
                  key={p.number}
                  className="md:px-10 first:pl-0 last:pr-0 py-8 md:py-0 border-b border-border md:border-b-0 last:border-b-0"
                >
                  <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground/50 mb-5 block">
                    {p.number}
                  </span>
                  <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3 leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

      </div>
    </section>
  );
}
