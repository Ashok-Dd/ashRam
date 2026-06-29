import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionReveal from "@/components/ui/SectionReveal";
import { team } from "@/data/data";

export default function TeamPreview() {
  return (
    <section className="bg-background py-24 md:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Meta row */}
        <SectionReveal>
          <div className="flex items-center justify-between pb-7 border-b border-border mb-14 md:mb-20">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              The Team
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              {team.length} Members
            </p>
          </div>
        </SectionReveal>

        {/* Heading row */}
        <SectionReveal delay={0.06}>
          <div className="flex items-end justify-between mb-16 md:mb-24">
            <h2 className="font-heading text-[clamp(2.6rem,6.5vw,6.5rem)] text-foreground leading-[0.93] tracking-tight">
              Two Minds,<br />One Obsession.
            </h2>
            <Button
              asChild
              variant="outline"
              className="hidden md:inline-flex self-end uppercase tracking-wider text-xs px-8 mb-1"
            >
              <Link href="/team">Meet the Team</Link>
            </Button>
          </div>
        </SectionReveal>

        {/* Member grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-20">
          {team.map((member, i) => (
            <SectionReveal key={member.id} delay={i * 0.12}>
              <Link href="/team" className="group block">
                {/* Photo */}
                <div className="relative w-full aspect-4/5 mb-7 overflow-hidden bg-muted">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 will-gpu group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  {/* Ghost index */}
                  <span className="absolute bottom-5 right-5 font-heading text-7xl leading-none text-white/8 select-none pointer-events-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Info */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-2xl md:text-3xl text-foreground leading-tight mb-1 group-hover:opacity-70 transition-opacity duration-300">
                      {member.name}
                    </h3>
                    <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground/60 mb-4">
                      {member.role}
                    </p>
                    <p className="text-sm font-light text-muted-foreground leading-relaxed">
                      {member.shortBio}
                    </p>
                  </div>
                  <span className="text-muted-foreground/25 group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300 text-sm select-none mt-1 shrink-0">
                    →
                  </span>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-14 md:hidden">
          <Button asChild variant="outline" className="w-full uppercase tracking-wider text-xs">
            <Link href="/team">Meet the Team →</Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
