import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionReveal from "@/components/ui/SectionReveal";
import { services } from "@/data/data";
import Tag from "@/components/ui/Tag";

const preview = services.slice(0, 3);

export default function ServicesPreview() {
  return (
    <section className="bg-background py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <SectionReveal>
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
                What We Do
              </p>
              <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] text-foreground">
                Our Services
              </h2>
            </div>
            <Button asChild variant="ghost" className="hidden md:inline-flex uppercase tracking-wider text-xs">
              <Link href="/services">View All Services →</Link>
            </Button>
          </div>
        </SectionReveal>

        {/* Service rows */}
        <div className="divide-y divide-border">
          {preview.map((service, i) => (
            <SectionReveal key={service.id} delay={i * 0.1}>
              <div className="group py-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <span className="text-xs font-medium text-muted-foreground tabular-nums w-8 shrink-0">
                  {service.number}
                </span>
                <div className="flex-1">
                  <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-3 group-hover:translate-x-2 transition-transform duration-300 will-gpu">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                    {service.description}
                  </p>
                </div>
                <div className="hidden sm:flex flex-wrap gap-2 shrink-0 max-w-xs justify-end">
                  {service.tags.slice(0, 2).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 md:hidden">
          <Button asChild variant="outline" className="w-full uppercase tracking-wider text-xs">
            <Link href="/services">View All Services →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
