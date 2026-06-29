import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionReveal from "@/components/ui/SectionReveal";
import { services } from "@/data/data";

const preview = services.slice(0, 3);

export default function ServicesPreview() {
  return (
    <section className="bg-background py-24 md:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Meta row */}
        <SectionReveal>
          <div className="flex items-center justify-between pb-7 border-b border-border mb-14 md:mb-20">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              What We Do
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              {services.length} Services
            </p>
          </div>
        </SectionReveal>

        {/* Heading row */}
        <SectionReveal delay={0.06}>
          <div className="flex items-end justify-between mb-16 md:mb-24">
            <h2 className="font-heading text-[clamp(2.6rem,6.5vw,6.5rem)] text-foreground leading-[0.93] tracking-tight">
              Our Services
            </h2>
            <Button
              asChild
              variant="outline"
              className="hidden md:inline-flex self-end uppercase tracking-wider text-xs px-8 mb-1"
            >
              <Link href="/services">View All</Link>
            </Button>
          </div>
        </SectionReveal>

        {/* Service rows */}
        <div className="border-t border-border">
          {preview.map((service, i) => (
            <SectionReveal key={service.id} delay={i * 0.1}>
              <Link
                href="/services"
                className="group block border-b border-border py-9 md:py-11"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                  {/* Index */}
                  <span className="hidden md:block text-[10px] font-medium text-muted-foreground/40 tabular-nums tracking-widest md:col-span-1 pt-1.5">
                    {service.number}
                  </span>

                  {/* Title */}
                  <h3 className="font-heading text-2xl md:text-[2rem] text-foreground leading-tight group-hover:translate-x-1.5 transition-transform duration-300 will-gpu md:col-span-5">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm font-light text-muted-foreground leading-relaxed md:col-span-5 md:col-start-7 md:pt-1">
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <div className="hidden md:flex md:col-span-1 justify-end pt-1.5">
                    <span className="text-muted-foreground/25 group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300 text-sm select-none">
                      →
                    </span>
                  </div>
                </div>
              </Link>
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
