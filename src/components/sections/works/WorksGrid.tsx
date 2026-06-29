"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Tag from "@/components/ui/Tag";
import SectionReveal from "@/components/ui/SectionReveal";
import { projects, projectCategories } from "@/data/data";
import { cn } from "@/lib/utils";

export default function WorksGrid() {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="py-16 md:py-20">
      {/* Filter — contained */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-12">
        <SectionReveal>
          <div className="flex flex-wrap gap-2">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] rounded-full border",
                  active === cat
                    ? "bg-foreground text-background border-foreground"
                    : "border-foreground/15 text-foreground/55 tag-fill"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </SectionReveal>
      </div>

      {/* Editorial alternating rows — full bleed */}
      <div className="border-t border-border">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col md:flex-row border-b border-border"
              >
                {/* ── Info panel ───────────────────────────────────── */}
                <div
                  className={cn(
                    "flex-1 flex flex-col justify-center",
                    "px-6 sm:px-10 md:px-16 lg:px-24 py-10 md:py-16",
                    "order-2",
                    isEven ? "md:order-1" : "md:order-2"
                  )}
                >
                  {/* Number + meta */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-heading text-[5rem] leading-none text-foreground/6 select-none shrink-0 -ml-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {project.category}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/45 mt-0.5">
                        {project.year}
                      </p>
                    </div>
                  </div>

                  <h3 className="font-heading text-[clamp(2rem,3.5vw,3.2rem)] text-foreground leading-tight mb-4">
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-7 max-w-md">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-7">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>

                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/35">
                    {project.metrics}
                  </p>
                </div>

                {/* ── Image panel ───────────────────────────────────── */}
                <div
                  className={cn(
                    "w-full md:w-[50%] shrink-0 flex",
                    "p-3 md:p-4",
                    "order-1",
                    isEven ? "md:order-2" : "md:order-1"
                  )}
                >
                  <div className="relative flex-1 rounded-2xl overflow-hidden bg-muted aspect-video md:aspect-auto">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 will-gpu group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Subtle scrim on hover */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-24 text-center text-muted-foreground text-sm">
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  );
}
