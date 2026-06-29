"use client";

import { useState } from "react";
import SectionReveal from "@/components/ui/SectionReveal";
import StackedProjects from "@/components/ui/StackedProjects";
import { projects, projectCategories } from "@/data/data";
import { cn } from "@/lib/utils";

export default function WorksGrid() {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Filter tabs */}
        <SectionReveal>
          <div className="flex flex-wrap gap-2 mb-14 md:mb-20">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] rounded-full border transition-colors duration-200",
                  active === cat
                    ? "bg-foreground text-background border-foreground"
                    : "border-foreground/15 text-foreground/55 hover:border-foreground/40 hover:text-foreground/80"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Stacked cards display */}
        {filtered.length > 0 ? (
          <StackedProjects projects={filtered} />
        ) : (
          <p className="py-24 text-center text-sm text-muted-foreground">
            No projects in this category yet.
          </p>
        )}

      </div>
    </section>
  );
}
