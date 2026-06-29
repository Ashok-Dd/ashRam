import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionReveal from "@/components/ui/SectionReveal";
import { team } from "@/data/data";

export default function TeamPreview() {
  return (
    <section className="bg-background py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionReveal>
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
                The Team
              </p>
              <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] text-foreground">
                Two Minds,<br />One Obsession.
              </h2>
            </div>
            <Button asChild variant="ghost" className="hidden md:inline-flex uppercase tracking-wider text-xs">
              <Link href="/team">Meet the Team →</Link>
            </Button>
          </div>
        </SectionReveal>

        {/* Member strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border border border-border">
          {team.map((member, i) => (
            <SectionReveal key={member.id} delay={i * 0.12}>
              <div className="p-8 md:p-12 group">
                {/* Member photo */}
                <div className="w-full aspect-[4/3] mb-8 overflow-hidden relative bg-muted">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 will-gpu group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  {/* Member number watermark */}
                  <span className="absolute bottom-4 right-4 font-heading text-6xl text-white/10 select-none pointer-events-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-1">{member.name}</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground font-light">{member.shortBio}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Button asChild variant="outline" className="w-full uppercase tracking-wider text-xs">
            <Link href="/team">Meet the Team →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
