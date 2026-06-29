"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SectionReveal from "@/components/ui/SectionReveal";
import { projects } from "@/data/data";
import Tag from "@/components/ui/Tag";

const featured = projects.filter((p) => p.featured);

export default function WorksPreview() {
  return (
    <section className="bg-background py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <SectionReveal>
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Selected Work
              </p>
              <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] text-foreground">
                Our Portfolio
              </h2>
            </div>
            <Button asChild variant="ghost" className="hidden md:inline-flex uppercase tracking-wider text-xs">
              <Link href="/works">View All Work →</Link>
            </Button>
          </div>
        </SectionReveal>

        {/* 3 cards — gap-px on bg-border = 1px dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px ">
          {featured.map((project, i) => (
            <SectionReveal key={project.id} delay={i * 0.08}>
              <Link href="/works" className="group block bg-background h-full">
                {/* 16:9 image with slide-up overlay */}
                <div className="relative aspect-video overflow-hidden bg-muted m-3 rounded-xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 will-gpu group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Ghost number */}
                  <span className="absolute top-4 left-5 font-heading text-[4rem] leading-none text-white/10 select-none pointer-events-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Slide-up info overlay (CSS group-hover — no broken whileHover) */}
                  <div className="absolute inset-0 bg-foreground/92 flex flex-col justify-end p-6 will-gpu translate-y-full group-hover:translate-y-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-background/50 mb-3">
                      {project.category} · {project.year}
                    </p>
                    <h3 className="font-heading text-2xl text-background mb-2 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-background/55 leading-relaxed">
                      {project.metrics}
                    </p>
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-5 py-4 flex items-center justify-between gap-4">
                  <h3 className="font-heading text-lg text-foreground group-hover:opacity-55 transition-opacity duration-300 leading-tight">
                    {project.title}
                  </h3>
                  <Tag className="shrink-0">{project.category}</Tag>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 md:hidden">
          <Button asChild variant="outline" className="w-full uppercase tracking-wider text-xs">
            <Link href="/works">View All Work →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
