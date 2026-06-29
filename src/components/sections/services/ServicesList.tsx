"use client";
import { cn } from "@/lib/utils";
import SectionReveal from "@/components/ui/SectionReveal";
import { services } from "@/data/data";

export default function ServicesList() {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
          {services.map((service, i) => (
            <SectionReveal key={service.id} delay={i * 0.05}>
              <div
                className={cn(
                  "group relative border-b border-r border-border",
                  "hover:bg-foreground transition-colors duration-300 cursor-default",
                  "p-8 md:p-10 overflow-hidden"
                )}
              >
                

                <div className="relative z-10 flex flex-col gap-5">
                  {/* Number + title */}
                  <div>
                    <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground group-hover:text-background/40 transition-colors duration-300 mb-3">
                      {service.number}
                    </p>
                    <h3 className="font-heading text-2xl md:text-[1.75rem] leading-tight text-foreground group-hover:text-background transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm font-light text-muted-foreground group-hover:text-background/65 leading-relaxed transition-colors duration-300">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border border-foreground/15 text-foreground/55 group-hover:border-background/20 group-hover:text-background/55 tag-fill"
                      >
                        <span className="w-1 h-1 rounded-full bg-current opacity-60 shrink-0" aria-hidden="true" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
