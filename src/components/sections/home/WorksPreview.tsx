import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionReveal from "@/components/ui/SectionReveal";
import StackedProjects from "@/components/ui/StackedProjects";
import { projects } from "@/data/data";

const featured = projects.filter((p) => p.featured);

export default function WorksPreview() {
  return (
    <section className="bg-background py-24 md:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Meta row */}
        <SectionReveal>
          <div className="flex items-center justify-between pb-7 border-b border-border mb-14 md:mb-20">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              Selected Work
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              {projects.length} Projects
            </p>
          </div>
        </SectionReveal>

        {/* Heading + View All */}
        <SectionReveal delay={0.06}>
          <div className="flex items-end justify-between mb-14 md:mb-20">
            <h2 className="font-heading text-[clamp(2.6rem,6.5vw,6.5rem)] text-foreground leading-[0.93] tracking-tight">
              Our Portfolio
            </h2>
            <Button
              asChild
              variant="outline"
              className="hidden md:inline-flex self-end uppercase tracking-wider text-xs px-8 mb-1"
            >
              <Link href="/works">View All</Link>
            </Button>
          </div>
        </SectionReveal>

        {/* Stacked cards */}
        <StackedProjects projects={featured} />

        {/* Mobile CTA */}
        <div className="mt-10 md:hidden">
          <Button asChild variant="outline" className="w-full uppercase tracking-wider text-xs">
            <Link href="/works">View All Work →</Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
